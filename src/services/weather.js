import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const perCity = async (city) => {
    try {
        const response = await axios.get(`${baseUrl}?q=${city}&appid=0f41d32014297ef1b0c9492c09584cc0`)
        return response.data; 
    } catch (error) {
        console.error("Error fetching the blog:", error);
        throw error; 
    }
};

const perCityWeek = async (lat,lon)=>{
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0f41d32014297ef1b0c9492c09584cc0`)
        return response.data; 
    } catch (error) {
        console.error("Error fetching the blog:", error);
        throw error; 
    }    
}
export default perCity

export {perCityWeek}