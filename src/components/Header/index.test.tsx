import { render, screen } from "@testing-library/react";
import LocationsTable from "@/components/LocationsTable";

const mockLocations = [
  {
    label: "Warehouse Alpha",
    latitude: 40.712,
    longitude: -74.006,
    activity: "Storage",
  },
  {
    label: "Warehouse Beta",
    latitude: 34.0522,
    longitude: -118.2437,
    activity: "Distribution",
  },
];

describe("LocationsTable", () => {
  it("renders all location rows", () => {
    render(<LocationsTable locations={mockLocations} />);

    expect(screen.getByText("Warehouse Alpha")).toBeInTheDocument();
    expect(screen.getByText("Warehouse Beta")).toBeInTheDocument();

    expect(screen.getByText("Storage")).toBeInTheDocument();
    expect(screen.getByText("Distribution")).toBeInTheDocument();

    expect(screen.getByText(/40.712/i)).toBeInTheDocument();
    expect(screen.getByText(/-74.006/i)).toBeInTheDocument();
  });

  it("shows table headers", () => {
    render(<LocationsTable locations={mockLocations} />);
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Lat, Long")).toBeInTheDocument();
    expect(screen.getByText("Atividade")).toBeInTheDocument();
  });
});
