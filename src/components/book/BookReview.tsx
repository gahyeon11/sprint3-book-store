import { BookReviewItem, BookReviewItemWrite } from "../../models/book.model";
import styled from "styled-components";
import ReviewItem from "./ReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface Props {
  reviews: BookReviewItem[];
  onAdd: (review: BookReviewItemWrite) => void;
}


function BookReview({ reviews , onAdd}: Props) {
  return (
    <BookReviewStyle>
        <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <ReviewItem review={review} />
      ))}
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
display: flex;
flex-direction: column;
gap: 16px;
`;

export default BookReview;
