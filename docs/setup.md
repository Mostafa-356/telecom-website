# Setup & Installation

## Prerequisites

- **Node.js:** 18.17 or higher
- **pnpm:** 8.0 or higher (recommended) or npm/yarn
- **Git:** For cloning the repository

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/Mostafa-SAID7/telecom-website.git
cd telecom-website
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at **http://localhost:3000**

## Environment Variables

Create a `.env.local` file in the project root if needed:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> **Note:** `.env.local` is not tracked in version control for security.

## Docker Setup

For containerized setup, see [Docker Guide](./docker.md)

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
pnpm dev -p 3001
```

### Dependencies Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Permission Issues on macOS/Linux

```bash
chmod +x node_modules/.bin/*
```

## Next Steps

- [Development Guide](./development.md)
- [Project Structure](./project-structure.md)
