import React from 'react'

const Admin = () => {
  return (
   
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <h1 className="text-3xl font-bold mb-4">Event Organizer</h1>
          <form className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="event-name">
                Event Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="event-name" type="text" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="event-date">
                Event Date
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="event-date" type="date" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="event-time">
                Event Time
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="event-time" type="time" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="event-location">
                Event Location
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="event-location" type="text" />
            </div>
            <div className="w-full px-3 mb-6">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Create Event
              </button>
            </div>
          </form>
          <h1>this is sample data here below </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <ul className="list-none mb-0">
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-700">Event 1</span>
                  <span className="text-gray-500"> - 12/12/2024, 10:00 AM</span>
                </li>
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-700">Event 2</span>
                  <span className="text-gray-500"> - 12/15/2024, 2:00 PM</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Past Events</h2>
              <ul className="list-none mb-0">
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-700">Event 3</span>
                  <span className="text-gray-500"> - 12/05/2024, 10:00 AM</span>
                </li>
                <li className="py-2 border-b border-gray-200">
                  <span className="text-gray-700">Event 4</span>
                  <span className="text-gray-500"> - 12/08/2024, 2:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
   
    
  )
}

export default Admin