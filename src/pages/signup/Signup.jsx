import React, { useEffect, useState } from 'react'
import "./signup.scss";
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ImGithub } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { BsTwitter } from 'react-icons/bs';
import { inputLabelClasses } from "@mui/material/InputLabel";
import axios from "axios";
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { getUser } from '../../reduxStore/userSlice'
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const projectId = import.meta.env.VITE_APP_PROJECT_ID;
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);


    const { loginWithGoogle, loginWithGitHub, loginWithTwitter } = useAuth();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(user));
    }, [user])
    let headersList = {
        "projectId": projectId,
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        appType : "ott"
    });

    let reqOptions = {
        url: "https://academics.newtonschool.co/api/v1/user/signup",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    const signup = async () => {
        try {
            setLoading(true);
            let response = await axios.request(reqOptions);
            console.log(response);
            if (response) {
                setUser(response);
                console.log(response);
                toast.success('Account has been created successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');

                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000)
            }

        } catch (error) {
            console.error(error);
            toast.error('EmailId already registered!');
            setLoading(false);
        }

    }

    const handleSignup = () => {
        if ((name.length > 5 && email) && (password === cPassword)) {
            signup();

        } else {
            return false;
        }
    }
    const sxx = () => {
        return {
            // set the color of the label when not shrinked
            color: "white",
            border: 'blue',
            [`&.${inputLabelClasses.shrink}`]: {
                // set the color of the label when shrinked (usually when the TextField is focused)
                color: "white",
            }
        }
    }
    console.log(user?.config);

    return loading ? <div><Loader/></div> : (
        <>
            <section className="signup">
                <ContentWrapper>
                    <div className="formDiv">
                        <div className="form">
                            <p className="para2">
                                SignUp with Hotstar
                            </p>

                            <form onSubmit={e => e.preventDefault()}>
                                <Stack spacing={3}>
                                    <TextField id="name" type='text' label="Full Name" variant="filled" InputLabelProps={{ sx: sxx() }}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField id="email" type='email' label="Email" variant="filled" InputLabelProps={{ sx: sxx() }}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField id="password" type='password' label="Password" variant="filled" InputLabelProps={{ sx: sxx() }}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    />
                                    <TextField id="confirm-password" type='password' label="Confirm Password" variant="filled" InputLabelProps={{ sx: sxx() }}
                                        required
                                        value={cPassword}
                                        onChange={(e) => setCPassword(e.target.value)}

                                    />{
                                        (password !== cPassword) &&
                                        <span className='notMatched'>
                                            Confirm password not matched!
                                        </span>
                                    }

                                </Stack>
                                <button onClick={handleSignup}>Signup</button>
                            </form>
                            <div className="social-accounts">
                                <div id="google-e" onClick={loginWithGoogle}>
                                    <FcGoogle size={35} />
                                </div>

                                <div id="github-b" onClick={loginWithGitHub}>
                                    <ImGithub color='white' size={35} />
                                </div>

                                <div id="twitter-r" onClick={loginWithTwitter}>
                                    <BsTwitter size={35} />
                                </div>
                            </div>
                            <p className="para4">
                                Already have account?<Link className='loginHere' to={'/login'}>Login Here</Link>
                            </p>

                        </div>
                    </div>
                </ContentWrapper>
            </section >
        </>
    );
}

export default Signup;