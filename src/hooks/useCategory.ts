import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location = useLocation();
  const [ category, setCategory ] = useState<Category[]>([]);

  const setActive = () => {
      const params = new URLSearchParams(location.search);
      if (params.get('categoryId')) {
          setCategory((prev) => {
              return prev.map((item) => {
                  return {
                      ...item,
                      isActive: item.id === Number(params.get("categoryId")),
                  };
              });
          });
      } else {
          setCategory((prev) => {
              return prev.map((item) => {
                  return {
                      ...item,
                      isActive: false
                  };
              });
          });
      }
  }

  useEffect(() => {
      fetchCategory()
          .then((category) => {
              if (!category) return;

              const categoryWithAll = [
                  {
                    id: null,
                    name: "전체",
                  },
                  ...category,
              ];

              setCategory(categoryWithAll);
              setActive();
          });
  }, []);

  useEffect(() => {
      setActive();
  }, [location.search]);

  return { category };
};