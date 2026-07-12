import CustomerList from "../components/CustomerList";
function Home({ customerList, handleDelete, keyword, setKeyword }) {
  return (
    <>
      <CustomerList
        customerList={customerList}
        handleDelete={handleDelete}
        keyword={keyword}
        setKeyword={setKeyword}
      />
    </>
  );
}
export default Home;
