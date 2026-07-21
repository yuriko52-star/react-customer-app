import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";

function CustomerForm({ customer, addCustomer, updateCustomer }) {
  const [name, setName] = useState(customer ? customer.name : "");
  const [email, setEmail] = useState(customer ? customer.email : "");
  const [postalCode, setPostalCode] = useState(
    customer ? customer.postal_code : "",
  );
  const [address, setAddress] = useState(customer ? customer.address : "");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPostalCode = postalCode.replace(/\s/g, "");
    try {
      if (customer) {
        await updateCustomer({
          id: customer.id,
          name,
          email,
          postal_code: formattedPostalCode,
          address,
        });
        console.log("通知を表示");
        showNotification("顧客を更新しました");
      } else {
        await addCustomer({
          name,
          email,
          postal_code: formattedPostalCode,
          address,
        });
        console.log("通知を表示");
        showNotification("顧客を登録しました");
      }

      // console.log([name, email, postalCode, address]);
      navigate("/");
    } catch (error) {
      setErrors(error.errors);
    }
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

          {errors.name && <p className="error-message">{errors.name[0]}</p>}
        </dd>
        <dt>メールアドレス</dt>
        <dd>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
          {errors.email && <p className="error-message">{errors.email[0]}</p>}
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
          {errors.postal_code && (
            <p className="error-message">{errors.postal_code[0]}</p>
          )}
        </dd>
        <dt>住所</dt>
        <dd>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className=""
          />
          {errors.address && (
            <p className="error-message">{errors.address[0]}</p>
          )}
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
