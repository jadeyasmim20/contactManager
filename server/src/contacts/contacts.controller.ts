import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

interface CreateContactDto {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type?: string;
}

interface UpdateContactDto {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  type?: string;
}

interface UnlockContactDto {
  password: string;
}

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(
    @Request() req,
    @Body() body: CreateContactDto
  ) {
    const userId = req.user.id;
    return this.contactsService.create(userId, body.name, body.email, body.phone, body.avatar, body.type);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    return this.contactsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.contactsService.findOne(id, userId);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContactDto,
  ) {
    const userId = req.user.id;
    return this.contactsService.update(id, userId, body.name, body.email, body.phone, body.avatar, body.type);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.contactsService.remove(id, userId);
  }

  @Post(':id/unlock')
  async unlockContact(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UnlockContactDto
  ) {
    const userId = req.user.id;
    return this.contactsService.unlockContact(id, userId, body.password);
  }
}
