<template>
  <div class="bg-gray-200">
    <TheHeader />

    <h1 class="font-bold text-4xl ml-4">Blog Posts</h1>
    <ul class="flex flex-wrap">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="xs:w-full md:w-1/2 sm:w-1/2 lg:w-1/3 px-2 xs:mb-6 md:mb-12 article-card"
      >
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md flex-col"
        >
          <ix-img
            v-if="article.img"
            class="h-48 w-full object-cover"
            :src="article.img"
            sizes="(min-width: 1024px) calc(33vw - 48px), (min-width: 640px) calc(50vw - 32px), 90vw"
            loading="lazy"
          />

          <div
            class="p-6 flex flex-col justify-between w-full"
          >
            <h2 class="font-bold">{{ article.title }}</h2>
            <p class="font-bold text-gray-600 text-sm">
              {{ article.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <h3 class="mb-4 font-bold text-2xl uppercase text-center">Topics</h3>
    <ul class="flex flex-wrap mb-4 text-center">
      <li
        v-for="tag of tags"
        :key="tag.slug"
        class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"
      >
        <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
          <p
            class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"
          >
            {{ tag.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
    <footer class="flex justify-center border-gray-500 border-t-2">
      <p class="mt-4">
        Working blog by
        <a
          href="https://twitter.com/tomdale21"
          class="font-bold hover:underline"
          >Tom Dale.</a
        >
         See the
        <a
          href="https://github.com/daletom/blogtomdale"
          class="font-bold hover:underline"
          >GH Repo</a
        >
        for the technical details.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  }
}
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
