import SettingsHeader from "@/components/settings/header";
import PasswordForm from "@/components/settings/passwordForm";
import { Button } from "@/components/ui/button";

const PasswordPage = () => {
  return (
    <>
      <div>
        <SettingsHeader />
      </div>
      <div className="flex justify-between items-center mt-10">
        <div>
          <h2 className="text-2xl font-semibold">Password</h2>
          <p className="text-slate-500">Please enter your current password to change your password</p>
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
      <PasswordForm />
    </>
  )
}

export default PasswordPage;
