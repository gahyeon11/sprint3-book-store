import { cart } from "../models/cart.model";
import { httpClient } from "./http";

interface AddCartParams {
    book_id: number;
    quantity: number;
  }
  
  export const addCart = async (params: AddCartParams) => {
    const response = await httpClient.post("/carts", params);
    return response.data;
  };
  

  export const fetchCart = async() => {
    const response = await httpClient.get<cart[]>("/carts");
    return response.data;
  }

  export const deleteCart = async(cartId: number) => {
    const response = await httpClient.delete(`/carts/${cartId}`);
    return response.data;
  }