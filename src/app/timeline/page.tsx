'use client';

import React, { useState } from 'react';
import Timeline from '@/components/Timeline';
import { useEvents } from '@/hooks/useEvents';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function TimelinePage() {
  const { events, loading, error, refetch } = useEvents();
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'recent' | 'upcoming'>('all');

  // Filter events based on selected date range
  const filterEvents = (events: Event[], filter: string) => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

    switch (filter) {
      case 'recent':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= thirtyDaysAgo && eventDate <= today;
        });
      case 'upcoming':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate > today && eventDate <= thirtyDaysFromNow;
        });
      default:
        return events;
    }
  };

  const filteredEvents = filterEvents(events, selectedDateRange);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading timeline events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-4">Error Loading Events</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
          <br />
          <Link 
            href="/" 
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            ← Back to Main Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              ← Back to Main Page
            </Link>
            <button
              onClick={refetch}
              className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg font-medium transition-colors border border-green-600/30"
            >
              Refresh Events
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Event Timeline
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Visualizing events from your database in a chronological timeline format. 
            Each event is positioned proportionally based on its date.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
            <div className="flex space-x-1">
              {[
                { key: 'all', label: 'All Events', count: events.length },
                { key: 'recent', label: 'Recent (30d)', count: filterEvents(events, 'recent').length },
                { key: 'upcoming', label: 'Upcoming (30d)', count: filterEvents(events, 'upcoming').length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setSelectedDateRange(key as any)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    selectedDateRange === key
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {label}
                  <span className="ml-2 text-xs opacity-75">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {filteredEvents.length}
            </div>
            <div className="text-gray-300">
              {selectedDateRange === 'all' ? 'Total Events' : 
               selectedDateRange === 'recent' ? 'Recent Events' : 'Upcoming Events'}
            </div>
          </div>
          
          {filteredEvents.length > 0 && (
            <>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {new Date(filteredEvents[0].date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="text-gray-300">First Event</div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {new Date(filteredEvents[filteredEvents.length - 1].date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="text-gray-300">Latest Event</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Timeline */}
      {filteredEvents.length > 0 ? (
        <Timeline events={filteredEvents} />
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg p-12 border border-gray-700">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Events Found
            </h3>
            <p className="text-gray-300 mb-6">
              {selectedDateRange === 'all' 
                ? "There are no events in your database yet."
                : `No events found for the selected time range (${selectedDateRange}).`
              }
            </p>
            {selectedDateRange !== 'all' && (
              <button
                onClick={() => setSelectedDateRange('all')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Events
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Timeline Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Visual Design</h4>
              <ul className="space-y-1 text-sm">
                <li>• Proportional positioning based on actual dates</li>
                <li>• Alternating card placement (above/below timeline)</li>
                <li>• Glassmorphism design with backdrop blur</li>
                <li>• Color-coded dates and titles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Data Integration</h4>
              <ul className="space-y-1 text-sm">
                <li>• Real-time data from PostgreSQL database</li>
                <li>• Automatic date sorting and formatting</li>
                <li>• Responsive design for all screen sizes</li>
                <li>• Error handling and loading states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
