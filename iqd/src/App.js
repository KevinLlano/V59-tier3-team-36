import React from 'react';
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Roles from './pages/Roles';
import Question from './pages/Questions';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/roles' element={<Roles />} />
        <Route path='/question' element={<Question />} />
      </Routes>
    </Layout>
  );
}

export default App;
