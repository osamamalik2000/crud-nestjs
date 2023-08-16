import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class StudentsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers.authorization;
    if(!authorization){
      throw new HttpException('No authorization token', HttpStatus.FORBIDDEN)
    } else if (authorization != 'UP11AX1786'){
      throw new HttpException('Invalid authorization token', HttpStatus.FORBIDDEN)
    }
    next();
  }
}
