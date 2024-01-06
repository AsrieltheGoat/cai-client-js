# Discord Selfbot with character.ai 
This project is a [Discord selfbot](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) that integrates with [CharacterAI API](https://github.com/realcoloride/node_characterai) to provide AI responses as messages.

## Installation
Node.js 16.0+ or newer is recommended

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Copy the .env.example to .env and provide your own Discord token and c.ai token

## Usage
The bot listens for messages that contain the word "ganyu" or when you ping it. 
When such a message is detected, it sends the message content to the CharacterAI API and awaits a response.

## Fixes
When you get an error: `Error: Could not find Chromium (rev. 1108766). This can occur if either`, you need to run this command
```bash
node node_modules\puppeteer\install.mjs
```

## Disclaimer
Use of selfbots is against Discord's Terms of Service. Use this bot at your own risk.