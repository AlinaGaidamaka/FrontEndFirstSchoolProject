# FrontEndFirstSchoolProject
# Project description

Project aims to create a SPA for a shopping list application. User will be able to:

-	include items to the shopping list from predefined categories;
-	search items from categories;
-	add items by typing them to a form;
-	checked and unchecked individual items;
-	delete one item or empty whole shopping list;
-	the list will stay in the browser’s local storage even between the sessions

Back end:

-	Node.js server have been provided by school
-	Predefined products from categories have been saved to JSON text and then fetched from the server by using AJAX

JavaScript:

can be found in the file FrontEndProjectJavaScript.js. This file includes all the core functionalities of our solution. 
A couple of highlights about the code:

-	Shopping list is sorted alphabetically (compareProduts)
-	Searching function (searchCategoriesItem) includes also a notification if a product is not found
-	Accessing DOM, dynamically changing document structure and content (HTML elements and attributes)
-	Using this as DOM on-event handler to call back add function on certain button click action
-	JavaScript functions are reused (only different function’s parameters are specified)
-	Global variables have been defined on the top, long enough descriptive variable and function names are in use.

jQuery functionalities:

-	div categories to enable slide toggle depending on click and 
-	to show the tooltip in the form fields on hove
-	call back search function by keypress action (enter)
-	call back delete function on curtain button click action

AJAX: request and receive data from a server - after the page has loaded

HTML5 AP: permanent local storage has been included via HTML5 API.

HTML Semantics: the <meta> tags at the HTML head section help in search engine optimization by defining description, keywords and authors. The structure of body includes semantic elements such as header and footer.

Styling: have used Bootstrap (http://getbootstrap.com) for easy responsiveness and its preformatted styling for buttons, forms etc. 

