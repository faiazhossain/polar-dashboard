import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginFormInput from "./LoginFormInput";

const LoginForm = () => {
  async function createInvoice(formData: FormData) {
    "use server";
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const res = await fetch("https://tracev2.barikoimaps.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(rawFormData),
    });
    const data = await res.json();
    await cookies().set("token", data?.token);
    if (data?.token) {
      //  redirect to dashboard
      redirect("/dashboard");
    }
  }

  return <LoginFormInput />;
};

export default LoginForm;
