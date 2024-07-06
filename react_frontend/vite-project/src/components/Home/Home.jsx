import React from 'react'

function Home() {
  return (
    <>
    <div className='bContainer mx-auto p-4 pt-10 bg-zinc-300'>
    <h1 class="text-4xl font-bold mb-4 text-blue-950">Epsilon Program</h1>

      <div className='inline-flex'>
      <p class="mb-4 mt-4 max-w-4xl text-base leading-7 text-slate-700">
      Welcome to the Epsilon Program, the ultimate path to enlightenment in Los Santos. 
Do you want to be happy and free from thoughts? Join us and discover the true secrets of the universe, just as revealed by our great leader, Cris Formage.
</p>
     
      <img className="w-52 h-1/3" src="https://articles-images.sftcdn.net/wp-content/uploads/sites/9/2013/05/Epsilon-Program.jpg" alt="img" />
     </div>

  </div>
  
    <div className="mx-5 mt-4 relative h-[400px] w-[300px] rounded-md mb-10">
          <img
            src="https://articles-images.sftcdn.net/wp-content/uploads/sites/9/2013/05/Epsilon-Program.jpg"
            alt="AirMax Pro"
            className="z-0 h-full w-full rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-left">
            <h1 className="text-lg font-semibold text-white">Epsilon Missions</h1>
            <p className="mt-2 text-sm text-gray-300">
            The Epsilon Cult Missions are a series of optional GTA 5 quests designed to antagonize the player. The Kifflom Missions are a parody of exploitative cultist behavior, (in particular, Scientology). They require Michael to engage in an increasingly-ridiculous series of quests while donating increasingly large sums of money to the cult.
            </p>
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
              View Profile →
            </button>
          </div>
    </div>
    
    </>
  )
}

export default Home