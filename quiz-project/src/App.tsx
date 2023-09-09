import { Routes, Route } from "react-router-dom"
import HomePage from "./components/homePage/HomePage"
import LogIn from "./components/logIn/LogIn"
import SignUp from "./components/signUp/SignUp"
import DisplayQuiz from "./components/game/DisplayQuiz"
import DisplayMap from "./components/game/DisplayMap"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/login" element={ <LogIn/> } />
        <Route path="/map" element={ <DisplayMap/> } />
        <Route path="/quiz" element={ <DisplayQuiz/> } />

      </Routes>
    </div>
  )
}

export default App