# SafeType: Confidential Data Spell-Checker

SafeType helps you prevent accidental leaks of sensitive information (API keys, emails, passwords, etc.) by detecting them in real-time as you type.

## Features

- **Real-time Detection**: Scans your code as you type.
- **Privacy First**: All detection runs locally. No data leaves your machine.
- **Supported Patterns**:
    - OpenAI API Keys (`sk-...`)
    - AWS Access Keys (`AKIA...`)
    - Private Keys (`-----BEGIN PRIVATE KEY-----`)
    - JWT Tokens
    - Emails (with context check)

## Usage

Just install the extension and start typing! Sensitive data will be underlined with a yellow warning.

## Extension Settings

This extension contributes the following settings:

* `safetype.enabled`: Enable/disable SafeType detection.

## Known Issues

None.

## Release Notes

### 0.0.1

Initial release of SafeType.
