# Mighty Horse

Mighty Horse is a small interactive website that answers a user's question with a random **Yes**, **Maybe**, or **No** verdict.

Each result includes a different piece of horse media:

- **Yes**: Plays `horse-nodding.mp4`
- **Maybe**: Plays `horse.mp4`
- **No**: Shows `tenor.gif`
- **All results**: Plays `horse.mp3` on a loop

The result media is displayed in a centered overlay with a message and an **Ask more questions** button. The button closes the result and returns the user to the question form.

## Requirements

- Node.js
- npm

## Getting started

From the project directory:

```powershell
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173/
```

If PowerShell prevents the `npm` script from running, use the Windows command wrapper:

```powershell
npm.cmd install
npm.cmd run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```text
mighty-horse/
├── index.html              # HTML entry point and page metadata
├── package.json            # Project metadata, dependencies, and scripts
├── vite.config.js          # Vite and Tailwind CSS configuration
├── public/                 # Static public files
└── src/
    ├── main.js             # App markup, verdict logic, and media behavior
    ├── style.css           # Global styles and Tailwind CSS import
    └── assets/
        ├── horse.mp3       # Looping result sound
        ├── horse.mp4       # Maybe result video
        ├── horse-nodding.mp4 # Yes result video
        └── tenor.gif       # No result animation
```

## How the verdict works

1. The user enters a non-empty question.
2. The form validation prevents empty or whitespace-only questions.
3. A random number selects one of three equally likely outcomes:
   - `Yes`
   - `Maybe`
   - `No`
4. The selected response and media are shown.
5. The horse audio loops until the user clicks **Ask more questions** or **Clear**.

The random verdict and response behavior is implemented in [src/main.js](./src/main.js).

## Styling

The project uses Vite with Tailwind CSS v4. The Tailwind Vite plugin is configured in [vite.config.js](./vite.config.js), and the Tailwind import and global styles are in [src/style.css](./src/style.css).
