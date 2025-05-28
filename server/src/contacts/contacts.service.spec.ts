import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../utils/encryption/encryption.service';
import { UnauthorizedException } from '@nestjs/common';

describe('ContactsService', () => {
  let service: ContactsService;
  let prismaService: PrismaService;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        PrismaService,
        {
          provide: EncryptionService,
          useValue: {
            encrypt: jest.fn().mockResolvedValue('encrypted-value'),
            decrypt: jest.fn().mockResolvedValue('decrypted-value'),
          },
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    prismaService = module.get<PrismaService>(PrismaService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new contact', async () => {
    jest.spyOn(prismaService.contact, 'create').mockResolvedValue({
      id: 1,
      name: 'Jane Doe',
      emailEnc: 'encrypted-value',
      phoneEnc: 'encrypted-value',
      avatar: 'base64string',
      userId: 1,
      createdAt: new Date(),
    });

    const result = await service.create(1, 'Jane Doe', 'jane@example.com', '123456789', 'base64string');
    expect(result).toEqual({
      id: 1,
      name: 'Jane Doe',
      emailEnc: 'encrypted-value',
      phoneEnc: 'encrypted-value',
      avatar: 'base64string',
      userId: 1,
      createdAt: expect.any(Date),
    });
    expect(encryptionService.encrypt).toHaveBeenCalledTimes(2);
  });

  it('should find all contacts for a user', async () => {
    jest.spyOn(prismaService.contact, 'findMany').mockResolvedValue([
      {
        id: 1,
        name: 'Jane Doe',
        emailEnc: 'encrypted-value',
        phoneEnc: 'encrypted-value',
        avatar: 'base64string',
        userId: 1,
        createdAt: new Date(),
      },
    ]);

    const result = await service.findAll(1);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Jane Doe',
        email: 'decrypted-value',
        phone: 'decrypted-value',
        avatar: 'base64string',
        createdAt: expect.any(Date),
      },
    ]);
    expect(encryptionService.decrypt).toHaveBeenCalledTimes(2);
  });

  it('should throw UnauthorizedException if contact not found', async () => {
    jest.spyOn(prismaService.contact, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne(1, 1)).rejects.toThrow(UnauthorizedException);
  });
});
