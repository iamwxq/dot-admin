import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("https://examples.com/user", () => {
    return HttpResponse.json({
      id: "123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
