<template>
  <header class="flex items-center justify-between flex-wrap bg-blue-400 p-6">
    <NuxtLink to="/"><Logo class="mb-0 mr-6" /></NuxtLink>
    <div class="block sm:hidden">
      <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-100 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div class="text-sm sm:flex-grow">
        <nuxt-link to="/blog" class="no-underline mr-2 block mt-4 sm:inline-block sm:mt-0 text-green-800 hover:text-white">
          Blog
        </nuxt-link>
        <a href="/projects" class="no-underline mr-2 block mt-4 sm:inline-block sm:mt-0 text-yellow-800 hover:text-white">
          Projects
        </a>
        <a href="/about" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-blue-900 hover:text-white mr-4">
          About Me
        </a>
      </div>
      <div>
        <AppSearchInput class="no-underline inline-block text-sm px-4 py-2 leading-none mt-4 sm:mt-0" />
      </div>
    </div>
  </header>
</template>
