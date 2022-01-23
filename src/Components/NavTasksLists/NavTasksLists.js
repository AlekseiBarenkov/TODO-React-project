import React, {useEffect} from 'react';
import './NavTasksLists.css';

const initialState = [{
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
}];

function NavTasksLists(props) {
    useEffect(()=>{
        props.setButton(initialState)
    },[]);

    const handlerActivateTaskList = (e) => {
        props.setButton(
            props.navButtons.map(item => {
                item.className = item.id === e.target.id ? 'nav-row__btn nav-row__btn--active' : 'nav-row__btn';
                return item;
            })
        );
    };
    
    return (
        <div className="nav-row">
            {
                props.navButtons.map(({title, className, id}) => {
                    return (
                        <button key={id} className={className} id={id} onClick={handlerActivateTaskList}>{title}</button>
                    )
                })
            }
        </div>
    );
}

export default NavTasksLists;