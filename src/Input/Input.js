import React from 'react';
import './Input.css';
class Input extends React.Component {
    constructor() {
        super();

        this.tasksList = [];
        this.refInputTask = React.createRef();
        this.addTask = this.addTask.bind(this);
        this.keyGen = this.keyGen.bind(this);
        this.findingKeyMatches = this.findingKeyMatches.bind(this);
        this.keyLimitReached = this.keyLimitReached.bind(this);
        this.findSameTasks = this.findSameTasks.bind(this);
    }
    componentDidMount() {
        const temp = JSON.parse(window.localStorage.getItem('tasksList'));
        if (temp) {
            for (let item of temp) {
                this.tasksList.push(item);
            }
        }
    }
    keyGen(min, max, arr) {
        let num = min + Math.random() * (max + 1 - min);

        if (this.findingKeyMatches(num, arr) && (this.keyLimitReached(max, arr) === false)) {
            return this.keyGen(min, max, arr);
        } else if (this.keyLimitReached(max, arr)) {
            return;
        }
        return Math.floor(num);
    }

    findingKeyMatches(key, arr) {
        let matches = false;

        arr.forEach(el => {
            if (el.id === Math.floor(key)) {
                matches = true;
            }
        });
        return matches;
    }

    keyLimitReached(keyMaxValue, arr) {
        let status = false;

        if (arr.length >= keyMaxValue) {
            status = true;
        }
        return status;
    }

    findSameTasks(str, arr) {
        let matches = false;

        arr.forEach (item => {
            if (item.title.trim().toLowerCase() === str.toLowerCase()) {
                matches = true;
            }
        });
        return matches;
    }

    addTask() {
        let taskText = this.refInputTask.current.value.trim();
        let taskObj = {};
        let key = this.keyGen(0, 100, this.tasksList);
        if (this.tasksList.length !== this.props.tasks.length) {
            this.tasksList = [];
            this.props.tasks.forEach(el => {
                this.tasksList.push(el);
            });
        }

        if (key === undefined) {
            alert('Превышен предел количества допустимых задач');
        } else if (taskText === '') {
            alert('Введите текст задачи');
        } else if (this.findSameTasks(taskText, this.tasksList)){
            alert('Такая задача уже есть');
        } else {
            taskObj.id = key;
            taskObj.title = taskText[0].toUpperCase() + taskText.slice(1);
            taskObj.checked = false;
            taskObj.hot = false;
            taskObj.done = false;
            this.tasksList.push(taskObj);
        }
        
        this.refInputTask.current.value = '';
        
        this.updateTasks();
    }

    updateTasks() {
        this.props.updateData(this.tasksList);
    }

    clearTasksList() {
        this.tasksList = [];
        this.updateTasks();
    }
    
    render () {
        return (
            <div className="input">
                <input type="text" className='input__field' placeholder='Введите название задачи' ref={this.refInputTask} onKeyPress={(e) => {if(e.code === "Enter" || e.code === "NumpadEnter") this.addTask()}}/>
                <div className="input__buttons-box">
                    <button className='input__add-btn' onClick={() => {this.addTask()}}>Добавить</button>
                    <button className='input__clear-btn' onClick={() => {this.clearTasksList()}}>Очистить все</button>
                </div>
                
            </div>
        );
    }
}

export default Input;