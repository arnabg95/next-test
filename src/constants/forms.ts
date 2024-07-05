import {
  IChangePasswordInitialState,
  IForgotPasswordInitialState,
  ILoginInitialState,
  IPostInitialState,
  IResetPasswordInitialState,
  ISignupInitialState,
} from "@/interfaces";

/** @description Left bar at authentication pages (signin, signup...) */
export const SideBarLinks = [
  {
    title: "Sign Up",
    link: "/auth/signup",
  },
  {
    title: "Sign In",
    link: "/auth/signin",
  },
];

/** @description Form Input Fields*/
export const RegistrationInputFields = [
  {
    type: "text",
    placeHolder: "Mahmoud Adel",
    label: "Your Name",
    required: true,
    name: "name",
  },
  {
    type: "email",
    placeHolder: "Email",
    label: "Your Email",
    required: true,
    name: "email",
  },
  {
    type: "password",
    placeHolder: "Password@123",
    label: "Password",
    required: true,
    name: "pass",
  },
  {
    type: "password",
    placeHolder: "Password@123",
    label: "Confirm Password",
    required: true,
    name: "conf",
  },
];

/** @description Form Input Fields*/
export const SignInInputFields = [
  {
    type: "email",
    placeHolder: "Email",
    label: "Your Email",
    required: true,
    name: "email",
  },
  {
    type: "password",
    placeHolder: "Password@123",
    label: "Password",
    required: true,
    name: "pass",
  },
];

/**
 *  @description Initial state for Signup page, Signin page, forgot password page.
 *  @author Anirban Mishra
 *  @summary Each and every initial state takes 4 arguments {success, message, errors, fields}. here success has two types like null and boolean type. The reason behind that is, suppose while initial rendering the useFormState takes the inital state and if we check it will be always null. Now we've added a logic the state.success===false then onyl we show the swal, otherwise the form will be submitted properly. and the response will be there accordingly. That's why succes has two types.
 */
export const SignupPageInitialState: ISignupInitialState = {
  success: null,
  message: "neutral",
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  fields: { name: "", email: "", password: "", confirmPassword: "" },
};

export const SignInitialState: ILoginInitialState = {
  message: "",
  success: null,
  errors: { email: "", password: "" },
  fields: { email: "", password: "", keepMeSignedIn: false },
};

export const ForgotPasswordInitialState: IForgotPasswordInitialState = {
  success: null,
  message: "neutral",
  errors: { email: "" },
  fields: { email: "" },
};

export const ResetPasswordInitialState: IResetPasswordInitialState = {
  success: null,
  message: "neutral",
  errors: { password: "", confirmPassword: "", token: "" },
  fields: { password: "", confirmPassword: "", token: "" },
};

export const changeProfilePassInitialState: IChangePasswordInitialState = {
  success: null,
  message: "neutral",
  errors: { password: "", oldPassword: "", confirmPassword: "" },
  fields: { password: "", oldPassword: "", confirmPassword: "" },
};

// export const CreatePostInitialState: IPostInitialState = {
//   message: "",
//   success: null,
//   errors: {
//     title: "",
//     desc: "",
//     category: "",
//     tags: [],
//   },
//   fields: { email: "", password: "", keepMeSignedIn: false },
// };
