# Project Structure

## Directory Layout

```
telecom-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # Reusable React Components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── header.tsx        # Header component
│   ├── footer.tsx        # Footer component
│   ├── hero.tsx          # Hero section
│   ├── features.tsx      # Features section
│   ├── services.tsx      # Services section
│   ├── plans.tsx         # Pricing plans
│   ├── devices.tsx       # Device showcase
│   ├── cta.tsx           # Call-to-action
│   ├── testimonials.tsx  # Testimonials section
│   └── theme-provider.tsx # Theme configuration
│
├── docs/                  # Documentation
│   ├── setup.md          # Installation & setup guide
│   ├── development.md    # Development workflow
│   ├── docker.md         # Docker configuration
│   └── project-structure.md # This file
│
├── hooks/                # Custom React Hooks
│   ├── use-mobile.tsx    # Mobile detection hook
│   └── use-toast.ts      # Toast notification hook
│
├── lib/                  # Utilities & Helpers
│   └── utils.ts          # Utility functions
│
├── public/               # Static Assets
│   ├── images/          # Image files
│   ├── _redirects       # Netlify redirects
│   └── placeholder-*    # Placeholder assets
│
├── styles/              # Global Styles
│   └── globals.css      # CSS variables & global styles
│
├── docker/              # Docker Configuration
│   ├── Dockerfile       # Docker image definition
│   └── .dockerignore    # Docker ignore rules
│
├── .dockerignore        # Docker ignore patterns
├── docker-compose.yml   # Docker compose configuration
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── postcss.config.mjs   # PostCSS configuration
├── package.json         # Dependencies & scripts
├── pnpm-lock.yaml       # pnpm lock file
├── README.md            # Project README
├── CONTRIBUTING.md      # Contributing guidelines
└── LICENSE              # License file

```

## Key Directories

### `app/`
Next.js App Router directory containing:
- Page routes
- Layout components
- Global styles
- Server and client components

See [Next.js App Router Docs](https://nextjs.org/docs/app)

### `components/`
Reusable React components organized by purpose:
- **UI components:** Buttons, cards, inputs (in `ui/` folder)
- **Feature components:** Page sections and features
- **Theme provider:** Theme configuration and switching

### `docs/`
Project documentation:
- Setup instructions
- Development guidelines
- Docker setup
- Project structure reference

### `hooks/`
Custom React hooks for shared logic

### `lib/`
Utility functions and helpers used across the project

### `public/`
Static files served at root level:
- Images and logos
- Netlify configuration files

## Component Organization

Components are organized by their purpose:

```
components/
├── ui/              # Atomic UI components
├── header.tsx       # Page header
├── hero.tsx         # Hero banner
├── features.tsx     # Features list
├── services.tsx     # Services section
├── plans.tsx        # Pricing plans
├── devices.tsx      # Product showcase
└── footer.tsx       # Page footer
```

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS setup |
| `tsconfig.json` | TypeScript configuration |
| `postcss.config.mjs` | PostCSS plugins |
| `package.json` | Dependencies & scripts |

## Related Documentation

- [Setup Guide](./setup.md)
- [Development Guide](./development.md)
- [Docker Guide](./docker.md)
