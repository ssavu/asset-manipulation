/* */ 
"format cjs";
'use strict';"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * This is a set of DOM related classes and objects that can be used both in the browser and on the
 * server.
 */
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
exports.DOM = dom_adapter_1.DOM;
exports.setRootDomAdapter = dom_adapter_1.setRootDomAdapter;
exports.DomAdapter = dom_adapter_1.DomAdapter;
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
exports.DomRenderer = dom_renderer_1.DomRenderer;
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
exports.DOCUMENT = dom_tokens_1.DOCUMENT;
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
exports.SharedStylesHost = shared_styles_host_1.SharedStylesHost;
exports.DomSharedStylesHost = shared_styles_host_1.DomSharedStylesHost;
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
exports.DomEventsPlugin = dom_events_1.DomEventsPlugin;
var event_manager_1 = require('angular2/src/platform/dom/events/event_manager');
exports.EVENT_MANAGER_PLUGINS = event_manager_1.EVENT_MANAGER_PLUGINS;
exports.EventManager = event_manager_1.EventManager;
exports.EventManagerPlugin = event_manager_1.EventManagerPlugin;
__export(require('angular2/src/platform/dom/debug/by'));
__export(require('angular2/src/platform/dom/debug/ng_probe'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX2RvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNG5vM1pRdk8udG1wL2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7R0FHRztBQUNILDRCQUFpRCx1Q0FBdUMsQ0FBQztBQUFqRixnQ0FBRztBQUFFLDREQUFpQjtBQUFFLDhDQUF5RDtBQUN6Riw2QkFBMEIsd0NBQXdDLENBQUM7QUFBM0QsaURBQTJEO0FBQ25FLDJCQUF1QixzQ0FBc0MsQ0FBQztBQUF0RCx5Q0FBc0Q7QUFDOUQsbUNBQW9ELDhDQUE4QyxDQUFDO0FBQTNGLGlFQUFnQjtBQUFFLHVFQUF5RTtBQUNuRywyQkFBOEIsNkNBQTZDLENBQUM7QUFBcEUsdURBQW9FO0FBQzVFLDhCQUlPLGdEQUFnRCxDQUFDO0FBSHRELHNFQUFxQjtBQUNyQixvREFBWTtBQUNaLGdFQUNzRDtBQUN4RCxpQkFBYyxvQ0FBb0MsQ0FBQyxFQUFBO0FBQ25ELGlCQUFjLDBDQUEwQyxDQUFDLEVBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgaXMgYSBzZXQgb2YgRE9NIHJlbGF0ZWQgY2xhc3NlcyBhbmQgb2JqZWN0cyB0aGF0IGNhbiBiZSB1c2VkIGJvdGggaW4gdGhlIGJyb3dzZXIgYW5kIG9uIHRoZVxuICogc2VydmVyLlxuICovXG5leHBvcnQge0RPTSwgc2V0Um9vdERvbUFkYXB0ZXIsIERvbUFkYXB0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuZXhwb3J0IHtEb21SZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXInO1xuZXhwb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmV4cG9ydCB7U2hhcmVkU3R5bGVzSG9zdCwgRG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuZXhwb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuZXhwb3J0IHtcbiAgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICBFdmVudE1hbmFnZXIsXG4gIEV2ZW50TWFuYWdlclBsdWdpblxufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZGVidWcvYnknO1xuZXhwb3J0ICogZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9uZ19wcm9iZSc7XG4iXX0=