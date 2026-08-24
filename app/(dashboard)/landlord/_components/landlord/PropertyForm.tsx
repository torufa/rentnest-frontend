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

import { createLandlordProperty } from "../../_actions/landlord";

import type {
  CreatePropertyData,
  PropertyStatus,
} from "@/lib/types";

type Category = {
  id: string;
  categoryName: string;
};

type PropertyFormProps = {
  categories: Category[];
};

export default function PropertyForm({
  categories,
}: PropertyFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [status, setStatus] =
    useState<PropertyStatus>("AVAILABLE");

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

    try {
      setIsLoading(true);

      const res = await createLandlordProperty(propertyData);

      if (!res?.success) {
        toast.error(
          res?.message || "Failed to create property.",
        );
        return;
      }

      toast.success(
        res?.message || "Property created successfully.",
      );

      router.push("/landlord/properties");
      router.refresh();
    } catch {
      toast.error(
        "Something went wrong. Please try again.",
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

        {/* Monthly Rent */}
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
          {isLoading ? "Creating..." : "Create Property"}
        </Button>
      </div>
    </form>
  );
}