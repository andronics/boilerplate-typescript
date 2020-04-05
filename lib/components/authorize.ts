import { defaults } from 'request-promise'
import { jar } from './cookie'


const config = require('config')

const client = defaults({ jar })

export default async () : Promise<boolean> => {

    let uri = 'https://fundsonline.org.uk/wp-login.php'

    return client.post(uri, {
        
        followAllRedirects: true,
        formData: {
            "log": config.get("credentials.username"),
            "pwd": config.get("credentials.password"),
            "clear_sessions": "1",
            "redirect_to": "/search/"
        }

    }).then(body => {

        return body.indexOf("Logout") != -1
        ? Promise.resolve(true)
        : Promise.reject(false)
    
    })

}