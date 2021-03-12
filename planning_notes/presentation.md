## Presentation outline

- Begins with Preeti introducing the project
- Maybe a paraphrase of what's in the readme:
- "Snack the Planet is a full stack food ordering web application for a trendy new ficticious restaurant. Customers can visit the site, order items, and their order will be sent to the restaurant via SMS. The restaurant returns a wait time for the customer via SMS which is also displayed on the UI. When the wait time elapses, the customer is notified via the UI. "

- Preeti will be the 'driver', sharing their screen and clicking around

# Sample order flow

## Liam, as the customer:
- begins by checking out the menu items
- What do I want to eat? (Scan menu items)
- I'd like these items (Add to cart)
- Hmm, I wonder if any of these items have cheese (use search for cheese)
- Well, time to checkout (go to cart)
- Oh, actually I don't want a burger anymore (Remove item)
- Ok, time to checkout! (place order)

## Kyle, as the restaurant:

- I've recieved an order (receives text message with order details)
- I'll let them know how long the wait is going to be (send text with wait time)

## Liam, as the customer:
- I got the text from the restaurant (show text)
- Explain Twilio integration

## Kyle, as the restaurant:
- Now the UI will update with the customer's wait time
- Explain what's going on in the routes or backend, like how the set interval was implemented, or how the orders work while the progress bar is counting down

## Explanation of roles (not sure who wants to do this part)
- Preeti: Front End and styling
- Kyle: Took lead on back end
- Liam: Twilio integration, collaborated with Kyle on back end
- Workflow: Frequent peer programming and check-ins to sync workflow, integrate front and backend and commits






