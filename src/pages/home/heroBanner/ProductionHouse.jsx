import React from 'react'
import disney from './../../../assets/images/disney.png'
import marvel from './../../../assets/images/marvel.png'
import nationalG from './../../../assets/images/nationalG.png'
import pixar from './../../../assets/images/pixar.png'
import starwar from './../../../assets/images/starwar.png'
 
import starwarV from '../../../assets/videos/1608229455-star-wars.mp4'
import disneyV from '../../../assets/videos/1564674844-disney.mp4'
import marvelV from '../../../assets/videos/1564676115-marvel.mp4'
import nationalGeographicV from '../../../assets/videos/1564676296-national-geographic.mp4'
import pixarV from '../../../assets/videos/1564676714-pixar.mp4'


function ProductionHouse() {
    const productionHouseList=[
        {
            id:1,
            image:disney,
            video:disneyV
        },
        {
            id:2,
            image:pixar,
            video:pixarV
        },
        {
            id:3,
            image:marvel,
            video:marvelV
        },
        {
            id:4,
            image:starwar,
            video:starwarV
        },
        {
            id:5,
            image:nationalG,
            video:nationalGeographicV
        },

    ]
  return (
    <div className='flex gap-2 md:gap-5 p-2 px-5 md:px-16 py-0  mb-10 '>
        {productionHouseList.map((item,index)=>(
            <div key={index} className='border-[2px] border-gray-600
            rounded-lg hover:scale-110 transition-all duration-300
            ease-in-out cursor-pointer relative shadow-xl 
            shadow-gray-800
            '>
                 <video src={item.video} autoPlay loop playsInline muted 
            className='absolute z-0  top-0 rounded-md 
            opacity-0 hover:opacity-50'/> 
                <img src={item.image} className='w-full z-[1] opacity-100' /> 
               
            </div>
        ))}
    </div>
  )
}

export default ProductionHouse