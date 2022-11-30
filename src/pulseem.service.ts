import { Inject, Injectable } from '@nestjs/common';
import { PulseemClient } from './pulseem.client';
import { PULSEEM_CLIENT_PROVIDER } from './pulseem.constants';
import { PulseemEmailOptions, PulseemSmsOptions } from './pulseem.interfaces';

@Injectable()
export class PulseemService {
  constructor(
    @Inject(PULSEEM_CLIENT_PROVIDER)
    private readonly pulseemClient: PulseemClient,
  ) {}

  async sendEmail(options: PulseemEmailOptions) {
    return await this.pulseemClient.sendEmail(options);
  }

  async sendSms(options: PulseemSmsOptions) {
    return await this.pulseemClient.sendSms(options);
  }

  async getEmailReportByDate(startDateSeconds: number, endDateSeconds: number) {
    return await this.pulseemClient.getEmailReportByDate(
      startDateSeconds,
      endDateSeconds,
    );
  }

  async getEmailReportByRef(externalRef: string) {
    return await this.pulseemClient.getEmailReportByRef(externalRef);
  }
}
