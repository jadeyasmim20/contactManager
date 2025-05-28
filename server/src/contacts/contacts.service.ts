import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../utils/encryption/encryption.service';

@Injectable()
export class ContactsService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async create(userId: number, name: string, email: string, phone: string, avatar?: string) {
    const emailEnc = await this.encryptionService.encrypt(email);
    const phoneEnc = await this.encryptionService.encrypt(phone);
    return this.prisma.contact.create({
      data: {
        name,
        emailEnc,
        phoneEnc,
        avatar,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    const contacts = await this.prisma.contact.findMany({
      where: { userId },
    });
    return Promise.all(
      contacts.map(async (contact) => ({
        id: contact.id,
        name: contact.name,
        email: await this.encryptionService.decrypt(contact.emailEnc),
        phone: await this.encryptionService.decrypt(contact.phoneEnc),
        avatar: contact.avatar,
        createdAt: contact.createdAt,
      })),
    );
  }

  async findOne(id: number, userId: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, userId },
    });
    if (!contact) throw new UnauthorizedException('Contact not found or unauthorized');
    return {
      id: contact.id,
      name: contact.name,
      email: await this.encryptionService.decrypt(contact.emailEnc),
      phone: await this.encryptionService.decrypt(contact.phoneEnc),
      avatar: contact.avatar,
      createdAt: contact.createdAt,
    };
  }

  async update(id: number, userId: number, name?: string, email?: string, phone?: string, avatar?: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id, userId } });
    if (!contact) throw new UnauthorizedException('Contact not found or unauthorized');

    const emailEnc = email ? await this.encryptionService.encrypt(email) : contact.emailEnc;
    const phoneEnc = phone ? await this.encryptionService.encrypt(phone) : contact.phoneEnc;

    return this.prisma.contact.update({
      where: { id, userId },
      data: { name, emailEnc, phoneEnc, avatar },
    });
  }

  async remove(id: number, userId: number) {
    const contact = await this.prisma.contact.findUnique({ where: { id, userId } });
    if (!contact) throw new UnauthorizedException('Contact not found or unauthorized');
    return this.prisma.contact.delete({ where: { id, userId } });
  }
}
