import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Show from './pages/show/Show';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="show/:pokemonId" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
