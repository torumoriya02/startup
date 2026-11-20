# CS 260 Notes

This file represents what I have learned about web programming.
I love web programming

- [My startup](https://startup.findbabysitters.click)
- [My simon](https://simon.findbabysitters.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

Interesting things I have learned about AWS

## HTML

- HTML provides the structure and content of a web application.
- The Simon application has multiple HTML pages such as login, game, scores, and about.
- `deployFiles.sh` automates deploying files to the AWS server.
- SSH is used to execute commands on the remote server.
- SCP securely copies files from my computer to the server.
- Caddy serves the application using the Simon subdomain.
- My Simon URL is https://simon.findbabysitters.click

## Startup HTML

- HTML provides the structure and content of a web application.
- The `index.html` file is the default page loaded by the browser.
- Semantic HTML elements such as `header`, `nav`, `main`, `section`, and `footer` help organize a webpage.
- The `input` element can collect information such as email, password, location, and dates.
- Links using the `a` element can connect multiple HTML pages.
- Application data can be represented with placeholders before JavaScript and the database are implemented.
- Authentication will eventually allow users to create accounts and log in.
- Database data will eventually store and display babysitter profiles and information.
- A third-party service can eventually provide location or map information.
- WebSocket will eventually provide realtime messaging between users.

## React

Interesting things I have learned about React

## Simon CSS

I learned how to use CSS to make websites more visually appealing and responsive. I learned how to use Flexbox to organize the header, main content, and footer. I also learned how media queries can change the layout depending on the screen size.

I learned that `main.css` contains common styles for the entire website, while `play.css`, `scores.css`, and `about.css` provide styles for individual pages.

I successfully deployed Simon CSS to my AWS server.


## Startup Service

- Run the React and Express applications separately in development. Vite forwards relative `/api` requests to port 4000 so the browser can use the same URLs in development and production.
- Express serves the production React build with static middleware. Direct visits to React routes load the same entry page so React Router can render the requested route.
- Keep the session token in an HTTP-only cookie. The browser sends the cookie on same-origin requests, and Express middleware uses it to look up the signed-in user before handling protected routes.
- Hash passwords with BCrypt when creating accounts and use BCrypt comparison during login. Account ownership determines which bookings, messages, and profile data a session can access.
- Messages polls Express for conversation updates, including automatic replies. In-memory data lasts until the Express process restarts.
- Keep network failures, empty results, and successful actions distinct in the UI. For example, a failed sitter fetch shows an error instead of an empty search result.
