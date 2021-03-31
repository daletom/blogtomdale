<template>
<div class="h-screen flex flex-col">
<TheHeader />
  <article
    class="flex-1 overflow-y-auto"
  >
    <div class="relative h-12 mb-8">
      <div class="relative top-32 left-32 text-black">
        <h1 class="font-bold text-4xl">{{ article.title }}</h1>
      </div>
    </div>
    <div
      class="relative py-8 px-8 w-full h-full overflow-y-scroll markdown-body custom-scroll"
    >
      <span v-for="(tag, id) in article.tags" :key="id">
        <NuxtLink :to="`/blog/tag/${tags[tag].slug}`">
          <span
            class="truncate uppercase tracking-wider font-medium text-ss px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
          >
            {{ tags[tag].name }}
          </span>
        </NuxtLink>
      </span>
      <p>{{ article.description }}</p>
      <p>Post created: {{ formatDate(article.createdAt) }}</p>
      <p class="pb-4">Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <!-- table of contents -->
      <nav class="pb-6">
        <ul>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{
              'font-semibold': link.depth === 2
            }"
          >
            <nuxtLink
              :to="`#${link.id}`"
              class="hover:underline"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.text }}</nuxtLink
            >
          </li>
        </ul>
      </nav>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</div>
</template>
<script>
export default {
  head() {
    return {
      title: this.article.title,
      description: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://imgix.tomdale.website' + this.article.img + '?auto=format,compress&w=1200&h=620&fit=crop'
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.article.title
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.article.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://imgix.tomdale.website' + this.article.img + '?auto=format,compress&w=1200&h=620&fit=crop'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.article.title
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch()
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      article,
      tags,
      prev,
      next
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
