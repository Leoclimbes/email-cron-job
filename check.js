require("dotenv").config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs");
const path = require("path");
const filePath  = path.join(__dirname, "example.txt");

let lastSavedCommit = null;

if (fs.existsSync(filePath)) {
    console.log("file exists");
 

const fileContents = fs.readFileSync(filePath, "utf8");
lastSavedCommit = fileContents.trim()
console.log(`Last saved commit is: ${lastSavedCommit}`);

}else {
    console.log("file does not exist");
}


const owner = "Leoclimbes";
const repo = "Clicker-Game";

const url = `https://api.github.com/repos/${owner}/${repo}/commits`;

async function fetchLatestCommit() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const latestCommit = data[0];
    const latestSHA = latestCommit.sha;

    console.log("Latest commit SHA from GitHub:", latestSHA);
    return latestSHA;
  } catch (error) {
    console.error("Error fetching latest commit:", error);
  }
}


const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "leoClimbes2@gmail.com",            
    pass: "bzsj bhds uhzc eewj"  
  }
});


const mailOptions = {
  from: "leoClimbes2@gmail.com",
  to: "leoClimbes2@gmail.com",              
  subject: "New GitHub Commit Found!",
  text: "A new commit was made."
};


async function main() {
  
  const latestCommit = await fetchLatestCommit();
  
  if (lastSavedCommit !== latestCommit) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
      fs.writeFileSync(filePath, latestCommit, "utf8");
    });
  }
  
}
main();