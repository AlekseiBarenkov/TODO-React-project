import { observer } from 'mobx-react-lite';
import tasksList from '../../store/tasksList';
import './NavTasksLists.css';

const NavTasksLists = observer(() => {
    const handlerActivateTaskList = (e) => {
        tasksList.setNavButtons(e.target.id)
    };
    
    return (
        <div className="nav-row">
            {
                tasksList.navButtons.map(({title, className, id}) => {
                    return (
                        <button key={id} className={className} id={id} onClick={handlerActivateTaskList}>{title}</button>
                    )
                })
            }
        </div>
    );
})

export default NavTasksLists;