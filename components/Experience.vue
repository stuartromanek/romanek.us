<template>
  <section id="experience">
    <h3>Experience</h3>
    <table>
      <tbody>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Workplace</th>
          <th>Active</th>
        </tr>

        <tr>
          <td>Apostrophe Technologies</td>
          <td>Founding designer, engineering</td>
          <td>Open Source, SaaS</td>
          <td>2019 - Present</td>
        </tr>
        <tr>
          <td>
            <div class="flex">
              <NuxtImg class="rip" src="/images/rip.gif" alt="A headstone that reads RIP" width="28" height="28" sizes="28px" />
              <span>P'unk Avenue</span>
            </div>
          </td>
          <td>Design lead, engineering</td>
          <td>Agency</td>
          <td>2013 - 2019</td>
        </tr>
        <tr>
          <td>
            <div class="flex">
              <NuxtImg class="rip" src="/images/rip.gif" alt="A headstone that reads RIP" width="28" height="28" sizes="28px" />
              <span>GHI Design</span>
            </div>
          </td>
          <td>Designer, engineering</td>
          <td>Studio</td>
          <td>2011 - 2013</td>
        </tr>
        <tr>
          <td>La Salle University</td>
          <td>Design, web, online learning platforms</td>
          <td>University</td>
          <td>2010 - 2011</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
  #experience {
    @media (max-width: vars.$mobile-breakpoint) {
      font-size: 0.75rem;

      overflow-y: scroll;

      table {
        min-width: 700px;
      }
    }
  }
  h3 {
    margin: 5rem 0 1rem;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--color-gray-10);
  }

  section {
    max-width: 900px;
    margin: 0 auto;
  }

  .flex {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .rip {
    position: relative;
    width: 28px;
    top: -2px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    color: var(--color-gray-8);
    font-weight: 400;
  }

  td, th {
    border-bottom: 1px solid var(--color-gray-6);
    text-align: left;
    padding: 1rem 0;
  }

  tr:hover td {
    border-bottom: 1px solid var(--color-gray-8);
  }
</style>