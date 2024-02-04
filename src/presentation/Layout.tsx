import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script src="https://cdn.tailwindcss.com" />
			</head>
			<body class="bg-neutral-300 container mx-auto">{props.children}</body>
		</html>
	);
};
