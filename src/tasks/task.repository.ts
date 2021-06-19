import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskAndFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTask(filterDto: GetTaskAndFilterDto) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    (task.title = title), (task.description = description);
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
  async updateTask(task: Task, status: TaskStatus): Promise<Task> {
    task.status = status;
    task.save();
    return task;
  }
}
