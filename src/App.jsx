import { useEffect, useRef, useState } from "react"
import HeadCanvas from "./HeadCanvas"
import AnimatedList from "./AnimatedList"

export default function App() {
  const [bgOffset, setBgOffset] = useState(0)
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    const handler = () => {
      const st = Math.min(window.innerHeight, window.scrollY)/window.innerHeight
      setBgOffset(st * window.innerHeight * 0.3)
      setOpacity(st)
    }
    window.addEventListener("scroll", handler)
    handler()
  }, [])

  const refs = Array(5).fill(null).map(() => useRef())
  const scrollContainerRef = useRef()
  const [visibleImage, setVisibleImage] = useState(0)

  useEffect(() => {
    const handle = () => {
      const idx = refs.findIndex(ref => ref.current.getBoundingClientRect().top > 0)
      setVisibleImage(idx >= 0 ? idx : refs.length-1)
    }
    window.addEventListener("scroll", handle)
  }, [...refs, scrollContainerRef])

  return (<main className="main">
    <div className="head" style={{
      translate: `0 ${-bgOffset}px`,
      opacity: `${1.0 - Math.min(1, opacity/0.7)}`
    }}>
      <div className="container">
        <h1 className="title">LUMINA</h1>
        <span className="head-desc">A drone that can play games aboard the ISS with astronauts.</span>
      </div>

    </div>
    <div className="titles">
      <div className="titles-inner" style={{
        opacity: `${opacity}`,
      }}>
        <div className="tm-container">
          <h1 className="titles-m" style={{
            transform: `perspective(600px) scale(${1 + (1.0 - opacity) * 10})`,
            willChange: "transform"
          }}>Introduction</h1>
        </div>
      </div>
      <div className="presentation-container">
        <div className="presentation-text" ref={scrollContainerRef}>
          <h1 className="presentation-item" ref={refs[0]}>Astronauts know that space can sometimes be daunting where they can't play games. They can also be homesick.</h1>
          <h1 className="presentation-item" ref={refs[1]}><span className="whatif">What if</span> we could change this?</h1>
          <h1 className="presentation-item" ref={refs[2]}>What if we could create a recreational game that's fun and engaging for every astronaut?</h1>
          <h1 className="presentation-item" ref={refs[3]}>Well, it turns out we can!</h1>
          <h1 className="presentation-item" ref={refs[4]}>Introducing Luna, our smart game drone for space. From Earth.</h1>
        </div>
        <div className="presentation-stick">
          <div className="presentation-image-container">
            <img src="/pres1.webp" className="presentation-image" style={{
              opacity: visibleImage == 0 ? "1" : "0"
            }}></img>
            <img src="/pres2.jpg" className="presentation-image" style={{
              opacity: (visibleImage == 1 || visibleImage == 2) ? "1" : "0"
            }}></img>
            <img src="/spaceforge.jpg" className="presentation-image" style={{
              opacity: visibleImage == 3 ? "1" : "0"
            }}></img>
            <img src="/image.webp" className="presentation-image" style={{
              opacity: visibleImage == 4 ? "1" : "0"
            }}></img>
          </div>
        </div>
      </div>
      <div className="details">
        <h1 class="title title-sm">Details</h1>
        <span className="details-text">Lumina is a drone that can play games aboard the ISS with astronauts.</span>
        <AnimatedList />
        <h2>That's how you make a <span className="whatif">fun</span> game for all!</h2>
      </div>

      <div className="outro-canvas-container">
        <HeadCanvas />
      </div>

      <h1 className="title title-mini">Our Team</h1>
      <ul className="ul-list">
        <li>Okyanus Özşahin</li>
        <li>Mert Efe Şükür</li>
        <li>Mustafa Eralp Bodur</li>
        <li>Damla Akarsu</li>
      </ul>
    </div>
  </main>)
}