import { Admin, Musician, User } from '@prisma/client';

export const Role = {
  USER: 'USER',
  MUSICIAN: 'MUSICIAN',
  ADMIN: 'ADMIN',
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];

export interface TokenPayloadProps {
  id: string;
  role: RoleType;
}

export interface TokenPayload {
  id: string;
  role: RoleType;
  key: string;
}

export enum INTERVAL_WEEK {
  EVERY_WEEK = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}

export interface RequestUser extends User {
  role: 'USER';
}

export interface RequestMusician extends User {
  role: 'MUSICIAN';
  musician: Musician;
}

export interface RequestAdmin extends Admin {
  role: 'ADMIN';
}

export type ReqUserType = RequestUser | RequestMusician | RequestAdmin;
