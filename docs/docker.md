# Docker Setup

Run the project in a Docker container for consistent development and deployment environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

```bash
docker compose up
```

The application will be available at **http://localhost:3000**

## Docker Commands

### Build Image

```bash
docker compose build
```

### Run Container

```bash
docker compose up
```

### Run in Background

```bash
docker compose up -d
```

### Stop Container

```bash
docker compose down
```

### View Logs

```bash
docker compose logs -f
```

### Execute Command in Container

```bash
docker compose exec web pnpm lint
```

## Production Build

```bash
docker compose -f docker-compose.prod.yml up
```

## Dockerfile Explanation

Our Dockerfile uses multi-stage builds for optimal image size:

1. **Build Stage:** Compiles TypeScript and builds the Next.js app
2. **Runtime Stage:** Runs the compiled application

This approach keeps the final image small and secure.

## Environment Variables

Create a `.env.local` file or add to `docker-compose.yml`:

```yaml
services:
  web:
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Troubleshooting

### Port Already in Use

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"
```

### Clear Docker Cache

```bash
docker compose build --no-cache
```

### Remove All Containers

```bash
docker compose down -v
```

## Next Steps

- [Setup Guide](./setup.md)
- [Development Guide](./development.md)
