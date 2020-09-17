# nuxt-content-article

The [content module](https://content.nuxtjs.org/) is a git files based headless CMS that I wanted to test from Nuxt.  I saw a great demo example from Debbie O'Brien here [original demo](https://github.com/nuxt-company/demo-blog-nuxt-content).

# Adding Responsive Images with imgix

So I really wanted to add in some responsive images with imgix here.  Luckily, Debbie created this demo with images from [Unsplash](https://unsplash.com/) and they already use [imgix to power their images](https://medium.com/unsplash/imgix-the-service-powering-unsplashs-beautiful-imagery-5a1ca163a29b).  This makes every even simpler for me!

First, I installed the [Vue-imgix SDK Library](https://github.com/imgix/vue-imgix) since this is build using Nuxt.

```
npm install vue-imgix
```

Add a file to the plugins, vue-imgix.js and add this:

```
import Vue from 'vue';
import VueImgix from 'vue-imgix';

Vue.use(VueImgix, {
    domain: "images.unsplash.com",
    defaultIxParams: {
        auto: 'format,compress'
    },
});
```

If you aren't using unpslay, just put your imgix domain in the domain section.  I then replaced any `<img />` tags with `<ix-img>`.  Example from the index.vue home page:

```
<ix-img
            v-if="article.img"
            class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
            :src="article.img"
            sizes="(min-width: 1351px) 25vw, (min-width: 692px) 40vw, 90vw"
            :imgixParams="{ h: '192', fit: 'crop', ch: 'width,dpr' }"
            loading="lazy"
          />
```

What am I doing here?  In the imgixParams, I have chosen what parameters I want to include with my images.  The design of this blog has the height fixed at 192 by tailwind, but the is variable depending on the size of the browser. So I opted to use [Client Hints](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints). Client Hints is supported by [74% of browsers](https://caniuse.com/?search=client-hints), so it will pass the width and dpr dynamically to imgix and generate the right size image.

What about Firefox & Safari?  Well, I added in the sizes=, which will use the imgix SDK we installed to generate a srcset of different widths to choose a close to correct size image.

This is giving us great Responsive images now!  

# What did we get from all of this?

Well, with a responsive design we are now loading the correct size images to match the various breakpoints of this website.  Looking at a desktop view, the weight of the website is decreased from 1.6 MB to 540 KB.  This is particularly insteresting because the images were originally on imgix, they just weren't responsive and serving the correct sizes.  By including Client Hints & installing the imgix vue SDK, we were able to modify those sizes correctly and get a lower weight site.

Also, sometimes more importantly, I had some fun learning more about the Content offering from Nuxt, a tool I truly love!

Click here to view the [demo](https://imgix-demo-blog-nuxtcontent.vercel.app/)

![demo of blog](https://tom.imgix.net/imgixnuxtcontentdemoblog.png?w=1000&fm=jpg)


