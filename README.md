# jquery.SmoothScrollBar
Easy to get your website has smooth scrollwheel

## Introduction

Tired to get your website become smooth when user scrolling? jquery.SmoothScrollBar is a lightweight plugin help your case.
View the demo [here](https://rawgit.com/nntgwww/jquery.SmoothScrollBar/master/Demo.html)

## How to use

Simple! Select your element need make it become smooth scroll and pass some simple settings

```javascript

//Easy Mode
$(document).smoothScrollBar();

//More Options
$(document).smoothScrollBar({
        defaultSpeed: 60,
        defaultAnimationTime: 1200
    });

//Default Options
$(document).smoothScrollBar({
        debug: false,
        defaultDetailDelta: 3,
        defaultWheelDelta: 120,
        defaultSpeed: 50,
        defaultAnimationTime: 1500
    });
```

- `debug`: (default `false`) Write out console log current scroll top position of the element.

- `defaultDetailDelta`: (default `3`) Normalize scroll speed across browsers. You shouldn't change it.

- `defaultWheelDelta`: (default `120`) Normalize scroll speed across browsers. You shouldn't change it.

- `defaultSpeed`: (default `50`) Scroll top per mousewheel. Change it if you think the scroll speed is low or too fast.

- `defaultAnimationTime`:(default `1500`) Time to make scroll wheel complete the animation. Change it if you think the scroll speed is low or too fast.

## Notes

This plugin also can make sections, popups have overflow-y smooth when user scrolling.

However if your website have popups or sections have overflow-y and you have already implement $(document) smooth scrolling, but not target these popups or sections, these popus or sections can't scroll down.


```javascript
// Once you implement $(document) smooth scrolling, you must also target these, or it won't scroll!
$("#popup").smoothScrollBar();
$("#div-has-overflow").smoothScrollBar();


$(document).smoothScrollBar();

```


Contact me via giang.nguyen.dev@gmail.com
