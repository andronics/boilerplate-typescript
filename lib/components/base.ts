import { EventEmitter } from 'events'
import { generate } from 'randomstring'

export interface BaseOptions {}

export class Base extends EventEmitter {

    public id: string = generate({
        capitalization: 'lowercase',
        charset: 'alphanumeric',
        length: 8
    })

    public name: string = 'Base'

    constructor({} : BaseOptions = {}) {

        super()
    
    }

}
