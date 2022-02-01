import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editBoxClassName } from '../../Util/EditBoxClasses/ClassNames';
import { CurrentTasksListState, TaskObj } from './interface';

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
        createCurrentTasks: (state, newTasksList: PayloadAction<TaskObj[]>) => {
            state.currentTasks = newTasksList.payload.map((item: TaskObj) => item)
        },
        setNavButtons: (state, btnId: PayloadAction<string>) => {
            state.navButtons.map(item => {
                item.className = item.id === btnId.payload ? 'nav-row__btn nav-row__btn--active' : 'nav-row__btn';
                return item;
            })
        },
        editTask: (state, btnId: PayloadAction<string>) => {
            state.currentTasks.map((item: TaskObj) => {
                (item.id === btnId.payload && !item.isChecked && item.editBoxClassName === editBoxClassName.className) ?
                    item.editBoxClassName = editBoxClassName.activeClassName : item.editBoxClassName = editBoxClassName.className;
                return item;
            });
        },
    },
});

export const { createCurrentTasks, setNavButtons, editTask } = currentTasksListSlice.actions;

export default currentTasksListSlice.reducer;