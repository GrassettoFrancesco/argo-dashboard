import { AppelloIndexes } from "@/app/utils";
import type { Client, Dashboard } from "portaleargo-api";
import attività from "../icons/attivita-svolta.svg";
import bachecaAlunno from "../icons/bacheca-alunno.svg";
import bacheca from "../icons/bacheca.svg";
import appello from "../icons/calendario.svg";
import compiti from "../icons/compiti-assegnati.svg";
import condivisione from "../icons/condivisione-documenti.svg";
import curriculum from "../icons/curriculum.svg";
import note from "../icons/note-personali.svg";
import orario from "../icons/orario.svg";
import promemoria from "../icons/promemoria-classe.svg";
import ricevimento from "../icons/ricevimento-docenti.svg";
import pagamenti from "../icons/tasse-icon.svg";
import votiGiornalieri from "../icons/voti-giornalieri.svg";
import votiScrutinio from "../icons/voti-scrutinio.svg";
import MenuEntry from "./MenuEntry";

//#region
const appelloTitles: ((n: number) => string)[] = [
	(n) => `assenz${n === 1 ? "a" : "e"}`,
	(n) => `ritard${n === 1 ? "o" : "i"}`,
	(n) => `uscit${n === 1 ? "a" : "e"}`,
	() => "fuori classe",
];
const timeTitles = ["entro domani", "successivi"];

const resolveAppello = (dashboard: Dashboard) => {
	const result = [0, 0, 0, dashboard.fuoriClasse.length];

	for (const entry of dashboard.appello)
		result[AppelloIndexes[entry.codEvento as keyof typeof AppelloIndexes]]++;
	return (
		result
			.map((n, i) => n && `${n} ${appelloTitles[i](n)}`)
			.filter((n) => n)
			.join(", ") || "Nessun evento"
	);
};
const resolveVoti = (dashboard: Dashboard) => {
	const now = Date.now();
	const { length } = dashboard.voti.filter((entry) => {
		const date = new Date(entry.datEvento);

		return date.setDate(date.getDate() + 1) >= now;
	});

	return `Media generale: ${dashboard.mediaGenerale}${
		length ? ` — ${length} voti recenti` : ""
	}`;
};
const resolveNote = (dashboard: Dashboard) =>
	`${dashboard.noteDisciplinari.length} note disciplinari`;
const resolveAttività = (dashboard: Dashboard) => {
	const now = Date.now();
	const { length } = dashboard.registro.filter(
		(entry) => entry.attivita && new Date(entry.datGiorno).getTime() > now
	);

	return length
		? `${length} attività programmat${length === 1 ? "a" : "e"}`
		: "Nessuna attività programmata";
};
const resolveCompiti = (dashboard: Dashboard) => {
	const now = Date.now();
	const counts = [0, 0];

	for (const entry of dashboard.registro)
		for (const homework of entry.compiti) {
			const date = new Date(homework.dataConsegna);
			const time = date.getTime();

			if (date.setDate(date.getDate() - 1) > now) counts[1]++;
			else if (time > now) counts[0]++;
		}
	return (
		counts
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun compito"
	);
};
const resolvePromemoria = (dashboard: Dashboard) => {
	const now = Date.now();
	const counts = [0, 0];

	for (const entry of dashboard.promemoria) {
		const date = new Date(entry.datGiorno);
		const time = date.getTime();

		if (date.setDate(date.getDate() - 1) > now) counts[1]++;
		else if (time > now) counts[0]++;
	}
	return (
		counts
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun promemoria"
	);
};
const resolvePrenotazioni = (dashboard: Dashboard) => {
	const now = Date.now();
	const counts = [0, 0];

	for (const entry of dashboard.prenotazioniAlunni) {
		if (entry.prenotazione.flgAnnullato === "E") continue;
		const date = new Date(entry.disponibilita.datDisponibilita);
		const time = date.getTime();

		if (date.setDate(date.getDate() - 1) > now) counts[1]++;
		else if (time > now) counts[0]++;
	}
	return (
		counts
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun ricevimento"
	);
};
const resolveBacheca = (dashboard: Dashboard) => {
	const now = Date.now();

	return `${
		dashboard.bacheca.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		}).length
	} comunicazioni recenti`;
};
const resolveBachecaAlunno = (dashboard: Dashboard) => {
	const now = Date.now();

	return `${
		dashboard.bachecaAlunno.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		}).length
	} comunicazioni recenti`;
};
//#endregion

const MenuList = ({
	client,
	className,
}: {
	client: Client;
	className?: string;
}) => (
	<>
		<MenuEntry
			summary={client.dashboard && resolveAppello(client.dashboard)}
			color="#07abbe"
			icon={appello}
			name="Eventi appello"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveNote(client.dashboard)}
			color="#ffb498"
			icon={note}
			name="Note"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveVoti(client.dashboard)}
			color="#e06f5c"
			icon={votiGiornalieri}
			name="Voti giornalieri"
			active={false}
			className={className}
		/>
		<MenuEntry
			color="#9f72d5"
			icon={votiScrutinio}
			name="Voti scrutinio"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveAttività(client.dashboard)}
			color="#3e90d8"
			icon={attività}
			name="Attività svolta"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveCompiti(client.dashboard)}
			color="#7080fe"
			icon={compiti}
			name="Compiti assegnati"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolvePromemoria(client.dashboard)}
			color="#ff5d63"
			icon={promemoria}
			name="Promemoria"
			active={false}
			className={className}
		/>
		<MenuEntry
			color="#f8b3ca"
			icon={orario}
			name="Orario"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolvePrenotazioni(client.dashboard)}
			color="#90c078"
			icon={ricevimento}
			name="Ricevimento docenti"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveBacheca(client.dashboard)}
			color="#06aabe"
			icon={bacheca}
			name="Bacheca"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={client.dashboard && resolveBachecaAlunno(client.dashboard)}
			color="#07abbe"
			icon={bachecaAlunno}
			name="Bacheca alunno"
			active={false}
			className={className}
		/>
		<MenuEntry
			summary={
				client.dashboard &&
				`${client.dashboard.fileCondivisi.listaFile.length} file condivisi`
			}
			color="#45dda1"
			icon={condivisione}
			name="Condivisione"
			active={false}
			className={className}
		/>
		<MenuEntry
			color="#07abbe"
			icon={pagamenti}
			name="Pagamenti"
			active={false}
			className={className}
		/>
		<MenuEntry
			color="#385a90"
			icon={curriculum}
			name="Curriculum"
			active={false}
			className={className}
		/>
	</>
);

export default MenuList;
