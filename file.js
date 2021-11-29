const fs = require("fs");

fs.readFile("./welcome.txt", "utf-8", (err, data) => {
  console.log(data);
});

const quote = "Live Let Live";
const nicequote = "\nHello Gokul";

fs.writeFile("./awesome.txt", quote, (err) => {
  console.log("Completed Writing!!!");
});

fs.appendFile("./awesome.txt", nicequote, (err) => {
  console.log("Completed Writing!!!");
});

// fs.unlink("./awesome.txt", (err) => {
//   console.log("Deleted File");
// });

const quote2 = "Live More, Worry Less !!!";

function createQuotes(noOfFiles, quote) {
  for (let i = 1; i <= noOfFiles; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote, (err) => {
      console.log("Created files", i);
    });
  }
}

const [, , noOfFiles] = process.argv;
createQuotes(noOfFiles, quote2);
