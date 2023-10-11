var billingCountry = [], invoiceCountryData = []

async function dummyChart() {
  await getDummyData()

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: billingCountry,
        datasets: [{
            label: 'invoice count Country Wise',
            backgroundColor: 'purple',
            borderColor: 'rgb(255, 99, 132)',
            data: invoiceCountryData
        }
      ]
    },

    // Configuration options go here
    options: {
      
      scales: {
        x: {
          title: {
            display: true,
            text: 'Country'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Count'
          },
          ticks:{
            precision:0
          }
        }
      }
    }
})}

dummyChart()

async function addDetails() {
  //console.log("in AddDetails")
  var CustomerId = document.getElementById('CustomerId').value;
  var BillingAddress = document.getElementById('BillingAddress').value;
  var BillingCity = document.getElementById('BillingCity').value;
  var BillingState = document.getElementById('BillingState').value;
  var BillingCountry = document.getElementById('BillingCountry').value;
  var BillingPostalCode = document.getElementById('BillingPostalCode').value;
  var Total = document.getElementById('Total').value;
  var test = JSON.stringify({"CustomerId":CustomerId,"BillingAddress":BillingAddress,"BillingCity":BillingCity,"BillingState":BillingState,"BillingCountry":BillingCountry,"BillingPostalCode":BillingPostalCode,"Total":Total})
  //alert(test);
  
  //const apiUrl = "https://localhost:5001/rest/Invoices";
  const apiUrl  = "/data-api/rest/Invoices"
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'text/plain',
    },
    body: test
});

}

//Fetch Data from API

async function getDummyData() {
  //const apiUrl = "https://localhost:5001/rest/GetInvoiceCountCountryWise"
  const apiUrl  = "/data-api/rest/GetInvoiceCountCountryWise"; //AZURE URL
  const response = await fetch(apiUrl)
  
  const barChatData = await response.json()
  
  const total = barChatData.value.map((x) => x.count)
  
  const country = barChatData.value.map((x) => x.BillingCountry)
  
 invoiceCountryData = total
 billingCountry = country
}


