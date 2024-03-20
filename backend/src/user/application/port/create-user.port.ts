import { User } from "src/user/domain/user.model";

export interface CreateUserPort {
    save(user: User): Promise<User>
}