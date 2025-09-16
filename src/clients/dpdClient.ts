import axios from "axios";
import "dotenv/config";
export default {
  getStatus: async () => {
    const response = await axios.get(process.env.DPD_URL_PACKAGE || "");
    return response.data.parcellifecycleResponse.parcelLifeCycleData;
  },
};
