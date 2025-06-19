import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

export default function LocationsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto px-0">
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full text-sm text-left border-collapse">
            <thead className="bg-muted text-muted-foreground">
              <tr className="border-b">
                <th className="p-3 w-1/4">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="p-3 w-1/6">
                  <Skeleton className="h-4 w-32" />
                </th>
                <th className="p-3 w-1/2">
                  <Skeleton className="h-4 w-24" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={`${idx + 1}`} className="border-b">
                  <td className="p-3">
                    <Skeleton className="h-4 w-36 rounded-xs" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-4 w-34 mb-2 rounded-xs" />
                    <Skeleton className="h-4 w-34 rounded-xs" />
                  </td>
                  <td className="p-3">
                    <Skeleton className="h-4 w-full rounded-xs" />
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
