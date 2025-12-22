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
          <dd className="sr-only">
            {label} {isDecreasing ? "Decreased" : "Increased"} by{" "}
            {data.growthRate}%
          </dd>
        </dl>
      </div>
    </div>
  )
}
