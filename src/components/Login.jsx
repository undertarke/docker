import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { fetchFromAPI, loginApi, loginFacebookApi } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary"
            onClick={() => {

              let email = document.querySelector("#email").value;
              let pass_word = document.querySelector("#pass").value;

              loginApi({ email, pass_word }).then(result => {

                localStorage.setItem("LOGIN_USER", result);
                window.location.href = "/"
              }).catch(err => console.log(err))

            }}
          >Login</button>
          <br />
          <ReactFacebookLogin
            appId="1383481755937484"
            fields="name,email,picture"
            callback={(response) => {
              // facebook ap
              loginFacebookApi(
                { facebook_app_id: response.id }
              ).then(result => {
                localStorage.setItem("LOGIN_USER", result);
                window.location.href = "/"

              }).catch(err => console.log(err))
            }} />
        </div>
      </form>
    </div>
  </div>
};

export default Login;

// yarn add react-facebook-login