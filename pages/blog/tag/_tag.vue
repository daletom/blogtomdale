<template>
  <div class="h-screen flex flex-col">
    <TheHeader />
      <div class="mt-8 -mb-3 ml-4 text-sm">
          <h1 class="text-4xl font-bold uppercase">
            {{ tag.name }}
          </h1>
          <p class="mb-4 ml-4 uppercase">{{ tag.description }}</p>

          <nuxt-content :document="tag" />
      </div>
    <div
      class="relative py-8 px-8 w-full h-full flex-1 overflow-y-auto markdown-body custom-scroll"
    >
      <h3 class="mb-4 font-bold text-4xl">Articles tagged {{ tag.name }}:</h3>
      <ul>
        <li
          v-for="article in articles"
          :key="article.slug"
          class="block float-none med:float-left lg:float-left w-full med:w-1/2 lg:w-1/2 xl:w-1/2 xl:float-left px-2 xs:mb-6 md:mb-12 article-card"
        >
          <NuxtLink
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md flex-col"
          >
            <ix-img
              v-if="article.img"
              class="h-48 w-full object-cover"
              :src="article.img"
              :alt="article.alt"
              sizes="(min-width: 1024px) calc(50vw - 96px), 90vw"
              loading="lazy"
            />

            <div
              class="p-6 flex flex-col justify-between w-full"
            >
              <h2 class="font-bold">{{ article.title }}</h2>
              <p>{{ article.description }}</p>
              <p class="font-bold text-gray-600 text-sm">
                {{ formatDate(article.updatedAt) }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const tags = await $content('tags')
      .where({ slug: { $contains: params.tag } })
      .limit(1)
      .fetch()
    const tag = tags.length > 0 ? tags[0] : {}
    const articles = await $content('articles', params.slug)
      .where({ tags: { $contains: tag.name } })
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tag
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
