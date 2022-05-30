import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello'
import Message from './components/Message'
import Profile from './components/Profile'
import Counter from './components/Counter'
import Resume from './components/Resume'
import FunctionEvent from './components/FunctionEvent'
import Main from './components/Main'


//set original props
let genesisProps = {
  test_variable:"Test",
  contractId:null,
  predefinedUserNames:['Prince','Jazz','Kip'],
  predefinedProjects:['School','Road'],
  userRole:null,
  donatedAmt:null,
  projectVote:null,
  projectsDetails : {
    "School Project":{
        "Description":"Build a school",
        "Target":1000
    },
    "Road Project":{
        "Description":"Build a road",
        "Target":5000
    }
  }
}

function App() {
  return (
    <div className="App">
      <h3>Quadratic Crowd Funding</h3>
      <hr/>
      <Main message = "Test Button" myProps = { genesisProps }/>
    </div>
  );
}

export default App;
