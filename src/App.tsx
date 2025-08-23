import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
// Impact and Progress components are commented out for future use
// import Impact from './pages/Impact';
// import Progress from './pages/Progress';
import Team from './pages/Team';
import Rating from './pages/Rating';
import SignUp from './pages/SignUp';
import ClassDetail from './pages/ClassDetail';
import Contact from './pages/Contact';
export function App() {
  return <Router basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Commented out for future use
          <Route path="impact" element={<Impact />} />
          <Route path="progress" element={<Progress />} />
          */}
          <Route path="team" element={<Team />} />
          <Route path="rate-us" element={<Rating />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="class/:classId" element={<ClassDetail />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>;
}