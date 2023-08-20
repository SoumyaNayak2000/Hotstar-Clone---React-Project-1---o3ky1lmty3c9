import { useState } from "react";
import {ImCross} from "react-icons/im"
import avatar from "../../assets/avatar.png";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reduxStore/userSlice";

const Nuser = ({ userData }) => {
  const [userImgData, setUserImgData] = useState("");
  const [userImg, setUserImg] = useState(
    userData?.data.profileImage ? userData?.data.profileImage : avatar
  );
  const [name, setName] = useState(userData?.data?.name);
  const [email, setEmail] = useState(userData?.data?.email);
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conNewPassword, setConNewPassword] = useState("");

  const [modal, setModal] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModal(!modal);
    console.log("modal clicked", modal);
  };
  const toggleModalPassword = () => {
    setModalPassword(!modalPassword);
    console.log("modal clicked", modalPassword);
  };

  if (modalPassword) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const projectId = import.meta.env.VITE_APP_PROJECT_ID;
  const token = "Bearer " + userData.token;

  const handleFileSet = (e) => {
    setUserImgData(e.target.files[0]);
    setUserImg(URL.createObjectURL(e.target.files[0]));
  };

  console.log(userData);

  let headersList = {
    projectId: projectId,
    Authorization: token,
    "Content-Type": "application/json",
  };

  const updatePassword = async () => {
    let bodyContent = JSON.stringify({
      name: name,
      email: email,
      passwordCurrent: currPassword,
      password: conNewPassword,
    });

    let reqOptions = {
      url: "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
      method: "PATCH",
      headers: headersList,
      data: bodyContent,
    };

    try {
      if (conNewPassword === newPassword) {
        let response = await axios.request(reqOptions);

        if (response.data.token) {
          setCurrPassword("");
          setConNewPassword("");

          toast.success("Password changed Successfully!");
        } else if (!response) {
          setCurrPassword("");
          setConNewPassword("");
          toast.success(response.message);
        }
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", userImgData, userImgData.name);
      console.log("submitting");

      const response = await axios.patch(
        "https://academics.newtonschool.co/api/v1/user/updateProfileImage",
        formData,
        {
          headers: {
            projectId: projectId,
            Authorization: token,
          },
        }
      );

      console.log(response);
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    }
  };
  const logout = () => {
    try {
      // console.log('logging out....');
      dispatch(getUser(null));
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error(error);
      toast.error("Something goes very wrong");
    }
  };

  return (
    <>
    <div
        className="hover:scale-110 transition-all duration-300
            ease-in-out"
        id="logout-btn"
      >
        <Link to={"/login"} onClick={logout}>
          <FiLogOut />
        </Link>
      </div>
      <div className="card-container">
        <span className="pro">My Profile</span>
        <img className="round" src={userImg} alt="user" />
        <h3>{name}</h3>
        <p>{email}</p>
        <div className="skills">
          <h6>Updation</h6>
          <div className="buttons">
            <button className="primary" onClick={toggleModalPassword}>
              Update Profile
            </button>
            <button className="primary ghost" onClick={toggleModal}>
              Change Profile Image
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Change Profile Image</h2>
            <div>
              <input
              className="custom-file-input"
                type="file"
                accept=".jpeg, .jpg, .png, .ico"
                onChange={(e) => {
                  handleFileSet(e);
                }}
              />
            </div>
            <button onClick={updateImage}>Update</button>
            <button className="close-modal" onClick={toggleModal}>
              <ImCross/>
            </button>
          </div>
        </div>
      )}

      {modalPassword && (
        <div className="modal">
          <div onClick={toggleModalPassword} className="overlay"></div>
          <div className="modal-content">
            <h2>Change Profile</h2>
            <div>
              <h2>{name}</h2>
              <h2>{email}</h2>
              <div>
                <label htmlFor="currPass">Current Password</label>
                <input
                  type="password"
                  id="currPass"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPass">New Password</label>
                <input
                  type="password"
                  id="newPass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confPass">Current Password</label>
                <input
                  type="password"
                  id="confPass"
                  value={conNewPassword}
                  onChange={(e) => setConNewPassword(e.target.value)}
                />
                {newPassword !== conNewPassword && (
                <span className="notMatched">
                  Confirm password not matched!
                </span>
              )}
              </div>
            </div>
            <button className="submit" onClick={updatePassword}>Update</button>
            <button className="close-modal" onClick={toggleModalPassword}>
            <ImCross/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nuser;
