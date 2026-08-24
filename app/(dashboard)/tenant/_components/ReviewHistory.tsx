import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";

type Review = {
  id: string;
  review: string;
  rating: number;
  status: string;
  property?: {
    propertyName: string;
    picture: string;
    location: string;
  };
};

type ReviewHistoryProps = {
  reviews: Review[];
};

export default function ReviewHistory({
  reviews,
}: ReviewHistoryProps) {
  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="size-6 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No reviews yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          You have not written any reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}