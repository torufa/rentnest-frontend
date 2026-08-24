import Image from "next/image";
import { Building2 } from "lucide-react";
import { Property } from "@/lib/types";

export default function AdminPropertyTable({
  properties,
}: {
  properties: Property[];
}) {
    console.log(properties, "chekcjsdlkfjkljf")
  if (!properties || !properties.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <Building2 className="mx-auto size-8 text-muted-foreground" />

        <h2 className="mt-4 font-semibold">
          No properties found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no properties to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-5 py-4 text-left font-medium">
                Property
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Location
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Price
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                      {property.picture ? (
                        <img
                          src={property.picture}
                          alt={property.propertyName}
                          className="object-cover"
                        />
                      ) : (
                        <Building2 className="size-5 text-muted-foreground" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium">
                        {property.propertyName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {property.description?.slice(0, 45)}
                        {property.description && property.description.length > 45 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  {property.location}
                </td>

                <td className="px-5 py-4">
                  ৳{property.price}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
                    {property.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}