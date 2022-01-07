import React from 'react';
import Input from '../Input/Input';
import styles from './Tasks.css';

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
        this.sortTasks = this.sortTasks.bind(this);
        this.makeHotTask = this.makeHotTask.bind(this);
        this.clearTask = this.clearTask.bind(this);
        this.activateTaskList = this.activateTaskList.bind(this);
        this.refTasksButtons = React.createRef();
        this.refTasksButtons.current = [];
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

    makeHotTask(e) {
        const findIndex = e.target.id.split('').filter(item => !isNaN(Number(item))).join('');
        const index = () => {
            for (let key in this.state.tasks) {
                if (this.state.tasks[key].id === +findIndex) return key;
            }
        };
        this.setState(state => {
            let {tasks} = state;
            tasks[index()].hot = true;
            return state;
        });
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
        const findIndex = e.target.id.split('').filter(item => !isNaN(Number(item))).join('');
        let tasksList = [];
        tasksList = this.state.tasks.filter(item => item.id !== +findIndex);
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

    render () {
        const {tasks} = this.state;
        const {buttons} = this.state;
        const hotTasksList = this.sortTasks(tasks.filter(task => (!task.checked && task.hot)));
        const currentTasksList = this.sortTasks(tasks.filter(task => (!task.checked && !task.hot)));
        const finishedTasksList = this.sortTasks(tasks.filter(task => task.checked));

        return (
            <>  
                <Input updateData={this.updateData}/>
                <h2 className='title'>Всего задач: {hotTasksList.length + currentTasksList.length + finishedTasksList.length}, из них выполнено: {finishedTasksList.length}</h2>
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
                            if (className === 'nav-row__btn nav-row__btn--active' && title === 'Все задачи') {
                                return (
                                    <div key={title} className="tasks-box" id='all'>
                                        <ol className="tasks-list">
                                            {[...hotTasksList, ...currentTasksList, ...finishedTasksList].map(task => 
                                            <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '')}>
                                                <label htmlFor={`hot_${task.id}`} className='tasks-list__label-hot-input' id={`labelHot_${task.id}`} >
                                                    Важно!
                                                    <input type="checkbox" id={`hot_${task.id}`} defaultChecked= {task.hot ? 'checked' : ''}  onChange={this.makeHotTask}/>
                                                </label>
                                                    <p className="tasks-list__title">{task.title}</p>
                                                <label htmlFor={task.id} className='tasks-list__label-done-input' id={`labelDone_${task.id}`}>
                                                    <input type="checkbox" id={task.id} onChange={this.completeTheTask}/>
                                                    Готово
                                                </label>
                                                <button id={`delTaskBtn_${task.id}`} className='tasks-list__del-btn' onClick={this.clearTask}>Удалить</button>
                                            </li>)}
                                        </ol>
                                    </div>
                                )
                            } else if (className === 'nav-row__btn nav-row__btn--active' && title === 'Текущие задачи') {
                                return (
                                    <div  key={title} className="tasks-box" id='current'>
                                        <ol className="tasks-list">
                                            {[...hotTasksList, ...currentTasksList].map(task => 
                                            <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '')}>
                                                <label htmlFor={`hot_${task.id}`} className='tasks-list__label-hot-input' id={`labelHot_${task.id}`} >
                                                    Важно!
                                                    <input type="checkbox" id={`hot_${task.id}`} defaultChecked= {task.hot ? 'checked' : ''}  onChange={this.makeHotTask}/>
                                                </label>
                                                    <p className="tasks-list__title">{task.title}</p>
                                                <label htmlFor={task.id} className='tasks-list__label-done-input' id={`labelDone_${task.id}`}>
                                                    <input type="checkbox" id={task.id} onChange={this.completeTheTask}/>
                                                    Готово
                                                </label>
                                                <button id={`delTaskBtn_${task.id}`} className='tasks-list__del-btn' onClick={this.clearTask}>Удалить</button>
                                            </li>)}
                                        </ol>
                                    </div>
                                )
                            } else if (className === 'nav-row__btn nav-row__btn--active' && title === 'Завершенные задачи') {
                                return (
                                    <div  key={title} className="tasks-box" id='finished'>
                                        <ol className="tasks-list">
                                            {[...finishedTasksList].map(task => 
                                            <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '')}>
                                                    <p className="tasks-list__title">{task.title}</p>
                                                <button id={`delTaskBtn_${task.id}`} className='tasks-list__del-btn' onClick={this.clearTask}>Удалить</button>
                                            </li>)}
                                        </ol>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </>
        );
    }
}

export default Tasks;