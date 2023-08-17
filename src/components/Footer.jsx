import React from "react";
import avtar from "../assets/IMG_20230707_162823_137.jpg";
import "./footer.scss";

const avatarSrc = avtar;

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div>
          <div>
            <h1>About Us</h1>
            <p>
              We are the best Video streaming Platform in India
            </p>
            <p>Stay tuned...</p>
          </div>

          <div>
            <img src={avatarSrc} />
            <h2>The Founder</h2>
            <h3>Soumya Ranjan Nayak</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
