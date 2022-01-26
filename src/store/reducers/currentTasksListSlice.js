import { createSlice } from '@reduxjs/toolkit';

const className = 'tasks-list__edit-box';
const activeClassName = 'tasks-list__edit-box tasks-list__edit-box--active';

export const currentTasksListSlice = createSlice({
    name: 'currentTasksList',
    initialState: {
        currentTasks: [],
        navButtons: [
            {
                title : 'Все задачи',
                className : 'nav-row__btn nav-row__btn--active',
                id : 'btn_1'
            },
            {
                title : 'Текущие задачи',
                className : 'nav-row__btn',
                id : 'btn_2'
            },
            {
                title : 'Завершенные задачи',
                className : 'nav-row__btn',
                id : 'btn_3'
            }
        ],
    },
    reducers: {
        createCurrentTasks: (state, newTasksList) => {
            state.currentTasks = newTasksList.payload.map(item => item)
        },
        setNavButtons: (state, btnId) => {
            state.navButtons.map(item => {
                item.className = item.id === btnId.payload ? 'nav-row__btn nav-row__btn--active' : 'nav-row__btn';
                return item;
            })
        },
        editTask: (state, btnId) => {
            state.currentTasks.map(item => {
                (item.id === btnId.payload && !item.isChecked && item.editBoxItem.className === className) ? 
                item.editBoxItem.className = activeClassName : item.editBoxItem.className = className;
                return item;
            });
        },
    },
});

export const { createCurrentTasks, setNavButtons, editTask } = currentTasksListSlice.actions;

export const selectCurrentTasks = state => state.currentTasksList.currentTasks;
export const selectNavButtons = state => state.currentTasksList.navButtons;


export default currentTasksListSlice.reducer;