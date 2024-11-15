import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/db';
import { Prisma } from '@prisma/client';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [model, property = 'id', exceptField = null] = args.constraints;

    if (!value || !model) return false;

    const record = await this.prisma[model as Prisma.ModelName].findUnique({
      where: {
        [property]: value,
      },
    });

    if (record === null) return true;

    if (!exceptField) return false;

    const exceptFieldValue = (args.object as any)[exceptField];
    if (!exceptFieldValue) return false;

    return record[exceptField] === exceptFieldValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has already in used`;
  }
}

export function Unique(
  model: Prisma.ModelName,
  uniqueField: string,
  exceptField: string = null,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, uniqueField, exceptField],
      validator: UniqueConstraint,
    });
  };
}
