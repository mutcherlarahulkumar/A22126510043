import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UpdatePage from './components/UpdatePage';
import { userContext } from './context';

function App() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : [
      { name: 'e1', date: 'kef', amount: '500' },
      { name: 'e2', date: 'kef', amount: '500' },
      { name: 'e3', date: 'kef', amount: '500' }
    ];
  });
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  

  const [currentData, setCurrentData] = useState(null);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ data, setData, currentData, setCurrentData }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update" element={<UpdatePage />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
