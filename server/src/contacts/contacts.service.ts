import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../utils/encryption/encryption.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ContactsService {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async create(
    userId: number,
    name: string,
    email: string,
    phone: string,
    avatar?: string,
    type: string = 'Trabalho',
  ) {
    try {
      const emailEnc = await this.encryptionService.encrypt(email);
      const phoneEnc = await this.encryptionService.encrypt(phone);

      const createdContact = await this.prisma.contact.create({
        data: {
          name,
          emailEnc,
          phoneEnc,
          avatar,
          userId,
          type,
        },
      });

      return createdContact;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao criar contato');
    }
  }

  async findAll(userId: number) {
    const contacts = await this.prisma.contact.findMany({
      where: { userId },
    });

    // Retorna contatos mascarados, mas inclui emailEnc e phoneEnc para o frontend
    return contacts.map((contact: any) => ({
      id: contact.id,
      name: contact.name,
      email: '************',
      phone: '************',
      emailEnc: contact.emailEnc,
      phoneEnc: contact.phoneEnc,
      avatar: contact.avatar,
      type: contact.type || 'Trabalho',
      userId: contact.userId,
      createdAt: contact.createdAt,
    }));
  }

  async findOne(id: number, userId: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, userId },
    });
    if (!contact)
      throw new UnauthorizedException('Contact not found or unauthorized');

    return {
      ...contact,
      email: await this.encryptionService.decrypt(contact.emailEnc),
      phone: await this.encryptionService.decrypt(contact.phoneEnc),
    };
  }

  async update(
    id: number,
    userId: number,
    name?: string,
    email?: string,
    phone?: string,
    avatar?: string,
    type?: string,
  ) {
    const contact: any = await this.prisma.contact.findUnique({
      where: { id, userId },
    });
    if (!contact)
      throw new UnauthorizedException('Contact not found or unauthorized');

    const emailEnc = email
      ? await this.encryptionService.encrypt(email)
      : contact.emailEnc;
    const phoneEnc = phone
      ? await this.encryptionService.encrypt(phone)
      : contact.phoneEnc;

    return this.prisma.contact.update({
      where: { id, userId },
      data: {
        name: name ?? contact.name,
        emailEnc,
        phoneEnc,
        avatar: avatar ?? contact.avatar,
        type: type ?? contact.type ?? 'Trabalho',
      },
    });
  }

  async remove(id: number, userId: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id, userId },
    });
    if (!contact)
      throw new UnauthorizedException('Contact not found or unauthorized');

    return this.prisma.contact.delete({ where: { id, userId } });
  }

  async unlockContact(id: number, userId: number, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const contact = await this.prisma.contact.findUnique({
      where: { id, userId },
    });
    if (!contact) throw new UnauthorizedException('Contato não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Senha incorreta');

    return {
      id: contact.id,
      name: contact.name,
      email: await this.encryptionService.decrypt(contact.emailEnc),
      phone: await this.encryptionService.decrypt(contact.phoneEnc),
      avatar: contact.avatar,
      type: contact.type || 'Trabalho',
      createdAt: contact.createdAt,
    };
  }
}
