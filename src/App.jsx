import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { useState, useEffect } from "react";
// import customers from "./data/customers";
import customersAPI from "./lib/api";

import "./index.css";

function App() {
  /*const [customerList, setCustomerList] = useState(() => {
    const savedCustomers = localStorage.getItem('customers');

    return savedCustomers ? JSON.parse(savedCustomers) : customers;
  });
  */
  const [customerList, setCustomerList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    customersAPI.getAll(page, keyword).then((data) => {
      console.log(data);
      setCustomerList(data.data);
      setLinks(data.links);
      // setPagination(data);
      // setLastPage(data.last_page);
    });
  }, [page, keyword]);

  /* useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customerList));
  }, [customerList]);
*/
  const addCustomer = async (customer) => {
    const newCustomer = await customersAPI.create(customer);
    setCustomerList([
      ...customerList,
     newCustomer
    ]);
  };
  // 編集機能
  const updateCustomer = (updatedCustomer) => {
    setCustomerList(
      customerList.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer,
      ),
    );
  };
  // 削除機能
  const handleDelete = (id) => {
    const newCustomers = customerList.filter((customer) => customer.id !== id);
    setCustomerList(newCustomers);
  };
  // 検索機能は削除した（バックエンドで対応）

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                customerList={customerList}
                handleDelete={handleDelete}
                keyword={keyword}
                setKeyword={setKeyword}
                page={page}
                setPage={setPage}
                // lastPage={lastPage}
                links={links}
              />
            }
          ></Route>
          <Route
            path="/create"
            element={<Create addCustomer={addCustomer} />}
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <Edit
                customerList={customerList}
                updateCustomer={updateCustomer}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
