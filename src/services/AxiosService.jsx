import axios from "axios";

class AxiosService {
    getMethod(url) {
    return axios.get(url);
  }
}

export default AxiosService;
