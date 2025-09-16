import axios from "axios";
import "dotenv/config";
const url = process.env.DPD_URL_PACKAGE || "";
const getCurrentStage = (statusInfo) => {
    if (!statusInfo) {
        console.log("statusInfo error", statusInfo);
        return;
    }
    return statusInfo.filter((statusData) => statusData.isCurrentStatus === true)[0];
};
const getData = async (response) => {
    const responseData = await response;
    //   const responesData = {
    //     currentStage = response.statusInfo,
    //   };
    return response.data;
};
const getStatus = async () => {
    const response = await axios.get(url);
    return getData(response);
};
getStatus();
