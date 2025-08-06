'use client';

import React, { useMemo } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  events: Event[];
}

interface AnchorPoint {
  x: number;
  y: number;
  side: 'top' | 'right' | 'bottom' | 'left';
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  // Sort events by date
  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Generate random anchor point on card perimeter
  const generateAnchorPoint = (cardWidth: number, cardHeight: number, seed: number): AnchorPoint => {
    // Use seed for consistent randomness per event
    const random = (x: number) => {
      const sin = Math.sin(x + seed) * 10000;
      return sin - Math.floor(sin);
    };

    const sides: AnchorPoint['side'][] = ['top', 'right', 'bottom', 'left'];
    const side = sides[Math.floor(random(1) * sides.length)];
    
    switch (side) {
      case 'top':
        return {
          x: (random(2) - 0.5) * cardWidth * 0.7, // Keep away from corners
          y: -cardHeight / 2,
          side: 'top'
        };
      case 'bottom':
        return {
          x: (random(3) - 0.5) * cardWidth * 0.7,
          y: cardHeight / 2,
          side: 'bottom'
        };
      case 'left':
        return {
          x: -cardWidth / 2,
          y: (random(4) - 0.5) * cardHeight * 0.7,
          side: 'left'
        };
      case 'right':
        return {
          x: cardWidth / 2,
          y: (random(5) - 0.5) * cardHeight * 0.7,
          side: 'right'
        };
    }
  };

  // Calculate proportional positions based on time deltas
  const calculatePositions = () => {
    if (sortedEvents.length === 0) return [];
    
    const firstDate = new Date(sortedEvents[0].date).getTime();
    const lastDate = new Date(sortedEvents[sortedEvents.length - 1].date).getTime();
    const totalDuration = lastDate - firstDate;
    
    return sortedEvents.map(event => {
      const eventDate = new Date(event.date).getTime();
      const position = totalDuration === 0 ? 0 : ((eventDate - firstDate) / totalDuration) * 100;
      return position;
    });
  };

  // Memoize anchor points to keep them consistent across re-renders
  const anchorPoints = useMemo(() => {
    return sortedEvents.map((event, index) => 
      generateAnchorPoint(280, 120, index * 7.3 + event.id.charCodeAt(0)) // Use consistent seed
    );
  }, [sortedEvents.length]);

  const positions = calculatePositions();

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <div style={{
        position: 'relative',
        padding: '8rem 2rem',
        minHeight: '800px'
      }}>
        {/* Main Timeline Line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          right: '5%',
          height: '3px',
          background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          transform: 'translateY(-50%)',
          zIndex: 1,
          borderRadius: '2px',
          boxShadow: '0 0 16px rgba(251, 191, 36, 0.4)'
        }}></div>
        
        {/* Events */}
        {sortedEvents.map((event, index) => {
          const position = positions[index];
          const timelinePosition = 5 + (position * 0.9); // 5% to 95% range
          const isAbove = index % 2 === 0;
          
          // Ensure cards stay within bounds
          let cardLeft = timelinePosition;
          if (cardLeft < 20) cardLeft = 20;
          if (cardLeft > 80) cardLeft = 80;
          
          const cardTop = isAbove ? 12 : 72;
          
          // Get anchor point for this event
          const anchor = anchorPoints[index];
          
          // Calculate relative positions for the connection line
          const cardRelativeX = (cardLeft - timelinePosition) / 100 * 1200; // Convert percentage to pixels
          const cardRelativeY = isAbove ? -240 : 240; // Approximate distance from timeline to card center
          
          // Add anchor offset
          const targetX = cardRelativeX + anchor.x;
          const targetY = cardRelativeY + anchor.y;
          
          const distance = Math.sqrt(targetX * targetX + targetY * targetY);
          const angle = Math.atan2(targetY, targetX);
          
          return (
            <div key={event.id}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: `${timelinePosition}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                background: 'radial-gradient(circle, #ffffff 30%, #fbbf24 70%)',
                borderRadius: '50%',
                zIndex: 10,
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 8px rgba(255, 255, 255, 0.6)',
                border: '2px solid rgba(251, 191, 36, 0.3)'
              }}></div>
              
              {/* Angled connection line */}
              <div style={{
                position: 'absolute',
                left: `${timelinePosition}%`,
                top: '50%',
                width: `${Math.abs(distance)}px`,
                height: '3px',
                background: `linear-gradient(${angle > 0 ? '90deg' : '-90deg'}, #10b981 0%, #06d6a0 40%, #fbbf24 100%)`,
                transform: `translate(0%, -50%) rotate(${angle}rad)`,
                transformOrigin: '0 50%',
                zIndex: 3,
                borderRadius: '2px',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
              }}></div>
              
              {/* Connection anchor dot */}
              <div style={{
                position: 'absolute',
                left: `${cardLeft}%`,
                top: `${cardTop}%`,
                transform: `translate(${anchor.x - 140}px, ${anchor.y - 60}px)`, // Offset by half card size
                width: '6px',
                height: '6px',
                background: 'radial-gradient(circle, #fbbf24 30%, #f59e0b 70%)',
                borderRadius: '50%',
                zIndex: 8,
                boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)',
                border: '1px solid rgba(251, 191, 36, 0.5)'
              }}></div>
              
              {/* Event card with hover effects */}
              <div 
                style={{
                  position: 'absolute',
                  left: `${cardLeft}%`,
                  top: `${cardTop}%`,
                  transform: 'translateX(-50%)',
                  width: '280px',
                  maxWidth: '90vw',
                  background: 'rgba(15, 15, 15, 0.4)',
                  backdropFilter: 'blur(8px)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: `
                    0 20px 40px rgba(0, 0, 0, 0.7),
                    0 0 2px rgba(16, 185, 129, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  zIndex: 6,
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.transform = 'translateX(-50%) translateY(-8px) scale(1.05)';
                  element.style.boxShadow = `
                    0 32px 64px rgba(0, 0, 0, 0.8),
                    0 0 20px rgba(16, 185, 129, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `;
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
                  element.style.boxShadow = `
                    0 20px 40px rgba(0, 0, 0, 0.7),
                    0 0 2px rgba(16, 185, 129, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `;
                }}
              >
                <div style={{
                  fontSize: '0.7rem',
                  color: '#ef4444',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {formatDate(event.date)}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#10b981',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3',
                  textShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                }}>{event.title}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#e5e7eb',
                  lineHeight: '1.5',
                  margin: '0'
                }}>{event.description}</p>
              </div>
            </div>
          );
        })}
        
        {/* Enhanced today marker */}
        {/*<div style={{
          position: 'absolute',
          right: '5%',
          top: '48%',
          fontSize: '0.9rem',
          color: '#fbbf24',
          fontStyle: 'italic',
          fontWeight: '600',
          textShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
          zIndex: 5
        }}>today</div>*/}
      </div>
    </div>
  );
};

export default Timeline;
