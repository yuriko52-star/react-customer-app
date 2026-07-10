import CustomerList from "../components/CustomerList";
function Home({ customerList, handleDelete }) {
  return (
    <>
      <CustomerList customerList={customerList} handleDelete={handleDelete} />
    </>
  );
}
export default Home;
