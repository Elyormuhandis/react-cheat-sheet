import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Home } from '../pages/home.page';
import { Posts, postsLoader } from '../pages/posts.page';
import { About } from '../pages/about.page';
import { NotFoundPage } from '../pages/not-found.page';
import { Layout } from '../components/layout.component';
import { Post, postLoader } from '../pages/post.page';
import { EditPost, updatePostAction } from '../pages/edit-post.page';
import { Login } from '../pages/login.page';
import { RequireAuth } from '../hoc/require.auth';
import { ErrorPage } from '../pages/error.page';
import { AddPost, createPostAction } from '../pages/add-post.page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route
        path='posts'
        element={<Posts />}
        loader={postsLoader}
        errorElement={<ErrorPage />}
      />
      {/********Nested Routes******
              We use nested routest for nesting pages. 
              In library React-router-dom exist <Outlet/> = placeholder */}
      <Route path='about' element={<About />}>
        <Route path='team' element={<p>Our team very friendly</p>} />
        <Route path='contacts' element={<p>+998909090909</p>} />
      </Route>
      <Route path={'posts/:id'} element={<Post />} loader={postLoader} />
      <Route
        path={'posts/add'}
        element={
          <RequireAuth>
            <AddPost />
          </RequireAuth>
        }
        action={createPostAction}
      />
      <Route
        path={'posts/:id/edit'}
        element={
          <RequireAuth>
            <EditPost />
          </RequireAuth>
        }
        action={updatePostAction}
        loader={postLoader}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);
