import Head from "next/head";
import spells from "./spellsdb.json";
import Fuse from "fuse.js";
import { useState } from "react";

const fuse = new Fuse(Object.values(spells), {
  keys: ["name"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>BG3 spell save list</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mt-2">
        <h2>Search for a spell 🧙</h2>
        <div className="mb-3">
          Because the ps5 version is bugged and never shows spell save types...
        </div>
        <SearchComponent />
      </main>
    </>
  );
}

function SearchComponent() {
  const [state, setState] = useState("");
  const fullResult = fuse.search(state);
  const partialResults = fullResult.slice(0, 10);

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          value={state}
          placeholder="Fireball"
          className="form-control"
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      {partialResults.map((r) => {
        const hasSavingThrows = r.item.savingThrowsType !== null;

        return (
          <div key={r.item.name} className="mb-2">
            {r.item.name}{" "}
            {hasSavingThrows ? (
              <>(🛡️{r.item.savingThrowsType})</>
            ) : (
              <>(❌ NONE)</>
            )}
          </div>
        );
      })}
    </div>
  );
}
