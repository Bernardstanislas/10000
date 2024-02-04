import type { FC } from "hono/jsx";

type Props = {
	error: string;
};

export const ErrorInfo: FC<Props> = ({ error }) => (
	<div id="error" style={{ color: "red" }}>
		{error}
	</div>
);
