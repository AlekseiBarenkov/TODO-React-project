import React from 'react';
import Input from '../Input/Input';
import './Tasks.css';

class Tasks extends React.Component {
    constructor() {
        super();

        this.state = {
            tasks: [
                
            ],
            buttons: [
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
        };

        this.updateData = this.updateData.bind(this);
        this.completeTheTask = this.completeTheTask.bind(this);
        this.findIndexNumFromStr = this.findIndexNumFromStr.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
        this.makeHotTask = this.makeHotTask.bind(this);
        this.clearTask = this.clearTask.bind(this);
        this.activateTaskList = this.activateTaskList.bind(this);
        this.editTask = this.editTask.bind(this);
        this.saveChangesTask = this.saveChangesTask.bind(this);
        this.cancelChangesTask = this.cancelChangesTask.bind(this);
        this.addRefEditBox = this.addRefEditBox.bind(this);
        this.refEditBox = React.createRef();
        this.refEditBox.current = [];
        this.addRefTextArea = this.addRefTextArea.bind(this);
        this.refTextArea = React.createRef();
        this.refTextArea.current = [];
    }


    componentDidMount() {
        const temp = JSON.parse(window.localStorage.getItem('tasksList'));
        if (temp) {
            this.setState({ tasks : temp});
        }
    }

    componentDidUpdate() {
        localStorage.setItem('tasksList', JSON.stringify(this.state.tasks));
    }
    updateData(task) {
        this.setState({ tasks : task});
    }
    
    completeTheTask(e) {
        const index = () => {
            for (let key in this.state.tasks) {
                if (this.state.tasks[key].id === +e.target.id) return key;
            }
        };
        this.setState(state => {
            let {tasks} = state;
            tasks[index()].checked = true;
            return state;
        });

    }

    findIndexNumFromStr (str) {
        return str.split('').filter(item => !isNaN(Number(item))).join('');
    }

    makeHotTask(e) {
        const index = () => {
            for (let key in this.state.tasks) {
                if (this.state.tasks[key].id === +this.findIndexNumFromStr(e.target.id)) return key;
            }
        };
        if(this.state.tasks[index()].hot) {
            this.setState(state => {
                let {tasks} = state;
                tasks[index()].hot = false;
                return state;
            });
        } else {
            this.setState(state => {
                let {tasks} = state;
                tasks[index()].hot = true;
                return state;
            });
        }
        
    }

    sortTasks(tasksList) {
        const copyTasks = [...tasksList];
        
        const sortTasks = copyTasks.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
        });
        return sortTasks;
    }
    clearTask(e) {
        let tasksList = [];
        tasksList = this.state.tasks.filter(item => item.id !== +this.findIndexNumFromStr(e.target.id));
        this.setState({ tasks : tasksList });
    }

    activateTaskList(e) {
        this.setState(state => {
            let {buttons} = state;
            for (let item of buttons) {
                if(item.id === e.target.id) {
                    item.className = 'nav-row__btn nav-row__btn--active';
                } else {item.className = 'nav-row__btn';}
            }
            return state;
        });
    }

    addRefEditBox(e) {
        if (e && !this.refEditBox.current.includes(e)) {
            this.refEditBox.current.push(e);
        }
    }

    addRefTextArea(e) {
        if (e && !this.refTextArea.current.includes(e)) {
            this.refTextArea.current.push(e);
        }
    }

    editTask(e) {
        this.refEditBox.current.forEach(element => {
            (this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id) && element.className !== 'tasks-list__edit-box tasks-list__edit-box--active') ? element.className = 'tasks-list__edit-box tasks-list__edit-box--active' : element.className = 'tasks-list__edit-box';
            }
            
        );
    }
    saveChangesTask(e) {
        let textAreaValue = '';
        this.refTextArea.current.forEach(element => {
            if(this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id)) textAreaValue = element.value.trim();
        });
        this.setState(state => {
            let {tasks} = state;
            for (let item of tasks) {
                if(item.id === +this.findIndexNumFromStr(e.target.id)) {
                    item.title = textAreaValue[0].toUpperCase() + textAreaValue.slice(1);
                }
            }
            return state;
        });
        this.editTask(e);
    }

    cancelChangesTask(e) {
        this.refTextArea.current.forEach(element => {
            if(this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id)) element.value = element.defaultValue;
        });
        this.editTask(e);
    }
    render () {
        const {tasks} = this.state;
        const {buttons} = this.state;
        const hotTasksList = this.sortTasks(tasks.filter(task => (!task.checked && task.hot)));
        const currentTasksList = this.sortTasks(tasks.filter(task => (!task.checked && !task.hot)));
        const finishedTasksList = this.sortTasks(tasks.filter(task => task.checked));

        return (
            <>  
                <header className='header'>
                    <h1 className='header__title'>My ToDo</h1>
                </header>
                <Input updateData={this.updateData} tasks={this.state.tasks}/>
                <h2 className='status-title'>Всего задач: {hotTasksList.length + currentTasksList.length + finishedTasksList.length}, из них выполнено: {finishedTasksList.length}</h2>
                <div className="nav-row">
                    {
                        buttons.map(({title, className, id}) => {
                            return (
                                <button key={id} className={className} id={id} onClick={this.activateTaskList}>{title}</button>
                                
                            )
                        })
                    }
                </div>
                <div>
                    {
                        buttons.map(({title, className}) => {
                            return (
                                <div key={title} className="tasks-box">
                                    <ol className="tasks-list">
                                        {((className === 'nav-row__btn nav-row__btn--active' && title === 'Все задачи') ? [...hotTasksList, ...currentTasksList, ...finishedTasksList] : (className === 'nav-row__btn nav-row__btn--active' && title === 'Текущие задачи') ? [...hotTasksList, ...currentTasksList] : (className === 'nav-row__btn nav-row__btn--active' && title === 'Завершенные задачи') ? [...finishedTasksList] : []).map(task => 
                                        <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '')}>
                                            <input className='checkbox-hot' type="checkbox" id={`hot_${task.id}`} defaultChecked= {task.hot ? 'checked' : ''}  onChange={this.makeHotTask}/>
                                            <label htmlFor={`hot_${task.id}`} className='tasks-list__label-hot-input' id={`labelHot_${task.id}`} >
                                            </label>
                                                <p className="tasks-list__title">{task.title}</p>
                                                
                                            <label htmlFor={task.id} className='tasks-list__label-done-input' id={`labelDone_${task.id}`}>
                                                <input type="checkbox" id={task.id} onChange={this.completeTheTask}/>
                                                Готово
                                            </label>
                                            <button id={`edit-title_${task.id}`} className='tasks-list__edit-btn' onClick={this.editTask}><span className="material-icons">edit</span></button>
                                            <button id={`delTaskBtn_${task.id}`} className='tasks-list__del-btn' onClick={this.clearTask}><span className="material-icons">delete</span></button>
                                            <div className="tasks-list__edit-box" id={`editBox_${task.id}`} ref={this.addRefEditBox} >
                                                    <textarea defaultValue={task.title} id={`textarea_${task.id}`} cols="30" rows="10" ref={this.addRefTextArea}></textarea>
                                                    <button id={`saveBtn_${task.id}`} onClick={this.saveChangesTask}>Сохранить</button>
                                                    <button id={`cancelBtn_${task.id}`} onClick={this.cancelChangesTask}>Отмена</button>
                                            </div>
                                        </li>)}
                                    </ol>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}

export default Tasks;