Nested Checkbox Component in React
This is an advanced and fully functional nested checkbox component built in React.js. It's designed to manage complex tree-like data structures where there is a logical relationship between parent and child checkboxes.

✨ Features
Select/Deselect All: A single checkbox to select or deselect all items at once.

Parent-Child Logic: Selecting a parent checkbox automatically checks all its children.

Indeterminate State: A parent checkbox will show an "indeterminate" state if only some of its children are selected.

Multi-Level Nesting: The component supports multiple levels of nesting (e.g., Category > Sub-Category > Item).

Modern UI: A clean, attractive, and user-friendly interface styled with custom CSS.

Reusable Component: Designed to be easily integrated into any React project.

🛠️ Tech Stack
Frontend: React.js

Styling: Custom CSS (Flexbox)

⚙️ Getting Started
Follow the steps below to set up and run the project on your local machine.

Prerequisites
Ensure you have Node.js and npm installed on your system.

Node.js (npm is included with the installation)

Installation
Clone the repository:

Bash


Navigate to the project directory:

Bash

cd nested-checkbox-react
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm start
Your browser should automatically open to http://localhost:3000, where you can see the project running.

📂 File Structure
The project follows a simple and organized file structure:

src/
├── components/
│   └── NestedCheckbox.js   # The main component with all the logic
├── data/
│   └── nodes.js            # The tree-like data for the checkboxes
├── App.js                  # The main App component
└── styles.css              # Custom CSS styles