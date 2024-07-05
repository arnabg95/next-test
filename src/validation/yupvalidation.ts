import { object, string } from "yup";

export const EditProfileSchemaYup = object().shape({
  name: string().required("Name cannot be blank").trim(),
  email: string().email().required("Email is Required").trim(),
  bio: string().optional(),
});



export const contactSchema = object().shape({
  name: string().required("Name cannot be blank").trim(),
  email: string().email('Email must be a valid email').required("Email is Required").trim(),
  message: string().required("Message cannot be blank").trim(),
});
