import { Spider, SpiderOptions } from '../components/spider'

export interface SearchSpiderOptions extends SpiderOptions {
    funderType: number | number[] | null
}

export default class SearchSpider extends Spider {

    public name: string = "SearchSpider"
    public startUrl: string = "https://fundsonline.org.uk/search/"

    constructor({ funderType }: SearchSpiderOptions = { funderType: null }) {
        
        super()

        if (typeof funderType == "string")
            funderType = [funderType]
        
        this.clientOptions.formData = Object.assign({}, this.clientOptions.formData, {
            "count": "250",
            "funder_types[]": funderType
        })
    
    }

    public parse($: CheerioStatic) {
        
        $('.fund-top h2 a').each(
            (idx, el) => {
                let i = $(el)
                let data = {
                    name: i.attr("title"),
                    url: i.attr("href")?.split("?")[0]
                }
                this.cache.insert({ data })
            }
        )
        
        this.cache.save()

        console.log("In Cache: %s", this.cache.count())

        let nextPage = $('.pagination .next').attr("href")
        
        if (nextPage) {
            this.fetch(nextPage)
        }
        
    }

}