import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { checkCodeApi, checkEmailApi, loginApi, loginFacebookApi } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";

const ForgetPassword = () => {
  let [tour, setTour] = useState(0)

  return <div className="p-5 " style={{ minHeight: "100vh" }}>

    <div className=" d-flex justify-content-center">

      {tour == 0 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {
            let txtEmail = document.querySelector("#email").value;

            checkEmailApi(txtEmail).then(result => {
              if (result == true) {
                setTour(1)
              } else {
                alert("Email không tồn tại")
              }
            })

          }}>Tiếp theo</button>

        </div>
      </form>
      }

      {tour == 1 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <h3>Kiểm trả hộp thư của bạn để lấy code</h3>
          <label htmlFor="inputEmail4" className="form-label">Nhập Code</label>
          <input className="form-control" id="code" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {
            let txtCode = document.querySelector("#code").value;

            checkCodeApi(txtCode).then(result => {
              if (result == true) {
                setTour(2)
              } else {
                alert("Code không đúng")
              }
            })

          }}>Tiếp theo</button>

        </div>

      </form>
      }

      {tour == 2 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Nhập mật khẩu mới</label>
          <input className="form-control" id="password" />
        </div>


        <div className="col-12">
          <button type="button" className="btn btn-primary">Đổi mật khẩu</button>

        </div>

      </form>
      }


    </div>

  </div>
};

export default ForgetPassword;
