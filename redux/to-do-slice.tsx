import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
  }

  interface TasksState {
    tasks: Task[];
  }

  const initialState: TasksState = {
    tasks: [],
  };

  const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
       addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTask: Task = {
        id: Math.random().toString(), 
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.tasks.push(newTask);
      console.log("task aded",state.tasks)

    
    },
        toggleTaskComplete: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) task.completed = !task.completed;
          },
          deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
          },
          editTask: (state, action: PayloadAction<{ id: string; title: string; description?: string }>) => {
            const { id, title, description } = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            if (taskIndex >= 0) {
              state.tasks[taskIndex] = { ...state.tasks[taskIndex], title, description };
            }
          }
    }
  })

  export const { addTask, toggleTaskComplete, deleteTask, editTask } = tasksSlice.actions;
  export default tasksSlice.reducer;

  
  

