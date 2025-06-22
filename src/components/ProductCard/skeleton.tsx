import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden hover:border-primary transition-colors">
      <CardContent className="flex flex-col gap-2 px-6 h-full">
        <Skeleton className="w-full h-40 rounded" />

        <Skeleton className="h-5 w-3/4 mt-2" />

        <Skeleton className="h-5 w-20 my-1 rounded-full" />

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <Skeleton className="h-6 w-1/4 my-2" />

        <div className="flex justify-end gap-2 mt-auto">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
