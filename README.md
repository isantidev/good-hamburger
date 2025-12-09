# good-hamburger 🍔

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![pnpm](https://img.shields.io/badge/pnpm-fast-yellow)
![Vitest](https://img.shields.io/badge/tests-Vitest-6E9F18)

A modern web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **pnpm**, featuring **Vitest** for fast and lightweight testing.

---

## 🚀 Tech Stack

-   **Next.js** – Production-ready React framework
-   **TypeScript** – Strong typing for scalable code
-   **Tailwind CSS** – Utility-first styling
-   **pnpm** – Fast, disk-efficient package manager
-   **Vitest** – Ultra-fast unit testing

---

## 📦 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the development server

```bash
pnpm run dev
```

Application runs at:  
👉 http://localhost:3000

---

## 📦 Production

### Build the app

```bash
pnpm run build
```

### Launch production server

```bash
pnpm run start
```

---

## 🧪 Tests

Run all tests using Vitest:

```bash
pnpm run test
```

---

## 📂 Project Structure

```
.
├── app/                 # Next.js App Router
├── lib/                 # Utilities / shared modules
├── public/              # Static files
├── __test__/            # Vitest test files
├── postcss.config.mjs   # PostCSS config
├── next.config.ts       # Next.js config
├── tsconfig.json        # TypeScript config
├── package.json
└── pnpm-lock.yaml
```

_note: you can fetch the data as a server using the api route_

```
// Get the complete menu
http://localhost:3000/api/menu

// Get the sandwiches
http://localhost:3000/api/sandwiches

// Get the extras
http://localhost:3000/api/extras

// if you need an specific sandwich or extra, use the /{itemId}
http://localhost:3000/api/sandwiches/{itemId}
http://localhost:3000/api/extras/{itemId}
```

## Licence

Images taken from [Free Pick](https://www.freepik.com/)
You can see a initial wirefrime here [Figma Wireframe](https://www.figma.com/design/ZztlvFHyw0B8UbfPuv5xd8/Untitled?node-id=0-1&t=lRFxs3rYI0MpPjQe-1)
