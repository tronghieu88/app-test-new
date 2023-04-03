import { ConflictException, NotFoundException } from '@nestjs/common';

export function throwIfNotExists<T>(
  model: T | any | undefined,
  message: string,
) {
  if (!model || model?.isDeleted) {
    throw new NotFoundException(`${message}`);
  }
}

export function throwIfExisted<T>(model: T | any | undefined, message: string) {
  if (model) {
    throw new ConflictException(`${message}`);
  }
}
