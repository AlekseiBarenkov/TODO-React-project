import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { ChangeThemeContext } from '../../Util/Context/ChangeThemeContext';
import tasksList from '../../store/tasksList';
import './Title.css';

const Title = observer(() => {
    const {handlerToggleTheme} = useContext(ChangeThemeContext);
    return (
        <div className="title">
            <div className="toggle-theme">
                <button
                className={"toggle-theme__btn" + (tasksList.darkTheme ? ' dark-theme-active' : '')}
                onClick={handlerToggleTheme}></button>
            </div>
            <h2 className='tasks-lists-title'>Мои задачи</h2>
        </div>
    );
})

export default Title;