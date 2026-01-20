import { cn } from "@/lib/utilities";

interface InfoModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  icon?: boolean
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
  icon,
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
        <div className="rounded-xl grow bg-white shadow px-4 max-w-[500px]">
          <div className="flex justify-between items-center">
            <div className="p-4 md:p-5 flex items-center gap-5">
              {
                icon && (
                  <div className="w-12 h-12 border border-slate-200 flex justify-center items-center rounded-lg">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 19V13M15 16H21M11 13H7C5.13623 13 4.20435 13 3.46927 13.3045C2.48915 13.7105 1.71046 14.4892 1.30448 15.4693C1 16.2044 1 17.1362 1 19M14.5 1.29076C15.9659 1.88415 17 3.32131 17 5C17 6.67869 15.9659 8.11585 14.5 8.70924M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z" stroke="#414651" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                )
              }
              <div>
                <h3 className="text-lg text-gray-900 font-semibold">{title}</h3>
                {subtitle && (
                  <p className="m-0 mt-3 text-base text-gray-400">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="w-10 h-10">
              <button className="w-full h-full p-3 flex justify-center items-center cursor-pointer" onClick={onModalClose} data-modal-hide="default-modal">
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
          {/* <!-- Modal body --> */}
          <div className="max-h-[60vh] p-4 overflow-y-scroll md:p-5 space-y-4">{children}</div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center gap-5 p-4 md:p-5">
            {/* <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={disabled}
                onClick={action}
                >{
                  isLoading ? (<Icons.spinner className="h-4 w-4 animate-spin"/>) : actionName
                }</button> */}
            <button
              type="button"
              className={cn("inline-flex w-full items-center justify-center rounded-lg px-5 py-3.75 text-center text-sm font-medium text-black border hover:opacity-50", buttonColor, buttonColor && `hover:${buttonColor}/80`)}
              onClick={onModalClose}
              disabled={disabled}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn("inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-3.75 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30", buttonColor, buttonColor && `hover:${buttonColor}/80`)}
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
      </div>
    </div>
  );
}
