import CustomerList from "../components/CustomerList";
function Home({
  customerList,
  handleDelete,
  keyword,
  setKeyword,
  page,
  setPage,
  links,
  // lastPage,
}) {
  return (
    <>
      <CustomerList
        customerList={customerList}
        handleDelete={handleDelete}
        keyword={keyword}
        setKeyword={setKeyword}
        page={page}
        setPage={setPage}
        links={links}
        // lastPage={lastPage}
      />
    </>
  );
}
export default Home;
