export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Lily-Rose Chedjou",
      price: "lilyrose@gmail.com",
      role: "Admin",
      date: "2023-01-13T18:00:00.000Z",
      status: "Active",
    },
    {
      name: "Caitlyn King",
      price: 'hi@caitlynking.com',
      role: "User",
      date: "2023-01-13T18:00:00.000Z",
      status: "Inactive",
    },
    {
      name: "Fleur Cook",
      price: 'flourcook@icloud.com',
      role: "Staff",
      date: "2023-01-13T18:00:00.000Z",
      status: "Active",
    },
    {
      name: "Marco Kelly",
      price: "marco@marcokelly.com",
      role: "User",
      date: "2023-01-13T18:00:00.000Z",
      status: "Active",
    },
  ];
}
