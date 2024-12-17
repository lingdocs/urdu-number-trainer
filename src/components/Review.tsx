import { urduNumbers } from "../urdu-numbers";

export default function Review(range: number) {
  return (
    <table>
      {/* <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr> */}
      {urduNumbers.map(([urdu, ph], i) => (
        <tr>
          <td>{urdu}</td>
          <td>{ph}</td>
        </tr>
      ))}
    </table>
  );
}
