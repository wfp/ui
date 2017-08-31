---
layout: page
title: CSS Styling
permalink: /basics/cssstyle/
resource: true
categories: Resources
---
{% include base.html %}

### BEM Sceme

The WFP UI will use the [BEM methodology](http://getbem.com/introduction) for naming classes in css. It is a component-based approach for web development. The idea behind it is to divide the user interface into independent blocks.

__These are the rules that should be followed:__

-  Use classes policy names `block__element--modifier`
-  Give a class only if it is really necessary in the actual context (if some css rules are needed for an element, it probabily needs a class), but please think that the component can be used in other contexts so may be need a "hook" managed by those contexts)
-  Some BEM violations are allowed using inheritance, but only for a level (e.g block items that we are sure are absolutely identical in every context: `block__items >  li`)
-  Use BEM rules also for states as BEM variants (so not only `active`, but `--is-active`, e.g. `block__item--is-active`)
-  Do not use CSS classes used for style components as JS hooks (so, create a specific class that will be used only for JS hook, e.g.: `block block--variant js-block` or `js-hook`)

### SCSS

CSS is build from a SCSS-files. Importing the `wfpui.scss` allows to use colors and mixins from the UI.


#### Media queries & breakpoints

Breakpoints allow to switch styling based on the width of the device. WFP UI is currently using the following breakpoints:

* $sm-screen:           35.5em;
* $md-screen:           48em;
* $lg-screen:           64em;
* $xl-screen:           80em;

[More about media queries](https://developer.mozilla.org/de/docs/Web/CSS/Media_Queries/Using_media_queries)

##### media-query

There are shorthand mixins for querying different screen Sizes. Show containing styling if screen is wider than breakpoint:

@media (min-width) Query
`
@include media-query($md-screen) {
  [...]
}
`

##### media-max

Show containing styling if screen is narrower than breakpoint:

@media (min-width) Query
`
@include media-max($md-screen) {
  [...]
}
`

#### print
`
@include print {
 [...]
}
`
