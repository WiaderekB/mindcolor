"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import { ArrowUpRightIcon } from "./icons";

type ContactField = "Imię" | "E-mail" | "Temat" | "Wiadomość";
type ContactControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const fieldErrorIds: Record<ContactField, string> = {
	"Imię": "contact-name-error",
	"E-mail": "contact-email-error",
	"Temat": "contact-topic-error",
	"Wiadomość": "contact-message-error",
};

function getFieldError(control: ContactControl) {
	if (!control.validity.valid) {
		if (control.validity.typeMismatch) return "Wpisz poprawny adres e-mail.";
		return "To pole jest wymagane.";
	}

	return "";
}

export default function ContactForm() {
	const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});

	function validateControl(control: ContactControl) {
		const fieldName = control.name as ContactField;
		const error = getFieldError(control);

		setErrors((current) => ({ ...current, [fieldName]: error }));
	}

	function validateOnBlur(event: FocusEvent<ContactControl>) {
		validateControl(event.currentTarget);
	}

	function prepareMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const controls = Array.from(event.currentTarget.elements).filter((element): element is ContactControl => {
			return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;
		});
		const nextErrors = Object.fromEntries(controls.map((control) => [control.name, getFieldError(control)])) as Record<ContactField, string>;
		const firstInvalidControl = controls.find((control) => nextErrors[control.name as ContactField]);

		setErrors(nextErrors);

		if (firstInvalidControl) {
			firstInvalidControl.focus();
			return;
		}

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
		<form aria-describedby="contact-required-note contact-form-note" className="contact-form" noValidate onSubmit={prepareMessage}>
			<p className="contact-required-note" id="contact-required-note">
				Wszystkie pola są wymagane.
			</p>
			<label>
				<span>Imię</span>
				<input
					aria-describedby={errors["Imię"] ? fieldErrorIds["Imię"] : undefined}
					aria-invalid={Boolean(errors["Imię"])}
					autoComplete="name"
					name="Imię"
					onBlur={validateOnBlur}
					required
					type="text"
				/>
				{errors["Imię"] && (
					<small className="form-error" id={fieldErrorIds["Imię"]}>
						{errors["Imię"]}
					</small>
				)}
			</label>
			<label>
				<span>E-mail</span>
				<input
					aria-describedby={errors["E-mail"] ? fieldErrorIds["E-mail"] : undefined}
					aria-invalid={Boolean(errors["E-mail"])}
					autoComplete="email"
					name="E-mail"
					onBlur={validateOnBlur}
					required
					type="email"
				/>
				{errors["E-mail"] && (
					<small className="form-error" id={fieldErrorIds["E-mail"]}>
						{errors["E-mail"]}
					</small>
				)}
			</label>
			<label>
				<span>Temat</span>
				<select
					aria-describedby={errors["Temat"] ? fieldErrorIds["Temat"] : undefined}
					aria-invalid={Boolean(errors["Temat"])}
					defaultValue=""
					name="Temat"
					onBlur={validateOnBlur}
					required
				>
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
				{errors["Temat"] && (
					<small className="form-error" id={fieldErrorIds["Temat"]}>
						{errors["Temat"]}
					</small>
				)}
			</label>
			<label>
				<span>Wiadomość</span>
				<textarea
					aria-describedby={errors["Wiadomość"] ? fieldErrorIds["Wiadomość"] : undefined}
					aria-invalid={Boolean(errors["Wiadomość"])}
					name="Wiadomość"
					onBlur={validateOnBlur}
					required
					rows={4}
				/>
				{errors["Wiadomość"] && (
					<small className="form-error" id={fieldErrorIds["Wiadomość"]}>
						{errors["Wiadomość"]}
					</small>
				)}
			</label>
			<button className="button button-light" type="submit">
				Przygotuj wiadomość <ArrowUpRightIcon className="button-icon" />
			</button>
			<small id="contact-form-note">Po kliknięciu otworzy się Twoja aplikacja pocztowa z gotową, uzupełnioną wiadomością.</small>
		</form>
	);
}
