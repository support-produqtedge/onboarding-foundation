import { OverviewCard } from "./card";

interface OverviewCardsGroupProps {
  noOfUsers: number;
  noOfRoles: number;
  noOfActiveUser: number;
}

export async function OverviewCardsGroup({noOfUsers, noOfRoles, noOfActiveUser}: OverviewCardsGroupProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <OverviewCard
        label="All Users"
        data={{
          value: noOfUsers,
          growthRate: 2.4
        }}
      />
      <OverviewCard
        label="All Roles"
        data={{
          value: noOfRoles,
          growthRate: 6.2
        }}
      />
      <OverviewCard
        label="Active Users"
        data={{
          value: noOfActiveUser,
          growthRate: 0.8
        }}
      />
    </div>
  )
}
