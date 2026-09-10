/* ==========================================================================
   Site-wide constants for <head>: identity, share card, tracking IDs.
   --------------------------------------------------------------------------
   One place to change a tracking ID or a share image. Before this existed the
   title and description were defaults buried in Base.astro and the analytics
   ID lived in a Hugo config file that stopped being built, which is how the
   site ran for months measuring nothing.
   ========================================================================== */

export const site = {
  name: 'TRACE Lab',
  legalName: 'TRustworthy Artificial IntelligenCE Laboratory',
  url: 'https://trace-lab.ai',
  locale: 'en_GB',
  title: 'TRACE Lab · Trustworthy AI at the University of Cambridge',
  description:
    'The Trustworthy Artificial Intelligence Laboratory at the University of Cambridge. We study how AI systems behave once people and institutions depend on them.',

  /* 1200x630, the size every scraper crops to. Built from the masthead
     drawing so a shared link looks like the site it points at. */
  ogImage: '/media/og-card.jpg',
  ogImageAlt: "TRACE Lab — King's College Chapel, Cambridge, drawn in line on navy.",

  /* Linked from the cookie notice when set. Left empty deliberately: the
     wording of a privacy notice for a University department is the lab's and
     the University's to write, not something to invent here. Point it at the
     lab's own notice, or at the University's central one, and the link
     appears. */
  privacyUrl: '',
} as const;

/* --------------------------------------------------------------- Analytics --

   Read from the environment so a fork, a staging deploy, or a rotated
   property needs no source edit. Astro only exposes vars prefixed PUBLIC_ to
   the browser, so that prefix is required, not stylistic.

   PUBLIC_GA_ID defaults to the lab's own GA4 property. Verify in GA that its
   web data stream points at trace-lab.ai before trusting the numbers — this
   ID was carried over from the retired Hugo config and had never actually
   been loaded by a deployed page.
*/
export const analytics = {
  ga4: import.meta.env.PUBLIC_GA_ID ?? 'G-PS5YFSJ4W6',

  /* Google Search Console, HTML-tag method: paste the token from its
     verification screen. Leave empty if you verified by DNS instead — an
     empty string renders no tag at all. */
  googleSiteVerification: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
} as const;

/* Where a click came from, for the outbound-link events in Analytics.astro.
   Keyed by the nearest meaningful ancestor's class, most specific first,
   because a publication row also sits inside a band and would otherwise be
   reported as whatever matched first. */
export const CLICK_CONTEXTS: [selector: string, context: string][] = [
  ['.pub', 'publication'],
  ['.person', 'person'],
  ['.venture', 'spinout'],
  ['.news__item', 'news'],
  ['.route', 'join-route'],
  ['.topic', 'research'],
  ['.logos', 'partner'],
  ['.topnav', 'nav'],
  ['.footer', 'footer'],
  ['.cta', 'cta'],
];
