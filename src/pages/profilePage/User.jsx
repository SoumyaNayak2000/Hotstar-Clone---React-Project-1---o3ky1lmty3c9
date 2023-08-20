import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import avatar from "../../assets/avatar.png";
import Img from "../../components/lazyLoadImage/Img";
import { MdUploadFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Fuser from "./Fuser";
import Nuser from "./Nuser";

const User = () => {
  const [userImg, setUserImg] = useState(avatar);

  const [userData, setUserData] = useState({});
  const [isNewtonUser, setIsNewtonUser] = useState(false);

  const userNewton = useSelector((state) => state?.user?.userDetails?.data);
  const userFirebase = useSelector((state) => state?.user?.userDetails?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userNewton) {
      setIsNewtonUser(true);
      setUserData(userNewton);
    } else if (userFirebase) {
      setIsNewtonUser(false);
      setUserData(userFirebase);
    } else {
      navigate("/login");
    }
  }, [userData]);

  console.log(userNewton);
  // console.log(userFirebase?.displayName);
  console.log(userData);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name, type } = file;

    // Check the file type
    if (type.includes("jpg") || type.includes("jpeg") || type.includes("png")) {
      setUserImg(file);
      // For demonstration purposes, logging the file name for image files
      console.log("Image file selected:", name, userImg);
    } else {
      // Unsupported file type
      console.error("Unsupported file type");
    }
  };

  const handleFileSet = (e) => {
    // setUserImg(e.target.files[0]);
    setUserImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <ContentWrapper>
      <div className="content">
        {isNewtonUser ? (
          <Nuser userData={userData} />
        ) : (
          <Fuser userData={userData} />
        )}
      </div>
    </ContentWrapper>
  );
};

export default User;
