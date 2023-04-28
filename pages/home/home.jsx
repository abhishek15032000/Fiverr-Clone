import React from 'react'
import Featured from '../../components/Featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import SliderComp from '../../components/Slider/Slider';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import { cards } from '../../src/data';

const Home=()=>{
  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <SliderComp slidesToShow={5} arrowsScroll={5}>
         {
            cards.map(card=>(
              <CategoryCard key={card.id} item={card}/>
            ))
         }
      </SliderComp>
    </div>
  )
}

export default Home;