const API_URL = "http://localhost/api";

const customersAPI = {
  getAll(page = 1, keyword = "") {
    return fetch(`${API_URL}/customers?page=${page}&keyword=${keyword}`).then(
      (res) => res.json(),
    );
  },

  create(customer) {
    return fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(customer),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    });
  },

  update(id, customer) {
    return fetch(`${API_URL}/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(customer),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    });
  },
};
export default customersAPI;
