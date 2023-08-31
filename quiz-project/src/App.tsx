import { Routes, Route } from "react-router-dom"
import HomePage from "./components/homePage/HomePage"
import LogIn from "./components/logIn/LogIn"
import SignUp from "./components/signUp/SignUp"
import Game from "./components/game/Game"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/login" element={ <LogIn/> } />
        <Route path="/game" element={ <Game/> } />

      </Routes>
    </div>
  )
}

export default App