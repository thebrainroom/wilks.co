---
title: "Custom Hugo version with Netlify"
description: "Hugo and Netlify are a match made in heaven, with continuous deployment, custom domain names and a tons of other goodies it's never been easier spin up a static site"
date: 2020-05-07T10:57:55+10:00
draft: false
tags:
  - Hugo
  - Netlify
---
Hugo and Netlify are a match made in heaven, with continuous deployment, custom domain names and a tons of other goodies it's never been easier spin up a static site.

However, while in the prcoess of launching my new site I noticed that [syntax highlighting](https://gohugo.io/content-management/syntax-highlighting/) (using Chroma) was busted on my live site but not within my development site.

After some digging it appears that Netlify by default uses an older version of Hugo to perform site builds. Syntax highlighting with Chroma is only supported with Hugo `v0.60` and above.

Luckily this is easy to fix without the help of support.

## Changing Hugo version on Netlify

To use your Hugo version of choice, from the Netlify site admin panel navigate to `Build & deploy -> Environment`.

Click the **Edit Variables** button and then the **New variable** button.

In the **key** field add `HUGO_VERSION` and in the **value** field add your required Hugo version. Such as `0.65.3` no **v** is required.

To find out what version of Hugo you are running locally you can run `hugo version`.

Click save and trigger a site redeploy. Your site will now be built with the Hugo version set in your environent config.