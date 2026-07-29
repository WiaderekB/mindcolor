"use client";

import type { FormEvent } from "react";

export default function ContactForm() {
	function prepareMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const name = String(data.get("Imię") ?? "").trim();
		const email = String(data.get("E-mail") ?? "").trim();
		const topic = String(data.get("Temat") ?? "Współpraca").trim();
		const message = String(data.get("Wiadomość") ?? "").trim();
		const subject = `mindcolor® - ${topic}`;
		const body = [`Dzień dobry,`, "", message, "", `Imię: ${name}`, `E-mail zwrotny: ${email}`].join("\n");

		window.location.href = `mailto:kontakt@mindcolor.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	return (
		<form className="contact-form" onSubmit={prepareMessage}>
			<label>
				<span>Imię</span>
				<input type="text" name="Imię" autoComplete="name" required />
			</label>
			<label>
				<span>E-mail</span>
				<input type="email" name="E-mail" autoComplete="email" required />
			</label>
			<label>
				<span>Temat</span>
				<select name="Temat" defaultValue="" required>
					<option value="" disabled>
						Wybierz temat
					</option>
					<option>Warsztaty</option>
					<option>Strefa mindcolor®</option>
					<option>Konsultacje</option>
					<option>Wystąpienie</option>
					<option>Szkolenie</option>
					<option>mindcolor PRO</option>
					<option>Inny temat</option>
				</select>
			</label>
			<label>
				<span>Wiadomość</span>
				<textarea name="Wiadomość" rows={4} required />
			</label>
			<button className="button button-light" type="submit">
				Przygotuj wiadomość <span aria-hidden="true">↗</span>
			</button>
			<small>Po kliknięciu otworzy się Twoja aplikacja pocztowa z gotową, uzupełnioną wiadomością.</small>
		</form>
	);
}
