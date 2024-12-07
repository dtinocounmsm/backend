import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AsyncContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<
    Map<string, any>
  >();

  run(callback: (...args: any[]) => void, initialData?: Map<string, any>) {
    const store = initialData || new Map<string, any>();
    this.asyncLocalStorage.run(store, callback);
  }

  get(key: string) {
    const store = this.asyncLocalStorage.getStore();
    return store ? store.get(key) : undefined;
  }

  set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  getStore(): Map<string, any> | undefined {
    return this.asyncLocalStorage.getStore();
  }
}
