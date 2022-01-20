import React, {useState, useEffect} from 'react';
import './NavTasksLists.css';

function NavTasksLists(props) {

    useEffect(()=>{
        props.setButton([
            {
                title : 'Все задачи',
                className : 'nav-row__btn nav-row__btn--active',
                id : 'btn_1'
            },
            {
                title : 'Текущие задачи',
                className : 'nav-row__btn',
                id : 'btn_2'
            },
            {
                title : 'Завершенные задачи',
                className : 'nav-row__btn',
                id : 'btn_3'
            }]);
    },[]);

    const activateTaskList = (e) => {
        props.setButton(
            props.navButtons.map(item => {
                (item.id === e.target.id) ? item.className = 'nav-row__btn nav-row__btn--active' : item.className = 'nav-row__btn';
                return item;
            })
        );
    };
    
    return (
        <div className="nav-row">
            {
                props.navButtons.map(({title, className, id}) => {
                    return (
                        <button key={id} className={className} id={id} onClick={activateTaskList}>{title}</button>
                    )
                })
            }
        </div>
    );
}

export default NavTasksLists;