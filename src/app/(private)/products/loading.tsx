import { Card, CardContent } from "@/components/ui/card";

function ProductCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="flex flex-col gap-4">
        <div className="w-full h-40 bg-muted rounded" />
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-8 bg-muted rounded w-1/2 mt-4" />
        <div className="flex gap-2 mt-auto">
          <div className="h-10 bg-muted rounded w-full" />
          <div className="h-10 bg-muted rounded w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoadingProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i + 1} />
        ))}
      </div>
    </div>
  );
}
