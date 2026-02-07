# SafeType

**A confidential data spell-checker that runs locally.**

SafeType helps you prevent accidental leaks of sensitive information (API keys, emails, passwords, etc.) by detecting them in real-time as you type.

## Project Structure (Monorepo)

- **packages/core**: The core detection engine (TypeScript logic).
    - Pure TypeScript, runs anywhere (Node, Browser, VS Code).
    - Unit tested logic.
- **packages/web**: A web-based playground (Vite + React).
    - Demonstrates the core engine in action.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

1. Install dependencies from the root:
   ```bash
   npm install
   ```

2. Build the core library:
   ```bash
   npm run build:core
   ```

3. Run the web playground:
   ```bash
   npm run dev:web
   ```

## Development

- **Core**: Edit `packages/core/src/index.ts` to add new detection rules.
- **Web**: Edit `packages/web/src/App.tsx` to change the UI.

## License

MIT
