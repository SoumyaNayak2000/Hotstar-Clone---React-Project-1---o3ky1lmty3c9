import React, { useState , useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useAuth } from "../../firebase/auth";
import Loader from "../../components/Loader";
import { useNavigate , Link} from "react-router-dom";

const provider = new GoogleAuthProvider();

const Register = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const { authUser, isLoading ,setAuthUser } = useAuth();



  useEffect(() => {
    if (!isLoading && authUser) {
        navigate("/")
    }
  }, [authUser, isLoading]);

//   const signupHandler = async () => {
//     if (!email || !name || !password) {
//       return;
//     }
//     try {
//       const {user} = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(auth.currentUser, {
//         displayName: name,
//       });

//       setAuthUser({
//         uid:user.uid,
//         email:user.email,
//         name,
//       })

//       console.log(user);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  const signInWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
  };
  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex 4xl:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[500px]">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link to="/login" className="underline hover:text-blue-400 cursor-pointer">
              Login
            </Link>
          </p>

          <div
            className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Name</label>
              <input
                type="text"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            //   onClick={signupHandler}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
        style={{
          backgroundImage: "url('/login-banner.jpg')",
        }}
      ></div>
    </main>
  );
};

export default Register;
