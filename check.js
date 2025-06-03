const fs = require("fs");
const path = require("path");
const filePath  = path.join(__dirname, "example.txt");

let lastSavedCommit = null;

if (fs.existsSync(filePath)) {
    console.log("file exists");
 

const fileContents = fs.readFileSync(filePatch, utf8);
const lastSavedCommit = fileContents.trim();
console.log(`Last saved commit is: ${lasSavedCommit}`);

}else {
    console.log("file does not exist");
}


