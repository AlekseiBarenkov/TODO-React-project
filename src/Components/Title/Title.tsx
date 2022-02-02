import React, { useContext } from 'react';
import { ChangeThemeContext } from '../../Util/Context/ChangeThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Title.css';

const Title: React.FC = () => {
    const { isDarkTheme } = useSelector((state: RootState) => state.others);
    const { handlerToggleTheme } = useContext(ChangeThemeContext);

    return (
        <div className="title">
            <div className="toggle-theme">
                <button
                    className={"toggle-theme__btn" + (isDarkTheme ? ' dark-theme-active' : '')}
                    onClick={handlerToggleTheme}></button>
            </div>
            <h2 className='tasks-lists-title'>Мои задачи</h2>
        </div>
    );
}

export default Title;