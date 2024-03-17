import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(3, "name should be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(8, "Minimum 8 characters required")
    .required("password is required."),
  role: Yup.string().required("role is required"),
});

export const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "minimum 8 character required")
    .required("Please select the place."),
});
