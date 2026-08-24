import Link from "next/link";

type SearchParams = {
  page?: string;
  searchTerm?: string;
  location?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  price?: string;
  status?: string;
  amenities?: string;
  sortOrder?: string;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
};

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Properties pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {Array.from(
        { length: totalPages },
        (_, index) => {
          const page = index + 1;

          const query = new URLSearchParams();

          Object.entries(searchParams).forEach(
            ([key, value]) => {
              if (
                value &&
                key !== "page"
              ) {
                query.set(key, value);
              }
            }
          );

          query.set(
            "page",
            String(page)
          );

          return (
            <Link
              key={page}
              href={`/properties?${query.toString()}`}
              className={`flex size-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                currentPage === page
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {page}
            </Link>
          );
        }
      )}
    </nav>
  );
}