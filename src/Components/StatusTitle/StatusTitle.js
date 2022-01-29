import { selectTasksList } from '../../store/reducers/tasksListSlice';
  import { useSelector } from 'react-redux';
import './StatusTitle.css';

function StatusTitle() {
    const tasks = useSelector(selectTasksList);
    
    return (
        <h2
        className='status-title'>
          Всего задач: {tasks.length},
           из них выполнено: {tasks.filter(task => task.isChecked).length}
        </h2>
    );
}

export default StatusTitle;