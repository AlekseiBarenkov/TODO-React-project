import React, {useContext} from 'react';
import { ChangeThemeContext } from '../../Util/Context/ChangeThemeContext';
import './Title.css';

function Title(props) {
    const {handlerToggleTheme} = useContext(ChangeThemeContext);
    return (
        <div className="title">
            <div className="toggle-theme">
                <button className={"toggle-theme__btn" + (props.darkTheme ? ' dark-theme-active' : '')} onClick={handlerToggleTheme}></button>
            </div>
            <h2 className='tasks-lists-title'>Мои задачи</h2>
        </div>
    );
}

export default Title;