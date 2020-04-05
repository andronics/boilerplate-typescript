import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Base, BaseOptions } from './base'

export interface CacheOptions extends BaseOptions {}

export interface CacheInsertOptions {
    data: any
    multi?: boolean
    overwrite?: boolean
}

export class Cache extends Base {

    public name: string = 'Cache'

    public cacheData: any[] = []
    public cacheDir: string = resolve(__dirname, '../..', 'cache')
    public cacheFile: string = `${this.name.toLowerCase()}-${this.id.toLowerCase()}.json`

    constructor({} : CacheOptions = {}) {
        
        super({})
        this.load()
    
    }

    public count() {
    
        return this.cacheData.length
    
    }

    get cachePath() : string {
    
        return resolve(this.cacheDir, this.cacheFile)
    
    }

    public insert({ data, multi, overwrite } : CacheInsertOptions = { data: null, multi: false, overwrite: false }) : Boolean {
        
        let idx = this.cacheData.indexOf(data) 
        
        if (idx != -1 && multi == false && overwrite == true ) {
            this.cacheData[idx] = data
            return true
        } else if (idx == -1 || multi == true) {
            this.cacheData.push(data)
            return true
        } else {
            return false
        }

    }

    public load() {

        if (existsSync(this.cachePath)) {
            this.cacheData = require(this.cachePath)
        }

    }

    public save() {
        
        if (!existsSync(this.cacheDir)) {
            mkdirSync(this.cacheDir, { recursive: true })
        }
        
        writeFileSync(this.cachePath, JSON.stringify(this.cacheData, null, 4))
    
    }

}