// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Ensures console.error messages become test failures.
global.console.error = (...obj) => {
  throw Error(`${obj.join('\n\t')}`);
};
