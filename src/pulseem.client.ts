import axios, { AxiosInstance } from 'axios';
import { DateTime } from 'luxon';
import {
  PULSEEM_API_URL,
  PULSEEM_EMAIL_ENDPOINT,
  PULSEEM_EMAIL_REPORT_ENDPOINT,
} from './pulseem.constants';
import {
  PulseemEmailOptions,
  PulseemModuleOptions,
} from './pulseem.interfaces';

export class PulseemClient {
  private client: AxiosInstance;

  constructor(options: PulseemModuleOptions) {
    this.client = axios.create({
      baseURL: PULSEEM_API_URL,
      headers: {
        'Content-Type': 'application/json',
        APIKEY: options.apiKey,
      },
    });
  }

  async sendEmail(options: PulseemEmailOptions) {
    const sendEmailData = options.emailSendData;

    const subject = Array.isArray(sendEmailData.subject)
      ? sendEmailData.subject
      : [sendEmailData.subject];

    const HTML = Array.isArray(sendEmailData.HTML)
      ? sendEmailData.subject
      : [sendEmailData.HTML];

    const toEmails = Array.isArray(sendEmailData.toEmails)
      ? sendEmailData.toEmails
      : [sendEmailData.toEmails];

    const toNames = toEmails.map((email: string) => {
      return email.split('@')[0];
    });

    const externalRef = !sendEmailData.externalRef
      ? Array(toEmails.length).fill(0)
      : Array.isArray(sendEmailData.externalRef)
      ? sendEmailData.externalRef
      : [sendEmailData.externalRef];

    try {
      const response = await this.client.post(PULSEEM_EMAIL_ENDPOINT, {
        SendId: options.sendId,
        EmailSendData: {
          FromEmail: sendEmailData.fromEmail,
          FromName: sendEmailData.fromName,
          Subject: subject,
          HTML: HTML,
          ToEmails: toEmails,
          ToNames: toNames,
          ExternalRef: externalRef,
        },
      });

      return response;
    } catch (e) {}
  }

  async getEmailReportByDate(startDateSeconds: number, endDateSeconds: number) {
    const startDateTime =
      DateTime.fromMillis(startDateSeconds).toFormat('yyyyLLddHHmmss');
    const endDateTime =
      DateTime.fromMillis(endDateSeconds).toFormat('yyyyLLddHHmmss');

    try {
      const response = await this.client.post(PULSEEM_EMAIL_REPORT_ENDPOINT, {
        startDateTime: startDateTime,
        EndDateTime: endDateTime,
      });

      return response;
    } catch (e) {}
  }

  async getEmailReportByRef(externalRef: string) {
    try {
      const response = await this.client.post(PULSEEM_EMAIL_REPORT_ENDPOINT, {
        ExternalRef: externalRef,
      });

      return response;
    } catch (e) {}
  }
}
