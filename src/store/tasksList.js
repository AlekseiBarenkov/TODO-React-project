import { autorun, makeAutoObservable } from "mobx";

const className = 'tasks-list__edit-box';
const activeClassName = 'tasks-list__edit-box tasks-list__edit-box--active';

class TasksList {
    tasks = []
    navButtons = [
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
    ]
    inputText = ''
    textareaValue = ''
    isDarkTheme = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            const promise = new Promise((resolve, reject) => {
                resolve(JSON.parse(localStorage.getItem('tasksList')))
            })
            promise.then(data => (data) && this.setTasksList(data)).then(this.isLoading = !this.isLoading)
        })
    }
    setIsDarkTheme() {
        this.isDarkTheme = !this.isDarkTheme
    }
    setNavButtons(btnId) {
        this.navButtons.map(item => {
            item.className = item.id === btnId ? 'nav-row__btn nav-row__btn--active' : 'nav-row__btn';
            return item;
        })
        this.editTask()
    }
    addInputText(el) {
        this.inputText = el.target.value
    }
    addTextareaValue(el) {
        this.textareaValue = el.target.value
    }
    addTask(task) {
        this.tasks.push(task)
        this.inputText = ''
        this.editTask()
    }
    setTasksList(list) {
        this.tasks = list
    }
    clearTasksList() {
        this.tasks = []
    }
    makeHotTask(btnId) {
        this.tasks.map(item => {
            if (item.id === btnId && !item.isHot) {item.isHot = true}
            else if (item.id === btnId && item.isHot) {item.isHot = false}
            item.editBoxClassName = 'tasks-list__edit-box';
            return item;
        })
    }
    completeTheTask(btnId) {
        this.tasks.map(item => {
            if (item.id === btnId) item.isChecked = true;
            item.editBoxClassName = 'tasks-list__edit-box';
            return item;
        })
    }
    clearTask(id) {
        this.tasks = this.tasks.filter(item => item.id !== id)
    }
    editTask(btnId) {
        this.tasks.map(item => {
            (item.id === btnId && !item.isChecked && item.editBoxClassName === className) ? 
            item.editBoxClassName = activeClassName : item.editBoxClassName = className;
            return item;
        })
        this.textareaValue = ''
    }
    saveChangesTask(textareaValue, btnId) {
        const text = textareaValue.trim();
        for (let item of this.tasks) {
            if(item.id !== btnId && item.title.toLowerCase() === text.toLowerCase()) return alert('Такая задача уже есть');
        }
        this.tasks.map(item => {
            if(item.id === btnId) item.title = text[0].toUpperCase() + text.slice(1);
            item.editBoxClassName = 'tasks-list__edit-box';
            return item;
        })
    }
    cancelChangesTask() {
        this.tasks.map(item => { 
            item.editBoxClassName = 'tasks-list__edit-box';
            return item
        })
    }
    
}

export default new TasksList()