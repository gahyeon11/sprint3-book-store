import { render } from "@testing-library/react";
import React from "react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../../context/themeContext";

const dummyBook = {
  id: 1,
  title: "Dummy Book",
  img: 5,
  category_id: 1,
  form: "paperback",
  isbn: "Dummy ISBN",
  summary: "Summary",
  detail: "Detail",
  author: "Dummy Author",
  pages: 100,
  contents: "Contents",
  price: 10000,
  likes: 1,
  pubDate: "2024-06-04",
};
describe("BookItem", () => {
  it("렌더 여부", () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("10,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    // expect(getByAltText(dummyBook.title)).toHaveAttribute(
    //   "src",
    //   `https://picsum.photos/id/${dummyBook.img}/600/600`
    // );
  });
});
