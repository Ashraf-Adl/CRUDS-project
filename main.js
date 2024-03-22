// *inputs variables

const nameI = document.getElementById("nameInput");
const price = document.getElementById("priceInput");
const taxes = document.getElementById("taxesInput");
const ads = document.getElementById("adsInput");
const discount = document.getElementById("discountInput");
const count = document.getElementById("countInput");
const category = document.getElementById("categoryInput");
const total = document.getElementById("total");
const totalParent = document.getElementById("totalParent");
const createBtn = document.getElementById("createBtn");
let errorMsg = document.getElementById("error");
const searchName = document.getElementById("searchN");
const searchCat = document.getElementById("searchC");
const searchInput = document.getElementById("searchInput");

let mood = "create";
let tmp;
// *calculate the total
function clcTotal() {
  let result = 0;
  if (price.value != 0) {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    totalParent.style.backgroundColor = "green";
  } else {
    total.innerHTML = result;
    totalParent.style.backgroundColor = "#76abae";
  }

  return result;
}
// * check if the inputs are empty

let createClick = (createBtn.onclick = function () {
  const primaryInputs = [nameI.value, price.value, category.value];
  const checkEmpty = primaryInputs.every((value) => value != "");

  if (checkEmpty == true) {
    create();
    errorMsg.style.display = "none";
    nameI.style.outline = "none";
    price.style.outline = "none";
    category.style.outline = "none";
    totalParent.style.backgroundColor = "#76abae";
  } else {
    errorMsg.style.display = "block";
    nameI.style.outline = "red solid 1px";
    price.style.outline = "red solid 1px";
    category.style.outline = "red solid 1px";
  }

  return checkEmpty;
});

// * sava the product information in the local storage

let prodata;

if (localStorage.prodata != null) {
  prodata = JSON.parse(localStorage.prodata);
} else {
  prodata = [];
}

function create() {
  const total = clcTotal();

  const proInfo = {
    name: nameI.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "create") {
    if (proInfo.count > 1) {
      for (let i = 0; i < proInfo.count; i++) {
        prodata.push(proInfo);
      }
    } else {
      prodata.push(proInfo);
    }
  } else {
    prodata[tmp] = proInfo;
    mood = "create";
  }

  localStorage.setItem("prodata", JSON.stringify(prodata));

  displayData();
  clear();
  //? the after clicking the update btn
  createBtn.innerHTML = "Create";
  count.style.display = "inline-block";
}

// * clear the data

function clear() {
  nameI.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = 0;
}
// * show data in table

function displayData() {
  let table = "";

  for (let i = 0; i < prodata.length; i++) {
    table += `
  <tr>
      <td>${i + 1}</td>
      <td>${prodata[i].name}</td>
      <td>${prodata[i].price}</td>
      <td>${prodata[i].taxes}</td>
      <td>${prodata[i].ads}</td>
      <td>${prodata[i].discount}</td>
      <td>${prodata[i].total}</td>
      <td>${prodata[i].category}</td>
      <td><button onclick="update(${i})">update</button></td>
      <td><button onclick="deleteRow(${i})">delete</button></td>
  </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  document.getElementById("proAmount").innerHTML = `[${prodata.length}]`;

  const dltBtn = document.getElementById("dltBtn");
  prodata.length != ""
    ? (dltBtn.style.display = "inline-block")
    : (dltBtn.style.display = "none");
}
displayData();

// !delete
function deleteRow(i) {
  prodata.splice(i, 1);
  localStorage.setItem("prodata", JSON.stringify(prodata));

  // ? dltBtn display
  if (prodata.length == 0) {
    dltBtn.style.display = "none";
  }

  displayData();
}

dltBtn.onclick = function () {
  prodata = [];
  localStorage.setItem("prodata", JSON.stringify(prodata));
  displayData();
};
// *Update

function update(i) {
  nameI.value = prodata[i].name;
  price.value = prodata[i].price;
  taxes.value = prodata[i].taxes;
  ads.value = prodata[i].ads;
  discount.value = prodata[i].discount;
  category.value = prodata[i].category;

  createBtn.innerHTML = "update";
  count.style.display = "none";
  mood = "update";

  scroll({
    top: 0,
    behavior: "smooth",
  });

  clcTotal();
  displayData();
  tmp = i;
}

// *search
let searchMood = "name";

function searchMoodSet(id) {
  if (id === "searchC") {
    searchMood = "Category";
    searchInput.placeholder = "search by Category";
  } else {
    searchMood = "name";
    searchInput.placeholder = "search by name";
  }
  searchInput.focus();

  searchInput.value = "";
  displayData();
}

function searchTable(value) {
  console.log(value);
  let table = "";

  if (searchMood === "name") {
    for (let i = 0; i < prodata.length; i++) {
      if (prodata[i].name.includes(value.toLowerCase())) {
        table += `
  <tr>
      <td>${i + 1}</td>
      <td>${prodata[i].name}</td>
      <td>${prodata[i].price}</td>
      <td>${prodata[i].taxes}</td>
      <td>${prodata[i].ads}</td>
      <td>${prodata[i].discount}</td>
      <td>${prodata[i].total}</td>
      <td>${prodata[i].category}</td>
      <td><button onclick="update(${i})">update</button></td>
      <td><button onclick="deleteRow(${i})">delete</button></td>
  </tr>
    `;
      } else {
      }
    }
  } else {
    for (let i = 0; i < prodata.length; i++) {
      if (prodata[i].category.includes(value.toLowerCase())) {
        table += `
  <tr>
      <td>${i + 1}</td>
      <td>${prodata[i].name}</td>
      <td>${prodata[i].price}</td>
      <td>${prodata[i].taxes}</td>
      <td>${prodata[i].ads}</td>
      <td>${prodata[i].discount}</td>
      <td>${prodata[i].total}</td>
      <td>${prodata[i].category}</td>
      <td><button onclick="update(${i})">update</button></td>
      <td><button onclick="deleteRow(${i})">delete</button></td>
  </tr>
    `;
      } else {
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
