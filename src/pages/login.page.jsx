import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthProvider';

export const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const loginHandler = (e) => {
    e.preventDefault();
    signIn(e.target.username.value, () => {
      navigate(fromPage, { replace: true });
    });
  };
  return (
    <div>
      <form onSubmit={(e) => loginHandler(e)}>
        <input type='text' style={{ color: 'black' }} name='username' />
        <button style={{ backgroundColor: 'black' }}>LOGIN</button>
        <h3>History: {fromPage}</h3>
      </form>
    </div>
  );
};
