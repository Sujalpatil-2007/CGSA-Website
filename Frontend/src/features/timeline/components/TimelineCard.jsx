import React from 'react'


const TimelineCard = ({event,index}) => {
  
  return (
    <div className={`timeline-card flex flex-col lg:flex-row items-center gap-8 pb-20 ${
  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
}`}>
      <div className=' w-[99%] rounded-xl lg:w-1/2'>
      <img className='rounded-xl shadow-lg w-full h-72 object-cover ' src={event.image} alt={event.title} />
      </div>
      <div className=' w-[90%] lg:w-1/2 bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow-md'>
        <h1 className='text-4xl text-green-700 dark:text-green-600 font-bold '>{event.year}</h1>
        <h1 className='text-2xl  font-semibold mt-2 '>{event.title}</h1>
        <p className='mt-3 dark:text-gray-300 text-gray-600'>{event.description}</p>
      </div>
      
    </div>
  )
}

export default TimelineCard
