import { Injectable } from '@nestjs/common';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { type Redis } from 'ioredis';

import type { RedisChatRoom, RedisClient } from '@/interface/contact.interface';
@Injectable()
export class ChatRedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async init() {
    await this.redis.set('clients', JSON.stringify([]));
    await this.redis.set('rooms', JSON.stringify([]));
  }

  async findClient(id: string): Promise<RedisClient | undefined> {
    const clients = await this.findAllClients();
    console.log(clients);
    return clients.find((client) => client.clientId === id);
  }

  async findClientByUserId(userId: string): Promise<RedisClient | undefined> {
    const clients = await this.findAllClients();

    return clients.find((client) => client.userId === userId);
  }

  async findAllClients(): Promise<RedisClient[]> {
    const clients = await this.redis.get('clients');

    if (!clients) {
      return [];
    }

    return JSON.parse(clients) as RedisClient[];
  }

  async createClient(clientId: string, userId: string) {
    const clients = await this.findAllClients();

    if (clients.map((client) => client.clientId).includes(clientId)) {
      return;
    }

    clients.push({
      userId,
      clientId,
    });
    await this.redis.set('clients', JSON.stringify(clients));
  }

  async deleteClient(id: string) {
    const clients = await this.findAllClients();

    if (!clients.map((client) => client.clientId).includes(id)) {
      return;
    }

    await this.redis.set('clients', JSON.stringify(clients.filter((client) => client.clientId !== id)));
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
      users: [user, opponent],
    };

    await this.redis.set('rooms', JSON.stringify([...(await this.findAllRooms()), newRoom]));
  }

  async deleteRoom(roomId: string) {
    const rooms = await this.findAllRooms();

    await this.redis.set('rooms', JSON.stringify(rooms.filter((room) => room.roomId !== roomId)));
  }
}
