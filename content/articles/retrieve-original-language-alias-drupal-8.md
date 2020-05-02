---
title: "Retrieve original language alias in Drupal 8"
description: "Multilingual sites are complex beasts and logic that should be simple becomes more convuluted. Something as simple as using an URL alias within an if statement becomes a trivial task as that alias becomes translatable."
date: 2018-07-03
draft: false
slug: "retrieve-original-language-alias-drupal-8"
tags:
  - Drupal 8
---

Multilingual sites are complex beasts and logic that should be simple becomes more convuluted. Something as simple as using an URL alias within an if statement becomes a trivial task as that alias becomes translatable.

Using path alias to match some logic isnt always the best way to accomplish the task in Drupal but it can be unavoidable when supporting multiple types of entities and sometimes it's just simpler and more readable.

I came up with the function below to delve into the `path.alias_manager` and retrieve the alias of the language required. In my case the original site language was **en**.

```php
<?function _get_untranslated_path() {
  // Get the original un-aliased node path e.g. node/1
  $current_path = \Drupal::service('path.current')->getPath();
  // Get current alias via node path and pass in the language we want to load it from
  $original_path = \Drupal::service('path.alias_manager')->getAliasByPath($current_path, 'en');
  return $original_path;
}
```

This function can sit in your `.theme` file or a custom module. Using the function can be done in any of Drupal's theme hooks. If you're using this more than once within a hook it makes sense to assign the function to a variable.

```php
<?function HOOK_preprocess_node(&$variables) {
  $original_path = _get_untranslated_path();
  if($original_path == "/my-path") {
    // Do something
  }
}
```

## Breaking it down

To not confuse this function with other Drupal core functions I'm prefixing it with an underscore.

```php
<?function _get_untranslated_path() {}
```

Next we get the current path of the current page using the `path.current` service. This returns Drupal's internal routed node path. For example: **node/1**

```php
<?$current_path = \Drupal::service('path.current')->getPath();
```

One we have the internally routed path we can use the `path.alias_manager` service to get the aliased version using the function `getAliasByPath()`. This accepts two arguments, the internally routed path and also a language code. This will then return the path alias set in that language.

```php
<?$original_path = \Drupal::service('path.alias_manager')->getAliasByPath($current_path, 'en');
```

We then return the original path to allow the function to return the correct value when assigned.

```php
<?return $original_path;
```

And below we have the final code outcome if used within a `.theme` file.

```php
<?function HOOK_preprocess_node(&$variables) {
  $original_path = _get_untranslated_path();
  if($original_path == "/my-path") {
    // Do something
  }
}

function _get_untranslated_path() {
  $current_path = \Drupal::service('path.current')->getPath();
  $original_path = \Drupal::service('path.alias_manager')->getAliasByPath($current_path, 'en');
  return $original_path;
}
```



