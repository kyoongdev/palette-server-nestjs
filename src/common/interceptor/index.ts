import { ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TransactionDecorator } from '@/utils/aop/transaction/transaction';

import { JsonInterceptor } from './json.interceptor';

const Interceptors: ClassProvider<any>[] = [JsonInterceptor, TransactionDecorator].map((interceptor) => ({
  useClass: interceptor,
  provide: APP_INTERCEPTOR,
}));

export default Interceptors;
