import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './StatusTitle.css';

const StatusTitle: React.FC = () => {
  const { tasksList } = useSelector((state: RootState) => state.tasksList);

  return (
    <h2
      className='status-title'>
      Всего задач: {tasksList.length},
      из них выполнено: {tasksList.filter(task => task.isChecked).length}
    </h2>
  );
}

export default StatusTitle;