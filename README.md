# 📱 Telecom Website

A modern, responsive telecom service website built with **Next.js 15**, **React 19**, and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or [pnpm](https://pnpm.io)
- Docker (optional, for containerized development)

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

```bash
docker compose up
```

See [Docker Setup](./docs/docker.md) for details.

## 📁 Project Structure

```
telecom-website/
├── app/              # Next.js app directory
├── components/       # React components
├── docs/            # Documentation
├── hooks/           # Custom React hooks
├── lib/             # Utilities & helpers
├── public/          # Static assets
├── styles/          # Global styles
└── docker/          # Docker configuration
```

See [Project Structure](./docs/project-structure.md) for detailed breakdown.

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |

## 🎨 Tech Stack

- **Framework:** Next.js 15
- **UI:** React 19, Radix UI
- **Styling:** Tailwind CSS, Class Variance Authority
- **Forms:** React Hook Form, Zod
- **Charts:** Recharts
- **Package Manager:** pnpm

## 🔍 SEO Features

- **Meta Tags:** Comprehensive Open Graph & Twitter cards
- **Favicon:** Modern SVG + PNG icons for all devices
- **PWA:** Web app manifest for installation
- **Structured Data:** JSON-LD schema markup components
- **Robots.txt:** Search engine optimization
- **Mobile Optimized:** Responsive design with viewport settings
- **Performance:** Image optimization & lazy loading ready

See [SEO Guide](./docs/seo.md) for detailed configuration.

## 📚 Documentation

- [Setup & Installation](./docs/setup.md)
- [Development Guide](./docs/development.md)
- [Project Structure](./docs/project-structure.md)
- [Docker Guide](./docs/docker.md)
- [SEO & Meta Configuration](./docs/seo.md)
- [SEO Implementation Guide](./docs/seo-implementation.md)
- [SEO Launch Checklist](./docs/seo-checklist.md)
- [Contributing](./CONTRIBUTING.md)

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.