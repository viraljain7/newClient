// ==============================
// 🔹 VALIDATION
// ==============================
import * as Yup from "yup";

export const validationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid mobile number")
    .required("Mobile is required"),
  password: Yup.string().required("Password is required"),
});

