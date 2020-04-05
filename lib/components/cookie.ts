import { MemoryCookieStore } from 'tough-cookie'
import rp from 'request-promise'

export const store = new MemoryCookieStore()

export const jar = rp.jar(store)
 