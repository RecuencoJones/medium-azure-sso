import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AzureADStrategy } from './aad.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [AppController],
  providers: [AzureADStrategy]
})
export class AppModule {}
