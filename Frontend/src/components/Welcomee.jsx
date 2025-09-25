const Welcomee = ({ onManage }) => { //parameter destructuring
  return (
    <>
      <h1 className="page-title">Welcome Doctor!</h1>
      <p className="page-sub">Please use the shortcuts below to manage the system.</p>
      <button className="btn btn-primary" onClick={onManage}>Manage Appointments</button>
    </>
  );
};

export default Welcomee;
