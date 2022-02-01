export interface TasksListState {
    tasksList: TaskObj[];
    textareaValue: string;
    inputText: string
}

export interface NavButtonsItems {
    title: string;
    className: string;
    id: string;
}

export interface ElementValue {
    id: number
}

export interface CurrentTasksListState {
    currentTasks: TaskObj[];
    navButtons: NavButtonsItems[];
}

export interface TaskObj {
    id: string;
    title: string;
    isChecked: boolean;
    isHot: boolean;
    editBoxClassName: string
};

export interface OthersState {
    isDarkTheme: boolean;
    isLoading: boolean
}

