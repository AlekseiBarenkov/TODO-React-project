import { createSlice } from '@reduxjs/toolkit';

export const tasksListSlice = createSlice({
    name: 'tasksList',
    initialState: {
        tasksList: [],
        textareaValue: '',
        inputText: ''
    },
    reducers: {
        addTask: (state, task) => {
            state.tasksList = [...state.tasksList, task.payload]
            state.inputText = ''
        },
        setTasksList: (state, list) => {
            state.tasksList = list.payload.map(item => item);
        },
        clearTasksList: state => {
            state.tasksList = [];
        },
        makeHotTask: (state, btnId) => {
            state.tasksList.map(item => {
                if (item.id === btnId.payload && !item.isHot) {item.isHot = true;}
                else if (item.id === btnId.payload && item.isHot) {item.isHot = false;}
                return item;
            });
        },
        completeTheTask: (state, btnId) => {
            state.tasksList.map(item => {
                if (item.id === btnId.payload) item.isChecked = true;
                return item;
            });
        },
        clearTask: (state, list) => {
            state.tasksList = list.payload.map(item => item);
        },
        upgradeEditTask: (state) => {
            state.tasksList.map(item => {
                item.editBoxItem.className = 'tasks-list__edit-box';
                return item
            });
        },
        saveChangesTask: (state, btnId) => {
            const text = state.textareaValue.trim();
            let maches = false;

            state.tasksList.forEach(item => {
                if(item.title.toLowerCase() === text.toLowerCase()) maches = true;
            });
            
            if(maches) return alert('Такая задача уже есть');
            state.tasksList.map(item => {
                if(item.id === btnId.payload) item.title = text[0].toUpperCase() + text.slice(1);
                return item;
            });
        },
        setTextareaValue: (state, text) => {
            state.textareaValue = text.payload;
        },
        addInputText(state, text) {
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
    upgradeEditTask,
    saveChangesTask,
    setTextareaValue,
    addInputText
} = tasksListSlice.actions;

export const selectTasksList = state => state.tasksList.tasksList;
export const selectTextareaValue = state => state.tasksList.textareaValue;
export const selectInputText = state => state.tasksList.inputText;

export default tasksListSlice.reducer;