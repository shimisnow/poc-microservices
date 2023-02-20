import { Environment } from '../environment/config';

const SERVER = process.env.SERVER;

export const DatabasePlatform = {
  config: Environment[SERVER].database,
};
