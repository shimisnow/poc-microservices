export const Environment = {
  dev: {
    database: {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234567890',
      database: 'postgres',
    },
    streaming: {
      brokers: [
        'broker:9092',
      ]
    }
  },
  deploy: {
    database: {
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: '1234567890',
      database: 'postgres',
    },
    streaming: {
      brokers: [
        'broker:29092',
      ]
    }
  }
}