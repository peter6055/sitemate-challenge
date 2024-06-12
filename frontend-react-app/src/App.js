import './App.css';
import Ticket from './components/Ticket';
import {Flex} from "antd";

function App() {
  return (
      <div className={"mainContainer"}>
        <h1>🚩Ticket System</h1>
        <Ticket/>
      </div>
  );
}

export default App;
