import { StatusInfo } from "types/responseDpdStatus";
import dpdClient from "clients/dpdClient";

interface DpdServiceInterface {
  getStatusInfo(): Promise<{
    currentStage: string;
    date: string;
    status: string;
  }>;
  getStatuses(): Promise<string[]>;
}
const dpdService: DpdServiceInterface = {
  getStatusInfo: async () => {
    const data = await dpdClient.getStatus();
    const currentStage =
      data.statusInfo.find((s: StatusInfo) => s.isCurrentStatus) || "";
    return {
      status: currentStage.status,
      currentStage: currentStage.label,
      date: currentStage.date,
    };
  },
  getStatuses: async () => {
    const data = await dpdClient.getStatus();
    return data.statusInfo.map((s: StatusInfo) => s.status);
  },
};

export default dpdService;
