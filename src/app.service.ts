import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  title = "hello";

  getHello(): string {
    return 'Hello World!';
  }

  getDemo(numberOne: number, numberTwo: number): number {
    return numberOne + numberTwo;
  }

}
