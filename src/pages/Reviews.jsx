import ReviewForm from "../components/ReviewForm/ReviewsForm";
import ReviewsList from "../components/ReviewList/ReviewsList";


const ReviewsPage = () => (
    <main className="reviews-page">
        <ReviewsList />
        <ReviewForm />
    </main>
);

export default ReviewsPage;
