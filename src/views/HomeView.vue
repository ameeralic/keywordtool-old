<template>
  <input type="text" placeholder="Type Keyword, ex: cars" v-model="keyword"/>
  <v-select 
  :options=GeoTargetCodes 
  label="Name" multiple 
  v-model="selectedGeoTargetCodes"></v-select>
  <!-- :reduce="GeoTargetCode => GeoTargetCode['Criteria ID']"  -->

  <button type="button" @click="sendKeywords(this.keyword)"> Search</button>

  <div class="result-table" v-if="showResult">
    <div class="container">
      <h1>Keywords Ideas and Statistics</h1>
      <h3>Keywords: {{ this.keywordDislplay }}</h3>
      <h3>Locations: {{ this.GeoTargetNames }}</h3>
      <h3 v-for="(k,index) in searchedKeywords" :key="index">
          {{ searchedKeywords[index].text }} - {{ searchedKeywords[index].keywordIdeaMetrics.avgMonthlySearches }} - {{ searchedKeywords[index].keywordIdeaMetrics.competition }} - {{ searchedKeywords[index].keywordIdeaMetrics.competitionIndex }}
      </h3>
      
      <div class="inner-form-container">
            <div class="field-button">
              <button class="btn-search" @click="sortbyAvgMonthlySearches">Sort By Avg. Monthly Search</button>
              <button class="btn-search" @click="sortbyCompetitionIndex">Sort By Compition Index</button>
            </div>
      </div>

      <table class="rwd-table">
        <tbody>

          <tr>
            <th>Keyword</th>
            <th>Avg. Monthly Searches</th>
            <th>Competition</th>
            <th>Competition Index</th>
            <th>Low Top of Page Bid</th>
            <th>High Top of Page Bid</th>
          </tr>

          <tr v-for="n in 10" :key="n">
            <td data-th="Keyword">
              {{ ifdefined("text",n-1,pageNo) }}
            </td>
            <td data-th="Avg. Monthly Searches">
              {{ ifdefined("avgMonthlySearches",n-1,pageNo) }}
            </td>
            <td data-th="Competition">
              {{ ifdefined("competition",n-1,pageNo) }}
            </td>
            <td data-th="Competition Index">
              {{ ifdefined("competitionIndex",n-1,pageNo) }}
            </td>
            <td data-th="Low Top of Page Bid">
              {{ parseInt(ifdefined("lowTopOfPageBidMicros",n-1,pageNo))/1000000 }}
            </td>
            <td data-th="High Top of Page Bid">
              {{ parseInt(ifdefined("highTopOfPageBidMicros",n-1,pageNo))/1000000 }}
            </td>
          </tr>

        </tbody>

      </table>
    </div>
    <div class="inner-form-container">
          <div class="field-button">
            <button class="btn-search" @click="prevPage(pageNo)" v-if="(pageNo !== 0)">Previous</button>
            Page Number:<input type="text"   :value="pageNo+1" @input="event => pageNo = event.target.value - 1">
            <button class="btn-search" @click="nextPage(pageNo)" v-if="((pageNo+1)*10<this.numResults)">Next</button>
          </div>
    </div>
  </div>
  <div v-if="loading">
    <h1>Loading..</h1>
  </div>

</template>

<script src="@/assets/js/home.js"></script>

