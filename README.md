# Your startup name here
NearbySitter

[My Notes](notes.md)

NearbySitter is a web application that helps parents find babysitters near their location. Babysitters can create profiles that include information such as experience, availability, hourly rate, and a short introduction. Parents can browse available babysitters, view their profiles, and send requests for childcare.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

### Elevator pitch

Finding a trustworthy babysitter can be stressful and time-consuming. NearbySitter makes it easier for parents to find babysitters near them based on availability, experience, and location. Parents can quickly browse sitter profiles, view important details, and send babysitting requests. Babysitters can also manage their availability and receive realtime notifications when a parent sends a request.

### Design

![Design image](placeholder.png)

The application will have several main screens:

Login / registration page
Babysitter search page
Babysitter profile page
Request page
User profile page

The search page will display babysitters near the user, along with information such as their experience, hourly rate, availability, and approximate location.


sequenceDiagram
    actor Parent
    actor NearbySitter
    actor Babysitter

    Parent->>NearbySitter: Search for nearby babysitters
    NearbySitter->>Parent: Display available babysitters
    Parent->>NearbySitter: Send babysitting request
    NearbySitter->>Babysitter: Send realtime request notification
    Babysitter->>NearbySitter: Accept or decline request
    NearbySitter->>Parent: Update request status
### Key features

Users can create an account and log in
Babysitters can create a profile
Babysitters can list their experience, hourly rate, and availability
Parents can search for babysitters near them
Parents can view babysitter profiles
Parents can send babysitting requests
Babysitters can accept or decline requests
Users can receive realtime updates about babysitting requests
The application will work on desktop and mobile devices
### Technologies

I am going to use the required technologies in the following ways.

- **HTML** -HTML will provide the structure for login forms, user profiles, sitter cards, search forms, buttons, and request information
- **WebSocket placeholder** - The messages page displays a realtime chat placeholder for communication between users.
- **CSS** - CSS will be used to style the application and make it responsive on desktop and mobile devices. It will control layout, colors, spacing, sitter cards, forms, and buttons.
- **React** - React will be used to create reusable components such as Login, SitterCard, SitterProfile, Search, RequestForm, and UserProfile. React routing will allow users to move between different views of the application.
- **Service** - The backend service will provide endpoints for registration, login, logout, retrieving babysitter profiles, searching for babysitters, sending requests, and updating request status.

The application will also use a third-party geolocation or mapping API to help determine approximate user locations and display nearby babysitters.
- **DB/Login** - The database will store user accounts, login information, babysitter profiles, availability, hourly rates, locations, and babysitting requests.
- **WebSocket** - WebSocket will provide realtime updates. When a parent sends a babysitting request, the babysitter can receive the request immediately. When the babysitter accepts or declines it, the parent can see the updated status without refreshing the page.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **HTML pages** - I did not complete this part of the deliverable.
- [x] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [x] **Links** - I did not complete this part of the deliverable.
- [x] **Text** - I did not complete this part of the deliverable.
- [x] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [x] **Images** - I did not complete this part of the deliverable.
- [x] **Login placeholder** - I did not complete this part of the deliverable.
- [x] **DB data placeholder** - I did not complete this part of the deliverable.
- [x] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
