import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentTasksListState, TaskObj } from './interface';

const className = 'tasks-list__edit-box';
const activeClassName = 'tasks-list__edit-box tasks-list__edit-box--active';

const initialState: CurrentTasksListState = {
    currentTasks: [],
    navButtons: [
        {
            title: 'Все задачи',
            className: 'nav-row__btn nav-row__btn--active',
            id: 'btn_1'
        },
        {
            title: 'Текущие задачи',
            className: 'nav-row__btn',
            id: 'btn_2'
        },
        {
            title: 'Завершенные задачи',
            className: 'nav-row__btn',
            id: 'btn_3'
        }
    ]
}

export const currentTasksListSlice = createSlice({
    name: 'currentTasksList',
    initialState,
    reducers: {
        createCurrentTasks: (state, newTasksList) => {
            state.currentTasks = newTasksList.payload.map((item: {}) => item)
        },
        setNavButtons: (state, btnId) => {
            state.navButtons.map(item => {
                item.className = item.id === btnId.payload ? 'nav-row__btn nav-row__btn--active' : 'nav-row__btn';
                return item;
            })
        },
        editTask: (state, btnId) => {
            state.currentTasks.map((item: TaskObj) => {
                (item.id === btnId.payload && !item.isChecked && item.editBoxClassName === className) ?
                    item.editBoxClassName = activeClassName : item.editBoxClassName = className;
                return item;
            });
        },
    },
});

export const { createCurrentTasks, setNavButtons, editTask } = currentTasksListSlice.actions;

export default currentTasksListSlice.reducer;