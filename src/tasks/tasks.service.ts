import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { uuid } from 'uuidv4';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskAndFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskAndFilter(getTaskAndFilterDto: GetTaskAndFilterDto): Task[] {
    const { status, search } = getTaskAndFilterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task: Task;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].status = status;
        task = this.tasks[i];
      }
    }
    return task;
  }

  deleteTask(id: string): Task[] {
    const foundTask = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    return this.tasks;
  }
}
