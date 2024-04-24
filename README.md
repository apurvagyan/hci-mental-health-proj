## Installing dependencies and running the project

To install any dependencies, run npm install in the terminal

To run the project, run npm start in the terminal


## Problem Space

Students need to find mental health or wellness resources that fit their personal needs. While these resources are available, they are not easily accessible because they are not advertised effectively. Students do not necessarily know about every resource that is available to them on campus. Furthermore, they might not understand which resource would best help them address the problem they have. They only hear about the efficacy of the resources and their availability through word of mouth from friends and acquaintances , which can be unreliable due to their subjective nature.

## Brief Description of The Project

Our solution is an interactive survey that guides the user through a roadmap to determine what mental health or wellness resource would best fit their wants and needs. The survey asks the user questions about their preferences, such as if they require mental health resources or wellness resources, and if they would prefer a formal or casual environment. The system then generates a resource recommendation based on the user responses, and provides real-life student testimonials for the corresponding resource. It also provides a centralized list of Yale mental health and wellness resources and their contact information if the user wants to explore other options by their own metrics.

## Key System Components

### Component 1: Body position detection
We will need to implement hand position detection for features like accessing the help page, and body position detection to detect the user’s answer selection during the survey.

### Component 2: Question branching
Our project is based on a roadmap that will lead users to the available resource that best fits their needs. That means we may need to ask different questions depending on the user’s answer to the previous question, or we will need to come up with a suitable recommendation based on any combination of answers that the user may provide.

### Component 3: Undo answers/redo questions
Our system will implement a functionality to go back to the last question or to redo the survey completely. We need to handle how this feature interacts with the question branching.

### Component 4: Site redirection
Our system must include some sort of QR code or other method of distributing information so that users are able to learn more about a given mental health resource. 

## Tasks
* Decide which Yale mental health resource is the right one for their needs
* Access all mental health resources easily in a centralized place

## Deploment Environment Constraints

Deployment constraints are that the user must have their head and arms visible within screen range, including when there arms are lifted above their head. Another constraint is that only one user may use the application at a time, and if there are multiple users in frame, the program will only recognize the person closest to the screen. Thus, if there are multiple people on the screen, the user should ensure that they are the closest to the screen. 



## Collaboration Record

**Student Name and NetID:** Angelica Pham (akp37)

**Contribution:** 
Angelica formatted most pages of the application and/or refined the layout, including the questions, recommendations, testimonials, and centralized resources pages. Angelica also created all of the HTML/CSS layout components, including the button hover to indicate the option selection. Angelica incorporated these components in the Javascript pages to modularize the code. Angelica ensured that the app displayed properly on the TV dimensions.

**Student Name and NetID:** Apurva Mishra (am3826)

**Contribution:** 

**Student Name and NetID:** Kyra Kaya (klk56)

**Contribution:** 
For this assignment, Kyra was able to code the motion of hand raising for the home page, the instruction page, and all of the question pages. As well, Kyra coded the initial page navigation so that the home, instructions, and questions pages moved seamlessly together. Kyra also was able to connect the motion to the button highlighting effect, so that the buttons would highlight when a hand was raised. Kyra as well was able to create a function to detect if the hand had been raised for five seconds, and created a countdown so that user's know how much time there hand has been raised. Finally, Kyra was able to code a depth function that detects the person closest to the screen and only uses their kinect data, and integrated into the check hands function. Lastly, Kyra tested the motion and multi-person detection to determine that everything was working properly.

**Student Name and NetID:** Nawal Naz Tareque (nt387)

**Contribution:** Nawal added the motion and buttons for the testimonial pages and also worked on adding buttons and their respective motion for the centralized resource page. Nawal drafted the README initially and also did the initial decision tree for each of the resources. Nawal also incorporated the motion for the question pages and also helped with the linking. Nawal also helped to clean up a lot of the files by deleting unnecessary files and by removing warnings during the compilation process. Nawal also cleaned up most of the comments or any redundant code to refactor the code better. 