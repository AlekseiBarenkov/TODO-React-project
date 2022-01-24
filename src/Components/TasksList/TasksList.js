import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './TasksList.css';
function TasksList(props) {
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    updateEditBox();
  }, [props.isDarkTheme, props.navButtons]);

  const updateEditBox = () => {
    props.setCurrentTasks(
      props.currentTasks.map(item => {
        item.editBoxItem.className = 'tasks-list__edit-box';
        return item
      })
    )
  }

  const findIndex = (str) => {
    return str.split('').filter(item => !isNaN(Number(item))).join('');
  };

  const handlerMakeHotTask = (e) => {
    props.setTask(
      props.tasksList.map(item => {
        if (item.id === +findIndex(e.target.id) && !item.isHot) {item.isHot = true;}
        else if (item.id === +findIndex(e.target.id) && item.isHot) {item.isHot = false;}
        return item;
      })
    );
  };

  const handlerCompleteTheTask = (e) => {
    props.setTask(
      props.tasksList.map(item => {
          if (item.id === +e.target.id) item.isChecked = true;
          return item;
      })
    );
    handlerEditTask(e);
  };

  const handlerClearTask = (e) => {
    props.setTask(
      props.tasksList.filter(item => item.id !== +findIndex(e.target.id))
    );
  };

  const handlerEditTask = (e) => {
    const className = 'tasks-list__edit-box';
    const activeClassName = 'tasks-list__edit-box tasks-list__edit-box--active';
    
    for (let item of props.tasksList) {
        if(item.id === +findIndex(e.target.id)) {
          setTextareaValue(item.title);
        }
    }

    props.setTask(
      props.tasksList.map(item => {
        (item.id === +findIndex(e.target.id) && !item.isChecked && item.editBoxItem.className === className) ? item.editBoxItem.className = activeClassName : item.editBoxItem.className = className;
        return item
      }
    ))
  };

  const handleTextareaValue = (e) => {
    setTextareaValue(e.target.value)
  }

  const handlerSaveChangesTask = (e) => {
    const idBtn = +findIndex(e.target.id);
    const text = textareaValue.trim();

    if (text === '') return alert('Введите текст задачи');

    for (let item of props.tasksList) {
      if(item.id !== idBtn && item.title === text) return alert('Такая задача уже есть');
    }

    props.setTask(
      props.tasksList.map(item => {
        if(item.id === idBtn) item.title = text[0].toUpperCase() + textareaValue.slice(1);
        return item;
      })
    );

    handlerEditTask(e);
  };

  const handlerCancelChangesTask = (e) => {

    handlerEditTask(e);
  };

  return (
      <div className="tasks-box">
        <ol className="tasks-list">

          {props.currentTasks.map(task => 
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
                defaultValue={task.title}
                id={task.editBoxItem.idTextArea}
                rows="3"
                onChange={handleTextareaValue}></textarea>

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