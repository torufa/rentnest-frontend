import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCategories } from "../../../../(public)/_actions/categories";
import PropertyForm from "../../_components/landlord/PropertyForm";

export default async function CreatePropertyPage() {
  const res = await getCategories();

  const categories = res?.data?.result.categories ?? [];

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
            Add Property
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a new property listing for your tenants.
          </p>
        </div>
      </div>

      <PropertyForm categories={categories} />
    </main>
  );
}
