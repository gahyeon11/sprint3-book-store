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

  const [isImgOpen, setIsImgOpen] = useState(false);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsImgOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>

          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="actions">
            <div className="like">
              <LikeButton book={book} onClick={likeToggle} />
            </div>
            <div className="add-cart">
              <AddToCart book={book} />
            </div>
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
          </Tab>

          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.contents}</p>
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
    align-items: flex-start;
    gap: 24px;
    padding-bottom: 24px;

    > div {
      position: relative !important;
    }
  }

  .img {
    flex: 1;
    img {
      margin-top: 50px;
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
      flex-direction: column;
      margin: 0;
      dt {
        width: 80px;
        color: ${({ theme }) => theme.color.secondary};
      }
      dd {
        margin: 0;
      }
      a {
        color: ${({ theme }) => theme.color.primary};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .add-cart {
      align-items: flex-start;
      z-index: 1;
    }

    // .actions {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-between;
    //   gap: 12px;

    //   .add-cart {
    //     margin-top: -55px;
    //   }
    // }
  }

  .content {
    top: -70px;
    position: relative;
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    .header {
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding-bottom: 16px;
    }

    .img {
      img {
        margin-top: 10px;
      }
    }

    .info {
      align-items: flex-start;
      text-align: left;
      width: 100%;

      dl {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;

        dt,
        dd {
          width: auto;
          flex-basis: calc(50% - 10px); /* Half width minus gap */
        }

        dt {
          padding-right: 8px;
        }

        dd {
          margin-bottom: 8px; /* Add space between rows */
        }
      }
    }

    .img {
      width: 80%;
    }

    .actions {
      position: relative;
      z-index: 0;

      .add-cart {
        z-index: 1;
      }
    }
  }
  .content {
    top: 0px;

  }
`;

export default BookDetail;
