import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "leaflet/dist/leaflet.css";

import {
    MenuItem,
    FormControl,
    Select,
    // Card,
    CardContent,
  } from "@material-ui/core";
import "react-toggle/style.css";
import Table from "./Table"
import Map from "./Map"
import { sortData } from "./util";
import './style.css'

import {
    Card,
    CardBlock,
    CardFooter,
    CardTitle,
    CardText,
} from 'react-bootstrap-card';
import axios from "axios";


function Home(){
    const [latest, setLatest] = useState(["WorldWide"]);
    const [result, setResults] = useState([]);
    const [countryInfo, setCountryInfo] = useState({});
    const [Inputcountry, setInputCountry] = useState("worldwide");
    const [country, setcountries] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    
    const [tableData, settableData] = useState([]);
    const [mapCenter, setmapCenter] = useState([-41.2858, 174.78682], 14)
    const[mapZoom,setMapZoom]= useState(3);
   
    
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
          .then((response) => response.json())
          .then((data) => {
            setCountryInfo(data);
          });
      }, []);
    useEffect(() => {
        axios
            .all([
                axios.get("https://corona.lmao.ninja/v2/all"),
                axios.get("https://disease.sh/v3/covid-19/countries"),
            ])
            .then((responseArr) => {
                setLatest(responseArr[0].data);
                
                
                setResults(responseArr[1].data);
                setLoading(false);

                

                
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();
   // useeffect : runs a piece of code based on given condition
    useEffect(()=> {
      // code here runs once when the component loads and not again after. 
      // async: sends a request, wait for it , and do somthing with it. 
       const getCountriesdata = async()=>{
           await fetch("https://disease.sh/v3/covid-19/countries")
           .then((response) => response.json())
           .then((data)=>{
               const countries=data.map((country)=>({
                   name:country.country,
                   cases: country.cases,
                   value:country.countryInfo.iso2,
               }));
               const sortedData= sortData(data);
               setMapCountries(data);
               settableData(sortedData);
               setcountries(countries);
           }); 
       };
       getCountriesdata();
  },[]);

  const onCountryChange= async (event)=>{
      const Countrycode= event.target.value;
     
      const url =
      Countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${Countrycode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(Countrycode);
        setCountryInfo(data);
        setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };


  

   

    const SearchBox = ()=>(
        <input
            className="search"
            type="Search" placeholder="Search Countries"
        />)
    const handleDarkThemeChange = () => {
        setDarkTheme(!darkTheme);
    };
    return(
        <div className="home" style={{
            backgroundColor: darkTheme ? "black" : "white",
            color: darkTheme ? "white" : "black",
        }}>
            <div style={{ textAlign: "right" }}>
                <Toggle
                    defaultChecked={false}
                    icons={{
                        checked: "🌜",
                        unchecked: "🌞",
                    }}
                    onChange={handleDarkThemeChange}
                />
                
                {/* {select enter dropdown field} */}
                <div className="header"> 
                <h1 style={{textAlign:"center"}}> Covid-19 Tracker </h1>
                
                </div>

                
                
                <div className="Cards">
                    <div className="classDetails">
                    <div className="casecard"> <Card style={{ width: '18rem' }}>
                    <CardBlock>

                        <CardTitle> Total Reported Cases</CardTitle>
                        < div className=" critical">  <CardText> {latest.cases}   </CardText> </div>
                        <CardFooter> Last updated : {lastUpdated}</CardFooter>
                        
                    </CardBlock>
                    
                </Card>
                
                </div>
                    <div className="deathcard" >
                        <Card style={{ width: '18rem' }}>
                        <CardBlock>

                            <CardTitle> Deaths</CardTitle>
                            < div className=" critical"> <CardText> {latest.deaths}</CardText> </div>
                            <CardFooter> Last updated : {lastUpdated}</CardFooter>
                        </CardBlock>

                    </Card>
                    </div>
                    <div className="recovercard"> <Card style={{ width: '18rem' }}>
                        <CardBlock>

                            <CardTitle> Recovered Cases</CardTitle>
                            < div className=" critical"><CardText> {latest.recovered}</CardText> </div>
                            <CardFooter>Last updated : {lastUpdated}</CardFooter>
                        </CardBlock>

                    </Card>
                    </div>

                    <div className="criticalcases">
                        <Card style={{ width: '18rem' }} >
                        <CardBlock>

                            <CardTitle> <large>Critical Cases </large> </CardTitle>
                            < div className=" critical"> <CardText> {latest.critical}  </CardText>
                            </div>
                             <CardFooter> Last updated : {lastUpdated} </CardFooter>
                        </CardBlock>
                       
                    </Card>
                    </div>

                 
                   
                         </div>
                
                
                </div>
        </div>
        <div className="countrylist">
        <FormControl className="app_dropdown">
                <MenuItem value="worldwide"> worldwide  </MenuItem>
                    <Select variant="outlined"
                    onChange={onCountryChange}
                    value={Inputcountry}>
                        {country.map((c) => (<MenuItem value={c.value}> {c.name}  </MenuItem>))}
                        {/* <MenuItem value="worldwide"> Nepal  </MenuItem>
                        <MenuItem value="worldwide"> India  </MenuItem>
                        <MenuItem value="worldwide"> China  </MenuItem>
                        <MenuItem value="worldwide"> Nepal  </MenuItem>
                        <MenuItem value="worldwide"> India  </MenuItem>
                        <MenuItem value="worldwide"> China  </MenuItem> */}
                    </Select>
                </FormControl>
             </div>
       
        <div className="mainbody">
        
                   <div className="home__left">    
                    <Map center={mapCenter}
                         zoom={mapZoom}
                         countries={mapCountries}
                         casesType={casesType}
                    />
                   </div>
                   <div className="home__right">
                       <CardContent>
                       <h3> Live Cases By countries </h3>
                           <Table
                           country={tableData}/>

                        
                        
                       
                       </CardContent>
                      
                   </div>
                </div>
       
        </div>

        
    );
}
export default Home;