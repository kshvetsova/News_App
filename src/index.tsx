import ReactDOM from 'react-dom/client';
import {Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { NewsApp } from './components/NewsApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/news" replace/>} />
      <Route path="/news/:detailId?" element={<NewsApp />}/>
    </Routes>
  </Router>
);
