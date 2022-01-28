import { observer } from 'mobx-react-lite';
import tasksList from '../../store/tasksList';
import './StatusTitle.css';

const StatusTitle = observer(() => {
    return (
        <h2
        className='status-title'>
            Всего задач: {tasksList.tasks.length}, 
            из них выполнено: {tasksList.tasks.filter(task => task.isChecked).length}
        </h2>
    );
})

export default StatusTitle;