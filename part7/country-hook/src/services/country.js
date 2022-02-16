import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name/'

const getCountry = async (country) => {
  const response = await axios.get(`${baseUrl}/${country}`, {
    params: {
      'fullText': true
    }
  })
  return response
}

export default {
  getCountry
}