import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTaskAndFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.INPROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
