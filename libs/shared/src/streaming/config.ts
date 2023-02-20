import { Environment } from '../environment/config';

const SERVER = process.env.SERVER;

export const StreamingPlatform = {
  brokers: Environment[SERVER].streaming.brokers,
  topics: {
    USER: {
      GET: 'user.get',
      CREATE: 'user.create',
      EDIT: 'user.edit',
      DELETE: 'user.delete',
    },
  },
};
