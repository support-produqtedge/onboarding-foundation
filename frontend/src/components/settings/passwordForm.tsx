const PasswordForm = () => {
  return (
    <>
      <div className="mt-15 w-full">
        <div className="w-[70%]">
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Current password:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">New password:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full" />
          </div>
          <div className="flex items-center justify-between gap-10 mb-10">
            <label className="w-1/3">Confirm new password:</label>
            <input type="text" className="border py-2 px-4 rounded-lg w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordForm;
