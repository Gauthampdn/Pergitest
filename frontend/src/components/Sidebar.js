import formatDistanceToNow from "date-fns/formatDistanceToNow"

const Sidebar = ({ workout, onClick }) => {
  return (
    <div className="side-details" onClick={onClick}>
      <h4>{workout.title}</h4>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    </div>
  );
}

export default Sidebar;
