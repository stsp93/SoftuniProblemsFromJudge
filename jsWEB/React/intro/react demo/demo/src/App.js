
import './App.css';
import Header from './Header';

const list = ['First', 'Second', 'Third']


function App() {
  return (
    <div className="App" >
      <Header list={list} />
    </div>
  );
}



export default App;
