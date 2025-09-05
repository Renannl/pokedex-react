import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	button {
		background: rgb(255, 203, 5);
		color: #222;
		border: none;
		width: 300px;
		border-radius: 8px;
		font-family: inherit;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0,0,0,0.08);
		transition: background 0.2s;
	}

	button:hover {
		background: #ffe066;
	}
	@font-face {
		font-family: 'Pokemon';
		src: url('fonts/Pokemon-Solid.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}

				*, *::before, *::after {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				html, body {
					height: 100%;
				}

					body {
						font-family: 'Pokemon', Arial, Helvetica, sans-serif !important;
						color: #111;
						text-shadow:
							0 0 6px #ffcb05,
							0 0 2px #ffcb05;
						letter-spacing: 1px;
						font-weight: bold;
						text-transform: uppercase;
						background: #f2f2f2;
						min-height: 100vh;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}

							h1, h2, h3, h4, h5, h6 {
								color: #ffcb05;
								text-shadow:
									-2px -2px 0 rgb(60, 90, 166),
									2px -2px 0 rgb(60, 90, 166),
									-2px 2px 0 rgb(60, 90, 166),
									2px 2px 0 rgb(60, 90, 166),
									0 0 8px rgb(60, 90, 166),
									0 0 2px rgb(60, 90, 166);
							}
`;
