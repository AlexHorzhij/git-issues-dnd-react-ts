import { Divider } from 'antd';
import './App.css';
import WorkSpace from './components/WorkSpace';
import Header from './components/Header';

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