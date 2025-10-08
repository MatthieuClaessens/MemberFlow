import { BrowserRouter  as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import List from "./Components/List";
import FormPerson from './Components/FormPerson';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/person/create" element={<FormPerson/>} />
        <Route path="/person/:id/edit" element={<FormPerson/>} />
      </Routes>
      </Router>
  )
}

export default App;
