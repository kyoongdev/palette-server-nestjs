export interface FindContact {
  id: string;
  name: string;
  order: number;
}

export interface RedisClient {
  userId: string;
  clientId: string;
}
export interface RedisChatRoom {
  roomId: string;
  users: RedisClient[];
}
