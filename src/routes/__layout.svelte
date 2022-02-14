<script lang="ts" context="module">
  const url = "/api/banner";
  export const load: Load = async ({ fetch }) => {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return {
        props: {
          bannerData: data,
        },
      };
    }
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  };
</script>

<script lang="ts">
  import type { Load } from "@sveltejs/kit";
  import { page } from "$app/stores";
  import { onMount, setContext } from "svelte";
  import Segment from "$lib/components/segment.svelte";
  import LayoutMain from "$lib/components/layout-main.svelte";
  import LayoutRoot from "$lib/components/layout-root.svelte";
  import Nav from "$lib/components/main-nav/index.svelte";
  import Footer from "$lib/components/footer/index.svelte";
  import CookieConsent from "$lib/components/banners/cookie-consent.svelte";
  import { key } from "$lib/components/banners/announcement.svelte";
  import type { BannerData } from "$lib/types/banner.type";

  export let bannerData: BannerData;

  setContext(key, bannerData);

  onMount(() => {
    document.cookie = "gitpod-marketing-website-visited=true;domain=gitpod.io";
  });

  $: if ($page.url.pathname) {
    // Workaround until https://github.com/sveltejs/kit/issues/2664 is fixed
    if (typeof window !== "undefined" && window.location.hash) {
      const deepLinkedElement = document.getElementById(
        window.location.hash.substring(1)
      );
      if (deepLinkedElement) {
        deepLinkedElement.scrollIntoView();
      }
    }
  }
</script>

<style>
  :global(#svelte-announcer) {
    @apply sr-only;
  }

  :global(html) {
    scroll-padding-top: 6rem;
  }
</style>

<LayoutRoot>
  <Nav />
  <LayoutMain>
    <slot />
  </LayoutMain>
  <Footer />
</LayoutRoot>
<CookieConsent />
<Segment />
