# Gator 🐊

A powerful CLI tool for aggregating and managing RSS feeds from across the internet, built with TypeScript and PostgreSQL.

## Overview

Gator is a terminal-based RSS feed aggregator that enables users to subscribe to feeds from across the internet while automatically collecting new posts through a continuously-running background service. The application leverages PostgreSQL for robust data persistence and supports multiple users, allowing teams to share feeds and discover content through a collaborative following system. Built with Drizzle ORM, the project employs type-safe SQL operations throughout the codebase, ensuring compile-time guarantees for all database interactions. The CLI interface provides an intuitive command set for managing feeds, browsing aggregated posts, and controlling the aggregation service, making it practical for developers who prefer terminal-based workflows over web interfaces.

## Features

- 📡 **RSS Feed Management**: Add and catalog RSS feeds from anywhere on the internet
- 💾 **PostgreSQL Storage**: Persistent storage of feeds and posts with relational integrity
- 👥 **Multi-User Collaboration**: Follow and unfollow feeds shared by other users in the system
- 📰 **Terminal-Based Browsing**: View post summaries directly in your terminal with links to full articles
- 🔄 **Continuous Aggregation**: Background service that automatically fetches new posts at regular intervals
- 🛡️ **Type-Safe Database Operations**: Compile-time SQL validation using Drizzle ORM

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL 16

### Installation

1. **Clone the repository** (or navigate to your project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**:
   ```bash
   # Start PostgreSQL and create the database
   psql postgres
   ```
   
   In the PostgreSQL shell, run:
   ```sql
   CREATE DATABASE gator;
   ```
   
   Then exit the shell:
   ```
   \q
   ```

4. **Configure the database connection**:
   
   Create a `.gatorconfig.json` file in your home directory:
   ```json
   {
     "db_url": "postgres://username:password@localhost:5432/gator"
   }
   ```
   
   Replace the connection string with your PostgreSQL credentials using the pattern:
   ```
   postgres://username:password@host:port/database
   ```

5. **Run database migrations**:
   ```bash
   npm run generate
   npm run migrate
   ```

6. **Start using Gator**:
   ```bash
   npm run start <command>
   ```

## Usage

Gator provides several commands for managing your RSS feed aggregation:

### User Management

```bash
# Register a new user
npm run start register <username>

# Login as an existing user
npm run start login <username>

# Reset the database (removes all users)
npm run start reset
```

### Feed Management

```bash
# Add a new RSS feed
npm run start addfeed <feed-url> <feed-name>

# List all available feeds
npm run start feeds

# Follow a feed
npm run start follow <feed-url>

# Unfollow a feed
npm run start unfollow <feed-url>

# List feeds you're currently following
npm run start following
```

### Viewing Posts

```bash
# Browse aggregated posts (default: 2 posts)
npm run start browse [limit]

# Start the aggregation service to fetch new posts
npm run start agg
```

### Example Workflow

```bash
# Register and login
npm run start register alice

# Add some RSS feeds
npm run start addfeed https://blog.boot.dev/index.xml "Boot.dev Blog"
npm run start addfeed https://wagslane.dev/index.xml "Wagslane's Blog"

# Follow feeds
npm run start follow https://blog.boot.dev/index.xml

# Start the aggregator to fetch posts
npm run start agg

# Browse the latest posts (in another terminal)
npm run start browse 5
```

## Technologies Used

- **TypeScript**: Type-safe application development
- **PostgreSQL**: Robust relational database
- **Drizzle ORM**: Lightweight, type-safe SQL toolkit
- **fast-xml-parser**: Fast and efficient RSS feed parsing
- **tsx**: TypeScript execution environment

## Contributing

Contributions are welcome! This project was created as a learning exercise, but improvements and suggestions are appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Tips

- Use `npm run generate` after modifying the database schema in [src/lib/db/schema.ts](src/lib/db/schema.ts)
- Run `npm run migrate` to apply pending database migrations
- Check [src/index.ts](src/index.ts) for the complete list of available commands
- The aggregation service (`agg` command) runs continuously - use Ctrl+C to stop it

Built with ❤️ as a learning project following the Boot.dev course
