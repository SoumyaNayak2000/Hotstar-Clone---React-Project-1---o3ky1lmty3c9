import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../store/userSlice";

const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const useAuth = () => {
  // const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getUser(userData));
  // }, [userData])

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      toast.success(`Successfully logged in`);
      // Dispatch action to set user details in Redux store
      if (user) {
        // setUserData(user);
        dispatch(getUser(user));
        navigate("/");
      }
    } catch (error) {
      console.warn("Error From loginWithGoogle", error);
      toast.error(`Login Failed : ${error.message}`);
    }
  };

  const loginWithGitHub = async () => {
    try {
      const user = await signInWithPopup(auth, githubProvider);
      console.log(user);
      if (user) {
        // setUserData(user);
        dispatch(getUser(user));
        navigate("/");
      }
      toast.success(`Successfully logged in`);
    } catch (error) {
      console.error("Error From loginWithGitHub", error);
      toast.error(`Login Failed : ${error.message}`);
    }
  };

  const loginWithTwitter = async () => {
    try {
      const user = await signInWithPopup(auth, twitterProvider);
      console.log(user);
      if (user) {
        // setUserData(user);
        dispatch(getUser(user));
        navigate("/");
      }
      toast.success(`Successfully logged in`);
    } catch (error) {
      console.error("Error From loginWithTwitter", error);
      toast.error(`Login Failed : ${error.message}`);
    }
  };

  return {
    loginWithGoogle,
    loginWithGitHub,
    loginWithTwitter,
  };
};

export default useAuth;
