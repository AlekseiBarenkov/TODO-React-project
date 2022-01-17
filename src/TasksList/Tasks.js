import React from 'react';
import Input from '../Input/Input';
import './Tasks.css';
import {ChangeThemeContext} from '../Context/ChangeThemeContext';
//const ChangeThemeContext = React.createContext();
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
            ],
            darkTheme: false,
            handlerToggleTheme: this.handlerToggleTheme = () => {
            
                this.setState (state => ({
                    darkTheme:
                        !state.darkTheme ? true : false,
                  }));
            }
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
        this.showCurrentTasks = this.showCurrentTasks.bind(this);
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

    findIndexNumFromStr (str) {
        return str.split('').filter(item => !isNaN(Number(item))).join('');
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

    makeHotTask(e) {
        this.setState({
            tasks: this.state.tasks.map(item => {
                if (item.id === +this.findIndexNumFromStr(e.target.id) && !item.hot) {item.hot = true;}
                else if (item.id === +this.findIndexNumFromStr(e.target.id) && item.hot) {item.hot = false;}
                return item;
            })
        });
    }

    completeTheTask(e) {
        this.setState({
            tasks: this.state.tasks.map(item => {
                if (item.id === +e.target.id) item.checked = true;
                return item;
            })
        });
    }

    clearTask(e) {
        this.setState({
            tasks: this.state.tasks.filter(item => item.id !== +this.findIndexNumFromStr(e.target.id))
        });
    }

    activateTaskList(e) {
        this.setState({
            buttons: this.state.buttons.map(item => {
                (item.id === e.target.id) ? item.className = 'nav-row__btn nav-row__btn--active' : item.className = 'nav-row__btn';
                return item;
            })
        });
    }

    editTask(e) {
        this.refEditBox.current.forEach(element => {
            (e.target.className !== 'tasks-list__title tasks-list__title-done' && this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id) && element.className !== 'tasks-list__edit-box tasks-list__edit-box--active') ? element.className = 'tasks-list__edit-box tasks-list__edit-box--active' : element.className = 'tasks-list__edit-box';
            }
        );
    }

    saveChangesTask(e) {
        this.refTextArea.current.forEach(element => {
            if(this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id)) {
                this.setState({
                    tasks: this.state.tasks.map(item => {
                        if(item.id === +this.findIndexNumFromStr(e.target.id)) item.title = element.value.trim()[0].toUpperCase() + element.value.slice(1);
                        return item;
                    })
                });
            }
        });
        this.editTask(e);
    }

    cancelChangesTask(e) {
        this.refTextArea.current.forEach(element => {
            if(this.findIndexNumFromStr(element.id) === this.findIndexNumFromStr(e.target.id)) element.value = element.defaultValue;
        });
        this.editTask(e);
    }

    showCurrentTasks(title, className) {
        const {tasks} = this.state;
        const hotTasksList = this.sortTasks(tasks.filter(task => (!task.checked && task.hot)));
        const currentTasksList = this.sortTasks(tasks.filter(task => (!task.checked && !task.hot)));
        const finishedTasksList = this.sortTasks(tasks.filter(task => task.checked));
        let newTasksList =[];

        if(className === 'nav-row__btn nav-row__btn--active' && title === 'Все задачи') newTasksList = [...hotTasksList, ...currentTasksList, ...finishedTasksList];
        if(className === 'nav-row__btn nav-row__btn--active' && title === 'Текущие задачи') newTasksList = [...hotTasksList, ...currentTasksList];
        if(className === 'nav-row__btn nav-row__btn--active' && title === 'Завершенные задачи') newTasksList = [...finishedTasksList];

        return newTasksList;
    }

    render () {
        let num = 0;
        const {tasks, buttons} = this.state;
        const {darkTheme} = this.state;

        return (
            <>  
                <div className={"wrapper" + (darkTheme ? ' dark-theme' : '')}>
                    <div className="container">
                        <header className='header'>
                            <h1 className='header__title'>My ToDo</h1>
                        </header>
                        <Input updateData={this.updateData} tasks={tasks}/>
                        <div className="title">
                            <div className="toggle-theme">
                                <ChangeThemeContext.Provider value={this.state}>
                                    <ChangeThemeContext.Consumer>
                                        {({handlerToggleTheme}) => (
                                            <button className={"toggle-theme__btn" + (darkTheme ? ' dark-theme-active' : '')} onClick={handlerToggleTheme}></button>
                                        )}
                                    </ChangeThemeContext.Consumer>
                                </ChangeThemeContext.Provider>
                            </div>
                            <h2 className='tasks-lists-title'>Мои задачи</h2>
                        </div>
                        <div className="nav-row">
                            {
                                buttons.map(({title, className, id}) => {
                                    return (
                                        <button key={id} className={className} id={id} onClick={this.activateTaskList}>{title}</button>
                                        
                                    )
                                })
                            }
                        </div>
                        <div className='tasks-lists-container'>
                            {
                                buttons.map(({title, className}) => {
                                    return (
                                        <div key={title} className="tasks-box">
                                            <ol className="tasks-list">
                                                {this.showCurrentTasks(title, className).map(task => 
                                                <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '') + ((task.hot && !task.checked) ? ' task-hot' : '')}>
                                                    <input className='checkbox-hot' type="checkbox" id={`hot_${task.id}`} defaultChecked= {task.hot ? 'checked' : ''}  onChange={this.makeHotTask}/>
                                                    <label htmlFor={`hot_${task.id}`} className='tasks-list__label-hot-input' id={`labelHot_${task.id}`} >
                                                    </label>
                                                    <p id={`title_${task.id}`} className={"tasks-list__title" + (task.checked ? ' tasks-list__title-done' : '')}  onClick={this.editTask}>{`${num +=1}. ${task.title}`}</p>
                                                    <input className='checkbox-done' type="checkbox" id={task.id} onChange={this.completeTheTask}/>
                                                    <label htmlFor={task.id} className='tasks-list__label-done-input' id={`labelDone_${task.id}`}>
                                                    </label>
                                                    <button id={`delTaskBtn_${task.id}`} className='tasks-list__del-btn' onClick={this.clearTask}></button>
                                                    <div className="tasks-list__edit-box" id={`editBox_${task.id}`} ref={this.addRefEditBox} >
                                                            <textarea defaultValue={task.title} id={`textarea_${task.id}`} cols="80" rows="3" ref={this.addRefTextArea}></textarea>
                                                            <div className="tasks-list__edit-box-buttons">
                                                                <button className="tasks-list__btn-save" id={`saveBtn_${task.id}`} onClick={this.saveChangesTask}>Сохранить</button>
                                                                <button className="tasks-list__btn-cancel" id={`cancelBtn_${task.id}`} onClick={this.cancelChangesTask}>Отмена</button>
                                                            </div>
                                                    </div>
                                                </li>)}
                                            </ol>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <h2 className='status-title'>Всего задач: {tasks.length}, из них выполнено: {tasks.filter(task => task.checked).length}</h2>
                    </div>
                </div>
            </>
        );
    }
}


export default Tasks;