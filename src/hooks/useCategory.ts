import { useState, useEffect } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((data) => {
      if (!data) return;
      console.log('Fetched categories:', data); // 데이터 확인
      const categoryWithAll = [{ category_id: null, category_name: "전체" }, ...data];
      setCategory(categoryWithAll);
    });
  }, []); // 빈 배열을 의존성 배열로 추가

  return { category };
};
