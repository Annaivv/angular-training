import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  //   constructor() {
  //     const tasks = localStorage.getItem('tasks');

  //     if (tasks) {
  //       this.tasks = JSON.parse(tasks);
  //     }
  //   }

  addTask(taskData: { title: string; description: string }) {
    const newTask = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN' as TaskStatus,
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  //   private saveTasks() {
  //     localStorage.setItem('tasks', JSON.stringify(this.tasks));
  //   }
}
