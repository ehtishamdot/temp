import logo from "./logo.svg";
import "./App.css";
import Voting from "./components/voting";
import Sidebar from "./layout/sidebar";

// UP VOTE AND DOWN VOTE
function App() {
  return (
    <div className="App">
      <Sidebar />
      <Voting />
      
    </div>
  );
}

export default App;
