import { Link } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";

function CustomerList({
  customerList,
  handleDelete,
  keyword,
  setKeyword,
  // page,
  setPage,
  links,
}) {
  const { notification, showNotification } = useNotification();
  return (
    <div className="box">
      <h2 className="page-title">顧客一覧</h2>
      <Link className="create-link" to="/create">
        新規作成
      </Link>
      <input
        type="text"
        placeholder="名前・メール・郵便番号・住所で検索"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />
      {keyword && (
        <p className="search-message">
          「{keyword}」の検索結果:{customerList.length}件
        </p>
      )}
      {notification && <div className="toast">{notification}</div>}
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
          {customerList.length === 0 && keyword ? (
            <tr>
              <td colSpan="5">該当する顧客がありません</td>
            </tr>
          ) : (
            customerList.map((customer) => (
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
                    onClick={async () => {
                      if (window.confirm("この顧客を削除しますか？")) {
                        await handleDelete(customer.id);
                        showNotification("顧客を削除しました");
                      }
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        {links.map((link, index) => (
          <button
            key={index}
            disabled={!link.url}
            className={link.active ? "active" : ""}
            onClick={() => {
              const url = new URL(link.url);
              const page = url.searchParams.get("page");
              setPage(Number(page));
            }}
          >
            {link.label.replace("&laquo;", "<<").replace("&raquo;", ">>")}
          </button>
        ))}
        {/* <button onClick={() => setPage(page - 1)} disabled={page === 1}> */}
        {/* ← 前へ */}
        {/* </button> 
        {Array.from({ length: lastPage }, (_, index) => (
          <button
            key={index + 1}
            className={page === index + 1
              ? 'page-btn active'
              : 'page-btn'
          }
            onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        {/* <span> 
          {page} / {lastPage}
        </span>*
        <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
          次へ →
      </button>
      */}
      </div>
    </div>
  );
}

export default CustomerList;
