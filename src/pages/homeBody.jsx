import React, { useEffect, useState } from "react";
import axios from "axios";

function HomeBody(){
    
    const [results, setResults] = useState("");
    
    useEffect(() => {
        axios
            .all([
                
                axios.get("https://corona.lmao.ninja/v2/countries"),
            ])
            .then((responseArr) => {
                
                console.log(responseArr[1].data)
                setResults(responseArr[1].data);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
}

   // const countries = results.map(data => {
    //     return (
    //         <Card
    //             // key={i}
    //             bg={darkTheme ? "dark" : "light"}
    //             text={darkTheme ? "light" : "dark"}
    //             // bg="light"
    //             // text="dark"
    //             className="text-center"
    //             style={{ margin: "10px" }}
    //         >
    //             <Card.Img variant="top" src={data.countryInfo.flag} />
    //             <Card.Body>
    //                 <Card.Title> {data.country} </Card.Title>
    //                 {/* <Card.Text>Cases {data.cases}</Card.Text>
    //                 <Card.Text>Deaths {data.deaths}</Card.Text>
    //                 <Card.Text>Recovered {data.recovered}</Card.Text>
    //                 <Card.Text>Today's cases {data.todayCases}</Card.Text>
    //                 <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
    //                 <Card.Text>Active {data.active}</Card.Text>
    //                 <Card.Text>Critical {data.critical}</Card.Text> */}
    //             </Card.Body>
    //         </Card>
    //     );
    // });

