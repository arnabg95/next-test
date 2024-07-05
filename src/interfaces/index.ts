import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignupInitialState {
  success: null | boolean;
  message: string;
  errors: ISignUpForm;
  fields: ISignUpForm;
}

export interface ILoginForm {
  email: string;
  password: string;
  keepMeSignedIn?: boolean;
}

export interface ILoginInitialState {
  success: null | boolean;
  message: string;
  errors: ILoginForm;
  fields: ILoginForm;
}

export interface IPostForm {
  title: string;
  desc: string;
  category: string;
  tags: string[];
}

export interface IPostInitialState {
  success: null | boolean;
  message: string;
  errors: IPostForm;
  fields: IPostForm;
}

export interface IForgotPasswordInitialState {
  success: null | boolean;
  message: string;
  errors: { email: string };
  fields: { email: string };
}

export interface IResetPasswordInitialState {
  success: null | boolean;
  message: string;
  errors: { password: string; confirmPassword: string; token: string };
  fields: { password: string; confirmPassword: string; token: string };
}
export interface IChangePasswordInitialState {
  success: null | boolean;
  message: string;
  errors: { oldPassword: string; password: string; confirmPassword: string };
  fields: { oldPassword: string; password: string; confirmPassword: string };
}

export interface IUserDetails {
  user: {
    _id: string;
    slug: string;
    name: string;
    email: string;
    bio: string;
    profile_image: string;
    is_active: boolean;
    is_blocked: boolean;
    has_social_login: boolean;
    role: string;
    verification_token: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image: string;
    feedsettings: {
      _id: string;
      autoplay: boolean;
      is_mature: boolean;
      blur_mature: boolean;
      post_on_new_tab: boolean;
      user: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    notificationsettings: {
      _id: string;
      user: string;
      activity: {
        mentions: boolean;
        newFollower: boolean;
        activity_on_my_post: boolean;
        activity_on_other_post: boolean;
      };
      recommendation: {
        trending: boolean;
      };
      createdAt: string;
      updatedAt: string;
      __v: 0;
    };
  };
  tokens: {
    access: {
      token: string;
      expiry: number;
    };
    refresh: {
      token: string;
      expiry: number;
    };
  };
  iat: number;
  exp: number;
  jti: string;
}

export interface ITokens {
  access: { token: string; expiry: number };
  refresh: { token: string; expiry: number };
}

export interface IUserProfileDetails {
  bio: string;
  email: string;
  name: string;
  profile_image: string;
}
