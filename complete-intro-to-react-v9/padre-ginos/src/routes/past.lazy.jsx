import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getPastOrders from "../api/getPastOrders";
import Modal from "../Modal";

import { formatPrice } from "../utils";
import getPastOrder from "../api/getPastOrder";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorProofPastOrders,
});

function ErrorProofPastOrders(props) {
  return (
    <ErrorBoundary>
      <PastOrders {...props} />
    </ErrorBoundary>
  );
}

function PastOrders() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState();

  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30 * 1000,
  });

  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => {
      return getPastOrder(focusedOrder);
    },
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="past-order">
      <table>
        <thead>
          <tr>
            <td>Order ID</td>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={page <= 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData?.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <image src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{formatPrice(pizza.price)}</td>
                    <td>{formatPrice(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading</p>
          )}
          <button onClick={() => setFocusedOrder(false)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
