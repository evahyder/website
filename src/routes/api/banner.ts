import type { RequestHandler } from "@sveltejs/kit";

const startDate = new Date("7:00 AM, 24 February, 2022");
const endDate = new Date("7:00 AM, 24 March, 2022");

export const get: RequestHandler = async () => {
  const currentDate = new Date();

  const display = currentDate > startDate && endDate > currentDate;

  return {
    status: 200,
    headers: { "content-type": "application/json" },
    body: { display, startDate, endDate },
  };
};
