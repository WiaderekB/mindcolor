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
  assert.match(source, /Powrót uwagi/);
  assert.match(source, /Trenuje uwagę, ogranicza rozproszenia/);
  assert.match(source, /Rozwijamy kompetencje mentalne dzieci i młodzieży/);
  assert.match(source, /Głosy osób, które doświadczyły mindcolor®/);
  assert.match(source, /W programie planujemy/);
  assert.match(source, /name: "Motywacja"/);
  assert.match(source, /meta: "Motywacja \/ 1 minuta"/);
  assert.doesNotMatch(source, /name: "Energia"/);
  assert.match(source, /kasia-new\.jpg/);
  assert.match(source, /Krystyna\.JPG/);
  assert.match(source, /href="tel:\+48507467750"/);
  assert.match(source, /href="tel:\+48515036895"/);
  assert.match(source, /mindcolor-cards-naffy\.jpg/);
  assert.match(source, /href="https:\/\/www\.naffy\.io\/mindcolor"/);
  assert.match(source, /Odkryj narzędzia mindcolor®/);
  assert.doesNotMatch(source, /Sklep na Naffy[\s\S]*w przygotowaniu/);
  assert.match(source, /group-card-session\.jpg/);
  assert.match(source, /bracelet-session\.jpg/);
  assert.doesNotMatch(source, /cards-table\.jpg/);
  assert.match(source, /tools-studio\.jpg/);
  assert.match(source, /mental-training-lights\.jpg/);
  assert.match(source, /logo-on-dark\.png/);
  assert.doesNotMatch(source, /training-moment\.jpg|strefa-in-action\.jpg|pohto2\.jpg|stoisko\.jpg/);
  assert.doesNotMatch(source, /newsletter/i);
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
  assert.match(page, /statement-dot dot-red/);
  assert.match(css, /\.statement-group[\s\S]*?min-width: 100vw/);
  assert.match(icons, /viewBox="0 0 24 24"/);
  assert.doesNotMatch(page, /[↗↓✦◎∿⌁]/);
  assert.doesNotMatch(page, /<details|<summary/);
  assert.doesNotMatch(css, /animation-timeline|@keyframes/);
});

test("uses only the supplied brand photography and logo", async () => {
  const files = await readdir(new URL("../public/images/", import.meta.url));

  for (const file of [
    "mindcolor-cards-naffy.jpg",
    "hero-strefa.jpg",
    "group-card-session.jpg",
    "bracelet-session.jpg",
    "cards-table.jpg",
    "tools-studio.jpg",
    "mental-training-lights.jpg",
    "kasia-new.jpg",
    "Krystyna.JPG",
    "logo.png",
    "logo-on-dark.png",
  ]) {
    assert.ok(files.includes(file), `Missing supplied asset: ${file}`);
  }
});

test("uses every visible photograph only once", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const photoSources = [...source.matchAll(/src="(\/images\/(?!logo)[^"]+)"/g)].map((match) => match[1]);

  assert.equal(new Set(photoSources).size, photoSources.length);
});

test("loads up to ten automatically colored testimonials from JSON", async () => {
  const [source, data] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../data/testimonials.json", import.meta.url), "utf8"),
  ]);
  const testimonials = JSON.parse(data);

  assert.equal(testimonials.length, 6);
  assert.ok(testimonials.every((item) => item.text && item.author && item.context));
  assert.ok(testimonials.some((item) => item.author === "Joanna"));
  assert.ok(testimonials.some((item) => item.context === "Juta4Dance"));
  assert.doesNotMatch(data, /Wkrótce|To miejsce czeka/);
  assert.match(source, /testimonialEntries\.slice\(0, 10\)/);
  assert.match(source, /index % testimonialColors\.length/);
  assert.match(source, /scrollTestimonials/);
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
  assert.match(source, /noValidate/);
  assert.match(source, /aria-invalid/);
  assert.match(source, /Wszystkie pola są wymagane/);
  assert.match(source, /Wpisz poprawny adres e-mail/);
});

test("supports dismissible mobile navigation and accessibility preferences", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-controls="mobile-navigation"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /mobileNavToggleRef\.current\?\.focus/);
  assert.match(css, /prefers-reduced-transparency/);
  assert.match(css, /prefers-contrast: more/);
});

test("publishes crawler metadata routes", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /sitemap\.xml/);
  assert.match(robots, /userAgent: "\*"/);
  assert.match(sitemap, /changeFrequency: "monthly"/);
  assert.match(sitemap, /priority: 1/);
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
