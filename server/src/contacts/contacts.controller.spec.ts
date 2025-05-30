import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: jest.Mocked<Partial<ContactsService>>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        { provide: ContactsService, useValue: service },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should call create', async () => {
    const dto = { name: 'Test', email: 'test@test.com', phone: '123', type: 'pessoal' };
    await controller.create(dto as any, { user: { userId: 1 } } as any);
    expect(service.create).toHaveBeenCalled();
  });

  it('should call update', async () => {
    const dto = { name: 'Test2' };
    await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should call remove', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
