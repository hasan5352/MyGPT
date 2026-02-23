import './App.css';
import AuthPage from './AuthPage/AuthPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import {Routes, Route} from 'react-router'

function App() {
  return (
    <Routes>
      <Route index element={ <HomePage /> } />
      <Route path='/auth' element={<AuthPage />} />
    </Routes>
  );
}

export default App
