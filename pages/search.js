import React, { useState } from "react";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Wall from "../assets/wall.jpg";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Footer from "./Footer";
import axios from "axios";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function search() {
  const [search, setSearch] = useState("");
  const [walls, setWalls] = useState([]);
  const Key = process.env.apiKey

  const btnClick = async () => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=${search}&per_page=30&client_id=${Key}`
      );
      setWalls(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Navbar />

        <div class="relative ...">
          <div className="details_wall bg-gradient-to-r from-[#FD595A] to-orange-500 h-[45vh] sm:h-[50vh] w-full rounded-lg "></div>
          <div class=" absolute top-[50%] left-[50%] translate-x-[-50%]  ">
            <div className=" flex flex-col justify-center items-center ">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Wallpapers.."
                className="input_serch w-full mx-auto py-2 pl-4 bg-white rounded-full "
              />
              <button
                onClick={btnClick}
                className="input_serch w-full border-none  my-4 text-white hover:text-black ml-2 bg-green-800 hover:bg-yellow-500 px-5 py-2 rounded-full "
              >
                Search
              </button>
            </div>

            <div className=" text-2xl text-gray-200 text-center mt-2 ">
              <p>Search Your Wallpapers</p>
            </div>
          </div>
        </div>

        <div className="home_wallpapers my-2 w-[100%] mx-auto ">
          <ImageList variant="masonry" cols={4} gap={14} className=" py-10 ">
            {walls.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <Link href={`/WallDetails/${item.id}`}>
                  <Tooltip title="Click To Download" placement="top" arrow>
                    <img
                      src={item.urls.full}
                      className="wall_images w-full hover:brightness-50 brightness-100 cursor-pointer h-full object-cover "
                      alt="img-error"
                    />
                    {/* <img
                        {...srcset(item.urls.full, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        className="wall_images w-full hover:brightness-50 brightness-100 cursor-pointer h-full object-cover "
                      /> */}
                  </Tooltip>
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
          <Footer />
        </div>
      </Container>
    </>
  );
}
