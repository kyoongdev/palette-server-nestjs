import { ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { JsonInterceptor } from './json.interceptor';

const Interceptors: ClassProvider<any>[] = [JsonInterceptor].map(
  (interceptor) => ({
    useClass: interceptor,
    provide: APP_INTERCEPTOR,
  }),
);

export default Interceptors;
