---
title: Beginner (or Refresher) Info on Responsive Images
description: Still run into issues with Responsive Images? Sure, you can use css to make the image visually display as you want, but if you're not serving the right size image over the network this is going to result in slow website, lower SEO score, and bad user experience.
createdAt: September 18, 2020
img: /domenico-loia-EhTcC9sYXsw-unsplash.jpg
alt: nice image
tags: 
  - nuxtjs
  - web development
---

## Responsive Images

Whether you're new to Responsive Design or you've been building responsive websites for several years, you still run into issues with Responsive Images. Sure, you can use css to make the image visually display as you want, but if you're not serving the right size image over the network this is going to result in slow website, lower SEO score, and bad user experience.

Whether you are looking to learn more about responsive images for a site you are working on or you want to read a refresher on responsive images, this blog will go over a couple responsive image methods but also do go over an example with a simple website project with responsive images.

## Using Client Hints

There are a few image CDNs that support using Client Hints.  I work at imgix, so naturally I have chosen to use imgix for this example.  imgix is an API based image management, optimization, & delivery service.  To use Client Hints with an image on imgix, you would simply add `ch=width, dpr` to that image.  It also supports `save-data`, but I'm not using that for this example.  

In this example, I've added the `ch=width,dpr` for client hints, then `w=400` as the fallback size option for browsers that don't support it like Firefox or Safari. It's also important to add the `sizes`; in my example below I'm not using any css so this determines what size my images should be.

```
<img src="https://imgix.tomdale.website/artsy/6.jpg?ch=width,dpr&w=400"
sizes="(min-width: 768px) 30vw, 100vw" />
```

## Let's look at a Demo

I created a simple [demo site](https://ch-testing.vercel.app/) to show this working.  It's important to note that I tried to make this site as simple as possible with minimal css to ensure any changes to the images were purely happening because of the Client Hints.  Please note that if you open a specific image in a separate tab by itself, it will not appear the same size as used on the website. It only sizes according to Client Hints when on the actual site.

I've included 9 example images. Each image code is like this:

```
<img src="https://imgix.tomdale.website/artsy/5.jpg?ch=width,dpr&w=400&ar=4:3&fit=crop&crop=faces,edges&auto=format,compress" 
sizes="(min-width: 768px) 30vw, 100vw" />
```

While in a supporting browser, like Chrome, the images will we 30% the width of the browser width when the browser is 768 pixels or larger. Once it goes smaller than that, each image will be sized at 100% the width of the browser. This is truly a dynamic size, every time you resize this browser and do a hard refresh you will notice the weight of the images change in the network tab.

In an ideal world, you should also be using srcset in combination with Client Hints.  You do want to serve a good size image for the other 25% of users that aren't supported for Client Hints.  In this demo I did not do that because I wanted to focus on showing the size of these images.  You will also notice the cropping points of these images change a bit, that's because I am using some imgix API to automatically crop to a face first, then a prominent object in the photo as a fallback option if there are no faces.

## Deploying to Vercel

I enjoy using both Vercel & Netlify to deploy my sites.  They both have a lot of benefits.  In this example I did use Vercel.  The important item needed to make Client Hints work is setting a feature policy.  With Vercel, you can set that policy by adding a vercel.json file. For my demo I put this in the vercel.json file:

```
{
  "routes": [
  	{
      "src": "/*",
  		"headers": {
  		  "Accept-CH": "DPR, Width, Viewport-Width",
  		  "Feature-Policy": "ch-dpr https://imgix.tomdale.website 'self'; ch-width https://imgix.tomdale.website 'self'; ch-viewport-width https://imgix.tomdale.website 'self'"
  		}
  	}
  ]
}
```

You should change that url to the url you are using for your images to make this work.  But, in order to serve Client Hints safely, this isn't that big of an effort to add.

## Conclusion

It's great to see Client Hints working again.  It's still not the 100% solution you can use, so you do still need to follow responsive image best practices with setting srcsets for different image breakpoints.  But Client Hints is certainly on the path to be the ideal solution in the future to serving those perfect responsive images.  Here is a link the [Github Repo](https://github.com/daletom/ch_testing) for this project.  Feel free to reach out to me if you have any other questions as well!

Photo by [Domenico Loia](https://unsplash.com/@domenicoloia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/responsive?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText).

 