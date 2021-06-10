import { TaskStatus } from '../tasks.model';

export class GetTaskAndFilterDto {
  status: TaskStatus;
  search: string;
}
