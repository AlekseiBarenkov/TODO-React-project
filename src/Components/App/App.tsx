import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';
import HocLoader from '../../Util/Hoc/HocLoader';
import Header from '../Header/Header';
import InputTask from '../InputTask/InputTask';
import Title from '../Title/Title';
import TasksList from '../TasksList/TasksList';
import NavTasksLists from '../NavTasksLists/NavTasksLists';
import StatusTitle from '../StatusTitle/StatusTitle';

import { sortTasks } from '../../Util/Sorting/SortTasks';
import { ChangeThemeContext } from '../../Util/Context/ChangeThemeContext';
import { setTasksList } from '../../store/reducers/tasksListSlice';
import { createCurrentTasks, editTask } from '../../store/reducers/currentTasksListSlice';
import { RootState } from '../../store/store';
import { setIsDarkTheme, setIsLoading } from '../../store/reducers/othersSlice';
import { TaskObj } from '../../store/reducers/interface';


import './App.css';

const App: React.FC = () => {
  const { tasksList } = useSelector((state: RootState) => state.tasksList);
  const { navButtons } = useSelector((state: RootState) => state.currentTasksList);
  const { isDarkTheme, isLoading } = useSelector((state: RootState) => state.others);
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = new Promise<TaskObj[]>((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem('tasksList')))
    })
    promise.then(data => data && dispatch(setTasksList(data))).then(() => dispatch(setIsLoading()))
  }, []);

  useEffect(() => {
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    showCurrentTasks();
    dispatch(editTask(null));
  }, [tasksList, navButtons, isDarkTheme]);

  const showCurrentTasks = () => {
    const hotTasksList = sortTasks(tasksList.filter(task => (!task.isChecked && task.isHot)));
    const currentTasksList = sortTasks(tasksList.filter(task => (!task.isChecked && !task.isHot)));
    const finishedTasksList = sortTasks(tasksList.filter(task => task.isChecked));
    let newTasksList: TaskObj[] = [];

    navButtons.forEach(item => {
      if (item.className === 'nav-row__btn nav-row__btn--active') {
        newTasksList =
          (item.title === 'Все задачи') ? [...hotTasksList, ...currentTasksList, ...finishedTasksList] :
            (item.title === 'Текущие задачи') ? [...hotTasksList, ...currentTasksList] :
              (item.title === 'Завершенные задачи') ? [...finishedTasksList] : [];
      }
    });

    dispatch(createCurrentTasks(newTasksList));
  };

  const handlerToggleTheme = () => {
    dispatch(setIsDarkTheme(!isDarkTheme))
  };

  return (
    <>
      {HocLoader(isLoading, <Loader />,
        <div className={"wrapper" + (isDarkTheme ? ' dark-theme' : '')}>
          <div className="container">

            <Link className='btn-to-preview-page' to="/">
              <div className="preview__arrow preview__arrow-left">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
            <Header />
            <InputTask />

            <ChangeThemeContext.Provider value={{ handlerToggleTheme }}>
              <Title />
            </ChangeThemeContext.Provider>

            <NavTasksLists />
            <TasksList />
            <StatusTitle />

          </div>
        </div>
      )}
    </>
  );
}

export default App;
