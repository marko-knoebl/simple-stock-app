apiBase = "https://api.iextrading.com/1.0/";

const mainElement = document.getElementById("main");
const inputElement = document.getElementById("symbol");
const formElement = document.getElementById("stock-form");

let stockData;

const resetStockData = () => {
  stockData = { symbol: undefined, price: undefined, image: undefined };
};

resetStockData();

const updateView = () => {
  mainElement.innerHTML = `
  <h2>${stockData.symbol}</h2>
  <h3>${stockData.price}</h3>
  <img src="${stockData.image}">
`;
};

const handleSubmit = submitEvent => {
  submitEvent.preventDefault();
  resetStockData();
  const symbol = inputElement.value;
  stockData.symbol = inputElement.value;
  fetch(apiBase + `stock/${symbol}/price`)
    .then(data => data.json())
    .then(price => {
      stockData.price = price;
      updateView();
    })
    .catch(console.log);
  fetch(apiBase + `stock/${symbol}/logo`)
    .then(data => data.json())
    .then(image => {
      stockData.image = image.url;
      updateView();
    })
    .catch(console.log);
};
formElement.addEventListener("submit", handleSubmit);
