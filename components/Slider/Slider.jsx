
import React from 'react'
import Slider from "infinite-react-carousel";

const SliderComp = ({children,slidesToShow,arrowsScroll}) => {
  return (
    <div className='slide'>
        <div className="container">
             <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                 {
                   children
                 }
             </Slider>
        </div>
    </div>
  )
}

export default SliderComp