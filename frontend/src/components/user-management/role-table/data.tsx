export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Admin",
      description: "Platform admin",
      assigned_User: 3,
      created_date: "2023-01-13T18:00:00.000Z"
    },
    {
      name: "Staff",
      description: "Company Staff",
      assigned_User: 3,
      created_date: "2023-08-13T18:00:00.000Z"
    },
    {
      name: "User",
      description: "General user",
      assigned_User: 3,
      created_date: "2023-10-13T18:00:00.000Z"
    },
    {
      name: "Visitor",
      description: "visitor",
      assigned_User: 3,
      created_date: "2023-11-13T18:00:00.000Z"
    },
  ];
}
