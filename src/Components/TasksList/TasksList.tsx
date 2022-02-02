import React from 'react';
import {
  makeHotTask,
  completeTheTask,
  clearTask,
  saveChangesTask,
  setTextareaValue
} from '../../store/reducers/tasksListSlice';
import { editTask } from '../../store/reducers/currentTasksListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { TaskObj } from '../../store/reducers/interface';
import './TasksList.css';

const TasksList: React.FC = () => {
  const { tasksList, textareaValue } = useSelector((state: RootState) => state.tasksList);
  const { currentTasks } = useSelector((state: RootState) => state.currentTasksList);
  const dispatch = useDispatch();

  const findIndex = (value: string) => {
    if (typeof (value) === 'number') return value;
    return value.split('').filter(item => !isNaN(Number(item))).join('');
  };

  const handlerMakeHotTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const btnId = findIndex(e.target.id);
    dispatch(makeHotTask(btnId));
  };

  const handlerCompleteTheTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const btnId = findIndex(e.target.id);
    dispatch(completeTheTask(btnId));
  };

  const handlerClearTask = (id: string) => {
    dispatch(clearTask(id));
  };

  const handlerEditTask = (el: React.MouseEvent<HTMLElement>) => {
    const btnId = findIndex((el.target as HTMLElement).id);
    dispatch(setTextareaValue(''));
    dispatch(editTask(btnId));
  };

  const handlerSaveChangesTask = (el: React.MouseEvent<HTMLElement>) => {
    const idBtn = findIndex((el.target as HTMLElement).id);
    const text = textareaValue.trim();

    for (let item of tasksList) {
      if (item.id !== idBtn && item.title.toLowerCase() === text.toLowerCase()) return alert('Такая задача уже есть');
    }

    if (text === '') return alert('Введите текст задачи');

    dispatch(saveChangesTask(idBtn));
    dispatch(editTask(idBtn));
  };

  const handlerCancelChangesTask = (el: React.MouseEvent<HTMLElement>) => {
    handlerEditTask(el);
  };

  const getClassName = (taskId: string) => {
    const index = findIndex(taskId);
    let isChecked = false;
    let isHot = false;

    tasksList.map(item => {
      if (item.id === index && item.isChecked) isChecked = true;
      if (item.id === index && item.isHot && !item.isChecked) isHot = true;
      return item
    })

    if (taskId === `title_${index}` && isChecked) return ' tasks-list__title-done';
    if (taskId === `delTaskBtn_${index}` && isChecked) return ' del-btn__done';

    if (isChecked) return (' task-done');

    if (isHot && !isChecked) return (' task-hot');

    return '';
  }

  return (
    <div className="tasks-box">
      <ol className="tasks-list">

        {currentTasks.map((task: TaskObj) =>
          <li
            key={task.id}
            className={"tasks-list__item" + getClassName(task.id)}>

            <div className="tasks-list__item-box">

              <div className="checkbox-hot-box">

                <input
                  className='checkbox-hot'
                  type="checkbox"
                  id={`hot_${task.id}`}
                  checked={task.isHot}
                  onChange={handlerMakeHotTask} />

                <label
                  htmlFor={`hot_${task.id}`}
                  className='tasks-list__label-hot-input'></label>

              </div>

              <p
                id={`title_${task.id}`}
                className={'tasks-list__title'}
                onClick={(el) => handlerEditTask(el)}
              >
                {task.title}
              </p>

              <div className="checkbox-controls">

                <div className="checkbox-done-box">

                  <input
                    className='checkbox-done'
                    type="checkbox"
                    id={task.id}
                    onChange={handlerCompleteTheTask} />

                  <label
                    htmlFor={task.id}
                    className='tasks-list__label-done-input'>
                  </label>

                </div>

                <button
                  id={`delTaskBtn_${task.id}`}
                  className={'tasks-list__del-btn' + getClassName(`delTaskBtn_${task.id}`)}
                  onClick={() => handlerClearTask(task.id)}>
                </button>

              </div>

            </div>

            <hr />

            <div
              className={task.editBoxClassName}>

              <textarea
                value={textareaValue}
                onChange={(el) => { dispatch(setTextareaValue(el.target.value)) }}>
              </textarea>

              <div className="tasks-list__edit-box-buttons">

                <button
                  className="tasks-list__btn-save"
                  id={`saveBtn_${task.id}`}
                  onClick={handlerSaveChangesTask}
                >
                  Сохранить
                </button>

                <button
                  className="tasks-list__btn-cancel"
                  onClick={handlerCancelChangesTask}
                >
                  Отмена
                </button>

              </div>

            </div>

          </li>
        )}

      </ol>
    </div>
  );
}

export default TasksList;