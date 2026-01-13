import Image from "next/image";
import ForgotPasswordForm from '../../../components/auth/forgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="relative p-6 bg-white z-1">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
        <div className=" lg:w-1/2 mx-auto">
          <div className="flex flex-col justify-center w-[80%] h-full mx-auto">
            <div className="mb-10 w-[153.15px]">
              <Image
                src={"/logo.png"}
                alt="produqtedge logo"
                height={28.6}
                width={173.15}
                className="w-full h-full"
              />
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
        <div className="lg:w-1/2 w-full h-full bg-gray-300 lg:grid items-center hidden">
          <div className="relative items-center justify-center  flex z-1">
            <div className="flex flex-col items-center max-w-xs">
              <p className="text-center text-gray-400">Onboarding Foundation Project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ForgotPasswordPage;
