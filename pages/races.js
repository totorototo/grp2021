import { promises as fs } from "fs";
import path from "path";

// races will be populated at build time by getStaticProps()
function Races({ races }) {
  return (
    <ul>
      {races.map((race, index) => (
        <h3 key={index}>{race}</h3>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const racesDirectory = path.join(process.cwd(), "races");
  const filenames = await fs.readdir(racesDirectory);

  const regex = /^[^.]+.gpx$/;
  const raceNames = filenames
    .filter((filename) => filename.match(regex))
    .map((filename) => path.parse(filename).name);

  // By returning { props: posts }, the Blog component
  // will receive `races` as a prop at build time
  return {
    props: {
      races: raceNames,
    },
  };
}

export default Races;
