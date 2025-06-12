Write the missing functionality of this user interface. The functionality is divided in the following steps: 
Your Task
Write the missing JavaScript code to make the Vacation Schedule work as expected:
All fields (First Name, Last Name, From Date and To Date) are filled with the correct input
•	First Name, Last Name, From Date and To Date are non-empty strings. If any of them is empty or the vacation period is invalid, the program should not do anything.
•	For the vacation period to be valid, the start date must be before the end date.
1.	Getting the information from the form  
•	On clicking the ["Next"] button the information from the input fields is listed in the "Vacation info" section. For the input fields a list item is added to the "info-list" unordered list. 
•	The text format and order for the list item should be the same as on the picture below.  
•	When the button is clicked, the input fields must be cleared and the ["Next"] button must be disabled. At the same time the ["Edit"] and the ["Continue"] buttons must be added. 
The HTML structure looks like this:  
 
2.	Edit
The functionality here is the following: 
•	When the "Edit" button is clicked, all of the information is loaded in the input fields from step 1 and all buttons in preview section are removed while the ["Next"] button is enabled again.
 
•	The list items must be removed from the "info-list" and all of the information must go back to the input fields again. 
 
3.	Continue
•	When the "Continue" button is clicked, the information from "info-list" unordered list must be transferred to "confirm-list" in the same HTML structure. For you, this means removing everything inside of the ul with class = "info-list" and adding in "confirm-list", the list item with same information and "Confirm" and the "Cancel" buttons must be added.
 
•	This is HTML structure of "confirm-list" unordered list:
 
4.	Confirm/Cancel
•	When the "Confirm" or "Cancel" button is clicked, the list item must be removed,  from the "confirm-list", the ["Next"] button is enabled again you must add new class and add text to <h1> element with id="status".If "Confirm" button is clicked class must be "vacation-confirmed" and text is "Vacation Requested". If "Cancel" button is clicked class must be "vacation-cancelled" and text is "Cancelled Vacation".

 
5.	Reload
•	On clicking the <h1> element with id="status", you must reload the page.
Submission
Submit only yours solve() function.
