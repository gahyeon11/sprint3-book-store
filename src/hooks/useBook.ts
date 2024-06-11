import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook } from "../api/books.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    
    const likeToggle = ()=>{
        if(!book) return;

        if(book.liked){

        }else{
            likeBook(book.id).then(()=>{
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                })
            })
        }
    }
    useEffect(() =>{
        if(!bookId) return;

        fetchBook(bookId).then((book)=>{
            setBook(book);
        });

    }, [bookId]);
    return {book, likeToggle};
};