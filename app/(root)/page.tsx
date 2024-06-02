import PodcastCard from '@/components/PodcastCard'
import { podcastData } from '@/components/constants'
import React from 'react'

const Home = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>
        <div className='podcast_grid'>
          {podcastData.map(({id,title,description,imgURL}) =>(
            <PodcastCard
              key={id}
              title={title}
              imgURL={imgURL}
              description={description}
              podcastId={id}        
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home