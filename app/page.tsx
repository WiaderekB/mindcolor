"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import ContactForm from "./contact-form";
import {
	AnchorIcon,
	ArrowDownIcon,
	ArrowUpRightIcon,
	CalmIcon,
	CloseIcon,
	EnergyIcon,
	FocusIcon,
	MenuIcon,
	NameIcon,
	PlusIcon,
	RecognizeIcon,
	SparkIcon,
} from "./icons";

const easeOut = [0.22, 1, 0.36, 1] as const;
const revealVariants = {
	hidden: { opacity: 0, y: 44, filter: "blur(8px)" },
	visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const cardVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0 },
};
const heroContainerVariants = {
	hidden: {},
	visible: {
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.11,
		},
	},
};
const heroItemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easeOut } },
};

const states = [
	{
		name: "Koncentracja",
		color: "blue",
		icon: "focus",
		definition: "Skupiam się",
		description: "Uwaga kieruje się na to, co w tej chwili naprawdę ważne. Jedno zadanie, jeden krok, świadoma obecność.",
		cues: ["fokus", "uważność", "planowanie"],
	},
	{
		name: "Spokój",
		color: "green",
		icon: "calm",
		definition: "Reguluję",
		description: "Napięcie opada, oddech zwalnia, a dziecko odzyskuje równowagę i kontakt ze sobą.",
		cues: ["oddech", "równowaga", "powrót do siebie"],
	},
	{
		name: "Kreatywność",
		color: "yellow",
		icon: "spark",
		definition: "Szukam rozwiązań",
		description: "Pojawia się ciekawość, elastyczność i gotowość, by spróbować inaczej - bez lęku przed błędem.",
		cues: ["pomysły", "lekkość", "nowe możliwości"],
	},
	{
		name: "Energia",
		color: "red",
		icon: "energy",
		definition: "Działam",
		description: "Ciało i myśli są gotowe do ruchu. To odwaga, zaangażowanie i decyzja, by zrobić pierwszy krok.",
		cues: ["odwaga", "motywacja", "wytrwałość"],
	},
];

const process = [
	{
		number: "01",
		name: "Rozpoznaj",
		icon: "recognize",
		text: "Zatrzymaj się i sprawdź, czego potrzebujesz w tej chwili.",
	},
	{
		number: "02",
		name: "Doświadcz",
		icon: "experience",
		text: "Wejdź w wybrany stan przez ruch, ćwiczenie, pytanie lub zabawę.",
	},
	{
		number: "03",
		name: "Nazwij",
		icon: "name",
		text: "Zauważ i opowiedz, co wydarzyło się w ciele, emocjach i myślach.",
	},
	{
		number: "04",
		name: "Zakotwicz",
		icon: "anchor",
		text: "Połącz doświadczenie z kolorem, aby łatwiej do niego wrócić.",
	},
];

const offers = [
	{
		number: "01",
		title: "Warsztaty",
		audience: "Dla dzieci, młodzieży, szkół i klubów",
		lead: "Tworzymy warunki, w których uczestnicy naprawdę doświadczają czterech stanów.",
		details: "Ruch, ćwiczenia, karty i rozmowa składają się na angażujące spotkanie dopasowane do wieku i potrzeb grupy.",
		cta: "Zapytaj o warsztat",
	},
	{
		number: "02",
		title: "Strefy mindcolor®",
		audience: "Dla organizatorów wydarzeń",
		lead: "Interaktywna przestrzeń, która włącza uczestników w doświadczenie - nie tylko opowiada o rozwoju.",
		details: "Strefa sprawdzi się podczas wydarzeń sportowych, edukacyjnych i rodzinnych. Włączymy ją w program wydarzenia i poprowadzimy uczestników przez cztery stany.",
		cta: "Zaproś strefę na event",
	},
	{
		number: "03",
		title: "Konsultacje",
		audience: "Dla rodziców, trenerów i klubów",
		lead: "Przekładamy trudną sytuację na prosty język, konkretny plan i narzędzia możliwe do użycia od razu.",
		details: "Pracujemy indywidualnie z rodzicami, trenerami, klubami oraz młodymi sportowcami. Zakres spotkania ustalamy przed konsultacją.",
		cta: "Umów rozmowę",
	},
	{
		number: "04",
		title: "Wystąpienia",
		audience: "Dla konferencji, szkół i klubów",
		lead: "O treningu mentalnym bez trudnego języka - blisko codzienności dzieci i dorosłych.",
		details: "Wystąpienia dla rodziców, nauczycieli, trenerów i organizacji. Temat oraz długość dopasowujemy do odbiorców i formatu wydarzenia.",
		cta: "Zaproś nas",
	},
	{
		number: "05",
		title: "Szkolenia",
		audience: "Dla zespołów pracujących z dziećmi",
		lead: "Wspólny język i praktyczny sposób pracy dla całego zespołu.",
		details: "Szkolenia rozwijają umiejętność prowadzenia doświadczenia, rozmowy i świadomego zakotwiczenia wybranego stanu.",
		cta: "Porozmawiaj o szkoleniu",
	},
];

const practices = [
	{
		color: "blue",
		meta: "Koncentracja / 1 minuta",
		title: "Pięć spokojnych powrotów",
		lead: "Na moment przed nauką, treningiem albo zadaniem, które wymaga pełnej uwagi.",
		instruction: "Wybierz jeden punkt przed sobą. Przez pięć spokojnych oddechów wracaj do niego wzrokiem za każdym razem, gdy uwaga odpłynie.",
		question: "Na koniec zapytaj: co najbardziej pomogło Ci wrócić?",
	},
	{
		color: "green",
		meta: "Spokój / 1 minuta",
		title: "Napnij i odpuść",
		lead: "Prosty sposób, by najpierw zauważyć napięcie, a dopiero potem o nim rozmawiać.",
		instruction: "Zaciśnij dłonie na trzy sekundy, a potem powoli je rozluźnij. Powtórz trzy razy i zauważ różnicę w ciele.",
		question: "Na koniec zapytaj: gdzie teraz jest choć odrobinę lżej?",
	},
	{
		color: "yellow",
		meta: "Kreatywność / 2 minuty",
		title: "Trzy inne drogi",
		lead: "Kiedy pierwszy pomysł nie działa albo pojawia się blokada.",
		instruction: "Wybierz zwykły przedmiot i wymyśl dla niego trzy zupełnie nowe zastosowania. Nie oceniaj pomysłów w trakcie.",
		question: "Na koniec zapytaj: który pomysł najbardziej Cię zaskoczył?",
	},
	{
		color: "red",
		meta: "Energia / 1 minuta",
		title: "Pierwszy mały krok",
		lead: "Kiedy trudno zacząć, choć wiadomo już, co jest do zrobienia.",
		instruction: "Przez dziesięć sekund poruszaj całym ciałem, zatrzymaj się i nazwij najmniejszy możliwy krok, który możesz zrobić teraz.",
		question: "Nie planuj całości. Zrób tylko ten jeden krok.",
	},
];

function Logo() {
	return (
		<span className="wordmark" aria-label="mindcolor">
			<span>mind</span>
			<span className="letter-blue">c</span>
			<span className="letter-green">o</span>
			<span className="letter-yellow">l</span>
			<span className="letter-red">o</span>
			<span className="letter-blue">r</span>
			<sup>®</sup>
		</span>
	);
}

function ArrowIcon() {
	return <ArrowUpRightIcon className="inline-icon" />;
}

function StateGlyph({ name }: { name: string }) {
	const props = { className: "state-icon-svg" };

	switch (name) {
		case "calm":
			return <CalmIcon {...props} />;
		case "spark":
			return <SparkIcon {...props} />;
		case "energy":
			return <EnergyIcon {...props} />;
		default:
			return <FocusIcon {...props} />;
	}
}

function ProcessGlyph({ name }: { name: string }) {
	const props = { className: "process-icon-svg" };

	switch (name) {
		case "experience":
			return <SparkIcon {...props} />;
		case "name":
			return <NameIcon {...props} />;
		case "anchor":
			return <AnchorIcon {...props} />;
		default:
			return <RecognizeIcon {...props} />;
	}
}

function RevealSection({ children, className, id, amount = 0.12 }: { children: ReactNode; className: string; id?: string; amount?: number }) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.section
			className={className}
			id={id}
			initial={reduceMotion ? false : "hidden"}
			transition={{ duration: 0.88, ease: easeOut }}
			variants={revealVariants}
			viewport={{ once: true, amount }}
			whileInView="visible"
		>
			{children}
		</motion.section>
	);
}

export default function Home() {
	const reduceMotion = useReducedMotion();
	const heroRef = useRef<HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [openOffer, setOpenOffer] = useState<string | null>(null);
	const [openPractice, setOpenPractice] = useState<string | null>(null);
	const { scrollYProgress } = useScroll();
	const { scrollYProgress: heroProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});
	const heroMediaY = useTransform(heroProgress, [0, 1], [0, -54]);
	const heroCopyY = useTransform(heroProgress, [0, 1], [0, 22]);
	const journeyLinks = [
		{ href: "#start", label: "Start" },
		{ href: "#metoda", label: "Metoda" },
		{ href: "#jak-dziala", label: "Proces" },
		{ href: "#oferta", label: "Oferta" },
		{ href: "#o-nas", label: "O nas" },
		{ href: "#kontakt", label: "Kontakt" },
	];

	return (
		<>
			<motion.div aria-hidden="true" className="page-progress" style={{ scaleX: scrollYProgress }} />
			<a className="skip-link" href="#tresc">
				Przejdź do treści
			</a>

			<motion.header
				animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
				className="site-header"
				initial={reduceMotion ? false : { opacity: 0, y: -18 }}
				transition={{ duration: 0.65, ease: easeOut }}
			>
				<a href="#start" className="brand-link" aria-label="mindcolor - początek strony">
					<Logo />
				</a>
				<nav className="desktop-nav" aria-label="Główna nawigacja">
					<a href="#metoda">Metoda</a>
					<a href="#jak-dziala">Jak działa</a>
					<a href="#oferta">Oferta</a>
					<a href="#o-nas">O nas</a>
				</nav>
				<a className="nav-cta" href="#kontakt">
					Porozmawiajmy <ArrowIcon />
				</a>
				<div className="mobile-nav">
					<button
						aria-expanded={menuOpen}
						aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
						className="mobile-nav-toggle"
						onClick={() => setMenuOpen((current) => !current)}
						type="button"
					>
						<span>Menu</span>
						<AnimatePresence initial={false} mode="wait">
							<motion.span
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								className="mobile-nav-icon"
								exit={{ opacity: 0, rotate: menuOpen ? -45 : 45, scale: 0.75 }}
								initial={{ opacity: 0, rotate: menuOpen ? 45 : -45, scale: 0.75 }}
								key={menuOpen ? "close" : "menu"}
								transition={{ duration: 0.18, ease: easeOut }}
							>
								{menuOpen ? <CloseIcon /> : <MenuIcon />}
							</motion.span>
						</AnimatePresence>
					</button>
					<AnimatePresence>
						{menuOpen && (
							<motion.nav
								animate={{ opacity: 1, scale: 1, y: 0 }}
								aria-label="Nawigacja mobilna"
								className="mobile-nav-panel"
								exit={{ opacity: 0, scale: 0.97, y: -8 }}
								initial={{ opacity: 0, scale: 0.97, y: -8 }}
								transition={{ duration: 0.24, ease: easeOut }}
							>
								<a href="#metoda" onClick={() => setMenuOpen(false)}>
									Metoda
								</a>
								<a href="#jak-dziala" onClick={() => setMenuOpen(false)}>
									Jak działa
								</a>
								<a href="#oferta" onClick={() => setMenuOpen(false)}>
									Oferta
								</a>
								<a href="#o-nas" onClick={() => setMenuOpen(false)}>
									O nas
								</a>
								<a href="#kontakt" onClick={() => setMenuOpen(false)}>
									Kontakt
								</a>
							</motion.nav>
						)}
					</AnimatePresence>
				</div>
			</motion.header>

			<nav className="journey-rail" aria-label="Skróty do sekcji">
				<motion.span aria-hidden="true" className="journey-progress" style={{ scaleY: scrollYProgress }} />
				{journeyLinks.map((link) => (
					<a href={link.href} key={link.href}>
						<span aria-hidden="true" />
						<small>{link.label}</small>
					</a>
				))}
			</nav>

			<main id="tresc">
				<motion.section className="hero section-shell" id="start" ref={heroRef}>
					<motion.div
						animate="visible"
						className="hero-copy"
						initial={reduceMotion ? false : "hidden"}
						style={reduceMotion ? undefined : { y: heroCopyY }}
						variants={heroContainerVariants}
					>
						<motion.p className="eyebrow" variants={heroItemVariants}>
							Autorski, zastrzeżony system pracy z dziećmi i młodzieżą
						</motion.p>
						<motion.h1 variants={heroItemVariants}>
							Nie mów dziecku, żeby się skupiło.
							<span>Pozwól mu tego doświadczyć.</span>
						</motion.h1>
						<motion.p className="hero-lead" variants={heroItemVariants}>
							mindcolor® rozwija kompetencje mentalne przez świadome doświadczenie czterech stanów: koncentracji, spokoju, kreatywności i energii.
						</motion.p>
						<motion.div className="hero-actions" variants={heroItemVariants}>
							<a className="button button-primary" href="#jak-dziala">
								Zobacz, jak to działa <ArrowIcon />
							</a>
							<a className="text-link" href="#oferta">
								Wybierz swoją ścieżkę <ArrowDownIcon className="inline-icon inline-icon-down" />
							</a>
						</motion.div>
						<motion.div aria-label="Dla kogo jest mindcolor" className="hero-audiences" variants={heroItemVariants}>
							<span>Dla rodziców</span>
							<span>Dla trenerów</span>
							<span>Dla specjalistów</span>
						</motion.div>
					</motion.div>

					<motion.div
						animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
						className="hero-visual"
						initial={reduceMotion ? false : { opacity: 0, scale: 0.965, y: 32 }}
						style={reduceMotion ? undefined : { y: heroMediaY }}
						transition={{ delay: 0.18, duration: 1.05, ease: easeOut }}
					>
						<motion.div className="hero-frame" whileHover={reduceMotion ? undefined : { scale: 1.008 }}>
							<Image src="/images/mindcolor-strefa.jpg" alt="Strefa mindcolor z czterema kolorowymi stanowiskami doświadczeń" width={1536} height={2048} priority />
						</motion.div>
						<motion.div
							animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
							className="hero-note"
							transition={{ duration: 5.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
						>
							<span className="hero-note-number">4</span>
							<span>stany mentalne</span>
							<span className="hero-note-divider" />
							<span className="hero-note-number">1</span>
							<span>wspólny język</span>
						</motion.div>
						<motion.div aria-hidden="true" className="color-orbit">
							{["blue", "green", "yellow", "red"].map((color, index) => (
								<motion.span
									animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
									className={`dot dot-${color}`}
									key={color}
									transition={{ delay: index * 0.16, duration: 2.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
								/>
							))}
						</motion.div>
					</motion.div>
				</motion.section>

				<section className="statement-strip" aria-label="Najważniejsza idea marki">
					<motion.div
						animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
						className="statement-track"
						transition={{ duration: 25, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
					>
						{[0, 1].map((copy) => (
							<div aria-hidden={copy === 1} className="statement-group" key={copy}>
								<span>Nie zagadujemy doświadczeń.</span>
								<span className="statement-dot dot-blue" />
								<span>Tworzymy je.</span>
								<span className="statement-dot dot-green" />
								<span>Pomagamy do nich wracać.</span>
								<span className="statement-dot dot-yellow" />
							</div>
						))}
					</motion.div>
				</section>

				<RevealSection className="system section-shell section-spacing" id="metoda">
					<div className="section-intro">
						<p className="eyebrow">Czym jest mindcolor®?</p>
						<h2>To nie są tylko karty. To kompletny system.</h2>
					</div>
					<div className="system-grid">
						<div className="system-copy">
							<p className="large-copy">Dzieci nie rozwijają koncentracji, spokoju czy odwagi tylko dlatego, że ktoś im o nich opowiada.</p>
							<p>
								Potrzebują sytuacji, w której mogą dany stan rozpoznać, przeżyć, nazwać i zapamiętać. Karty, ćwiczenia, pytania, aktywności i bransoletki
								pomagają takie doświadczenie stworzyć - i wrócić do niego wtedy, kiedy jest najbardziej potrzebne.
							</p>
							<div className="system-principles">
								<div>
									<span>01</span>
									<p>Doświadczenie przed instrukcją</p>
								</div>
								<div>
									<span>02</span>
									<p>Prosty język zamiast psychologicznego żargonu</p>
								</div>
								<div>
									<span>03</span>
									<p>Narzędzia, które działają w codzienności</p>
								</div>
							</div>
						</div>
						<motion.figure className="system-figure" whileHover={reduceMotion ? undefined : { y: -6 }}>
							<div className="system-image-frame">
								<Image
									src="/images/mindcolor-karty-bransoletki-v2.jpg"
									alt="Wizualizacja kart i bransoletek mindcolor w czterech kolorach"
									fill
									sizes="(max-width: 860px) calc(100vw - 40px), 52vw"
								/>
							</div>
							<figcaption>Narzędzia są początkiem doświadczenia - nie jego celem.</figcaption>
						</motion.figure>
					</div>
				</RevealSection>

				<RevealSection className="states-section section-spacing" id="stany">
					<div className="section-shell">
						<div className="section-intro section-intro-split">
							<div>
								<p className="eyebrow">Cztery stany mentalne</p>
								<h2>Kolor pomaga zauważyć, czego potrzebuję.</h2>
							</div>
							<p>
								Każdy stan ma własny język, rytm i zestaw doświadczeń. Razem tworzą prostą mapę, z której można korzystać w domu, szkole, sporcie i codziennym
								życiu.
							</p>
						</div>
						<div className="states-grid">
							{states.map((state, index) => (
								<motion.article
									className={`state-card state-${state.color}`}
									initial={reduceMotion ? false : "hidden"}
									key={state.name}
									transition={{ delay: index * 0.07, duration: 0.7, ease: easeOut }}
									variants={cardVariants}
									viewport={{ once: true, amount: 0.2 }}
									whileHover={reduceMotion ? undefined : { y: -8 }}
									whileInView="visible"
								>
									<div className="state-card-top">
										<span className="state-symbol" aria-hidden="true">
											<StateGlyph name={state.icon} />
										</span>
										<span className="state-definition">{state.definition}</span>
									</div>
									<h3>{state.name}</h3>
									<p>{state.description}</p>
									<div className="state-cues" aria-label={`Obszary: ${state.cues.join(", ")}`}>
										{state.cues.map((cue) => (
											<span key={cue}>{cue}</span>
										))}
									</div>
								</motion.article>
							))}
						</div>
					</div>
				</RevealSection>

				<RevealSection className="process-section section-shell section-spacing" id="jak-dziala">
					<div className="section-intro centered-intro">
						<p className="eyebrow">Jak działa mindcolor®?</p>
						<h2>Cztery kroki. Jedno doświadczenie, które zostaje na dłużej.</h2>
					</div>
					<div className="process-grid">
						<motion.span
							aria-hidden="true"
							className="process-line"
							initial={reduceMotion ? false : { scaleX: 0 }}
							transition={{ duration: 1.15, ease: easeOut }}
							viewport={{ once: true, amount: 0.5 }}
							whileInView={{ scaleX: 1 }}
						/>
						{process.map((step, index) => (
							<motion.article
								className="process-card"
								initial={reduceMotion ? false : "hidden"}
								key={step.number}
								transition={{ delay: 0.12 + index * 0.1, duration: 0.68, ease: easeOut }}
								variants={cardVariants}
								viewport={{ once: true, amount: 0.25 }}
								whileHover={reduceMotion ? undefined : { y: -7 }}
								whileInView="visible"
							>
								<div className="process-meta">
									<span>{step.number}</span>
									<span className="process-symbol" aria-hidden="true">
										<ProcessGlyph name={step.icon} />
									</span>
								</div>
								<h3>{step.name}</h3>
								<p>{step.text}</p>
							</motion.article>
						))}
					</div>
					<div className="anchor-callout">
						<div className="anchor-bracelets" aria-hidden="true">
							<span className="bracelet bracelet-blue" />
							<span className="bracelet bracelet-green" />
							<span className="bracelet bracelet-yellow" />
							<span className="bracelet bracelet-red" />
						</div>
						<p>
							<strong>Bransoletka nie jest nagrodą.</strong> Jest kotwicą: przypomina o przeżytym stanie i pomaga świadomie do niego wrócić.
						</p>
					</div>
				</RevealSection>

				<RevealSection className="audiences section-spacing">
					<div className="section-shell">
						<div className="section-intro">
							<p className="eyebrow">Jedna metoda, różne perspektywy</p>
							<h2>Zobacz, co mindcolor® wnosi do Twojej codzienności.</h2>
						</div>
						<div className="audience-grid">
							<motion.article
								initial={reduceMotion ? false : "hidden"}
								transition={{ duration: 0.72, ease: easeOut }}
								variants={cardVariants}
								viewport={{ once: true, amount: 0.2 }}
								whileHover={reduceMotion ? undefined : { y: -8 }}
								whileInView="visible"
							>
								<span className="audience-index">01 / Rodzic</span>
								<h3>Mniej poleceń. Więcej rozmowy i wspólnego języka.</h3>
								<ul>
									<li>proste aktywności do wykorzystania na co dzień;</li>
									<li>wsparcie dziecka bez roli „domowego psychologa”;</li>
									<li>kolor jako czytelny sygnał tego, czego potrzeba.</li>
								</ul>
								<a href="#kontakt">
									Porozmawiaj z nami <ArrowIcon />
								</a>
							</motion.article>
							<motion.article
								initial={reduceMotion ? false : "hidden"}
								transition={{ delay: 0.08, duration: 0.72, ease: easeOut }}
								variants={cardVariants}
								viewport={{ once: true, amount: 0.2 }}
								whileHover={reduceMotion ? undefined : { y: -8 }}
								whileInView="visible"
							>
								<span className="audience-index">02 / Trener</span>
								<h3>Trening mentalny, który można połączyć z ruchem.</h3>
								<ul>
									<li>gotowa struktura możliwa do dopasowania do grupy;</li>
									<li>ćwiczenia, które angażują zamiast moralizować;</li>
									<li>wspólny język dla zawodnika, trenera i rodzica.</li>
								</ul>
								<a href="#pro">
									Poznaj mindcolor PRO <ArrowIcon />
								</a>
							</motion.article>
							<motion.article
								initial={reduceMotion ? false : "hidden"}
								transition={{ delay: 0.16, duration: 0.72, ease: easeOut }}
								variants={cardVariants}
								viewport={{ once: true, amount: 0.2 }}
								whileHover={reduceMotion ? undefined : { y: -8 }}
								whileInView="visible"
							>
								<span className="audience-index">03 / Specjalista</span>
								<h3>Konkretny proces zamiast kolejnej teczki materiałów.</h3>
								<ul>
									<li>scenariusze, pytania i narzędzia rozwijane do pracy;</li>
									<li>model prowadzenia uczestnika przez doświadczenie;</li>
									<li>planowany program wdrożeniowy i społeczność praktyków.</li>
								</ul>
								<a href="#pro">
									Dołącz do listy zainteresowanych <ArrowIcon />
								</a>
							</motion.article>
						</div>
					</div>
				</RevealSection>

				<RevealSection className="manifest section-spacing" amount={0.2}>
					<div className="manifest-inner section-shell">
						<p className="eyebrow eyebrow-light">W co wierzymy</p>
						<div className="manifest-lines">
							{[
								"Kompetencje mentalne zaczynają się w domu.",
								"Intuicja rodzica ma ogromną wartość.",
								"Trener inspiruje bardziej, niż motywuje.",
								"Doświadczenie zostaje dłużej niż instrukcja.",
							].map((line, index) => (
								<motion.p
									initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
									key={line}
									transition={{ delay: index * 0.08, duration: 0.75, ease: easeOut }}
									viewport={{ once: true, amount: 0.4 }}
									whileInView={{ opacity: 1, x: 0 }}
								>
									{line}
								</motion.p>
							))}
						</div>
						<div className="manifest-footer">
							<Logo />
							<span>Rozwój, który naprawdę można poczuć.</span>
						</div>
					</div>
				</RevealSection>

				<RevealSection className="offer-section section-shell section-spacing" id="oferta">
					<div className="section-intro section-intro-split">
						<div>
							<p className="eyebrow">Oferta</p>
							<h2>Wybierz formę, która pasuje do Twojej sytuacji.</h2>
						</div>
						<p>Nie każda grupa potrzebuje tego samego. Zaczynamy od rozmowy i dobieramy format do wieku, miejsca, celu oraz czasu.</p>
					</div>
					<div className="offer-list">
						{offers.map((offer, index) => {
							const isOpen = openOffer === offer.number;

							return (
							<motion.div
								className={`offer-item${isOpen ? " is-open" : ""}`}
								initial={reduceMotion ? false : { opacity: 0, y: 24 }}
								key={offer.number}
								transition={{ delay: index * 0.05, duration: 0.66, ease: easeOut }}
								viewport={{ once: true, amount: 0.2 }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<button
									aria-controls={`offer-${offer.number}`}
									aria-expanded={isOpen}
									className="offer-summary"
									onClick={() => setOpenOffer(isOpen ? null : offer.number)}
									type="button"
								>
									<span className="offer-number">{offer.number}</span>
									<span className="offer-title-wrap">
										<strong>{offer.title}</strong>
										<small>{offer.audience}</small>
									</span>
									<span className="offer-lead">{offer.lead}</span>
									<motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="offer-toggle" transition={{ duration: 0.28, ease: easeOut }}>
										<PlusIcon />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											animate={{ height: "auto", opacity: 1 }}
											className="offer-details-shell"
											exit={{ height: 0, opacity: 0 }}
											id={`offer-${offer.number}`}
											initial={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.38, ease: easeOut }}
										>
											<div className="offer-details">
												<p>{offer.details}</p>
												<a className="text-link" href="#kontakt">
													{offer.cta} <ArrowIcon />
												</a>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
							);
						})}
					</div>
				</RevealSection>

				<RevealSection className="pro-section section-shell section-spacing" id="pro">
					<div className="pro-card">
						<motion.span
							animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.035, 1] }}
							aria-hidden="true"
							className="pro-orbit pro-orbit-blue"
							transition={{ duration: 24, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
						/>
						<motion.span
							animate={reduceMotion ? undefined : { rotate: -360, scale: [1, 0.96, 1] }}
							aria-hidden="true"
							className="pro-orbit pro-orbit-red"
							transition={{ duration: 29, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
						/>
						<div className="pro-heading">
							<span className="status-badge">Już wkrótce</span>
							<p className="eyebrow">Program dla specjalistów</p>
							<h2>
								mindcolor <span>PRO</span>
							</h2>
							<p className="pro-lead">Rozwijany program prowadzenia zajęć dla trenerów, psychologów, pedagogów, wychowawców i nauczycieli.</p>
							<a className="button button-light" href="#kontakt">
								Chcę otrzymać informacje o starcie <ArrowIcon />
							</a>
						</div>
						<div className="pro-benefits">
							<p className="pro-benefits-title">W programie planujemy:</p>
							<ul>
								<li>
									<span>01</span> gotowy model i strukturę zajęć;
								</li>
								<li>
									<span>02</span> scenariusze, ćwiczenia i zestawy narzędzi;
								</li>
								<li>
									<span>03</span> ścieżkę certyfikacji i licencję na pracę metodą;
								</li>
								<li>
									<span>04</span> materiały do druku, książkę i inspiracje;
								</li>
								<li>
									<span>05</span> społeczność, aktualizacje oraz wsparcie.
								</li>
							</ul>
						</div>
					</div>
				</RevealSection>

				<RevealSection className="tools-section section-spacing">
					<div className="section-shell tools-grid">
						<motion.figure className="tools-image" whileHover={reduceMotion ? undefined : { scale: 1.012 }}>
							<Image
								src="/images/mindcolor-boxy-v2.jpg"
								alt="Wizualizacja czterech zestawów mindcolor odpowiadających czterem stanom mentalnym"
								fill
								sizes="(max-width: 860px) calc(100vw - 40px), 56vw"
							/>
						</motion.figure>
						<div className="tools-copy">
							<p className="eyebrow">Narzędzia mindcolor®</p>
							<h2>Doświadczenie zaczyna się od prostego impulsu.</h2>
							<p>Karty, boxy i bransoletki porządkują proces. Pomagają wejść w wybrany stan, poprowadzić rozmowę i utrwalić to, co uczestnik właśnie odkrył.</p>
							<div className="tools-list">
								<span>Uniwersalny zestaw kart</span>
								<span>Boxy w czterech kolorach</span>
								<span>Personalizowane zestawy</span>
								<span>Materiały dodatkowe</span>
							</div>
							<div className="coming-link" aria-label="Sklep na Naffy w przygotowaniu">
								<span>Sklep na Naffy</span>
								<small>w przygotowaniu</small>
							</div>
						</div>
					</div>
				</RevealSection>

				<RevealSection className="inspiration section-shell section-spacing" id="inspiracje">
					<div className="section-intro section-intro-split">
						<div>
							<p className="eyebrow">Inspiracje</p>
							<h2>Małe doświadczenia do prawdziwego życia.</h2>
						</div>
						<p>Nie czekaj na specjalną okazję. Otwórz wybrany kolor i wypróbuj małe doświadczenie tu i teraz.</p>
					</div>
					<div className="inspiration-grid">
						{practices.map((practice, index) => {
							const isOpen = openPractice === practice.color;

							return (
							<motion.div
								className={`inspiration-card inspiration-${practice.color}${isOpen ? " is-open" : ""}`}
								initial={reduceMotion ? false : "hidden"}
								key={practice.color}
								transition={{ delay: index * 0.07, duration: 0.7, ease: easeOut }}
								variants={cardVariants}
								viewport={{ once: true, amount: 0.2 }}
								whileHover={reduceMotion || isOpen ? undefined : { y: -7 }}
								whileInView="visible"
							>
								<button
									aria-controls={`practice-${practice.color}`}
									aria-expanded={isOpen}
									className="inspiration-summary"
									onClick={() => setOpenPractice(isOpen ? null : practice.color)}
									type="button"
								>
									<span>{practice.meta}</span>
									<h3>{practice.title}</h3>
									<p>{practice.lead}</p>
									<motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="inspiration-toggle" transition={{ duration: 0.28, ease: easeOut }}>
										<PlusIcon />
									</motion.span>
									<small>{isOpen ? "Zamknij ćwiczenie" : "Otwórz ćwiczenie"}</small>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											animate={{ height: "auto", opacity: 1 }}
											className="inspiration-details-shell"
											exit={{ height: 0, opacity: 0 }}
											id={`practice-${practice.color}`}
											initial={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.4, ease: easeOut }}
										>
											<div className="inspiration-details">
												<p>{practice.instruction}</p>
												<strong>{practice.question}</strong>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
							);
						})}
					</div>
				</RevealSection>

				<RevealSection className="about section-spacing" id="o-nas">
					<div className="section-shell about-grid">
						<div className="about-copy">
							<p className="eyebrow">O nas</p>
							<h2>Powstało z praktyki - nie z teorii zamkniętej w podręczniku.</h2>
							<p className="large-copy">
								Pomysł zaczął się od obserwacji dzieci i rozmów z rodzicami. Pierwsze ćwiczenia testowałyśmy w małych grupach, na warsztatach i zajęciach ruchowych.
							</p>
							<p>
								Stworzyłyśmy mindcolor®, bo samo „skup się”, „uspokój się” czy „uwierz w siebie” nie wystarcza. Dziecko potrzebuje przestrzeni, by dany stan
								naprawdę poczuć i nauczyć się do niego wracać.
							</p>
							<a className="text-link" href="https://zycieregionu.com.pl/2026/06/01/mindcolor-ster-emocji/" target="_blank" rel="noreferrer">
								Poznaj historię mindcolor® <ArrowIcon />
							</a>
						</div>
						<div className="founder-portraits" aria-label="Twórczynie mindcolor">
							<motion.figure
								className="founder-card"
								initial={reduceMotion ? false : { opacity: 0, rotate: -2.5, y: 28 }}
								transition={{ duration: 0.75, ease: easeOut }}
								viewport={{ once: true, amount: 0.25 }}
								whileHover={reduceMotion ? undefined : { rotate: -1, y: -7 }}
								whileInView={{ opacity: 1, rotate: -1, y: 0 }}
							>
								<div className="founder-photo founder-photo-blue">
									<Image
										src="/images/katarzyna-gawin-lelonek.jpg"
										alt="Katarzyna Gawin-Lelonek"
										width={560}
										height={560}
										sizes="(max-width: 620px) 72vw, 260px"
										style={{ width: "100%", height: "auto" }}
									/>
								</div>
								<figcaption>
									<strong>Katarzyna Gawin-Lelonek</strong>
									<span>trenerka mentalna w sporcie, pedagożka, konsultantka odporności psychicznej</span>
								</figcaption>
							</motion.figure>
							<motion.figure
								className="founder-card founder-card-offset"
								initial={reduceMotion ? false : { opacity: 0, rotate: 2.5, y: 34 }}
								transition={{ delay: 0.1, duration: 0.75, ease: easeOut }}
								viewport={{ once: true, amount: 0.25 }}
								whileHover={reduceMotion ? undefined : { rotate: 1, y: -7 }}
								whileInView={{ opacity: 1, rotate: 1, y: 0 }}
							>
								<div className="founder-photo founder-photo-red">
									<Image
										src="/images/krystyna-swiderska-bem.jpg"
										alt="Krystyna Świderska-Bem"
										width={620}
										height={620}
										sizes="(max-width: 620px) 72vw, 260px"
										style={{ width: "100%", height: "auto" }}
									/>
								</div>
								<figcaption>
									<strong>Krystyna Świderska-Bem</strong>
									<span>trenerka mentalna w sporcie</span>
								</figcaption>
							</motion.figure>
						</div>
					</div>
				</RevealSection>

				<RevealSection className="contact section-spacing" id="kontakt">
					<div className="section-shell contact-grid">
						<div className="contact-copy">
							<p className="eyebrow eyebrow-light">Kontakt</p>
							<h2>Powiedz nam, czego potrzebujesz. Zaczniemy od rozmowy.</h2>
							<p>Warsztat, strefa na wydarzeniu, konsultacja, szkolenie czy mindcolor PRO? Napisz kilka zdań - wrócimy z właściwym kolejnym krokiem.</p>
							<div className="contact-direct">
								<span>E-mail</span>
								<a href="mailto:kontakt@mindcolor.pl">kontakt@mindcolor.pl</a>
							</div>
						</div>
						<ContactForm />
					</div>
				</RevealSection>

				<RevealSection className="newsletter" amount={0.3}>
					<div className="section-shell newsletter-inner">
						<div>
							<p className="eyebrow">Bądź blisko</p>
							<h2>Ćwiczenia, inspiracje i kolejne kroki mindcolor®.</h2>
						</div>
						<a className="button button-primary" href="mailto:kontakt@mindcolor.pl?subject=Chcę%20dołączyć%20do%20newslettera%20mindcolor">
							Dołącz do newslettera <ArrowIcon />
						</a>
					</div>
				</RevealSection>
			</main>

			<footer className="site-footer">
				<div className="section-shell footer-grid">
					<div className="footer-brand">
						<Logo />
						<p>Kompetencje mentalne dzieci i młodzieży rozwijane poprzez doświadczenie.</p>
					</div>
					<div className="footer-links">
						<a href="#metoda">Metoda</a>
						<a href="#jak-dziala">Jak działa</a>
						<a href="#oferta">Oferta</a>
						<a href="#o-nas">O nas</a>
						<a href="#kontakt">Kontakt</a>
					</div>
					<div className="footer-status">
						<span>Warsztaty • Strefy • Konsultacje</span>
						<small>Dla rodzin, szkół, klubów i wydarzeń</small>
					</div>
				</div>
				<div className="section-shell footer-bottom">
					<span>© 2026 mindcolor®</span>
					<span>mindcolor® jest zastrzeżonym znakiem słowno-graficznym.</span>
				</div>
			</footer>
		</>
	);
}
