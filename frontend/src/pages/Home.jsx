import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Spinner from '../components/Spinner';
import { getNewApiToken} from '../features/auth/authSlice';


function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {user ? (<>
        <section className="heading">
        <h1>Welcome {user.name}</h1>
        <p>Your API Token</p>
        </section>
        <section>
          <a className="api">{user.api_token}</a>
          <button className="btn btn-block" onClick={() => dispatch(getNewApiToken())}>Generate New API Token</button>
          </section>
      </>) : (<>
        <section className="heading">
        <h1>Welcome</h1>
        <p>Please login or register to get your api token</p>
        </section>
      </>)}
      <section>
        <p>This API gives you access to our database of Israel fuel prices.</p>
        <p>To use the api simply send a GET request to {process.env.REACT_APP_HOST_ADDRESS}/api/fuel/your_api_token/ and get a list of prices for every month.</p>
      </section>
    </div>
  )
}

export default Home