import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a new user', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed-password'));
    jest.spyOn(prismaService.user, 'create').mockResolvedValue({
      id: 1,
      email: 'john@example.com',
      password: 'hashed-password',
      createdAt: new Date(),
    });

    const result = await service.register('john@example.com', 'password123');
    expect(result).toEqual({ access_token: 'mocked-token' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        email: 'john@example.com',
        password: 'hashed-password',
      },
    });
  });

  it('should login an existing user', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: 'john@example.com',
      password: 'hashed-password',
      createdAt: new Date(),
    });
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

    const result = await service.login('john@example.com', 'password123');
    expect(result).toEqual({ access_token: 'mocked-token' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
  });

  it('should throw UnauthorizedException on invalid credentials', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(service.login('john@example.com', 'password123')).rejects.toThrow(UnauthorizedException);
  });
});
