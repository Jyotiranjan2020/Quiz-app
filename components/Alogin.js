import React from 'react';
import { Link } from 'react-router-dom';
import javaLogo from '../images/java-logo.png';
import Appheader from './Appheader';

const Alogin = () => {
  const data = [
   { image : javaLogo, alt: 'Java Logo', text: 'Java', link: '/java'  }
   
    
  ];

  return (
    <>
      <div>
        <Appheader />
      </div>
      <div className="mt-3 row mx-md-n3 mx-5 ">
        {data.map((item, index) => (
          <div className="card mx-3" style={{ width: "15rem", height: "410px" }} key={index}>
            <Link to={item.link}>
              <img className="card-img-top col px-md-5 mt-5" src={item.image} alt={item.alt} style={{ width: "15rem", backgroundSize: "cover" }} />
            </Link>
            <div className="card-body">
              <p className="card-text card-text-margin text-center my-4" style={{ marginTop: "10px" }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Alogin;
