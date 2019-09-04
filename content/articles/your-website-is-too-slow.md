---
title: "Your website is too slow"
date: 2012-07-26
draft: false
tags: [performance]
---

<p>Web optimisation is not a new concept, we do it everyday when we compress our images or tidy up some unnecessary code. While these habits are good they don't quite touch the surface of whats possible with good optimization practices. </p>
<p>This is just a short introduction to what's possible when optimizing your site.</p>

<h2>The tools</h2>
<p>Before setting out on your optimizing adventure you're going to need some tools. There are tons of freely available tools that will measure the speed of your site; my personal favourites are <a title="Google Website Optimizer" href="https://www.google.com/websiteoptimizer/" target="_blank">Google Website Optimizer</a> and <a title="Pingdom Tools" href="http://tools.pingdom.com/fpt/" target="_blank">Pingdom Tools</a>.</p>

<p>Pop the website you want to test into the relevant fields and let the tools do their things. At this point you're going to know if your website speed sucks or if you're doing things right. Either way you're probably going to be able to find room for improvement.</p>
<h2>Start with the basics - Images</h2>
<p>Start by looking at easiest areas to fix; improperly optimised images are normally a good start. You'd be surprised how much criticle speed can be shaved juyst by optimising all the images on your site properly. I use a tool called <a title="ImageOptim" href="http://imageoptim.com/" target="_blank">ImageOptim</a> which shaves any non-critical data from your png, git and jpeg file types. While some files may only change by 1 or 2 percent it still means you check the optimised images box.</p>

<p>If you're not using a mac you can have a look at some alternatives on <a href="http://sixrevisions.com/tools/8-excellent-tools-for-optimizing-your-images/" target="_blank">Six Revisions</a>.</p>
<h2>GZip</h2>
<p>Gzip is a server-side tool that compresses HTTP responses sent to the client requesting a web page. Most apache hosts have this alrwady installed. If it's not yet activated you can normally do so via your control panel or by contacting your host. If you're happy editing your .htaccess file then go ahead and manually enable it.</p>
{% highlight bash %}
#Compression using gZip
<ifmodule mod_deflate.c>
AddOutputFilterByType DEFLATE text/text text/html text/plain text/xml text/css application/x-javascript application/javascript text/javascript
</ifmodule>
#End gZip
{% endhighlight %}
<h2>Leverage Caching</h2>
<p>You can increase the speed of your site and also decrease the load on the server by caching assets. Caching lets you store information from your website either to the clients computer/device or directly to the server. By doing this not only are you speeding up frequent visitors browsing experience but you're also reducing load on the server your site is hosted.</p>

<p>Over time you could be saving money on bandwidth all while giving your visitors a more pleasurable experience.</p>

<p>On this website I use the W3 Total Cache plugin for Wordpress. On other CMS' such as Drupal these features come out of the box and can be located on the Performance section in Configuration.</p>
<h2>Minify/compress your code</h2>
<p>Minifying your HTML, CSS and JS can instantly save you a good handful of bytes. If you're using any popular CMS' then they should have this functionality built in but if not then tools such as Yahoo's <a title="YUI Compressor" href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a> or Will Peavey's <a title="HTML Minifier" href="http://www.willpeavy.com/minifier/">HTML minifier</a> should do the job! Again if using Wordpress; W3 Total Cache has this functionality built in.</p>
<h2>Typekit</h2>
<p>Typekit is a troublesom little fellow. The way Typekit serves fonts can make your page hang for a good few seconds before showing your visitors the goods. There are ways of speeding up page speed with Typekit which I'll save for a serperate post. However, if you'd like to read more about it the guys at Typekit did and <a title="Asynchronous Typekit" href="http://blog.typekit.com/2011/05/25/loading-typekit-fonts-asynchronously/">awesome breakdown</a> of loading Typekit fonts asynchronously.</p>
<h2>Conclusion</h2>
<p>The above is just the tip of the iceberg for beginning to speed up and optimize your site for your visitors and for search engines. These steps are just the beginning of completely optimizing your web sites. Following the recommendations from Google and Pingdom you should be able to get your site to a good standard in a relatively short amount of time.</p>
