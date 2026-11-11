import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Checklists } from './pages/Checklists';
import { Home } from './pages/Home';
import { Lesson } from './pages/Lesson';
import { Lessons } from './pages/Lessons';
import { NotFound } from './pages/NotFound';
import { Practice } from './pages/Practice';
import { Resources } from './pages/Resources';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:slug" element={<Lesson />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/checklists" element={<Checklists />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
