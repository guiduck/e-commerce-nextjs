import ProductCardSkeleton from "@/components/ProductCard/skeleton";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Skeleton from "@/components/ui/skeleton";

export default function LoadingProductPage() {
  return (
    <div className="p-6 space-y-8">
      <Skeleton className="w-40 h-10" />

      <Card className="p-4 space-y-4 border rounded">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="w-full h-40" />
        <div>
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-4/5" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-1/6" />
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Produtos relacionados</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 9 }).map((_, i) => (
              <CarouselItem key={i + 1} className="basis-2/3 md:basis-2/7">
                <ProductCardSkeleton key={i + 1} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
