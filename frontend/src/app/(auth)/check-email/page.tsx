import Image from "next/image";
import Link from "next/link";

const CheckEmailPage = () => {
  return (
    <div className="relative p-6 bg-white z-1">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col">
        <div className="flex flex-col justify-center flex-1 lg:w-1/2 w-full">
          <div className="w-[80%]">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <div>
                <div className="w-10 h-10 mb-4 flex justify-center items-center rounded border border-slate-300">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33325 8.16663L11.859 14.8346C12.6304 15.3746 13.016 15.6446 13.4356 15.7492C13.8061 15.8415 14.1937 15.8415 14.5643 15.7492C14.9838 15.6446 15.3695 15.3746 16.1408 14.8346L25.6666 8.16663M7.93325 23.3333H20.0666C22.0268 23.3333 23.0069 23.3333 23.7556 22.9518C24.4141 22.6163 24.9496 22.0808 25.2851 21.4223C25.6666 20.6736 25.6666 19.6935 25.6666 17.7333V10.2666C25.6666 8.30644 25.6666 7.32635 25.2851 6.57766C24.9496 5.91909 24.4141 5.38366 23.7556 5.0481C23.0069 4.66663 22.0268 4.66663 20.0666 4.66663H7.93325C5.97307 4.66663 4.99298 4.66663 4.24429 5.0481C3.58572 5.38366 3.05029 5.91909 2.71473 6.57766C2.33325 7.32635 2.33325 8.30644 2.33325 10.2666V17.7333C2.33325 19.6935 2.33325 20.6736 2.71473 21.4223C3.05029 22.0808 3.58572 22.6163 4.24429 22.9518C4.99298 23.3333 5.97307 23.3333 7.93325 23.3333Z" stroke="#414651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="mb-5 sm:mb-8">
                  <h1 className="mb-2 font-semibold text-gray-800 text-2xl">
                    Check your email
                  </h1>
                  <p className="text-sm text-gray-500 my-2">
                    we sent a verification link to your email
                  </p>

                  <Link href="login" className="flex items-center gap-2 text-sm font-semibold">
                    <div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4999 6.66659H0.833252M0.833252 6.66659L6.66659 12.4999M0.833252 6.66659L6.66659 0.833252" stroke="#535862" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p>Back to login</p>
                  </Link>
                  <p className="text-gray-500 text-sm mt-2">Didn't receive the email? <span className="font-semibold">Click to resend</span></p>
                </div>
              </div>
            </div>
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
  )
}

export default CheckEmailPage;
