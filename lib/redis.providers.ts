import { Provider } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import {REDIS_CLIENT, REDIS_CLIENT_OPTIONS} from "./redis.constants";
import {RedisClient} from "./interfaces";

export const createRedisClientProvider = (): Provider => ({
  provide: REDIS_CLIENT,
  inject: [REDIS_CLIENT_OPTIONS],
  useFactory: (options: RedisOptions): RedisClient => {
    return new Redis(options);
  },
});
