/**
 * @file    SearchBar behavior test
 */

// External Imports
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

// Internal Imports
import SearchBar from "./SearchBar";

const onSearch = jest.fn(() => {});

describe("EventCard", () => {
  it("Should call the callBack", () => {
    render(
      <SearchBar
        placeholder="Search here..."
        buttonText="search"
        onSearch={onSearch}
      />
    );

    const input = screen.getByPlaceholderText(
      "Search here..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test" } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(input.value).toBe("test");
    expect(onSearch).toHaveBeenCalledWith("test");
  });

  it("Should trim the returned value", () => {
    render(
      <SearchBar
        placeholder="Search here..."
        buttonText="search"
        onSearch={onSearch}
      />
    );

    const input = screen.getByPlaceholderText(
      "Search here..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "   test    " } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(input.value).toBe("   test    ");
    expect(onSearch).toHaveBeenCalledWith("test");
  });

  it("Should not be an empty string", () => {
    render(
      <SearchBar
        placeholder="Search here..."
        buttonText="search"
        onSearch={onSearch}
      />
    );

    const input = screen.getByPlaceholderText(
      "Search here..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "   " } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(input.value).toBe("");
    expect(onSearch).not.toHaveBeenCalled();
  });
});
