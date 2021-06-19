import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskAndFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getTask(filterDto: GetTaskAndFilterDto): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto);
  }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return this.taskRepository.updateTask(task, status);
  }
  async deleteTask(id: number): Promise<any> {
    const task = await this.taskRepository.delete(id);
    if (task.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return task;
  }
}
