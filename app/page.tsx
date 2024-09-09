import { redirect } from "next/navigation";

export default async function Home() {
  // Redirect immediately to the /dashboard route
  return redirect("/dashboard");
}
