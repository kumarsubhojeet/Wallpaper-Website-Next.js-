import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Footer from "../Footer";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 3x`,
  };
}

export default function Home() {
  const [walls, setWalls] = useState([]);
  const Key = process.env.apiKey

  const Apicall = async () => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=random&per_page=30&client_id=${Key}`
      );
      setWalls(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Apicall();
  }, []);

  return (
    <>
      <div className="home_main">
        <div className="home_wallpapers my-2 w-[100%] mx-auto ">
          <Container>
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
                        className="wall_images w-full hover:brightness-50 brightness-100 cursor-pointer h-full object-cover "
                        src={item.urls.full}
                        alt="error"
                      />
                    </Tooltip>
                  </Link>
                </ImageListItem>
              ))}
            </ImageList>
            <Footer />
          </Container>
        </div>
      </div>
    </>
  );
}
