import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsMiddleware } from './students.middleware';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Either pass routes or controller in apply(Path || Controller) 
    consumer.apply(StudentsMiddleware)
      .exclude(
        { path: 'students', method: RequestMethod.GET },
        { path: 'students/(.*)', method: RequestMethod.GET },
      )
      .forRoutes(StudentsController)
  }
}
