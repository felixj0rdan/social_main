

function Weather({ lat, lon, data }) {
    console.log(data);
    return (
        <div>
            
            <h1>YO</h1>
            
            <h1>{lat}</h1>
            <h1>{lon}</h1>
            {/* <h1>{data.location.region}</h1>  */}
            
        </div>
    )
}

export default Weather

// export async function getServerSideProps({lat,lon}) {

  
//     // const [weather, setWeather] = useState([])
//     const request = await fetch(`http://api.weatherapi.com/v1/current.json?key=fba7906bf7154fa0b8264334210306&q=${lat},${lon}&aqi=yes`)
//     const data = await request.json()
  
//     if (!data) {
//       return {
//         notFound: true,
//       }
//     }
  
//     return {
//       props: { data }, // will be passed to the page component as props
//     }
  
//   }