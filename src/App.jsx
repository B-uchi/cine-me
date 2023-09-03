import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/home/home";
import Movies from "./pages/movies/movies";
import Shows from "./pages/shows/shows";

function App() {
  return (
    <div className="main">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/shows" element={<Shows />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
