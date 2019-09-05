---
title: "Hands-On with WebP"
date: 2013-10-24
draft: false
tags: [performance]
theme: "performance"
---

I've been following the progress of WebP for the last year and thought it was about time I actually investigated it a little further and tried it out for myself. 

Reducing page load speed is something that's incredibly important in a world where millions of devices can access the web with a multitude of conditions, and Google are trying to do something to tackle slow page load speeds. Google describes WebP as: 

> A new image format that provides lossless and lossy compression for images on the web

They also claim that WebP lossless images are "26% smaller in size compared to PNGs". I can already hear all the performance-savvy developers salivating at the thought of smaller lossless images, especially for larger transparent images that can't be compressed using traditional JPEG compression techniques.

Before you get your hopes up, it's worth noting that WebP browser support is fairly minimal. Currently, according to [Can I Use](http://caniuse.com/webp), WebP is only supported in:

* Chrome 9+
* Opera 12+
* Android Browser 4+
* Opera Mobile 11.1+
* Chrome for Android 29
* Google Chrome Frame

At the moment there's zero support in Firefox, Safari and IE unless using Chrome Frame (although who was holding their breath on that one?). WebP is very much an experimental technology. 

With that out of the way though, lets get down to the fun stuff.

## Testing

Conditions:

* Version: libwebp-0.3.1
* OS: OSX Mavericks

I'm not going to get into the technical side of installing and using WebP in this post. Google does a good job of explaining that in its [documentation](https://developers.google.com/speed/webp/download). It's worth noting now that only WebP compatible browsers will be able to view the WebP files linked to below.

### Exhibit 1: PNG

<img src="/images/articles/hands-on-webp/transparent-example.png" alt="PNG Image" />

[Test Image PNG](/images/articles/hands-on-webp/transparent-example.png)

Above is an example of a large transparent PNG being compressed losslessly.

* Resolution 3000px x 800px
* Original size: 142KB

### Exhibit 1: WebP

<img src="/images/articles/hands-on-webp/transparent-example.webp" alt="WebP Image" />

[Test Image WebP - 100% Lossless](/images/articles/hands-on-webp/transparent-example.webp)

Now we have the output of the original PNG in WebP at 100% quality and using a lossless output.

* Resolution 3000px x 800px
* Compressed size: 65KB

Flags used:

{% highlight bash %}
./cwebp transparent-example.png -q 100 -lossless -o transparent-example-80.webp
{% endhighlight %}

<img src="/images/articles/hands-on-webp/transparent-example-80.webp" alt="WebP Image" />

[Test Image WebP - 80% Lossy](/images/articles/hands-on-webp/transparent-example-80.webp)

Finally, this is the output of the original PNG in WebP at 80% quality and using a lossy output.

* Resolution 3000px x 800px
* Compressed size: 13KB

Flags used:

{% highlight bash %}
./cwebp transparent-example.png -q 80 -o transparent-example-80.webp
{% endhighlight %}

What we have here is pretty impressive. We've managed to shrink the filesize with no quality loss by over **54%**. Plus, if we look at the lossy compression we've saved over **90%** on the original file size with negligible quality loss.

## So, what now?

It's safe to say WebP is a serious contender for use on the web. It demonstrates serious compression rates with minimal quality loss and the ability to freely refine its compression modes depending on the image at hand.

As with any new technology it needs adoption rates and support from other browser manufacturers. Will Mozilla and Apple want to adopt Google's technology? Mozilla are [currently on the fence](http://news.cnet.com/8301-1023_3-57608064-93/mozilla-unimpressed-with-googles-web-photo-standard/) regarding WebP and have not been too impressed with their own tests. 