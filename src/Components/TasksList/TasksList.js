import React from 'react';
import tasksList from '../../store/tasksList';
import { observer } from 'mobx-react-lite';
import './TasksList.css';

const TasksList = observer(() => {
  const findIndex = (value) => {
    if(typeof(value) === 'number') return value;
    return value.split('').filter(item => !isNaN(Number(item))).join('');
  };

  const handlerMakeHotTask = (e) => {
    const btnId = +findIndex(e.target.id);
    tasksList.makeHotTask(btnId);
  };

  const handlerCompleteTheTask = (id) => {
    tasksList.completeTheTask(id)
  };

  const handlerClearTask = (id) => {
    tasksList.clearTask(id)
  };

  const handlerEditTask = (el) => {
    const idTitle = +findIndex(el.target.id)

    tasksList.editTask(idTitle);
  };

  const handlerSaveChangesTask = (e) => {
    const idBtn = +findIndex(e.target.id);
    const text = tasksList.textareaValue.trim();
    
    if (text === '') return alert('Введите текст задачи');

    tasksList.saveChangesTask(text, idBtn);
  };

  const handlerCancelChangesTask = () => {
    tasksList.cancelChangesTask()
  };

  const sortTasks = (list) => {
    const sortTasks = [...list].sort((a, b) => {
        if (a.title > b.title) {
        return 1;
        }

        if (a.title < b.title) {
        return -1;
        }
        return 0;
    });
    return sortTasks;
  };

  const showCurrentTasks = () => {
      const hotTasksList = sortTasks(tasksList.tasks.filter(task => (!task.isChecked && task.isHot)));
      const currentTasksList = sortTasks(tasksList.tasks.filter(task => (!task.isChecked && !task.isHot)));
      const finishedTasksList = sortTasks(tasksList.tasks.filter(task => task.isChecked));
      let newTasksList =[];
      let typeOfTasks = '';

      tasksList.navButtons.forEach(item => {
        if(item.className === 'nav-row__btn nav-row__btn--active') typeOfTasks = item.id;
    });
      
      if(typeOfTasks === 'btn_1') newTasksList = [...hotTasksList, ...currentTasksList, ...finishedTasksList];

      if(typeOfTasks === 'btn_2') newTasksList = [...hotTasksList, ...currentTasksList];

      if(typeOfTasks === 'btn_3') newTasksList = [...finishedTasksList];

      localStorage.setItem('tasksList', JSON.stringify(newTasksList))

      return newTasksList;
  };

  const getClassName = (taskId) => {
    const index = +findIndex(taskId);
    let isChecked = false;
    let isHot = false;

    tasksList.tasks.map(item => { 
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

          {showCurrentTasks().map(task => 
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
                className={'tasks-list__title' + getClassName(`title_${task.id}`)}
                onClick={(el) => handlerEditTask(el)}>{task.title}</p>
                
                <div className="checkbox-controls">

                  <div className="checkbox-done-box">

                    <input
                    className='checkbox-done'
                    type="checkbox"
                    id={task.id}
                    onChange={() => handlerCompleteTheTask(task.id)}/>
                    
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
                value={tasksList.textareaValue}
                rows="3"
                onChange={(el) => tasksList.addTextareaValue(el)}></textarea>

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
})

export default TasksList;