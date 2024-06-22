import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div className="quantity-control">
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
      </div>
      <div className="addCart">
        <Button
          size="medium"
          scheme="primary"
          onClick={() => addToCart(quantity)}
        >
          장바구니 담기
        </Button>
      </div>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/Cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;

  .quantity-control {
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 7px;

    input {
      text-align: center;
      width: 50px;
    }
  }

  .addCart {
    margin-top: 16px;
  }

  .added {
    position: absolute;
    right: 50px;
    bottom: 0px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};
    transition: all 0.5s ease;
    z-index: 100;  // 높은 z-index 설정

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    flex-direction: column;
    align-items: stretch;

    .quantity-control {
      justify-content: center;
      width: 100%;
    }

    .addCart {
      width: 100%;

      button {
        width: 100%;
      }
    }

    .added {
      left: 150px;
      bottom: 0px;
      transform: translateX(0%);
      // transform: translateX(0%);

      width: 150px;
      text-align: center;
    }
      
  }
`;

export default AddToCart;
