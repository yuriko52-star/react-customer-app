import CustomerForm from "../components/CustomerForm";
import { Link } from "react-router-dom";

function Create({ addCustomer }) {
  return (
    <div className="box">
      <h1 className="page-title">顧客登録</h1>
      <Link className="back-link" to="/">
        一覧に戻る
      </Link>
      <CustomerForm addCustomer={addCustomer} />
    </div>
  );
}
export default Create;
