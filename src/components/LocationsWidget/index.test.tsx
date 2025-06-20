import { render, screen } from "@testing-library/react";
import LocationsWidget from "./index";

jest.mock("@/services/locations/getLocations", () => ({
  getLocations: jest.fn(),
}));

jest.mock("@/stores/useLocationsStore", () => ({
  useLocationsStore: jest.fn(() => ({
    locations: [],
    setLocations: jest.fn(),
  })),
}));

jest.mock("@/components/LocationSearchForm", () => ({
  LocationSearchForm: ({ handleSearchLocations }: any) => (
    <div
      data-testid="search-form"
      onClick={() => handleSearchLocations("test-origin")}
    >
      Mock LocationSearchForm
    </div>
  ),
}));

jest.mock("@/components/WorldMap", () => () => (
  <div data-testid="world-map">Mock WorldMap</div>
));

jest.mock("@/components/LocationsTable", () => () => (
  <div data-testid="locations-table">Mock LocationsTable</div>
));

jest.mock("@/components/LocationsTable/skeleton", () => () => (
  <div data-testid="locations-table-skeleton">Mock Skeleton</div>
));

jest.mock("@/components/ui/skeleton", () => () => (
  <div data-testid="ui-skeleton">Mock UI Skeleton</div>
));

describe("LocationsWidget", () => {
  it("renders the form and fallback message when no locations", () => {
    render(<LocationsWidget />);

    expect(screen.getByTestId("search-form")).toBeInTheDocument();

    expect(
      screen.getByText(/sem localizações carregadas/i)
    ).toBeInTheDocument();
  });
});
