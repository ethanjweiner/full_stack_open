export const assertNever = (value: never) => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};
