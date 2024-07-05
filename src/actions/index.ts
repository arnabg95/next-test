"use server";

import {
  IChangePasswordInitialState,
  IForgotPasswordInitialState,
  ILoginInitialState,
  IResetPasswordInitialState,
  ISignupInitialState,
} from "@/interfaces";
import {
  ChangeProfilePassSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from "@/validation";
import { fetchApi } from "@/http/index";
import {
  FORGOT_PASSWORD_URL,
  PROFILE_UPDATE_PASSWORD_URL,
  PROFILE_UPDATE_URL,
  REGISTER_USER_URL,
  RESET_PASSWORD_URL,
} from "@/constants/urls";
import { loginUser } from "@/lib";
import { revalidatePath } from "next/cache";

/**
 * @author Anirban Mishra
 * @description Signup Handler basically takes the formdata and then parse the data throud ZOD validatoin Schema and if some error occurs the we'll through it and show via Swal and if the parse is succesfull then we'll submit the form and send the response accordingly to redirect the page to the email verification page
 */
export const signUpHandler = async (prevState: any, formData: FormData) => {
  const parse = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("pass"),
    confirmPassword: formData.get("conf"),
  });

  let response: ISignupInitialState = {
    success: true,
    message: "success",
    errors: { name: "", email: "", password: "", confirmPassword: "" },
    fields: { name: "", email: "", password: "", confirmPassword: "" },
  };

  if (!parse.success) {
    response.message = "form-verification-failed";
    response.success = false;
    parse.error.errors.forEach((e) => {
      response.errors.name = response.errors.name
        ? response.errors.name
        : e.path[0].toString() === "name"
        ? e.message
        : "";
      response.errors.email = response.errors.email
        ? response.errors.email
        : e.path[0].toString() === "email"
        ? e.message
        : "";
      response.errors.password = response.errors.password
        ? response.errors.password
        : e.path[0].toString() === "password"
        ? e.message
        : "";
      response.errors.confirmPassword = response.errors.confirmPassword
        ? response.errors.confirmPassword
        : e.path[0].toString() === "confirmPassword"
        ? e.message
        : "";
    });
    return response;
  }

  try {
    const { name, email, password } = parse.data;
    const data = await fetchApi(REGISTER_USER_URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    response.success = true;
    response.message = data.message;
    response.fields = { ...parse.data };
    return response;
  } catch (error: any) {
    // console.log("error", error);
    response.success = false;
    response.message = error.message;
    return response;
  }
};

/**
 * @author Anirban Mishra
 * @description SignIn Handler is also same as SignUp handler, basically takes the formdata and then parse the data throud ZOD validatoin Schema and if some error occurs the we'll through it and show via Swal and if the parse is succesfull then we'll submit the form and send the response
 */
export const signInHandler = async (prevState: any, formData: FormData) => {
  const keepMeSignedIn = formData.get("check") === "on" ? true : false;
  const parse = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("pass"),
  });

  console.log(parse);

  let response: ILoginInitialState = {
    success: false,
    message: "success",
    errors: { email: "", password: "" },
    fields: { email: "", password: "" },
  };

  if (!parse.success) {
    response.message = "form-verification-failed";
    response.success = false;
    parse.error.errors.forEach((e) => {
      response.errors.password = response.errors.password
        ? response.errors.password
        : e.path[0].toString() === "password"
        ? e.message
        : "";
      response.errors.email = response.errors.email
        ? response.errors.email
        : e.path[0].toString() === "email"
        ? e.message
        : "";
    });
    return response;
  }

  response.fields = { ...parse.data, keepMeSignedIn };

  const { message, success } = await loginUser({ ...parse.data });

  console.log(message);
  console.log(success);

  response.success = success;
  response.message = message;

  console.log(response);

  return response;
};

/**
 * @author Anirban Mishra
 * @description Forgot Password Handler is also same as SignUp and Signin handler.
 */
export const forgotPasswordHandler = async (
  prevState: any,
  formData: FormData
) => {
  const parse = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  let response: IForgotPasswordInitialState = {
    success: false,
    message: "success",
    errors: { email: "" },
    fields: { email: "" },
  };

  if (!parse.success) {
    response.message = "form-verification-failed";
    response.success = false;
    parse.error.errors.forEach((e) => {
      response.errors.email = response.errors.email
        ? response.errors.email
        : e.path[0].toString() === "email"
        ? e.message
        : "";
    });
    return response;
  }
  try {
    const { email } = parse.data;
    const data = await fetchApi(FORGOT_PASSWORD_URL, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    response.success = true;
    response.message = data.message;
    response.fields = { ...parse.data };
    return response;
  } catch (error: any) {
    response.success = false;
    response.message = error.message;
    return response;
  }
};

/**
 * @author Anirban Mishra
 * @description Reset Password Handler is also same as SignUp and Signin handler.
 */
export const resetPasswordHandler = async (
  prevState: any,
  formData: FormData
) => {
  const token = formData.get("token");
  const parse = ResetPasswordSchema.safeParse({
    password: formData.get("pass"),
    confirmPassword: formData.get("conf"),
  });

  let response: IResetPasswordInitialState = {
    success: false,
    message: "success",
    errors: { password: "", confirmPassword: "", token: "" },
    fields: { password: "", confirmPassword: "", token: "" },
  };

  if (!token) {
    response.message = "token-not-found";
    response.success = false;
    response.errors.token = "No Token Found";
    return response;
  }

  if (!parse.success) {
    response.message = "form-verification-failed";
    response.success = false;
    parse.error.errors.forEach((e) => {
      response.errors.password = response.errors.password
        ? response.errors.password
        : e.path[0].toString() === "password"
        ? e.message
        : "";
      response.errors.confirmPassword = response.errors.confirmPassword
        ? response.errors.confirmPassword
        : e.path[0].toString() === "confirmPassword"
        ? e.message
        : "";
    });
    return response;
  }
  // response.success = true;
  // response.message = "Parsed Without Error hehehehe" + token;
  // response.fields = { ...parse.data, token: (token as string) || "" };
  // return response;

  try {
    const { password } = parse.data;
    const data = await fetchApi(RESET_PASSWORD_URL, {
      method: "PATCH",
      body: JSON.stringify({ password, token }),
      headers: { "Content-Type": "application/json" },
    });
    response.success = true;
    response.message = data.message;
    response.fields = { ...parse.data, token: (token as string) || "" };
    return response;
  } catch (error: any) {
    response.success = false;
    response.message = error.message;
    return response;
  }
};

/**
 * @author Anirban Mishra
 * @description Password Change
 */
export const changeProfilePasswordHandler = async (
  prevState: any,
  formData: FormData
) => {
  const token = formData.get("token");
  const parse = ChangeProfilePassSchema.safeParse({
    oldPassword: formData.get("oldpass"),
    password: formData.get("pass"),
    confirmPassword: formData.get("conf"),
  });

  let response: IChangePasswordInitialState = {
    success: false,
    message: "success",
    errors: { password: "", oldPassword: "", confirmPassword: "" },
    fields: { password: "", oldPassword: "", confirmPassword: "" },
  };

  if (!parse.success) {
    response.message = "form-verification-failed";
    response.success = false;
    parse.error.errors.forEach((e) => {
      response.errors.password = response.errors.password
        ? response.errors.password
        : e.path[0].toString() === "password"
        ? e.message
        : "";
      response.errors.oldPassword = response.errors.oldPassword
        ? response.errors.oldPassword
        : e.path[0].toString() === "oldPassword"
        ? e.message
        : "";
      response.errors.confirmPassword = response.errors.confirmPassword
        ? response.errors.confirmPassword
        : e.path[0].toString() === "confirmPassword"
        ? e.message
        : "";
    });
    return response;
  }

  const body = {
    old: parse.data.oldPassword,
    new: parse.data.password,
  };

  try {
    const data = await fetchApi(PROFILE_UPDATE_PASSWORD_URL, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    response.success = true;
    response.message = data.message;
  } catch (error: any) {
    console.log(error);
    response.success = false;
    response.message = error.message;
  }
  return response;
};

export const CustomRevalidateTag = (tag: string) => {
  revalidatePath(tag);
};
