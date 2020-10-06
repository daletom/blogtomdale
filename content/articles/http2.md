---
title: How HTTP/2 Can Speed Up Your Site
description: HTTP/2 is a new version of the HTTP protocol that reduces the number of connections needed to load all the content on each page. HTTP/2 will make a single network connection to request all of your images at once.
createdAt: March 2, 2017
img: /http2.jpg
alt: Preview image of http2 article
tags: 
  - web development
---
We got a great response when imgix launched support for HTTP/2 in January. As we’ve talked about it with our customers, we’ve noticed that people are happy to have HTTP/2, but not everyone fully understands how it can improve their site. So here’s a short, jargon-free explanation about what HTTP/2 does and how you can benefit from it.

### What is HTTP/2?
First, a bit of history. In 1991, HTTP/1.0 was released to enable linked hypertext documents—effectively the beginning of websites as we know them today. It was designed primarily for text, but could request images by making multiple connections, one per image. The additional image requests required by today's visually-complex and image-heavy sites have created congestion in the browser, causing slower page load times and the need for workarounds.

HTTP/2 is a new version of the HTTP protocol that reduces the number of connections needed to load all the content on each page. Instead of creating many connections to load content, **HTTP/2 will make a single network connection to request all of your images at once.** The example below demonstrates how this works.

HTTP/1
![HTTP/1 Example](https://assets.imgix.net/imgix_http1.gif?w=300&h=300&fit=crop&crop=left&auto=format,compress&gifq=35)

HTTP/2
![HTTP/2 Example](https://assets.imgix.net/imgix_http2.gif?w=300&h=300&fit=crop&crop=left&auto=format,compress&gifq=35)

These animations show the load sequence of 100 different images that make up the logo. The top example is loaded using HTTP/1.x. These images load in fits and starts because the browser has to make 100 separate image requests that all complete at different rates. The bottom example shows the same 100 images being loaded using a single HTTP/2 connection. They all load at once, so the complete visual appears instantly.

That’s just a quick explanation of what it does—there’s a lot more if you want to dig into it. See the end for some additional links.

### What Are the Benefits of HTTP/2?
HTTP/2 speeds up images—a great reason to be excited—but it also removes the need for the previously-used workarounds and has some additional benefits.

**No More Source Sharding**

HTTP/1.x limits the number of open connections you can have from a single source, which has led to developers creating several different sources (source sharding) to handle pages with a lot of images. An example of this would be creating multiple URLs to split up requests, for example: images01.imgix.net, images02.imgix.net, and images03.imgix.net.

Since HTTP/2 makes just one connection and does not limit requests, you can simplify and use a single source like images.imgix.net. Source sharding was always a bit of a hack, designed to mimic multiple connections for faster loading, and eliminating it will immediately improve your image performance.

**No More Sprite Sheeting**

Your website might have 50 different icons for your logo, social media logos, and various other small graphics. To load them all more efficiently under HTTP/1.x, many developers combined these smaller images into a larger image (a sprite sheet) so only one image was needed to load all of the icons at once.

This solved one problem but created another—sprite sheets are heavy! You might only need six of those icons on a page, but would still have to request the entire sprite sheet. Sprites are often the largest image on pages that use this workaround. With HTTP/2, it works better to load the individual small images instead of a large sprite sheet on every page, since multiple requests in a single connection are now possible. Breaking apart sprite sheets will lower the weight of your pages and make them quicker.

**Possible SEO Gains**

Although it doesn't affect SEO directly, HTTP/2 has indirect benefits that will improve your SEO. HTTP/2 usually increases image performance and speed, both of which are important factors in how a page performs in search rankings. If you’re currently source sharding, then eliminating that practice can also give a powerful boost to your SEO. Removing source sharding lets all images come from a single URL, so they’re more likely to appear in search results.

### Conclusion

Hopefully this non-technical look at HTTP/2 has given you a better understanding of how it can help your website performance. For more information, here is a helpful FAQ section on [Github](https://http2.github.io/faq/), a great web designer’s guide at [Smashing Magazine](https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/), and an in-depth article from web performance expert [Ilya Grigorik](https://hpbn.co/http2/).  I originally posted this article on the [imgix Blog](https://blog.imgix.com/2017/03/02/http2-speed-up-your-site).