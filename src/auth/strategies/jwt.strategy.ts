import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  };

  async validate(payload: any) {
    const { sub, username } = payload;
    const user = { userId: sub, username };
    if(!user) {
      throw new UnauthorizedException();
    };
    return user;
  };

};
