
let IPdata ;
let pincodeData;
let postOfficeArr;
//GETTING IP ADDRESS 
// lat , long , city , region , org , host :

  
    $.getJSON("https://api.ipify.org?format=json", function(data) {
       console.log(data);
        const ip = document.getElementById('ipAddress');
            ip.innerText = `Your Current IP Address is ${data.ip}`;
            fetch(`https://ipapi.co/${data.ip}/json`)
    .then(response => response.json())
    .then((data)=>{
       // console.log(data);
         IPdata = data;
         fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
         .then(response => response.json())
         .then((data) =>{
            console.log(data);
            pincodeData = data
             postOfficeArr = pincodeData[0].PostOffice;
             for(let i = 0 ; i < postOfficeArr.length; i++){
                renderData(postOfficeArr[i]);
             }
         });
    });
});



// setTimeout(()=>{
//     fetch(`https://ipapi.co/${ipadrs}/json`)
//     .then(response => response.json())
//     .then(data => console.log(data));
// },1000)


//buttons
let startBtn = document.getElementById('start-btn');
let mainDiv = document.getElementsByClassName('main-div')[0];
let secMainDiv = document.getElementsByClassName('sec-main-div')[0];
let maplocationDiv = document.getElementById('location-map-div');
let h1 = document.getElementById('h1');
let table = document.getElementById('table');
let pincode = document.getElementById('Pincode-container');
let pinCard = document.getElementById('postOfficeDisplayContainer');
let searchBtn = document.getElementById('searchInp');

searchBtn.addEventListener('keyup',e =>{
    let search = searchBtn.value.trim().toLowerCase();
    for(let i = 0; i < postOfficeArr.length; i++){
        if(search == ''){
            renderData(postOfficeArr[i]);
            return;
        }
       let filterData = postOfficeArr.filter(item =>{
        
        let name = postOfficeArr[i].Name.toLowerCase();
        let branch = postOfficeArr[i].BranchType.toLowerCase();
        let delivery = postOfficeArr[i].DeliveryStatus.toLowerCase();
        let district = postOfficeArr[i].District.toLowerCase();
        let division = postOfficeArr[i].Division.toLowerCase();
        i++;
        return name.includes(search) || branch.includes(search) || delivery.includes(search) || district.includes(search) || division.includes(search);
       }) 
       pinCard.innerHTML = ``;

       renderData(filterData);

    }
        
    
})
    
  
function renderData(data){
   let div = document.createElement('div');
   div.setAttribute("id","card");
div.innerHTML = `
<h3>${data.Name}</h3>
<h3>${data.BranchType}</h3>
<h3>${data.DeliveryStatus}</h3>
<h3>${data.District}</h3>
<h3>${data.Division}</h3>`
pinCard.append(div);
}
startBtn.addEventListener('click',()=>{
   //console.log(IPdata);
   //console.log(pincodeData);
   let postOfficeArr = pincodeData[0].PostOffice;
    let timeNdate = new Date().toLocaleString("en-US", { timeZone: `${IPdata.timezone}` });

   // console.log(timeNdate);
    console.log(postOfficeArr);

   //console.log(IPdata)
 mainDiv.style.display = 'none';
 secMainDiv.style.display = 'block';
 h1.innerText = `IP Address : ${IPdata.ip}`
 table.innerHTML = `<tr>
 <th><h3>Lat :${IPdata.latitude}</h3></th>
 <th><h3>City :${IPdata.city}</h3></th>
 <th><h3>Organisation :${IPdata.org}</h3></th>
</tr>
<tr>
 <th><h3>Long :${IPdata.longitude}</h3></th>
 <th><h3>Region :${IPdata.region}</h3></th>
 <th><h3>Hostname : api.ipify.org </h3></th>
</tr>`

maplocationDiv.innerHTML = `<h1>Your Current Location</h1>
<iframe src="https://maps.google.com/maps?q=${IPdata.latitude}, ${IPdata.longitude}&z=15&output=embed" width="560" height="370" frameborder="0" style="border:0"></iframe>`

pincode.innerHTML = `<h3>Time Zone: ${IPdata.timezone}</h3>
<h3>Date And Time: ${timeNdate}</h3>
<h3>Pincode: ${IPdata.postal}</h3>
<h3>Message: ${pincodeData[0].Message}</h3>`
})


