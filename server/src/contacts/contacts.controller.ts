import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Request() req, @Body() body: { name: string; email: string; phone: string; avatar?: string }) {
    const userId = req.user.id;
    return this.contactsService.create(userId, body.name, body.email, body.phone, body.avatar);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    return this.contactsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.contactsService.findOne(parseInt(id), userId);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string; phone?: string; avatar?: string },
  ) {
    const userId = req.user.id;
    return this.contactsService.update(parseInt(id), userId, body.name, body.email, body.phone, body.avatar);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.contactsService.remove(parseInt(id), userId);
  }
}
