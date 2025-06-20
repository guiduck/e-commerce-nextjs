import "@testing-library/jest-dom";

declare global {
  namespace NodeJS {
    interface Global {
      TextEncoder: typeof TextEncoder;
      TextDecoder: typeof TextDecoder;
    }
  }
}
