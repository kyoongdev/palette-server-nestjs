export interface FindContact {
  id: string;
  name: string;
  order: number;
}

export type RedisClient = string;
export interface RedisChatRoom {
  roomId: string;
  users: RedisClient[];
}
