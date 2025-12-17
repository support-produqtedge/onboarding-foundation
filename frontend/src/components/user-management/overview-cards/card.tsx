import { cn } from "@/lib/utilities";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  }
}

export function OverviewCard({ label, data }: PropsType) {
  const isDecreasing = data.growthRate < 0;
  return (
    <div className="rounded-[10px] border border-gray-300 bg-dark p-6 shadow-1">
      <div className="flex items-center justify-between">
        <dl>
          <dd className="text-sm font-medium text-dark-6 mb-5">{label}</dd>
          <dt className="text-xl font-bold text-dark">
            {data.value}
          </dt>
        </dl>

        <dl
          className={cn(
            "text-sm font-medium border border-slate-200 rounded p-1",
            isDecreasing ? "text-red" : "text-green",
          )}
        >
          <dt className="flex items-center gap-1.5">
            {data.growthRate}%
            {isDecreasing ? (
              <svg
                width={10}
                height={10}
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path d="M4.357 2.393L.91 5.745 0 4.861 5 0l5 4.861-.909.884-3.448-3.353V10H4.357V2.393z" />
              </svg>
            ) : (
              <svg
                width={10}
                height={10}
                viewBox="0 0 10 10"
                fill="currentColor"

              >
                <path d="M5.643 7.607L9.09 4.255l.909.884L5 10 0 5.139l.909-.884 3.448 3.353V0h1.286v7.607z" />
              </svg>
            )}
          </dt>

          <dd className="sr-only">
            {label} {isDecreasing ? "Decreased" : "Increased"} by{" "}
            {data.growthRate}%
          </dd>
        </dl>
      </div>
    </div>
  )
}
