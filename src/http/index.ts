import { getSession, logout } from "@/lib";

export async function fetchApi(endpoint: string, options?: RequestInit) {
  const session = await getSession();
  const url = "https://api.mojiai.ai/v1";

  try {
    const response = await fetch(`${url}/${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${
          session ? session?.tokens.access.token : "guest-user"
        }`,
      },
      cache: "no-cache",
    });
    const data = await response.json();

    // ! Changed and added throw new Error here
    if (!response.ok) {
      //Added if user blocked the direct logout
      if (response.status === 403) await logout();
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
