<template>
  <div>
    <TheHeader />

    <h1 class="font-bold text-4xl">My Projects</h1>
    <ul class="flex flex-wrap">
      <li
        v-for="project of projects"
        :key="project.slug"
        class="xs:w-full md:w-1/3 px-2 xs:mb-6 md:mb-12 article-card"
      >
          <ix-img
            v-if="project.img"
            class="h-48 xxlmin:w-1/3 xxlmax:w-full object-cover"
            :src="project.img"
            sizes="(min-width: 1351px) 25vw, (min-width: 692px) 40vw, 90vw"
            loading="lazy"
          />

          <div
            class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
          >
            <h2 class="font-bold">{{ project.title }}</h2>
            <p class="font-bold text-gray-600 text-sm">
              {{ project.description }}
            </p>
          </div>
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
    const projects = await $content('projects', params.slug)
      .only(['title', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      projects,
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
