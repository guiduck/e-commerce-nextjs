import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationsType } from "@/types/locations";

interface LocationsTableProps {
  locations: LocationsType[];
}

export default function LocationsTable({ locations }: LocationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto px-0">
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full text-sm text-left border-collapse">
            <thead className="bg-muted text-muted-foreground">
              <tr className="border-b">
                <th className="p-3 w-1/4">Label</th>
                <th className="p-3 w-1/6 truncate max-w-40">Lat, Long</th>
                <th className="p-3 w-1/2">Atividade</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc, idx) => (
                <tr key={`${idx + 1}`} className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">
                    {loc.label}
                  </td>
                  <td className="p-3 truncate text-muted-foreground max-w-24">
                    {loc.latitude}, <br></br>
                    {loc.longitude}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {loc.activity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
