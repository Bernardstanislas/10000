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
					<script src="/static/htmx.min.js" />
					<script src="/static/alpine.min.js" defer />
					<link href="/static/style.css" rel="stylesheet" />
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
