import { TaskObj } from '../../store/reducers/interface';

export const sortTasks = (list: TaskObj[]) => {
    const sortTasks = [...list].sort((a, b) => {
        if (a.title > b.title) return 1;

        return (a.title < b.title) ? -1 : 0;
    });
    return sortTasks;
};