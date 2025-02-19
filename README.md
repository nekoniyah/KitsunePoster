# KitsunePoster - LinkedIn Auto-Posting for Project Updates

## Overview

This project automates LinkedIn posts based on progress made in active projects. It detects when a relevant application (like a code editor or Figma) is being closed, summarizes recent changes, captures a screenshot, and posts an update to LinkedIn.

## Features

- **Detect Active Windows**: Identifies when a tracked project is active.
- **Track Project Changes**: Analyzes Git repository changes or Figma updates.
- **Generate Summaries**: Uses AI to create concise project update posts.
- **Automated Screenshots**: Captures a visual snapshot before closing.
- **LinkedIn API Integration**: Posts updates directly to LinkedIn.

## Tech Stack

- **Languages**: TypeScript (using Bun runtime)
- **APIs**:
  - GroqAI (llama-3.2-90b-vision-preview for text generation)
  - LinkedIn API
  - GitHub API (for repo analysis)
- **Database (Optional)**: MongoDB for tracking historical posts
- **Detection Methods**: Native Windows tracking & Web extension

### Phase 1: Core Functionality

- [x] Detect active applications (VSCode, Figma, etc.)
- [x] Implement AI-generated summaries
- [-] Capture screenshots automatically
- [ ] Extract relevant project details from Git repositories
- [ ] Process Figma changes automatically

### Phase 2: Automation & Integration

- [ ] Integrate LinkedIn API for automatic posting
- [ ] Implement configurable post templates
- [ ] Add browser extension for tracking web-based projects

### Phase 3: Enhancements

- [ ] Store post history in MongoDB
- [ ] Support video recordings instead of screenshots
- [ ] Add UI for previewing and editing posts before publishing

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License
