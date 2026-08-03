import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
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
  assert.match(source, /Pięć spokojnych powrotów/);
  assert.match(source, /W programie planujemy/);
  assert.match(source, /Motywacja \/ działanie/);
  assert.match(source, /Fokus \/ koncentracja/);
  assert.match(source, /Spokój \/ uważność/);
  assert.match(source, /wyobraźnia", "pomysłowość", "otwartość/);
  assert.doesNotMatch(source, /name: "Energia"/);
  assert.doesNotMatch(source, /meta: "Energia/);
  assert.match(source, /kasia\.JPG/);
  assert.match(source, /Krystyna\.JPG/);
  assert.match(source, /photo1\.jpg/);
  assert.match(source, /photo3\.jpg/);
  assert.match(source, /logo-on-dark\.png/);
  assert.doesNotMatch(source, /pohto2\.jpg/);
  assert.match(source, /sklep\.jpg/);
  assert.match(source, /stoisko\.jpg/);
  assert.doesNotMatch(source, /Materiał w przygotowaniu/);
  assert.doesNotMatch(source, /Po ukończeniu programu otrzymasz/);
  assert.doesNotMatch(source, /chatgpt|oai-authenticated|vinext/i);
});

test("uses one motion and icon system without font-rendered arrows", async () => {
  const [page, icons, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/icons.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /from "framer-motion"/);
  assert.match(page, /useReducedMotion/);
  assert.match(page, /AnimatePresence/);
  assert.match(page, /ArrowUpRightIcon/);
  assert.match(icons, /viewBox="0 0 24 24"/);
  assert.doesNotMatch(page, /[↗↓✦◎∿⌁]/);
  assert.doesNotMatch(page, /<details|<summary/);
  assert.doesNotMatch(css, /animation-timeline|@keyframes/);
});

test("uses only the supplied brand photography and logo", async () => {
  const files = await readdir(new URL("../public/images/", import.meta.url));

  assert.deepEqual(files.sort(), [
    "Krystyna.JPG",
    "kasia.JPG",
    "logo-on-dark.png",
    "logo.png",
    "photo1.jpg",
    "photo3.jpg",
    "pohto2.jpg",
    "sklep.jpg",
    "stoisko.jpg",
  ]);
});

test("builds a complete contact email from the form", async () => {
  const source = await readFile(
    new URL("../app/contact-form.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /event\.preventDefault\(\)/);
  assert.match(source, /encodeURIComponent\(subject\)/);
  assert.match(source, /encodeURIComponent\(body\)/);
  assert.match(source, /mailto:kontakt@mindcolor\.pl/);
});

test("uses the standard Next.js lifecycle", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.next, "16.2.12");
  assert.equal(packageJson.dependencies["framer-motion"], "12.43.0");
  assert.equal(packageJson.devDependencies?.vinext, undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
});
