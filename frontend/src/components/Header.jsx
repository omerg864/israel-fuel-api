import {FaSignInAlt, FaSignOutAlt, FaUser, FaGasPump} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  return (
    <header className="header">
        <div className="logo">
            <Link to="/">
            <a className="headerA">
              <FaGasPump /> Israel Fuel API
              </a>
              </Link>
        </div>
        <ul>
          {user ? (<li>
            <button className="btn" onClick={onLogout}>
            <a className="headerA">
              <FaSignOutAlt /> Logout
              </a>
              </button>
          </li>) : (<>
          <li>
          <Link to="/login">
          <a className="headerA">
          <FaSignInAlt/> Login</a>
          </Link>
          </li>
          <li>
          <Link to="/register">
          <a className="headerA">
          <FaUser/>Register
          </a>
          </Link>
          </li>
          </>)}
        </ul>
    </header>
  )
}

export default Header