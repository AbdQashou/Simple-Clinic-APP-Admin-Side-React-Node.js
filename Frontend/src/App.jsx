import { useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import Welcomee from "./components/Welcomee.jsx";
import Manage from "./components/Manage.jsx";
import Addd from "./components/Addd.jsx";
import EditUpdate from "./components/EditUpdate.jsx";

const App = () => {
  const [screen, setScreen] = useState("welcomee");

  const goHome = () => setScreen("welcomee");
  const goManage = () => setScreen("manage");
  const goAdd = () => setScreen("add");
  const goEdit = () => setScreen("edit");

  return (
    <div className="wrapper">
      <Navbar onHome={goHome} />
      <div className="container">
        {screen === "welcomee" && <Welcomee onManage={goManage} />}
        {screen === "manage" && <Manage onViewEdit={goEdit} onAdd={goAdd} />}
        {screen === "add" && <Addd onCancel={goManage} onSaved={goManage} />}
        {screen === "edit" && <EditUpdate />}
      </div>
    </div>
  );
};

export default App;
