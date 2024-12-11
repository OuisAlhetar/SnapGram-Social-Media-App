import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<I18nextProvider i18n={i18n}>
		<BrowserRouter>
			<QueryProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</QueryProvider>
		</BrowserRouter>
	</I18nextProvider>
);
