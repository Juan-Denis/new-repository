"use strict";   

const time = document.getElementById("time");
const date = document.getElementById("date");
const time1 = document.getElementById("time1");

const monthNames = ["January","February","March",
                    "April","May","June","July",
                    "August","September","octub"
]

const interval = setInterval(() => {
  
    const local= new Date();

    let day = local.getDate(),
        month = local.getMonth(),
        year = local.getFullYear();

    time.innerHTML= local.toLocaleTimeString();
    date.innerHTML= `${day} ${monthNames[month
    ]} ${year}`
    


     

}, 1000);  



const interval1 = setInterval(() => {
  
    const local= new Date();

    time1.innerHTML= local.toLocaleTimeString();
   


     

}, 1000);  




const interval2 = setInterval(() => {
  
    const local= new Date();

    time2.innerHTML= local.toLocaleTimeString();
   


     

}, 1000);  


const interval3= setInterval(() => {
  
    const local= new Date();

    time3.innerHTML= local.toLocaleTimeString();
   


     

}, 1000);  
