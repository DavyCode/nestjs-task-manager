import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.INPROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: string): string {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`Invalid status "${value}"`);
    }
    return value;
  }

  private isValidStatus(status: any): boolean {
    return this.allowedStatus.indexOf(status) !== -1;
  }
}
