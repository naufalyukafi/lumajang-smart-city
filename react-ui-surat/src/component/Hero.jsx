import React from 'react'
import ImageHero from '../assets/images/img-hero.png'

const Hero = () => {
    return (
        <div className=''>
            <img src={ImageHero} alt={ImageHero} className="h-96 max-w-full h-auto" />
        </div>
    )
}

export default Hero