import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../utils/encryption/encryption.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ContactsController],
  providers: [ContactsService, PrismaService, EncryptionService],
})
export class ContactsModule {}
