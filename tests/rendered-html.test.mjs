import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("contains the finished mindcolor homepage", async () => {
  const source = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /mindcolor®/);
  assert.match(source, /Pozwól mu tego doświadczyć/);
  assert.match(source, /Rozpoznaj/);
  assert.match(source, /Doświadcz/);
  assert.match(source, /mindcolor PRO/);
  assert.match(source, /kontakt@mindcolor\.pl/);
  assert.doesNotMatch(source, /chatgpt|oai-authenticated|vinext/i);
});

test("uses the standard Next.js lifecycle", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.next, "16.2.6");
  assert.equal(packageJson.devDependencies?.vinext, undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
});
