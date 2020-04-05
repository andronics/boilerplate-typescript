import { Spider, SpiderOptions } from '../components/spider'

export interface FundSpiderOptions extends SpiderOptions {
    funderType: number | null
}

export default class FundSpider extends Spider {

    public name: string = "FundSpider"
    public funds: any[] = []
    public startUrl: string = "https://fundsonline.org.uk/Fund/"

    constructor({ }: FundSpiderOptions = { funderType: null }) {
        
        super({ })
        
    }

    public parse($: CheerioStatic) {

        let i = $('section.content-block')

        if (i.length > 0 ) {

            let data = {
                name:                                   i.find('.title h2').text(),
                charity_number:                         i.find('div.actions h2').text().split(": ")[1],
                established:                            i.find('div.established .fund-info-content').text(),
                contact:                                i.find('div.contact .fund-info-content').text(),
                address:                                i.find('div.address .fund-info-content').html()?.replace(/<br>/g, ", "),
                phone:                                  i.find('div.phone .fund-info-content').text(),
                email:                                  i.find('div.email .fund-info-content a').text(),
                website:                                i.find('div.website .fund-info-content').text(),
                facebook:                               i.find('div.facebook .fund-info-content').text(),
                twitter:                                i.find('div.twitter .fund-info-content').text(),
                instagram:                              i.find('div.instagram .fund-info-content').text(),
                trustees:                               i.find('div.trustees .fund-info-content').text(),
                last_updated:                           i.find('div.last-updated .fund-info-content').text(),
                focus_of_work:                          i.find('div.focus-of-work .fund-info-content').text(),
                beneficial_area:                        i.find('div.beneficial_area .fund-info-content').text(),
                general_information:                    i.find('div.general-information .fund-info-content').text(),
                financial_information:                  i.find('div.financial-information .fund-info-content').text(),
                furthere_financial_information:         i.find('div[class~="further_financial_information"] .fund-info-content').text(),
                sample_beneficaries:                    i.find('div.sample-beneficiaries .fund-info-content').text(),
                exclusions:                             i.find('div.exclusions .fund-info-content').text(),
                how_to_apply:                           i.find('div.how-to-apply .fund-info-content').text(),
                sources:                                i.find('div.sources .fund-info-content').text()
            }
            
            this.cache.insert({ data })

            this.cache.save()
        
        }
        
    }

}