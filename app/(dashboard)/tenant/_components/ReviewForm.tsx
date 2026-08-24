"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { createReview } from "../_actions/review";

type ReviewFormProps = {
  rentalRequestId: string;
  property: {
    propertyName: string;
    picture?: string | null;
    location: string;
  };
};

export default function ReviewForm({
  rentalRequestId,
  property,
}: ReviewFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await createReview({
        rentalRequestId,
        review: review.trim(),
        rating,
      });

      if (!res?.success) {
        toast.error(
          res?.message || "Unable to submit review.",
        );
        return;
      }

      toast.success("Review submitted successfully.");
      router.push("/tenant/requests/reviews/");

      setRating(0);
      setReview("");

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
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* Property */}
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row">
        {property.picture ? (
          <img
            src={property.picture}
            alt={property.propertyName}
            className="h-28 w-full rounded-xl object-cover sm:w-40"
          />
        ) : (
          <div className="flex h-28 w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground sm:w-40">
            No image
          </div>
        )}

        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold">
            {property.propertyName}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {property.location}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6"
      >
        {/* Rating */}
        <div>
          <label className="text-sm font-medium">
            Your Rating
          </label>

          <div className="mt-3 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const star = index + 1;

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="rounded-md p-1 transition hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`size-7 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {rating > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              You rated this property {rating} out of 5.
            </p>
          )}
        </div>

        {/* Review */}
        <div>
          <label
            htmlFor="review"
            className="text-sm font-medium"
          >
            Your Review
          </label>

          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this property..."
            className="mt-2 min-h-32 resize-none"
            maxLength={1000}
          />

          <p className="mt-2 text-right text-xs text-muted-foreground">
            {review.length}/1000
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </div>
  );
}