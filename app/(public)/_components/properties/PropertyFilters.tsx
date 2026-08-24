"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

const amenities = [
  "WiFi",
  "Gas",
  "Parking",
  "Lift",
  "Generator",
  "24/7 Security",
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentLocation = searchParams.get("location") || "";

      if (location === currentLocation) {
        return;
      }

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (location.trim()) {
        params.set("location", location.trim());
      } else {
        params.delete("location");
      }

      params.set("page", "1");

      router.replace(`/properties?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, router, searchParams]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.replace(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocation("");

    router.replace("/properties");
  };

  return (
    <aside className="h-fit rounded-2xl border bg-background p-5 lg:sticky lg:top-24">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-semibold">
          Search & Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <X className="size-3.5" />
          Clear
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="text-xs font-medium">
          Search location
        </label>

        <div className="mt-2 flex overflow-hidden rounded-lg border">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Dhaka"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />

          <div className="flex items-center px-3 text-muted-foreground">
            <Search className="size-4" />
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="mt-5">
        <label className="text-xs font-medium">
          Category
        </label>

        <select
          value={searchParams.get("category") || ""}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">All categories</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Apartment">Apartment</option>
          <option value="Family">Family</option>
        </select>
      </div>

      {/* Min Price */}
      <div className="mt-5">
        <label className="text-xs font-medium">
          Minimum price
        </label>

        <input
          type="number"
          value={searchParams.get("minPrice") || ""}
          onChange={(e) =>
            updateFilter("minPrice", e.target.value)
          }
          placeholder="8000"
          className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Max Price */}
      <div className="mt-4">
        <label className="text-xs font-medium">
          Maximum price
        </label>

        <input
          type="number"
          value={searchParams.get("maxPrice") || ""}
          onChange={(e) =>
            updateFilter("maxPrice", e.target.value)
          }
          placeholder="50000"
          className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Status */}
      <div className="mt-5">
        <label className="text-xs font-medium">
          Status
        </label>

        <select
          value={searchParams.get("status") || ""}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">All status</option>
          <option value="AVAILABLE">Available</option>
          <option value="RENTED">Rented</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mt-5">
        <label className="text-xs font-medium">
          Sort by
        </label>

        <select
          value={searchParams.get("sortOrder") || ""}
          onChange={(e) =>
            updateFilter("sortOrder", e.target.value)
          }
          className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">Latest</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="mt-5">
        <label className="text-xs font-medium">
          Amenities
        </label>

        <div className="mt-3 space-y-2">
          {amenities.map((amenity) => {
            const current = searchParams.get("amenities");

            let selected = false;

            try {
              selected = current
                ? JSON.parse(current).includes(amenity)
                : false;
            } catch {
              selected = false;
            }

            return (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => {
                    const params = new URLSearchParams(
                      searchParams.toString()
                    );

                    let values: string[] = [];

                    try {
                      values = current
                        ? JSON.parse(current)
                        : [];
                    } catch {
                      values = [];
                    }

                    if (e.target.checked) {
                      values.push(amenity);
                    } else {
                      values = values.filter(
                        (item) => item !== amenity
                      );
                    }

                    if (values.length) {
                      params.set(
                        "amenities",
                        JSON.stringify(values)
                      );
                    } else {
                      params.delete("amenities");
                    }

                    params.set("page", "1");

                    router.replace(
                      `/properties?${params.toString()}`
                    );
                  }}
                />

                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}