import { DynamicModule, Global, Module } from '@nestjs/common';
import { PulseemModuleOptions } from './pulseem.interfaces';
import { createPulseemProvider } from './pulseem.providers';
import { PulseemService } from './pulseem.service';

@Global()
@Module({})
export class PulseemModule {
  static forRoot(options: PulseemModuleOptions): DynamicModule {
    const provider = createPulseemProvider(options);

    return {
      module: PulseemModule,
      providers: [PulseemService, provider],
      exports: [PulseemService, provider],
    };
  }
}
