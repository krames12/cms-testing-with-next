import { storyblokInit, apiPlugin } from "@storyblok/react";
import '../styles/index.css'
 
storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
