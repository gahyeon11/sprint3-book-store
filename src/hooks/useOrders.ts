import { useEffect, useState } from "react";
import { Order, OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selecteOrderItem = (orderId: number) => {
    //요청 방어
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }
    fetchOrder(orderId).then((orderDetail) => {
      //detail정보를 어디에 저장? -> OrderListItem을 Order을 상속받아 새로운 model로 정의하여 Detail 추가
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      );
    });
  };
  return { orders, selectedItemId, selecteOrderItem };
};
