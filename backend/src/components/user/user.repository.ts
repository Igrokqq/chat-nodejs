import GlobalManager from "@common/global/manager";
import { Connection, Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";
import { UserRepositoryInterface } from "./interfaces";
import { UserEntity } from "./user.entity";

export default class UserRepository implements UserRepositoryInterface {
  private userEntityRepository: Repository<UserEntity>;

  constructor() {
    const connection = GlobalManager.getProperty("pgConnection") as Connection;
    this.userEntityRepository = connection.getRepository(UserEntity);
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    const user: UserEntity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });

    return !!user;
  }

  async createOne(user: CreateUserDto): Promise<void> {
    await this.userEntityRepository.save(user as UserEntity);
  }

  getOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
