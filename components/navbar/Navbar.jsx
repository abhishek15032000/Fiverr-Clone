
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState,useEffect} from 'react';

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

 const currentUser={
    id:1,
    username:"John Doe",
    isSeller:true
 }
 // this state is there to show the order,gigs of the user when clicked upon that user div .
 const [open,setOpen]=useState(false);

 // we want the active style to be always applied when we are not on the home page , for this we are using useLocation Hook.
 // for this we are checking if the pathname is equal to home page or not , if not equal then apply the styles on bot the categories or menu and on the navbar
 const {pathname}=useLocation();

  return (
    <div className={active || pathname!=='/'?"navbar active":"navbar"}>
        <div className="container">
             <div className="logo">
                <Link to='/' className='link'>
                    <span className='text'>TalentTrade</span>
                </Link>
                <span className='dot'>.</span>
             </div>
             <div className="links">
                <span>TalentTrade Business</span>
                <span>Explore</span>
                <span>English</span>
                <span>Sign in</span>
                {/** if current user is not a seller then show this  */}
                {!currentUser?.isSeller && <span>Become a Seller</span>}
                {/** if current user exist then dont show join button */}
                {!currentUser && <button>Join</button>}
                {
                    currentUser && (
                         <div className='user' onClick={()=>setOpen(!open)}>
                                <img src="https://imgs.search.brave.com/C5224vNj6xCmH31Wy1HRLavev55FdL6we8X3nyc5288/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NmL0Fu/Z3VsYXJfZnVsbF9j/b2xvcl9sb2dvLnN2/Zy81MTJweC1Bbmd1/bGFyX2Z1bGxfY29s/b3JfbG9nby5zdmcu/cG5n" alt="" />
                                <span>{currentUser?.username}</span>
                                {/** show the user menu when the open is set to true  */}
                              { open && 
                                   (<div className='options'>
                                    {
                                         currentUser?.isSeller && (
                                            <>
                                               <Link to="/mygigs" className='link'>Gigs</Link>
                                               <Link to="/add" className='link'>Add New Gig</Link>

                                            </>
                                         )
                                    }
                                    <Link to="/orders" className='link'>Orders</Link>
                                    <Link to="/messages" className='link'>Messages</Link>
                                    <Link to="/" className='link'>Logout</Link>
                                   </div>
                                   )
                                }
                              
                         </div>
                    )
                }
             </div>
        </div>
        {/*menu items will be visible when scorlled down , when active then only show these components , active is controlled using useState hook in react  */}
        { (active || pathname!=='/') &&   
        <>
         <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </>
        } 
    </div>
  )
}

export default Navbar