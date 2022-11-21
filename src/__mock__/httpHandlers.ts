import { rest } from "msw";
import user from "./data/user.data.json";
import userEvents from "./data/userEvents.data.json";
import notFound from "./data/notFound.data.json";
import rateLimitExceeded from "./data/rateLimitExceeded.json";

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

  // Rate limit
  rest.get(`https://api.github.com/users/rate_limit`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(403), ctx.json(rateLimitExceeded));
  }),

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

  // Rate limit
  rest.get(
    `https://api.github.com/users/rate_limit/events`,
    (_req, res, ctx) => {
      return res(ctx.delay(200), ctx.status(403), ctx.json(rateLimitExceeded));
    }
  ),
];
