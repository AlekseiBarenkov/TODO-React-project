import './StatusTitle.css';



function StatusTitle(props) {
    
    return (
        <h2 className='status-title'>Всего задач: {props.tasksList.length}, из них выполнено: {props.tasksList.filter(task => task.checked).length}</h2>
    );
}

export default StatusTitle;