```mermaid
sequenceDiagram
participant browser
participant server

browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note right of browser:The browser sends form data as the body of the POST request.
activate server
Note left of server: The server uses the data in the POST request's body to create a new note object and add it to the array notes, the server then responds with a redirect (302) pointing the browser to the address defined in the response header's Location

server ->> browser: HTTP status code 302
deactivate server

browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: HTML document
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->>browser: the css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server
server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
deactivate server

Note right of browser: The browser executes the callback function that renders the notes
```
