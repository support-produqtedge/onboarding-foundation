import { OverviewCard } from "./card";

export async function OverviewCardsGroup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <OverviewCard
        label="All Users"
        data={{
          value: 100,
          growthRate: 2.4
        }}
      />
      <OverviewCard
        label="All Roles"
        data={{
          value: 100,
          growthRate: 6.2
        }}
      />
      <OverviewCard
        label="Active Users"
        data={{
          value: 100,
          growthRate: 0.8
        }}
      />
    </div>
  )
}
