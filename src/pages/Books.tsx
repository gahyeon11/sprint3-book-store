import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/common/books/BooksFilter";
import BooksList from "../components/common/books/booksList";
import BooksEmpty from "../components/common/books/BooksEmpty";
import BooksViewSwitcher from "../components/common/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Pagination from "../components/common/books/Pagination";
import Button from "../components/common/Button";
function Books() {
  const { books, pagination, isEmpty } = useBooks();
  return (
    <div>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {!isEmpty && <BooksList books={books} />}
        {isEmpty && <BooksEmpty />}
        {!isEmpty && <Pagination pagination={pagination} />}
        {/* <BooksList books={books} />
        <BooksEmpty />
        <Pagination pagination={pagination} /> */}
      </BooksStyle>
    </div>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
