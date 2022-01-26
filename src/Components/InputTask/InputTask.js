import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addTask, clearTasksList, selectTasksList} from '../../store/reducers/tasksListSlice';
import './InputTask.css';

function InputTask() {
    const inputRef = useRef(null);
    const tasks = useSelector(selectTasksList);
    const dispatch = useDispatch();
    
    const findSameTasks = (str, arr) => {
        let matches = false;

        for (let item of arr) {
            if (item.title.trim().toLowerCase() === str.toLowerCase()) return matches = true;
        }
        
        return matches;
    };
    
    const handlerAddTask = () => {
        const inputText = inputRef.current.value;
        if (findSameTasks(inputText, tasks)) {
            inputRef.current.value = '';
            return alert('Такая задача уже есть');
        };
        
        if (inputText === '') {
            return alert('Введите текст задачи');
        };
        
        let taskText = inputText.trim()[0].toUpperCase() + inputText.slice(1);
        const idTask = Date.now();
        const editBoxItem = {
            className: 'tasks-list__edit-box',
            idEditBox: `editBox_${idTask}`,
            idTextArea: `textarea_${idTask}`,
            idBtnSave: `saveBtn_${idTask}`,
            idBtnCancel: `cancelBtn_${idTask}`
        };
        const taskObj = {
            id: idTask,
            title: taskText,
            isChecked: false,
            isHot: false,
            editBoxItem
        }

        dispatch(addTask(taskObj));
        inputRef.current.value = '';
    }

    const handlerClearTasksList = () => dispatch(clearTasksList());;

    const handleOnKeyPress = (e) => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) handlerAddTask();
    };

    return (
            <div className="input">
                <input type="text" className='input__field' placeholder='Введите название задачи' ref={inputRef} onKeyPress={handleOnKeyPress}/>
                <div className="input__buttons-box">
                    <button className='input__add-btn' onClick={handlerAddTask}>Добавить</button>
                    <button className='input__clear-btn' onClick={handlerClearTasksList}>Очистить все</button>
                </div>
                    
            </div>
    );
}

export default InputTask;
