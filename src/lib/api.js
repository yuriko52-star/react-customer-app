const API_URL = 'http://localhost/api';

const customersAPI = {
    getAll() {
        return fetch(`${API_URL}/customers`)
            .then((res) => res.json());
    },
};
export default customersAPI;