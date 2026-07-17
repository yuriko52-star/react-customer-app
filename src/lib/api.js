const API_URL = "http://localhost/api";

const customersAPI = {
  getAll(page = 1) {
    return fetch(`${API_URL}/customers?page=${page}`).then((res) => res.json());
  },
};
export default customersAPI;
