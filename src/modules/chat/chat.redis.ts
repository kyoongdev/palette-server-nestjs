import { Injectable } from '@nestjs/common';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { type Redis } from 'ioredis';

import type { RedisChatRoom, RedisClient } from '@/interface/contact.interface';
@Injectable()
export class ChatRedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async findClient(id: string): Promise<RedisClient | undefined> {
    const clients = await this.findAllClients();

    return clients.find((client) => client === id);
  }

  async findAllClients(): Promise<RedisClient[]> {
    const clients = await this.redis.get('clients');

    if (!clients) {
      return [];
    }

    return JSON.parse(clients) as RedisClient[];
  }

  async createClient(id: string) {
    const clients = await this.findAllClients();

    if (clients.includes(id)) {
      return;
    }

    clients.push(id);
    await this.redis.set('clients', JSON.stringify(clients));
  }

  async deleteClient(id: string) {
    const clients = await this.findAllClients();

    if (!clients.includes(id)) {
      return;
    }

    await this.redis.set('clients', JSON.stringify(clients.filter((client) => client !== id)));
  }

  async findAllRooms(): Promise<RedisChatRoom[]> {
    const rooms = await this.redis.get('rooms');

    if (!rooms) {
      return [];
    }

    return JSON.parse(rooms) as RedisChatRoom[];
  }

  async findRoom(id: string) {
    const rooms = await this.findAllRooms();

    return rooms.find((room) => room.roomId === id);
  }

  async createRoom(roomId: string, userId: string, opponentId: string) {
    const room = await this.findRoom(roomId);

    if (room) {
      return null;
    }

    const user = await this.findClient(userId);
    const opponent = await this.findClient(opponentId);

    if (!user || !opponent) {
      return null;
    }
    const newRoom: RedisChatRoom = {
      roomId,
      users: [userId, opponentId],
    };

    await this.redis.set('rooms', JSON.stringify([...(await this.findAllRooms()), newRoom]));
  }

  async deleteRoom(roomId: string) {
    const rooms = await this.findAllRooms();

    await this.redis.set('rooms', JSON.stringify(rooms.filter((room) => room.roomId !== roomId)));
  }
}
