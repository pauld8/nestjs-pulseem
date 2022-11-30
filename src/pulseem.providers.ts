import { Provider } from '@nestjs/common';
import { PulseemClient } from './pulseem.client';
import { PULSEEM_CLIENT_PROVIDER } from './pulseem.constants';
import { PulseemModuleOptions } from './pulseem.interfaces';

export function createPulseemClient(
  options: PulseemModuleOptions,
): PulseemClient {
  return new PulseemClient(options);
}

export function createPulseemProvider(options: PulseemModuleOptions): Provider {
  return {
    provide: PULSEEM_CLIENT_PROVIDER,
    useFactory: () => createPulseemClient(options),
  };
}
