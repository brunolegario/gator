# Gator 🐊

A powerful CLI tool for aggregating and managing RSS feeds from across the internet, built with TypeScript and PostgreSQL.

## Motivation

This project was created as a learning exercise to master several key software engineering concepts:

- **Database Integration**: Learn how to integrate a TypeScript application with a PostgreSQL database
- **SQL Proficiency**: Practice SQL skills through querying and database migrations using Drizzle, a lightweight tool for type-safe SQL in TypeScript
- **Long-Running Services**: Build a service that continuously fetches new posts from RSS feeds and stores them in a database
- **CLI Development**: Create a practical command-line interface for interacting with the system

## Features

- 📡 **Add RSS Feeds**: Collect RSS feeds from anywhere on the internet
- 💾 **PostgreSQL Storage**: Store aggregated posts in a robust PostgreSQL database
- 👥 **Multi-User Support**: Follow and unfollow RSS feeds added by other users
- 📰 **Terminal Summaries**: View summaries of aggregated posts directly in your terminal, with links to full articles
- 🔄 **Continuous Aggregation**: Automatically fetch new posts from followed feeds

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
