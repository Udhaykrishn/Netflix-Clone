import  { React, useState } from 'react'
import './Home.css'
import Navbar from'../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'


const Home = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="hero-image" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_title} alt="hero title" className='caption-img'/>
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an imortal enemy.</p>
          {showMore && (
            <div className="view-more">
              <p>Challenges abound for worldwide crime-fighting team The Protectors. Organised into a global secret society, their mission is to protect the innocent and apprehend the guilty. Starring Emmy winner Robert Vaughn "The Man From U.N.C.L.E.".</p>
              <p className='stars'>
                Stars: 
                <a href="">Robert Vaughn</a>
                <a href="">Nyree Dawn Porter</a>
                <a href="">Tony Anholt</a>
              </p>
            </div>
          )}
          <div className="hero-btns">
            <Link to={`/player/631842`} className='btn'><img src={play_icon} alt="play" />Play</Link>
            <button className='btn dark-btn' onClick={toggleShowMore}><img src={info_icon} alt="info icon"/>More</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
      <TitleCards title={"Only on Netflix"} category={"popular"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      <TitleCards title={"Top Pics for You"} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
