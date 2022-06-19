import { RejectedFn, ResolvedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {

  private handlers: Array<Interceptor<T> | null> = []
  constructor() {
    this.handlers = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.handlers.push({
      resolved,
      rejected
    })
    return this.handlers.length - 1
  }
  eject(id: number) {
    if (id) {
      this.handlers[id] = null
    }
  }
  forEach(fn: (handle: Interceptor<T>) => void) {
    this.handlers.forEach(handler => {
      if (handler !== null) {
        fn(handler)
      }
    })
  }
}