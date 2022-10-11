import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Container from "@mui/material/Container";
import Image from "next/image";
import moment from "moment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Link from "next/link";
import Footer from "../Footer";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";

const WallDetails = () => {
  const router = useRouter();
  const { rid } = router.query;
  console.log(rid);
  const Key = process.env.apiKey
  const [walldetailsurls, setWallDetailsurls] = useState([]);
  const [details, setdetails] = useState([]);
  const [related, setRelated] = useState([]);
  const [links, setLinks] = useState([]);
  
  const Apicall = async () => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/photos/${rid}?client_id=${Key}`
      );
      setWallDetailsurls(res.data.urls);
      setdetails(res.data);
      setRelated(res.data.related_collections.results);
      setLinks(res.data.links);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Apicall();
  }, []);

  return (
    <dic className="Details_main">
      <Navbar />
      <Container>
        <div className="images flex sm:flex-col ">
          <img
            src={walldetailsurls.raw}
            className="details_wall rounded-md bg-cover bg-center w-full h-[50vh] "
            alt="Logo"
          />

          <div className=" w-[10%] sm:w-full sm:mt-4 mx-auto text-center ">
            <Tooltip title="Click to download" arrow placement="right-start">
              <a
                href={links.download}
                target="_blank"
                download={links.download}
              >
                <DownloadIcon className="details_wall cursor-pointer text-[50px] bg-red-400 hover:bg-red-300 rounded-full p-3 " />
              </a>
            </Tooltip>
          </div>
        </div>

        <div className=" my-6 flex justify-between w-full ">
          <div className=" w-[30vw] ">
            <div className="details my-4  bg-gray-200 py-5 px-3 rounded-lg w-full ">
              <div className="resolution text-gray-700 flex justify-between ">
                <div className="  ">Resolution</div>
                <div className="">
                  {details.width} x {details.height}
                </div>
              </div>
              <div className=" text-gray-700 flex justify-between">
                <div>Published</div>
                <div>{moment(details.created_at).format("MMM Do YY")}</div>
              </div>

              <div className=" text-gray-700 flex justify-between">
                <div>Views</div> {details.views}
              </div>
              <div className=" text-gray-700 flex justify-between">
                <div>Downloads</div> {details.downloads}
              </div>
            </div>
          </div>

          <div className=" w-[60vw] mx-10 ">
            <p className=" text-gray-700 font-medium text-base mb-1 ">
              Related
            </p>
            <div className="related_images w-full h-full">
              <ImageList variant="quilted" cols={3} rowHeight={141}>
                {related.map((data) => (
                  <>
                    {data.preview_photos.map((items) => (
                      <>
                        <ImageListItem key={items.img}>
                          <Link href={`/WallDetails/${items.id}`}>
                            <img
                              src={`${items.urls.raw}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${items.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt="{items.title}"
                              loading="lazy"
                              className=" w-full hover:brightness-50 brightness-100 cursor-pointer h-full object-cover "
                            />
                          </Link>
                        </ImageListItem>
                      </>
                    ))}
                  </>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </dic>
  );
};

export default WallDetails;
