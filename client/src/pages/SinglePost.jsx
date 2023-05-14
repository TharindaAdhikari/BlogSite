import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import {Link} from "react-router-dom";
import Menu from "../pages/Menu";

const SinglePost = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div className="user">
          <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={'/write?edit=2'}>
            <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at!</h1>
        <p> The United States of America (U.S.A. or USA), commonly known as the United States (U.S. or US) or America, is a country primarily located in North America. It consists of 50 states, a federal district, five major unincorporated territories, nine Minor Outlying Islands,[i] and 326 Indian reservations. The United States is the world's third-largest country by both land and total area.[c] It shares land borders with Canada to its north and with Mexico to its south and has maritime borders with the Bahamas, Cuba, Russia, and other nations.[j] With a population of over 333 million,[k] it is the most populous country in the Americas and the third most populous in the world. The national capital of the United States is Washington, D.C., and its most populous city and principal financial center is New York City.</p>
      </div>
      <Menu/>
    </div>
  )
}

export default SinglePost