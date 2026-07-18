const API_URL = "http://localhost/api";

const customersAPI = {
  getAll(page = 1, keyword = "") {
    return fetch(`${API_URL}/customers?page=${page}&keyword=${keyword}`).then(
      (res) => res.json(),
    );
  },
};
export default customersAPI;
