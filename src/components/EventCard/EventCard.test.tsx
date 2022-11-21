/**
 * @file    EventCard behavior test
 */

// External Imports
import { render, screen } from "@testing-library/react";

// Internal Imports
import EventCard from "./EventCard";

describe("EventCard", () => {
  it("Renders organization image if prop exists", () => {
    render(
      <EventCard
        type="string"
        repo={{
          id: 1,
          name: "name",
          url: "url",
        }}
        org={{
          avatar_url: "avatar_url",
          login: "login",
        }}
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "avatar_url");
  });

  it("Renders default image if prop dose not exists", () => {
    render(
      <EventCard
        type="string"
        repo={{
          id: 1,
          name: "name",
          url: "url",
        }}
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "github.svg");
  });
});
