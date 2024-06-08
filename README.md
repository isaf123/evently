# EVENTLY
This project uses React.js with NextJS for the frontend, Express.js for the backend, and TurboRepo for monorepo management, facilitating rapid development of a scalable web application with streamlined collaboration and efficient server-client interactions.

###Front-end :
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

###Back-end :
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Evently is a platform used by users to buy and sell tickets. Users can register as either buyers or event organizers.


## Available Scripts

### `npm run dev`

Runs the app in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser. For API, you can access it in [http://localhost:8000/api](http://localhost:8000/api). The app will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder for each project.

### `npm run serve`

Runs the app in the production mode.

### `npm run <task> --workspace=<app-name>`

Run command on specific app (install package, run test, etc).

### `npm run <task> --workspace=<app-name> -- --<option>`

Run command on specific app with options.

Example : `npm run seqeulize --workspace=api -- --db:migrate`

# Rules

## Commit & Pull Request

- Always use [conventional commit message](https://www.conventionalcommits.org/en/v1.0.0/) when committing changes or creating pull request
- **"Squash and Merge"** your pull request to main branch

## Naming Convention

### REST API

- Always use [REST API naming convention](https://restfulapi.net/resource-naming/)

### File Naming Conventions:

1. **Use CamelCase for filenames:**
   - Begin filenames with a lowercase letter.
   - For multiple words, capitalize the first letter of each subsequent word.
   - Example: `index.js`, `userModel.js`, `dataAccess.js`

2. **Use Descriptive Names:**
   - Choose names that accurately describe the file's purpose or content.
   - Avoid overly generic names like `utils.js` unless the file genuinely contains utility functions.

3. **Follow Naming Conventions for Specific File Types:**
   - For configuration files, use names like `.env`, `config.js`, or `settings.json`.
   - Use consistent naming for test files, such as appending `.test.js` or `.spec.js` to the filename being tested.
   - Use `package.json` for the project's metadata and dependencies.

4. **Separate Concerns with File Naming:**
   - Follow a modular structure for different concerns (e.g., `userController.js`, `userService.js`, `userModel.js` for a user-related module).

### Folder Naming Conventions:

1. **Use Singular or Plural Naming:**
   - Choose a consistent convention for naming folders (e.g., `models` or `model`, `routes` or `route`).

2. **Avoid Special Characters and Spaces:**
   - Use hyphens (`-`) or underscores (`_`) for separating words in folder names, but avoid spaces or special characters.

3. **Use Descriptive Names for Folders:**
   - Name folders according to their content or purpose (e.g., `controllers`, `services`, `utils`, `tests`, `public`, `views`, etc.).

4. **Nested Folder Structure:**
   - Create a logical and organized folder structure based on the project's architecture.
   - For larger projects, consider organizing files by features/modules (Feature-Based Structure) or layer-based (Layered Structure).
