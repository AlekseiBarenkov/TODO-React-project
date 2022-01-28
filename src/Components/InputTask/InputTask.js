import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addTask, clearTasksList, selectTasksList, addInputText, selectInputText} from '../../store/reducers/tasksListSlice';
import './InputTask.css';

function InputTask() {
    const tasks = useSelector(selectTasksList);
    const inputText = useSelector(selectInputText);
    const dispatch = useDispatch();
    
    const handlerAddTask = () => {
        let matches = false;
        const idTask = Date.now();

        tasks.map(item => {
            if (item.title.trim().toLowerCase() === inputText.toLowerCase()) {
                matches = true;
                return item;
            };
        });

        if(matches) return alert('Такая задача уже есть');

        if (inputText === '') {
            return alert('Введите текст задачи');
        };
        
        let taskText = inputText.trim()[0].toUpperCase() + inputText.slice(1);
        
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
    }

    const handlerClearTasksList = () => dispatch(clearTasksList());;

    const handleOnKeyPress = (e) => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) handlerAddTask();
    };
    
    return (
        <div className="input">
            <input
            type="text"
            className='input__field'
            value={inputText}
            placeholder='Введите название задачи'
            onChange={(el) => {
                let text = el.target.value
                dispatch(addInputText(text))
            }}
            onKeyPress={handleOnKeyPress}/>
            <div className="input__buttons-box">
                <button
                className='input__add-btn'
                onClick={handlerAddTask}>Добавить</button>
                <button
                className='input__clear-btn'
                onClick={handlerClearTasksList}>Очистить все</button>
            </div>
                
        </div>
    );
}

export default InputTask;
