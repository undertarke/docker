import React from "react";
import { Stack } from "@mui/material";
import { getVideoTypeApi } from "../utils/fetchFromAPI";
import { useNavigate } from "react-router-dom";

let categories = [
  { name: 'New', icon: <i className="fa-solid fa-house"></i>, },
  { name: 'Coding', icon: <i className="fa-solid fa-code"></i>, },
  { name: 'Music', icon: <i className="fa-solid fa-music"></i> },
  { name: 'Movie', icon: <i className="fa-solid fa-video"></i>, },
  { name: 'Gaming', icon: <i className="fa-sharp fa-solid fa-gamepad"></i>, },
  { name: 'Sport', icon: <i className="fa-solid fa-baseball"></i> },
  { name: 'Fashion', icon: <i className="fa-sharp fa-solid fa-shirt"></i>, },
  { name: 'Gym', icon: <i className="fa-solid fa-dumbbell"></i>, },
  { name: 'Crypto', icon: <i className="fa-solid fa-diamond"></i>, },
];

const Categories = ({ selectedCategory, setSelectedCategory }) => {


  getVideoTypeApi().then(result => {
    
    categories = result
  }).catch(err => console.log(err))

  const navigate = useNavigate();

  return (< Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {
      categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => {
            navigate(`/type/${category.type_id}`)
          }}
          style={{
            background: category.type_id === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.type_id}
        >
          <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
            {category.icon}
          </span>
          <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
            {category.type_name}
          </span>
        </button>
      ))
    }
  </Stack >
  );
}

export default Categories;
