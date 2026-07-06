import customers from "../data/customers";
import { useState } from "react";
import { Link } from "react-router-dom";

function CustomerList() {
  const [customerList, setCustomerList] = useState(customers);

  // 削除機能
  const handleDelete = (id) => {
    const newCustomers = customerList.filter((customer) => customer.id !== id);
    setCustomerList(newCustomers);
  };
  return (
    <div className="box">
      <h2 className="page-title">顧客一覧</h2>
      <Link className="create-link" to="/create">
        新規作成
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>名前</th>
            <th>メール</th>
            <th>郵便番号</th>
            <th>住所</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.postal_code}</td>
              <td>{customer.address}</td>
              <td>
                <Link
                  className="action-btn edit-link"
                  to={`/edit/${customer.id}`}
                >
                  編集
                </Link>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(customer.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
