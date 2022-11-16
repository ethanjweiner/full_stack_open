export const assertNever = (value: never): never => {
  throw new Error(`Unahdneld union member: ${JSON.stringify(value)}`)
}