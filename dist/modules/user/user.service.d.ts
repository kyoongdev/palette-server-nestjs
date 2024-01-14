import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findUsers(): Promise<UserEntity[]>;
}
