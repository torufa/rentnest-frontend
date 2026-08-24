import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getLandlordProperties } from "../../../_actions/landlord";
import { getCategories } from "../../../../../(public)/_actions/categories";
import PropertyForm from "../../../_components/landlord/PropertyForm";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const [propertiesRes, categoriesRes] = await Promise.all([
    getLandlordProperties(),
    getCategories(),
  ]);

  const properties = propertiesRes?.data?.result?.result ?? [];

  const property = properties.find((item: { id: string }) => item.id === id);

  const categories = categoriesRes?.data?.result?.categories ?? [];

  if (!property) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-10 lg:px-8">
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h1 className="text-xl font-semibold">Property not found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The property you are trying to edit could not be found.
          </p>

          <Button asChild className="mt-6">
            <Link href="/landlord/properties">Back to Properties</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/landlord/properties">
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Link>
        </Button>

        <div className="mt-6">
          <p className="text-sm font-medium text-primary">Landlord Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the information of your property listing.
          </p>
        </div>
      </div>

      <PropertyForm
        mode="edit"
        propertyId={id}
        property={property}
        categories={categories}
      />
    </main>
  );
}
