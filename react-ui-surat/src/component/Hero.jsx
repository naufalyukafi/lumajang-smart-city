import React from 'react'
import ImageHero from '../assets/images/img-hero.png'

const Hero = () => {
    return (
        <div className=''>
            <img src={ImageHero} alt={ImageHero} className="mb-8 tablet:max-w-full tablet:h-auto laptop:max-w-full laptop:h-auto handphone:h-52" />
        </div>
    )
}

export default Hero