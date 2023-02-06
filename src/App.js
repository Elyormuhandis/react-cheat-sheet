import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Home } from './pages/home.page';
import { Blog, postsLoader } from './pages/blog.page';
import { About } from './pages/about.page';
import { NotFoundPage } from './pages/not-found.page';
import { Layout } from './components/layout.component';
import { Post, postLoader } from './pages/post.page';
import { EditPost } from './pages/edit-post.page';
import { Login } from './pages/login.page';
import { RequireAuth } from './hoc/require.auth';
import { AuthProvider } from './hoc/auth.provider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='blog' element={<Blog />} loader={postsLoader} />
      {/********Nested Routes******
            We use nested routest for nesting pages. 
            In library React-router-dom exist <Outlet/> = placeholder */}
      <Route path='about' element={<About />}>
        <Route path='team' element={<p>Our team very friendly</p>} />
        <Route path='contacts' element={<p>+998909090909</p>} />
      </Route>
      <Route path={'blog/:id'} element={<Post />} loader={postLoader} />
      <Route
        path={'blog/:id/edit'}
        element={
          <RequireAuth>
            <EditPost />
          </RequireAuth>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

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
