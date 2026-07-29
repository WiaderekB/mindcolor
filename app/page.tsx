import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
	title: "mindcolor® - kompetencje mentalne poprzez doświadczenie",
	description: "mindcolor® to praktyczny system rozwijania koncentracji, spokoju, kreatywności i energii u dzieci i młodzieży.",
};

const states = [
	{
		name: "Koncentracja",
		color: "blue",
		symbol: "◎",
		definition: "Skupiam się",
		description: "Uwaga kieruje się na to, co w tej chwili naprawdę ważne. Jedno zadanie, jeden krok, świadoma obecność.",
		cues: ["fokus", "uważność", "planowanie"],
	},
	{
		name: "Spokój",
		color: "green",
		symbol: "∿",
		definition: "Reguluję",
		description: "Napięcie opada, oddech zwalnia, a dziecko odzyskuje równowagę i kontakt ze sobą.",
		cues: ["oddech", "równowaga", "powrót do siebie"],
	},
	{
		name: "Kreatywność",
		color: "yellow",
		symbol: "✦",
		definition: "Szukam rozwiązań",
		description: "Pojawia się ciekawość, elastyczność i gotowość, by spróbować inaczej - bez lęku przed błędem.",
		cues: ["pomysły", "lekkość", "nowe możliwości"],
	},
	{
		name: "Energia",
		color: "red",
		symbol: "↗",
		definition: "Działam",
		description: "Ciało i myśli są gotowe do ruchu. To odwaga, zaangażowanie i decyzja, by zrobić pierwszy krok.",
		cues: ["odwaga", "motywacja", "wytrwałość"],
	},
];

const process = [
	{
		number: "01",
		name: "Rozpoznaj",
		symbol: "◉",
		text: "Zatrzymaj się i sprawdź, czego potrzebujesz w tej chwili.",
	},
	{
		number: "02",
		name: "Doświadcz",
		symbol: "✦",
		text: "Wejdź w wybrany stan przez ruch, ćwiczenie, pytanie lub zabawę.",
	},
	{
		number: "03",
		name: "Nazwij",
		symbol: "“”",
		text: "Zauważ i opowiedz, co wydarzyło się w ciele, emocjach i myślach.",
	},
	{
		number: "04",
		name: "Zakotwicz",
		symbol: "⌁",
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
	return <span aria-hidden="true">↗</span>;
}

export default function Home() {
	return (
		<>
			<a className="skip-link" href="#tresc">
				Przejdź do treści
			</a>

			<header className="site-header">
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
				<details className="mobile-nav">
					<summary aria-label="Otwórz menu">Menu</summary>
					<div className="mobile-nav-panel">
						<a href="#metoda">Metoda</a>
						<a href="#jak-dziala">Jak działa</a>
						<a href="#oferta">Oferta</a>
						<a href="#o-nas">O nas</a>
						<a href="#kontakt">Kontakt</a>
					</div>
				</details>
			</header>

			<main id="tresc">
				<section className="hero section-shell" id="start">
					<div className="hero-copy">
						<p className="eyebrow">Autorski, zastrzeżony system pracy z dziećmi i młodzieżą</p>
						<h1>
							Nie mów dziecku, żeby się skupiło.
							<span>Pozwól mu tego doświadczyć.</span>
						</h1>
						<p className="hero-lead">
							mindcolor® rozwija kompetencje mentalne przez świadome doświadczenie czterech stanów: koncentracji, spokoju, kreatywności i energii.
						</p>
						<div className="hero-actions">
							<a className="button button-primary" href="#jak-dziala">
								Zobacz, jak to działa <ArrowIcon />
							</a>
							<a className="text-link" href="#oferta">
								Wybierz swoją ścieżkę <span aria-hidden="true">↓</span>
							</a>
						</div>
						<div className="hero-audiences" aria-label="Dla kogo jest mindcolor">
							<span>Dla rodziców</span>
							<span>Dla trenerów</span>
							<span>Dla specjalistów</span>
						</div>
					</div>

					<div className="hero-visual">
						<div className="hero-frame">
							<Image src="/images/mindcolor-strefa.jpg" alt="Strefa mindcolor z czterema kolorowymi stanowiskami doświadczeń" width={1536} height={2048} priority />
						</div>
						<div className="hero-note">
							<span className="hero-note-number">4</span>
							<span>stany mentalne</span>
							<span className="hero-note-divider" />
							<span className="hero-note-number">1</span>
							<span>wspólny język</span>
						</div>
						<div className="color-orbit" aria-hidden="true">
							<span className="dot dot-blue" />
							<span className="dot dot-green" />
							<span className="dot dot-yellow" />
							<span className="dot dot-red" />
						</div>
					</div>
				</section>

				<section className="statement-strip" aria-label="Najważniejsza idea marki">
					<div className="statement-track">
						<span>Nie zagadujemy doświadczeń.</span>
						<span className="statement-dot dot-blue" />
						<span>Tworzymy je.</span>
						<span className="statement-dot dot-green" />
						<span>Pomagamy do nich wracać.</span>
					</div>
				</section>

				<section className="system section-shell section-spacing reveal-section" id="metoda">
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
						<figure className="system-figure">
							<div className="system-image-frame">
								<Image
									src="/images/mindcolor-karty-bransoletki-v2.jpg"
									alt="Wizualizacja kart i bransoletek mindcolor w czterech kolorach"
									fill
									sizes="(max-width: 860px) calc(100vw - 40px), 52vw"
								/>
							</div>
							<figcaption>Narzędzia są początkiem doświadczenia - nie jego celem.</figcaption>
						</figure>
					</div>
				</section>

				<section className="states-section section-spacing reveal-section" id="stany">
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
							{states.map((state) => (
								<article className={`state-card state-${state.color} reveal-item`} key={state.name}>
									<div className="state-card-top">
										<span className="state-symbol" aria-hidden="true">
											{state.symbol}
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
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="process-section section-shell section-spacing reveal-section" id="jak-dziala">
					<div className="section-intro centered-intro">
						<p className="eyebrow">Jak działa mindcolor®?</p>
						<h2>Cztery kroki. Jedno doświadczenie, które zostaje na dłużej.</h2>
					</div>
					<div className="process-grid">
						{process.map((step) => (
							<article className="process-card reveal-item" key={step.number}>
								<div className="process-meta">
									<span>{step.number}</span>
									<span className="process-symbol" aria-hidden="true">
										{step.symbol}
									</span>
								</div>
								<h3>{step.name}</h3>
								<p>{step.text}</p>
							</article>
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
				</section>

				<section className="audiences section-spacing reveal-section">
					<div className="section-shell">
						<div className="section-intro">
							<p className="eyebrow">Jedna metoda, różne perspektywy</p>
							<h2>Zobacz, co mindcolor® wnosi do Twojej codzienności.</h2>
						</div>
						<div className="audience-grid">
							<article className="reveal-item">
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
							</article>
							<article className="reveal-item">
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
							</article>
							<article className="reveal-item">
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
							</article>
						</div>
					</div>
				</section>

				<section className="manifest section-spacing reveal-section">
					<div className="manifest-inner section-shell">
						<p className="eyebrow eyebrow-light">W co wierzymy</p>
						<div className="manifest-lines">
							<p>Kompetencje mentalne zaczynają się w domu.</p>
							<p>Intuicja rodzica ma ogromną wartość.</p>
							<p>Trener inspiruje bardziej, niż motywuje.</p>
							<p>Doświadczenie zostaje dłużej niż instrukcja.</p>
						</div>
						<div className="manifest-footer">
							<Logo />
							<span>Rozwój, który naprawdę można poczuć.</span>
						</div>
					</div>
				</section>

				<section className="offer-section section-shell section-spacing reveal-section" id="oferta">
					<div className="section-intro section-intro-split">
						<div>
							<p className="eyebrow">Oferta</p>
							<h2>Wybierz formę, która pasuje do Twojej sytuacji.</h2>
						</div>
						<p>Nie każda grupa potrzebuje tego samego. Zaczynamy od rozmowy i dobieramy format do wieku, miejsca, celu oraz czasu.</p>
					</div>
					<div className="offer-list">
						{offers.map((offer) => (
							<details className="offer-item reveal-item" key={offer.number}>
								<summary>
									<span className="offer-number">{offer.number}</span>
									<span className="offer-title-wrap">
										<strong>{offer.title}</strong>
										<small>{offer.audience}</small>
									</span>
									<span className="offer-lead">{offer.lead}</span>
									<span className="offer-toggle" aria-hidden="true">
										+
									</span>
								</summary>
								<div className="offer-details">
									<p>{offer.details}</p>
									<a className="text-link" href="#kontakt">
										{offer.cta} <ArrowIcon />
									</a>
								</div>
							</details>
						))}
					</div>
				</section>

				<section className="pro-section section-shell section-spacing reveal-section" id="pro">
					<div className="pro-card">
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
				</section>

				<section className="tools-section section-spacing reveal-section">
					<div className="section-shell tools-grid">
						<figure className="tools-image">
							<Image
								src="/images/mindcolor-boxy-v2.jpg"
								alt="Wizualizacja czterech zestawów mindcolor odpowiadających czterem stanom mentalnym"
								fill
								sizes="(max-width: 860px) calc(100vw - 40px), 56vw"
							/>
						</figure>
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
				</section>

				<section className="inspiration section-shell section-spacing reveal-section" id="inspiracje">
					<div className="section-intro section-intro-split">
						<div>
							<p className="eyebrow">Inspiracje</p>
							<h2>Małe doświadczenia do prawdziwego życia.</h2>
						</div>
						<p>Nie czekaj na specjalną okazję. Otwórz wybrany kolor i wypróbuj małe doświadczenie tu i teraz.</p>
					</div>
					<div className="inspiration-grid">
						{practices.map((practice) => (
							<details className={`inspiration-card inspiration-${practice.color} reveal-item`} key={practice.color}>
								<summary>
									<span>{practice.meta}</span>
									<h3>{practice.title}</h3>
									<p>{practice.lead}</p>
									<span className="inspiration-toggle" aria-hidden="true">
										+
									</span>
									<small>Otwórz ćwiczenie</small>
								</summary>
								<div className="inspiration-details">
									<p>{practice.instruction}</p>
									<strong>{practice.question}</strong>
								</div>
							</details>
						))}
					</div>
				</section>

				<section className="about section-spacing reveal-section" id="o-nas">
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
							<figure className="founder-card reveal-item">
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
							</figure>
							<figure className="founder-card founder-card-offset reveal-item">
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
							</figure>
						</div>
					</div>
				</section>

				<section className="contact section-spacing reveal-section" id="kontakt">
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
				</section>

				<section className="newsletter">
					<div className="section-shell newsletter-inner">
						<div>
							<p className="eyebrow">Bądź blisko</p>
							<h2>Ćwiczenia, inspiracje i kolejne kroki mindcolor®.</h2>
						</div>
						<a className="button button-primary" href="mailto:kontakt@mindcolor.pl?subject=Chcę%20dołączyć%20do%20newslettera%20mindcolor">
							Dołącz do newslettera <ArrowIcon />
						</a>
					</div>
				</section>
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
