import React from "react";
import Container from "@mui/material/Container";
import Link from "next/link";


const categories = [
  {
    name: "Cars",
  },
  {
    name: "Bikes",
  },
  {
    name: "House",
  },
  {
    name: "Mountains",
  },
  {
    name: "Oceans",
  },
  {
    name: "Sky",
  },
  {
    name: "Green",
  },
  {
    name: "Computer",
  },
  {
    name: "Buildings",
  },
  {
    name: "river",
  },
 
];

export default function pcCategory() {
  return (
    <>
      <Container>
        <div className=" flex mt-6 justify-between  ">
          {categories.map((item) => (
            <>
            
              <div className=" bg-slate-200 cursor-pointer hover:bg-gray-500 hover:text-white py-1 px-4 rounded-full mx-3 ">
                {item.name}
              </div>
            </>
          ))}
        </div>
      </Container>
    </>
  );
}
