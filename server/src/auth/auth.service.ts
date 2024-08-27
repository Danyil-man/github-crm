import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async register(authDto: AuthDto) {
    const { email, password } = authDto;
    const isUserExists = await this.userModel.findOne({
      email,
    });
    if (isUserExists) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    try {
      user = await this.userModel.create({
        email,
        password: hashedPassword,
      });
    } catch (e) {
      throw new BadRequestException('The error occurred during registration!');
    }

    const accessToken = this.jwtService.sign({
      _id: user._id,
      email: user.email,
    });

    return {
      _id: user._id,
      email: user.email,
      accessToken,
    };
  }

  async login(user: IUser) {
    const { _id, email } = user;

    const accessToken = this.jwtService.sign({
      _id,
      email,
    });
    return { _id, email, accessToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }
}
