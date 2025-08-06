# CEID - Center for Entrepreneurship and Innovation Development

A modern Next.js application showcasing CEID's workspace and innovation lab facilities. This project features timeline components, database integration, and a responsive design.

## Features

- **Interactive Timeline Components**: Multiple timeline variants for displaying events and milestones
- **Database Integration**: PostgreSQL integration with API endpoints for event management
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Dynamic Content**: Real-time event fetching and display
- **Multiple Pages**: Home, Timeline, and Timeline2 demo pages

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable React components
- `/src/hooks/` - Custom React hooks
- `/src/lib/` - Utility functions and database connections
- `/public/images/` - Static images
- `database_schema.sql` - PostgreSQL database schema
- `sample_data.sql` - Sample data for testing

## Database Setup

1. Set up a PostgreSQL database
2. Run the `database_schema.sql` file to create tables
3. Optionally run `sample_data.sql` for test data
4. Configure your database connection in `src/lib/db.ts`

## API Endpoints

- `/api/events` - GET events from database

See `API_ENDPOINTS.md` for detailed documentation.

## Components

- **Timeline**: Main timeline component with database integration
- **Timeline2**: Flexible timeline component with multiple variants
- **FadeDivider**: Animated divider component

## Pages

- `/` - Home page with CEID information
- `/timeline` - Interactive timeline with database events
- `/timeline2` - Timeline component demonstration

## Technologies Used

- Next.js 15.4.2
- React 19.1.0
- TypeScript
- Tailwind CSS
- PostgreSQL
- Heroicons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

© 2025 CEID. All rights reserved.
