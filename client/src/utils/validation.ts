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

const eventSchema = Yup.object().shape({
  name: Yup.string().required("Event Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  location: Yup.string().required("Location is required"),
  max_ticket: Yup.number()
    .required("Max Tickets is required")
    .positive("Max Tickets must be a positive number"),
  thumbnail: Yup.mixed()
    .required("Thumbnail file is required")
    .test(
      "fileType",
      "Thumbnail must be a valid file type (jpg, jpeg, png)",
      (value: File[]) => {
        if (!value) return true; // Allow empty values
        if (!value[0]?.type.includes("image")) return false; // Check if the file type is an image
        return true; // Return true if validation passes
      }
    ),
  about: Yup.string().required("About is required"),
  date: Yup.object().required("Date is required"),
  ticket_booked: Yup.number()
    .required("Ticket Booked is required")
    .positive("Ticket Booked must be a positive number")
    .min(0, "Ticket Booked must be a non-negative number"),
});

export default eventSchema;
