# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working in this repository.

## Repository Overview

This is a newly initialized Git repository at the start of its lifecycle. This CLAUDE.md establishes conventions and workflows to follow as the project grows.

- **Remote:** `kwanhun2-pixel/New-project`
- **Primary development branch pattern:** `claude/<description>`

---

## Git Workflow

### Branch Naming
- Feature branches: `feature/<short-description>`
- Bug fixes: `fix/<short-description>`
- Claude-initiated branches: `claude/<description>`
- Documentation: `docs/<short-description>`

### Commit Messages
Write clear, imperative-mood commit messages:
```
Add user authentication module
Fix null pointer in payment processor
Update README with setup instructions
```

- First line: ≤72 characters, imperative mood
- Separate body from subject with a blank line
- Body explains *what* and *why*, not *how*

### Push Protocol
Always push with upstream tracking:
```bash
git push -u origin <branch-name>
```

If push fails due to network errors, retry with exponential backoff: 2s, 4s, 8s, 16s.

---

## Development Conventions

### Code Style
- Prefer simplicity over cleverness
- Write self-documenting code; add comments only where logic is non-obvious
- No dead code — remove unused variables, imports, and functions
- Validate input only at system boundaries (user input, external APIs)

### File Organization
- Keep related files together by feature/domain, not by type
- Avoid deeply nested directory structures (max 4 levels)
- Use clear, descriptive file and directory names (no abbreviations unless universally understood)

### Testing
- Write tests for all new features and bug fixes
- Tests live alongside source code or in a parallel `tests/` directory
- Test names describe the behavior being verified, not the implementation

### Dependencies
- Add dependencies intentionally — evaluate necessity before installing
- Pin dependency versions for reproducible builds
- Document why non-obvious dependencies are included

---

## Working with AI Assistants

### What Claude Should Do
- Read existing files before suggesting or making changes
- Make minimal, focused changes — only what is requested or clearly necessary
- Avoid refactoring unrelated code while implementing a feature
- Prefer editing existing files over creating new ones
- Check for existing utilities/helpers before creating new abstractions
- Ask for clarification when requirements are ambiguous

### What Claude Should NOT Do
- Push to `main`/`master` without explicit user permission
- Delete files or branches without confirmation
- Add unrequested features, comments, or error handling
- Create duplicate utilities when existing ones can be reused
- Use `--no-verify`, `--force`, or other safety-bypass flags without explicit instruction

### Confirming Risky Actions
Always pause and confirm before:
- Deleting files or directories
- Force-pushing (`git push --force`)
- Resetting uncommitted changes (`git reset --hard`, `git restore .`)
- Dropping database tables or destructive migrations
- Modifying CI/CD pipelines

---

## Project Setup (To Be Populated)

As the project grows, document the following here:

### Prerequisites
```
# List required tools and versions
# e.g., Node.js >= 20, Python >= 3.11, Go >= 1.22
```

### Installation
```bash
# Steps to install dependencies
```

### Running the Project
```bash
# How to start development server / run the application
```

### Running Tests
```bash
# How to run the test suite
```

### Building for Production
```bash
# How to create a production build
```

---

## Environment Variables

Document required environment variables here as they are introduced:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| *(none yet)* | | | |

Copy `.env.example` to `.env` and fill in values before running locally.

---

## Architecture (To Be Populated)

Document key architectural decisions here as the project evolves:

- **Language/Runtime:** TBD
- **Framework:** TBD
- **Database:** TBD
- **Deployment:** TBD

### Key Design Decisions
*Record important architectural decisions and their rationale here.*

---

## Common Tasks

### Starting a New Feature
```bash
git checkout -b feature/<name>
# Make changes
git add <specific-files>
git commit -m "Add <feature>"
git push -u origin feature/<name>
# Open a pull request
```

### Fixing a Bug
```bash
git checkout -b fix/<issue-description>
# Fix the bug and add a test
git add <specific-files>
git commit -m "Fix <description>"
git push -u origin fix/<issue-description>
```

---

## Useful References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

---

*This CLAUDE.md should be updated as the project grows. Keep it accurate and concise.*
