import React from "react";
import "./Contact.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const openWeb = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div id="contact" className="contact-wrap hiderx">
      <div className="say-hello">SAY HELLO !</div>
      <div className="contact-body">
        Did I miss anything?
        <br />
        Want to include me in your amazing project?
        <br />
        <br />
        Let's connect and explore the boundless productivity we can achieve together!
      </div>

      <div className="contact-list">
        <div className="bullethide">
          <FontAwesomeIcon
            className="font-awesome"
            icon={faLinkedin}
            size="4x"
            color="#ffad33"
            onClick={() => openWeb("https://www.linkedin.com/in/soumyajit-karmakar-68362526b/")}
          />
        </div>

        <div className="bullethide">
          <FontAwesomeIcon
            className="font-awesome"
            icon={faEnvelope}
            size="4x"
            color="#ffad33"
            onClick={() => openWeb("mailto:sona832004@gmail.com")}
          />
        </div>

        <div className="bullethide">
          <FontAwesomeIcon
            className="font-awesome"
            icon={faGithub}
            size="4x"
            color="#ffad33"
            onClick={() => openWeb("https://github.com/Soumyajit0803")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
