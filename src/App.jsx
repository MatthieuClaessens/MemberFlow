/*
  App.jsx

  Routeur principal de l'application.
  - Définit les routes suivantes :
    - "/"                 : liste des personnes
    - "/person/create"    : formulaire de création
    - "/person/:id/edit" : formulaire d'édition (pré-remplit via l'id)
*/

import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
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
