import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
    const location = useLocation();
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalCount: 0,
    });
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const limit = LIMIT; // 기본값 설정
        fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
            news: params.get(QUERYSTRING.NEWS) === 'true',
            currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
            limit: limit,
        }).then(({ books, pagination }) => {
            console.log('Fetched books:', books); // 추가된 콘솔 로그
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        }).catch(error => {
            console.error('Error fetching books:', error);
        });
    }, [location.search]);

    return { books, pagination, isEmpty };
}
