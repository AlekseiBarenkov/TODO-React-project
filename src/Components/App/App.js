import React, {useEffect} from 'react';
import Loader from '../Loader/Loader';
import HocLoader from '../../Util/Hoc/HocLoader';
import Header from '../Header/Header';
import InputTask from '../InputTask/InputTask';
import Title from '../Title/Title';
import TasksList from '../TasksList/TasksList';
import NavTasksLists from '../NavTasksLists/NavTasksLists';
import StatusTitle from '../StatusTitle/StatusTitle';
import {ChangeThemeContext} from '../../Util/Context/ChangeThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksList, setTasksList, upgradeEditTask } from '../../store/reducers/tasksListSlice';
import { createCurrentTasks, selectNavButtons} from '../../store/reducers/currentTasksListSlice';
import { selectIsDarkTheme, setIsDarkTheme, selectIsLoading, setIsLoading} from '../../store/reducers/othersSlice';

import './App.css';

function App() {
  const tasks = useSelector(selectTasksList);
  const navButtons = useSelector(selectNavButtons);
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
        resolve(JSON.parse(localStorage.getItem('tasksList')))
    })
    promise.then(data => dispatch(setTasksList(data))).then(dispatch(setIsLoading()))
  },[]);

  useEffect(()=>{
    localStorage.setItem('tasksList', JSON.stringify(tasks));
    showCurrentTasks();
    dispatch(upgradeEditTask());
  },[tasks, navButtons, isDarkTheme]);

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
      let typeOfTasks = '';

      navButtons.forEach(item => {
          if(item.className === 'nav-row__btn nav-row__btn--active') typeOfTasks = item.id;
      });

      const hotTasksList = sortTasks(tasks.filter(task => (!task.isChecked && task.isHot)));
      const currentTasksList = sortTasks(tasks.filter(task => (!task.isChecked && !task.isHot)));
      const finishedTasksList = sortTasks(tasks.filter(task => task.isChecked));
      let newTasksList =[];
      
      if(typeOfTasks === 'btn_1') newTasksList = [...hotTasksList, ...currentTasksList, ...finishedTasksList];

      if(typeOfTasks === 'btn_2') newTasksList = [...hotTasksList, ...currentTasksList];

      if(typeOfTasks === 'btn_3') newTasksList = [...finishedTasksList];

      dispatch(createCurrentTasks(newTasksList));
  };

  const handlerToggleTheme = () => dispatch(setIsDarkTheme());

  return (
    <>
      {HocLoader(isLoading, <Loader />,
        <div className={"wrapper" + (isDarkTheme ? ' dark-theme' : '')}>
          <div className="container">

            <Header />
            <InputTask />

            <ChangeThemeContext.Provider value={{handlerToggleTheme}}>
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
