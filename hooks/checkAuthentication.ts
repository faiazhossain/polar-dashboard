import { cookies } from "next/headers";

async function checkAuthentication(token: any) {
  try {
    const response = await fetch("https://tracev2.barikoimaps.dev/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();

    // console.log("data,token", data, token);
    // cookies().set("user", data);
    if (response.ok) {
      // User is authenticated
      return data;
    } else {
      // User is not authenticated
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
export default checkAuthentication;
