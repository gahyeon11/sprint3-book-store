import { useState, useEffect } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location= useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  const setActive = ()=>{
    const parmas = new URLSearchParams(location.search);
    if(parmas.get('category_id')){
      setCategory((prev)=>{
        return prev.map((item)=>{
          return {
            ...item,
            isActive: item.category_id === Number(parmas.get('category_id')),
          }
        })
      })
    }else{
      setCategory((prev)=>{
        return prev.map((item)=>{
          return {
            ...item,
            isActive: false
          }
        })
      })
    }
  }
  useEffect(() => {
    fetchCategory().then((data) => {
      if (!data) return;
      console.log('Fetched categories:', data); // 데이터 확인
      const categoryWithAll = [{ category_id: null, category_name: "전체" }, ...data];
      setCategory(categoryWithAll);
      setActive();
    });
  }, []); // 빈 배열을 의존성 배열로 추가

  useEffect(()=>{
    setActive();
  }, [location.search]);

  return { category };
};
