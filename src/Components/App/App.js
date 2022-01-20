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
  
  const [tasksList, setTask] = useState([]);
  const [currentTasks, setTasksList] = useState([]);
  const [darkTheme, setTheme] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [navButtons, setButton] = useState([]);
  

  useEffect(() => {
    const temp = JSON.parse(window.localStorage.getItem('tasksList'));
    if (temp) {
      setTask(temp);
    }
    setTimeout(() => {
      setLoader(true);
    }, 3000);
    
  },[]);

  useEffect(()=>{
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    showCurrentTasks();
  },[tasksList, navButtons]);

  const findSameTasks = (str, arr) => {
    let matches = false;

    arr.forEach (item => {
        if (item.title.trim().toLowerCase() === str.toLowerCase()) {
            matches = true;
        }
    });
    return matches;
  };

  const addTask = (inputTask) => {
    let taskText = inputTask.trim();

    if (findSameTasks(taskText, tasksList)) return alert('Такая задача уже есть');
    if(inputTask){
      const taskObj = {
        id: Date.now(),
        title: taskText[0].toUpperCase() + taskText.slice(1),
        checked: false,
        hot: false,
        done: false
      };
      
      setTask([...tasksList, taskObj]);
    }
  };

  const clearTasksList = () => {
    setTask([]);
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

  const handlerToggleTheme = () => {
    setTheme(
      !darkTheme ? true : false
    );
  };

  const showCurrentTasks = () => {
    let typeOfTasks = '';
    navButtons.forEach(item => {
      if(item.className === 'nav-row__btn nav-row__btn--active') typeOfTasks = item.id;
    });

    const hotTasksList = sortTasks(tasksList.filter(task => (!task.checked && task.hot)));
    const currentTasksList = sortTasks(tasksList.filter(task => (!task.checked && !task.hot)));
    const finishedTasksList = sortTasks(tasksList.filter(task => task.checked));
    let newTasksList =[];

    if(typeOfTasks === 'btn_1') newTasksList = [...hotTasksList, ...currentTasksList, ...finishedTasksList];
    if(typeOfTasks === 'btn_2') newTasksList = [...hotTasksList, ...currentTasksList];
    if(typeOfTasks === 'btn_3') newTasksList = [...finishedTasksList];

    setTasksList(newTasksList);
  };

  return (
    <>
      {HocLoader(isLoading, <Loader />,
        <div className={"wrapper" + (darkTheme ? ' dark-theme' : '')}>
          <div className="container">
            <Header />
            <InputTask
            addTask={addTask}
            clearTasksList={clearTasksList}
            />
            <ChangeThemeContext.Provider value={{handlerToggleTheme}}>
              <Title
              darkTheme={darkTheme}
              setTheme={setTheme}
              />
            </ChangeThemeContext.Provider>
            <NavTasksLists
            navButtons={navButtons}
            setButton={setButton}
            />
            <TasksList
            currentTasks={currentTasks}
            tasksList={tasksList}
            setTask={setTask}
            />
            <StatusTitle tasksList={tasksList}/>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
