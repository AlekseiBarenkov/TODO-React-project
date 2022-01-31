import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, clearTasksList, addInputText } from '../../store/reducers/tasksListSlice';
import { RootState } from '../../store/store';
import './InputTask.css';

const InputTask: React.FC = () => {
    const { tasksList, inputText } = useSelector((state: RootState) => state.tasksList);
    const dispatch = useDispatch();

    const handlerAddTask = () => {
        let matches = false;
        const idTask = String(Date.now());

        tasksList.map(item => {
            if (item.title.trim().toLowerCase() === inputText.toLowerCase() && !item.isChecked) {
                matches = true;
                return item;
            };
        });

        if (matches) return alert('Такая задача уже есть');

        if (inputText === '') {
            return alert('Введите текст задачи');
        };

        let taskText = inputText.trim()[0].toUpperCase() + inputText.slice(1);

        const taskObj = {
            id: idTask,
            title: taskText,
            isChecked: false,
            isHot: false,
            editBoxClassName: 'tasks-list__edit-box'
        };

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
                onChange={(el) => { dispatch(addInputText(el.target.value)) }}
                onKeyPress={handleOnKeyPress}
            />

            <div className="input__buttons-box">

                <button
                    className='input__add-btn'
                    onClick={handlerAddTask}
                >
                    Добавить
                </button>

                <button
                    className='input__clear-btn'
                    onClick={handlerClearTasksList}
                >
                    Очистить все
                </button>

            </div>

        </div>
    );
}

export default InputTask;
