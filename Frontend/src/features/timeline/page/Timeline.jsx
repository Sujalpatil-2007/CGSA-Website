import React,{useEffect} from 'react'
import Navbar from '../../home/components/Navbar'
import TimelineCard from '../components/TimelineCard'
import { timelineData } from '../data/timelineData'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from '../../home/components/Footer';

const Timeline = () => {

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".timeline-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        // markers:true,
        toggleActions: "play none none none",
      },
    });
  });
}, []);

  return (
    <main className='min-h-screen dark:bg-gray-900  bg-[#e5d0a7b9] '>
        <Navbar/>
        <div className='text-center  '>
            <h1 className='text-4xl lg:text-6xl pt-3 font-bold dark:text-green-600 text-green-800 '>Gandhi Timeline</h1>
            <p className='lg:mt-5 mt-3 text-xl dark:text-gray-300 text-gray-600 '>Explore the journey of Mahatma Gandhi</p>
        </div>
        <div className='max-w-6xl mx-auto p-5 '>
            {timelineData.map((event,index)=>(
                <TimelineCard
                key={event.id}
                event={event}
                index={index}
                />
            ))}
        </div>
        <Footer/>
    </main>
  )
}

export default Timeline
