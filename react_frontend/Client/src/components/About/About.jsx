import React from 'react'

function About() {
  return (
    <>
    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-900 rounded shadow-md">
      <h1 class="text-4xl font-bold mb-4 text-cyan-400">Vrunda Moin</h1>
      <p class="text-lg mb-6 text-gray-400">Join the resistance and experience the future of gaming.</p>
    
      <div class="flex flex-wrap -mx-4 mb-6">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <img src="https://articles-images.sftcdn.net/wp-content/uploads/sites/9/2013/05/Epsilon-Program.jpg" alt="Game Thumbnail" class="w-full rounded shadow-md"/>
        </div>
        <div class="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 p-4">
          <h2 class="text-2xl font-bold mb-2 text-white">hello</h2>
          <p class="text-lg text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis voluptatibus aliquam quam qui, perspiciatis itaque fugiat, nihil eaque dolorum deserunt, totam provident consequatur. Aut debitis sit cupiditate quisquam, adipisci dignissimos.</p>
          <button class="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded shadow-md">
            Learn More
          </button>
        </div>
      </div>
    
      <div class="flex justify-center mb-6">
        <button class="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded shadow-md">
          Join the Community
        </button>
      </div>
    </div>


</>
  )
}

export default About