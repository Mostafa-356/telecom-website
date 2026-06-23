# Contributing

Thank you for contributing to Telecom Website! Please follow these guidelines.

## Getting Started

1. [Fork](https://github.com/Mostafa-SAID7/telecom-website/fork) the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/telecom-website.git`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Follow [Setup Guide](./docs/setup.md) to install dependencies

## Development Workflow

1. Start development server: `pnpm dev`
2. Make your changes
3. Run linter: `pnpm lint`
4. Commit with clear messages: `git commit -m "feat: add new feature"`
5. Push to your fork: `git push origin feature/my-feature`
6. Open a [Pull Request](https://github.com/Mostafa-SAID7/telecom-website/pulls)

## Code Style

- **TypeScript:** Use strict mode, type everything
- **Components:** Use functional components with interfaces
- **Styling:** Use Tailwind CSS classes
- **Naming:** 
  - Components: `PascalCase` (e.g., `HeaderNav.tsx`)
  - Functions: `camelCase` (e.g., `handleClick()`)
  - Constants: `UPPER_CASE` (e.g., `API_URL`)

## Git Commits

Use conventional commits:

```
feat: add new feature
fix: fix bug in component
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

## Pull Request Process

1. Update [README.md](./README.md) if needed
2. Update [Project Structure](./docs/project-structure.md) for new folders
3. Reference related issues: `Closes #123`
4. Keep PRs focused on a single feature/fix

## Reporting Issues

- [GitHub Issues](https://github.com/Mostafa-SAID7/telecom-website/issues)
- Include reproduction steps
- Specify your environment (OS, Node version, etc.)

## Questions?

See [Documentation](./docs) or open a [Discussion](https://github.com/Mostafa-SAID7/telecom-website/discussions)

## Code of Conduct

Be respectful, inclusive, and helpful to all contributors.
