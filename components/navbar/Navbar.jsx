
import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
function Navbar() {

 // check if we have scrolled down the navbar , to make the menu list merge with the navbar in grey color , we need to check if the scroll is at the top or has been moved down.

 const[active,setActive]=useState(false);
 // if there is a scroll then adding active classname to the list of classes to the navbar component , otherwise remains navabar classname;
 
 const isActive=()=>{
      window.scrollY > 0 ? setActive(true): setActive(false);
 }
 useEffect(()=>{
     window.addEventListener('scroll',isActive);
     return ()=>{
        // cleanup funtions;
        window.removeEventListener('scroll',isActive);
     }
 },[]);

  return (
    <div className={active?"navbar active":"navbar"}>
        <div className="container">
             <div className="logo">
                {/* <Link to='/'> */}
                    <span className='text'>TalentTrade</span>
                {/* </Link> */}
                <span className='dot'>.</span>
             </div>
             <div className="links">
                <span>TalentTrade Business</span>
                <span>Explore</span>
                <span>English</span>
                <span>Sign in</span>
                <span>Become a Seller</span>

                <button>Join</button>
             </div>
        </div>
        {/*menu items will be visible when scorlled down , when active then only show these components , active is controlled using useState hook in react  */}
        { active &&   
        <>
         <hr />
          <div className="menu">
                <span>Test</span>
                <span>Test2</span>
          </div>
        </>
        } 
    </div>
  )
}

export default Navbar