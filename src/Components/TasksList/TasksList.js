import React from 'react';
import PropTypes from 'prop-types';
import {
  selectTasksList,
  makeHotTask,
  completeTheTask,
  clearTask,
  saveChangesTask,
  selectTextareaValue,
  setTextareaValue 
} from '../../store/reducers/tasksListSlice';
import { selectCurrentTasks, editTask } from '../../store/reducers/currentTasksListSlice';
import { useSelector, useDispatch } from 'react-redux';
import './TasksList.css';

function TasksList() {
  const tasks = useSelector(selectTasksList);
  const currentTasks = useSelector(selectCurrentTasks);
  const textareaValue = useSelector(selectTextareaValue);
  const dispatch = useDispatch();

  const findIndex = (str) => {
    return str.split('').filter(item => !isNaN(Number(item))).join('');
  };

  const handlerMakeHotTask = (e) => {
    const btnId = +findIndex(e.target.id);
    dispatch(makeHotTask(btnId));
  };

  const handlerCompleteTheTask = (e) => {
    const btnId = +findIndex(e.target.id);
    dispatch(completeTheTask(btnId));
    handlerEditTask(e);
  };

  const handlerClearTask = (e) => {
    const list = tasks.filter(item => item.id !== +findIndex(e.target.id));
    dispatch(clearTask(list));
  };

  const handlerEditTask = (e) => {
    const btnId = +findIndex(e.target.id);
    dispatch(setTextareaValue(''));
    dispatch(editTask(btnId));
  };

  const handlerSaveChangesTask = (e) => {
    const idBtn = +findIndex(e.target.id);
    const text = textareaValue.trim();

    if (text === '') return alert('Введите текст задачи');

    for (let item of tasks) {
      if(item.id !== idBtn && item.title === text) return alert('Такая задача уже есть');
    }

    dispatch(saveChangesTask(idBtn));

    handlerEditTask(e);
  };

  const handlerCancelChangesTask = (e) => {
    handlerEditTask(e);
  };

  return (
      <div className="tasks-box">
        <ol className="tasks-list">

          {currentTasks.map(task => 
            <li
            key={task.id}
            className={"tasks-list__item" + (task.isChecked ? ' task-done' : '') + ((task.isHot && !task.isChecked) ? ' task-hot' : '')}>
              
              <div className="tasks-list__item-box">
                
                <div className="checkbox-hot-box">
                  
                  <input 
                    className='checkbox-hot' 
                    type="checkbox" 
                    id={`hot_${task.id}`} 
                    defaultChecked= {task.isHot ? 'checked' : ''} 
                    onChange={handlerMakeHotTask}/>
                  
                  <label
                  htmlFor={`hot_${task.id}`}
                  className='tasks-list__label-hot-input'></label>
                
                </div>
                
                <p
                id={`title_${task.id}`}
                className={'tasks-list__title' + (task.isChecked ? ' tasks-list__title-done' : '')}
                onClick={handlerEditTask}>{task.title}</p>
                
                <div className="checkbox-controls">

                  <div className="checkbox-done-box">

                    <input
                    className='checkbox-done'
                    type="checkbox"
                    id={task.id}
                    onChange={handlerCompleteTheTask}/>
                    
                    <label
                    htmlFor={task.id}
                    className='tasks-list__label-done-input'></label>
                  
                  </div>
                  
                  <button
                  id={`delTaskBtn_${task.id}`}
                  className={'tasks-list__del-btn' + (task.isChecked ? ' del-btn__done' : '')}
                  onClick={handlerClearTask}></button>
                
                </div>
              
              </div>
              
              <hr />
              
              <div
              className={task.editBoxItem.className}
              id={task.editBoxItem.idEditBox}>
                
                <textarea
                defaultValue={textareaValue}
                id={task.editBoxItem.idTextArea}
                rows="3"
                onChange={(el) => {
                  let text = el.target.value
                  dispatch(setTextareaValue(text))
                }}></textarea>

                <div className="tasks-list__edit-box-buttons">
                  
                  <button
                  className="tasks-list__btn-save"
                  id={task.editBoxItem.idBtnSave}
                  onClick={handlerSaveChangesTask}>Сохранить</button>
                  
                  <button
                  className="tasks-list__btn-cancel"
                  id={task.editBoxItem.idBtnCancel}
                  onClick={handlerCancelChangesTask}>Отмена</button>
                
                </div>
              
              </div>
            
            </li>
          )}

        </ol>
      </div>
  );
}

export default TasksList;

TasksList.propTypes = {
  currentTasks: PropTypes.array,
  tasksList: PropTypes.array,
  setTask: PropTypes.func
};