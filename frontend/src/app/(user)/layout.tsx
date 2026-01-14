import { verifySession } from "@/dal";
import { redirect } from "next/navigation";

const UserLayout = async () => {
  const { token } = await verifySession();
  if (!token) {
    redirect("/login");
  }
  return (
    <div>
      User dashboard
    </div>
  )
}

export default UserLayout;
