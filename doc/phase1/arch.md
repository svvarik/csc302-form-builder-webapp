# Architecture

Based on our proposed use cases, our system features 3 main views, broken into 3 different web apps. We chose this breakdown because it groups together functionalities for each group of users (those who have permission to make forms and edit their layouts, those who have permission to fill in forms with patient data, and those who have permission to view certain forms).  

1. **Form Manager app**  
This application is where the form manager can create new forms or modify existing forms. Form managers have the option of saving a form to finish later or publishing the form for other health professionals to access and use. Published forms can also be modified, with version history tracking allowing old versions of the forms to still be compatible with the system.  
API endpoints consumed: publish, versions

2. **Form Filler app**  
This application is where a physician or allied health professional can record patient data through a form already created by a form manager. The form can be saved and revisited, and rendered in a view-only, user-friendly mode to someone else.   
API endpoints consumed: save, edit, new, search

3. **Form Viewer app**  
This application allows a health professional to view a form that has already been filled by another health professional, for example when a patient is referred to a specialist. A health professional has permission to view specific forms about specific patients, as specified in the database. A health professional can grant another health professional permission to view a form he or she has permission to view.    
API endpoints consumed: search

Full descriptions of the API endpoints can be found in API.md.

All applications involve the same tech stack.

	Front-end: React, Redux, Material UI  
	Back-end: MongoDB, Express, and TypeScript

For middleware, we will be using Morgan, CORS, and BodyParser. Morgan is useful for auto-documentation, simplifying the process of logging requests to the application. BodyParser parses request bodies as JSON. CORS allows us to test our application in localhost, which is necessary at this stage of development to call our API endpoints. It allows us to specify which cross-origin requests are allowed. We chose to use Morgan and BodyParser because of their compatibility with our chosen tech stack.

