import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  return (
    <main className="m-24 rounded-md grid grid-cols-4 gap-12">
      {Array.from({ length: 12 }, (_, i) => i + 1).map(id => (
        <div key={id} className="col-span-4 xl:col-span-2">
          <Skeleton className="h-6 w-1/2 bg-gray-200 mb-2" />
          <Skeleton className="h-6 w-1/4 bg-gray-200 mb-4" />
          <Skeleton className="rounded-md w-full h-40 bg-gray-200" />
        </div>
      ))}
    </main>
  );
}
