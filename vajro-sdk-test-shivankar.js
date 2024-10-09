var VajroSDK;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@datadog/browser-core/esm/boot/init.js":
/*!*************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/boot/init.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineGlobal": () => (/* binding */ defineGlobal),
/* harmony export */   "makePublicApi": () => (/* binding */ makePublicApi)
/* harmony export */ });
/* harmony import */ var _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/catchUserErrors */ "./node_modules/@datadog/browser-core/esm/tools/catchUserErrors.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");



function makePublicApi(stub) {
    var publicApi = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.assign)({
        version: "4.12.0",
        // This API method is intentionally not monitored, since the only thing executed is the
        // user-provided 'callback'.  All SDK usages executed in the callback should be monitored, and
        // we don't want to interfere with the user uncaught exceptions.
        onReady: function (callback) {
            callback();
        },
    }, stub);
    // Add a "hidden" property to set debug mode. We define it that way to hide it
    // as much as possible but of course it's not a real protection.
    Object.defineProperty(publicApi, '_setDebug', {
        get: function () {
            return _tools_monitor__WEBPACK_IMPORTED_MODULE_1__.setDebugMode;
        },
        enumerable: false,
    });
    return publicApi;
}
function defineGlobal(global, name, api) {
    var existingGlobalVariable = global[name];
    global[name] = api;
    if (existingGlobalVariable && existingGlobalVariable.q) {
        existingGlobalVariable.q.forEach(function (fn) { return (0,_tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_2__.catchUserErrors)(fn, 'onReady callback threw an error:')(); });
    }
}
//# sourceMappingURL=init.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/browser/cookie.js":
/*!******************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/browser/cookie.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COOKIE_ACCESS_DELAY": () => (/* binding */ COOKIE_ACCESS_DELAY),
/* harmony export */   "areCookiesAuthorized": () => (/* binding */ areCookiesAuthorized),
/* harmony export */   "deleteCookie": () => (/* binding */ deleteCookie),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "getCurrentSite": () => (/* binding */ getCurrentSite),
/* harmony export */   "setCookie": () => (/* binding */ setCookie)
/* harmony export */ });
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");


var COOKIE_ACCESS_DELAY = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_SECOND;
function setCookie(name, value, expireDelay, options) {
    var date = new Date();
    date.setTime(date.getTime() + expireDelay);
    var expires = "expires=".concat(date.toUTCString());
    var sameSite = options && options.crossSite ? 'none' : 'strict';
    var domain = options && options.domain ? ";domain=".concat(options.domain) : '';
    var secure = options && options.secure ? ';secure' : '';
    document.cookie = "".concat(name, "=").concat(value, ";").concat(expires, ";path=/;samesite=").concat(sameSite).concat(domain).concat(secure);
}
function getCookie(name) {
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.findCommaSeparatedValue)(document.cookie, name);
}
function deleteCookie(name, options) {
    setCookie(name, '', 0, options);
}
function areCookiesAuthorized(options) {
    if (document.cookie === undefined || document.cookie === null) {
        return false;
    }
    try {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_cookie_test_".concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.generateUUID)());
        var testCookieValue = 'test';
        setCookie(testCookieName, testCookieValue, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_SECOND, options);
        var isCookieCorrectlySet = getCookie(testCookieName) === testCookieValue;
        deleteCookie(testCookieName, options);
        return isCookieCorrectlySet;
    }
    catch (error) {
        _tools_display__WEBPACK_IMPORTED_MODULE_1__.display.error(error);
        return false;
    }
}
/**
 * No API to retrieve it, number of levels for subdomain and suffix are unknown
 * strategy: find the minimal domain on which cookies are allowed to be set
 * https://web.dev/same-site-same-origin/#site
 */
var getCurrentSiteCache;
function getCurrentSite() {
    if (getCurrentSiteCache === undefined) {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_site_test_".concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.generateUUID)());
        var testCookieValue = 'test';
        var domainLevels = window.location.hostname.split('.');
        var candidateDomain = domainLevels.pop();
        while (domainLevels.length && !getCookie(testCookieName)) {
            candidateDomain = "".concat(domainLevels.pop(), ".").concat(candidateDomain);
            setCookie(testCookieName, testCookieValue, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_SECOND, { domain: candidateDomain });
        }
        deleteCookie(testCookieName, { domain: candidateDomain });
        getCurrentSiteCache = candidateDomain;
    }
    return getCurrentSiteCache;
}
//# sourceMappingURL=cookie.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/browser/fetchObservable.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/browser/fetchObservable.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initFetchObservable": () => (/* binding */ initFetchObservable)
/* harmony export */ });
/* harmony import */ var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/instrumentMethod */ "./node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/urlPolyfill */ "./node_modules/@datadog/browser-core/esm/tools/urlPolyfill.js");





var fetchObservable;
function initFetchObservable() {
    if (!fetchObservable) {
        fetchObservable = createFetchObservable();
    }
    return fetchObservable;
}
function createFetchObservable() {
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function () {
        if (!window.fetch) {
            return;
        }
        var stop = (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.instrumentMethod)(window, 'fetch', function (originalFetch) {
            return function (input, init) {
                var responsePromise;
                var context = (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.callMonitored)(beforeSend, null, [observable, input, init]);
                if (context) {
                    responsePromise = originalFetch.call(this, context.input, context.init);
                    (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.callMonitored)(afterSend, null, [observable, responsePromise, context]);
                }
                else {
                    responsePromise = originalFetch.call(this, input, init);
                }
                return responsePromise;
            };
        }).stop;
        return stop;
    });
    return observable;
}
function beforeSend(observable, input, init) {
    var method = (init && init.method) || (typeof input === 'object' && input.method) || 'GET';
    var url = (0,_tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_3__.normalizeUrl)((typeof input === 'object' && input.url) || input);
    var startClocks = (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.clocksNow)();
    var context = {
        state: 'start',
        init: init,
        input: input,
        method: method,
        startClocks: startClocks,
        url: url,
    };
    observable.notify(context);
    return context;
}
function afterSend(observable, responsePromise, startContext) {
    var reportFetch = function (response) {
        var context = startContext;
        context.state = 'complete';
        context.duration = (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.elapsed)(context.startClocks.timeStamp, (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.timeStampNow)());
        if ('stack' in response || response instanceof Error) {
            context.status = 0;
            context.isAborted = response instanceof DOMException && response.code === DOMException.ABORT_ERR;
            context.error = response;
            observable.notify(context);
        }
        else if ('status' in response) {
            context.response = response;
            context.responseType = response.type;
            context.status = response.status;
            context.isAborted = false;
            observable.notify(context);
        }
    };
    responsePromise.then((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(reportFetch), (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(reportFetch));
}
//# sourceMappingURL=fetchObservable.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/browser/xhrObservable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/browser/xhrObservable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initXhrObservable": () => (/* binding */ initXhrObservable)
/* harmony export */ });
/* harmony import */ var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/instrumentMethod */ "./node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/urlPolyfill */ "./node_modules/@datadog/browser-core/esm/tools/urlPolyfill.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");






var xhrObservable;
var xhrContexts = new WeakMap();
function initXhrObservable() {
    if (!xhrObservable) {
        xhrObservable = createXhrObservable();
    }
    return xhrObservable;
}
function createXhrObservable() {
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function () {
        var stopInstrumentingStart = (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.instrumentMethodAndCallOriginal)(XMLHttpRequest.prototype, 'open', {
            before: openXhr,
        }).stop;
        var stopInstrumentingSend = (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.instrumentMethodAndCallOriginal)(XMLHttpRequest.prototype, 'send', {
            before: function () {
                sendXhr.call(this, observable);
            },
        }).stop;
        var stopInstrumentingAbort = (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.instrumentMethodAndCallOriginal)(XMLHttpRequest.prototype, 'abort', {
            before: abortXhr,
        }).stop;
        return function () {
            stopInstrumentingStart();
            stopInstrumentingSend();
            stopInstrumentingAbort();
        };
    });
    return observable;
}
function openXhr(method, url) {
    xhrContexts.set(this, {
        state: 'open',
        method: method,
        url: (0,_tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_2__.normalizeUrl)(url.toString()),
    });
}
function sendXhr(observable) {
    var _this = this;
    var context = xhrContexts.get(this);
    if (!context) {
        return;
    }
    var startContext = context;
    startContext.state = 'start';
    startContext.startTime = (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.relativeNow)();
    startContext.startClocks = (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.clocksNow)();
    startContext.isAborted = false;
    startContext.xhr = this;
    var hasBeenReported = false;
    var stopInstrumentingOnReadyStateChange = (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.instrumentMethodAndCallOriginal)(this, 'onreadystatechange', {
        before: function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                // Try to report the XHR as soon as possible, because the XHR may be mutated by the
                // application during a future event. For example, Angular is calling .abort() on
                // completed requests during a onreadystatechange event, so the status becomes '0'
                // before the request is collected.
                onEnd();
            }
        },
    }).stop;
    var onEnd = (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_4__.monitor)(function () {
        _this.removeEventListener('loadend', onEnd);
        stopInstrumentingOnReadyStateChange();
        if (hasBeenReported) {
            return;
        }
        hasBeenReported = true;
        var completeContext = context;
        completeContext.state = 'complete';
        completeContext.duration = (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.elapsed)(startContext.startClocks.timeStamp, (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.timeStampNow)());
        completeContext.status = _this.status;
        observable.notify((0,_tools_utils__WEBPACK_IMPORTED_MODULE_5__.shallowClone)(completeContext));
    });
    this.addEventListener('loadend', onEnd);
    observable.notify(startContext);
}
function abortXhr() {
    var context = xhrContexts.get(this);
    if (context) {
        context.isAborted = true;
    }
}
//# sourceMappingURL=xhrObservable.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/configuration.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/configuration.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultPrivacyLevel": () => (/* binding */ DefaultPrivacyLevel),
/* harmony export */   "buildCookieOptions": () => (/* binding */ buildCookieOptions),
/* harmony export */   "validateAndBuildConfiguration": () => (/* binding */ validateAndBuildConfiguration)
/* harmony export */ });
/* harmony import */ var _browser_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../browser/cookie */ "./node_modules/@datadog/browser-core/esm/browser/cookie.js");
/* harmony import */ var _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/catchUserErrors */ "./node_modules/@datadog/browser-core/esm/tools/catchUserErrors.js");
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _experimentalFeatures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./experimentalFeatures */ "./node_modules/@datadog/browser-core/esm/domain/configuration/experimentalFeatures.js");
/* harmony import */ var _transportConfiguration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transportConfiguration */ "./node_modules/@datadog/browser-core/esm/domain/configuration/transportConfiguration.js");






var DefaultPrivacyLevel = {
    ALLOW: 'allow',
    MASK: 'mask',
    MASK_USER_INPUT: 'mask-user-input',
};
function validateAndBuildConfiguration(initConfiguration) {
    var _a, _b;
    if (!initConfiguration || !initConfiguration.clientToken) {
        _tools_display__WEBPACK_IMPORTED_MODULE_0__.display.error('Client Token is not configured, we will not send any data.');
        return;
    }
    if (initConfiguration.sampleRate !== undefined && !(0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.isPercentage)(initConfiguration.sampleRate)) {
        _tools_display__WEBPACK_IMPORTED_MODULE_0__.display.error('Sample Rate should be a number between 0 and 100');
        return;
    }
    if (initConfiguration.telemetrySampleRate !== undefined && !(0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.isPercentage)(initConfiguration.telemetrySampleRate)) {
        _tools_display__WEBPACK_IMPORTED_MODULE_0__.display.error('Telemetry Sample Rate should be a number between 0 and 100');
        return;
    }
    // Set the experimental feature flags as early as possible, so we can use them in most places
    (0,_experimentalFeatures__WEBPACK_IMPORTED_MODULE_2__.updateExperimentalFeatures)(initConfiguration.enableExperimentalFeatures);
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.assign)({
        beforeSend: initConfiguration.beforeSend && (0,_tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_3__.catchUserErrors)(initConfiguration.beforeSend, 'beforeSend threw an error:'),
        cookieOptions: buildCookieOptions(initConfiguration),
        sampleRate: (_a = initConfiguration.sampleRate) !== null && _a !== void 0 ? _a : 100,
        telemetrySampleRate: (_b = initConfiguration.telemetrySampleRate) !== null && _b !== void 0 ? _b : 20,
        service: initConfiguration.service,
        silentMultipleInit: !!initConfiguration.silentMultipleInit,
        /**
         * beacon payload max queue size implementation is 64kb
         * ensure that we leave room for logs, rum and potential other users
         */
        batchBytesLimit: (0,_experimentalFeatures__WEBPACK_IMPORTED_MODULE_2__.isExperimentalFeatureEnabled)('lower-batch-size') ? 10 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE : 16 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
        eventRateLimiterThreshold: 3000,
        maxTelemetryEventsPerPage: 15,
        /**
         * flush automatically, aim to be lower than ALB connection timeout
         * to maximize connection reuse.
         */
        flushTimeout: 30 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.ONE_SECOND,
        /**
         * Logs intake limit
         */
        batchMessagesLimit: 50,
        messageBytesLimit: 256 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
    }, (0,_transportConfiguration__WEBPACK_IMPORTED_MODULE_4__.computeTransportConfiguration)(initConfiguration));
}
function buildCookieOptions(initConfiguration) {
    var cookieOptions = {};
    cookieOptions.secure = mustUseSecureCookie(initConfiguration);
    cookieOptions.crossSite = !!initConfiguration.useCrossSiteSessionCookie;
    if (initConfiguration.trackSessionAcrossSubdomains) {
        cookieOptions.domain = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_5__.getCurrentSite)();
    }
    return cookieOptions;
}
function mustUseSecureCookie(initConfiguration) {
    return !!initConfiguration.useSecureSessionCookie || !!initConfiguration.useCrossSiteSessionCookie;
}
//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/endpointBuilder.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/endpointBuilder.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ENDPOINTS": () => (/* binding */ ENDPOINTS),
/* harmony export */   "createEndpointBuilder": () => (/* binding */ createEndpointBuilder)
/* harmony export */ });
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/urlPolyfill */ "./node_modules/@datadog/browser-core/esm/tools/urlPolyfill.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _intakeSites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./intakeSites */ "./node_modules/@datadog/browser-core/esm/domain/configuration/intakeSites.js");




var ENDPOINTS = {
    logs: 'logs',
    rum: 'rum',
    sessionReplay: 'session-replay',
};
var INTAKE_TRACKS = {
    logs: 'logs',
    rum: 'rum',
    sessionReplay: 'replay',
};
function createEndpointBuilder(initConfiguration, endpointType, tags) {
    var _a = initConfiguration.site, site = _a === void 0 ? _intakeSites__WEBPACK_IMPORTED_MODULE_0__.INTAKE_SITE_US1 : _a, clientToken = initConfiguration.clientToken;
    var domainParts = site.split('.');
    var extension = domainParts.pop();
    var host = "".concat(ENDPOINTS[endpointType], ".browser-intake-").concat(domainParts.join('-'), ".").concat(extension);
    var baseUrl = "https://".concat(host, "/api/v2/").concat(INTAKE_TRACKS[endpointType]);
    var proxyUrl = initConfiguration.proxyUrl && (0,_tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_1__.normalizeUrl)(initConfiguration.proxyUrl);
    return {
        build: function () {
            var parameters = 'ddsource=browser' +
                "&ddtags=".concat(encodeURIComponent(["sdk_version:".concat("4.12.0")].concat(tags).join(','))) +
                "&dd-api-key=".concat(clientToken) +
                "&dd-evp-origin-version=".concat(encodeURIComponent("4.12.0")) +
                '&dd-evp-origin=browser' +
                "&dd-request-id=".concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.generateUUID)());
            if (endpointType === 'rum') {
                parameters += "&batch_time=".concat((0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.timeStampNow)());
            }
            var endpointUrl = "".concat(baseUrl, "?").concat(parameters);
            return proxyUrl ? "".concat(proxyUrl, "?ddforward=").concat(encodeURIComponent(endpointUrl)) : endpointUrl;
        },
        buildIntakeUrl: function () {
            return proxyUrl ? "".concat(proxyUrl, "?ddforward") : baseUrl;
        },
        endpointType: endpointType,
    };
}
//# sourceMappingURL=endpointBuilder.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/experimentalFeatures.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/experimentalFeatures.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isExperimentalFeatureEnabled": () => (/* binding */ isExperimentalFeatureEnabled),
/* harmony export */   "resetExperimentalFeatures": () => (/* binding */ resetExperimentalFeatures),
/* harmony export */   "updateExperimentalFeatures": () => (/* binding */ updateExperimentalFeatures)
/* harmony export */ });
/**
 * LIMITATION:
 * For NPM setup, this feature flag singleton is shared between RUM and Logs product.
 * This means that an experimental flag set on the RUM product will be set on the Logs product.
 * So keep in mind that in certain configurations, your experimental feature flag may affect other products.
 */
var enabledExperimentalFeatures;
function updateExperimentalFeatures(enabledFeatures) {
    // Safely handle external data
    if (!Array.isArray(enabledFeatures)) {
        return;
    }
    if (!enabledExperimentalFeatures) {
        enabledExperimentalFeatures = new Set(enabledFeatures);
    }
    enabledFeatures
        .filter(function (flag) { return typeof flag === 'string'; })
        .forEach(function (flag) {
        enabledExperimentalFeatures.add(flag);
    });
}
function isExperimentalFeatureEnabled(featureName) {
    return !!enabledExperimentalFeatures && enabledExperimentalFeatures.has(featureName);
}
function resetExperimentalFeatures() {
    enabledExperimentalFeatures = new Set();
}
//# sourceMappingURL=experimentalFeatures.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/intakeSites.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/intakeSites.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INTAKE_SITE_STAGING": () => (/* binding */ INTAKE_SITE_STAGING),
/* harmony export */   "INTAKE_SITE_US1": () => (/* binding */ INTAKE_SITE_US1),
/* harmony export */   "INTAKE_SITE_US1_FED": () => (/* binding */ INTAKE_SITE_US1_FED)
/* harmony export */ });
var INTAKE_SITE_STAGING = 'datad0g.com';
var INTAKE_SITE_US1 = 'datadoghq.com';
var INTAKE_SITE_US1_FED = 'ddog-gov.com';
//# sourceMappingURL=intakeSites.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/tags.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/tags.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TAG_SIZE_LIMIT": () => (/* binding */ TAG_SIZE_LIMIT),
/* harmony export */   "buildTag": () => (/* binding */ buildTag),
/* harmony export */   "buildTags": () => (/* binding */ buildTags)
/* harmony export */ });
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");

var TAG_SIZE_LIMIT = 200;
function buildTags(configuration) {
    var env = configuration.env, service = configuration.service, version = configuration.version, datacenter = configuration.datacenter;
    var tags = [];
    if (env) {
        tags.push(buildTag('env', env));
    }
    if (service) {
        tags.push(buildTag('service', service));
    }
    if (version) {
        tags.push(buildTag('version', version));
    }
    if (datacenter) {
        tags.push(buildTag('datacenter', datacenter));
    }
    return tags;
}
var FORBIDDEN_CHARACTERS = /[^a-z0-9_:./-]/;
function buildTag(key, rawValue) {
    // See https://docs.datadoghq.com/getting_started/tagging/#defining-tags for tags syntax. Note
    // that the backend may not follow the exact same rules, so we only want to display an informal
    // warning.
    var valueSizeLimit = TAG_SIZE_LIMIT - key.length - 1;
    if (rawValue.length > valueSizeLimit || FORBIDDEN_CHARACTERS.test(rawValue)) {
        _tools_display__WEBPACK_IMPORTED_MODULE_0__.display.warn("".concat(key, " value doesn't meet tag requirements and will be sanitized"));
    }
    // Let the backend do most of the sanitization, but still make sure multiple tags can't be crafted
    // by forging a value containing commas.
    var sanitizedValue = rawValue.replace(/,/g, '_');
    return "".concat(key, ":").concat(sanitizedValue);
}
//# sourceMappingURL=tags.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/configuration/transportConfiguration.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/configuration/transportConfiguration.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeTransportConfiguration": () => (/* binding */ computeTransportConfiguration)
/* harmony export */ });
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _endpointBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpointBuilder */ "./node_modules/@datadog/browser-core/esm/domain/configuration/endpointBuilder.js");
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tags */ "./node_modules/@datadog/browser-core/esm/domain/configuration/tags.js");
/* harmony import */ var _intakeSites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intakeSites */ "./node_modules/@datadog/browser-core/esm/domain/configuration/intakeSites.js");




function computeTransportConfiguration(initConfiguration) {
    var tags = (0,_tags__WEBPACK_IMPORTED_MODULE_0__.buildTags)(initConfiguration);
    var endpointBuilders = computeEndpointBuilders(initConfiguration, tags);
    var intakeEndpoints = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(endpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); });
    var replicaConfiguration = computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags);
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.assign)({
        isIntakeUrl: function (url) { return intakeEndpoints.some(function (intakeEndpoint) { return url.indexOf(intakeEndpoint) === 0; }); },
        replica: replicaConfiguration,
        site: initConfiguration.site || _intakeSites__WEBPACK_IMPORTED_MODULE_2__.INTAKE_SITE_US1,
    }, endpointBuilders);
}
function computeEndpointBuilders(initConfiguration, tags) {
    return {
        logsEndpointBuilder: (0,_endpointBuilder__WEBPACK_IMPORTED_MODULE_3__.createEndpointBuilder)(initConfiguration, 'logs', tags),
        rumEndpointBuilder: (0,_endpointBuilder__WEBPACK_IMPORTED_MODULE_3__.createEndpointBuilder)(initConfiguration, 'rum', tags),
        sessionReplayEndpointBuilder: (0,_endpointBuilder__WEBPACK_IMPORTED_MODULE_3__.createEndpointBuilder)(initConfiguration, 'sessionReplay', tags),
    };
}
function computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags) {
    if (!initConfiguration.replica) {
        return;
    }
    var replicaConfiguration = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.assign)({}, initConfiguration, {
        site: _intakeSites__WEBPACK_IMPORTED_MODULE_2__.INTAKE_SITE_US1,
        clientToken: initConfiguration.replica.clientToken,
    });
    var replicaEndpointBuilders = {
        logsEndpointBuilder: (0,_endpointBuilder__WEBPACK_IMPORTED_MODULE_3__.createEndpointBuilder)(replicaConfiguration, 'logs', tags),
        rumEndpointBuilder: (0,_endpointBuilder__WEBPACK_IMPORTED_MODULE_3__.createEndpointBuilder)(replicaConfiguration, 'rum', tags),
    };
    intakeEndpoints.push.apply(intakeEndpoints, (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.objectValues)(replicaEndpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); }));
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_1__.assign)({ applicationId: initConfiguration.replica.applicationId }, replicaEndpointBuilders);
}
//# sourceMappingURL=transportConfiguration.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/console/consoleObservable.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/console/consoleObservable.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initConsoleObservable": () => (/* binding */ initConsoleObservable)
/* harmony export */ });
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tracekit */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js");
/* harmony import */ var _tools_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/error */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");






var consoleObservablesByApi = {};
function initConsoleObservable(apis) {
    var consoleObservables = apis.map(function (api) {
        if (!consoleObservablesByApi[api]) {
            consoleObservablesByApi[api] = createConsoleObservable(api);
        }
        return consoleObservablesByApi[api];
    });
    return _tools_observable__WEBPACK_IMPORTED_MODULE_0__.mergeObservables.apply(void 0, consoleObservables);
}
/* eslint-disable no-console */
function createConsoleObservable(api) {
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function () {
        var originalConsoleApi = console[api];
        console[api] = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            originalConsoleApi.apply(console, params);
            var handlingStack = (0,_tools_error__WEBPACK_IMPORTED_MODULE_1__.createHandlingStack)();
            (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.callMonitored)(function () {
                observable.notify(buildConsoleLog(params, api, handlingStack));
            });
        };
        return function () {
            console[api] = originalConsoleApi;
        };
    });
    return observable;
}
function buildConsoleLog(params, api, handlingStack) {
    // Todo: remove console error prefix in the next major version
    var message = params.map(function (param) { return formatConsoleParameters(param); }).join(' ');
    var stack;
    if (api === _tools_display__WEBPACK_IMPORTED_MODULE_3__.ConsoleApiName.error) {
        var firstErrorParam = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_4__.find)(params, function (param) { return param instanceof Error; });
        stack = firstErrorParam ? (0,_tools_error__WEBPACK_IMPORTED_MODULE_1__.toStackTraceString)((0,_tracekit__WEBPACK_IMPORTED_MODULE_5__.computeStackTrace)(firstErrorParam)) : undefined;
        message = "console error: ".concat(message);
    }
    return {
        api: api,
        message: message,
        stack: stack,
        handlingStack: handlingStack,
    };
}
function formatConsoleParameters(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (param instanceof Error) {
        return (0,_tools_error__WEBPACK_IMPORTED_MODULE_1__.formatErrorMessage)((0,_tracekit__WEBPACK_IMPORTED_MODULE_5__.computeStackTrace)(param));
    }
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_4__.jsonStringify)(param, undefined, 2);
}
//# sourceMappingURL=consoleObservable.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/error/trackRuntimeError.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/error/trackRuntimeError.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackRuntimeError": () => (/* binding */ trackRuntimeError)
/* harmony export */ });
/* harmony import */ var _tools_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/error */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tracekit */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/tracekit.js");



function trackRuntimeError(errorObservable) {
    return (0,_tracekit__WEBPACK_IMPORTED_MODULE_0__.startUnhandledErrorCollection)(function (stackTrace, errorObject) {
        var _a = (0,_tools_error__WEBPACK_IMPORTED_MODULE_1__.formatUnknownError)(stackTrace, errorObject, 'Uncaught'), stack = _a.stack, message = _a.message, type = _a.type;
        errorObservable.notify({
            message: message,
            stack: stack,
            type: type,
            source: _tools_error__WEBPACK_IMPORTED_MODULE_1__.ErrorSource.SOURCE,
            startClocks: (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__.clocksNow)(),
            originalError: errorObject,
            handling: "unhandled" /* UNHANDLED */,
        });
    });
}
//# sourceMappingURL=trackRuntimeError.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/report/reportObservable.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/report/reportObservable.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RawReportType": () => (/* binding */ RawReportType),
/* harmony export */   "initReportObservable": () => (/* binding */ initReportObservable)
/* harmony export */ });
/* harmony import */ var _tools_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/error */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");




var RawReportType = {
    intervention: 'intervention',
    deprecation: 'deprecation',
    cspViolation: 'csp_violation',
};
function initReportObservable(apis) {
    var observables = [];
    if ((0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.includes)(apis, RawReportType.cspViolation)) {
        observables.push(createCspViolationReportObservable());
    }
    var reportTypes = apis.filter(function (api) { return api !== RawReportType.cspViolation; });
    if (reportTypes.length) {
        observables.push(createReportObservable(reportTypes));
    }
    return _tools_observable__WEBPACK_IMPORTED_MODULE_1__.mergeObservables.apply(void 0, observables);
}
function createReportObservable(reportTypes) {
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function () {
        if (!window.ReportingObserver) {
            return;
        }
        var handleReports = (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(function (reports) {
            return reports.forEach(function (report) {
                observable.notify(buildRawReportFromReport(report));
            });
        });
        var observer = new window.ReportingObserver(handleReports, {
            types: reportTypes,
            buffered: true,
        });
        observer.observe();
        return function () {
            observer.disconnect();
        };
    });
    return observable;
}
function createCspViolationReportObservable() {
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_1__.Observable(function () {
        var handleCspViolation = (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(function (event) {
            observable.notify(buildRawReportFromCspViolation(event));
        });
        var stop = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(document, "securitypolicyviolation" /* SECURITY_POLICY_VIOLATION */, handleCspViolation).stop;
        return stop;
    });
    return observable;
}
function buildRawReportFromReport(_a) {
    var type = _a.type, body = _a.body;
    return {
        type: type,
        subtype: body.id,
        message: "".concat(type, ": ").concat(body.message),
        stack: buildStack(body.id, body.message, body.sourceFile, body.lineNumber, body.columnNumber),
    };
}
function buildRawReportFromCspViolation(event) {
    var type = RawReportType.cspViolation;
    var message = "'".concat(event.blockedURI, "' blocked by '").concat(event.effectiveDirective, "' directive");
    return {
        type: RawReportType.cspViolation,
        subtype: event.effectiveDirective,
        message: "".concat(type, ": ").concat(message),
        stack: buildStack(event.effectiveDirective, "".concat(message, " of the policy \"").concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.safeTruncate)(event.originalPolicy, 100, '...'), "\""), event.sourceFile, event.lineNumber, event.columnNumber),
    };
}
function buildStack(name, message, sourceFile, lineNumber, columnNumber) {
    return (sourceFile &&
        (0,_tools_error__WEBPACK_IMPORTED_MODULE_3__.toStackTraceString)({
            name: name,
            message: message,
            stack: [
                {
                    func: '?',
                    url: sourceFile,
                    line: lineNumber,
                    column: columnNumber,
                },
            ],
        }));
}
//# sourceMappingURL=reportObservable.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/session/oldCookiesMigration.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/session/oldCookiesMigration.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOGS_SESSION_KEY": () => (/* binding */ LOGS_SESSION_KEY),
/* harmony export */   "OLD_LOGS_COOKIE_NAME": () => (/* binding */ OLD_LOGS_COOKIE_NAME),
/* harmony export */   "OLD_RUM_COOKIE_NAME": () => (/* binding */ OLD_RUM_COOKIE_NAME),
/* harmony export */   "OLD_SESSION_COOKIE_NAME": () => (/* binding */ OLD_SESSION_COOKIE_NAME),
/* harmony export */   "RUM_SESSION_KEY": () => (/* binding */ RUM_SESSION_KEY),
/* harmony export */   "tryOldCookiesMigration": () => (/* binding */ tryOldCookiesMigration)
/* harmony export */ });
/* harmony import */ var _browser_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../browser/cookie */ "./node_modules/@datadog/browser-core/esm/browser/cookie.js");
/* harmony import */ var _sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionCookieStore */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionCookieStore.js");


var OLD_SESSION_COOKIE_NAME = '_dd';
var OLD_RUM_COOKIE_NAME = '_dd_r';
var OLD_LOGS_COOKIE_NAME = '_dd_l';
// duplicate values to avoid dependency issues
var RUM_SESSION_KEY = 'rum';
var LOGS_SESSION_KEY = 'logs';
/**
 * This migration should remain in the codebase as long as older versions are available/live
 * to allow older sdk versions to be upgraded to newer versions without compatibility issues.
 */
function tryOldCookiesMigration(options) {
    var sessionString = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(_sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__.SESSION_COOKIE_NAME);
    var oldSessionId = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(OLD_SESSION_COOKIE_NAME);
    var oldRumType = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(OLD_RUM_COOKIE_NAME);
    var oldLogsType = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)(OLD_LOGS_COOKIE_NAME);
    if (!sessionString) {
        var session = {};
        if (oldSessionId) {
            session.id = oldSessionId;
        }
        if (oldLogsType && /^[01]$/.test(oldLogsType)) {
            session[LOGS_SESSION_KEY] = oldLogsType;
        }
        if (oldRumType && /^[012]$/.test(oldRumType)) {
            session[RUM_SESSION_KEY] = oldRumType;
        }
        (0,_sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__.persistSession)(session, options);
    }
}
//# sourceMappingURL=oldCookiesMigration.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SESSION_EXPIRATION_DELAY": () => (/* binding */ SESSION_EXPIRATION_DELAY),
/* harmony export */   "SESSION_TIME_OUT_DELAY": () => (/* binding */ SESSION_TIME_OUT_DELAY)
/* harmony export */ });
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");

var SESSION_TIME_OUT_DELAY = 4 * _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_HOUR;
var SESSION_EXPIRATION_DELAY = 15 * _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE;
//# sourceMappingURL=sessionConstants.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/session/sessionCookieStore.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/session/sessionCookieStore.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCK_RETRY_DELAY": () => (/* binding */ LOCK_RETRY_DELAY),
/* harmony export */   "MAX_NUMBER_OF_LOCK_RETRIES": () => (/* binding */ MAX_NUMBER_OF_LOCK_RETRIES),
/* harmony export */   "SESSION_COOKIE_NAME": () => (/* binding */ SESSION_COOKIE_NAME),
/* harmony export */   "persistSession": () => (/* binding */ persistSession),
/* harmony export */   "retrieveSession": () => (/* binding */ retrieveSession),
/* harmony export */   "toSessionString": () => (/* binding */ toSessionString),
/* harmony export */   "withCookieLockAccess": () => (/* binding */ withCookieLockAccess)
/* harmony export */ });
/* harmony import */ var _browser_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../browser/cookie */ "./node_modules/@datadog/browser-core/esm/browser/cookie.js");
/* harmony import */ var _tools_browserDetection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/browserDetection */ "./node_modules/@datadog/browser-core/esm/tools/browserDetection.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _sessionConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sessionConstants */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js");






var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
var SESSION_ENTRY_SEPARATOR = '&';
var SESSION_COOKIE_NAME = '_dd_s';
// arbitrary values
var LOCK_RETRY_DELAY = 10;
var MAX_NUMBER_OF_LOCK_RETRIES = 100;
var bufferedOperations = [];
var ongoingOperations;
function withCookieLockAccess(operations, numberOfRetries) {
    var _a;
    if (numberOfRetries === void 0) { numberOfRetries = 0; }
    if (!ongoingOperations) {
        ongoingOperations = operations;
    }
    if (operations !== ongoingOperations) {
        bufferedOperations.push(operations);
        return;
    }
    if (numberOfRetries >= MAX_NUMBER_OF_LOCK_RETRIES) {
        next();
        return;
    }
    var currentLock;
    var currentSession = retrieveSession();
    if (isCookieLockEnabled()) {
        // if someone has lock, retry later
        if (currentSession.lock) {
            retryLater(operations, numberOfRetries);
            return;
        }
        // acquire lock
        currentLock = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.generateUUID();
        currentSession.lock = currentLock;
        setSession(currentSession, operations.options);
        // if lock is not acquired, retry later
        currentSession = retrieveSession();
        if (currentSession.lock !== currentLock) {
            retryLater(operations, numberOfRetries);
            return;
        }
    }
    var processedSession = operations.process(currentSession);
    if (isCookieLockEnabled()) {
        // if lock corrupted after process, retry later
        currentSession = retrieveSession();
        if (currentSession.lock !== currentLock) {
            retryLater(operations, numberOfRetries);
            return;
        }
    }
    if (processedSession) {
        persistSession(processedSession, operations.options);
    }
    if (isCookieLockEnabled()) {
        // correctly handle lock around expiration would require to handle this case properly at several levels
        // since we don't have evidence of lock issues around expiration, let's just not do the corruption check for it
        if (!(processedSession && isExpiredState(processedSession))) {
            // if lock corrupted after persist, retry later
            currentSession = retrieveSession();
            if (currentSession.lock !== currentLock) {
                retryLater(operations, numberOfRetries);
                return;
            }
            delete currentSession.lock;
            setSession(currentSession, operations.options);
            processedSession = currentSession;
        }
    }
    // call after even if session is not persisted in order to perform operations on
    // up-to-date cookie value, the value could have been modified by another tab
    (_a = operations.after) === null || _a === void 0 ? void 0 : _a.call(operations, processedSession || currentSession);
    next();
}
/**
 * Cookie lock strategy allows mitigating issues due to concurrent access to cookie.
 * This issue concerns only chromium browsers and enabling this on firefox increase cookie write failures.
 */
function isCookieLockEnabled() {
    return (0,_tools_browserDetection__WEBPACK_IMPORTED_MODULE_1__.isChromium)();
}
function retryLater(operations, currentNumberOfRetries) {
    setTimeout((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(function () {
        withCookieLockAccess(operations, currentNumberOfRetries + 1);
    }), LOCK_RETRY_DELAY);
}
function next() {
    ongoingOperations = undefined;
    var nextOperations = bufferedOperations.shift();
    if (nextOperations) {
        withCookieLockAccess(nextOperations);
    }
}
function persistSession(session, options) {
    if (isExpiredState(session)) {
        clearSession(options);
        return;
    }
    session.expire = String((0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.dateNow)() + _sessionConstants__WEBPACK_IMPORTED_MODULE_4__.SESSION_EXPIRATION_DELAY);
    setSession(session, options);
}
function setSession(session, options) {
    (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_5__.setCookie)(SESSION_COOKIE_NAME, toSessionString(session), _sessionConstants__WEBPACK_IMPORTED_MODULE_4__.SESSION_EXPIRATION_DELAY, options);
}
function toSessionString(session) {
    return _tools_utils__WEBPACK_IMPORTED_MODULE_0__.objectEntries(session)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    })
        .join(SESSION_ENTRY_SEPARATOR);
}
function retrieveSession() {
    var sessionString = (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_5__.getCookie)(SESSION_COOKIE_NAME);
    var session = {};
    if (isValidSessionString(sessionString)) {
        sessionString.split(SESSION_ENTRY_SEPARATOR).forEach(function (entry) {
            var matches = SESSION_ENTRY_REGEXP.exec(entry);
            if (matches !== null) {
                var key = matches[1], value = matches[2];
                session[key] = value;
            }
        });
    }
    return session;
}
function isValidSessionString(sessionString) {
    return (sessionString !== undefined &&
        (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString)));
}
function isExpiredState(session) {
    return _tools_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject(session);
}
function clearSession(options) {
    (0,_browser_cookie__WEBPACK_IMPORTED_MODULE_5__.setCookie)(SESSION_COOKIE_NAME, '', 0, options);
}
//# sourceMappingURL=sessionCookieStore.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/session/sessionManager.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/session/sessionManager.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VISIBILITY_CHECK_DELAY": () => (/* binding */ VISIBILITY_CHECK_DELAY),
/* harmony export */   "startSessionManager": () => (/* binding */ startSessionManager),
/* harmony export */   "stopSessionManager": () => (/* binding */ stopSessionManager)
/* harmony export */ });
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _tools_contextHistory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tools/contextHistory */ "./node_modules/@datadog/browser-core/esm/tools/contextHistory.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _oldCookiesMigration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oldCookiesMigration */ "./node_modules/@datadog/browser-core/esm/domain/session/oldCookiesMigration.js");
/* harmony import */ var _sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sessionStore */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionStore.js");
/* harmony import */ var _sessionConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sessionConstants */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js");







var VISIBILITY_CHECK_DELAY = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE;
var SESSION_CONTEXT_TIMEOUT_DELAY = _sessionConstants__WEBPACK_IMPORTED_MODULE_1__.SESSION_TIME_OUT_DELAY;
var stopCallbacks = [];
function startSessionManager(options, productKey, computeSessionState) {
    (0,_oldCookiesMigration__WEBPACK_IMPORTED_MODULE_2__.tryOldCookiesMigration)(options);
    var sessionStore = (0,_sessionStore__WEBPACK_IMPORTED_MODULE_3__.startSessionStore)(options, productKey, computeSessionState);
    stopCallbacks.push(function () { return sessionStore.stop(); });
    var sessionContextHistory = new _tools_contextHistory__WEBPACK_IMPORTED_MODULE_4__.ContextHistory(SESSION_CONTEXT_TIMEOUT_DELAY);
    stopCallbacks.push(function () { return sessionContextHistory.stop(); });
    sessionStore.renewObservable.subscribe(function () {
        sessionContextHistory.add(buildSessionContext(), (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.relativeNow)());
    });
    sessionStore.expireObservable.subscribe(function () {
        sessionContextHistory.closeActive((0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.relativeNow)());
    });
    sessionStore.expandOrRenewSession();
    sessionContextHistory.add(buildSessionContext(), (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.clocksOrigin)().relative);
    trackActivity(function () { return sessionStore.expandOrRenewSession(); });
    trackVisibility(function () { return sessionStore.expandSession(); });
    function buildSessionContext() {
        return {
            id: sessionStore.getSession().id,
            trackingType: sessionStore.getSession()[productKey],
        };
    }
    return {
        findActiveSession: function (startTime) { return sessionContextHistory.find(startTime); },
        renewObservable: sessionStore.renewObservable,
        expireObservable: sessionStore.expireObservable,
    };
}
function stopSessionManager() {
    stopCallbacks.forEach(function (e) { return e(); });
    stopCallbacks = [];
}
function trackActivity(expandOrRenewSession) {
    var stop = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListeners(window, ["click" /* CLICK */, "touchstart" /* TOUCH_START */, "keydown" /* KEY_DOWN */, "scroll" /* SCROLL */], expandOrRenewSession, { capture: true, passive: true }).stop;
    stopCallbacks.push(stop);
}
function trackVisibility(expandSession) {
    var expandSessionWhenVisible = (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_6__.monitor)(function () {
        if (document.visibilityState === 'visible') {
            expandSession();
        }
    });
    var stop = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListener(document, "visibilitychange" /* VISIBILITY_CHANGE */, expandSessionWhenVisible).stop;
    stopCallbacks.push(stop);
    var visibilityCheckInterval = setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
    stopCallbacks.push(function () {
        clearInterval(visibilityCheckInterval);
    });
}
//# sourceMappingURL=sessionManager.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/session/sessionStore.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/session/sessionStore.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startSessionStore": () => (/* binding */ startSessionStore)
/* harmony export */ });
/* harmony import */ var _browser_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../browser/cookie */ "./node_modules/@datadog/browser-core/esm/browser/cookie.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _sessionConstants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sessionConstants */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js");
/* harmony import */ var _sessionCookieStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sessionCookieStore */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionCookieStore.js");







/**
 * Different session concepts:
 * - tracked, the session has an id and is updated along the user navigation
 * - not tracked, the session does not have an id but it is updated along the user navigation
 * - inactive, no session in store or session expired, waiting for a renew session
 */
function startSessionStore(options, productKey, computeSessionState) {
    var renewObservable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
    var expireObservable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
    var watchSessionTimeoutId = setInterval((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_1__.monitor)(watchSession), _browser_cookie__WEBPACK_IMPORTED_MODULE_2__.COOKIE_ACCESS_DELAY);
    var sessionCache = retrieveActiveSession();
    function expandOrRenewSession() {
        var isTracked;
        (0,_sessionCookieStore__WEBPACK_IMPORTED_MODULE_3__.withCookieLockAccess)({
            options: options,
            process: function (cookieSession) {
                var synchronizedSession = synchronizeSession(cookieSession);
                isTracked = expandOrRenewCookie(synchronizedSession);
                return synchronizedSession;
            },
            after: function (cookieSession) {
                if (isTracked && !hasSessionInCache()) {
                    renewSession(cookieSession);
                }
                sessionCache = cookieSession;
            },
        });
    }
    function expandSession() {
        (0,_sessionCookieStore__WEBPACK_IMPORTED_MODULE_3__.withCookieLockAccess)({
            options: options,
            process: function (cookieSession) { return (hasSessionInCache() ? synchronizeSession(cookieSession) : undefined); },
        });
    }
    /**
     * allows two behaviors:
     * - if the session is active, synchronize the session cache without updating the session cookie
     * - if the session is not active, clear the session cookie and expire the session cache
     */
    function watchSession() {
        (0,_sessionCookieStore__WEBPACK_IMPORTED_MODULE_3__.withCookieLockAccess)({
            options: options,
            process: function (cookieSession) { return (!isActiveSession(cookieSession) ? {} : undefined); },
            after: synchronizeSession,
        });
    }
    function synchronizeSession(cookieSession) {
        if (!isActiveSession(cookieSession)) {
            cookieSession = {};
        }
        if (hasSessionInCache()) {
            if (isSessionInCacheOutdated(cookieSession)) {
                expireSession();
            }
            else {
                sessionCache = cookieSession;
            }
        }
        return cookieSession;
    }
    function expandOrRenewCookie(cookieSession) {
        var _a = computeSessionState(cookieSession[productKey]), trackingType = _a.trackingType, isTracked = _a.isTracked;
        cookieSession[productKey] = trackingType;
        if (isTracked && !cookieSession.id) {
            cookieSession.id = _tools_utils__WEBPACK_IMPORTED_MODULE_4__.generateUUID();
            cookieSession.created = String((0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.dateNow)());
        }
        return isTracked;
    }
    function hasSessionInCache() {
        return sessionCache[productKey] !== undefined;
    }
    function isSessionInCacheOutdated(cookieSession) {
        return sessionCache.id !== cookieSession.id || sessionCache[productKey] !== cookieSession[productKey];
    }
    function expireSession() {
        sessionCache = {};
        expireObservable.notify();
    }
    function renewSession(cookieSession) {
        sessionCache = cookieSession;
        renewObservable.notify();
    }
    function retrieveActiveSession() {
        var session = (0,_sessionCookieStore__WEBPACK_IMPORTED_MODULE_3__.retrieveSession)();
        if (isActiveSession(session)) {
            return session;
        }
        return {};
    }
    function isActiveSession(session) {
        // created and expire can be undefined for versions which was not storing them
        // these checks could be removed when older versions will not be available/live anymore
        return ((session.created === undefined || (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.dateNow)() - Number(session.created) < _sessionConstants__WEBPACK_IMPORTED_MODULE_6__.SESSION_TIME_OUT_DELAY) &&
            (session.expire === undefined || (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_5__.dateNow)() < Number(session.expire)));
    }
    return {
        expandOrRenewSession: _tools_utils__WEBPACK_IMPORTED_MODULE_4__.throttle((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_1__.monitor)(expandOrRenewSession), _browser_cookie__WEBPACK_IMPORTED_MODULE_2__.COOKIE_ACCESS_DELAY).throttled,
        expandSession: expandSession,
        getSession: function () { return sessionCache; },
        renewObservable: renewObservable,
        expireObservable: expireObservable,
        stop: function () {
            clearInterval(watchSessionTimeoutId);
        },
    };
}
//# sourceMappingURL=sessionStore.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTelemetryDebug": () => (/* binding */ addTelemetryDebug),
/* harmony export */   "addTelemetryError": () => (/* binding */ addTelemetryError),
/* harmony export */   "formatError": () => (/* binding */ formatError),
/* harmony export */   "isTelemetryReplicationAllowed": () => (/* binding */ isTelemetryReplicationAllowed),
/* harmony export */   "resetTelemetry": () => (/* binding */ resetTelemetry),
/* harmony export */   "scrubCustomerFrames": () => (/* binding */ scrubCustomerFrames),
/* harmony export */   "startFakeTelemetry": () => (/* binding */ startFakeTelemetry),
/* harmony export */   "startTelemetry": () => (/* binding */ startTelemetry)
/* harmony export */ });
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _tools_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../tools/error */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configuration */ "./node_modules/@datadog/browser-core/esm/domain/configuration/intakeSites.js");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tracekit */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js");
/* harmony import */ var _tools_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools/observable */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tools/timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");








var ALLOWED_FRAME_URLS = [
    'https://www.datadoghq-browser-agent.com',
    'https://www.datad0g-browser-agent.com',
    'http://localhost',
    '<anonymous>',
];
var TELEMETRY_EXCLUDED_SITES = [_configuration__WEBPACK_IMPORTED_MODULE_0__.INTAKE_SITE_US1_FED];
var telemetryConfiguration = { maxEventsPerPage: 0, sentEventCount: 0, telemetryEnabled: false };
var onRawTelemetryEventCollected;
function startTelemetry(configuration) {
    var contextProvider;
    var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_1__.Observable();
    telemetryConfiguration.telemetryEnabled = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.performDraw)(configuration.telemetrySampleRate);
    onRawTelemetryEventCollected = function (event) {
        if (!(0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.includes)(TELEMETRY_EXCLUDED_SITES, configuration.site) && telemetryConfiguration.telemetryEnabled) {
            observable.notify(toTelemetryEvent(event));
        }
    };
    (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_3__.startMonitorErrorCollection)(addTelemetryError);
    (0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.assign)(telemetryConfiguration, {
        maxEventsPerPage: configuration.maxTelemetryEventsPerPage,
        sentEventCount: 0,
    });
    function toTelemetryEvent(event) {
        return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.combine)({
            type: 'telemetry',
            date: (0,_tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.timeStampNow)(),
            service: 'browser-sdk',
            version: "4.12.0",
            source: 'browser',
            _dd: {
                format_version: 2,
            },
            telemetry: event, // https://github.com/microsoft/TypeScript/issues/48457
        }, contextProvider !== undefined ? contextProvider() : {});
    }
    return {
        setContextProvider: function (provider) {
            contextProvider = provider;
        },
        observable: observable,
    };
}
function startFakeTelemetry() {
    var events = [];
    (0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.assign)(telemetryConfiguration, {
        maxEventsPerPage: Infinity,
        sentEventCount: 0,
    });
    onRawTelemetryEventCollected = function (event) {
        events.push(event);
    };
    return events;
}
function resetTelemetry() {
    onRawTelemetryEventCollected = undefined;
}
/**
 * Avoid mixing telemetry events from different data centers
 * but keep replicating staging events for reliability
 */
function isTelemetryReplicationAllowed(configuration) {
    return configuration.site === _configuration__WEBPACK_IMPORTED_MODULE_0__.INTAKE_SITE_STAGING;
}
function addTelemetryDebug(message, context) {
    (0,_tools_monitor__WEBPACK_IMPORTED_MODULE_3__.displayIfDebugEnabled)(_tools_display__WEBPACK_IMPORTED_MODULE_5__.ConsoleApiName.debug, message, context);
    addTelemetry((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.assign)({
        message: message,
        status: "debug" /* debug */,
    }, context));
}
function addTelemetryError(e) {
    addTelemetry((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.assign)({
        status: "error" /* error */,
    }, formatError(e)));
}
function addTelemetry(event) {
    if (onRawTelemetryEventCollected && telemetryConfiguration.sentEventCount < telemetryConfiguration.maxEventsPerPage) {
        telemetryConfiguration.sentEventCount += 1;
        onRawTelemetryEventCollected(event);
    }
}
function formatError(e) {
    if (e instanceof Error) {
        var stackTrace = (0,_tracekit__WEBPACK_IMPORTED_MODULE_6__.computeStackTrace)(e);
        return {
            error: {
                kind: stackTrace.name,
                stack: (0,_tools_error__WEBPACK_IMPORTED_MODULE_7__.toStackTraceString)(scrubCustomerFrames(stackTrace)),
            },
            message: stackTrace.message,
        };
    }
    return {
        error: {
            stack: 'Not an instance of error',
        },
        message: "Uncaught ".concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.jsonStringify)(e)),
    };
}
function scrubCustomerFrames(stackTrace) {
    stackTrace.stack = stackTrace.stack.filter(function (frame) { return !frame.url || ALLOWED_FRAME_URLS.some(function (allowedFrameUrl) { return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.startsWith)(frame.url, allowedFrameUrl); }); });
    return stackTrace;
}
//# sourceMappingURL=telemetry.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeStackTrace": () => (/* binding */ computeStackTrace)
/* harmony export */ });
var UNKNOWN_FUNCTION = '?';
/**
 * Computes a stack trace for an exception.
 */
function computeStackTrace(ex) {
    var stack = [];
    var stackProperty = tryToGetString(ex, 'stack');
    if (stackProperty) {
        stackProperty.split('\n').forEach(function (line) {
            var stackFrame = parseChromeLine(line) || parseWinLine(line) || parseGeckoLine(line);
            if (stackFrame) {
                if (!stackFrame.func && stackFrame.line) {
                    stackFrame.func = UNKNOWN_FUNCTION;
                }
                stack.push(stackFrame);
            }
        });
    }
    return {
        message: tryToGetString(ex, 'message'),
        name: tryToGetString(ex, 'name'),
        stack: stack,
    };
}
var CHROME_LINE_RE = 
// eslint-disable-next-line max-len
/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var CHROME_EVAL_RE = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function parseChromeLine(line) {
    var parts = CHROME_LINE_RE.exec(line);
    if (!parts) {
        return;
    }
    var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
    var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
    var submatch = CHROME_EVAL_RE.exec(parts[2]);
    if (isEval && submatch) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url
        parts[3] = submatch[2]; // line
        parts[4] = submatch[3]; // column
    }
    return {
        args: isNative ? [parts[2]] : [],
        column: parts[4] ? +parts[4] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: parts[3] ? +parts[3] : undefined,
        url: !isNative ? parts[2] : undefined,
    };
}
var WINJS_LINE_RE = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinLine(line) {
    var parts = WINJS_LINE_RE.exec(line);
    if (!parts) {
        return;
    }
    return {
        args: [],
        column: parts[4] ? +parts[4] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: +parts[3],
        url: parts[2],
    };
}
var GECKO_LINE_RE = 
// eslint-disable-next-line max-len
/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
var GECKO_EVAL_RE = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGeckoLine(line) {
    var parts = GECKO_LINE_RE.exec(line);
    if (!parts) {
        return;
    }
    var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
    var submatch = GECKO_EVAL_RE.exec(parts[3]);
    if (isEval && submatch) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = undefined; // no column when eval
    }
    return {
        args: parts[2] ? parts[2].split(',') : [],
        column: parts[5] ? +parts[5] : undefined,
        func: parts[1] || UNKNOWN_FUNCTION,
        line: parts[4] ? +parts[4] : undefined,
        url: parts[3],
    };
}
function tryToGetString(candidate, property) {
    if (typeof candidate !== 'object' || !candidate || !(property in candidate)) {
        return undefined;
    }
    var value = candidate[property];
    return typeof value === 'string' ? value : undefined;
}
//# sourceMappingURL=computeStackTrace.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/domain/tracekit/tracekit.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/domain/tracekit/tracekit.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startUnhandledErrorCollection": () => (/* binding */ startUnhandledErrorCollection)
/* harmony export */ });
/* harmony import */ var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/instrumentMethod */ "./node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js");
/* harmony import */ var _computeStackTrace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computeStackTrace */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js");


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
/**
 * Cross-browser collection of unhandled errors
 *
 * Supports:
 * - Firefox: full stack trace with line numbers, plus column number
 * on top frame; column number is not guaranteed
 * - Opera: full stack trace with line and column numbers
 * - Chrome: full stack trace with line and column numbers
 * - Safari: line and column number for the top frame only; some frames
 * may be missing, and column number is not guaranteed
 * - IE: line and column number for the top frame only; some frames
 * may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 * - IE5.5+ (only 8.0 tested)
 * - Firefox 0.9+ (only 3.5+ tested)
 * - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 * Exceptions Have Stacktrace to be enabled in opera:config)
 * - Safari 3+ (only 4+ tested)
 * - Chrome 1+ (only 5+ tested)
 * - Konqueror 3.5+ (untested)
 *
 * Tries to catch all unhandled errors and report them to the
 * callback.
 *
 * Callbacks receive a StackTrace object as described in the
 * computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */
function startUnhandledErrorCollection(callback) {
    var stopInstrumentingOnError = instrumentOnError(callback).stop;
    var stopInstrumentingOnUnhandledRejection = instrumentUnhandledRejection(callback).stop;
    return {
        stop: function () {
            stopInstrumentingOnError();
            stopInstrumentingOnUnhandledRejection();
        },
    };
}
/**
 * Install a global onerror handler
 */
function instrumentOnError(callback) {
    return (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__.instrumentMethodAndCallOriginal)(window, 'onerror', {
        before: function (message, url, lineNo, columnNo, errorObj) {
            var stack;
            if (errorObj) {
                stack = (0,_computeStackTrace__WEBPACK_IMPORTED_MODULE_1__.computeStackTrace)(errorObj);
                callback(stack, errorObj);
            }
            else {
                var location_1 = {
                    url: url,
                    column: columnNo,
                    line: lineNo,
                };
                var name_1;
                var msg = message;
                if ({}.toString.call(message) === '[object String]') {
                    var groups = ERROR_TYPES_RE.exec(msg);
                    if (groups) {
                        name_1 = groups[1];
                        msg = groups[2];
                    }
                }
                stack = {
                    name: name_1,
                    message: typeof msg === 'string' ? msg : undefined,
                    stack: [location_1],
                };
                callback(stack, message);
            }
        },
    });
}
/**
 * Install a global onunhandledrejection handler
 */
function instrumentUnhandledRejection(callback) {
    return (0,_tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__.instrumentMethodAndCallOriginal)(window, 'onunhandledrejection', {
        before: function (e) {
            var reason = e.reason || 'Empty reason';
            var stack = (0,_computeStackTrace__WEBPACK_IMPORTED_MODULE_1__.computeStackTrace)(reason);
            callback(stack, reason);
        },
    });
}
//# sourceMappingURL=tracekit.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/boundedBuffer.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/boundedBuffer.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundedBuffer": () => (/* binding */ BoundedBuffer)
/* harmony export */ });
var BUFFER_LIMIT = 500;
var BoundedBuffer = /** @class */ (function () {
    function BoundedBuffer() {
        this.buffer = [];
    }
    BoundedBuffer.prototype.add = function (callback) {
        var length = this.buffer.push(callback);
        if (length > BUFFER_LIMIT) {
            this.buffer.splice(0, 1);
        }
    };
    BoundedBuffer.prototype.drain = function () {
        this.buffer.forEach(function (callback) { return callback(); });
        this.buffer.length = 0;
    };
    return BoundedBuffer;
}());

//# sourceMappingURL=boundedBuffer.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/browserDetection.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/browserDetection.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isChromium": () => (/* binding */ isChromium),
/* harmony export */   "isIE": () => (/* binding */ isIE)
/* harmony export */ });
function isIE() {
    return Boolean(document.documentMode);
}
function isChromium() {
    return !!window.chrome || /HeadlessChrome/.test(window.navigator.userAgent);
}
//# sourceMappingURL=browserDetection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/catchUserErrors.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/catchUserErrors.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "catchUserErrors": () => (/* binding */ catchUserErrors)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");

function catchUserErrors(fn, errorMsg) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return fn.apply(void 0, args);
        }
        catch (err) {
            _display__WEBPACK_IMPORTED_MODULE_0__.display.error(errorMsg, err);
        }
    };
}
//# sourceMappingURL=catchUserErrors.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/contextHistory.js":
/*!************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/contextHistory.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLEAR_OLD_CONTEXTS_INTERVAL": () => (/* binding */ CLEAR_OLD_CONTEXTS_INTERVAL),
/* harmony export */   "ContextHistory": () => (/* binding */ ContextHistory)
/* harmony export */ });
/* harmony import */ var _timeUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");


var END_OF_TIMES = Infinity;
var CLEAR_OLD_CONTEXTS_INTERVAL = _utils__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE;
/**
 * Store and keep track of contexts spans. This whole class assumes that contexts are added in
 * chronological order (i.e. all entries have an increasing start time).
 */
var ContextHistory = /** @class */ (function () {
    function ContextHistory(expireDelay) {
        var _this = this;
        this.expireDelay = expireDelay;
        this.entries = [];
        this.clearOldContextsInterval = setInterval(function () { return _this.clearOldContexts(); }, CLEAR_OLD_CONTEXTS_INTERVAL);
    }
    /**
     * Add a context to the history associated with a start time. Returns a reference to this newly
     * added entry that can be removed or closed.
     */
    ContextHistory.prototype.add = function (context, startTime) {
        var _this = this;
        var entry = {
            context: context,
            startTime: startTime,
            endTime: END_OF_TIMES,
            remove: function () {
                var index = _this.entries.indexOf(entry);
                if (index >= 0) {
                    _this.entries.splice(index, 1);
                }
            },
            close: function (endTime) {
                entry.endTime = endTime;
            },
        };
        this.entries.unshift(entry);
        return entry;
    };
    /**
     * Return the latest context that was active during `startTime`, or the currently active context
     * if no `startTime` is provided. This method assumes that entries are not overlapping.
     */
    ContextHistory.prototype.find = function (startTime) {
        if (startTime === void 0) { startTime = END_OF_TIMES; }
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.startTime <= startTime) {
                if (startTime <= entry.endTime) {
                    return entry.context;
                }
                break;
            }
        }
    };
    /**
     * Helper function to close the currently active context, if any. This method assumes that entries
     * are not overlapping.
     */
    ContextHistory.prototype.closeActive = function (endTime) {
        var latestEntry = this.entries[0];
        if (latestEntry && latestEntry.endTime === END_OF_TIMES) {
            latestEntry.close(endTime);
        }
    };
    /**
     * Return all contexts that were active during `startTime`, or all currently active contexts if no
     * `startTime` is provided.
     */
    ContextHistory.prototype.findAll = function (startTime) {
        if (startTime === void 0) { startTime = END_OF_TIMES; }
        return this.entries
            .filter(function (entry) { return entry.startTime <= startTime && startTime <= entry.endTime; })
            .map(function (entry) { return entry.context; });
    };
    /**
     * Remove all entries from this collection.
     */
    ContextHistory.prototype.reset = function () {
        this.entries = [];
    };
    /**
     * Stop internal garbage collection of past entries.
     */
    ContextHistory.prototype.stop = function () {
        clearInterval(this.clearOldContextsInterval);
    };
    ContextHistory.prototype.clearOldContexts = function () {
        var oldTimeThreshold = (0,_timeUtils__WEBPACK_IMPORTED_MODULE_1__.relativeNow)() - this.expireDelay;
        while (this.entries.length > 0 && this.entries[this.entries.length - 1].endTime < oldTimeThreshold) {
            this.entries.pop();
        }
    };
    return ContextHistory;
}());

//# sourceMappingURL=contextHistory.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/contextManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/contextManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContextManager": () => (/* binding */ createContextManager)
/* harmony export */ });
function createContextManager() {
    var context = {};
    return {
        get: function () { return context; },
        add: function (key, value) {
            context[key] = value;
        },
        remove: function (key) {
            delete context[key];
        },
        set: function (newContext) {
            context = newContext;
        },
    };
}
//# sourceMappingURL=contextManager.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/createEventRateLimiter.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/createEventRateLimiter.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEventRateLimiter": () => (/* binding */ createEventRateLimiter)
/* harmony export */ });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _timeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeUtils */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");



function createEventRateLimiter(eventType, limit, onLimitReached) {
    var eventCount = 0;
    var allowNextEvent = false;
    return {
        isLimitReached: function () {
            if (eventCount === 0) {
                setTimeout(function () {
                    eventCount = 0;
                }, _utils__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE);
            }
            eventCount += 1;
            if (eventCount <= limit || allowNextEvent) {
                allowNextEvent = false;
                return false;
            }
            if (eventCount === limit + 1) {
                allowNextEvent = true;
                try {
                    onLimitReached({
                        message: "Reached max number of ".concat(eventType, "s by minute: ").concat(limit),
                        source: _error__WEBPACK_IMPORTED_MODULE_1__.ErrorSource.AGENT,
                        startClocks: (0,_timeUtils__WEBPACK_IMPORTED_MODULE_2__.clocksNow)(),
                    });
                }
                finally {
                    allowNextEvent = false;
                }
            }
            return true;
        },
    };
}
//# sourceMappingURL=createEventRateLimiter.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/display.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/display.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleApiName": () => (/* binding */ ConsoleApiName),
/* harmony export */   "display": () => (/* binding */ display)
/* harmony export */ });
/* eslint-disable no-console, local-rules/disallow-side-effects */
/**
 * Keep references on console methods to avoid triggering patched behaviors
 *
 * NB: in some setup, console could already be patched by another SDK.
 * In this case, some display messages can be sent by the other SDK
 * but we should be safe from infinite loop nonetheless.
 */
var ConsoleApiName = {
    log: 'log',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
};
var display = function (api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!Object.prototype.hasOwnProperty.call(ConsoleApiName, api)) {
        api = ConsoleApiName.log;
    }
    display[api].apply(display, args);
};
display.debug = console.debug.bind(console);
display.log = console.log.bind(console);
display.info = console.info.bind(console);
display.warn = console.warn.bind(console);
display.error = console.error.bind(console);
//# sourceMappingURL=display.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/error.js":
/*!***************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/error.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorSource": () => (/* binding */ ErrorSource),
/* harmony export */   "createHandlingStack": () => (/* binding */ createHandlingStack),
/* harmony export */   "formatErrorMessage": () => (/* binding */ formatErrorMessage),
/* harmony export */   "formatUnknownError": () => (/* binding */ formatUnknownError),
/* harmony export */   "getFileFromStackTraceString": () => (/* binding */ getFileFromStackTraceString),
/* harmony export */   "toStackTraceString": () => (/* binding */ toStackTraceString)
/* harmony export */ });
/* harmony import */ var _domain_tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/tracekit */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js");
/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");



var ErrorSource = {
    AGENT: 'agent',
    CONSOLE: 'console',
    CUSTOM: 'custom',
    LOGGER: 'logger',
    NETWORK: 'network',
    SOURCE: 'source',
    REPORT: 'report',
};
function formatUnknownError(stackTrace, errorObject, nonErrorPrefix, handlingStack) {
    if (!stackTrace || (stackTrace.message === undefined && !(errorObject instanceof Error))) {
        return {
            message: "".concat(nonErrorPrefix, " ").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.jsonStringify)(errorObject)),
            stack: 'No stack, consider using an instance of Error',
            handlingStack: handlingStack,
            type: stackTrace && stackTrace.name,
        };
    }
    return {
        message: stackTrace.message || 'Empty message',
        stack: toStackTraceString(stackTrace),
        handlingStack: handlingStack,
        type: stackTrace.name,
    };
}
function toStackTraceString(stack) {
    var result = formatErrorMessage(stack);
    stack.stack.forEach(function (frame) {
        var func = frame.func === '?' ? '<anonymous>' : frame.func;
        var args = frame.args && frame.args.length > 0 ? "(".concat(frame.args.join(', '), ")") : '';
        var line = frame.line ? ":".concat(frame.line) : '';
        var column = frame.line && frame.column ? ":".concat(frame.column) : '';
        result += "\n  at ".concat(func).concat(args, " @ ").concat(frame.url).concat(line).concat(column);
    });
    return result;
}
function getFileFromStackTraceString(stack) {
    var _a;
    return (_a = /@ (.+)/.exec(stack)) === null || _a === void 0 ? void 0 : _a[1];
}
function formatErrorMessage(stack) {
    return "".concat(stack.name || 'Error', ": ").concat(stack.message);
}
/**
 Creates a stacktrace without SDK internal frames.
 
 Constraints:
 - Has to be called at the utmost position of the call stack.
 - No monitored function should encapsulate it, that is why we need to use callMonitored inside it.
 */
function createHandlingStack() {
    /**
     * Skip the two internal frames:
     * - SDK API (console.error, ...)
     * - this function
     * in order to keep only the user calls
     */
    var internalFramesToSkip = 2;
    var error = new Error();
    var formattedStack;
    // IE needs to throw the error to fill in the stack trace
    if (!error.stack) {
        try {
            throw error;
        }
        catch (e) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.noop)();
        }
    }
    (0,_monitor__WEBPACK_IMPORTED_MODULE_1__.callMonitored)(function () {
        var stackTrace = (0,_domain_tracekit__WEBPACK_IMPORTED_MODULE_2__.computeStackTrace)(error);
        stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
        formattedStack = toStackTraceString(stackTrace);
    });
    return formattedStack;
}
//# sourceMappingURL=error.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "instrumentMethod": () => (/* binding */ instrumentMethod),
/* harmony export */   "instrumentMethodAndCallOriginal": () => (/* binding */ instrumentMethodAndCallOriginal),
/* harmony export */   "instrumentSetter": () => (/* binding */ instrumentSetter)
/* harmony export */ });
/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");


function instrumentMethod(object, method, instrumentationFactory) {
    var original = object[method];
    var instrumentation = instrumentationFactory(original);
    var instrumentationWrapper = function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return instrumentation.apply(this, arguments);
    };
    object[method] = instrumentationWrapper;
    return {
        stop: function () {
            if (object[method] === instrumentationWrapper) {
                object[method] = original;
            }
            else {
                instrumentation = original;
            }
        },
    };
}
function instrumentMethodAndCallOriginal(object, method, _a) {
    var before = _a.before, after = _a.after;
    return instrumentMethod(object, method, function (original) {
        return function () {
            var args = arguments;
            var result;
            if (before) {
                (0,_monitor__WEBPACK_IMPORTED_MODULE_0__.callMonitored)(before, this, args);
            }
            if (typeof original === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                result = original.apply(this, args);
            }
            if (after) {
                (0,_monitor__WEBPACK_IMPORTED_MODULE_0__.callMonitored)(after, this, args);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        };
    });
}
function instrumentSetter(object, property, after) {
    var originalDescriptor = Object.getOwnPropertyDescriptor(object, property);
    if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) {
        return { stop: _utils__WEBPACK_IMPORTED_MODULE_1__.noop };
    }
    var instrumentation = function (thisObject, value) {
        // put hooked setter into event loop to avoid of set latency
        setTimeout((0,_monitor__WEBPACK_IMPORTED_MODULE_0__.monitor)(function () {
            after(thisObject, value);
        }), 0);
    };
    var instrumentationWrapper = function (value) {
        originalDescriptor.set.call(this, value);
        instrumentation(this, value);
    };
    Object.defineProperty(object, property, {
        set: instrumentationWrapper,
    });
    return {
        stop: function () {
            var _a;
            if (((_a = Object.getOwnPropertyDescriptor(object, property)) === null || _a === void 0 ? void 0 : _a.set) === instrumentationWrapper) {
                Object.defineProperty(object, property, originalDescriptor);
            }
            else {
                instrumentation = _utils__WEBPACK_IMPORTED_MODULE_1__.noop;
            }
        },
    };
}
//# sourceMappingURL=instrumentMethod.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/monitor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/monitor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callMonitored": () => (/* binding */ callMonitored),
/* harmony export */   "displayIfDebugEnabled": () => (/* binding */ displayIfDebugEnabled),
/* harmony export */   "monitor": () => (/* binding */ monitor),
/* harmony export */   "monitored": () => (/* binding */ monitored),
/* harmony export */   "resetMonitor": () => (/* binding */ resetMonitor),
/* harmony export */   "setDebugMode": () => (/* binding */ setDebugMode),
/* harmony export */   "startMonitorErrorCollection": () => (/* binding */ startMonitorErrorCollection)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var onMonitorErrorCollected;
var debugMode = false;
function startMonitorErrorCollection(newOnMonitorErrorCollected) {
    onMonitorErrorCollected = newOnMonitorErrorCollected;
}
function setDebugMode(newDebugMode) {
    debugMode = newDebugMode;
}
function resetMonitor() {
    onMonitorErrorCollected = undefined;
    debugMode = false;
}
function monitored(_, __, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decorated = onMonitorErrorCollected ? monitor(originalMethod) : originalMethod;
        return decorated.apply(this, args);
    };
}
function monitor(fn) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return callMonitored(fn, this, arguments);
    }; // consider output type has input type
}
function callMonitored(fn, context, args) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return fn.apply(context, args);
    }
    catch (e) {
        displayIfDebugEnabled(_display__WEBPACK_IMPORTED_MODULE_0__.ConsoleApiName.error, e);
        if (onMonitorErrorCollected) {
            try {
                onMonitorErrorCollected(e);
            }
            catch (e) {
                displayIfDebugEnabled(_display__WEBPACK_IMPORTED_MODULE_0__.ConsoleApiName.error, e);
            }
        }
    }
}
function displayIfDebugEnabled(api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugMode) {
        _display__WEBPACK_IMPORTED_MODULE_0__.display.apply(void 0, __spreadArray([api, '[MONITOR]'], args, false));
    }
}
//# sourceMappingURL=monitor.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/observable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/observable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable),
/* harmony export */   "mergeObservables": () => (/* binding */ mergeObservables)
/* harmony export */ });
var Observable = /** @class */ (function () {
    function Observable(onFirstSubscribe) {
        this.onFirstSubscribe = onFirstSubscribe;
        this.observers = [];
    }
    Observable.prototype.subscribe = function (f) {
        var _this = this;
        if (!this.observers.length && this.onFirstSubscribe) {
            this.onLastUnsubscribe = this.onFirstSubscribe() || undefined;
        }
        this.observers.push(f);
        return {
            unsubscribe: function () {
                _this.observers = _this.observers.filter(function (other) { return f !== other; });
                if (!_this.observers.length && _this.onLastUnsubscribe) {
                    _this.onLastUnsubscribe();
                }
            },
        };
    };
    Observable.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return Observable;
}());

function mergeObservables() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var globalObservable = new Observable(function () {
        var subscriptions = observables.map(function (observable) {
            return observable.subscribe(function (data) { return globalObservable.notify(data); });
        });
        return function () { return subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); }); };
    });
    return globalObservable;
}
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/timeUtils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clocksNow": () => (/* binding */ clocksNow),
/* harmony export */   "clocksOrigin": () => (/* binding */ clocksOrigin),
/* harmony export */   "currentDrift": () => (/* binding */ currentDrift),
/* harmony export */   "dateNow": () => (/* binding */ dateNow),
/* harmony export */   "elapsed": () => (/* binding */ elapsed),
/* harmony export */   "getRelativeTime": () => (/* binding */ getRelativeTime),
/* harmony export */   "getTimeStamp": () => (/* binding */ getTimeStamp),
/* harmony export */   "looksLikeRelativeTime": () => (/* binding */ looksLikeRelativeTime),
/* harmony export */   "relativeNow": () => (/* binding */ relativeNow),
/* harmony export */   "relativeToClocks": () => (/* binding */ relativeToClocks),
/* harmony export */   "resetNavigationStart": () => (/* binding */ resetNavigationStart),
/* harmony export */   "timeStampNow": () => (/* binding */ timeStampNow),
/* harmony export */   "toServerDuration": () => (/* binding */ toServerDuration)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");

function relativeToClocks(relative) {
    return { relative: relative, timeStamp: getCorrectedTimeStamp(relative) };
}
function getCorrectedTimeStamp(relativeTime) {
    var correctedOrigin = dateNow() - performance.now();
    // apply correction only for positive drift
    if (correctedOrigin > getNavigationStart()) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return Math.round(correctedOrigin + relativeTime);
    }
    return getTimeStamp(relativeTime);
}
function currentDrift() {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return Math.round(dateNow() - (getNavigationStart() + performance.now()));
}
function toServerDuration(duration) {
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
        return duration;
    }
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.round)(duration * 1e6, 0);
}
function dateNow() {
    // Do not use `Date.now` because sometimes websites are wrongly "polyfilling" it. For example, we
    // had some users using a very old version of `datejs`, which patched `Date.now` to return a Date
    // instance instead of a timestamp[1]. Those users are unlikely to fix this, so let's handle this
    // case ourselves.
    // [1]: https://github.com/datejs/Datejs/blob/97f5c7c58c5bc5accdab8aa7602b6ac56462d778/src/core-debug.js#L14-L16
    return new Date().getTime();
}
function timeStampNow() {
    return dateNow();
}
function relativeNow() {
    return performance.now();
}
function clocksNow() {
    return { relative: relativeNow(), timeStamp: timeStampNow() };
}
function clocksOrigin() {
    return { relative: 0, timeStamp: getNavigationStart() };
}
function elapsed(start, end) {
    return (end - start);
}
/**
 * Get the time since the navigation was started.
 *
 * Note: this does not use `performance.timeOrigin` because it doesn't seem to reflect the actual
 * time on which the navigation has started: it may be much farther in the past, at least in Firefox 71.
 * Related issue in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926
 */
function getRelativeTime(timestamp) {
    return (timestamp - getNavigationStart());
}
function getTimeStamp(relativeTime) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return Math.round(getNavigationStart() + relativeTime);
}
function looksLikeRelativeTime(time) {
    return time < _utils__WEBPACK_IMPORTED_MODULE_0__.ONE_YEAR;
}
/**
 * Navigation start slightly change on some rare cases
 */
var navigationStart;
function getNavigationStart() {
    if (navigationStart === undefined) {
        navigationStart = performance.timing.navigationStart;
    }
    return navigationStart;
}
function resetNavigationStart() {
    navigationStart = undefined;
}
//# sourceMappingURL=timeUtils.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/urlPolyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/urlPolyfill.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildUrl": () => (/* binding */ buildUrl),
/* harmony export */   "getHash": () => (/* binding */ getHash),
/* harmony export */   "getOrigin": () => (/* binding */ getOrigin),
/* harmony export */   "getPathName": () => (/* binding */ getPathName),
/* harmony export */   "getSearch": () => (/* binding */ getSearch),
/* harmony export */   "haveSameOrigin": () => (/* binding */ haveSameOrigin),
/* harmony export */   "isValidUrl": () => (/* binding */ isValidUrl),
/* harmony export */   "normalizeUrl": () => (/* binding */ normalizeUrl)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");

function normalizeUrl(url) {
    return buildUrl(url, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLocationOrigin)()).href;
}
function isValidUrl(url) {
    try {
        return !!buildUrl(url);
    }
    catch (_a) {
        return false;
    }
}
function haveSameOrigin(url1, url2) {
    return getOrigin(url1) === getOrigin(url2);
}
function getOrigin(url) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLinkElementOrigin)(buildUrl(url));
}
function getPathName(url) {
    var pathname = buildUrl(url).pathname;
    return pathname[0] === '/' ? pathname : "/".concat(pathname);
}
function getSearch(url) {
    return buildUrl(url).search;
}
function getHash(url) {
    return buildUrl(url).hash;
}
function buildUrl(url, base) {
    if (checkURLSupported()) {
        return base !== undefined ? new URL(url, base) : new URL(url);
    }
    if (base === undefined && !/:/.test(url)) {
        throw new Error("Invalid URL: '".concat(url, "'"));
    }
    var doc = document;
    var anchorElement = doc.createElement('a');
    if (base !== undefined) {
        doc = document.implementation.createHTMLDocument('');
        var baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
        doc.body.appendChild(anchorElement);
    }
    anchorElement.href = url;
    return anchorElement;
}
var isURLSupported;
function checkURLSupported() {
    if (isURLSupported !== undefined) {
        return isURLSupported;
    }
    try {
        var url = new URL('http://test/path');
        isURLSupported = url.href === 'http://test/path';
        return isURLSupported;
    }
    catch (_a) {
        isURLSupported = false;
    }
    return isURLSupported;
}
//# sourceMappingURL=urlPolyfill.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/tools/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/tools/utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ONE_DAY": () => (/* binding */ ONE_DAY),
/* harmony export */   "ONE_HOUR": () => (/* binding */ ONE_HOUR),
/* harmony export */   "ONE_KILO_BYTE": () => (/* binding */ ONE_KILO_BYTE),
/* harmony export */   "ONE_MINUTE": () => (/* binding */ ONE_MINUTE),
/* harmony export */   "ONE_SECOND": () => (/* binding */ ONE_SECOND),
/* harmony export */   "ONE_YEAR": () => (/* binding */ ONE_YEAR),
/* harmony export */   "addEventListener": () => (/* binding */ addEventListener),
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners),
/* harmony export */   "arrayFrom": () => (/* binding */ arrayFrom),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "combine": () => (/* binding */ combine),
/* harmony export */   "cssEscape": () => (/* binding */ cssEscape),
/* harmony export */   "deepClone": () => (/* binding */ deepClone),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findCommaSeparatedValue": () => (/* binding */ findCommaSeparatedValue),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "generateUUID": () => (/* binding */ generateUUID),
/* harmony export */   "getGlobalObject": () => (/* binding */ getGlobalObject),
/* harmony export */   "getLinkElementOrigin": () => (/* binding */ getLinkElementOrigin),
/* harmony export */   "getLocationOrigin": () => (/* binding */ getLocationOrigin),
/* harmony export */   "getType": () => (/* binding */ getType),
/* harmony export */   "includes": () => (/* binding */ includes),
/* harmony export */   "isEmptyObject": () => (/* binding */ isEmptyObject),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isPercentage": () => (/* binding */ isPercentage),
/* harmony export */   "jsonStringify": () => (/* binding */ jsonStringify),
/* harmony export */   "mapValues": () => (/* binding */ mapValues),
/* harmony export */   "matchList": () => (/* binding */ matchList),
/* harmony export */   "mergeInto": () => (/* binding */ mergeInto),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "objectEntries": () => (/* binding */ objectEntries),
/* harmony export */   "objectHasValue": () => (/* binding */ objectHasValue),
/* harmony export */   "objectValues": () => (/* binding */ objectValues),
/* harmony export */   "performDraw": () => (/* binding */ performDraw),
/* harmony export */   "removeDuplicates": () => (/* binding */ removeDuplicates),
/* harmony export */   "requestIdleCallback": () => (/* binding */ requestIdleCallback),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "runOnReadyState": () => (/* binding */ runOnReadyState),
/* harmony export */   "safeTruncate": () => (/* binding */ safeTruncate),
/* harmony export */   "setToArray": () => (/* binding */ setToArray),
/* harmony export */   "shallowClone": () => (/* binding */ shallowClone),
/* harmony export */   "startsWith": () => (/* binding */ startsWith),
/* harmony export */   "throttle": () => (/* binding */ throttle)
/* harmony export */ });
/* harmony import */ var _monitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");

var ONE_SECOND = 1000;
var ONE_MINUTE = 60 * ONE_SECOND;
var ONE_HOUR = 60 * ONE_MINUTE;
var ONE_DAY = 24 * ONE_HOUR;
var ONE_YEAR = 365 * ONE_DAY;
var ONE_KILO_BYTE = 1024;
// use lodash API
function throttle(fn, wait, options) {
    var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
    var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
    var inWaitPeriod = false;
    var pendingExecutionWithParameters;
    var pendingTimeoutId;
    return {
        throttled: function () {
            var parameters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parameters[_i] = arguments[_i];
            }
            if (inWaitPeriod) {
                pendingExecutionWithParameters = parameters;
                return;
            }
            if (needLeadingExecution) {
                fn.apply(void 0, parameters);
            }
            else {
                pendingExecutionWithParameters = parameters;
            }
            inWaitPeriod = true;
            pendingTimeoutId = setTimeout(function () {
                if (needTrailingExecution && pendingExecutionWithParameters) {
                    fn.apply(void 0, pendingExecutionWithParameters);
                }
                inWaitPeriod = false;
                pendingExecutionWithParameters = undefined;
            }, wait);
        },
        cancel: function () {
            clearTimeout(pendingTimeoutId);
            inWaitPeriod = false;
            pendingExecutionWithParameters = undefined;
        },
    };
}
function assign(target) {
    var toAssign = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        toAssign[_i - 1] = arguments[_i];
    }
    toAssign.forEach(function (source) {
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    });
    return target;
}
function shallowClone(object) {
    return assign({}, object);
}
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */
function generateUUID(placeholder) {
    return placeholder
        ? // eslint-disable-next-line  no-bitwise
            (parseInt(placeholder, 10) ^ ((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))).toString(16)
        : "".concat(1e7, "-").concat(1e3, "-").concat(4e3, "-").concat(8e3, "-").concat(1e11).replace(/[018]/g, generateUUID);
}
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */
function performDraw(threshold) {
    return threshold !== 0 && Math.random() * 100 <= threshold;
}
function round(num, decimals) {
    return +num.toFixed(decimals);
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }
/**
 * Custom implementation of JSON.stringify that ignores value.toJSON.
 * We need to do that because some sites badly override toJSON on certain objects.
 * Note this still supposes that JSON.stringify is correct...
 */
function jsonStringify(value, replacer, space) {
    if (value === null || value === undefined) {
        return JSON.stringify(value);
    }
    var originalToJSON = [false, undefined];
    if (hasToJSON(value)) {
        // We need to add a flag and not rely on the truthiness of value.toJSON
        // because it can be set but undefined and that's actually significant.
        originalToJSON = [true, value.toJSON];
        delete value.toJSON;
    }
    var originalProtoToJSON = [false, undefined];
    var prototype;
    if (typeof value === 'object') {
        prototype = Object.getPrototypeOf(value);
        if (hasToJSON(prototype)) {
            originalProtoToJSON = [true, prototype.toJSON];
            delete prototype.toJSON;
        }
    }
    var result;
    try {
        result = JSON.stringify(value, replacer, space);
    }
    catch (_a) {
        result = '<error: unable to serialize object>';
    }
    finally {
        if (originalToJSON[0]) {
            ;
            value.toJSON = originalToJSON[1];
        }
        if (originalProtoToJSON[0]) {
            ;
            prototype.toJSON = originalProtoToJSON[1];
        }
    }
    return result;
}
function hasToJSON(value) {
    return typeof value === 'object' && value !== null && Object.prototype.hasOwnProperty.call(value, 'toJSON');
}
function includes(candidate, search) {
    return candidate.indexOf(search) !== -1;
}
function arrayFrom(arrayLike) {
    var array = [];
    for (var i = 0; i < arrayLike.length; i++) {
        array.push(arrayLike[i]);
    }
    return array;
}
function find(array, predicate) {
    for (var i = 0; i < array.length; i += 1) {
        var item = array[i];
        if (predicate(item, i, array)) {
            return item;
        }
    }
    return undefined;
}
function findLast(array, predicate) {
    for (var i = array.length - 1; i >= 0; i -= 1) {
        var item = array[i];
        if (predicate(item, i, array)) {
            return item;
        }
    }
    return undefined;
}
function isPercentage(value) {
    return isNumber(value) && value >= 0 && value <= 100;
}
function isNumber(value) {
    return typeof value === 'number';
}
function objectValues(object) {
    return Object.keys(object).map(function (key) { return object[key]; });
}
function objectHasValue(object, value) {
    return Object.keys(object).some(function (key) { return object[key] === value; });
}
function objectEntries(object) {
    return Object.keys(object).map(function (key) { return [key, object[key]]; });
}
function isEmptyObject(object) {
    return Object.keys(object).length === 0;
}
function mapValues(object, fn) {
    var newObject = {};
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var key = _a[_i];
        newObject[key] = fn(object[key]);
    }
    return newObject;
}
function startsWith(candidate, search) {
    return candidate.slice(0, search.length) === search;
}
/**
 * inspired by https://mathiasbynens.be/notes/globalthis
 */
function getGlobalObject() {
    if (typeof globalThis === 'object') {
        return globalThis;
    }
    Object.defineProperty(Object.prototype, '_dd_temp_', {
        get: function () {
            return this;
        },
        configurable: true,
    });
    // @ts-ignore _dd_temp is defined using defineProperty
    var globalObject = _dd_temp_;
    // @ts-ignore _dd_temp is defined using defineProperty
    delete Object.prototype._dd_temp_;
    if (typeof globalObject !== 'object') {
        // on safari _dd_temp_ is available on window but not globally
        // fallback on other browser globals check
        if (typeof self === 'object') {
            globalObject = self;
        }
        else if (typeof window === 'object') {
            globalObject = window;
        }
        else {
            globalObject = {};
        }
    }
    return globalObject;
}
function getLocationOrigin() {
    return getLinkElementOrigin(window.location);
}
/**
 * IE fallback
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/origin
 */
function getLinkElementOrigin(element) {
    if (element.origin) {
        return element.origin;
    }
    var sanitizedHost = element.host.replace(/(:80|:443)$/, '');
    return "".concat(element.protocol, "//").concat(sanitizedHost);
}
function findCommaSeparatedValue(rawString, name) {
    var regex = new RegExp("(?:^|;)\\s*".concat(name, "\\s*=\\s*([^;]+)"));
    var matches = regex.exec(rawString);
    return matches ? matches[1] : undefined;
}
function safeTruncate(candidate, length, suffix) {
    if (suffix === void 0) { suffix = ''; }
    var lastChar = candidate.charCodeAt(length - 1);
    var isLastCharSurrogatePair = lastChar >= 0xd800 && lastChar <= 0xdbff;
    var correctedLength = isLastCharSurrogatePair ? length + 1 : length;
    if (candidate.length <= correctedLength)
        return candidate;
    return "".concat(candidate.slice(0, correctedLength)).concat(suffix);
}
/**
 * Add an event listener to an event emitter object (Window, Element, mock object...).  This provides
 * a few conveniences compared to using `element.addEventListener` directly:
 *
 * * supports IE11 by: using an option object only if needed and emulating the `once` option
 *
 * * wraps the listener with a `monitor` function
 *
 * * returns a `stop` function to remove the listener
 */
function addEventListener(emitter, event, listener, options) {
    return addEventListeners(emitter, [event], listener, options);
}
/**
 * Add event listeners to an event emitter object (Window, Element, mock object...).  This provides
 * a few conveniences compared to using `element.addEventListener` directly:
 *
 * * supports IE11 by: using an option object only if needed and emulating the `once` option
 *
 * * wraps the listener with a `monitor` function
 *
 * * returns a `stop` function to remove the listener
 *
 * * with `once: true`, the listener will be called at most once, even if different events are listened
 */
function addEventListeners(emitter, events, listener, _a) {
    var _b = _a === void 0 ? {} : _a, once = _b.once, capture = _b.capture, passive = _b.passive;
    var wrappedListener = (0,_monitor__WEBPACK_IMPORTED_MODULE_0__.monitor)(once
        ? function (event) {
            stop();
            listener(event);
        }
        : listener);
    var options = passive ? { capture: capture, passive: passive } : capture;
    events.forEach(function (event) { return emitter.addEventListener(event, wrappedListener, options); });
    var stop = function () { return events.forEach(function (event) { return emitter.removeEventListener(event, wrappedListener, options); }); };
    return {
        stop: stop,
    };
}
function runOnReadyState(expectedReadyState, callback) {
    if (document.readyState === expectedReadyState || document.readyState === 'complete') {
        callback();
    }
    else {
        var eventName = expectedReadyState === 'complete' ? "load" /* LOAD */ : "DOMContentLoaded" /* DOM_CONTENT_LOADED */;
        addEventListener(window, eventName, callback, { once: true });
    }
}
/**
 * Similar to `typeof`, but distinguish plain objects from `null` and arrays
 */
function getType(value) {
    if (value === null) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    return typeof value;
}
function createCircularReferenceChecker() {
    if (typeof WeakSet !== 'undefined') {
        var set_1 = new WeakSet();
        return {
            hasAlreadyBeenSeen: function (value) {
                var has = set_1.has(value);
                if (!has) {
                    set_1.add(value);
                }
                return has;
            },
        };
    }
    var array = [];
    return {
        hasAlreadyBeenSeen: function (value) {
            var has = array.indexOf(value) >= 0;
            if (!has) {
                array.push(value);
            }
            return has;
        },
    };
}
/**
 * Iterate over source and affect its sub values into destination, recursively.
 * If the source and destination can't be merged, return source.
 */
function mergeInto(destination, source, circularReferenceChecker) {
    if (circularReferenceChecker === void 0) { circularReferenceChecker = createCircularReferenceChecker(); }
    // ignore the source if it is undefined
    if (source === undefined) {
        return destination;
    }
    if (typeof source !== 'object' || source === null) {
        // primitive values - just return source
        return source;
    }
    else if (source instanceof Date) {
        return new Date(source.getTime());
    }
    else if (source instanceof RegExp) {
        var flags = source.flags ||
            // old browsers compatibility
            [
                source.global ? 'g' : '',
                source.ignoreCase ? 'i' : '',
                source.multiline ? 'm' : '',
                source.sticky ? 'y' : '',
                source.unicode ? 'u' : '',
            ].join('');
        return new RegExp(source.source, flags);
    }
    if (circularReferenceChecker.hasAlreadyBeenSeen(source)) {
        // remove circular references
        return undefined;
    }
    else if (Array.isArray(source)) {
        var merged_1 = Array.isArray(destination) ? destination : [];
        for (var i = 0; i < source.length; ++i) {
            merged_1[i] = mergeInto(merged_1[i], source[i], circularReferenceChecker);
        }
        return merged_1;
    }
    var merged = getType(destination) === 'object' ? destination : {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            merged[key] = mergeInto(merged[key], source[key], circularReferenceChecker);
        }
    }
    return merged;
}
/**
 * A simplistic implementation of a deep clone algorithm.
 * Caveats:
 * - It doesn't maintain prototype chains - don't use with instances of custom classes.
 * - It doesn't handle Map and Set
 */
function deepClone(value) {
    return mergeInto(undefined, value);
}
function combine() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var destination;
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        // Ignore any undefined or null sources.
        if (source === undefined || source === null) {
            continue;
        }
        destination = mergeInto(destination, source);
    }
    return destination;
}
function requestIdleCallback(callback, opts) {
    // Use 'requestIdleCallback' when available: it will throttle the mutation processing if the
    // browser is busy rendering frames (ex: when frames are below 60fps). When not available, the
    // fallback on 'requestAnimationFrame' will still ensure the mutations are processed after any
    // browser rendering process (Layout, Recalculate Style, etc.), so we can serialize DOM nodes
    // efficiently.
    if (window.requestIdleCallback) {
        var id_1 = window.requestIdleCallback((0,_monitor__WEBPACK_IMPORTED_MODULE_0__.monitor)(callback), opts);
        return function () { return window.cancelIdleCallback(id_1); };
    }
    var id = window.requestAnimationFrame((0,_monitor__WEBPACK_IMPORTED_MODULE_0__.monitor)(callback));
    return function () { return window.cancelAnimationFrame(id); };
}
function setToArray(set) {
    var array = [];
    set.forEach(function (item) { return array.push(item); });
    return array;
}
function removeDuplicates(array) {
    var set = new Set();
    array.forEach(function (item) { return set.add(item); });
    return setToArray(set);
}
function matchList(list, value) {
    return list.some(function (item) { return item === value || (item instanceof RegExp && item.test(value)); });
}
// https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/selector/escapeSelector.js
function cssEscape(str) {
    if (window.CSS && window.CSS.escape) {
        return window.CSS.escape(str);
    }
    // eslint-disable-next-line no-control-regex
    return str.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (ch, asCodePoint) {
        if (asCodePoint) {
            // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
            if (ch === '\0') {
                return '\uFFFD';
            }
            // Control characters and (dependent upon position) numbers get escaped as code points
            return "".concat(ch.slice(0, -1), "\\").concat(ch.charCodeAt(ch.length - 1).toString(16), " ");
        }
        // Other potentially-special ASCII characters get backslash-escaped
        return "\\".concat(ch);
    });
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/transport/batch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/transport/batch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Batch": () => (/* binding */ Batch)
/* harmony export */ });
/* harmony import */ var _tools_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/display */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");



// https://en.wikipedia.org/wiki/UTF-8
// eslint-disable-next-line no-control-regex
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
var Batch = /** @class */ (function () {
    function Batch(request, batchMessagesLimit, batchBytesLimit, messageBytesLimit, flushTimeout, beforeUnloadCallback) {
        if (beforeUnloadCallback === void 0) { beforeUnloadCallback = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.noop; }
        this.request = request;
        this.batchMessagesLimit = batchMessagesLimit;
        this.batchBytesLimit = batchBytesLimit;
        this.messageBytesLimit = messageBytesLimit;
        this.flushTimeout = flushTimeout;
        this.beforeUnloadCallback = beforeUnloadCallback;
        this.pushOnlyBuffer = [];
        this.upsertBuffer = {};
        this.bufferBytesCount = 0;
        this.bufferMessagesCount = 0;
        this.flushOnVisibilityHidden();
        this.flushPeriodically();
    }
    Batch.prototype.add = function (message) {
        this.addOrUpdate(message);
    };
    Batch.prototype.upsert = function (message, key) {
        this.addOrUpdate(message, key);
    };
    Batch.prototype.flush = function (reason) {
        if (this.bufferMessagesCount !== 0) {
            var messages = this.pushOnlyBuffer.concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.objectValues)(this.upsertBuffer));
            var bytesCount = this.bufferBytesCount;
            this.pushOnlyBuffer = [];
            this.upsertBuffer = {};
            this.bufferBytesCount = 0;
            this.bufferMessagesCount = 0;
            this.request.send(messages.join('\n'), bytesCount, reason);
        }
    };
    Batch.prototype.computeBytesCount = function (candidate) {
        // Accurate bytes count computations can degrade performances when there is a lot of events to process
        if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
            return candidate.length;
        }
        if (window.TextEncoder !== undefined) {
            return new TextEncoder().encode(candidate).length;
        }
        return new Blob([candidate]).size;
    };
    Batch.prototype.addOrUpdate = function (message, key) {
        var _a = this.process(message), processedMessage = _a.processedMessage, messageBytesCount = _a.messageBytesCount;
        if (messageBytesCount >= this.messageBytesLimit) {
            _tools_display__WEBPACK_IMPORTED_MODULE_1__.display.warn("Discarded a message whose size was bigger than the maximum allowed size ".concat(this.messageBytesLimit, "KB."));
            return;
        }
        if (this.hasMessageFor(key)) {
            this.remove(key);
        }
        if (this.willReachedBytesLimitWith(messageBytesCount)) {
            this.flush('batch_bytes_limit');
        }
        this.push(processedMessage, messageBytesCount, key);
        if (this.isFull()) {
            this.flush('batch_messages_limit');
        }
    };
    Batch.prototype.process = function (message) {
        var processedMessage = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.jsonStringify)(message);
        var messageBytesCount = this.computeBytesCount(processedMessage);
        return { processedMessage: processedMessage, messageBytesCount: messageBytesCount };
    };
    Batch.prototype.push = function (processedMessage, messageBytesCount, key) {
        if (this.bufferMessagesCount > 0) {
            // \n separator at serialization
            this.bufferBytesCount += 1;
        }
        if (key !== undefined) {
            this.upsertBuffer[key] = processedMessage;
        }
        else {
            this.pushOnlyBuffer.push(processedMessage);
        }
        this.bufferBytesCount += messageBytesCount;
        this.bufferMessagesCount += 1;
    };
    Batch.prototype.remove = function (key) {
        var removedMessage = this.upsertBuffer[key];
        delete this.upsertBuffer[key];
        var messageBytesCount = this.computeBytesCount(removedMessage);
        this.bufferBytesCount -= messageBytesCount;
        this.bufferMessagesCount -= 1;
        if (this.bufferMessagesCount > 0) {
            this.bufferBytesCount -= 1;
        }
    };
    Batch.prototype.hasMessageFor = function (key) {
        return key !== undefined && this.upsertBuffer[key] !== undefined;
    };
    Batch.prototype.willReachedBytesLimitWith = function (messageBytesCount) {
        // byte of the separator at the end of the message
        return this.bufferBytesCount + messageBytesCount + 1 >= this.batchBytesLimit;
    };
    Batch.prototype.isFull = function () {
        return this.bufferMessagesCount === this.batchMessagesLimit || this.bufferBytesCount >= this.batchBytesLimit;
    };
    Batch.prototype.flushPeriodically = function () {
        var _this = this;
        setTimeout((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_2__.monitor)(function () {
            _this.flush('batch_flush_timeout');
            _this.flushPeriodically();
        }), this.flushTimeout);
    };
    Batch.prototype.flushOnVisibilityHidden = function () {
        var _this = this;
        /**
         * With sendBeacon, requests are guaranteed to be successfully sent during document unload
         */
        // @ts-ignore this function is not always defined
        if (navigator.sendBeacon) {
            /**
             * beforeunload is called before visibilitychange
             * register first to be sure to be called before flush on beforeunload
             * caveat: unload can still be canceled by another listener
             */
            (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(window, "beforeunload" /* BEFORE_UNLOAD */, this.beforeUnloadCallback);
            /**
             * Only event that guarantee to fire on mobile devices when the page transitions to background state
             * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
             */
            (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(document, "visibilitychange" /* VISIBILITY_CHANGE */, function () {
                if (document.visibilityState === 'hidden') {
                    _this.flush('visibility_hidden');
                }
            });
            /**
             * Safari does not support yet to send a request during:
             * - a visibility change during doc unload (cf: https://bugs.webkit.org/show_bug.cgi?id=194897)
             * - a page hide transition (cf: https://bugs.webkit.org/show_bug.cgi?id=188329)
             */
            (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.addEventListener)(window, "beforeunload" /* BEFORE_UNLOAD */, function () { return _this.flush('before_unload'); });
        }
    };
    return Batch;
}());

//# sourceMappingURL=batch.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/transport/eventBridge.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/transport/eventBridge.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canUseEventBridge": () => (/* binding */ canUseEventBridge),
/* harmony export */   "getEventBridge": () => (/* binding */ getEventBridge)
/* harmony export */ });
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");

function getEventBridge() {
    var eventBridgeGlobal = getEventBridgeGlobal();
    if (!eventBridgeGlobal) {
        return;
    }
    return {
        getAllowedWebViewHosts: function () {
            return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
        },
        send: function (eventType, event) {
            eventBridgeGlobal.send(JSON.stringify({ eventType: eventType, event: event }));
        },
    };
}
function canUseEventBridge(hostname) {
    var _a;
    if (hostname === void 0) { hostname = (_a = (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)().location) === null || _a === void 0 ? void 0 : _a.hostname; }
    var bridge = getEventBridge();
    return (!!bridge &&
        bridge.getAllowedWebViewHosts().some(function (host) {
            var escapedHost = host.replace(/\./g, '\\.');
            var isDomainOrSubDomain = new RegExp("^(.+\\.)*".concat(escapedHost, "$"));
            return isDomainOrSubDomain.test(hostname);
        }));
}
function getEventBridgeGlobal() {
    return (0,_tools_utils__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)().DatadogEventBridge;
}
//# sourceMappingURL=eventBridge.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/transport/failedSendBeacon.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/transport/failedSendBeacon.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCAL_STORAGE_KEY": () => (/* binding */ LOCAL_STORAGE_KEY),
/* harmony export */   "addFailedSendBeacon": () => (/* binding */ addFailedSendBeacon),
/* harmony export */   "startFlushFailedSendBeacons": () => (/* binding */ startFlushFailedSendBeacons)
/* harmony export */ });
/* harmony import */ var _domain_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/configuration */ "./node_modules/@datadog/browser-core/esm/domain/configuration/experimentalFeatures.js");
/* harmony import */ var _domain_telemetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/telemetry */ "./node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js");
/* harmony import */ var _tools_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/monitor */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _tools_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/utils */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");




var LOCAL_STORAGE_KEY = 'datadog-browser-sdk-failed-send-beacon';
function startFlushFailedSendBeacons() {
    if (!(0,_domain_configuration__WEBPACK_IMPORTED_MODULE_0__.isExperimentalFeatureEnabled)('failed-sendbeacon'))
        return;
    // delay the computation to prevent the SDK from blocking the main thread on init
    setTimeout((0,_tools_monitor__WEBPACK_IMPORTED_MODULE_1__.monitor)(flushFailedSendBeacon));
}
function addFailedSendBeacon(endpointType, size, reason) {
    if (!(0,_domain_configuration__WEBPACK_IMPORTED_MODULE_0__.isExperimentalFeatureEnabled)('failed-sendbeacon'))
        return;
    var failSendBeaconLog = {
        reason: reason,
        endpointType: endpointType,
        version: "4.12.0",
        connection: navigator.connection ? navigator.connection.effectiveType : undefined,
        onLine: navigator.onLine,
        size: size,
    };
    if (reason === 'before_unload' || reason === 'visibility_hidden') {
        window.localStorage.setItem("".concat(LOCAL_STORAGE_KEY, "-").concat((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.generateUUID)()), JSON.stringify(failSendBeaconLog));
    }
    else {
        (0,_domain_telemetry__WEBPACK_IMPORTED_MODULE_3__.addTelemetryDebug)('failed sendBeacon', failSendBeaconLog);
    }
}
function flushFailedSendBeacon() {
    var keys = Object.keys(localStorage);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if ((0,_tools_utils__WEBPACK_IMPORTED_MODULE_2__.startsWith)(key, LOCAL_STORAGE_KEY)) {
            var value = localStorage.getItem(key);
            if (value) {
                (0,_domain_telemetry__WEBPACK_IMPORTED_MODULE_3__.addTelemetryDebug)('failed sendBeacon', JSON.parse(value));
                window.localStorage.removeItem(key);
            }
        }
    }
}
//# sourceMappingURL=failedSendBeacon.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/transport/httpRequest.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/transport/httpRequest.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpRequest": () => (/* binding */ HttpRequest)
/* harmony export */ });
/* harmony import */ var _domain_telemetry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/telemetry */ "./node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js");
/* harmony import */ var _failedSendBeacon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./failedSendBeacon */ "./node_modules/@datadog/browser-core/esm/transport/failedSendBeacon.js");


/**
 * Use POST request without content type to:
 * - avoid CORS preflight requests
 * - allow usage of sendBeacon
 *
 * multiple elements are sent separated by \n in order
 * to be parsed correctly without content type header
 */
var HttpRequest = /** @class */ (function () {
    function HttpRequest(endpointBuilder, bytesLimit) {
        this.endpointBuilder = endpointBuilder;
        this.bytesLimit = bytesLimit;
    }
    HttpRequest.prototype.send = function (data, bytesCount, flushReason) {
        var url = this.endpointBuilder.build();
        var canUseBeacon = !!navigator.sendBeacon && bytesCount < this.bytesLimit;
        if (canUseBeacon) {
            try {
                var isQueued = navigator.sendBeacon(url, data);
                if (isQueued) {
                    return;
                }
                (0,_failedSendBeacon__WEBPACK_IMPORTED_MODULE_0__.addFailedSendBeacon)(this.endpointBuilder.endpointType, bytesCount, flushReason);
            }
            catch (e) {
                reportBeaconError(e);
            }
        }
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.send(data);
    };
    return HttpRequest;
}());

var hasReportedBeaconError = false;
function reportBeaconError(e) {
    if (!hasReportedBeaconError) {
        hasReportedBeaconError = true;
        (0,_domain_telemetry__WEBPACK_IMPORTED_MODULE_1__.addTelemetryError)(e);
    }
}
//# sourceMappingURL=httpRequest.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-core/esm/transport/startBatchWithReplica.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@datadog/browser-core/esm/transport/startBatchWithReplica.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startBatchWithReplica": () => (/* binding */ startBatchWithReplica)
/* harmony export */ });
/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batch */ "./node_modules/@datadog/browser-core/esm/transport/batch.js");
/* harmony import */ var _httpRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpRequest */ "./node_modules/@datadog/browser-core/esm/transport/httpRequest.js");


function startBatchWithReplica(configuration, endpoint, replicaEndpoint) {
    var primaryBatch = createBatch(endpoint);
    var replicaBatch;
    if (replicaEndpoint) {
        replicaBatch = createBatch(replicaEndpoint);
    }
    function createBatch(endpointBuilder) {
        return new _batch__WEBPACK_IMPORTED_MODULE_0__.Batch(new _httpRequest__WEBPACK_IMPORTED_MODULE_1__.HttpRequest(endpointBuilder, configuration.batchBytesLimit), configuration.batchMessagesLimit, configuration.batchBytesLimit, configuration.messageBytesLimit, configuration.flushTimeout);
    }
    return {
        add: function (message, replicated) {
            if (replicated === void 0) { replicated = true; }
            primaryBatch.add(message);
            if (replicaBatch && replicated) {
                replicaBatch.add(message);
            }
        },
    };
}
//# sourceMappingURL=startBatchWithReplica.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/boot/logsPublicApi.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/boot/logsPublicApi.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeLogsPublicApi": () => (/* binding */ makeLogsPublicApi)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/contextManager.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/boundedBuffer.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/boot/init.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/transport/eventBridge.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _domain_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/configuration */ "./node_modules/@datadog/browser-logs/esm/domain/configuration.js");
/* harmony import */ var _domain_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");



function makeLogsPublicApi(startLogsImpl) {
    var isAlreadyInitialized = false;
    var globalContextManager = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.createContextManager)();
    var customLoggers = {};
    var beforeInitLoggerLog = new _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.BoundedBuffer();
    var handleLogStrategy = function (logsMessage, logger, savedCommonContext, date) {
        if (savedCommonContext === void 0) { savedCommonContext = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.deepClone)(getCommonContext()); }
        if (date === void 0) { date = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.timeStampNow)(); }
        beforeInitLoggerLog.add(function () { return handleLogStrategy(logsMessage, logger, savedCommonContext, date); });
    };
    var getInitConfigurationStrategy = function () { return undefined; };
    var mainLogger = new _domain_logger__WEBPACK_IMPORTED_MODULE_1__.Logger(function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return handleLogStrategy.apply(void 0, params);
    });
    function getCommonContext() {
        return {
            view: {
                referrer: document.referrer,
                url: window.location.href,
            },
            context: globalContextManager.get(),
        };
    }
    return (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.makePublicApi)({
        logger: mainLogger,
        init: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(function (initConfiguration) {
            if ((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_8__.canUseEventBridge)()) {
                initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
            }
            if (!canInitLogs(initConfiguration)) {
                return;
            }
            var configuration = (0,_domain_configuration__WEBPACK_IMPORTED_MODULE_0__.validateAndBuildLogsConfiguration)(initConfiguration);
            if (!configuration) {
                return;
            }
            ;
            (handleLogStrategy = startLogsImpl(configuration, getCommonContext, mainLogger).handleLog);
            getInitConfigurationStrategy = function () { return (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.deepClone)(initConfiguration); };
            beforeInitLoggerLog.drain();
            isAlreadyInitialized = true;
        }),
        getLoggerGlobalContext: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(globalContextManager.get),
        setLoggerGlobalContext: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(globalContextManager.set),
        addLoggerGlobalContext: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(globalContextManager.add),
        removeLoggerGlobalContext: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(globalContextManager.remove),
        createLogger: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(function (name, conf) {
            if (conf === void 0) { conf = {}; }
            customLoggers[name] = new _domain_logger__WEBPACK_IMPORTED_MODULE_1__.Logger(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                return handleLogStrategy.apply(void 0, params);
            }, name, conf.handler, conf.level, conf.context);
            return customLoggers[name];
        }),
        getLogger: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(function (name) { return customLoggers[name]; }),
        getInitConfiguration: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_7__.monitor)(function () { return getInitConfigurationStrategy(); }),
    });
    function overrideInitConfigurationForBridge(initConfiguration) {
        return (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.assign)({}, initConfiguration, { clientToken: 'empty' });
    }
    function canInitLogs(initConfiguration) {
        if (isAlreadyInitialized) {
            if (!initConfiguration.silentMultipleInit) {
                _datadog_browser_core__WEBPACK_IMPORTED_MODULE_9__.display.error('DD_LOGS is already initialized.');
            }
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=logsPublicApi.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/boot/startLogs.js":
/*!******************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/boot/startLogs.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startLogs": () => (/* binding */ startLogs)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/browser/cookie.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/transport/eventBridge.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/transport/startBatchWithReplica.js");
/* harmony import */ var _domain_logsSessionManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/logsSessionManager */ "./node_modules/@datadog/browser-logs/esm/domain/logsSessionManager.js");
/* harmony import */ var _domain_assembly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/assembly */ "./node_modules/@datadog/browser-logs/esm/domain/assembly.js");
/* harmony import */ var _domain_logsCollection_console_consoleCollection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/logsCollection/console/consoleCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/console/consoleCollection.js");
/* harmony import */ var _domain_logsCollection_report_reportCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/logsCollection/report/reportCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/report/reportCollection.js");
/* harmony import */ var _domain_logsCollection_networkError_networkErrorCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/logsCollection/networkError/networkErrorCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/networkError/networkErrorCollection.js");
/* harmony import */ var _domain_logsCollection_runtimeError_runtimeErrorCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domain/logsCollection/runtimeError/runtimeErrorCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/runtimeError/runtimeErrorCollection.js");
/* harmony import */ var _domain_lifeCycle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../domain/lifeCycle */ "./node_modules/@datadog/browser-logs/esm/domain/lifeCycle.js");
/* harmony import */ var _domain_logsCollection_logger_loggerCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../domain/logsCollection/logger/loggerCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/logger/loggerCollection.js");
/* harmony import */ var _transport_startLogsBatch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../transport/startLogsBatch */ "./node_modules/@datadog/browser-logs/esm/transport/startLogsBatch.js");
/* harmony import */ var _transport_startLogsBridge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../transport/startLogsBridge */ "./node_modules/@datadog/browser-logs/esm/transport/startLogsBridge.js");











function startLogs(configuration, getCommonContext, mainLogger) {
    var lifeCycle = new _domain_lifeCycle__WEBPACK_IMPORTED_MODULE_6__.LifeCycle();
    var telemetry = startLogsTelemetry(configuration);
    telemetry.setContextProvider(function () {
        var _a, _b, _c, _d, _e, _f;
        return ({
            application: {
                id: (_a = (0,_domain_assembly__WEBPACK_IMPORTED_MODULE_1__.getRUMInternalContext)()) === null || _a === void 0 ? void 0 : _a.application_id,
            },
            session: {
                id: (_b = session.findTrackedSession()) === null || _b === void 0 ? void 0 : _b.id,
            },
            view: {
                id: (_d = (_c = (0,_domain_assembly__WEBPACK_IMPORTED_MODULE_1__.getRUMInternalContext)()) === null || _c === void 0 ? void 0 : _c.view) === null || _d === void 0 ? void 0 : _d.id,
            },
            action: {
                id: (_f = (_e = (0,_domain_assembly__WEBPACK_IMPORTED_MODULE_1__.getRUMInternalContext)()) === null || _e === void 0 ? void 0 : _e.user_action) === null || _f === void 0 ? void 0 : _f.id,
            },
        });
    });
    (0,_domain_logsCollection_networkError_networkErrorCollection__WEBPACK_IMPORTED_MODULE_4__.startNetworkErrorCollection)(configuration, lifeCycle);
    (0,_domain_logsCollection_runtimeError_runtimeErrorCollection__WEBPACK_IMPORTED_MODULE_5__.startRuntimeErrorCollection)(configuration, lifeCycle);
    (0,_domain_logsCollection_console_consoleCollection__WEBPACK_IMPORTED_MODULE_2__.startConsoleCollection)(configuration, lifeCycle);
    (0,_domain_logsCollection_report_reportCollection__WEBPACK_IMPORTED_MODULE_3__.startReportCollection)(configuration, lifeCycle);
    var handleLog = (0,_domain_logsCollection_logger_loggerCollection__WEBPACK_IMPORTED_MODULE_7__.startLoggerCollection)(lifeCycle).handleLog;
    var session = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_10__.areCookiesAuthorized)(configuration.cookieOptions) && !(0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_11__.canUseEventBridge)()
        ? (0,_domain_logsSessionManager__WEBPACK_IMPORTED_MODULE_0__.startLogsSessionManager)(configuration)
        : (0,_domain_logsSessionManager__WEBPACK_IMPORTED_MODULE_0__.startLogsSessionManagerStub)(configuration);
    (0,_domain_assembly__WEBPACK_IMPORTED_MODULE_1__.startLogsAssembly)(session, configuration, lifeCycle, getCommonContext, mainLogger);
    if (!(0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_11__.canUseEventBridge)()) {
        (0,_transport_startLogsBatch__WEBPACK_IMPORTED_MODULE_8__.startLogsBatch)(configuration, lifeCycle);
    }
    else {
        (0,_transport_startLogsBridge__WEBPACK_IMPORTED_MODULE_9__.startLogsBridge)(lifeCycle);
    }
    return {
        handleLog: handleLog,
    };
}
function startLogsTelemetry(configuration) {
    var _a;
    var telemetry = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_12__.startTelemetry)(configuration);
    if ((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_11__.canUseEventBridge)()) {
        var bridge_1 = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_11__.getEventBridge)();
        telemetry.observable.subscribe(function (event) { return bridge_1.send('internal_telemetry', event); });
    }
    else {
        var telemetryBatch_1 = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_13__.startBatchWithReplica)(configuration, configuration.rumEndpointBuilder, (_a = configuration.replica) === null || _a === void 0 ? void 0 : _a.rumEndpointBuilder);
        telemetry.observable.subscribe(function (event) { return telemetryBatch_1.add(event, (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_12__.isTelemetryReplicationAllowed)(configuration)); });
    }
    return telemetry;
}
//# sourceMappingURL=startLogs.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/assembly.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/assembly.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRUMInternalContext": () => (/* binding */ getRUMInternalContext),
/* harmony export */   "startLogsAssembly": () => (/* binding */ startLogsAssembly)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/createEventRateLimiter.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");
/* harmony import */ var _logsCollection_logger_loggerCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logsCollection/logger/loggerCollection */ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/logger/loggerCollection.js");
/* harmony import */ var _reportAgentError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reportAgentError */ "./node_modules/@datadog/browser-logs/esm/domain/reportAgentError.js");




function startLogsAssembly(sessionManager, configuration, lifeCycle, getCommonContext, mainLogger // Todo: [RUMF-1230] Remove this parameter in the next major release
) {
    var statusWithCustom = _logger__WEBPACK_IMPORTED_MODULE_0__.STATUSES.concat(['custom']);
    var logRateLimiters = {};
    statusWithCustom.forEach(function (status) {
        logRateLimiters[status] = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.createEventRateLimiter)(status, configuration.eventRateLimiterThreshold, function (error) { return (0,_reportAgentError__WEBPACK_IMPORTED_MODULE_2__.reportAgentError)(error, lifeCycle); });
    });
    lifeCycle.subscribe(0 /* RAW_LOG_COLLECTED */, function (_a) {
        var _b, _c, _d;
        var rawLogsEvent = _a.rawLogsEvent, _e = _a.messageContext, messageContext = _e === void 0 ? undefined : _e, _f = _a.savedCommonContext, savedCommonContext = _f === void 0 ? undefined : _f, _g = _a.logger, logger = _g === void 0 ? mainLogger : _g;
        var startTime = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.getRelativeTime)(rawLogsEvent.date);
        var session = sessionManager.findTrackedSession(startTime);
        if (!session) {
            return;
        }
        var commonContext = savedCommonContext || getCommonContext();
        var log = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.combine)({ service: configuration.service, session_id: session.id, view: commonContext.view }, commonContext.context, getRUMInternalContext(startTime), rawLogsEvent, logger.getContext(), messageContext);
        if (
        // Todo: [RUMF-1230] Move this check to the logger collection in the next major release
        !(0,_logsCollection_logger_loggerCollection__WEBPACK_IMPORTED_MODULE_1__.isAuthorized)(rawLogsEvent.status, _logger__WEBPACK_IMPORTED_MODULE_0__.HandlerType.http, logger) ||
            ((_b = configuration.beforeSend) === null || _b === void 0 ? void 0 : _b.call(configuration, log)) === false ||
            (((_c = log.error) === null || _c === void 0 ? void 0 : _c.origin) !== _datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.ErrorSource.AGENT &&
                ((_d = logRateLimiters[log.status]) !== null && _d !== void 0 ? _d : logRateLimiters['custom']).isLimitReached())) {
            return;
        }
        lifeCycle.notify(1 /* LOG_COLLECTED */, log);
    });
}
function getRUMInternalContext(startTime) {
    var rum = window.DD_RUM;
    return rum && rum.getInternalContext ? rum.getInternalContext(startTime) : undefined;
}
//# sourceMappingURL=assembly.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/configuration.js":
/*!************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/configuration.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT": () => (/* binding */ DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT),
/* harmony export */   "validateAndBuildForwardOption": () => (/* binding */ validateAndBuildForwardOption),
/* harmony export */   "validateAndBuildLogsConfiguration": () => (/* binding */ validateAndBuildLogsConfiguration)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/configuration/configuration.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/report/reportObservable.js");

/**
 * arbitrary value, byte precision not needed
 */
var DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT = 32 * _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.ONE_KILO_BYTE;
function validateAndBuildLogsConfiguration(initConfiguration) {
    var baseConfiguration = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.validateAndBuildConfiguration)(initConfiguration);
    var forwardConsoleLogs = validateAndBuildForwardOption(initConfiguration.forwardConsoleLogs, (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.objectValues)(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ConsoleApiName), 'Forward Console Logs');
    var forwardReports = validateAndBuildForwardOption(initConfiguration.forwardReports, (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.objectValues)(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.RawReportType), 'Forward Reports');
    if (!baseConfiguration || !forwardConsoleLogs || !forwardReports) {
        return;
    }
    if (initConfiguration.forwardErrorsToLogs && !(0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.includes)(forwardConsoleLogs, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ConsoleApiName.error)) {
        forwardConsoleLogs.push(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ConsoleApiName.error);
    }
    return (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.assign)({
        forwardErrorsToLogs: initConfiguration.forwardErrorsToLogs !== false,
        forwardConsoleLogs: forwardConsoleLogs,
        forwardReports: forwardReports,
        requestErrorResponseLengthLimit: DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT,
    }, baseConfiguration);
}
function validateAndBuildForwardOption(option, allowedValues, label) {
    if (option === undefined) {
        return [];
    }
    if (!(option === 'all' || (Array.isArray(option) && option.every(function (api) { return (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.includes)(allowedValues, api); })))) {
        _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.display.error("".concat(label, " should be \"all\" or an array with allowed values \"").concat(allowedValues.join('", "'), "\""));
        return;
    }
    return option === 'all' ? allowedValues : (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.removeDuplicates)(option);
}
//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/lifeCycle.js":
/*!********************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/lifeCycle.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeCycle": () => (/* binding */ LifeCycle)
/* harmony export */ });
var LifeCycle = /** @class */ (function () {
    function LifeCycle() {
        this.callbacks = {};
    }
    LifeCycle.prototype.notify = function (eventType, data) {
        var eventCallbacks = this.callbacks[eventType];
        if (eventCallbacks) {
            eventCallbacks.forEach(function (callback) { return callback(data); });
        }
    };
    LifeCycle.prototype.subscribe = function (eventType, callback) {
        var _this = this;
        if (!this.callbacks[eventType]) {
            this.callbacks[eventType] = [];
        }
        this.callbacks[eventType].push(callback);
        return {
            unsubscribe: function () {
                _this.callbacks[eventType] = _this.callbacks[eventType].filter(function (other) { return callback !== other; });
            },
        };
    };
    return LifeCycle;
}());

//# sourceMappingURL=lifeCycle.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logger.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandlerType": () => (/* binding */ HandlerType),
/* harmony export */   "Logger": () => (/* binding */ Logger),
/* harmony export */   "STATUSES": () => (/* binding */ STATUSES),
/* harmony export */   "StatusType": () => (/* binding */ StatusType)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/contextManager.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StatusType = {
    debug: 'debug',
    error: 'error',
    info: 'info',
    warn: 'warn',
};
var HandlerType = {
    console: 'console',
    http: 'http',
    silent: 'silent',
};
var STATUSES = Object.keys(StatusType);
var Logger = /** @class */ (function () {
    function Logger(handleLogStrategy, name, handlerType, level, loggerContext) {
        if (handlerType === void 0) { handlerType = HandlerType.http; }
        if (level === void 0) { level = StatusType.debug; }
        if (loggerContext === void 0) { loggerContext = {}; }
        this.handleLogStrategy = handleLogStrategy;
        this.handlerType = handlerType;
        this.level = level;
        this.contextManager = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.createContextManager)();
        this.contextManager.set((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.assign)({}, loggerContext, name ? { logger: { name: name } } : undefined));
    }
    Logger.prototype.log = function (message, messageContext, status) {
        if (status === void 0) { status = StatusType.info; }
        this.handleLogStrategy({ message: message, context: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.deepClone)(messageContext), status: status }, this);
    };
    Logger.prototype.debug = function (message, messageContext) {
        this.log(message, messageContext, StatusType.debug);
    };
    Logger.prototype.info = function (message, messageContext) {
        this.log(message, messageContext, StatusType.info);
    };
    Logger.prototype.warn = function (message, messageContext) {
        this.log(message, messageContext, StatusType.warn);
    };
    Logger.prototype.error = function (message, messageContext) {
        var errorOrigin = {
            error: {
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.LOGGER,
            },
        };
        this.log(message, (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.combine)(errorOrigin, messageContext), StatusType.error);
    };
    Logger.prototype.setContext = function (context) {
        this.contextManager.set(context);
    };
    Logger.prototype.getContext = function () {
        return this.contextManager.get();
    };
    Logger.prototype.addContext = function (key, value) {
        this.contextManager.add(key, value);
    };
    Logger.prototype.removeContext = function (key) {
        this.contextManager.remove(key);
    };
    Logger.prototype.setHandler = function (handler) {
        this.handlerType = handler;
    };
    Logger.prototype.getHandler = function () {
        return this.handlerType;
    };
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    Logger.prototype.getLevel = function () {
        return this.level;
    };
    __decorate([
        _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.monitored
    ], Logger.prototype, "log", null);
    return Logger;
}());

//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/console/consoleCollection.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsCollection/console/consoleCollection.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startConsoleCollection": () => (/* binding */ startConsoleCollection)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/console/consoleObservable.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");
var _a;


var LogStatusForApi = (_a = {},
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.log] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.info,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.debug] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.debug,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.info] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.info,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.warn] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.warn,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.error] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
    _a);
function startConsoleCollection(configuration, lifeCycle) {
    var consoleSubscription = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.initConsoleObservable)(configuration.forwardConsoleLogs).subscribe(function (log) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.timeStampNow)(),
                message: log.message,
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.CONSOLE,
                error: log.api === _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleApiName.error
                    ? {
                        origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.CONSOLE,
                        stack: log.stack,
                    }
                    : undefined,
                status: LogStatusForApi[log.api],
            },
        });
    });
    return {
        stop: function () {
            consoleSubscription.unsubscribe();
        },
    };
}
//# sourceMappingURL=consoleCollection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/logger/loggerCollection.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsCollection/logger/loggerCollection.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATUS_PRIORITIES": () => (/* binding */ STATUS_PRIORITIES),
/* harmony export */   "isAuthorized": () => (/* binding */ isAuthorized),
/* harmony export */   "startLoggerCollection": () => (/* binding */ startLoggerCollection)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/display.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");
var _a;


var STATUS_PRIORITIES = (_a = {},
    _a[_logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.debug] = 0,
    _a[_logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.info] = 1,
    _a[_logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.warn] = 2,
    _a[_logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error] = 3,
    _a);
function startLoggerCollection(lifeCycle) {
    function handleLog(logsMessage, logger, savedCommonContext, savedDate) {
        var messageContext = logsMessage.context;
        if (isAuthorized(logsMessage.status, _logger__WEBPACK_IMPORTED_MODULE_0__.HandlerType.console, logger)) {
            (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.display)(logsMessage.status, logsMessage.message, (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.combine)(logger.getContext(), messageContext));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: savedDate || (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.timeStampNow)(),
                message: logsMessage.message,
                status: logsMessage.status,
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.LOGGER,
            },
            messageContext: messageContext,
            savedCommonContext: savedCommonContext,
            logger: logger,
        });
    }
    return {
        handleLog: handleLog,
    };
}
function isAuthorized(status, handlerType, logger) {
    var loggerHandler = logger.getHandler();
    var sanitizedHandlerType = Array.isArray(loggerHandler) ? loggerHandler : [loggerHandler];
    return (STATUS_PRIORITIES[status] >= STATUS_PRIORITIES[logger.getLevel()] && (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.includes)(sanitizedHandlerType, handlerType));
}
//# sourceMappingURL=loggerCollection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/networkError/networkErrorCollection.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsCollection/networkError/networkErrorCollection.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeFetchErrorText": () => (/* binding */ computeFetchErrorText),
/* harmony export */   "computeFetchResponseText": () => (/* binding */ computeFetchResponseText),
/* harmony export */   "computeXhrResponseData": () => (/* binding */ computeXhrResponseData),
/* harmony export */   "startNetworkErrorCollection": () => (/* binding */ startNetworkErrorCollection)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/browser/xhrObservable.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/browser/fetchObservable.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/tracekit/computeStackTrace.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/monitor.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");


function startNetworkErrorCollection(configuration, lifeCycle) {
    if (!configuration.forwardErrorsToLogs) {
        return { stop: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.noop };
    }
    var xhrSubscription = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.initXhrObservable)().subscribe(function (context) {
        if (context.state === 'complete') {
            handleCompleteRequest("xhr" /* XHR */, context);
        }
    });
    var fetchSubscription = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.initFetchObservable)().subscribe(function (context) {
        if (context.state === 'complete') {
            handleCompleteRequest("fetch" /* FETCH */, context);
        }
    });
    function handleCompleteRequest(type, request) {
        if (!configuration.isIntakeUrl(request.url) && (isRejected(request) || isServerError(request))) {
            if ('xhr' in request) {
                computeXhrResponseData(request.xhr, configuration, onResponseDataAvailable);
            }
            else if (request.response) {
                computeFetchResponseText(request.response, configuration, onResponseDataAvailable);
            }
            else if (request.error) {
                computeFetchErrorText(request.error, configuration, onResponseDataAvailable);
            }
        }
        function onResponseDataAvailable(responseData) {
            lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
                rawLogsEvent: {
                    message: "".concat(format(type), " error ").concat(request.method, " ").concat(request.url),
                    date: request.startClocks.timeStamp,
                    error: {
                        origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.NETWORK,
                        stack: responseData || 'Failed to load',
                    },
                    http: {
                        method: request.method,
                        status_code: request.status,
                        url: request.url,
                    },
                    status: _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
                    origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.NETWORK,
                },
            });
        }
    }
    return {
        stop: function () {
            xhrSubscription.unsubscribe();
            fetchSubscription.unsubscribe();
        },
    };
}
// TODO: ideally, computeXhrResponseData should always call the callback with a string instead of
// `unknown`. But to keep backward compatibility, in the case of XHR with a `responseType` different
// than "text", the response data should be whatever `xhr.response` is. This is a bit confusing as
// Logs event 'stack' is expected to be a string. This should be changed in a future major version
// as it could be a breaking change.
function computeXhrResponseData(xhr, configuration, callback) {
    if (typeof xhr.response === 'string') {
        callback(truncateResponseText(xhr.response, configuration));
    }
    else {
        callback(xhr.response);
    }
}
function computeFetchErrorText(error, configuration, callback) {
    callback(truncateResponseText((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.toStackTraceString)((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.computeStackTrace)(error)), configuration));
}
function computeFetchResponseText(response, configuration, callback) {
    if (!window.TextDecoder) {
        // If the browser doesn't support TextDecoder, let's read the whole response then truncate it.
        //
        // This should only be the case on early versions of Edge (before they migrated to Chromium).
        // Even if it could be possible to implement a workaround for the missing TextDecoder API (using
        // a Blob and FileReader), we found another issue preventing us from reading only the first
        // bytes from the response: contrary to other browsers, when reading from the cloned response,
        // if the original response gets canceled, the cloned response is also canceled and we can't
        // know about it.  In the following illustration, the promise returned by `reader.read()` may
        // never be fulfilled:
        //
        // fetch('/').then((response) => {
        //   const reader = response.clone().body.getReader()
        //   readMore()
        //   function readMore() {
        //     reader.read().then(
        //       (result) => {
        //         if (result.done) {
        //           console.log('done')
        //         } else {
        //           readMore()
        //         }
        //       },
        //       () => console.log('error')
        //     )
        //   }
        //   response.body.getReader().cancel()
        // })
        response
            .clone()
            .text()
            .then((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.monitor)(function (text) { return callback(truncateResponseText(text, configuration)); }), (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.monitor)(function (error) { return callback("Unable to retrieve response: ".concat(error)); }));
    }
    else if (!response.body) {
        callback();
    }
    else {
        truncateResponseStream(response.clone().body, configuration.requestErrorResponseLengthLimit, function (error, responseText) {
            if (error) {
                callback("Unable to retrieve response: ".concat(error));
            }
            else {
                callback(responseText);
            }
        });
    }
}
function isRejected(request) {
    return request.status === 0 && request.responseType !== 'opaque';
}
function isServerError(request) {
    return request.status >= 500;
}
function truncateResponseText(responseText, configuration) {
    if (responseText.length > configuration.requestErrorResponseLengthLimit) {
        return "".concat(responseText.substring(0, configuration.requestErrorResponseLengthLimit), "...");
    }
    return responseText;
}
function format(type) {
    if ("xhr" /* XHR */ === type) {
        return 'XHR';
    }
    return 'Fetch';
}
function truncateResponseStream(stream, limit, callback) {
    readLimitedAmountOfBytes(stream, limit, function (error, bytes, limitExceeded) {
        if (error) {
            callback(error);
        }
        else {
            var responseText = new TextDecoder().decode(bytes);
            if (limitExceeded) {
                responseText += '...';
            }
            callback(undefined, responseText);
        }
    });
}
/**
 * Read bytes from a ReadableStream until at least `limit` bytes have been read (or until the end of
 * the stream). The callback is invoked with the at most `limit` bytes, and indicates that the limit
 * has been exceeded if more bytes were available.
 */
function readLimitedAmountOfBytes(stream, limit, callback) {
    var reader = stream.getReader();
    var chunks = [];
    var readBytesCount = 0;
    readMore();
    function readMore() {
        reader.read().then((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.monitor)(function (result) {
            if (result.done) {
                onDone();
                return;
            }
            chunks.push(result.value);
            readBytesCount += result.value.length;
            if (readBytesCount > limit) {
                onDone();
            }
            else {
                readMore();
            }
        }), (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_6__.monitor)(function (error) { return callback(error); }));
    }
    function onDone() {
        reader.cancel().catch(
        // we don't care if cancel fails, but we still need to catch the error to avoid reporting it
        // as an unhandled rejection
        _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.noop);
        var completeBuffer;
        if (chunks.length === 1) {
            // optim: if the response is small enough to fit in a single buffer (provided by the browser), just
            // use it directly.
            completeBuffer = chunks[0];
        }
        else {
            // else, we need to copy buffers into a larger buffer to concatenate them.
            completeBuffer = new Uint8Array(readBytesCount);
            var offset_1 = 0;
            chunks.forEach(function (chunk) {
                completeBuffer.set(chunk, offset_1);
                offset_1 += chunk.length;
            });
        }
        callback(undefined, completeBuffer.slice(0, limit), completeBuffer.length > limit);
    }
}
//# sourceMappingURL=networkErrorCollection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/report/reportCollection.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsCollection/report/reportCollection.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startReportCollection": () => (/* binding */ startReportCollection)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/report/reportObservable.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/timeUtils.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");
var _a;


var LogStatusForReport = (_a = {},
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.RawReportType.cspViolation] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.RawReportType.intervention] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
    _a[_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.RawReportType.deprecation] = _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.warn,
    _a);
function startReportCollection(configuration, lifeCycle) {
    var reportSubscription = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.initReportObservable)(configuration.forwardReports).subscribe(function (report) {
        var message = report.message;
        var status = LogStatusForReport[report.type];
        var error;
        if (status === _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error) {
            error = {
                kind: report.subtype,
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.REPORT,
                stack: report.stack,
            };
        }
        else if (report.stack) {
            message += " Found in ".concat((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.getFileFromStackTraceString)(report.stack));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.timeStampNow)(),
                message: message,
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.REPORT,
                error: error,
                status: status,
            },
        });
    });
    return {
        stop: function () {
            reportSubscription.unsubscribe();
        },
    };
}
//# sourceMappingURL=reportCollection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsCollection/runtimeError/runtimeErrorCollection.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsCollection/runtimeError/runtimeErrorCollection.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRuntimeErrorCollection": () => (/* binding */ startRuntimeErrorCollection)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/observable.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/error/trackRuntimeError.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");


function startRuntimeErrorCollection(configuration, lifeCycle) {
    if (!configuration.forwardErrorsToLogs) {
        return { stop: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.noop };
    }
    var rawErrorObservable = new _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.Observable();
    var stopRuntimeErrorTracking = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.trackRuntimeError)(rawErrorObservable).stop;
    var rawErrorSubscription = rawErrorObservable.subscribe(function (rawError) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                message: rawError.message,
                date: rawError.startClocks.timeStamp,
                error: {
                    kind: rawError.type,
                    origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.SOURCE,
                    stack: rawError.stack,
                },
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.ErrorSource.SOURCE,
                status: _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
            },
        });
    });
    return {
        stop: function () {
            stopRuntimeErrorTracking();
            rawErrorSubscription.unsubscribe();
        },
    };
}
//# sourceMappingURL=runtimeErrorCollection.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/logsSessionManager.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/logsSessionManager.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOGS_SESSION_KEY": () => (/* binding */ LOGS_SESSION_KEY),
/* harmony export */   "startLogsSessionManager": () => (/* binding */ startLogsSessionManager),
/* harmony export */   "startLogsSessionManagerStub": () => (/* binding */ startLogsSessionManagerStub)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/domain/session/sessionManager.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");

var LOGS_SESSION_KEY = 'logs';
function startLogsSessionManager(configuration) {
    var sessionManager = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.startSessionManager)(configuration.cookieOptions, LOGS_SESSION_KEY, function (rawTrackingType) {
        return computeSessionState(configuration, rawTrackingType);
    });
    return {
        findTrackedSession: function (startTime) {
            var session = sessionManager.findActiveSession(startTime);
            return session && session.trackingType === "1" /* TRACKED */
                ? {
                    id: session.id,
                }
                : undefined;
        },
    };
}
function startLogsSessionManagerStub(configuration) {
    var isTracked = computeTrackingType(configuration) === "1" /* TRACKED */;
    var session = isTracked ? {} : undefined;
    return {
        findTrackedSession: function () { return session; },
    };
}
function computeTrackingType(configuration) {
    if (!(0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.performDraw)(configuration.sampleRate)) {
        return "0" /* NOT_TRACKED */;
    }
    return "1" /* TRACKED */;
}
function computeSessionState(configuration, rawSessionType) {
    var trackingType = hasValidLoggerSession(rawSessionType) ? rawSessionType : computeTrackingType(configuration);
    return {
        trackingType: trackingType,
        isTracked: trackingType === "1" /* TRACKED */,
    };
}
function hasValidLoggerSession(trackingType) {
    return trackingType === "0" /* NOT_TRACKED */ || trackingType === "1" /* TRACKED */;
}
//# sourceMappingURL=logsSessionManager.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/domain/reportAgentError.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/domain/reportAgentError.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportAgentError": () => (/* binding */ reportAgentError)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/error.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");


function reportAgentError(error, lifeCycle) {
    lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
        rawLogsEvent: {
            message: error.message,
            date: error.startClocks.timeStamp,
            error: {
                origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ErrorSource.AGENT, // Todo: Remove in the next major release
            },
            origin: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ErrorSource.AGENT,
            status: _logger__WEBPACK_IMPORTED_MODULE_0__.StatusType.error,
        },
    });
}
//# sourceMappingURL=reportAgentError.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/entries/main.js":
/*!****************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/entries/main.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandlerType": () => (/* reexport safe */ _domain_logger__WEBPACK_IMPORTED_MODULE_2__.HandlerType),
/* harmony export */   "Logger": () => (/* reexport safe */ _domain_logger__WEBPACK_IMPORTED_MODULE_2__.Logger),
/* harmony export */   "StatusType": () => (/* reexport safe */ _domain_logger__WEBPACK_IMPORTED_MODULE_2__.StatusType),
/* harmony export */   "datadogLogs": () => (/* binding */ datadogLogs)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/boot/init.js");
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/tools/utils.js");
/* harmony import */ var _boot_logsPublicApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../boot/logsPublicApi */ "./node_modules/@datadog/browser-logs/esm/boot/logsPublicApi.js");
/* harmony import */ var _boot_startLogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../boot/startLogs */ "./node_modules/@datadog/browser-logs/esm/boot/startLogs.js");
/* harmony import */ var _domain_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/logger */ "./node_modules/@datadog/browser-logs/esm/domain/logger.js");




var datadogLogs = (0,_boot_logsPublicApi__WEBPACK_IMPORTED_MODULE_0__.makeLogsPublicApi)(_boot_startLogs__WEBPACK_IMPORTED_MODULE_1__.startLogs);
(0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.defineGlobal)((0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__.getGlobalObject)(), 'DD_LOGS', datadogLogs);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/transport/startLogsBatch.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/transport/startLogsBatch.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startLogsBatch": () => (/* binding */ startLogsBatch)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/transport/startBatchWithReplica.js");

function startLogsBatch(configuration, lifeCycle) {
    var _a;
    var batch = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.startBatchWithReplica)(configuration, configuration.logsEndpointBuilder, (_a = configuration.replica) === null || _a === void 0 ? void 0 : _a.logsEndpointBuilder);
    lifeCycle.subscribe(1 /* LOG_COLLECTED */, function (serverLogsEvent) {
        batch.add(serverLogsEvent);
    });
}
//# sourceMappingURL=startLogsBatch.js.map

/***/ }),

/***/ "./node_modules/@datadog/browser-logs/esm/transport/startLogsBridge.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@datadog/browser-logs/esm/transport/startLogsBridge.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startLogsBridge": () => (/* binding */ startLogsBridge)
/* harmony export */ });
/* harmony import */ var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-core */ "./node_modules/@datadog/browser-core/esm/transport/eventBridge.js");

function startLogsBridge(lifeCycle) {
    var bridge = (0,_datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.getEventBridge)();
    lifeCycle.subscribe(1 /* LOG_COLLECTED */, function (serverLogsEvent) {
        bridge.send('log', serverLogsEvent);
    });
}
//# sourceMappingURL=startLogsBridge.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/ajv.js":
/*!**************************************!*\
  !*** ./node_modules/ajv/dist/ajv.js ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const draft7MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-07.json */ "./node_modules/ajv/dist/refs/json-schema-draft-07.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
//# sourceMappingURL=ajv.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/code.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/code.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
const scope_1 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
var code_2 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return code_2._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return code_2.str; } }));
Object.defineProperty(exports, "strConcat", ({ enumerable: true, get: function () { return code_2.strConcat; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return code_2.nil; } }));
Object.defineProperty(exports, "getProperty", ({ enumerable: true, get: function () { return code_2.getProperty; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return code_2.stringify; } }));
Object.defineProperty(exports, "regexpCode", ({ enumerable: true, get: function () { return code_2.regexpCode; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return code_2.Name; } }));
var scope_2 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return scope_2.Scope; } }));
Object.defineProperty(exports, "ValueScope", ({ enumerable: true, get: function () { return scope_2.ValueScope; } }));
Object.defineProperty(exports, "ValueScopeName", ({ enumerable: true, get: function () { return scope_2.ValueScopeName; } }));
Object.defineProperty(exports, "varKinds", ({ enumerable: true, get: function () { return scope_2.varKinds; } }));
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/scope.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/scope.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/errors.js":
/*!*************************************************!*\
  !*** ./node_modules/ajv/dist/compile/errors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/index.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const validation_error_1 = __webpack_require__(/*! ../runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const validate_1 = __webpack_require__(/*! ./validate */ "./node_modules/ajv/dist/compile/validate/index.js");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/names.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/names.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports["default"] = names;
//# sourceMappingURL=names.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/ref_error.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/compile/ref_error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports["default"] = MissingRefError;
//# sourceMappingURL=ref_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/resolve.js":
/*!**************************************************!*\
  !*** ./node_modules/ajv/dist/compile/resolve.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
const traverse = __webpack_require__(/*! json-schema-traverse */ "./node_modules/json-schema-traverse/index.js");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(resolver, id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/rules.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/rules.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/util.js":
/*!***********************************************!*\
  !*** ./node_modules/ajv/dist/compile/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const code_1 = __webpack_require__(/*! ./codegen/code */ "./node_modules/ajv/dist/compile/codegen/code.js");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/applicability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/applicability.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/boolSchema.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/boolSchema.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}
//# sourceMappingURL=boolSchema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/dataType.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/dataType.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __webpack_require__(/*! ../rules */ "./node_modules/ajv/dist/compile/rules.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}
//# sourceMappingURL=dataType.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/defaults.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignDefaults = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __webpack_require__(/*! ./boolSchema */ "./node_modules/ajv/dist/compile/validate/boolSchema.js");
const dataType_1 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const dataType_2 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/ajv/dist/compile/validate/defaults.js");
const keyword_1 = __webpack_require__(/*! ./keyword */ "./node_modules/ajv/dist/compile/validate/keyword.js");
const subschema_1 = __webpack_require__(/*! ./subschema */ "./node_modules/ajv/dist/compile/validate/subschema.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ../resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/keyword.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/keyword.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const code_1 = __webpack_require__(/*! ../../vocabularies/code */ "./node_modules/ajv/dist/vocabularies/code.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/subschema.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/subschema.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/core.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/core.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
const validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const rules_1 = __webpack_require__(/*! ./compile/rules */ "./node_modules/ajv/dist/compile/rules.js");
const compile_1 = __webpack_require__(/*! ./compile */ "./node_modules/ajv/dist/compile/index.js");
const codegen_2 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const resolve_1 = __webpack_require__(/*! ./compile/resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const dataType_1 = __webpack_require__(/*! ./compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const util_1 = __webpack_require__(/*! ./compile/util */ "./node_modules/ajv/dist/compile/util.js");
const $dataRefSchema = __webpack_require__(/*! ./refs/data.json */ "./node_modules/ajv/dist/refs/data.json");
const uri_1 = __webpack_require__(/*! ./runtime/uri */ "./node_modules/ajv/dist/runtime/uri.js");
const defaultRegExp = (str, flags) => new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports["default"] = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/equal.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/equal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/ajv-validator/ajv/issues/889
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports["default"] = equal;
//# sourceMappingURL=equal.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/ucs2length.js":
/*!*****************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/ucs2length.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports["default"] = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/uri.js":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/runtime/uri.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const uri = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports["default"] = uri;
//# sourceMappingURL=uri.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/validation_error.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/validation_error.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports["default"] = ValidationError;
//# sourceMappingURL=validation_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAdditionalItems = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports["default"] = def;
//# sourceMappingURL=additionalItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=additionalProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/allOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports["default"] = def;
//# sourceMappingURL=allOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/anyOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports["default"] = def;
//# sourceMappingURL=anyOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/contains.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/contains.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined)
                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
        }
        else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=contains.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependencies.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports["default"] = def;
//# sourceMappingURL=dependencies.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/if.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/if.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports["default"] = def;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const prefixItems_1 = __webpack_require__(/*! ./prefixItems */ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js");
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const items2020_1 = __webpack_require__(/*! ./items2020 */ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js");
const contains_1 = __webpack_require__(/*! ./contains */ "./node_modules/ajv/dist/vocabularies/applicator/contains.js");
const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const propertyNames_1 = __webpack_require__(/*! ./propertyNames */ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const properties_1 = __webpack_require__(/*! ./properties */ "./node_modules/ajv/dist/vocabularies/applicator/properties.js");
const patternProperties_1 = __webpack_require__(/*! ./patternProperties */ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js");
const not_1 = __webpack_require__(/*! ./not */ "./node_modules/ajv/dist/vocabularies/applicator/not.js");
const anyOf_1 = __webpack_require__(/*! ./anyOf */ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js");
const oneOf_1 = __webpack_require__(/*! ./oneOf */ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js");
const allOf_1 = __webpack_require__(/*! ./allOf */ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js");
const if_1 = __webpack_require__(/*! ./if */ "./node_modules/ajv/dist/vocabularies/applicator/if.js");
const thenElse_1 = __webpack_require__(/*! ./thenElse */ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports["default"] = getApplicator;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateTuple = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports["default"] = def;
//# sourceMappingURL=items.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items2020.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports["default"] = def;
//# sourceMappingURL=items2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/not.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/not.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports["default"] = def;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/oneOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=oneOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const util_2 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=patternProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports["default"] = def;
//# sourceMappingURL=prefixItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/properties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/properties.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_1 = __webpack_require__(/*! ../../compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js":
/*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports["default"] = def;
//# sourceMappingURL=propertyNames.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/thenElse.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports["default"] = def;
//# sourceMappingURL=thenElse.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/code.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/code.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __webpack_require__(/*! ../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_2 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._) `new RegExp`;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/id.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/id.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports["default"] = def;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const id_1 = __webpack_require__(/*! ./id */ "./node_modules/ajv/dist/vocabularies/core/id.js");
const ref_1 = __webpack_require__(/*! ./ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports["default"] = core;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/ref.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/ref.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __webpack_require__(/*! ../../compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports["default"] = def;
//# sourceMappingURL=ref.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const types_1 = __webpack_require__(/*! ../discriminator/types */ "./node_modules/ajv/dist/vocabularies/discriminator/types.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                    if (sch instanceof compile_1.SchemaEnv)
                        sch = sch.schema;
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/draft7.js":
/*!******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft7.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports["default"] = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/format.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/format.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/index.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/format.js");
const format = [format_1.default];
exports["default"] = format;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/metadata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/const.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/const.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=const.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/enum.js":
/*!***************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/enum.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js");
const multipleOf_1 = __webpack_require__(/*! ./multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
const limitLength_1 = __webpack_require__(/*! ./limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
const pattern_1 = __webpack_require__(/*! ./pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
const limitProperties_1 = __webpack_require__(/*! ./limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
const required_1 = __webpack_require__(/*! ./required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
const limitItems_1 = __webpack_require__(/*! ./limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
const uniqueItems_1 = __webpack_require__(/*! ./uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
const const_1 = __webpack_require__(/*! ./const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
const enum_1 = __webpack_require__(/*! ./enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports["default"] = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitItems.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitLength.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const ucs2length_1 = __webpack_require__(/*! ../../runtime/ucs2length */ "./node_modules/ajv/dist/runtime/ucs2length.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitLength.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitNumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitProperties.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/multipleOf.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports["default"] = def;
//# sourceMappingURL=multipleOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/pattern.js":
/*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/pattern.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=pattern.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/required.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/required.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=required.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dataType_1 = __webpack_require__(/*! ../../compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=uniqueItems.js.map

/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/json-schema-traverse/index.js":
/*!****************************************************!*\
  !*** ./node_modules/json-schema-traverse/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


/***/ }),

/***/ "./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.action.ts":
/*!**********************************************************************************************!*\
  !*** ./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.action.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addOrderCustomAttributes": () => (/* binding */ addOrderCustomAttributes)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _add_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-order-custom-attributes.schema */ "./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.schema.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const AddOrderCustomAttributes = function (data) {
    return new Promise((resolve, reject) => {
        const validate = (0,_add_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.addOrderCustomAttributesSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].ADD_ORDER_CUSTOM_ATTRIBUTES, data)
                .then((data) => {
                if (typeof data.value === 'string') {
                    try {
                        resolve(JSON.parse(data.value));
                    }
                    catch (err) {
                        reject({
                            code: 1102,
                            type: 'Internal SDK Error',
                            message: 'Order Custom Attributes parse failed',
                        });
                    }
                }
                else {
                    resolve(data.value);
                }
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_add_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.addOrderCustomAttributesSchema.errors) {
                const error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_add_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.addOrderCustomAttributesSchema.errors);
                reject(error);
            }
        }
    });
};
const addOrderCustomArrtibutesBuilder = function () {
    let orderCustomAttributes;
    return {
        setOrderCustomAttributes(value) {
            orderCustomAttributes = value;
            return this;
        },
        exec() {
            if (!orderCustomAttributes) {
                const error = {
                    code: 1101,
                    message: 'Parameter\'s Value Empty',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return AddOrderCustomAttributes({
                orderCustomAttributes,
            });
        },
    };
};
const addOrderCustomAttributes = function () {
    return new addOrderCustomArrtibutesBuilder();
};


/***/ }),

/***/ "./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.schema.ts":
/*!**********************************************************************************************!*\
  !*** ./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.schema.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addOrderCustomAttributesSchema": () => (/* binding */ addOrderCustomAttributesSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        orderCustomAttributes: { type: 'object', nullable: true },
    },
    required: [],
    additionalProperties: false,
};
const addOrderCustomAttributesSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-actions/commonActions.ts":
/*!*********************************************!*\
  !*** ./src/common-actions/commonActions.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addOrderCustomAttributes": () => (/* reexport safe */ _add_order_custom_attributes_add_order_custom_attributes_action__WEBPACK_IMPORTED_MODULE_4__.addOrderCustomAttributes),
/* harmony export */   "destroyWebView": () => (/* reexport safe */ _destroy_webview_destroy_webview_action__WEBPACK_IMPORTED_MODULE_3__.destroyWebView),
/* harmony export */   "getVar": () => (/* reexport safe */ _get_var_getVar_action__WEBPACK_IMPORTED_MODULE_1__.getVar),
/* harmony export */   "removeOrderCustomAttributes": () => (/* reexport safe */ _remove_order_custom_attributes_remove_order_custom_attributes_action__WEBPACK_IMPORTED_MODULE_5__.removeOrderCustomAttributes),
/* harmony export */   "setVar": () => (/* reexport safe */ _set_var_setVar_action__WEBPACK_IMPORTED_MODULE_0__.setVar),
/* harmony export */   "showToastMessage": () => (/* reexport safe */ _show_toast_message_showToastMessage_action__WEBPACK_IMPORTED_MODULE_2__.showToastMessage)
/* harmony export */ });
/* harmony import */ var _set_var_setVar_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-var/setVar.action */ "./src/common-actions/set-var/setVar.action.ts");
/* harmony import */ var _get_var_getVar_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-var/getVar.action */ "./src/common-actions/get-var/getVar.action.ts");
/* harmony import */ var _show_toast_message_showToastMessage_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./show-toast-message/showToastMessage.action */ "./src/common-actions/show-toast-message/showToastMessage.action.ts");
/* harmony import */ var _destroy_webview_destroy_webview_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./destroy-webview/destroy-webview.action */ "./src/common-actions/destroy-webview/destroy-webview.action.ts");
/* harmony import */ var _add_order_custom_attributes_add_order_custom_attributes_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-order-custom-attributes/add-order-custom-attributes.action */ "./src/common-actions/add-order-custom-attributes/add-order-custom-attributes.action.ts");
/* harmony import */ var _remove_order_custom_attributes_remove_order_custom_attributes_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remove-order-custom-attributes/remove-order-custom-attributes.action */ "./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.action.ts");








/***/ }),

/***/ "./src/common-actions/destroy-webview/destroy-webview.action.ts":
/*!**********************************************************************!*\
  !*** ./src/common-actions/destroy-webview/destroy-webview.action.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destroyWebView": () => (/* binding */ destroyWebView)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _destroy_webview_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./destroy-webview.schema */ "./src/common-actions/destroy-webview/destroy-webview.schema.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const DestroyWebView = function (id, codeBlockId) {
    return new Promise((resolve, reject) => {
        let data = {
            id,
            codeBlockId
        };
        const validate = (0,_destroy_webview_schema__WEBPACK_IMPORTED_MODULE_2__.destroyWebViewSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].DESTROY_WEB_VIEW, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_destroy_webview_schema__WEBPACK_IMPORTED_MODULE_2__.destroyWebViewSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_destroy_webview_schema__WEBPACK_IMPORTED_MODULE_2__.destroyWebViewSchema.errors);
                reject(error);
            }
        }
    });
};
const destroyWebViewBuilder = function () {
    let id;
    let codeBlockId;
    return {
        setId(value) {
            id = value;
            return this;
        },
        setCodeBlockId(value) {
            codeBlockId = value;
            return this;
        },
        exec() {
            if (!id && !codeBlockId) {
                let error = {
                    code: 1101,
                    message: "Parameter's Value Empty",
                    type: 'Internal SDK Error'
                };
                return Promise.reject(error);
            }
            return DestroyWebView(id, codeBlockId);
        }
    };
};
const destroyWebView = function () {
    return new destroyWebViewBuilder();
};


/***/ }),

/***/ "./src/common-actions/destroy-webview/destroy-webview.schema.ts":
/*!**********************************************************************!*\
  !*** ./src/common-actions/destroy-webview/destroy-webview.schema.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destroyWebViewSchema": () => (/* binding */ destroyWebViewSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        id: { type: 'string', nullable: false },
        codeBlockId: { type: 'string', nullable: false }
    },
    required: ['id', 'codeBlockId'],
    additionalProperties: false
};
const destroyWebViewSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-actions/get-var/getVar.action.ts":
/*!*****************************************************!*\
  !*** ./src/common-actions/get-var/getVar.action.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVar": () => (/* binding */ getVar)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _getVar_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getVar.schema */ "./src/common-actions/get-var/getVar.schema.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const GetVar = function (key) {
    return new Promise((resolve, reject) => {
        let data = {
            key
        };
        const validate = (0,_getVar_schema__WEBPACK_IMPORTED_MODULE_2__.getVarSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].GET_VAR, data)
                .then((data) => {
                if (typeof data.value === 'string') {
                    try {
                        resolve(JSON.parse(data.value));
                    }
                    catch (err) {
                        reject({
                            code: 1102,
                            type: 'Internal SDK Error',
                            message: 'Getter value parse failed'
                        });
                    }
                }
                else {
                    resolve(data.value);
                }
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_getVar_schema__WEBPACK_IMPORTED_MODULE_2__.getVarSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_getVar_schema__WEBPACK_IMPORTED_MODULE_2__.getVarSchema.errors);
                reject(error);
            }
        }
    });
};
const getVarBuilder = function () {
    let name;
    return {
        setGetVar(value) {
            name = value;
            return this;
        },
        exec() {
            if (!name) {
                let error = {
                    code: 1101,
                    message: "Parameter's Value Empty",
                    type: 'Internal SDK Error'
                };
                return Promise.reject(error);
            }
            return GetVar(name);
        }
    };
};
const getVar = function () {
    return new getVarBuilder();
};


/***/ }),

/***/ "./src/common-actions/get-var/getVar.schema.ts":
/*!*****************************************************!*\
  !*** ./src/common-actions/get-var/getVar.schema.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVarSchema": () => (/* binding */ getVarSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        key: { type: 'string', nullable: false }
    },
    required: ['key'],
    additionalProperties: false
};
const getVarSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.action.ts":
/*!****************************************************************************************************!*\
  !*** ./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.action.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeOrderCustomAttributes": () => (/* binding */ removeOrderCustomAttributes)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _remove_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./remove-order-custom-attributes.schema */ "./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.schema.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const RemoveOrderCustomAttributes = function (data) {
    return new Promise((resolve, reject) => {
        const validate = (0,_remove_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.removeOrderCustomAttributesSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_ORDER_CUSTOM_ATTRIBUTES, data)
                .then((data) => {
                if (typeof data.value === 'string') {
                    try {
                        resolve(JSON.parse(data.value));
                    }
                    catch (err) {
                        reject({
                            code: 1102,
                            type: 'Internal SDK Error',
                            message: 'Order Custom Attributes parse failed',
                        });
                    }
                }
                else {
                    resolve(data.value);
                }
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_remove_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.removeOrderCustomAttributesSchema.errors) {
                const error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_remove_order_custom_attributes_schema__WEBPACK_IMPORTED_MODULE_2__.removeOrderCustomAttributesSchema.errors);
                reject(error);
            }
        }
    });
};
const removeOrderCustomArrtibutesBuilder = function () {
    let orderCustomAttributes;
    return {
        setOrderCustomAttributes(value) {
            orderCustomAttributes = value;
            return this;
        },
        exec() {
            if (!orderCustomAttributes) {
                const error = {
                    code: 1101,
                    message: 'Parameter\'s Value Empty',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return RemoveOrderCustomAttributes({
                orderCustomAttributes,
            });
        },
    };
};
const removeOrderCustomAttributes = function () {
    return new removeOrderCustomArrtibutesBuilder();
};


/***/ }),

/***/ "./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.schema.ts":
/*!****************************************************************************************************!*\
  !*** ./src/common-actions/remove-order-custom-attributes/remove-order-custom-attributes.schema.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeOrderCustomAttributesSchema": () => (/* binding */ removeOrderCustomAttributesSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        orderCustomAttributes: { type: 'object', nullable: true },
    },
    required: [],
    additionalProperties: false,
};
const removeOrderCustomAttributesSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-actions/set-var/setVar.action.ts":
/*!*****************************************************!*\
  !*** ./src/common-actions/set-var/setVar.action.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setVar": () => (/* binding */ setVar)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _setVar_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setVar.schema */ "./src/common-actions/set-var/setVar.schema.ts");




const SetVar = function (key, value, lifeTime) {
    return new Promise((resolve, reject) => {
        let valueStr = JSON.stringify(value);
        let data = {
            key,
            value: valueStr,
            lifeTime,
        };
        const validate = (0,_setVar_schema__WEBPACK_IMPORTED_MODULE_3__.setVarSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].SET_VAR, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_setVar_schema__WEBPACK_IMPORTED_MODULE_3__.setVarSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_setVar_schema__WEBPACK_IMPORTED_MODULE_3__.setVarSchema.errors);
                reject(error);
            }
        }
    });
};
const setVarBuilder = function () {
    let key;
    let value;
    let lifeTime;
    return {
        setKey(value) {
            key = value;
            return this;
        },
        setValue(val) {
            value = val;
            return this;
        },
        setLifeTime(value) {
            lifeTime = value;
            return this;
        },
        exec() {
            if (!key && !value) {
                let error = {
                    code: 1101,
                    message: "Parameter's Value Empty",
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return SetVar(key, value, lifeTime);
        },
    };
};
const setVar = function () {
    return new setVarBuilder();
};


/***/ }),

/***/ "./src/common-actions/set-var/setVar.schema.ts":
/*!*****************************************************!*\
  !*** ./src/common-actions/set-var/setVar.schema.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "setVarSchema": () => (/* binding */ setVarSchema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var LifeTime;
(function (LifeTime) {
    LifeTime["SHORT"] = "SHORT";
    LifeTime["LONG"] = "LONG";
})(LifeTime || (LifeTime = {}));
const schema = {
    type: 'object',
    properties: {
        key: { type: 'string', nullable: false },
        value: { type: 'string', nullable: true },
        lifeTime: { type: 'string', nullable: false }
    },
    required: ['key'],
    additionalProperties: false
};
const setVarSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-actions/show-toast-message/showToastMessage.action.ts":
/*!**************************************************************************!*\
  !*** ./src/common-actions/show-toast-message/showToastMessage.action.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showToastMessage": () => (/* binding */ showToastMessage)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _showToastMessage_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./showToastMessage.schema */ "./src/common-actions/show-toast-message/showToastMessage.schema.ts");




const ShowToastMessage = function (message) {
    return new Promise((resolve, reject) => {
        let data = {
            message,
        };
        const validate = (0,_showToastMessage_schema__WEBPACK_IMPORTED_MODULE_3__.showToastMessageSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_TOAST_MESSAGE, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_showToastMessage_schema__WEBPACK_IMPORTED_MODULE_3__.showToastMessageSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_showToastMessage_schema__WEBPACK_IMPORTED_MODULE_3__.showToastMessageSchema.errors);
                reject(error);
            }
        }
    });
};
const showToastMessageBuilder = function () {
    let message;
    return {
        setMessage(value) {
            message = value;
            return this;
        },
        exec() {
            if (!message) {
                let error = {
                    code: 1101,
                    message: 'error message is empty',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return ShowToastMessage(message);
        },
    };
};
const showToastMessage = function () {
    return new showToastMessageBuilder();
};


/***/ }),

/***/ "./src/common-actions/show-toast-message/showToastMessage.schema.ts":
/*!**************************************************************************!*\
  !*** ./src/common-actions/show-toast-message/showToastMessage.schema.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "showToastMessageSchema": () => (/* binding */ showToastMessageSchema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        message: { type: 'string', nullable: false },
    },
    required: ['message'],
    additionalProperties: false,
};
const showToastMessageSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/common-triggers/cart-cleared/cartCleared.ts":
/*!*********************************************************!*\
  !*** ./src/common-triggers/cart-cleared/cartCleared.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cartCleared": () => (/* binding */ cartCleared)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const cartCleared = (appContext) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].CART_CLEARED, [appContext], { appContext });
};


/***/ }),

/***/ "./src/common-triggers/checkout-completed/checkoutCompleted.ts":
/*!*********************************************************************!*\
  !*** ./src/common-triggers/checkout-completed/checkoutCompleted.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkoutCompleted": () => (/* binding */ checkoutCompleted)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const checkoutCompleted = (appContext) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].CHECKOUT_COMPLETED, [appContext], { appContext });
};


/***/ }),

/***/ "./src/common-triggers/commonTriggers.ts":
/*!***********************************************!*\
  !*** ./src/common-triggers/commonTriggers.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cartCleared": () => (/* reexport safe */ _cart_cleared_cartCleared__WEBPACK_IMPORTED_MODULE_2__.cartCleared),
/* harmony export */   "checkoutCompleted": () => (/* reexport safe */ _checkout_completed_checkoutCompleted__WEBPACK_IMPORTED_MODULE_1__.checkoutCompleted),
/* harmony export */   "onCheckoutButtonClicked": () => (/* reexport safe */ _on_checkout_buttton_clicked_onCheckoutButtonClicked_trigger__WEBPACK_IMPORTED_MODULE_5__.onCheckoutButtonClicked),
/* harmony export */   "onPageLoaded": () => (/* reexport safe */ _on_page_loaded_onPageLoaded_trigger__WEBPACK_IMPORTED_MODULE_0__.onPageLoaded),
/* harmony export */   "onWebViewDestroy": () => (/* reexport safe */ _on_webview_destroy_onWebviewDestroy_trigger__WEBPACK_IMPORTED_MODULE_4__.onWebViewDestroy),
/* harmony export */   "productOptionSelected": () => (/* reexport safe */ _product_option_selected_productOptionSelected_trigger__WEBPACK_IMPORTED_MODULE_3__.productOptionSelected)
/* harmony export */ });
/* harmony import */ var _on_page_loaded_onPageLoaded_trigger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./on-page-loaded/onPageLoaded.trigger */ "./src/common-triggers/on-page-loaded/onPageLoaded.trigger.ts");
/* harmony import */ var _checkout_completed_checkoutCompleted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkout-completed/checkoutCompleted */ "./src/common-triggers/checkout-completed/checkoutCompleted.ts");
/* harmony import */ var _cart_cleared_cartCleared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart-cleared/cartCleared */ "./src/common-triggers/cart-cleared/cartCleared.ts");
/* harmony import */ var _product_option_selected_productOptionSelected_trigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-option-selected/productOptionSelected.trigger */ "./src/common-triggers/product-option-selected/productOptionSelected.trigger.ts");
/* harmony import */ var _on_webview_destroy_onWebviewDestroy_trigger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./on-webview-destroy/onWebviewDestroy.trigger */ "./src/common-triggers/on-webview-destroy/onWebviewDestroy.trigger.ts");
/* harmony import */ var _on_checkout_buttton_clicked_onCheckoutButtonClicked_trigger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./on-checkout-buttton-clicked/onCheckoutButtonClicked.trigger */ "./src/common-triggers/on-checkout-buttton-clicked/onCheckoutButtonClicked.trigger.ts");








/***/ }),

/***/ "./src/common-triggers/on-checkout-buttton-clicked/onCheckoutButtonClicked.trigger.ts":
/*!********************************************************************************************!*\
  !*** ./src/common-triggers/on-checkout-buttton-clicked/onCheckoutButtonClicked.trigger.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onCheckoutButtonClicked": () => (/* binding */ onCheckoutButtonClicked)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const onCheckoutButtonClicked = (appContext) => {
    return (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].ON_CHECKOUT_BUTTON_CLICKED, [appContext], { appContext }); // isVaild, Error Message.
};


/***/ }),

/***/ "./src/common-triggers/on-page-loaded/onPageLoaded.trigger.ts":
/*!********************************************************************!*\
  !*** ./src/common-triggers/on-page-loaded/onPageLoaded.trigger.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onPageLoaded": () => (/* binding */ onPageLoaded)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const onPageLoaded = (appContext, product) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].ON_PAGE_LOADED, [appContext, product], {
        appContext,
        product
    });
};


/***/ }),

/***/ "./src/common-triggers/on-webview-destroy/onWebviewDestroy.trigger.ts":
/*!****************************************************************************!*\
  !*** ./src/common-triggers/on-webview-destroy/onWebviewDestroy.trigger.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onWebViewDestroy": () => (/* binding */ onWebViewDestroy)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const onWebViewDestroy = (id, codeBlockId) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].ON_WEB_VIEW_DESTROY, [id, codeBlockId], {
        id,
        codeBlockId,
    });
};


/***/ }),

/***/ "./src/common-triggers/product-option-selected/productOptionSelected.trigger.ts":
/*!**************************************************************************************!*\
  !*** ./src/common-triggers/product-option-selected/productOptionSelected.trigger.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productOptionSelected": () => (/* binding */ productOptionSelected)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../communications/listeners */ "./src/communications/listeners.ts");


const productOptionSelected = (appContext, product, productVariant) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].PRODUCT_OPTION_SELECTED, [appContext, product, productVariant], {
        appContext,
        product,
        productVariant
    });
};


/***/ }),

/***/ "./src/communications/dispatcher.ts":
/*!******************************************!*\
  !*** ./src/communications/dispatcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "actionDidComplete": () => (/* binding */ actionDidComplete),
/* harmony export */   "dispatch": () => (/* binding */ dispatch)
/* harmony export */ });
/* harmony import */ var _utils_actionHub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/actionHub */ "./src/utils/actionHub.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



const actionDidComplete = (json) => {
    console.log("in actionDidComplete");
    console.log("json", json);
    const { error = null, appContext, actionId } = json, res = __rest(json, ["error", "appContext", "actionId"]);
    let dispatchHandler = (0,_utils_actionHub__WEBPACK_IMPORTED_MODULE_0__.getFromHub)(actionId);
    console.log("dispatchHandler", dispatchHandler);
    if (!dispatchHandler)
        throw {
            code: 1103,
            type: 'Internal SDK Error',
            message: 'Dispatch Handler not found'
        };
    dispatchHandler(appContext, res, error);
    (0,_utils_actionHub__WEBPACK_IMPORTED_MODULE_0__.removeFromHub)(actionId);
};
const dispatch = (action, data) => {
    console.log("dispatcher dispatch");
    console.log("action", action);
    let actionId = (0,nanoid__WEBPACK_IMPORTED_MODULE_2__.nanoid)();
    return new Promise((resolve, reject) => {
        let startTime = performance.now();
        if (window.webkit) {
            if (action === 'updateMultipleLineItemsToCart' && window.webkit.messageHandlers['updateMultipleLineItemsInCart']) {
                window.webkit.messageHandlers['updateMultipleLineItemsInCart'].postMessage(JSON.stringify(Object.assign({}, data, { actionId })));
            }
            if (window.webkit.messageHandlers[action]) {
                // For iOS
                window.webkit.messageHandlers[action].postMessage(JSON.stringify(Object.assign({}, data, { actionId })));
            }
        }
        else if (window.appInterface && window.appInterface[action]) {
            // For Android
            window.appInterface[action](JSON.stringify(Object.assign({}, data, { actionId })));
        }
        const actionDidHandler = (appContext, res, error) => {
            let endTime = performance.now();
            let duration = Math.round(endTime - startTime);
            if (error && Object.keys(error).length) {
                if (!error.type) {
                    error.type = 'App Exception';
                }
                reject(error);
                (0,_utils_logger__WEBPACK_IMPORTED_MODULE_1__.logAction)(action, data, null, error, duration);
            }
            else {
                let response = Object.assign({ appContext }, res);
                resolve(response);
                (0,_utils_logger__WEBPACK_IMPORTED_MODULE_1__.logAction)(action, data, response, null, duration);
            }
        };
        (0,_utils_actionHub__WEBPACK_IMPORTED_MODULE_0__.pushToHub)(actionId, actionDidHandler);
    });
};


/***/ }),

/***/ "./src/communications/listeners.ts":
/*!*****************************************!*\
  !*** ./src/communications/listeners.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatch": () => (/* binding */ dispatch),
/* harmony export */   "subscribe": () => (/* binding */ subscribe)
/* harmony export */ });
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");

const subscribers = {};
const subscribe = (trigger, handler) => {
    var _a;
    console.log("subscribing");
    console.log("trigger", trigger);
    console.log("handler", handler);
    if (!subscribers[trigger]) {
        subscribers[trigger] = [handler];
    }
    else {
        (_a = subscribers[trigger]) === null || _a === void 0 ? void 0 : _a.push(handler);
    }
};
const dispatch = (trigger, data, obj) => {
    console.log("listener dispatch");
    console.log("data", data);
    console.log("obj", obj);
    console.log("subscribers", subscribers);
    let handlers = subscribers[trigger];
    let returnValues = [];
    if (handlers) {
        handlers.forEach((handler) => {
            const returnValue = handler(...data);
            returnValues.push(returnValue);
            (0,_utils_logger__WEBPACK_IMPORTED_MODULE_0__.logTrigger)(trigger, obj);
        });
    }
    console.log("returnValues", returnValues);
    return returnValues;
};


/***/ }),

/***/ "./src/constants/actions.ts":
/*!**********************************!*\
  !*** ./src/constants/actions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Actions;
(function (Actions) {
    Actions["ADD_LINE_ITEM_TO_CART"] = "addLineItemToCart";
    Actions["REMOVE_LINE_ITEM_FROM_CART"] = "removeLineItemFromCart";
    Actions["UPDATE_LINE_ITEM_IN_CART"] = "updateLineItemInCart";
    Actions["SET_CODE_BLOCK_CONTENT"] = "setCodeBlockContent";
    Actions["SET_VAR"] = "setVar";
    Actions["GET_VAR"] = "getVar";
    Actions["NAVIGATE_TO"] = "navigateTo";
    Actions["SHOW_TOAST_MESSAGE"] = "showToastMessage";
    Actions["VARIANT_SELECTION"] = "variantSelection";
    Actions["PRODUCT_IMAGE_SLIDER"] = "productImageSlider";
    Actions["ADD_COUPON_CODE"] = "addCouponCode";
    Actions["REMOVE_COUPON_CODE"] = "removeCouponCode";
    Actions["UI_COMPONENTS"] = "uiComponents";
    Actions["ADD_MULTIPLE_LINE_ITEMS_TO_CART"] = "addMultipleLineItemsToCart";
    Actions["UPDATE_MULTIPLE_LINE_ITEMS_TO_CART"] = "updateMultipleLineItemsToCart";
    Actions["REMOVE_MULTIPLE_LINE_ITEMS_TO_CART"] = "removeMultipleLineItemsFromCart";
    Actions["DESTROY_WEB_VIEW"] = "destroyWebView";
    Actions["ADD_ORDER_CUSTOM_ATTRIBUTES"] = "addOrderCustomAttributes";
    Actions["REMOVE_ORDER_CUSTOM_ATTRIBUTES"] = "removeOrderCustomAttributes";
})(Actions || (Actions = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Actions);


/***/ }),

/***/ "./src/constants/triggers.ts":
/*!***********************************!*\
  !*** ./src/constants/triggers.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Triggers;
(function (Triggers) {
    Triggers["LINE_ITEM_ADDED_TO_CART"] = "LINE_ITEM_ADDED_TO_CART";
    Triggers["LINE_ITEM_UPDATED"] = "LINE_ITEM_UPDATED";
    Triggers["ON_PAGE_LOADED"] = "ON_PAGE_LOADED";
    Triggers["CHECKOUT_COMPLETED"] = "CHECKOUT_COMPLETED";
    Triggers["CART_CLEARED"] = "CART_CLEARED";
    Triggers["BULK_ACTIONS_TO_CART"] = "BULK_ACTIONS_TO_CART";
    Triggers["ON_WEB_VIEW_DESTROY"] = "ON_WEB_VIEW_DESTROY";
    Triggers["PRODUCT_OPTION_SELECTED"] = "PRODUCT_OPTION_SELECTED";
    Triggers["ON_CHECKOUT_BUTTON_CLICKED"] = "ON_CHECKOUT_BUTTON_CLICKED";
})(Triggers || (Triggers = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Triggers);


/***/ }),

/***/ "./src/methods/cart/add-coupon-code/addCouponCode.action.ts":
/*!******************************************************************!*\
  !*** ./src/methods/cart/add-coupon-code/addCouponCode.action.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCouponCode": () => (/* binding */ addCouponCode)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _addCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addCouponCode.schema */ "./src/methods/cart/add-coupon-code/addCouponCode.schema.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const AddCouponCode = function (coupon, description, showCouponValidationResult) {
    return new Promise(function (resolve, reject) {
        const data = {
            coupon,
            description,
            showCouponValidationResult,
        };
        const validate = (0,_addCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.addCouponCodeSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].ADD_COUPON_CODE, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_addCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.addCouponCodeSchema.errors) {
                const error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_addCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.addCouponCodeSchema.errors);
                reject(error);
            }
        }
    });
};
const AddCouponCodeBuilder = function () {
    let coupon;
    let description;
    let showCouponValidationResult;
    return {
        setCouponCode(value) {
            coupon = value;
            return this;
        },
        setCouponDescription(value) {
            description = value;
            return this;
        },
        setShowCouponValidationResult(value) {
            showCouponValidationResult = value;
            return this;
        },
        exec() {
            if (!coupon) {
                const error = {
                    code: 1101,
                    message: 'Coupon Code is missing',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            if (!description) {
                const error = {
                    code: 1101,
                    message: 'Coupon Description is missing',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return AddCouponCode(coupon, description, showCouponValidationResult);
        },
    };
};
const addCouponCode = function () {
    return new AddCouponCodeBuilder();
};


/***/ }),

/***/ "./src/methods/cart/add-coupon-code/addCouponCode.schema.ts":
/*!******************************************************************!*\
  !*** ./src/methods/cart/add-coupon-code/addCouponCode.schema.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCouponCodeSchema": () => (/* binding */ addCouponCodeSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        coupon: { type: 'string', nullable: false },
        description: { type: 'string', nullable: false },
        showCouponValidationResult: { type: 'boolean', nullable: false },
    },
    required: ['coupon', 'description', 'showCouponValidationResult'],
    additionalProperties: false,
};
const addCouponCodeSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.action.ts":
/*!****************************************************************************!*\
  !*** ./src/methods/cart/add-line-item-to-cart/addLineItemToCart.action.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLineItemToCart": () => (/* binding */ addLineItemToCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _addLineItemToCart_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addLineItemToCart.schema */ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.schema.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const AddLineItemToCart = function (productId, variantId, quantity, customAttributes, hiddenCustomAttributes, lineItemType, discountType, discountValue, displayText, unitPrice, freeQuantity) {
    return new Promise((resolve, reject) => {
        const data = {
            productId,
            variantId,
            quantity,
            customAttributes,
            hiddenCustomAttributes,
            lineItemType,
            discountType,
            discountValue,
            displayText,
            unitPrice,
            freeQuantity,
        };
        const validate = (0,_addLineItemToCart_schema__WEBPACK_IMPORTED_MODULE_1__.addLineItemToCartSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].ADD_LINE_ITEM_TO_CART, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_addLineItemToCart_schema__WEBPACK_IMPORTED_MODULE_1__.addLineItemToCartSchema.errors) {
                const error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_addLineItemToCart_schema__WEBPACK_IMPORTED_MODULE_1__.addLineItemToCartSchema.errors);
                reject(error);
            }
        }
    });
};
const AddLineItemToCartBuilder = function () {
    let productId;
    let variantId = null;
    let quantity = 1;
    let customAttributes = {};
    let hiddenCustomAttributes = [];
    let lineItemType = 'REGULAR';
    let unitPrice = null;
    let discountType;
    let discountValue;
    let displayText;
    let freeQuantity;
    return {
        setProductId(value) {
            productId = value;
            return this;
        },
        setVariantId(value) {
            variantId = value;
            return this;
        },
        setQuantity(value) {
            quantity = value;
            return this;
        },
        setCustomAttributes(value) {
            customAttributes = value;
            return this;
        },
        setHiddenCustomAttributes(value) {
            hiddenCustomAttributes = value;
            return this;
        },
        setLineItemType(value) {
            lineItemType = value;
            return this;
        },
        setUnitPrice(value) {
            unitPrice = value;
            return this;
        },
        setDiscountType(value) {
            discountType = value;
            return this;
        },
        setDiscountValue(value) {
            discountValue = value;
            return this;
        },
        setDisplayText(value) {
            displayText = value;
            return this;
        },
        setFreeQuantity(value) {
            freeQuantity = value;
            return this;
        },
        exec() {
            if (!productId) {
                const error = {
                    code: 1101,
                    message: 'productId is missing',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return AddLineItemToCart(productId, variantId, quantity, customAttributes, hiddenCustomAttributes, lineItemType, discountType, displayText, discountValue, unitPrice, freeQuantity);
        },
    };
};
const addLineItemToCart = function () {
    return new AddLineItemToCartBuilder();
};


/***/ }),

/***/ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.schema.ts":
/*!****************************************************************************!*\
  !*** ./src/methods/cart/add-line-item-to-cart/addLineItemToCart.schema.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLineItemToCartSchema": () => (/* binding */ addLineItemToCartSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var LineItemType;
(function (LineItemType) {
    LineItemType["REGULAR"] = "REGULAR";
    LineItemType["HIDDEN"] = "HIDDEN";
    LineItemType["READONLY"] = "READ-ONLY";
})(LineItemType || (LineItemType = {}));
const schema = {
    type: 'object',
    properties: {
        productId: { type: 'string', nullable: false },
        variantId: { type: 'string', nullable: true },
        quantity: { type: 'integer', nullable: false },
        customAttributes: { type: 'object', nullable: true },
        hiddenCustomAttributes: {
            type: 'array',
            nullable: true,
            items: {
                type: 'string'
            }
        },
        lineItemType: { type: 'string', nullable: false },
        discountType: { type: 'string', nullable: false },
        displayText: { type: 'string', nullable: false },
        discountValue: { type: 'string', nullable: false },
        freeQuantity: { type: 'number', nullable: true },
        unitPrice: { type: 'number', nullable: true }
    },
    required: ['productId'],
    additionalProperties: false
};
const addLineItemToCartSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.trigger.ts":
/*!*****************************************************************************!*\
  !*** ./src/methods/cart/add-line-item-to-cart/addLineItemToCart.trigger.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineItemAddedToCart": () => (/* binding */ lineItemAddedToCart),
/* harmony export */   "lineItemUpdated": () => (/* binding */ lineItemUpdated)
/* harmony export */ });
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/listeners */ "./src/communications/listeners.ts");


const lineItemAddedToCart = (appContext, lineItem) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_ITEM_ADDED_TO_CART, [appContext, lineItem], {
        appContext,
        lineItem
    });
};
const lineItemUpdated = (appContext, updateType, lineItem) => {
    (0,_communications_listeners__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_triggers__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_ITEM_UPDATED, [appContext, updateType, lineItem], {
        appContext,
        updateType,
        lineItem
    });
};


/***/ }),

/***/ "./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.action.ts":
/*!***********************************************************************************************!*\
  !*** ./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.action.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addMultipleLineItemsToCart": () => (/* binding */ addMultipleLineItemsToCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _addMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addMultipleLineItemsToCart.schema */ "./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.schema.ts");




const actionExecutor = function (products) {
    return new Promise((resolve, reject) => {
        const validate = (0,_addMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema)(products);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].ADD_MULTIPLE_LINE_ITEMS_TO_CART, {
                lineItems: products
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_addMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_addMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors);
                reject(error);
            }
        }
    });
};
const ActionBuilder = function () {
    let lineItems = [];
    return {
        setProduct(product) {
            lineItems.push(product);
            return this;
        },
        exec() {
            if (!lineItems.length) {
                let error = {
                    code: 1102,
                    message: 'Line Items is empty',
                    type: 'Internal SDK Error'
                };
                return Promise.reject(error);
            }
            return actionExecutor(lineItems);
        }
    };
};
const addMultipleLineItemsToCart = function () {
    return new ActionBuilder();
};


/***/ }),

/***/ "./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.schema.ts":
/*!***********************************************************************************************!*\
  !*** ./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.schema.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var LineItemType;
(function (LineItemType) {
    LineItemType["REGULAR"] = "REGULAR";
    LineItemType["HIDDEN"] = "HIDDEN";
    LineItemType["READONLY"] = "READ-ONLY";
})(LineItemType || (LineItemType = {}));
const lineItemSchema = {
    type: 'object',
    properties: {
        productId: { type: 'string', nullable: false },
        variantId: { type: 'string', nullable: true },
        quantity: { type: 'integer', nullable: false },
        customAttributes: { type: 'object', nullable: true },
        hiddenCustomAttributes: {
            type: 'array',
            nullable: true,
            items: {
                type: 'string'
            }
        },
        lineItemType: { type: 'string', nullable: false },
        discountType: { type: 'string', nullable: false },
        discountValue: { type: 'string', nullable: false },
        displayText: { type: 'string', nullable: false },
        freeQuantity: { type: 'number', nullable: true },
        unitPrice: { type: 'number', nullable: true }
    },
    required: ['productId'],
    additionalProperties: false
};
const schemaDefinition = {
    type: 'array',
    items: lineItemSchema
};
const schema = ajv.compile(schemaDefinition);


/***/ }),

/***/ "./src/methods/cart/navigate-to/navigateTo.action.ts":
/*!***********************************************************!*\
  !*** ./src/methods/cart/navigate-to/navigateTo.action.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "navigateTo": () => (/* binding */ navigateTo)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _navigateTo_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigateTo.schema */ "./src/methods/cart/navigate-to/navigateTo.schema.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const NavigateTo = function (navigationType, handle) {
    return new Promise((resolve, reject) => {
        let data = {
            navigationType,
            handle,
        };
        const validate = (0,_navigateTo_schema__WEBPACK_IMPORTED_MODULE_2__.navigateToSchema)(data);
        console.log(validate, 'validate');
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].NAVIGATE_TO, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_navigateTo_schema__WEBPACK_IMPORTED_MODULE_2__.navigateToSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_navigateTo_schema__WEBPACK_IMPORTED_MODULE_2__.navigateToSchema.errors);
                reject(error);
            }
        }
    });
};
const navigateToBuilder = function () {
    let navigationType;
    let handle = null;
    return {
        setNavigationType(value) {
            navigationType = value;
            return this;
        },
        setHandle(value) {
            handle = value;
            return this;
        },
        exec() {
            if (!navigationType) {
                let error = {
                    code: 1101,
                    message: 'Invalid navigation type',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return NavigateTo(navigationType, handle);
        },
    };
};
const navigateTo = function () {
    return new navigateToBuilder();
};


/***/ }),

/***/ "./src/methods/cart/navigate-to/navigateTo.schema.ts":
/*!***********************************************************!*\
  !*** ./src/methods/cart/navigate-to/navigateTo.schema.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "navigateToSchema": () => (/* binding */ navigateToSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var NavigationType;
(function (NavigationType) {
    NavigationType["HOME"] = "home";
    NavigationType["CART"] = "cart";
    NavigationType["PDP"] = "pdp";
    NavigationType["COLLECTION"] = "collection";
})(NavigationType || (NavigationType = {}));
const schema = {
    type: 'object',
    properties: {
        navigationType: { type: 'string', nullable: false, minLength: 1 },
        handle: { type: 'string', nullable: false },
    },
    required: ['navigationType'],
    additionalProperties: false,
};
const navigateToSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/remove-coupon-code/removeCouponCode.action.ts":
/*!************************************************************************!*\
  !*** ./src/methods/cart/remove-coupon-code/removeCouponCode.action.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeCouponCode": () => (/* binding */ removeCouponCode)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _removeCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./removeCouponCode.schema */ "./src/methods/cart/remove-coupon-code/removeCouponCode.schema.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");




const RemoveCouponCode = function (coupon) {
    return new Promise(function (resolve, reject) {
        let data = {
            coupon
        };
        const validate = (0,_removeCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.removeCouponCodeSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_COUPON_CODE, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_removeCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.removeCouponCodeSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_3__.normalizeError)(_removeCouponCode_schema__WEBPACK_IMPORTED_MODULE_1__.removeCouponCodeSchema.errors);
                reject(error);
            }
        }
    });
};
const RemoveCouponCodeBuilder = function () {
    let coupon;
    return {
        setCouponCode(value) {
            coupon = value;
            return this;
        },
        exec() {
            if (!coupon) {
                let error = {
                    code: 1101,
                    message: 'Coupon Code is missing',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return RemoveCouponCode(coupon);
        }
    };
};
const removeCouponCode = function () {
    return new RemoveCouponCodeBuilder();
};


/***/ }),

/***/ "./src/methods/cart/remove-coupon-code/removeCouponCode.schema.ts":
/*!************************************************************************!*\
  !*** ./src/methods/cart/remove-coupon-code/removeCouponCode.schema.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeCouponCodeSchema": () => (/* binding */ removeCouponCodeSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        coupon: { type: 'string', nullable: false },
    },
    required: ['coupon'],
    additionalProperties: false,
};
const removeCouponCodeSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.action.ts":
/*!**************************************************************************************!*\
  !*** ./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.action.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeLineItemFromCart": () => (/* binding */ removeLineItemFromCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _removeLineItemFromCart_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removeLineItemFromCart.schema */ "./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.schema.ts");




const RemoveLineItemFromCart = function (lineItemHandle, quantity) {
    return new Promise((resolve, reject) => {
        let data = {
            lineItemHandle,
            quantity,
        };
        const validate = (0,_removeLineItemFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.removeLineItemFromCartSchema)(data);
        if (validate) {
            if (quantity === null) {
                quantity = 0;
            }
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_LINE_ITEM_FROM_CART, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_removeLineItemFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.removeLineItemFromCartSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_removeLineItemFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.removeLineItemFromCartSchema.errors);
                reject(error);
            }
        }
    });
};
const removeLineItemFromCartBuilder = function () {
    let lineItemHandle;
    let quantity = null;
    return {
        setLineItemHandle(value) {
            lineItemHandle = value;
            return this;
        },
        setQuantity(value) {
            quantity = value;
            return this;
        },
        exec() {
            if (!lineItemHandle) {
                let error = {
                    code: 1101,
                    message: 'Invalid LineItemHandle',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return RemoveLineItemFromCart(lineItemHandle, quantity);
        },
    };
};
const removeLineItemFromCart = function () {
    return new removeLineItemFromCartBuilder();
};


/***/ }),

/***/ "./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.schema.ts":
/*!**************************************************************************************!*\
  !*** ./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.schema.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeLineItemFromCartSchema": () => (/* binding */ removeLineItemFromCartSchema),
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schema = {
    type: 'object',
    properties: {
        lineItemHandle: { type: 'string', nullable: false },
        quantity: { type: 'integer', nullable: true }
    },
    required: ['lineItemHandle'],
    additionalProperties: false
};
const removeLineItemFromCartSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.action.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.action.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeMultipleLineItemsFromCart": () => (/* binding */ removeMultipleLineItemsFromCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _removeMultipleLineItemsFromCart_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removeMultipleLineItemsFromCart.schema */ "./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.schema.ts");




const actionExecutor = function (products) {
    return new Promise((resolve, reject) => {
        const validate = (0,_removeMultipleLineItemsFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema)(products);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_MULTIPLE_LINE_ITEMS_TO_CART, {
                lineItems: products
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_removeMultipleLineItemsFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_removeMultipleLineItemsFromCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors);
                reject(error);
            }
        }
    });
};
const ActionBuilder = function () {
    let lineItems = [];
    return {
        setProduct(product) {
            lineItems.push(product);
            return this;
        },
        exec() {
            if (!lineItems.length) {
                let error = {
                    code: 1102,
                    message: 'Line Items is empty',
                    type: 'Internal SDK Error'
                };
                return Promise.reject(error);
            }
            return actionExecutor(lineItems);
        }
    };
};
const removeMultipleLineItemsFromCart = function () {
    return new ActionBuilder();
};


/***/ }),

/***/ "./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.schema.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.schema.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "schemaObject": () => (/* binding */ schemaObject)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
const schemaObject = {
    type: 'object',
    properties: {
        lineItemHandle: { type: 'string', nullable: false },
        quantity: { type: 'integer', nullable: true }
    },
    required: ['lineItemHandle'],
    additionalProperties: false
};
const schemaDefinition = {
    type: 'array',
    items: schemaObject
};
const schema = ajv.compile(schemaDefinition);


/***/ }),

/***/ "./src/methods/cart/set-code-block-content/setCodeBlockContent.action.ts":
/*!*******************************************************************************!*\
  !*** ./src/methods/cart/set-code-block-content/setCodeBlockContent.action.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCodeBlockContent": () => (/* binding */ setCodeBlockContent)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _setCodeBlockContent_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setCodeBlockContent.schema */ "./src/methods/cart/set-code-block-content/setCodeBlockContent.schema.ts");




const SetCodeBlockContent = function (codeBlockId, contentType, contentData, visibility, id) {
    return new Promise((resolve, reject) => {
        let data = {
            codeBlockId,
            contentType,
            contentData,
            visibility,
            id
        };
        const validate = (0,_setCodeBlockContent_schema__WEBPACK_IMPORTED_MODULE_3__.setCodeBlockContentSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].SET_CODE_BLOCK_CONTENT, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_setCodeBlockContent_schema__WEBPACK_IMPORTED_MODULE_3__.setCodeBlockContentSchema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_setCodeBlockContent_schema__WEBPACK_IMPORTED_MODULE_3__.setCodeBlockContentSchema.errors);
                reject(error);
            }
        }
    });
};
const setCodeBlockContentBuilder = function () {
    let codeBlockId;
    let contentType;
    let contentData;
    let visibility = true;
    let id = null;
    return {
        setCodeBlockId(value) {
            codeBlockId = value;
            return this;
        },
        setContentType(value) {
            contentType = value;
            return this;
        },
        setContentData(value) {
            contentData = value;
            return this;
        },
        setVisibility(value) {
            visibility = value;
            return this;
        },
        setId(value) {
            id = value;
            return this;
        },
        exec() {
            if (!codeBlockId && !contentType && !contentData) {
                let error = {
                    code: 1101,
                    message: "Parameter's Value Empty",
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            return SetCodeBlockContent(codeBlockId, contentType, contentData, visibility, id);
        },
    };
};
const setCodeBlockContent = function () {
    return new setCodeBlockContentBuilder();
};


/***/ }),

/***/ "./src/methods/cart/set-code-block-content/setCodeBlockContent.schema.ts":
/*!*******************************************************************************!*\
  !*** ./src/methods/cart/set-code-block-content/setCodeBlockContent.schema.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "setCodeBlockContentSchema": () => (/* binding */ setCodeBlockContentSchema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var codeBlockId;
(function (codeBlockId) {
    codeBlockId["ABOVE_IMAGE_CAROUSEL"] = "above_image_carousel";
    codeBlockId["ABOVE_PRODUCT_DETAILS"] = "above_product_details";
    codeBlockId["ABOVE_PRODUCT_DESCRIPTION"] = "above_product_description";
    codeBlockId["ABOVE_VARIANTS"] = "above_variants";
    codeBlockId["ABOVE_ADD_TO_CART"] = "above_add_to_cart";
    codeBlockId["ABOVE_RECENTLY_VIEWED"] = "above_recently_viewed";
    codeBlockId["BELOW_RECENTLY_VIEWED"] = "below_recently_viewed";
    codeBlockId["ABOVE_CART_ITEM"] = "above_cart_item";
    codeBlockId["BELOW_CART_ITEM"] = "below_cart_item";
    codeBlockId["BELOW_ADD_MORE_FROM_WISHLIST"] = "below_add_more";
    codeBlockId["ABOVE_PRICE_DETAILS"] = "above_price_details";
    codeBlockId["BELOW_PRICE_DETAILS"] = "below_price_details";
    codeBlockId["ABOVE_CLEAR_CART"] = "above_clear_cart";
    codeBlockId["OVERLAY_POPUP"] = "overlay_popup";
})(codeBlockId || (codeBlockId = {}));
var contentType;
(function (contentType) {
    contentType["URL"] = "url";
    contentType["CODE"] = "code";
})(contentType || (contentType = {}));
const schema = {
    type: 'object',
    properties: {
        codeBlockId: { type: 'string', nullable: false },
        contentType: { type: 'string', nullable: false },
        contentData: { type: 'string', nullable: false },
        visibility: { type: 'boolean', nullable: false },
        id: { type: 'string', nullable: false },
    },
    required: ['codeBlockId', 'contentType', 'contentData'],
    additionalProperties: false,
};
const setCodeBlockContentSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.action.ts":
/*!**********************************************************************************!*\
  !*** ./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.action.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateLineItemInCart": () => (/* binding */ updateLineItemInCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _updateLineItemInCart_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateLineItemInCart.schema */ "./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.schema.ts");




const UpdateLineItemInCart = function (lineItemHandle, quantity, lineItemType, discountType, discountValue, displayText, customAttributes, hiddenCustomAttributes, unitPrice, freeQuantity) {
    return new Promise((resolve, reject) => {
        const data = {
            lineItemHandle,
            quantity,
            lineItemType,
            discountType,
            discountValue,
            displayText,
            hiddenCustomAttributes,
            unitPrice,
            freeQuantity,
        };
        if (customAttributes) {
            data.customAttributes = customAttributes;
        }
        const validate = (0,_updateLineItemInCart_schema__WEBPACK_IMPORTED_MODULE_3__.updateLineItemInCartSchema)(data);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].UPDATE_LINE_ITEM_IN_CART, data)
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_updateLineItemInCart_schema__WEBPACK_IMPORTED_MODULE_3__.updateLineItemInCartSchema.errors) {
                const error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_updateLineItemInCart_schema__WEBPACK_IMPORTED_MODULE_3__.updateLineItemInCartSchema.errors);
                reject(error);
            }
        }
    });
};
const updateLineItemInCartBuilder = function () {
    let lineItemHandle;
    let quantity;
    let lineItemType = 'REGULAR';
    let discountType;
    let discountValue;
    let displayText;
    let customAttributes = null;
    let hiddenCustomAttributes = [];
    let unitPrice = null;
    let freeQuantity = null;
    return {
        setLineItemHandle(value) {
            lineItemHandle = value;
            return this;
        },
        setQuantity(value) {
            quantity = value;
            return this;
        },
        setLineItemType(value) {
            lineItemType = value;
            return this;
        },
        setDiscountType(value) {
            discountType = value;
            return this;
        },
        setDiscountValue(value) {
            discountValue = value;
            return this;
        },
        setDisplayText(value) {
            displayText = value;
            return this;
        },
        setFreeQuantity(value) {
            freeQuantity = value;
            return this;
        },
        setCustomAttributes(value) {
            customAttributes = value;
            return this;
        },
        setHiddenCustomAttributes(value) {
            hiddenCustomAttributes = value;
            return this;
        },
        setUnitPrice(value) {
            unitPrice = value;
            return this;
        },
        exec() {
            if (!lineItemHandle) {
                const error = {
                    code: 1101,
                    message: 'Invalid LineItemHandle',
                    type: 'Internal SDK Error',
                };
                return Promise.reject(error);
            }
            // eslint-disable-next-line new-cap
            return UpdateLineItemInCart(lineItemHandle, quantity, lineItemType, discountType, discountValue, displayText, customAttributes, hiddenCustomAttributes, unitPrice, freeQuantity);
        },
    };
};
const updateLineItemInCart = function () {
    return new updateLineItemInCartBuilder();
};


/***/ }),

/***/ "./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.schema.ts":
/*!**********************************************************************************!*\
  !*** ./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.schema.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema),
/* harmony export */   "updateLineItemInCartSchema": () => (/* binding */ updateLineItemInCartSchema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var LineItemType;
(function (LineItemType) {
    LineItemType["REGULAR"] = "REGULAR";
    LineItemType["HIDDEN"] = "HIDDEN";
    LineItemType["READONLY"] = "READ-ONLY";
})(LineItemType || (LineItemType = {}));
const schema = {
    type: 'object',
    properties: {
        lineItemHandle: { type: 'string', nullable: false },
        quantity: { type: 'integer', nullable: true },
        lineItemType: { type: 'string', nullable: true },
        discountType: { type: 'string', nullable: true },
        displayText: { type: 'string', nullable: true },
        discountValue: { type: 'string', nullable: true },
        freeQuantity: { type: 'number', nullable: true },
        customAttributes: { type: 'object', nullable: true },
        hiddenCustomAttributes: {
            type: 'array',
            nullable: true,
            items: {
                type: 'string'
            }
        },
        unitPrice: { type: 'number', nullable: true },
    },
    required: ['lineItemHandle'],
    additionalProperties: false,
};
const updateLineItemInCartSchema = ajv.compile(schema);


/***/ }),

/***/ "./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.action.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.action.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateMultipleLineItemsToCart": () => (/* binding */ updateMultipleLineItemsToCart)
/* harmony export */ });
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/errorNormalizer */ "./src/utils/errorNormalizer.ts");
/* harmony import */ var _updateMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateMultipleLineItemsToCart.schema */ "./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.schema.ts");




const actionExecutor = function (products) {
    return new Promise((resolve, reject) => {
        const validate = (0,_updateMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema)(products);
        if (validate) {
            (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_1__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_0__["default"].UPDATE_MULTIPLE_LINE_ITEMS_TO_CART, {
                lineItems: products
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        }
        else {
            if (_updateMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors) {
                let error = (0,_utils_errorNormalizer__WEBPACK_IMPORTED_MODULE_2__.normalizeError)(_updateMultipleLineItemsToCart_schema__WEBPACK_IMPORTED_MODULE_3__.schema.errors);
                reject(error);
            }
        }
    });
};
const ActionBuilder = function () {
    let lineItems = [];
    return {
        setProduct(product) {
            lineItems.push(product);
            return this;
        },
        exec() {
            if (!lineItems.length) {
                let error = {
                    code: 1102,
                    message: 'Line Items is empty',
                    type: 'Internal SDK Error'
                };
                return Promise.reject(error);
            }
            return actionExecutor(lineItems);
        }
    };
};
const updateMultipleLineItemsToCart = function () {
    return new ActionBuilder();
};


/***/ }),

/***/ "./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.schema.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.schema.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "schema": () => (/* binding */ schema)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);

const ajv = new (ajv__WEBPACK_IMPORTED_MODULE_0___default())();
var LineItemType;
(function (LineItemType) {
    LineItemType["REGULAR"] = "REGULAR";
    LineItemType["HIDDEN"] = "HIDDEN";
    LineItemType["READONLY"] = "READ-ONLY";
})(LineItemType || (LineItemType = {}));
const lineItemSchema = {
    type: 'object',
    properties: {
        lineItemHandle: { type: 'string', nullable: false },
        variantId: { type: 'string', nullable: true },
        quantity: { type: 'integer', nullable: false },
        customAttributes: { type: 'object', nullable: true },
        lineItemType: { type: 'string', nullable: false },
        discountType: { type: 'string', nullable: false },
        discountValue: { type: 'string', nullable: false },
        displayText: { type: 'string', nullable: false },
        freeQuantity: { type: 'number', nullable: true },
        unitPrice: { type: 'number', nullable: true }
    },
    required: ['lineItemHandle'],
    additionalProperties: false
};
const schemaDefinition = {
    type: 'array',
    items: lineItemSchema
};
const schema = ajv.compile(schemaDefinition);


/***/ }),

/***/ "./src/methods/cart/variant-selection/variantSelection.action.ts":
/*!***********************************************************************!*\
  !*** ./src/methods/cart/variant-selection/variantSelection.action.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "variantSelection": () => (/* binding */ variantSelection)
/* harmony export */ });
// import Actions from '../../../constants/actions';
// import { dispatch } from '../../../communications/dispatcher';
// import { variantSelectionSchema } from './variantSelection.schema';
// import { normalizeError } from '../../../utils/errorNormalizer';
// const VariantSelection = function (
//     selectedBgColor: string | null,
//     unSelectedBgColor: string | null,
//     selectedTextColor: string | null,
//     unSelectedTextColor: string | null,
//     shape: string | null,
//     radius: number | null,
//     borderColor: string | null,
//     fontSize: number | null,
//     fontStyle: string | null,
// ) {
//     return new Promise((resolve, reject) => {
//         let data = {
//             selectedBgColor,
//             unSelectedBgColor,
//             selectedTextColor,
//             unSelectedTextColor,
//             shape,
//             radius,
//             borderColor,
//             fontSize,
//             fontStyle,
//         };
//         const validate = variantSelectionSchema(data);
//         if (validate) {
//             dispatch(Actions.VARIANT_SELECTION, data)
//                 .then((data) => {
//                     resolve(data);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         } else {
//             if (variantSelectionSchema.errors) {
//                 let error = normalizeError(variantSelectionSchema.errors);
//                 reject(error);
//             }
//         }
//     });
// }
// const variantSelectionBuilder = function () {
//     let selectedBgColor: string | null = null;
//     let unSelectedBgColor: string | null = null;
//     let selectedTextColor: string | null = null;
//     let unSelectedTextColor: string | null = null;
//     let shape: string | null = null;
//     let radius: number | null = null;
//     let borderColor: string | null = null;
//     let fontSize: number | null = null;
//     let fontStyle: string | null = null;
//     return {
//         setSelectedBgColor(value: string) {
//             selectedBgColor = value;
//             return this;
//         },
//         setUnSelectedBgColor(value: string) {
//             unSelectedBgColor = value;
//             return this;
//         },
//         setSelectedTextColor(value: string) {
//             selectedTextColor = value;
//             return this;
//         },
//         setUnSelectedTextColor(value: string) {
//             unSelectedTextColor = value;
//             return this;
//         },
//         setShape(value: string) {
//             shape = value;
//             return this;
//         },
//         setRadius(value: number) {
//             radius = value;;
//             return this;
//         },
//         setBorderColor(value: string) {
//             borderColor = value;
//             return this;
//         },
//         setFontSize(value: number) {
//             fontSize = value;;
//             return this;
//         },
//         setFontStyle(value: string) {
//             fontStyle = value;
//             return this;
//         },
//         exec() {
//             return VariantSelection(
//                 selectedBgColor,
//                 unSelectedBgColor,
//                 selectedTextColor,
//                 unSelectedTextColor,
//                 shape,
//                 radius,
//                 borderColor,
//                 fontSize,
//                 fontStyle,
//             );
//         },
//     };
// };
const variantSelection = function (callback) {
    let selectedBgColor = null;
    let unSelectedBgColor = null;
    let selectedTextColor = null;
    let unSelectedTextColor = null;
    let shape = null;
    let radius = null;
    let selectedBorderColor = null;
    let unSelectedBorderColor = null;
    let fontSize = null;
    let fontStyle = null;
    return {
        setSelectedBgColor(value) {
            selectedBgColor = value;
            return this;
        },
        setUnSelectedBgColor(value) {
            unSelectedBgColor = value;
            return this;
        },
        setSelectedTextColor(value) {
            selectedTextColor = value;
            return this;
        },
        setUnSelectedTextColor(value) {
            unSelectedTextColor = value;
            return this;
        },
        setShape(value) {
            shape = value;
            return this;
        },
        setRadius(value) {
            radius = value;
            ;
            return this;
        },
        setSelectedBorderColor(value) {
            selectedBorderColor = value;
            return this;
        },
        setUnSelectedBorderColor(value) {
            unSelectedBorderColor = value;
            return this;
        },
        setFontSize(value) {
            fontSize = value;
            ;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        done() {
            return callback({
                selectedBgColor,
                unSelectedBgColor,
                selectedTextColor,
                unSelectedTextColor,
                shape,
                radius,
                selectedBorderColor,
                unSelectedBorderColor,
                fontSize,
                fontStyle
            });
        },
    };
    // return new (variantSelectionBuilder as any)();
};


/***/ }),

/***/ "./src/methods/methods.ts":
/*!********************************!*\
  !*** ./src/methods/methods.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCouponCode": () => (/* reexport safe */ _cart_add_coupon_code_addCouponCode_action__WEBPACK_IMPORTED_MODULE_6__.addCouponCode),
/* harmony export */   "addLineItemToCart": () => (/* reexport safe */ _cart_add_line_item_to_cart_addLineItemToCart_action__WEBPACK_IMPORTED_MODULE_0__.addLineItemToCart),
/* harmony export */   "addMultipleLineItemsToCart": () => (/* reexport safe */ _cart_add_multiple_line_items_to_cart_addMultipleLineItemsToCart_action__WEBPACK_IMPORTED_MODULE_8__.addMultipleLineItemsToCart),
/* harmony export */   "lineItemAddedToCart": () => (/* reexport safe */ _cart_add_line_item_to_cart_addLineItemToCart_trigger__WEBPACK_IMPORTED_MODULE_1__.lineItemAddedToCart),
/* harmony export */   "lineItemUpdated": () => (/* reexport safe */ _cart_add_line_item_to_cart_addLineItemToCart_trigger__WEBPACK_IMPORTED_MODULE_1__.lineItemUpdated),
/* harmony export */   "navigateTo": () => (/* reexport safe */ _cart_navigate_to_navigateTo_action__WEBPACK_IMPORTED_MODULE_5__.navigateTo),
/* harmony export */   "removeCouponCode": () => (/* reexport safe */ _cart_remove_coupon_code_removeCouponCode_action__WEBPACK_IMPORTED_MODULE_7__.removeCouponCode),
/* harmony export */   "removeLineItemFromCart": () => (/* reexport safe */ _cart_remove_line_item_from_cart_removeLineItemFromCart_action__WEBPACK_IMPORTED_MODULE_2__.removeLineItemFromCart),
/* harmony export */   "removeMultipleLineItemsFromCart": () => (/* reexport safe */ _cart_remove_multiple_line_items_from_cart_removeMultipleLineItemsFromCart_action__WEBPACK_IMPORTED_MODULE_10__.removeMultipleLineItemsFromCart),
/* harmony export */   "setCodeBlockContent": () => (/* reexport safe */ _cart_set_code_block_content_setCodeBlockContent_action__WEBPACK_IMPORTED_MODULE_3__.setCodeBlockContent),
/* harmony export */   "updateLineItemInCart": () => (/* reexport safe */ _cart_update_line_item_in_cart_updateLineItemInCart_action__WEBPACK_IMPORTED_MODULE_4__.updateLineItemInCart),
/* harmony export */   "updateMultipleLineItemsToCart": () => (/* reexport safe */ _cart_update_multiple_line_items_to_cart_updateMultipleLineItemsToCart_action__WEBPACK_IMPORTED_MODULE_9__.updateMultipleLineItemsToCart)
/* harmony export */ });
/* harmony import */ var _cart_add_line_item_to_cart_addLineItemToCart_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart/add-line-item-to-cart/addLineItemToCart.action */ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.action.ts");
/* harmony import */ var _cart_add_line_item_to_cart_addLineItemToCart_trigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart/add-line-item-to-cart/addLineItemToCart.trigger */ "./src/methods/cart/add-line-item-to-cart/addLineItemToCart.trigger.ts");
/* harmony import */ var _cart_remove_line_item_from_cart_removeLineItemFromCart_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart/remove-line-item-from-cart/removeLineItemFromCart.action */ "./src/methods/cart/remove-line-item-from-cart/removeLineItemFromCart.action.ts");
/* harmony import */ var _cart_set_code_block_content_setCodeBlockContent_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart/set-code-block-content/setCodeBlockContent.action */ "./src/methods/cart/set-code-block-content/setCodeBlockContent.action.ts");
/* harmony import */ var _cart_update_line_item_in_cart_updateLineItemInCart_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart/update-line-item-in-cart/updateLineItemInCart.action */ "./src/methods/cart/update-line-item-in-cart/updateLineItemInCart.action.ts");
/* harmony import */ var _cart_navigate_to_navigateTo_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/navigate-to/navigateTo.action */ "./src/methods/cart/navigate-to/navigateTo.action.ts");
/* harmony import */ var _cart_add_coupon_code_addCouponCode_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/add-coupon-code/addCouponCode.action */ "./src/methods/cart/add-coupon-code/addCouponCode.action.ts");
/* harmony import */ var _cart_remove_coupon_code_removeCouponCode_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cart/remove-coupon-code/removeCouponCode.action */ "./src/methods/cart/remove-coupon-code/removeCouponCode.action.ts");
/* harmony import */ var _cart_add_multiple_line_items_to_cart_addMultipleLineItemsToCart_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.action */ "./src/methods/cart/add-multiple-line-items-to-cart/addMultipleLineItemsToCart.action.ts");
/* harmony import */ var _cart_update_multiple_line_items_to_cart_updateMultipleLineItemsToCart_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.action */ "./src/methods/cart/update-multiple-line-items-to-cart/updateMultipleLineItemsToCart.action.ts");
/* harmony import */ var _cart_remove_multiple_line_items_from_cart_removeMultipleLineItemsFromCart_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.action */ "./src/methods/cart/remove-multiple-line-items-from-cart/removeMultipleLineItemsFromCart.action.ts");













/***/ }),

/***/ "./src/ui-actions/UIActions.ts":
/*!*************************************!*\
  !*** ./src/ui-actions/UIActions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ui": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _uiComponents_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiComponents.action */ "./src/ui-actions/uiComponents.action.ts");

const ui = {
    pdp: { uiComponents: _uiComponents_action__WEBPACK_IMPORTED_MODULE_0__.uiComponents }
};


/***/ }),

/***/ "./src/ui-actions/addToCart.action.ts":
/*!********************************************!*\
  !*** ./src/ui-actions/addToCart.action.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCart": () => (/* binding */ addToCart)
/* harmony export */ });
const addToCart = function (callback) {
    let addToCartBgColor = null;
    let outOfStockBgColor = null;
    let hideAddToCart;
    let enableAddToCart;
    let hideOutOfStock;
    let enableOutOfStock;
    let addToCartTextStyle = null;
    let outOfStockTextStyle = null;
    return {
        setAddToCartBgColor(value) {
            addToCartBgColor = value;
            ;
            return this;
        },
        setOutOfStockBgColor(value) {
            outOfStockBgColor = value;
            ;
            return this;
        },
        setHideAddToCart(value) {
            hideAddToCart = value;
            return this;
        },
        setEnableAddToCart(value) {
            enableAddToCart = value;
            return this;
        },
        setHideOutOfStock(value) {
            hideOutOfStock = value;
            return this;
        },
        setEnableOutOfStock(value) {
            enableOutOfStock = value;
            return this;
        },
        setAddToCartTextStyle(value) {
            addToCartTextStyle = value;
            ;
            return this;
        },
        setOutOfStockTextStyle(value) {
            outOfStockTextStyle = value;
            return this;
        },
        done() {
            return callback({
                addToCartBgColor,
                outOfStockBgColor,
                hideAddToCart,
                enableAddToCart,
                hideOutOfStock,
                enableOutOfStock,
                addToCartTextStyle,
                outOfStockTextStyle
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/customAddButton.actions.ts":
/*!***************************************************!*\
  !*** ./src/ui-actions/customAddButton.actions.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAddButton": () => (/* binding */ customAddButton)
/* harmony export */ });
const customAddButton = function (callback) {
    let bgColor = null;
    let plusMinusIconColor = null;
    let textStyle = null;
    let radius = null;
    return {
        setBgColor(value) {
            bgColor = value;
            ;
            return this;
        },
        setPlusMinusIconColor(value) {
            plusMinusIconColor = value;
            return this;
        },
        setTextStyle(value) {
            textStyle = value;
            return this;
        },
        setRadius(value) {
            radius = value;
            return this;
        },
        done() {
            return callback({
                bgColor,
                plusMinusIconColor,
                textStyle,
                radius
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/productImageSlider.action.ts":
/*!*****************************************************!*\
  !*** ./src/ui-actions/productImageSlider.action.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productImageSlider": () => (/* binding */ productImageSlider)
/* harmony export */ });
// const ProductImageSlider = function (
//     sliderMedia: SliderMedia[] | null,
//     aspectFill: boolean | null,
//     wishlist: object | null,
//     sticker: object | null,
//     sliderIndicator: object | null
// ) {
//     // return new Promise((resolve, reject) => {
//         let data = {
//             sliderMedia,
//             aspectFill,
//             wishlist,
//             sticker,
//             sliderIndicator
//         };
//         return data
// const validate = productImageSliderSchema(data);
// if (validate) {
//     dispatch(Actions.PRODUCT_IMAGE_SLIDER, data)
//         .then((data) => {
//             resolve(data);
//         })
//         .catch((error) => {
//             reject(error);
//         });
// } else {
//     if (productImageSliderSchema.errors) {
//         let error = normalizeError(productImageSliderSchema.errors);
//         reject(error);
//     }
// }
// });
// }
// const productImageSliderBuilder = function () {
//     let sliderMedia: SliderMedia[] | null = null;
//     let aspectFill: boolean | null = null;
//     let wishlist: object | null = null;
//     let sticker: object | null = null;
//     let sliderIndicator: object | null = null;
//     return {
//         setSliderMedia(value: SliderMedia[]) {
//             sliderMedia = value;
//             return this;
//         },
//         setAspectFill(value: boolean) {
//             aspectFill = value;
//             return this;
//         },
//         setWishlist(value: object) {
//             wishlist = value;
//             return this;
//         },
//         setSticker(value: object) {
//             sticker = value;
//             return this;
//         },
//         setSliderIndicator(value: object) {
//             sliderIndicator = value;
//             return this;
//         },
//         variantSelection,
//         exec() {
//             return ProductImageSlider(
//                 sliderMedia,
//                 aspectFill,
//                 wishlist,
//                 sticker,
//                 sliderIndicator,
//             );
//         },
//     };
// };
const productImageSlider = function (callback) {
    let sliderMedia = [];
    let aspectFill = null;
    let wishlist = null;
    let sticker = null;
    let sliderIndicator = null;
    let placeHolder = null;
    return {
        setSliderMedia(value) {
            sliderMedia.push(value);
            return this;
        },
        setAspectFill(value) {
            aspectFill = value;
            return this;
        },
        setPlaceHolder(value) {
            placeHolder = value;
            return this;
        },
        setWishlist(value) {
            wishlist = value;
            return this;
        },
        setSticker(value) {
            sticker = value;
            return this;
        },
        setSliderIndicator(value) {
            sliderIndicator = value;
            return this;
        },
        done() {
            return callback({
                sliderMedia,
                aspectFill,
                placeHolder,
                wishlist,
                sticker,
                sliderIndicator,
            });
        },
    };
    // return new (productImageSliderBuilder as any)();
};


/***/ }),

/***/ "./src/ui-actions/productName.action.ts":
/*!**********************************************!*\
  !*** ./src/ui-actions/productName.action.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productName": () => (/* binding */ productName)
/* harmony export */ });
const productName = function (callback) {
    let fontSize = null;
    let fontStyle = null;
    let fontColor = null;
    return {
        setFontSize(value) {
            fontSize = value;
            ;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        setFontColor(value) {
            fontColor = value;
            return this;
        },
        done() {
            return callback({
                fontSize,
                fontStyle,
                fontColor
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/productPrice.action.ts":
/*!***********************************************!*\
  !*** ./src/ui-actions/productPrice.action.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productPrice": () => (/* binding */ productPrice)
/* harmony export */ });
const productPrice = function (callback) {
    let sellingPrice = null;
    let retailPrice = null;
    return {
        setSellingPrice(value) {
            sellingPrice = value;
            ;
            return this;
        },
        setRetailPrice(value) {
            retailPrice = value;
            ;
            return this;
        },
        done() {
            return callback({
                sellingPrice,
                retailPrice
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/productRating.action.ts":
/*!************************************************!*\
  !*** ./src/ui-actions/productRating.action.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productRating": () => (/* binding */ productRating)
/* harmony export */ });
const productRating = function (callback) {
    let ratingColor = null;
    let hideRatingCount;
    let hideWriteReview;
    let ratingCountTextStyle = null;
    let writeReviewTextStyle = null;
    return {
        setRatingColor(value) {
            ratingColor = value;
            ;
            return this;
        },
        setHideRatingCount(value) {
            hideRatingCount = value;
            return this;
        },
        setHideWriteReview(value) {
            hideWriteReview = value;
            return this;
        },
        setRatingCountTextStyle(value) {
            ratingCountTextStyle = value;
            ;
            return this;
        },
        setWriteReviewTextStyle(value) {
            writeReviewTextStyle = value;
            return this;
        },
        done() {
            return callback({
                ratingColor,
                hideRatingCount,
                hideWriteReview,
                ratingCountTextStyle,
                writeReviewTextStyle
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/recentlyViewedProducts.action.ts":
/*!*********************************************************!*\
  !*** ./src/ui-actions/recentlyViewedProducts.action.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recentlyViewedProducts": () => (/* binding */ recentlyViewedProducts)
/* harmony export */ });
const recentlyViewedProducts = function (callback) {
    let headerTextStyle = null;
    let productNameTextStyle = null;
    let hideRetailPrice;
    let hideSellingPrice;
    let hideDiscount;
    let retailPriceTextStyle = null;
    let sellingPriceTextStyle = null;
    let discountTextStyle = null;
    return {
        setHeaderTextStyle(value) {
            headerTextStyle = value;
            return this;
        },
        setProductNameTextStyle(value) {
            productNameTextStyle = value;
            return this;
        },
        setHideRetailPrice(value) {
            hideRetailPrice = value;
            return this;
        },
        setHideSellingPrice(value) {
            hideSellingPrice = value;
            return this;
        },
        setHideDiscount(value) {
            hideDiscount = value;
            return this;
        },
        serRetailPriceTextStyle(value) {
            retailPriceTextStyle = value;
            return this;
        },
        setSellingPriceTextStyle(value) {
            sellingPriceTextStyle = value;
            return this;
        },
        setDiscountTextStyle(value) {
            discountTextStyle = value;
            return this;
        },
        done() {
            return callback({
                headerTextStyle,
                productNameTextStyle,
                hideRetailPrice,
                hideSellingPrice,
                hideDiscount,
                retailPriceTextStyle,
                sellingPriceTextStyle,
                discountTextStyle
            });
        }
    };
};


/***/ }),

/***/ "./src/ui-actions/uiComponents.action.ts":
/*!***********************************************!*\
  !*** ./src/ui-actions/uiComponents.action.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uiComponents": () => (/* binding */ uiComponents)
/* harmony export */ });
/* harmony import */ var _methods_cart_variant_selection_variantSelection_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/cart/variant-selection/variantSelection.action */ "./src/methods/cart/variant-selection/variantSelection.action.ts");
/* harmony import */ var _productImageSlider_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productImageSlider.action */ "./src/ui-actions/productImageSlider.action.ts");
/* harmony import */ var _productName_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productName.action */ "./src/ui-actions/productName.action.ts");
/* harmony import */ var _vendorName_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vendorName.action */ "./src/ui-actions/vendorName.action.ts");
/* harmony import */ var _productPrice_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./productPrice.action */ "./src/ui-actions/productPrice.action.ts");
/* harmony import */ var _productRating_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./productRating.action */ "./src/ui-actions/productRating.action.ts");
/* harmony import */ var _addToCart_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addToCart.action */ "./src/ui-actions/addToCart.action.ts");
/* harmony import */ var _recentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recentlyViewedProducts.action */ "./src/ui-actions/recentlyViewedProducts.action.ts");
/* harmony import */ var _customAddButton_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customAddButton.actions */ "./src/ui-actions/customAddButton.actions.ts");
/* harmony import */ var _constants_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../constants/actions */ "./src/constants/actions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../communications/dispatcher */ "./src/communications/dispatcher.ts");

// import { productImageSlider } from "../methods/cart/product-image-slider/productImageSlider.action"










const UiComponents = function (uiObject) {
    return new Promise((resolve, reject) => {
        let data = {
            components: uiObject
        };
        (0,_communications_dispatcher__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_constants_actions__WEBPACK_IMPORTED_MODULE_9__["default"].UI_COMPONENTS, data)
            .then((data) => {
            resolve(data);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
const UiComponentsBuilder = function () {
    let output = {};
    function callback(key, data) {
        output[key] = data;
        return this;
    }
    ;
    return {
        variantSelection() {
            return (0,_methods_cart_variant_selection_variantSelection_action__WEBPACK_IMPORTED_MODULE_0__.variantSelection)(callback.bind(this, 'variantSelection'));
        },
        productImageSlider() {
            return (0,_productImageSlider_action__WEBPACK_IMPORTED_MODULE_1__.productImageSlider)(callback.bind(this, 'productImageSlider'));
        },
        productName() {
            return (0,_productName_action__WEBPACK_IMPORTED_MODULE_2__.productName)(callback.bind(this, 'productName'));
        },
        vendorName() {
            return (0,_vendorName_action__WEBPACK_IMPORTED_MODULE_3__.vendorName)(callback.bind(this, 'vendorName'));
        },
        productPrice() {
            return (0,_productPrice_action__WEBPACK_IMPORTED_MODULE_4__.productPrice)(callback.bind(this, 'productPrice'));
        },
        productRating() {
            return (0,_productRating_action__WEBPACK_IMPORTED_MODULE_5__.productRating)(callback.bind(this, 'productRating'));
        },
        addToCart() {
            return (0,_addToCart_action__WEBPACK_IMPORTED_MODULE_6__.addToCart)(callback.bind(this, 'addToCart'));
        },
        recentlyViewedProducts() {
            return (0,_recentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_7__.recentlyViewedProducts)(callback.bind(this, 'recentlyViewed'));
        },
        customAddButton() {
            return (0,_customAddButton_actions__WEBPACK_IMPORTED_MODULE_8__.customAddButton)(callback.bind(this, 'customAddButton'));
        },
        exec() {
            return UiComponents(output);
        }
    };
};
const uiComponents = function () {
    return new UiComponentsBuilder();
};


/***/ }),

/***/ "./src/ui-actions/vendorName.action.ts":
/*!*********************************************!*\
  !*** ./src/ui-actions/vendorName.action.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vendorName": () => (/* binding */ vendorName)
/* harmony export */ });
const vendorName = function (callback) {
    let fontSize = null;
    let fontStyle = null;
    let fontColor = null;
    return {
        setFontSize(value) {
            fontSize = value;
            ;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        setFontColor(value) {
            fontColor = value;
            return this;
        },
        done() {
            return callback({
                fontSize,
                fontStyle,
                fontColor
            });
        }
    };
};


/***/ }),

/***/ "./src/utils/actionHub.ts":
/*!********************************!*\
  !*** ./src/utils/actionHub.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFromHub": () => (/* binding */ getFromHub),
/* harmony export */   "pushToHub": () => (/* binding */ pushToHub),
/* harmony export */   "removeFromHub": () => (/* binding */ removeFromHub)
/* harmony export */ });
const hub = {};
const pushToHub = (key, func) => {
    if (hub[key])
        return false;
    hub[key] = func;
};
const getFromHub = (key) => {
    if (!hub[key])
        return false;
    return hub[key];
};
const removeFromHub = (key) => {
    if (hub[key]) {
        Reflect.deleteProperty(hub, key);
    }
};


/***/ }),

/***/ "./src/utils/appInfo.ts":
/*!******************************!*\
  !*** ./src/utils/appInfo.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAppInfo": () => (/* binding */ getAppInfo),
/* harmony export */   "initAppInfo": () => (/* binding */ initAppInfo)
/* harmony export */ });
let appInfo = {
    appId: null,
    appVersion: null,
    mobilePlatform: null,
    location: null,
};
const initAppInfo = () => {
    if (window.appInfo) {
        appInfo = window.appInfo;
    }
    else {
        let queryObj = new URLSearchParams(location.search);
        if (queryObj.has('appInfo')) {
            try {
                let appInfoObj = JSON.parse(decodeURIComponent(queryObj.get('appInfo') || '{}'));
                appInfo = appInfoObj;
            }
            catch (err) {
                throw {
                    code: 1102,
                    type: 'Internal SDK Error',
                    message: 'App info already initialized',
                };
            }
        }
    }
};
const getAppInfo = () => {
    return appInfo;
};


/***/ }),

/***/ "./src/utils/createAddToCartStyle.ts":
/*!*******************************************!*\
  !*** ./src/utils/createAddToCartStyle.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCartStyle": () => (/* binding */ addToCartStyle)
/* harmony export */ });
const addToCartStyle = function () {
    let fontSize = 12;
    let fontColor = null;
    let fontStyle = null;
    return {
        setFontSize(value) {
            fontSize = value;
            return this;
        },
        setFontColor(value) {
            fontColor = value;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        create() {
            const addToCartStyle = {
                fontSize,
                fontColor,
                fontStyle,
            };
            return addToCartStyle;
        }
    };
};


/***/ }),

/***/ "./src/utils/createLineItem.ts":
/*!*************************************!*\
  !*** ./src/utils/createLineItem.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineItem": () => (/* binding */ lineItem)
/* harmony export */ });
const lineItem = function () {
    const lineItem = {};
    return {
        setProductId(value) {
            lineItem.productId = value;
            return this;
        },
        setVariantId(value) {
            lineItem.variantId = value;
            return this;
        },
        setQuantity(value) {
            lineItem.quantity = value;
            return this;
        },
        setCustomAttributes(value) {
            lineItem.customAttributes = value;
            return this;
        },
        setHiddenCustomAttributes(value) {
            lineItem.hiddenCustomAttributes = value;
            return this;
        },
        setLineItemType(value) {
            lineItem.lineItemType = value;
            return this;
        },
        setDiscountType(value) {
            lineItem.discountType = value;
            return this;
        },
        setDiscountValue(value) {
            lineItem.discountValue = value;
            return this;
        },
        setDisplayText(value) {
            lineItem.displayText = value;
            return this;
        },
        setFreeQuantity(value) {
            lineItem.freeQuantity = value;
            return this;
        },
        setLineItemHandle(value) {
            lineItem.lineItemHandle = value;
            return this;
        },
        setUnitPrice(value) {
            lineItem.unitPrice = value;
            return this;
        },
        create() {
            return lineItem;
        }
    };
};


/***/ }),

/***/ "./src/utils/createProductImageSliderStyle.ts":
/*!****************************************************!*\
  !*** ./src/utils/createProductImageSliderStyle.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alignStyle": () => (/* binding */ alignStyle),
/* harmony export */   "colorStyle": () => (/* binding */ colorStyle),
/* harmony export */   "sliderMedia": () => (/* binding */ sliderMedia)
/* harmony export */ });
const sliderMedia = function () {
    let url = null;
    let imageId = null;
    let video_url = null;
    let variantIds;
    return {
        setUrl(value) {
            url = value;
            return this;
        },
        setImageId(value) {
            imageId = value;
            return this;
        },
        setVideoUrl(value) {
            video_url = value;
            return this;
        },
        setVariantIds(value) {
            variantIds = value.split(",");
            ;
            return this;
        },
        create() {
            const sliderMedia = {
                imageId,
                variantIds
            };
            if (url) {
                sliderMedia.url = url;
            }
            if (video_url) {
                sliderMedia.video_url = video_url;
            }
            return sliderMedia;
        }
    };
};
const alignStyle = function () {
    let align = null;
    let hide = false;
    return {
        setAlign(value) {
            align = value;
            return this;
        },
        setHide(value) {
            hide = value;
            return this;
        },
        create() {
            const alignStyle = {
                align,
                hide
            };
            return alignStyle;
        }
    };
};
const colorStyle = function () {
    let color = null;
    let hide = false;
    return {
        setColor(value) {
            color = value;
            return this;
        },
        setHide(value) {
            hide = value;
            return this;
        },
        create() {
            const colorStyle = {
                color,
                hide
            };
            return colorStyle;
        }
    };
};


/***/ }),

/***/ "./src/utils/createProductPriceStyle.ts":
/*!**********************************************!*\
  !*** ./src/utils/createProductPriceStyle.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "priceStyle": () => (/* binding */ priceStyle)
/* harmony export */ });
const priceStyle = function () {
    let fontSize = 12;
    let fontColor = null;
    let fontStyle = null;
    let strikeOut = false;
    return {
        setFontSize(value) {
            fontSize = value;
            return this;
        },
        setFontColor(value) {
            fontColor = value;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        setStrikeOut(value) {
            strikeOut = value;
            return this;
        },
        create() {
            const priceStyle = {
                fontSize,
                fontColor,
                fontStyle,
                strikeOut
            };
            return priceStyle;
        }
    };
};


/***/ }),

/***/ "./src/utils/createProductRatingStyle.ts":
/*!***********************************************!*\
  !*** ./src/utils/createProductRatingStyle.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ratingStyle": () => (/* binding */ ratingStyle)
/* harmony export */ });
const ratingStyle = function () {
    let fontSize = 12;
    let fontColor = null;
    let fontStyle = null;
    return {
        setFontSize(value) {
            fontSize = value;
            return this;
        },
        setFontColor(value) {
            fontColor = value;
            return this;
        },
        setFontStyle(value) {
            fontStyle = value;
            return this;
        },
        create() {
            const ratingStyle = {
                fontSize,
                fontColor,
                fontStyle,
            };
            return ratingStyle;
        }
    };
};


/***/ }),

/***/ "./src/utils/errorNormalizer.ts":
/*!**************************************!*\
  !*** ./src/utils/errorNormalizer.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeError": () => (/* binding */ normalizeError)
/* harmony export */ });
const normalizeError = (value) => {
    return {
        code: 1100,
        message: value[0].instancePath.replace('/', '') + ' ' + value[0].message,
        type: 'Internal SDK Error'
    };
};


/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logAction": () => (/* binding */ logAction),
/* harmony export */   "logTrigger": () => (/* binding */ logTrigger)
/* harmony export */ });
/* harmony import */ var _datadog_browser_logs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-logs */ "./node_modules/@datadog/browser-logs/esm/entries/main.js");
/* harmony import */ var _appInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appInfo */ "./src/utils/appInfo.ts");


const initLog = () => {
    _datadog_browser_logs__WEBPACK_IMPORTED_MODULE_0__.datadogLogs.init({
        clientToken: 'pub80a531df319db500fb0a92b7316a1bea',
        site: 'datadoghq.com',
        forwardErrorsToLogs: true,
        sampleRate: 100,
        service: 'js-sdk'
    });
};
const log = (info) => {
    _datadog_browser_logs__WEBPACK_IMPORTED_MODULE_0__.datadogLogs.logger.info('Vajro JS SDK Logs', Object.assign(Object.assign({}, info), { env: 'production' }));
};
const logAction = (action, data, output, error, duration) => {
    let { appId, appVersion, mobilePlatform, location } = (0,_appInfo__WEBPACK_IMPORTED_MODULE_1__.getAppInfo)();
    const info = {
        app: {
            app_id: appId,
            app_version: appVersion,
            mobile_platform: mobilePlatform,
            time_utc: Math.round(Date.now() / 1000),
            duration,
            location,
            action: {
                name: action,
                input_params: data,
                output_params: output,
                error: error
            }
        }
    };
    log(info);
};
const logTrigger = (trigger, data) => {
    let { appId, appVersion, mobilePlatform, location } = (0,_appInfo__WEBPACK_IMPORTED_MODULE_1__.getAppInfo)();
    const info = {
        app: {
            app_id: appId,
            app_version: appVersion,
            mobile_platform: mobilePlatform,
            location,
            time_utc: Math.round(Date.now() / 1000),
            trigger: {
                name: trigger,
                input_params: data,
                output_params: null,
                error: null
            }
        }
    };
    log(info);
};
initLog();


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCartStyle": () => (/* reexport safe */ _createAddToCartStyle__WEBPACK_IMPORTED_MODULE_3__.addToCartStyle),
/* harmony export */   "alignStyle": () => (/* reexport safe */ _createProductImageSliderStyle__WEBPACK_IMPORTED_MODULE_4__.alignStyle),
/* harmony export */   "colorStyle": () => (/* reexport safe */ _createProductImageSliderStyle__WEBPACK_IMPORTED_MODULE_4__.colorStyle),
/* harmony export */   "lineItem": () => (/* reexport safe */ _createLineItem__WEBPACK_IMPORTED_MODULE_0__.lineItem),
/* harmony export */   "priceStyle": () => (/* reexport safe */ _createProductPriceStyle__WEBPACK_IMPORTED_MODULE_1__.priceStyle),
/* harmony export */   "ratingStyle": () => (/* reexport safe */ _createProductRatingStyle__WEBPACK_IMPORTED_MODULE_2__.ratingStyle),
/* harmony export */   "sliderMedia": () => (/* reexport safe */ _createProductImageSliderStyle__WEBPACK_IMPORTED_MODULE_4__.sliderMedia)
/* harmony export */ });
/* harmony import */ var _createLineItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createLineItem */ "./src/utils/createLineItem.ts");
/* harmony import */ var _createProductPriceStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createProductPriceStyle */ "./src/utils/createProductPriceStyle.ts");
/* harmony import */ var _createProductRatingStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createProductRatingStyle */ "./src/utils/createProductRatingStyle.ts");
/* harmony import */ var _createAddToCartStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createAddToCartStyle */ "./src/utils/createAddToCartStyle.ts");
/* harmony import */ var _createProductImageSliderStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createProductImageSliderStyle */ "./src/utils/createProductImageSliderStyle.ts");







/***/ }),

/***/ "./node_modules/uri-js/dist/es5/uri.all.js":
/*!*************************************************!*\
  !*** ./node_modules/uri-js/dist/es5/uri.all.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {

/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uri.all.js.map


/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')


/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


/***/ }),

/***/ "./node_modules/ajv/dist/refs/data.json":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/refs/data.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$id":"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON AnySchema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-draft-07.json":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-draft-07.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Triggers": () => (/* reexport safe */ _constants_triggers__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "actionDidComplete": () => (/* reexport safe */ _communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__.actionDidComplete),
/* harmony export */   "addCouponCode": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.addCouponCode),
/* harmony export */   "addLineItemToCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.addLineItemToCart),
/* harmony export */   "addMultipleLineItemsToCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.addMultipleLineItemsToCart),
/* harmony export */   "addOrderCustomAttributes": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.addOrderCustomAttributes),
/* harmony export */   "addToCart": () => (/* reexport safe */ _ui_actions_addToCart_action__WEBPACK_IMPORTED_MODULE_12__.addToCart),
/* harmony export */   "cartCleared": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.cartCleared),
/* harmony export */   "checkoutCompleted": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.checkoutCompleted),
/* harmony export */   "customAddButton": () => (/* reexport safe */ _ui_actions_customAddButton_actions__WEBPACK_IMPORTED_MODULE_14__.customAddButton),
/* harmony export */   "destroyWebView": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.destroyWebView),
/* harmony export */   "getVar": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.getVar),
/* harmony export */   "lineItemAddedToCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.lineItemAddedToCart),
/* harmony export */   "lineItemUpdated": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.lineItemUpdated),
/* harmony export */   "navigateTo": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.navigateTo),
/* harmony export */   "onCheckoutButtonClicked": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.onCheckoutButtonClicked),
/* harmony export */   "onPageLoaded": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.onPageLoaded),
/* harmony export */   "onWebViewDestroy": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.onWebViewDestroy),
/* harmony export */   "productImageSlider": () => (/* reexport safe */ _ui_actions_productImageSlider_action__WEBPACK_IMPORTED_MODULE_15__.productImageSlider),
/* harmony export */   "productName": () => (/* reexport safe */ _ui_actions_productName_action__WEBPACK_IMPORTED_MODULE_8__.productName),
/* harmony export */   "productOptionSelected": () => (/* reexport safe */ _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__.productOptionSelected),
/* harmony export */   "productPrice": () => (/* reexport safe */ _ui_actions_productPrice_action__WEBPACK_IMPORTED_MODULE_10__.productPrice),
/* harmony export */   "productRating": () => (/* reexport safe */ _ui_actions_productRating_action__WEBPACK_IMPORTED_MODULE_11__.productRating),
/* harmony export */   "recentlyViewedProducts": () => (/* reexport safe */ _ui_actions_recentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_13__.recentlyViewedProducts),
/* harmony export */   "removeCouponCode": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.removeCouponCode),
/* harmony export */   "removeLineItemFromCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.removeLineItemFromCart),
/* harmony export */   "removeMultipleLineItemsFromCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.removeMultipleLineItemsFromCart),
/* harmony export */   "removeOrderCustomAttributes": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.removeOrderCustomAttributes),
/* harmony export */   "setCodeBlockContent": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.setCodeBlockContent),
/* harmony export */   "setVar": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.setVar),
/* harmony export */   "showToastMessage": () => (/* reexport safe */ _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__.showToastMessage),
/* harmony export */   "subscribe": () => (/* reexport safe */ _communications_listeners__WEBPACK_IMPORTED_MODULE_4__.subscribe),
/* harmony export */   "ui": () => (/* reexport safe */ _ui_actions_UIActions__WEBPACK_IMPORTED_MODULE_6__.ui),
/* harmony export */   "uiComponents": () => (/* reexport safe */ _ui_actions_uiComponents_action__WEBPACK_IMPORTED_MODULE_7__.uiComponents),
/* harmony export */   "updateLineItemInCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.updateLineItemInCart),
/* harmony export */   "updateMultipleLineItemsToCart": () => (/* reexport safe */ _methods_methods__WEBPACK_IMPORTED_MODULE_0__.updateMultipleLineItemsToCart),
/* harmony export */   "utils": () => (/* reexport module object */ _utils_utils__WEBPACK_IMPORTED_MODULE_18__),
/* harmony export */   "vendorName": () => (/* reexport safe */ _ui_actions_vendorName_action__WEBPACK_IMPORTED_MODULE_9__.vendorName)
/* harmony export */ });
/* harmony import */ var _methods_methods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/methods */ "./src/methods/methods.ts");
/* harmony import */ var _common_actions_commonActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common-actions/commonActions */ "./src/common-actions/commonActions.ts");
/* harmony import */ var _communications_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./communications/dispatcher */ "./src/communications/dispatcher.ts");
/* harmony import */ var _constants_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/triggers */ "./src/constants/triggers.ts");
/* harmony import */ var _communications_listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./communications/listeners */ "./src/communications/listeners.ts");
/* harmony import */ var _common_triggers_commonTriggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common-triggers/commonTriggers */ "./src/common-triggers/commonTriggers.ts");
/* harmony import */ var _ui_actions_UIActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui-actions/UIActions */ "./src/ui-actions/UIActions.ts");
/* harmony import */ var _ui_actions_uiComponents_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui-actions/uiComponents.action */ "./src/ui-actions/uiComponents.action.ts");
/* harmony import */ var _ui_actions_productName_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui-actions/productName.action */ "./src/ui-actions/productName.action.ts");
/* harmony import */ var _ui_actions_vendorName_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui-actions/vendorName.action */ "./src/ui-actions/vendorName.action.ts");
/* harmony import */ var _ui_actions_productPrice_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ui-actions/productPrice.action */ "./src/ui-actions/productPrice.action.ts");
/* harmony import */ var _ui_actions_productRating_action__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui-actions/productRating.action */ "./src/ui-actions/productRating.action.ts");
/* harmony import */ var _ui_actions_addToCart_action__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ui-actions/addToCart.action */ "./src/ui-actions/addToCart.action.ts");
/* harmony import */ var _ui_actions_recentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui-actions/recentlyViewedProducts.action */ "./src/ui-actions/recentlyViewedProducts.action.ts");
/* harmony import */ var _ui_actions_customAddButton_actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui-actions/customAddButton.actions */ "./src/ui-actions/customAddButton.actions.ts");
/* harmony import */ var _ui_actions_productImageSlider_action__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui-actions/productImageSlider.action */ "./src/ui-actions/productImageSlider.action.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _utils_appInfo__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/appInfo */ "./src/utils/appInfo.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");




















(0,_utils_appInfo__WEBPACK_IMPORTED_MODULE_17__.initAppInfo)();

})();

VajroSDK = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=vajro-sdk.js.map