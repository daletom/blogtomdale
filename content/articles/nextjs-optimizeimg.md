---
title: Optimizing Images with Next.JS & Vercel
description: Providing a simple demo of a Next.js site optimizing images that can be followed along.  It also includes a deep dive into how these images are being optimized.
createdAt: November 5th, 2020
img: /nextjsimageptex.png
alt: Image Optimization with Next JS
tags: 
  - vercel
  - web performance
  - nextjs
  - responsive
---
Did you hear!? [Next.js version 10](https://nextjs.org/blog/next-10#images-on-the-web) now includes image optimization! All you have to do is switch an image tag, import one line, and add your height and width in that tag.  Is it that easy? What's really happening here?  These are all the questions I will answer while giving you an example template and showing you the results.

## Let's Dive In and Clone a Next.js Project
If you want to follow along, just enter this in your terminal to clone the next.js starter I have for this image optimization example:
```
npx create-next-app nextjs-imgopt --use-npm --example "https://github.com/daletom/nextjs-imgblog"
```
then run a 
```
npm install
```
to install the dependencies. The go into the project
```
cd nextjs-imgopt
```
and run the site in development
```
npm run dev
```
and go to your [localhost](http://localhost:3000/) to see it in action.

Here is a completed example if you just want to skip to the end on [Github](https://github.com/daletom/nextjs-imgblog) or the live url on [Vercel](https://nextjs-imgblog.vercel.app/).

## How Can I Tell These Images are Optimized?

Great question! I would suggest viewing this in Chrome or Firefox for the dev tools. I'm right clicking on one of the images and selecting inspect in my Chrome. The dev tools should open and you should see something like this:
![Dev Tools Inspect Showing Src Sets](https://imgix.tomdale.website/inspect1_imgopt.png?auto=format,compress&w=600)

This is showing a several `srcsets` of an image, 320 wide, 420 wide, 768 wide, etc. This is a list of various sizes of each image that the browser can choose to load  as the image. You will also notice several `data-srcsets` as well. Those are generated because we are also lazy loading these images. The browser is actually using the sizes attribute to determine which size image it loads. You can be smart with sizes and declare various sizes depending on the size of your browser window which allows Chrome to select various srcsets for many different browser/device sizes viewing your images.

Another great way to tell if they are getting optimized?  Look at the format of the image. If you are on a Chrome or Firefox browser, you will notice they are webp. Yep, these images are intelligently being formatted to webp!
 
Wondering which size of an image is being loaded? When you are inspecting, you can hover over a srcset and it will show a little preview of the image:
![Preview of image in dev tools](https://imgix.tomdale.website/inspect2_imgopt.png?auto=format,compress&w=600)

This shows the image is being viewed on the browser at a certain size (254 x 191 pixels) but the intrinsic value is the actual size of the image being loaded (yep, from srcset). This example is loading 420 x 315 pixels. I am fine with that, Chrome is being smart and increasing the size because I am on a MacBook Pro which has a screen with a high device pixel ratio (DPR). So Chrome is adding this larger option to ensure the image looks crisp on my screen.

These are all great examples of good image optimization practices. Adding various `srcset` options for images, intelligent image formatting, declaring a sizes attribute to help with responsive design, lazy loading, and serving larger images to higher DPR devices. It sounds like a lot, but I actually barely did anything in the Next.js code to make this all happen!

## How did the Image Optimization Get Added?

So we did a bunch of great image optimization items, but how did I do it? Instead of using an `<img>` in your projects, you can drop in `<Image>` instead.  All you have to do is reference it with this line (I did this in my pages/index.js):
```
import Image from 'next/Image'
```
then replace the `<img>` with `<Image>`. In the examples for this project, I am using a local image in the public folder. I then added a large width and height that met the aspect ratio I needed.  Why a large width and height? It generates additional `srcsets` for the image, which is great because I am going to add a sizes attribute that matches the design of my site. I have added `loading="lazy"`, which uses Chrome/Firefox's Native lazy loading. Then a low quality of 35. Don't worry, 35 isn't a % of 100, it's a lower setting that is fine for a blog. If you are doing high fashion, maybe make it a 70 :)

Lets see the example:
```
<Image
  src="/images/terrarium.jpg"
  alt="Terrarium"
  width={1600}
  height={1200}
  loading="lazy"
  quality={35}
  sizes="(max-width: 600px) 100vw, (max-width: 1023px) 48vw, 23vw"
/>
```

## What was that in the Sizes Attribute?

I know, I quickly skimmed over the `sizes` attribute. But I was on a roll and I couldn't stop! What I'm doing is essentially telling the browser to find an image in the `srcset` that closely meets these scenarios:
* if the browser is smaller than 600 pixels wide, find an image that is 100% the width of the browser
* if the browser is between 601 px and 1023 px wide, find an image that is 48% the width of the browser
* if the browser is larger than 1024 px, find an image that is 23% the width of the browser

This is an example of 4 columns in larger desktop, shifting to 2 columns, shifting to 1 single column on mobile. This is what the corresponding css looks like:
```
.column {
  flex: 23%;
  max-width: 23%;
  padding: 0 4px;
}

@media screen and (max-width: 1023px) {
    .column {
      flex: 48%;
      max-width: 48%;
    }
  }
@media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }
```

## How much better are these Optimized Images?

So glad you asked. I actually included a link to a second page of [unoptimized images](https://nextjs-imgblog.vercel.app/unopt) that mirrors the 8 images and workflow we just did. Without optimizing those same images, they are 18.5 MB compared to 650 KB (depending on which size and type of browser you are on). That is an unbelievable size difference. 

## Deploy to Vercel & Done

I know everything has been pretty easy up to this point and this section is not any different. Use whatever means to get it on something like Github (I use Github desktop). Then import a new project in Vercel, choose this Github project, it will detect it is Next.js, and press deploy! Also, thanks for baring with me while I secretly just shared tons of fun photos of my kids with you all :) Again here is the final [site](https://nextjs-imgblog.vercel.app/) you just made with me.