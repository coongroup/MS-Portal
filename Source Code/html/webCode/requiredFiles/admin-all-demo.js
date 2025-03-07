function progress(a, b) {
    var c = a * b.width() / 100;
    b.find(".progressbar-value").animate({
        width: c
    }, 1200)
}

function body_sizer() {
    if ($("body").hasClass("fixed-sidebar")) {
        var a = $(window).height(),
            b = $("#page-header").height(),
            c = a - b;
        $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $("#page-content").css("min-height", c)
    } else {
        var a = $(document).height(),
            b = $("#page-header").height(),
            c = a - b;
        $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $("#page-content").css("min-height", c)
    }
}

function pageTransitions() {
    var a = [".pt-page-moveFromLeft", "pt-page-moveFromRight", "pt-page-moveFromTop", "pt-page-moveFromBottom", "pt-page-fade", "pt-page-moveFromLeftFade", "pt-page-moveFromRightFade", "pt-page-moveFromTopFade", "pt-page-moveFromBottomFade", "pt-page-scaleUp", "pt-page-scaleUpCenter", "pt-page-flipInLeft", "pt-page-flipInRight", "pt-page-flipInBottom", "pt-page-flipInTop", "pt-page-rotatePullRight", "pt-page-rotatePullLeft", "pt-page-rotatePullTop", "pt-page-rotatePullBottom", "pt-page-rotateUnfoldLeft", "pt-page-rotateUnfoldRight", "pt-page-rotateUnfoldTop", "pt-page-rotateUnfoldBottom"];
    for (var b in a) {
        var c = a[b];
        if ($(".add-transition").hasClass(c)) return $(".add-transition").addClass(c + "-init page-transition"), void setTimeout(function() {
            $(".add-transition").removeClass(c + " " + c + "-init page-transition")
        }, 1200)
    }
}

function swither_resizer() {
    var a = $(window).height();
    $("#theme-switcher-wrapper").height(a / 1.4)
}
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.6", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.6", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide())
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.6", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery), $(document).on("ready", function() {
        $(".progressbar").each(function() {
            var a = $(this),
                b = $(this).attr("data-value");
            progress(b, a)
        })
    }), $(function() {
        $("#header-right, .updateEasyPieChart, .complete-user-profile, #progress-dropdown, .progress-box").hover(function() {
            $(".progressbar").each(function() {
                var a = $(this),
                    b = $(this).attr("data-value");
                progress(b, a)
            })
        })
    }),
    function(a) {
        var b = function() {
            var b = {
                    bcClass: "sf-breadcrumb",
                    menuClass: "sf-js-enabled",
                    anchorClass: "sf-with-ul",
                    menuArrowClass: "sf-arrows"
                },
                c = (function() {
                    a(window).load(function() {
                        a("body").children().on("click.superclick", function() {
                            var b = a(".sf-js-enabled");
                            b.superclick("reset")
                        })
                    })
                }(), function(a, c) {
                    var d = b.menuClass;
                    c.cssArrows && (d += " " + b.menuArrowClass), a.toggleClass(d)
                }),
                d = function(c, d) {
                    return c.find("li." + d.pathClass).slice(0, d.pathLevels).addClass(d.activeClass + " " + b.bcClass).filter(function() {
                        return a(this).children(".sidebar-submenu").hide().show().length
                    }).removeClass(d.pathClass)
                },
                e = function(a) {
                    a.children("a").toggleClass(b.anchorClass)
                },
                f = function(a) {
                    var b = a.css("ms-touch-action");
                    b = "pan-y" === b ? "auto" : "pan-y", a.css("ms-touch-action", b)
                },
                g = function(b) {
                    var c, d = a(this),
                        e = d.siblings(".sidebar-submenu");
                    return e.length ? (c = e.is(":hidden") ? h : i, a.proxy(c, d.parent("li"))(), !1) : void 0
                },
                h = function() {
                    var b = a(this);
                    l(b);
                    b.siblings().superclick("hide").end().superclick("show")
                },
                i = function() {
                    var b = a(this),
                        c = l(b);
                    a.proxy(j, b, c)()
                },
                j = function(b) {
                    b.retainPath = a.inArray(this[0], b.$path) > -1, this.superclick("hide"), this.parents("." + b.activeClass).length || (b.onIdle.call(k(this)), b.$path.length && a.proxy(h, b.$path)())
                },
                k = function(a) {
                    return a.closest("." + b.menuClass)
                },
                l = function(a) {
                    return k(a).data("sf-options")
                };
            return {
                hide: function(b) {
                    if (this.length) {
                        var c = this,
                            d = l(c);
                        if (!d) return this;
                        var e = d.retainPath === !0 ? d.$path : "",
                            f = c.find("li." + d.activeClass).add(this).not(e).removeClass(d.activeClass).children(".sidebar-submenu"),
                            g = d.speedOut;
                        b && (f.show(), g = 0), d.retainPath = !1, d.onBeforeHide.call(f), f.stop(!0, !0).animate(d.animationOut, g, function() {
                            var b = a(this);
                            d.onHide.call(b)
                        })
                    }
                    return this
                },
                show: function() {
                    var a = l(this);
                    if (!a) return this;
                    var b = this.addClass(a.activeClass),
                        c = b.children(".sidebar-submenu");
                    return a.onBeforeShow.call(c), c.stop(!0, !0).animate(a.animation, a.speed, function() {
                        a.onShow.call(c)
                    }), this
                },
                destroy: function() {
                    return this.each(function() {
                        var d = a(this),
                            g = d.data("sf-options"),
                            h = d.find("li:has(ul)");
                        return g ? (c(d, g), e(h), f(d), d.off(".superclick"), h.children(".sidebar-submenu").attr("style", function(a, b) {
                            return b.replace(/display[^;]+;?/g, "")
                        }), g.$path.removeClass(g.activeClass + " " + b.bcClass).addClass(g.pathClass), d.find("." + g.activeClass).removeClass(g.activeClass), g.onDestroy.call(d), void d.removeData("sf-options")) : !1
                    })
                },
                reset: function() {
                    return this.each(function() {
                        var b = a(this),
                            c = l(b),
                            d = a(b.find("." + c.activeClass).toArray().reverse());
                        d.children("a").trigger("click")
                    })
                },
                init: function(h) {
                    return this.each(function() {
                        var i = a(this);
                        if (i.data("sf-options")) return !1;
                        var j = a.extend({}, a.fn.superclick.defaults, h),
                            k = i.find("li:has(ul)");
                        j.$path = d(i, j), i.data("sf-options", j), c(i, j), e(k), f(i), i.on("click.superclick", "a", g), k.not("." + b.bcClass).superclick("hide", !0), j.onInit.call(this)
                    })
                }
            }
        }();
        a.fn.superclick = function(c, d) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? a.error("Method " + c + " does not exist on jQuery.fn.superclick") : b.init.apply(this, arguments)
        }, a.fn.superclick.defaults = {
            activeClass: "sfHover",
            pathClass: "overrideThisToUse",
            pathLevels: 1,
            animation: {
                opacity: "show"
            },
            animationOut: {
                opacity: "hide"
            },
            speed: "normal",
            speedOut: "fast",
            cssArrows: !0,
            onInit: a.noop,
            onBeforeShow: a.noop,
            onShow: a.noop,
            onBeforeHide: a.noop,
            onHide: a.noop,
            onIdle: a.noop,
            onDestroy: a.noop
        }
    }(jQuery),
    function() {
        "use strict";
        var a = "undefined" != typeof module && module.exports,
            b = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            c = function() {
                for (var a, b, c = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], d = 0, e = c.length, f = {}; e > d; d++)
                    if (a = c[d], a && a[1] in document) {
                        for (d = 0, b = a.length; b > d; d++) f[c[0][d]] = a[d];
                        return f
                    }
                return !1
            }(),
            d = {
                request: function(a) {
                    var d = c.requestFullscreen;
                    a = a || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? a[d]() : a[d](b && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[c.exitFullscreen]()
                },
                toggle: function(a) {
                    this.isFullscreen ? this.exit() : this.request(a)
                },
                onchange: function() {},
                onerror: function() {},
                raw: c
            };
        return c ? (Object.defineProperties(d, {
            isFullscreen: {
                get: function() {
                    return !!document[c.fullscreenElement]
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[c.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return !!document[c.fullscreenEnabled]
                }
            }
        }), document.addEventListener(c.fullscreenchange, function(a) {
            d.onchange.call(d, a)
        }), document.addEventListener(c.fullscreenerror, function(a) {
            d.onerror.call(d, a)
        }), void(a ? module.exports = d : window.screenfull = d)) : void(a ? module.exports = !1 : window.screenfull = !1)
    }(),
    function(a) {
        a.easyPieChart = function(b, c) {
            var d, e, f, g, h, i, j, k, l = this;
            return this.el = b, this.$el = a(b), this.$el.data("easyPieChart", this), this.init = function() {
                var b, d;
                return l.options = a.extend({}, a.easyPieChart.defaultOptions, c), b = parseInt(l.$el.data("percent"), 10), l.percentage = 0, l.canvas = a("<canvas width='" + l.options.size + "' height='" + l.options.size + "'></canvas>").get(0), l.$el.append(l.canvas), "undefined" != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(l.canvas), l.ctx = l.canvas.getContext("2d"), window.devicePixelRatio > 1 && (d = window.devicePixelRatio, a(l.canvas).css({
                    width: l.options.size,
                    height: l.options.size
                }), l.canvas.width *= d, l.canvas.height *= d, l.ctx.scale(d, d)), l.ctx.translate(l.options.size / 2, l.options.size / 2), l.ctx.rotate(l.options.rotate * Math.PI / 180), l.$el.addClass("easyPieChart"), l.$el.css({
                    width: l.options.size,
                    height: l.options.size,
                    lineHeight: "" + l.options.size + "px"
                }), l.update(b), l
            }, this.update = function(a) {
                return a = parseFloat(a) || 0, l.options.animate === !1 ? f(a) : e(l.percentage, a), l
            }, j = function() {
                var a, b, c;
                for (l.ctx.fillStyle = l.options.scaleColor, l.ctx.lineWidth = 1, c = [], a = b = 0; 24 >= b; a = ++b) c.push(d(a));
                return c
            }, d = function(a) {
                var b;
                b = a % 6 === 0 ? 0 : .017 * l.options.size, l.ctx.save(), l.ctx.rotate(a * Math.PI / 12), l.ctx.fillRect(l.options.size / 2 - b, 0, .05 * -l.options.size + b, 1), l.ctx.restore()
            }, k = function() {
                var a;
                a = l.options.size / 2 - l.options.lineWidth / 2, l.options.scaleColor !== !1 && (a -= .08 * l.options.size), l.ctx.beginPath(), l.ctx.arc(0, 0, a, 0, 2 * Math.PI, !0), l.ctx.closePath(), l.ctx.strokeStyle = l.options.trackColor, l.ctx.lineWidth = l.options.lineWidth, l.ctx.stroke()
            }, i = function() {
                l.options.scaleColor !== !1 && j(), l.options.trackColor !== !1 && k()
            }, f = function(b) {
                var c;
                i(), l.ctx.strokeStyle = a.isFunction(l.options.barColor) ? l.options.barColor(b) : l.options.barColor, l.ctx.lineCap = l.options.lineCap, l.ctx.lineWidth = l.options.lineWidth, c = l.options.size / 2 - l.options.lineWidth / 2, l.options.scaleColor !== !1 && (c -= .08 * l.options.size), l.ctx.save(), l.ctx.rotate(-Math.PI / 2), l.ctx.beginPath(), l.ctx.arc(0, 0, c, 0, 2 * Math.PI * b / 100, !1), l.ctx.stroke(), l.ctx.restore()
            }, h = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                    return window.setTimeout(a, 1e3 / 60)
                }
            }(), e = function(a, b) {
                var c, d;
                l.options.onStart.call(l), l.percentage = b, d = Date.now(), c = function() {
                    var e, j;
                    return j = Date.now() - d, j < l.options.animate && h(c), l.ctx.clearRect(-l.options.size / 2, -l.options.size / 2, l.options.size, l.options.size), i.call(l), e = [g(j, a, b - a, l.options.animate)], l.options.onStep.call(l, e), f.call(l, e), j >= l.options.animate ? l.options.onStop.call(l) : void 0
                }, h(c)
            }, g = function(a, b, c, d) {
                var e, f;
                return e = function(a) {
                    return Math.pow(a, 2)
                }, f = function(a) {
                    return 1 > a ? e(a) : 2 - e(a / 2 * -2 + 2)
                }, a /= d / 2, c / 2 * f(a) + b
            }, this.init()
        }, a.easyPieChart.defaultOptions = {
            barColor: "#ef1e25",
            trackColor: "#f2f2f2",
            scaleColor: "#dfe0e0",
            lineCap: "round",
            rotate: 0,
            size: 110,
            lineWidth: 3,
            animate: !1,
            onStart: a.noop,
            onStop: a.noop,
            onStep: a.noop
        }, a.fn.easyPieChart = function(b) {
            return a.each(this, function(c, d) {
                var e, f;
                return e = a(d), e.data("easyPieChart") ? void 0 : (f = a.extend({}, b, e.data()), e.data("easyPieChart", new a.easyPieChart(d, f)))
            })
        }
    }(jQuery);

$(document).ready(function() {
       
    }),
    function(a) {
        a.slidebars = function(b) {
            function c() {
                !j.disableOver || "number" == typeof j.disableOver && j.disableOver >= w ? (v = !0, a("html").addClass("sb-init"), j.hideControlClasses && x.removeClass("sb-hide"), d()) : "number" == typeof j.disableOver && j.disableOver < w && (v = !1, a("html").removeClass("sb-init"), j.hideControlClasses && x.addClass("sb-hide"), q.css("minHeight", ""), (s || u) && g())
            }

            function d() {
                q.css("minHeight", ""), q.css("minHeight", a("html").height() + "px"), r && r.hasClass("sb-width-custom") && r.css("width", r.attr("data-sb-width")), t && t.hasClass("sb-width-custom") && t.css("width", t.attr("data-sb-width")), r && (r.hasClass("sb-style-push") || r.hasClass("sb-style-overlay")) && r.css("marginLeft", "-" + r.css("width")), t && (t.hasClass("sb-style-push") || t.hasClass("sb-style-overlay")) && t.css("marginRight", "-" + t.css("width")), j.scrollLock && a("html").addClass("sb-scroll-lock")
            }

            function e(a, b, c) {
                var e;
                if (e = a.hasClass("sb-style-push") ? q.add(a).add(y) : a.hasClass("sb-style-overlay") ? a : q.add(y), "translate" === z) e.css("transform", "translate(" + b + ")");
                else if ("side" === z) "-" === b[0] && (b = b.substr(1)), "0px" !== b && e.css(c, "0px"), setTimeout(function() {
                    e.css(c, b)
                }, 1);
                else if ("jQuery" === z) {
                    "-" === b[0] && (b = b.substr(1));
                    var f = {};
                    f[c] = b, e.stop().animate(f, 400)
                }
                setTimeout(function() {
                    "0px" === b && (e.removeAttr("style"), d())
                }, 400)
            }

            function f(b, c) {
                function d() {
                    v && "left" === b && r ? (a("html").addClass("sb-active sb-active-left"), r.addClass("sb-active"), e(r, r.css("width"), "left"), setTimeout(function() {
                        s = !0, "function" == typeof c && c()
                    }, 400)) : v && "right" === b && t && (a("html").addClass("sb-active sb-active-right"), t.addClass("sb-active"), e(t, "-" + t.css("width"), "right"), setTimeout(function() {
                        u = !0, "function" == typeof c && c()
                    }, 400))
                }
                "left" === b && r && u || "right" === b && t && s ? (g(), setTimeout(d, 400)) : d()
            }

            function g(b) {
                (s || u) && (s && (e(r, "0px", "left"), s = !1), u && (e(t, "0px", "right"), u = !1), setTimeout(function() {
                    a("html").removeClass("sb-active sb-active-left sb-active-right"), r && r.removeClass("sb-active"), t && t.removeClass("sb-active"), "function" == typeof b && b()
                }, 400))
            }

            function h(a, b) {
                "left" === a && r && (s ? g(null, b) : f("left", b)), "right" === a && t && (u ? g(null, b) : f("right", b))
            }

            function i(a, b) {
                a.stopPropagation(), a.preventDefault(), "touchend" === a.type && b.off("click")
            }
            var j = a.extend({
                    siteClose: !0,
                    scrollLock: !1,
                    disableOver: !1,
                    hideControlClasses: !1
                }, b),
                k = document.createElement("div").style,
                l = !1,
                m = !1;
            ("" === k.MozTransition || "" === k.WebkitTransition || "" === k.OTransition || "" === k.transition) && (l = !0), ("" === k.MozTransform || "" === k.WebkitTransform || "" === k.OTransform || "" === k.transform) && (m = !0);
            var n = navigator.userAgent,
                o = !1,
                p = !1;
            /Android/.test(n) ? o = n.substr(n.indexOf("Android") + 8, 3) : /(iPhone|iPod|iPad)/.test(n) && (p = n.substr(n.indexOf("OS ") + 3, 3).replace("_", ".")), (o && 3 > o || p && 5 > p) && a("html").addClass("sb-static");
            var q = a("#sb-site, .sb-site-container");
            if (a(".sb-left").length) var r = a(".sb-left"),
                s = !1;
            if (a(".sb-right").length) var t = a(".sb-right"),
                u = !1;
            var v = !1,
                w = a(window).width(),
                x = a(".sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close"),
                y = a(".sb-slide");
            c(), a(window).resize(function() {
                var b = a(window).width();
                w !== b && (w = b, c(), s && f("left"), u && f("right"))
            });
            var z;
            l && m ? (z = "translate", o && 4.4 > o && (z = "side")) : z = "jQuery", this.slidebars = {
                open: f,
                close: g,
                toggle: h,
                init: function() {
                    return v
                },
                reInit: c,
                resetCSS: d,
                active: function(a) {
                    return "left" === a && r ? s : "right" === a && t ? u : void 0
                },
                destroy: function(a) {
                    "left" === a && r && (s && g(), setTimeout(function() {
                        r.remove(), r = !1
                    }, 400)), "right" === a && t && (u && g(), setTimeout(function() {
                        t.remove(), t = !1
                    }, 400))
                }
            }, a(".sb-toggle-left").on("touchend click", function(b) {
                i(b, a(this)), h("left")
            }), a(".sb-toggle-right").on("touchend click", function(b) {
                i(b, a(this)), h("right")
            }), a(".sb-open-left").on("touchend click", function(b) {
                i(b, a(this)), f("left")
            }), a(".sb-open-right").on("touchend click", function(b) {
                i(b, a(this)), f("right")
            }), a(".sb-close").on("touchend click", function(b) {
                if (a(this).is("a") || a(this).children().is("a")) {
                    if ("click" === b.type) {
                        b.preventDefault();
                        var c = a(this).is("a") ? a(this).attr("href") : a(this).find("a").attr("href");
                        g(function() {
                            window.location = c
                        })
                    }
                } else i(b, a(this)), g()
            }), q.on("touchend click", function(b) {
                j.siteClose && (s || u) && (i(b, a(this)), g())
            })
        }
    }(jQuery),
    function(a) {
        a(document).ready(function() {
            a.slidebars()
        })
    }(jQuery), $(document).ready(function() {
        $(".switch-button").click(function(a) {
            a.preventDefault();
            var b = $(this).attr("switch-parent"),
                c = $(this).attr("switch-target");
            $(b).slideToggle(), $(c).slideToggle()
        }), $(".hidden-button").hover(function() {
            $(".btn-hide", this).fadeIn("fast")
        }, function() {
            $(".btn-hide", this).fadeOut("normal")
        }), $(".toggle-button").click(function(a) {
            a.preventDefault(), $(".glyph-icon", this).toggleClass("icon-rotate-180"), $(this).parents(".content-box:first").find(".content-box-wrapper").slideToggle()
        }), $(".remove-button").click(function(a) {
            a.preventDefault();
            var b = $(this).attr("data-animation"),
                c = $(this).parents(".content-box:first");
            $(c).addClass("animated"), $(c).addClass(b);
            window.setTimeout(function() {
                $(c).slideUp()
            }, 500), window.setTimeout(function() {
                $(c).removeClass(b).fadeIn()
            }, 2500)
        }), $(function() {
            "use strict";
            $(".infobox-close").click(function(a) {
                a.preventDefault(), $(this).parent().fadeOut()
            })
        })
    }), $(document).ready(function() {
        $(".overlay-button").click(function() {
            var a = $(this).attr("data-theme"),
                b = $(this).attr("data-opacity"),
                c = $(this).attr("data-style"),
                d = '<div id="loader-overlay" class="ui-front loader ui-widget-overlay ' + a + " opacity-" + b + '"><img src="../../assets/images/spinner/loader-' + c + '.gif" alt="" /></div>';
            $("#loader-overlay").length && $("#loader-overlay").remove(), $("body").append(d), $("#loader-overlay").fadeIn("fast"), setTimeout(function() {
                $("#loader-overlay").fadeOut("fast")
            }, 3e3)
        }), $(".refresh-button").click(function(a) {
            $(".glyph-icon", this).addClass("icon-spin"), a.preventDefault();
            var b = $(this).parents(".content-box"),
                c = $(this).attr("data-theme"),
                d = $(this).attr("data-opacity"),
                e = $(this).attr("data-style"),
                f = '<div id="refresh-overlay" class="ui-front loader ui-widget-overlay ' + c + " opacity-" + d + '"><img src="../../assets/images/spinner/loader-' + e + '.gif" alt="" /></div>';
            $("#refresh-overlay").length && $("#refresh-overlay").remove(), $(b).append(f), $("#refresh-overlay").fadeIn("fast"), setTimeout(function() {
                $("#refresh-overlay").fadeOut("fast"), $(".glyph-icon", this).removeClass("icon-spin")
            }, 1500)
        })
    }), $(function() {
        "use strict";
        $('a[href="#"]').click(function(a) {
            a.preventDefault()
        })
    }), $(function() {
        "use strict";
        $(".todo-box li input").on("click", function() {
            $(this).parent().toggleClass("todo-done")
        })
    }), $(function() {
        "use strict";
        var a = 0;
        $(".timeline-scroll .tl-row").each(function(b, c) {
            var d = $(c);
            a += d.outerWidth() + parseInt(d.css("margin-left"), 10) + parseInt(d.css("margin-right"), 10)
        }), $(".timeline-horizontal", this).width(a)
    }), $(function() {
        
    }), $(function() {
        "use strict";
        $(".scrollable-slim").slimScroll({
            color: "#8da0aa",
            size: "10px",
            alwaysVisible: !0
        })
    }), $(function() {
        "use strict";
        $(".scrollable-slim-sidebar").slimScroll({
            color: "#8da0aa",
            size: "10px",
            height: "100%",
            alwaysVisible: !0
        })
    }), $(function() {
        "use strict";
        $(".scrollable-slim-box").slimScroll({
            color: "#8da0aa",
            size: "6px",
            alwaysVisible: !1
        })
    }), $(function() {
        "use strict";
        $(".loading-button").click(function() {
            var a = $(this);
            a.button("loading")
        })
    }), $(function() {
        "use strict";
        $(".tooltip-button").tooltip({
            container: "body"
        })
    }), $(function() {
        "use strict";
        $(".alert-close-btn").click(function() {
            $(this).parent().addClass("animated fadeOutDown")
        })
    }), $(function() {
        "use strict";
        $(".popover-button").popover({
            container: "body",
            html: !0,
            animation: !0,
            content: function() {
                var a = $(this).attr("data-id");
                return $(a).html()
            }
        }).click(function(a) {
            a.preventDefault()
        })
    }), $(function() {
        "use strict";
        $(".popover-button-default").popover({
            container: "body",
            html: !0,
            animation: !0
        }).click(function(a) {
            a.preventDefault()
        })
    });
var mUIColors = {
        "default": "#3498db",
        gray: "#d6dde2",
        primary: "#00bca4",
        success: "#2ecc71",
        warning: "#e67e22",
        danger: "#e74c3c",
        info: "#3498db"
    },
    getUIColor = function(a) {
        return mUIColors[a] ? mUIColors[a] : mUIColors["default"]
    };
document.getElementById("fullscreen-btn") && document.getElementById("fullscreen-btn").addEventListener("click", function() {
    screenfull.enabled && screenfull.request()
}), $(document).ready(function() {
    body_sizer(), $("div[id='#fixed-sidebar']").on("click", function() {
        if ($(this).hasClass("switch-on")) {
            var a = $(window).height(),
                b = $("#page-header").height(),
                c = a - b;
            $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $(".scroll-sidebar").slimscroll({
                height: "100%",
                color: "rgba(155, 164, 169, 0.68)",
                size: "6px"
            });
            var d = $("#page-header").attr("class");
            $("#header-logo").addClass(d)
        } else {
            var a = $(document).height(),
                b = $("#page-header").height(),
                c = a - b;
            $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $(".scroll-sidebar").slimScroll({
                destroy: !0
            }), $("#header-logo").removeClass("bg-gradient-9")
        }
    })
}), $(window).on("resize", function() {
    body_sizer()
}), $(document).ready(function() {
    pageTransitions(), $(".dropdown").on("show.bs.dropdown", function(a) {
        $(this).find(".dropdown-menu").first().stop(!0, !0).slideDown()
    }), $(".dropdown").on("hide.bs.dropdown", function(a) {
        $(this).find(".dropdown-menu").first().stop(!0, !0).slideUp()
    }), $(function() {
        $("#sidebar-menu").superclick({
            animation: {
                height: "show"
            },
            animationOut: {
                height: "hide"
            }
        });
        var a = window.location.pathname.split("/");
        a = a[a.length - 1], void 0 !== a && ($("#sidebar-menu").find("a[href$='" + a + "']").addClass("sfActive"), $("#sidebar-menu").find("a[href$='" + a + "']").parents().eq(3).superclick("show"))
    }), $(function() {
        $("#close-sidebar").click(function() {
            $("body").toggleClass("closed-sidebar"), $(".glyph-icon", this).toggleClass("icon-angle-right").toggleClass("icon-angle-left")
        })
    })
}), $(document).on("ready", function() {
    $("#theme-switcher-wrapper .switch-toggle").on("click", this, function() {
        var a = $(this).prev().attr("data-toggletarget");
        $("body").toggleClass(a), (a = "closed-sidebar") && $("#close-sidebar .glyph-icon").toggleClass("icon-angle-right").toggleClass("icon-angle-left");
    }), $('.switch-toggle[id="#boxed-layout"]').click(function() {
        $("#boxed-layout").attr("checked") ? $(".boxed-bg-wrapper").slideDown() : $(".boxed-bg-wrapper").slideUp()
    })
}), $(function() {
    $(".theme-switcher").click(function() {
        $("#theme-options").toggleClass("active")
    })
}), $(function() {
    $(".set-adminheader-style").click(function() {
        $(".set-adminheader-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("#page-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("#page-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $("#page-header").addClass(a)
    })
}), $(function() {
    $(".set-sidebar-style").click(function() {
        $(".set-sidebar-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("#page-sidebar").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("#page-sidebar").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $("#page-sidebar").addClass(a)
    })
}), $(function() {
    $(".set-background-style").click(function() {
        $(".set-background-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)pattern-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)full-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)fixed-\S+/g) || []).join(" ")
        }), $("body").addClass(a)
    })
}), $(function() {
    $(".set-header-style").click(function() {
        $(".set-header-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".main-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".main-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".main-header").addClass(a)
    })
}), $(function() {
    $(".set-footer-style").click(function() {
        $(".set-footer-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".main-footer").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".main-footer").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".main-footer").addClass(a)
    })
}), $(function() {
    $(".set-topmenu-style").click(function() {
        $(".set-topmenu-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".top-bar").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".top-bar").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".top-bar").addClass(a)
    })
}), $(function() {
    $(".scroll-switcher").slimscroll({
        height: "100%",
        color: "rgba(0,0,0,0.3)",
        size: "10px",
        alwaysVisible: !0
    })
}), $(document).on("ready", function() {
    swither_resizer()
}), $(window).on("resize", function() {
    swither_resizer()
});
