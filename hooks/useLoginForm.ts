import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Must have at least 6 characters" })
    .regex(passwordValidation, {
      message:
        "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const savedEmails = localStorage.getItem("emailSuggestions");
    if (savedEmails) {
      setEmailSuggestions(JSON.parse(savedEmails));
    }
  }, []);

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (errors.email) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    },
    [errors.email]
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      if (errors.password) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    },
    [errors.password]
  );

  const validateForm = () => {
    const result = loginSchema.safeParse({ email, password });
    if (result.success) {
      return true;
    } else {
      const newErrors = { email: "", password: "" };
      result.error.errors.forEach((error) => {
        if (error.path.includes("email")) {
          newErrors.email = error.message;
        } else if (error.path.includes("password")) {
          newErrors.password = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  return {
    email,
    password,
    errors,
    emailSuggestions,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    setErrors, // Ensure setErrors is returned
  };
};

export default useLoginForm;
