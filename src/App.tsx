import { Divider } from 'antd';
import './App.css';
import WorkSpace from './components/WorkSpace/WorkSpace';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Divider className="divider" />
      <WorkSpace />
    </div>
  );
}

export default App;
