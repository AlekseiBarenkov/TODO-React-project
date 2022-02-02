import React from 'react';
import { setNavButtons } from '../../store/reducers/currentTasksListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import './NavTasksLists.css';

const NavTasksLists: React.FC = () => {
    const { navButtons } = useSelector((state: RootState) => state.currentTasksList);
    const dispatch = useDispatch();

    const handlerActivateTaskList = (e) => {
        dispatch(setNavButtons(e.target.id))
    };

    return (
        <div className="nav-row">
            {
                navButtons.map(({ title, className, id }) => {
                    return (
                        <button
                            key={id}
                            className={className}
                            id={id}
                            onClick={handlerActivateTaskList}>{title}</button>
                    )
                })
            }
        </div>
    );
}

export default NavTasksLists;