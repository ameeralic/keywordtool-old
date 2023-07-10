import axios from "axios"

var access_token = ''
const generateAcessToken_Header = 
{ 
    "grant_type" : "refresh_token",
    "client_id" : "741035690434-i1le4n7vlah4m5e250p7548d3igtpolp.apps.googleusercontent.com",
    "client_secret" : "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",
    "refresh_token" : "1//0gQh82Ru7djmnCgYIARAAGBASNwF-L9Irdq5iWkaxjC18NxlEX3I4JlrX-mnvHktmk13JCL8lSJ6XCMUJ6uX0aGJi7tryYhqAFgQ"
}

export async function getAccessToken(){
    console.log("getAccessToken starts")
    const response = await axios.post("https://www.googleapis.com/oauth2/v3/token",generateAcessToken_Header)
    console.log("getAccessToken Success: " + response.data.access_token)
    access_token = response.data.access_token
    return access_token
}

export async function generateKeywordsIdeas(keywordsArray,geoTargetArray){
    console.log("getKeywords starts")
    access_token = await getAccessToken()
    var data = 
    { 
        "geo_target_constants":geoTargetArray,
        "language":"languageConstants/1018",
        "keywordSeed": { "keywords": keywordsArray }, 
        // "pageSize": "10"
    }
    const authHeader = 
    { 
    "Authorization" : "Bearer " + access_token,
    "developer-token" : "jezzvlmDfHw91-MrMsCg3Q",
    "login-customer-id" : "3289607268" 
    }
    const response = await axios.post("https://googleads.googleapis.com/v14/customers/1707866433:generateKeywordIdeas",data, { headers: authHeader })
    // console.log("getKeywords Success: "+ response.data.results)
    return response.data.results
}