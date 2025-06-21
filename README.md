# AIVA Ecommerce

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/your-username/aiva-ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/aiva-ecommerce/actions/workflows/ci.yml)

## Description

**AIVA Ecommerce** is a performance-driven ecommerce frontend built with **Next.js** and **TypeScript**, featuring a dynamic UI, 3D world data visualization, and real API integration via Platzi's Fake Store. The architecture emphasizes server-side rendering for SEO and speed, with a static homepage and real-time data fetching across the app.

This application demonstrates modularity, scalability, and responsiveness—ideal for showcasing product listings, categories, and global data overlays using WebGL.

It was bootstrapped with [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) and is deployed with [Vercel](https://vercel.com/).

## Table of Contents

- [Demo](#demo)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [Continuous Integration](#continuous-integration)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [License](#license)

## Demo

Visit the live demo here:  
🌐 [https://e-commerce-nextjs-pi-ebon.vercel.app/](https://e-commerce-nextjs-pi-ebon.vercel.app/)

## Project Structure

- `src/app` – Next.js app router structure
- `src/components` – Reusable components
- `src/components/ui` – Shadcn UI primitives
- `src/lib` – Utilities and constants
- `src/services` – API service functions
- `src/scenes/Globe` – Real-time animated 3D world map using React Three Fiber
- `src/styles` – TailwindCSS styles
- `__tests__` – Unit tests with Jest
- `e2e` – Cypress E2E tests
- `.github/workflows/ci.yml` – CI pipeline configuration

## Features

- ⚡ **Static Homepage & Server-Side Rendering**: Optimized performance and SEO using hybrid rendering strategy.
- 🌍 **Real-Time 3D Globe Animation**: Visualize product/geographic data via a WebGL globe built with [three-globe](https://www.npmjs.com/package/three-globe).
- 🔎 **Search Functionality**: Search products by name.
- 🏷️ **Category & Price Filtering**: Filter products based on selected categories and price range.
- 📄 **Pagination**: Efficient handling of product listings.
- 💡 **Clean Modular Architecture**: Easily maintainable codebase with a focus on separation of concerns.
- 🧪 **Full Testing Coverage**: Supports both unit and E2E testing.

## Getting Started

### Installation

```bash
git clone https://github.com/your-username/aiva-ecommerce.git
cd aiva-ecommerce
npm install
````

### Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1
```

## Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
* **3D & Animation**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **API Client**: [Axios](https://axios-http.com/)
* **Forms**: [React Hook Form](https://react-hook-form.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Testing**: [Jest](https://jestjs.io/), [Cypress](https://www.cypress.io/)
* **Deployment**: [Vercel](https://vercel.com/)

## API Documentation

Data is sourced from the public [Platzi Fake Store API](https://api.escuelajs.co/docs/).

### Example Endpoints

* `GET /products` – Fetch all products
* `GET /categories` – List all product categories
* `GET /users` – Example users

> 🛑 Authentication is **not required**. The API is public and no JWT or session is used.

## Testing

### Unit Tests

Unit tests use **Jest** and **React Testing Library**.

```bash
npm run test
```

### End-to-End Tests

End-to-end tests use **Cypress**.

```bash
# Open interactive UI
npm run cypress:open

# Run headless
npm run cypress:run
```

## Continuous Integration

CI is configured via GitHub Actions in `.github/workflows/ci.yml`.

* Linting
* Type checking
* Unit + E2E tests
* Build verification

## Usage

Start the app locally:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

Use the category filter, price range selector, and search bar to interact with the product listings. Explore the animated globe for a real-time visual experience.

## Future Improvements

* 🌐 **Internationalization (i18n)**
* 🧠 **WebGL Enhancements**: Shader integration and advanced globe interactions
* 🖼️ **Image Lazy Loading**: Optimize image delivery for faster load times
