let method: () => string;
let currentIncrementalID:number = 0;

export const getIncrementalID = (): string => {
  return "iid-" + (++currentIncrementalID);
}

export const getRandomUUID = () => {
  if (!method) {
    method = typeof crypto.randomUUID === "function" ? crypto.randomUUID.bind(crypto) : () => Math.random().toString(36).substring(2, 11);
  }
  return method();
};