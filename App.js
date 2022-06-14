import logo from './src/logo.svg';
import './src/App.css';
import Hello from './src/components/Hello'
import Message from './src/components/Message'
import Profile from './src/components/Profile'
import Counter from './src/components/Counter'
import Resume from './src/components/Resume'
import FunctionEvent from './src/components/FunctionEvent'
import Main from './src/components/Main'


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
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="d-flex justify-content-start">
        test
    </div>
      <a class="navbar-brand center" href="#">
      <br/>
      <h1 >Quadratic Crowdfunding</h1> 
      <br/>
      </a>
  </div>
</nav>
      <Main myProps = { genesisProps }/>
    </div>
  );
}

export default App;
