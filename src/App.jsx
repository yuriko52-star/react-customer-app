import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

// import CustomerList from "./components/CustomerList";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <h1 className="site-title">顧客管理アプリ</h1> */}

      {/* <CustomerList /> */}
    </>
  );
}
export default App;
