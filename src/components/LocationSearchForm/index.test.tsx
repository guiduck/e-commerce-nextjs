import { render, screen, fireEvent } from "@testing-library/react";
import { LocationSearchForm } from "./index";

describe("LocationSearchForm (light UI test)", () => {
  it("submits manually typed coordinates", () => {
    const mockSearch = jest.fn();

    render(<LocationSearchForm handleSearchLocations={mockSearch} />);

    const input = screen.getByPlaceholderText(/latitude/i);
    const submit = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "12.34,56.78" } });
    fireEvent.click(submit);

    expect(mockSearch).toHaveBeenCalledWith("12.34,56.78");
  });

  it("uses current location when selected", () => {
    const mockSearch = jest.fn();

    const mockGeolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementation((success) =>
          success({ coords: { latitude: 1.23, longitude: 4.56 } })
        ),
    };

    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;

    render(<LocationSearchForm handleSearchLocations={mockSearch} />);

    const radio = screen.getByLabelText(/localização atual/i);
    fireEvent.click(radio);

    const submit = screen.getByRole("button", { name: /buscar/i });
    fireEvent.click(submit);

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith("1.23,4.56");
  });
});
