/* */ 
"format cjs";
'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var di_2 = require('angular2/src/core/di');
var _ASSET_SCHEME = 'asset:';
/**
 * Create a {@link UrlResolver} with no package prefix.
 */
function createUrlResolverWithoutPackagePrefix() {
    return new UrlResolver();
}
exports.createUrlResolverWithoutPackagePrefix = createUrlResolverWithoutPackagePrefix;
function createOfflineCompileUrlResolver() {
    return new UrlResolver(_ASSET_SCHEME);
}
exports.createOfflineCompileUrlResolver = createOfflineCompileUrlResolver;
/**
 * A default provider for {@link PACKAGE_ROOT_URL} that maps to '/'.
 */
exports.DEFAULT_PACKAGE_URL_PROVIDER = new di_2.Provider(application_tokens_1.PACKAGE_ROOT_URL, { useValue: "/" });
/**
 * Used by the {@link Compiler} when resolving HTML and CSS template URLs.
 *
 * This class can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 *
 * ## Example
 *
 * {@example compiler/ts/url_resolver/url_resolver.ts region='url_resolver'}
 */
var UrlResolver = (function () {
    function UrlResolver(_packagePrefix) {
        if (_packagePrefix === void 0) { _packagePrefix = null; }
        this._packagePrefix = _packagePrefix;
    }
    /**
     * Resolves the `url` given the `baseUrl`:
     * - when the `url` is null, the `baseUrl` is returned,
     * - if `url` is relative ('path/to/here', './path/to/here'), the resolved url is a combination of
     * `baseUrl` and `url`,
     * - if `url` is absolute (it has a scheme: 'http://', 'https://' or start with '/'), the `url` is
     * returned as is (ignoring the `baseUrl`)
     *
     * @param {string} baseUrl
     * @param {string} url
     * @returns {string} the resolved URL
     */
    UrlResolver.prototype.resolve = function (baseUrl, url) {
        var resolvedUrl = url;
        if (lang_1.isPresent(baseUrl) && baseUrl.length > 0) {
            resolvedUrl = _resolveUrl(baseUrl, resolvedUrl);
        }
        var resolvedParts = _split(resolvedUrl);
        var prefix = this._packagePrefix;
        if (lang_1.isPresent(prefix) && lang_1.isPresent(resolvedParts) &&
            resolvedParts[_ComponentIndex.Scheme] == "package") {
            var path = resolvedParts[_ComponentIndex.Path];
            if (this._packagePrefix === _ASSET_SCHEME) {
                var pathSegements = path.split(/\//);
                resolvedUrl = "asset:" + pathSegements[0] + "/lib/" + pathSegements.slice(1).join('/');
            }
            else {
                prefix = lang_1.StringWrapper.stripRight(prefix, '/');
                path = lang_1.StringWrapper.stripLeft(path, '/');
                return prefix + "/" + path;
            }
        }
        return resolvedUrl;
    };
    UrlResolver = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Inject(application_tokens_1.PACKAGE_ROOT_URL)), 
        __metadata('design:paramtypes', [String])
    ], UrlResolver);
    return UrlResolver;
}());
exports.UrlResolver = UrlResolver;
/**
 * Extract the scheme of a URL.
 */
function getUrlScheme(url) {
    var match = _split(url);
    return (match && match[_ComponentIndex.Scheme]) || "";
}
exports.getUrlScheme = getUrlScheme;
// The code below is adapted from Traceur:
// https://github.com/google/traceur-compiler/blob/9511c1dafa972bf0de1202a8a863bad02f0f95a8/src/runtime/url.js
/**
 * Builds a URI string from already-encoded parts.
 *
 * No encoding is performed.  Any component may be omitted as either null or
 * undefined.
 *
 * @param {?string=} opt_scheme The scheme such as 'http'.
 * @param {?string=} opt_userInfo The user name before the '@'.
 * @param {?string=} opt_domain The domain such as 'www.google.com', already
 *     URI-encoded.
 * @param {(string|null)=} opt_port The port number.
 * @param {?string=} opt_path The path, already URI-encoded.  If it is not
 *     empty, it must begin with a slash.
 * @param {?string=} opt_queryData The URI-encoded query data.
 * @param {?string=} opt_fragment The URI-encoded fragment identifier.
 * @return {string} The fully combined URI.
 */
function _buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (lang_1.isPresent(opt_scheme)) {
        out.push(opt_scheme + ':');
    }
    if (lang_1.isPresent(opt_domain)) {
        out.push('//');
        if (lang_1.isPresent(opt_userInfo)) {
            out.push(opt_userInfo + '@');
        }
        out.push(opt_domain);
        if (lang_1.isPresent(opt_port)) {
            out.push(':' + opt_port);
        }
    }
    if (lang_1.isPresent(opt_path)) {
        out.push(opt_path);
    }
    if (lang_1.isPresent(opt_queryData)) {
        out.push('?' + opt_queryData);
    }
    if (lang_1.isPresent(opt_fragment)) {
        out.push('#' + opt_fragment);
    }
    return out.join('');
}
/**
 * A regular expression for breaking a URI into its component parts.
 *
 * {@link http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234} says
 * As the "first-match-wins" algorithm is identical to the "greedy"
 * disambiguation method used by POSIX regular expressions, it is natural and
 * commonplace to use a regular expression for parsing the potential five
 * components of a URI reference.
 *
 * The following line is the regular expression for breaking-down a
 * well-formed URI reference into its components.
 *
 * <pre>
 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
 *  12            3  4          5       6  7        8 9
 * </pre>
 *
 * The numbers in the second line above are only to assist readability; they
 * indicate the reference points for each subexpression (i.e., each paired
 * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
 * For example, matching the above expression to
 * <pre>
 *     http://www.ics.uci.edu/pub/ietf/uri/#Related
 * </pre>
 * results in the following subexpression matches:
 * <pre>
 *    $1 = http:
 *    $2 = http
 *    $3 = //www.ics.uci.edu
 *    $4 = www.ics.uci.edu
 *    $5 = /pub/ietf/uri/
 *    $6 = <undefined>
 *    $7 = <undefined>
 *    $8 = #Related
 *    $9 = Related
 * </pre>
 * where <undefined> indicates that the component is not present, as is the
 * case for the query component in the above example. Therefore, we can
 * determine the value of the five components as
 * <pre>
 *    scheme    = $2
 *    authority = $4
 *    path      = $5
 *    query     = $7
 *    fragment  = $9
 * </pre>
 *
 * The regular expression has been modified slightly to expose the
 * userInfo, domain, and port separately from the authority.
 * The modified version yields
 * <pre>
 *    $1 = http              scheme
 *    $2 = <undefined>       userInfo -\
 *    $3 = www.ics.uci.edu   domain     | authority
 *    $4 = <undefined>       port     -/
 *    $5 = /pub/ietf/uri/    path
 *    $6 = <undefined>       query without ?
 *    $7 = Related           fragment without #
 * </pre>
 * @type {!RegExp}
 * @internal
 */
var _splitRe = lang_1.RegExpWrapper.create('^' +
    '(?:' +
    '([^:/?#.]+)' +
    // used by other URL parts such as :,
    // ?, /, #, and .
    ':)?' +
    '(?://' +
    '(?:([^/?#]*)@)?' +
    '([\\w\\d\\-\\u0100-\\uffff.%]*)' +
    // digits, dashes, dots, percent
    // escapes, and unicode characters.
    '(?::([0-9]+))?' +
    ')?' +
    '([^?#]+)?' +
    '(?:\\?([^#]*))?' +
    '(?:#(.*))?' +
    '$');
/**
 * The index of each URI component in the return value of goog.uri.utils.split.
 * @enum {number}
 */
var _ComponentIndex;
(function (_ComponentIndex) {
    _ComponentIndex[_ComponentIndex["Scheme"] = 1] = "Scheme";
    _ComponentIndex[_ComponentIndex["UserInfo"] = 2] = "UserInfo";
    _ComponentIndex[_ComponentIndex["Domain"] = 3] = "Domain";
    _ComponentIndex[_ComponentIndex["Port"] = 4] = "Port";
    _ComponentIndex[_ComponentIndex["Path"] = 5] = "Path";
    _ComponentIndex[_ComponentIndex["QueryData"] = 6] = "QueryData";
    _ComponentIndex[_ComponentIndex["Fragment"] = 7] = "Fragment";
})(_ComponentIndex || (_ComponentIndex = {}));
/**
 * Splits a URI into its component parts.
 *
 * Each component can be accessed via the component indices; for example:
 * <pre>
 * goog.uri.utils.split(someStr)[goog.uri.utils.CompontentIndex.QUERY_DATA];
 * </pre>
 *
 * @param {string} uri The URI string to examine.
 * @return {!Array.<string|undefined>} Each component still URI-encoded.
 *     Each component that is present will contain the encoded value, whereas
 *     components that are not present will be undefined or empty, depending
 *     on the browser's regular expression implementation.  Never null, since
 *     arbitrary strings may still look like path names.
 */
function _split(uri) {
    return lang_1.RegExpWrapper.firstMatch(_splitRe, uri);
}
/**
  * Removes dot segments in given path component, as described in
  * RFC 3986, section 5.2.4.
  *
  * @param {string} path A non-empty path component.
  * @return {string} Path component with removed dot segments.
  */
function _removeDotSegments(path) {
    if (path == '/')
        return '/';
    var leadingSlash = path[0] == '/' ? '/' : '';
    var trailingSlash = path[path.length - 1] === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
        var segment = segments[pos];
        switch (segment) {
            case '':
            case '.':
                break;
            case '..':
                if (out.length > 0) {
                    out.pop();
                }
                else {
                    up++;
                }
                break;
            default:
                out.push(segment);
        }
    }
    if (leadingSlash == '') {
        while (up-- > 0) {
            out.unshift('..');
        }
        if (out.length === 0)
            out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
}
/**
 * Takes an array of the parts from split and canonicalizes the path part
 * and then joins all the parts.
 * @param {Array.<string?>} parts
 * @return {string}
 */
function _joinAndCanonicalizePath(parts) {
    var path = parts[_ComponentIndex.Path];
    path = lang_1.isBlank(path) ? '' : _removeDotSegments(path);
    parts[_ComponentIndex.Path] = path;
    return _buildFromEncodedParts(parts[_ComponentIndex.Scheme], parts[_ComponentIndex.UserInfo], parts[_ComponentIndex.Domain], parts[_ComponentIndex.Port], path, parts[_ComponentIndex.QueryData], parts[_ComponentIndex.Fragment]);
}
/**
 * Resolves a URL.
 * @param {string} base The URL acting as the base URL.
 * @param {string} to The URL to resolve.
 * @return {string}
 */
function _resolveUrl(base, url) {
    var parts = _split(encodeURI(url));
    var baseParts = _split(base);
    if (lang_1.isPresent(parts[_ComponentIndex.Scheme])) {
        return _joinAndCanonicalizePath(parts);
    }
    else {
        parts[_ComponentIndex.Scheme] = baseParts[_ComponentIndex.Scheme];
    }
    for (var i = _ComponentIndex.Scheme; i <= _ComponentIndex.Port; i++) {
        if (lang_1.isBlank(parts[i])) {
            parts[i] = baseParts[i];
        }
    }
    if (parts[_ComponentIndex.Path][0] == '/') {
        return _joinAndCanonicalizePath(parts);
    }
    var path = baseParts[_ComponentIndex.Path];
    if (lang_1.isBlank(path))
        path = '/';
    var index = path.lastIndexOf('/');
    path = path.substring(0, index + 1) + parts[_ComponentIndex.Path];
    parts[_ComponentIndex.Path] = path;
    return _joinAndCanonicalizePath(parts);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC00bm8zWlF2Ty50bXAvYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3VybF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFDeEQscUJBTU8sMEJBQTBCLENBQUMsQ0FBQTtBQUdsQyxtQ0FBK0Isc0NBQXNDLENBQUMsQ0FBQTtBQUN0RSxtQkFBdUIsc0JBQXNCLENBQUMsQ0FBQTtBQUU5QyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFFL0I7O0dBRUc7QUFDSDtJQUNFLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFGZSw2Q0FBcUMsd0NBRXBELENBQUE7QUFFRDtJQUNFLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRmUsdUNBQStCLGtDQUU5QyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxvQ0FBNEIsR0FBRyxJQUFJLGFBQVEsQ0FBQyxxQ0FBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO0FBRTFGOzs7Ozs7Ozs7O0dBVUc7QUFFSDtJQUNFLHFCQUE4QyxjQUE2QjtRQUFyQyw4QkFBcUMsR0FBckMscUJBQXFDO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQUcsQ0FBQztJQUUvRTs7Ozs7Ozs7Ozs7T0FXRztJQUNILDZCQUFPLEdBQVAsVUFBUSxPQUFlLEVBQUUsR0FBVztRQUNsQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsV0FBVyxHQUFHLFdB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RyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNuQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1xuICBTdHJpbmdXcmFwcGVyLFxuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIG5vcm1hbGl6ZUJsYW5rXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQQUNLQUdFX1JPT1RfVVJMfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9hcHBsaWNhdGlvbl90b2tlbnMnO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5jb25zdCBfQVNTRVRfU0NIRU1FID0gJ2Fzc2V0Oic7XG5cbi8qKlxuICogQ3JlYXRlIGEge0BsaW5rIFVybFJlc29sdmVyfSB3aXRoIG5vIHBhY2thZ2UgcHJlZml4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsUmVzb2x2ZXJXaXRob3V0UGFja2FnZVByZWZpeCgpOiBVcmxSZXNvbHZlciB7XG4gIHJldHVybiBuZXcgVXJsUmVzb2x2ZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9mZmxpbmVDb21waWxlVXJsUmVzb2x2ZXIoKTogVXJsUmVzb2x2ZXIge1xuICByZXR1cm4gbmV3IFVybFJlc29sdmVyKF9BU1NFVF9TQ0hFTUUpO1xufVxuXG4vKipcbiAqIEEgZGVmYXVsdCBwcm92aWRlciBmb3Ige0BsaW5rIFBBQ0tBR0VfUk9PVF9VUkx9IHRoYXQgbWFwcyB0byAnLycuXG4gKi9cbmV4cG9ydCB2YXIgREVGQVVMVF9QQUNLQUdFX1VSTF9QUk9WSURFUiA9IG5ldyBQcm92aWRlcihQQUNLQUdFX1JPT1RfVVJMLCB7dXNlVmFsdWU6IFwiL1wifSk7XG5cbi8qKlxuICogVXNlZCBieSB0aGUge0BsaW5rIENvbXBpbGVyfSB3aGVuIHJlc29sdmluZyBIVE1MIGFuZCBDU1MgdGVtcGxhdGUgVVJMcy5cbiAqXG4gKiBUaGlzIGNsYXNzIGNhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgdG8gY3JlYXRlIGN1c3RvbSBiZWhhdmlvci5cbiAqXG4gKiBTZWUge0BsaW5rIENvbXBpbGVyfVxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29tcGlsZXIvdHMvdXJsX3Jlc29sdmVyL3VybF9yZXNvbHZlci50cyByZWdpb249J3VybF9yZXNvbHZlcid9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVcmxSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUEFDS0FHRV9ST09UX1VSTCkgcHJpdmF0ZSBfcGFja2FnZVByZWZpeDogc3RyaW5nID0gbnVsbCkge31cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGB1cmxgIGdpdmVuIHRoZSBgYmFzZVVybGA6XG4gICAqIC0gd2hlbiB0aGUgYHVybGAgaXMgbnVsbCwgdGhlIGBiYXNlVXJsYCBpcyByZXR1cm5lZCxcbiAgICogLSBpZiBgdXJsYCBpcyByZWxhdGl2ZSAoJ3BhdGgvdG8vaGVyZScsICcuL3BhdGgvdG8vaGVyZScpLCB0aGUgcmVzb2x2ZWQgdXJsIGlzIGEgY29tYmluYXRpb24gb2ZcbiAgICogYGJhc2VVcmxgIGFuZCBgdXJsYCxcbiAgICogLSBpZiBgdXJsYCBpcyBhYnNvbHV0ZSAoaXQgaGFzIGEgc2NoZW1lOiAnaHR0cDovLycsICdodHRwczovLycgb3Igc3RhcnQgd2l0aCAnLycpLCB0aGUgYHVybGAgaXNcbiAgICogcmV0dXJuZWQgYXMgaXMgKGlnbm9yaW5nIHRoZSBgYmFzZVVybGApXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHJlc29sdmVkIFVSTFxuICAgKi9cbiAgcmVzb2x2ZShiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgcmVzb2x2ZWRVcmwgPSB1cmw7XG4gICAgaWYgKGlzUHJlc2VudChiYXNlVXJsKSAmJiBiYXNlVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlc29sdmVkVXJsID0gX3Jlc29sdmVVcmwoYmFzZVVybCwgcmVzb2x2ZWRVcmwpO1xuICAgIH1cbiAgICB2YXIgcmVzb2x2ZWRQYXJ0cyA9IF9zcGxpdChyZXNvbHZlZFVybCk7XG4gICAgdmFyIHByZWZpeCA9IHRoaXMuX3BhY2thZ2VQcmVmaXg7XG4gICAgaWYgKGlzUHJlc2VudChwcmVmaXgpICYmIGlzUHJlc2VudChyZXNvbHZlZFBhcnRzKSAmJlxuICAgICAgICByZXNvbHZlZFBhcnRzW19Db21wb25lbnRJbmRleC5TY2hlbWVdID09IFwicGFja2FnZVwiKSB7XG4gICAgICB2YXIgcGF0aCA9IHJlc29sdmVkUGFydHNbX0NvbXBvbmVudEluZGV4LlBhdGhdO1xuICAgICAgaWYgKHRoaXMuX3BhY2thZ2VQcmVmaXggPT09IF9BU1NFVF9TQ0hFTUUpIHtcbiAgICAgICAgdmFyIHBhdGhTZWdlbWVudHMgPSBwYXRoLnNwbGl0KC9cXC8vKTtcbiAgICAgICAgcmVzb2x2ZWRVcmwgPSBgYXNzZXQ6JHtwYXRoU2VnZW1lbnRzWzBdfS9saWIvJHtwYXRoU2VnZW1lbnRzLnNsaWNlKDEpLmpvaW4oJy8nKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlZml4ID0gU3RyaW5nV3JhcHBlci5zdHJpcFJpZ2h0KHByZWZpeCwgJy8nKTtcbiAgICAgICAgcGF0aCA9IFN0cmluZ1dyYXBwZXIuc3RyaXBMZWZ0KHBhdGgsICcvJyk7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9LyR7cGF0aH1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzb2x2ZWRVcmw7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSBzY2hlbWUgb2YgYSBVUkwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxTY2hlbWUodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICB2YXIgbWF0Y2ggPSBfc3BsaXQodXJsKTtcbiAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaFtfQ29tcG9uZW50SW5kZXguU2NoZW1lXSkgfHwgXCJcIjtcbn1cblxuLy8gVGhlIGNvZGUgYmVsb3cgaXMgYWRhcHRlZCBmcm9tIFRyYWNldXI6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3RyYWNldXItY29tcGlsZXIvYmxvYi85NTExYzFkYWZhOTcyYmYwZGUxMjAyYThhODYzYmFkMDJmMGY5NWE4L3NyYy9ydW50aW1lL3VybC5qc1xuXG4vKipcbiAqIEJ1aWxkcyBhIFVSSSBzdHJpbmcgZnJvbSBhbHJlYWR5LWVuY29kZWQgcGFydHMuXG4gKlxuICogTm8gZW5jb2RpbmcgaXMgcGVyZm9ybWVkLiAgQW55IGNvbXBvbmVudCBtYXkgYmUgb21pdHRlZCBhcyBlaXRoZXIgbnVsbCBvclxuICogdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7P3N0cmluZz19IG9wdF9zY2hlbWUgVGhlIHNjaGVtZSBzdWNoIGFzICdodHRwJy5cbiAqIEBwYXJhbSB7P3N0cmluZz19IG9wdF91c2VySW5mbyBUaGUgdXNlciBuYW1lIGJlZm9yZSB0aGUgJ0AnLlxuICogQHBhcmFtIHs/c3RyaW5nPX0gb3B0X2RvbWFpbiBUaGUgZG9tYWluIHN1Y2ggYXMgJ3d3dy5nb29nbGUuY29tJywgYWxyZWFkeVxuICogICAgIFVSSS1lbmNvZGVkLlxuICogQHBhcmFtIHsoc3RyaW5nfG51bGwpPX0gb3B0X3BvcnQgVGhlIHBvcnQgbnVtYmVyLlxuICogQHBhcmFtIHs/c3RyaW5nPX0gb3B0X3BhdGggVGhlIHBhdGgsIGFscmVhZHkgVVJJLWVuY29kZWQuICBJZiBpdCBpcyBub3RcbiAqICAgICBlbXB0eSwgaXQgbXVzdCBiZWdpbiB3aXRoIGEgc2xhc2guXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBvcHRfcXVlcnlEYXRhIFRoZSBVUkktZW5jb2RlZCBxdWVyeSBkYXRhLlxuICogQHBhcmFtIHs/c3RyaW5nPX0gb3B0X2ZyYWdtZW50IFRoZSBVUkktZW5jb2RlZCBmcmFnbWVudCBpZGVudGlmaWVyLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgZnVsbHkgY29tYmluZWQgVVJJLlxuICovXG5mdW5jdGlvbiBfYnVpbGRGcm9tRW5jb2RlZFBhcnRzKG9wdF9zY2hlbWU/OiBzdHJpbmcsIG9wdF91c2VySW5mbz86IHN0cmluZywgb3B0X2RvbWFpbj86IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0X3BvcnQ/OiBzdHJpbmcsIG9wdF9wYXRoPzogc3RyaW5nLCBvcHRfcXVlcnlEYXRhPzogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRfZnJhZ21lbnQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICB2YXIgb3V0ID0gW107XG5cbiAgaWYgKGlzUHJlc2VudChvcHRfc2NoZW1lKSkge1xuICAgIG91dC5wdXNoKG9wdF9zY2hlbWUgKyAnOicpO1xuICB9XG5cbiAgaWYgKGlzUHJlc2VudChvcHRfZG9tYWluKSkge1xuICAgIG91dC5wdXNoKCcvLycpO1xuXG4gICAgaWYgKGlzUHJlc2VudChvcHRfdXNlckluZm8pKSB7XG4gICAgICBvdXQucHVzaChvcHRfdXNlckluZm8gKyAnQCcpO1xuICAgIH1cblxuICAgIG91dC5wdXNoKG9wdF9kb21haW4pO1xuXG4gICAgaWYgKGlzUHJlc2VudChvcHRfcG9ydCkpIHtcbiAgICAgIG91dC5wdXNoKCc6JyArIG9wdF9wb3J0KTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNQcmVzZW50KG9wdF9wYXRoKSkge1xuICAgIG91dC5wdXNoKG9wdF9wYXRoKTtcbiAgfVxuXG4gIGlmIChpc1ByZXNlbnQob3B0X3F1ZXJ5RGF0YSkpIHtcbiAgICBvdXQucHVzaCgnPycgKyBvcHRfcXVlcnlEYXRhKTtcbiAgfVxuXG4gIGlmIChpc1ByZXNlbnQob3B0X2ZyYWdtZW50KSkge1xuICAgIG91dC5wdXNoKCcjJyArIG9wdF9mcmFnbWVudCk7XG4gIH1cblxuICByZXR1cm4gb3V0LmpvaW4oJycpO1xufVxuXG4vKipcbiAqIEEgcmVndWxhciBleHByZXNzaW9uIGZvciBicmVha2luZyBhIFVSSSBpbnRvIGl0cyBjb21wb25lbnQgcGFydHMuXG4gKlxuICoge0BsaW5rIGh0dHA6Ly93d3cuZ2Jpdi5jb20vcHJvdG9jb2xzL3VyaS9yZmMvcmZjMzk4Ni5odG1sI1JGQzIyMzR9IHNheXNcbiAqIEFzIHRoZSBcImZpcnN0LW1hdGNoLXdpbnNcIiBhbGdvcml0aG0gaXMgaWRlbnRpY2FsIHRvIHRoZSBcImdyZWVkeVwiXG4gKiBkaXNhbWJpZ3VhdGlvbiBtZXRob2QgdXNlZCBieSBQT1NJWCByZWd1bGFyIGV4cHJlc3Npb25zLCBpdCBpcyBuYXR1cmFsIGFuZFxuICogY29tbW9ucGxhY2UgdG8gdXNlIGEgcmVndWxhciBleHByZXNzaW9uIGZvciBwYXJzaW5nIHRoZSBwb3RlbnRpYWwgZml2ZVxuICogY29tcG9uZW50cyBvZiBhIFVSSSByZWZlcmVuY2UuXG4gKlxuICogVGhlIGZvbGxvd2luZyBsaW5lIGlzIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIGJyZWFraW5nLWRvd24gYVxuICogd2VsbC1mb3JtZWQgVVJJIHJlZmVyZW5jZSBpbnRvIGl0cyBjb21wb25lbnRzLlxuICpcbiAqIDxwcmU+XG4gKiBeKChbXjovPyNdKyk6KT8oLy8oW14vPyNdKikpPyhbXj8jXSopKFxcPyhbXiNdKikpPygjKC4qKSk/XG4gKiAgMTIgICAgICAgICAgICAzICA0ICAgICAgICAgIDUgICAgICAgNiAgNyAgICAgICAgOCA5XG4gKiA8L3ByZT5cbiAqXG4gKiBUaGUgbnVtYmVycyBpbiB0aGUgc2Vjb25kIGxpbmUgYWJvdmUgYXJlIG9ubHkgdG8gYXNzaXN0IHJlYWRhYmlsaXR5OyB0aGV5XG4gKiBpbmRpY2F0ZSB0aGUgcmVmZXJlbmNlIHBvaW50cyBmb3IgZWFjaCBzdWJleHByZXNzaW9uIChpLmUuLCBlYWNoIHBhaXJlZFxuICogcGFyZW50aGVzaXMpLiBXZSByZWZlciB0byB0aGUgdmFsdWUgbWF0Y2hlZCBmb3Igc3ViZXhwcmVzc2lvbiA8bj4gYXMgJDxuPi5cbiAqIEZvciBleGFtcGxlLCBtYXRjaGluZyB0aGUgYWJvdmUgZXhwcmVzc2lvbiB0b1xuICogPHByZT5cbiAqICAgICBodHRwOi8vd3d3Lmljcy51Y2kuZWR1L3B1Yi9pZXRmL3VyaS8jUmVsYXRlZFxuICogPC9wcmU+XG4gKiByZXN1bHRzIGluIHRoZSBmb2xsb3dpbmcgc3ViZXhwcmVzc2lvbiBtYXRjaGVzOlxuICogPHByZT5cbiAqICAgICQxID0gaHR0cDpcbiAqICAgICQyID0gaHR0cFxuICogICAgJDMgPSAvL3d3dy5pY3MudWNpLmVkdVxuICogICAgJDQgPSB3d3cuaWNzLnVjaS5lZHVcbiAqICAgICQ1ID0gL3B1Yi9pZXRmL3VyaS9cbiAqICAgICQ2ID0gPHVuZGVmaW5lZD5cbiAqICAgICQ3ID0gPHVuZGVmaW5lZD5cbiAqICAgICQ4ID0gI1JlbGF0ZWRcbiAqICAgICQ5ID0gUmVsYXRlZFxuICogPC9wcmU+XG4gKiB3aGVyZSA8dW5kZWZpbmVkPiBpbmRpY2F0ZXMgdGhhdCB0aGUgY29tcG9uZW50IGlzIG5vdCBwcmVzZW50LCBhcyBpcyB0aGVcbiAqIGNhc2UgZm9yIHRoZSBxdWVyeSBjb21wb25lbnQgaW4gdGhlIGFib3ZlIGV4YW1wbGUuIFRoZXJlZm9yZSwgd2UgY2FuXG4gKiBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIHRoZSBmaXZlIGNvbXBvbmVudHMgYXNcbiAqIDxwcmU+XG4gKiAgICBzY2hlbWUgICAgPSAkMlxuICogICAgYXV0aG9yaXR5ID0gJDRcbiAqICAgIHBhdGggICAgICA9ICQ1XG4gKiAgICBxdWVyeSAgICAgPSAkN1xuICogICAgZnJhZ21lbnQgID0gJDlcbiAqIDwvcHJlPlxuICpcbiAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gaGFzIGJlZW4gbW9kaWZpZWQgc2xpZ2h0bHkgdG8gZXhwb3NlIHRoZVxuICogdXNlckluZm8sIGRvbWFpbiwgYW5kIHBvcnQgc2VwYXJhdGVseSBmcm9tIHRoZSBhdXRob3JpdHkuXG4gKiBUaGUgbW9kaWZpZWQgdmVyc2lvbiB5aWVsZHNcbiAqIDxwcmU+XG4gKiAgICAkMSA9IGh0dHAgICAgICAgICAgICAgIHNjaGVtZVxuICogICAgJDIgPSA8dW5kZWZpbmVkPiAgICAgICB1c2VySW5mbyAtXFxcbiAqICAgICQzID0gd3d3Lmljcy51Y2kuZWR1ICAgZG9tYWluICAgICB8IGF1dGhvcml0eVxuICogICAgJDQgPSA8dW5kZWZpbmVkPiAgICAgICBwb3J0ICAgICAtL1xuICogICAgJDUgPSAvcHViL2lldGYvdXJpLyAgICBwYXRoXG4gKiAgICAkNiA9IDx1bmRlZmluZWQ+ICAgICAgIHF1ZXJ5IHdpdGhvdXQgP1xuICogICAgJDcgPSBSZWxhdGVkICAgICAgICAgICBmcmFnbWVudCB3aXRob3V0ICNcbiAqIDwvcHJlPlxuICogQHR5cGUgeyFSZWdFeHB9XG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIF9zcGxpdFJlID1cbiAgICBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnXicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnKFteOi8/Iy5dKyknICsgIC8vIHNjaGVtZSAtIGlnbm9yZSBzcGVjaWFsIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZWQgYnkgb3RoZXIgVVJMIHBhcnRzIHN1Y2ggYXMgOixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vID8sIC8sICMsIGFuZCAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgJzopPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoPzovLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoPzooW14vPyNdKilAKT8nICsgICAgICAgICAgICAgICAgICAvLyB1c2VySW5mb1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoW1xcXFx3XFxcXGRcXFxcLVxcXFx1MDEwMC1cXFxcdWZmZmYuJV0qKScgKyAgLy8gZG9tYWluIC0gcmVzdHJpY3QgdG8gbGV0dGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlnaXRzLCBkYXNoZXMsIGRvdHMsIHBlcmNlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlcywgYW5kIHVuaWNvZGUgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAnKD86OihbMC05XSspKT8nICsgICAgICAgICAgICAgICAgICAgLy8gcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgICcpPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICcoW14/I10rKT8nICsgICAgICAgIC8vIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXD8oW14jXSopKT8nICsgIC8vIHF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgJyg/OiMoLiopKT8nICsgICAgICAgLy8gZnJhZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAnJCcpO1xuXG4vKipcbiAqIFRoZSBpbmRleCBvZiBlYWNoIFVSSSBjb21wb25lbnQgaW4gdGhlIHJldHVybiB2YWx1ZSBvZiBnb29nLnVyaS51dGlscy5zcGxpdC5cbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbmVudW0gX0NvbXBvbmVudEluZGV4IHtcbiAgU2NoZW1lID0gMSxcbiAgVXNlckluZm8sXG4gIERvbWFpbixcbiAgUG9ydCxcbiAgUGF0aCxcbiAgUXVlcnlEYXRhLFxuICBGcmFnbWVudFxufVxuXG4vKipcbiAqIFNwbGl0cyBhIFVSSSBpbnRvIGl0cyBjb21wb25lbnQgcGFydHMuXG4gKlxuICogRWFjaCBjb21wb25lbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYSB0aGUgY29tcG9uZW50IGluZGljZXM7IGZvciBleGFtcGxlOlxuICogPHByZT5cbiAqIGdvb2cudXJpLnV0aWxzLnNwbGl0KHNvbWVTdHIpW2dvb2cudXJpLnV0aWxzLkNvbXBvbnRlbnRJbmRleC5RVUVSWV9EQVRBXTtcbiAqIDwvcHJlPlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgVGhlIFVSSSBzdHJpbmcgdG8gZXhhbWluZS5cbiAqIEByZXR1cm4geyFBcnJheS48c3RyaW5nfHVuZGVmaW5lZD59IEVhY2ggY29tcG9uZW50IHN0aWxsIFVSSS1lbmNvZGVkLlxuICogICAgIEVhY2ggY29tcG9uZW50IHRoYXQgaXMgcHJlc2VudCB3aWxsIGNvbnRhaW4gdGhlIGVuY29kZWQgdmFsdWUsIHdoZXJlYXNcbiAqICAgICBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCBwcmVzZW50IHdpbGwgYmUgdW5kZWZpbmVkIG9yIGVtcHR5LCBkZXBlbmRpbmdcbiAqICAgICBvbiB0aGUgYnJvd3NlcidzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpbXBsZW1lbnRhdGlvbi4gIE5ldmVyIG51bGwsIHNpbmNlXG4gKiAgICAgYXJiaXRyYXJ5IHN0cmluZ3MgbWF5IHN0aWxsIGxvb2sgbGlrZSBwYXRoIG5hbWVzLlxuICovXG5mdW5jdGlvbiBfc3BsaXQodXJpOiBzdHJpbmcpOiBBcnJheTxzdHJpbmcgfCBhbnk+IHtcbiAgcmV0dXJuIFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChfc3BsaXRSZSwgdXJpKTtcbn1cblxuLyoqXG4gICogUmVtb3ZlcyBkb3Qgc2VnbWVudHMgaW4gZ2l2ZW4gcGF0aCBjb21wb25lbnQsIGFzIGRlc2NyaWJlZCBpblxuICAqIFJGQyAzOTg2LCBzZWN0aW9uIDUuMi40LlxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHBhdGggQSBub24tZW1wdHkgcGF0aCBjb21wb25lbnQuXG4gICogQHJldHVybiB7c3RyaW5nfSBQYXRoIGNvbXBvbmVudCB3aXRoIHJlbW92ZWQgZG90IHNlZ21lbnRzLlxuICAqL1xuZnVuY3Rpb24gX3JlbW92ZURvdFNlZ21lbnRzKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChwYXRoID09ICcvJykgcmV0dXJuICcvJztcblxuICB2YXIgbGVhZGluZ1NsYXNoID0gcGF0aFswXSA9PSAnLycgPyAnLycgOiAnJztcbiAgdmFyIHRyYWlsaW5nU2xhc2ggPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09ICcvJyA/ICcvJyA6ICcnO1xuICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcvJyk7XG5cbiAgdmFyIG91dDogc3RyaW5nW10gPSBbXTtcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgc2VnbWVudHMubGVuZ3RoOyBwb3MrKykge1xuICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbcG9zXTtcbiAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcbiAgICAgIGNhc2UgJyc6XG4gICAgICBjYXNlICcuJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcuLic6XG4gICAgICAgIGlmIChvdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG91dC5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cCsrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3V0LnB1c2goc2VnbWVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlYWRpbmdTbGFzaCA9PSAnJykge1xuICAgIHdoaWxlICh1cC0tID4gMCkge1xuICAgICAgb3V0LnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuXG4gICAgaWYgKG91dC5sZW5ndGggPT09IDApIG91dC5wdXNoKCcuJyk7XG4gIH1cblxuICByZXR1cm4gbGVhZGluZ1NsYXNoICsgb3V0LmpvaW4oJy8nKSArIHRyYWlsaW5nU2xhc2g7XG59XG5cbi8qKlxuICogVGFrZXMgYW4gYXJyYXkgb2YgdGhlIHBhcnRzIGZyb20gc3BsaXQgYW5kIGNhbm9uaWNhbGl6ZXMgdGhlIHBhdGggcGFydFxuICogYW5kIHRoZW4gam9pbnMgYWxsIHRoZSBwYXJ0cy5cbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz8+fSBwYXJ0c1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBfam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHM6IGFueVtdKTogc3RyaW5nIHtcbiAgdmFyIHBhdGggPSBwYXJ0c1tfQ29tcG9uZW50SW5kZXguUGF0aF07XG4gIHBhdGggPSBpc0JsYW5rKHBhdGgpID8gJycgOiBfcmVtb3ZlRG90U2VnbWVudHMocGF0aCk7XG4gIHBhcnRzW19Db21wb25lbnRJbmRleC5QYXRoXSA9IHBhdGg7XG5cbiAgcmV0dXJuIF9idWlsZEZyb21FbmNvZGVkUGFydHMocGFydHNbX0NvbXBvbmVudEluZGV4LlNjaGVtZV0sIHBhcnRzW19Db21wb25lbnRJbmRleC5Vc2VySW5mb10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzW19Db21wb25lbnRJbmRleC5Eb21haW5dLCBwYXJ0c1tfQ29tcG9uZW50SW5kZXguUG9ydF0sIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzW19Db21wb25lbnRJbmRleC5RdWVyeURhdGFdLCBwYXJ0c1tfQ29tcG9uZW50SW5kZXguRnJhZ21lbnRdKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlcyBhIFVSTC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlIFRoZSBVUkwgYWN0aW5nIGFzIHRoZSBiYXNlIFVSTC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0byBUaGUgVVJMIHRvIHJlc29sdmUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIF9yZXNvbHZlVXJsKGJhc2U6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICB2YXIgcGFydHMgPSBfc3BsaXQoZW5jb2RlVVJJKHVybCkpO1xuICB2YXIgYmFzZVBhcnRzID0gX3NwbGl0KGJhc2UpO1xuXG4gIGlmIChpc1ByZXNlbnQocGFydHNbX0NvbXBvbmVudEluZGV4LlNjaGVtZV0pKSB7XG4gICAgcmV0dXJuIF9qb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHNbX0NvbXBvbmVudEluZGV4LlNjaGVtZV0gPSBiYXNlUGFydHNbX0NvbXBvbmVudEluZGV4LlNjaGVtZV07XG4gIH1cblxuICBmb3IgKHZhciBpID0gX0NvbXBvbmVudEluZGV4LlNjaGVtZTsgaSA8PSBfQ29tcG9uZW50SW5kZXguUG9ydDsgaSsrKSB7XG4gICAgaWYgKGlzQmxhbmsocGFydHNbaV0pKSB7XG4gICAgICBwYXJ0c1tpXSA9IGJhc2VQYXJ0c1tpXTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydHNbX0NvbXBvbmVudEluZGV4LlBhdGhdWzBdID09ICcvJykge1xuICAgIHJldHVybiBfam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG5cbiAgdmFyIHBhdGggPSBiYXNlUGFydHNbX0NvbXBvbmVudEluZGV4LlBhdGhdO1xuICBpZiAoaXNCbGFuayhwYXRoKSkgcGF0aCA9ICcvJztcbiAgdmFyIGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSArIHBhcnRzW19Db21wb25lbnRJbmRleC5QYXRoXTtcbiAgcGFydHNbX0NvbXBvbmVudEluZGV4LlBhdGhdID0gcGF0aDtcbiAgcmV0dXJuIF9qb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG59XG4iXX0=