import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CustomLoggerService } from '@shared/application/services/custom-logger.service';
import { QueryBus } from '@nestjs/cqrs';
import { LoginDoc } from '@user/interfaces/http/v1/auth/dto/login-doc.decorator';
import { LoginRequestDto } from '@user/interfaces/http/v1/auth/dto/login-request.dto';
import { LoginQuery } from '@user/application/cqrs/queries/login.query';
import { LogoutDoc } from '@user/interfaces/http/v1/auth/dto/logout-doc.decorator';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly queryBus: QueryBus,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('/login')
  @LoginDoc()
  async login(@Body() loginDto: LoginRequestDto) {
    const query = new LoginQuery(loginDto.email, loginDto.password);
    return await this.queryBus.execute(query);
  }

  @Delete('/logout')
  @LogoutDoc()
  logout() {
    return true;
  }
}
