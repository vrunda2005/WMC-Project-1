import React from 'react'

function Donate() {
  return (
    <>

<div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12 rounded shadow-md">
  <h1 class="text-4xl font-bold mb-4 text-zinc-900">Support Epsilon Program</h1>
  <p class="text-lg mb-6 text-green-600">
    Your donation will help us level up our resources and support to our community.
    •	"Support the Epsilon Program - Your donations help us spread the truth and enlighten more souls."<br/>
    	Donation Levels:<br/>
    o	$500: "Seeker of Truth"<br/>
    o	$2,000: "Beacon of Enlightenment"<br/>
    o	$10,000: "Ultimate Believer - Guaranteed Enlightenment"
    </p>

  <div class="flex flex-wrap justify-center -mx-4 mb-6">
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md">
        $500
      </button>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md">
        $2000
      </button>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md">
        $10000
      </button>
    </div>
   
  </div>

  <form class="max-w-md mx-auto p-4 pt-6 bg-gray-800 rounded shadow-md">
    <label class="block mb-2">
      <span class="text-lg text-gray-400">Donation Amount:</span>
      <input type="number" class="w-full p-2 pl-10 text-sm text-gray-300 border border-gray-600 rounded" id="donation-amount" />
    </label>
    <label class="block mb-2">
      <span class="text-lg text-gray-400">Name:</span>
      <input type="text" class="w-full p-2 pl-10 text-sm text-gray-300 border border-gray-600 rounded" id="name" />
    </label>
    <label class="block mb-2">
      <span class="text-lg text-gray-400">Email:</span>
      <input type="email" class="w-full p-2 pl-10 text-sm text-gray-300 border border-gray-600 rounded" id="email" />
    </label>
    <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-md w-full">
      Donate Now
    </button>
  </form>
</div>
    </>
   
  )
}

export default Donate