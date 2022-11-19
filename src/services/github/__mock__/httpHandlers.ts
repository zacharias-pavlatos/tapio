/**
 * @file http Handlers file
 */

// External imports
import { rest } from "msw";

// Internal imports
import user from "./data/user.data.json";
import userEvents from "./data/userEvents.data.json";
import notFound from "./data/notFound.data.json";

export const handlers = [
  /*
   *   Handles a GET /users request
   */
  rest.get(`https://api.github.com/users/zak`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(user));
  }),

  // Bad request
  rest.get(
    `https://api.github.com/users/name_that_dose_not_exists`,
    (_req, res, ctx) => {
      return res(ctx.delay(200), ctx.status(404), ctx.json(notFound));
    }
  ),

  /*
   *   Handles a GET /users/{name}/events request
   */
  rest.get(`https://api.github.com/users/zak/events`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(userEvents));
  }),

  // Bad request
  rest.get(
    `https://api.github.com/users/name_that_dose_not_exists/events`,
    (_req, res, ctx) => {
      return res(ctx.delay(200), ctx.status(404), ctx.json(notFound));
    }
  ),
];
