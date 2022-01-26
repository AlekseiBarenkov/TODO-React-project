import React from 'react';
import { selectNavButtons, setNavButtons } from '../../store/reducers/currentTasksListSlice';
import { useSelector, useDispatch } from 'react-redux';
import './NavTasksLists.css';

function NavTasksLists() {
    const navButtons = useSelector(selectNavButtons);
    const dispatch = useDispatch();

    const handlerActivateTaskList = (e) => {
        dispatch(setNavButtons(e.target.id))
    };
    
    return (
        <div className="nav-row">
            {
                navButtons.map(({title, className, id}) => {
                    return (
                        <button key={id} className={className} id={id} onClick={handlerActivateTaskList}>{title}</button>
                    )
                })
            }
        </div>
    );
}

export default NavTasksLists;