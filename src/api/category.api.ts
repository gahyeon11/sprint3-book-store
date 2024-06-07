import { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async () => {
    try {
        const response = await httpClient.get<Category[]>('/category');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};
