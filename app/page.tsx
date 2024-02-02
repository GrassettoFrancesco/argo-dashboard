import Detail from "@/components/utils/Detail";
import Preview from "@/components/utils/Preview";
import { faAd } from "@fortawesome/free-solid-svg-icons/faAd";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faLaptop } from "@fortawesome/free-solid-svg-icons/faLaptop";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import Link from "next/link";
import dark from "../images/dark.png";
import lgDark from "../images/lgDark.png";
import lgLight from "../images/lgLight.png";
import light from "../images/light.png";
import mdDark from "../images/mdDark.png";
import mdLight from "../images/mdLight.png";
import smDark from "../images/smDark.png";
import smLight from "../images/smLight.png";
import xlDark from "../images/xlDark.png";
import xlLight from "../images/xlLight.png";

const Home = () => (
	<>
		<div className="flex flex-col items-center my-2">
			<span>
				Un nuovo modo per accedere al registro elettronico in facilità e
				sicurezza da ogni dispositivo.
			</span>
			<Link className="mt-2 lg:mt-4 mb-6 lg:mb-4" href="/dashboard">
				<Preview
					src={dark}
					className="hidden dark:block sm:hidden sm:dark:hidden"
				/>
				<Preview src={light} className="dark:hidden sm:hidden" />
				<Preview
					src={smDark}
					className="hidden md:hidden sm:dark:block md:dark:hidden"
				/>
				<Preview
					src={smLight}
					className="hidden md:hidden dark:hidden sm:block"
				/>
				<Preview
					src={mdDark}
					className="hidden lg:hidden md:dark:block lg:dark:hidden"
				/>
				<Preview
					src={mdLight}
					className="hidden lg:hidden dark:hidden md:block"
				/>
				<Preview
					src={lgDark}
					className="hidden xl:hidden lg:dark:block xl:dark:hidden"
				/>
				<Preview
					src={lgLight}
					className="hidden xl:hidden dark:hidden lg:block"
				/>
				<Preview src={xlDark} className="hidden xl:dark:block" />
				<Preview src={xlLight} className="hidden dark:hidden xl:block" />
			</Link>
			<Link
				href="/dashboard"
				className="p-4 w-40 whitespace-nowrap rounded-lg duration-500 text-center bg-sky-300 dark:bg-sky-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 hover:scale-110 active:scale-95"
			>
				Entra
			</Link>
		</div>
		<div className="mt-4 flex flex-col flex-wrap content-center gridContainer">
			<Detail
				icon={faDownload}
				title="Nessuna app necessaria"
				text="Accedi al tuo registro elettronico ovunque ti trovi, senza bisogno di scaricare alcuna app."
			/>
			<Detail
				icon={faAd}
				title="Nessun annuncio o tracker"
				text="Goditi un'esperienza fluida senza pubblicità o tracker a rallentare il dispositivo."
			/>
			<Detail
				icon={faLaptop}
				title="Per ogni dispositivo"
				text="Il nostro sito è ottimizzato per tutti i dispositivi, sia quelli più grandi che quelli più piccoli."
			/>
			<Detail
				icon={faLock}
				title="Nato per essere sicuro"
				text="Tutti i dati vengono scaricati con una connessione criptata e le credenziali non vengono salvate da nessuna parte."
			/>
		</div>
	</>
);

export default Home;
