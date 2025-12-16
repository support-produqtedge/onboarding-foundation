import { cn } from "@/lib/utilities";
import InputGroup from './ui/InputGroup';

type AdminAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function AdminAuthForm({ className, ...props }: AdminAuthFormProps) {
  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <InputGroup
                type="email"
                label="Email"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="Enter email"
                name="email"

              />

              <InputGroup
                type="password"
                label="Password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter password"
                name="password"
              />
            </div>

            <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50"

              >
                Sign in
              </button>
          </div>
        </form>
      </div>
    </>
  )
}
