import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateUserPort } from "src/user/application/port/create-user.port";
import { User } from "src/user/domain/user.model";
import { PrismaService } from "../../common/db/prisma.service";

@Injectable()
export class PrismaUserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async save(user: User): Promise<User> {
        const result = await this.prismaService.user.create({data: user})

        return new User({...result})
    }

    async findUnique(whereQuery: Prisma.UserWhereUniqueInput) {
        return await this.prismaService.user.findUnique({
            where: whereQuery
        })
    }

    async exists(whereQuery: Prisma.UserWhereUniqueInput): Promise<boolean> {
        const result = await this.prismaService.user.findUnique({
            where: whereQuery
        })

        return result != null
    }
}