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

The greatest challenge our group encountered was difficulty in successfully uploading our project to the TV. We decided to create a React app for clean development that all members could easily contribute to – our team is also quite new to app development, so we attempted a React framework to learn more about general app development as well. This complicated our project upload because we could not keep all necessary files (mainly the index.html file) directly within the top-level folder. React apps use several subdirectories, and we struggled to understand either how to compress our code base or implement the web file with the path to our executable. We received help from TFs and through EdStem to write in the web file (which first led to the index.html, but was then modified to contain the app host link). Since we were not familiar with running server code with React apps, we also learned that we needed to include the run.sh file to execute commands we normally typed in the terminal to host our app.

Another difficulty we encountered was sizing the components to the TV screen. Because all of our computer screens had different display dimensions, while some elements looked centered on one person’s computer, they were not on others. This was something that was difficult to fix because we had difficulty uploading our code to the TV, so we couldn’t see how the components we made would look on the dimensions of the TV. 

Finally, we initially struggled to understand exactly how to connect our code to the frames from the Kinect, but were eventually able to retrieve the data for our program. 

There was some difficulty with merging in different streams of development that team members worked on concurrently, but maintaining a GitHub and then handling merge conflicts allowed us to handle this and allow members to contribute to code in parallel.



## Collaboration Record

**Student Name and NetID:** Angelica Pham (akp37)

**Contribution:** 

**Student Name and NetID:** Apurva Mishra (am3826)

**Contribution:** 

**Student Name and NetID:** Kyra Kaya (klk56)

**Contribution:** 

**Student Name and NetID:** Nawal Naz Tareque (nt387)

**Contribution:** 