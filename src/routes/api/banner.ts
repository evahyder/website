import type { RequestHandler } from "@sveltejs/kit";

const startDate = new Date("7:00 AM, 24 February, 2022");
const endDate = new Date("7:00 AM, 24 March, 2022");

export const get: RequestHandler = async () => {
  const defaultResponse = {
    startDate,
    endDate,
  };
  const currentDate = new Date();

  if (currentDate > startDate && endDate > currentDate) {
    const returnBody = { ...defaultResponse, ...{ display: true } };
    return { status: 200, body: returnBody };
  }
  const returnBody = {
    ...defaultResponse,
    ...{ display: false },
  };
  return { status: 200, body: returnBody };
};
