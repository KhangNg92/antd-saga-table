This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React-Khang

In the project directory, you can run:

### Install packages

`npm i`

### Get Server running

`npm run server`

### Get Client running

`npm start`

## UI Components:
	•	Table
	•	Modal
	•	Forms (2)
	•	Dummy Payment Form
	•	Dummy Credit Form

## Use case:
	-	Fetch Application Config from an end point (Call 1)
	-	Fetch all invoices from an end point. (Call 2)
	-	Fetch vendors from another end point (Call3) 
	-	Merge Data (PostProcessor) – A function to normalize / filter and do any data massage.
	-	Display it on the table. Columns to Display will come from Configuration from Call1
	-	Last column of the table will have a button (Payment Button).
	-	Payment button will be enabled only if there if Amount Due is > 0
	-	When Payment Button is clicked, a modal is shown
	-	Modal workflow:
	-	Modal will be a separate component – that will be loaded on button click
	-	What component the modal will load will be based on the following condition
	-	If there is credit available with the vendor -> Ask user if he wants to apply available credit (whether Credit Adjustment can be used or not will be dependent on config. If we set credit adjustment enabled to false in config, user will not be able to use credit)
	-	Once Credit is applied, if there is still amount Due, then continue the flow (load next payment component), where user can make remaining payment due. In this the amount to be paid should be (original Amount Due – credit applied).
	-	Once This entire flow is complete, show the new amount Due in the table
	-	If the amount Due now becomes 0, then Disable button. 

Call 1
`/app/config, GET`
This will be left to your imagination, it should contain all of the application config, including all the end points that you need to call. During the demo in the config, we can change call 2 end point to /invoices/v2 and this should not require any change in code. We also can change, what columns can be shown in table. The config also enables or disables credit adjustment. Design wise it is important to separate configuration for component (example what columns to show and what end points to call) and Business Logic config (enable / disable credit adjustment).

Call 2
`/invoices , GET`
Use supplied Data
Call 3
`/vendors , GET`
Use Supplied Data
Call 4 (Credit Call)
`/credit/apply , POST`
 This will be observed in the Network tab
Call 5 (Payment)
`/payment , POST`
This will be observed in the Network tab


## Data Flow:

Call 1 (Get Config) -> Call2 (Call Data Api) , Call 3 (Call vendor API) 2 and 3 should be in parallel -> PostProcessor (A function to normalize data and filter data) -> Render Table

