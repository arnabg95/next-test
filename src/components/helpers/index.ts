import { REFRESH_TOKENS_URL } from "../../constants/urls";

/**
 * @author Anirban Mishra
 * @description Refreshes all the tokens and if not expired then sends the existing once
 */

export const refreshAccessToken = async (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const response = await fetch(REFRESH_TOKENS_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...tokens,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? tokens.refreshToken,
    };
  } catch (error) {
    return {
      ...tokens,
      error: "RefreshAccessTokenError",
    };
  }
};

export const formatNumber = (num: number) => {
  function formatWithSuffix(value: number, suffix: string) {
    const rounded = Math.floor(value * 10) / 10; // Floor to 1 decimal place
    const formatted = rounded.toFixed(1).replace(/\.0$/, "");
    return value !== rounded ? formatted + suffix + "+" : formatted + suffix;
  }

  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    return formatWithSuffix(num / 1000, "k+");
  } else if (num >= 1000000 && num < 1000000000) {
    return formatWithSuffix(num / 1000000, "m+");
  } else {
    return formatWithSuffix(num / 1000000000, "b+");
  }
};
