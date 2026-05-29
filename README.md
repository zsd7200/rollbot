# Rollbot

A Discord bot for rolling dice.

Self-hosted via Docker and configurable via JSON files within the `src/config` folder.

## Getting Started

### With Docker + docker-compose.yml (recommended)
1. Clone this repository.

```bash
git clone https://github.com/zsd7200/rollbot.git
```

2. Make a copy of `docker-compose.yml.example` and rename it to simply `docker-compose.yml`.
3. Set environment variables.
    - `TOKEN`: Discord bot token, available after creating a bot in the [Discord Developer Portal](https://discord.com/developers/applications).
        - Should look something like: `NUSfjbnj453bTYF6b3b899NN.st7AS5.v8b3u3NOTAREALKEY838438bnsa`
    - **Never share these environment variables, otherwise your bot or its data may be compromised.**
3. In the `src/config` folder, make copies of all files with `.example` suffixes without the `.example` suffix and adjust as needed.
    - Example: `basic.json.example` should be copied and renamed to `basic.json`.
    - Files in the `src/config` folder should include:
        - `basic.json`: Used for changing prefix, bot name (when referenced within commands). Change this file to change branding from Rollbot to whatever you prefer. 
            - [Schema](src/config/schema/basic.schema.json)
            - ~~[Documentation](doc/basic.md)~~
        - `commands.json`: Used for enabling/disabling commands and changing command aliases, cooldowns, descriptions, and modifying adjustable variables.
            - [Schema](src/config/schema/commands.schema.json)
            - ~~[Documentation](doc/commands.md)~~
4. Create and run the container from within this repository's folder:
```bash
docker compose up -d
```

### Without Docker
1. Create a `.env` with the following entries:

```
TOKEN=
```

2. Set environment variables.
    - `TOKEN`: Discord bot token, available after creating a bot in the [Discord Developer Portal](https://discord.com/developers/applications).
        - Should look something like: `NUSfjbnj453bTYF6b3b899NN.st7AS5.v8b3u3NOTAREALKEY838438bnsa`
    - **Never share these environment variables, otherwise your bot or its data may be compromised.**
3. In the `src/config` folder, make copies of all files with `.example` suffixes without the `.example` suffix and adjust as needed.
    - See above explanations for these files.
4. Run install command from this repository's directory:

```bash
npm i
```

5. Run the `start` command from this repository's directory:

```bash
npm run start
```

## Troubleshooting

**Q: My `src/config/x.json` changes aren't working when using Docker.**


A: You will need to rebuild the container. Run `docker compose down; docker compose up -d --build` from this repository's directory to fully rebuild the container and have your changes take effect.

