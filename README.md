# MuralPay

This project is deployed for github pages at this [URL](https://damianbejaque.github.io/muralpay)

#How Does It Work?
Application Flow
If the owner of the API key does not have any customers with the status "COMPLETE", they will be unable to access the full application. Instead, they will be redirected to "/muralpay/create-customer" to create a customer.
![image](https://github.com/user-attachments/assets/3509715a-6e6e-4b1e-a12d-fa96ec0b37fb)
Once a customer with the "COMPLETE" status is available, a dropdown menu will appear, allowing the user to select any customer in this state.
![image](https://github.com/user-attachments/assets/9e9e15ca-f373-4f98-9893-02f36a7a1502)

After selecting a customer, the user will be redirected to the dashboard.
![image](https://github.com/user-attachments/assets/e41140fd-56cd-47e7-a3d7-7676019f7b7e)
Account Details
If the user has not yet joined the application and verified their data, clicking on "Account Details" will not display full information for the "Deposit Account".
Example:
![image](https://github.com/user-attachments/assets/2acd80b2-a77a-4dc2-a1f0-4b8e35810465)

#Transfer Requests
Clicking on "Transfer Request" in the sidebar will navigate the user to a dashboard displaying a table of all current requests for the selected customer.

To create a new transfer request, the user can click on the "Create Transfer" button, which opens a form for submitting a new request.
![image](https://github.com/user-attachments/assets/1ad91924-c805-47d6-b00c-6c2f39ea4ded)

To approve or cancel a request, the user simply needs to click on the respective option, which will send the corresponding request.
![image](https://github.com/user-attachments/assets/17a95404-fbc0-4117-87e5-127ae30ca2f0)

If the action is successful, a confirmation popup will display the updated status.
