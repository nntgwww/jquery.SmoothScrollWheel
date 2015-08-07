/**
 * PLUGIN NAME: jQuery.SmoothScrollWheel.js - https://github.com/nntgwww/jquery.SmoothScrollWheel
 * AUTHOR: Giang Nguyen - giang.nguyen.dev@gmail.com
 * VERSION: 1.0.0
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
    proto = SmoothScrollWheel.prototype;
    function SmoothScrollWheel(ele, options) {
        this.opts = $.extend({
            debug: false,
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

        ele.on("scroll.SmoothScrollWheel", function () {
            if (wheel === false) {
                scrollTop = $(this).scrollTop();
            }
        });


        ele.on("wheel.SmoothScrollWheel", function (e) {
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

        ele.on("scroll.SmoothScrollWheel", function () {
            if (wheel === false) {
                scrollTop = $(this).scrollTop();
            }
        });

        ele.on("DOMMouseScroll.SmoothScrollWheel mousewheel.SmoothScrollWheel", function (e) {

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

    $.fn.SmoothScrollWheel = function (op) {
        return this.each(function () {
            if (!$.data(this, "SmoothScrollWheel")) {
                $.data(this, "SmoothScrollWheel", new SmoothScrollWheel(this, op));
            }
        });
    };

})(jQuery);
