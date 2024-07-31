import React from 'react';
import './Page_description.scss'
import bg from '../../assets/images/bg.png'
import goal from '../../assets/images/Goal.png'

const services = [
    {
      imgSrc: goal, // Replace with actual image URL
      title: "Our Goal",
      description: "To guide individuals towards spiritual enlightenment and personal growth, fostering a sense of unity and purpose.",
      hoverContent: "Achieve Enlightenment"
    },
    {
      imgSrc: "https://static.wikia.nocookie.net/gtawiki/images/c/c1/EpsilonProgram-GTAVe-VespucciSidewalkMarketBooth.png", // Replace with actual image URL
      title: "Core Beliefs",
      description: "We believe in the power of collective wisdom and the importance of self-discovery. Our principles guide us towards harmony and balance.",
      hoverContent: "Explore Our Beliefs"
    },
    {
      imgSrc: "https://static.wikia.nocookie.net/gtawiki/images/3/3d/TopazStreetPenthouseBuilding-GTAIV.png", // Replace with actual image URL
      title: "Our Mission",
      description: "To inspire and support individuals in their journey towards higher consciousness through transformative teachings and practices.",
      hoverContent: "Discover Our Mission"
    },
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3Zgew9UWqJUAQd5IU6v0BOn05izq9QON7_q14cZaYZIV7CgpQzx7W4dYWuBwWj_OL_M&usqp=CAU", // Replace with actual image URL
      title: "Vision for the Future",
      description: "To create a world where individuals live in alignment with their highest selves, contributing to a greater collective awakening.",
      hoverContent: "See Our Vision"
    }
  ];
  

// const cases = [
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1351/case-hjv.jpg",
//     title: "Hjemmeværnet",
//     description: "The site is based on parallax ribbons and is fully responsive."
//   },
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1351/case-hjv.jpg",
//     title: "Hjemmeværnet",
//     description: "The site is based on parallax ribbons and is fully responsive."
//   },
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1351/case-hjv.jpg",
//     title: "Hjemmeværnet",
//     description: "The site is based on parallax ribbons and is fully responsive."
//   }
// ];

// const technologies = [
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1360/icon-dynamicweb.png",
//     title: "DYNAMICWEB",
//     description: "Out-of-the box CMS, E-commerce, PIM and Marketing platform."
//   },
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1357/icon-sitecore.png",
//     title: "SITECORE",
//     description: "Out-of-the box CMS, E-commerce, PIM and Marketing platform."
//   },
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1358/icon-umbraco.png",
//     title: "UMBRACO",
//     description: "Out-of-the box CMS, E-commerce, PIM and Marketing platform."
//   },
//   {
//     imgSrc: "https://www.e-bureauet.dk/media/1300/icon-abobe-captivate.png",
//     title: "ADOBE CAPTIVATE",
//     description: "Adobe Captivate is one of the leading eLearning authoring tools."
//   }
// ];

const ServiceBox = ({ imgSrc, title, hoverContent, description }) => (
  <div className="relative group ">
    <div className="bg-dark-primary-bg p-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={imgSrc} alt={title} className="w-full h-80 " />
      <p className="text-center mt-2 text-xl font-bold text-white">{title}</p>
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-75  flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h1 className="text-4xl font-bold m-5 text-sky-200 border-1 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">{hoverContent}</h1>
      <p className="text-sky-200 text-xl mt-2 border-2 p-5 m-5 shadow-sm text-center">{description}</p>
    </div>
  </div>
);

const CaseBox = ({ imgSrc, title,hoverContent, description }) => (
  <div
    className="relative bg-cover bg-center h-64 rounded-lg shadow-lg overflow-hidden"
    style={{ backgroundImage: `url(${imgSrc})` }}
  >
    <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col justify-center items-center text-black p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
      <h1 className="text-2xl font-bold">{title}</h1>
      <h1> {hoverContent}</h1>
      <p className="text-center mt-2">{description}</p>
    </div>
  </div>
);

const TechBox = ({ imgSrc, title, description }) => (
    
  <div className="bg-white p-4 rounded-lg shadow-lg text-center box-tech">
    <img src={bg} alt={title} className="mx-auto mb-2 h-24" />
    <p className="text-xl font-semibold">{title}</p>
    <div className="border-t border-gray-200 mt-2 pt-2">
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Page_description = () => (
  <div className="flex flex-col items-center justify-center h-screen container mx-auto px-2 py-10">
    <div className="text-center mb-4 ">
      {/* <h1 className="text-3xl font-bold">Our services</h1> */}
    </div>
    <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-2 gap-10 mb-2">
      {services.map((service, index) => (
        <ServiceBox key={index} {...service} />
      ))}
    </div>
    {/* <div className="text-center mb-4">
      <h1 className="text-3xl font-bold">Our cases</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {cases.map((caseItem, index) => (
        <CaseBox key={index} {...caseItem} />
      ))}
    </div> */}
    {/* <div className="text-center mb-4">
      <h1 className="text-3xl font-bold">Technologies</h1>
    </div>
    <div className='content'>
    <div className='box-tech'>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {technologies.map((tech, index) => (
        <TechBox key={index} {...tech} />
      ))}
    </div>
    </div>
    </div> */}
  </div>
);

export default Page_description;
