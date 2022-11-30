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

  async sendEmail({
    sendId,
    emailSendData: {
      subject,
      html,
      toEmails,
      fromEmail,
      fromName,
      toNames,
      externalRef,
    },
  }: PulseemEmailOptions) {
    subject = Array.isArray(subject) ? subject : [subject];
    html = Array.isArray(html) ? subject : [html];
    toEmails = Array.isArray(toEmails) ? toEmails : [toEmails];

    toNames = !toNames
      ? toEmails.map((email: string) => email.split('@')[0])
      : Array.isArray(toNames)
      ? toNames
      : [toNames];

    externalRef = !externalRef
      ? Array(toEmails.length).fill(0)
      : Array.isArray(externalRef)
      ? externalRef
      : [externalRef];

    try {
      const response = await this.client.post(PULSEEM_EMAIL_ENDPOINT, {
        SendId: sendId,
        EmailSendData: {
          FromEmail: fromEmail,
          FromName: fromName,
          Subject: subject,
          HTML: html,
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
    } catch (e) {
      return {
        data: null,
        error: e?.message || e,
      };
    }
  }

  async getEmailReportByRef(externalRef: string) {
    try {
      const response = await this.client.post(PULSEEM_EMAIL_REPORT_ENDPOINT, {
        ExternalRef: externalRef,
      });

      return response;
    } catch (e) {
      return {
        data: null,
        error: e?.message || e,
      };
    }
  }
}
