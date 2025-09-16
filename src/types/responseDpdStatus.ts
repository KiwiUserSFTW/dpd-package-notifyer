export type ParcelLifecycleResponse = {
  parcelLifeCycleData: {
    shipmentInfo: ShipmentInfo;
    statusInfo: StatusInfo[];
    scanInfo: ScanInfo;
  };
};

export type ShipmentInfo = {
  parcelLabelNumber: string;
  serviceElements: any[];
  codInformationAvailable: boolean;
  documents: any[];
  additionalProperties: { key: string; value: string }[];
};

export type StatusInfo = {
  status: string;
  label: string;
  description: { content: string[] };
  statusHasBeenReached: boolean;
  isCurrentStatus: boolean;
  location?: string;
  depot?: { businessUnit: string; number: string };
  date?: string;
  normalItems: any[];
  importantItems: any[];
  errorItems: any[];
};

export type ScanInfo = {
  scan: ScanEntry[];
};

export type ScanEntry = {
  date: string;
  integrationDate: string;
  scanData: ScanData;
  scanDescription: { label: string; content: string[] };
  additionalCodes: any[];
  links: any[];
};

export type ScanData = {
  scanDate: string;
  scanTime: string;
  scanDepot: { businessUnit: string; number: string };
  location: string;
  scanType: { name: string; code: string; detailMode: string };
  additionalCodes: { additionalCode: any[] };
  serviceElements: any[];
  detailMode: string;
  insertTimestamp: string;
};
