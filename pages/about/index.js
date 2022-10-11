import React from "react";
import Navbar from "../Navbar";
import Container from "@mui/material/Container";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import Footer from "../Footer";

export default function index() {
  return (
    <>
      <Navbar />
      <div className="about">
        <Container>
          <div className=" my-10 flex justify-center items-center flex-col ">
            <Image
              src={Logo}
              className=" object-cover cursor-pointer "
              width={100}
              height={100}
              alt="Logo"
              style={{ objectFit: "cover" }}
            />
            <p className=" text-center">
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose injected humour and the like.
            </p>
          </div>
          <Footer />
        </Container>
      </div>
    </>
  );
}
