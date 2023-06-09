// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-local";
// import { AuthService } from "../auth.service";
// import { LoginDto } from "../dtos";
// import { config } from "dotenv";
// config();

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       usernameField: 'email',
//     })
//   };

//   async validate(dto: LoginDto) {
//     const user = await this.authService.validateUser(dto.email, dto.password);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   };
// };