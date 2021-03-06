<template>
  <div
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <ix-img
        :src="articles[0].author.img"
        :alt="articles[0].author.name"
        class="absolute h-full w-full object-cover"
        sizes="(min-width: 922px) 50vw, 100vw"
        :imgixParams="{ ch: 'width,dpr' }"
        loading="lazy"
      />
    </div>

    <div class="overlay"></div>
    <div class="absolute top-32 left-32 text-white">
      <NuxtLink to="/"><Logo /></NuxtLink>
      <div class="mt-16 -mb-3 flex flex-col uppercase text-sm">
        <h1 class="text-4xl font-bold">
          {{ articles[0].author.name }}
        </h1>
        <p class="mb-4">{{ articles[0].author.bio }}</p>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <NuxtLink to="/"
        ><p class="hover:underline">Back to All Articles</p></NuxtLink
      >
      <h3 class="mb-4 font-bold text-4xl">
        Here are a list of articles by {{ articles[0].author.name }}:
      </h3>
      <ul>
        <li
          v-for="article in articles"
          :key="article.slug"
          class="w-full px-2 xs:mb-6 md:mb-12 article-card"
        >
          <NuxtLink
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
          >
            <ix-img
              v-if="article.img"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
              :src="article.img"
              :alt="article.alt"
              :imgixParams="{ h: '192', fit: 'crop', ch: 'width,dpr' }"
              sizes="(min-width: 1216px) calc(25vw - 150px), (min-width: 922px) calc(50vw -150px), 90vw"
              loading="lazy"
            />

            <div
              class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
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
    const articles = await $content('articles', params.slug)
      .where({
        'author.name': {
          $regex: [params.author, 'i']
        }
      })
      .without('body')
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles
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
