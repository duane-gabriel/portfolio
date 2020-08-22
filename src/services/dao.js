/*eslint-disable */
import api from './api';

export default {
  url: '',
  headers: null,
  get() {
    return api.get(this.url);
  },
  post(data) {
    return api.post(
      this.url,
      { ...data },
      {
        headers: this.headers,
      }
    );
  },
  put(data) {
    return api.put(this.url, { ...data }, this.headers);
  },
  delete(id) {
    return api.delete(`${this.url}/${id}`, {
      headers: this.headers,
    });
  },
};
