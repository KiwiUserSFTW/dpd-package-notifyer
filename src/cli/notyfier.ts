import open from "open";
import "dotenv/config";

// services
import dpdService from "services/dpdService";

// funcitons

// fetch statuses
const getStatuses = async (): Promise<string[]> => {
  try {
    return await dpdService.getStatuses();
  } catch (error) {
    console.error("Failed to get statuses", error);
    return [];
  }
};

// redirect url
const redirectUrl = process.env.REDIRECT_URL || "";

export const checker = (startStatus: string, delay = 10000) => {
  let interval: NodeJS.Timeout;

  // check if status has been updated
  const check = async () => {
    const statuses = await getStatuses();
    const currentStatus = statuses[0];

    console.log(currentStatus);

    if (startStatus === currentStatus) return;

    // open url in default browser
    open(redirectUrl);
    clearInterval(interval);
  };
  interval = setInterval(() => check(), delay);
};

// show available statuses
export const showAvailableStatuses = (statuses: string[]) =>
  statuses.forEach((status) => console.log(status));

// get default start status
export const getDefaultStartStatus = async (
  statuses: string[]
): Promise<string> => {
  const defaultStatus = await dpdService.getStatusInfo();
  console.log(
    "add start stage as argument if u want track not from current point"
  );
  console.log(`available statuses:`);
  showAvailableStatuses(statuses);
  console.log(defaultStatus.status, "default");
  return defaultStatus.status;
};

// get argument as start status
export const getArgStartStatus = (statuses: string[]) => {
  const argStatus = process.argv[2];

  if (!statuses.includes(argStatus)) {
    console.warn(
      `Provided status "${argStatus}" not found in available statuses.`
    );
    console.log("Using current status instead.");
    return null;
  } else {
    return argStatus;
  }
};

const notifyer = async () => {
  let startStatus;
  const statuses = await getStatuses();

  if (process.argv.length < 3) {
    startStatus = await getDefaultStartStatus(statuses);
  } else {
    console.log("one");
    const argStatus = getArgStartStatus(statuses);
    console.log(argStatus);
    argStatus
      ? (startStatus = argStatus)
      : (startStatus = getDefaultStartStatus(statuses));
  }

  checker(await startStatus);
  console.log(" --------------- ");
  console.log(`status ${startStatus} as start status`);
};

notifyer();
