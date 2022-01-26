import React, {useContext} from 'react';
import { ChangeThemeContext } from '../../Util/Context/ChangeThemeContext';
import { useSelector } from 'react-redux';
import { selectIsDarkTheme } from '../../store/reducers/othersSlice';
import './Title.css';

function Title() {
    const {handlerToggleTheme} = useContext(ChangeThemeContext);
    const isDarkTheme = useSelector(selectIsDarkTheme);
    return (
        <div className="title">
            <div className="toggle-theme">
                <button className={"toggle-theme__btn" + (isDarkTheme ? ' dark-theme-active' : '')} onClick={handlerToggleTheme}></button>
            </div>
            <h2 className='tasks-lists-title'>Мои задачи</h2>
        </div>
    );
}

export default Title;