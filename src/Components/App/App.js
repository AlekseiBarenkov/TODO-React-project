import React, {useState, useEffect} from 'react';
import Loader from '../Loader/Loader';
import HocLoader from '../../Util/Hoc/HocLoader';
import Header from '../Header/Header';
import InputTask from '../InputTask/InputTask';
import Title from '../Title/Title';
import TasksList from '../TasksList/TasksList';
import NavTasksLists from '../NavTasksLists/NavTasksLists';
import StatusTitle from '../StatusTitle/StatusTitle';
import {ChangeThemeContext} from '../../Util/Context/ChangeThemeContext';
import './App.css';

function App() {
  const [tasksList, setTaskList] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [navButtons, setNavButtons] = useState([]);
  
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem('tasksList')))
    })
    promise.then(data => (data) && setTaskList(data)).then(setIsLoading(true))
  },[]);

  useEffect(()=>{
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    showCurrentTasks();
  },[tasksList, navButtons]);

  const findSameTasks = (str, arr) => {
    let matches = false;

    for (let item of arr) {
      if (item.title.trim().toLowerCase() === str.toLowerCase()) {
        return matches = true;
      }
    }

    return matches;
  };

  const handlerAddTask = (inputTask) => {
    let taskText = inputTask.trim()[0].toUpperCase() + inputTask.slice(1);
    const idTask = Date.now();
    const editBoxItem = {
      className: 'tasks-list__edit-box',
      idEditBox: `editBox_${idTask}`,
      idTextArea: `textarea_${idTask}`,
      idBtnSave: `saveBtn_${idTask}`,
      idBtnCancel: `cancelBtn_${idTask}`
    };

    if (findSameTasks(taskText, tasksList)) return alert('Такая задача уже есть');

    if(inputTask){
      const taskObj = {
        id: idTask,
        title: taskText,
        isChecked: false,
        isHot: false,
        editBoxItem
      };
      
      setTaskList([...tasksList, taskObj]);
    }
  };

  const handlerClearTasksList = () => setTaskList([]);

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

  const handlerToggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const showCurrentTasks = () => {
    let typeOfTasks = '';

    navButtons.forEach(item => {
      if(item.className === 'nav-row__btn nav-row__btn--active') typeOfTasks = item.id;
    });

    const hotTasksList = sortTasks(tasksList.filter(task => (!task.isChecked && task.isHot)));
    const currentTasksList = sortTasks(tasksList.filter(task => (!task.isChecked && !task.isHot)));
    const finishedTasksList = sortTasks(tasksList.filter(task => task.isChecked));
    let newTasksList =[];
    
    if(typeOfTasks === 'btn_1') newTasksList = [...hotTasksList, ...currentTasksList, ...finishedTasksList];

    if(typeOfTasks === 'btn_2') newTasksList = [...hotTasksList, ...currentTasksList];

    if(typeOfTasks === 'btn_3') newTasksList = [...finishedTasksList];

    setCurrentTasks(newTasksList);
  };

  return (
    <>
      {HocLoader(isLoading, <Loader />,
        <div className={"wrapper" + (isDarkTheme ? ' dark-theme' : '')}>
          <div className="container">

            <Header />

            <InputTask
              addTask={handlerAddTask}
              clearTasksList={handlerClearTasksList}
            />

            <ChangeThemeContext.Provider value={{handlerToggleTheme}}>
              <Title
                darkTheme={isDarkTheme}
                setTheme={setIsDarkTheme}
              />
            </ChangeThemeContext.Provider>

            <NavTasksLists
              navButtons={navButtons}
              setButton={setNavButtons}
            />

            <TasksList
              currentTasks={currentTasks}
              setCurrentTasks={setCurrentTasks}
              tasksList={tasksList}
              setTask={setTaskList}
              isDarkTheme={isDarkTheme}
              isLoading={isLoading}
              navButtons={navButtons}
            />

            <StatusTitle tasksList={tasksList}/>

          </div>
        </div>
      )}
    </>
  );
}

export default App;
