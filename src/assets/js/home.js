// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import { VueRecaptcha } from 'vue-recaptcha'
import { generateKeywordsIdeas } from '@/conn'
import vSelect from "vue-select"
import GeoTargetCodes from '@/assets/js/geotarget-india.json'


export default {
  name: 'HomeView',
  data() {
    return {
     keyword:"",
     showResult: false,
     numResults:0,
     totalResults:0,
     cleanedResults:[],
     sortbyCI:false,
     sortbyAMS:true,
     pageNo:0,
     loading:false,
     selected: {},
     GeoTargetCodes: GeoTargetCodes,
     selectedGeoTargetCodes:[],
     GeoTargetCodesArray:[],
     GeoTargetNameslist:[],
     GeoTargetNames:'',
     searchedKeywords:[]
    }
  }, 
  components:{
    vSelect
  },
  methods: {
    clearData(){
        this.keyword = ""
        this.showResult =  false
        this.numResults = 0
        this.totalResults = 0
        this.cleanedResults = []
        this.sortbyCI = false
        this.sortbyAMS = true
        this.pageNo = 0
        this.loading = false
        this.searchedKeywords = []     
        // this.selectedGeoTargetCodes = []
        // this.GeoTargetCodesArray = []   
    },
    getGeoTargetCodesArray(){
        console.log("geoTargetCodes are: " + this.selectedGeoTargetCodes)

        for (const location in this.selectedGeoTargetCodes) {
            this.GeoTargetCodesArray.push('geoTargetConstants/'+ this.selectedGeoTargetCodes[location]['Criteria ID'])
        }
        console.log("geoTargetCodesArray are: " + this.GeoTargetCodesArray)
    },
    getGeotargetNames(){
      for (const location in this.selectedGeoTargetCodes) {
        this.GeoTargetNameslist.push(this.selectedGeoTargetCodes[location]['Name'])
    }
    this.GeoTargetNames = this.GeoTargetNameslist.toString()
    console.log("geoTarget Names are: " + this.GeoTargetNames)
    },
    async sendKeywords(keyword){
      this.keywordDislplay = this.keyword
      this.getGeotargetNames()
      this.clearData()
      this.loading = true
      this.getGeoTargetCodesArray()
      this.keywordArray = keyword.split(',')
      console.log(this.keywordArray)
      this.rawData = await generateKeywordsIdeas(this.keywordArray,this.GeoTargetCodesArray) 
      this.totalNoResults = await this.rawData.length
      // console.log("Total Number of Results: " + this.totalNoResults)
      this.cleanData(this.rawData,this.totalNoResults)
    },

    cleanData(rawData,totalNoResults) {
      for (let index = 0; index < totalNoResults-1; index++) {
            if("keywordIdeaMetrics" in rawData[index]){
              const obj = rawData[index]["keywordIdeaMetrics"]
              if(("avgMonthlySearches" in obj) && ("competitionIndex" in obj)) {
                this.cleanedResults.push(rawData[index])
              }

            }
          }
          this.numResults = this.cleanedResults.length
          for (let index = 0; index < this.keywordArray.length; index++) {
            this.searchedKeywords.push(this.cleanedResults[index])
            
          }
          console.log(this.searchedKeywords)
          this.loading = false
          this.showResult = true
    },

    sortbyAvgMonthlySearches(){
      this.sortbyAMS = !this.sortbyAMS
      this.cleanedResults = this.cleanedResults.sort((a, b) => a.keywordIdeaMetrics.avgMonthlySearches - b.keywordIdeaMetrics.avgMonthlySearches)
      if(this.sortbyAMS){
        this.cleanedResults = this.cleanedResults.sort((b, a) => a.keywordIdeaMetrics.avgMonthlySearches - b.keywordIdeaMetrics.avgMonthlySearches)
      }

    },

    sortbyCompetitionIndex(){
      this.sortbyCI = !this.sortbyCI
      this.cleanedResults = this.cleanedResults.sort((b, a) => a.keywordIdeaMetrics.competitionIndex - b.keywordIdeaMetrics.competitionIndex)
      if(this.sortbyCI){
        this.cleanedResults = this.cleanedResults.sort((a, b) => a.keywordIdeaMetrics.competitionIndex - b.keywordIdeaMetrics.competitionIndex)
      }
    },

    ifdefined(property,n=0,pageNo){
      if(10*pageNo+n<this.numResults){
          var object = this.cleanedResults[10*pageNo+n]
          if(property=="text"){
            if(property in object){
              return object[property]
            } else {
              return "Not Available"
            }
          }
          if("keywordIdeaMetrics" in object){
            if(property in object.keywordIdeaMetrics){
              return object.keywordIdeaMetrics[property]
            } else {
              return property + "not defined"
            }
          } else {
            return "keywordIdeaMetrics not defined"
          }
          }
    },

    nextPage(pageNo){
        if(pageNo*10<this.numResults-10){
          this.pageNo++
          console.log(this.pageNo)
        }
    },
    prevPage(pageNo){
        if(pageNo>0){
          this.pageNo--
          // console.log("Page Number: " + this.pageNo)
        }
    }
}
}