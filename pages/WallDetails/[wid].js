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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Footer from "../Footer";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";

const WallDetails = () => {
  const router = useRouter();
  const { wid } = router.query;
  console.log(wid);
  const Key = "Asf0i8szhvCa0P0ihwzRSDGSABZVn7PbHtfaxviZ_J0";
  const [walldetailsurls, setWallDetailsurls] = useState([]);
  const [details, setdetails] = useState([]);
  const [related, setRelated] = useState([]);
  const [user, setUser] = useState([]);
  const [links, setLinks] = useState([]);

  const Apicall = async () => {
    try {
      const res = await axios.get(
        `https://api.unsplash.com/photos/${wid}?client_id=${Key}`
      );
      setWallDetailsurls(res.data.urls);
      setdetails(res.data);
      setRelated(res.data.related_collections.results);
      setUser(res.data.user);
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
        <div className="images flex sm:flex-col  ">
          <div className=" w-[90%] sm:w-full ">
            <img
              src={walldetailsurls.full}
              className="details_wall rounded-md object-contained w-full h-[60vh] "
              alt="Logo"
            />
          </div>

          <div className=" w-[10%] sm:w-full sm:mt-4 mx-auto text-center ">
            <Tooltip title="Click to download" arrow placement="right-start">
              <a href={links.download} target='_blank' download={links.download} >
                
                <DownloadIcon className="details_wall cursor-pointer text-[50px] bg-red-400 hover:bg-red-300 rounded-full p-3 " />
              </a>
            </Tooltip>
          </div>
        </div>

        <div className=" my-6 flex justify-between w-full sm:flex-col ">
          <div className=" w-[30vw] sm:w-full ">
            <p className=" text-gray-700 font-medium text-base mb-1 ">
              Details
            </p>
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

            <div className="details my-4  bg-gray-200 py-5 px-3 rounded-lg w-full">
              <div className=" flex justify-center items-center"></div>
              <div className=" flex text-gray-700 justify-between">
                <div>Name</div> {user.name}
              </div>
              <div className=" flex text-gray-700 justify-between">
                <div>location</div> {!user.location ? "No-data" : user.location}
              </div>

              <div className="flex text-gray-700 justify-between">
                <ThumbUpOffAltIcon /> {user.total_likes}
              </div>

              <div className="flex text-gray-700 justify-between">
                <PersonIcon />
                {!user.portfolio_url ? "No-data" : user.portfolio_url}
              </div>
            </div>
          </div>

          <div className=" w-[60vw] mx-10 sm:w-full sm:mx-0 ">
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
                          <Link href={`/RelatedWall/${items.id}`}>
                            <img
                              src={items.urls.raw}
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
        <Footer />
      </Container>
    </dic>
  );
};

export default WallDetails;
