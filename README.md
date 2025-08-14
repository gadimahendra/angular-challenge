
## Overview?

This is a simple web app built with Angular that lets you look up aircraft information. You can search by:

- **Registration code** (like the plane’s tail number)
- **Callsign** (the flight’s radio identifier)

You can enter one or more values at once (comma separated) and see the results 


## Technologies used

- Angular 18 (standalone components)
- Angular Material (UI components like cards, buttons, radios, snackbar)
- Reactive Forms for form control
- HttpClient to call the API
- RxJS

## ENV
- Base API URL managed via environment config
- To avoid CORS (Cross-Origin Resource Sharing) issues during development, I used a proxy configuration in Angular.
- I used a proxy setup to bypass CORS issues when making API requests during local development.


## How to use

1. Choose whether you want to search by **Registration Aircraft** or **Callsign** using the radio buttons.
2. Enter one or more codes separated by commas.
3. The **Search** button is **disabled by default** and will only become enabled after you enter the code
4. Click the **Search** button.
5. View the aircraft or flight details in the Mat card.
6. If any value is not found, an error message will be shown for that entry, including a notification using a snackbar

## Example Codes

You can use these codes to try the search:

- **Registration Aircraft** (aircraft codes):  
  39640B, C8236E, A0138A, 0D08A5

- **Callsign** (flight codes):  
  DLH18Y, EDW78, AAL2781, RYR91MQ

## How to Get the Repo, Install, and Run Locally

1. **Clone the repository**  
   Open a terminal and run:
   ```bash
   git clone https://github.com/gadimahendra/angular-challenge.git
   cd angular-challenge
   npm install
   ng serve 



