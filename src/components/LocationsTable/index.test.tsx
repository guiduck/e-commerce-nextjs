import { render, screen } from "@testing-library/react";
import LocationsTable from "@/components/LocationsTable";

const mockLocations = [
  {
    label: "Warehouse A",
    latitude: 10.1234,
    longitude: -20.5678,
    activity: "Shipping",
  },
  {
    label: "Warehouse B",
    latitude: 15.0,
    longitude: -25.0,
    activity: "Storage",
  },
];

describe("LocationsTable", () => {
  it("renders the table with location data", () => {
    render(<LocationsTable locations={mockLocations} />);

    expect(screen.getByText("Resultados")).toBeInTheDocument();
    expect(screen.getByText("Warehouse A")).toBeInTheDocument();
    expect(screen.getByText("Warehouse B")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Storage")).toBeInTheDocument();
  });
});
