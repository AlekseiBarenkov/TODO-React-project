import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import tasksListReducer from './reducers/tasksListSlice';
import currentTasksListReducer from './reducers/currentTasksListSlice';
import othersReducer from './reducers/othersSlice';


const store = configureStore({
  reducer: {
    tasksList: tasksListReducer,
    currentTasksList: currentTasksListReducer,
    others: othersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store