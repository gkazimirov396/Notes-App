import { Navigate, Route, Routes } from 'react-router-dom';

import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import NoteDetailed from './pages/NoteDetailed';
import NoteList from './pages/NoteList';

import NoteLayout from './components/NoteLayout';

import { RoutePath } from './router/path';

const App = () => {
  return (
    <main className="container my-10">
      <Routes>
        <Route path={RoutePath.HOME} element={<NoteList />} />
        <Route path={RoutePath.NEW_NOTE} element={<NewNote />} />

        <Route path={RoutePath.NOTE_DETAILED} element={<NoteLayout />}>
          <Route index element={<NoteDetailed />} />
          <Route path={RoutePath.NOTE_DETAILED_EDIT} element={<EditNote />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default App;
