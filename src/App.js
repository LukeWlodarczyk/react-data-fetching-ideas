import "./styles.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ALL_ROUTES, { BOOKS_ROUTES } from './routes';

import Navigation from './ui/Navigation';
import AppHeading from './ui/AppHeading';

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Router>
        <header>
          <AppHeading>React data fetching ideas</AppHeading>
          <Navigation links={BOOKS_ROUTES} />
        </header>
        <main>
          <Routes>
            {ALL_ROUTES.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
          </Routes>
        </main>
      </Router>
    </div>
  );
}
