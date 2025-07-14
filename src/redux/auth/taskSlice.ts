import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskApi from "../../services/taskapi";

interface TaskState {
  tasks: taskApi.Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskApi.fetchTasks();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch tasks");
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/create",
  async (task: taskApi.Task, { rejectWithValue }) => {
    try {
      const response = await taskApi.createTask(task);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create task");
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/update",
  async (
    { id, task }: { id: string; task: Partial<taskApi.Task> },
    { rejectWithValue }
  ) => {
    try {
      taskApi.updateTask(id, task);
      return JSON.parse(JSON.stringify({ ...task, _id: id })); // Return the updated task or at least the id
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update task");
    }
  }
);
export const autoScheduleTaskThunk = createAsyncThunk(
  "tasks/autoSchedule",
  async (
    {}: any,
    { rejectWithValue }
  ) => {
    try {
      taskApi.autoSchedule();
      return {}; // Return the updated task or at least the id
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update task");
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete task");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // create
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // update
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(autoScheduleTaskThunk.fulfilled, () => {
        // This case is intentionally left empty as the update logic is handled in the previous case      
      })

      // delete
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
