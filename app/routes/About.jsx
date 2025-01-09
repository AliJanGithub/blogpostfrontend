import React from 'react'

export default function About() {
  return (
    <div className='flex justify-center items-center h-full bg-black p-4 rounded-md '>
      <div className='text-white text-2xl'>
        <p>Explore the website and  share your thoughts </p>
        {/* <p>Appreciate and Criticize peoples based on their work </p> */}
        <a className='bg-blue-200 p-2 ' href="https://github.com/AliJanGithub">Go to github account  </a>
        <br />
        <a className='bg-blue-200' href="https://www.linkedin.com/in/ali-jan-286855278/">Connect with me on linkedin and show your appreciation  </a>

      </div>
    </div>
  )
}
