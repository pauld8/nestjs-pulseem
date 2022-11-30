export type PulseemModuleOptions = {
  apiKey: string;
};

export type PulseemEmailData = {
  fromEmail: string;
  fromName: string;
  subject: string | string[];
  html: string | string[];
  toEmails: string | string[];
  toNames?: string | string[];
  externalRef?: string | string[];
  sendTime?: string;
};

export type PulseemEmailOptions = {
  sendId: string;
  emailSendData: PulseemEmailData;
};

export enum PulseemEmailStatus {
  Pending = 1,
  Sending = 2,
  Completed = 3,
  Error = 4,
  Retry = 5,
  Paused = 6,
  Cancelled = 7,
  DirectHard = 8,
  DirectMedium = 9,
  DirectSpam = 10,
  DirectRemoved = 11,
  DirectAutoRemove = 12,
  DirectAutoRemoveFileNotAttached = 13,
  BlockedDueToSyncFeature = 20,
  BlockDueToRemoval = 21,
}

export type PulseemSmsData = {
  fromNumber: string;
  toNumbers: string | string[];
  text: string | string[];
  externalRef?: string | string[];
  isAutomaticUnsubscribeLink?: boolean;
  sendTime?: string;
};

export type PulseemSmsOptions = {
  sendId: string;
  isAsync?: boolean;
  smsSendData: PulseemSmsData;
};
