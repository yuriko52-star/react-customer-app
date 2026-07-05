import customers from "../data/customers";

function CustomerList() {
  return (
    <div className="box">
      <h2 className="page-title">顧客一覧</h2>
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
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.postal_code}</td>
              <td>{customer.address}</td>
              <td>
                <button className="edit-link">編集</button>
                <button className="delete-btn">削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CustomerList;
