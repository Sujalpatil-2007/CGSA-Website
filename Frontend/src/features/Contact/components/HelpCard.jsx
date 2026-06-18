import React from 'react'

const helpCard = (props) => {
    
  return (
    <main className='bg-white dark:bg-gray-700 shadow-lg lg:h-56 lg:w-[30%] rounded-xl px-5 py-2 '>
        <div className='flex lg:flex-col flex-row gap-3 justify-start lg:items-start items-center'>
            <div className='h-10 w-10 flex justify-center items-center  rounded-full bg-green-700 '>
            {props.i}
        </div>
        <div className=' '>
            <h1 className='text-xl font-[font2] dark:text-white leading-tight  '>{props.h}</h1>
        </div>
        </div>
        <div className=''>
            <p className='leading-tight dark:text-gray-300 pt-1'>{props.p}</p>
        </div>
    </main>
  )
}

export default helpCard
