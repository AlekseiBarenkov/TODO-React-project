import React, {useRef} from 'react';
import './InputTask.css';

function InputTask(props) {
    const inputRef = useRef(null);

    const handlerAddInputText = () => {
        props.setCurrentTasks(
            props.currentTasks.map(item => {
                item.editBoxItem.className = 'tasks-list__edit-box';
                return item
            })
        )

        if (inputRef.current.value === '') return alert('Введите текст задачи');
        
        props.addTask(inputRef.current.value);
        inputRef.current.value = '';
    };

    const handleOnKeyPress = (e) => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) handlerAddInputText();
    };

    return (
            <div className="input">
                <input type="text" className='input__field' placeholder='Введите название задачи' ref={inputRef} onKeyPress={handleOnKeyPress}/>
                <div className="input__buttons-box">
                    <button className='input__add-btn' onClick={handlerAddInputText}>Добавить</button>
                    <button className='input__clear-btn' onClick={props.clearTasksList}>Очистить все</button>
                </div>
                    
            </div>
    );
}

export default InputTask;
