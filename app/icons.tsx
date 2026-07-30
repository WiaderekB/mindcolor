import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
	return (
		<svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 24 24" {...props}>
			{children}
		</svg>
	);
}

export function ArrowUpRightIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
		</IconBase>
	);
}

export function ArrowDownIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M12 5v14m0 0 5-5m-5 5-5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
		</IconBase>
	);
}

export function PlusIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M12 7v10M7 12h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
		</IconBase>
	);
}

export function MenuIcon({ className, ...props }: IconProps) {
	return (
		<IconBase className={className} {...props}>
			<path d="M5 8h14M5 16h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
		</IconBase>
	);
}

export function CloseIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
		</IconBase>
	);
}

export function FocusIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.6" />
			<circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.6" />
			<path d="M12 2.75v2M12 19.25v2M2.75 12h2M19.25 12h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
		</IconBase>
	);
}

export function CalmIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M4 9.25c2.1-2.15 4.2-2.15 6.3 0s4.2 2.15 6.3 0M4 14.75c2.1-2.15 4.2-2.15 6.3 0s4.2 2.15 6.3 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.65" />
		</IconBase>
	);
}

export function SparkIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M12 3.5c.55 4.55 2.95 6.95 7.5 7.5-4.55.55-6.95 2.95-7.5 7.5-.55-4.55-2.95-6.95-7.5-7.5 4.55-.55 6.95-2.95 7.5-7.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
			<path d="M18.5 3.5v3M20 5h-3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
		</IconBase>
	);
}

export function EnergyIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="m13.1 2.9-7 10.05h5.2l-.4 8.15 7-10.05h-5.2l.4-8.15Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
		</IconBase>
	);
}

export function RecognizeIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.55" />
			<circle cx="12" cy="12" fill="currentColor" r="2.2" />
		</IconBase>
	);
}

export function NameIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<path d="M5 5.75h14v9.5H9.6L5 19v-3.75H5V5.75Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
			<path d="M8.5 9.2h7M8.5 12h4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.45" />
		</IconBase>
	);
}

export function AnchorIcon(props: IconProps) {
	return (
		<IconBase {...props}>
			<circle cx="12" cy="5.25" r="2.25" stroke="currentColor" strokeWidth="1.55" />
			<path d="M12 7.5v12m-6.75-6.25c.5 4.15 2.75 6.25 6.75 6.25s6.25-2.1 6.75-6.25M3.75 13.25h3M17.25 13.25h3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
		</IconBase>
	);
}
