import { CookieJar, RequestAPI } from 'request'
import { defaults, RequestPromiseOptions } from 'request-promise'
import { load } from 'cheerio'
import { jar, store } from './cookie'
import { Base, BaseOptions } from './base'
import { Cache } from './cache'

export interface SpiderOptions extends BaseOptions {
    name?: string
}

export class Spider extends Base {

    public name: string = 'Spider'

    public cache: Cache = new Cache('spider')
    public cookieJar: CookieJar = jar
    public cookieStore: any = store
    public startUrl: string = ""

    public clientOptions: RequestPromiseOptions = {
        formData:{"ajax" : "1"},
        followAllRedirects: true,
        jar: this.cookieJar,
        transform: body => load(body)
    }

    public client: RequestAPI<any, any, any> = defaults(this.clientOptions)

    constructor({}: SpiderOptions = {}) {
        
        super()    

    }

    public async fetch(url: string) {
        let $ = await this.client.post(url)
        this.parse($)
    }

    public parse($: CheerioStatic) {
        throw new Error("Not Implemented")
    }

    public run(url?: string) {
        this.fetch(url || this.startUrl)
    }

}