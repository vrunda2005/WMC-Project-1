import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../usetheamContext';

const AboutUs = () => {
  const { theme } = useTheme();

  // Define theme-based classes
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const overlayColor = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-secondary-bg' : 'bg-dark-secondary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondaryColor = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  const buttonBgColor = theme === 'blue' ? 'bg-blue-highlight' : 'bg-dark-highlight';
  const buttonHoverBgColor = theme === 'blue' ? 'hover:bg-blue-accent' : 'hover:bg-dark-accent';

  return (
    <div className={`relative overflow-hidden min-h-screen ${textPrimaryColor}`}>
      {/* Background Image */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center bg-hero-pattern`}
        // style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={`absolute inset-0 ${overlayColor}`}></div> {/* Overlay for better text visibility */}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-12">
        {/* Header Section */}
        <header className="text-center py-12  text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About the Epsilon Program
          </motion.h1>
        </header>

        {/* Core Values Section */}
        <section className="my-12">
          <motion.div
            className={`p-8 rounded-lg shadow-lg mx-auto max-w-4xl ${containerBgColor}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-semibold mb-4 text-center">Core Values</h2>
            <p className="text-lg">
              At the heart of the Epsilon Program are our core values: Truth, Enlightenment, and Unity. We strive to uncover the hidden truths of existence, seek enlightenment through our practices, and unite individuals who are on a similar spiritual journey. These values guide our actions and interactions within our community.
            </p>
          </motion.div>
        </section>

        {/* Beliefs and Practices */}
        <section className="my-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Beliefs */}
            <motion.div
              className={`p-8 rounded-lg shadow-lg flex-1 ${sectionBgColor}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-semibold mb-4">Our Beliefs</h2>
              <p className="text-lg">
                The Epsilon Program is a unique spiritual movement dedicated to uncovering the profound truths of the universe. We believe in a higher state of existence that transcends the material world. Our teachings guide members towards enlightenment through a blend of esoteric knowledge, mystical practices, and a deep connection with the cosmic energies.
              </p>
            </motion.div>
            
            {/* Practices */}
            <motion.div
              className={`p-8 rounded-lg shadow-lg flex-1 ${sectionBgColor}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-semibold mb-4">Our Practices</h2>
              <p className="text-lg">
                Our practices involve a range of rituals and ceremonies designed to elevate consciousness and foster spiritual growth. From meditative exercises to cosmic rituals, each practice is aimed at aligning our members with the universal energies and achieving higher states of awareness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* History and Testimonials */}
        <section className="my-12">
          <motion.div
            className={`p-8 rounded-lg shadow-lg mx-auto max-w-4xl ${containerBgColor}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-semibold mb-4 text-center">Our History</h2>
            <p className="text-lg mb-8">
              The Epsilon Program was founded in the heart of Los Santos by the enigmatic leader Kifflom. What began as a small group of seekers has grown into a vibrant community of individuals dedicated to exploring the mysteries of the universe. Our history is rich with stories of spiritual revelations and cosmic insights, guiding us on our path to enlightenment.
            </p>
            <h2 className="text-3xl font-semibold mb-4 text-center">Member Testimonials</h2>
            <div className="space-y-4">
              <blockquote className={`p-4 rounded-lg shadow-md ${sectionBgColor}`}>
                <p className="italic">
                  "Joining the Epsilon Program has been a transformative experience. The teachings and community support have opened my eyes to new perspectives and helped me find inner peace."
                </p>
                <footer className="mt-2 text-right">— Alex M.</footer>
              </blockquote>
              <blockquote className={`p-4 rounded-lg shadow-md ${sectionBgColor}`}>
                <p className="italic">
                  "The Epsilon Program's rituals and practices have deepened my understanding of the universe. The sense of belonging and purpose I've found here is unparalleled."
                </p>
                <footer className="mt-2 text-right">— Jordan R.</footer>
              </blockquote>
            </div>
          </motion.div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center mt-12">
          <motion.button
            className={`text-white px-8 py-4 rounded-lg shadow-md ${buttonBgColor} ${buttonHoverBgColor}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Us
          </motion.button>
          <p className="mt-4">
            Interested in learning more? <a href="/contact" className="text-orange-400 hover:underline">Contact us</a> for more information or to schedule a personal consultation.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
