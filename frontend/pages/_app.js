import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../config/theme";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";

import Layout from "@components/pages/home/Layout";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { MovieProvider } from "@contexts/MovieContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<UserProvider>
						<MovieProvider>
							<Script
								strategy="afterInteractive"
								src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
							/>
							<Script
								id="gtag-init"
								strategy="afterInteractive"
								dangerouslySetInnerHTML={{
									__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${gtag.GA_TRACKING_ID}', {
									page_path: window.location.pathname,
								});
								`,
								}}
							/>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</MovieProvider>
					</UserProvider>
				</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
