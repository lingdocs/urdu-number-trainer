import { stringify } from "csv-stringify/sync";
import { urduNumbers } from "./src/urdu-numbers";
import { toArabic } from "./src/lib/helpers";
import * as fs from "fs";
const forCsv = urduNumbers.map(([urdu, ph], i) => {
  return [
    `<div class="urdu urdu-large">${toArabic(i)}<div>`,
    `<div>
    <div class="urdu">${urdu}</div>
    <div class="roman">${ph}</div>
    <div class="roman">${i}</div>
  </div>`,
  ];
});

fs.writeFileSync("urdu-numbers.csv", stringify(forCsv), "utf-8");
