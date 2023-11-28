import localFont from "next/font/local";

const bold = localFont({ src: "../public/Poppins-Bold.ttf" });

const Column = ({
	name,
	children,
}: {
	name: string;
	children?: React.ReactNode;
}) => (
	<div className="flex flex-col w-full lg:flex-1 lg:max-w-md">
		<div className={`m-4 text-2xl ${bold.className}`}>{name}</div>
		<div className="flex flex-col sm:flex-row lg:flex-col">{children}</div>
	</div>
);

export default Column;
