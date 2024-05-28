"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";
import { z } from "zod";
import TextInput from "./TextInput";
import { RiProfileLine } from "react-icons/ri";
import ErrorMessage from "./ErrorMessage";
import PasswordInput from "./PasswordInput";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

// Define Zod schema
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

const LoginForm: React.FC = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  useEffect(() => {
    // Retrieve email suggestions from local storage
    const savedEmails = localStorage.getItem("emailSuggestions");
    if (savedEmails) {
      setEmailSuggestions(JSON.parse(savedEmails));
    }
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form data using Zod
    const result = loginSchema.safeParse({ email, password });

    if (result.success) {
      // Check for test email and password
      if (email === "test@gmail.com" && password === "Test@1234") {
        // Set the test token in cookies
        document.cookie = "token=test-token; path=/"; // Simple client-side cookie setting

        // Redirect to the dashboard
        router.push("/dashboard");
      } else {
        // Handle incorrect test credentials
        setErrors({ email: "", password: "Incorrect test email or password" });
      }
    } else {
      // Handle validation errors
      const newErrors = { email: "", password: "" };
      result.error.errors.forEach((error) => {
        if (error.path.includes("email")) {
          newErrors.email = error.message;
        } else if (error.path.includes("password")) {
          newErrors.password = error.message;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="container rounded-xl h-[475px] w-[475px] py-6 max-w-lg font-sans bg-[#EC1B231A] shadow-[0px_4px_24px_-1px_#75757540] shadow-[-6px_8px_13px_0px_#62575726] relative">
      <div className="absolute w-[148px] h-[148px] top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EC1B23] rounded-full flex justify-center items-center border-4 border-[#D3EAF5]">
        <BsPersonFill className="text-[60px] text-[#D3EAF5]" />
      </div>
      <div className="max-w-sm mx-auto mt-24">
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="max-w-lg mx-auto">
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              icon={<RiProfileLine className="text-xl text-[#EC1B23]" />}
              placeholder="example@mail.com"
            />
            <ErrorMessage message={errors.email} />

            <PasswordInput
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <ErrorMessage message={errors.password} />

            <div className="flex justify-between my-4">
              <label className="block text-gray-500 font-bold">
                <input
                  type="checkbox"
                  className="leading-loose text-pink-600 border-none"
                />
                <span className="py-2 text-sm text-gray-600 leading-snug">
                  {" "}
                  Remember{" "}
                </span>
              </label>
              <a
                href="#"
                className="block text-gray-500 border-gray-200 hover:border-b-2 font-lato"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="mt-3 text-lg font-lato font-semibold bg-[#EC1B23] w-full text-white rounded-lg px-6 py-3 shadow-xl hover:bg-[#dd1919]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
