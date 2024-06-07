import { useState, useEffect } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/queryString";

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(QUERYSTRING.CATEGORY_ID);
    setCategory((prev) =>
      prev.map((item) => ({
        ...item,
        isActive: item.category_id === Number(categoryId),
      }))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategory();
      if (data) {
        console.log("Fetched categories:", data);
        const categoryWithAll = [
          { category_id: null, category_name: "전체", isActive: false },
          ...data.map((item) => ({ ...item, isActive: false })),
        ];
        setCategory(categoryWithAll);
        setActive();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category };
};
