import { MusicianEntity } from '@/modules/musician/entity/musicain.entity';
export declare class UserEntity {
    id: string;
    email?: string;
    password?: string;
    name?: string;
    nickname?: string;
    profileImage?: string;
    phoneNumber?: string;
    musician?: MusicianEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
