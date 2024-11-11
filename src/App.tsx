import { Navigate, Route, Routes } from 'react-router-dom';

import NoteLayout from './components/NoteLayout';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import NoteDetailed from './pages/NoteDetailed';
import NoteList from './pages/NoteList';

const App = () => {
  return (
    <main className="container my-10">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new-note" element={<NewNote />} />

        <Route path="/:noteId" element={<NoteLayout />}>
          <Route index element={<NoteDetailed />} />
          <Route path="edit" element={<EditNote />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default App;
