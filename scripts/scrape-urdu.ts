// Import Cheerio and the Node.js 'fs' module
import * as cheerio from "cheerio";
import fs from "fs";
import { numbers } from "../src/numbers";
import { join } from "path";

// Example HTML content (You can load this from a file or fetch it from the web)
async function main() {
  const html = await (
    await fetch("https://www.urdu-english.com/lessons/beginner/numbers")
  ).text();
  const $ = cheerio.load(html);
  const urduDivs = [];
  $("span.urdu").each((index, element) => {
    urduDivs.push($(element).text().trim()); // Extract the text content
  });
  const forFile = `export const urduNumbers = [
${urduDivs.map((x, i) => `  ${`["${x}", "${numbers[i]}"],`}`).join("\n")}  
];
`;
  // doesn't work exactly because it's missing 94
  fs.writeFileSync("./urdu-numbers.ts", forFile);
}

main();
