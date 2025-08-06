'use client';

import { useEffect, useState } from 'react';
import FadeDivider from '@/components/FadeDivider';


export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(31, 41, 55)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
      }}
    >
      {/* Navigation */}
      <nav 
        className="fixed top-0 w-full"
        style={{
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.50)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.40)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-gray-900">InnovateHub</div>
            <div className="hidden md:flex space-x-10">
              <a href="#home" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">Home</a>
              <a href="#workspace" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">Workspace</a>
              <a href="#lab" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">Lab</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">Contact</a>
            </div>
            {/*<button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">
              Apply Now
            </button>*/}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hallway.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            The Future is
            <br />
            <span className="text-blue-400">Built Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            An exclusive ecosystem for ambitious founders to build, innovate, and scale.
          </p>
          {/*<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-110 shadow-lg">
            Join the Hub
          </button>*/}
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      
      {/* Workspace Section */}
      <section id="workspace" 
        style={{
          zIndex: 5,
          padding: '6rem 0',
          backgroundColor: 'rgba(249, 250, 251, 0.5)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="wow animate__animated animate__fadeInLeft">
              <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
                Your Dedicated
                <br />
                <span className="text-blue-600">Workspace</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Premium, flexible desk spaces designed to maximize productivity and foster creativity. 
                Fully equipped with modern amenities and blazing-fast internet.
              </p>
              <ul className="text-lg space-y-4 text-gray-700">
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>24/7 Building Access</li>
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Fiber-Optic Internet</li>
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Ergonomic Furniture</li>
              </ul>
            </div>
            <div className="relative wow animate__animated animate__fadeInRight">
              <img 
                src="/images/workspace-desks.jpg" 
                alt="Bright modern workspace with desks" 
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FadeDivider />
      {/* Innovation Lab Section */}
      <section id="lab" 
        style={{
          zIndex: 10,
          padding: '6rem 0',
          backgroundColor: 'rgb(255, 255, 255)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative wow animate__animated animate__fadeInLeft">
              <img 
                src="/images/electronics-lab.jpg" 
                alt="Electronics testing lab" 
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="wow animate__animated animate__fadeInRight">
              <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
                Innovation
                <br />
                <span className="text-blue-600">Lab</span>
              </h2>
              <FadeDivider />
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A fully-equipped hardware and electronics lab for prototyping, testing, and bringing your 
                physical products to life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">Prototyping</h3>
                  <p className="text-gray-600">3D printers, CNC machines, and soldering stations</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">Testing</h3>
                  <p className="text-gray-600">Oscilloscopes, logic analyzers, and power supplies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section 
        style={{
          zIndex: 20,
          padding: '6rem 0',
          backgroundColor: 'rgb(17, 24, 39)',
          color: 'rgb(255, 255, 255)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-extrabold mb-6">Join the Ecosystem</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-80">
            Become part of a curated community of innovators and connect with mentors, investors, and partners.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-10 rounded-2xl wow animate__animated animate__fadeInUp">
              <div className="text-5xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-gray-300">Community Members</div>
            </div>
            <div className="bg-gray-800 p-10 rounded-2xl wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
              <div className="text-5xl font-bold text-blue-400 mb-2">30+</div>
              <div className="text-gray-300">Active Startups</div>
            </div>
            <div className="bg-gray-800 p-10 rounded-2xl wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
              <div className="text-5xl font-bold text-blue-400 mb-2">$5M+</div>
              <div className="text-gray-300">Total Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" 
        style={{
          zIndex: 30,
          padding: '6rem 0',
          backgroundColor: 'rgb(255, 255, 255)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-6">Ready to Build?</h2>
          <p className="text-xl mb-10 text-gray-600">
            Apply now to secure your spot at InnovateHub and start your journey.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-110 shadow-lg">
            Apply Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer 
        style={{
          zIndex: 40,
          padding: '4rem 0',
          backgroundColor: 'rgb(17, 24, 39)',
          color: 'rgb(255, 255, 255)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-3xl font-bold mb-4">InnovateHub</div>
              <p className="text-gray-400">The premier workspace for the next generation of builders.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Navigate</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#workspace" className="hover:text-white">Workspace</a></li>
                <li><a href="#lab" className="hover:text-white">Lab</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li>Events</li>
                <li>Mentorship</li>
                <li>Partners</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-3 text-gray-400">
                <li>hello@innovatehub.io</li>
                <li>(555) 987-6543</li>
                <li>123 Innovation Drive</li>
                <li>Austin, TX 78701</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
            <p>&copy; 2025 InnovateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
