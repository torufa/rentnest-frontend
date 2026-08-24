"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createLandlordProperty,
  updateLandlordProperty,
} from "../../_actions/landlord";

import type {
  CreatePropertyData,
  PropertyStatus,
  UpdatePropertyData,
} from "@/lib/types";

type Category = {
  id: string;
  categoryName: string;
};

type Property = {
  id: string;
  propertyName: string;
  picture: string | null;
  description: string;
  amenities: string[];
  location: string;
  price: string;
  status: PropertyStatus;
  categoryId: string;
};

type PropertyFormProps = {
  categories: Category[];
  mode?: "create" | "edit";
  propertyId?: string;
  property?: Property;
};

export default function PropertyForm({
  categories,
  mode = "create",
  propertyId,
  property,
}: PropertyFormProps) {
  const router = useRouter();

  const isEditMode = mode === "edit";

  const [isLoading, setIsLoading] = useState(false);

  const [propertyName, setPropertyName] = useState(
    property?.propertyName ?? "",
  );

  const [picture, setPicture] = useState(
    property?.picture ?? "",
  );

  const [description, setDescription] = useState(
    property?.description ?? "",
  );

  const [location, setLocation] = useState(
    property?.location ?? "",
  );

  const [price, setPrice] = useState(
    property?.price ?? "",
  );

  const [amenities, setAmenities] = useState(
    property?.amenities?.join(", ") ?? "",
  );

  const [categoryId, setCategoryId] = useState(
    property?.categoryId ?? "",
  );

  const [status, setStatus] =
    useState<PropertyStatus>(
      property?.status ?? "AVAILABLE",
    );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!propertyName.trim()) {
      toast.error("Property name is required.");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    const amenitiesArray = amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      setIsLoading(true);

      if (isEditMode) {
        if (!propertyId) {
          toast.error("Property ID is missing.");
          return;
        }

        const propertyData: UpdatePropertyData = {
          propertyName: propertyName.trim(),
          description: description.trim(),
          location: location.trim(),
          amenities: amenitiesArray,
          price: Number(price),
          status,
          categoryId,
          ...(picture.trim() && {
            picture: picture.trim(),
          }),
        };

        const res = await updateLandlordProperty(
          propertyId,
          propertyData,
        );

        if (!res?.success) {
          toast.error(
            res?.message || "Failed to update property.",
          );
          return;
        }

        toast.success(
          res?.message ||
            "Property updated successfully.",
        );
      } else {
        const propertyData: CreatePropertyData = {
          propertyName: propertyName.trim(),
          description: description.trim(),
          location: location.trim(),
          amenities: amenitiesArray,
          price: Number(price),
          status,
          categoryId,
          ...(picture.trim() && {
            picture: picture.trim(),
          }),
        };

        const res =
          await createLandlordProperty(propertyData);

        if (!res?.success) {
          toast.error(
            res?.message ||
              "Failed to create property.",
          );
          return;
        }

        toast.success(
          res?.message ||
            "Property created successfully.",
        );
      }

      router.push("/landlord/properties");
      router.refresh();
    } catch {
      toast.error(
        isEditMode
          ? "Failed to update property."
          : "Failed to create property.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">

        {/* Property Name */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="propertyName"
            className="text-sm font-medium"
          >
            Property Name
          </label>

          <Input
            id="propertyName"
            placeholder="e.g. Single Bedroom Flat"
            value={propertyName}
            onChange={(e) =>
              setPropertyName(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        {/* Property Image */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="picture"
            className="text-sm font-medium"
          >
            Property Image
          </label>

          <Input
            id="picture"
            type="url"
            placeholder="https://example.com/property-image.jpg"
            value={picture}
            onChange={(e) =>
              setPicture(e.target.value)
            }
            disabled={isLoading}
          />

          <p className="text-xs text-muted-foreground">
            Enter the image URL of your property.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="description"
            className="text-sm font-medium"
          >
            Description
          </label>

          <Textarea
            id="description"
            placeholder="Describe your property..."
            className="min-h-32 resize-none"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium"
          >
            Location
          </label>

          <Input
            id="location"
            placeholder="e.g. Khulna"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label
            htmlFor="price"
            className="text-sm font-medium"
          >
            Monthly Rent
          </label>

          <Input
            id="price"
            type="number"
            min="1"
            placeholder="e.g. 8500"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Category
          </label>

          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Status
          </label>

          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as PropertyStatus)
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="AVAILABLE">
                Available
              </SelectItem>

              <SelectItem value="RENTED">
                Rented
              </SelectItem>

              <SelectItem value="UNAVAILABLE">
                Unavailable
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="amenities"
            className="text-sm font-medium"
          >
            Amenities
          </label>

          <Input
            id="amenities"
            placeholder="WiFi, Gas, Lift"
            value={amenities}
            onChange={(e) =>
              setAmenities(e.target.value)
            }
            disabled={isLoading}
          />

          <p className="text-xs text-muted-foreground">
            Separate multiple amenities with commas.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          asChild
          disabled={isLoading}
        >
          <Link href="/landlord/properties">
            Cancel
          </Link>
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Property"
              : "Create Property"}
        </Button>
      </div>
    </form>
  );
}