import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { useState } from "react";
import customers from "./data/customers";

import "./index.css";

function App() {
  const [customerList, setCustomerList] = useState(customers);

  const addCustomer = (customer) => {
    setCustomerList([
      ...customerList,
      {
        id: Date.now(),
        ...customer,
      },
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home customerList={customerList} handleDelete={handleDelete} />
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
