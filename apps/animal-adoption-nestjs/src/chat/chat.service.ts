import { uuid } from '@/_helper';
import { PrismaService } from '@/_provider';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async getAllChats(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.prismaService.chatRoom.findMany({
      where: {
        OR: [
          {
            fromId: id,
          },
          {
            toId: id,
          },
        ],
      },
      include: {
        from: {
          select: {
            id: true,
            name: true,
          },
        },
        to: {
          select: {
            id: true,
            name: true,
          },
        },
        chat: {
          include: {
            receiver: {
              select: {
                id: true,
                name: true,
              },
            },
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  async getChatBySender(id: string, senderId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const chatRoom = await this.prismaService.chatRoom.findFirst({
      where: {
        OR: [
          {
            fromId: id,
            toId: senderId,
          },
          {
            fromId: senderId,
            toId: id,
          },
        ],
      },
      include: {
        from: {
          select: {
            id: true,
            name: true,
          },
        },
        to: {
          select: {
            id: true,
            name: true,
          },
        },
        chat: {
          include: {
            receiver: {
              select: {
                id: true,
                name: true,
              },
            },
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (chatRoom === null) {
      throw new BadRequestException('ChatRoom not found');
    }

    return chatRoom;
  }

  async createChat(
    chatRoomId: string,
    from: string,
    to: string,
    message: string,
  ) {
    let chatRoom;

    if (chatRoomId === undefined || chatRoomId === '') {
      chatRoom = await this.prismaService.chatRoom.findFirst({
        where: {
          OR: [
            {
              fromId: from,
              toId: to,
            },
            {
              fromId: to,
              toId: from,
            },
          ],
        },
      });
    } else {
      chatRoom = await this.prismaService.chatRoom.findUnique({
        where: {
          id: chatRoomId,
        },
      });
    }

    const sender = await this.prismaService.user.findUnique({
      where: {
        id: from,
      },
    });

    const receiver = await this.prismaService.user.findUnique({
      where: {
        id: to,
      },
    });

    if (!sender || !receiver) {
      throw new BadRequestException('Sender or receiver not found');
    }

    if (chatRoom === null) {
      chatRoom = await this.prismaService.chatRoom.create({
        data: {
          id: uuid.v4(),
          fromId: from,
          toId: to,
        },
      });
    }

    if (chatRoomId !== undefined && chatRoomId !== '') {
      return await this.prismaService.chat.create({
        data: {
          id: uuid.v4(),
          chatRoomId,
          message,
          senderId: from,
          receiverId: to,
        },
      });
    }

    return await this.prismaService.chat.create({
      data: {
        id: uuid.v4(),
        chatRoomId: chatRoom.id,
        message,
        senderId: from,
        receiverId: to,
      },
    });
  }

  async deleteChat(chatId: string) {
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      throw new BadRequestException('Chat not found');
    }

    return await this.prismaService.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
}
