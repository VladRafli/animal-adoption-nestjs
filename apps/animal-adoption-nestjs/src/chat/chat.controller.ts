import { JwtAuthGuard } from '@/_guard';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller({
  version: '1',
  path: 'chats',
})
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChats(@Req() req: any) {
    const id = req.user.sub;

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved all chats',
      data: await this.chatService.getAllChats(id),
    };
  }

  @Get('/:id')
  async getChatBySender(@Param('id') senderId: string, @Req() req: any) {
    const id = req.user.sub;

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved chat by its sender',
      data: await this.chatService.getChatBySender(id, senderId),
    };
  }

  @Post()
  async createChat(@Req() req: any) {
    const id = req.user.sub;
    const { message, to } = req.body;

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created chat',
      data: await this.chatService.createChat(id, to, message),
    };
  }

  @Delete('/:id')
  async deleteChat(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted chat',
      data: await this.chatService.deleteChat(id),
    };
  }
}
