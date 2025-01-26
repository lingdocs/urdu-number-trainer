import { stringify } from "csv-stringify/sync";
import { urduNumbers } from "./src/urdu-numbers";
import { toArabic } from "./src/lib/helpers";
import * as fs from "fs";
const forCsv = urduNumbers.map(([urdu, ph], i) => {
  return [
    toArabic(i),
    `<div>
    <div>${urdu}</div>
    <div>${ph}</div>
    <div>${i}</div>
  </div>`,
  ];
});

fs.writeFileSync("urdu-numbers.csv", stringify(forCsv), "utf-8");
