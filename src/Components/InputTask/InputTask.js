import React, {useRef} from 'react';
import './InputTask.css';



function InputTask(props) {
    const inputRef = useRef(null);

    const addInputText = () => {
        if (inputRef.current.value === '') return alert('Введите текст задачи');
        props.addTask(inputRef.current.value);
        inputRef.current.value = '';
    };


    return (
            <div className="input">
                <input type="text" className='input__field' placeholder='Введите название задачи' ref={inputRef} onKeyPress={(e) => {if(e.code === "Enter" || e.code === "NumpadEnter") addInputText()}}/>
                <div className="input__buttons-box">
                    <button className='input__add-btn' onClick={addInputText}>Добавить</button>
                    <button className='input__clear-btn' onClick={props.clearTasksList}>Очистить все</button>
                </div>
                    
            </div>
    );
}

export default InputTask;
