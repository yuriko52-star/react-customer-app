import { useParams, Link } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";

function Edit({ customerList, updateCustomer }) {
  const { id } = useParams();
  const customer = customerList.find((customer) => customer.id === Number(id));
  console.log(customer);
  return (
    <div className="box">
      <h1 className="page-title">編集画面</h1>
      <Link className="back-link" to="/">
        一覧に戻る
      </Link>
      <CustomerForm customer={customer} updateCustomer={updateCustomer} />
    </div>
  );
}
export default Edit;
