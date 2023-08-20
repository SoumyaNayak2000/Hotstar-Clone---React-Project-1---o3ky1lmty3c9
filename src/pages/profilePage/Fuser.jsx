import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import "./fuser.scss";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../reduxStore/userSlice";
import { toast } from "react-toastify";

const Fuser = ({ userData }) => {
  const [userImg, setUserImg] = useState(null);
  const [userName, setUserName] = useState(userData.displayName);
  const [email, setEmail] = useState(userData?.email);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleFileSet = (e) => {
    setUserImg(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    setUserImg(userData?.photoURL);
  }, [userData]);

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
        <h3>{userData.displayName}</h3>
        <p>{userData.email}</p>
        <div className="skills">
          <h6>Updation</h6>
          <div className="buttons">
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
            <button className="close-modal" onClick={toggleModal}>
              <ImCross />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Fuser;
