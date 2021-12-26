import AxiosService from "./AxiosService";
let service = new AxiosService();
const baseurl = "https://www.gov.uk/bank-holidays.json";

class UserService {
  getDataList() {
    return service.getMethod(baseurl);
  }
}

export default new UserService();
