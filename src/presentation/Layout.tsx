import type { FC } from "hono/jsx";
import { html } from "hono/html";
import { ErrorInfo } from "./components/ErrorInfo";

export const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script
					src="https://unpkg.com/htmx.org@1.9.10"
					integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
					crossorigin="anonymous"
				/>
				{html`<style>
						table, th, td {
							border:1px solid black;
						}
					  </style>`}
			</head>
			<body class="bg-neutral-300 container mx-auto">
				{props.children}
				<ErrorInfo error="" />
			</body>
			{html`<script>
				htmx.on("htmx:beforeSend", function (event) {
					document.getElementById("error").innerHTML = "";
				});
			</script>`}
		</html>
	);
};
