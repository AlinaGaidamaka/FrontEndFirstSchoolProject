//----------------------------Categories functions --------------------------------------------
//Global variables
var urlStart = "http://myy.haaga-helia.fi/~a1603167/images/";
var JSONtext = "[]";
var categories;
var searchDiv = document.getElementById("searchDiv");
var dailyElement = document.getElementById("daily");
var fruitVegetableElement = document.getElementById("fruitVegetable");
var meatElement = document.getElementById("meat");
var seafoodElement = document.getElementById("seafood");
var houseElement = document.getElementById("house");
var breakfastElement = document.getElementById("breakfast");
var bakeryElement = document.getElementById("bakery");
var frozenElement = document.getElementById("frozen");
var snacksElement = document.getElementById("snacks");
var beveragesElement = document.getElementById("beverages");
var pastaElement = document.getElementById("pasta");
// Global variables for shopping list
var shoppingListArray = [];
var checkedListArray = [];
var divShoppingListElement = document.getElementById("shoppingList");
var divChechedListElement = document.getElementById("checkedShoppingList");

function createAndReturnCategoryDivElement(isAlone,containerElement) {
    var divElement = document.createElement("div");
    var imgElement = document.createElement("img");
    var tableElement = document.createElement("table");
    var button = document.createElement("button");
    var row = tableElement.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.appendChild(imgElement);
    cell2.innerHTML = categories[isAlone].product;
    cell3.innerHTML = categories[isAlone].category;
    cell4.appendChild(button);
    divElement.appendChild(tableElement);
    containerElement.appendChild(divElement);
    //Element Attributies
    imgElement.setAttribute("src", urlStart + categories[isAlone].imageFileName);
    imgElement.setAttribute("class", "categoryImageList");
    // Button Attributes
    button.innerText = "Add";
    button.setAttribute("id", isAlone);
    button.setAttribute("onclick", "addProductToShoppingList(this.id);");
    button.setAttribute("class", "btn btn-success");
}

//Return all object from CATEGORIES depending on a category attribute

function listCategoriesOnPage() {
    categories = JSON.parse(JSONtext);
    for (i = 0; i < categories.length; i++) {
        if (categories[i].category == "Daily") {
            createAndReturnCategoryDivElement(i, dailyElement);
        }
        if (categories[i].category == "Fruit & vegetable") {
            createAndReturnCategoryDivElement(i, fruitVegetableElement);
        }
        if (categories[i].category == "Meat") {
            createAndReturnCategoryDivElement(i, meatElement);
        }
        if (categories[i].category == "Seafood") {
            createAndReturnCategoryDivElement(i, seafoodElement);
        }
        if (categories[i].category == "Household & cleaning") {
            createAndReturnCategoryDivElement(i, houseElement);
        }
        if (categories[i].category == "Breakfast & cereal") {
            createAndReturnCategoryDivElement(i, breakfastElement);
        }
        if (categories[i].category == "Bakery") {
            createAndReturnCategoryDivElement(i, bakeryElement);
        }
        if (categories[i].category == "Frozen food") {
            createAndReturnCategoryDivElement(i, frozenElement);
        }
        if (categories[i].category == "Snacks Crisps") {
            createAndReturnCategoryDivElement(i, snacksElement);
        }
        if (categories[i].category == "Beverages Soda") {
            createAndReturnCategoryDivElement(i, beveragesElement);
        }
        if (categories[i].category == "Pasta & rice") {
            createAndReturnCategoryDivElement(i, pastaElement);
        }
    }
}

//Featch JSON from server to JSONtext

function fetchCategoryJSONTextFromNodeBackEndOnce() {
    $.ajax(
        {
            type: "GET",
            url: "http://proto451.haaga-helia.fi/6167/products",
            success: function (data, xhr) {
                JSONtext = data;
                console.log("Http Status code was: " + xhr.status);
                listCategoriesOnPage();
            },
            error: function (xhr) {
                console.log("Error: Http Status code was: " + xhr.status);
                listCategoriesOnPage();
            }
        }
    );
}

fetchCategoryJSONTextFromNodeBackEndOnce();

// Enable QJuery in div categories to slide depending on click

$(document).ready(function () {
    $("#categories").on("click", "button", function () {
        $(this).nextAll("div.classCategoties:first").slideToggle();
    });
});

//Add Product to Shopping List

function addProductToShoppingList(clicked_id) {
    newProduct = categories[clicked_id].product;
    newQuantity = categories[clicked_id].quantity;
    newType = categories[clicked_id].type;
    shoppingListArray.push(new shoppingList(newProduct, newQuantity, newType));
    //Save to Local Store
    writeAddedItemToLocalStorage();
    shoppingListArray.sort(compareProduts);
    divShoppingListElement.innerHTML = "";
    shoppingListOnPage(divShoppingListElement, shoppingListArray);
    searchDiv.innerHTML = "";
    document.getElementById("searchInput").value = "";
}

// Search Product in Categories

function searchCategoriesItem() {
    var x;
    var searchString = document.getElementById("searchInput").value.toUpperCase();
    var index = categories.findIndex(x => x.product == searchString);
    if (index > -1) {
        createAndReturnCategoryDivElement(index, searchDiv);
    }
    else {
        document.getElementById("searchDiv").innerHTML = "Product not found in categories";
        document.getElementById("searchInput").value = "";
    }
}

$("#searchInput").keypress(function (e) {
    if (e.which == 13) {
        searchCategoriesItem();
    }
});
//-------------------------------------------Shoping List functions -------------------------------

function shoppingList(product, quantity, type) {
    this.product = product;
    this.quantity = quantity;
    this.type = type;
    this.toString = function () {
        return this.quantity + "  " + this.type
    }
}

//Sort the Shopping List

function compareProduts(a, b) {
    var difference = b.product.toLocaleUpperCase().localeCompare(a.product.toLocaleUpperCase());
    if (difference !== 0) {
        return difference;
    }
}

// List Shopping List On Page

function shoppingListOnPage(motherElement,listArray) {
    for (i = 0; i < listArray.length; i++) {
        var button = document.createElement("button");
        var row = motherElement.insertRow(0);
        var inputElement = document.createElement("input");
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.appendChild(inputElement);
        cell2.innerHTML = listArray[i].product;
        cell3.innerHTML = listArray[i].quantity + " " + listArray[i].type;
        cell4.appendChild(button);
        // Input Attributes
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("data-input", i);
        // Button Attributes
        button.innerText = "Delete";
        button.setAttribute("data-button", i);
        button.setAttribute("class", "btn btn-danger");
    }
}

readAddedItemFromLocalStorage();
readCheckedItemFromLocalStorage();
ckechedListOnPage();
shoppingListOnPage(divShoppingListElement, shoppingListArray);

// Add new Item to Shopping List

function addItemToShoppingList() {
    var newProduct = document.getElementById("product").value;
    var newQuantity = document.getElementById("quantity").value;
    var newType = document.getElementById("type").value;
    var tempShoppingList = new shoppingList(newProduct,newQuantity,newType);
    shoppingListArray.push(tempShoppingList);
    writeAddedItemToLocalStorage();
    shoppingListArray.sort(compareProduts);
    divShoppingListElement.innerHTML = "";
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("type").value = "";
    shoppingListOnPage(divShoppingListElement, shoppingListArray);
}

//Empty whole Shopping List

function emptyList() {
    shoppingListArray = [];
    checkedListArray = [];
    localStorage.removeItem("shoppingListArrayString");
    localStorage.removeItem("checkedListArrayString");
    divShoppingListElement.innerHTML = "";
    shoppingListOnPage(divShoppingListElement, shoppingListArray);
    divChechedListElement.innerHTML = "";
    shoppingListOnPage(divChechedListElement, checkedListArray);
    divShoppingListElement.innerHTML = "List is empty";
}

//Delete One Item From the Shopping List On DELETE click

$(document).ready(function () {
    $("#shoppingList").on("click", "button", function () {
        $(this).closest("tr").remove();
        var theClass = $(this).attr("data-button");
        shoppingListArray.splice(theClass, 1);
        writeAddedItemToLocalStorage();
        divShoppingListElement.innerHTML = "";
        shoppingListOnPage(divShoppingListElement, shoppingListArray);
    });
});

// Move Shopping List Item on CHECKBOX to checked section

$(document).ready(function () {
    $("#shoppingList").on("click", "[type=checkbox]", function () {
        $(this).closest("tr").remove();
        var number = $(this).attr("data-input");
        checkedListArray.push(shoppingListArray[number]);
        writeCheckedListArrayToLocalStorage();
        shoppingListArray.splice(number, 1);
        writeAddedItemToLocalStorage();
        divShoppingListElement.innerHTML = "";
        shoppingListOnPage(divShoppingListElement, shoppingListArray);
        divChechedListElement.innerHTML = "";
        ckechedListOnPage();
    });
});

function oncheckMoveItem(checkbox) {
    if (checkbox.checked == true) {
        var abs = document.getElementsByName("checkbox");
    }
}

function ckechedListOnPage() {
    for (i = 0; i < checkedListArray.length; i++) {
        var row = divChechedListElement.insertRow(0);
        var inputElement = document.createElement("input");
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.appendChild(inputElement);
        cell2.innerHTML = checkedListArray[i].product;
        cell3.innerHTML = checkedListArray[i].quantity + " " + checkedListArray[i].type;
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("checked", "checked");
    }
}

// Bootstrap tooltip functionality

$(document).ready(function () {
    $("[data-toggle='tooltip']").tooltip();
});

//------------------------------------------Local Storage---------------------------------------------------------
//Shoping List

function writeAddedItemToLocalStorage() {
    var JSONshoppingList = JSON.stringify(shoppingListArray);
    console.log("JSON text out for shopping list: "+ JSONshoppingList);
    localStorage.setItem("shoppingListArrayString", JSONshoppingList);
}

function readAddedItemFromLocalStorage() {
    var JSONshoppingList = String( localStorage.getItem("shoppingListArrayString") );
    console.log("JSON text in to shopping list: " + JSONshoppingList);
    if (JSONshoppingList != null && JSONshoppingList != "null" && JSONshoppingList.length > 0)
    {
        shoppingListArray = JSON.parse(JSONshoppingList);
    }
    else {
        shoppingListArray = [];
    }
}
//Checked List

function writeCheckedListArrayToLocalStorage() {
    var JSONcheckedList = JSON.stringify(checkedListArray);
    console.log("JSON text out for checked items: "+ JSONcheckedList);
    localStorage.setItem("checkedListArrayString", JSONcheckedList);
}

function readCheckedItemFromLocalStorage() {
    var JSONcheckedList = String( localStorage.getItem("checkedListArrayString") );
    console.log("JSON text in for checked list: " + JSONcheckedList);
    if (JSONcheckedList != null && JSONcheckedList != "null" && JSONcheckedList.length > 0)
    {
        checkedListArray = JSON.parse(JSONcheckedList);
    }
    else {
        checkedListArray = [];
    }
}


