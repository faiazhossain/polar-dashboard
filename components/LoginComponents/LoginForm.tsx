"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import EmailInput from "./EmailInput";
import ErrorMessage from "./ErrorMessage";
import PasswordInput from "./PasswordInput";
import useLoginForm from "@/hooks/useLoginForm";
import { FaSpinner } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    email,
    password,
    errors,
    emailSuggestions,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    setErrors,
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      // Simulating API call with a timeout
      setTimeout(() => {
        if (email === "test@gmail.com" && password === "Test@1234") {
          document.cookie = "token=test-token; path=/";

          if (!emailSuggestions.includes(email)) {
            const updatedEmailSuggestions = [...emailSuggestions, email];
            localStorage.setItem(
              "emailSuggestions",
              JSON.stringify(updatedEmailSuggestions)
            );
          }

          router.push("/dashboard");
        } else {
          setErrors({
            email: "",
            password: "Incorrect test email or password",
          });
        }

        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="container rounded-xl h-[475px] w-[475px] py-6 max-w-lg font-sans bg-[#EC1B231A] shadow-[0px_4px_24px_-1px_#75757540] relative">
      <div className="absolute w-[148px] h-[148px] top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EC1B23] rounded-full dark:rounded-none flex justify-center items-center border-4 border-[#D3EAF5]">
        <BsPersonFill className="text-[60px] text-[#D3EAF5]" />
      </div>
      <div className="max-w-sm mx-auto mt-24">
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="max-w-lg mx-auto">
            <EmailInput
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              icon={<RiProfileLine className="text-xl text-[#EC1B23]" />}
              placeholder="example@mail.com"
              autoComplete="off"
              list="email-suggestions"
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
                  Remember
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
              className={`mt-3 text-lg font-lato font-semibold bg-[#EC1B23] w-full text-white rounded-lg px-6 py-3 shadow-xl hover:bg-[#dd1919] flex items-center justify-center ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin mr-2" /> : "Login"}
            </button>
          </div>
        </form>

        <datalist id="email-suggestions">
          {emailSuggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default LoginForm;
