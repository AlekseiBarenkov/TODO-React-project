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

  const findIndex = (value) => {
    if(typeof(value) === 'number') return value;
    return value.split('').filter(item => !isNaN(Number(item))).join('');
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

  const handlerClearTask = (id) => {
    dispatch(clearTask(id));
  };

  const handlerEditTask = (el) => {
    const btnId = +findIndex(el.target.id);
    dispatch(setTextareaValue(''));
    dispatch(editTask(btnId));
  };

  const handlerSaveChangesTask = (e) => {
    const idBtn = +findIndex(e.target.id);

    dispatch(saveChangesTask(idBtn));
  };

  const handlerCancelChangesTask = (e) => {
    handlerEditTask(e);
  };

  const getClassName = (taskId) => {
    const index = +findIndex(taskId);
    let isChecked = false;
    let isHot = false;

    tasks.map(item => { 
      if(item.id === index && item.isChecked) isChecked = true;
      if(item.id === index && item.isHot && !item.isChecked) isHot = true;
    })

    if(taskId === `title_${index}` && isChecked) return ' tasks-list__title-done';
    if(taskId === `delTaskBtn_${index}` && isChecked) return ' del-btn__done';

    if (isChecked) return (' task-done');

    if (isHot && !isChecked) return (' task-hot');

    return '';
  }

  return (
      <div className="tasks-box">
        <ol className="tasks-list">

          {currentTasks.map(task => 
            <li
            key={task.id}
            className={"tasks-list__item" + getClassName(task.id)}>
              
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
                className={'tasks-list__title'}
                onClick={(el) => handlerEditTask(el)}>{task.title}</p>
                
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
                  className={'tasks-list__del-btn' + getClassName(`delTaskBtn_${task.id}`)}
                  onClick={() => handlerClearTask(task.id)}></button>
                
                </div>
              
              </div>
              
              <hr />
              
              <div
              className={task.editBoxClassName}>
                
                <textarea
                value={textareaValue}
                rows="3"
                onChange={(el) => {dispatch(setTextareaValue(el.target.value))}}></textarea>

                <div className="tasks-list__edit-box-buttons">
                  
                  <button
                  className="tasks-list__btn-save"
                  id={`saveBtn_${task.id}`}
                  onClick={handlerSaveChangesTask}>Сохранить</button>
                  
                  <button
                  className="tasks-list__btn-cancel"
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