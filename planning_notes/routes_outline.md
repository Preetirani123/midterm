* As a user, when I visit the website I will see the menu items 
* I can pick items in this menu
* The menu item will go into the cart when I click
* As a user, I can select multiple menu items and add them to my order
* I can review my order by clicking on the cart, it will refresh UI to display my order so I can review it, and check out
* When I review my order, I can input my name and phone number and click 'order' to submit my order
* When the user submits order, the user table is populated with an auto-incrementing user_id, the name and phone number
* As a user, when I submit my order, the UI will refresh to display the order time, and I will recieve an SMS confirming the same information, and I will be able to navigate back to the menu via link

<!-- Main menu
Cart/Order review 
Order submitted page/Cooking time page -->

One user can only make one order (at a time)
One order can have many menu items 

[user] ----- [order] ----< [menu]

### MENU
Display menu 

GET /menu

### ORDER (CART)

On submit push JS object with menu items in it to order table
Twillo SMS to user phone# to confirm order
Twillo async call for SMS when food is 'ready'

POST /orders

### ORDER PROCESSED

Display order processed page

GET /orders:id


