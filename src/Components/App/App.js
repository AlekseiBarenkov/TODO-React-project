import React from 'react';
import Loader from '../Loader/Loader';
import HocLoader from '../../Util/Hoc/HocLoader';
import Header from '../Header/Header';
import InputTask from '../InputTask/InputTask';
import Title from '../Title/Title';
import TasksList from '../TasksList/TasksList';
import NavTasksLists from '../NavTasksLists/NavTasksLists';
import StatusTitle from '../StatusTitle/StatusTitle';
import {ChangeThemeContext} from '../../Util/Context/ChangeThemeContext';
import { Link } from 'react-router-dom';
import tasksList from '../../store/tasksList';
import { observer } from 'mobx-react-lite';
import './App.css';

const App = observer(() => {
  const handlerToggleTheme = () => {
    tasksList.setIsDarkTheme();
    tasksList.editTask()
  };

  return (
    <>
      {HocLoader(tasksList.isLoading, <Loader />, 
        <div className={"wrapper" + (tasksList.isDarkTheme ? ' dark-theme' : '')}>
          
          <div className="container">
            <Link className='btn-to-preview-page' to="/">
            <div class="preview__arrow preview__arrow-left">
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
            </Link>
            
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
})

export default App;
