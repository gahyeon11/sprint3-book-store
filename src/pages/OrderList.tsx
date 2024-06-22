import styled from "styled-components";
import Title from "../components/common/Title";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/common/Button";
import React from "react";

function OrderList() {
  const { orders, selectedItemId, selecteOrderItem } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td data-label="id">{order.id}</td>
                  <td data-label="주문일자">{formatDate(order.createdAt, "YYYY.MM.DD")}</td>
                  <td data-label="주소">{order.address}</td>
                  <td data-label="수령인">{order.receiver}</td>
                  <td data-label="전화번호">{order.contact}</td>
                  <td data-label="대표상품명">{order.bookTitle}</td>
                  <td data-label="수량">{order.totalQuantity} 권</td>
                  <td data-label="금액">{formatNumber(order.totalPrice)} 원</td>
                  <td data-label="">
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selecteOrderItem(order.id)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.id && (
                  <tr>
                    <td colSpan={9}>
                      <ul className="detail">
                        {order?.detail &&
                          order.detail.map((item) => (
                            <li key={item.bookId}>
                              <div>
                                <span>{item.bookId}</span>
                                <span>{item.author}</span>
                                <span>{formatNumber(item.price)} 원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    table {
      display: block;
      thead {
        display: none;
      }
      tbody {
        display: block;
      }
      tr {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${({ theme }) => theme.color.border};
        margin-bottom: 16px;
        padding-bottom: 16px;
      }
      td {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        position: relative;
        padding-left: 50%;
        text-align: left;
        
        &:before {
          content: attr(data-label);
          position: absolute;
          left: 0;
          width: 45%;
          padding-left: 15px;
          font-weight: bold;
          white-space: nowrap;
        }
      }
      .detail {
        li {
          div {
            flex-direction: column;
            gap: 4px;
          }
        }
      }
    }
  }
`;

export default OrderList;
