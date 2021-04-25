# Employee Tracking Database

This is an original application create a MySQL database for employee data through a Command Line Interface. This 

  
A [video walkthrough](https://www.youtube.com/watch?v=fEtHvfZDQh4) is available

## Features
* Utilizes JavaScript and Node.js to provide a simple CLI user interface
    * Inquirer module for command prompts
    * Leverages `console.table` package to organize viewing of database tables
* Also utilizes SQL technologies for database functionality

### Challenges
* This application was a unique challenge and required a large time investment 
    * I utilized multiple methods and functions throughout in order to manipulate user input and overall functaionality of the application
    * Promises were a challenge as I was not using MySQL2 or Sequelize modules, but google-fu, rubber duckies and getting input from other developers allowed me to overcome these difficulties
* MySQL queries were a challenge to learn, especially joins
    * To overcome these, google-fu and getting input from other developers also assisted
    * Additionally, I intend to try to impliment more `joins` in my queries in order to make the overall code more efficient and cut down the number of functions

Later iterations of this application will also allow you to view employees by manager, delete employees, calculate department budget for salaries, and also validate user input for acceptable entries


## Credits
Many thanks to the below individuals who provided input and suggestions
* Mim Armand
* Stephen Simone
* Jay Yousef (a HUGE help - as a rubber ducky, passing ideas back and forth, and for driving me to keep going to keep up with him)
* And last, but not least - *Grogu*
        
<img src="./assets/images/grogu.png">


If any additional issues are found, or if there are any suggestions for improvement, please send an email to developer Chris Martinez at cbmartinez42@gmail.com

---

### <ins>Installation</ins>
1.  Clone or download .zip file from Github to your local computer
2.  In Git Bash or Terminal, type `npm install` to install the necessary modules
3.  Copy the content from `schema.sql` and, if desired, `seed.sql` in the db folder into your favorite SQL GUI to create the database, tables and seed data (or create your own seed data using the application!) 
4.  When ready, type `node .` to launch `server.js`

#### <ins>Cloning</ins>
1. From Github, select the "Code" button, choose either HTTPS or SSH as appropriate
2. Click the copy button <img src="./assets/images/copy-button.PNG"> to add it to your clipboard
3. In your preferred command line (terminal, bash, etc), navigate to the folder you'd like to download the repository into
4. Type `git clone [pasted url from clipboard]` and press enter


#### <ins>Zip file</ins>
1. From Github, select the "Code" button, then select "Download ZIP"
2. Choose which folder to download the repository into via the dialog box that appears
3. After downloading, open the .zip file and select "Extract All" from the top of the window that appears


---

This application is covered under [MIT License](./LICENSE)


