Snack the Planet is a full stack food ordering web application for a trendy new ficticious restaurant. Customers can visit the site, order items, and their order will be sent to the restaurant via SMS. The restaurant returns a wait time for the customer via SMS which is also displayed on the UI. When the wait time elapses, the customer is notified via the UI. 

!["screenshot menu"](https://github.com/brjl/midterm/blob/master/public/image/browser-menu.png)
!["screenshot cart"](https://github.com/brjl/midterm/blob/master/public/image/browser-cart.png)
!["screenshot order"](https://github.com/brjl/midterm/blob/master/public/image/browser-pickup.png)

## Features

- Users can view Snack the Planet's menu
- Users can select various menu items and add them to their cart
- The cart can contain one or more items, and multiple quantities
- Users can place an order, which will then notify the restaurant of the order details via SMS
- The restaurant can send back an order time estimate to the user via SMS
- The order time will update on the app, along with a progress bar displaying the time to completion
- When the time elaspses, the UI will update to state the user's order is ready for pickup
- The user can select a 'quick order' which will add the user's last order to the cart

## Getting Started

[You can visit Snack the Planet at our website](http://snack-the-planet.herokuapp.com/)

For localhost set up, we recommend:

1. Create an .env file with your correct local information (including your Twilio account info)
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB, then create the tables and seed
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Warning

- This project was completed using a trial version of Twilio. As such only approved phone numbers can send and receive texts from the live version of our restaurant app.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-parser
- Twilio
- Sass
- Ejs
- Express
- Morgan
- dotenv
- chalk
- nodemon

