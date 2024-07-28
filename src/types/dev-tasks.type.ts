
export type TaskStatus = 'TODO' | 'PENDING' | 'DONE';
export type StatusTemplate = {
  status: string;
  hex: string;
  hexClass: string;
  icon: string;
}
export type Task = {
  task : string;
  status: TaskStatus;
}