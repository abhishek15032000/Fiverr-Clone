import React from 'react'
import { useState } from 'react';
import { gigs } from '../../src/data';
import GigCard from '../../components/gigCard/GigCard';
const Gigs=()=>{
   // to select between best selling and sort , the menu or drop down contains these two filter, the dropdown should open when open is set to true 
   const [open,setOpen]=useState(false);
   //
   const[sort,setSort]=useState("sales");

   const reSort=(type)=>{
    setSort(type)
    setOpen()
   }
  return (
    <div className="gigs">
      <div className="container">
          <span className="breadcrumbs">
             TalentTrade &gt; Graphics & Design &gt;
          </span>
             <h1>AI Artists</h1>
             <p>
                Explore the boundaries of art and technology with TalentTrade's AI artists
             </p>
             <div className="menu">
                 <div className="left">
                    <span>Budget</span>
                    <input type="text" name="" id="" placeholder='min' />
                    <input type="text" name="" id="" placeholder='max' />
                    <button>Apply</button>
                 </div>
                 <div className="right">
                    <span className='sortBy'>SortBy</span>
                    <div className="sortType">{sort==="sales"?"Best Selling":"Newest"}</div>
                    <img src="./img/down.png" alt="" onClick={()=>setOpen(!open)}/>
                    {open && (<div className="rightMenu">
                        {
                        sort==="sales"?(<span onClick={()=>reSort("createdAt")}>Newest</span>):
                        (<span onClick={()=>reSort("sales")}>Best Selling</span>)                        
                        }
                     </div>)
                    }
                 </div>
             </div>

             <div className="cards">
                  {gigs.map(gig=>(
                    <GigCard key ={gig.id} item={gig}/>
                  ))}
             </div>
      </div>
    </div>
  )
}

export default Gigs;