import { getReviews } from "../../_actions/review";
import ReviewHistory from "../../_components/ReviewHistory";


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

export default async function TenantReviewsPage() {

  const res = await getReviews();

  const reviews: Review[] = res.data?.result?.result?.rentalRequests ?? [];
  console.log(reviews, "dkfjkdsjfkf")

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Review History
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          See all the reviews you have shared about properties.
        </p>
      </div>

      {/* Reviews */}
      <ReviewHistory reviews={reviews} />
    </main>
  );
}