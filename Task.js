let url = "https://restcountries.com/v3.1/all";

let fetchItems = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    console.log(response.status);
    resstatus = response.status;
    throw new Error(`Error! status: ${response.status}`);
  }
};

// MFetch url for contries
fetchItems(url)
  .then((countryList) => fetchSuccess(countryList))
  .catch((error) => console.log(error));

function fetchSuccess(data) {
  let filteredOne = data.filter((country) => country.region == "Asia");

  console.log("------------------- Asian countries ---------------------");
  filteredOne.forEach((country) => console.log(country.name.common));

  console.log(
    "-------------------- Population Less than 200000 -------------------",
  );
  let filterTwo = data.filter((country) => country.population < 200000);
  filterTwo.forEach((country) => console.log(country.name.common));

  console.log(
    "----------------------- Print details ------------------------------",
  );
  data.forEach((country) =>
    console.log(
      `Name: ${country.name.common}, Capital: ${country.capital}, Flag: ${country.flag}`,
    ),
  );

  console.log(
    "---------------------  Countries using US dollars -----------------------------------",
  );
  let i = 0;
  data.forEach((country) => {
    let currencyObj = country.currencies;

    // console.log(currencyObj);
    if (currencyObj) {
      if (Object.keys(currencyObj)[0] == "USD") {
        i++;
        console.log(`${i}: ${country.name.common}`);
      }
    }
  });

  console.log(
    "----------------- Total Population ----------------------------",
  );
   const population = data.reduce((acc, element) => {
     return acc + element.population;
   }, 0);
  console.log("Total Population: " + population);
}
