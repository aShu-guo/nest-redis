<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

ioredis utilities module for nestjs framework

## Installation

```bash
$ npm i --save @ashu_guo/nest-redis
```

## Usage

Import `RedisModule`:

```typescript
import {RedisModule} from '@ashu_guo/nest-redis';

@Module({
    imports: [RedisModule.register({
        host: 'localhost',
        port: 6379,
        username: 'xxxxx',
        password: '*****',
    })],
    providers: [...],
})
export class UsersModule {
}
```

Inject `RedisClient`:

```typescript
import {InjectRedisClient, RedisClient} from '@ashu_guo/nest-redis';

@Injectable()
export class UsersService {
    constructor(@InjectRedisClient() private readonly redisClient: RedisClient) {
    }
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case,
use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
@Module({
    imports: [
        RedisModule.registerAsync({
            useFactory: () => ({
                host: 'localhost',
                port: 6379,
                username: 'xxxxx',
                password: '*****',
            })
        })
    ]
})

export class AppModule {
}

```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies
through `inject`).

```typescript
RedisModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD'),
    }),
    inject: [ConfigService],
})
```

**2. Use class**

```typescript
RedisModule.registerAsync({
    useClass: RedisConfigService
});
```

Above construction will instantiate `RedisConfigService` inside `RedisModule` and will leverage it to create options
object.

```typescript
import {RedisOptionsFactory} from '@ashu_guo/nest-redis';
import {RedisOptions} from 'ioredis';

export class RedisConfigService implements RedisOptionsFactory {
    createRedisOptions(): RedisOptions {
        return {
            host: 'localhost',
            port: 6379,
            username: 'xxxxxx',
            password: '******',
        };
    }
}
```

**3. Use existing**

```typescript
RedisModule.registerAsync({
    imports: [ConfigModule],
    useExisting: ConfigService,
})
```

It works the same as `useClass` with one critical difference - `RedisModule` will lookup imported modules to reuse
already created `ConfigService`, instead of instantiating it on its own.

## Used By

- [rbac-admin](https://github.com/aShu-guo/rbac-admin)

## API Spec

The `RedisModule` takes an [`options`](https://ioredis.readthedocs.io/en/latest/API/#Redis) object:

## License

Nest is [MIT licensed](LICENSE).
