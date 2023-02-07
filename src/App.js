import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './hoc/auth.provider';
import { router } from './routes/router';

const App = () => {
  return (
    <AuthProvider>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
