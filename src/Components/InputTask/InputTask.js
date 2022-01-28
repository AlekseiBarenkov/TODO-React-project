import { observer } from 'mobx-react-lite';
import tasksList from '../../store/tasksList';
import './InputTask.css';

const InputTask = observer (() => { 
    const handlerAddTask = () => {
        const inputText = tasksList.inputText.trim();
        const idTask = Date.now();
        let matches = false;

        tasksList.tasks.map(item => {
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
    
        const taskObj = {
            id: idTask,
            title: taskText,
            isChecked: false,
            isHot: false,
            editBoxClassName: 'tasks-list__edit-box'
        };

        tasksList.addTask(taskObj);
    };

    const handlerClearTasksList = () => tasksList.clearTasksList();

    const handleOnKeyPress = (e) => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) handlerAddTask(e);
    };

    return (
            <div className="input">
                <input
                type="text"
                className='input__field'
                value={tasksList.inputText}
                placeholder='Введите название задачи'
                onChange={(el) => tasksList.addInputText(el)}
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
})

export default InputTask;
