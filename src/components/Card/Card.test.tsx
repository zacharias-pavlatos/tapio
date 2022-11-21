/**
 * @file    Card behavior test
 */

// External Imports
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Internal Imports
import Card from "./Card";

describe("Card", () => {
  it("Should be in the document", () => {
    render(
      <MemoryRouter>
        <Card
          id="id"
          name="name"
          image="image"
          reposNumber={1}
          gistsNumber={1}
          followers={1}
          following={1}
          gitHubUrl="url"
        />
      </MemoryRouter>
    );
    expect(screen.getByText("(name)")).toBeInTheDocument();
  });
});
