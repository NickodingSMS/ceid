'use client';

import React from 'react';
import { Timeline2, TimelineItem, createTimelineItem, TimelineVariants } from '@/components/Timeline2';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  PlayCircleIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Sample timeline data
const projectTimeline: TimelineItem[] = [
  createTimelineItem(
    '1',
    'Project Planning',
    '2024-01-15',
    {
      description: 'Initial project setup and requirements gathering',
      status: 'completed',
      icon: <CheckCircleIcon className="w-4 h-4 text-white" />,
      metadata: {
        team: 'Product Team',
        duration: '2 weeks'
      }
    }
  ),
  createTimelineItem(
    '2',
    'UI/UX Design',
    '2024-02-01',
    {
      description: 'Creating wireframes, mockups, and design system',
      status: 'completed',
      icon: <CheckCircleIcon className="w-4 h-4 text-white" />,
      content: (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">✅ Wireframes completed</p>
          <p className="text-sm text-blue-800">✅ Design system established</p>
          <p className="text-sm text-blue-800">✅ User testing conducted</p>
        </div>
      ),
      metadata: {
        team: 'Design Team',
        tools: 'Figma, Sketch'
      }
    }
  ),
  createTimelineItem(
    '3',
    'Frontend Development',
    '2024-02-15',
    {
      description: 'Building the user interface and client-side functionality',
      status: 'current',
      icon: <CodeBracketIcon className="w-4 h-4 text-white" />,
      content: (
        <div className="space-y-2">
          <div className="bg-green-50 p-2 rounded text-sm text-green-800">
            ✅ Component library setup
          </div>
          <div className="bg-yellow-50 p-2 rounded text-sm text-yellow-800">
            🔄 Timeline component (in progress)
          </div>
          <div className="bg-gray-50 p-2 rounded text-sm text-gray-600">
            ⏳ Integration testing
          </div>
        </div>
      ),
      metadata: {
        team: 'Frontend Team',
        tech: 'React, TypeScript, Tailwind'
      }
    }
  ),
  createTimelineItem(
    '4',
    'Backend API Development',
    '2024-03-01',
    {
      description: 'Server-side logic and API endpoints',
      status: 'upcoming',
      icon: <ClockIcon className="w-4 h-4 text-white" />,
      metadata: {
        team: 'Backend Team',
        tech: 'Node.js, Express, PostgreSQL'
      }
    }
  ),
  createTimelineItem(
    '5',
    'Testing & QA',
    '2024-03-15',
    {
      description: 'Comprehensive testing and quality assurance',
      status: 'upcoming',
      icon: <BugAntIcon className="w-4 h-4 text-white" />,
      metadata: {
        team: 'QA Team',
        types: 'Unit, Integration, E2E'
      }
    }
  ),
  createTimelineItem(
    '6',
    'Deployment',
    '2024-04-01',
    {
      description: 'Production deployment and monitoring setup',
      status: 'upcoming',
      icon: <RocketLaunchIcon className="w-4 h-4 text-white" />,
      metadata: {
        team: 'DevOps Team',
        platform: 'AWS, Docker, Kubernetes'
      }
    }
  )
];

// Compact timeline for sidebar or smaller spaces
const compactTimeline: TimelineItem[] = [
  createTimelineItem('c1', 'Requirements', '2024-01-15', { status: 'completed' }),
  createTimelineItem('c2', 'Design', '2024-02-01', { status: 'completed' }),
  createTimelineItem('c3', 'Development', '2024-02-15', { status: 'current' }),
  createTimelineItem('c4', 'Testing', '2024-03-15', { status: 'upcoming' }),
  createTimelineItem('c5', 'Launch', '2024-04-01', { status: 'upcoming' })
];

export default function Timeline2Page() {
  const handleItemClick = (item: TimelineItem) => {
    console.log('Timeline item clicked:', item);
    alert(`Clicked on: ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Main Page
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Timeline2 Component Demo</h1>
          <p className="text-gray-600">A flexible and customizable timeline component for React applications.</p>
        </div>

        {/* Default Timeline */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Default Timeline</h2>
          <Timeline2 
            items={projectTimeline}
            onItemClick={handleItemClick}
            className="bg-white p-6 rounded-lg shadow-sm border"
          />
        </section>

        {/* Compact Timeline */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compact Timeline</h2>
          <TimelineVariants.Compact
            items={compactTimeline}
            onItemClick={handleItemClick}
            className="bg-gray-50 p-4 rounded-lg border"
          />
        </section>

        {/* Detailed Timeline */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detailed Timeline</h2>
          <TimelineVariants.Detailed
            items={projectTimeline}
            onItemClick={handleItemClick}
            className="bg-white p-6 rounded-lg shadow-sm border"
          />
        </section>

        {/* Horizontal Timeline */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Horizontal Timeline</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <TimelineVariants.Horizontal
              items={compactTimeline}
              onItemClick={handleItemClick}
            />
          </div>
        </section>

        {/* No Connectors */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Timeline without Connectors</h2>
          <Timeline2
            items={compactTimeline}
            showConnector={false}
            onItemClick={handleItemClick}
            className="bg-white p-6 rounded-lg shadow-sm border"
          />
        </section>

        {/* Usage Examples */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`import { Timeline2, createTimelineItem } from '@/components/Timeline2';

const items = [
  createTimelineItem('1', 'Planning', '2024-01-15', { 
    status: 'completed',
    description: 'Project planning phase'
  }),
  createTimelineItem('2', 'Development', '2024-02-01', { 
    status: 'current' 
  })
];

<Timeline2 items={items} onItemClick={handleClick} />`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">With Custom Content:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`const itemWithContent = createTimelineItem(
  '1', 
  'Development', 
  '2024-02-01', 
  {
    status: 'current',
    content: <CustomComponent />,
    metadata: { team: 'Frontend', tech: 'React' }
  }
);

<Timeline2 items={[itemWithContent]} variant="detailed" />`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
