What did you actually build during this phase?
--- 
We built a homepage which displays the existing forms in the database and a page that allowed users to create their own forms.

In order to do this, we needed several components to be developed. Firstly, form components that allowed for the creation of forms needed to be made. Then, there needed to be backend routing for the forms so that they could be saved. Next, we needed to create frontend page routing that allows for a new page to be generated when one is creating a form. Finally, to navigate through a large list of forms, we created a search function so that users can find their desired forms quickly and efficiently.


How is this different from what you originally proposed? Why?
--- 
We initially used Figma in order to design view mockups of the front-end of our application. However, once we started the development process, we did not really follow the Figma designs as we originally planned, and many of our frontend components looked different than the proposed models. The reason for these changes were due to time constraints and creative freedom. We had issues styling components as their figma alternatives, and if we have time left in P3 we will attempt to fix the styling to bring it more in line and give our application a more cohesive look. 

Our form builder is lacking some functionality, for example tags were not implemented as we decided they were to be out of scope for this phase, and that searching the list views could be done by searching for substrings of the title. This was done as a tagging system was actually much more complex to implement than anticipated with our current setup.

We also did not implement a Delete endpoint, and though we have an Edit endpoint, we did not create a frontend implementation for its usage. 

We also did not complete the validation of JSON forms in the frontend before submitting, so any error returned is only after submission when we recieve an error as a response to our post request.

For the backend of the application, we ended up scoping out the creation of the objects inheriting from an Actor interface as they didn't add any functionality to our current iteration, and we had scoped out authentication from our initial proposal. Later on in P3, we will consider implementing 2 child classes of actor and having a sort of mock authentication (i.e. by clicking a button) set up to switch between profiles.



High-level design of your software.
---
![](https://i.imgur.com/mABbleB.png)


Technical highlights: interesting bugs, challenges, lessons learned, observations, etc.
--- 

 ### Challenge: Lack of Experience
It was difficult for some of us to get our parts done quicky and efficiently because we did not realize how difficult it would be to go head-first into a project with very little experience with some crucial parts of either frontend or backend programming (for instance, APIs and routing).

**Lesson Learned:** We should have spent some more time reviewing (like watching some online tutorials, or spending a bit more time teaching one another) before going straight into our tasks blindly.
 
 ### Challenge: Cypress Testing Framework
 We decided to use a testing framework the majority of the team was completely unfamiliar with, Cypress. We spent a lot of time writing tests and trying to figure out how to write tests properly.
 
 **Lesson Learned:** We should probably either use a testing framework more individuals are familiar with, or do a knowledge transfer session early on so everyone isn't trying to figure things out on their own.
 
  ### Challenge: Communicating while working as a team remotely
As this semester was completely online, we were all working remotely and were unable to meet in person to work together. As a result all of our communications took place over discord. Sometimes it was hard to get a hold of individuals during meetings, or people were hesitant to ask for help.

 **Lesson Learned:** Be more proactive when reaching out via discord

  
 ### Challenge: Server would not show POST request in terminal
 When posting to the localhost server, the terminal would not display that a POST went through. As a result, we ended up spending a few hours trying to figure out why the POST was not going through. However, it was actually going through and was just not updated in the terminal.
 
**Lesson Learned:** Use the network inspect tool on your browser to see if the POST request goes through.
 
 ### Bug: Infinite loop when using useEffect hook
 The bug was that when implementing the form component, it would constantly call useEffect. Since useEffect was called after every update to the form, this meant that it was called infinitely. As a result, we were given the warning that "maximum update depth exceeded" and this halted the webpage after a while.
 
**Lesson Learned:** Give the UseEffect hook an array of dependencies to work with

 ### Observation: Github Actions Issues
 Towards the end of our development phase of phase 2, we did not have enough credits to continue using Github actions. 
 
**Lesson Learned:** Look into how many minutes we have before relying solely on Github actions.

### 

Reflect on your teamwork and process. What worked well, what needs improvement.
--- 

**What went well:** 

1. We were able to organize and assign tasks in a fairly efficient manner. We tried to update our kanban board as much as possible in order to track what had been completed and what needed to be done, and we organized our issues by priority, ensuring that essential tasks were completed first.

2. Most times, when one of our teammates was assigned a task that had to do with something they were unfamiliar with (for example, a frontend task given to someone who primarily had backend experience), everyone was very open to helping them with their tasks if they were stuck at any time throughout the process. A few times we even had some streams over discord where one of our team members shared his screen and explained how the frontend part of our application worked.

3. Our meetings were streamlined and efficient, team members would arrive on time and do little standups, then would immediately get into what needed to be done for the next week.

**What needs improvement:**

1. Communication between team members can be improved. Given how everything is remote, it can be hard to reach some members at times. Sometimes things would end up being blocked for longer than anticipated.

2. The reviewing process also took more time than anticipated. As many members on the team were unfamiliar with the stack used, it fell to a few experienced team members to do the majority of the reviewing. We are uncertain how to improve this as we don't want bad code reviews.

3. We could have done a better job at encouraging team members to speak more during our meetings. A few of our team members would only speak when prompted, and we would have had better communication throughout our group if we had heard from everyone equally. 


Triage: What will you build for phase 3, the final demo?
---   

For phase 3, we will need to implement a few more features. Most importantly, we need to give users the ability to edit and view their forms. Currently, we create them and offer a summary of their forms. So a way to view them fully would be beneficial. Additionally, we will need to add a switch to simulate a Form manager user and a Form filler user. Also, we will need to accomodate dependent questions. Right now, we do not account for them. Another thing that needs to be added in phase 3 is the ability to have subsections in each section. Currently, we only support multiple parent sections. Finally, we need to implement versioning for forms. This way, users can revert forms if needed.
