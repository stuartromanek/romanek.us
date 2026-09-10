<template>
  <section id="louis" class="work">
    <div class="intro">
      <div class="logo">
        <LouisLogo class="logo__mark" :filled="true" :font-controlled="false" />
        <p class="logo-wordmark" aria-label="Louis!">
          <span class="logo-wordmark__letter logo-wordmark__letter--l" style="--tilt: -4deg" aria-hidden="true">L</span>
          <span class="logo-wordmark__letter logo-wordmark__letter--o" style="--tilt: 3deg" aria-hidden="true">o</span>
          <span class="logo-wordmark__letter logo-wordmark__letter--u" style="--tilt: -2deg" aria-hidden="true">u</span>
          <span class="logo-wordmark__letter logo-wordmark__letter--i" style="--tilt: 4deg" aria-hidden="true">i</span>
          <span class="logo-wordmark__letter logo-wordmark__letter--s" style="--tilt: -3deg" aria-hidden="true">s</span>
          <span class="logo-wordmark__letter logo-wordmark__letter--bang" style="--tilt: 6deg" aria-hidden="true">!</span>
        </p>
      </div>
      <div class="content">
        <h3>
          Louis turns YouTube content into playlists for the
          <a href="https://yotoplay.com/" target="_blank" class="underlined-link">Yoto player</a>.
        </h3>
        <More label="More ++">
          <p>
            The Yoto is a screen-free kids audio device that encourages media curation, facilitates draw-alongs, provides daily podcasts, and plays music and audiobooks. The Make Your Own feature opens Yoto up to making your own mixtapes. I wanted to give my kids a simple, fun way to curate their music and stories using existing YouTube content, so I built Louis, a Make Your Own studio.
          </p>
        </More>
        <div class="details">
          <div class="column">
            <div class="kv-group">
              <div class="key">Role</div>
              <div class="value">Design, engineering</div>
            </div>
            <div class="kv-group">
              <div class="key">Area</div>
              <div class="value">Product, brand</div>
            </div>
          </div>
          <div class="column">
            <div class="kv-group">
              <div class="key">Period</div>
              <div class="value">2026</div>
            </div>
            <div class="kv-group">
              <div class="key">Live</div>
              <div class="value">
                <a href="https://louis.romanek.us/" target="_blank" class="underlined-link">louis.romanek.us</a>
                <span> · </span>
                <a href="https://github.com/stuartromanek/louis" target="_blank" class="underlined-link">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="work-blurb">
      <h3>Search, drag, sync, play!</h3>
      <div class="work-blurb__inner">
        <p>
          Behind the scenes, Louis pulls audio from YouTube sources, normalizes it, chunks long content, and uploads it to the Yoto API all within a simple, fun desktop experience.
        </p>
      </div>
    </div>

    <Media media-src="louis-overview" />

    <div class="row square">
      <Media media-src="louis-youtube-shortcuts" />
      <Media media-src="louis-playlist-artwork" />
      <Media media-src="louis-track-art" />
    </div>

    <div class="split split--reverse">
      <Media media-src="louis-trim" />
      <div class="split__copy">
        <h3>Cut the “Like and subscribe”</h3>
        <p>
          Louis provides easy, fun tools for splitting your content into multiple tracks and cleaning up intros/outros so kids have a seamless listening experience.
        </p>
      </div>
    </div>

    <div class="work-blurb">
      <h3>Run Louis your way</h3>
      <div class="work-blurb__inner">
        <p>
          Louis supports being run via Docker, Home Assistant, Portainer, or as desktop Electron apps. Once on your network Louis is accessible via browser and has a complete mobile phone experience.
        </p>
      </div>
    </div>

    <div class="row phones">
      <Media media-src="louis-phone-search" />
      <Media media-src="louis-phone-library" />
      <Media media-src="louis-phone-add" />
      <Media media-src="louis-phone-menu" />
    </div>

    <div class="offset">
      <Media media-src="louis-setup" />
    </div>
  </section>
</template>

<script setup>
import LouisLogo from './public/images/louis-yoto.svg'
</script>
<style scoped lang="scss">
@import "~/assets/css/work-gallery.scss";

@font-face {
  font-family: "Saeada";
  src: url("/fonts/saeada/LTSaeada-Bold.otf") format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

.work {
  margin-top: 8rem;
  scroll-margin-top: 6rem;

  @media (max-width: vars.$mobile-breakpoint) {
    margin-top: 4rem;
    scroll-margin-top: 1rem;
  }

  > :deep(.media) {
    max-width: none;
    align-self: auto;

    &:nth-child(2n + 2),
    &:nth-child(3n) {
      align-self: auto;
    }

    &:nth-child(4n) {
      max-width: none;
    }
  }
}

.content {
  position: relative;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  flex: 1 0 0px;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1.25rem;
  height: min-content;
  justify-content: center;
  overflow: visible;
  padding: 0;

  @media (min-width: 810px) and (max-width: 1199px) {
    flex: none;
    width: 100%;
  }
}

.logo {
  display: flex;
  align-items: flex-end;
  align-self: start;
  gap: 0.85rem;
  min-width: 0;
  overflow: visible;
}

.logo__mark {
  height: 80px;
  width: auto;
  flex-shrink: 0;
}

.logo-wordmark {
  display: flex;
  align-items: baseline;
  gap: 0.01em;
  margin: 0;
  padding: 0 0.35rem 0 0;
  font-family: "Saeada", ui-sans-serif, system-ui, sans-serif;
  font-size: 3.9rem;
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.05em;
  color: inherit;
}

.logo-wordmark__letter {
  display: inline-block;
  transform: rotate(var(--tilt, 0deg));
  transform-origin: 50% 70%;
  -webkit-text-stroke: 4.8px #000;
  paint-order: stroke fill;
  text-shadow: 4.8px 4.8px 0 #000;
}

.logo-wordmark__letter--l { color: #ffe14a; }
.logo-wordmark__letter--o { color: #ff9a2e; }
.logo-wordmark__letter--u { color: #7ee0c8; }
.logo-wordmark__letter--i { color: #b8f04a; }
.logo-wordmark__letter--s { color: #7cff4a; }
.logo-wordmark__letter--bang { color: #7ec8ff; }

@media (max-width: vars.$mobile-breakpoint) {
  .logo__mark {
    height: 56px;
  }

  .logo-wordmark {
    font-size: 2.58rem;
  }

  .logo-wordmark__letter {
    -webkit-text-stroke: 3.6px #000;
    text-shadow: 3.6px 3.6px 0 #000;
  }
}

.intro {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 60%;

  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.intro p:not(.logo-wordmark) {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.25px;
  color: var(--color-gray-1);
  color: white;

  @media (max-width: vars.$mobile-breakpoint) {
    // font-size: 0.8rem;
  }
}

.details {
  $gap: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: calc(50% - ($gap / 2)) calc(50% - ($gap / 2));
  gap: $gap;
  font-size: 1.2rem;
  border-top: 1px solid var(--color-gray-3);
  border-bottom: 1px solid var(--color-gray-3);
  padding: 2rem 0;

  @media (max-width: vars.$mobile-breakpoint) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.8rem;
    padding: 0.5rem 0 0.75rem;
  }

  .key {
    color: var(--color-gray-10);
    min-width: 6rem;
  }

  .kv-group {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @media (max-width: vars.$mobile-breakpoint) {
      gap: 0.25rem;
    }
  }
}

.row {
  width: 100%;
  display: flex;
  gap: 3rem;
  margin: 3rem 0;

  @media (max-width: vars.$mobile-breakpoint) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
}

.square {
  align-items: flex-start;
  justify-content: center;

  :deep(.media) {
    flex: 1;
    max-width: 400px;
  }

  @media (max-width: vars.$mobile-breakpoint) {
    align-items: center;
  }
}

.phones {
  align-items: flex-start;
  justify-content: center;

  :deep(.media) {
    flex: 1 1 0;
    max-width: 220px;
  }

  @media (max-width: vars.$mobile-breakpoint) {
    align-items: center;
  }
}

.split {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
  margin: 5rem 0;

  @media (max-width: vars.$mobile-breakpoint) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
    align-items: stretch;
  }
}

.split--reverse {
  grid-template-columns: 1.2fr 1fr;
}

.split__copy {
  max-width: 520px;

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: vars.$mobile-breakpoint) {
    max-width: none;
  }
}

.offset {
  display: flex;
  justify-content: flex-end;
  margin: 3rem 0 5rem;

  :deep(.media) {
    width: 70%;
    max-width: 900px;
  }

  @media (max-width: vars.$mobile-breakpoint) {
    :deep(.media) {
      width: 100%;
      max-width: none;
    }
  }
}
</style>
