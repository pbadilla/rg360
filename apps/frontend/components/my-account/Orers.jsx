import React from "react";
import Link from "next/link";
export default function Orers() {
  return (
    <div className="my-account-content">
      <div className="account-orders">
        <div className="wrap-account-order">
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                <th className="fw-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tf-order-item">
                <td>#123</td>
                <td>August 1, 2024</td>
                <td>On hold</td>
                <td>$200.0 for 1 items</td>
                <td>
                  <Link
                    href={`/my-account-orders-details`}
                    className="tf-btn btn-fill radius-4"
                  >
                    <span className="text">View</span>
                  </Link>
                </td>
              </tr>
              <tr className="tf-order-item">
                <td>#345</td>
                <td>August 2, 2024</td>
                <td>On hold</td>
                <td>$300.0 for 1 items</td>
                <td>
                  <Link
                    href={`/my-account-orders-details`}
                    className="tf-btn btn-fill radius-4"
                  >
                    <span className="text">View</span>
                  </Link>
                </td>
              </tr>
              <tr className="tf-order-item">
                <td>#567</td>
                <td>August 3, 2024</td>
                <td>On hold</td>
                <td>$400.0 for 1 items</td>
                <td>
                  <Link
                    href={`/my-account-orders-details`}
                    className="tf-btn btn-fill radius-4"
                  >
                    <span className="text">View</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
