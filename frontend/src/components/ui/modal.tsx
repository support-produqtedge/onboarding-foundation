import { cn } from "@/lib/utilities";

interface InfoModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  action?: () => void;
  onModalClose: () => void;
  actionName?: string;
  isLoading?: boolean;
  buttonColor?: string;
}

export function InfoModal({
  children,
  className,
  title,
  subtitle,
  action,
  actionName = "Submit",
  onModalClose,
  isLoading,
  disabled = false,
  buttonColor,
  ...props
}: InfoModalProps) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex z-50",
        className
      )}
      {...props}
    >
      <div className="fixed flex items-start gap-3 p-4 w-full max-w-2xl max-h-full z-50 2xl:top-[8%] 2xl:left-[32%] lg:top-[5%] lg:left-[25%]">
        {/* <!-- Modal content --> */}
        <div className="relative rounded-xl grow bg-white shadow px-4">
          <div className="p-4 md:p-5">
            <h3 className="text-3xl text-gray-900 font-semibold">{title}</h3>
            <div>
              {subtitle && (
                <p className="m-0 mt-3 text-base text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-4 md:p-5">
            {/* <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={disabled}
                onClick={action}
                >{
                  isLoading ? (<Icons.spinner className="h-4 w-4 animate-spin"/>) : actionName
                }</button> */}
            <button
                type="submit"
                className={cn("inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30", buttonColor, buttonColor && `hover:${buttonColor}/80`)}
                onClick={action}
                disabled={disabled}
              >
                {isLoading ? (
                "loading"
              ) : (
                actionName
              )}
              </button>
          </div>
        </div>
        <div className=" bg-white text-black w-[40px] h-[40px] flex justify-center items-center">
          <button className="w-full h-full p-3 flex justify-center items-center" onClick={onModalClose} data-modal-hide="default-modal">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
