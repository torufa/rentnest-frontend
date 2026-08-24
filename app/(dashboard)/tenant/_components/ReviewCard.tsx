import { Star, MapPin } from "lucide-react";

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

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex flex-col sm:flex-row">
        {review.property?.picture ? (
          <img
            src={review.property.picture}
            alt={review.property.propertyName}
            className="h-48 w-full object-cover sm:h-auto sm:w-52"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-muted text-sm text-muted-foreground sm:h-auto sm:w-52">
            No image
          </div>
        )}

        <div className="flex-1 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {review.property?.propertyName ||
                  "Property"}
              </h2>

              {review.property?.location && (
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {review.property.location}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${
                    index < review.rating
                      ? "fill-current text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
}