# DreamScholars

DreamScholars aims to provide scholarship information for undocumented students

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development Prerequisites

The following are required:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/)

The following are recommended but optional:

- [VS Code](https://code.visualstudio.com/) - most of our team uses VS Code.
  - [Extension - ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - shows lint issues in your editor.
  - [Extension - Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - autoformats your files according to our config.

Alternatively, [Cloud Shell](https://cloud.google.com/shell) can be used.

## Development Setup

1. Clone the repo or [open it](<(https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/beyondhb1079/s4us.git)>) in Cloud Shell:

```sh
git clone https://github.com/beyondhb1079/s4us.git
```

2. `cd` into the repo and install [`npm-merge-driver`](https://www.npmjs.com/package/npm-merge-driver) so that `yarn.lock` merge conflicts are autoresolved:

```sh
npx npm-merge-driver install \
  --driver-name yarn-merge-driver \
  --driver "npx npm-merge-driver merge %A %O %B %P -c yarn" \
  --files yarn.lock
```

3. Install project dependencies by running:

```sh
yarn install
```

## Common development actions

### Updating dependencies

```sh
yarn install
```

This is needed whenever the `yarn.lock` file has changed.

### Previewing the app

```sh
yarn start
```

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Debugging the app

[Chome Dev Tools](https://developers.google.com/web/tools/chrome-devtools) makes it really easy to debug/prototype HTML, CSS, and JavaScript. Additionally, the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) extension lets you inspect React props, state, and hooks.

### Running tests

```sh
yarn test
```

Launches the test runner in the interactive watch mode.<br />
See this section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

The tests also run when you run a `git push` command.<br />
You can skip the tests by adding the `--no-verify` flag to the command.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

To learn about other languages, tools, and libraries we use, see the [Learning Resources](https://github.com/beyondhb1079/s4us/wiki/Learning-Resources) wiki entry.
