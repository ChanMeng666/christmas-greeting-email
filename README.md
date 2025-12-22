# Christmas Greeting Email

A Node.js application for sending beautifully designed Christmas greeting emails using [Resend](https://resend.com). Features a bold **Neobrutalism** design style with festive red and green colors.

## Features

- **Neobrutalism Design** - Bold borders, hard shadows, and high-contrast colors
- **Christmas Theme** - Festive red/green palette with decorative icons
- **Email Preview** - Preview emails in browser before sending
- **Resend Integration** - Uses Resend API for reliable email delivery
- **Contact Management** - Integrates with Resend Audiences
- **Batch Sending** - Send to multiple recipients efficiently

## Preview

The email template features:
- Bold 4px black borders with offset shadows
- Christmas red (#DC2626) and green (#16A34A) color scheme
- Decorative Christmas icons and emojis
- Professional sender card with LinkedIn link
- Responsive design for all email clients

## Prerequisites

- Node.js 18+
- [Resend](https://resend.com) account with verified domain
- Resend API key

## Installation

```bash
# Clone the repository
git clone https://github.com/ChanMeng666/christmas-greeting-email.git
cd christmas-greeting-email

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Resend API key
```

## Configuration

Edit `.env` file:

```env
RESEND_API_KEY=your_resend_api_key_here
SENDER_EMAIL=hello@yourdomain.com
SENDER_NAME=Your Name
```

Edit `src/config.ts` to customize:
- `audienceId` - Your Resend Audience ID
- `linkedin` - Your LinkedIn profile URL
- `personalImageUrl` - URL to your personal image (optional)
- `emailSubject` - Email subject line

## Usage

### Preview Email

Preview the email template in your browser:

```bash
npm run preview
```

Opens at http://localhost:3001

### Manage Contacts

```bash
# List all contacts in your Resend Audience
npm run contacts:list

# Add a contact interactively
npm run contacts:add
```

You can also manage contacts directly in the [Resend Dashboard](https://resend.com/audiences).

### Send Emails

```bash
# Send a test email to yourself
npm run send:test

# Send to all contacts (with confirmation)
npm run send
```

## Project Structure

```
christmas-greeting-email/
├── src/
│   ├── config.ts              # Configuration settings
│   ├── contacts.ts            # Contact management (Resend Audiences)
│   ├── index.ts               # Main entry - batch sending
│   ├── preview.ts             # Local preview server
│   └── templates/
│       └── christmas-email.tsx    # Email template (React Email)
├── .env.example               # Environment variables template
├── package.json
└── tsconfig.json
```

## Tech Stack

- **Runtime**: Node.js with ES Modules
- **Language**: TypeScript
- **Email Template**: [React Email](https://react.email)
- **Email Service**: [Resend](https://resend.com)
- **Execution**: [tsx](https://github.com/privatenumber/tsx)

## Design Style

This project uses **Neobrutalism** design principles:

- **Bold Borders**: 3-4px solid black borders
- **Hard Shadows**: Offset box shadows (no blur)
- **High Contrast**: Bright colors against neutral backgrounds
- **Typography**: Bold, uppercase headings
- **Geometric Elements**: Simple shapes and decorations

## Author

**Chan Meng**
- LinkedIn: [chanmeng666](https://www.linkedin.com/in/chanmeng666/)

## License

MIT License - see [LICENSE](LICENSE) for details.
