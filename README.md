# name and website
NearbySitter
https://startup.findbabysitters.click


[My Notes](notes.md)

NearbySitter is a web application that helps parents find babysitters near their location. Babysitters can create profiles that include information such as experience, availability, hourly rate, and a short introduction. Parents can browse available babysitters, view their profiles, and send requests for childcare.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

### Elevator pitch

Finding a trustworthy babysitter can be stressful and time-consuming. NearbySitter makes it easier for parents to find babysitters near them based on availability, experience, and location. Parents can quickly browse sitter profiles, view important details, and send babysitting requests. Babysitters can also manage their availability and receive realtime notifications when a parent sends a request.

### Design

![Design image](NearbySitter.png)

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

- [x] **Rented EC2 server** - I complete this part of the deliverable.
- [x] **Leased domain name** - I complete this part of the deliverable.
- [x] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **HTML pages** - I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **Proper HTML element usage** - I complete this part of the deliverable.
- [x] **Links** - I complete this part of the deliverable.
- [x] **Text** - I complete this part of the deliverable.
- [x] **3rd party API placeholder** - I complete this part of the deliverable.
- [x] **Images** - I complete this part of the deliverable.
- [x] **Login placeholder** - I complete this part of the deliverable.
- [x] **DB data placeholder** - I complete this part of the deliverable.
- [x] **WebSocket placeholder** - I complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [x] **Use of a CSS framework** - I completed this part of the deliverable.
- [x] **All visual elements styled using CSS** - I did complete this part of the deliverable.
- [x] **Responsive to window resizing using flexbox and/or grid display** - I did complete this part of the deliverable.
- [x] **Use of a imported font** - I did complete this part of the deliverable.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **Bundled using Vite** - I did complete this part of the deliverable.
- [x] **Components** - I did complete this part of the deliverable.
- [x] **Router** - I did complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **All functionality implemented or mocked out** - I did complete this part of the deliverable.
- [x]

## 🚀 Service deliverable

- [x] **Simon Service** is running on AWS. The public home page and authenticated API guard were verified. [Simon Service](https://simon.findbabysitters.click)
- [x] **Node.js and Express** serve the Startup API on port 4000 by default.
- [x] **Static frontend** is served from the backend's `public` directory after deployment. Express returns the React entry point for routes such as `/search`.
- [x] **Third-party API** supplies the quote shown on the home page using a browser fetch to `https://quote.cs260.click`.
- [x] **Backend endpoints** provide sitter listings, bookings, messages, and account profiles.
- [x] **Frontend integration** connects Search to sitter listings and booking submission, Messages to conversation history and sending, and Profile to loading and saving account details.
- [x] **Authentication** supports account creation, login, logout, and protected endpoints using an HTTP-only session cookie.
- [x] **BCrypt** hashes passwords during registration and checks the hash during login.

| Feature | Endpoints |
| --- | --- |
| Account | `POST /api/auth/create`, `POST /api/auth/login`, `GET /api/auth/me`, `DELETE /api/auth/logout` |
| Search | `GET /api/sitters` |
| Bookings | `GET /api/bookings`, `POST /api/bookings` |
| Messages | `GET /api/messages`, `POST /api/messages` |
| Profile | `GET /api/profile`, `PUT /api/profile` |

The service uses sample sitter profiles and automatic demo replies. Accounts, messages, bookings, and profile changes are stored in memory and reset when the service restarts.

### Run locally

```sh
npm ci
npm ci --prefix service
node service/index.js
```

In another terminal, run `npm run dev` and open `http://localhost:5173`. Vite proxies browser requests under `/api` to Express. Run `npm run build` to verify the production bundle. Vite serves the React entry point for direct visits to `/search`, `/messages`, and `/profile`.

### Verification

- The local API check covered registration, login and logout, protected routes, user isolation, booking creation, message delivery with a demo reply, and profile updates.
- The browser check covered the Vite proxy, search filters, the guest booking prompt, account creation, booking submission, messages, profile changes after reload, and logout.

### Deploy to AWS

```sh
./deployService.sh -k /path/to/production.pem -h findbabysitters.click -s startup
```

The [AWS deployment](https://startup.findbabysitters.click) routes HTTPS traffic through Caddy to Express on port 4000. Production smoke checks verified the home page, the direct search route, the sitter listing, and the unauthenticated response from the session endpoint.

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
