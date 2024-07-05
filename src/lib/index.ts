"use server";

import { LOGIN_USER_URL, REFRESH_TOKENS_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import { ITokens, IUserDetails } from "@/interfaces";
import { EncryptJWT, jwtDecrypt, base64url } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.NEXT_PUBLIC_SECRETKEY!;
const key = base64url.decode(secretKey);

export async function encrypt(payload: any) {
  return await new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .encrypt(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtDecrypt(input, key);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * @param formdata
 * @description First fetching the user from server and then
 */
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = { email, password };

  try {
    const response: IUserDetails = (
      await fetchApi(LOGIN_USER_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
      })
    ).data;

    const data = { ...response };

    const session = await encrypt(data);

    console.log(session)

    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return { success: true, message: "User logged in successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};

export const socialLoginUser = async (data: any) => {
  const session = await encrypt(data);
  console.log(session);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: "www.mojiai.ai",
  });
};

export async function logout() {
  cookies().delete("session");
  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return (await decrypt(session)) as IUserDetails;
}

/**
 * @param request
 * @description In res var taking the NextRequest then fetching cookie from the localstorage. if not session then returned, next fetching session and decrypting. Next checking if refresh token is expiring or not then holding redirect requesting in a variable 'red' then deleting the current session from cookie and return the red. after that if refresh token is not expired trying to refresh all the tokens and then creating a new session and set that cookie. and rurn the response
 */
export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed: IUserDetails = await decrypt(session);

  if (!parsed) {
    const red = NextResponse.redirect(new URL("/", request.url));
    red.cookies.delete("session");
    return red;
  }

  if (new Date(parsed.tokens.refresh.expiry * 1000) < new Date()) {
    const red = NextResponse.redirect(new URL("/", request.url));
    red.cookies.delete("session");
    return red;
  }

  if (new Date(parsed.tokens.access.expiry * 1000) < new Date()) {
    const tokens: ITokens = await refreshToken(parsed.tokens.refresh.token);
    if (tokens) {
      const newSession = { ...parsed, tokens };
      res.cookies.set({
        name: "session",
        value: await encrypt(newSession),
        httpOnly: true,
      });
    }
  }
  return res;
}

/**
 * @description Refreshing tokens if access token is expired
 */
export const refreshToken = async (refresh: string) => {
  try {
    const response = (
      await fetchApi(REFRESH_TOKENS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
        cache: "no-cache",
      })
    ).data;
    return response.tokens;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
