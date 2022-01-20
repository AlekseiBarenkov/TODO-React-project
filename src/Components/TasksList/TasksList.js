import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import './TasksList.css';



function TasksList(props) {
    
  const refEditBox = useRef([]);
  refEditBox.current = [];
  const refTextArea = useRef([]);
  refTextArea.current = [];
  let num = 0;

  const findIndexNumFromStr = (str) => {
    return str.split('').filter(item => !isNaN(Number(item))).join('');
  };

  const addRefEditBox = (e) => {
    if (e && !refEditBox.current.includes(e)) {
      refEditBox.current.push(e);
    }
  };

  const addRefTextArea = (e) => {
      if (e && !refTextArea.current.includes(e)) {
        refTextArea.current.push(e);
      }
  };

  const editTask = (e) => {
    refEditBox.current.forEach(element => {
        (e.target.className !== 'tasks-list__title tasks-list__title-done' && findIndexNumFromStr(element.id) === findIndexNumFromStr(e.target.id) && element.className !== 'tasks-list__edit-box tasks-list__edit-box--active') ? element.className = 'tasks-list__edit-box tasks-list__edit-box--active' : element.className = 'tasks-list__edit-box';
        }
    );
  };

  const makeHotTask = (e) => {
    props.setTask(
      props.tasksList.map(item => {
        if (item.id === +findIndexNumFromStr(e.target.id) && !item.hot) {item.hot = true;}
        else if (item.id === +findIndexNumFromStr(e.target.id) && item.hot) {item.hot = false;}
        return item;
      })
    );
    
  };

  const completeTheTask = (e) => {
      props.setTask(
          props.tasksList.map(item => {
              if (item.id === +e.target.id) item.checked = true;
              return item;
          })
      );
  };

  const clearTask = (e) => {
      props.setTask(
        props.tasksList.filter(item => item.id !== +findIndexNumFromStr(e.target.id))
      );
  };

  const saveChangesTask = (e) => {
    refTextArea.current.forEach(element => {
      if(findIndexNumFromStr(element.id) === findIndexNumFromStr(e.target.id)) {
        props.setTask(
          props.tasksList.map(item => {
            if(item.id === +findIndexNumFromStr(e.target.id)) item.title = element.value.trim()[0].toUpperCase() + element.value.slice(1);
            return item;
          })
        );
      }
    });

    editTask(e);
  };

  const cancelChangesTask = (e) => {
    refTextArea.current.forEach(element => {
      if(findIndexNumFromStr(element.id) === findIndexNumFromStr(e.target.id)) element.value = element.defaultValue;
    });
    editTask(e);
  };

  return (
    <>
      <div key={`tasks-box_${num +=1}`} className="tasks-box">
        <ol className="tasks-list">
          {props.currentTasks.map(task => 
            <li key={task.id} className={"tasks-list__item" + (task.checked ? ' task-done' : '') + ((task.hot && !task.checked) ? ' task-hot' : '')}>
              <div className="tasks-list__item-box">
                <div className="checkbox-hot-box">
                  <input className='checkbox-hot' type="checkbox" id={`hot_${task.id}`} defaultChecked= {task.hot ? 'checked' : ''} onChange={makeHotTask}/>
                  <label htmlFor={`hot_${task.id}`} className='tasks-list__label-hot-input' id={`labelHot_${task.id}`}></label>
                </div>
                <p id={`title_${task.id}`} className={'tasks-list__title' + (task.checked ? ' tasks-list__title-done' : '')} onClick={editTask}>{`${num +=1}. ${task.title}`}</p>
                <div className="checkbox-controls">
                  <div className="checkbox-done-box">
                    <input className='checkbox-done' type="checkbox" id={task.id} onChange={completeTheTask}/>
                    <label htmlFor={task.id} className='tasks-list__label-done-input' id={`labelDone_${task.id}`}></label>
                  </div>
                  <button id={`delTaskBtn_${task.id}`} className={'tasks-list__del-btn' + (task.checked ? ' del-btn__done' : '')} onClick={clearTask}></button>
                </div>
              </div>
              <hr />
              <div className="tasks-list__edit-box" id={`editBox_${task.id}`} ref={addRefEditBox}>
                <textarea defaultValue={task.title} id={`textarea_${task.id}`} rows="3" ref={addRefTextArea}></textarea>
                <div className="tasks-list__edit-box-buttons">
                  <button className="tasks-list__btn-save" id={`saveBtn_${task.id}`} onClick={saveChangesTask}>Сохранить</button>
                  <button className="tasks-list__btn-cancel" id={`cancelBtn_${task.id}`} onClick={cancelChangesTask}>Отмена</button>
                </div>
              </div>
            </li>
          )}
        </ol>
        </div>
    </>
  );
}

export default TasksList;

TasksList.propTypes = {
  currentTasks: PropTypes.array,
  tasksList: PropTypes.array,
  setTask: PropTypes.func
};