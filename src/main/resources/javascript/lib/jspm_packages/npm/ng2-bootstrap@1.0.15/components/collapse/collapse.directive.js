/* */ 
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
// fix: replace with // 'angular2/animate';
// when https://github.com/angular/angular/issues/5984 will be fixed
// TODO: remove ElementRef
// TODO: add on change
var CollapseDirective = (function () {
    function CollapseDirective(_ab, _el, _renderer) {
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        this.transitionDuration = 500; // Duration in ms
        this._ab = _ab;
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
        get: function () {
            return this.isExpanded;
        },
        set: function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    CollapseDirective.prototype.ngOnInit = function () {
        this.animation = this._ab.css();
        this.animation.setDuration(this.transitionDuration);
    };
    CollapseDirective.prototype.toggle = function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    CollapseDirective.prototype.hide = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(function () {
            // this.height = '0';
            // this.isCollapse = true;
            // this.isCollapsing = false;
            _this.animation
                .setFromStyles({
                height: _this._el.nativeElement.scrollHeight + 'px'
            })
                .setToStyles({
                height: '0',
                overflow: 'hidden'
            });
            _this.animation.start(_this._el.nativeElement)
                .onComplete(function () {
                if (_this._el.nativeElement.offsetHeight === 0) {
                    _this.display = 'none';
                }
                _this.isCollapse = true;
                _this.isCollapsing = false;
            });
        }, 4);
    };
    CollapseDirective.prototype.show = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.display = '';
        setTimeout(function () {
            // this.height = 'auto';
            // this.isCollapse = true;
            // this.isCollapsing = false;
            _this.animation
                .setFromStyles({
                height: _this._el.nativeElement.offsetHeight,
                overflow: 'hidden'
            })
                .setToStyles({
                height: _this._el.nativeElement.scrollHeight + 'px'
            });
            _this.animation.start(_this._el.nativeElement)
                .onComplete(function () {
                _this.isCollapse = true;
                _this.isCollapsing = false;
                _this._renderer.setElementStyle(_this._el.nativeElement, 'overflow', 'visible');
                _this._renderer.setElementStyle(_this._el.nativeElement, 'height', 'auto');
            });
        }, 4);
    };
    __decorate([
        core_1.HostBinding('style.display'), 
        __metadata('design:type', String)
    ], CollapseDirective.prototype, "display", void 0);
    __decorate([
        core_1.HostBinding('class.in'),
        core_1.HostBinding('attr.aria-expanded'), 
        __metadata('design:type', Boolean)
    ], CollapseDirective.prototype, "isExpanded", void 0);
    __decorate([
        core_1.HostBinding('attr.aria-hidden'), 
        __metadata('design:type', Boolean)
    ], CollapseDirective.prototype, "isCollapsed", void 0);
    __decorate([
        core_1.HostBinding('class.collapse'), 
        __metadata('design:type', Boolean)
    ], CollapseDirective.prototype, "isCollapse", void 0);
    __decorate([
        core_1.HostBinding('class.collapsing'), 
        __metadata('design:type', Boolean)
    ], CollapseDirective.prototype, "isCollapsing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CollapseDirective.prototype, "transitionDuration", void 0);
    __decorate([
        // Duration in ms
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], CollapseDirective.prototype, "collapse", null);
    CollapseDirective = __decorate([
        core_1.Directive({ selector: '[collapse]' }), 
        __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef, core_1.Renderer])
    ], CollapseDirective);
    return CollapseDirective;
}());
exports.CollapseDirective = CollapseDirective;
