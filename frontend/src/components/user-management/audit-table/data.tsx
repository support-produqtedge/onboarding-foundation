export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      actor: "Jessie Roy",
      action: "Password Change",
      date: "2023-01-13T18:00:00.000Z",
      description: "Change profile password",
    },
    {
      actor: "Cody Fisher",
      action: "Password Change",
      date: "2023-01-13T18:00:00.000Z",
      description: "Change profile password",
    },
    {
      actor: "Marvin McKinney",
      action: "Password Change",
      date: "2023-01-13T18:00:00.000Z",
      description: "Change profile password",
    },
    {
      actor: "Esther Howard",
      action: "Password Change",
      date: "2023-12-09T18:00:00.000Z",
      description: "Change profile password",
    },
  ];
}
