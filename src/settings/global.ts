import { join } from "node:path";

declare global {	const required: true;
	const inline: true;
	const disabled: true;
	const __rootname: string;
	function rootTo(...path: string[]): string;
}

Object.assign(globalThis, Object.freeze({
	required: true,
	inline: true,
	disabled: true,
	__rootname: process.cwd(),
	rootTo(...path: string[]){
		return join(process.cwd(), ...path);
	}
}));