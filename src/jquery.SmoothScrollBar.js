/**
 * PLUGIN NAME: jQuery.SmoothScrollBar.js
 * AUTHOR: Giang Nguyen - giang.nguyen.dev@gmail.com
 * VERSION: 0.1
 * LICENSE: MIT
 * DATE: 04/06/2015 (dd/mm/yyyy)
 * REQUIRES:
 * _________________Jquery
 * */


//function snippet http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
}

(function ($) {

    var proto;
    proto = SmoothScrollBar.prototype;
    function SmoothScrollBar(ele, options) {
        this.opts = $.extend({
            debug: false,
            isNotOverFlow: false,
            defaultDetailDelta: 3,
            defaultWheelDelta: 120,
            defaultSpeed: 50,
            defaultAnimationTime: 1500
        }, options);
        this.extendEasingDefault();
        (isEventSupported('wheel')) ? this.smoothStandard(ele) : this.smoothNonStandard(ele);
    }

    proto.extendEasingDefault = function () {
        jQuery.extend(jQuery.easing, {
            easeOutQuint: function (x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            }
        });
    };

    proto.getHeightOfElement = function (elem){

        var ele=$(elem);
        var height;
        if(elem.offsetHeight < elem.scrollHeight){
            height=(ele.get(0).scrollHeight)-$(window).height();
        }
        else
            height= ele.height() - $(window).height();
        return height;
    };

    proto.smoothStandard = function (elem) {
        var ele=$(elem);
        var scrollTop = ele.scrollTop();
        var opts = this.opts;
        var wheel = false;

        ele.on("scroll.smoothScrollBar", function () {
            if (wheel === false) {
                scrollTop = $(this).scrollTop();
            }
        });


        ele.on("wheel.smoothScrollBar", function (e) {
            var oEvent = e.originalEvent;
            var eleHeight=proto.getHeightOfElement(elem);

            var newDelta = (!oEvent.wheelDelta) ? -oEvent.deltaY / opts.defaultDetailDelta : oEvent.wheelDelta / opts.defaultWheelDelta;

            scrollTop = Math.min(eleHeight, Math.max(0, parseInt(scrollTop - newDelta * opts.defaultSpeed)));

            if (opts.debug)console.log("ele:" + ele[0] + "top:" + scrollTop + " doc:" + eleHeight);

            var eleAction = (ele.is($(document)) ? $('html, body') : ele);

            eleAction.stop().animate({
                scrollTop: scrollTop + 'px'
            }, opts.defaultAnimationTime, 'easeOutQuint', function () {
                wheel = false;
            });

            return false;
        });
    };
    proto.smoothNonStandard = function (elem) {
        var ele=$(elem);
        var scrollTop = ele.scrollTop();
        var opts = this.opts;
        var wheel = false;

        ele.on("scroll.smoothScrollBar", function () {
            if (wheel === false) {
                scrollTop = $(this).scrollTop();
            }
        });

        ele.on("DOMMouseScroll.smoothScrollBar mousewheel.smoothScrollBar", function (e) {

            var eleHeight=proto.getHeightOfElement(elem);
            var newDelta = (e.originalEvent.detail) ? -e.originalEvent.detail / opts.defaultDetailDelta : e.originalEvent.wheelDelta / opts.defaultWheelDelta;
            scrollTop = Math.min(eleHeight, Math.max(0, parseInt(scrollTop - newDelta * opts.defaultSpeed)));

            if (opts.debug)console.log("ele:" + ele[0] + "top:" + scrollTop + " doc:" + eleHeight);

            var eleAction = (ele.is($(document)) ? $('html, body') : ele);

            eleAction.stop().animate({
                scrollTop: scrollTop + 'px'
            }, opts.defaultAnimationTime, 'easeOutQuint', function () {
                wheel = false;
            });
            return false;
        });

    };

    $.fn.smoothScrollBar = function (op) {
        return this.each(function () {
            if (!$.data(this, "smoothScrollBar")) {
                $.data(this, "smoothScrollBar", new SmoothScrollBar(this, op));
            }
        });
    };

})(jQuery);