const Manage = ({ onViewEdit, onAdd }) => {
  return (
    <>
      <h1 className="page-title">Manage Appointments</h1>
      <p className="page-sub">Add or View & Edit Appointments from the shorts below</p>
      <div className="grid-2">
        <div className="card">
          <h3>View &amp; Edit</h3>
          <p className="page-sub">View all appointments and edit them.</p>
          <button className="btn" onClick={onViewEdit}>VIEW</button>
        </div>
        <div className="card">
          <h3>Add New Appointment</h3>
          <p className="page-sub">Create a new appointment.</p>
          <button className="btn btn-primary" onClick={onAdd}>ADD</button>
        </div>
      </div>
    </>
  );
};

export default Manage;

