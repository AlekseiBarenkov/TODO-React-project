import { configureStore } from '@reduxjs/toolkit';
import tasksListReducer from '../store/reducers/tasksListSlice';
import currentTasksListReducer from '../store/reducers/currentTasksListSlice';
import othersReducer from '../store/reducers/othersSlice';


export default configureStore({
  reducer: {
    tasksList: tasksListReducer,
    currentTasksList: currentTasksListReducer,
    others: othersReducer
  },
});