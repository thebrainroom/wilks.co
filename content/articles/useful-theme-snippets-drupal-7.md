---
title: "Useful Theme Snippets For Drupal 7"
date: 2014-08-11
draft: false
tags: [drupal]
theme: "drupal"
---

At BLISS, our primary development platform is Drupal. 

We spend a lot of time trying to make working with Drupal easier for the whole team, so over the past few months I've been working on tools that speed up Drupal development and make our products more consistent.

I'm not going to go into the tools today as they're still being tested internally but I'd like to share a few very useful pieces of code that should remove some headaches any newcomers to Drupal might find.

## Removing unwanted CSS

Drupal ships with a set of pre-made stylesheets that help with the theming of forms and other generic system elements. If you're creating a theme from scratch these can be annoying to override and generally overspecific.

These files can be removed in your <code>template.php</code> like so:

```php
// Turn off styles from system/contrib modules

function THEMENAME_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
}
```

## Create a template for teaser views

When theming different node view types such as full content or teaser, we ideally want to seperate the logic from the templates where possible. Rather than checking for the <code>$teaser</code> variable in a standard node template (for example, node--article.tpl.php) we can create a new theme suggestion like so in the <code>template.php</code> file:

```php
function THEMENAME_preprocess_node(&$vars) {
  
  // Adds a node template suggestion for teasers e.g. node--article--teaser.tpl.php

  if($vars['view_mode'] == 'teaser') {
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__teaser';
    $vars['theme_hook_suggestions'][] = 'node__teaser';
  }

}
```

So now based on our example of the article content type we have the option to theme full content with node--article.tpl.php and we can theme a teaser view using node--article--teaser.tpl.php. Much cleaner.

## Creating and templating custom display modes

It's possible when theming more complex sites that you'll require more display modes than just teaser and full content. This particular piece of code will live in it's own custom module. Drupal.org has a detailed tutorial for <a href="https://www.drupal.org/node/1074360" target="_blank">creating your own module</a>.

Now presuming you have the backbone of your module setup. Add the following code to your custom module:

```php
// Implements hook_entity_info_alter().

function YOURMODULENAME_entity_info_alter(&$entity_info) {
  $entity_info['node']['view modes']['custom_display'] = array(
    'label' => t('Custom Display'),
    'custom settings' => TRUE,
  );
}
```

Now we've got the code in place for the custom display clear the cache and you should now have access to the custom display accross all your content types and within views.

For this to become useful we need to add a template suggestion to allow us to theme it. This will exist within <code>preprocess_node()</code> like the earlier example.

```php
if($vars['view_mode'] == 'custom_display') {
    $vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__custom-display';
    // Creates theme suggestion for node--contenttype--custom-display.tpl.php
  }
```


## Theme Includes

Theme includes can be really useful if your theme adopts a large number of page templates and you don't want to be duplicating large chunks of code that might be modified in the future. A good example of this is a header or footer section.

```php

// Allows use of theme includes and template suggestions

function THEMENAME_theme() {
  return array(
    'header' => array(
      'arguments' => array(),
      'template' => 'templates/header', // Creates template suggestion for header.tpl.php
    ),
    'footer' => array(
      'arguments' => array(),
      'template' => 'templates/footer', // Creates template suggestion for footer.tpl.php
    ),
  );
}
```

These includes can then be called in any other Drupal template like so:

```php
<?php print theme('header'); ?>
```

Theme functions also allow you to pass arguments to them. This might be useful when you a rendering a Drupal menu inside a theme template. In its current form the variable <code>$page</code> (which is needed to render the menu) does not exist. You can pass in the variable like this:

```php
<?php print theme('header', array(

  // Pass in variables that are required
  "page" => $page,

)); ?>
```

## Wrapping Up

Drupals hook system is an incredibly powerful tool and one that should be indispensible to any themer looking to advance their Drupal toolset. Hopefully these examples will provide an exciting and powerful introduction to those just starting to utilise Drupal's most powerful features.
