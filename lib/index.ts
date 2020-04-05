import authorize from './components/authorize'

import FundSpider from './spiders/fund'
import SearchSpider from './spiders/search'

// let companies = new SearchSpider("17460")
// let individuals = new SearchSpider("17461")
// let organisations = new SearchSpider("17462")
// let statutory = new SearchSpider("17463")
    
authorize().then(auth => {

    // new SearchSpider({ funderType: [17460, 17461, 17462, 17463] }).run()

    let funds = require('../cache/cache-saw1metg.json')
    let fundSpider = new FundSpider()

    let asyncForEach = async (array: any[], callback: Function) => {
        for (let idx = 0; idx < array.length; idx++) {
            await callback(array[idx], idx, array)
        }
    }

    asyncForEach(funds, async (fund: any, idx: number, arr: any[]) => {
        console.log("[%s of %s] %s at %s", idx + 1, arr.length, fund.name, fund.url)
        await fundSpider.fetch(fund.url)
    })
    
})