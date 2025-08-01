import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // This pipe is used to validate and transform MongoDB ObjectId strings

  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({ value, metadata });
    if(!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
