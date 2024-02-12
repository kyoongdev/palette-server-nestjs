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

  async findRoom(id: string) {}

  async createRoom() {}

  async deleteRoom() {}
}
