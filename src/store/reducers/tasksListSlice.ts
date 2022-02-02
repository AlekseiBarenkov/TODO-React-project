import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksListState, TaskObj } from './interface';

const initialState: TasksListState = {
    tasksList: [],
    textareaValue: '',
    inputText: ''
}

export const tasksListSlice = createSlice({
    name: 'tasksList',
    initialState,
    reducers: {
        addTask: (state, task: PayloadAction<TaskObj>) => {
            state.tasksList = [...state.tasksList, task.payload]
            state.inputText = ''
        },
        setTasksList: (state, list: PayloadAction<TaskObj[]>) => {
            state.tasksList = list.payload.map(item => item);
        },
        clearTasksList: state => {
            state.tasksList = [];
        },
        makeHotTask: (state, btnId: PayloadAction<string>) => {
            state.tasksList.map(item => {
                if (item.id === btnId.payload) item.isHot = !item.isHot;
                return item;
            });
        },
        completeTheTask: (state, btnId: PayloadAction<string>) => {
            state.tasksList.map(item => {
                if (item.id === btnId.payload) item.isChecked = true;
                return item;
            });
        },
        clearTask: (state, id: PayloadAction<string>) => {
            state.tasksList = state.tasksList.filter(item => item.id !== id.payload)
        },
        saveChangesTask: (state, btnId: PayloadAction<string>) => {
            const text = state.textareaValue.trim();

            state.tasksList.map(item => {
                if (item.id === btnId.payload) item.title = text[0].toUpperCase() + text.slice(1);
                return item;
            });
        },
        setTextareaValue: (state, text: PayloadAction<string>) => {
            state.textareaValue = text.payload;
        },
        addInputText(state, text: PayloadAction<string>) {
            state.inputText = text.payload
        }
    },
});

export const {
    addTask,
    setTasksList,
    clearTasksList,
    makeHotTask,
    completeTheTask,
    clearTask,
    saveChangesTask,
    setTextareaValue,
    addInputText
} = tasksListSlice.actions;

export default tasksListSlice.reducer;