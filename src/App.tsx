import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Impact from './pages/Impact';
import Progress from './pages/Progress';
import Team from './pages/Team';
import Rating from './pages/Rating';
import SignUp from './pages/SignUp';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="impact" element={<Impact />} />
          <Route path="progress" element={<Progress />} />
          <Route path="team" element={<Team />} />
          <Route path="rate-us" element={<Rating />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>;
}