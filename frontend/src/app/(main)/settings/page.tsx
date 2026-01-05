import SettingsHeader from "@/components/settings/header";
import ProfileForm from "@/components/settings/profileForm";
import { Button } from "@/components/ui/button";
import { getSignedUser } from "../services";
import { verifySession } from "@/dal";

const SettingsPage = async () => {
  const { token, id } = await verifySession();
  const user = await getSignedUser(token!, id);

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <SettingsHeader />
          <div>
            <Button
              label="Delete Account"
              variant="dark"
              size="small"
              shape="rounded"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div>
            <h2 className="text-2xl font-semibold">Personal Information Management</h2>
            <p className="text-slate-500">Update your personal details here</p>
          </div>
          <div className="flex gap-1">
            <Button
              label="Cancel"
              variant="outlinePrimary"
              size="small"
              shape="rounded"
            />
            <Button
              label="Save"
              variant="dark"
              size="small"
              shape="rounded"
            />
          </div>
        </div>
        <ProfileForm user={user} />
      </div>
    </>
  )
}

export default SettingsPage;
