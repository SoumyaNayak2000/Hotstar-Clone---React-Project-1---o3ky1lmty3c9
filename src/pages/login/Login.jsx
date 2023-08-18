import React, { useEffect,useState } from 'react'
import './login.scss'
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";
import { Stack, TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { getUser } from '../../reduxStore/userSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Loader';

import logo from "../../assets/images/logo.png"


const Login = () => {
    const projectId = import.meta.env.VITE_APP_PROJECT_ID;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loginWithGoogle, loginWithGitHub, loginWithTwitter } = useAuth();

    useEffect(() => {
        dispatch(getUser(userData));

    }, [userData]);

    let headersList = {
        "projectId": projectId,
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        "email": email,
        "password": password
    });

    let reqOptions = {
        url: "https://academics.newtonschool.co/api/v1/user/login",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    };

    const login = async () => {
        try {
            setLoading(true);
            let response = await axios.request(reqOptions);
            if (response.status === 200) {

                console.log(response);
                setUserData(response);
                toast.success('Logged in Successfully !');

                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000);


            }
        } catch (error) {
            setLoading(false);
            const errMsg = error?.response?.data?.message;
            console.error(error, errMsg);
            toast.error(`${errMsg}`);
        }


    }
    const handleSignIn = () => {
        login();
    }

    const  myStyle= () => {
        return {
            // set the color of the label when not shrinked
            color: "white",
            [`&.${inputLabelClasses.shrink}`]: {
                // set the color of the label when shrinked (usually when the TextField is focused)
                color: "white",
            }
        }
    }
    return loading ? <div><Loader/></div> : (
        <>
            <section className='login-main'>
                <div className="form-wrapper">
                    <h2>Sign In</h2>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div className="form-control">
                            <Stack spacing={3}>
                                <TextField id="email" type='email' label="Email" variant="filled"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputLabelProps={{ sx: myStyle() }}
                                    autoComplete="true"
                                />
                                <TextField id="password" type='password' label="Password" variant="filled"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputLabelProps={{ sx: myStyle() }}
                                    autoComplete='true'
                                />
                            </Stack>
                        </div>
                        <button className='btn-signin' type="button" onClick={handleSignIn}>Sign In</button>
                        <div className="form-help">
                            <div className="remember-me">
                                <input type="checkbox" defaultChecked id="remember-me"/>
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                        </div>
                    </form>
                    <div className="social-accounts m">
                        <div id="google" onClick={loginWithGoogle}>
                            <FcGoogle size={35} />
                        </div>

                        <div id="github" onClick={loginWithGitHub} >
                            <ImGithub color='white' size={35} />
                        </div>

                        <div id="twitter" onClick={loginWithTwitter} >
                            <BsTwitter size={35} />
                        </div>
                    </div>
                    <p className='new'>New to Hotstar? <Link className='go-signup' to={'/signup'}>Sign up now</Link></p>
                </div>
            </section>
        </>
    )
}

export default Login;