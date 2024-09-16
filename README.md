# reorg-deals

Hi! 👋

In this repo you'll find a Vue application that generates and uses JSON files as a source of data to render a dynamic grid component. It supports sorting, row selection, filtering, exporting as CSV and is responsive.

## Runing the project:

### 1. Project Setup ▶️

```sh
npm install
```

### 2. Generate fake data 🗄️

This command uses `faker.js` to generate a `data.json` file, which will be used as a mock source of data.

In this case, it will generate `1000` records, but you can generate any number of records.

```sh
npm run fake 1000
```

The `data.json` file has been setup to be ignored by git to avoid bloating the repo.

### 3. Compile and Hot-Reload for Development 💻

```sh
npm run dev
```

### 4. Navigate to the project at: 🌐

```sh
localhost:3000
```

### 5. Compile and Minify for Production 🚀

```sh
npm run build
```

### 6. Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
