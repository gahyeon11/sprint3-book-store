import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/booksList";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Pagination from "../components/books/Pagination";
import Loading from "../components/common/Loading";
import { useBooksInfinite } from "../hooks/useBooksInfinite";
import Button from "../components/common/Button";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  if (isEmpty) {
    return <BooksEmpty />;
  }
  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="button">
          <div className="filter">
            <BooksFilter />
          </div>
          <div className="switch">
            <BooksViewSwitcher />
          </div>
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
      </BooksStyle>
    </div>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;

  .button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .filter {
      padding: 10px 0;
    }

    .switch {
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
  .button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start; /* switch 버튼을 왼쪽에 위치시킴 */

    .filter {
      padding: 10px 0;
    justify-content: space-between;

    }

    .switch {
    align-self: flex-start; /* switch 버튼을 왼쪽 정렬 */
    }
  }
  }
`;

export default Books;
