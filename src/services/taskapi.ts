import api from "./AuthAgent";

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  duration?: number;
  priority: "low" | "medium" | "high";
  isFlexible: boolean;
  constraints?: string;
  status: "pending" | "scheduled" | "conflict" | "completed";
  reminder: boolean;
  reminderTime?: string;
}

// Fetch all tasks
export const fetchTasks = () => api.get<Task[]>("/tasks");

// Create new task
export const createTask = (task: Task) => api.post<Task>("/tasks", task);

// Update task by id
export const updateTask = (id: string, task: Partial<Task>) =>
  api.put<Task>(`/tasks/${id}`, task);

// Update task by id
export const autoSchedule = () =>
  api.post<Task>(`/tasks/auto-schedule`);

// Delete task by id
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
