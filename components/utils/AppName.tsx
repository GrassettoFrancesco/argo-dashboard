"use client";
import { useEffect, useState } from "react";

const AppName = () => {
	const [beta, setBeta] = useState(false);

	useEffect(() => {
		if (location.hostname !== "argo-dashboard.vercel.app") setBeta(true);
	}, []);
	return beta ? "𝔼𝕕𝕦𝔽𝕦𝕤𝕚𝕠𝕟" : "𝔼𝕕𝕦𝔽𝕦𝕤𝕚𝕠𝕟";
};

export default AppName;
