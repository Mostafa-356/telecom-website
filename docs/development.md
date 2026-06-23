# Development Guide

## Project Structure

See [Project Structure](./project-structure.md) for full breakdown.

## Development Workflow

### 1. Starting Development Server

```bash
pnpm dev
```

The server will watch for file changes and hot-reload automatically.

### 2. File Organization

- **`app/`** - Next.js App Router pages and layouts
- **`components/`** - Reusable React components
- **`hooks/`** - Custom React hooks
- **`lib/`** - Utilities and helper functions
- **`styles/`** - Global CSS and theme configuration

### 3. Creating Components

Create components in `components/` folder:

```tsx
// components/button.tsx
import { FC } from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
    {children}
  </button>
)
```

### 4. Creating Pages

Pages are automatically routed based on file location in `app/`:

```tsx
// app/features/page.tsx
export default function Features() {
  return (
    <main>
      <h1>Features</h1>
    </main>
  )
}
```

## Code Standards

- **TypeScript:** Always use `.tsx` for components, `.ts` for utilities
- **Components:** Functional components with TypeScript interfaces
- **Styling:** Use Tailwind CSS classes
- **Naming:** Use PascalCase for components, camelCase for functions

## Linting

```bash
# Check for linting issues
pnpm lint

# Fix linting issues automatically
pnpm lint --fix
```

## Building

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start
```

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## Next Steps

- [Project Structure](./project-structure.md)
- [Contributing](../CONTRIBUTING.md)
