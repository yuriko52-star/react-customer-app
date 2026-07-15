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
    const formattedPostalCode = postalCode.replace(/\s/g, "");

    if (customer) {
      updateCustomer({
        id: customer.id,
        name,
        email,
        postal_code: formattedPostalCode,
        address,
      });
    } else {
      addCustomer({
        name,
        email,
        postal_code: formattedPostalCode,
        address,
      });
    }

    console.log([name, email, postalCode, address]);
    navigate("/");
  };
  const searchAddress = async () => {
    if (!postalCode) return;

    try {
      const zip = postalCode.replace(/\s/g, "");

      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`,
      );

      const data = await response.json();

      if (data.results) {
        setAddress(
          data.results[0].address1 +
            data.results[0].address2 +
            data.results[0].address3,
        );
      } else {
        alert("住所が見つかりませんでした");
      }
    } catch (error) {
      console.error(error);
    }
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
            onBlur={searchAddress}
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
