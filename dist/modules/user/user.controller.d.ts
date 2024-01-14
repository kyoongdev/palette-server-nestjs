import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUsers(): Promise<import("./entities/user.entity").UserEntity[]>;
}
