import { getAllProperties } from "../_actions/property";
import Pagination from "../_components/properties/Pagination";
import PropertyCard from "../_components/properties/PropertyCard";
import PropertyFilters from "../_components/properties/PropertyFilters";

type SearchParams = {
  page?: string;
  searchTerm?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  status?: string;
  amenities?: string;
  sortOrder?: string;
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 9;

  const query = new URLSearchParams();

  query.set("page", "1");
  query.set("limit", "10000");

  if (params.searchTerm) {
    query.set("searchTerm", params.searchTerm);
  }

  if (params.category) {
    query.set("category", params.category);
  }

  if (params.minPrice) {
    query.set("minPrice", params.minPrice);
  }

  if (params.maxPrice) {
    query.set("maxPrice", params.maxPrice);
  }

  if (params.price) {
    query.set("price", params.price);
  }

  if (params.status) {
    query.set("status", params.status);
  }

  if (params.sortOrder) {
    query.set("sortOrder", params.sortOrder);
  }

  if (params.amenities) {
    query.set("amenities", params.amenities);
  }

  const res = await getAllProperties(query.toString());

  const allProperties = res?.data?.result?.property ?? [];

  /*
   * Frontend pagination
   */
  const total = allProperties.length;

  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const properties = allProperties.slice(
    startIndex,
    endIndex
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          RentNest Properties
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Find your perfect place
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Browse available properties and find a place that feels right.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <PropertyFilters />

        {/* Properties */}
        <div>
          {properties.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {properties.map((property: any) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                searchParams={params}
              />
            </>
          ) : (
            <div className="flex min-h-75 items-center justify-center rounded-2xl border bg-muted/30">
              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  No properties found
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}