import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatNumber, formatDate } from "../utils/format";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";
import BookReview from "../components/book/BookReview";
import { Tabs, Tab } from "../../src/components/common/Tabs";
import Modal from "../components/common/Modal";
import { useState } from "react";

const bookInfoList = [
  {
    label: "카테고리",
    key: "categoryName",
    filter: (book: IBookDetail) => (
      <Link to={`/books?categoryId=${book.categoryId}`}>
        {book.categoryName}
      </Link>
    ),
  },
  {
    label: "포멧",
    key: "form",
  },
  {
    label: "페이지",
    key: "page",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "출간일",
    key: "pubDate",
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    },
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);

  const [isImgOpen, SetIsImgOpen] = useState(false);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => SetIsImgOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => SetIsImgOpen(false)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>

          {bookInfoList.map((item) => (
            <dl>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary"> {book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox lineLimit={4}> {book.detail}</EllipsisBox>
          </Tab>

          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index"> {book.contents}</p>
          </Tab>

          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
}
const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: flex-start; /* 'start' 대신 'flex-start' 사용 */
    gap: 24px;
    padding-bottom: 24px;

    > div {
      position: relative !important;
    }
  }

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;

    dl {
      display: flex;
      flex-direction: column; /* 필요에 따라 flex-direction 설정 */
      margin: 0;
      dt {
        width: 80px;
        color: ${({ theme }) => theme.color.secondary};
      }
      dd {
        margin: 0; /* dd 요소도 스타일링 */
      }
      a {
        color: ${({ theme }) => theme.color.primary};
        text-decoration: none; /* 필요에 따라 링크 스타일 설정 */
        &:hover {
          text-decoration: underline; /* 필요에 따라 호버 스타일 설정 */
        }
      }
    }
  }

  .content {
    /* 필요에 따라 스타일 추가 */
  }
`;

export default BookDetail;
