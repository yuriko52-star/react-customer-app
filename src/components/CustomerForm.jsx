import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function CustomerForm({ customer, addCustomer, updateCustomer }) {
  const [name, setName] = useState(customer ? customer.name : "");
  const [email, setEmail] = useState(customer ? customer.email : "");
  const [postalCode, setPostalCode] = useState(
    customer ? customer.postal_code : "",
  );
  const [address, setAddress] = useState(customer ? customer.address : "");
  const navigate = useNavigate("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (customer) {
      updateCustomer({
        id: customer.id,
        name,
        email,
        postal_code: postalCode,
        address,
      });
    } else {
      addCustomer({
        name,
        email,
        postal_code: postalCode,
        address,
      });
    }

    console.log([name, email, postalCode, address]);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <dl>
        <dt>名前</dt>
        <dd>
          <input
            type="text"
            value={name}
            className=""
            onChange={(e) => setName(e.target.value)}
          />
        </dd>

        <dt>メールアドレス</dt>
        <dd>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
        </dd>

        <dt>郵便番号</dt>
        <dd>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className=""
          />
        </dd>
        <dt>住所</dt>
        <dd>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className=""
          />
        </dd>
      </dl>

      <button
        type="submit"
        className={customer ? "update-btn" : "register-btn"}
      >
        {customer ? "更新" : "登録"}
      </button>
    </form>
  );
}
export default CustomerForm;
