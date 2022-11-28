import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class PulseemModule {
  static register(): DynamicModule {
    return {
      module: PulseemModule,
      // module: ConfigModule,
      // providers: [ConfigService],
      // exports: [ConfigService],
    };
  }
}
