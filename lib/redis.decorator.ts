import { Inject } from '@nestjs/common';
import {REDIS_CLIENT} from "./redis.constants";

export function InjectRedisClient(): ParameterDecorator {
    return Inject(REDIS_CLIENT);
}
