# SafeType

> **"A confidential data spell-checker that runs while you type."**

![SafeType Demo](assets/safetype-demo.png)

SafeType is a privacy-first, local-only developer tool that prevents accidental leaks of sensitive information (API keys, passwords, tokens) in real-time. It runs as a **VS Code Extension** and highlights confidential data directly in your editor, just like a spell-checker.

**Built as a high-performance Monorepo** using TypeScript, React (for the playground), and VS Code Extension API.

---

## 🚀 Features

*   **Real-time Detection**: Scans your code instantly as you type.
*   **Privacy First**: All logic runs 100% locally. No data ever leaves your machine.
*   **Broad Coverage**: Detects multiple types of secrets out-of-the-box:
    *   OpenAI API Keys (`sk-...`)
    *   AWS Access Keys (`AKIA...`)
    *   Private Keys (`-----BEGIN PRIVATE KEY-----`)
    *   JWT Tokens
    *   Emails (context-aware)
*   **Zero-Config**: Works immediately upon installation.

---

## 🛠️ Tech Stack & Architecture

This project is architected as a **TypeScript Monorepo** to share core logic across different platforms (VS Code, Web, CLI).

*   **Monorepo**: [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
*   **Core Engine**: Pure TypeScript, platform-agnostic detection library.
*   **VS Code Extension**: Native integration with VS Code Diagnostics API.
*   **Web Playground**: Vite + React app for testing detection rules in the browser.
*   **Build Tooling**: `esbuild` for high-performance bundling, `tsc` for type checking.

### Project Structure

```bash
safetype/
├── packages/
│   ├── core/       # Shared detection logic (Regex/ML engine)
│   ├── vscode/     # VS Code Extension (consumes core)
│   └── web/        # React Playground (consumes core)
├── package.json    # Root monorepo config
└── ...
```

---

## 📦 Installation & Usage

### VS Code Extension
1.  Clone the repository:
    ```bash
    git clone git@github.com:tsunipun/safetype.git
    cd safetype
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the extension:
    ```bash
    npm run build:vscode
    ```
4.  Open in VS Code and press `F5` to launch the extension in a debug window.

### Web Playground
1.  Run the web app:
    ```bash
    npm run dev:web
    ```
2.  Open `http://localhost:5173` to test the detection engine in your browser.

---

## 🧠 How It Works

The core engine uses a combination of **high-precision Regex patterns** and **contextual keyword scoring**.

1.  **Pattern Matching**: Identifies potential secrets (e.g., `sk-[a-zA-Z0-9]{32,}`).
2.  **Context Analysis**: Boosts confidence if keywords like "key", "secret", or "api" appear nearby.
3.  **Reporting**: Returns a `DetectionResult` with the type, confidence, and location of the leak.

Code Sample (`packages/core/src/index.ts`):
```typescript
interface DetectionResult {
  type: DetectionType;
  confidence: number; // 0.0 - 1.0
  message: string;
}
// ... detection logic ...
```

---

## 🔮 Future Roadmap

*   [ ] **Machine Learning**: Add a lightweight ML model (ONNX) to reduce false positives.
*   [ ] **Auto-Masking**: Add a "Quick Fix" action to replace secrets with `****`.
*   [ ] **Git Hook**: Pre-commit hook to block commits containing secrets.
*   [ ] **CLI Tool**: Run scans in CI/CD pipelines.

---

## License

MIT © [tsunipun](https://github.com/tsunipun)