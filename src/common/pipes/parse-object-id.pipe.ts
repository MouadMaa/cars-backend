import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import ObjectId from 'bson-objectid'

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  public transform(value: string): string {
    try {
      const transformedObjectId: ObjectId = ObjectId.createFromHexString(value)
      return transformedObjectId.toString()
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)')
    }
  }
}
