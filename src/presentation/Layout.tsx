import type { FC } from "hono/jsx";
import { html } from "hono/html";
import { ErrorInfo } from "./components/ErrorInfo";

export const Layout: FC = (props) => {
	return (
		<>
			{html`<!DOCTYPE html>`}
			<html lang="en">
				<head>
					<title>10000</title>
					<meta charset="UTF-8" />
					<meta name="description" content="10000 score taking application" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<script
						src="https://unpkg.com/htmx.org@1.9.10"
						integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
						crossorigin="anonymous"
					/>
					<script
						defer
						src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
					/>
					<script src="https://cdn.tailwindcss.com" />
				</head>
				<body>
					{props.children}
					<ErrorInfo error="" />
				</body>
				{html`<script>
				htmx.on("htmx:beforeSend", function (event) {
					document.getElementById("error").innerHTML = "";
				});
			</script>`}
			</html>
		</>
	);
};
