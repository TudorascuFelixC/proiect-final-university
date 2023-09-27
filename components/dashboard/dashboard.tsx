import React from "react";
import Title from "../common/title";
import Booking from "./booking";

const row1 = [
  {
    title: "Overview",
    link: "#",
  },
  {
    title: "Assessment",
    link: "#",
  },
  {
    title: "Reading and resources",
    link: "#",
  },
  {
    title: "Learning community",
    link: "#",
  },
  {
    title: "Guided learning",
    link: "#",
  },
  {
    title: "Careers",
    link: "#",
  },
];

const row2 = [
  {
    title: "Week 1",
    link: "#",
  },
  {
    title: "Week 2",
    link: "#",
  },
  {
    title: "Week 3",
    link: "#",
  },
  {
    title: "Week 4",
    link: "#",
  },
  {
    title: "Week 5",
    link: "#",
  },
  {
    title: "Week 6",
    link: "#",
  },
  {
    title: "Week 7",
    link: "#",
  },
  {
    title: "Week 8",
    link: "#",
  },
  {
    title: "Week 9",
    link: "#",
  },
  {
    title: "Week 10",
    link: "#",
  },
  {
    title: "Week 11",
    link: "#",
  },
  {
    title: "Week 12",
    link: "#",
  },
];
const row3 = [
  {
    title: "Q & A",
    link: "#",
  },
  {
    title: "Course Notes And Content",
    link: "#",
  },
  {
    title: "Seminar Session Recording",
    link: "#",
  },
  {
    title: "Academic Calendar",
    link: "#",
  },
  {
    title: "Carrer Services",
    link: "#",
  },
  {
    title: "Book a slot",
    link: "#",
  },
];

export default function Dashboard() {
  return (
    <div>
      <Title
        title="Contemporary Web Applications (QHO640)"
        breadcrumb="Home > Contemporary Web Applications (QHO640) > Book a slot"
      />
      <div className="container">
        <div className="flex flex-col pt-4">
          <div className="flex flex-row flex-wrap justify-center">
            {row1.map((item, index) => (
              <button
                key={index}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-grey-900 font-medium hover:animate-left-right rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white  dark:hover:bg-blue-700 "
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {row2.map((item, index) => (
              <button
                key={index}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium hover:animate-left-right rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {row3.map((item, index) => (
              <button
                key={index}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium hover:animate-left-right rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            <Booking />
          </div>
        </div>
      </div>
    </div>
  );
}
