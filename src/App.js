import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Problems from './Problems';


// let data = {} 

// const init = async function(){
//   await axios.get('https://us-east1-algo-tracker-dev.cloudfunctions.net/getProblems').then((res)=>{
//   data = res.data
// })
// }

// init()
// console.log('date', data)
function App() {
  return (
    <div className="App">
        <h1>hi</h1>
        <Problems/>
    </div>
  );
}

export default App;
