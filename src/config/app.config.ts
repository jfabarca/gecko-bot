export interface Config {
  token: string;
}

export const config = {
  token: process.env.TOKEN,
} as Config;
