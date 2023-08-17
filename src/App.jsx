import { useEffect } from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGeneres } from "./store/homeSlice";


import Header from "./components/Header";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "./pages/login/Login";
import GetStarted from "./pages/getStarted/GetStarted";
import Signup from "./pages/signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Footer from "./components/Footer";



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  // console.log(url);
  const { userDetails } = useSelector((state) => state?.user);
  useEffect(() => {
    if (userDetails) {
      fetchApiConfig();
      genersCall();
    } else {
      navigate("/login");
    }
  }, [userDetails]);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genersCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGeneres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGeneres[item.id] = item));
    });

    dispatch(getGeneres(allGeneres));
  };

  return (
    <main>
      
      <Header />
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>

    </main>
  );
}

export default App;
