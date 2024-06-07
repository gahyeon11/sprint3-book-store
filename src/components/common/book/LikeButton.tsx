import styled from "styled-components";
import { BookDetail } from "../../../models/book.model";
import Button from "../Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle size="medium" schema={book.liked ? "like" : "normal"}>
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;
   svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
