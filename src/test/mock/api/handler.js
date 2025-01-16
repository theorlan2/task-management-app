import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/tasks", (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(400),
      ctx.json([
        {
          userId: 1,
          status: "TODO",
          description: "Description for new task.",
          title: "New Task",
          id: 4,
        },
      ]),
      ctx.delay(30),
    );
  }),
];
