import { storyblokInit, apiPlugin } from "@storyblok/react";
import '../styles/index.css'

import Grid from '../components/storyblok/Grid'
import Page from '../components/storyblok/Page'

const components = {
  grid: Grid,
  page: Page,
}

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "us",
  },
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
