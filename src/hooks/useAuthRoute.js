import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { readProfile, logOut } from '../reducers/authSlice';

export default function useAuthRoute() {
  const { token, profile } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      if (token) {
        navigate('/news');
        dispatch(readProfile());
        return;
      }
    } else {
      if (!token) {
        dispatch(logOut());
        navigate('/');
        return;
      }
    }
  }, [location.pathname, token, dispatch, navigate, profile]);
}
