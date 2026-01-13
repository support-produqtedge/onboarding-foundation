import Link from "next/link";

const RegisterTypePage = () => {
  return (
    <div>
      <div>
        <Link href="/register-user" className="">Single User</Link>
      </div>
      <div>
        <Link href="/register">Company</Link>
      </div>
    </div>
  )
}

export default RegisterTypePage;
