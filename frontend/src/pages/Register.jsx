import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        position: "",
    });
    const {name, email, password, password2, position} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error("Please fill in all fields");
        }
        if(isSuccess || user){
            navigate("/");

        }
        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name] : e.target.value,
        })
        )
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            toast.error("Passwords do not match");
            return;
        }
        dispatch(register({name, email, password, position}));
    }
    if (isLoading) {
        return <Spinner />;
    }
  return (
    <>
    <section className="heading">
        <h1>
            <FaUser/> Register
            </h1>
            <p>
                Please create an account
            </p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter your name" id="name" name="name" 
            value={name} onChange={onChange}/>
            </div>
            <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter your email" id="email" name="email" 
            value={email} onChange={onChange}/>
            </div>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter your position" id="position" name="position" 
            value={position} onChange={onChange}/>
            </div>
            <div className="form-group">
            <input type="password" className="form-control" placeholder="Enter your password" id="password" name="password" 
            value={password} onChange={onChange}/>
            </div>
            <div className="form-group">
            <input type="password" className="form-control" placeholder="Confirm your password" id="password2" name="password2" 
            value={password2} onChange={onChange}/>
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-block">Register</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register