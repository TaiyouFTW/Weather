(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {
  /***/
  "./node_modules/@angular/cdk/esm2015/collections.js":
  /*!**********************************************************!*\
    !*** ./node_modules/@angular/cdk/esm2015/collections.js ***!
    \**********************************************************/

  /*! exports provided: UniqueSelectionDispatcher, ArrayDataSource, isDataSource, DataSource, getMultipleValuesInSingleSelectionError, SelectionModel */

  /***/
  function node_modulesAngularCdkEsm2015CollectionsJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UniqueSelectionDispatcher", function () {
      return UniqueSelectionDispatcher;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ArrayDataSource", function () {
      return ArrayDataSource;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "isDataSource", function () {
      return isDataSource;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataSource", function () {
      return DataSource;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMultipleValuesInSingleSelectionError", function () {
      return getMultipleValuesInSingleSelectionError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SelectionModel", function () {
      return SelectionModel;
    });
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @abstract
     * @template T
     */


    class DataSource {}
    /**
     * Checks whether an object is a data source.
     * @param {?} value
     * @return {?}
     */


    function isDataSource(value) {
      // Check if the value is a DataSource by observing if it has a connect function. Cannot
      // be checked as an `instanceof DataSource` since people could create their own sources
      // that match the interface, but don't extend DataSource.
      return value && typeof value.connect === 'function';
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * DataSource wrapper for a native array.
     * @template T
     */


    class ArrayDataSource extends DataSource {
      /**
       * @param {?} _data
       */
      constructor(_data) {
        super();
        this._data = _data;
      }
      /**
       * @return {?}
       */


      connect() {
        return this._data instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"] ? this._data : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(this._data);
      }
      /**
       * @return {?}
       */


      disconnect() {}

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Class to be used to power selecting one or more options from a list.
     * @template T
     */


    class SelectionModel {
      /**
       * @param {?=} _multiple
       * @param {?=} initiallySelectedValues
       * @param {?=} _emitChanges
       */
      constructor(_multiple = false, initiallySelectedValues, _emitChanges = true) {
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */

        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */

        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected options that haven't been emitted by the change event.
         */

        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */

        this.changed = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        /**
         * Event emitted when the value has changed.
         * @deprecated Use `changed` instead.
         * \@breaking-change 8.0.0 To be changed to `changed`
         */

        this.onChange = this.changed;

        if (initiallySelectedValues && initiallySelectedValues.length) {
          if (_multiple) {
            initiallySelectedValues.forEach(
            /**
            * @param {?} value
            * @return {?}
            */
            value => this._markSelected(value));
          } else {
            this._markSelected(initiallySelectedValues[0]);
          } // Clear the array in order to avoid firing the change event for preselected values.


          this._selectedToEmit.length = 0;
        }
      }
      /**
       * Selected values.
       * @return {?}
       */


      get selected() {
        if (!this._selected) {
          this._selected = Array.from(this._selection.values());
        }

        return this._selected;
      }
      /**
       * Selects a value or an array of values.
       * @param {...?} values
       * @return {?}
       */


      select(...values) {
        this._verifyValueAssignment(values);

        values.forEach(
        /**
        * @param {?} value
        * @return {?}
        */
        value => this._markSelected(value));

        this._emitChangeEvent();
      }
      /**
       * Deselects a value or an array of values.
       * @param {...?} values
       * @return {?}
       */


      deselect(...values) {
        this._verifyValueAssignment(values);

        values.forEach(
        /**
        * @param {?} value
        * @return {?}
        */
        value => this._unmarkSelected(value));

        this._emitChangeEvent();
      }
      /**
       * Toggles a value between selected and deselected.
       * @param {?} value
       * @return {?}
       */


      toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
      }
      /**
       * Clears all of the selected values.
       * @return {?}
       */


      clear() {
        this._unmarkAll();

        this._emitChangeEvent();
      }
      /**
       * Determines whether a value is selected.
       * @param {?} value
       * @return {?}
       */


      isSelected(value) {
        return this._selection.has(value);
      }
      /**
       * Determines whether the model does not have a value.
       * @return {?}
       */


      isEmpty() {
        return this._selection.size === 0;
      }
      /**
       * Determines whether the model has a value.
       * @return {?}
       */


      hasValue() {
        return !this.isEmpty();
      }
      /**
       * Sorts the selected values based on a predicate function.
       * @param {?=} predicate
       * @return {?}
       */


      sort(predicate) {
        if (this._multiple && this.selected) {
          /** @type {?} */
          this._selected.sort(predicate);
        }
      }
      /**
       * Gets whether multiple values can be selected.
       * @return {?}
       */


      isMultipleSelection() {
        return this._multiple;
      }
      /**
       * Emits a change event and clears the records of selected and deselected values.
       * @private
       * @return {?}
       */


      _emitChangeEvent() {
        // Clear the selected values so they can be re-cached.
        this._selected = null;

        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
          this.changed.next({
            source: this,
            added: this._selectedToEmit,
            removed: this._deselectedToEmit
          });
          this._deselectedToEmit = [];
          this._selectedToEmit = [];
        }
      }
      /**
       * Selects a value.
       * @private
       * @param {?} value
       * @return {?}
       */


      _markSelected(value) {
        if (!this.isSelected(value)) {
          if (!this._multiple) {
            this._unmarkAll();
          }

          this._selection.add(value);

          if (this._emitChanges) {
            this._selectedToEmit.push(value);
          }
        }
      }
      /**
       * Deselects a value.
       * @private
       * @param {?} value
       * @return {?}
       */


      _unmarkSelected(value) {
        if (this.isSelected(value)) {
          this._selection.delete(value);

          if (this._emitChanges) {
            this._deselectedToEmit.push(value);
          }
        }
      }
      /**
       * Clears out the selected values.
       * @private
       * @return {?}
       */


      _unmarkAll() {
        if (!this.isEmpty()) {
          this._selection.forEach(
          /**
          * @param {?} value
          * @return {?}
          */
          value => this._unmarkSelected(value));
        }
      }
      /**
       * Verifies the value assignment and throws an error if the specified value array is
       * including multiple values while the selection model is not supporting multiple values.
       * @private
       * @param {?} values
       * @return {?}
       */


      _verifyValueAssignment(values) {
        if (values.length > 1 && !this._multiple) {
          throw getMultipleValuesInSingleSelectionError();
        }
      }

    }
    /**
     * Returns an error that reports that multiple values are passed into a selection model
     * with a single value.
     * \@docs-private
     * @return {?}
     */


    function getMultipleValuesInSingleSelectionError() {
      return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Class to coordinate unique selection based on name.
     * Intended to be consumed as an Angular service.
     * This service is needed because native radio change events are only fired on the item currently
     * being selected, and we still need to uncheck the previous selection.
     *
     * This service does not *store* any IDs and names because they may change at any time, so it is
     * less error-prone if they are simply passed through when the events occur.
     */


    class UniqueSelectionDispatcher {
      constructor() {
        this._listeners = [];
      }
      /**
       * Notify other items that selection for the given name has been set.
       * @param {?} id ID of the item.
       * @param {?} name Name of the item.
       * @return {?}
       */


      notify(id, name) {
        for (let listener of this._listeners) {
          listener(id, name);
        }
      }
      /**
       * Listen for future changes to item selection.
       * @param {?} listener
       * @return {?} Function used to deregister listener
       */


      listen(listener) {
        this._listeners.push(listener);

        return (
          /**
          * @return {?}
          */
          () => {
            this._listeners = this._listeners.filter(
            /**
            * @param {?} registered
            * @return {?}
            */
            registered => {
              return listener !== registered;
            });
          }
        );
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._listeners = [];
      }

    }

    UniqueSelectionDispatcher.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    UniqueSelectionDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({
      factory: function UniqueSelectionDispatcher_Factory() {
        return new UniqueSelectionDispatcher();
      },
      token: UniqueSelectionDispatcher,
      providedIn: "root"
    });
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=collections.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/cdk/esm2015/overlay.js":
  /*!******************************************************!*\
    !*** ./node_modules/@angular/cdk/esm2015/overlay.js ***!
    \******************************************************/

  /*! exports provided: ViewportRuler, VIEWPORT_RULER_PROVIDER, CdkScrollable, ScrollDispatcher, Overlay, OverlayContainer, CdkOverlayOrigin, CdkConnectedOverlay, FullscreenOverlayContainer, OverlayRef, OverlayKeyboardDispatcher, OverlayPositionBuilder, GlobalPositionStrategy, ConnectedPositionStrategy, FlexibleConnectedPositionStrategy, OverlayConfig, validateVerticalPosition, validateHorizontalPosition, ConnectionPositionPair, ScrollingVisibility, ConnectedOverlayPositionChange, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, OverlayModule, OVERLAY_PROVIDERS, ɵg, ɵf, ɵb, ɵa, ɵc, ɵe, ɵd */

  /***/
  function node_modulesAngularCdkEsm2015OverlayJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Overlay", function () {
      return Overlay;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayContainer", function () {
      return OverlayContainer;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkOverlayOrigin", function () {
      return CdkOverlayOrigin;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkConnectedOverlay", function () {
      return CdkConnectedOverlay;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FullscreenOverlayContainer", function () {
      return FullscreenOverlayContainer;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayRef", function () {
      return OverlayRef;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayKeyboardDispatcher", function () {
      return OverlayKeyboardDispatcher;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayPositionBuilder", function () {
      return OverlayPositionBuilder;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GlobalPositionStrategy", function () {
      return GlobalPositionStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectedPositionStrategy", function () {
      return ConnectedPositionStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FlexibleConnectedPositionStrategy", function () {
      return FlexibleConnectedPositionStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayConfig", function () {
      return OverlayConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "validateVerticalPosition", function () {
      return validateVerticalPosition;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "validateHorizontalPosition", function () {
      return validateHorizontalPosition;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectionPositionPair", function () {
      return ConnectionPositionPair;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ScrollingVisibility", function () {
      return ScrollingVisibility;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConnectedOverlayPositionChange", function () {
      return ConnectedOverlayPositionChange;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ScrollStrategyOptions", function () {
      return ScrollStrategyOptions;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RepositionScrollStrategy", function () {
      return RepositionScrollStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CloseScrollStrategy", function () {
      return CloseScrollStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NoopScrollStrategy", function () {
      return NoopScrollStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BlockScrollStrategy", function () {
      return BlockScrollStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayModule", function () {
      return OverlayModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OVERLAY_PROVIDERS", function () {
      return OVERLAY_PROVIDERS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵg", function () {
      return OVERLAY_KEYBOARD_DISPATCHER_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵf", function () {
      return OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵb", function () {
      return OVERLAY_CONTAINER_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵa", function () {
      return OVERLAY_CONTAINER_PROVIDER_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵc", function () {
      return CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵe", function () {
      return CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵd", function () {
      return CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY;
    });
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "ViewportRuler", function () {
      return _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ViewportRuler"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "VIEWPORT_RULER_PROVIDER", function () {
      return _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["VIEWPORT_RULER_PROVIDER"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "CdkScrollable", function () {
      return _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["CdkScrollable"];
    });
    /* harmony reexport (safe) */


    __webpack_require__.d(__webpack_exports__, "ScrollDispatcher", function () {
      return _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ScrollDispatcher"];
    });
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/cdk/portal */
    "./node_modules/@angular/cdk/esm2015/portal.js");
    /* harmony import */


    var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/cdk/keycodes */
    "./node_modules/@angular/cdk/esm2015/keycodes.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Strategy that will prevent the user from scrolling while the overlay is visible.
     */


    class BlockScrollStrategy {
      /**
       * @param {?} _viewportRuler
       * @param {?} document
       */
      constructor(_viewportRuler, document) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = {
          top: '',
          left: ''
        };
        this._isEnabled = false;
        this._document = document;
      }
      /**
       * Attaches this scroll strategy to an overlay.
       * @return {?}
       */


      attach() {}
      /**
       * Blocks page-level scroll while the attached overlay is open.
       * @return {?}
       */


      enable() {
        if (this._canBeEnabled()) {
          /** @type {?} */
          const root =
          /** @type {?} */
          this._document.documentElement;
          this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(); // Cache the previous inline styles in case the user had set them.

          this._previousHTMLStyles.left = root.style.left || '';
          this._previousHTMLStyles.top = root.style.top || ''; // Note: we're using the `html` node, instead of the `body`, because the `body` may
          // have the user agent margin, whereas the `html` is guaranteed not to have one.

          root.style.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(-this._previousScrollPosition.left);
          root.style.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(-this._previousScrollPosition.top);
          root.classList.add('cdk-global-scrollblock');
          this._isEnabled = true;
        }
      }
      /**
       * Unblocks page-level scroll while the attached overlay is open.
       * @return {?}
       */


      disable() {
        if (this._isEnabled) {
          /** @type {?} */
          const html =
          /** @type {?} */
          this._document.documentElement;
          /** @type {?} */

          const body =
          /** @type {?} */
          this._document.body;
          /** @type {?} */

          const htmlStyle =
          /** @type {?} */
          html.style;
          /** @type {?} */

          const bodyStyle =
          /** @type {?} */
          body.style;
          /** @type {?} */

          const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || '';
          /** @type {?} */

          const previousBodyScrollBehavior = bodyStyle.scrollBehavior || '';
          this._isEnabled = false;
          htmlStyle.left = this._previousHTMLStyles.left;
          htmlStyle.top = this._previousHTMLStyles.top;
          html.classList.remove('cdk-global-scrollblock'); // Disable user-defined smooth scrolling temporarily while we restore the scroll position.
          // See https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior

          htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = 'auto';
          window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
          htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
          bodyStyle.scrollBehavior = previousBodyScrollBehavior;
        }
      }
      /**
       * @private
       * @return {?}
       */


      _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.

        /** @type {?} */
        const html =
        /** @type {?} */
        this._document.documentElement;

        if (html.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
          return false;
        }
        /** @type {?} */


        const body = this._document.body;
        /** @type {?} */

        const viewport = this._viewportRuler.getViewportSize();

        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
     * @return {?}
     */


    function getMatScrollStrategyAlreadyAttachedError() {
      return Error("Scroll strategy has already been attached.");
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Strategy that will close the overlay as soon as the user starts scrolling.
     */


    class CloseScrollStrategy {
      /**
       * @param {?} _scrollDispatcher
       * @param {?} _ngZone
       * @param {?} _viewportRuler
       * @param {?=} _config
       */
      constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._config = _config;
        this._scrollSubscription = null;
        /**
         * Detaches the overlay ref and disables the scroll strategy.
         */

        this._detach =
        /**
        * @return {?}
        */
        () => {
          this.disable();

          if (this._overlayRef.hasAttached()) {
            this._ngZone.run(
            /**
            * @return {?}
            */
            () => this._overlayRef.detach());
          }
        };
      }
      /**
       * Attaches this scroll strategy to an overlay.
       * @param {?} overlayRef
       * @return {?}
       */


      attach(overlayRef) {
        if (this._overlayRef) {
          throw getMatScrollStrategyAlreadyAttachedError();
        }

        this._overlayRef = overlayRef;
      }
      /**
       * Enables the closing of the attached overlay on scroll.
       * @return {?}
       */


      enable() {
        if (this._scrollSubscription) {
          return;
        }
        /** @type {?} */


        const stream = this._scrollDispatcher.scrolled(0);

        if (this._config && this._config.threshold && this._config.threshold > 1) {
          this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
          this._scrollSubscription = stream.subscribe(
          /**
          * @return {?}
          */
          () => {
            /** @type {?} */
            const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;

            if (Math.abs(scrollPosition - this._initialScrollPosition) >
            /** @type {?} */

            /** @type {?} */
            this._config.threshold) {
              this._detach();
            } else {
              this._overlayRef.updatePosition();
            }
          });
        } else {
          this._scrollSubscription = stream.subscribe(this._detach);
        }
      }
      /**
       * Disables the closing the attached overlay on scroll.
       * @return {?}
       */


      disable() {
        if (this._scrollSubscription) {
          this._scrollSubscription.unsubscribe();

          this._scrollSubscription = null;
        }
      }
      /**
       * @return {?}
       */


      detach() {
        this.disable();
        this._overlayRef =
        /** @type {?} */
        null;
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Scroll strategy that doesn't do anything.
     */


    class NoopScrollStrategy {
      /**
       * Does nothing, as this scroll strategy is a no-op.
       * @return {?}
       */
      enable() {}
      /**
       * Does nothing, as this scroll strategy is a no-op.
       * @return {?}
       */


      disable() {}
      /**
       * Does nothing, as this scroll strategy is a no-op.
       * @return {?}
       */


      attach() {}

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // TODO(jelbourn): move this to live with the rest of the scrolling code
    // TODO(jelbourn): someday replace this with IntersectionObservers

    /**
     * Gets whether an element is scrolled outside of view by any of its parent scrolling containers.
     * \@docs-private
     * @param {?} element Dimensions of the element (from getBoundingClientRect)
     * @param {?} scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
     * @return {?} Whether the element is scrolled out of view
     */


    function isElementScrolledOutsideView(element, scrollContainers) {
      return scrollContainers.some(
      /**
      * @param {?} containerBounds
      * @return {?}
      */
      containerBounds => {
        /** @type {?} */
        const outsideAbove = element.bottom < containerBounds.top;
        /** @type {?} */

        const outsideBelow = element.top > containerBounds.bottom;
        /** @type {?} */

        const outsideLeft = element.right < containerBounds.left;
        /** @type {?} */

        const outsideRight = element.left > containerBounds.right;
        return outsideAbove || outsideBelow || outsideLeft || outsideRight;
      });
    }
    /**
     * Gets whether an element is clipped by any of its scrolling containers.
     * \@docs-private
     * @param {?} element Dimensions of the element (from getBoundingClientRect)
     * @param {?} scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
     * @return {?} Whether the element is clipped
     */


    function isElementClippedByScrolling(element, scrollContainers) {
      return scrollContainers.some(
      /**
      * @param {?} scrollContainerRect
      * @return {?}
      */
      scrollContainerRect => {
        /** @type {?} */
        const clippedAbove = element.top < scrollContainerRect.top;
        /** @type {?} */

        const clippedBelow = element.bottom > scrollContainerRect.bottom;
        /** @type {?} */

        const clippedLeft = element.left < scrollContainerRect.left;
        /** @type {?} */

        const clippedRight = element.right > scrollContainerRect.right;
        return clippedAbove || clippedBelow || clippedLeft || clippedRight;
      });
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Strategy that will update the element position as the user is scrolling.
     */


    class RepositionScrollStrategy {
      /**
       * @param {?} _scrollDispatcher
       * @param {?} _viewportRuler
       * @param {?} _ngZone
       * @param {?=} _config
       */
      constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        this._config = _config;
        this._scrollSubscription = null;
      }
      /**
       * Attaches this scroll strategy to an overlay.
       * @param {?} overlayRef
       * @return {?}
       */


      attach(overlayRef) {
        if (this._overlayRef) {
          throw getMatScrollStrategyAlreadyAttachedError();
        }

        this._overlayRef = overlayRef;
      }
      /**
       * Enables repositioning of the attached overlay on scroll.
       * @return {?}
       */


      enable() {
        if (!this._scrollSubscription) {
          /** @type {?} */
          const throttle = this._config ? this._config.scrollThrottle : 0;
          this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(
          /**
          * @return {?}
          */
          () => {
            this._overlayRef.updatePosition(); // TODO(crisbeto): make `close` on by default once all components can handle it.


            if (this._config && this._config.autoClose) {
              /** @type {?} */
              const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();

              const {
                width,
                height
              } = this._viewportRuler.getViewportSize(); // TODO(crisbeto): include all ancestor scroll containers here once
              // we have a way of exposing the trigger element to the scroll strategy.

              /** @type {?} */


              const parentRects = [{
                width,
                height,
                bottom: height,
                right: width,
                top: 0,
                left: 0
              }];

              if (isElementScrolledOutsideView(overlayRect, parentRects)) {
                this.disable();

                this._ngZone.run(
                /**
                * @return {?}
                */
                () => this._overlayRef.detach());
              }
            }
          });
        }
      }
      /**
       * Disables repositioning of the attached overlay on scroll.
       * @return {?}
       */


      disable() {
        if (this._scrollSubscription) {
          this._scrollSubscription.unsubscribe();

          this._scrollSubscription = null;
        }
      }
      /**
       * @return {?}
       */


      detach() {
        this.disable();
        this._overlayRef =
        /** @type {?} */
        null;
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Options for how an overlay will handle scrolling.
     *
     * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
     * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
     */


    class ScrollStrategyOptions {
      /**
       * @param {?} _scrollDispatcher
       * @param {?} _viewportRuler
       * @param {?} _ngZone
       * @param {?} document
       */
      constructor(_scrollDispatcher, _viewportRuler, _ngZone, document) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        /**
         * Do nothing on scroll.
         */

        this.noop =
        /**
        * @return {?}
        */
        () => new NoopScrollStrategy();
        /**
         * Close the overlay as soon as the user scrolls.
         * @param config Configuration to be used inside the scroll strategy.
         */


        this.close =
        /**
        * @param {?=} config
        * @return {?}
        */
        config => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone, this._viewportRuler, config);
        /**
         * Block scrolling.
         */


        this.block =
        /**
        * @return {?}
        */
        () => new BlockScrollStrategy(this._viewportRuler, this._document);
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */


        this.reposition =
        /**
        * @param {?=} config
        * @return {?}
        */
        config => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);

        this._document = document;
      }

    }

    ScrollStrategyOptions.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    ScrollStrategyOptions.ctorParameters = () => [{
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ScrollDispatcher"]
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ViewportRuler"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }];
    /** @nocollapse */


    ScrollStrategyOptions.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"])({
      factory: function ScrollStrategyOptions_Factory() {
        return new ScrollStrategyOptions(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ScrollDispatcher"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ViewportRuler"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]));
      },
      token: ScrollStrategyOptions,
      providedIn: "root"
    });
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Initial configuration used when creating an overlay.
     */

    class OverlayConfig {
      /**
       * @param {?=} config
       */
      constructor(config) {
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = new NoopScrollStrategy();
        /**
         * Custom class to add to the overlay pane.
         */

        this.panelClass = '';
        /**
         * Whether the overlay has a backdrop.
         */

        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */

        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
         * Note that this usually doesn't include clicking on links (unless the user is using
         * the `HashLocationStrategy`).
         */

        this.disposeOnNavigation = false;

        if (config) {
          /** @type {?} */
          const configKeys =
          /** @type {?} */
          Object.keys(config);

          for (const key of configKeys) {
            if (config[key] !== undefined) {
              // TypeScript, as of version 3.5, sees the left-hand-side of this expression
              // as "I don't know *which* key this is, so the only valid value is the intersection
              // of all the posible values." In this case, that happens to be `undefined`. TypeScript
              // is not smart enough to see that the right-hand-side is actually an access of the same
              // exact type with the same exact key, meaning that the value type must be identical.
              // So we use `any` to work around this.
              this[key] =
              /** @type {?} */
              config[key];
            }
          }
        }
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The points of the origin element and the overlay element to connect.
     */


    class ConnectionPositionPair {
      /**
       * @param {?} origin
       * @param {?} overlay
       * @param {?=} offsetX
       * @param {?=} offsetY
       * @param {?=} panelClass
       */
      constructor(origin, overlay, offsetX, offsetY, panelClass) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.panelClass = panelClass;
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
      }

    }
    /**
     * Set of properties regarding the position of the origin and overlay relative to the viewport
     * with respect to the containing Scrollable elements.
     *
     * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
     * bounds of any one of the strategy's Scrollable's bounding client rectangle.
     *
     * The overlay and origin are outside view if there is no overlap between their bounding client
     * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
     *
     *       -----------                    -----------
     *       | outside |                    | clipped |
     *       |  view   |              --------------------------
     *       |         |              |     |         |        |
     *       ----------               |     -----------        |
     *  --------------------------    |                        |
     *  |                        |    |      Scrollable        |
     *  |                        |    |                        |
     *  |                        |     --------------------------
     *  |      Scrollable        |
     *  |                        |
     *  --------------------------
     *
     * \@docs-private
     */


    class ScrollingVisibility {}
    /**
     * The change event emitted by the strategy when a fallback position is used.
     */


    class ConnectedOverlayPositionChange {
      /**
       * @param {?} connectionPair
       * @param {?} scrollableViewProperties
       */
      constructor(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
      }

    }
    /** @nocollapse */


    ConnectedOverlayPositionChange.ctorParameters = () => [{
      type: ConnectionPositionPair
    }, {
      type: ScrollingVisibility,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
      }]
    }];
    /**
     * Validates whether a vertical position property matches the expected values.
     * \@docs-private
     * @param {?} property Name of the property being validated.
     * @param {?} value Value of the property being validated.
     * @return {?}
     */


    function validateVerticalPosition(property, value) {
      if (value !== 'top' && value !== 'bottom' && value !== 'center') {
        throw Error("ConnectedPosition: Invalid ".concat(property, " \"").concat(value, "\". ") + "Expected \"top\", \"bottom\" or \"center\".");
      }
    }
    /**
     * Validates whether a horizontal position property matches the expected values.
     * \@docs-private
     * @param {?} property Name of the property being validated.
     * @param {?} value Value of the property being validated.
     * @return {?}
     */


    function validateHorizontalPosition(property, value) {
      if (value !== 'start' && value !== 'end' && value !== 'center') {
        throw Error("ConnectedPosition: Invalid ".concat(property, " \"").concat(value, "\". ") + "Expected \"start\", \"end\" or \"center\".");
      }
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Service for dispatching keyboard events that land on the body to appropriate overlay ref,
     * if any. It maintains a list of attached overlays to determine best suited overlay based
     * on event target and order of overlay opens.
     */


    class OverlayKeyboardDispatcher {
      /**
       * @param {?} document
       */
      constructor(document) {
        /**
         * Currently attached overlays in the order they were attached.
         */
        this._attachedOverlays = [];
        /**
         * Keyboard event listener that will be attached to the body.
         */

        this._keydownListener =
        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          /** @type {?} */
          const overlays = this._attachedOverlays;

          for (let i = overlays.length - 1; i > -1; i--) {
            // Dispatch the keydown event to the top overlay which has subscribers to its keydown events.
            // We want to target the most recent overlay, rather than trying to match where the event came
            // from, because some components might open an overlay, but keep focus on a trigger element
            // (e.g. for select and autocomplete). We skip overlays without keydown event subscriptions,
            // because we don't want overlays that don't handle keyboard events to block the ones below
            // them that do.
            if (overlays[i]._keydownEventSubscriptions > 0) {
              overlays[i]._keydownEvents.next(event);

              break;
            }
          }
        };

        this._document = document;
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._detach();
      }
      /**
       * Add a new overlay to the list of attached overlay refs.
       * @param {?} overlayRef
       * @return {?}
       */


      add(overlayRef) {
        // Ensure that we don't get the same overlay multiple times.
        this.remove(overlayRef); // Lazily start dispatcher once first overlay is added

        if (!this._isAttached) {
          this._document.body.addEventListener('keydown', this._keydownListener);

          this._isAttached = true;
        }

        this._attachedOverlays.push(overlayRef);
      }
      /**
       * Remove an overlay from the list of attached overlay refs.
       * @param {?} overlayRef
       * @return {?}
       */


      remove(overlayRef) {
        /** @type {?} */
        const index = this._attachedOverlays.indexOf(overlayRef);

        if (index > -1) {
          this._attachedOverlays.splice(index, 1);
        } // Remove the global listener once there are no more overlays.


        if (this._attachedOverlays.length === 0) {
          this._detach();
        }
      }
      /**
       * Detaches the global keyboard event listener.
       * @private
       * @return {?}
       */


      _detach() {
        if (this._isAttached) {
          this._document.body.removeEventListener('keydown', this._keydownListener);

          this._isAttached = false;
        }
      }

    }

    OverlayKeyboardDispatcher.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    OverlayKeyboardDispatcher.ctorParameters = () => [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }];
    /** @nocollapse */


    OverlayKeyboardDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"])({
      factory: function OverlayKeyboardDispatcher_Factory() {
        return new OverlayKeyboardDispatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]));
      },
      token: OverlayKeyboardDispatcher,
      providedIn: "root"
    });
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @param {?} dispatcher
     * @param {?} _document
     * @return {?}
     */

    function OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY(dispatcher, _document) {
      return dispatcher || new OverlayKeyboardDispatcher(_document);
    }
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @type {?}
     */


    const OVERLAY_KEYBOARD_DISPATCHER_PROVIDER = {
      // If there is already an OverlayKeyboardDispatcher available, use that.
      // Otherwise, provide a new one.
      provide: OverlayKeyboardDispatcher,
      deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_3__["SkipSelf"](), OverlayKeyboardDispatcher],
      /** @type {?} */
      // Coerce to `InjectionToken` so that the `deps` match the "shape"
      // of the type expected by Angular
      _angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]],
      useFactory: OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Container inside which all overlays will render.
     */

    class OverlayContainer {
      /**
       * @param {?} document
       */
      constructor(document) {
        this._document = document;
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
          this._containerElement.parentNode.removeChild(this._containerElement);
        }
      }
      /**
       * This method returns the overlay container element. It will lazily
       * create the element the first time  it is called to facilitate using
       * the container in non-browser environments.
       * @return {?} the container element
       */


      getContainerElement() {
        if (!this._containerElement) {
          this._createContainer();
        }

        return this._containerElement;
      }
      /**
       * Create the overlay container element, which is simply a div
       * with the 'cdk-overlay-container' class on the document body.
       * @protected
       * @return {?}
       */


      _createContainer() {
        /** @type {?} */
        const containerClass = 'cdk-overlay-container';
        /** @type {?} */

        const previousContainers = this._document.getElementsByClassName(containerClass); // Remove any old containers. This can happen when transitioning from the server to the client.


        for (let i = 0; i < previousContainers.length; i++) {
          /** @type {?} */
          previousContainers[i].parentNode.removeChild(previousContainers[i]);
        }
        /** @type {?} */


        const container = this._document.createElement('div');

        container.classList.add(containerClass);

        this._document.body.appendChild(container);

        this._containerElement = container;
      }

    }

    OverlayContainer.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    OverlayContainer.ctorParameters = () => [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }];
    /** @nocollapse */


    OverlayContainer.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"])({
      factory: function OverlayContainer_Factory() {
        return new OverlayContainer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]));
      },
      token: OverlayContainer,
      providedIn: "root"
    });
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @param {?} parentContainer
     * @param {?} _document
     * @return {?}
     */

    function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer, _document) {
      return parentContainer || new OverlayContainer(_document);
    }
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @type {?}
     */


    const OVERLAY_CONTAINER_PROVIDER = {
      // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
      provide: OverlayContainer,
      deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_3__["SkipSelf"](), OverlayContainer],
      /** @type {?} */
      _angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]],
      useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Reference to an overlay that has been created with the Overlay service.
     * Used to manipulate or dispose of said overlay.
     */

    class OverlayRef {
      /**
       * @param {?} _portalOutlet
       * @param {?} _host
       * @param {?} _pane
       * @param {?} _config
       * @param {?} _ngZone
       * @param {?} _keyboardDispatcher
       * @param {?} _document
       * @param {?=} _location
       */
      constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location) {
        this._portalOutlet = _portalOutlet;
        this._host = _host;
        this._pane = _pane;
        this._config = _config;
        this._ngZone = _ngZone;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._document = _document;
        this._location = _location;
        this._backdropElement = null;
        this._backdropClick = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this._attachments = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this._detachments = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this._locationChanges = rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"].EMPTY;

        this._backdropClickHandler =
        /**
        * @param {?} event
        * @return {?}
        */
        event => this._backdropClick.next(event);

        this._keydownEventsObservable = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"](
        /**
        * @param {?} observer
        * @return {?}
        */
        observer => {
          /** @type {?} */
          const subscription = this._keydownEvents.subscribe(observer);

          this._keydownEventSubscriptions++;
          return (
            /**
            * @return {?}
            */
            () => {
              subscription.unsubscribe();
              this._keydownEventSubscriptions--;
            }
          );
        });
        /**
         * Stream of keydown events dispatched to this overlay.
         */

        this._keydownEvents = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        /**
         * Amount of subscriptions to the keydown events.
         */

        this._keydownEventSubscriptions = 0;

        if (_config.scrollStrategy) {
          this._scrollStrategy = _config.scrollStrategy;

          this._scrollStrategy.attach(this);
        }

        this._positionStrategy = _config.positionStrategy;
      }
      /**
       * The overlay's HTML element
       * @return {?}
       */


      get overlayElement() {
        return this._pane;
      }
      /**
       * The overlay's backdrop HTML element.
       * @return {?}
       */


      get backdropElement() {
        return this._backdropElement;
      }
      /**
       * Wrapper around the panel element. Can be used for advanced
       * positioning where a wrapper with specific styling is
       * required around the overlay pane.
       * @return {?}
       */


      get hostElement() {
        return this._host;
      }
      /**
       * Attaches content, given via a Portal, to the overlay.
       * If the overlay is configured to have a backdrop, it will be created.
       *
       * @param {?} portal Portal instance to which to attach the overlay.
       * @return {?} The portal attachment result.
       */


      attach(portal) {
        /** @type {?} */
        let attachResult = this._portalOutlet.attach(portal);

        if (this._positionStrategy) {
          this._positionStrategy.attach(this);
        } // Update the pane element with the given configuration.


        if (!this._host.parentElement && this._previousHostParent) {
          this._previousHostParent.appendChild(this._host);
        }

        this._updateStackingOrder();

        this._updateElementSize();

        this._updateElementDirection();

        if (this._scrollStrategy) {
          this._scrollStrategy.enable();
        } // Update the position once the zone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.


        this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(
        /**
        * @return {?}
        */
        () => {
          // The overlay could've been detached before the zone has stabilized.
          if (this.hasAttached()) {
            this.updatePosition();
          }
        }); // Enable pointer events for the overlay pane element.


        this._togglePointerEvents(true);

        if (this._config.hasBackdrop) {
          this._attachBackdrop();
        }

        if (this._config.panelClass) {
          this._toggleClasses(this._pane, this._config.panelClass, true);
        } // Only emit the `attachments` event once all other setup is done.


        this._attachments.next(); // Track this overlay by the keyboard dispatcher


        this._keyboardDispatcher.add(this); // @breaking-change 8.0.0 remove the null check for `_location`
        // once the constructor parameter is made required.


        if (this._config.disposeOnNavigation && this._location) {
          this._locationChanges = this._location.subscribe(
          /**
          * @return {?}
          */
          () => this.dispose());
        }

        return attachResult;
      }
      /**
       * Detaches an overlay from a portal.
       * @return {?} The portal detachment result.
       */


      detach() {
        if (!this.hasAttached()) {
          return;
        }

        this.detachBackdrop(); // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.

        this._togglePointerEvents(false);

        if (this._positionStrategy && this._positionStrategy.detach) {
          this._positionStrategy.detach();
        }

        if (this._scrollStrategy) {
          this._scrollStrategy.disable();
        }
        /** @type {?} */


        const detachmentResult = this._portalOutlet.detach(); // Only emit after everything is detached.


        this._detachments.next(); // Remove this overlay from keyboard dispatcher tracking.


        this._keyboardDispatcher.remove(this); // Keeping the host element in DOM the can cause scroll jank, because it still gets
        // rendered, even though it's transparent and unclickable which is why we remove it.


        this._detachContentWhenStable(); // Stop listening for location changes.


        this._locationChanges.unsubscribe();

        return detachmentResult;
      }
      /**
       * Cleans up the overlay from the DOM.
       * @return {?}
       */


      dispose() {
        /** @type {?} */
        const isAttached = this.hasAttached();

        if (this._positionStrategy) {
          this._positionStrategy.dispose();
        }

        this._disposeScrollStrategy();

        this.detachBackdrop();

        this._locationChanges.unsubscribe();

        this._keyboardDispatcher.remove(this);

        this._portalOutlet.dispose();

        this._attachments.complete();

        this._backdropClick.complete();

        this._keydownEvents.complete();

        if (this._host && this._host.parentNode) {
          this._host.parentNode.removeChild(this._host);

          this._host =
          /** @type {?} */
          null;
        }

        this._previousHostParent = this._pane =
        /** @type {?} */
        null;

        if (isAttached) {
          this._detachments.next();
        }

        this._detachments.complete();
      }
      /**
       * Whether the overlay has attached content.
       * @return {?}
       */


      hasAttached() {
        return this._portalOutlet.hasAttached();
      }
      /**
       * Gets an observable that emits when the backdrop has been clicked.
       * @return {?}
       */


      backdropClick() {
        return this._backdropClick.asObservable();
      }
      /**
       * Gets an observable that emits when the overlay has been attached.
       * @return {?}
       */


      attachments() {
        return this._attachments.asObservable();
      }
      /**
       * Gets an observable that emits when the overlay has been detached.
       * @return {?}
       */


      detachments() {
        return this._detachments.asObservable();
      }
      /**
       * Gets an observable of keydown events targeted to this overlay.
       * @return {?}
       */


      keydownEvents() {
        return this._keydownEventsObservable;
      }
      /**
       * Gets the current overlay configuration, which is immutable.
       * @return {?}
       */


      getConfig() {
        return this._config;
      }
      /**
       * Updates the position of the overlay based on the position strategy.
       * @return {?}
       */


      updatePosition() {
        if (this._positionStrategy) {
          this._positionStrategy.apply();
        }
      }
      /**
       * Switches to a new position strategy and updates the overlay position.
       * @param {?} strategy
       * @return {?}
       */


      updatePositionStrategy(strategy) {
        if (strategy === this._positionStrategy) {
          return;
        }

        if (this._positionStrategy) {
          this._positionStrategy.dispose();
        }

        this._positionStrategy = strategy;

        if (this.hasAttached()) {
          strategy.attach(this);
          this.updatePosition();
        }
      }
      /**
       * Update the size properties of the overlay.
       * @param {?} sizeConfig
       * @return {?}
       */


      updateSize(sizeConfig) {
        this._config = Object.assign({}, this._config, sizeConfig);

        this._updateElementSize();
      }
      /**
       * Sets the LTR/RTL direction for the overlay.
       * @param {?} dir
       * @return {?}
       */


      setDirection(dir) {
        this._config = Object.assign({}, this._config, {
          direction: dir
        });

        this._updateElementDirection();
      }
      /**
       * Add a CSS class or an array of classes to the overlay pane.
       * @param {?} classes
       * @return {?}
       */


      addPanelClass(classes) {
        if (this._pane) {
          this._toggleClasses(this._pane, classes, true);
        }
      }
      /**
       * Remove a CSS class or an array of classes from the overlay pane.
       * @param {?} classes
       * @return {?}
       */


      removePanelClass(classes) {
        if (this._pane) {
          this._toggleClasses(this._pane, classes, false);
        }
      }
      /**
       * Returns the layout direction of the overlay panel.
       * @return {?}
       */


      getDirection() {
        /** @type {?} */
        const direction = this._config.direction;

        if (!direction) {
          return 'ltr';
        }

        return typeof direction === 'string' ? direction : direction.value;
      }
      /**
       * Switches to a new scroll strategy.
       * @param {?} strategy
       * @return {?}
       */


      updateScrollStrategy(strategy) {
        if (strategy === this._scrollStrategy) {
          return;
        }

        this._disposeScrollStrategy();

        this._scrollStrategy = strategy;

        if (this.hasAttached()) {
          strategy.attach(this);
          strategy.enable();
        }
      }
      /**
       * Updates the text direction of the overlay panel.
       * @private
       * @return {?}
       */


      _updateElementDirection() {
        this._host.setAttribute('dir', this.getDirection());
      }
      /**
       * Updates the size of the overlay element based on the overlay config.
       * @private
       * @return {?}
       */


      _updateElementSize() {
        if (!this._pane) {
          return;
        }
        /** @type {?} */


        const style = this._pane.style;
        style.width = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.width);
        style.height = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.height);
        style.minWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.minWidth);
        style.minHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.minHeight);
        style.maxWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.maxWidth);
        style.maxHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(this._config.maxHeight);
      }
      /**
       * Toggles the pointer events for the overlay pane element.
       * @private
       * @param {?} enablePointer
       * @return {?}
       */


      _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
      }
      /**
       * Attaches a backdrop for this overlay.
       * @private
       * @return {?}
       */


      _attachBackdrop() {
        /** @type {?} */
        const showingClass = 'cdk-overlay-backdrop-showing';
        this._backdropElement = this._document.createElement('div');

        this._backdropElement.classList.add('cdk-overlay-backdrop');

        if (this._config.backdropClass) {
          this._toggleClasses(this._backdropElement, this._config.backdropClass, true);
        } // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.


        /** @type {?} */
        this._host.parentElement.insertBefore(this._backdropElement, this._host); // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).


        this._backdropElement.addEventListener('click', this._backdropClickHandler); // Add class to fade-in the backdrop after one frame.


        if (typeof requestAnimationFrame !== 'undefined') {
          this._ngZone.runOutsideAngular(
          /**
          * @return {?}
          */
          () => {
            requestAnimationFrame(
            /**
            * @return {?}
            */
            () => {
              if (this._backdropElement) {
                this._backdropElement.classList.add(showingClass);
              }
            });
          });
        } else {
          this._backdropElement.classList.add(showingClass);
        }
      }
      /**
       * Updates the stacking order of the element, moving it to the top if necessary.
       * This is required in cases where one overlay was detached, while another one,
       * that should be behind it, was destroyed. The next time both of them are opened,
       * the stacking will be wrong, because the detached element's pane will still be
       * in its original DOM position.
       * @private
       * @return {?}
       */


      _updateStackingOrder() {
        if (this._host.nextSibling) {
          /** @type {?} */
          this._host.parentNode.appendChild(this._host);
        }
      }
      /**
       * Detaches the backdrop (if any) associated with the overlay.
       * @return {?}
       */


      detachBackdrop() {
        /** @type {?} */
        let backdropToDetach = this._backdropElement;

        if (!backdropToDetach) {
          return;
        }
        /** @type {?} */


        let timeoutId;
        /** @type {?} */

        let finishDetach =
        /**
        * @return {?}
        */
        () => {
          // It may not be attached to anything in certain cases (e.g. unit tests).
          if (backdropToDetach) {
            backdropToDetach.removeEventListener('click', this._backdropClickHandler);
            backdropToDetach.removeEventListener('transitionend', finishDetach);

            if (backdropToDetach.parentNode) {
              backdropToDetach.parentNode.removeChild(backdropToDetach);
            }
          } // It is possible that a new portal has been attached to this overlay since we started
          // removing the backdrop. If that is the case, only clear the backdrop reference if it
          // is still the same instance that we started to remove.


          if (this._backdropElement == backdropToDetach) {
            this._backdropElement = null;
          }

          if (this._config.backdropClass) {
            this._toggleClasses(
            /** @type {?} */
            backdropToDetach, this._config.backdropClass, false);
          }

          clearTimeout(timeoutId);
        };

        backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');

        this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          backdropToDetach.addEventListener('transitionend', finishDetach);
        }); // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
        // In this case we make it unclickable and we try to remove it after a delay.


        backdropToDetach.style.pointerEvents = 'none'; // Run this outside the Angular zone because there's nothing that Angular cares about.
        // If it were to run inside the Angular zone, every test that used Overlay would have to be
        // either async or fakeAsync.

        timeoutId = this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => setTimeout(finishDetach, 500));
      }
      /**
       * Toggles a single CSS class or an array of classes on an element.
       * @private
       * @param {?} element
       * @param {?} cssClasses
       * @param {?} isAdd
       * @return {?}
       */


      _toggleClasses(element, cssClasses, isAdd) {
        /** @type {?} */
        const classList = element.classList;
        Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceArray"])(cssClasses).forEach(
        /**
        * @param {?} cssClass
        * @return {?}
        */
        cssClass => {
          // We can't do a spread here, because IE doesn't support setting multiple classes.
          // Also trying to add an empty string to a DOMTokenList will throw.
          if (cssClass) {
            isAdd ? classList.add(cssClass) : classList.remove(cssClass);
          }
        });
      }
      /**
       * Detaches the overlay content next time the zone stabilizes.
       * @private
       * @return {?}
       */


      _detachContentWhenStable() {
        // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
        // if the consumer is using `zone-patch-rxjs`, the `Subscription.unsubscribe` call will
        // be patched to run inside the zone, which will throw us into an infinite loop.
        this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          // We can't remove the host here immediately, because the overlay pane's content
          // might still be animating. This stream helps us avoid interrupting the animation
          // by waiting for the pane to become empty.

          /** @type {?} */
          const subscription = this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(this._attachments, this._detachments))).subscribe(
          /**
          * @return {?}
          */
          () => {
            // Needs a couple of checks for the pane and host, because
            // they may have been removed by the time the zone stabilizes.
            if (!this._pane || !this._host || this._pane.children.length === 0) {
              if (this._pane && this._config.panelClass) {
                this._toggleClasses(this._pane, this._config.panelClass, false);
              }

              if (this._host && this._host.parentElement) {
                this._previousHostParent = this._host.parentElement;

                this._previousHostParent.removeChild(this._host);
              }

              subscription.unsubscribe();
            }
          });
        });
      }
      /**
       * Disposes of a scroll strategy.
       * @private
       * @return {?}
       */


      _disposeScrollStrategy() {
        /** @type {?} */
        const scrollStrategy = this._scrollStrategy;

        if (scrollStrategy) {
          scrollStrategy.disable();

          if (scrollStrategy.detach) {
            scrollStrategy.detach();
          }
        }
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // TODO: refactor clipping detection into a separate thing (part of scrolling module)
    // TODO: doesn't handle both flexible width and height when it has to scroll along both axis.

    /**
     * Class to be added to the overlay bounding box.
     * @type {?}
     */


    const boundingBoxClass = 'cdk-overlay-connected-position-bounding-box';
    /**
     * A strategy for positioning overlays. Using this strategy, an overlay is given an
     * implicit position relative some origin element. The relative position is defined in terms of
     * a point on the origin element that is connected to a point on the overlay element. For example,
     * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
     * of the overlay.
     */

    class FlexibleConnectedPositionStrategy {
      /**
       * @param {?} connectedTo
       * @param {?} _viewportRuler
       * @param {?} _document
       * @param {?} _platform
       * @param {?} _overlayContainer
       */
      constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
        this._overlayContainer = _overlayContainer;
        /**
         * Last size used for the bounding box. Used to avoid resizing the overlay after open.
         */

        this._lastBoundingBoxSize = {
          width: 0,
          height: 0
        };
        /**
         * Whether the overlay was pushed in a previous positioning.
         */

        this._isPushed = false;
        /**
         * Whether the overlay can be pushed on-screen on the initial open.
         */

        this._canPush = true;
        /**
         * Whether the overlay can grow via flexible width/height after the initial open.
         */

        this._growAfterOpen = false;
        /**
         * Whether the overlay's width and height can be constrained to fit within the viewport.
         */

        this._hasFlexibleDimensions = true;
        /**
         * Whether the overlay position is locked.
         */

        this._positionLocked = false;
        /**
         * Amount of space that must be maintained between the overlay and the edge of the viewport.
         */

        this._viewportMargin = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */

        this._scrollables = [];
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */

        this._preferredPositions = [];
        /**
         * Subject that emits whenever the position changes.
         */

        this._positionChanges = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        /**
         * Subscription to viewport size changes.
         */

        this._resizeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"].EMPTY;
        /**
         * Default offset for the overlay along the x axis.
         */

        this._offsetX = 0;
        /**
         * Default offset for the overlay along the y axis.
         */

        this._offsetY = 0;
        /**
         * Keeps track of the CSS classes that the position strategy has applied on the overlay panel.
         */

        this._appliedPanelClasses = [];
        /**
         * Observable sequence of position changes.
         */

        this.positionChanges = this._positionChanges.asObservable();
        this.setOrigin(connectedTo);
      }
      /**
       * Ordered list of preferred positions, from most to least desirable.
       * @return {?}
       */


      get positions() {
        return this._preferredPositions;
      }
      /**
       * Attaches this position strategy to an overlay.
       * @param {?} overlayRef
       * @return {?}
       */


      attach(overlayRef) {
        if (this._overlayRef && overlayRef !== this._overlayRef) {
          throw Error('This position strategy is already attached to an overlay');
        }

        this._validatePositions();

        overlayRef.hostElement.classList.add(boundingBoxClass);
        this._overlayRef = overlayRef;
        this._boundingBox = overlayRef.hostElement;
        this._pane = overlayRef.overlayElement;
        this._isDisposed = false;
        this._isInitialRender = true;
        this._lastPosition = null;

        this._resizeSubscription.unsubscribe();

        this._resizeSubscription = this._viewportRuler.change().subscribe(
        /**
        * @return {?}
        */
        () => {
          // When the window is resized, we want to trigger the next reposition as if it
          // was an initial render, in order for the strategy to pick a new optimal position,
          // otherwise position locking will cause it to stay at the old one.
          this._isInitialRender = true;
          this.apply();
        });
      }
      /**
       * Updates the position of the overlay element, using whichever preferred position relative
       * to the origin best fits on-screen.
       *
       * The selection of a position goes as follows:
       *  - If any positions fit completely within the viewport as-is,
       *      choose the first position that does so.
       *  - If flexible dimensions are enabled and at least one satifies the given minimum width/height,
       *      choose the position with the greatest available size modified by the positions' weight.
       *  - If pushing is enabled, take the position that went off-screen the least and push it
       *      on-screen.
       *  - If none of the previous criteria were met, use the position that goes off-screen the least.
       * \@docs-private
       * @return {?}
       */


      apply() {
        // We shouldn't do anything if the strategy was disposed or we're on the server.
        if (this._isDisposed || !this._platform.isBrowser) {
          return;
        } // If the position has been applied already (e.g. when the overlay was opened) and the
        // consumer opted into locking in the position, re-use the old position, in order to
        // prevent the overlay from jumping around.


        if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
          this.reapplyLastPosition();
          return;
        }

        this._clearPanelClasses();

        this._resetOverlayElementStyles();

        this._resetBoundingBoxStyles(); // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        // We use the viewport rect to determine whether a position would go off-screen.


        this._viewportRect = this._getNarrowedViewportRect();
        this._originRect = this._getOriginRect();
        this._overlayRect = this._pane.getBoundingClientRect();
        /** @type {?} */

        const originRect = this._originRect;
        /** @type {?} */

        const overlayRect = this._overlayRect;
        /** @type {?} */

        const viewportRect = this._viewportRect; // Positions where the overlay will fit with flexible dimensions.

        /** @type {?} */

        const flexibleFits = []; // Fallback if none of the preferred positions fit within the viewport.

        /** @type {?} */

        let fallback; // Go through each of the preferred positions looking for a good fit.
        // If a good fit is found, it will be applied immediately.

        for (let pos of this._preferredPositions) {
          // Get the exact (x, y) coordinate for the point-of-origin on the origin element.

          /** @type {?} */
          let originPoint = this._getOriginPoint(originRect, pos); // From that point-of-origin, get the exact (x, y) coordinate for the top-left corner of the
          // overlay in this position. We use the top-left corner for calculations and later translate
          // this into an appropriate (top, left, bottom, right) style.

          /** @type {?} */


          let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos); // Calculate how well the overlay would fit into the viewport with this point.

          /** @type {?} */


          let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos); // If the overlay, without any further work, fits into the viewport, use this position.


          if (overlayFit.isCompletelyWithinViewport) {
            this._isPushed = false;

            this._applyPosition(pos, originPoint);

            return;
          } // If the overlay has flexible dimensions, we can use this position
          // so long as there's enough space for the minimum dimensions.


          if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
            // Save positions where the overlay will fit with flexible dimensions. We will use these
            // if none of the positions fit *without* flexible dimensions.
            flexibleFits.push({
              position: pos,
              origin: originPoint,
              overlayRect,
              boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
            });
            continue;
          } // If the current preferred position does not fit on the screen, remember the position
          // if it has more visible area on-screen than we've seen and move onto the next preferred
          // position.


          if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
            fallback = {
              overlayFit,
              overlayPoint,
              originPoint,
              position: pos,
              overlayRect
            };
          }
        } // If there are any positions where the overlay would fit with flexible dimensions, choose the
        // one that has the greatest area available modified by the position's weight


        if (flexibleFits.length) {
          /** @type {?} */
          let bestFit = null;
          /** @type {?} */

          let bestScore = -1;

          for (const fit of flexibleFits) {
            /** @type {?} */
            const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);

            if (score > bestScore) {
              bestScore = score;
              bestFit = fit;
            }
          }

          this._isPushed = false;

          this._applyPosition(
          /** @type {?} */
          bestFit.position,
          /** @type {?} */
          bestFit.origin);

          return;
        } // When none of the preferred positions fit within the viewport, take the position
        // that went off-screen the least and attempt to push it on-screen.


        if (this._canPush) {
          // TODO(jelbourn): after pushing, the opening "direction" of the overlay might not make sense.
          this._isPushed = true;

          this._applyPosition(
          /** @type {?} */
          fallback.position,
          /** @type {?} */
          fallback.originPoint);

          return;
        } // All options for getting the overlay within the viewport have been exhausted, so go with the
        // position that went off-screen the least.


        this._applyPosition(
        /** @type {?} */
        fallback.position,
        /** @type {?} */
        fallback.originPoint);
      }
      /**
       * @return {?}
       */


      detach() {
        this._clearPanelClasses();

        this._lastPosition = null;
        this._previousPushAmount = null;

        this._resizeSubscription.unsubscribe();
      }
      /**
       * Cleanup after the element gets destroyed.
       * @return {?}
       */


      dispose() {
        if (this._isDisposed) {
          return;
        } // We can't use `_resetBoundingBoxStyles` here, because it resets
        // some properties to zero, rather than removing them.


        if (this._boundingBox) {
          extendStyles(this._boundingBox.style,
          /** @type {?} */
          {
            top: '',
            left: '',
            right: '',
            bottom: '',
            height: '',
            width: '',
            alignItems: '',
            justifyContent: ''
          });
        }

        if (this._pane) {
          this._resetOverlayElementStyles();
        }

        if (this._overlayRef) {
          this._overlayRef.hostElement.classList.remove(boundingBoxClass);
        }

        this.detach();

        this._positionChanges.complete();

        this._overlayRef = this._boundingBox =
        /** @type {?} */
        null;
        this._isDisposed = true;
      }
      /**
       * This re-aligns the overlay element with the trigger in its last calculated position,
       * even if a position higher in the "preferred positions" list would now fit. This
       * allows one to re-align the panel without changing the orientation of the panel.
       * @return {?}
       */


      reapplyLastPosition() {
        if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
          this._originRect = this._getOriginRect();
          this._overlayRect = this._pane.getBoundingClientRect();
          this._viewportRect = this._getNarrowedViewportRect();
          /** @type {?} */

          const lastPosition = this._lastPosition || this._preferredPositions[0];
          /** @type {?} */

          const originPoint = this._getOriginPoint(this._originRect, lastPosition);

          this._applyPosition(lastPosition, originPoint);
        }
      }
      /**
       * Sets the list of Scrollable containers that host the origin element so that
       * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
       * Scrollable must be an ancestor element of the strategy's origin element.
       * @template THIS
       * @this {THIS}
       * @param {?} scrollables
       * @return {THIS}
       */


      withScrollableContainers(scrollables) {
        /** @type {?} */
        this._scrollables = scrollables;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Adds new preferred positions.
       * @template THIS
       * @this {THIS}
       * @param {?} positions List of positions options for this overlay.
       * @return {THIS}
       */


      withPositions(positions) {
        /** @type {?} */
        this._preferredPositions = positions; // If the last calculated position object isn't part of the positions anymore, clear
        // it in order to avoid it being picked up if the consumer tries to re-apply.

        if (positions.indexOf(
        /** @type {?} */

        /** @type {?} */
        this._lastPosition) === -1) {
          /** @type {?} */
          this._lastPosition = null;
        }

        /** @type {?} */
        this._validatePositions();

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
       * @template THIS
       * @this {THIS}
       * @param {?} margin Required margin between the overlay and the viewport edge in pixels.
       * @return {THIS}
       */


      withViewportMargin(margin) {
        /** @type {?} */
        this._viewportMargin = margin;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets whether the overlay's width and height can be constrained to fit within the viewport.
       * @template THIS
       * @this {THIS}
       * @param {?=} flexibleDimensions
       * @return {THIS}
       */


      withFlexibleDimensions(flexibleDimensions = true) {
        /** @type {?} */
        this._hasFlexibleDimensions = flexibleDimensions;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets whether the overlay can grow after the initial open via flexible width/height.
       * @template THIS
       * @this {THIS}
       * @param {?=} growAfterOpen
       * @return {THIS}
       */


      withGrowAfterOpen(growAfterOpen = true) {
        /** @type {?} */
        this._growAfterOpen = growAfterOpen;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets whether the overlay can be pushed on-screen if none of the provided positions fit.
       * @template THIS
       * @this {THIS}
       * @param {?=} canPush
       * @return {THIS}
       */


      withPush(canPush = true) {
        /** @type {?} */
        this._canPush = canPush;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets whether the overlay's position should be locked in after it is positioned
       * initially. When an overlay is locked in, it won't attempt to reposition itself
       * when the position is re-applied (e.g. when the user scrolls away).
       * @template THIS
       * @this {THIS}
       * @param {?=} isLocked Whether the overlay should locked in.
       * @return {THIS}
       */


      withLockedPosition(isLocked = true) {
        /** @type {?} */
        this._positionLocked = isLocked;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the origin, relative to which to position the overlay.
       * Using an element origin is useful for building components that need to be positioned
       * relatively to a trigger (e.g. dropdown menus or tooltips), whereas using a point can be
       * used for cases like contextual menus which open relative to the user's pointer.
       * @template THIS
       * @this {THIS}
       * @param {?} origin Reference to the new origin.
       * @return {THIS}
       */


      setOrigin(origin) {
        /** @type {?} */
        this._origin = origin;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the default offset for the overlay's connection point on the x-axis.
       * @template THIS
       * @this {THIS}
       * @param {?} offset New offset in the X axis.
       * @return {THIS}
       */


      withDefaultOffsetX(offset) {
        /** @type {?} */
        this._offsetX = offset;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the default offset for the overlay's connection point on the y-axis.
       * @template THIS
       * @this {THIS}
       * @param {?} offset New offset in the Y axis.
       * @return {THIS}
       */


      withDefaultOffsetY(offset) {
        /** @type {?} */
        this._offsetY = offset;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Configures that the position strategy should set a `transform-origin` on some elements
       * inside the overlay, depending on the current position that is being applied. This is
       * useful for the cases where the origin of an animation can change depending on the
       * alignment of the overlay.
       * @template THIS
       * @this {THIS}
       * @param {?} selector CSS selector that will be used to find the target
       *    elements onto which to set the transform origin.
       * @return {THIS}
       */


      withTransformOriginOn(selector) {
        /** @type {?} */
        this._transformOriginSelector = selector;
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
       * @private
       * @param {?} originRect
       * @param {?} pos
       * @return {?}
       */


      _getOriginPoint(originRect, pos) {
        /** @type {?} */
        let x;

        if (pos.originX == 'center') {
          // Note: when centering we should always use the `left`
          // offset, otherwise the position will be wrong in RTL.
          x = originRect.left + originRect.width / 2;
        } else {
          /** @type {?} */
          const startX = this._isRtl() ? originRect.right : originRect.left;
          /** @type {?} */

          const endX = this._isRtl() ? originRect.left : originRect.right;
          x = pos.originX == 'start' ? startX : endX;
        }
        /** @type {?} */


        let y;

        if (pos.originY == 'center') {
          y = originRect.top + originRect.height / 2;
        } else {
          y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }

        return {
          x,
          y
        };
      }
      /**
       * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
       * origin point to which the overlay should be connected.
       * @private
       * @param {?} originPoint
       * @param {?} overlayRect
       * @param {?} pos
       * @return {?}
       */


      _getOverlayPoint(originPoint, overlayRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the
        // potential overlay position relative to the origin point.

        /** @type {?} */
        let overlayStartX;

        if (pos.overlayX == 'center') {
          overlayStartX = -overlayRect.width / 2;
        } else if (pos.overlayX === 'start') {
          overlayStartX = this._isRtl() ? -overlayRect.width : 0;
        } else {
          overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
        }
        /** @type {?} */


        let overlayStartY;

        if (pos.overlayY == 'center') {
          overlayStartY = -overlayRect.height / 2;
        } else {
          overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        } // The (x, y) coordinates of the overlay.


        return {
          x: originPoint.x + overlayStartX,
          y: originPoint.y + overlayStartY
        };
      }
      /**
       * Gets how well an overlay at the given point will fit within the viewport.
       * @private
       * @param {?} point
       * @param {?} overlay
       * @param {?} viewport
       * @param {?} position
       * @return {?}
       */


      _getOverlayFit(point, overlay, viewport, position) {
        let {
          x,
          y
        } = point;
        /** @type {?} */

        let offsetX = this._getOffset(position, 'x');
        /** @type {?} */


        let offsetY = this._getOffset(position, 'y'); // Account for the offsets since they could push the overlay out of the viewport.


        if (offsetX) {
          x += offsetX;
        }

        if (offsetY) {
          y += offsetY;
        } // How much the overlay would overflow at this position, on each side.

        /** @type {?} */


        let leftOverflow = 0 - x;
        /** @type {?} */

        let rightOverflow = x + overlay.width - viewport.width;
        /** @type {?} */

        let topOverflow = 0 - y;
        /** @type {?} */

        let bottomOverflow = y + overlay.height - viewport.height; // Visible parts of the element on each axis.

        /** @type {?} */

        let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
        /** @type {?} */


        let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
        /** @type {?} */


        let visibleArea = visibleWidth * visibleHeight;
        return {
          visibleArea,
          isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
          fitsInViewportVertically: visibleHeight === overlay.height,
          fitsInViewportHorizontally: visibleWidth == overlay.width
        };
      }
      /**
       * Whether the overlay can fit within the viewport when it may resize either its width or height.
       * @private
       * @param {?} fit How well the overlay fits in the viewport at some position.
       * @param {?} point The (x, y) coordinates of the overlat at some position.
       * @param {?} viewport The geometry of the viewport.
       * @return {?}
       */


      _canFitWithFlexibleDimensions(fit, point, viewport) {
        if (this._hasFlexibleDimensions) {
          /** @type {?} */
          const availableHeight = viewport.bottom - point.y;
          /** @type {?} */

          const availableWidth = viewport.right - point.x;
          /** @type {?} */

          const minHeight = this._overlayRef.getConfig().minHeight;
          /** @type {?} */


          const minWidth = this._overlayRef.getConfig().minWidth;
          /** @type {?} */


          const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
          /** @type {?} */

          const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
          return verticalFit && horizontalFit;
        }

        return false;
      }
      /**
       * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
       * the viewport, the top-left corner will be pushed on-screen (with overflow occuring on the
       * right and bottom).
       *
       * @private
       * @param {?} start Starting point from which the overlay is pushed.
       * @param {?} overlay Dimensions of the overlay.
       * @param {?} scrollPosition Current viewport scroll position.
       * @return {?} The point at which to position the overlay after pushing. This is effectively a new
       *     originPoint.
       */


      _pushOverlayOnScreen(start, overlay, scrollPosition) {
        // If the position is locked and we've pushed the overlay already, reuse the previous push
        // amount, rather than pushing it again. If we were to continue pushing, the element would
        // remain in the viewport, which goes against the expectations when position locking is enabled.
        if (this._previousPushAmount && this._positionLocked) {
          return {
            x: start.x + this._previousPushAmount.x,
            y: start.y + this._previousPushAmount.y
          };
        }
        /** @type {?} */


        const viewport = this._viewportRect; // Determine how much the overlay goes outside the viewport on each
        // side, which we'll use to decide which direction to push it.

        /** @type {?} */

        const overflowRight = Math.max(start.x + overlay.width - viewport.right, 0);
        /** @type {?} */

        const overflowBottom = Math.max(start.y + overlay.height - viewport.bottom, 0);
        /** @type {?} */

        const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
        /** @type {?} */

        const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0); // Amount by which to push the overlay in each axis such that it remains on-screen.

        /** @type {?} */

        let pushX = 0;
        /** @type {?} */

        let pushY = 0; // If the overlay fits completely within the bounds of the viewport, push it from whichever
        // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
        // viewport and allow for the trailing end of the overlay to go out of bounds.

        if (overlay.width <= viewport.width) {
          pushX = overflowLeft || -overflowRight;
        } else {
          pushX = start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0;
        }

        if (overlay.height <= viewport.height) {
          pushY = overflowTop || -overflowBottom;
        } else {
          pushY = start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0;
        }

        this._previousPushAmount = {
          x: pushX,
          y: pushY
        };
        return {
          x: start.x + pushX,
          y: start.y + pushY
        };
      }
      /**
       * Applies a computed position to the overlay and emits a position change.
       * @private
       * @param {?} position The position preference
       * @param {?} originPoint The point on the origin element where the overlay is connected.
       * @return {?}
       */


      _applyPosition(position, originPoint) {
        this._setTransformOrigin(position);

        this._setOverlayElementStyles(originPoint, position);

        this._setBoundingBoxStyles(originPoint, position);

        if (position.panelClass) {
          this._addPanelClasses(position.panelClass);
        } // Save the last connected position in case the position needs to be re-calculated.


        this._lastPosition = position; // Notify that the position has been changed along with its change properties.
        // We only emit if we've got any subscriptions, because the scroll visibility
        // calculcations can be somewhat expensive.

        if (this._positionChanges.observers.length) {
          /** @type {?} */
          const scrollableViewProperties = this._getScrollVisibility();
          /** @type {?} */


          const changeEvent = new ConnectedOverlayPositionChange(position, scrollableViewProperties);

          this._positionChanges.next(changeEvent);
        }

        this._isInitialRender = false;
      }
      /**
       * Sets the transform origin based on the configured selector and the passed-in position.
       * @private
       * @param {?} position
       * @return {?}
       */


      _setTransformOrigin(position) {
        if (!this._transformOriginSelector) {
          return;
        }
        /** @type {?} */


        const elements =
        /** @type {?} */
        this._boundingBox.querySelectorAll(this._transformOriginSelector);
        /** @type {?} */


        let xOrigin;
        /** @type {?} */

        let yOrigin = position.overlayY;

        if (position.overlayX === 'center') {
          xOrigin = 'center';
        } else if (this._isRtl()) {
          xOrigin = position.overlayX === 'start' ? 'right' : 'left';
        } else {
          xOrigin = position.overlayX === 'start' ? 'left' : 'right';
        }

        for (let i = 0; i < elements.length; i++) {
          elements[i].style.transformOrigin = "".concat(xOrigin, " ").concat(yOrigin);
        }
      }
      /**
       * Gets the position and size of the overlay's sizing container.
       *
       * This method does no measuring and applies no styles so that we can cheaply compute the
       * bounds for all positions and choose the best fit based on these results.
       * @private
       * @param {?} origin
       * @param {?} position
       * @return {?}
       */


      _calculateBoundingBoxRect(origin, position) {
        /** @type {?} */
        const viewport = this._viewportRect;
        /** @type {?} */

        const isRtl = this._isRtl();
        /** @type {?} */


        let height;
        /** @type {?} */

        let top;
        /** @type {?} */

        let bottom;

        if (position.overlayY === 'top') {
          // Overlay is opening "downward" and thus is bound by the bottom viewport edge.
          top = origin.y;
          height = viewport.height - top + this._viewportMargin;
        } else if (position.overlayY === 'bottom') {
          // Overlay is opening "upward" and thus is bound by the top viewport edge. We need to add
          // the viewport margin back in, because the viewport rect is narrowed down to remove the
          // margin, whereas the `origin` position is calculated based on its `ClientRect`.
          bottom = viewport.height - origin.y + this._viewportMargin * 2;
          height = viewport.height - bottom + this._viewportMargin;
        } else {
          // If neither top nor bottom, it means that the overlay is vertically centered on the
          // origin point. Note that we want the position relative to the viewport, rather than
          // the page, which is why we don't use something like `viewport.bottom - origin.y` and
          // `origin.y - viewport.top`.

          /** @type {?} */
          const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
          /** @type {?} */

          const previousHeight = this._lastBoundingBoxSize.height;
          height = smallestDistanceToViewportEdge * 2;
          top = origin.y - smallestDistanceToViewportEdge;

          if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
            top = origin.y - previousHeight / 2;
          }
        } // The overlay is opening 'right-ward' (the content flows to the right).

        /** @type {?} */


        const isBoundedByRightViewportEdge = position.overlayX === 'start' && !isRtl || position.overlayX === 'end' && isRtl; // The overlay is opening 'left-ward' (the content flows to the left).

        /** @type {?} */

        const isBoundedByLeftViewportEdge = position.overlayX === 'end' && !isRtl || position.overlayX === 'start' && isRtl;
        /** @type {?} */

        let width;
        /** @type {?} */

        let left;
        /** @type {?} */

        let right;

        if (isBoundedByLeftViewportEdge) {
          right = viewport.width - origin.x + this._viewportMargin;
          width = origin.x - this._viewportMargin;
        } else if (isBoundedByRightViewportEdge) {
          left = origin.x;
          width = viewport.right - origin.x;
        } else {
          // If neither start nor end, it means that the overlay is horizontally centered on the
          // origin point. Note that we want the position relative to the viewport, rather than
          // the page, which is why we don't use something like `viewport.right - origin.x` and
          // `origin.x - viewport.left`.

          /** @type {?} */
          const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
          /** @type {?} */

          const previousWidth = this._lastBoundingBoxSize.width;
          width = smallestDistanceToViewportEdge * 2;
          left = origin.x - smallestDistanceToViewportEdge;

          if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
            left = origin.x - previousWidth / 2;
          }
        }

        return {
          top:
          /** @type {?} */
          top,
          left:
          /** @type {?} */
          left,
          bottom:
          /** @type {?} */
          bottom,
          right:
          /** @type {?} */
          right,
          width,
          height
        };
      }
      /**
       * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
       * origin's connection point and stetches to the bounds of the viewport.
       *
       * @private
       * @param {?} origin The point on the origin element where the overlay is connected.
       * @param {?} position The position preference
       * @return {?}
       */


      _setBoundingBoxStyles(origin, position) {
        /** @type {?} */
        const boundingBoxRect = this._calculateBoundingBoxRect(origin, position); // It's weird if the overlay *grows* while scrolling, so we take the last size into account
        // when applying a new size.


        if (!this._isInitialRender && !this._growAfterOpen) {
          boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
          boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
        }
        /** @type {?} */


        const styles =
        /** @type {?} */
        {};

        if (this._hasExactPosition()) {
          styles.top = styles.left = '0';
          styles.bottom = styles.right = '';
          styles.width = styles.height = '100%';
        } else {
          /** @type {?} */
          const maxHeight = this._overlayRef.getConfig().maxHeight;
          /** @type {?} */


          const maxWidth = this._overlayRef.getConfig().maxWidth;

          styles.height = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.height);
          styles.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.top);
          styles.bottom = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.bottom);
          styles.width = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.width);
          styles.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.left);
          styles.right = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(boundingBoxRect.right); // Push the pane content towards the proper direction.

          if (position.overlayX === 'center') {
            styles.alignItems = 'center';
          } else {
            styles.alignItems = position.overlayX === 'end' ? 'flex-end' : 'flex-start';
          }

          if (position.overlayY === 'center') {
            styles.justifyContent = 'center';
          } else {
            styles.justifyContent = position.overlayY === 'bottom' ? 'flex-end' : 'flex-start';
          }

          if (maxHeight) {
            styles.maxHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(maxHeight);
          }

          if (maxWidth) {
            styles.maxWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(maxWidth);
          }
        }

        this._lastBoundingBoxSize = boundingBoxRect;
        extendStyles(
        /** @type {?} */
        this._boundingBox.style, styles);
      }
      /**
       * Resets the styles for the bounding box so that a new positioning can be computed.
       * @private
       * @return {?}
       */


      _resetBoundingBoxStyles() {
        extendStyles(
        /** @type {?} */
        this._boundingBox.style,
        /** @type {?} */
        {
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          height: '',
          width: '',
          alignItems: '',
          justifyContent: ''
        });
      }
      /**
       * Resets the styles for the overlay pane so that a new positioning can be computed.
       * @private
       * @return {?}
       */


      _resetOverlayElementStyles() {
        extendStyles(this._pane.style,
        /** @type {?} */
        {
          top: '',
          left: '',
          bottom: '',
          right: '',
          position: '',
          transform: ''
        });
      }
      /**
       * Sets positioning styles to the overlay element.
       * @private
       * @param {?} originPoint
       * @param {?} position
       * @return {?}
       */


      _setOverlayElementStyles(originPoint, position) {
        /** @type {?} */
        const styles =
        /** @type {?} */
        {};

        if (this._hasExactPosition()) {
          /** @type {?} */
          const scrollPosition = this._viewportRuler.getViewportScrollPosition();

          extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
          extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
        } else {
          styles.position = 'static';
        } // Use a transform to apply the offsets. We do this because the `center` positions rely on
        // being in the normal flex flow and setting a `top` / `left` at all will completely throw
        // off the position. We also can't use margins, because they won't have an effect in some
        // cases where the element doesn't have anything to "push off of". Finally, this works
        // better both with flexible and non-flexible positioning.

        /** @type {?} */


        let transformString = '';
        /** @type {?} */

        let offsetX = this._getOffset(position, 'x');
        /** @type {?} */


        let offsetY = this._getOffset(position, 'y');

        if (offsetX) {
          transformString += "translateX(".concat(offsetX, "px) ");
        }

        if (offsetY) {
          transformString += "translateY(".concat(offsetY, "px)");
        }

        styles.transform = transformString.trim(); // If a maxWidth or maxHeight is specified on the overlay, we remove them. We do this because
        // we need these values to both be set to "100%" for the automatic flexible sizing to work.
        // The maxHeight and maxWidth are set on the boundingBox in order to enforce the constraint.

        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxHeight) {
          styles.maxHeight = '';
        }

        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxWidth) {
          styles.maxWidth = '';
        }

        extendStyles(this._pane.style, styles);
      }
      /**
       * Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing.
       * @private
       * @param {?} position
       * @param {?} originPoint
       * @param {?} scrollPosition
       * @return {?}
       */


      _getExactOverlayY(position, originPoint, scrollPosition) {
        // Reset any existing styles. This is necessary in case the
        // preferred position has changed since the last `apply`.

        /** @type {?} */
        let styles =
        /** @type {?} */
        {
          top: null,
          bottom: null
        };
        /** @type {?} */

        let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);

        if (this._isPushed) {
          overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
        }
        /** @type {?} */


        let virtualKeyboardOffset = this._overlayContainer.getContainerElement().getBoundingClientRect().top; // Normally this would be zero, however when the overlay is attached to an input (e.g. in an
        // autocomplete), mobile browsers will shift everything in order to put the input in the middle
        // of the screen and to make space for the virtual keyboard. We need to account for this offset,
        // otherwise our positioning will be thrown off.


        overlayPoint.y -= virtualKeyboardOffset; // We want to set either `top` or `bottom` based on whether the overlay wants to appear
        // above or below the origin and the direction in which the element will expand.

        if (position.overlayY === 'bottom') {
          // When using `bottom`, we adjust the y position such that it is the distance
          // from the bottom of the viewport rather than the top.

          /** @type {?} */
          const documentHeight =
          /** @type {?} */
          this._document.documentElement.clientHeight;
          styles.bottom = "".concat(documentHeight - (overlayPoint.y + this._overlayRect.height), "px");
        } else {
          styles.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(overlayPoint.y);
        }

        return styles;
      }
      /**
       * Gets the exact left/right for the overlay when not using flexible sizing or when pushing.
       * @private
       * @param {?} position
       * @param {?} originPoint
       * @param {?} scrollPosition
       * @return {?}
       */


      _getExactOverlayX(position, originPoint, scrollPosition) {
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.

        /** @type {?} */
        let styles =
        /** @type {?} */
        {
          left: null,
          right: null
        };
        /** @type {?} */

        let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);

        if (this._isPushed) {
          overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
        } // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.

        /** @type {?} */


        let horizontalStyleProperty;

        if (this._isRtl()) {
          horizontalStyleProperty = position.overlayX === 'end' ? 'left' : 'right';
        } else {
          horizontalStyleProperty = position.overlayX === 'end' ? 'right' : 'left';
        } // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.


        if (horizontalStyleProperty === 'right') {
          /** @type {?} */
          const documentWidth =
          /** @type {?} */
          this._document.documentElement.clientWidth;
          styles.right = "".concat(documentWidth - (overlayPoint.x + this._overlayRect.width), "px");
        } else {
          styles.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceCssPixelValue"])(overlayPoint.x);
        }

        return styles;
      }
      /**
       * Gets the view properties of the trigger and overlay, including whether they are clipped
       * or completely outside the view of any of the strategy's scrollables.
       * @private
       * @return {?}
       */


      _getScrollVisibility() {
        // Note: needs fresh rects since the position could've changed.

        /** @type {?} */
        const originBounds = this._getOriginRect();
        /** @type {?} */


        const overlayBounds = this._pane.getBoundingClientRect(); // TODO(jelbourn): instead of needing all of the client rects for these scrolling containers
        // every time, we should be able to use the scrollTop of the containers if the size of those
        // containers hasn't changed.

        /** @type {?} */


        const scrollContainerBounds = this._scrollables.map(
        /**
        * @param {?} scrollable
        * @return {?}
        */
        scrollable => {
          return scrollable.getElementRef().nativeElement.getBoundingClientRect();
        });

        return {
          isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
          isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
          isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
          isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
        };
      }
      /**
       * Subtracts the amount that an element is overflowing on an axis from its length.
       * @private
       * @param {?} length
       * @param {...?} overflows
       * @return {?}
       */


      _subtractOverflows(length, ...overflows) {
        return overflows.reduce(
        /**
        * @param {?} currentValue
        * @param {?} currentOverflow
        * @return {?}
        */
        (currentValue, currentOverflow) => {
          return currentValue - Math.max(currentOverflow, 0);
        }, length);
      }
      /**
       * Narrows the given viewport rect by the current _viewportMargin.
       * @private
       * @return {?}
       */


      _getNarrowedViewportRect() {
        // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
        // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
        // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
        // and `innerHeight` that do. This is necessary, because the overlay container uses
        // 100% `width` and `height` which don't include the scrollbar either.

        /** @type {?} */
        const width =
        /** @type {?} */
        this._document.documentElement.clientWidth;
        /** @type {?} */

        const height =
        /** @type {?} */
        this._document.documentElement.clientHeight;
        /** @type {?} */

        const scrollPosition = this._viewportRuler.getViewportScrollPosition();

        return {
          top: scrollPosition.top + this._viewportMargin,
          left: scrollPosition.left + this._viewportMargin,
          right: scrollPosition.left + width - this._viewportMargin,
          bottom: scrollPosition.top + height - this._viewportMargin,
          width: width - 2 * this._viewportMargin,
          height: height - 2 * this._viewportMargin
        };
      }
      /**
       * Whether the we're dealing with an RTL context
       * @private
       * @return {?}
       */


      _isRtl() {
        return this._overlayRef.getDirection() === 'rtl';
      }
      /**
       * Determines whether the overlay uses exact or flexible positioning.
       * @private
       * @return {?}
       */


      _hasExactPosition() {
        return !this._hasFlexibleDimensions || this._isPushed;
      }
      /**
       * Retrieves the offset of a position along the x or y axis.
       * @private
       * @param {?} position
       * @param {?} axis
       * @return {?}
       */


      _getOffset(position, axis) {
        if (axis === 'x') {
          // We don't do something like `position['offset' + axis]` in
          // order to avoid breking minifiers that rename properties.
          return position.offsetX == null ? this._offsetX : position.offsetX;
        }

        return position.offsetY == null ? this._offsetY : position.offsetY;
      }
      /**
       * Validates that the current position match the expected values.
       * @private
       * @return {?}
       */


      _validatePositions() {
        if (!this._preferredPositions.length) {
          throw Error('FlexibleConnectedPositionStrategy: At least one position is required.');
        } // TODO(crisbeto): remove these once Angular's template type
        // checking is advanced enough to catch these cases.


        this._preferredPositions.forEach(
        /**
        * @param {?} pair
        * @return {?}
        */
        pair => {
          validateHorizontalPosition('originX', pair.originX);
          validateVerticalPosition('originY', pair.originY);
          validateHorizontalPosition('overlayX', pair.overlayX);
          validateVerticalPosition('overlayY', pair.overlayY);
        });
      }
      /**
       * Adds a single CSS class or an array of classes on the overlay panel.
       * @private
       * @param {?} cssClasses
       * @return {?}
       */


      _addPanelClasses(cssClasses) {
        if (this._pane) {
          Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceArray"])(cssClasses).forEach(
          /**
          * @param {?} cssClass
          * @return {?}
          */
          cssClass => {
            if (cssClass !== '' && this._appliedPanelClasses.indexOf(cssClass) === -1) {
              this._appliedPanelClasses.push(cssClass);

              this._pane.classList.add(cssClass);
            }
          });
        }
      }
      /**
       * Clears the classes that the position strategy has applied from the overlay panel.
       * @private
       * @return {?}
       */


      _clearPanelClasses() {
        if (this._pane) {
          this._appliedPanelClasses.forEach(
          /**
          * @param {?} cssClass
          * @return {?}
          */
          cssClass => {
            this._pane.classList.remove(cssClass);
          });

          this._appliedPanelClasses = [];
        }
      }
      /**
       * Returns the ClientRect of the current origin.
       * @private
       * @return {?}
       */


      _getOriginRect() {
        /** @type {?} */
        const origin = this._origin;

        if (origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]) {
          return origin.nativeElement.getBoundingClientRect();
        }

        if (origin instanceof HTMLElement) {
          return origin.getBoundingClientRect();
        }
        /** @type {?} */


        const width = origin.width || 0;
        /** @type {?} */

        const height = origin.height || 0; // If the origin is a point, return a client rect as if it was a 0x0 element at the point.

        return {
          top: origin.y,
          bottom: origin.y + height,
          left: origin.x,
          right: origin.x + width,
          height,
          width
        };
      }

    }
    /**
     * Shallow-extends a stylesheet object with another stylesheet object.
     * @param {?} dest
     * @param {?} source
     * @return {?}
     */


    function extendStyles(dest, source) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }

      return dest;
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * A strategy for positioning overlays. Using this strategy, an overlay is given an
     * implicit position relative to some origin element. The relative position is defined in terms of
     * a point on the origin element that is connected to a point on the overlay element. For example,
     * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
     * of the overlay.
     * @deprecated Use `FlexibleConnectedPositionStrategy` instead.
     * \@breaking-change 8.0.0
     */


    class ConnectedPositionStrategy {
      /**
       * @param {?} originPos
       * @param {?} overlayPos
       * @param {?} connectedTo
       * @param {?} viewportRuler
       * @param {?} document
       * @param {?} platform
       * @param {?} overlayContainer
       */
      constructor(originPos, overlayPos, connectedTo, viewportRuler, document, platform, overlayContainer) {
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = []; // Since the `ConnectedPositionStrategy` is deprecated and we don't want to maintain
        // the extra logic, we create an instance of the positioning strategy that has some
        // defaults that make it behave as the old position strategy and to which we'll
        // proxy all of the API calls.

        this._positionStrategy = new FlexibleConnectedPositionStrategy(connectedTo, viewportRuler, document, platform, overlayContainer).withFlexibleDimensions(false).withPush(false).withViewportMargin(0);
        this.withFallbackPosition(originPos, overlayPos);
      }
      /**
       * Whether the we're dealing with an RTL context
       * @return {?}
       */


      get _isRtl() {
        return this._overlayRef.getDirection() === 'rtl';
      }
      /**
       * Emits an event when the connection point changes.
       * @return {?}
       */


      get onPositionChange() {
        return this._positionStrategy.positionChanges;
      }
      /**
       * Ordered list of preferred positions, from most to least desirable.
       * @return {?}
       */


      get positions() {
        return this._preferredPositions;
      }
      /**
       * Attach this position strategy to an overlay.
       * @param {?} overlayRef
       * @return {?}
       */


      attach(overlayRef) {
        this._overlayRef = overlayRef;

        this._positionStrategy.attach(overlayRef);

        if (this._direction) {
          overlayRef.setDirection(this._direction);
          this._direction = null;
        }
      }
      /**
       * Disposes all resources used by the position strategy.
       * @return {?}
       */


      dispose() {
        this._positionStrategy.dispose();
      }
      /**
       * \@docs-private
       * @return {?}
       */


      detach() {
        this._positionStrategy.detach();
      }
      /**
       * Updates the position of the overlay element, using whichever preferred position relative
       * to the origin fits on-screen.
       * \@docs-private
       * @return {?}
       */


      apply() {
        this._positionStrategy.apply();
      }
      /**
       * Re-positions the overlay element with the trigger in its last calculated position,
       * even if a position higher in the "preferred positions" list would now fit. This
       * allows one to re-align the panel without changing the orientation of the panel.
       * @return {?}
       */


      recalculateLastPosition() {
        this._positionStrategy.reapplyLastPosition();
      }
      /**
       * Sets the list of Scrollable containers that host the origin element so that
       * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
       * Scrollable must be an ancestor element of the strategy's origin element.
       * @param {?} scrollables
       * @return {?}
       */


      withScrollableContainers(scrollables) {
        this._positionStrategy.withScrollableContainers(scrollables);
      }
      /**
       * Adds a new preferred fallback position.
       * @template THIS
       * @this {THIS}
       * @param {?} originPos
       * @param {?} overlayPos
       * @param {?=} offsetX
       * @param {?=} offsetY
       * @return {THIS}
       */


      withFallbackPosition(originPos, overlayPos, offsetX, offsetY) {
        /** @type {?} */
        const position = new ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY);

        /** @type {?} */
        this._preferredPositions.push(position);

        /** @type {?} */
        this._positionStrategy.withPositions(
        /** @type {?} */
        this._preferredPositions);

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the layout direction so the overlay's position can be adjusted to match.
       * @template THIS
       * @this {THIS}
       * @param {?} dir New layout direction.
       * @return {THIS}
       */


      withDirection(dir) {
        // Since the direction might be declared before the strategy is attached,
        // we save the value in a temporary property and we'll transfer it to the
        // overlay ref on attachment.
        if (
        /** @type {?} */
        this._overlayRef) {
          /** @type {?} */
          this._overlayRef.setDirection(dir);
        } else {
          /** @type {?} */
          this._direction = dir;
        }

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets an offset for the overlay's connection point on the x-axis
       * @template THIS
       * @this {THIS}
       * @param {?} offset New offset in the X axis.
       * @return {THIS}
       */


      withOffsetX(offset) {
        /** @type {?} */
        this._positionStrategy.withDefaultOffsetX(offset);

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets an offset for the overlay's connection point on the y-axis
       * @template THIS
       * @this {THIS}
       * @param {?} offset New offset in the Y axis.
       * @return {THIS}
       */


      withOffsetY(offset) {
        /** @type {?} */
        this._positionStrategy.withDefaultOffsetY(offset);

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets whether the overlay's position should be locked in after it is positioned
       * initially. When an overlay is locked in, it won't attempt to reposition itself
       * when the position is re-applied (e.g. when the user scrolls away).
       * @template THIS
       * @this {THIS}
       * @param {?} isLocked Whether the overlay should locked in.
       * @return {THIS}
       */


      withLockedPosition(isLocked) {
        /** @type {?} */
        this._positionStrategy.withLockedPosition(isLocked);

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Overwrites the current set of positions with an array of new ones.
       * @template THIS
       * @this {THIS}
       * @param {?} positions Position pairs to be set on the strategy.
       * @return {THIS}
       */


      withPositions(positions) {
        /** @type {?} */
        this._preferredPositions = positions.slice();

        /** @type {?} */
        this._positionStrategy.withPositions(
        /** @type {?} */
        this._preferredPositions);

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the origin element, relative to which to position the overlay.
       * @template THIS
       * @this {THIS}
       * @param {?} origin Reference to the new origin element.
       * @return {THIS}
       */


      setOrigin(origin) {
        /** @type {?} */
        this._positionStrategy.setOrigin(origin);

        return (
          /** @type {?} */
          this
        );
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Class to be added to the overlay pane wrapper.
     * @type {?}
     */


    const wrapperClass = 'cdk-global-overlay-wrapper';
    /**
     * A strategy for positioning overlays. Using this strategy, an overlay is given an
     * explicit position relative to the browser's viewport. We use flexbox, instead of
     * transforms, in order to avoid issues with subpixel rendering which can cause the
     * element to become blurry.
     */

    class GlobalPositionStrategy {
      constructor() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
      }
      /**
       * @param {?} overlayRef
       * @return {?}
       */


      attach(overlayRef) {
        /** @type {?} */
        const config = overlayRef.getConfig();
        this._overlayRef = overlayRef;

        if (this._width && !config.width) {
          overlayRef.updateSize({
            width: this._width
          });
        }

        if (this._height && !config.height) {
          overlayRef.updateSize({
            height: this._height
          });
        }

        overlayRef.hostElement.classList.add(wrapperClass);
        this._isDisposed = false;
      }
      /**
       * Sets the top position of the overlay. Clears any previously set vertical position.
       * @template THIS
       * @this {THIS}
       * @param {?=} value New top offset.
       * @return {THIS}
       */


      top(value = '') {
        /** @type {?} */
        this._bottomOffset = '';

        /** @type {?} */
        this._topOffset = value;

        /** @type {?} */
        this._alignItems = 'flex-start';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the left position of the overlay. Clears any previously set horizontal position.
       * @template THIS
       * @this {THIS}
       * @param {?=} value New left offset.
       * @return {THIS}
       */


      left(value = '') {
        /** @type {?} */
        this._rightOffset = '';

        /** @type {?} */
        this._leftOffset = value;

        /** @type {?} */
        this._justifyContent = 'flex-start';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the bottom position of the overlay. Clears any previously set vertical position.
       * @template THIS
       * @this {THIS}
       * @param {?=} value New bottom offset.
       * @return {THIS}
       */


      bottom(value = '') {
        /** @type {?} */
        this._topOffset = '';

        /** @type {?} */
        this._bottomOffset = value;

        /** @type {?} */
        this._alignItems = 'flex-end';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the right position of the overlay. Clears any previously set horizontal position.
       * @template THIS
       * @this {THIS}
       * @param {?=} value New right offset.
       * @return {THIS}
       */


      right(value = '') {
        /** @type {?} */
        this._leftOffset = '';

        /** @type {?} */
        this._rightOffset = value;

        /** @type {?} */
        this._justifyContent = 'flex-end';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the overlay width and clears any previously set width.
       * @deprecated Pass the `width` through the `OverlayConfig`.
       * \@breaking-change 8.0.0
       * @template THIS
       * @this {THIS}
       * @param {?=} value New width for the overlay
       * @return {THIS}
       */


      width(value = '') {
        if (
        /** @type {?} */
        this._overlayRef) {
          /** @type {?} */
          this._overlayRef.updateSize({
            width: value
          });
        } else {
          /** @type {?} */
          this._width = value;
        }

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Sets the overlay height and clears any previously set height.
       * @deprecated Pass the `height` through the `OverlayConfig`.
       * \@breaking-change 8.0.0
       * @template THIS
       * @this {THIS}
       * @param {?=} value New height for the overlay
       * @return {THIS}
       */


      height(value = '') {
        if (
        /** @type {?} */
        this._overlayRef) {
          /** @type {?} */
          this._overlayRef.updateSize({
            height: value
          });
        } else {
          /** @type {?} */
          this._height = value;
        }

        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Centers the overlay horizontally with an optional offset.
       * Clears any previously set horizontal position.
       *
       * @template THIS
       * @this {THIS}
       * @param {?=} offset Overlay offset from the horizontal center.
       * @return {THIS}
       */


      centerHorizontally(offset = '') {
        /** @type {?} */
        this.left(offset);

        /** @type {?} */
        this._justifyContent = 'center';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Centers the overlay vertically with an optional offset.
       * Clears any previously set vertical position.
       *
       * @template THIS
       * @this {THIS}
       * @param {?=} offset Overlay offset from the vertical center.
       * @return {THIS}
       */


      centerVertically(offset = '') {
        /** @type {?} */
        this.top(offset);

        /** @type {?} */
        this._alignItems = 'center';
        return (
          /** @type {?} */
          this
        );
      }
      /**
       * Apply the position to the element.
       * \@docs-private
       * @return {?}
       */


      apply() {
        // Since the overlay ref applies the strategy asynchronously, it could
        // have been disposed before it ends up being applied. If that is the
        // case, we shouldn't do anything.
        if (!this._overlayRef || !this._overlayRef.hasAttached()) {
          return;
        }
        /** @type {?} */


        const styles = this._overlayRef.overlayElement.style;
        /** @type {?} */

        const parentStyles = this._overlayRef.hostElement.style;
        /** @type {?} */

        const config = this._overlayRef.getConfig();

        styles.position = this._cssPosition;
        styles.marginLeft = config.width === '100%' ? '0' : this._leftOffset;
        styles.marginTop = config.height === '100%' ? '0' : this._topOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;

        if (config.width === '100%') {
          parentStyles.justifyContent = 'flex-start';
        } else if (this._justifyContent === 'center') {
          parentStyles.justifyContent = 'center';
        } else if (this._overlayRef.getConfig().direction === 'rtl') {
          // In RTL the browser will invert `flex-start` and `flex-end` automatically, but we
          // don't want that because our positioning is explicitly `left` and `right`, hence
          // why we do another inversion to ensure that the overlay stays in the same position.
          // TODO: reconsider this if we add `start` and `end` methods.
          if (this._justifyContent === 'flex-start') {
            parentStyles.justifyContent = 'flex-end';
          } else if (this._justifyContent === 'flex-end') {
            parentStyles.justifyContent = 'flex-start';
          }
        } else {
          parentStyles.justifyContent = this._justifyContent;
        }

        parentStyles.alignItems = config.height === '100%' ? 'flex-start' : this._alignItems;
      }
      /**
       * Cleans up the DOM changes from the position strategy.
       * \@docs-private
       * @return {?}
       */


      dispose() {
        if (this._isDisposed || !this._overlayRef) {
          return;
        }
        /** @type {?} */


        const styles = this._overlayRef.overlayElement.style;
        /** @type {?} */

        const parent = this._overlayRef.hostElement;
        /** @type {?} */

        const parentStyles = parent.style;
        parent.classList.remove(wrapperClass);
        parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = '';
        this._overlayRef =
        /** @type {?} */
        null;
        this._isDisposed = true;
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Builder for overlay position strategy.
     */


    class OverlayPositionBuilder {
      /**
       * @param {?} _viewportRuler
       * @param {?} _document
       * @param {?} _platform
       * @param {?} _overlayContainer
       */
      constructor(_viewportRuler, _document, _platform, _overlayContainer) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
        this._overlayContainer = _overlayContainer;
      }
      /**
       * Creates a global position strategy.
       * @return {?}
       */


      global() {
        return new GlobalPositionStrategy();
      }
      /**
       * Creates a relative position strategy.
       * @deprecated Use `flexibleConnectedTo` instead.
       * \@breaking-change 8.0.0
       * @param {?} elementRef
       * @param {?} originPos
       * @param {?} overlayPos
       * @return {?}
       */


      connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(originPos, overlayPos, elementRef, this._viewportRuler, this._document, this._platform, this._overlayContainer);
      }
      /**
       * Creates a flexible position strategy.
       * @param {?} origin Origin relative to which to position the overlay.
       * @return {?}
       */


      flexibleConnectedTo(origin) {
        return new FlexibleConnectedPositionStrategy(origin, this._viewportRuler, this._document, this._platform, this._overlayContainer);
      }

    }

    OverlayPositionBuilder.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    OverlayPositionBuilder.ctorParameters = () => [{
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ViewportRuler"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]
    }, {
      type: OverlayContainer
    }];
    /** @nocollapse */


    OverlayPositionBuilder.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"])({
      factory: function OverlayPositionBuilder_Factory() {
        return new OverlayPositionBuilder(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ViewportRuler"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(OverlayContainer));
      },
      token: OverlayPositionBuilder,
      providedIn: "root"
    });
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Next overlay unique ID.
     * @type {?}
     */

    let nextUniqueId = 0; // Note that Overlay is *not* scoped to the app root because the ComponentFactoryResolver
    // it needs is different based on where OverlayModule is imported.

    /**
     * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
     * used as a low-level building block for other components. Dialogs, tooltips, menus,
     * selects, etc. can all be built using overlays. The service should primarily be used by authors
     * of re-usable components rather than developers building end-user applications.
     *
     * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
     */

    class Overlay {
      /**
       * @param {?} scrollStrategies
       * @param {?} _overlayContainer
       * @param {?} _componentFactoryResolver
       * @param {?} _positionBuilder
       * @param {?} _keyboardDispatcher
       * @param {?} _injector
       * @param {?} _ngZone
       * @param {?} _document
       * @param {?} _directionality
       * @param {?=} _location
       */
      constructor(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality, _location) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._injector = _injector;
        this._ngZone = _ngZone;
        this._document = _document;
        this._directionality = _directionality;
        this._location = _location;
      }
      /**
       * Creates an overlay.
       * @param {?=} config Configuration applied to the overlay.
       * @return {?} Reference to the created overlay.
       */


      create(config) {
        /** @type {?} */
        const host = this._createHostElement();
        /** @type {?} */


        const pane = this._createPaneElement(host);
        /** @type {?} */


        const portalOutlet = this._createPortalOutlet(pane);
        /** @type {?} */


        const overlayConfig = new OverlayConfig(config);
        overlayConfig.direction = overlayConfig.direction || this._directionality.value;
        return new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document, this._location);
      }
      /**
       * Gets a position builder that can be used, via fluent API,
       * to construct and configure a position strategy.
       * @return {?} An overlay position builder.
       */


      position() {
        return this._positionBuilder;
      }
      /**
       * Creates the DOM element for an overlay and appends it to the overlay container.
       * @private
       * @param {?} host
       * @return {?} Newly-created pane element
       */


      _createPaneElement(host) {
        /** @type {?} */
        const pane = this._document.createElement('div');

        pane.id = "cdk-overlay-".concat(nextUniqueId++);
        pane.classList.add('cdk-overlay-pane');
        host.appendChild(pane);
        return pane;
      }
      /**
       * Creates the host element that wraps around an overlay
       * and can be used for advanced positioning.
       * @private
       * @return {?} Newly-create host element.
       */


      _createHostElement() {
        /** @type {?} */
        const host = this._document.createElement('div');

        this._overlayContainer.getContainerElement().appendChild(host);

        return host;
      }
      /**
       * Create a DomPortalOutlet into which the overlay content can be loaded.
       * @private
       * @param {?} pane The DOM element to turn into a portal outlet.
       * @return {?} A portal outlet for the given DOM element.
       */


      _createPortalOutlet(pane) {
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        if (!this._appRef) {
          this._appRef = this._injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ApplicationRef"]);
        }

        return new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["DomPortalOutlet"](pane, this._componentFactoryResolver, this._appRef, this._injector);
      }

    }

    Overlay.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"]
    }];
    /** @nocollapse */

    Overlay.ctorParameters = () => [{
      type: ScrollStrategyOptions
    }, {
      type: OverlayContainer
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ComponentFactoryResolver"]
    }, {
      type: OverlayPositionBuilder
    }, {
      type: OverlayKeyboardDispatcher
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"]
    }, {
      type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Default set of positions for the overlay. Follows the behavior of a dropdown.
     * @type {?}
     */


    const defaultPositionList = [{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }, {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }, {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    }];
    /**
     * Injection token that determines the scroll handling while the connected overlay is open.
     * @type {?}
     */

    const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["InjectionToken"]('cdk-connected-overlay-scroll-strategy');
    /**
     * Directive applied to an element to make it usable as an origin for an Overlay using a
     * ConnectedPositionStrategy.
     */

    class CdkOverlayOrigin {
      /**
       * @param {?} elementRef
       */
      constructor(elementRef) {
        this.elementRef = elementRef;
      }

    }

    CdkOverlayOrigin.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
      args: [{
        selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
        exportAs: 'cdkOverlayOrigin'
      }]
    }];
    /** @nocollapse */

    CdkOverlayOrigin.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]
    }];
    /**
     * Directive to facilitate declarative creation of an
     * Overlay using a FlexibleConnectedPositionStrategy.
     */


    class CdkConnectedOverlay {
      // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.

      /**
       * @param {?} _overlay
       * @param {?} templateRef
       * @param {?} viewContainerRef
       * @param {?} scrollStrategyFactory
       * @param {?} _dir
       */
      constructor(_overlay, templateRef, viewContainerRef, scrollStrategyFactory, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._lockPosition = false;
        this._growAfterOpen = false;
        this._flexibleDimensions = false;
        this._push = false;
        this._backdropSubscription = rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"].EMPTY;
        /**
         * Margin between the overlay and the viewport edges.
         */

        this.viewportMargin = 0;
        /**
         * Whether the overlay is open.
         */

        this.open = false;
        /**
         * Event emitted when the backdrop is clicked.
         */

        this.backdropClick = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Event emitted when the position has changed.
         */

        this.positionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Event emitted when the overlay has been attached.
         */

        this.attach = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Event emitted when the overlay has been detached.
         */

        this.detach = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Emits when there are keyboard events that are targeted at the overlay.
         */

        this.overlayKeydown = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this._templatePortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["TemplatePortal"](templateRef, viewContainerRef);
        this._scrollStrategyFactory = scrollStrategyFactory;
        this.scrollStrategy = this._scrollStrategyFactory();
      }
      /**
       * The offset in pixels for the overlay connection point on the x-axis
       * @return {?}
       */


      get offsetX() {
        return this._offsetX;
      }
      /**
       * @param {?} offsetX
       * @return {?}
       */


      set offsetX(offsetX) {
        this._offsetX = offsetX;

        if (this._position) {
          this._updatePositionStrategy(this._position);
        }
      }
      /**
       * The offset in pixels for the overlay connection point on the y-axis
       * @return {?}
       */


      get offsetY() {
        return this._offsetY;
      }
      /**
       * @param {?} offsetY
       * @return {?}
       */


      set offsetY(offsetY) {
        this._offsetY = offsetY;

        if (this._position) {
          this._updatePositionStrategy(this._position);
        }
      }
      /**
       * Whether or not the overlay should attach a backdrop.
       * @return {?}
       */


      get hasBackdrop() {
        return this._hasBackdrop;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set hasBackdrop(value) {
        this._hasBackdrop = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether or not the overlay should be locked when scrolling.
       * @return {?}
       */


      get lockPosition() {
        return this._lockPosition;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set lockPosition(value) {
        this._lockPosition = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether the overlay's width and height can be constrained to fit within the viewport.
       * @return {?}
       */


      get flexibleDimensions() {
        return this._flexibleDimensions;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set flexibleDimensions(value) {
        this._flexibleDimensions = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether the overlay can grow after the initial open when flexible positioning is turned on.
       * @return {?}
       */


      get growAfterOpen() {
        return this._growAfterOpen;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set growAfterOpen(value) {
        this._growAfterOpen = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether the overlay can be pushed on-screen if none of the provided positions fit.
       * @return {?}
       */


      get push() {
        return this._push;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set push(value) {
        this._push = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
      }
      /**
       * The associated overlay reference.
       * @return {?}
       */


      get overlayRef() {
        return this._overlayRef;
      }
      /**
       * The element's layout direction.
       * @return {?}
       */


      get dir() {
        return this._dir ? this._dir.value : 'ltr';
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        if (this._overlayRef) {
          this._overlayRef.dispose();
        }

        this._backdropSubscription.unsubscribe();
      }
      /**
       * @param {?} changes
       * @return {?}
       */


      ngOnChanges(changes) {
        if (this._position) {
          this._updatePositionStrategy(this._position);

          this._overlayRef.updateSize({
            width: this.width,
            minWidth: this.minWidth,
            height: this.height,
            minHeight: this.minHeight
          });

          if (changes['origin'] && this.open) {
            this._position.apply();
          }
        }

        if (changes['open']) {
          this.open ? this._attachOverlay() : this._detachOverlay();
        }
      }
      /**
       * Creates an overlay
       * @private
       * @return {?}
       */


      _createOverlay() {
        if (!this.positions || !this.positions.length) {
          this.positions = defaultPositionList;
        }

        this._overlayRef = this._overlay.create(this._buildConfig());

        this._overlayRef.keydownEvents().subscribe(
        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          this.overlayKeydown.next(event);

          if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__["ESCAPE"] && !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_9__["hasModifierKey"])(event)) {
            event.preventDefault();

            this._detachOverlay();
          }
        });
      }
      /**
       * Builds the overlay config based on the directive's inputs
       * @private
       * @return {?}
       */


      _buildConfig() {
        /** @type {?} */
        const positionStrategy = this._position = this._createPositionStrategy();
        /** @type {?} */


        const overlayConfig = new OverlayConfig({
          direction: this._dir,
          positionStrategy,
          scrollStrategy: this.scrollStrategy,
          hasBackdrop: this.hasBackdrop
        });

        if (this.width || this.width === 0) {
          overlayConfig.width = this.width;
        }

        if (this.height || this.height === 0) {
          overlayConfig.height = this.height;
        }

        if (this.minWidth || this.minWidth === 0) {
          overlayConfig.minWidth = this.minWidth;
        }

        if (this.minHeight || this.minHeight === 0) {
          overlayConfig.minHeight = this.minHeight;
        }

        if (this.backdropClass) {
          overlayConfig.backdropClass = this.backdropClass;
        }

        if (this.panelClass) {
          overlayConfig.panelClass = this.panelClass;
        }

        return overlayConfig;
      }
      /**
       * Updates the state of a position strategy, based on the values of the directive inputs.
       * @private
       * @param {?} positionStrategy
       * @return {?}
       */


      _updatePositionStrategy(positionStrategy) {
        /** @type {?} */
        const positions = this.positions.map(
        /**
        * @param {?} currentPosition
        * @return {?}
        */
        currentPosition => ({
          originX: currentPosition.originX,
          originY: currentPosition.originY,
          overlayX: currentPosition.overlayX,
          overlayY: currentPosition.overlayY,
          offsetX: currentPosition.offsetX || this.offsetX,
          offsetY: currentPosition.offsetY || this.offsetY,
          panelClass: currentPosition.panelClass || undefined
        }));
        return positionStrategy.setOrigin(this.origin.elementRef).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition);
      }
      /**
       * Returns the position strategy of the overlay to be set on the overlay config
       * @private
       * @return {?}
       */


      _createPositionStrategy() {
        /** @type {?} */
        const strategy = this._overlay.position().flexibleConnectedTo(this.origin.elementRef);

        this._updatePositionStrategy(strategy);

        strategy.positionChanges.subscribe(
        /**
        * @param {?} p
        * @return {?}
        */
        p => this.positionChange.emit(p));
        return strategy;
      }
      /**
       * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
       * @private
       * @return {?}
       */


      _attachOverlay() {
        if (!this._overlayRef) {
          this._createOverlay();
        } else {
          // Update the overlay size, in case the directive's inputs have changed
          this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop;
        }

        if (!this._overlayRef.hasAttached()) {
          this._overlayRef.attach(this._templatePortal);

          this.attach.emit();
        }

        if (this.hasBackdrop) {
          this._backdropSubscription = this._overlayRef.backdropClick().subscribe(
          /**
          * @param {?} event
          * @return {?}
          */
          event => {
            this.backdropClick.emit(event);
          });
        } else {
          this._backdropSubscription.unsubscribe();
        }
      }
      /**
       * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
       * @private
       * @return {?}
       */


      _detachOverlay() {
        if (this._overlayRef) {
          this._overlayRef.detach();

          this.detach.emit();
        }

        this._backdropSubscription.unsubscribe();
      }

    }

    CdkConnectedOverlay.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
      args: [{
        selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
        exportAs: 'cdkConnectedOverlay'
      }]
    }];
    /** @nocollapse */

    CdkConnectedOverlay.ctorParameters = () => [{
      type: Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["TemplateRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY]
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
      }]
    }];

    CdkConnectedOverlay.propDecorators = {
      origin: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayOrigin']
      }],
      positions: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayPositions']
      }],
      offsetX: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayOffsetX']
      }],
      offsetY: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayOffsetY']
      }],
      width: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayWidth']
      }],
      height: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayHeight']
      }],
      minWidth: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayMinWidth']
      }],
      minHeight: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayMinHeight']
      }],
      backdropClass: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayBackdropClass']
      }],
      panelClass: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayPanelClass']
      }],
      viewportMargin: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayViewportMargin']
      }],
      scrollStrategy: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayScrollStrategy']
      }],
      open: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayOpen']
      }],
      hasBackdrop: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayHasBackdrop']
      }],
      lockPosition: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayLockPosition']
      }],
      flexibleDimensions: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayFlexibleDimensions']
      }],
      growAfterOpen: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayGrowAfterOpen']
      }],
      push: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
        args: ['cdkConnectedOverlayPush']
      }],
      backdropClick: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
      }],
      positionChange: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
      }],
      attach: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
      }],
      detach: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
      }],
      overlayKeydown: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"]
      }]
    };
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */

    function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
      return (
        /**
        * @return {?}
        */
        () => overlay.scrollStrategies.reposition()
      );
    }
    /**
     * \@docs-private
     * @type {?}
     */


    const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
      provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
      deps: [Overlay],
      useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class OverlayModule {}

    OverlayModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
      args: [{
        imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["BidiModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["PortalModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ScrollingModule"]],
        exports: [CdkConnectedOverlay, CdkOverlayOrigin, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["ScrollingModule"]],
        declarations: [CdkConnectedOverlay, CdkOverlayOrigin],
        providers: [Overlay, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER]
      }]
    }];
    /**
     * @deprecated Use `OverlayModule` instead.
     * \@breaking-change 8.0.0
     * \@docs-private
     * @type {?}
     */

    const OVERLAY_PROVIDERS = [Overlay, OverlayPositionBuilder, OVERLAY_KEYBOARD_DISPATCHER_PROVIDER, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__["VIEWPORT_RULER_PROVIDER"], OVERLAY_CONTAINER_PROVIDER, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Alternative to OverlayContainer that supports correct displaying of overlay elements in
     * Fullscreen mode
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
     *
     * Should be provided in the root component.
     */

    class FullscreenOverlayContainer extends OverlayContainer {
      /**
       * @param {?} _document
       */
      constructor(_document) {
        super(_document);
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        super.ngOnDestroy();

        if (this._fullScreenEventName && this._fullScreenListener) {
          this._document.removeEventListener(this._fullScreenEventName, this._fullScreenListener);
        }
      }
      /**
       * @protected
       * @return {?}
       */


      _createContainer() {
        super._createContainer();

        this._adjustParentForFullscreenChange();

        this._addFullscreenChangeListener(
        /**
        * @return {?}
        */
        () => this._adjustParentForFullscreenChange());
      }
      /**
       * @private
       * @return {?}
       */


      _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
          return;
        }
        /** @type {?} */


        const fullscreenElement = this.getFullscreenElement();
        /** @type {?} */

        const parent = fullscreenElement || this._document.body;
        parent.appendChild(this._containerElement);
      }
      /**
       * @private
       * @param {?} fn
       * @return {?}
       */


      _addFullscreenChangeListener(fn) {
        /** @type {?} */
        const eventName = this._getEventName();

        if (eventName) {
          if (this._fullScreenListener) {
            this._document.removeEventListener(eventName, this._fullScreenListener);
          }

          this._document.addEventListener(eventName, fn);

          this._fullScreenListener = fn;
        }
      }
      /**
       * @private
       * @return {?}
       */


      _getEventName() {
        if (!this._fullScreenEventName) {
          /** @type {?} */
          const _document =
          /** @type {?} */
          this._document;

          if (_document.fullscreenEnabled) {
            this._fullScreenEventName = 'fullscreenchange';
          } else if (_document.webkitFullscreenEnabled) {
            this._fullScreenEventName = 'webkitfullscreenchange';
          } else if (_document.mozFullScreenEnabled) {
            this._fullScreenEventName = 'mozfullscreenchange';
          } else if (_document.msFullscreenEnabled) {
            this._fullScreenEventName = 'MSFullscreenChange';
          }
        }

        return this._fullScreenEventName;
      }
      /**
       * When the page is put into fullscreen mode, a specific element is specified.
       * Only that element and its children are visible when in fullscreen mode.
       * @return {?}
       */


      getFullscreenElement() {
        /** @type {?} */
        const _document =
        /** @type {?} */
        this._document;
        return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
      }

    }

    FullscreenOverlayContainer.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    FullscreenOverlayContainer.ctorParameters = () => [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]]
      }]
    }];
    /** @nocollapse */


    FullscreenOverlayContainer.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"])({
      factory: function FullscreenOverlayContainer_Factory() {
        return new FullscreenOverlayContainer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]));
      },
      token: FullscreenOverlayContainer,
      providedIn: "root"
    });
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=overlay.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/cdk/esm2015/portal.js":
  /*!*****************************************************!*\
    !*** ./node_modules/@angular/cdk/esm2015/portal.js ***!
    \*****************************************************/

  /*! exports provided: Portal, ComponentPortal, TemplatePortal, BasePortalOutlet, BasePortalHost, DomPortalOutlet, DomPortalHost, CdkPortal, TemplatePortalDirective, CdkPortalOutlet, PortalHostDirective, PortalModule, PortalInjector */

  /***/
  function node_modulesAngularCdkEsm2015PortalJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Portal", function () {
      return Portal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ComponentPortal", function () {
      return ComponentPortal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TemplatePortal", function () {
      return TemplatePortal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BasePortalOutlet", function () {
      return BasePortalOutlet;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BasePortalHost", function () {
      return BasePortalHost;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DomPortalOutlet", function () {
      return DomPortalOutlet;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DomPortalHost", function () {
      return DomPortalHost;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkPortal", function () {
      return CdkPortal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TemplatePortalDirective", function () {
      return TemplatePortalDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkPortalOutlet", function () {
      return CdkPortalOutlet;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PortalHostDirective", function () {
      return PortalHostDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PortalModule", function () {
      return PortalModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PortalInjector", function () {
      return PortalInjector;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Throws an exception when attempting to attach a null portal to a host.
     * \@docs-private
     * @return {?}
     */


    function throwNullPortalError() {
      throw Error('Must provide a portal to attach');
    }
    /**
     * Throws an exception when attempting to attach a portal to a host that is already attached.
     * \@docs-private
     * @return {?}
     */


    function throwPortalAlreadyAttachedError() {
      throw Error('Host already has a portal attached');
    }
    /**
     * Throws an exception when attempting to attach a portal to an already-disposed host.
     * \@docs-private
     * @return {?}
     */


    function throwPortalOutletAlreadyDisposedError() {
      throw Error('This PortalOutlet has already been disposed');
    }
    /**
     * Throws an exception when attempting to attach an unknown portal type.
     * \@docs-private
     * @return {?}
     */


    function throwUnknownPortalTypeError() {
      throw Error('Attempting to attach an unknown Portal type. BasePortalOutlet accepts either ' + 'a ComponentPortal or a TemplatePortal.');
    }
    /**
     * Throws an exception when attempting to attach a portal to a null host.
     * \@docs-private
     * @return {?}
     */


    function throwNullPortalOutletError() {
      throw Error('Attempting to attach a portal to a null PortalOutlet');
    }
    /**
     * Throws an exception when attempting to detach a portal that is not attached.
     * \@docs-private
     * @return {?}
     */


    function throwNoPortalAttachedError() {
      throw Error('Attempting to detach a portal that is not attached to a host');
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * A `Portal` is something that you want to render somewhere else.
     * It can be attach to / detached from a `PortalOutlet`.
     * @abstract
     * @template T
     */


    class Portal {
      /**
       * Attach this portal to a host.
       * @param {?} host
       * @return {?}
       */
      attach(host) {
        if (host == null) {
          throwNullPortalOutletError();
        }

        if (host.hasAttached()) {
          throwPortalAlreadyAttachedError();
        }

        this._attachedHost = host;
        return (
          /** @type {?} */
          host.attach(this)
        );
      }
      /**
       * Detach this portal from its host
       * @return {?}
       */


      detach() {
        /** @type {?} */
        let host = this._attachedHost;

        if (host == null) {
          throwNoPortalAttachedError();
        } else {
          this._attachedHost = null;
          host.detach();
        }
      }
      /**
       * Whether this portal is attached to a host.
       * @return {?}
       */


      get isAttached() {
        return this._attachedHost != null;
      }
      /**
       * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
       * the PortalOutlet when it is performing an `attach()` or `detach()`.
       * @param {?} host
       * @return {?}
       */


      setAttachedHost(host) {
        this._attachedHost = host;
      }

    }
    /**
     * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
     * @template T
     */


    class ComponentPortal extends Portal {
      /**
       * @param {?} component
       * @param {?=} viewContainerRef
       * @param {?=} injector
       * @param {?=} componentFactoryResolver
       */
      constructor(component, viewContainerRef, injector, componentFactoryResolver) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
      }

    }
    /**
     * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
     * @template C
     */


    class TemplatePortal extends Portal {
      /**
       * @param {?} template
       * @param {?} viewContainerRef
       * @param {?=} context
       */
      constructor(template, viewContainerRef, context) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
        this.context = context;
      }
      /**
       * @return {?}
       */


      get origin() {
        return this.templateRef.elementRef;
      }
      /**
       * Attach the portal to the provided `PortalOutlet`.
       * When a context is provided it will override the `context` property of the `TemplatePortal`
       * instance.
       * @param {?} host
       * @param {?=} context
       * @return {?}
       */


      attach(host, context = this.context) {
        this.context = context;
        return super.attach(host);
      }
      /**
       * @return {?}
       */


      detach() {
        this.context = undefined;
        return super.detach();
      }

    }
    /**
     * Partial implementation of PortalOutlet that handles attaching
     * ComponentPortal and TemplatePortal.
     * @abstract
     */


    class BasePortalOutlet {
      constructor() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
      }
      /**
       * Whether this host has an attached portal.
       * @return {?}
       */


      hasAttached() {
        return !!this._attachedPortal;
      }
      /**
       * Attaches a portal.
       * @param {?} portal
       * @return {?}
       */


      attach(portal) {
        if (!portal) {
          throwNullPortalError();
        }

        if (this.hasAttached()) {
          throwPortalAlreadyAttachedError();
        }

        if (this._isDisposed) {
          throwPortalOutletAlreadyDisposedError();
        }

        if (portal instanceof ComponentPortal) {
          this._attachedPortal = portal;
          return this.attachComponentPortal(portal);
        } else if (portal instanceof TemplatePortal) {
          this._attachedPortal = portal;
          return this.attachTemplatePortal(portal);
        }

        throwUnknownPortalTypeError();
      }
      /**
       * Detaches a previously attached portal.
       * @return {?}
       */


      detach() {
        if (this._attachedPortal) {
          this._attachedPortal.setAttachedHost(null);

          this._attachedPortal = null;
        }

        this._invokeDisposeFn();
      }
      /**
       * Permanently dispose of this portal host.
       * @return {?}
       */


      dispose() {
        if (this.hasAttached()) {
          this.detach();
        }

        this._invokeDisposeFn();

        this._isDisposed = true;
      }
      /**
       * \@docs-private
       * @param {?} fn
       * @return {?}
       */


      setDisposeFn(fn) {
        this._disposeFn = fn;
      }
      /**
       * @private
       * @return {?}
       */


      _invokeDisposeFn() {
        if (this._disposeFn) {
          this._disposeFn();

          this._disposeFn = null;
        }
      }

    }
    /**
     * @deprecated Use `BasePortalOutlet` instead.
     * \@breaking-change 9.0.0
     * @abstract
     */


    class BasePortalHost extends BasePortalOutlet {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * A PortalOutlet for attaching portals to an arbitrary DOM element outside of the Angular
     * application context.
     */


    class DomPortalOutlet extends BasePortalOutlet {
      /**
       * @param {?} outletElement
       * @param {?} _componentFactoryResolver
       * @param {?} _appRef
       * @param {?} _defaultInjector
       */
      constructor(outletElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        super();
        this.outletElement = outletElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
      }
      /**
       * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
       * @template T
       * @param {?} portal Portal to be attached
       * @return {?} Reference to the created component.
       */


      attachComponentPortal(portal) {
        /** @type {?} */
        const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
        /** @type {?} */

        const componentFactory = resolver.resolveComponentFactory(portal.component);
        /** @type {?} */

        let componentRef; // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.

        if (portal.viewContainerRef) {
          componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.injector);
          this.setDisposeFn(
          /**
          * @return {?}
          */
          () => componentRef.destroy());
        } else {
          componentRef = componentFactory.create(portal.injector || this._defaultInjector);

          this._appRef.attachView(componentRef.hostView);

          this.setDisposeFn(
          /**
          * @return {?}
          */
          () => {
            this._appRef.detachView(componentRef.hostView);

            componentRef.destroy();
          });
        } // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.


        this.outletElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
      }
      /**
       * Attaches a template portal to the DOM as an embedded view.
       * @template C
       * @param {?} portal Portal to be attached.
       * @return {?} Reference to the created embedded view.
       */


      attachTemplatePortal(portal) {
        /** @type {?} */
        let viewContainer = portal.viewContainerRef;
        /** @type {?} */

        let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
        viewRef.detectChanges(); // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalOutlet the view can be added everywhere in the DOM
        // (e.g Overlay Container) To move the view to the specified host element. We just
        // re-append the existing root nodes.

        viewRef.rootNodes.forEach(
        /**
        * @param {?} rootNode
        * @return {?}
        */
        rootNode => this.outletElement.appendChild(rootNode));
        this.setDisposeFn(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          let index = viewContainer.indexOf(viewRef);

          if (index !== -1) {
            viewContainer.remove(index);
          }
        }); // TODO(jelbourn): Return locals from view.

        return viewRef;
      }
      /**
       * Clears out a portal from the DOM.
       * @return {?}
       */


      dispose() {
        super.dispose();

        if (this.outletElement.parentNode != null) {
          this.outletElement.parentNode.removeChild(this.outletElement);
        }
      }
      /**
       * Gets the root HTMLElement for an instantiated component.
       * @private
       * @param {?} componentRef
       * @return {?}
       */


      _getComponentRootNode(componentRef) {
        return (
          /** @type {?} */

          /** @type {?} */
          componentRef.hostView.rootNodes[0]
        );
      }

    }
    /**
     * @deprecated Use `DomPortalOutlet` instead.
     * \@breaking-change 9.0.0
     */


    class DomPortalHost extends DomPortalOutlet {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
     * the directive instance itself can be attached to a host, enabling declarative use of portals.
     */


    class CdkPortal extends TemplatePortal {
      /**
       * @param {?} templateRef
       * @param {?} viewContainerRef
       */
      constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
      }

    }

    CdkPortal.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdkPortal]',
        exportAs: 'cdkPortal'
      }]
    }];
    /** @nocollapse */

    CdkPortal.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
    }];
    /**
     * @deprecated Use `CdkPortal` instead.
     * \@breaking-change 9.0.0
     */


    class TemplatePortalDirective extends CdkPortal {}

    TemplatePortalDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdk-portal], [portal]',
        exportAs: 'cdkPortal',
        providers: [{
          provide: CdkPortal,
          useExisting: TemplatePortalDirective
        }]
      }]
    }];
    /**
     * Directive version of a PortalOutlet. Because the directive *is* a PortalOutlet, portals can be
     * directly attached to it, enabling declarative use.
     *
     * Usage:
     * `<ng-template [cdkPortalOutlet]="greeting"></ng-template>`
     */

    class CdkPortalOutlet extends BasePortalOutlet {
      /**
       * @param {?} _componentFactoryResolver
       * @param {?} _viewContainerRef
       */
      constructor(_componentFactoryResolver, _viewContainerRef) {
        super();
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
        /**
         * Whether the portal component is initialized.
         */

        this._isInitialized = false;
        /**
         * Emits when a portal is attached to the outlet.
         */

        this.attached = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }
      /**
       * Portal associated with the Portal outlet.
       * @return {?}
       */


      get portal() {
        return this._attachedPortal;
      }
      /**
       * @param {?} portal
       * @return {?}
       */


      set portal(portal) {
        // Ignore the cases where the `portal` is set to a falsy value before the lifecycle hooks have
        // run. This handles the cases where the user might do something like `<div cdkPortalOutlet>`
        // and attach a portal programmatically in the parent component. When Angular does the first CD
        // round, it will fire the setter with empty string, causing the user's content to be cleared.
        if (this.hasAttached() && !portal && !this._isInitialized) {
          return;
        }

        if (this.hasAttached()) {
          super.detach();
        }

        if (portal) {
          super.attach(portal);
        }

        this._attachedPortal = portal;
      }
      /**
       * Component or view reference that is attached to the portal.
       * @return {?}
       */


      get attachedRef() {
        return this._attachedRef;
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        this._isInitialized = true;
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        super.dispose();
        this._attachedPortal = null;
        this._attachedRef = null;
      }
      /**
       * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
       *
       * @template T
       * @param {?} portal Portal to be attached to the portal outlet.
       * @return {?} Reference to the created component.
       */


      attachComponentPortal(portal) {
        portal.setAttachedHost(this); // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalOutlet.

        /** @type {?} */

        const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
        /** @type {?} */

        const resolver = portal.componentFactoryResolver || this._componentFactoryResolver;
        /** @type {?} */

        const componentFactory = resolver.resolveComponentFactory(portal.component);
        /** @type {?} */

        const ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.injector);
        super.setDisposeFn(
        /**
        * @return {?}
        */
        () => ref.destroy());
        this._attachedPortal = portal;
        this._attachedRef = ref;
        this.attached.emit(ref);
        return ref;
      }
      /**
       * Attach the given TemplatePortal to this PortlHost as an embedded View.
       * @template C
       * @param {?} portal Portal to be attached.
       * @return {?} Reference to the created embedded view.
       */


      attachTemplatePortal(portal) {
        portal.setAttachedHost(this);
        /** @type {?} */

        const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);

        super.setDisposeFn(
        /**
        * @return {?}
        */
        () => this._viewContainerRef.clear());
        this._attachedPortal = portal;
        this._attachedRef = viewRef;
        this.attached.emit(viewRef);
        return viewRef;
      }

    }

    CdkPortalOutlet.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdkPortalOutlet]',
        exportAs: 'cdkPortalOutlet',
        inputs: ['portal: cdkPortalOutlet']
      }]
    }];
    /** @nocollapse */

    CdkPortalOutlet.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
    }];

    CdkPortalOutlet.propDecorators = {
      attached: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }]
    };
    /**
     * @deprecated Use `CdkPortalOutlet` instead.
     * \@breaking-change 9.0.0
     */

    class PortalHostDirective extends CdkPortalOutlet {}

    PortalHostDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdkPortalHost], [portalHost]',
        exportAs: 'cdkPortalHost',
        inputs: ['portal: cdkPortalHost'],
        providers: [{
          provide: CdkPortalOutlet,
          useExisting: PortalHostDirective
        }]
      }]
    }];

    class PortalModule {}

    PortalModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        exports: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective],
        declarations: [CdkPortal, CdkPortalOutlet, TemplatePortalDirective, PortalHostDirective]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Custom injector to be used when providing custom
     * injection tokens to components inside a portal.
     * \@docs-private
     */

    class PortalInjector {
      /**
       * @param {?} _parentInjector
       * @param {?} _customTokens
       */
      constructor(_parentInjector, _customTokens) {
        this._parentInjector = _parentInjector;
        this._customTokens = _customTokens;
      }
      /**
       * @param {?} token
       * @param {?=} notFoundValue
       * @return {?}
       */


      get(token, notFoundValue) {
        /** @type {?} */
        const value = this._customTokens.get(token);

        if (typeof value !== 'undefined') {
          return value;
        }

        return this._parentInjector.get(token, notFoundValue);
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=portal.js.map

    /***/

  },

  /***/
  "./node_modules/@angular/cdk/esm2015/scrolling.js":
  /*!********************************************************!*\
    !*** ./node_modules/@angular/cdk/esm2015/scrolling.js ***!
    \********************************************************/

  /*! exports provided: _fixedSizeVirtualScrollStrategyFactory, FixedSizeVirtualScrollStrategy, CdkFixedSizeVirtualScroll, SCROLL_DISPATCHER_PROVIDER_FACTORY, DEFAULT_SCROLL_TIME, ScrollDispatcher, SCROLL_DISPATCHER_PROVIDER, CdkScrollable, ScrollingModule, ScrollDispatchModule, VIEWPORT_RULER_PROVIDER_FACTORY, DEFAULT_RESIZE_TIME, ViewportRuler, VIEWPORT_RULER_PROVIDER, CdkVirtualForOf, VIRTUAL_SCROLL_STRATEGY, CdkVirtualScrollViewport */

  /***/
  function node_modulesAngularCdkEsm2015ScrollingJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "_fixedSizeVirtualScrollStrategyFactory", function () {
      return _fixedSizeVirtualScrollStrategyFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FixedSizeVirtualScrollStrategy", function () {
      return FixedSizeVirtualScrollStrategy;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkFixedSizeVirtualScroll", function () {
      return CdkFixedSizeVirtualScroll;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SCROLL_DISPATCHER_PROVIDER_FACTORY", function () {
      return SCROLL_DISPATCHER_PROVIDER_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DEFAULT_SCROLL_TIME", function () {
      return DEFAULT_SCROLL_TIME;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ScrollDispatcher", function () {
      return ScrollDispatcher;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SCROLL_DISPATCHER_PROVIDER", function () {
      return SCROLL_DISPATCHER_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkScrollable", function () {
      return CdkScrollable;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ScrollingModule", function () {
      return ScrollingModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ScrollDispatchModule", function () {
      return ScrollDispatchModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VIEWPORT_RULER_PROVIDER_FACTORY", function () {
      return VIEWPORT_RULER_PROVIDER_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DEFAULT_RESIZE_TIME", function () {
      return DEFAULT_RESIZE_TIME;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewportRuler", function () {
      return ViewportRuler;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VIEWPORT_RULER_PROVIDER", function () {
      return VIEWPORT_RULER_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkVirtualForOf", function () {
      return CdkVirtualForOf;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VIRTUAL_SCROLL_STRATEGY", function () {
      return VIRTUAL_SCROLL_STRATEGY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkVirtualScrollViewport", function () {
      return CdkVirtualScrollViewport;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/cdk/collections */
    "./node_modules/@angular/cdk/esm2015/collections.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The injection token used to specify the virtual scrolling strategy.
     * @type {?}
     */


    const VIRTUAL_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('VIRTUAL_SCROLL_STRATEGY');
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Virtual scrolling strategy for lists with items of known fixed size.
     */

    class FixedSizeVirtualScrollStrategy {
      /**
       * @param {?} itemSize The size of the items in the virtually scrolling list.
       * @param {?} minBufferPx The minimum amount of buffer (in pixels) before needing to render more
       * @param {?} maxBufferPx The amount of buffer (in pixels) to render when rendering more.
       */
      constructor(itemSize, minBufferPx, maxBufferPx) {
        this._scrolledIndexChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * \@docs-private Implemented as part of VirtualScrollStrategy.
         */

        this.scrolledIndexChange = this._scrolledIndexChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        /**
         * The attached viewport.
         */

        this._viewport = null;
        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
      }
      /**
       * Attaches this scroll strategy to a viewport.
       * @param {?} viewport The viewport to attach this strategy to.
       * @return {?}
       */


      attach(viewport) {
        this._viewport = viewport;

        this._updateTotalContentSize();

        this._updateRenderedRange();
      }
      /**
       * Detaches this scroll strategy from the currently attached viewport.
       * @return {?}
       */


      detach() {
        this._scrolledIndexChange.complete();

        this._viewport = null;
      }
      /**
       * Update the item size and buffer size.
       * @param {?} itemSize The size of the items in the virtually scrolling list.
       * @param {?} minBufferPx The minimum amount of buffer (in pixels) before needing to render more
       * @param {?} maxBufferPx The amount of buffer (in pixels) to render when rendering more.
       * @return {?}
       */


      updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
        if (maxBufferPx < minBufferPx) {
          throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
        }

        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;

        this._updateTotalContentSize();

        this._updateRenderedRange();
      }
      /**
       * \@docs-private Implemented as part of VirtualScrollStrategy.
       * @return {?}
       */


      onContentScrolled() {
        this._updateRenderedRange();
      }
      /**
       * \@docs-private Implemented as part of VirtualScrollStrategy.
       * @return {?}
       */


      onDataLengthChanged() {
        this._updateTotalContentSize();

        this._updateRenderedRange();
      }
      /**
       * \@docs-private Implemented as part of VirtualScrollStrategy.
       * @return {?}
       */


      onContentRendered() {}
      /**
       * \@docs-private Implemented as part of VirtualScrollStrategy.
       * @return {?}
       */


      onRenderedOffsetChanged() {}
      /**
       * Scroll to the offset for the given index.
       * @param {?} index The index of the element to scroll to.
       * @param {?} behavior The ScrollBehavior to use when scrolling.
       * @return {?}
       */


      scrollToIndex(index, behavior) {
        if (this._viewport) {
          this._viewport.scrollToOffset(index * this._itemSize, behavior);
        }
      }
      /**
       * Update the viewport's total content size.
       * @private
       * @return {?}
       */


      _updateTotalContentSize() {
        if (!this._viewport) {
          return;
        }

        this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
      }
      /**
       * Update the viewport's rendered range.
       * @private
       * @return {?}
       */


      _updateRenderedRange() {
        if (!this._viewport) {
          return;
        }
        /** @type {?} */


        const scrollOffset = this._viewport.measureScrollOffset();
        /** @type {?} */


        const firstVisibleIndex = scrollOffset / this._itemSize;
        /** @type {?} */

        const renderedRange = this._viewport.getRenderedRange();
        /** @type {?} */


        const newRange = {
          start: renderedRange.start,
          end: renderedRange.end
        };
        /** @type {?} */

        const viewportSize = this._viewport.getViewportSize();
        /** @type {?} */


        const dataLength = this._viewport.getDataLength();
        /** @type {?} */


        const startBuffer = scrollOffset - newRange.start * this._itemSize;

        if (startBuffer < this._minBufferPx && newRange.start != 0) {
          /** @type {?} */
          const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
          newRange.start = Math.max(0, newRange.start - expandStart);
          newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
        } else {
          /** @type {?} */
          const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);

          if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
            /** @type {?} */
            const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);

            if (expandEnd > 0) {
              newRange.end = Math.min(dataLength, newRange.end + expandEnd);
              newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
            }
          }
        }

        this._viewport.setRenderedRange(newRange);

        this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);

        this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
      }

    }
    /**
     * Provider factory for `FixedSizeVirtualScrollStrategy` that simply extracts the already created
     * `FixedSizeVirtualScrollStrategy` from the given directive.
     * @param {?} fixedSizeDir The instance of `CdkFixedSizeVirtualScroll` to extract the
     *     `FixedSizeVirtualScrollStrategy` from.
     * @return {?}
     */


    function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
      return fixedSizeDir._scrollStrategy;
    }
    /**
     * A virtual scroll strategy that supports fixed-size items.
     */


    class CdkFixedSizeVirtualScroll {
      constructor() {
        this._itemSize = 20;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /**
         * The scroll strategy used by this directive.
         */

        this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
      }
      /**
       * The size of the items in the list (in pixels).
       * @return {?}
       */


      get itemSize() {
        return this._itemSize;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set itemSize(value) {
        this._itemSize = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
      }
      /**
       * The minimum amount of buffer rendered beyond the viewport (in pixels).
       * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
       * @return {?}
       */


      get minBufferPx() {
        return this._minBufferPx;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set minBufferPx(value) {
        this._minBufferPx = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
      }
      /**
       * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
       * @return {?}
       */


      get maxBufferPx() {
        return this._maxBufferPx;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set maxBufferPx(value) {
        this._maxBufferPx = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
      }
      /**
       * @return {?}
       */


      ngOnChanges() {
        this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
      }

    }

    CdkFixedSizeVirtualScroll.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'cdk-virtual-scroll-viewport[itemSize]',
        providers: [{
          provide: VIRTUAL_SCROLL_STRATEGY,
          useFactory: _fixedSizeVirtualScrollStrategyFactory,
          deps: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
          /**
          * @return {?}
          */
          () => CdkFixedSizeVirtualScroll)]
        }]
      }]
    }];
    CdkFixedSizeVirtualScroll.propDecorators = {
      itemSize: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      minBufferPx: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      maxBufferPx: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Time in ms to throttle the scrolling events by default.
     * @type {?}
     */

    const DEFAULT_SCROLL_TIME = 20;
    /**
     * Service contained all registered Scrollable references and emits an event when any one of the
     * Scrollable references emit a scrolled event.
     */

    class ScrollDispatcher {
      /**
       * @param {?} _ngZone
       * @param {?} _platform
       */
      constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */

        this._scrolled = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */

        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */

        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */

        this.scrollContainers = new Map();
      }
      /**
       * Registers a scrollable instance with the service and listens for its scrolled events. When the
       * scrollable is scrolled, the service emits the event to its scrolled observable.
       * @param {?} scrollable Scrollable instance to be registered.
       * @return {?}
       */


      register(scrollable) {
        if (!this.scrollContainers.has(scrollable)) {
          this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(
          /**
          * @return {?}
          */
          () => this._scrolled.next(scrollable)));
        }
      }
      /**
       * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
       * @param {?} scrollable Scrollable instance to be deregistered.
       * @return {?}
       */


      deregister(scrollable) {
        /** @type {?} */
        const scrollableReference = this.scrollContainers.get(scrollable);

        if (scrollableReference) {
          scrollableReference.unsubscribe();
          this.scrollContainers.delete(scrollable);
        }
      }
      /**
       * Returns an observable that emits an event whenever any of the registered Scrollable
       * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
       * to override the default "throttle" time.
       *
       * **Note:** in order to avoid hitting change detection for every scroll event,
       * all of the events emitted from this stream will be run outside the Angular zone.
       * If you need to update any data bindings as a result of a scroll event, you have
       * to run the callback using `NgZone.run`.
       * @param {?=} auditTimeInMs
       * @return {?}
       */


      scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
        if (!this._platform.isBrowser) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
        }

        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](
        /**
        * @param {?} observer
        * @return {?}
        */
        observer => {
          if (!this._globalSubscription) {
            this._addGlobalListener();
          } // In the case of a 0ms delay, use an observable without auditTime
          // since it does add a perceptible delay in processing overhead.

          /** @type {?} */


          const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
          this._scrolledCount++;
          return (
            /**
            * @return {?}
            */
            () => {
              subscription.unsubscribe();
              this._scrolledCount--;

              if (!this._scrolledCount) {
                this._removeGlobalListener();
              }
            }
          );
        });
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._removeGlobalListener();

        this.scrollContainers.forEach(
        /**
        * @param {?} _
        * @param {?} container
        * @return {?}
        */
        (_, container) => this.deregister(container));

        this._scrolled.complete();
      }
      /**
       * Returns an observable that emits whenever any of the
       * scrollable ancestors of an element are scrolled.
       * @param {?} elementRef Element whose ancestors to listen for.
       * @param {?=} auditTimeInMs Time to throttle the scroll events.
       * @return {?}
       */


      ancestorScrolled(elementRef, auditTimeInMs) {
        /** @type {?} */
        const ancestors = this.getAncestorScrollContainers(elementRef);
        return this.scrolled(auditTimeInMs).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(
        /**
        * @param {?} target
        * @return {?}
        */
        target => {
          return !target || ancestors.indexOf(target) > -1;
        }));
      }
      /**
       * Returns all registered Scrollables that contain the provided element.
       * @param {?} elementRef
       * @return {?}
       */


      getAncestorScrollContainers(elementRef) {
        /** @type {?} */
        const scrollingContainers = [];
        this.scrollContainers.forEach(
        /**
        * @param {?} _subscription
        * @param {?} scrollable
        * @return {?}
        */
        (_subscription, scrollable) => {
          if (this._scrollableContainsElement(scrollable, elementRef)) {
            scrollingContainers.push(scrollable);
          }
        });
        return scrollingContainers;
      }
      /**
       * Returns true if the element is contained within the provided Scrollable.
       * @private
       * @param {?} scrollable
       * @param {?} elementRef
       * @return {?}
       */


      _scrollableContainsElement(scrollable, elementRef) {
        /** @type {?} */
        let element = elementRef.nativeElement;
        /** @type {?} */

        let scrollableElement = scrollable.getElementRef().nativeElement; // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.

        do {
          if (element == scrollableElement) {
            return true;
          }
        } while (element =
        /** @type {?} */
        element.parentElement);

        return false;
      }
      /**
       * Sets up the global scroll listeners.
       * @private
       * @return {?}
       */


      _addGlobalListener() {
        this._globalSubscription = this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window.document, 'scroll').subscribe(
          /**
          * @return {?}
          */
          () => this._scrolled.next());
        });
      }
      /**
       * Cleans up the global scroll listener.
       * @private
       * @return {?}
       */


      _removeGlobalListener() {
        if (this._globalSubscription) {
          this._globalSubscription.unsubscribe();

          this._globalSubscription = null;
        }
      }

    }

    ScrollDispatcher.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    ScrollDispatcher.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]
    }];
    /** @nocollapse */


    ScrollDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({
      factory: function ScrollDispatcher_Factory() {
        return new ScrollDispatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]));
      },
      token: ScrollDispatcher,
      providedIn: "root"
    });
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @param {?} parentDispatcher
     * @param {?} ngZone
     * @param {?} platform
     * @return {?}
     */

    function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
      return parentDispatcher || new ScrollDispatcher(ngZone, platform);
    }
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @type {?}
     */


    const SCROLL_DISPATCHER_PROVIDER = {
      // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
      provide: ScrollDispatcher,
      deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ScrollDispatcher], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]],
      useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Sends an event when the directive's element is scrolled. Registers itself with the
     * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
     * can be listened to through the service.
     */

    class CdkScrollable {
      /**
       * @param {?} elementRef
       * @param {?} scrollDispatcher
       * @param {?} ngZone
       * @param {?=} dir
       */
      constructor(elementRef, scrollDispatcher, ngZone, dir) {
        this.elementRef = elementRef;
        this.scrollDispatcher = scrollDispatcher;
        this.ngZone = ngZone;
        this.dir = dir;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._elementScrolled = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](
        /**
        * @param {?} observer
        * @return {?}
        */
        observer => this.ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.elementRef.nativeElement, 'scroll').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed)).subscribe(observer)));
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        this.scrollDispatcher.register(this);
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this.scrollDispatcher.deregister(this);

        this._destroyed.next();

        this._destroyed.complete();
      }
      /**
       * Returns observable that emits when a scroll event is fired on the host element.
       * @return {?}
       */


      elementScrolled() {
        return this._elementScrolled;
      }
      /**
       * Gets the ElementRef for the viewport.
       * @return {?}
       */


      getElementRef() {
        return this.elementRef;
      }
      /**
       * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
       * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
       * left and right always refer to the left and right side of the scrolling container irrespective
       * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
       * in an RTL context.
       * @param {?} options specified the offsets to scroll to.
       * @return {?}
       */


      scrollTo(options) {
        /** @type {?} */
        const el = this.elementRef.nativeElement;
        /** @type {?} */

        const isRtl = this.dir && this.dir.value == 'rtl'; // Rewrite start & end offsets as right or left offsets.

        options.left = options.left == null ? isRtl ? options.end : options.start : options.left;
        options.right = options.right == null ? isRtl ? options.start : options.end : options.right; // Rewrite the bottom offset as a top offset.

        if (options.bottom != null) {
          /** @type {?} */
          options.top = el.scrollHeight - el.clientHeight - options.bottom;
        } // Rewrite the right offset as a left offset.


        if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() != _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NORMAL) {
          if (options.left != null) {
            /** @type {?} */
            options.right = el.scrollWidth - el.clientWidth - options.left;
          }

          if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].INVERTED) {
            options.left = options.right;
          } else if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NEGATED) {
            options.left = options.right ? -options.right : options.right;
          }
        } else {
          if (options.right != null) {
            /** @type {?} */
            options.left = el.scrollWidth - el.clientWidth - options.right;
          }
        }

        this._applyScrollToOptions(options);
      }
      /**
       * @private
       * @param {?} options
       * @return {?}
       */


      _applyScrollToOptions(options) {
        /** @type {?} */
        const el = this.elementRef.nativeElement;

        if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["supportsScrollBehavior"])()) {
          el.scrollTo(options);
        } else {
          if (options.top != null) {
            el.scrollTop = options.top;
          }

          if (options.left != null) {
            el.scrollLeft = options.left;
          }
        }
      }
      /**
       * Measures the scroll offset relative to the specified edge of the viewport. This method can be
       * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
       * about what scrollLeft means in RTL. The values returned by this method are normalized such that
       * left and right always refer to the left and right side of the scrolling container irrespective
       * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
       * in an RTL context.
       * @param {?} from The edge to measure from.
       * @return {?}
       */


      measureScrollOffset(from) {
        /** @type {?} */
        const LEFT = 'left';
        /** @type {?} */

        const RIGHT = 'right';
        /** @type {?} */

        const el = this.elementRef.nativeElement;

        if (from == 'top') {
          return el.scrollTop;
        }

        if (from == 'bottom') {
          return el.scrollHeight - el.clientHeight - el.scrollTop;
        } // Rewrite start & end as left or right offsets.

        /** @type {?} */


        const isRtl = this.dir && this.dir.value == 'rtl';

        if (from == 'start') {
          from = isRtl ? RIGHT : LEFT;
        } else if (from == 'end') {
          from = isRtl ? LEFT : RIGHT;
        }

        if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].INVERTED) {
          // For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
          // 0 when scrolled all the way right.
          if (from == LEFT) {
            return el.scrollWidth - el.clientWidth - el.scrollLeft;
          } else {
            return el.scrollLeft;
          }
        } else if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NEGATED) {
          // For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
          // 0 when scrolled all the way right.
          if (from == LEFT) {
            return el.scrollLeft + el.scrollWidth - el.clientWidth;
          } else {
            return -el.scrollLeft;
          }
        } else {
          // For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
          // (scrollWidth - clientWidth) when scrolled all the way right.
          if (from == LEFT) {
            return el.scrollLeft;
          } else {
            return el.scrollWidth - el.clientWidth - el.scrollLeft;
          }
        }
      }

    }

    CdkScrollable.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdk-scrollable], [cdkScrollable]'
      }]
    }];
    /** @nocollapse */

    CdkScrollable.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: ScrollDispatcher
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Checks if the given ranges are equal.
     * @param {?} r1
     * @param {?} r2
     * @return {?}
     */


    function rangesEqual(r1, r2) {
      return r1.start == r2.start && r1.end == r2.end;
    }
    /**
     * Scheduler to be used for scroll events. Needs to fall back to
     * something that doesn't rely on requestAnimationFrame on environments
     * that don't support it (e.g. server-side rendering).
     * @type {?}
     */


    const SCROLL_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"] : rxjs__WEBPACK_IMPORTED_MODULE_2__["asapScheduler"];
    /**
     * A viewport that virtualizes its scrolling with the help of `CdkVirtualForOf`.
     */

    class CdkVirtualScrollViewport extends CdkScrollable {
      /**
       * @param {?} elementRef
       * @param {?} _changeDetectorRef
       * @param {?} ngZone
       * @param {?} _scrollStrategy
       * @param {?} dir
       * @param {?} scrollDispatcher
       */
      constructor(elementRef, _changeDetectorRef, ngZone, _scrollStrategy, dir, scrollDispatcher) {
        super(elementRef, scrollDispatcher, ngZone, dir);
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollStrategy = _scrollStrategy;
        /**
         * Emits when the viewport is detached from a CdkVirtualForOf.
         */

        this._detachedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emits when the rendered range changes.
         */

        this._renderedRangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._orientation = 'vertical'; // Note: we don't use the typical EventEmitter here because we need to subscribe to the scroll
        // strategy lazily (i.e. only if the user is actually listening to the events). We do this because
        // depending on how the strategy calculates the scrolled index, it may come at a cost to
        // performance.

        /**
         * Emits when the index of the first element visible in the viewport changes.
         */

        this.scrolledIndexChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](
        /**
        * @param {?} observer
        * @return {?}
        */
        observer => this._scrollStrategy.scrolledIndexChange.subscribe(
        /**
        * @param {?} index
        * @return {?}
        */
        index => Promise.resolve().then(
        /**
        * @return {?}
        */
        () => this.ngZone.run(
        /**
        * @return {?}
        */
        () => observer.next(index)))));
        /**
         * A stream that emits whenever the rendered range changes.
         */

        this.renderedRangeStream = this._renderedRangeSubject.asObservable();
        /**
         * The total size of all content (in pixels), including content that is not currently rendered.
         */

        this._totalContentSize = 0;
        /**
         * A string representing the `style.width` property value to be used for the spacer element.
         */

        this._totalContentWidth = '';
        /**
         * A string representing the `style.height` property value to be used for the spacer element.
         */

        this._totalContentHeight = '';
        /**
         * The currently rendered range of indices.
         */

        this._renderedRange = {
          start: 0,
          end: 0
        };
        /**
         * The length of the data bound to this viewport (in number of items).
         */

        this._dataLength = 0;
        /**
         * The size of the viewport (in pixels).
         */

        this._viewportSize = 0;
        /**
         * The last rendered content offset that was set.
         */

        this._renderedContentOffset = 0;
        /**
         * Whether the last rendered content offset was to the end of the content (and therefore needs to
         * be rewritten as an offset to the start of the content).
         */

        this._renderedContentOffsetNeedsRewrite = false;
        /**
         * Whether there is a pending change detection cycle.
         */

        this._isChangeDetectionPending = false;
        /**
         * A list of functions to run after the next change detection cycle.
         */

        this._runAfterChangeDetection = [];

        if (!_scrollStrategy) {
          throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
        }
      }
      /**
       * The direction the viewport scrolls.
       * @return {?}
       */


      get orientation() {
        return this._orientation;
      }
      /**
       * @param {?} orientation
       * @return {?}
       */


      set orientation(orientation) {
        if (this._orientation !== orientation) {
          this._orientation = orientation;

          this._calculateSpacerSize();
        }
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        super.ngOnInit(); // It's still too early to measure the viewport at this point. Deferring with a promise allows
        // the Viewport to be rendered with the correct size before we measure. We run this outside the
        // zone to avoid causing more change detection cycles. We handle the change detection loop
        // ourselves instead.

        this.ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => Promise.resolve().then(
        /**
        * @return {?}
        */
        () => {
          this._measureViewportSize();

          this._scrollStrategy.attach(this);

          this.elementScrolled().pipe( // Start off with a fake scroll event so we properly detect our initial position.
          Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(
          /** @type {?} */
          null), // Collect multiple events into one until the next animation frame. This way if
          // there are multiple scroll events in the same frame we only need to recheck
          // our layout once.
          Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(0, SCROLL_SCHEDULER)).subscribe(
          /**
          * @return {?}
          */
          () => this._scrollStrategy.onContentScrolled());

          this._markChangeDetectionNeeded();
        }));
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this.detach();

        this._scrollStrategy.detach(); // Complete all subjects


        this._renderedRangeSubject.complete();

        this._detachedSubject.complete();

        super.ngOnDestroy();
      }
      /**
       * Attaches a `CdkVirtualForOf` to this viewport.
       * @param {?} forOf
       * @return {?}
       */


      attach(forOf) {
        if (this._forOf) {
          throw Error('CdkVirtualScrollViewport is already attached.');
        } // Subscribe to the data stream of the CdkVirtualForOf to keep track of when the data length
        // changes. Run outside the zone to avoid triggering change detection, since we're managing the
        // change detection loop ourselves.


        this.ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          this._forOf = forOf;

          this._forOf.dataStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._detachedSubject)).subscribe(
          /**
          * @param {?} data
          * @return {?}
          */
          data => {
            /** @type {?} */
            const newLength = data.length;

            if (newLength !== this._dataLength) {
              this._dataLength = newLength;

              this._scrollStrategy.onDataLengthChanged();
            }

            this._doChangeDetection();
          });
        });
      }
      /**
       * Detaches the current `CdkVirtualForOf`.
       * @return {?}
       */


      detach() {
        this._forOf = null;

        this._detachedSubject.next();
      }
      /**
       * Gets the length of the data bound to this viewport (in number of items).
       * @return {?}
       */


      getDataLength() {
        return this._dataLength;
      }
      /**
       * Gets the size of the viewport (in pixels).
       * @return {?}
       */


      getViewportSize() {
        return this._viewportSize;
      } // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
      // cycle happens. I'm being careful to only call it after the render cycle is complete and before
      // setting it to something else, but its error prone and should probably be split into
      // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.

      /**
       * Get the current rendered range of items.
       * @return {?}
       */


      getRenderedRange() {
        return this._renderedRange;
      }
      /**
       * Sets the total size of all content (in pixels), including content that is not currently
       * rendered.
       * @param {?} size
       * @return {?}
       */


      setTotalContentSize(size) {
        if (this._totalContentSize !== size) {
          this._totalContentSize = size;

          this._calculateSpacerSize();

          this._markChangeDetectionNeeded();
        }
      }
      /**
       * Sets the currently rendered range of indices.
       * @param {?} range
       * @return {?}
       */


      setRenderedRange(range) {
        if (!rangesEqual(this._renderedRange, range)) {
          this._renderedRangeSubject.next(this._renderedRange = range);

          this._markChangeDetectionNeeded(
          /**
          * @return {?}
          */
          () => this._scrollStrategy.onContentRendered());
        }
      }
      /**
       * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
       * @return {?}
       */


      getOffsetToRenderedContentStart() {
        return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
      }
      /**
       * Sets the offset from the start of the viewport to either the start or end of the rendered data
       * (in pixels).
       * @param {?} offset
       * @param {?=} to
       * @return {?}
       */


      setRenderedContentOffset(offset, to = 'to-start') {
        // For a horizontal viewport in a right-to-left language we need to translate along the x-axis
        // in the negative direction.

        /** @type {?} */
        const isRtl = this.dir && this.dir.value == 'rtl';
        /** @type {?} */

        const isHorizontal = this.orientation == 'horizontal';
        /** @type {?} */

        const axis = isHorizontal ? 'X' : 'Y';
        /** @type {?} */

        const axisDirection = isHorizontal && isRtl ? -1 : 1;
        /** @type {?} */

        let transform = "translate".concat(axis, "(").concat(Number(axisDirection * offset), "px)");
        this._renderedContentOffset = offset;

        if (to === 'to-end') {
          transform += " translate".concat(axis, "(-100%)"); // The viewport should rewrite this as a `to-start` offset on the next render cycle. Otherwise
          // elements will appear to expand in the wrong direction (e.g. `mat-expansion-panel` would
          // expand upward).

          this._renderedContentOffsetNeedsRewrite = true;
        }

        if (this._renderedContentTransform != transform) {
          // We know this value is safe because we parse `offset` with `Number()` before passing it
          // into the string.
          this._renderedContentTransform = transform;

          this._markChangeDetectionNeeded(
          /**
          * @return {?}
          */
          () => {
            if (this._renderedContentOffsetNeedsRewrite) {
              this._renderedContentOffset -= this.measureRenderedContentSize();
              this._renderedContentOffsetNeedsRewrite = false;
              this.setRenderedContentOffset(this._renderedContentOffset);
            } else {
              this._scrollStrategy.onRenderedOffsetChanged();
            }
          });
        }
      }
      /**
       * Scrolls to the given offset from the start of the viewport. Please note that this is not always
       * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
       * direction, this would be the equivalent of setting a fictional `scrollRight` property.
       * @param {?} offset The offset to scroll to.
       * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       * @return {?}
       */


      scrollToOffset(offset, behavior = 'auto') {
        /** @type {?} */
        const options = {
          behavior
        };

        if (this.orientation === 'horizontal') {
          options.start = offset;
        } else {
          options.top = offset;
        }

        this.scrollTo(options);
      }
      /**
       * Scrolls to the offset for the given index.
       * @param {?} index The index of the element to scroll to.
       * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
       * @return {?}
       */


      scrollToIndex(index, behavior = 'auto') {
        this._scrollStrategy.scrollToIndex(index, behavior);
      }
      /**
       * Gets the current scroll offset from the start of the viewport (in pixels).
       * @param {?=} from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
       *     in horizontal mode.
       * @return {?}
       */


      measureScrollOffset(from) {
        return super.measureScrollOffset(from ? from : this.orientation === 'horizontal' ? 'start' : 'top');
      }
      /**
       * Measure the combined size of all of the rendered items.
       * @return {?}
       */


      measureRenderedContentSize() {
        /** @type {?} */
        const contentEl = this._contentWrapper.nativeElement;
        return this.orientation === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
      }
      /**
       * Measure the total combined size of the given range. Throws if the range includes items that are
       * not rendered.
       * @param {?} range
       * @return {?}
       */


      measureRangeSize(range) {
        if (!this._forOf) {
          return 0;
        }

        return this._forOf.measureRangeSize(range, this.orientation);
      }
      /**
       * Update the viewport dimensions and re-render.
       * @return {?}
       */


      checkViewportSize() {
        // TODO: Cleanup later when add logic for handling content resize
        this._measureViewportSize();

        this._scrollStrategy.onDataLengthChanged();
      }
      /**
       * Measure the viewport size.
       * @private
       * @return {?}
       */


      _measureViewportSize() {
        /** @type {?} */
        const viewportEl = this.elementRef.nativeElement;
        this._viewportSize = this.orientation === 'horizontal' ? viewportEl.clientWidth : viewportEl.clientHeight;
      }
      /**
       * Queue up change detection to run.
       * @private
       * @param {?=} runAfter
       * @return {?}
       */


      _markChangeDetectionNeeded(runAfter) {
        if (runAfter) {
          this._runAfterChangeDetection.push(runAfter);
        } // Use a Promise to batch together calls to `_doChangeDetection`. This way if we set a bunch of
        // properties sequentially we only have to run `_doChangeDetection` once at the end.


        if (!this._isChangeDetectionPending) {
          this._isChangeDetectionPending = true;
          this.ngZone.runOutsideAngular(
          /**
          * @return {?}
          */
          () => Promise.resolve().then(
          /**
          * @return {?}
          */
          () => {
            this._doChangeDetection();
          }));
        }
      }
      /**
       * Run change detection.
       * @private
       * @return {?}
       */


      _doChangeDetection() {
        this._isChangeDetectionPending = false; // Apply changes to Angular bindings. Note: We must call `markForCheck` to run change detection
        // from the root, since the repeated items are content projected in. Calling `detectChanges`
        // instead does not properly check the projected content.

        this.ngZone.run(
        /**
        * @return {?}
        */
        () => this._changeDetectorRef.markForCheck()); // Apply the content transform. The transform can't be set via an Angular binding because
        // bypassSecurityTrustStyle is banned in Google. However the value is safe, it's composed of
        // string literals, a variable that can only be 'X' or 'Y', and user input that is run through
        // the `Number` function first to coerce it to a numeric value.

        this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
        /** @type {?} */

        const runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];

        for (const fn of runAfterChangeDetection) {
          fn();
        }
      }
      /**
       * Calculates the `style.width` and `style.height` for the spacer element.
       * @private
       * @return {?}
       */


      _calculateSpacerSize() {
        this._totalContentHeight = this.orientation === 'horizontal' ? '' : "".concat(this._totalContentSize, "px");
        this._totalContentWidth = this.orientation === 'horizontal' ? "".concat(this._totalContentSize, "px") : '';
      }

    }

    CdkVirtualScrollViewport.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'cdk-virtual-scroll-viewport',
        template: "<div #contentWrapper class=\"cdk-virtual-scroll-content-wrapper\"><ng-content></ng-content></div><div class=\"cdk-virtual-scroll-spacer\" [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"></div>",
        styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}"],
        host: {
          'class': 'cdk-virtual-scroll-viewport',
          '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
          '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation !== "horizontal"'
        },
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        providers: [{
          provide: CdkScrollable,
          useExisting: CdkVirtualScrollViewport
        }]
      }]
    }];
    /** @nocollapse */

    CdkVirtualScrollViewport.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [VIRTUAL_SCROLL_STRATEGY]
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }]
    }, {
      type: ScrollDispatcher
    }];

    CdkVirtualScrollViewport.propDecorators = {
      orientation: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      scrolledIndexChange: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      _contentWrapper: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['contentWrapper', {
          static: true
        }]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Helper to extract size from a DOM Node.
     * @param {?} orientation
     * @param {?} node
     * @return {?}
     */

    function getSize(orientation, node) {
      /** @type {?} */
      const el =
      /** @type {?} */
      node;

      if (!el.getBoundingClientRect) {
        return 0;
      }
      /** @type {?} */


      const rect = el.getBoundingClientRect();
      return orientation == 'horizontal' ? rect.width : rect.height;
    }
    /**
     * A directive similar to `ngForOf` to be used for rendering data inside a virtual scrolling
     * container.
     * @template T
     */


    class CdkVirtualForOf {
      /**
       * @param {?} _viewContainerRef
       * @param {?} _template
       * @param {?} _differs
       * @param {?} _viewport
       * @param {?} ngZone
       */
      constructor(_viewContainerRef, _template, _differs, _viewport, ngZone) {
        this._viewContainerRef = _viewContainerRef;
        this._template = _template;
        this._differs = _differs;
        this._viewport = _viewport;
        /**
         * Emits when the rendered view of the data changes.
         */

        this.viewChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Subject that emits when a new DataSource instance is given.
         */

        this._dataSourceChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * The size of the cache used to store templates that are not being used for re-use later.
         * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
         */

        this.cdkVirtualForTemplateCacheSize = 20;
        /**
         * Emits whenever the data in the current DataSource changes.
         */

        this.dataStream = this._dataSourceChanges.pipe( // Start off with null `DataSource`.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(
        /** @type {?} */
        null), // Bundle up the previous and current data sources so we can work with both.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pairwise"])(), // Use `_changeDataSource` to disconnect from the previous data source and connect to the
        // new one, passing back a stream of data changes which we run through `switchMap` to give
        // us a data stream that emits the latest data from whatever the current `DataSource` is.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(
        /**
        * @param {?} __0
        * @return {?}
        */
        ([prev, cur]) => this._changeDataSource(prev, cur)), // Replay the last emitted data when someone subscribes.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        /**
         * The differ used to calculate changes to the data.
         */

        this._differ = null;
        /**
         * The template cache used to hold on ot template instancess that have been stamped out, but don't
         * currently need to be rendered. These instances will be reused in the future rather than
         * stamping out brand new ones.
         */

        this._templateCache = [];
        /**
         * Whether the rendered data should be updated during the next ngDoCheck cycle.
         */

        this._needsUpdate = false;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.dataStream.subscribe(
        /**
        * @param {?} data
        * @return {?}
        */
        data => {
          this._data = data;

          this._onRenderedDataChange();
        });

        this._viewport.renderedRangeStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed)).subscribe(
        /**
        * @param {?} range
        * @return {?}
        */
        range => {
          this._renderedRange = range;
          ngZone.run(
          /**
          * @return {?}
          */
          () => this.viewChange.next(this._renderedRange));

          this._onRenderedDataChange();
        });

        this._viewport.attach(this);
      }
      /**
       * The DataSource to display.
       * @return {?}
       */


      get cdkVirtualForOf() {
        return this._cdkVirtualForOf;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set cdkVirtualForOf(value) {
        this._cdkVirtualForOf = value;
        /** @type {?} */

        const ds = Object(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__["isDataSource"])(value) ? value : // Slice the value if its an NgIterable to ensure we're working with an array.
        new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__["ArrayDataSource"](value instanceof rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"] ? value : Array.prototype.slice.call(value || []));

        this._dataSourceChanges.next(ds);
      }
      /**
       * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
       * the item and produces a value to be used as the item's identity when tracking changes.
       * @return {?}
       */


      get cdkVirtualForTrackBy() {
        return this._cdkVirtualForTrackBy;
      }
      /**
       * @param {?} fn
       * @return {?}
       */


      set cdkVirtualForTrackBy(fn) {
        this._needsUpdate = true;
        this._cdkVirtualForTrackBy = fn ?
        /**
        * @param {?} index
        * @param {?} item
        * @return {?}
        */
        (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : undefined;
      }
      /**
       * The template used to stamp out new elements.
       * @param {?} value
       * @return {?}
       */


      set cdkVirtualForTemplate(value) {
        if (value) {
          this._needsUpdate = true;
          this._template = value;
        }
      }
      /**
       * Measures the combined size (width for horizontal orientation, height for vertical) of all items
       * in the specified range. Throws an error if the range includes items that are not currently
       * rendered.
       * @param {?} range
       * @param {?} orientation
       * @return {?}
       */


      measureRangeSize(range, orientation) {
        if (range.start >= range.end) {
          return 0;
        }

        if (range.start < this._renderedRange.start || range.end > this._renderedRange.end) {
          throw Error("Error: attempted to measure an item that isn't rendered.");
        } // The index into the list of rendered views for the first item in the range.

        /** @type {?} */


        const renderedStartIndex = range.start - this._renderedRange.start; // The length of the range we're measuring.

        /** @type {?} */

        const rangeLen = range.end - range.start; // Loop over all root nodes for all items in the range and sum up their size.

        /** @type {?} */

        let totalSize = 0;
        /** @type {?} */

        let i = rangeLen;

        while (i--) {
          /** @type {?} */
          const view =
          /** @type {?} */
          this._viewContainerRef.get(i + renderedStartIndex);
          /** @type {?} */


          let j = view ? view.rootNodes.length : 0;

          while (j--) {
            totalSize += getSize(orientation,
            /** @type {?} */
            view.rootNodes[j]);
          }
        }

        return totalSize;
      }
      /**
       * @return {?}
       */


      ngDoCheck() {
        if (this._differ && this._needsUpdate) {
          // TODO(mmalerba): We should differentiate needs update due to scrolling and a new portion of
          // this list being rendered (can use simpler algorithm) vs needs update due to data actually
          // changing (need to do this diff).

          /** @type {?} */
          const changes = this._differ.diff(this._renderedItems);

          if (!changes) {
            this._updateContext();
          } else {
            this._applyChanges(changes);
          }

          this._needsUpdate = false;
        }
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._viewport.detach();

        this._dataSourceChanges.next();

        this._dataSourceChanges.complete();

        this.viewChange.complete();

        this._destroyed.next();

        this._destroyed.complete();

        for (let view of this._templateCache) {
          view.destroy();
        }
      }
      /**
       * React to scroll state changes in the viewport.
       * @private
       * @return {?}
       */


      _onRenderedDataChange() {
        if (!this._renderedRange) {
          return;
        }

        this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);

        if (!this._differ) {
          this._differ = this._differs.find(this._renderedItems).create(this.cdkVirtualForTrackBy);
        }

        this._needsUpdate = true;
      }
      /**
       * Swap out one `DataSource` for another.
       * @private
       * @param {?} oldDs
       * @param {?} newDs
       * @return {?}
       */


      _changeDataSource(oldDs, newDs) {
        if (oldDs) {
          oldDs.disconnect(this);
        }

        this._needsUpdate = true;
        return newDs ? newDs.connect(this) : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
      }
      /**
       * Update the `CdkVirtualForOfContext` for all views.
       * @private
       * @return {?}
       */


      _updateContext() {
        /** @type {?} */
        const count = this._data.length;
        /** @type {?} */

        let i = this._viewContainerRef.length;

        while (i--) {
          /** @type {?} */
          let view =
          /** @type {?} */
          this._viewContainerRef.get(i);

          view.context.index = this._renderedRange.start + i;
          view.context.count = count;

          this._updateComputedContextProperties(view.context);

          view.detectChanges();
        }
      }
      /**
       * Apply changes to the DOM.
       * @private
       * @param {?} changes
       * @return {?}
       */


      _applyChanges(changes) {
        // Rearrange the views to put them in the right location.
        changes.forEachOperation(
        /**
        * @param {?} record
        * @param {?} adjustedPreviousIndex
        * @param {?} currentIndex
        * @return {?}
        */
        (record, adjustedPreviousIndex, currentIndex) => {
          if (record.previousIndex == null) {
            // Item added.
            // Item added.

            /** @type {?} */
            const view = this._insertViewForNewItem(
            /** @type {?} */
            currentIndex);

            view.context.$implicit = record.item;
          } else if (currentIndex == null) {
            // Item removed.
            this._cacheView(this._detachView(
            /** @type {?} */
            adjustedPreviousIndex));
          } else {
            // Item moved.
            // Item moved.

            /** @type {?} */
            const view =
            /** @type {?} */
            this._viewContainerRef.get(
            /** @type {?} */
            adjustedPreviousIndex);

            this._viewContainerRef.move(view, currentIndex);

            view.context.$implicit = record.item;
          }
        }); // Update $implicit for any items that had an identity change.

        changes.forEachIdentityChange(
        /**
        * @param {?} record
        * @return {?}
        */
        record => {
          /** @type {?} */
          const view =
          /** @type {?} */
          this._viewContainerRef.get(
          /** @type {?} */
          record.currentIndex);

          view.context.$implicit = record.item;
        }); // Update the context variables on all items.

        /** @type {?} */

        const count = this._data.length;
        /** @type {?} */

        let i = this._viewContainerRef.length;

        while (i--) {
          /** @type {?} */
          const view =
          /** @type {?} */
          this._viewContainerRef.get(i);

          view.context.index = this._renderedRange.start + i;
          view.context.count = count;

          this._updateComputedContextProperties(view.context);
        }
      }
      /**
       * Cache the given detached view.
       * @private
       * @param {?} view
       * @return {?}
       */


      _cacheView(view) {
        if (this._templateCache.length < this.cdkVirtualForTemplateCacheSize) {
          this._templateCache.push(view);
        } else {
          /** @type {?} */
          const index = this._viewContainerRef.indexOf(view); // It's very unlikely that the index will ever be -1, but just in case,
          // destroy the view on its own, otherwise destroy it through the
          // container to ensure that all the references are removed.


          if (index === -1) {
            view.destroy();
          } else {
            this._viewContainerRef.remove(index);
          }
        }
      }
      /**
       * Inserts a view for a new item, either from the cache or by creating a new one.
       * @private
       * @param {?} index
       * @return {?}
       */


      _insertViewForNewItem(index) {
        return this._insertViewFromCache(index) || this._createEmbeddedViewAt(index);
      }
      /**
       * Update the computed properties on the `CdkVirtualForOfContext`.
       * @private
       * @param {?} context
       * @return {?}
       */


      _updateComputedContextProperties(context) {
        context.first = context.index === 0;
        context.last = context.index === context.count - 1;
        context.even = context.index % 2 === 0;
        context.odd = !context.even;
      }
      /**
       * Creates a new embedded view and moves it to the given index
       * @private
       * @param {?} index
       * @return {?}
       */


      _createEmbeddedViewAt(index) {
        // Note that it's important that we insert the item directly at the proper index,
        // rather than inserting it and the moving it in place, because if there's a directive
        // on the same node that injects the `ViewContainerRef`, Angular will insert another
        // comment node which can throw off the move when it's being repeated for all items.
        return this._viewContainerRef.createEmbeddedView(this._template, {
          $implicit:
          /** @type {?} */
          null,
          cdkVirtualForOf: this._cdkVirtualForOf,
          index: -1,
          count: -1,
          first: false,
          last: false,
          odd: false,
          even: false
        }, index);
      }
      /**
       * Inserts a recycled view from the cache at the given index.
       * @private
       * @param {?} index
       * @return {?}
       */


      _insertViewFromCache(index) {
        /** @type {?} */
        const cachedView = this._templateCache.pop();

        if (cachedView) {
          this._viewContainerRef.insert(cachedView, index);
        }

        return cachedView || null;
      }
      /**
       * Detaches the embedded view at the given index.
       * @private
       * @param {?} index
       * @return {?}
       */


      _detachView(index) {
        return (
          /** @type {?} */
          this._viewContainerRef.detach(index)
        );
      }

    }

    CdkVirtualForOf.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[cdkVirtualFor][cdkVirtualForOf]'
      }]
    }];
    /** @nocollapse */

    CdkVirtualForOf.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"]
    }, {
      type: CdkVirtualScrollViewport,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }];

    CdkVirtualForOf.propDecorators = {
      cdkVirtualForOf: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      cdkVirtualForTrackBy: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      cdkVirtualForTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      cdkVirtualForTemplateCacheSize: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class ScrollingModule {}

    ScrollingModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["BidiModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"]],
        exports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["BidiModule"], CdkFixedSizeVirtualScroll, CdkScrollable, CdkVirtualForOf, CdkVirtualScrollViewport],
        declarations: [CdkFixedSizeVirtualScroll, CdkScrollable, CdkVirtualForOf, CdkVirtualScrollViewport]
      }]
    }];
    /**
     * @deprecated ScrollDispatchModule has been renamed to ScrollingModule.
     * \@breaking-change 8.0.0 delete this alias
     */

    class ScrollDispatchModule {}

    ScrollDispatchModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [ScrollingModule],
        exports: [ScrollingModule]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Time in ms to throttle the resize events by default.
     * @type {?}
     */

    const DEFAULT_RESIZE_TIME = 20;
    /**
     * Simple utility for getting the bounds of the browser viewport.
     * \@docs-private
     */

    class ViewportRuler {
      /**
       * @param {?} _platform
       * @param {?} ngZone
       */
      constructor(_platform, ngZone) {
        this._platform = _platform;
        ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          this._change = _platform.isBrowser ? Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'resize'), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'orientationchange')) : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(); // Note that we need to do the subscription inside `runOutsideAngular`
          // since subscribing is what causes the event listener to be added.

          this._invalidateCache = this.change().subscribe(
          /**
          * @return {?}
          */
          () => this._updateViewportSize());
        });
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._invalidateCache.unsubscribe();
      }
      /**
       * Returns the viewport's width and height.
       * @return {?}
       */


      getViewportSize() {
        if (!this._viewportSize) {
          this._updateViewportSize();
        }
        /** @type {?} */


        const output = {
          width: this._viewportSize.width,
          height: this._viewportSize.height
        }; // If we're not on a browser, don't cache the size since it'll be mocked out anyway.

        if (!this._platform.isBrowser) {
          this._viewportSize =
          /** @type {?} */
          null;
        }

        return output;
      }
      /**
       * Gets a ClientRect for the viewport's bounds.
       * @return {?}
       */


      getViewportRect() {
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().

        /** @type {?} */
        const scrollPosition = this.getViewportScrollPosition();
        const {
          width,
          height
        } = this.getViewportSize();
        return {
          top: scrollPosition.top,
          left: scrollPosition.left,
          bottom: scrollPosition.top + height,
          right: scrollPosition.left + width,
          height,
          width
        };
      }
      /**
       * Gets the (top, left) scroll position of the viewport.
       * @return {?}
       */


      getViewportScrollPosition() {
        // While we can get a reference to the fake document
        // during SSR, it doesn't have getBoundingClientRect.
        if (!this._platform.isBrowser) {
          return {
            top: 0,
            left: 0
          };
        } // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.

        /** @type {?} */


        const documentElement =
        /** @type {?} */
        document.documentElement;
        /** @type {?} */

        const documentRect = documentElement.getBoundingClientRect();
        /** @type {?} */

        const top = -documentRect.top || document.body.scrollTop || window.scrollY || documentElement.scrollTop || 0;
        /** @type {?} */

        const left = -documentRect.left || document.body.scrollLeft || window.scrollX || documentElement.scrollLeft || 0;
        return {
          top,
          left
        };
      }
      /**
       * Returns a stream that emits whenever the size of the viewport changes.
       * @param {?=} throttleTime Time in milliseconds to throttle the stream.
       * @return {?}
       */


      change(throttleTime = DEFAULT_RESIZE_TIME) {
        return throttleTime > 0 ? this._change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(throttleTime)) : this._change;
      }
      /**
       * Updates the cached viewport size.
       * @private
       * @return {?}
       */


      _updateViewportSize() {
        this._viewportSize = this._platform.isBrowser ? {
          width: window.innerWidth,
          height: window.innerHeight
        } : {
          width: 0,
          height: 0
        };
      }

    }

    ViewportRuler.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    ViewportRuler.ctorParameters = () => [{
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }];
    /** @nocollapse */


    ViewportRuler.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({
      factory: function ViewportRuler_Factory() {
        return new ViewportRuler(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      },
      token: ViewportRuler,
      providedIn: "root"
    });
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @param {?} parentRuler
     * @param {?} platform
     * @param {?} ngZone
     * @return {?}
     */

    function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, platform, ngZone) {
      return parentRuler || new ViewportRuler(platform, ngZone);
    }
    /**
     * \@docs-private \@deprecated \@breaking-change 8.0.0
     * @type {?}
     */


    const VIEWPORT_RULER_PROVIDER = {
      // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
      provide: ViewportRuler,
      deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ViewportRuler], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]],
      useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=scrolling.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/cdk/esm2015/text-field.js":
  /*!*********************************************************!*\
    !*** ./node_modules/@angular/cdk/esm2015/text-field.js ***!
    \*********************************************************/

  /*! exports provided: AutofillMonitor, CdkAutofill, CdkTextareaAutosize, TextFieldModule */

  /***/
  function node_modulesAngularCdkEsm2015TextFieldJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AutofillMonitor", function () {
      return AutofillMonitor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkAutofill", function () {
      return CdkAutofill;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CdkTextareaAutosize", function () {
      return CdkTextareaAutosize;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TextFieldModule", function () {
      return TextFieldModule;
    });
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Options to pass to the animationstart listener.
     * @type {?}
     */


    const listenerOptions = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["normalizePassiveListenerOptions"])({
      passive: true
    });
    /**
     * An injectable service that can be used to monitor the autofill state of an input.
     * Based on the following blog post:
     * https://medium.com/\@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
     */

    class AutofillMonitor {
      /**
       * @param {?} _platform
       * @param {?} _ngZone
       */
      constructor(_platform, _ngZone) {
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._monitoredElements = new Map();
      }
      /**
       * @param {?} elementOrRef
       * @return {?}
       */


      monitor(elementOrRef) {
        if (!this._platform.isBrowser) {
          return rxjs__WEBPACK_IMPORTED_MODULE_3__["EMPTY"];
        }
        /** @type {?} */


        const element = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceElement"])(elementOrRef);
        /** @type {?} */

        const info = this._monitoredElements.get(element);

        if (info) {
          return info.subject.asObservable();
        }
        /** @type {?} */


        const result = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        /** @type {?} */

        const cssClass = 'cdk-text-field-autofilled';
        /** @type {?} */

        const listener =
        /** @type {?} */

        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          // Animation events fire on initial element render, we check for the presence of the autofill
          // CSS class to make sure this is a real change in state, not just the initial render before
          // we fire off events.
          if (event.animationName === 'cdk-text-field-autofill-start' && !element.classList.contains(cssClass)) {
            element.classList.add(cssClass);

            this._ngZone.run(
            /**
            * @return {?}
            */
            () => result.next({
              target:
              /** @type {?} */
              event.target,
              isAutofilled: true
            }));
          } else if (event.animationName === 'cdk-text-field-autofill-end' && element.classList.contains(cssClass)) {
            element.classList.remove(cssClass);

            this._ngZone.run(
            /**
            * @return {?}
            */
            () => result.next({
              target:
              /** @type {?} */
              event.target,
              isAutofilled: false
            }));
          }
        };

        this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          element.addEventListener('animationstart', listener, listenerOptions);
          element.classList.add('cdk-text-field-autofill-monitored');
        });

        this._monitoredElements.set(element, {
          subject: result,
          unlisten:
          /**
          * @return {?}
          */
          () => {
            element.removeEventListener('animationstart', listener, listenerOptions);
          }
        });

        return result.asObservable();
      }
      /**
       * @param {?} elementOrRef
       * @return {?}
       */


      stopMonitoring(elementOrRef) {
        /** @type {?} */
        const element = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceElement"])(elementOrRef);
        /** @type {?} */

        const info = this._monitoredElements.get(element);

        if (info) {
          info.unlisten();
          info.subject.complete();
          element.classList.remove('cdk-text-field-autofill-monitored');
          element.classList.remove('cdk-text-field-autofilled');

          this._monitoredElements.delete(element);
        }
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._monitoredElements.forEach(
        /**
        * @param {?} _info
        * @param {?} element
        * @return {?}
        */
        (_info, element) => this.stopMonitoring(element));
      }

    }

    AutofillMonitor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    AutofillMonitor.ctorParameters = () => [{
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["Platform"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
    }];
    /** @nocollapse */


    AutofillMonitor.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({
      factory: function AutofillMonitor_Factory() {
        return new AutofillMonitor(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]));
      },
      token: AutofillMonitor,
      providedIn: "root"
    });
    /**
     * A directive that can be used to monitor the autofill state of an input.
     */

    class CdkAutofill {
      /**
       * @param {?} _elementRef
       * @param {?} _autofillMonitor
       */
      constructor(_elementRef, _autofillMonitor) {
        this._elementRef = _elementRef;
        this._autofillMonitor = _autofillMonitor;
        /**
         * Emits when the autofill state of the element changes.
         */

        this.cdkAutofill = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        this._autofillMonitor.monitor(this._elementRef).subscribe(
        /**
        * @param {?} event
        * @return {?}
        */
        event => this.cdkAutofill.emit(event));
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._autofillMonitor.stopMonitoring(this._elementRef);
      }

    }

    CdkAutofill.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
      args: [{
        selector: '[cdkAutofill]'
      }]
    }];
    /** @nocollapse */

    CdkAutofill.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
    }, {
      type: AutofillMonitor
    }];

    CdkAutofill.propDecorators = {
      cdkAutofill: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Directive to automatically resize a textarea to fit its content.
     */

    class CdkTextareaAutosize {
      /**
       * @param {?} _elementRef
       * @param {?} _platform
       * @param {?} _ngZone
       */
      constructor(_elementRef, _platform, _ngZone) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._enabled = true;
        /**
         * Value of minRows as of last resize. If the minRows has decreased, the
         * height of the textarea needs to be recomputed to reflect the new minimum. The maxHeight
         * does not have the same problem because it does not affect the textarea's scrollHeight.
         */

        this._previousMinRows = -1;
        this._textareaElement =
        /** @type {?} */
        this._elementRef.nativeElement;
      }
      /**
       * Minimum amount of rows in the textarea.
       * @return {?}
       */


      get minRows() {
        return this._minRows;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set minRows(value) {
        this._minRows = value;

        this._setMinHeight();
      }
      /**
       * Maximum amount of rows in the textarea.
       * @return {?}
       */


      get maxRows() {
        return this._maxRows;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set maxRows(value) {
        this._maxRows = value;

        this._setMaxHeight();
      }
      /**
       * Whether autosizing is enabled or not
       * @return {?}
       */


      get enabled() {
        return this._enabled;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set enabled(value) {
        value = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value); // Only act if the actual value changed. This specifically helps to not run
        // resizeToFitContent too early (i.e. before ngAfterViewInit)

        if (this._enabled !== value) {
          (this._enabled = value) ? this.resizeToFitContent(true) : this.reset();
        }
      }
      /**
       * Sets the minimum height of the textarea as determined by minRows.
       * @return {?}
       */


      _setMinHeight() {
        /** @type {?} */
        const minHeight = this.minRows && this._cachedLineHeight ? "".concat(this.minRows * this._cachedLineHeight, "px") : null;

        if (minHeight) {
          this._textareaElement.style.minHeight = minHeight;
        }
      }
      /**
       * Sets the maximum height of the textarea as determined by maxRows.
       * @return {?}
       */


      _setMaxHeight() {
        /** @type {?} */
        const maxHeight = this.maxRows && this._cachedLineHeight ? "".concat(this.maxRows * this._cachedLineHeight, "px") : null;

        if (maxHeight) {
          this._textareaElement.style.maxHeight = maxHeight;
        }
      }
      /**
       * @return {?}
       */


      ngAfterViewInit() {
        if (this._platform.isBrowser) {
          // Remember the height which we started with in case autosizing is disabled
          this._initialHeight = this._textareaElement.style.height;
          this.resizeToFitContent();

          this._ngZone.runOutsideAngular(
          /**
          * @return {?}
          */
          () => {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["auditTime"])(16), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._destroyed)).subscribe(
            /**
            * @return {?}
            */
            () => this.resizeToFitContent(true));
          });
        }
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._destroyed.next();

        this._destroyed.complete();
      }
      /**
       * Cache the height of a single-row textarea if it has not already been cached.
       *
       * We need to know how large a single "row" of a textarea is in order to apply minRows and
       * maxRows. For the initial version, we will assume that the height of a single line in the
       * textarea does not ever change.
       * @private
       * @return {?}
       */


      _cacheTextareaLineHeight() {
        if (this._cachedLineHeight) {
          return;
        } // Use a clone element because we have to override some styles.

        /** @type {?} */


        let textareaClone =
        /** @type {?} */
        this._textareaElement.cloneNode(false);

        textareaClone.rows = 1; // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.

        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = ''; // In Firefox it happens that textarea elements are always bigger than the specified amount
        // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
        // As a workaround that removes the extra space for the scrollbar, we can just set overflow
        // to hidden. This ensures that there is no invalid calculation of the line height.
        // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654

        textareaClone.style.overflow = 'hidden';

        /** @type {?} */
        this._textareaElement.parentNode.appendChild(textareaClone);

        this._cachedLineHeight = textareaClone.clientHeight;

        /** @type {?} */
        this._textareaElement.parentNode.removeChild(textareaClone); // Min and max heights have to be re-calculated if the cached line height changes


        this._setMinHeight();

        this._setMaxHeight();
      }
      /**
       * @return {?}
       */


      ngDoCheck() {
        if (this._platform.isBrowser) {
          this.resizeToFitContent();
        }
      }
      /**
       * Resize the textarea to fit its content.
       * @param {?=} force Whether to force a height recalculation. By default the height will be
       *    recalculated only if the value changed since the last call.
       * @return {?}
       */


      resizeToFitContent(force = false) {
        // If autosizing is disabled, just skip everything else
        if (!this._enabled) {
          return;
        }

        this._cacheTextareaLineHeight(); // If we haven't determined the line-height yet, we know we're still hidden and there's no point
        // in checking the height of the textarea.


        if (!this._cachedLineHeight) {
          return;
        }
        /** @type {?} */


        const textarea =
        /** @type {?} */
        this._elementRef.nativeElement;
        /** @type {?} */

        const value = textarea.value; // Only resize if the value or minRows have changed since these calculations can be expensive.

        if (!force && this._minRows === this._previousMinRows && value === this._previousValue) {
          return;
        }
        /** @type {?} */


        const placeholderText = textarea.placeholder; // Reset the textarea height to auto in order to shrink back to its default size.
        // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
        // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
        // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
        // need to be removed temporarily.

        textarea.classList.add('cdk-textarea-autosize-measuring');
        textarea.placeholder = ''; // The cdk-textarea-autosize-measuring class includes a 2px padding to workaround an issue with
        // Chrome, so we account for that extra space here by subtracting 4 (2px top + 2px bottom).

        /** @type {?} */

        const height = textarea.scrollHeight - 4; // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.

        textarea.style.height = "".concat(height, "px");
        textarea.classList.remove('cdk-textarea-autosize-measuring');
        textarea.placeholder = placeholderText;

        this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(
            /**
            * @return {?}
            */
            () => this._scrollToCaretPosition(textarea));
          } else {
            setTimeout(
            /**
            * @return {?}
            */
            () => this._scrollToCaretPosition(textarea));
          }
        });

        this._previousValue = value;
        this._previousMinRows = this._minRows;
      }
      /**
       * Resets the textarea to its original size
       * @return {?}
       */


      reset() {
        // Do not try to change the textarea, if the initialHeight has not been determined yet
        // This might potentially remove styles when reset() is called before ngAfterViewInit
        if (this._initialHeight === undefined) {
          return;
        }

        this._textareaElement.style.height = this._initialHeight;
      }
      /**
       * @return {?}
       */


      _noopInputHandler() {} // no-op handler that ensures we're running change detection on input events.

      /**
       * Scrolls a textarea to the caret position. On Firefox resizing the textarea will
       * prevent it from scrolling to the caret position. We need to re-set the selection
       * in order for it to scroll to the proper position.
       * @private
       * @param {?} textarea
       * @return {?}
       */


      _scrollToCaretPosition(textarea) {
        const {
          selectionStart,
          selectionEnd
        } = textarea; // IE will throw an "Unspecified error" if we try to set the selection range after the
        // element has been removed from the DOM. Assert that the directive hasn't been destroyed
        // between the time we requested the animation frame and when it was executed.
        // Also note that we have to assert that the textarea is focused before we set the
        // selection range. Setting the selection range on a non-focused textarea will cause
        // it to receive focus on IE and Edge.

        if (!this._destroyed.isStopped && document.activeElement === textarea) {
          textarea.setSelectionRange(selectionStart, selectionEnd);
        }
      }

    }

    CdkTextareaAutosize.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
      args: [{
        selector: 'textarea[cdkTextareaAutosize]',
        exportAs: 'cdkTextareaAutosize',
        host: {
          'class': 'cdk-textarea-autosize',
          // Textarea elements that have the directive applied should have a single row by default.
          // Browsers normally show two rows by default and therefore this limits the minRows binding.
          'rows': '1',
          '(input)': '_noopInputHandler()'
        }
      }]
    }];
    /** @nocollapse */

    CdkTextareaAutosize.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["Platform"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
    }];

    CdkTextareaAutosize.propDecorators = {
      minRows: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
        args: ['cdkAutosizeMinRows']
      }],
      maxRows: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
        args: ['cdkAutosizeMaxRows']
      }],
      enabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
        args: ['cdkTextareaAutosize']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class TextFieldModule {}

    TextFieldModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
      args: [{
        declarations: [CdkAutofill, CdkTextareaAutosize],
        imports: [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["PlatformModule"]],
        exports: [CdkAutofill, CdkTextareaAutosize]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=text-field.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/forms/fesm2015/forms.js":
  /*!*******************************************************!*\
    !*** ./node_modules/@angular/forms/fesm2015/forms.js ***!
    \*******************************************************/

  /*! exports provided: ɵangular_packages_forms_forms_d, ɵInternalFormsSharedModule, ɵangular_packages_forms_forms_c, ɵangular_packages_forms_forms_a, ɵangular_packages_forms_forms_b, ɵangular_packages_forms_forms_e, ɵangular_packages_forms_forms_f, ɵangular_packages_forms_forms_g, ɵangular_packages_forms_forms_h, ɵangular_packages_forms_forms_i, ɵangular_packages_forms_forms_j, ɵangular_packages_forms_forms_k, ɵangular_packages_forms_forms_l, ɵangular_packages_forms_forms_z, ɵNgNoValidate, ɵangular_packages_forms_forms_m, ɵangular_packages_forms_forms_n, ɵangular_packages_forms_forms_o, ɵangular_packages_forms_forms_p, ɵangular_packages_forms_forms_q, ɵangular_packages_forms_forms_r, ɵangular_packages_forms_forms_s, ɵangular_packages_forms_forms_t, ɵangular_packages_forms_forms_v, ɵangular_packages_forms_forms_u, ɵangular_packages_forms_forms_w, ɵangular_packages_forms_forms_y, ɵNgSelectMultipleOption, ɵangular_packages_forms_forms_x, ɵangular_packages_forms_forms_bb, ɵangular_packages_forms_forms_bc, ɵangular_packages_forms_forms_be, ɵangular_packages_forms_forms_bd, ɵangular_packages_forms_forms_bf, ɵangular_packages_forms_forms_ba, AbstractControlDirective, AbstractFormGroupDirective, CheckboxControlValueAccessor, ControlContainer, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NgControl, NgControlStatus, NgControlStatusGroup, NgForm, NgFormSelectorWarning, NgModel, NgModelGroup, NumberValueAccessor, RadioControlValueAccessor, RangeValueAccessor, FormControlDirective, FormControlName, FormGroupDirective, FormArrayName, FormGroupName, NgSelectOption, SelectControlValueAccessor, SelectMultipleControlValueAccessor, CheckboxRequiredValidator, EmailValidator, MaxLengthValidator, MinLengthValidator, PatternValidator, RequiredValidator, FormBuilder, AbstractControl, FormArray, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, Validators, VERSION, FormsModule, ReactiveFormsModule */

  /***/
  function node_modulesAngularFormsFesm2015FormsJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_d", function () {
      return ɵInternalFormsSharedModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵInternalFormsSharedModule", function () {
      return ɵInternalFormsSharedModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_c", function () {
      return REACTIVE_DRIVEN_DIRECTIVES;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_a", function () {
      return SHARED_FORM_DIRECTIVES;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_b", function () {
      return TEMPLATE_DRIVEN_DIRECTIVES;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_e", function () {
      return CHECKBOX_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_f", function () {
      return DEFAULT_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_g", function () {
      return AbstractControlStatus;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_h", function () {
      return ngControlStatusHost;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_i", function () {
      return formDirectiveProvider;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_j", function () {
      return NG_FORM_SELECTOR_WARNING;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_k", function () {
      return formControlBinding;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_l", function () {
      return modelGroupProvider;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_z", function () {
      return ɵNgNoValidate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵNgNoValidate", function () {
      return ɵNgNoValidate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_m", function () {
      return NUMBER_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_n", function () {
      return RADIO_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_o", function () {
      return RadioControlRegistry;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_p", function () {
      return RANGE_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_q", function () {
      return NG_MODEL_WITH_FORM_CONTROL_WARNING;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_r", function () {
      return formControlBinding$1;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_s", function () {
      return controlNameBinding;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_t", function () {
      return formDirectiveProvider$1;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_v", function () {
      return formArrayNameProvider;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_u", function () {
      return formGroupNameProvider;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_w", function () {
      return SELECT_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_y", function () {
      return ɵNgSelectMultipleOption;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵNgSelectMultipleOption", function () {
      return ɵNgSelectMultipleOption;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_x", function () {
      return SELECT_MULTIPLE_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_bb", function () {
      return CHECKBOX_REQUIRED_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_bc", function () {
      return EMAIL_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_be", function () {
      return MAX_LENGTH_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_bd", function () {
      return MIN_LENGTH_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_bf", function () {
      return PATTERN_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵangular_packages_forms_forms_ba", function () {
      return REQUIRED_VALIDATOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AbstractControlDirective", function () {
      return AbstractControlDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AbstractFormGroupDirective", function () {
      return AbstractFormGroupDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CheckboxControlValueAccessor", function () {
      return CheckboxControlValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ControlContainer", function () {
      return ControlContainer;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NG_VALUE_ACCESSOR", function () {
      return NG_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "COMPOSITION_BUFFER_MODE", function () {
      return COMPOSITION_BUFFER_MODE;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DefaultValueAccessor", function () {
      return DefaultValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgControl", function () {
      return NgControl;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgControlStatus", function () {
      return NgControlStatus;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgControlStatusGroup", function () {
      return NgControlStatusGroup;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgForm", function () {
      return NgForm;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgFormSelectorWarning", function () {
      return NgFormSelectorWarning;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgModel", function () {
      return NgModel;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgModelGroup", function () {
      return NgModelGroup;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NumberValueAccessor", function () {
      return NumberValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RadioControlValueAccessor", function () {
      return RadioControlValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RangeValueAccessor", function () {
      return RangeValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormControlDirective", function () {
      return FormControlDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormControlName", function () {
      return FormControlName;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormGroupDirective", function () {
      return FormGroupDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormArrayName", function () {
      return FormArrayName;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormGroupName", function () {
      return FormGroupName;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgSelectOption", function () {
      return NgSelectOption;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SelectControlValueAccessor", function () {
      return SelectControlValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SelectMultipleControlValueAccessor", function () {
      return SelectMultipleControlValueAccessor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CheckboxRequiredValidator", function () {
      return CheckboxRequiredValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EmailValidator", function () {
      return EmailValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MaxLengthValidator", function () {
      return MaxLengthValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MinLengthValidator", function () {
      return MinLengthValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PatternValidator", function () {
      return PatternValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequiredValidator", function () {
      return RequiredValidator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormBuilder", function () {
      return FormBuilder;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AbstractControl", function () {
      return AbstractControl;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormArray", function () {
      return FormArray;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormControl", function () {
      return FormControl;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormGroup", function () {
      return FormGroup;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NG_ASYNC_VALIDATORS", function () {
      return NG_ASYNC_VALIDATORS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NG_VALIDATORS", function () {
      return NG_VALIDATORS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Validators", function () {
      return Validators;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VERSION", function () {
      return VERSION;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FormsModule", function () {
      return FormsModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ReactiveFormsModule", function () {
      return ReactiveFormsModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /**
     * @license Angular v8.2.14
     * (c) 2010-2019 Google LLC. https://angular.io/
     * License: MIT
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     * Defines an interface that acts as a bridge between the Angular forms API and a
     * native element in the DOM.
     *
     * Implement this interface to create a custom form control directive
     * that integrates with Angular forms.
     *
     * @see DefaultValueAccessor
     *
     * \@publicApi
     * @record
     */


    function ControlValueAccessor() {}

    if (false) {}
    /**
     * Used to provide a `ControlValueAccessor` for form controls.
     *
     * See `DefaultValueAccessor` for how to implement one.
     *
     * \@publicApi
     * @type {?}
     */


    const NG_VALUE_ACCESSOR = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NgValueAccessor');
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */

    const CHECKBOX_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => CheckboxControlValueAccessor),
      multi: true
    };
    /**
     * \@description
     * A `ControlValueAccessor` for writing a value and listening to changes on a checkbox input
     * element.
     *
     * \@usageNotes
     *
     * ### Using a checkbox with a reactive form.
     *
     * The following example shows how to use a checkbox with a reactive form.
     *
     * ```ts
     * const rememberLoginControl = new FormControl();
     * ```
     *
     * ```
     * <input type="checkbox" [formControl]="rememberLoginControl">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class CheckboxControlValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       */
      constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@description
         * The registered callback function called when a change event occurs on the input element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};
      }
      /**
       * Sets the "checked" property on the input element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'checked', value);
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange = fn;
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }

    }

    CheckboxControlValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
        host: {
          '(change)': 'onChange($event.target.checked)',
          '(blur)': 'onTouched()'
        },
        providers: [CHECKBOX_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    CheckboxControlValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }];

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const DEFAULT_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => DefaultValueAccessor),
      multi: true
    };
    /**
     * We must check whether the agent is Android because composition events
     * behave differently between iOS and Android.
     * @return {?}
     */

    function _isAndroid() {
      /** @type {?} */
      const userAgent = Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])() ? Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["ɵgetDOM"])().getUserAgent() : '';
      return /android (\d+)/.test(userAgent.toLowerCase());
    }
    /**
     * \@description
     * Provide this token to control if form directives buffer IME input until
     * the "compositionend" event occurs.
     * \@publicApi
     * @type {?}
     */


    const COMPOSITION_BUFFER_MODE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('CompositionEventMode');
    /**
     * \@description
     * The default `ControlValueAccessor` for writing a value and listening to changes on input
     * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * \@usageNotes
     *
     * ### Using the default value accessor
     *
     * The following example shows how to use an input element that activates the default value accessor
     * (in this case, a text field).
     *
     * ```ts
     * const firstNameControl = new FormControl();
     * ```
     *
     * ```
     * <input type="text" [formControl]="firstNameControl">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class DefaultValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       * @param {?} _compositionMode
       */
      constructor(_renderer, _elementRef, _compositionMode) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._compositionMode = _compositionMode;
        /**
         * \@description
         * The registered callback function called when an input event occurs on the input element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};
        /**
         * Whether the user is creating a composition string (IME events).
         */


        this._composing = false;

        if (this._compositionMode == null) {
          this._compositionMode = !_isAndroid();
        }
      }
      /**
       * Sets the "value" property on the input element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        /** @type {?} */
        const normalizedValue = value == null ? '' : value;

        this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange = fn;
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _handleInput(value) {
        if (!this._compositionMode || this._compositionMode && !this._composing) {
          this.onChange(value);
        }
      }
      /**
       * \@internal
       * @return {?}
       */


      _compositionStart() {
        this._composing = true;
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _compositionEnd(value) {
        this._composing = false;
        this._compositionMode && this.onChange(value);
      }

    }

    DefaultValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
        // TODO: vsavkin replace the above selector with the one below it once
        // https://github.com/angular/angular/issues/3011 is implemented
        // selector: '[ngModel],[formControl],[formControlName]',
        host: {
          '(input)': '$any(this)._handleInput($event.target.value)',
          '(blur)': 'onTouched()',
          '(compositionstart)': '$any(this)._compositionStart()',
          '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
        },
        providers: [DEFAULT_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    DefaultValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: Boolean,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [COMPOSITION_BUFFER_MODE]
      }]
    }];

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * \@description
     * Base class for control directives.
     *
     * This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.
     *
     * \@publicApi
     * @abstract
     */


    class AbstractControlDirective {
      /**
       * \@description
       * Reports the value of the control if it is present, otherwise null.
       * @return {?}
       */
      get value() {
        return this.control ? this.control.value : null;
      }
      /**
       * \@description
       * Reports whether the control is valid. A control is considered valid if no
       * validation errors exist with the current value.
       * If the control is not present, null is returned.
       * @return {?}
       */


      get valid() {
        return this.control ? this.control.valid : null;
      }
      /**
       * \@description
       * Reports whether the control is invalid, meaning that an error exists in the input value.
       * If the control is not present, null is returned.
       * @return {?}
       */


      get invalid() {
        return this.control ? this.control.invalid : null;
      }
      /**
       * \@description
       * Reports whether a control is pending, meaning that that async validation is occurring and
       * errors are not yet available for the input value. If the control is not present, null is
       * returned.
       * @return {?}
       */


      get pending() {
        return this.control ? this.control.pending : null;
      }
      /**
       * \@description
       * Reports whether the control is disabled, meaning that the control is disabled
       * in the UI and is exempt from validation checks and excluded from aggregate
       * values of ancestor controls. If the control is not present, null is returned.
       * @return {?}
       */


      get disabled() {
        return this.control ? this.control.disabled : null;
      }
      /**
       * \@description
       * Reports whether the control is enabled, meaning that the control is included in ancestor
       * calculations of validity or value. If the control is not present, null is returned.
       * @return {?}
       */


      get enabled() {
        return this.control ? this.control.enabled : null;
      }
      /**
       * \@description
       * Reports the control's validation errors. If the control is not present, null is returned.
       * @return {?}
       */


      get errors() {
        return this.control ? this.control.errors : null;
      }
      /**
       * \@description
       * Reports whether the control is pristine, meaning that the user has not yet changed
       * the value in the UI. If the control is not present, null is returned.
       * @return {?}
       */


      get pristine() {
        return this.control ? this.control.pristine : null;
      }
      /**
       * \@description
       * Reports whether the control is dirty, meaning that the user has changed
       * the value in the UI. If the control is not present, null is returned.
       * @return {?}
       */


      get dirty() {
        return this.control ? this.control.dirty : null;
      }
      /**
       * \@description
       * Reports whether the control is touched, meaning that the user has triggered
       * a `blur` event on it. If the control is not present, null is returned.
       * @return {?}
       */


      get touched() {
        return this.control ? this.control.touched : null;
      }
      /**
       * \@description
       * Reports the validation status of the control. Possible values include:
       * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
       * If the control is not present, null is returned.
       * @return {?}
       */


      get status() {
        return this.control ? this.control.status : null;
      }
      /**
       * \@description
       * Reports whether the control is untouched, meaning that the user has not yet triggered
       * a `blur` event on it. If the control is not present, null is returned.
       * @return {?}
       */


      get untouched() {
        return this.control ? this.control.untouched : null;
      }
      /**
       * \@description
       * Returns a multicasting observable that emits a validation status whenever it is
       * calculated for the control. If the control is not present, null is returned.
       * @return {?}
       */


      get statusChanges() {
        return this.control ? this.control.statusChanges : null;
      }
      /**
       * \@description
       * Returns a multicasting observable of value changes for the control that emits every time the
       * value of the control changes in the UI or programmatically.
       * If the control is not present, null is returned.
       * @return {?}
       */


      get valueChanges() {
        return this.control ? this.control.valueChanges : null;
      }
      /**
       * \@description
       * Returns an array that represents the path from the top-level form to this control.
       * Each index is the string name of the control on that level.
       * @return {?}
       */


      get path() {
        return null;
      }
      /**
       * \@description
       * Resets the control with the provided value if the control is present.
       * @param {?=} value
       * @return {?}
       */


      reset(value = undefined) {
        if (this.control) this.control.reset(value);
      }
      /**
       * \@description
       * Reports whether the control with the given path has the error specified.
       *
       * \@usageNotes
       * For example, for the following `FormGroup`:
       *
       * ```
       * form = new FormGroup({
       *   address: new FormGroup({ street: new FormControl() })
       * });
       * ```
       *
       * The path to the 'street' control from the root form would be 'address' -> 'street'.
       *
       * It can be provided to this method in one of two formats:
       *
       * 1. An array of string control names, e.g. `['address', 'street']`
       * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
       *
       * If no path is given, this method checks for the error on the current control.
       *
       * @param {?} errorCode The code of the error to check
       * @param {?=} path A list of control names that designates how to move from the current control
       * to the control that should be queried for errors.
       *
       * @return {?} whether the given error is present in the control at the given path.
       *
       * If the control is not present, false is returned.
       */


      hasError(errorCode, path) {
        return this.control ? this.control.hasError(errorCode, path) : false;
      }
      /**
       * \@description
       * Reports error data for the control with the given path.
       *
       * \@usageNotes
       * For example, for the following `FormGroup`:
       *
       * ```
       * form = new FormGroup({
       *   address: new FormGroup({ street: new FormControl() })
       * });
       * ```
       *
       * The path to the 'street' control from the root form would be 'address' -> 'street'.
       *
       * It can be provided to this method in one of two formats:
       *
       * 1. An array of string control names, e.g. `['address', 'street']`
       * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
       *
       * @param {?} errorCode The code of the error to check
       * @param {?=} path A list of control names that designates how to move from the current control
       * to the control that should be queried for errors.
       *
       * @return {?} error data for that particular error. If the control or error is not present,
       * null is returned.
       */


      getError(errorCode, path) {
        return this.control ? this.control.getError(errorCode, path) : null;
      }

    }

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     * A base class for directives that contain multiple registered instances of `NgControl`.
     * Only used by the forms module.
     *
     * \@publicApi
     * @abstract
     */


    class ControlContainer extends AbstractControlDirective {
      /**
       * \@description
       * The top-level form directive for the control.
       * @return {?}
       */
      get formDirective() {
        return null;
      }
      /**
       * \@description
       * The path to this group.
       * @return {?}
       */


      get path() {
        return null;
      }

    }

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @return {?}
     */


    function unimplemented() {
      throw new Error('unimplemented');
    }
    /**
     * \@description
     * A base class that all control `FormControl`-based directives extend. It binds a `FormControl`
     * object to a DOM element.
     *
     * \@publicApi
     * @abstract
     */


    class NgControl extends AbstractControlDirective {
      constructor() {
        super(...arguments);
        /**
         * \@description
         * The parent form for the control.
         *
         * \@internal
         */

        this._parent = null;
        /**
         * \@description
         * The name for the control
         */

        this.name = null;
        /**
         * \@description
         * The value accessor for the control
         */

        this.valueAccessor = null;
        /**
         * \@description
         * The uncomposed array of synchronous validators for the control
         *
         * \@internal
         */

        this._rawValidators = [];
        /**
         * \@description
         * The uncomposed array of async validators for the control
         *
         * \@internal
         */

        this._rawAsyncValidators = [];
      }
      /**
       * \@description
       * The registered synchronous validator function for the control
       *
       * @throws An exception that this method is not implemented
       * @return {?}
       */


      get validator() {
        return (
          /** @type {?} */
          unimplemented()
        );
      }
      /**
       * \@description
       * The registered async validator function for the control
       *
       * @throws An exception that this method is not implemented
       * @return {?}
       */


      get asyncValidator() {
        return (
          /** @type {?} */
          unimplemented()
        );
      }

    }

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    class AbstractControlStatus {
      /**
       * @param {?} cd
       */
      constructor(cd) {
        this._cd = cd;
      }
      /**
       * @return {?}
       */


      get ngClassUntouched() {
        return this._cd.control ? this._cd.control.untouched : false;
      }
      /**
       * @return {?}
       */


      get ngClassTouched() {
        return this._cd.control ? this._cd.control.touched : false;
      }
      /**
       * @return {?}
       */


      get ngClassPristine() {
        return this._cd.control ? this._cd.control.pristine : false;
      }
      /**
       * @return {?}
       */


      get ngClassDirty() {
        return this._cd.control ? this._cd.control.dirty : false;
      }
      /**
       * @return {?}
       */


      get ngClassValid() {
        return this._cd.control ? this._cd.control.valid : false;
      }
      /**
       * @return {?}
       */


      get ngClassInvalid() {
        return this._cd.control ? this._cd.control.invalid : false;
      }
      /**
       * @return {?}
       */


      get ngClassPending() {
        return this._cd.control ? this._cd.control.pending : false;
      }

    }

    if (false) {}
    /** @type {?} */


    const ngControlStatusHost = {
      '[class.ng-untouched]': 'ngClassUntouched',
      '[class.ng-touched]': 'ngClassTouched',
      '[class.ng-pristine]': 'ngClassPristine',
      '[class.ng-dirty]': 'ngClassDirty',
      '[class.ng-valid]': 'ngClassValid',
      '[class.ng-invalid]': 'ngClassInvalid',
      '[class.ng-pending]': 'ngClassPending'
    };
    /**
     * \@description
     * Directive automatically applied to Angular form controls that sets CSS classes
     * based on control status.
     *
     * \@usageNotes
     *
     * ### CSS classes applied
     *
     * The following classes are applied as the properties become true:
     *
     * * ng-valid
     * * ng-invalid
     * * ng-pending
     * * ng-pristine
     * * ng-dirty
     * * ng-untouched
     * * ng-touched
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NgControlStatus extends AbstractControlStatus {
      /**
       * @param {?} cd
       */
      constructor(cd) {
        super(cd);
      }

    }

    NgControlStatus.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formControlName],[ngModel],[formControl]',
        host: ngControlStatusHost
      }]
    }];
    /** @nocollapse */

    NgControlStatus.ctorParameters = () => [{
      type: NgControl,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }]
    }];
    /**
     * \@description
     * Directive automatically applied to Angular form groups that sets CSS classes
     * based on control status (valid/invalid/dirty/etc).
     *
     * @see `NgControlStatus`
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class NgControlStatusGroup extends AbstractControlStatus {
      /**
       * @param {?} cd
       */
      constructor(cd) {
        super(cd);
      }

    }

    NgControlStatusGroup.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
        host: ngControlStatusHost
      }]
    }];
    /** @nocollapse */

    NgControlStatusGroup.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} value
     * @return {?}
     */


    function isEmptyInputValue(value) {
      // we don't check for string here so it also works with arrays
      return value == null || value.length === 0;
    }
    /**
     * \@description
     * An `InjectionToken` for registering additional synchronous validators used with `AbstractControl`s.
     *
     * @see `NG_ASYNC_VALIDATORS`
     *
     * \@usageNotes
     *
     * ### Providing a custom validator
     *
     * The following example registers a custom validator directive. Adding the validator to the
     * existing collection of validators requires the `multi: true` option.
     *
     * ```typescript
     * \@Directive({
     *   selector: '[customValidator]',
     *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
     * })
     * class CustomValidatorDirective implements Validator {
     *   validate(control: AbstractControl): ValidationErrors | null {
     *     return { 'custom': true };
     *   }
     * }
     * ```
     *
     * \@publicApi
     * @type {?}
     */


    const NG_VALIDATORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NgValidators');
    /**
     * \@description
     * An `InjectionToken` for registering additional asynchronous validators used with `AbstractControl`s.
     *
     * @see `NG_VALIDATORS`
     *
     * \@publicApi
     * @type {?}
     */

    const NG_ASYNC_VALIDATORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NgAsyncValidators');
    /**
     * A regular expression that matches valid e-mail addresses.
     *
     * At a high level, this regexp matches e-mail addresses of the format `local-part\@tld`, where:
     * - `local-part` consists of one or more of the allowed characters (alphanumeric and some
     *   punctuation symbols).
     * - `local-part` cannot begin or end with a period (`.`).
     * - `local-part` cannot be longer than 64 characters.
     * - `tld` consists of one or more `labels` separated by periods (`.`). For example `localhost` or
     *   `foo.com`.
     * - A `label` consists of one or more of the allowed characters (alphanumeric, dashes (`-`) and
     *   periods (`.`)).
     * - A `label` cannot begin or end with a dash (`-`) or a period (`.`).
     * - A `label` cannot be longer than 63 characters.
     * - The whole address cannot be longer than 254 characters.
     *
     * ## Implementation background
     *
     * This regexp was ported over from AngularJS (see there for git history):
     * https://github.com/angular/angular.js/blob/c133ef836/src/ng/directive/input.js#L27
     * It is based on the
     * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
     * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
     * lengths of different parts of the address). The main differences from the WHATWG version are:
     *   - Disallow `local-part` to begin or end with a period (`.`).
     *   - Disallow `local-part` length to exceed 64 characters.
     *   - Disallow total address length to exceed 254 characters.
     *
     * See [this commit](https://github.com/angular/angular.js/commit/f3f5cf72e) for more details.
     * @type {?}
     */

    const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    /**
     * \@description
     * Provides a set of built-in validators that can be used by form controls.
     *
     * A validator is a function that processes a `FormControl` or collection of
     * controls and returns an error map or null. A null map means that validation has passed.
     *
     * @see [Form Validation](/guide/form-validation)
     *
     * \@publicApi
     */

    class Validators {
      /**
       * \@description
       * Validator that requires the control's value to be greater than or equal to the provided number.
       * The validator exists only as a function and not as a directive.
       *
       * \@usageNotes
       *
       * ### Validate against a minimum of 3
       *
       * ```typescript
       * const control = new FormControl(2, Validators.min(3));
       *
       * console.log(control.errors); // {min: {min: 3, actual: 2}}
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} min
       * @return {?} A validator function that returns an error map with the
       * `min` property if the validation check fails, otherwise `null`.
       *
       */
      static min(min) {
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          control => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
              return null; // don't validate empty values to allow optional controls
            }
            /** @type {?} */


            const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min

            return !isNaN(value) && value < min ? {
              'min': {
                'min': min,
                'actual': control.value
              }
            } : null;
          }
        );
      }
      /**
       * \@description
       * Validator that requires the control's value to be less than or equal to the provided number.
       * The validator exists only as a function and not as a directive.
       *
       * \@usageNotes
       *
       * ### Validate against a maximum of 15
       *
       * ```typescript
       * const control = new FormControl(16, Validators.max(15));
       *
       * console.log(control.errors); // {max: {max: 15, actual: 16}}
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} max
       * @return {?} A validator function that returns an error map with the
       * `max` property if the validation check fails, otherwise `null`.
       *
       */


      static max(max) {
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          control => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
              return null; // don't validate empty values to allow optional controls
            }
            /** @type {?} */


            const value = parseFloat(control.value); // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max

            return !isNaN(value) && value > max ? {
              'max': {
                'max': max,
                'actual': control.value
              }
            } : null;
          }
        );
      }
      /**
       * \@description
       * Validator that requires the control have a non-empty value.
       *
       * \@usageNotes
       *
       * ### Validate that the field is non-empty
       *
       * ```typescript
       * const control = new FormControl('', Validators.required);
       *
       * console.log(control.errors); // {required: true}
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} control
       * @return {?} An error map with the `required` property
       * if the validation check fails, otherwise `null`.
       *
       */


      static required(control) {
        return isEmptyInputValue(control.value) ? {
          'required': true
        } : null;
      }
      /**
       * \@description
       * Validator that requires the control's value be true. This validator is commonly
       * used for required checkboxes.
       *
       * \@usageNotes
       *
       * ### Validate that the field value is true
       *
       * ```typescript
       * const control = new FormControl('', Validators.requiredTrue);
       *
       * console.log(control.errors); // {required: true}
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} control
       * @return {?} An error map that contains the `required` property
       * set to `true` if the validation check fails, otherwise `null`.
       *
       */


      static requiredTrue(control) {
        return control.value === true ? null : {
          'required': true
        };
      }
      /**
       * \@description
       * Validator that requires the control's value pass an email validation test.
       *
       * Tests the value using a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
       * pattern suitable for common usecases. The pattern is based on the definition of a valid email
       * address in the [WHATWG HTML specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address)
       * with some enhancements to incorporate more RFC rules (such as rules related to domain names and
       * the lengths of different parts of the address).
       *
       * The differences from the WHATWG version include:
       * - Disallow `local-part` (the part before the `\@` symbol) to begin or end with a period (`.`).
       * - Disallow `local-part` to be longer than 64 characters.
       * - Disallow the whole address to be longer than 254 characters.
       *
       * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
       * validate the value against a different pattern.
       *
       * \@usageNotes
       *
       * ### Validate that the field matches a valid email pattern
       *
       * ```typescript
       * const control = new FormControl('bad\@', Validators.email);
       *
       * console.log(control.errors); // {email: true}
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} control
       * @return {?} An error map with the `email` property
       * if the validation check fails, otherwise `null`.
       *
       */


      static email(control) {
        if (isEmptyInputValue(control.value)) {
          return null; // don't validate empty values to allow optional controls
        }

        return EMAIL_REGEXP.test(control.value) ? null : {
          'email': true
        };
      }
      /**
       * \@description
       * Validator that requires the length of the control's value to be greater than or equal
       * to the provided minimum length. This validator is also provided by default if you use the
       * the HTML5 `minlength` attribute.
       *
       * \@usageNotes
       *
       * ### Validate that the field has a minimum of 3 characters
       *
       * ```typescript
       * const control = new FormControl('ng', Validators.minLength(3));
       *
       * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
       * ```
       *
       * ```html
       * <input minlength="5">
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} minLength
       * @return {?} A validator function that returns an error map with the
       * `minlength` if the validation check fails, otherwise `null`.
       *
       */


      static minLength(minLength) {
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          control => {
            if (isEmptyInputValue(control.value)) {
              return null; // don't validate empty values to allow optional controls
            }
            /** @type {?} */


            const length = control.value ? control.value.length : 0;
            return length < minLength ? {
              'minlength': {
                'requiredLength': minLength,
                'actualLength': length
              }
            } : null;
          }
        );
      }
      /**
       * \@description
       * Validator that requires the length of the control's value to be less than or equal
       * to the provided maximum length. This validator is also provided by default if you use the
       * the HTML5 `maxlength` attribute.
       *
       * \@usageNotes
       *
       * ### Validate that the field has maximum of 5 characters
       *
       * ```typescript
       * const control = new FormControl('Angular', Validators.maxLength(5));
       *
       * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
       * ```
       *
       * ```html
       * <input maxlength="5">
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} maxLength
       * @return {?} A validator function that returns an error map with the
       * `maxlength` property if the validation check fails, otherwise `null`.
       *
       */


      static maxLength(maxLength) {
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          control => {
            /** @type {?} */
            const length = control.value ? control.value.length : 0;
            return length > maxLength ? {
              'maxlength': {
                'requiredLength': maxLength,
                'actualLength': length
              }
            } : null;
          }
        );
      }
      /**
       * \@description
       * Validator that requires the control's value to match a regex pattern. This validator is also
       * provided by default if you use the HTML5 `pattern` attribute.
       *
       * \@usageNotes
       *
       * ### Validate that the field only contains letters or spaces
       *
       * ```typescript
       * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
       *
       * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
       * ```
       *
       * ```html
       * <input pattern="[a-zA-Z ]*">
       * ```
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} pattern A regular expression to be used as is to test the values, or a string.
       * If a string is passed, the `^` character is prepended and the `$` character is
       * appended to the provided string (if not already present), and the resulting regular
       * expression is used to test the values.
       *
       * @return {?} A validator function that returns an error map with the
       * `pattern` property if the validation check fails, otherwise `null`.
       *
       */


      static pattern(pattern) {
        if (!pattern) return Validators.nullValidator;
        /** @type {?} */

        let regex;
        /** @type {?} */

        let regexStr;

        if (typeof pattern === 'string') {
          regexStr = '';
          if (pattern.charAt(0) !== '^') regexStr += '^';
          regexStr += pattern;
          if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
          regex = new RegExp(regexStr);
        } else {
          regexStr = pattern.toString();
          regex = pattern;
        }

        return (
          /**
          * @param {?} control
          * @return {?}
          */
          control => {
            if (isEmptyInputValue(control.value)) {
              return null; // don't validate empty values to allow optional controls
            }
            /** @type {?} */


            const value = control.value;
            return regex.test(value) ? null : {
              'pattern': {
                'requiredPattern': regexStr,
                'actualValue': value
              }
            };
          }
        );
      }
      /**
       * \@description
       * Validator that performs no operation.
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} control
       * @return {?}
       */


      static nullValidator(control) {
        return null;
      }
      /**
       * @param {?} validators
       * @return {?}
       */


      static compose(validators) {
        if (!validators) return null;
        /** @type {?} */

        const presentValidators =
        /** @type {?} */
        validators.filter(isPresent);
        if (presentValidators.length == 0) return null;
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          function (control) {
            return _mergeErrors(_executeValidators(control, presentValidators));
          }
        );
      }
      /**
       * \@description
       * Compose multiple async validators into a single function that returns the union
       * of the individual error objects for the provided control.
       *
       * @see `updateValueAndValidity()`
       *
       * @param {?} validators
       * @return {?} A validator function that returns an error map with the
       * merged error objects of the async validators if the validation check fails, otherwise `null`.
       *
       */


      static composeAsync(validators) {
        if (!validators) return null;
        /** @type {?} */

        const presentValidators =
        /** @type {?} */
        validators.filter(isPresent);
        if (presentValidators.length == 0) return null;
        return (
          /**
          * @param {?} control
          * @return {?}
          */
          function (control) {
            /** @type {?} */
            const observables = _executeAsyncValidators(control, presentValidators).map(toObservable);

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(_mergeErrors));
          }
        );
      }

    }
    /**
     * @param {?} o
     * @return {?}
     */


    function isPresent(o) {
      return o != null;
    }
    /**
     * @param {?} r
     * @return {?}
     */


    function toObservable(r) {
      /** @type {?} */
      const obs = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisPromise"])(r) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(r) : r;

      if (!Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisObservable"])(obs)) {
        throw new Error("Expected validator to return Promise or Observable.");
      }

      return obs;
    }
    /**
     * @param {?} control
     * @param {?} validators
     * @return {?}
     */


    function _executeValidators(control, validators) {
      return validators.map(
      /**
      * @param {?} v
      * @return {?}
      */
      v => v(control));
    }
    /**
     * @param {?} control
     * @param {?} validators
     * @return {?}
     */


    function _executeAsyncValidators(control, validators) {
      return validators.map(
      /**
      * @param {?} v
      * @return {?}
      */
      v => v(control));
    }
    /**
     * @param {?} arrayOfErrors
     * @return {?}
     */


    function _mergeErrors(arrayOfErrors) {
      /** @type {?} */
      const res = arrayOfErrors.reduce(
      /**
      * @param {?} res
      * @param {?} errors
      * @return {?}
      */
      (res, errors) => {
        return errors != null ? Object.assign({},
        /** @type {?} */
        res, errors) :
        /** @type {?} */
        res;
      }, {});
      return Object.keys(res).length === 0 ? null : res;
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @param {?} validator
     * @return {?}
     */


    function normalizeValidator(validator) {
      if (
      /** @type {?} */
      validator.validate) {
        return (
          /**
          * @param {?} c
          * @return {?}
          */
          c =>
          /** @type {?} */
          validator.validate(c)
        );
      } else {
        return (
          /** @type {?} */
          validator
        );
      }
    }
    /**
     * @param {?} validator
     * @return {?}
     */


    function normalizeAsyncValidator(validator) {
      if (
      /** @type {?} */
      validator.validate) {
        return (
          /**
          * @param {?} c
          * @return {?}
          */
          c =>
          /** @type {?} */
          validator.validate(c)
        );
      } else {
        return (
          /** @type {?} */
          validator
        );
      }
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const NUMBER_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => NumberValueAccessor),
      multi: true
    };
    /**
     * \@description
     * The `ControlValueAccessor` for writing a number value and listening to number input changes.
     * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
     * directives.
     *
     * \@usageNotes
     *
     * ### Using a number input with a reactive form.
     *
     * The following example shows how to use a number input with a reactive form.
     *
     * ```ts
     * const totalCountControl = new FormControl();
     * ```
     *
     * ```
     * <input type="number" [formControl]="totalCountControl">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NumberValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       */
      constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@description
         * The registered callback function called when a change or input event occurs on the input
         * element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};
      }
      /**
       * Sets the "value" property on the input element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        // The value needs to be normalized for IE9, otherwise it is set to 'null' when null

        /** @type {?} */
        const normalizedValue = value == null ? '' : value;

        this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange =
        /**
        * @param {?} value
        * @return {?}
        */
        value => {
          fn(value == '' ? null : parseFloat(value));
        };
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }

    }

    NumberValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(input)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        providers: [NUMBER_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    NumberValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }];

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const RADIO_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => RadioControlValueAccessor),
      multi: true
    };
    /**
     * \@description
     * Class used by Angular to track radio buttons. For internal use only.
     */

    class RadioControlRegistry {
      constructor() {
        this._accessors = [];
      }
      /**
       * \@description
       * Adds a control to the internal registry. For internal use only.
       * @param {?} control
       * @param {?} accessor
       * @return {?}
       */


      add(control, accessor) {
        this._accessors.push([control, accessor]);
      }
      /**
       * \@description
       * Removes a control from the internal registry. For internal use only.
       * @param {?} accessor
       * @return {?}
       */


      remove(accessor) {
        for (let i = this._accessors.length - 1; i >= 0; --i) {
          if (this._accessors[i][1] === accessor) {
            this._accessors.splice(i, 1);

            return;
          }
        }
      }
      /**
       * \@description
       * Selects a radio button. For internal use only.
       * @param {?} accessor
       * @return {?}
       */


      select(accessor) {
        this._accessors.forEach(
        /**
        * @param {?} c
        * @return {?}
        */
        c => {
          if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
            c[1].fireUncheck(accessor.value);
          }
        });
      }
      /**
       * @private
       * @param {?} controlPair
       * @param {?} accessor
       * @return {?}
       */


      _isSameGroup(controlPair, accessor) {
        if (!controlPair[0].control) return false;
        return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
      }

    }

    RadioControlRegistry.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];

    if (false) {}
    /**
     * \@description
     * The `ControlValueAccessor` for writing radio control values and listening to radio control
     * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * \@usageNotes
     *
     * ### Using radio buttons with reactive form directives
     *
     * The follow example shows how to use radio buttons in a reactive form. When using radio buttons in
     * a reactive form, radio buttons in the same group should have the same `formControlName`.
     * Providing a `name` attribute is optional.
     *
     * {\@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class RadioControlValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       * @param {?} _registry
       * @param {?} _injector
       */
      constructor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        /**
         * \@description
         * The registered callback function called when a change event occurs on the input element.
         */

        this.onChange =
        /**
        * @return {?}
        */
        () => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};
      }
      /**
       * \@description
       * A lifecycle method called when the directive is initialized. For internal use only.
       * @return {?}
       */


      ngOnInit() {
        this._control = this._injector.get(NgControl);

        this._checkName();

        this._registry.add(this._control, this);
      }
      /**
       * \@description
       * Lifecycle method called before the directive's instance is destroyed. For internal use only.
       * @return {?}
       */


      ngOnDestroy() {
        this._registry.remove(this);
      }
      /**
       * \@description
       * Sets the "checked" property value on the radio input element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        this._state = value === this.value;

        this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this._state);
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this._fn = fn;

        this.onChange =
        /**
        * @return {?}
        */
        () => {
          fn(this.value);

          this._registry.select(this);
        };
      }
      /**
       * Sets the "value" on the radio input element and unchecks it.
       *
       * @param {?} value
       * @return {?}
       */


      fireUncheck(value) {
        this.writeValue(value);
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }
      /**
       * @private
       * @return {?}
       */


      _checkName() {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
          this._throwNameError();
        }

        if (!this.name && this.formControlName) this.name = this.formControlName;
      }
      /**
       * @private
       * @return {?}
       */


      _throwNameError() {
        throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
      }

    }

    RadioControlValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
        host: {
          '(change)': 'onChange()',
          '(blur)': 'onTouched()'
        },
        providers: [RADIO_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    RadioControlValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: RadioControlRegistry
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]
    }];

    RadioControlValueAccessor.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      formControlName: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const RANGE_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => RangeValueAccessor),
      multi: true
    };
    /**
     * \@description
     * The `ControlValueAccessor` for writing a range value and listening to range input changes.
     * The value accessor is used by the `FormControlDirective`, `FormControlName`, and  `NgModel`
     * directives.
     *
     * \@usageNotes
     *
     * ### Using a range input with a reactive form
     *
     * The following example shows how to use a range input with a reactive form.
     *
     * ```ts
     * const ageControl = new FormControl();
     * ```
     *
     * ```
     * <input type="range" [formControl]="ageControl">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class RangeValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       */
      constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@description
         * The registered callback function called when a change or input event occurs on the input
         * element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};
      }
      /**
       * Sets the "value" property on the input element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange =
        /**
        * @param {?} value
        * @return {?}
        */
        value => {
          fn(value == '' ? null : parseFloat(value));
        };
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the range input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }

    }

    RangeValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(input)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        providers: [RANGE_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    RangeValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }];

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /** @type {?} */


    const FormErrorExamples = {
      formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
      formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
      formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; index as i\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
      ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
      ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class ReactiveErrors {
      /**
       * @return {?}
       */
      static controlParentException() {
        throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ".concat(FormErrorExamples.formControlName));
      }
      /**
       * @return {?}
       */


      static ngModelGroupException() {
        throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ".concat(FormErrorExamples.formGroupName, "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ").concat(FormErrorExamples.ngModelGroup));
      }
      /**
       * @return {?}
       */


      static missingFormException() {
        throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ".concat(FormErrorExamples.formControlName));
      }
      /**
       * @return {?}
       */


      static groupParentException() {
        throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ".concat(FormErrorExamples.formGroupName));
      }
      /**
       * @return {?}
       */


      static arrayParentException() {
        throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        ".concat(FormErrorExamples.formArrayName));
      }
      /**
       * @return {?}
       */


      static disabledAttrWarning() {
        console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
      }
      /**
       * @param {?} directiveName
       * @return {?}
       */


      static ngModelWarning(directiveName) {
        console.warn("\n    It looks like you're using ngModel on the same form field as ".concat(directiveName, ". \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/").concat(directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName', "#use-with-ngmodel\n    "));
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const SELECT_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => SelectControlValueAccessor),
      multi: true
    };
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */

    function _buildValueString(id, value) {
      if (id == null) return "".concat(value);
      if (value && typeof value === 'object') value = 'Object';
      return "".concat(id, ": ").concat(value).slice(0, 50);
    }
    /**
     * @param {?} valueString
     * @return {?}
     */


    function _extractId(valueString) {
      return valueString.split(':')[0];
    }
    /**
     * \@description
     * The `ControlValueAccessor` for writing select control values and listening to select control
     * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
     * `NgModel` directives.
     *
     * \@usageNotes
     *
     * ### Using select controls in a reactive form
     *
     * The following examples show how to use a select control in a reactive form.
     *
     * {\@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
     *
     * ### Using select controls in a template-driven form
     *
     * To use a select in a template-driven form, simply add an `ngModel` and a `name`
     * attribute to the main `<select>` tag.
     *
     * {\@example forms/ts/selectControl/select_control_example.ts region='Component'}
     *
     * ### Customizing option selection
     *
     * Angular uses object identity to select option. It's possible for the identities of items
     * to change while the data does not. This can happen, for example, if the items are produced
     * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
     * second response will produce objects with different identities.
     *
     * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
     * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
     * If `compareWith` is given, Angular selects option by the return value of the function.
     *
     * ```ts
     * const selectedCountriesControl = new FormControl();
     * ```
     *
     * ```
     * <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
     *     <option *ngFor="let country of countries" [ngValue]="country">
     *         {{country.name}}
     *     </option>
     * </select>
     *
     * compareFn(c1: Country, c2: Country): boolean {
     *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
     * }
     * ```
     *
     * **Note:** We listen to the 'change' event because 'input' events aren't fired
     * for selects in Firefox and IE:
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class SelectControlValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       */
      constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@internal
         */

        this._optionMap = new Map();
        /**
         * \@internal
         */

        this._idCounter = 0;
        /**
         * \@description
         * The registered callback function called when a change event occurs on the input element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};

        this._compareWith = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵlooseIdentical"];
      }
      /**
       * \@description
       * Tracks the option comparison algorithm for tracking identities when
       * checking for changes.
       * @param {?} fn
       * @return {?}
       */


      set compareWith(fn) {
        if (typeof fn !== 'function') {
          throw new Error("compareWith must be a function, but received ".concat(JSON.stringify(fn)));
        }

        this._compareWith = fn;
      }
      /**
       * Sets the "value" property on the input element. The "selectedIndex"
       * property is also set if an ID is provided on the option element.
       *
       * @param {?} value The checked value
       * @return {?}
       */


      writeValue(value) {
        this.value = value;
        /** @type {?} */

        const id = this._getOptionId(value);

        if (id == null) {
          this._renderer.setProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
        }
        /** @type {?} */


        const valueString = _buildValueString(id, value);

        this._renderer.setProperty(this._elementRef.nativeElement, 'value', valueString);
      }
      /**
       * \@description
       * Registers a function called when the control value changes.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange =
        /**
        * @param {?} valueString
        * @return {?}
        */
        valueString => {
          this.value = this._getOptionValue(valueString);
          fn(this.value);
        };
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the select input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }
      /**
       * \@internal
       * @return {?}
       */


      _registerOption() {
        return (this._idCounter++).toString();
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _getOptionId(value) {
        for (const id of Array.from(this._optionMap.keys())) {
          if (this._compareWith(this._optionMap.get(id), value)) return id;
        }

        return null;
      }
      /**
       * \@internal
       * @param {?} valueString
       * @return {?}
       */


      _getOptionValue(valueString) {
        /** @type {?} */
        const id = _extractId(valueString);

        return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
      }

    }

    SelectControlValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        providers: [SELECT_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    SelectControlValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }];

    SelectControlValueAccessor.propDecorators = {
      compareWith: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * \@description
     * Marks `<option>` as dynamic, so Angular can be notified when options change.
     *
     * @see `SelectControlValueAccessor`
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class NgSelectOption {
      /**
       * @param {?} _element
       * @param {?} _renderer
       * @param {?} _select
       */
      constructor(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (this._select) this.id = this._select._registerOption();
      }
      /**
       * \@description
       * Tracks the value bound to the option element. Unlike the value binding,
       * ngValue supports binding to objects.
       * @param {?} value
       * @return {?}
       */


      set ngValue(value) {
        if (this._select == null) return;

        this._select._optionMap.set(this.id, value);

        this._setElementValue(_buildValueString(this.id, value));

        this._select.writeValue(this._select.value);
      }
      /**
       * \@description
       * Tracks simple string values bound to the option element.
       * For objects, use the `ngValue` input binding.
       * @param {?} value
       * @return {?}
       */


      set value(value) {
        this._setElementValue(value);

        if (this._select) this._select.writeValue(this._select.value);
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _setElementValue(value) {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
      }
      /**
       * \@description
       * Lifecycle method called before the directive's instance is destroyed. For internal use only.
       * @return {?}
       */


      ngOnDestroy() {
        if (this._select) {
          this._select._optionMap.delete(this.id);

          this._select.writeValue(this._select.value);
        }
      }

    }

    NgSelectOption.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'option'
      }]
    }];
    /** @nocollapse */

    NgSelectOption.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: SelectControlValueAccessor,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }]
    }];

    NgSelectOption.propDecorators = {
      ngValue: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngValue']
      }],
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['value']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const SELECT_MULTIPLE_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => SelectMultipleControlValueAccessor),
      multi: true
    };
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */

    function _buildValueString$1(id, value) {
      if (id == null) return "".concat(value);
      if (typeof value === 'string') value = "'".concat(value, "'");
      if (value && typeof value === 'object') value = 'Object';
      return "".concat(id, ": ").concat(value).slice(0, 50);
    }
    /**
     * @param {?} valueString
     * @return {?}
     */


    function _extractId$1(valueString) {
      return valueString.split(':')[0];
    }
    /**
     * Mock interface for HTML Options
     * @record
     */


    function HTMLOption() {}

    if (false) {}
    /**
     * Mock interface for HTMLCollection
     * @abstract
     */


    class HTMLCollection {}

    if (false) {}
    /**
     * \@description
     * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select control
     * changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and `NgModel`
     * directives.
     *
     * @see `SelectControlValueAccessor`
     *
     * \@usageNotes
     *
     * ### Using a multi-select control
     *
     * The follow example shows you how to use a multi-select control with a reactive form.
     *
     * ```ts
     * const countryControl = new FormControl();
     * ```
     *
     * ```
     * <select multiple name="countries" [formControl]="countryControl">
     *   <option *ngFor="let country of countries" [ngValue]="country">
     *     {{ country.name }}
     *   </option>
     * </select>
     * ```
     *
     * ### Customizing option selection
     *
     * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
     * See the `SelectControlValueAccessor` for usage.
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class SelectMultipleControlValueAccessor {
      /**
       * @param {?} _renderer
       * @param {?} _elementRef
       */
      constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@internal
         */

        this._optionMap = new Map();
        /**
         * \@internal
         */

        this._idCounter = 0;
        /**
         * \@description
         * The registered callback function called when a change event occurs on the input element.
         */

        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {};
        /**
         * \@description
         * The registered callback function called when a blur event occurs on the input element.
         */


        this.onTouched =
        /**
        * @return {?}
        */
        () => {};

        this._compareWith = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵlooseIdentical"];
      }
      /**
       * \@description
       * Tracks the option comparison algorithm for tracking identities when
       * checking for changes.
       * @param {?} fn
       * @return {?}
       */


      set compareWith(fn) {
        if (typeof fn !== 'function') {
          throw new Error("compareWith must be a function, but received ".concat(JSON.stringify(fn)));
        }

        this._compareWith = fn;
      }
      /**
       * \@description
       * Sets the "value" property on one or of more
       * of the select's options.
       *
       * @param {?} value The value
       * @return {?}
       */


      writeValue(value) {
        this.value = value;
        /** @type {?} */

        let optionSelectedStateSetter;

        if (Array.isArray(value)) {
          // convert values to ids

          /** @type {?} */
          const ids = value.map(
          /**
          * @param {?} v
          * @return {?}
          */
          v => this._getOptionId(v));

          optionSelectedStateSetter =
          /**
          * @param {?} opt
          * @param {?} o
          * @return {?}
          */
          (opt, o) => {
            opt._setSelected(ids.indexOf(o.toString()) > -1);
          };
        } else {
          optionSelectedStateSetter =
          /**
          * @param {?} opt
          * @param {?} o
          * @return {?}
          */
          (opt, o) => {
            opt._setSelected(false);
          };
        }

        this._optionMap.forEach(optionSelectedStateSetter);
      }
      /**
       * \@description
       * Registers a function called when the control value changes
       * and writes an array of the selected options.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnChange(fn) {
        this.onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        _ => {
          /** @type {?} */
          const selected = [];

          if (_.hasOwnProperty('selectedOptions')) {
            /** @type {?} */
            const options = _.selectedOptions;

            for (let i = 0; i < options.length; i++) {
              /** @type {?} */
              const opt = options.item(i);
              /** @type {?} */

              const val = this._getOptionValue(opt.value);

              selected.push(val);
            }
          } // Degrade on IE
          else {
              /** @type {?} */
              const options =
              /** @type {?} */
              _.options;

              for (let i = 0; i < options.length; i++) {
                /** @type {?} */
                const opt = options.item(i);

                if (opt.selected) {
                  /** @type {?} */
                  const val = this._getOptionValue(opt.value);

                  selected.push(val);
                }
              }
            }

          this.value = selected;
          fn(selected);
        };
      }
      /**
       * \@description
       * Registers a function called when the control is touched.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnTouched(fn) {
        this.onTouched = fn;
      }
      /**
       * Sets the "disabled" property on the select input element.
       *
       * @param {?} isDisabled The disabled value
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _registerOption(value) {
        /** @type {?} */
        const id = (this._idCounter++).toString();

        this._optionMap.set(id, value);

        return id;
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _getOptionId(value) {
        for (const id of Array.from(this._optionMap.keys())) {
          if (this._compareWith(
          /** @type {?} */
          this._optionMap.get(id)._value, value)) return id;
        }

        return null;
      }
      /**
       * \@internal
       * @param {?} valueString
       * @return {?}
       */


      _getOptionValue(valueString) {
        /** @type {?} */
        const id = _extractId$1(valueString);

        return this._optionMap.has(id) ?
        /** @type {?} */
        this._optionMap.get(id)._value : valueString;
      }

    }

    SelectMultipleControlValueAccessor.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
        host: {
          '(change)': 'onChange($event.target)',
          '(blur)': 'onTouched()'
        },
        providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    SelectMultipleControlValueAccessor.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }];

    SelectMultipleControlValueAccessor.propDecorators = {
      compareWith: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * \@description
     * Marks `<option>` as dynamic, so Angular can be notified when options change.
     *
     * @see `SelectMultipleControlValueAccessor`
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */


    class ɵNgSelectMultipleOption {
      /**
       * @param {?} _element
       * @param {?} _renderer
       * @param {?} _select
       */
      constructor(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;

        if (this._select) {
          this.id = this._select._registerOption(this);
        }
      }
      /**
       * \@description
       * Tracks the value bound to the option element. Unlike the value binding,
       * ngValue supports binding to objects.
       * @param {?} value
       * @return {?}
       */


      set ngValue(value) {
        if (this._select == null) return;
        this._value = value;

        this._setElementValue(_buildValueString$1(this.id, value));

        this._select.writeValue(this._select.value);
      }
      /**
       * \@description
       * Tracks simple string values bound to the option element.
       * For objects, use the `ngValue` input binding.
       * @param {?} value
       * @return {?}
       */


      set value(value) {
        if (this._select) {
          this._value = value;

          this._setElementValue(_buildValueString$1(this.id, value));

          this._select.writeValue(this._select.value);
        } else {
          this._setElementValue(value);
        }
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _setElementValue(value) {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
      }
      /**
       * \@internal
       * @param {?} selected
       * @return {?}
       */


      _setSelected(selected) {
        this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
      }
      /**
       * \@description
       * Lifecycle method called before the directive's instance is destroyed. For internal use only.
       * @return {?}
       */


      ngOnDestroy() {
        if (this._select) {
          this._select._optionMap.delete(this.id);

          this._select.writeValue(this._select.value);
        }
      }

    }

    ɵNgSelectMultipleOption.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'option'
      }]
    }];
    /** @nocollapse */

    ɵNgSelectMultipleOption.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
    }, {
      type: SelectMultipleControlValueAccessor,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }]
    }];

    ɵNgSelectMultipleOption.propDecorators = {
      ngValue: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngValue']
      }],
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['value']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} name
     * @param {?} parent
     * @return {?}
     */


    function controlPath(name, parent) {
      return [...
      /** @type {?} */
      parent.path, name];
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function setUpControl(control, dir) {
      if (!control) _throwError(dir, 'Cannot find control with');
      if (!dir.valueAccessor) _throwError(dir, 'No value accessor for form control with');
      control.validator = Validators.compose([
      /** @type {?} */
      control.validator, dir.validator]);
      control.asyncValidator = Validators.composeAsync([
      /** @type {?} */
      control.asyncValidator, dir.asyncValidator]);

      /** @type {?} */
      dir.valueAccessor.writeValue(control.value);
      setUpViewChangePipeline(control, dir);
      setUpModelChangePipeline(control, dir);
      setUpBlurPipeline(control, dir);

      if (
      /** @type {?} */
      dir.valueAccessor.setDisabledState) {
        control.registerOnDisabledChange(
        /**
        * @param {?} isDisabled
        * @return {?}
        */
        isDisabled => {
          /** @type {?} */

          /** @type {?} */
          dir.valueAccessor.setDisabledState(isDisabled);
        });
      } // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4


      dir._rawValidators.forEach(
      /**
      * @param {?} validator
      * @return {?}
      */
      validator => {
        if (
        /** @type {?} */
        validator.registerOnValidatorChange)
        /** @type {?} */

        /** @type {?} */
        validator.registerOnValidatorChange(
        /**
        * @return {?}
        */
        () => control.updateValueAndValidity());
      });

      dir._rawAsyncValidators.forEach(
      /**
      * @param {?} validator
      * @return {?}
      */
      validator => {
        if (
        /** @type {?} */
        validator.registerOnValidatorChange)
        /** @type {?} */

        /** @type {?} */
        validator.registerOnValidatorChange(
        /**
        * @return {?}
        */
        () => control.updateValueAndValidity());
      });
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function cleanUpControl(control, dir) {
      /** @type {?} */
      dir.valueAccessor.registerOnChange(
      /**
      * @return {?}
      */
      () => _noControlError(dir));

      /** @type {?} */
      dir.valueAccessor.registerOnTouched(
      /**
      * @return {?}
      */
      () => _noControlError(dir));

      dir._rawValidators.forEach(
      /**
      * @param {?} validator
      * @return {?}
      */
      validator => {
        if (validator.registerOnValidatorChange) {
          validator.registerOnValidatorChange(null);
        }
      });

      dir._rawAsyncValidators.forEach(
      /**
      * @param {?} validator
      * @return {?}
      */
      validator => {
        if (validator.registerOnValidatorChange) {
          validator.registerOnValidatorChange(null);
        }
      });

      if (control) control._clearChangeFns();
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function setUpViewChangePipeline(control, dir) {
      /** @type {?} */
      dir.valueAccessor.registerOnChange(
      /**
      * @param {?} newValue
      * @return {?}
      */
      newValue => {
        control._pendingValue = newValue;
        control._pendingChange = true;
        control._pendingDirty = true;
        if (control.updateOn === 'change') updateControl(control, dir);
      });
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function setUpBlurPipeline(control, dir) {
      /** @type {?} */
      dir.valueAccessor.registerOnTouched(
      /**
      * @return {?}
      */
      () => {
        control._pendingTouched = true;
        if (control.updateOn === 'blur' && control._pendingChange) updateControl(control, dir);
        if (control.updateOn !== 'submit') control.markAsTouched();
      });
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function updateControl(control, dir) {
      if (control._pendingDirty) control.markAsDirty();
      control.setValue(control._pendingValue, {
        emitModelToViewChange: false
      });
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function setUpModelChangePipeline(control, dir) {
      control.registerOnChange(
      /**
      * @param {?} newValue
      * @param {?} emitModelEvent
      * @return {?}
      */
      (newValue, emitModelEvent) => {
        // control -> view

        /** @type {?} */
        dir.valueAccessor.writeValue(newValue); // control -> ngModel

        if (emitModelEvent) dir.viewToModelUpdate(newValue);
      });
    }
    /**
     * @param {?} control
     * @param {?} dir
     * @return {?}
     */


    function setUpFormContainer(control, dir) {
      if (control == null) _throwError(dir, 'Cannot find control with');
      control.validator = Validators.compose([control.validator, dir.validator]);
      control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    }
    /**
     * @param {?} dir
     * @return {?}
     */


    function _noControlError(dir) {
      return _throwError(dir, 'There is no FormControl instance attached to form control element with');
    }
    /**
     * @param {?} dir
     * @param {?} message
     * @return {?}
     */


    function _throwError(dir, message) {
      /** @type {?} */
      let messageEnd;

      if (
      /** @type {?} */
      dir.path.length > 1) {
        messageEnd = "path: '".concat(
        /** @type {?} */
        dir.path.join(' -> '), "'");
      } else if (
      /** @type {?} */
      dir.path[0]) {
        messageEnd = "name: '".concat(dir.path, "'");
      } else {
        messageEnd = 'unspecified name attribute';
      }

      throw new Error("".concat(message, " ").concat(messageEnd));
    }
    /**
     * @param {?} validators
     * @return {?}
     */


    function composeValidators(validators) {
      return validators != null ? Validators.compose(validators.map(normalizeValidator)) : null;
    }
    /**
     * @param {?} validators
     * @return {?}
     */


    function composeAsyncValidators(validators) {
      return validators != null ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) : null;
    }
    /**
     * @param {?} changes
     * @param {?} viewModel
     * @return {?}
     */


    function isPropertyUpdated(changes, viewModel) {
      if (!changes.hasOwnProperty('model')) return false;
      /** @type {?} */

      const change = changes['model'];
      if (change.isFirstChange()) return true;
      return !Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵlooseIdentical"])(viewModel, change.currentValue);
    }
    /** @type {?} */


    const BUILTIN_ACCESSORS = [CheckboxControlValueAccessor, RangeValueAccessor, NumberValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor];
    /**
     * @param {?} valueAccessor
     * @return {?}
     */

    function isBuiltInAccessor(valueAccessor) {
      return BUILTIN_ACCESSORS.some(
      /**
      * @param {?} a
      * @return {?}
      */
      a => valueAccessor.constructor === a);
    }
    /**
     * @param {?} form
     * @param {?} directives
     * @return {?}
     */


    function syncPendingControls(form, directives) {
      form._syncPendingControls();

      directives.forEach(
      /**
      * @param {?} dir
      * @return {?}
      */
      dir => {
        /** @type {?} */
        const control =
        /** @type {?} */
        dir.control;

        if (control.updateOn === 'submit' && control._pendingChange) {
          dir.viewToModelUpdate(control._pendingValue);
          control._pendingChange = false;
        }
      });
    } // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented

    /**
     * @param {?} dir
     * @param {?} valueAccessors
     * @return {?}
     */


    function selectValueAccessor(dir, valueAccessors) {
      if (!valueAccessors) return null;
      if (!Array.isArray(valueAccessors)) _throwError(dir, 'Value accessor was not provided as an array for form control with');
      /** @type {?} */

      let defaultAccessor = undefined;
      /** @type {?} */

      let builtinAccessor = undefined;
      /** @type {?} */

      let customAccessor = undefined;
      valueAccessors.forEach(
      /**
      * @param {?} v
      * @return {?}
      */
      v => {
        if (v.constructor === DefaultValueAccessor) {
          defaultAccessor = v;
        } else if (isBuiltInAccessor(v)) {
          if (builtinAccessor) _throwError(dir, 'More than one built-in value accessor matches form control with');
          builtinAccessor = v;
        } else {
          if (customAccessor) _throwError(dir, 'More than one custom value accessor matches form control with');
          customAccessor = v;
        }
      });
      if (customAccessor) return customAccessor;
      if (builtinAccessor) return builtinAccessor;
      if (defaultAccessor) return defaultAccessor;

      _throwError(dir, 'No valid value accessor for form control with');

      return null;
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */


    function removeDir(list, el) {
      /** @type {?} */
      const index = list.indexOf(el);
      if (index > -1) list.splice(index, 1);
    } // TODO(kara): remove after deprecation period

    /**
     * @param {?} name
     * @param {?} type
     * @param {?} instance
     * @param {?} warningConfig
     * @return {?}
     */


    function _ngModelWarning(name, type, instance, warningConfig) {
      if (!Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])() || warningConfig === 'never') return;

      if ((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce || warningConfig === 'always' && !instance._ngModelWarningSent) {
        ReactiveErrors.ngModelWarning(name);
        type._ngModelWarningSentOnce = true;
        instance._ngModelWarningSent = true;
      }
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Reports that a FormControl is valid, meaning that no errors exist in the input value.
     *
     * @see `status`
     * @type {?}
     */


    const VALID = 'VALID';
    /**
     * Reports that a FormControl is invalid, meaning that an error exists in the input value.
     *
     * @see `status`
     * @type {?}
     */

    const INVALID = 'INVALID';
    /**
     * Reports that a FormControl is pending, meaning that that async validation is occurring and
     * errors are not yet available for the input value.
     *
     * @see `markAsPending`
     * @see `status`
     * @type {?}
     */

    const PENDING = 'PENDING';
    /**
     * Reports that a FormControl is disabled, meaning that the control is exempt from ancestor
     * calculations of validity or value.
     *
     * @see `markAsDisabled`
     * @see `status`
     * @type {?}
     */

    const DISABLED = 'DISABLED';
    /**
     * @param {?} control
     * @param {?} path
     * @param {?} delimiter
     * @return {?}
     */

    function _find(control, path, delimiter) {
      if (path == null) return null;

      if (!(path instanceof Array)) {
        path =
        /** @type {?} */
        path.split(delimiter);
      }

      if (path instanceof Array && path.length === 0) return null;
      return (
        /** @type {?} */
        path.reduce(
        /**
        * @param {?} v
        * @param {?} name
        * @return {?}
        */
        (v, name) => {
          if (v instanceof FormGroup) {
            return v.controls.hasOwnProperty(
            /** @type {?} */
            name) ? v.controls[name] : null;
          }

          if (v instanceof FormArray) {
            return v.at(
            /** @type {?} */
            name) || null;
          }

          return null;
        }, control)
      );
    }
    /**
     * @param {?=} validatorOrOpts
     * @return {?}
     */


    function coerceToValidator(validatorOrOpts) {
      /** @type {?} */
      const validator =
      /** @type {?} */
      isOptionsObj(validatorOrOpts) ?
      /** @type {?} */
      validatorOrOpts.validators : validatorOrOpts;
      return Array.isArray(validator) ? composeValidators(validator) : validator || null;
    }
    /**
     * @param {?=} asyncValidator
     * @param {?=} validatorOrOpts
     * @return {?}
     */


    function coerceToAsyncValidator(asyncValidator, validatorOrOpts) {
      /** @type {?} */
      const origAsyncValidator =
      /** @type {?} */
      isOptionsObj(validatorOrOpts) ?
      /** @type {?} */
      validatorOrOpts.asyncValidators : asyncValidator;
      return Array.isArray(origAsyncValidator) ? composeAsyncValidators(origAsyncValidator) : origAsyncValidator || null;
    }
    /**
     * Interface for options provided to an `AbstractControl`.
     *
     * \@publicApi
     * @record
     */


    function AbstractControlOptions() {}

    if (false) {}
    /**
     * @param {?=} validatorOrOpts
     * @return {?}
     */


    function isOptionsObj(validatorOrOpts) {
      return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
    }
    /**
     * This is the base class for `FormControl`, `FormGroup`, and `FormArray`.
     *
     * It provides some of the shared behavior that all controls and groups of controls have, like
     * running validators, calculating status, and resetting state. It also defines the properties
     * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
     * instantiated directly.
     *
     * @see [Forms Guide](/guide/forms)
     * @see [Reactive Forms Guide](/guide/reactive-forms)
     * @see [Dynamic Forms Guide](/guide/dynamic-form)
     *
     * \@publicApi
     * @abstract
     */


    class AbstractControl {
      /**
       * Initialize the AbstractControl instance.
       *
       * @param {?} validator The function that determines the synchronous validity of this control.
       * @param {?} asyncValidator The function that determines the asynchronous validity of this
       * control.
       */
      constructor(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        /**
         * \@internal
         */

        this._onCollectionChange =
        /**
        * @return {?}
        */
        () => {};
        /**
         * A control is `pristine` if the user has not yet changed
         * the value in the UI.
         *
         * @return True if the user has not yet changed the value in the UI; compare `dirty`.
         * Programmatic changes to a control's value do not mark it dirty.
         */


        this.pristine = true;
        /**
         * True if the control is marked as `touched`.
         *
         * A control is marked `touched` once the user has triggered
         * a `blur` event on it.
         */

        this.touched = false;
        /**
         * \@internal
         */

        this._onDisabledChange = [];
      }
      /**
       * The parent control.
       * @return {?}
       */


      get parent() {
        return this._parent;
      }
      /**
       * A control is `valid` when its `status` is `VALID`.
       *
       * @see {\@link AbstractControl.status}
       *
       * @return {?} True if the control has passed all of its validation tests,
       * false otherwise.
       */


      get valid() {
        return this.status === VALID;
      }
      /**
       * A control is `invalid` when its `status` is `INVALID`.
       *
       * @see {\@link AbstractControl.status}
       *
       * @return {?} True if this control has failed one or more of its validation checks,
       * false otherwise.
       */


      get invalid() {
        return this.status === INVALID;
      }
      /**
       * A control is `pending` when its `status` is `PENDING`.
       *
       * @see {\@link AbstractControl.status}
       *
       * @return {?} True if this control is in the process of conducting a validation check,
       * false otherwise.
       */


      get pending() {
        return this.status == PENDING;
      }
      /**
       * A control is `disabled` when its `status` is `DISABLED`.
       *
       * Disabled controls are exempt from validation checks and
       * are not included in the aggregate value of their ancestor
       * controls.
       *
       * @see {\@link AbstractControl.status}
       *
       * @return {?} True if the control is disabled, false otherwise.
       */


      get disabled() {
        return this.status === DISABLED;
      }
      /**
       * A control is `enabled` as long as its `status` is not `DISABLED`.
       *
       * @see {\@link AbstractControl.status}
       *
       * @return {?} True if the control has any status other than 'DISABLED',
       * false if the status is 'DISABLED'.
       *
       */


      get enabled() {
        return this.status !== DISABLED;
      }
      /**
       * A control is `dirty` if the user has changed the value
       * in the UI.
       *
       * @return {?} True if the user has changed the value of this control in the UI; compare `pristine`.
       * Programmatic changes to a control's value do not mark it dirty.
       */


      get dirty() {
        return !this.pristine;
      }
      /**
       * True if the control has not been marked as touched
       *
       * A control is `untouched` if the user has not yet triggered
       * a `blur` event on it.
       * @return {?}
       */


      get untouched() {
        return !this.touched;
      }
      /**
       * Reports the update strategy of the `AbstractControl` (meaning
       * the event on which the control updates itself).
       * Possible values: `'change'` | `'blur'` | `'submit'`
       * Default value: `'change'`
       * @return {?}
       */


      get updateOn() {
        return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
      }
      /**
       * Sets the synchronous validators that are active on this control.  Calling
       * this overwrites any existing sync validators.
       *
       * When you add or remove a validator at run time, you must call
       * `updateValueAndValidity()` for the new validation to take effect.
       *
       * @param {?} newValidator
       * @return {?}
       */


      setValidators(newValidator) {
        this.validator = coerceToValidator(newValidator);
      }
      /**
       * Sets the async validators that are active on this control. Calling this
       * overwrites any existing async validators.
       *
       * When you add or remove a validator at run time, you must call
       * `updateValueAndValidity()` for the new validation to take effect.
       *
       * @param {?} newValidator
       * @return {?}
       */


      setAsyncValidators(newValidator) {
        this.asyncValidator = coerceToAsyncValidator(newValidator);
      }
      /**
       * Empties out the sync validator list.
       *
       * When you add or remove a validator at run time, you must call
       * `updateValueAndValidity()` for the new validation to take effect.
       *
       * @return {?}
       */


      clearValidators() {
        this.validator = null;
      }
      /**
       * Empties out the async validator list.
       *
       * When you add or remove a validator at run time, you must call
       * `updateValueAndValidity()` for the new validation to take effect.
       *
       * @return {?}
       */


      clearAsyncValidators() {
        this.asyncValidator = null;
      }
      /**
       * Marks the control as `touched`. A control is touched by focus and
       * blur events that do not change the value.
       *
       * @see `markAsUntouched()` / `markAsDirty()` / `markAsPristine()`
       *
       * @param {?=} opts Configuration options that determine how the control propagates changes
       * and emits events events after marking is applied.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false.
       * @return {?}
       */


      markAsTouched(opts = {}) {
        /** @type {?} */
        this.touched = true;

        if (this._parent && !opts.onlySelf) {
          this._parent.markAsTouched(opts);
        }
      }
      /**
       * Marks the control and all its descendant controls as `touched`.
       * @see `markAsTouched()`
       * @return {?}
       */


      markAllAsTouched() {
        this.markAsTouched({
          onlySelf: true
        });

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.markAllAsTouched());
      }
      /**
       * Marks the control as `untouched`.
       *
       * If the control has any children, also marks all children as `untouched`
       * and recalculates the `touched` status of all parent controls.
       *
       * @see `markAsTouched()` / `markAsDirty()` / `markAsPristine()`
       *
       * @param {?=} opts Configuration options that determine how the control propagates changes
       * and emits events after the marking is applied.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false.
       * @return {?}
       */


      markAsUntouched(opts = {}) {
        /** @type {?} */
        this.touched = false;
        this._pendingTouched = false;

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          control.markAsUntouched({
            onlySelf: true
          });
        });

        if (this._parent && !opts.onlySelf) {
          this._parent._updateTouched(opts);
        }
      }
      /**
       * Marks the control as `dirty`. A control becomes dirty when
       * the control's value is changed through the UI; compare `markAsTouched`.
       *
       * @see `markAsTouched()` / `markAsUntouched()` / `markAsPristine()`
       *
       * @param {?=} opts Configuration options that determine how the control propagates changes
       * and emits events after marking is applied.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false.
       * @return {?}
       */


      markAsDirty(opts = {}) {
        /** @type {?} */
        this.pristine = false;

        if (this._parent && !opts.onlySelf) {
          this._parent.markAsDirty(opts);
        }
      }
      /**
       * Marks the control as `pristine`.
       *
       * If the control has any children, marks all children as `pristine`,
       * and recalculates the `pristine` status of all parent
       * controls.
       *
       * @see `markAsTouched()` / `markAsUntouched()` / `markAsDirty()`
       *
       * @param {?=} opts Configuration options that determine how the control emits events after
       * marking is applied.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false..
       * @return {?}
       */


      markAsPristine(opts = {}) {
        /** @type {?} */
        this.pristine = true;
        this._pendingDirty = false;

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          control.markAsPristine({
            onlySelf: true
          });
        });

        if (this._parent && !opts.onlySelf) {
          this._parent._updatePristine(opts);
        }
      }
      /**
       * Marks the control as `pending`.
       *
       * A control is pending while the control performs async validation.
       *
       * @see {\@link AbstractControl.status}
       *
       * @param {?=} opts Configuration options that determine how the control propagates changes and
       * emits events after marking is applied.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false..
       * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
       * observable emits an event with the latest status the control is marked pending.
       * When false, no events are emitted.
       *
       * @return {?}
       */


      markAsPending(opts = {}) {
        /** @type {?} */
        this.status = PENDING;

        if (opts.emitEvent !== false) {
          /** @type {?} */
          this.statusChanges.emit(this.status);
        }

        if (this._parent && !opts.onlySelf) {
          this._parent.markAsPending(opts);
        }
      }
      /**
       * Disables the control. This means the control is exempt from validation checks and
       * excluded from the aggregate value of any parent. Its status is `DISABLED`.
       *
       * If the control has children, all children are also disabled.
       *
       * @see {\@link AbstractControl.status}
       *
       * @param {?=} opts Configuration options that determine how the control propagates
       * changes and emits events after the control is disabled.
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false..
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is disabled.
       * When false, no events are emitted.
       * @return {?}
       */


      disable(opts = {}) {
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.

        /** @type {?} */
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

        /** @type {?} */
        this.status = DISABLED;

        /** @type {?} */
        this.errors = null;

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          control.disable(Object.assign({}, opts, {
            onlySelf: true
          }));
        });

        this._updateValue();

        if (opts.emitEvent !== false) {
          /** @type {?} */
          this.valueChanges.emit(this.value);

          /** @type {?} */
          this.statusChanges.emit(this.status);
        }

        this._updateAncestors(Object.assign({}, opts, {
          skipPristineCheck
        }));

        this._onDisabledChange.forEach(
        /**
        * @param {?} changeFn
        * @return {?}
        */
        changeFn => changeFn(true));
      }
      /**
       * Enables the control. This means the control is included in validation checks and
       * the aggregate value of its parent. Its status recalculates based on its value and
       * its validators.
       *
       * By default, if the control has children, all children are enabled.
       *
       * @see {\@link AbstractControl.status}
       *
       * @param {?=} opts Configure options that control how the control propagates changes and
       * emits events when marked as untouched
       * * `onlySelf`: When true, mark only this control. When false or not supplied,
       * marks all direct ancestors. Default is false..
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is enabled.
       * When false, no events are emitted.
       * @return {?}
       */


      enable(opts = {}) {
        // If parent has been marked artificially dirty we don't want to re-calculate the
        // parent's dirtiness based on the children.

        /** @type {?} */
        const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);

        /** @type {?} */
        this.status = VALID;

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          control.enable(Object.assign({}, opts, {
            onlySelf: true
          }));
        });

        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: opts.emitEvent
        });

        this._updateAncestors(Object.assign({}, opts, {
          skipPristineCheck
        }));

        this._onDisabledChange.forEach(
        /**
        * @param {?} changeFn
        * @return {?}
        */
        changeFn => changeFn(false));
      }
      /**
       * @private
       * @param {?} opts
       * @return {?}
       */


      _updateAncestors(opts) {
        if (this._parent && !opts.onlySelf) {
          this._parent.updateValueAndValidity(opts);

          if (!opts.skipPristineCheck) {
            this._parent._updatePristine();
          }

          this._parent._updateTouched();
        }
      }
      /**
       * @param {?} parent Sets the parent of the control
       * @return {?}
       */


      setParent(parent) {
        this._parent = parent;
      }
      /**
       * Recalculates the value and validation status of the control.
       *
       * By default, it also updates the value and validity of its ancestors.
       *
       * @param {?=} opts Configuration options determine how the control propagates changes and emits events
       * after updates and validity checks are applied.
       * * `onlySelf`: When true, only update this control. When false or not supplied,
       * update all direct ancestors. Default is false..
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is updated.
       * When false, no events are emitted.
       * @return {?}
       */


      updateValueAndValidity(opts = {}) {
        this._setInitialStatus();

        this._updateValue();

        if (this.enabled) {
          this._cancelExistingSubscription();

          /** @type {?} */
          this.errors = this._runValidator();

          /** @type {?} */
          this.status = this._calculateStatus();

          if (this.status === VALID || this.status === PENDING) {
            this._runAsyncValidator(opts.emitEvent);
          }
        }

        if (opts.emitEvent !== false) {
          /** @type {?} */
          this.valueChanges.emit(this.value);

          /** @type {?} */
          this.statusChanges.emit(this.status);
        }

        if (this._parent && !opts.onlySelf) {
          this._parent.updateValueAndValidity(opts);
        }
      }
      /**
       * \@internal
       * @param {?=} opts
       * @return {?}
       */


      _updateTreeValidity(opts = {
        emitEvent: true
      }) {
        this._forEachChild(
        /**
        * @param {?} ctrl
        * @return {?}
        */
        ctrl => ctrl._updateTreeValidity(opts));

        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: opts.emitEvent
        });
      }
      /**
       * @private
       * @return {?}
       */


      _setInitialStatus() {
        /** @type {?} */
        this.status = this._allControlsDisabled() ? DISABLED : VALID;
      }
      /**
       * @private
       * @return {?}
       */


      _runValidator() {
        return this.validator ? this.validator(this) : null;
      }
      /**
       * @private
       * @param {?=} emitEvent
       * @return {?}
       */


      _runAsyncValidator(emitEvent) {
        if (this.asyncValidator) {
          /** @type {?} */
          this.status = PENDING;
          /** @type {?} */

          const obs = toObservable(this.asyncValidator(this));
          this._asyncValidationSubscription = obs.subscribe(
          /**
          * @param {?} errors
          * @return {?}
          */
          errors => this.setErrors(errors, {
            emitEvent
          }));
        }
      }
      /**
       * @private
       * @return {?}
       */


      _cancelExistingSubscription() {
        if (this._asyncValidationSubscription) {
          this._asyncValidationSubscription.unsubscribe();
        }
      }
      /**
       * Sets errors on a form control when running validations manually, rather than automatically.
       *
       * Calling `setErrors` also updates the validity of the parent control.
       *
       * \@usageNotes
       * ### Manually set the errors for a control
       *
       * ```
       * const login = new FormControl('someLogin');
       * login.setErrors({
       *   notUnique: true
       * });
       *
       * expect(login.valid).toEqual(false);
       * expect(login.errors).toEqual({ notUnique: true });
       *
       * login.setValue('someOtherLogin');
       *
       * expect(login.valid).toEqual(true);
       * ```
       * @param {?} errors
       * @param {?=} opts
       * @return {?}
       */


      setErrors(errors, opts = {}) {
        /** @type {?} */
        this.errors = errors;

        this._updateControlsErrors(opts.emitEvent !== false);
      }
      /**
       * Retrieves a child control given the control's name or path.
       *
       * \@usageNotes
       * ### Retrieve a nested control
       *
       * For example, to get a `name` control nested within a `person` sub-group:
       *
       * * `this.form.get('person.name');`
       *
       * -OR-
       *
       * * `this.form.get(['person', 'name']);`
       * @param {?} path A dot-delimited string or array of string/number values that define the path to the
       * control.
       *
       * @return {?}
       */


      get(path) {
        return _find(this, path, '.');
      }
      /**
       * \@description
       * Reports error data for the control with the given path.
       *
       * \@usageNotes
       * For example, for the following `FormGroup`:
       *
       * ```
       * form = new FormGroup({
       *   address: new FormGroup({ street: new FormControl() })
       * });
       * ```
       *
       * The path to the 'street' control from the root form would be 'address' -> 'street'.
       *
       * It can be provided to this method in one of two formats:
       *
       * 1. An array of string control names, e.g. `['address', 'street']`
       * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
       *
       * @param {?} errorCode The code of the error to check
       * @param {?=} path A list of control names that designates how to move from the current control
       * to the control that should be queried for errors.
       *
       * @return {?} error data for that particular error. If the control or error is not present,
       * null is returned.
       */


      getError(errorCode, path) {
        /** @type {?} */
        const control = path ? this.get(path) : this;
        return control && control.errors ? control.errors[errorCode] : null;
      }
      /**
       * \@description
       * Reports whether the control with the given path has the error specified.
       *
       * \@usageNotes
       * For example, for the following `FormGroup`:
       *
       * ```
       * form = new FormGroup({
       *   address: new FormGroup({ street: new FormControl() })
       * });
       * ```
       *
       * The path to the 'street' control from the root form would be 'address' -> 'street'.
       *
       * It can be provided to this method in one of two formats:
       *
       * 1. An array of string control names, e.g. `['address', 'street']`
       * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
       *
       * If no path is given, this method checks for the error on the current control.
       *
       * @param {?} errorCode The code of the error to check
       * @param {?=} path A list of control names that designates how to move from the current control
       * to the control that should be queried for errors.
       *
       * @return {?} whether the given error is present in the control at the given path.
       *
       * If the control is not present, false is returned.
       */


      hasError(errorCode, path) {
        return !!this.getError(errorCode, path);
      }
      /**
       * Retrieves the top-level ancestor of this control.
       * @return {?}
       */


      get root() {
        /** @type {?} */
        let x = this;

        while (x._parent) {
          x = x._parent;
        }

        return x;
      }
      /**
       * \@internal
       * @param {?} emitEvent
       * @return {?}
       */


      _updateControlsErrors(emitEvent) {
        /** @type {?} */
        this.status = this._calculateStatus();

        if (emitEvent) {
          /** @type {?} */
          this.statusChanges.emit(this.status);
        }

        if (this._parent) {
          this._parent._updateControlsErrors(emitEvent);
        }
      }
      /**
       * \@internal
       * @return {?}
       */


      _initObservables() {
        /** @type {?} */
        this.valueChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();

        /** @type {?} */
        this.statusChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }
      /**
       * @private
       * @return {?}
       */


      _calculateStatus() {
        if (this._allControlsDisabled()) return DISABLED;
        if (this.errors) return INVALID;
        if (this._anyControlsHaveStatus(PENDING)) return PENDING;
        if (this._anyControlsHaveStatus(INVALID)) return INVALID;
        return VALID;
      }
      /**
       * \@internal
       * @param {?} status
       * @return {?}
       */


      _anyControlsHaveStatus(status) {
        return this._anyControls(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.status === status);
      }
      /**
       * \@internal
       * @return {?}
       */


      _anyControlsDirty() {
        return this._anyControls(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.dirty);
      }
      /**
       * \@internal
       * @return {?}
       */


      _anyControlsTouched() {
        return this._anyControls(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.touched);
      }
      /**
       * \@internal
       * @param {?=} opts
       * @return {?}
       */


      _updatePristine(opts = {}) {
        /** @type {?} */
        this.pristine = !this._anyControlsDirty();

        if (this._parent && !opts.onlySelf) {
          this._parent._updatePristine(opts);
        }
      }
      /**
       * \@internal
       * @param {?=} opts
       * @return {?}
       */


      _updateTouched(opts = {}) {
        /** @type {?} */
        this.touched = this._anyControlsTouched();

        if (this._parent && !opts.onlySelf) {
          this._parent._updateTouched(opts);
        }
      }
      /**
       * \@internal
       * @param {?} formState
       * @return {?}
       */


      _isBoxedValue(formState) {
        return typeof formState === 'object' && formState !== null && Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
      }
      /**
       * \@internal
       * @param {?} fn
       * @return {?}
       */


      _registerOnCollectionChange(fn) {
        this._onCollectionChange = fn;
      }
      /**
       * \@internal
       * @param {?=} opts
       * @return {?}
       */


      _setUpdateStrategy(opts) {
        if (isOptionsObj(opts) &&
        /** @type {?} */
        opts.updateOn != null) {
          this._updateOn =
          /** @type {?} */

          /** @type {?} */
          opts.updateOn;
        }
      }
      /**
       * Check to see if parent has been marked artificially dirty.
       *
       * \@internal
       * @private
       * @param {?=} onlySelf
       * @return {?}
       */


      _parentMarkedDirty(onlySelf) {
        /** @type {?} */
        const parentDirty = this._parent && this._parent.dirty;
        return !onlySelf && parentDirty && !this._parent._anyControlsDirty();
      }

    }

    if (false) {}
    /**
     * Tracks the value and validation status of an individual form control.
     *
     * This is one of the three fundamental building blocks of Angular forms, along with
     * `FormGroup` and `FormArray`. It extends the `AbstractControl` class that
     * implements most of the base functionality for accessing the value, validation status,
     * user interactions and events.
     *
     * @see `AbstractControl`
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see [Usage Notes](#usage-notes)
     *
     * \@usageNotes
     *
     * ### Initializing Form Controls
     *
     * Instantiate a `FormControl`, with an initial value.
     *
     * ```ts
     * const control = new FormControl('some value');
     * console.log(control.value);     // 'some value'
     * ```
     *
     * The following example initializes the control with a form state object. The `value`
     * and `disabled` keys are required in this case.
     *
     * ```ts
     * const control = new FormControl({ value: 'n/a', disabled: true });
     * console.log(control.value);     // 'n/a'
     * console.log(control.status);    // 'DISABLED'
     * ```
     *
     * The following example initializes the control with a sync validator.
     *
     * ```ts
     * const control = new FormControl('', Validators.required);
     * console.log(control.value);      // ''
     * console.log(control.status);     // 'INVALID'
     * ```
     *
     * The following example initializes the control using an options object.
     *
     * ```ts
     * const control = new FormControl('', {
     *    validators: Validators.required,
     *    asyncValidators: myAsyncValidator
     * });
     * ```
     *
     * ### Configure the control to update on a blur event
     *
     * Set the `updateOn` option to `'blur'` to update on the blur `event`.
     *
     * ```ts
     * const control = new FormControl('', { updateOn: 'blur' });
     * ```
     *
     * ### Configure the control to update on a submit event
     *
     * Set the `updateOn` option to `'submit'` to update on a submit `event`.
     *
     * ```ts
     * const control = new FormControl('', { updateOn: 'submit' });
     * ```
     *
     * ### Reset the control back to an initial value
     *
     * You reset to a specific form state by passing through a standalone
     * value or a form state object that contains both a value and a disabled state
     * (these are the only two properties that cannot be calculated).
     *
     * ```ts
     * const control = new FormControl('Nancy');
     *
     * console.log(control.value); // 'Nancy'
     *
     * control.reset('Drew');
     *
     * console.log(control.value); // 'Drew'
     * ```
     *
     * ### Reset the control back to an initial value and disabled
     *
     * ```
     * const control = new FormControl('Nancy');
     *
     * console.log(control.value); // 'Nancy'
     * console.log(control.status); // 'VALID'
     *
     * control.reset({ value: 'Drew', disabled: true });
     *
     * console.log(control.value); // 'Drew'
     * console.log(control.status); // 'DISABLED'
     * ```
     *
     * \@publicApi
     */


    class FormControl extends AbstractControl {
      /**
       * Creates a new `FormControl` instance.
       *
       * @param {?=} formState Initializes the control with an initial value,
       * or an object that defines the initial value and disabled state.
       *
       * @param {?=} validatorOrOpts A synchronous validator function, or an array of
       * such functions, or an `AbstractControlOptions` object that contains validation functions
       * and a validation trigger.
       *
       * @param {?=} asyncValidator A single async validator or array of async validator functions
       *
       */
      constructor(formState = null, validatorOrOpts, asyncValidator) {
        super(coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts));
        /**
         * \@internal
         */

        this._onChange = [];

        this._applyFormState(formState);

        this._setUpdateStrategy(validatorOrOpts);

        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });

        this._initObservables();
      }
      /**
       * Sets a new value for the form control.
       *
       * @param {?} value The new value for the control.
       * @param {?=} options Configuration options that determine how the control propagates changes
       * and emits events when the value changes.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
       * false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control value is updated.
       * When false, no events are emitted.
       * * `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
       * `onChange` event to
       * update the view.
       * * `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
       * `ngModelChange`
       * event to update the model.
       *
       * @return {?}
       */


      setValue(value, options = {}) {
        /** @type {?} */
        this.value = this._pendingValue = value;

        if (this._onChange.length && options.emitModelToViewChange !== false) {
          this._onChange.forEach(
          /**
          * @param {?} changeFn
          * @return {?}
          */
          changeFn => changeFn(this.value, options.emitViewToModelChange !== false));
        }

        this.updateValueAndValidity(options);
      }
      /**
       * Patches the value of a control.
       *
       * This function is functionally the same as {\@link FormControl#setValue setValue} at this level.
       * It exists for symmetry with {\@link FormGroup#patchValue patchValue} on `FormGroups` and
       * `FormArrays`, where it does behave differently.
       *
       * @see `setValue` for options
       * @param {?} value
       * @param {?=} options
       * @return {?}
       */


      patchValue(value, options = {}) {
        this.setValue(value, options);
      }
      /**
       * Resets the form control, marking it `pristine` and `untouched`, and setting
       * the value to null.
       *
       * @param {?=} formState Resets the control with an initial value,
       * or an object that defines the initial value and disabled state.
       *
       * @param {?=} options Configuration options that determine how the control propagates changes
       * and emits events after the value changes.
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
       * false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is reset.
       * When false, no events are emitted.
       *
       * @return {?}
       */


      reset(formState = null, options = {}) {
        this._applyFormState(formState);

        this.markAsPristine(options);
        this.markAsUntouched(options);
        this.setValue(this.value, options);
        this._pendingChange = false;
      }
      /**
       * \@internal
       * @return {?}
       */


      _updateValue() {}
      /**
       * \@internal
       * @param {?} condition
       * @return {?}
       */


      _anyControls(condition) {
        return false;
      }
      /**
       * \@internal
       * @return {?}
       */


      _allControlsDisabled() {
        return this.disabled;
      }
      /**
       * Register a listener for change events.
       *
       * @param {?} fn The method that is called when the value changes
       * @return {?}
       */


      registerOnChange(fn) {
        this._onChange.push(fn);
      }
      /**
       * \@internal
       * @return {?}
       */


      _clearChangeFns() {
        this._onChange = [];
        this._onDisabledChange = [];

        this._onCollectionChange =
        /**
        * @return {?}
        */
        () => {};
      }
      /**
       * Register a listener for disabled events.
       *
       * @param {?} fn The method that is called when the disabled status changes.
       * @return {?}
       */


      registerOnDisabledChange(fn) {
        this._onDisabledChange.push(fn);
      }
      /**
       * \@internal
       * @param {?} cb
       * @return {?}
       */


      _forEachChild(cb) {}
      /**
       * \@internal
       * @return {?}
       */


      _syncPendingControls() {
        if (this.updateOn === 'submit') {
          if (this._pendingDirty) this.markAsDirty();
          if (this._pendingTouched) this.markAsTouched();

          if (this._pendingChange) {
            this.setValue(this._pendingValue, {
              onlySelf: true,
              emitModelToViewChange: false
            });
            return true;
          }
        }

        return false;
      }
      /**
       * @private
       * @param {?} formState
       * @return {?}
       */


      _applyFormState(formState) {
        if (this._isBoxedValue(formState)) {
          /** @type {?} */
          this.value = this._pendingValue = formState.value;
          formState.disabled ? this.disable({
            onlySelf: true,
            emitEvent: false
          }) : this.enable({
            onlySelf: true,
            emitEvent: false
          });
        } else {
          /** @type {?} */
          this.value = this._pendingValue = formState;
        }
      }

    }

    if (false) {}
    /**
     * Tracks the value and validity state of a group of `FormControl` instances.
     *
     * A `FormGroup` aggregates the values of each child `FormControl` into one object,
     * with each control name as the key.  It calculates its status by reducing the status values
     * of its children. For example, if one of the controls in a group is invalid, the entire
     * group becomes invalid.
     *
     * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
     * along with `FormControl` and `FormArray`.
     *
     * When instantiating a `FormGroup`, pass in a collection of child controls as the first
     * argument. The key for each child registers the name for the control.
     *
     * \@usageNotes
     *
     * ### Create a form group with 2 controls
     *
     * ```
     * const form = new FormGroup({
     *   first: new FormControl('Nancy', Validators.minLength(2)),
     *   last: new FormControl('Drew'),
     * });
     *
     * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
     * console.log(form.status);  // 'VALID'
     * ```
     *
     * ### Create a form group with a group-level validator
     *
     * You include group-level validators as the second arg, or group-level async
     * validators as the third arg. These come in handy when you want to perform validation
     * that considers the value of more than one child control.
     *
     * ```
     * const form = new FormGroup({
     *   password: new FormControl('', Validators.minLength(2)),
     *   passwordConfirm: new FormControl('', Validators.minLength(2)),
     * }, passwordMatchValidator);
     *
     *
     * function passwordMatchValidator(g: FormGroup) {
     *    return g.get('password').value === g.get('passwordConfirm').value
     *       ? null : {'mismatch': true};
     * }
     * ```
     *
     * Like `FormControl` instances, you choose to pass in
     * validators and async validators as part of an options object.
     *
     * ```
     * const form = new FormGroup({
     *   password: new FormControl('')
     *   passwordConfirm: new FormControl('')
     * }, { validators: passwordMatchValidator, asyncValidators: otherValidator });
     * ```
     *
     * ### Set the updateOn property for all controls in a form group
     *
     * The options object is used to set a default value for each child
     * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
     * group level, all child controls default to 'blur', unless the child
     * has explicitly specified a different `updateOn` value.
     *
     * ```ts
     * const c = new FormGroup({
     *   one: new FormControl()
     * }, { updateOn: 'blur' });
     * ```
     *
     * \@publicApi
     */


    class FormGroup extends AbstractControl {
      /**
       * Creates a new `FormGroup` instance.
       *
       * @param {?} controls A collection of child controls. The key for each child is the name
       * under which it is registered.
       *
       * @param {?=} validatorOrOpts A synchronous validator function, or an array of
       * such functions, or an `AbstractControlOptions` object that contains validation functions
       * and a validation trigger.
       *
       * @param {?=} asyncValidator A single async validator or array of async validator functions
       *
       */
      constructor(controls, validatorOrOpts, asyncValidator) {
        super(coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts));
        this.controls = controls;

        this._initObservables();

        this._setUpdateStrategy(validatorOrOpts);

        this._setUpControls();

        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
      /**
       * Registers a control with the group's list of controls.
       *
       * This method does not update the value or validity of the control.
       * Use {\@link FormGroup#addControl addControl} instead.
       *
       * @param {?} name The control name to register in the collection
       * @param {?} control Provides the control for the given name
       * @return {?}
       */


      registerControl(name, control) {
        if (this.controls[name]) return this.controls[name];
        this.controls[name] = control;
        control.setParent(this);

        control._registerOnCollectionChange(this._onCollectionChange);

        return control;
      }
      /**
       * Add a control to this group.
       *
       * This method also updates the value and validity of the control.
       *
       * @param {?} name The control name to add to the collection
       * @param {?} control Provides the control for the given name
       * @return {?}
       */


      addControl(name, control) {
        this.registerControl(name, control);
        this.updateValueAndValidity();

        this._onCollectionChange();
      }
      /**
       * Remove a control from this group.
       *
       * @param {?} name The control name to remove from the collection
       * @return {?}
       */


      removeControl(name) {
        if (this.controls[name]) this.controls[name]._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {});
        delete this.controls[name];
        this.updateValueAndValidity();

        this._onCollectionChange();
      }
      /**
       * Replace an existing control.
       *
       * @param {?} name The control name to replace in the collection
       * @param {?} control Provides the control for the given name
       * @return {?}
       */


      setControl(name, control) {
        if (this.controls[name]) this.controls[name]._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {});
        delete this.controls[name];
        if (control) this.registerControl(name, control);
        this.updateValueAndValidity();

        this._onCollectionChange();
      }
      /**
       * Check whether there is an enabled control with the given name in the group.
       *
       * Reports false for disabled controls. If you'd like to check for existence in the group
       * only, use {\@link AbstractControl#get get} instead.
       *
       * @param {?} controlName The control name to check for existence in the collection
       *
       * @return {?} false for disabled controls, true otherwise.
       */


      contains(controlName) {
        return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
      }
      /**
       * Sets the value of the `FormGroup`. It accepts an object that matches
       * the structure of the group, with control names as keys.
       *
       * \@usageNotes
       * ### Set the complete value for the form group
       *
       * ```
       * const form = new FormGroup({
       *   first: new FormControl(),
       *   last: new FormControl()
       * });
       *
       * console.log(form.value);   // {first: null, last: null}
       *
       * form.setValue({first: 'Nancy', last: 'Drew'});
       * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
       * ```
       *
       * @throws When strict checks fail, such as setting the value of a control
       * that doesn't exist or if you exclude a value of a control that does exist.
       *
       * @param {?} value The new value for the control that matches the structure of the group.
       * @param {?=} options Configuration options that determine how the control propagates changes
       * and emits events after the value changes.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
       * false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control value is updated.
       * When false, no events are emitted.
       * @return {?}
       */


      setValue(value, options = {}) {
        this._checkAllValuesPresent(value);

        Object.keys(value).forEach(
        /**
        * @param {?} name
        * @return {?}
        */
        name => {
          this._throwIfControlMissing(name);

          this.controls[name].setValue(value[name], {
            onlySelf: true,
            emitEvent: options.emitEvent
          });
        });
        this.updateValueAndValidity(options);
      }
      /**
       * Patches the value of the `FormGroup`. It accepts an object with control
       * names as keys, and does its best to match the values to the correct controls
       * in the group.
       *
       * It accepts both super-sets and sub-sets of the group without throwing an error.
       *
       * \@usageNotes
       * ### Patch the value for a form group
       *
       * ```
       * const form = new FormGroup({
       *    first: new FormControl(),
       *    last: new FormControl()
       * });
       * console.log(form.value);   // {first: null, last: null}
       *
       * form.patchValue({first: 'Nancy'});
       * console.log(form.value);   // {first: 'Nancy', last: null}
       * ```
       *
       * @param {?} value The object that matches the structure of the group.
       * @param {?=} options Configuration options that determine how the control propagates changes and
       * emits events after the value is patched.
       * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
       * true.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control value is updated.
       * When false, no events are emitted.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       * @return {?}
       */


      patchValue(value, options = {}) {
        Object.keys(value).forEach(
        /**
        * @param {?} name
        * @return {?}
        */
        name => {
          if (this.controls[name]) {
            this.controls[name].patchValue(value[name], {
              onlySelf: true,
              emitEvent: options.emitEvent
            });
          }
        });
        this.updateValueAndValidity(options);
      }
      /**
       * Resets the `FormGroup`, marks all descendants are marked `pristine` and `untouched`, and
       * the value of all descendants to null.
       *
       * You reset to a specific form state by passing in a map of states
       * that matches the structure of your form, with control names as keys. The state
       * is a standalone value or a form state object with both a value and a disabled
       * status.
       *
       * \@usageNotes
       *
       * ### Reset the form group values
       *
       * ```ts
       * const form = new FormGroup({
       *   first: new FormControl('first name'),
       *   last: new FormControl('last name')
       * });
       *
       * console.log(form.value);  // {first: 'first name', last: 'last name'}
       *
       * form.reset({ first: 'name', last: 'last name' });
       *
       * console.log(form.value);  // {first: 'name', last: 'last name'}
       * ```
       *
       * ### Reset the form group values and disabled status
       *
       * ```
       * const form = new FormGroup({
       *   first: new FormControl('first name'),
       *   last: new FormControl('last name')
       * });
       *
       * form.reset({
       *   first: {value: 'name', disabled: true},
       *   last: 'last'
       * });
       *
       * console.log(this.form.value);  // {first: 'name', last: 'last name'}
       * console.log(this.form.get('first').status);  // 'DISABLED'
       * ```
       * @param {?=} value Resets the control with an initial value,
       * or an object that defines the initial value and disabled state.
       *
       * @param {?=} options Configuration options that determine how the control propagates changes
       * and emits events when the group is reset.
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
       * false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is reset.
       * When false, no events are emitted.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       *
       * @return {?}
       */


      reset(value = {}, options = {}) {
        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (control, name) => {
          control.reset(value[name], {
            onlySelf: true,
            emitEvent: options.emitEvent
          });
        });

        this._updatePristine(options);

        this._updateTouched(options);

        this.updateValueAndValidity(options);
      }
      /**
       * The aggregate value of the `FormGroup`, including any disabled controls.
       *
       * Retrieves all values regardless of disabled status.
       * The `value` property is the best way to get the value of the group, because
       * it excludes disabled controls in the `FormGroup`.
       * @return {?}
       */


      getRawValue() {
        return this._reduceChildren({},
        /**
        * @param {?} acc
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (acc, control, name) => {
          acc[name] = control instanceof FormControl ? control.value :
          /** @type {?} */
          control.getRawValue();
          return acc;
        });
      }
      /**
       * \@internal
       * @return {?}
       */


      _syncPendingControls() {
        /** @type {?} */
        let subtreeUpdated = this._reduceChildren(false,
        /**
        * @param {?} updated
        * @param {?} child
        * @return {?}
        */
        (updated, child) => {
          return child._syncPendingControls() ? true : updated;
        });

        if (subtreeUpdated) this.updateValueAndValidity({
          onlySelf: true
        });
        return subtreeUpdated;
      }
      /**
       * \@internal
       * @param {?} name
       * @return {?}
       */


      _throwIfControlMissing(name) {
        if (!Object.keys(this.controls).length) {
          throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }

        if (!this.controls[name]) {
          throw new Error("Cannot find form control with name: ".concat(name, "."));
        }
      }
      /**
       * \@internal
       * @param {?} cb
       * @return {?}
       */


      _forEachChild(cb) {
        Object.keys(this.controls).forEach(
        /**
        * @param {?} k
        * @return {?}
        */
        k => cb(this.controls[k], k));
      }
      /**
       * \@internal
       * @return {?}
       */


      _setUpControls() {
        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          control.setParent(this);

          control._registerOnCollectionChange(this._onCollectionChange);
        });
      }
      /**
       * \@internal
       * @return {?}
       */


      _updateValue() {
        /** @type {?} */
        this.value = this._reduceValue();
      }
      /**
       * \@internal
       * @param {?} condition
       * @return {?}
       */


      _anyControls(condition) {
        /** @type {?} */
        let res = false;

        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (control, name) => {
          res = res || this.contains(name) && condition(control);
        });

        return res;
      }
      /**
       * \@internal
       * @return {?}
       */


      _reduceValue() {
        return this._reduceChildren({},
        /**
        * @param {?} acc
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (acc, control, name) => {
          if (control.enabled || this.disabled) {
            acc[name] = control.value;
          }

          return acc;
        });
      }
      /**
       * \@internal
       * @param {?} initValue
       * @param {?} fn
       * @return {?}
       */


      _reduceChildren(initValue, fn) {
        /** @type {?} */
        let res = initValue;

        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (control, name) => {
          res = fn(res, control, name);
        });

        return res;
      }
      /**
       * \@internal
       * @return {?}
       */


      _allControlsDisabled() {
        for (const controlName of Object.keys(this.controls)) {
          if (this.controls[controlName].enabled) {
            return false;
          }
        }

        return Object.keys(this.controls).length > 0 || this.disabled;
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _checkAllValuesPresent(value) {
        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} name
        * @return {?}
        */
        (control, name) => {
          if (value[name] === undefined) {
            throw new Error("Must supply a value for form control with name: '".concat(name, "'."));
          }
        });
      }

    }

    if (false) {}
    /**
     * Tracks the value and validity state of an array of `FormControl`,
     * `FormGroup` or `FormArray` instances.
     *
     * A `FormArray` aggregates the values of each child `FormControl` into an array.
     * It calculates its status by reducing the status values of its children. For example, if one of
     * the controls in a `FormArray` is invalid, the entire array becomes invalid.
     *
     * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
     * along with `FormControl` and `FormGroup`.
     *
     * \@usageNotes
     *
     * ### Create an array of form controls
     *
     * ```
     * const arr = new FormArray([
     *   new FormControl('Nancy', Validators.minLength(2)),
     *   new FormControl('Drew'),
     * ]);
     *
     * console.log(arr.value);   // ['Nancy', 'Drew']
     * console.log(arr.status);  // 'VALID'
     * ```
     *
     * ### Create a form array with array-level validators
     *
     * You include array-level validators and async validators. These come in handy
     * when you want to perform validation that considers the value of more than one child
     * control.
     *
     * The two types of validators are passed in separately as the second and third arg
     * respectively, or together as part of an options object.
     *
     * ```
     * const arr = new FormArray([
     *   new FormControl('Nancy'),
     *   new FormControl('Drew')
     * ], {validators: myValidator, asyncValidators: myAsyncValidator});
     * ```
     *
     * ### Set the updateOn property for all controls in a form array
     *
     * The options object is used to set a default value for each child
     * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
     * array level, all child controls default to 'blur', unless the child
     * has explicitly specified a different `updateOn` value.
     *
     * ```ts
     * const arr = new FormArray([
     *    new FormControl()
     * ], {updateOn: 'blur'});
     * ```
     *
     * ### Adding or removing controls from a form array
     *
     * To change the controls in the array, use the `push`, `insert`, `removeAt` or `clear` methods
     * in `FormArray` itself. These methods ensure the controls are properly tracked in the
     * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
     * the `FormArray` directly, as that result in strange and unexpected behavior such
     * as broken change detection.
     *
     * \@publicApi
     */


    class FormArray extends AbstractControl {
      /**
       * Creates a new `FormArray` instance.
       *
       * @param {?} controls An array of child controls. Each child control is given an index
       * where it is registered.
       *
       * @param {?=} validatorOrOpts A synchronous validator function, or an array of
       * such functions, or an `AbstractControlOptions` object that contains validation functions
       * and a validation trigger.
       *
       * @param {?=} asyncValidator A single async validator or array of async validator functions
       *
       */
      constructor(controls, validatorOrOpts, asyncValidator) {
        super(coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts));
        this.controls = controls;

        this._initObservables();

        this._setUpdateStrategy(validatorOrOpts);

        this._setUpControls();

        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
      /**
       * Get the `AbstractControl` at the given `index` in the array.
       *
       * @param {?} index Index in the array to retrieve the control
       * @return {?}
       */


      at(index) {
        return this.controls[index];
      }
      /**
       * Insert a new `AbstractControl` at the end of the array.
       *
       * @param {?} control Form control to be inserted
       * @return {?}
       */


      push(control) {
        this.controls.push(control);

        this._registerControl(control);

        this.updateValueAndValidity();

        this._onCollectionChange();
      }
      /**
       * Insert a new `AbstractControl` at the given `index` in the array.
       *
       * @param {?} index Index in the array to insert the control
       * @param {?} control Form control to be inserted
       * @return {?}
       */


      insert(index, control) {
        this.controls.splice(index, 0, control);

        this._registerControl(control);

        this.updateValueAndValidity();
      }
      /**
       * Remove the control at the given `index` in the array.
       *
       * @param {?} index Index in the array to remove the control
       * @return {?}
       */


      removeAt(index) {
        if (this.controls[index]) this.controls[index]._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {});
        this.controls.splice(index, 1);
        this.updateValueAndValidity();
      }
      /**
       * Replace an existing control.
       *
       * @param {?} index Index in the array to replace the control
       * @param {?} control The `AbstractControl` control to replace the existing control
       * @return {?}
       */


      setControl(index, control) {
        if (this.controls[index]) this.controls[index]._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {});
        this.controls.splice(index, 1);

        if (control) {
          this.controls.splice(index, 0, control);

          this._registerControl(control);
        }

        this.updateValueAndValidity();

        this._onCollectionChange();
      }
      /**
       * Length of the control array.
       * @return {?}
       */


      get length() {
        return this.controls.length;
      }
      /**
       * Sets the value of the `FormArray`. It accepts an array that matches
       * the structure of the control.
       *
       * This method performs strict checks, and throws an error if you try
       * to set the value of a control that doesn't exist or if you exclude the
       * value of a control.
       *
       * \@usageNotes
       * ### Set the values for the controls in the form array
       *
       * ```
       * const arr = new FormArray([
       *   new FormControl(),
       *   new FormControl()
       * ]);
       * console.log(arr.value);   // [null, null]
       *
       * arr.setValue(['Nancy', 'Drew']);
       * console.log(arr.value);   // ['Nancy', 'Drew']
       * ```
       *
       * @param {?} value Array of values for the controls
       * @param {?=} options Configure options that determine how the control propagates changes and
       * emits events after the value changes
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
       * is false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control value is updated.
       * When false, no events are emitted.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       * @return {?}
       */


      setValue(value, options = {}) {
        this._checkAllValuesPresent(value);

        value.forEach(
        /**
        * @param {?} newValue
        * @param {?} index
        * @return {?}
        */
        (newValue, index) => {
          this._throwIfControlMissing(index);

          this.at(index).setValue(newValue, {
            onlySelf: true,
            emitEvent: options.emitEvent
          });
        });
        this.updateValueAndValidity(options);
      }
      /**
       * Patches the value of the `FormArray`. It accepts an array that matches the
       * structure of the control, and does its best to match the values to the correct
       * controls in the group.
       *
       * It accepts both super-sets and sub-sets of the array without throwing an error.
       *
       * \@usageNotes
       * ### Patch the values for controls in a form array
       *
       * ```
       * const arr = new FormArray([
       *    new FormControl(),
       *    new FormControl()
       * ]);
       * console.log(arr.value);   // [null, null]
       *
       * arr.patchValue(['Nancy']);
       * console.log(arr.value);   // ['Nancy', null]
       * ```
       *
       * @param {?} value Array of latest values for the controls
       * @param {?=} options Configure options that determine how the control propagates changes and
       * emits events after the value changes
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
       * is false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control value is updated.
       * When false, no events are emitted.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       * @return {?}
       */


      patchValue(value, options = {}) {
        value.forEach(
        /**
        * @param {?} newValue
        * @param {?} index
        * @return {?}
        */
        (newValue, index) => {
          if (this.at(index)) {
            this.at(index).patchValue(newValue, {
              onlySelf: true,
              emitEvent: options.emitEvent
            });
          }
        });
        this.updateValueAndValidity(options);
      }
      /**
       * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
       * value of all descendants to null or null maps.
       *
       * You reset to a specific form state by passing in an array of states
       * that matches the structure of the control. The state is a standalone value
       * or a form state object with both a value and a disabled status.
       *
       * \@usageNotes
       * ### Reset the values in a form array
       *
       * ```ts
       * const arr = new FormArray([
       *    new FormControl(),
       *    new FormControl()
       * ]);
       * arr.reset(['name', 'last name']);
       *
       * console.log(this.arr.value);  // ['name', 'last name']
       * ```
       *
       * ### Reset the values in a form array and the disabled status for the first control
       *
       * ```
       * this.arr.reset([
       *   {value: 'name', disabled: true},
       *   'last'
       * ]);
       *
       * console.log(this.arr.value);  // ['name', 'last name']
       * console.log(this.arr.get(0).status);  // 'DISABLED'
       * ```
       *
       * @param {?=} value Array of values for the controls
       * @param {?=} options Configure options that determine how the control propagates changes and
       * emits events after the value changes
       *
       * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
       * is false.
       * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
       * `valueChanges`
       * observables emit events with the latest status and value when the control is reset.
       * When false, no events are emitted.
       * The configuration options are passed to the {\@link AbstractControl#updateValueAndValidity
       * updateValueAndValidity} method.
       * @return {?}
       */


      reset(value = [], options = {}) {
        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} index
        * @return {?}
        */
        (control, index) => {
          control.reset(value[index], {
            onlySelf: true,
            emitEvent: options.emitEvent
          });
        });

        this._updatePristine(options);

        this._updateTouched(options);

        this.updateValueAndValidity(options);
      }
      /**
       * The aggregate value of the array, including any disabled controls.
       *
       * Reports all values regardless of disabled status.
       * For enabled controls only, the `value` property is the best way to get the value of the array.
       * @return {?}
       */


      getRawValue() {
        return this.controls.map(
        /**
        * @param {?} control
        * @return {?}
        */
        control => {
          return control instanceof FormControl ? control.value :
          /** @type {?} */
          control.getRawValue();
        });
      }
      /**
       * Remove all controls in the `FormArray`.
       *
       * \@usageNotes
       * ### Remove all elements from a FormArray
       *
       * ```ts
       * const arr = new FormArray([
       *    new FormControl(),
       *    new FormControl()
       * ]);
       * console.log(arr.length);  // 2
       *
       * arr.clear();
       * console.log(arr.length);  // 0
       * ```
       *
       * It's a simpler and more efficient alternative to removing all elements one by one:
       *
       * ```ts
       * const arr = new FormArray([
       *    new FormControl(),
       *    new FormControl()
       * ]);
       *
       * while (arr.length) {
       *    arr.removeAt(0);
       * }
       * ```
       * @return {?}
       */


      clear() {
        if (this.controls.length < 1) return;

        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {}));

        this.controls.splice(0);
        this.updateValueAndValidity();
      }
      /**
       * \@internal
       * @return {?}
       */


      _syncPendingControls() {
        /** @type {?} */
        let subtreeUpdated = this.controls.reduce(
        /**
        * @param {?} updated
        * @param {?} child
        * @return {?}
        */
        (updated, child) => {
          return child._syncPendingControls() ? true : updated;
        }, false);
        if (subtreeUpdated) this.updateValueAndValidity({
          onlySelf: true
        });
        return subtreeUpdated;
      }
      /**
       * \@internal
       * @param {?} index
       * @return {?}
       */


      _throwIfControlMissing(index) {
        if (!this.controls.length) {
          throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }

        if (!this.at(index)) {
          throw new Error("Cannot find form control at index ".concat(index));
        }
      }
      /**
       * \@internal
       * @param {?} cb
       * @return {?}
       */


      _forEachChild(cb) {
        this.controls.forEach(
        /**
        * @param {?} control
        * @param {?} index
        * @return {?}
        */
        (control, index) => {
          cb(control, index);
        });
      }
      /**
       * \@internal
       * @return {?}
       */


      _updateValue() {
        /** @type {?} */
        this.value = this.controls.filter(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.enabled || this.disabled).map(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.value);
      }
      /**
       * \@internal
       * @param {?} condition
       * @return {?}
       */


      _anyControls(condition) {
        return this.controls.some(
        /**
        * @param {?} control
        * @return {?}
        */
        control => control.enabled && condition(control));
      }
      /**
       * \@internal
       * @return {?}
       */


      _setUpControls() {
        this._forEachChild(
        /**
        * @param {?} control
        * @return {?}
        */
        control => this._registerControl(control));
      }
      /**
       * \@internal
       * @param {?} value
       * @return {?}
       */


      _checkAllValuesPresent(value) {
        this._forEachChild(
        /**
        * @param {?} control
        * @param {?} i
        * @return {?}
        */
        (control, i) => {
          if (value[i] === undefined) {
            throw new Error("Must supply a value for form control at index: ".concat(i, "."));
          }
        });
      }
      /**
       * \@internal
       * @return {?}
       */


      _allControlsDisabled() {
        for (const control of this.controls) {
          if (control.enabled) return false;
        }

        return this.controls.length > 0 || this.disabled;
      }
      /**
       * @private
       * @param {?} control
       * @return {?}
       */


      _registerControl(control) {
        control.setParent(this);

        control._registerOnCollectionChange(this._onCollectionChange);
      }

    }

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const formDirectiveProvider = {
      provide: ControlContainer,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => NgForm)
    };

    const ɵ0 =
    /**
    * @return {?}
    */
    () => Promise.resolve(null);
    /** @type {?} */


    const resolvedPromise = ɵ0();
    /**
     * \@description
     * Creates a top-level `FormGroup` instance and binds it to a form
     * to track aggregate form value and validation status.
     *
     * As soon as you import the `FormsModule`, this directive becomes active by default on
     * all `<form>` tags.  You don't need to add a special selector.
     *
     * You optionally export the directive into a local template variable using `ngForm` as the key
     * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
     * `FormGroup` instance are duplicated on the directive itself, so a reference to it
     * gives you access to the aggregate value and validity status of the form, as well as
     * user interaction properties like `dirty` and `touched`.
     *
     * To register child controls with the form, use `NgModel` with a `name`
     * attribute. You may use `NgModelGroup` to create sub-groups within the form.
     *
     * If necessary, listen to the directive's `ngSubmit` event to be notified when the user has
     * triggered a form submission. The `ngSubmit` event emits the original form
     * submission event.
     *
     * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
     * To import the `FormsModule` but skip its usage in some forms,
     * for example, to use native HTML5 validation, add the `ngNoForm` and the `<form>`
     * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
     * unnecessary because the `<form>` tags are inert. In that case, you would
     * refrain from using the `formGroup` directive.
     *
     * \@usageNotes
     *
     * ### Migrating from deprecated ngForm selector
     *
     * Support for using `ngForm` element selector has been deprecated in Angular v6 and will be removed
     * in Angular v9.
     *
     * This has been deprecated to keep selectors consistent with other core Angular selectors,
     * as element selectors are typically written in kebab-case.
     *
     * Now deprecated:
     * ```html
     * <ngForm #myForm="ngForm">
     * ```
     *
     * After:
     * ```html
     * <ng-form #myForm="ngForm">
     * ```
     *
     * ### Listening for form submission
     *
     * The following example shows how to capture the form values from the "ngSubmit" event.
     *
     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
     *
     * ### Setting the update options
     *
     * The following example shows you how to change the "updateOn" option from its default using
     * ngFormOptions.
     *
     * ```html
     * <form [ngFormOptions]="{updateOn: 'blur'}">
     *    <input name="one" ngModel>  <!-- this ngModel will update on blur -->
     * </form>
     * ```
     *
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NgForm extends ControlContainer {
      /**
       * @param {?} validators
       * @param {?} asyncValidators
       */
      constructor(validators, asyncValidators) {
        super();
        /**
         * \@description
         * Returns whether the form submission has been triggered.
         */

        this.submitted = false;
        this._directives = [];
        /**
         * \@description
         * Event emitter for the "ngSubmit" event
         */

        this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
      }
      /**
       * \@description
       * Lifecycle method called after the view is initialized. For internal use only.
       * @return {?}
       */


      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      /**
       * \@description
       * The directive instance.
       * @return {?}
       */


      get formDirective() {
        return this;
      }
      /**
       * \@description
       * The internal `FormGroup` instance.
       * @return {?}
       */


      get control() {
        return this.form;
      }
      /**
       * \@description
       * Returns an array representing the path to this group. Because this directive
       * always lives at the top level of a form, it is always an empty array.
       * @return {?}
       */


      get path() {
        return [];
      }
      /**
       * \@description
       * Returns a map of the controls in this group.
       * @return {?}
       */


      get controls() {
        return this.form.controls;
      }
      /**
       * \@description
       * Method that sets up the control directive in this group, re-calculates its value
       * and validity, and adds the instance to the internal list of directives.
       *
       * @param {?} dir The `NgModel` directive instance.
       * @return {?}
       */


      addControl(dir) {
        resolvedPromise.then(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const container = this._findContainer(dir.path);

          /** @type {?} */
          dir.control =
          /** @type {?} */
          container.registerControl(dir.name, dir.control);
          setUpControl(dir.control, dir);
          dir.control.updateValueAndValidity({
            emitEvent: false
          });

          this._directives.push(dir);
        });
      }
      /**
       * \@description
       * Retrieves the `FormControl` instance from the provided `NgModel` directive.
       *
       * @param {?} dir The `NgModel` directive instance.
       * @return {?}
       */


      getControl(dir) {
        return (
          /** @type {?} */
          this.form.get(dir.path)
        );
      }
      /**
       * \@description
       * Removes the `NgModel` instance from the internal list of directives
       *
       * @param {?} dir The `NgModel` directive instance.
       * @return {?}
       */


      removeControl(dir) {
        resolvedPromise.then(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const container = this._findContainer(dir.path);

          if (container) {
            container.removeControl(dir.name);
          }

          removeDir(this._directives, dir);
        });
      }
      /**
       * \@description
       * Adds a new `NgModelGroup` directive instance to the form.
       *
       * @param {?} dir The `NgModelGroup` directive instance.
       * @return {?}
       */


      addFormGroup(dir) {
        resolvedPromise.then(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const container = this._findContainer(dir.path);
          /** @type {?} */


          const group = new FormGroup({});
          setUpFormContainer(group, dir);
          container.registerControl(dir.name, group);
          group.updateValueAndValidity({
            emitEvent: false
          });
        });
      }
      /**
       * \@description
       * Removes the `NgModelGroup` directive instance from the form.
       *
       * @param {?} dir The `NgModelGroup` directive instance.
       * @return {?}
       */


      removeFormGroup(dir) {
        resolvedPromise.then(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const container = this._findContainer(dir.path);

          if (container) {
            container.removeControl(dir.name);
          }
        });
      }
      /**
       * \@description
       * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
       *
       * @param {?} dir The `NgModelGroup` directive instance.
       * @return {?}
       */


      getFormGroup(dir) {
        return (
          /** @type {?} */
          this.form.get(dir.path)
        );
      }
      /**
       * Sets the new value for the provided `NgControl` directive.
       *
       * @param {?} dir The `NgControl` directive instance.
       * @param {?} value The new value for the directive's control.
       * @return {?}
       */


      updateModel(dir, value) {
        resolvedPromise.then(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const ctrl =
          /** @type {?} */
          this.form.get(
          /** @type {?} */
          dir.path);
          ctrl.setValue(value);
        });
      }
      /**
       * \@description
       * Sets the value for this `FormGroup`.
       *
       * @param {?} value The new value
       * @return {?}
       */


      setValue(value) {
        this.control.setValue(value);
      }
      /**
       * \@description
       * Method called when the "submit" event is triggered on the form.
       * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
       *
       * @param {?} $event The "submit" event object
       * @return {?}
       */


      onSubmit($event) {
        /** @type {?} */
        this.submitted = true;
        syncPendingControls(this.form, this._directives);
        this.ngSubmit.emit($event);
        return false;
      }
      /**
       * \@description
       * Method called when the "reset" event is triggered on the form.
       * @return {?}
       */


      onReset() {
        this.resetForm();
      }
      /**
       * \@description
       * Resets the form to an initial value and resets its submitted status.
       *
       * @param {?=} value The new value for the form.
       * @return {?}
       */


      resetForm(value = undefined) {
        this.form.reset(value);

        /** @type {?} */
        this.submitted = false;
      }
      /**
       * @private
       * @return {?}
       */


      _setUpdateStrategy() {
        if (this.options && this.options.updateOn != null) {
          this.form._updateOn = this.options.updateOn;
        }
      }
      /**
       * \@internal
       * @param {?} path
       * @return {?}
       */


      _findContainer(path) {
        path.pop();
        return path.length ?
        /** @type {?} */
        this.form.get(path) : this.form;
      }

    }

    NgForm.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,ng-form,[ngForm]',
        providers: [formDirectiveProvider],
        host: {
          '(submit)': 'onSubmit($event)',
          '(reset)': 'onReset()'
        },
        outputs: ['ngSubmit'],
        exportAs: 'ngForm'
      }]
    }];
    /** @nocollapse */

    NgForm.ctorParameters = () => [{
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];

    NgForm.propDecorators = {
      options: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngFormOptions']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    class TemplateDrivenErrors {
      /**
       * @return {?}
       */
      static modelParentException() {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      ".concat(FormErrorExamples.formControlName, "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      ").concat(FormErrorExamples.ngModelWithFormGroup));
      }
      /**
       * @return {?}
       */


      static formGroupNameException() {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ".concat(FormErrorExamples.formGroupName, "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ").concat(FormErrorExamples.ngModelGroup));
      }
      /**
       * @return {?}
       */


      static missingNameException() {
        throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
      }
      /**
       * @return {?}
       */


      static modelGroupParentException() {
        throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ".concat(FormErrorExamples.formGroupName, "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ").concat(FormErrorExamples.ngModelGroup));
      }
      /**
       * @return {?}
       */


      static ngFormWarning() {
        console.warn("\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    ");
      }

    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     * `InjectionToken` to provide to turn off the warning when using 'ngForm' deprecated selector.
     * @type {?}
     */


    const NG_FORM_SELECTOR_WARNING = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NgFormSelectorWarning');
    /**
     * This directive is solely used to display warnings when the deprecated `ngForm` selector is used.
     *
     * @deprecated in Angular v6 and will be removed in Angular v9.
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NgFormSelectorWarning {
      /**
       * @param {?} ngFormWarning
       */
      constructor(ngFormWarning) {
        if ((!ngFormWarning || ngFormWarning === 'once') && !NgFormSelectorWarning._ngFormWarning || ngFormWarning === 'always') {
          TemplateDrivenErrors.ngFormWarning();
          NgFormSelectorWarning._ngFormWarning = true;
        }
      }

    }
    /**
     * Static property used to track whether the deprecation warning for this selector has been sent.
     * Used to support warning config of "once".
     *
     * \@internal
     */


    NgFormSelectorWarning._ngFormWarning = false;
    NgFormSelectorWarning.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'ngForm'
      }]
    }];
    /** @nocollapse */

    NgFormSelectorWarning.ctorParameters = () => [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_FORM_SELECTOR_WARNING]
      }]
    }];

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
     *
     * \@publicApi
     */


    class AbstractFormGroupDirective extends ControlContainer {
      /**
       * \@description
       * An internal callback method triggered on the instance after the inputs are set.
       * Registers the group with its parent group.
       * @return {?}
       */
      ngOnInit() {
        this._checkParentType();

        /** @type {?} */
        this.formDirective.addFormGroup(this);
      }
      /**
       * \@description
       * An internal callback method triggered before the instance is destroyed.
       * Removes the group from its parent group.
       * @return {?}
       */


      ngOnDestroy() {
        if (this.formDirective) {
          this.formDirective.removeFormGroup(this);
        }
      }
      /**
       * \@description
       * The `FormGroup` bound to this directive.
       * @return {?}
       */


      get control() {
        return (
          /** @type {?} */
          this.formDirective.getFormGroup(this)
        );
      }
      /**
       * \@description
       * The path to this group from the top-level directive.
       * @return {?}
       */


      get path() {
        return controlPath(this.name, this._parent);
      }
      /**
       * \@description
       * The top-level directive for this group if present, otherwise null.
       * @return {?}
       */


      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      /**
       * \@description
       * The synchronous validators registered with this group.
       * @return {?}
       */


      get validator() {
        return composeValidators(this._validators);
      }
      /**
       * \@description
       * The async validators registered with this group.
       * @return {?}
       */


      get asyncValidator() {
        return composeAsyncValidators(this._asyncValidators);
      }
      /**
       * \@internal
       * @return {?}
       */


      _checkParentType() {}

    }

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const modelGroupProvider = {
      provide: ControlContainer,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => NgModelGroup)
    };
    /**
     * \@description
     * Creates and binds a `FormGroup` instance to a DOM element.
     *
     * This directive can only be used as a child of `NgForm` (within `<form>` tags).
     *
     * Use this directive to validate a sub-group of your form separately from the
     * rest of your form, or if some values in your domain model make more sense
     * to consume together in a nested object.
     *
     * Provide a name for the sub-group and it will become the key
     * for the sub-group in the form's full value. If you need direct access, export the directive into
     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
     *
     * \@usageNotes
     *
     * ### Consuming controls in a grouping
     *
     * The following example shows you how to combine controls together in a sub-group
     * of the form.
     *
     * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
     *
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NgModelGroup extends AbstractFormGroupDirective {
      /**
       * @param {?} parent
       * @param {?} validators
       * @param {?} asyncValidators
       */
      constructor(parent, validators, asyncValidators) {
        super();
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
      }
      /**
       * \@internal
       * @return {?}
       */


      _checkParentType() {
        if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
          TemplateDrivenErrors.modelGroupParentException();
        }
      }

    }

    NgModelGroup.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ngModelGroup]',
        providers: [modelGroupProvider],
        exportAs: 'ngModelGroup'
      }]
    }];
    /** @nocollapse */

    NgModelGroup.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];

    NgModelGroup.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngModelGroup']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const formControlBinding = {
      provide: NgControl,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => NgModel)
    };

    const ɵ0$1 =
    /**
    * @return {?}
    */
    () => Promise.resolve(null);
    /**
     * `ngModel` forces an additional change detection run when its inputs change:
     * E.g.:
     * ```
     * <div>{{myModel.valid}}</div>
     * <input [(ngModel)]="myValue" #myModel="ngModel">
     * ```
     * I.e. `ngModel` can export itself on the element and then be used in the template.
     * Normally, this would result in expressions before the `input` that use the exported directive
     * to have and old value as they have been
     * dirty checked before. As this is a very common case for `ngModel`, we added this second change
     * detection run.
     *
     * Notes:
     * - this is just one extra run no matter how many `ngModel` have been changed.
     * - this is a general problem when using `exportAs` for directives!
     * @type {?}
     */


    const resolvedPromise$1 = ɵ0$1();
    /**
     * \@description
     * Creates a `FormControl` instance from a domain model and binds it
     * to a form control element.
     *
     * The `FormControl` instance tracks the value, user interaction, and
     * validation status of the control and keeps the view synced with the model. If used
     * within a parent form, the directive also registers itself with the form as a child
     * control.
     *
     * This directive is used by itself or as part of a larger form. Use the
     * `ngModel` selector to activate it.
     *
     * It accepts a domain model as an optional `Input`. If you have a one-way binding
     * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
     * class sets the value in the view. If you have a two-way binding with `[()]` syntax
     * (also known as 'banana-box syntax'), the value in the UI always syncs back to
     * the domain model in your class.
     *
     * To inspect the properties of the associated `FormControl` (like validity state),
     * export the directive into a local template variable using `ngModel` as the key (ex: `#myVar="ngModel"`).
     * You then access the control using the directive's `control` property,
     * but most properties used (like `valid` and `dirty`) fall through to the control anyway for direct access.
     * See a full list of properties directly available in `AbstractControlDirective`.
     *
     * @see `RadioControlValueAccessor`
     * @see `SelectControlValueAccessor`
     *
     * \@usageNotes
     *
     * ### Using ngModel on a standalone control
     *
     * The following examples show a simple standalone control using `ngModel`:
     *
     * {\@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
     *
     * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
     * so that the control can be registered with the parent form under that name.
     *
     * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
     * as the parent form syncs the value for you. You access its properties by exporting it into a
     * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
     * needed on form submission.
     *
     * If you do need to populate initial values into your form, using a one-way binding for
     * `ngModel` tends to be sufficient as long as you use the exported form's value rather
     * than the domain model's value on submit.
     *
     * ### Using ngModel within a form
     *
     * The following example shows controls using `ngModel` within a form:
     *
     * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
     *
     * ### Using a standalone ngModel within a group
     *
     * The following example shows you how to use a standalone ngModel control
     * within a form. This controls the display of the form, but doesn't contain form data.
     *
     * ```html
     * <form>
     *   <input name="login" ngModel placeholder="Login">
     *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
     * </form>
     * <!-- form value: {login: ''} -->
     * ```
     *
     * ### Setting the ngModel name attribute through options
     *
     * The following example shows you an alternate way to set the name attribute. The name attribute is used
     * within a custom form component, and the name `\@Input` property serves a different purpose.
     *
     * ```html
     * <form>
     *   <my-person-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
     *   </my-person-control>
     * </form>
     * <!-- form value: {user: ''} -->
     * ```
     *
     * \@ngModule FormsModule
     * \@publicApi
     */

    class NgModel extends NgControl {
      /**
       * @param {?} parent
       * @param {?} validators
       * @param {?} asyncValidators
       * @param {?} valueAccessors
       */
      constructor(parent, validators, asyncValidators, valueAccessors) {
        super();
        this.control = new FormControl();
        /**
         * \@internal
         */

        this._registered = false;
        /**
         * \@description
         * Event emitter for producing the `ngModelChange` event after
         * the view model updates.
         */

        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._parent = parent;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use
       * only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */


      ngOnChanges(changes) {
        this._checkForErrors();

        if (!this._registered) this._setUpControl();

        if ('isDisabled' in changes) {
          this._updateDisabled(changes);
        }

        if (isPropertyUpdated(changes, this.viewModel)) {
          this._updateValue(this.model);

          this.viewModel = this.model;
        }
      }
      /**
       * \@description
       * Lifecycle method called before the directive's instance is destroyed. For internal
       * use only.
       * @return {?}
       */


      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      /**
       * \@description
       * Returns an array that represents the path from the top-level form to this control.
       * Each index is the string name of the control on that level.
       * @return {?}
       */


      get path() {
        return this._parent ? controlPath(this.name, this._parent) : [this.name];
      }
      /**
       * \@description
       * The top-level directive for this control if present, otherwise null.
       * @return {?}
       */


      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      /**
       * \@description
       * Synchronous validator function composed of all the synchronous validators
       * registered with this directive.
       * @return {?}
       */


      get validator() {
        return composeValidators(this._rawValidators);
      }
      /**
       * \@description
       * Async validator function composed of all the async validators registered with this
       * directive.
       * @return {?}
       */


      get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
      }
      /**
       * \@description
       * Sets the new value for the view model and emits an `ngModelChange` event.
       *
       * @param {?} newValue The new value emitted by `ngModelChange`.
       * @return {?}
       */


      viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
      }
      /**
       * @private
       * @return {?}
       */


      _setUpControl() {
        this._setUpdateStrategy();

        this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
        this._registered = true;
      }
      /**
       * @private
       * @return {?}
       */


      _setUpdateStrategy() {
        if (this.options && this.options.updateOn != null) {
          this.control._updateOn = this.options.updateOn;
        }
      }
      /**
       * @private
       * @return {?}
       */


      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      /**
       * @private
       * @return {?}
       */


      _setUpStandalone() {
        setUpControl(this.control, this);
        this.control.updateValueAndValidity({
          emitEvent: false
        });
      }
      /**
       * @private
       * @return {?}
       */


      _checkForErrors() {
        if (!this._isStandalone()) {
          this._checkParentType();
        }

        this._checkName();
      }
      /**
       * @private
       * @return {?}
       */


      _checkParentType() {
        if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
          TemplateDrivenErrors.formGroupNameException();
        } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
          TemplateDrivenErrors.modelParentException();
        }
      }
      /**
       * @private
       * @return {?}
       */


      _checkName() {
        if (this.options && this.options.name) this.name = this.options.name;

        if (!this._isStandalone() && !this.name) {
          TemplateDrivenErrors.missingNameException();
        }
      }
      /**
       * @private
       * @param {?} value
       * @return {?}
       */


      _updateValue(value) {
        resolvedPromise$1.then(
        /**
        * @return {?}
        */
        () => {
          this.control.setValue(value, {
            emitViewToModelChange: false
          });
        });
      }
      /**
       * @private
       * @param {?} changes
       * @return {?}
       */


      _updateDisabled(changes) {
        /** @type {?} */
        const disabledValue = changes['isDisabled'].currentValue;
        /** @type {?} */

        const isDisabled = disabledValue === '' || disabledValue && disabledValue !== 'false';
        resolvedPromise$1.then(
        /**
        * @return {?}
        */
        () => {
          if (isDisabled && !this.control.disabled) {
            this.control.disable();
          } else if (!isDisabled && this.control.disabled) {
            this.control.enable();
          }
        });
      }

    }

    NgModel.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        providers: [formControlBinding],
        exportAs: 'ngModel'
      }]
    }];
    /** @nocollapse */

    NgModel.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALUE_ACCESSOR]
      }]
    }];

    NgModel.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      isDisabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['disabled']
      }],
      model: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngModel']
      }],
      options: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngModelOptions']
      }],
      update: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['ngModelChange']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     *
     * Adds `novalidate` attribute to all forms by default.
     *
     * `novalidate` is used to disable browser's native form validation.
     *
     * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
     *
     * ```
     * <form ngNativeValidate></form>
     * ```
     *
     * \@publicApi
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     */


    class ɵNgNoValidate {}

    ɵNgNoValidate.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
        host: {
          'novalidate': ''
        }
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Token to provide to turn off the ngModel warning on formControl and formControlName.
     * @type {?}
     */

    const NG_MODEL_WITH_FORM_CONTROL_WARNING = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NgModelWithFormControlWarning');
    /** @type {?} */

    const formControlBinding$1 = {
      provide: NgControl,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => FormControlDirective)
    };
    /**
     * \@description
     * * Syncs a standalone `FormControl` instance to a form control element.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `FormControl`
     * @see `AbstractControl`
     *
     * \@usageNotes
     *
     * ### Registering a single form control
     *
     * The following examples shows how to register a standalone control and set its value.
     *
     * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
     *
     * ### Use with ngModel
     *
     * Support for using the `ngModel` input property and `ngModelChange` event with reactive
     * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
     *
     * Now deprecated:
     *
     * ```html
     * <input [formControl]="control" [(ngModel)]="value">
     * ```
     *
     * ```ts
     * this.value = 'some value';
     * ```
     *
     * This has been deprecated for a few reasons. First, developers have found this pattern
     * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
     * an input/output property named `ngModel` on the reactive form directive that simply
     * approximates (some of) its behavior. Specifically, it allows getting/setting the value
     * and intercepting value events. However, some of `ngModel`'s other features - like
     * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
     * which has understandably caused some confusion.
     *
     * In addition, this pattern mixes template-driven and reactive forms strategies, which
     * we generally don't recommend because it doesn't take advantage of the full benefits of
     * either strategy. Setting the value in the template violates the template-agnostic
     * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
     * the class removes the convenience of defining forms in the template.
     *
     * To update your code before v7, you'll want to decide whether to stick with reactive form
     * directives (and get/set values using reactive forms patterns) or switch over to
     * template-driven directives.
     *
     * After (choice 1 - use reactive forms):
     *
     * ```html
     * <input [formControl]="control">
     * ```
     *
     * ```ts
     * this.control.setValue('some value');
     * ```
     *
     * After (choice 2 - use template-driven forms):
     *
     * ```html
     * <input [(ngModel)]="value">
     * ```
     *
     * ```ts
     * this.value = 'some value';
     * ```
     *
     * By default, when you use this pattern, you will see a deprecation warning once in dev
     * mode. You can choose to silence this warning by providing a config for
     * `ReactiveFormsModule` at import time:
     *
     * ```ts
     * imports: [
     *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
     * ]
     * ```
     *
     * Alternatively, you can choose to surface a separate warning for each instance of this
     * pattern with a config value of `"always"`. This may help to track down where in the code
     * the pattern is being used as the code is being updated.
     *
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class FormControlDirective extends NgControl {
      /**
       * @param {?} validators
       * @param {?} asyncValidators
       * @param {?} valueAccessors
       * @param {?} _ngModelWarningConfig
       */
      constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
        super();
        this._ngModelWarningConfig = _ngModelWarningConfig;
        /**
         * @deprecated as of v6
         */

        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * \@description
         * Instance property used to track whether an ngModel warning has been sent out for this
         * particular `FormControlDirective` instance. Used to support warning config of "always".
         *
         * \@internal
         */

        this._ngModelWarningSent = false;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      /**
       * \@description
       * Triggers a warning that this input should not be used with reactive forms.
       * @param {?} isDisabled
       * @return {?}
       */


      set isDisabled(isDisabled) {
        ReactiveErrors.disabledAttrWarning();
      }
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use
       * only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */


      ngOnChanges(changes) {
        if (this._isControlChanged(changes)) {
          setUpControl(this.form, this);

          if (this.control.disabled &&
          /** @type {?} */
          this.valueAccessor.setDisabledState) {
            /** @type {?} */

            /** @type {?} */
            this.valueAccessor.setDisabledState(true);
          }

          this.form.updateValueAndValidity({
            emitEvent: false
          });
        }

        if (isPropertyUpdated(changes, this.viewModel)) {
          _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);

          this.form.setValue(this.model);
          this.viewModel = this.model;
        }
      }
      /**
       * \@description
       * Returns an array that represents the path from the top-level form to this control.
       * Each index is the string name of the control on that level.
       * @return {?}
       */


      get path() {
        return [];
      }
      /**
       * \@description
       * Synchronous validator function composed of all the synchronous validators
       * registered with this directive.
       * @return {?}
       */


      get validator() {
        return composeValidators(this._rawValidators);
      }
      /**
       * \@description
       * Async validator function composed of all the async validators registered with this
       * directive.
       * @return {?}
       */


      get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
      }
      /**
       * \@description
       * The `FormControl` bound to this directive.
       * @return {?}
       */


      get control() {
        return this.form;
      }
      /**
       * \@description
       * Sets the new value for the view model and emits an `ngModelChange` event.
       *
       * @param {?} newValue The new value for the view model.
       * @return {?}
       */


      viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
      }
      /**
       * @private
       * @param {?} changes
       * @return {?}
       */


      _isControlChanged(changes) {
        return changes.hasOwnProperty('form');
      }

    }
    /**
     * \@description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * \@internal
     */


    FormControlDirective._ngModelWarningSentOnce = false;
    FormControlDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formControl]',
        providers: [formControlBinding$1],
        exportAs: 'ngForm'
      }]
    }];
    /** @nocollapse */

    FormControlDirective.ctorParameters = () => [{
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALUE_ACCESSOR]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
      }]
    }];

    FormControlDirective.propDecorators = {
      form: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['formControl']
      }],
      isDisabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['disabled']
      }],
      model: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngModel']
      }],
      update: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['ngModelChange']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const formDirectiveProvider$1 = {
      provide: ControlContainer,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => FormGroupDirective)
    };
    /**
     * \@description
     *
     * Binds an existing `FormGroup` to a DOM element.
     *
     * This directive accepts an existing `FormGroup` instance. It will then use this
     * `FormGroup` instance to match any child `FormControl`, `FormGroup`,
     * and `FormArray` instances to child `FormControlName`, `FormGroupName`,
     * and `FormArrayName` directives.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `AbstractControl`
     *
     * ### Register Form Group
     *
     * The following example registers a `FormGroup` with first name and last name controls,
     * and listens for the *ngSubmit* event when the button is clicked.
     *
     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
     *
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class FormGroupDirective extends ControlContainer {
      /**
       * @param {?} _validators
       * @param {?} _asyncValidators
       */
      constructor(_validators, _asyncValidators) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        /**
         * \@description
         * Reports whether the form submission has been triggered.
         */

        this.submitted = false;
        /**
         * \@description
         * Tracks the list of added `FormControlName` instances
         */

        this.directives = [];
        /**
         * \@description
         * Tracks the `FormGroup` bound to this directive.
         */

        this.form =
        /** @type {?} */
        null;
        /**
         * \@description
         * Emits an event when the form submission has been triggered.
         */

        this.ngSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
      }
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */


      ngOnChanges(changes) {
        this._checkFormPresent();

        if (changes.hasOwnProperty('form')) {
          this._updateValidators();

          this._updateDomValue();

          this._updateRegistrations();
        }
      }
      /**
       * \@description
       * Returns this directive's instance.
       * @return {?}
       */


      get formDirective() {
        return this;
      }
      /**
       * \@description
       * Returns the `FormGroup` bound to this directive.
       * @return {?}
       */


      get control() {
        return this.form;
      }
      /**
       * \@description
       * Returns an array representing the path to this group. Because this directive
       * always lives at the top level of a form, it always an empty array.
       * @return {?}
       */


      get path() {
        return [];
      }
      /**
       * \@description
       * Method that sets up the control directive in this group, re-calculates its value
       * and validity, and adds the instance to the internal list of directives.
       *
       * @param {?} dir The `FormControlName` directive instance.
       * @return {?}
       */


      addControl(dir) {
        /** @type {?} */
        const ctrl = this.form.get(dir.path);
        setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({
          emitEvent: false
        });
        this.directives.push(dir);
        return ctrl;
      }
      /**
       * \@description
       * Retrieves the `FormControl` instance from the provided `FormControlName` directive
       *
       * @param {?} dir The `FormControlName` directive instance.
       * @return {?}
       */


      getControl(dir) {
        return (
          /** @type {?} */
          this.form.get(dir.path)
        );
      }
      /**
       * \@description
       * Removes the `FormControlName` instance from the internal list of directives
       *
       * @param {?} dir The `FormControlName` directive instance.
       * @return {?}
       */


      removeControl(dir) {
        removeDir(this.directives, dir);
      }
      /**
       * Adds a new `FormGroupName` directive instance to the form.
       *
       * @param {?} dir The `FormGroupName` directive instance.
       * @return {?}
       */


      addFormGroup(dir) {
        /** @type {?} */
        const ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({
          emitEvent: false
        });
      }
      /**
       * No-op method to remove the form group.
       *
       * @param {?} dir The `FormGroupName` directive instance.
       * @return {?}
       */


      removeFormGroup(dir) {}
      /**
       * \@description
       * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
       *
       * @param {?} dir The `FormGroupName` directive instance.
       * @return {?}
       */


      getFormGroup(dir) {
        return (
          /** @type {?} */
          this.form.get(dir.path)
        );
      }
      /**
       * Adds a new `FormArrayName` directive instance to the form.
       *
       * @param {?} dir The `FormArrayName` directive instance.
       * @return {?}
       */


      addFormArray(dir) {
        /** @type {?} */
        const ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({
          emitEvent: false
        });
      }
      /**
       * No-op method to remove the form array.
       *
       * @param {?} dir The `FormArrayName` directive instance.
       * @return {?}
       */


      removeFormArray(dir) {}
      /**
       * \@description
       * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
       *
       * @param {?} dir The `FormArrayName` directive instance.
       * @return {?}
       */


      getFormArray(dir) {
        return (
          /** @type {?} */
          this.form.get(dir.path)
        );
      }
      /**
       * Sets the new value for the provided `FormControlName` directive.
       *
       * @param {?} dir The `FormControlName` directive instance.
       * @param {?} value The new value for the directive's control.
       * @return {?}
       */


      updateModel(dir, value) {
        /** @type {?} */
        const ctrl =
        /** @type {?} */
        this.form.get(dir.path);
        ctrl.setValue(value);
      }
      /**
       * \@description
       * Method called with the "submit" event is triggered on the form.
       * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
       *
       * @param {?} $event The "submit" event object
       * @return {?}
       */


      onSubmit($event) {
        /** @type {?} */
        this.submitted = true;
        syncPendingControls(this.form, this.directives);
        this.ngSubmit.emit($event);
        return false;
      }
      /**
       * \@description
       * Method called when the "reset" event is triggered on the form.
       * @return {?}
       */


      onReset() {
        this.resetForm();
      }
      /**
       * \@description
       * Resets the form to an initial value and resets its submitted status.
       *
       * @param {?=} value The new value for the form.
       * @return {?}
       */


      resetForm(value = undefined) {
        this.form.reset(value);

        /** @type {?} */
        this.submitted = false;
      }
      /**
       * \@internal
       * @return {?}
       */


      _updateDomValue() {
        this.directives.forEach(
        /**
        * @param {?} dir
        * @return {?}
        */
        dir => {
          /** @type {?} */
          const newCtrl = this.form.get(dir.path);

          if (dir.control !== newCtrl) {
            cleanUpControl(dir.control, dir);
            if (newCtrl) setUpControl(newCtrl, dir);

            /** @type {?} */
            dir.control = newCtrl;
          }
        });

        this.form._updateTreeValidity({
          emitEvent: false
        });
      }
      /**
       * @private
       * @return {?}
       */


      _updateRegistrations() {
        this.form._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => this._updateDomValue());

        if (this._oldForm) this._oldForm._registerOnCollectionChange(
        /**
        * @return {?}
        */
        () => {});
        this._oldForm = this.form;
      }
      /**
       * @private
       * @return {?}
       */


      _updateValidators() {
        /** @type {?} */
        const sync = composeValidators(this._validators);
        this.form.validator = Validators.compose([
        /** @type {?} */
        this.form.validator,
        /** @type {?} */
        sync]);
        /** @type {?} */

        const async = composeAsyncValidators(this._asyncValidators);
        this.form.asyncValidator = Validators.composeAsync([
        /** @type {?} */
        this.form.asyncValidator,
        /** @type {?} */
        async]);
      }
      /**
       * @private
       * @return {?}
       */


      _checkFormPresent() {
        if (!this.form) {
          ReactiveErrors.missingFormException();
        }
      }

    }

    FormGroupDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formGroup]',
        providers: [formDirectiveProvider$1],
        host: {
          '(submit)': 'onSubmit($event)',
          '(reset)': 'onReset()'
        },
        exportAs: 'ngForm'
      }]
    }];
    /** @nocollapse */

    FormGroupDirective.ctorParameters = () => [{
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];

    FormGroupDirective.propDecorators = {
      form: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['formGroup']
      }],
      ngSubmit: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const formGroupNameProvider = {
      provide: ControlContainer,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => FormGroupName)
    };
    /**
     * \@description
     *
     * Syncs a nested `FormGroup` to a DOM element.
     *
     * This directive can only be used with a parent `FormGroupDirective`.
     *
     * It accepts the string name of the nested `FormGroup` to link, and
     * looks for a `FormGroup` registered with that name in the parent
     * `FormGroup` instance you passed into `FormGroupDirective`.
     *
     * Use nested form groups to validate a sub-group of a
     * form separately from the rest or to group the values of certain
     * controls into their own nested object.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     *
     * \@usageNotes
     *
     * ### Access the group by name
     *
     * The following example uses the {\@link AbstractControl#get get} method to access the
     * associated `FormGroup`
     *
     * ```ts
     *   this.form.get('name');
     * ```
     *
     * ### Access individual controls in the group
     *
     * The following example uses the {\@link AbstractControl#get get} method to access
     * individual controls within the group using dot syntax.
     *
     * ```ts
     *   this.form.get('name.first');
     * ```
     *
     * ### Register a nested `FormGroup`.
     *
     * The following example registers a nested *name* `FormGroup` within an existing `FormGroup`,
     * and provides methods to retrieve the nested `FormGroup` and individual controls.
     *
     * {\@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
     *
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class FormGroupName extends AbstractFormGroupDirective {
      /**
       * @param {?} parent
       * @param {?} validators
       * @param {?} asyncValidators
       */
      constructor(parent, validators, asyncValidators) {
        super();
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
      }
      /**
       * \@internal
       * @return {?}
       */


      _checkParentType() {
        if (_hasInvalidParent(this._parent)) {
          ReactiveErrors.groupParentException();
        }
      }

    }

    FormGroupName.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formGroupName]',
        providers: [formGroupNameProvider]
      }]
    }];
    /** @nocollapse */

    FormGroupName.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];

    FormGroupName.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['formGroupName']
      }]
    };

    if (false) {}
    /** @type {?} */


    const formArrayNameProvider = {
      provide: ControlContainer,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => FormArrayName)
    };
    /**
     * \@description
     *
     * Syncs a nested `FormArray` to a DOM element.
     *
     * This directive is designed to be used with a parent `FormGroupDirective` (selector:
     * `[formGroup]`).
     *
     * It accepts the string name of the nested `FormArray` you want to link, and
     * will look for a `FormArray` registered with that name in the parent
     * `FormGroup` instance you passed into `FormGroupDirective`.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `AbstractControl`
     *
     * \@usageNotes
     *
     * ### Example
     *
     * {\@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
     *
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class FormArrayName extends ControlContainer {
      /**
       * @param {?} parent
       * @param {?} validators
       * @param {?} asyncValidators
       */
      constructor(parent, validators, asyncValidators) {
        super();
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
      }
      /**
       * \@description
       * A lifecycle method called when the directive's inputs are initialized. For internal use only.
       *
       * @throws If the directive does not have a valid parent.
       * @return {?}
       */


      ngOnInit() {
        this._checkParentType();

        /** @type {?} */
        this.formDirective.addFormArray(this);
      }
      /**
       * \@description
       * A lifecycle method called before the directive's instance is destroyed. For internal use only.
       * @return {?}
       */


      ngOnDestroy() {
        if (this.formDirective) {
          this.formDirective.removeFormArray(this);
        }
      }
      /**
       * \@description
       * The `FormArray` bound to this directive.
       * @return {?}
       */


      get control() {
        return (
          /** @type {?} */
          this.formDirective.getFormArray(this)
        );
      }
      /**
       * \@description
       * The top-level directive for this group if present, otherwise null.
       * @return {?}
       */


      get formDirective() {
        return this._parent ?
        /** @type {?} */
        this._parent.formDirective : null;
      }
      /**
       * \@description
       * Returns an array that represents the path from the top-level form to this control.
       * Each index is the string name of the control on that level.
       * @return {?}
       */


      get path() {
        return controlPath(this.name, this._parent);
      }
      /**
       * \@description
       * Synchronous validator function composed of all the synchronous validators registered with this
       * directive.
       * @return {?}
       */


      get validator() {
        return composeValidators(this._validators);
      }
      /**
       * \@description
       * Async validator function composed of all the async validators registered with this directive.
       * @return {?}
       */


      get asyncValidator() {
        return composeAsyncValidators(this._asyncValidators);
      }
      /**
       * @private
       * @return {?}
       */


      _checkParentType() {
        if (_hasInvalidParent(this._parent)) {
          ReactiveErrors.arrayParentException();
        }
      }

    }

    FormArrayName.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formArrayName]',
        providers: [formArrayNameProvider]
      }]
    }];
    /** @nocollapse */

    FormArrayName.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];

    FormArrayName.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['formArrayName']
      }]
    };

    if (false) {}
    /**
     * @param {?} parent
     * @return {?}
     */


    function _hasInvalidParent(parent) {
      return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const controlNameBinding = {
      provide: NgControl,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => FormControlName)
    };
    /**
     * \@description
     * Syncs a `FormControl` in an existing `FormGroup` to a form control
     * element by name.
     *
     * @see [Reactive Forms Guide](guide/reactive-forms)
     * @see `FormControl`
     * @see `AbstractControl`
     *
     * \@usageNotes
     *
     * ### Register `FormControl` within a group
     *
     * The following example shows how to register multiple form controls within a form group
     * and set their value.
     *
     * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
     *
     * To see `formControlName` examples with different form control types, see:
     *
     * * Radio buttons: `RadioControlValueAccessor`
     * * Selects: `SelectControlValueAccessor`
     *
     * ### Use with ngModel
     *
     * Support for using the `ngModel` input property and `ngModelChange` event with reactive
     * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
     *
     * Now deprecated:
     *
     * ```html
     * <form [formGroup]="form">
     *   <input formControlName="first" [(ngModel)]="value">
     * </form>
     * ```
     *
     * ```ts
     * this.value = 'some value';
     * ```
     *
     * This has been deprecated for a few reasons. First, developers have found this pattern
     * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
     * an input/output property named `ngModel` on the reactive form directive that simply
     * approximates (some of) its behavior. Specifically, it allows getting/setting the value
     * and intercepting value events. However, some of `ngModel`'s other features - like
     * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
     * which has understandably caused some confusion.
     *
     * In addition, this pattern mixes template-driven and reactive forms strategies, which
     * we generally don't recommend because it doesn't take advantage of the full benefits of
     * either strategy. Setting the value in the template violates the template-agnostic
     * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
     * the class removes the convenience of defining forms in the template.
     *
     * To update your code before v7, you'll want to decide whether to stick with reactive form
     * directives (and get/set values using reactive forms patterns) or switch over to
     * template-driven directives.
     *
     * After (choice 1 - use reactive forms):
     *
     * ```html
     * <form [formGroup]="form">
     *   <input formControlName="first">
     * </form>
     * ```
     *
     * ```ts
     * this.form.get('first').setValue('some value');
     * ```
     *
     * After (choice 2 - use template-driven forms):
     *
     * ```html
     * <input [(ngModel)]="value">
     * ```
     *
     * ```ts
     * this.value = 'some value';
     * ```
     *
     * By default, when you use this pattern, you will see a deprecation warning once in dev
     * mode. You can choose to silence this warning by providing a config for
     * `ReactiveFormsModule` at import time:
     *
     * ```ts
     * imports: [
     *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
     * ]
     * ```
     *
     * Alternatively, you can choose to surface a separate warning for each instance of this
     * pattern with a config value of `"always"`. This may help to track down where in the code
     * the pattern is being used as the code is being updated.
     *
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class FormControlName extends NgControl {
      /**
       * @param {?} parent
       * @param {?} validators
       * @param {?} asyncValidators
       * @param {?} valueAccessors
       * @param {?} _ngModelWarningConfig
       */
      constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
        super();
        this._ngModelWarningConfig = _ngModelWarningConfig;
        this._added = false;
        /**
         * @deprecated as of v6
         */

        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * \@description
         * Instance property used to track whether an ngModel warning has been sent out for this
         * particular FormControlName instance. Used to support warning config of "always".
         *
         * \@internal
         */

        this._ngModelWarningSent = false;
        this._parent = parent;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      /**
       * \@description
       * Triggers a warning that this input should not be used with reactive forms.
       * @param {?} isDisabled
       * @return {?}
       */


      set isDisabled(isDisabled) {
        ReactiveErrors.disabledAttrWarning();
      }
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */


      ngOnChanges(changes) {
        if (!this._added) this._setUpControl();

        if (isPropertyUpdated(changes, this.viewModel)) {
          _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);

          this.viewModel = this.model;
          this.formDirective.updateModel(this, this.model);
        }
      }
      /**
       * \@description
       * Lifecycle method called before the directive's instance is destroyed. For internal use only.
       * @return {?}
       */


      ngOnDestroy() {
        if (this.formDirective) {
          this.formDirective.removeControl(this);
        }
      }
      /**
       * \@description
       * Sets the new value for the view model and emits an `ngModelChange` event.
       *
       * @param {?} newValue The new value for the view model.
       * @return {?}
       */


      viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
      }
      /**
       * \@description
       * Returns an array that represents the path from the top-level form to this control.
       * Each index is the string name of the control on that level.
       * @return {?}
       */


      get path() {
        return controlPath(this.name,
        /** @type {?} */
        this._parent);
      }
      /**
       * \@description
       * The top-level directive for this group if present, otherwise null.
       * @return {?}
       */


      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      /**
       * \@description
       * Synchronous validator function composed of all the synchronous validators
       * registered with this directive.
       * @return {?}
       */


      get validator() {
        return composeValidators(this._rawValidators);
      }
      /**
       * \@description
       * Async validator function composed of all the async validators registered with this
       * directive.
       * @return {?}
       */


      get asyncValidator() {
        return (
          /** @type {?} */
          composeAsyncValidators(this._rawAsyncValidators)
        );
      }
      /**
       * @private
       * @return {?}
       */


      _checkParentType() {
        if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
          ReactiveErrors.ngModelGroupException();
        } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
          ReactiveErrors.controlParentException();
        }
      }
      /**
       * @private
       * @return {?}
       */


      _setUpControl() {
        this._checkParentType();

        /** @type {?} */
        this.control = this.formDirective.addControl(this);

        if (this.control.disabled &&
        /** @type {?} */
        this.valueAccessor.setDisabledState) {
          /** @type {?} */

          /** @type {?} */
          this.valueAccessor.setDisabledState(true);
        }

        this._added = true;
      }

    }
    /**
     * \@description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * \@internal
     */


    FormControlName._ngModelWarningSentOnce = false;
    FormControlName.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[formControlName]',
        providers: [controlNameBinding]
      }]
    }];
    /** @nocollapse */

    FormControlName.ctorParameters = () => [{
      type: ControlContainer,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: Array,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_VALUE_ACCESSOR]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
      }]
    }];

    FormControlName.propDecorators = {
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['formControlName']
      }],
      isDisabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['disabled']
      }],
      model: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
        args: ['ngModel']
      }],
      update: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['ngModelChange']
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@description
     * An interface implemented by classes that perform synchronous validation.
     *
     * \@usageNotes
     *
     * ### Provide a custom validator
     *
     * The following example implements the `Validator` interface to create a
     * validator directive with a custom error key.
     *
     * ```typescript
     * \@Directive({
     *   selector: '[customValidator]',
     *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
     * })
     * class CustomValidatorDirective implements Validator {
     *   validate(control: AbstractControl): ValidationErrors|null {
     *     return {'custom': true};
     *   }
     * }
     * ```
     *
     * \@publicApi
     * @record
     */


    function Validator() {}

    if (false) {}
    /**
     * \@description
     * An interface implemented by classes that perform asynchronous validation.
     *
     * \@usageNotes
     *
     * ### Provide a custom async validator directive
     *
     * The following example implements the `AsyncValidator` interface to create an
     * async validator directive with a custom error key.
     *
     * ```typescript
     * import { of as observableOf } from 'rxjs';
     *
     * \@Directive({
     *   selector: '[customAsyncValidator]',
     *   providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
     * true}]
     * })
     * class CustomAsyncValidatorDirective implements AsyncValidator {
     *   validate(control: AbstractControl): Observable<ValidationErrors|null> {
     *     return observableOf({'custom': true});
     *   }
     * }
     * ```
     *
     * \@publicApi
     * @record
     */


    function AsyncValidator() {}

    if (false) {}
    /**
     * \@description
     * Provider which adds `RequiredValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */


    const REQUIRED_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => RequiredValidator),
      multi: true
    };
    /**
     * \@description
     * Provider which adds `CheckboxRequiredValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */

    const CHECKBOX_REQUIRED_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => CheckboxRequiredValidator),
      multi: true
    };
    /**
     * \@description
     * A directive that adds the `required` validator to any controls marked with the
     * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding a required validator using template-driven forms
     *
     * ```
     * <input name="fullName" ngModel required>
     * ```
     *
     * \@ngModule FormsModule
     * \@ngModule ReactiveFormsModule
     * \@publicApi
     */

    class RequiredValidator {
      /**
       * \@description
       * Tracks changes to the required attribute bound to this directive.
       * @return {?}
       */
      get required() {
        return this._required;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set required(value) {
        this._required = value != null && value !== false && "".concat(value) !== 'false';
        if (this._onChange) this._onChange();
      }
      /**
       * \@description
       * Method that validates whether the control is empty.
       * Returns the validation result if enabled, otherwise null.
       * @param {?} control
       * @return {?}
       */


      validate(control) {
        return this.required ? Validators.required(control) : null;
      }
      /**
       * \@description
       * Registers a callback function to call when the validator inputs change.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnValidatorChange(fn) {
        this._onChange = fn;
      }

    }

    RequiredValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
        providers: [REQUIRED_VALIDATOR],
        host: {
          '[attr.required]': 'required ? "" : null'
        }
      }]
    }];
    RequiredValidator.propDecorators = {
      required: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * A Directive that adds the `required` validator to checkbox controls marked with the
     * `required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding a required checkbox validator using template-driven forms
     *
     * The following example shows how to add a checkbox required validator to an input attached to an ngModel binding.
     *
     * ```
     * <input type="checkbox" name="active" ngModel required>
     * ```
     *
     * \@publicApi
     * \@ngModule FormsModule
     * \@ngModule ReactiveFormsModule
     */


    class CheckboxRequiredValidator extends RequiredValidator {
      /**
       * \@description
       * Method that validates whether or not the checkbox has been checked.
       * Returns the validation result if enabled, otherwise null.
       * @param {?} control
       * @return {?}
       */
      validate(control) {
        return this.required ? Validators.requiredTrue(control) : null;
      }

    }

    CheckboxRequiredValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
        providers: [CHECKBOX_REQUIRED_VALIDATOR],
        host: {
          '[attr.required]': 'required ? "" : null'
        }
      }]
    }];
    /**
     * \@description
     * Provider which adds `EmailValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */

    const EMAIL_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => EmailValidator),
      multi: true
    };
    /**
     * A directive that adds the `email` validator to controls marked with the
     * `email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding an email validator
     *
     * The following example shows how to add an email validator to an input attached to an ngModel binding.
     *
     * ```
     * <input type="email" name="email" ngModel email>
     * <input type="email" name="email" ngModel email="true">
     * <input type="email" name="email" ngModel [email]="true">
     * ```
     *
     * \@publicApi
     * \@ngModule FormsModule
     * \@ngModule ReactiveFormsModule
     */

    class EmailValidator {
      /**
       * \@description
       * Tracks changes to the email attribute bound to this directive.
       * @param {?} value
       * @return {?}
       */
      set email(value) {
        this._enabled = value === '' || value === true || value === 'true';
        if (this._onChange) this._onChange();
      }
      /**
       * \@description
       * Method that validates whether an email address is valid.
       * Returns the validation result if enabled, otherwise null.
       * @param {?} control
       * @return {?}
       */


      validate(control) {
        return this._enabled ? Validators.email(control) : null;
      }
      /**
       * \@description
       * Registers a callback function to call when the validator inputs change.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnValidatorChange(fn) {
        this._onChange = fn;
      }

    }

    EmailValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[email][formControlName],[email][formControl],[email][ngModel]',
        providers: [EMAIL_VALIDATOR]
      }]
    }];
    EmailValidator.propDecorators = {
      email: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * \@description
     * A function that receives a control and synchronously returns a map of
     * validation errors if present, otherwise null.
     *
     * \@publicApi
     * @record
     */


    function ValidatorFn() {}
    /**
     * \@description
     * A function that receives a control and returns a Promise or observable
     * that emits validation errors if present, otherwise null.
     *
     * \@publicApi
     * @record
     */


    function AsyncValidatorFn() {}
    /**
     * \@description
     * Provider which adds `MinLengthValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */


    const MIN_LENGTH_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => MinLengthValidator),
      multi: true
    };
    /**
     * A directive that adds minimum length validation to controls marked with the
     * `minlength` attribute. The directive is provided with the `NG_VALIDATORS` mult-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding a minimum length validator
     *
     * The following example shows how to add a minimum length validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel minlength="4">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class MinLengthValidator {
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use
       * only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */
      ngOnChanges(changes) {
        if ('minlength' in changes) {
          this._createValidator();

          if (this._onChange) this._onChange();
        }
      }
      /**
       * \@description
       * Method that validates whether the value meets a minimum length
       * requirement. Returns the validation result if enabled, otherwise null.
       * @param {?} control
       * @return {?}
       */


      validate(control) {
        return this.minlength == null ? null : this._validator(control);
      }
      /**
       * \@description
       * Registers a callback function to call when the validator inputs change.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnValidatorChange(fn) {
        this._onChange = fn;
      }
      /**
       * @private
       * @return {?}
       */


      _createValidator() {
        this._validator = Validators.minLength(parseInt(this.minlength, 10));
      }

    }

    MinLengthValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
        providers: [MIN_LENGTH_VALIDATOR],
        host: {
          '[attr.minlength]': 'minlength ? minlength : null'
        }
      }]
    }];
    MinLengthValidator.propDecorators = {
      minlength: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * \@description
     * Provider which adds `MaxLengthValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */


    const MAX_LENGTH_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => MaxLengthValidator),
      multi: true
    };
    /**
     * A directive that adds max length validation to controls marked with the
     * `maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding a maximum length validator
     *
     * The following example shows how to add a maximum length validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel maxlength="25">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class MaxLengthValidator {
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use
       * only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */
      ngOnChanges(changes) {
        if ('maxlength' in changes) {
          this._createValidator();

          if (this._onChange) this._onChange();
        }
      }
      /**
       * \@description
       * Method that validates whether the value exceeds
       * the maximum length requirement.
       * @param {?} control
       * @return {?}
       */


      validate(control) {
        return this.maxlength != null ? this._validator(control) : null;
      }
      /**
       * \@description
       * Registers a callback function to call when the validator inputs change.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnValidatorChange(fn) {
        this._onChange = fn;
      }
      /**
       * @private
       * @return {?}
       */


      _createValidator() {
        this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
      }

    }

    MaxLengthValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
        providers: [MAX_LENGTH_VALIDATOR],
        host: {
          '[attr.maxlength]': 'maxlength ? maxlength : null'
        }
      }]
    }];
    MaxLengthValidator.propDecorators = {
      maxlength: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * \@description
     * Provider which adds `PatternValidator` to the `NG_VALIDATORS` multi-provider list.
     * @type {?}
     */


    const PATTERN_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
      /**
      * @return {?}
      */
      () => PatternValidator),
      multi: true
    };
    /**
     * \@description
     * A directive that adds regex pattern validation to controls marked with the
     * `pattern` attribute. The regex must match the entire control value.
     * The directive is provided with the `NG_VALIDATORS` multi-provider list.
     *
     * @see [Form Validation](guide/form-validation)
     *
     * \@usageNotes
     *
     * ### Adding a pattern validator
     *
     * The following example shows how to add a pattern validator to an input attached to an
     * ngModel binding.
     *
     * ```html
     * <input name="firstName" ngModel pattern="[a-zA-Z ]*">
     * ```
     *
     * \@ngModule ReactiveFormsModule
     * \@ngModule FormsModule
     * \@publicApi
     */

    class PatternValidator {
      /**
       * \@description
       * A lifecycle method called when the directive's inputs change. For internal use
       * only.
       *
       * @param {?} changes A object of key/value pairs for the set of changed inputs.
       * @return {?}
       */
      ngOnChanges(changes) {
        if ('pattern' in changes) {
          this._createValidator();

          if (this._onChange) this._onChange();
        }
      }
      /**
       * \@description
       * Method that validates whether the value matches the
       * the pattern requirement.
       * @param {?} control
       * @return {?}
       */


      validate(control) {
        return this._validator(control);
      }
      /**
       * \@description
       * Registers a callback function to call when the validator inputs change.
       *
       * @param {?} fn The callback function
       * @return {?}
       */


      registerOnValidatorChange(fn) {
        this._onChange = fn;
      }
      /**
       * @private
       * @return {?}
       */


      _createValidator() {
        this._validator = Validators.pattern(this.pattern);
      }

    }

    PatternValidator.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
        providers: [PATTERN_VALIDATOR],
        host: {
          '[attr.pattern]': 'pattern ? pattern : null'
        }
      }]
    }];
    PatternValidator.propDecorators = {
      pattern: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    const SHARED_FORM_DIRECTIVES = [ɵNgNoValidate, NgSelectOption, ɵNgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator];
    /** @type {?} */

    const TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm, NgFormSelectorWarning];
    /** @type {?} */

    const REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
    /**
     * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
     */

    class ɵInternalFormsSharedModule {}

    ɵInternalFormsSharedModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: SHARED_FORM_DIRECTIVES,
        exports: SHARED_FORM_DIRECTIVES
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} options
     * @return {?}
     */

    function isAbstractControlOptions(options) {
      return (
        /** @type {?} */
        options.asyncValidators !== undefined ||
        /** @type {?} */
        options.validators !== undefined ||
        /** @type {?} */
        options.updateOn !== undefined
      );
    }
    /**
     * \@description
     * Creates an `AbstractControl` from a user-specified configuration.
     *
     * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
     * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
     * forms.
     *
     * @see [Reactive Forms Guide](/guide/reactive-forms)
     *
     * \@publicApi
     */


    class FormBuilder {
      /**
       * \@description
       * Construct a new `FormGroup` instance.
       *
       * @param {?} controlsConfig A collection of child controls. The key for each child is the name
       * under which it is registered.
       *
       * @param {?=} options Configuration options object for the `FormGroup`. The object can
       * have two shapes:
       *
       * 1) `AbstractControlOptions` object (preferred), which consists of:
       * * `validators`: A synchronous validator function, or an array of validator functions
       * * `asyncValidators`: A single async validator or array of async validator functions
       * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur' |
       * submit')
       *
       * 2) Legacy configuration object, which consists of:
       * * `validator`: A synchronous validator function, or an array of validator functions
       * * `asyncValidator`: A single async validator or array of async validator functions
       *
       * @return {?}
       */
      group(controlsConfig, options = null) {
        /** @type {?} */
        const controls = this._reduceControls(controlsConfig);
        /** @type {?} */


        let validators = null;
        /** @type {?} */

        let asyncValidators = null;
        /** @type {?} */

        let updateOn = undefined;

        if (options != null) {
          if (isAbstractControlOptions(options)) {
            // `options` are `AbstractControlOptions`
            validators = options.validators != null ? options.validators : null;
            asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
            updateOn = options.updateOn != null ? options.updateOn : undefined;
          } else {
            // `options` are legacy form group options
            validators = options['validator'] != null ? options['validator'] : null;
            asyncValidators = options['asyncValidator'] != null ? options['asyncValidator'] : null;
          }
        }

        return new FormGroup(controls, {
          asyncValidators,
          updateOn,
          validators
        });
      }
      /**
       * \@description
       * Construct a new `FormControl` with the given state, validators and options.
       *
       * \@usageNotes
       *
       * ### Initialize a control as disabled
       *
       * The following example returns a control with an initial value in a disabled state.
       *
       * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
       * </code-example>
       * @param {?} formState Initializes the control with an initial state value, or
       * with an object that contains both a value and a disabled status.
       *
       * @param {?=} validatorOrOpts A synchronous validator function, or an array of
       * such functions, or an `AbstractControlOptions` object that contains
       * validation functions and a validation trigger.
       *
       * @param {?=} asyncValidator A single async validator or array of async validator
       * functions.
       *
       * @return {?}
       */


      control(formState, validatorOrOpts, asyncValidator) {
        return new FormControl(formState, validatorOrOpts, asyncValidator);
      }
      /**
       * Constructs a new `FormArray` from the given array of configurations,
       * validators and options.
       *
       * @param {?} controlsConfig An array of child controls or control configs. Each
       * child control is given an index when it is registered.
       *
       * @param {?=} validatorOrOpts A synchronous validator function, or an array of
       * such functions, or an `AbstractControlOptions` object that contains
       * validation functions and a validation trigger.
       *
       * @param {?=} asyncValidator A single async validator or array of async validator
       * functions.
       * @return {?}
       */


      array(controlsConfig, validatorOrOpts, asyncValidator) {
        /** @type {?} */
        const controls = controlsConfig.map(
        /**
        * @param {?} c
        * @return {?}
        */
        c => this._createControl(c));
        return new FormArray(controls, validatorOrOpts, asyncValidator);
      }
      /**
       * \@internal
       * @param {?} controlsConfig
       * @return {?}
       */


      _reduceControls(controlsConfig) {
        /** @type {?} */
        const controls = {};
        Object.keys(controlsConfig).forEach(
        /**
        * @param {?} controlName
        * @return {?}
        */
        controlName => {
          controls[controlName] = this._createControl(controlsConfig[controlName]);
        });
        return controls;
      }
      /**
       * \@internal
       * @param {?} controlConfig
       * @return {?}
       */


      _createControl(controlConfig) {
        if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup || controlConfig instanceof FormArray) {
          return controlConfig;
        } else if (Array.isArray(controlConfig)) {
          /** @type {?} */
          const value = controlConfig[0];
          /** @type {?} */

          const validator = controlConfig.length > 1 ? controlConfig[1] : null;
          /** @type {?} */

          const asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
          return this.control(value, validator, asyncValidator);
        } else {
          return this.control(controlConfig);
        }
      }

    }

    FormBuilder.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@publicApi
     * @type {?}
     */

    const VERSION = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Version"]('8.2.14');
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Exports the required providers and directives for template-driven forms,
     * making them available for import by NgModules that import this module.
     *
     * @see [Forms Guide](/guide/forms)
     *
     * \@publicApi
     */

    class FormsModule {
      /**
       * \@description
       * Provides options for configuring the template-driven forms module.
       *
       * @param {?} opts An object of configuration options
       * * `warnOnDeprecatedNgFormSelector` Configures when to emit a warning when the deprecated
       * `ngForm` selector is used.
       * @return {?}
       */
      static withConfig(opts) {
        return {
          ngModule: FormsModule,
          providers: [{
            provide: NG_FORM_SELECTOR_WARNING,
            useValue: opts.warnOnDeprecatedNgFormSelector
          }]
        };
      }

    }

    FormsModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: TEMPLATE_DRIVEN_DIRECTIVES,
        providers: [RadioControlRegistry],
        exports: [ɵInternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
      }]
    }];
    /**
     * Exports the required infrastructure and directives for reactive forms,
     * making them available for import by NgModules that import this module.
     * @see [Forms](guide/reactive-forms)
     *
     * @see [Reactive Forms Guide](/guide/reactive-forms)
     *
     * \@publicApi
     */

    class ReactiveFormsModule {
      /**
       * \@description
       * Provides options for configuring the reactive forms module.
       *
       * @param {?} opts An object of configuration options
       * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
       * binding is used with reactive form directives.
       * @return {?}
       */
      static withConfig(opts) {
        return {
          ngModule: ReactiveFormsModule,
          providers: [{
            provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
            useValue: opts.warnOnNgModelWithFormControl
          }]
        };
      }

    }

    ReactiveFormsModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: [REACTIVE_DRIVEN_DIRECTIVES],
        providers: [FormBuilder, RadioControlRegistry],
        exports: [ɵInternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=forms.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/material/autocomplete/typings/index.ngfactory.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/@angular/material/autocomplete/typings/index.ngfactory.js ***!
    \********************************************************************************/

  /*! exports provided: MatAutocompleteModuleNgFactory, RenderType_MatAutocomplete, View_MatAutocomplete_0, View_MatAutocomplete_Host_0, MatAutocompleteNgFactory */

  /***/
  function node_modulesAngularMaterialAutocompleteTypingsIndexNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteModuleNgFactory", function () {
      return MatAutocompleteModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_MatAutocomplete", function () {
      return RenderType_MatAutocomplete;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatAutocomplete_0", function () {
      return View_MatAutocomplete_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatAutocomplete_Host_0", function () {
      return View_MatAutocomplete_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteNgFactory", function () {
      return MatAutocompleteNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/material/autocomplete */
    "./node_modules/@angular/material/esm2015/autocomplete.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/cdk/overlay */
    "./node_modules/@angular/cdk/esm2015/overlay.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/cdk/portal */
    "./node_modules/@angular/cdk/esm2015/portal.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var MatAutocompleteModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"], [])]);
    });

    var styles_MatAutocomplete = [".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}.mat-autocomplete-panel-above .mat-autocomplete-panel{border-radius:0;border-top-left-radius:4px;border-top-right-radius:4px}.mat-autocomplete-panel .mat-divider-horizontal{margin-top:-1px}@media (-ms-high-contrast:active){.mat-autocomplete-panel{outline:solid 1px}}"];

    var RenderType_MatAutocomplete = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_MatAutocomplete,
      data: {}
    });

    function View_MatAutocomplete_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, [[2, 0], ["panel", 1]], null, 3, "div", [["class", "mat-autocomplete-panel"], ["role", "listbox"]], [[8, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵprd"](512, null, _angular_common__WEBPACK_IMPORTED_MODULE_2__["ɵNgClassImpl"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["ɵNgClassR2Impl"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_common__WEBPACK_IMPORTED_MODULE_2__["ɵNgClassImpl"]], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_1 = "mat-autocomplete-panel";
        var currVal_2 = _co._classList;

        _ck(_v, 2, 0, currVal_1, currVal_2);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.id;

        _ck(_v, 0, 0, currVal_0);
      });
    }

    function View_MatAutocomplete_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](402653184, 1, {
        template: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 2, {
        panel: 0
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](0, [[1, 2]], null, 0, null, View_MatAutocomplete_1))], null, null);
    }

    function View_MatAutocomplete_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 4, "mat-autocomplete", [["class", "mat-autocomplete"]], null, null, null, View_MatAutocomplete_0, RenderType_MatAutocomplete)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵprd"](6144, null, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["MAT_OPTION_PARENT_COMPONENT"], null, [_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocomplete"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 1097728, null, 2, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocomplete"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MAT_AUTOCOMPLETE_DEFAULT_OPTIONS"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 1, {
        options: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 2, {
        optionGroups: 1
      })], null, null);
    }

    var MatAutocompleteNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-autocomplete", _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_1__["MatAutocomplete"], View_MatAutocomplete_Host_0, {
      disableRipple: "disableRipple",
      displayWith: "displayWith",
      autoActiveFirstOption: "autoActiveFirstOption",
      panelWidth: "panelWidth",
      classList: "class"
    }, {
      optionSelected: "optionSelected",
      opened: "opened",
      closed: "closed"
    }, ["*"]);
    /***/

  },

  /***/
  "./node_modules/@angular/material/core/typings/index.ngfactory.js":
  /*!************************************************************************!*\
    !*** ./node_modules/@angular/material/core/typings/index.ngfactory.js ***!
    \************************************************************************/

  /*! exports provided: MatCommonModuleNgFactory, NativeDateModuleNgFactory, MatNativeDateModuleNgFactory, MatLineModuleNgFactory, MatOptionModuleNgFactory, MatRippleModuleNgFactory, MatPseudoCheckboxModuleNgFactory, RenderType_MatOption, View_MatOption_0, View_MatOption_Host_0, MatOptionNgFactory, RenderType_MatOptgroup, View_MatOptgroup_0, View_MatOptgroup_Host_0, MatOptgroupNgFactory, RenderType_MatPseudoCheckbox, View_MatPseudoCheckbox_0, View_MatPseudoCheckbox_Host_0, MatPseudoCheckboxNgFactory */

  /***/
  function node_modulesAngularMaterialCoreTypingsIndexNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatCommonModuleNgFactory", function () {
      return MatCommonModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NativeDateModuleNgFactory", function () {
      return NativeDateModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatNativeDateModuleNgFactory", function () {
      return MatNativeDateModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatLineModuleNgFactory", function () {
      return MatLineModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatOptionModuleNgFactory", function () {
      return MatOptionModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatRippleModuleNgFactory", function () {
      return MatRippleModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatPseudoCheckboxModuleNgFactory", function () {
      return MatPseudoCheckboxModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_MatOption", function () {
      return RenderType_MatOption;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatOption_0", function () {
      return View_MatOption_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatOption_Host_0", function () {
      return View_MatOption_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatOptionNgFactory", function () {
      return MatOptionNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_MatOptgroup", function () {
      return RenderType_MatOptgroup;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatOptgroup_0", function () {
      return View_MatOptgroup_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatOptgroup_Host_0", function () {
      return View_MatOptgroup_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatOptgroupNgFactory", function () {
      return MatOptgroupNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_MatPseudoCheckbox", function () {
      return RenderType_MatPseudoCheckbox;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatPseudoCheckbox_0", function () {
      return View_MatPseudoCheckbox_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatPseudoCheckbox_Host_0", function () {
      return View_MatPseudoCheckbox_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatPseudoCheckboxNgFactory", function () {
      return MatPseudoCheckboxNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var MatCommonModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["HAMMER_LOADER"]]])]);
    });

    var NativeDateModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateModule"], [])]);
    });

    var MatNativeDateModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateAdapter"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_LOCALE"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["NativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_FORMATS"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_NATIVE_DATE_FORMATS"], [])]);
    });

    var MatLineModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatLineModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatLineModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatLineModule"], [])]);
    });

    var MatOptionModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptionModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptionModule"], [])]);
    });

    var MatRippleModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"], [])]);
    });

    var MatPseudoCheckboxModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckboxModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckboxModule"], [])]);
    });

    var styles_MatOption = [".mat-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:0;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:transparent}.mat-option[disabled]{cursor:default}[dir=rtl] .mat-option{text-align:right}.mat-option .mat-icon{margin-right:16px;vertical-align:middle}.mat-option .mat-icon svg{vertical-align:top}[dir=rtl] .mat-option .mat-icon{margin-left:16px;margin-right:0}.mat-option[aria-disabled=true]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:32px}[dir=rtl] .mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:16px;padding-right:32px}@media (-ms-high-contrast:active){.mat-option{margin:0 1px}.mat-option.mat-active{border:solid 1px currentColor;margin:0}}.mat-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.mat-option .mat-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}@media (-ms-high-contrast:active){.mat-option .mat-option-ripple{opacity:.5}}.mat-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .mat-option-pseudo-checkbox{margin-left:8px;margin-right:0}"];

    var RenderType_MatOption = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_MatOption,
      data: {}
    });

    function View_MatOption_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "mat-pseudo-checkbox", [["class", "mat-option-pseudo-checkbox mat-pseudo-checkbox"]], [[2, "mat-pseudo-checkbox-indeterminate", null], [2, "mat-pseudo-checkbox-checked", null], [2, "mat-pseudo-checkbox-disabled", null], [2, "_mat-animation-noopable", null]], null, null, View_MatPseudoCheckbox_0, RenderType_MatPseudoCheckbox)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckbox"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], {
        state: [0, "state"],
        disabled: [1, "disabled"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_4 = _co.selected ? "checked" : "";
        var currVal_5 = _co.disabled;

        _ck(_v, 1, 0, currVal_4, currVal_5);
      }, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).state === "indeterminate";
        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).state === "checked";

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._animationMode === "NoopAnimations";

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3);
      });
    }

    function View_MatOption_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatOption_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](2, 0, null, null, 1, "span", [["class", "mat-option-text"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, null, null, 1, "div", [["class", "mat-option-ripple mat-ripple"], ["mat-ripple", ""]], [[2, "mat-ripple-unbounded", null]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](5, 212992, null, 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRipple"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_RIPPLE_GLOBAL_OPTIONS"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], {
        disabled: [0, "disabled"],
        trigger: [1, "trigger"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.multiple;

        _ck(_v, 1, 0, currVal_0);

        var currVal_2 = _co.disabled || _co.disableRipple;

        var currVal_3 = _co._getHostElement();

        _ck(_v, 5, 0, currVal_2, currVal_3);
      }, function (_ck, _v) {
        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 5).unbounded;

        _ck(_v, 4, 0, currVal_1);
      });
    }

    function View_MatOption_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "mat-option", [["class", "mat-option"], ["role", "option"]], [[1, "tabindex", 0], [2, "mat-selected", null], [2, "mat-option-multiple", null], [2, "mat-active", null], [8, "id", 0], [1, "aria-selected", 0], [1, "aria-disabled", 0], [2, "mat-option-disabled", null]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) {
        var ad = true;

        if ("click" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._selectViaInteraction() !== false;
          ad = pd_0 && ad;
        }

        if ("keydown" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._handleKeydown($event) !== false;
          ad = pd_1 && ad;
        }

        return ad;
      }, View_MatOption_0, RenderType_MatOption)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 8568832, null, 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MAT_OPTION_PARENT_COMPONENT"]], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptgroup"]]], null, null)], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._getTabIndex();

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).selected;

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).multiple;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).active;

        var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).id;

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._getAriaSelected();

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled.toString();

        var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled;

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7);
      });
    }

    var MatOptionNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-option", _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOption"], View_MatOption_Host_0, {
      value: "value",
      id: "id",
      disabled: "disabled"
    }, {
      onSelectionChange: "onSelectionChange"
    }, ["*"]);

    var styles_MatOptgroup = [".mat-optgroup-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-optgroup-label[disabled]{cursor:default}[dir=rtl] .mat-optgroup-label{text-align:right}.mat-optgroup-label .mat-icon{margin-right:16px;vertical-align:middle}.mat-optgroup-label .mat-icon svg{vertical-align:top}[dir=rtl] .mat-optgroup-label .mat-icon{margin-left:16px;margin-right:0}"];

    var RenderType_MatOptgroup = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_MatOptgroup,
      data: {}
    });

    function View_MatOptgroup_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 2, "label", [["class", "mat-optgroup-label"]], [[8, "id", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](1, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 1)], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._labelId;

        _ck(_v, 0, 0, currVal_0);

        var currVal_1 = _co.label;

        _ck(_v, 1, 0, currVal_1);
      });
    }

    function View_MatOptgroup_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "mat-optgroup", [["class", "mat-optgroup"], ["role", "group"]], [[2, "mat-optgroup-disabled", null], [1, "aria-disabled", 0], [1, "aria-labelledby", 0]], null, null, View_MatOptgroup_0, RenderType_MatOptgroup)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptgroup"], [], null, null)], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled;

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled.toString();

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._labelId;

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2);
      });
    }

    var MatOptgroupNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-optgroup", _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatOptgroup"], View_MatOptgroup_Host_0, {
      disabled: "disabled",
      label: "label"
    }, {}, ["*", "mat-option, ng-container"]);

    var styles_MatPseudoCheckbox = [".mat-pseudo-checkbox{width:16px;height:16px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border-color:transparent}._mat-animation-noopable.mat-pseudo-checkbox{transition:none;animation:none}._mat-animation-noopable.mat-pseudo-checkbox::after{transition:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:5px;left:1px;width:10px;opacity:1;border-radius:2px}.mat-pseudo-checkbox-checked::after{top:2.4px;left:1px;width:8px;height:3px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}"];

    var RenderType_MatPseudoCheckbox = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_MatPseudoCheckbox,
      data: {}
    });

    function View_MatPseudoCheckbox_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [], null, null);
    }

    function View_MatPseudoCheckbox_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "mat-pseudo-checkbox", [["class", "mat-pseudo-checkbox"]], [[2, "mat-pseudo-checkbox-indeterminate", null], [2, "mat-pseudo-checkbox-checked", null], [2, "mat-pseudo-checkbox-disabled", null], [2, "_mat-animation-noopable", null]], null, null, View_MatPseudoCheckbox_0, RenderType_MatPseudoCheckbox)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckbox"], [[2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null)], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).state === "indeterminate";
        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).state === "checked";

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).disabled;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._animationMode === "NoopAnimations";

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3);
      });
    }

    var MatPseudoCheckboxNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-pseudo-checkbox", _angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatPseudoCheckbox"], View_MatPseudoCheckbox_Host_0, {
      state: "state",
      disabled: "disabled"
    }, {}, []);
    /***/

  },

  /***/
  "./node_modules/@angular/material/esm2015/autocomplete.js":
  /*!****************************************************************!*\
    !*** ./node_modules/@angular/material/esm2015/autocomplete.js ***!
    \****************************************************************/

  /*! exports provided: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY, MatAutocompleteSelectedEvent, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocomplete, MatAutocompleteModule, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, getMatAutocompleteMissingPanelError, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, MAT_AUTOCOMPLETE_VALUE_ACCESSOR, MatAutocompleteTrigger, MatAutocompleteOrigin */

  /***/
  function node_modulesAngularMaterialEsm2015AutocompleteJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY", function () {
      return MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteSelectedEvent", function () {
      return MatAutocompleteSelectedEvent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_DEFAULT_OPTIONS", function () {
      return MAT_AUTOCOMPLETE_DEFAULT_OPTIONS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocomplete", function () {
      return MatAutocomplete;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteModule", function () {
      return MatAutocompleteModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY", function () {
      return MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMatAutocompleteMissingPanelError", function () {
      return getMatAutocompleteMissingPanelError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AUTOCOMPLETE_OPTION_HEIGHT", function () {
      return AUTOCOMPLETE_OPTION_HEIGHT;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AUTOCOMPLETE_PANEL_HEIGHT", function () {
      return AUTOCOMPLETE_PANEL_HEIGHT;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_SCROLL_STRATEGY", function () {
      return MAT_AUTOCOMPLETE_SCROLL_STRATEGY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER", function () {
      return MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_AUTOCOMPLETE_VALUE_ACCESSOR", function () {
      return MAT_AUTOCOMPLETE_VALUE_ACCESSOR;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteTrigger", function () {
      return MatAutocompleteTrigger;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatAutocompleteOrigin", function () {
      return MatAutocompleteOrigin;
    });
    /* harmony import */


    var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/cdk/a11y */
    "./node_modules/@angular/cdk/esm2015/a11y.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/cdk/keycodes */
    "./node_modules/@angular/cdk/esm2015/keycodes.js");
    /* harmony import */


    var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/cdk/overlay */
    "./node_modules/@angular/cdk/esm2015/overlay.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/cdk/portal */
    "./node_modules/@angular/cdk/esm2015/portal.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Autocomplete IDs need to be unique across components, so this counter exists outside of
     * the component definition.
     * @type {?}
     */


    let _uniqueAutocompleteIdCounter = 0;
    /**
     * Event object that is emitted when an autocomplete option is selected.
     */

    class MatAutocompleteSelectedEvent {
      /**
       * @param {?} source
       * @param {?} option
       */
      constructor(source, option) {
        this.source = source;
        this.option = option;
      }

    } // Boilerplate for applying mixins to MatAutocomplete.

    /**
     * \@docs-private
     */


    class MatAutocompleteBase {}
    /** @type {?} */


    const _MatAutocompleteMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["mixinDisableRipple"])(MatAutocompleteBase);
    /**
     * Injection token to be used to override the default options for `mat-autocomplete`.
     * @type {?}
     */


    const MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["InjectionToken"]('mat-autocomplete-default-options', {
      providedIn: 'root',
      factory: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
    });
    /**
     * \@docs-private
     * @return {?}
     */

    function MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
      return {
        autoActiveFirstOption: false
      };
    }

    class MatAutocomplete extends _MatAutocompleteMixinBase {
      /**
       * @param {?} _changeDetectorRef
       * @param {?} _elementRef
       * @param {?} defaults
       */
      constructor(_changeDetectorRef, _elementRef, defaults) {
        super();
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        /**
         * Whether the autocomplete panel should be visible, depending on option length.
         */

        this.showPanel = false;
        this._isOpen = false;
        /**
         * Function that maps an option's control value to its display value in the trigger.
         */

        this.displayWith = null;
        /**
         * Event that is emitted whenever an option from the list is selected.
         */

        this.optionSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */

        this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */

        this.closed = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this._classList = {};
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */

        this.id = "mat-autocomplete-".concat(_uniqueAutocompleteIdCounter++);
        this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
      }
      /**
       * Whether the autocomplete panel is open.
       * @return {?}
       */


      get isOpen() {
        return this._isOpen && this.showPanel;
      }
      /**
       * Whether the first option should be highlighted when the autocomplete panel is opened.
       * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
       * @return {?}
       */


      get autoActiveFirstOption() {
        return this._autoActiveFirstOption;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set autoActiveFirstOption(value) {
        this._autoActiveFirstOption = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
      }
      /**
       * Takes classes set on the host mat-autocomplete element and applies them to the panel
       * inside the overlay container to allow for easy styling.
       * @param {?} value
       * @return {?}
       */


      set classList(value) {
        if (value && value.length) {
          this._classList = value.split(' ').reduce(
          /**
          * @param {?} classList
          * @param {?} className
          * @return {?}
          */
          (classList, className) => {
            classList[className.trim()] = true;
            return classList;
          },
          /** @type {?} */
          {});
        } else {
          this._classList = {};
        }

        this._setVisibilityClasses(this._classList);

        this._elementRef.nativeElement.className = '';
      }
      /**
       * @return {?}
       */


      ngAfterContentInit() {
        this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__["ActiveDescendantKeyManager"](this.options).withWrap(); // Set the initial visibility state.

        this._setVisibility();
      }
      /**
       * Sets the panel scrollTop. This allows us to manually scroll to display options
       * above or below the fold, as they are not actually being focused when active.
       * @param {?} scrollTop
       * @return {?}
       */


      _setScrollTop(scrollTop) {
        if (this.panel) {
          this.panel.nativeElement.scrollTop = scrollTop;
        }
      }
      /**
       * Returns the panel's scrollTop.
       * @return {?}
       */


      _getScrollTop() {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
      }
      /**
       * Panel should hide itself when the option list is empty.
       * @return {?}
       */


      _setVisibility() {
        this.showPanel = !!this.options.length;

        this._setVisibilityClasses(this._classList);

        this._changeDetectorRef.markForCheck();
      }
      /**
       * Emits the `select` event.
       * @param {?} option
       * @return {?}
       */


      _emitSelectEvent(option) {
        /** @type {?} */
        const event = new MatAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
      }
      /**
       * Sets the autocomplete visibility classes on a classlist based on the panel is visible.
       * @private
       * @param {?} classList
       * @return {?}
       */


      _setVisibilityClasses(classList) {
        classList['mat-autocomplete-visible'] = this.showPanel;
        classList['mat-autocomplete-hidden'] = !this.showPanel;
      }

    }

    MatAutocomplete.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
      args: [{
        selector: 'mat-autocomplete',
        template: "<ng-template><div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_classList\" #panel><ng-content></ng-content></div></ng-template>",
        styles: [".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}.mat-autocomplete-panel-above .mat-autocomplete-panel{border-radius:0;border-top-left-radius:4px;border-top-right-radius:4px}.mat-autocomplete-panel .mat-divider-horizontal{margin-top:-1px}@media (-ms-high-contrast:active){.mat-autocomplete-panel{outline:solid 1px}}"],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
        exportAs: 'matAutocomplete',
        inputs: ['disableRipple'],
        host: {
          'class': 'mat-autocomplete'
        },
        providers: [{
          provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MAT_OPTION_PARENT_COMPONENT"],
          useExisting: MatAutocomplete
        }]
      }]
    }];
    /** @nocollapse */

    MatAutocomplete.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
        args: [MAT_AUTOCOMPLETE_DEFAULT_OPTIONS]
      }]
    }];

    MatAutocomplete.propDecorators = {
      template: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"], {
          static: true
        }]
      }],
      panel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
        args: ['panel', {
          static: false
        }]
      }],
      options: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ContentChildren"],
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], {
          descendants: true
        }]
      }],
      optionGroups: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ContentChildren"],
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOptgroup"]]
      }],
      displayWith: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
      }],
      autoActiveFirstOption: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
      }],
      panelWidth: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
      }],
      optionSelected: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
      }],
      opened: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
      }],
      closed: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
      }],
      classList: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['class']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Directive applied to an element to make it usable
     * as a connection point for an autocomplete panel.
     */

    class MatAutocompleteOrigin {
      /**
       * @param {?} elementRef
       */
      constructor(elementRef) {
        this.elementRef = elementRef;
      }

    }

    MatAutocompleteOrigin.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
      args: [{
        selector: '[matAutocompleteOrigin]',
        exportAs: 'matAutocompleteOrigin'
      }]
    }];
    /** @nocollapse */

    MatAutocompleteOrigin.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The height of each autocomplete option.
     * @type {?}
     */


    const AUTOCOMPLETE_OPTION_HEIGHT = 48;
    /**
     * The total height of the autocomplete panel.
     * @type {?}
     */

    const AUTOCOMPLETE_PANEL_HEIGHT = 256;
    /**
     * Injection token that determines the scroll handling while the autocomplete panel is open.
     * @type {?}
     */

    const MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["InjectionToken"]('mat-autocomplete-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */

    function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
      return (
        /**
        * @return {?}
        */
        () => overlay.scrollStrategies.reposition()
      );
    }
    /**
     * \@docs-private
     * @type {?}
     */


    const MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["Overlay"]],
      useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
    };
    /**
     * Provider that allows the autocomplete to register as a ControlValueAccessor.
     * \@docs-private
     * @type {?}
     */

    const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"],
      useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(
      /**
      * @return {?}
      */
      () => MatAutocompleteTrigger),
      multi: true
    };
    /**
     * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
     * \@docs-private
     * @return {?}
     */

    function getMatAutocompleteMissingPanelError() {
      return Error('Attempting to open an undefined instance of `mat-autocomplete`. ' + 'Make sure that the id passed to the `matAutocomplete` is correct and that ' + 'you\'re attempting to open it after the ngAfterContentInit hook.');
    }

    class MatAutocompleteTrigger {
      /**
       * @param {?} _element
       * @param {?} _overlay
       * @param {?} _viewContainerRef
       * @param {?} _zone
       * @param {?} _changeDetectorRef
       * @param {?} scrollStrategy
       * @param {?} _dir
       * @param {?} _formField
       * @param {?} _document
       * @param {?=} _viewportRuler
       */
      constructor(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, scrollStrategy, _dir, _formField, _document, _viewportRuler) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._formField = _formField;
        this._document = _document;
        this._viewportRuler = _viewportRuler;
        this._componentDestroyed = false;
        this._autocompleteDisabled = false;
        /**
         * Whether or not the label state is being overridden.
         */

        this._manuallyFloatingLabel = false;
        /**
         * Subscription to viewport size changes.
         */

        this._viewportSubscription = rxjs__WEBPACK_IMPORTED_MODULE_13__["Subscription"].EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */

        this._canOpenOnNextFocus = true;
        /**
         * Stream of keyboard events that can close the panel.
         */

        this._closeKeyEventStream = new rxjs__WEBPACK_IMPORTED_MODULE_13__["Subject"]();
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */

        this._windowBlurHandler =
        /**
        * @return {?}
        */
        () => {
          // If the user blurred the window while the autocomplete is focused, it means that it'll be
          // refocused when they come back. In this case we want to skip the first focus event, if the
          // pane was closed, in order to avoid reopening it unintentionally.
          this._canOpenOnNextFocus = this._document.activeElement !== this._element.nativeElement || this.panelOpen;
        };
        /**
         * `View -> model callback called when value changes`
         */


        this._onChange =
        /**
        * @return {?}
        */
        () => {};
        /**
         * `View -> model callback called when autocomplete has been touched`
         */


        this._onTouched =
        /**
        * @return {?}
        */
        () => {};
        /**
         * Position of the autocomplete panel relative to the trigger element. A position of `auto`
         * will render the panel underneath the trigger if there is enough space for it to fit in
         * the viewport, otherwise the panel will be shown above it. If the position is set to
         * `above` or `below`, the panel will always be shown above or below the trigger. no matter
         * whether it fits completely in the viewport.
         */


        this.position = 'auto';
        /**
         * `autocomplete` attribute to be set on the input element.
         * \@docs-private
         */

        this.autocompleteAttribute = 'off';
        this._overlayAttached = false;
        /**
         * Stream of autocomplete option selections.
         */

        this.optionSelections =
        /** @type {?} */
        Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["defer"])(
        /**
        * @return {?}
        */
        () => {
          if (this.autocomplete && this.autocomplete.options) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["merge"])(...this.autocomplete.options.map(
            /**
            * @param {?} option
            * @return {?}
            */
            option => option.onSelectionChange));
          } // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
          // Return a stream that we'll replace with the real one once everything is in place.


          return this._zone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["switchMap"])(
          /**
          * @return {?}
          */
          () => this.optionSelections));
        });
        this._scrollStrategy = scrollStrategy;
      }
      /**
       * Whether the autocomplete is disabled. When disabled, the element will
       * act as a regular input and the user won't be able to open the panel.
       * @return {?}
       */


      get autocompleteDisabled() {
        return this._autocompleteDisabled;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set autocompleteDisabled(value) {
        this._autocompleteDisabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
      }
      /**
       * @return {?}
       */


      ngAfterViewInit() {
        if (typeof window !== 'undefined') {
          this._zone.runOutsideAngular(
          /**
          * @return {?}
          */
          () => {
            window.addEventListener('blur', this._windowBlurHandler);
          });

          if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["_supportsShadowDom"])()) {
            /** @type {?} */
            const element = this._element.nativeElement;
            /** @type {?} */

            const rootNode = element.getRootNode ? element.getRootNode() : null; // We need to take the `ShadowRoot` off of `window`, because the built-in types are
            // incorrect. See https://github.com/Microsoft/TypeScript/issues/27929.

            this._isInsideShadowRoot = rootNode instanceof
            /** @type {?} */
            window.ShadowRoot;
          }
        }
      }
      /**
       * @param {?} changes
       * @return {?}
       */


      ngOnChanges(changes) {
        if (changes['position'] && this._positionStrategy) {
          this._setStrategyPositions(this._positionStrategy);

          if (this.panelOpen) {
            /** @type {?} */
            this._overlayRef.updatePosition();
          }
        }
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        if (typeof window !== 'undefined') {
          window.removeEventListener('blur', this._windowBlurHandler);
        }

        this._viewportSubscription.unsubscribe();

        this._componentDestroyed = true;

        this._destroyPanel();

        this._closeKeyEventStream.complete();
      }
      /**
       * Whether or not the autocomplete panel is open.
       * @return {?}
       */


      get panelOpen() {
        return this._overlayAttached && this.autocomplete.showPanel;
      }
      /**
       * Opens the autocomplete suggestion panel.
       * @return {?}
       */


      openPanel() {
        this._attachOverlay();

        this._floatLabel();
      }
      /**
       * Closes the autocomplete suggestion panel.
       * @return {?}
       */


      closePanel() {
        this._resetLabel();

        if (!this._overlayAttached) {
          return;
        }

        if (this.panelOpen) {
          // Only emit if the panel was visible.
          this.autocomplete.closed.emit();
        }

        this.autocomplete._isOpen = this._overlayAttached = false;

        if (this._overlayRef && this._overlayRef.hasAttached()) {
          this._overlayRef.detach();

          this._closingActionsSubscription.unsubscribe();
        } // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.


        if (!this._componentDestroyed) {
          // We need to trigger change detection manually, because
          // `fromEvent` doesn't seem to do it at the proper time.
          // This ensures that the label is reset when the
          // user clicks outside.
          this._changeDetectorRef.detectChanges();
        }
      }
      /**
       * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
       * within the viewport.
       * @return {?}
       */


      updatePosition() {
        if (this._overlayAttached) {
          /** @type {?} */
          this._overlayRef.updatePosition();
        }
      }
      /**
       * A stream of actions that should close the autocomplete panel, including
       * when an option is selected, on blur, and when TAB is pressed.
       * @return {?}
       */


      get panelClosingActions() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["merge"])(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["filter"])(
        /**
        * @return {?}
        */
        () => this._overlayAttached)), this._closeKeyEventStream, this._getOutsideClickStream(), this._overlayRef ? this._overlayRef.detachments().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["filter"])(
        /**
        * @return {?}
        */
        () => this._overlayAttached)) : Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["of"])()).pipe( // Normalize the output so we return a consistent type.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(
        /**
        * @param {?} event
        * @return {?}
        */
        event => event instanceof _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOptionSelectionChange"] ? event : null));
      }
      /**
       * The currently active option, coerced to MatOption type.
       * @return {?}
       */


      get activeOption() {
        if (this.autocomplete && this.autocomplete._keyManager) {
          return this.autocomplete._keyManager.activeItem;
        }

        return null;
      }
      /**
       * Stream of clicks outside of the autocomplete panel.
       * @private
       * @return {?}
       */


      _getOutsideClickStream() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["merge"])(
        /** @type {?} */
        Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["fromEvent"])(this._document, 'click'),
        /** @type {?} */
        Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["fromEvent"])(this._document, 'touchend')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["filter"])(
        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          // If we're in the Shadow DOM, the event target will be the shadow root, so we have to
          // fall back to check the first element in the path of the click event.

          /** @type {?} */
          const clickTarget =
          /** @type {?} */
          this._isInsideShadowRoot && event.composedPath ? event.composedPath()[0] : event.target;
          /** @type {?} */

          const formField = this._formField ? this._formField._elementRef.nativeElement : null;
          return this._overlayAttached && clickTarget !== this._element.nativeElement && (!formField || !formField.contains(clickTarget)) && !!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget);
        }));
      } // Implemented as part of ControlValueAccessor.

      /**
       * @param {?} value
       * @return {?}
       */


      writeValue(value) {
        Promise.resolve(null).then(
        /**
        * @return {?}
        */
        () => this._setTriggerValue(value));
      } // Implemented as part of ControlValueAccessor.

      /**
       * @param {?} fn
       * @return {?}
       */


      registerOnChange(fn) {
        this._onChange = fn;
      } // Implemented as part of ControlValueAccessor.

      /**
       * @param {?} fn
       * @return {?}
       */


      registerOnTouched(fn) {
        this._onTouched = fn;
      } // Implemented as part of ControlValueAccessor.

      /**
       * @param {?} isDisabled
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this._element.nativeElement.disabled = isDisabled;
      }
      /**
       * @param {?} event
       * @return {?}
       */


      _handleKeydown(event) {
        /** @type {?} */
        const keyCode = event.keyCode; // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.

        if (keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ESCAPE"]) {
          event.preventDefault();
        }

        if (this.activeOption && keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ENTER"] && this.panelOpen) {
          this.activeOption._selectViaInteraction();

          this._resetActiveItem();

          event.preventDefault();
        } else if (this.autocomplete) {
          /** @type {?} */
          const prevActiveItem = this.autocomplete._keyManager.activeItem;
          /** @type {?} */

          const isArrowKey = keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["UP_ARROW"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["DOWN_ARROW"];

          if (this.panelOpen || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["TAB"]) {
            this.autocomplete._keyManager.onKeydown(event);
          } else if (isArrowKey && this._canOpen()) {
            this.openPanel();
          }

          if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
            this._scrollToOption();
          }
        }
      }
      /**
       * @param {?} event
       * @return {?}
       */


      _handleInput(event) {
        /** @type {?} */
        let target =
        /** @type {?} */
        event.target;
        /** @type {?} */

        let value = target.value; // Based on `NumberValueAccessor` from forms.

        if (target.type === 'number') {
          value = value == '' ? null : parseFloat(value);
        } // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/


        if (this._previousValue !== value) {
          this._previousValue = value;

          this._onChange(value);

          if (this._canOpen() && this._document.activeElement === event.target) {
            this.openPanel();
          }
        }
      }
      /**
       * @return {?}
       */


      _handleFocus() {
        if (!this._canOpenOnNextFocus) {
          this._canOpenOnNextFocus = true;
        } else if (this._canOpen()) {
          this._previousValue = this._element.nativeElement.value;

          this._attachOverlay();

          this._floatLabel(true);
        }
      }
      /**
       * In "auto" mode, the label will animate down as soon as focus is lost.
       * This causes the value to jump when selecting an option with the mouse.
       * This method manually floats the label until the panel can be closed.
       * @private
       * @param {?=} shouldAnimate Whether the label should be animated when it is floated.
       * @return {?}
       */


      _floatLabel(shouldAnimate = false) {
        if (this._formField && this._formField.floatLabel === 'auto') {
          if (shouldAnimate) {
            this._formField._animateAndLockLabel();
          } else {
            this._formField.floatLabel = 'always';
          }

          this._manuallyFloatingLabel = true;
        }
      }
      /**
       * If the label has been manually elevated, return it to its normal state.
       * @private
       * @return {?}
       */


      _resetLabel() {
        if (this._manuallyFloatingLabel) {
          this._formField.floatLabel = 'auto';
          this._manuallyFloatingLabel = false;
        }
      }
      /**
       * Given that we are not actually focusing active options, we must manually adjust scroll
       * to reveal options below the fold. First, we find the offset of the option from the top
       * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
       * the panel height + the option height, so the active option will be just visible at the
       * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
       * will become the offset. If that offset is visible within the panel already, the scrollTop is
       * not adjusted.
       * @private
       * @return {?}
       */


      _scrollToOption() {
        /** @type {?} */
        const index = this.autocomplete._keyManager.activeItemIndex || 0;
        /** @type {?} */

        const labelCount = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["_countGroupLabelsBeforeOption"])(index, this.autocomplete.options, this.autocomplete.optionGroups);

        if (index === 0 && labelCount === 1) {
          // If we've got one group label before the option and we're at the top option,
          // scroll the list to the top. This is better UX than scrolling the list to the
          // top of the option, because it allows the user to read the top group's label.
          this.autocomplete._setScrollTop(0);
        } else {
          /** @type {?} */
          const newScrollPosition = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["_getOptionScrollPosition"])(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete._getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);

          this.autocomplete._setScrollTop(newScrollPosition);
        }
      }
      /**
       * This method listens to a stream of panel closing actions and resets the
       * stream every time the option list changes.
       * @private
       * @return {?}
       */


      _subscribeToClosingActions() {
        /** @type {?} */
        const firstStable = this._zone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["take"])(1));
        /** @type {?} */


        const optionChanges = this.autocomplete.options.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["tap"])(
        /**
        * @return {?}
        */
        () => this._positionStrategy.reapplyLastPosition()), // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["delay"])(0)); // When the zone is stable initially, and when the option list changes...

        return Object(rxjs__WEBPACK_IMPORTED_MODULE_13__["merge"])(firstStable, optionChanges).pipe( // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["switchMap"])(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const wasOpen = this.panelOpen;

          this._resetActiveItem();

          this.autocomplete._setVisibility();

          if (this.panelOpen) {
            /** @type {?} */
            this._overlayRef.updatePosition(); // If the `panelOpen` state changed, we need to make sure to emit the `opened`
            // event, because we may not have emitted it when the panel was attached. This
            // can happen if the users opens the panel and there are no options, but the
            // options come in slightly later or as a result of the value changing.


            if (wasOpen !== this.panelOpen) {
              this.autocomplete.opened.emit();
            }
          }

          return this.panelClosingActions;
        }), // when the first closing event occurs...
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["take"])(1)) // set the value, close the panel, and complete.
        .subscribe(
        /**
        * @param {?} event
        * @return {?}
        */
        event => this._setValueAndClose(event));
      }
      /**
       * Destroys the autocomplete suggestion panel.
       * @private
       * @return {?}
       */


      _destroyPanel() {
        if (this._overlayRef) {
          this.closePanel();

          this._overlayRef.dispose();

          this._overlayRef = null;
        }
      }
      /**
       * @private
       * @param {?} value
       * @return {?}
       */


      _setTriggerValue(value) {
        /** @type {?} */
        const toDisplay = this.autocomplete && this.autocomplete.displayWith ? this.autocomplete.displayWith(value) : value; // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.

        /** @type {?} */

        const inputValue = toDisplay != null ? toDisplay : ''; // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.

        if (this._formField) {
          this._formField._control.value = inputValue;
        } else {
          this._element.nativeElement.value = inputValue;
        }

        this._previousValue = inputValue;
      }
      /**
       * This method closes the panel, and if a value is specified, also sets the associated
       * control to that value. It will also mark the control as dirty if this interaction
       * stemmed from the user.
       * @private
       * @param {?} event
       * @return {?}
       */


      _setValueAndClose(event) {
        if (event && event.source) {
          this._clearPreviousSelectedOption(event.source);

          this._setTriggerValue(event.source.value);

          this._onChange(event.source.value);

          this._element.nativeElement.focus();

          this.autocomplete._emitSelectEvent(event.source);
        }

        this.closePanel();
      }
      /**
       * Clear any previous selected option and emit a selection change event for this option
       * @private
       * @param {?} skip
       * @return {?}
       */


      _clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach(
        /**
        * @param {?} option
        * @return {?}
        */
        option => {
          if (option != skip && option.selected) {
            option.deselect();
          }
        });
      }
      /**
       * @private
       * @return {?}
       */


      _attachOverlay() {
        if (!this.autocomplete) {
          throw getMatAutocompleteMissingPanelError();
        }
        /** @type {?} */


        let overlayRef = this._overlayRef;

        if (!overlayRef) {
          this._portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_8__["TemplatePortal"](this.autocomplete.template, this._viewContainerRef);
          overlayRef = this._overlay.create(this._getOverlayConfig());
          this._overlayRef = overlayRef; // Use the `keydownEvents` in order to take advantage of
          // the overlay event targeting provided by the CDK overlay.

          overlayRef.keydownEvents().subscribe(
          /**
          * @param {?} event
          * @return {?}
          */
          event => {
            // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
            // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
            if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ESCAPE"] || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["UP_ARROW"] && event.altKey) {
              this._resetActiveItem();

              this._closeKeyEventStream.next(); // We need to stop propagation, otherwise the event will eventually
              // reach the input itself and cause the overlay to be reopened.


              event.stopPropagation();
              event.preventDefault();
            }
          });

          if (this._viewportRuler) {
            this._viewportSubscription = this._viewportRuler.change().subscribe(
            /**
            * @return {?}
            */
            () => {
              if (this.panelOpen && overlayRef) {
                overlayRef.updateSize({
                  width: this._getPanelWidth()
                });
              }
            });
          }
        } else {
          // Update the trigger, panel width and direction, in case anything has changed.
          this._positionStrategy.setOrigin(this._getConnectedElement());

          overlayRef.updateSize({
            width: this._getPanelWidth()
          });
        }

        if (overlayRef && !overlayRef.hasAttached()) {
          overlayRef.attach(this._portal);
          this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        /** @type {?} */


        const wasOpen = this.panelOpen;

        this.autocomplete._setVisibility();

        this.autocomplete._isOpen = this._overlayAttached = true; // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.

        if (this.panelOpen && wasOpen !== this.panelOpen) {
          this.autocomplete.opened.emit();
        }
      }
      /**
       * @private
       * @return {?}
       */


      _getOverlayConfig() {
        return new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["OverlayConfig"]({
          positionStrategy: this._getOverlayPosition(),
          scrollStrategy: this._scrollStrategy(),
          width: this._getPanelWidth(),
          direction: this._dir
        });
      }
      /**
       * @private
       * @return {?}
       */


      _getOverlayPosition() {
        /** @type {?} */
        const strategy = this._overlay.position().flexibleConnectedTo(this._getConnectedElement()).withFlexibleDimensions(false).withPush(false);

        this._setStrategyPositions(strategy);

        this._positionStrategy = strategy;
        return strategy;
      }
      /**
       * Sets the positions on a position strategy based on the directive's input state.
       * @private
       * @param {?} positionStrategy
       * @return {?}
       */


      _setStrategyPositions(positionStrategy) {
        /** @type {?} */
        const belowPosition = {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        };
        /** @type {?} */

        const abovePosition = {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          // The overlay edge connected to the trigger should have squared corners, while
          // the opposite end has rounded corners. We apply a CSS class to swap the
          // border-radius based on the overlay position.
          panelClass: 'mat-autocomplete-panel-above'
        };
        /** @type {?} */

        let positions;

        if (this.position === 'above') {
          positions = [abovePosition];
        } else if (this.position === 'below') {
          positions = [belowPosition];
        } else {
          positions = [belowPosition, abovePosition];
        }

        positionStrategy.withPositions(positions);
      }
      /**
       * @private
       * @return {?}
       */


      _getConnectedElement() {
        if (this.connectedTo) {
          return this.connectedTo.elementRef;
        }

        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
      }
      /**
       * @private
       * @return {?}
       */


      _getPanelWidth() {
        return this.autocomplete.panelWidth || this._getHostWidth();
      }
      /**
       * Returns the width of the input element, so the panel width can match it.
       * @private
       * @return {?}
       */


      _getHostWidth() {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
      }
      /**
       * Resets the active item to -1 so arrow events will activate the
       * correct options, or to 0 if the consumer opted into it.
       * @private
       * @return {?}
       */


      _resetActiveItem() {
        this.autocomplete._keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
      }
      /**
       * Determines whether the panel can be opened.
       * @private
       * @return {?}
       */


      _canOpen() {
        /** @type {?} */
        const element = this._element.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
      }

    }

    MatAutocompleteTrigger.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
      args: [{
        selector: "input[matAutocomplete], textarea[matAutocomplete]",
        host: {
          'class': 'mat-autocomplete-trigger',
          '[attr.autocomplete]': 'autocompleteAttribute',
          '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
          '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
          '[attr.aria-activedescendant]': '(panelOpen && activeOption) ? activeOption.id : null',
          '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
          '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
          '[attr.aria-haspopup]': '!autocompleteDisabled',
          // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
          // a little earlier. This avoids issues where IE delays the focusing of the input.
          '(focusin)': '_handleFocus()',
          '(blur)': '_onTouched()',
          '(input)': '_handleInput($event)',
          '(keydown)': '_handleKeydown($event)'
        },
        exportAs: 'matAutocompleteTrigger',
        providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
      }]
    }];
    /** @nocollapse */

    MatAutocompleteTrigger.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["Overlay"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
        args: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY]
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
      }]
    }, {
      type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Host"]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DOCUMENT"]]
      }]
    }, {
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ViewportRuler"]
    }];

    MatAutocompleteTrigger.propDecorators = {
      autocomplete: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['matAutocomplete']
      }],
      position: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['matAutocompletePosition']
      }],
      connectedTo: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['matAutocompleteConnectedTo']
      }],
      autocompleteAttribute: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['autocomplete']
      }],
      autocompleteDisabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
        args: ['matAutocompleteDisabled']
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class MatAutocompleteModule {}

    MatAutocompleteModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
      args: [{
        imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOptionModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["OverlayModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatCommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"]],
        exports: [MatAutocomplete, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOptionModule"], MatAutocompleteTrigger, MatAutocompleteOrigin, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatCommonModule"]],
        declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
        providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=autocomplete.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/material/esm2015/form-field.js":
  /*!**************************************************************!*\
    !*** ./node_modules/@angular/material/esm2015/form-field.js ***!
    \**************************************************************/

  /*! exports provided: MatFormFieldModule, MatError, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatFormFieldControl, getMatFormFieldPlaceholderConflictError, getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError, MatHint, MatPlaceholder, MatPrefix, MatSuffix, MatLabel, matFormFieldAnimations */

  /***/
  function node_modulesAngularMaterialEsm2015FormFieldJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatFormFieldModule", function () {
      return MatFormFieldModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatError", function () {
      return MatError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_FORM_FIELD_DEFAULT_OPTIONS", function () {
      return MAT_FORM_FIELD_DEFAULT_OPTIONS;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatFormField", function () {
      return MatFormField;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatFormFieldControl", function () {
      return MatFormFieldControl;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMatFormFieldPlaceholderConflictError", function () {
      return getMatFormFieldPlaceholderConflictError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMatFormFieldDuplicatedHintError", function () {
      return getMatFormFieldDuplicatedHintError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMatFormFieldMissingControlError", function () {
      return getMatFormFieldMissingControlError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatHint", function () {
      return MatHint;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatPlaceholder", function () {
      return MatPlaceholder;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatPrefix", function () {
      return MatPrefix;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatSuffix", function () {
      return MatSuffix;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatLabel", function () {
      return MatLabel;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "matFormFieldAnimations", function () {
      return matFormFieldAnimations;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/fesm2015/animations.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/cdk/observers */
    "./node_modules/@angular/cdk/esm2015/observers.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    let nextUniqueId = 0;
    /**
     * Single error message to be shown underneath the form field.
     */

    class MatError {
      constructor() {
        this.id = "mat-error-".concat(nextUniqueId++);
      }

    }

    MatError.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'mat-error',
        host: {
          'class': 'mat-error',
          'role': 'alert',
          '[attr.id]': 'id'
        }
      }]
    }];
    MatError.propDecorators = {
      id: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Animations used by the MatFormField.
     * \@docs-private
     * @type {?}
     */

    const matFormFieldAnimations = {
      /**
       * Animation that transitions the form field's error and hint messages.
       */
      transitionMessages: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('transitionMessages', [// TODO(mmalerba): Use angular animations for label animation as well.
      Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
        opacity: 1,
        transform: 'translateY(0%)'
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('void => enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
        opacity: 0,
        transform: 'translateY(-100%)'
      }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('300ms cubic-bezier(0.55, 0, 0.55, 0.2)')])])
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * An interface which allows a control to work inside of a `MatFormField`.
     * @abstract
     * @template T
     */

    class MatFormFieldControl {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@docs-private
     * @return {?}
     */


    function getMatFormFieldPlaceholderConflictError() {
      return Error('Placeholder attribute and child element were both specified.');
    }
    /**
     * \@docs-private
     * @param {?} align
     * @return {?}
     */


    function getMatFormFieldDuplicatedHintError(align) {
      return Error("A hint was already declared for 'align=\"".concat(align, "\"'."));
    }
    /**
     * \@docs-private
     * @return {?}
     */


    function getMatFormFieldMissingControlError() {
      return Error('mat-form-field must contain a MatFormFieldControl.');
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    let nextUniqueId$1 = 0;
    /**
     * Hint text to be shown underneath the form field control.
     */

    class MatHint {
      constructor() {
        /**
         * Whether to align the hint label at the start or end of the line.
         */
        this.align = 'start';
        /**
         * Unique ID for the hint. Used for the aria-describedby on the form field control.
         */

        this.id = "mat-hint-".concat(nextUniqueId$1++);
      }

    }

    MatHint.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'mat-hint',
        host: {
          'class': 'mat-hint',
          '[class.mat-right]': 'align == "end"',
          '[attr.id]': 'id',
          // Remove align attribute to prevent it from interfering with layout.
          '[attr.align]': 'null'
        }
      }]
    }];
    MatHint.propDecorators = {
      align: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      id: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The floating label for a `mat-form-field`.
     */

    class MatLabel {}

    MatLabel.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'mat-label'
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The placeholder text for an `MatFormField`.
     * @deprecated Use `<mat-label>` to specify the label and the `placeholder` attribute to specify the
     *     placeholder.
     * \@breaking-change 8.0.0
     */

    class MatPlaceholder {}

    MatPlaceholder.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: 'mat-placeholder'
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Prefix to be placed in front of the form field.
     */

    class MatPrefix {}

    MatPrefix.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[matPrefix]'
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Suffix to be placed at the end of the form field.
     */

    class MatSuffix {}

    MatSuffix.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[matSuffix]'
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */

    let nextUniqueId$2 = 0;
    /** @type {?} */

    const floatingLabelScale = 0.75;
    /** @type {?} */

    const outlineGapPadding = 5;
    /**
     * Boilerplate for applying mixins to MatFormField.
     * \@docs-private
     */

    class MatFormFieldBase {
      /**
       * @param {?} _elementRef
       */
      constructor(_elementRef) {
        this._elementRef = _elementRef;
      }

    }
    /**
     * Base class to which we're applying the form field mixins.
     * \@docs-private
     * @type {?}
     */


    const _MatFormFieldMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["mixinColor"])(MatFormFieldBase, 'primary');
    /**
     * Injection token that can be used to configure the
     * default options for all form field within an app.
     * @type {?}
     */


    const MAT_FORM_FIELD_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MAT_FORM_FIELD_DEFAULT_OPTIONS');
    /**
     * Container for form controls that applies Material Design styling and behavior.
     */

    class MatFormField extends _MatFormFieldMixinBase {
      /**
       * @param {?} _elementRef
       * @param {?} _changeDetectorRef
       * @param {?} labelOptions
       * @param {?} _dir
       * @param {?} _defaults
       * @param {?} _platform
       * @param {?} _ngZone
       * @param {?} _animationMode
       */
      constructor(_elementRef, _changeDetectorRef, labelOptions, _dir, _defaults, _platform, _ngZone, _animationMode) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._defaults = _defaults;
        this._platform = _platform;
        this._ngZone = _ngZone;
        /**
         * Whether the outline gap needs to be calculated
         * immediately on the next change detection run.
         */

        this._outlineGapCalculationNeededImmediately = false;
        /**
         * Whether the outline gap needs to be calculated next time the zone has stabilized.
         */

        this._outlineGapCalculationNeededOnStable = false;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        /**
         * Override for the logic that disables the label animation in certain cases.
         */

        this._showAlwaysAnimate = false;
        /**
         * State of the mat-hint and mat-error animations.
         */

        this._subscriptAnimationState = '';
        this._hintLabel = ''; // Unique id for the hint label.

        this._hintLabelId = "mat-hint-".concat(nextUniqueId$2++); // Unique id for the internal form field label.

        this._labelId = "mat-form-field-label-".concat(nextUniqueId$2++);
        /* Holds the previous direction emitted by directionality service change emitter.
             This is used in updateOutlineGap() method to update the width and position of the gap in the
             outline. Only relevant for the outline appearance. The direction is getting updated in the
             UI after directionality service change emission. So the outlines gaps are getting
             updated in updateOutlineGap() method before connectionContainer child direction change
             in UI. We may get wrong calculations. So we are storing the previous direction to get the
             correct outline calculations*/

        this._previousDirection = 'ltr';
        this._labelOptions = labelOptions ? labelOptions : {};
        this.floatLabel = this._labelOptions.float || 'auto';
        this._animationsEnabled = _animationMode !== 'NoopAnimations'; // Set the default through here so we invoke the setter on the first run.

        this.appearance = _defaults && _defaults.appearance ? _defaults.appearance : 'legacy';
        this._hideRequiredMarker = _defaults && _defaults.hideRequiredMarker != null ? _defaults.hideRequiredMarker : false;
      }
      /**
       * The form-field appearance style.
       * @return {?}
       */


      get appearance() {
        return this._appearance;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set appearance(value) {
        /** @type {?} */
        const oldValue = this._appearance;
        this._appearance = value || this._defaults && this._defaults.appearance || 'legacy';

        if (this._appearance === 'outline' && oldValue !== value) {
          this._outlineGapCalculationNeededOnStable = true;
        }
      }
      /**
       * Whether the required marker should be hidden.
       * @return {?}
       */


      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set hideRequiredMarker(value) {
        this._hideRequiredMarker = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether the floating label should always float or not.
       * @return {?}
       */


      get _shouldAlwaysFloat() {
        return this.floatLabel === 'always' && !this._showAlwaysAnimate;
      }
      /**
       * Whether the label can float or not.
       * @return {?}
       */


      get _canLabelFloat() {
        return this.floatLabel !== 'never';
      }
      /**
       * Text for the form field hint.
       * @return {?}
       */


      get hintLabel() {
        return this._hintLabel;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set hintLabel(value) {
        this._hintLabel = value;

        this._processHints();
      }
      /**
       * Whether the label should always float, never float or float as the user types.
       *
       * Note: only the legacy appearance supports the `never` option. `never` was originally added as a
       * way to make the floating label emulate the behavior of a standard input placeholder. However
       * the form field now supports both floating labels and placeholders. Therefore in the non-legacy
       * appearances the `never` option has been disabled in favor of just using the placeholder.
       * @return {?}
       */


      get floatLabel() {
        return this.appearance !== 'legacy' && this._floatLabel === 'never' ? 'auto' : this._floatLabel;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set floatLabel(value) {
        if (value !== this._floatLabel) {
          this._floatLabel = value || this._labelOptions.float || 'auto';

          this._changeDetectorRef.markForCheck();
        }
      }
      /**
       * @return {?}
       */


      get _control() {
        // TODO(crisbeto): we need this hacky workaround in order to support both Ivy
        // and ViewEngine. We should clean this up once Ivy is the default renderer.
        return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set _control(value) {
        this._explicitFormFieldControl = value;
      }
      /**
       * @return {?}
       */


      get _labelChild() {
        return this._labelChildNonStatic || this._labelChildStatic;
      }
      /**
       * Gets an ElementRef for the element that a overlay attached to the form-field should be
       * positioned relative to.
       * @return {?}
       */


      getConnectedOverlayOrigin() {
        return this._connectionContainerRef || this._elementRef;
      }
      /**
       * @return {?}
       */


      ngAfterContentInit() {
        this._validateControlChild();
        /** @type {?} */


        const control = this._control;

        if (control.controlType) {
          this._elementRef.nativeElement.classList.add("mat-form-field-type-".concat(control.controlType));
        } // Subscribe to changes in the child control state in order to update the form field UI.


        control.stateChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(
        /** @type {?} */
        null)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._validatePlaceholders();

          this._syncDescribedByIds();

          this._changeDetectorRef.markForCheck();
        }); // Run change detection if the value changes.

        if (control.ngControl && control.ngControl.valueChanges) {
          control.ngControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this._destroyed)).subscribe(
          /**
          * @return {?}
          */
          () => this._changeDetectorRef.markForCheck());
        } // Note that we have to run outside of the `NgZone` explicitly,
        // in order to avoid throwing users into an infinite loop
        // if `zone-patch-rxjs` is included.


        this._ngZone.runOutsideAngular(
        /**
        * @return {?}
        */
        () => {
          this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this._destroyed)).subscribe(
          /**
          * @return {?}
          */
          () => {
            if (this._outlineGapCalculationNeededOnStable) {
              this.updateOutlineGap();
            }
          });
        }); // Run change detection and update the outline if the suffix or prefix changes.


        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["merge"])(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._outlineGapCalculationNeededOnStable = true;

          this._changeDetectorRef.markForCheck();
        }); // Re-validate when the number of hints changes.

        this._hintChildren.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(null)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._processHints();

          this._changeDetectorRef.markForCheck();
        }); // Update the aria-described by when the number of errors changes.


        this._errorChildren.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(null)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._syncDescribedByIds();

          this._changeDetectorRef.markForCheck();
        });

        if (this._dir) {
          this._dir.change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this._destroyed)).subscribe(
          /**
          * @return {?}
          */
          () => {
            this.updateOutlineGap();
            this._previousDirection = this._dir.value;
          });
        }
      }
      /**
       * @return {?}
       */


      ngAfterContentChecked() {
        this._validateControlChild();

        if (this._outlineGapCalculationNeededImmediately) {
          this.updateOutlineGap();
        }
      }
      /**
       * @return {?}
       */


      ngAfterViewInit() {
        // Avoid animations on load.
        this._subscriptAnimationState = 'enter';

        this._changeDetectorRef.detectChanges();
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._destroyed.next();

        this._destroyed.complete();
      }
      /**
       * Determines whether a class from the NgControl should be forwarded to the host element.
       * @param {?} prop
       * @return {?}
       */


      _shouldForward(prop) {
        /** @type {?} */
        const ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
      }
      /**
       * @return {?}
       */


      _hasPlaceholder() {
        return !!(this._control && this._control.placeholder || this._placeholderChild);
      }
      /**
       * @return {?}
       */


      _hasLabel() {
        return !!this._labelChild;
      }
      /**
       * @return {?}
       */


      _shouldLabelFloat() {
        return this._canLabelFloat && (this._control.shouldLabelFloat || this._shouldAlwaysFloat);
      }
      /**
       * @return {?}
       */


      _hideControlPlaceholder() {
        // In the legacy appearance the placeholder is promoted to a label if no label is given.
        return this.appearance === 'legacy' && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat();
      }
      /**
       * @return {?}
       */


      _hasFloatingLabel() {
        // In the legacy appearance the placeholder is promoted to a label if no label is given.
        return this._hasLabel() || this.appearance === 'legacy' && this._hasPlaceholder();
      }
      /**
       * Determines whether to display hints or errors.
       * @return {?}
       */


      _getDisplayedMessages() {
        return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? 'error' : 'hint';
      }
      /**
       * Animates the placeholder up and locks it in position.
       * @return {?}
       */


      _animateAndLockLabel() {
        if (this._hasFloatingLabel() && this._canLabelFloat) {
          // If animations are disabled, we shouldn't go in here,
          // because the `transitionend` will never fire.
          if (this._animationsEnabled) {
            this._showAlwaysAnimate = true;
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(this._label.nativeElement, 'transitionend').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)).subscribe(
            /**
            * @return {?}
            */
            () => {
              this._showAlwaysAnimate = false;
            });
          }

          this.floatLabel = 'always';

          this._changeDetectorRef.markForCheck();
        }
      }
      /**
       * Ensure that there is only one placeholder (either `placeholder` attribute on the child control
       * or child element with the `mat-placeholder` directive).
       * @private
       * @return {?}
       */


      _validatePlaceholders() {
        if (this._control.placeholder && this._placeholderChild) {
          throw getMatFormFieldPlaceholderConflictError();
        }
      }
      /**
       * Does any extra processing that is required when handling the hints.
       * @private
       * @return {?}
       */


      _processHints() {
        this._validateHints();

        this._syncDescribedByIds();
      }
      /**
       * Ensure that there is a maximum of one of each `<mat-hint>` alignment specified, with the
       * attribute being considered as `align="start"`.
       * @private
       * @return {?}
       */


      _validateHints() {
        if (this._hintChildren) {
          /** @type {?} */
          let startHint;
          /** @type {?} */

          let endHint;

          this._hintChildren.forEach(
          /**
          * @param {?} hint
          * @return {?}
          */
          hint => {
            if (hint.align === 'start') {
              if (startHint || this.hintLabel) {
                throw getMatFormFieldDuplicatedHintError('start');
              }

              startHint = hint;
            } else if (hint.align === 'end') {
              if (endHint) {
                throw getMatFormFieldDuplicatedHintError('end');
              }

              endHint = hint;
            }
          });
        }
      }
      /**
       * Sets the list of element IDs that describe the child control. This allows the control to update
       * its `aria-describedby` attribute accordingly.
       * @private
       * @return {?}
       */


      _syncDescribedByIds() {
        if (this._control) {
          /** @type {?} */
          let ids = [];

          if (this._getDisplayedMessages() === 'hint') {
            /** @type {?} */
            const startHint = this._hintChildren ? this._hintChildren.find(
            /**
            * @param {?} hint
            * @return {?}
            */
            hint => hint.align === 'start') : null;
            /** @type {?} */

            const endHint = this._hintChildren ? this._hintChildren.find(
            /**
            * @param {?} hint
            * @return {?}
            */
            hint => hint.align === 'end') : null;

            if (startHint) {
              ids.push(startHint.id);
            } else if (this._hintLabel) {
              ids.push(this._hintLabelId);
            }

            if (endHint) {
              ids.push(endHint.id);
            }
          } else if (this._errorChildren) {
            ids = this._errorChildren.map(
            /**
            * @param {?} error
            * @return {?}
            */
            error => error.id);
          }

          this._control.setDescribedByIds(ids);
        }
      }
      /**
       * Throws an error if the form field's control is missing.
       * @protected
       * @return {?}
       */


      _validateControlChild() {
        if (!this._control) {
          throw getMatFormFieldMissingControlError();
        }
      }
      /**
       * Updates the width and position of the gap in the outline. Only relevant for the outline
       * appearance.
       * @return {?}
       */


      updateOutlineGap() {
        /** @type {?} */
        const labelEl = this._label ? this._label.nativeElement : null;

        if (this.appearance !== 'outline' || !labelEl || !labelEl.children.length || !labelEl.textContent.trim()) {
          return;
        }

        if (!this._platform.isBrowser) {
          // getBoundingClientRect isn't available on the server.
          return;
        } // If the element is not present in the DOM, the outline gap will need to be calculated
        // the next time it is checked and in the DOM.


        if (!
        /** @type {?} */
        document.documentElement.contains(this._elementRef.nativeElement)) {
          this._outlineGapCalculationNeededImmediately = true;
          return;
        }
        /** @type {?} */


        let startWidth = 0;
        /** @type {?} */

        let gapWidth = 0;
        /** @type {?} */

        const container = this._connectionContainerRef.nativeElement;
        /** @type {?} */

        const startEls = container.querySelectorAll('.mat-form-field-outline-start');
        /** @type {?} */

        const gapEls = container.querySelectorAll('.mat-form-field-outline-gap');

        if (this._label && this._label.nativeElement.children.length) {
          /** @type {?} */
          const containerRect = container.getBoundingClientRect(); // If the container's width and height are zero, it means that the element is
          // invisible and we can't calculate the outline gap. Mark the element as needing
          // to be checked the next time the zone stabilizes. We can't do this immediately
          // on the next change detection, because even if the element becomes visible,
          // the `ClientRect` won't be reclaculated immediately. We reset the
          // `_outlineGapCalculationNeededImmediately` flag some we don't run the checks twice.

          if (containerRect.width === 0 && containerRect.height === 0) {
            this._outlineGapCalculationNeededOnStable = true;
            this._outlineGapCalculationNeededImmediately = false;
            return;
          }
          /** @type {?} */


          const containerStart = this._getStartEnd(containerRect);
          /** @type {?} */


          const labelStart = this._getStartEnd(labelEl.children[0].getBoundingClientRect());
          /** @type {?} */


          let labelWidth = 0;

          for (const child of labelEl.children) {
            labelWidth += child.offsetWidth;
          }

          startWidth = labelStart - containerStart - outlineGapPadding;
          gapWidth = labelWidth > 0 ? labelWidth * floatingLabelScale + outlineGapPadding * 2 : 0;
        }

        for (let i = 0; i < startEls.length; i++) {
          startEls.item(i).style.width = "".concat(startWidth, "px");
        }

        for (let i = 0; i < gapEls.length; i++) {
          gapEls.item(i).style.width = "".concat(gapWidth, "px");
        }

        this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = false;
      }
      /**
       * Gets the start end of the rect considering the current directionality.
       * @private
       * @param {?} rect
       * @return {?}
       */


      _getStartEnd(rect) {
        return this._previousDirection === 'rtl' ? rect.right : rect.left;
      }

    }

    MatFormField.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'mat-form-field',
        exportAs: 'matFormField',
        template: "<div class=\"mat-form-field-wrapper\"><div class=\"mat-form-field-flex\" #connectionContainer (click)=\"_control.onContainerClick && _control.onContainerClick($event)\"><ng-container *ngIf=\"appearance == 'outline'\"><div class=\"mat-form-field-outline\"><div class=\"mat-form-field-outline-start\"></div><div class=\"mat-form-field-outline-gap\"></div><div class=\"mat-form-field-outline-end\"></div></div><div class=\"mat-form-field-outline mat-form-field-outline-thick\"><div class=\"mat-form-field-outline-start\"></div><div class=\"mat-form-field-outline-gap\"></div><div class=\"mat-form-field-outline-end\"></div></div></ng-container><div class=\"mat-form-field-prefix\" *ngIf=\"_prefixChildren.length\"><ng-content select=\"[matPrefix]\"></ng-content></div><div class=\"mat-form-field-infix\" #inputContainer><ng-content></ng-content><span class=\"mat-form-field-label-wrapper\"><label class=\"mat-form-field-label\" (cdkObserveContent)=\"updateOutlineGap()\" [cdkObserveContentDisabled]=\"appearance != 'outline'\" [id]=\"_labelId\" [attr.for]=\"_control.id\" [attr.aria-owns]=\"_control.id\" [class.mat-empty]=\"_control.empty && !_shouldAlwaysFloat\" [class.mat-form-field-empty]=\"_control.empty && !_shouldAlwaysFloat\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\" #label *ngIf=\"_hasFloatingLabel()\" [ngSwitch]=\"_hasLabel()\"><ng-container *ngSwitchCase=\"false\"><ng-content select=\"mat-placeholder\"></ng-content><span>{{_control.placeholder}}</span></ng-container><ng-content select=\"mat-label\" *ngSwitchCase=\"true\"></ng-content><span class=\"mat-placeholder-required mat-form-field-required-marker\" aria-hidden=\"true\" *ngIf=\"!hideRequiredMarker && _control.required && !_control.disabled\">&#32;*</span></label></span></div><div class=\"mat-form-field-suffix\" *ngIf=\"_suffixChildren.length\"><ng-content select=\"[matSuffix]\"></ng-content></div></div><div class=\"mat-form-field-underline\" #underline *ngIf=\"appearance != 'outline'\"><span class=\"mat-form-field-ripple\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\"></span></div><div class=\"mat-form-field-subscript-wrapper\" [ngSwitch]=\"_getDisplayedMessages()\"><div *ngSwitchCase=\"'error'\" [@transitionMessages]=\"_subscriptAnimationState\"><ng-content select=\"mat-error\"></ng-content></div><div class=\"mat-form-field-hint-wrapper\" *ngSwitchCase=\"'hint'\" [@transitionMessages]=\"_subscriptAnimationState\"><div *ngIf=\"hintLabel\" [id]=\"_hintLabelId\" class=\"mat-hint\">{{hintLabel}}</div><ng-content select=\"mat-hint:not([align='end'])\"></ng-content><div class=\"mat-form-field-hint-spacer\"></div><ng-content select=\"mat-hint[align='end']\"></ng-content></div></div></div>",
        // MatInput is a directive and can't have styles, so we need to include its styles here
        // in form-field-input.css. The MatInput styles are fairly minimal so it shouldn't be a
        // big deal for people who aren't using MatInput.
        styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}@media (-ms-high-contrast:active){.mat-form-field-infix{border-image:linear-gradient(transparent,transparent)}}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-empty.mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scaleY(1.0001)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);opacity:0;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:scaleX(1);transition:transform .3s cubic-bezier(.25,.8,.25,1),opacity .1s cubic-bezier(.25,.8,.25,1),background-color .3s cubic-bezier(.25,.8,.25,1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-label-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none} .mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}@media (-ms-high-contrast:active){.mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:'';display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}@media (-ms-high-contrast:active){.mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em} .mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=month]::after,.mat-input-element[type=time]::after,.mat-input-element[type=week]::after{content:' ';white-space:pre;width:1px}.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button,.mat-input-element::-webkit-inner-spin-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:0 0}@media (-ms-high-contrast:active){.mat-focused select.mat-input-element::-ms-value{color:inherit}}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:'';width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px} .mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px} .mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-start{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start{border-width:2px;transition:border-color .3s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity .1s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline{transition:none} .mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:2px}}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}"],
        animations: [matFormFieldAnimations.transitionMessages],
        host: {
          'class': 'mat-form-field',
          '[class.mat-form-field-appearance-standard]': 'appearance == "standard"',
          '[class.mat-form-field-appearance-fill]': 'appearance == "fill"',
          '[class.mat-form-field-appearance-outline]': 'appearance == "outline"',
          '[class.mat-form-field-appearance-legacy]': 'appearance == "legacy"',
          '[class.mat-form-field-invalid]': '_control.errorState',
          '[class.mat-form-field-can-float]': '_canLabelFloat',
          '[class.mat-form-field-should-float]': '_shouldLabelFloat()',
          '[class.mat-form-field-has-label]': '_hasFloatingLabel()',
          '[class.mat-form-field-hide-placeholder]': '_hideControlPlaceholder()',
          '[class.mat-form-field-disabled]': '_control.disabled',
          '[class.mat-form-field-autofilled]': '_control.autofilled',
          '[class.mat-focused]': '_control.focused',
          '[class.mat-accent]': 'color == "accent"',
          '[class.mat-warn]': 'color == "warn"',
          '[class.ng-untouched]': '_shouldForward("untouched")',
          '[class.ng-touched]': '_shouldForward("touched")',
          '[class.ng-pristine]': '_shouldForward("pristine")',
          '[class.ng-dirty]': '_shouldForward("dirty")',
          '[class.ng-valid]': '_shouldForward("valid")',
          '[class.ng-invalid]': '_shouldForward("invalid")',
          '[class.ng-pending]': '_shouldForward("pending")',
          '[class._mat-animation-noopable]': '!_animationsEnabled'
        },
        inputs: ['color'],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
      }]
    }];
    /** @nocollapse */

    MatFormField.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MAT_LABEL_GLOBAL_OPTIONS"]]
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [MAT_FORM_FIELD_DEFAULT_OPTIONS]
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__["Platform"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
    }, {
      type: String,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
        args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]
      }]
    }];

    MatFormField.propDecorators = {
      appearance: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      hideRequiredMarker: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      hintLabel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      floatLabel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      underlineRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['underline', {
          static: false
        }]
      }],
      _connectionContainerRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['connectionContainer', {
          static: true
        }]
      }],
      _inputContainerRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['inputContainer', {
          static: false
        }]
      }],
      _label: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['label', {
          static: false
        }]
      }],
      _controlNonStatic: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [MatFormFieldControl, {
          static: false
        }]
      }],
      _controlStatic: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [MatFormFieldControl, {
          static: true
        }]
      }],
      _labelChildNonStatic: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [MatLabel, {
          static: false
        }]
      }],
      _labelChildStatic: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [MatLabel, {
          static: true
        }]
      }],
      _placeholderChild: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [MatPlaceholder, {
          static: false
        }]
      }],
      _errorChildren: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
        args: [MatError]
      }],
      _hintChildren: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
        args: [MatHint]
      }],
      _prefixChildren: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
        args: [MatPrefix]
      }],
      _suffixChildren: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
        args: [MatSuffix]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class MatFormFieldModule {}

    MatFormFieldModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: [MatError, MatFormField, MatHint, MatLabel, MatPlaceholder, MatPrefix, MatSuffix],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__["ObserversModule"]],
        exports: [MatError, MatFormField, MatHint, MatLabel, MatPlaceholder, MatPrefix, MatSuffix]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=form-field.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/material/esm2015/input.js":
  /*!*********************************************************!*\
    !*** ./node_modules/@angular/material/esm2015/input.js ***!
    \*********************************************************/

  /*! exports provided: MatTextareaAutosize, MatInput, getMatInputUnsupportedTypeError, MatInputModule, MAT_INPUT_VALUE_ACCESSOR */

  /***/
  function node_modulesAngularMaterialEsm2015InputJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatTextareaAutosize", function () {
      return MatTextareaAutosize;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatInput", function () {
      return MatInput;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getMatInputUnsupportedTypeError", function () {
      return getMatInputUnsupportedTypeError;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatInputModule", function () {
      return MatInputModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_INPUT_VALUE_ACCESSOR", function () {
      return MAT_INPUT_VALUE_ACCESSOR;
    });
    /* harmony import */


    var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/cdk/text-field */
    "./node_modules/@angular/cdk/esm2015/text-field.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Directive to automatically resize a textarea to fit its content.
     * @deprecated Use `cdkTextareaAutosize` from `\@angular/cdk/text-field` instead.
     * \@breaking-change 8.0.0
     */


    class MatTextareaAutosize extends _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__["CdkTextareaAutosize"] {
      /**
       * @return {?}
       */
      get matAutosizeMinRows() {
        return this.minRows;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set matAutosizeMinRows(value) {
        this.minRows = value;
      }
      /**
       * @return {?}
       */


      get matAutosizeMaxRows() {
        return this.maxRows;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set matAutosizeMaxRows(value) {
        this.maxRows = value;
      }
      /**
       * @return {?}
       */


      get matAutosize() {
        return this.enabled;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set matAutosize(value) {
        this.enabled = value;
      }
      /**
       * @return {?}
       */


      get matTextareaAutosize() {
        return this.enabled;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set matTextareaAutosize(value) {
        this.enabled = value;
      }

    }

    MatTextareaAutosize.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
      args: [{
        selector: 'textarea[mat-autosize], textarea[matTextareaAutosize]',
        exportAs: 'matTextareaAutosize',
        inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
        host: {
          'class': 'cdk-textarea-autosize mat-autosize',
          // Textarea elements that have the directive applied should have a single row by default.
          // Browsers normally show two rows by default and therefore this limits the minRows binding.
          'rows': '1',
          '(input)': '_noopInputHandler()'
        }
      }]
    }];
    MatTextareaAutosize.propDecorators = {
      matAutosizeMinRows: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      matAutosizeMaxRows: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      matAutosize: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
        args: ['mat-autosize']
      }],
      matTextareaAutosize: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * \@docs-private
     * @param {?} type
     * @return {?}
     */

    function getMatInputUnsupportedTypeError(type) {
      return Error("Input type \"".concat(type, "\" isn't supported by matInput."));
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * This token is used to inject the object whose value should be set into `MatInput`. If none is
     * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
     * themselves for this token, in order to make `MatInput` delegate the getting and setting of the
     * value to them.
     * @type {?}
     */


    const MAT_INPUT_VALUE_ACCESSOR = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('MAT_INPUT_VALUE_ACCESSOR');
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.

    /** @type {?} */

    const MAT_INPUT_INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'];
    /** @type {?} */

    let nextUniqueId = 0; // Boilerplate for applying mixins to MatInput.

    /**
     * \@docs-private
     */

    class MatInputBase {
      /**
       * @param {?} _defaultErrorStateMatcher
       * @param {?} _parentForm
       * @param {?} _parentFormGroup
       * @param {?} ngControl
       */
      constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
      }

    }
    /** @type {?} */


    const _MatInputMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_5__["mixinErrorState"])(MatInputBase);
    /**
     * Directive that allows a native input to work inside a `MatFormField`.
     */


    class MatInput extends _MatInputMixinBase {
      /**
       * @param {?} _elementRef
       * @param {?} _platform
       * @param {?} ngControl
       * @param {?} _parentForm
       * @param {?} _parentFormGroup
       * @param {?} _defaultErrorStateMatcher
       * @param {?} inputValueAccessor
       * @param {?} _autofillMonitor
       * @param {?} ngZone
       */
      constructor(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, _autofillMonitor, ngZone) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this.ngControl = ngControl;
        this._autofillMonitor = _autofillMonitor;
        this._uid = "mat-input-".concat(nextUniqueId++);
        /**
         * Whether the component is being rendered on the server.
         */

        this._isServer = false;
        /**
         * Whether the component is a native html select.
         */

        this._isNativeSelect = false;
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */

        this.focused = false;
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */

        this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */

        this.controlType = 'mat-input';
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */

        this.autofilled = false;
        this._disabled = false;
        this._required = false;
        this._type = 'text';
        this._readonly = false;
        this._neverEmptyInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter(
        /**
        * @param {?} t
        * @return {?}
        */
        t => Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__["getSupportedInputTypes"])().has(t));
        /** @type {?} */

        const element = this._elementRef.nativeElement; // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.

        this._inputValueAccessor = inputValueAccessor || element;
        this._previousNativeValue = this.value; // Force setter to be called in case id was not specified.

        this.id = this.id; // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
        // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
        // exists on iOS, we only bother to install the listener on iOS.

        if (_platform.IOS) {
          ngZone.runOutsideAngular(
          /**
          * @return {?}
          */
          () => {
            _elementRef.nativeElement.addEventListener('keyup',
            /**
            * @param {?} event
            * @return {?}
            */
            event => {
              /** @type {?} */
              let el =
              /** @type {?} */
              event.target;

              if (!el.value && !el.selectionStart && !el.selectionEnd) {
                // Note: Just setting `0, 0` doesn't fix the issue. Setting
                // `1, 1` fixes it for the first time that you type text and
                // then hold delete. Toggling to `1, 1` and then back to
                // `0, 0` seems to completely fix it.
                el.setSelectionRange(1, 1);
                el.setSelectionRange(0, 0);
              }
            });
          });
        }

        this._isServer = !this._platform.isBrowser;
        this._isNativeSelect = element.nodeName.toLowerCase() === 'select';

        if (this._isNativeSelect) {
          this.controlType =
          /** @type {?} */
          element.multiple ? 'mat-native-select-multiple' : 'mat-native-select';
        }
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
          return this.ngControl.disabled;
        }

        return this._disabled;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set disabled(value) {
        this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value); // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.

        if (this.focused) {
          this.focused = false;
          this.stateChanges.next();
        }
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get id() {
        return this._id;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set id(value) {
        this._id = value || this._uid;
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get required() {
        return this._required;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set required(value) {
        this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
      }
      /**
       * Input type of the element.
       * @return {?}
       */


      get type() {
        return this._type;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set type(value) {
        this._type = value || 'text';

        this._validateType(); // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.


        if (!this._isTextarea() && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__["getSupportedInputTypes"])().has(this._type)) {
          /** @type {?} */
          this._elementRef.nativeElement.type = this._type;
        }
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get value() {
        return this._inputValueAccessor.value;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set value(value) {
        if (value !== this.value) {
          this._inputValueAccessor.value = value;
          this.stateChanges.next();
        }
      }
      /**
       * Whether the element is readonly.
       * @return {?}
       */


      get readonly() {
        return this._readonly;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set readonly(value) {
        this._readonly = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        if (this._platform.isBrowser) {
          this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(
          /**
          * @param {?} event
          * @return {?}
          */
          event => {
            this.autofilled = event.isAutofilled;
            this.stateChanges.next();
          });
        }
      }
      /**
       * @return {?}
       */


      ngOnChanges() {
        this.stateChanges.next();
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this.stateChanges.complete();

        if (this._platform.isBrowser) {
          this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
      }
      /**
       * @return {?}
       */


      ngDoCheck() {
        if (this.ngControl) {
          // We need to re-evaluate this on every change detection cycle, because there are some
          // error triggers that we can't subscribe to (e.g. parent form submissions). This means
          // that whatever logic is in here has to be super lean or we risk destroying the performance.
          this.updateErrorState();
        } // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).


        this._dirtyCheckNativeValue();
      }
      /**
       * Focuses the input.
       * @param {?=} options
       * @return {?}
       */


      focus(options) {
        this._elementRef.nativeElement.focus(options);
      }
      /**
       * Callback for the cases where the focused state of the input changes.
       * @param {?} isFocused
       * @return {?}
       */


      _focusChanged(isFocused) {
        if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
          this.focused = isFocused;
          this.stateChanges.next();
        }
      }
      /**
       * @return {?}
       */


      _onInput() {} // This is a noop function and is used to let Angular know whenever the value changes.
      // Angular will run a new change detection each time the `input` event has been dispatched.
      // It's necessary that Angular recognizes the value change, because when floatingLabel
      // is set to false and Angular forms aren't used, the placeholder won't recognize the
      // value changes and will not disappear.
      // Listening to the input event wouldn't be necessary when the input is using the
      // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.

      /**
       * Does some manual dirty checking on the native input `value` property.
       * @protected
       * @return {?}
       */


      _dirtyCheckNativeValue() {
        /** @type {?} */
        const newValue = this._elementRef.nativeElement.value;

        if (this._previousNativeValue !== newValue) {
          this._previousNativeValue = newValue;
          this.stateChanges.next();
        }
      }
      /**
       * Make sure the input is a supported type.
       * @protected
       * @return {?}
       */


      _validateType() {
        if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
          throw getMatInputUnsupportedTypeError(this._type);
        }
      }
      /**
       * Checks whether the input type is one of the types that are never empty.
       * @protected
       * @return {?}
       */


      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      /**
       * Checks whether the input is invalid based on the native validation.
       * @protected
       * @return {?}
       */


      _isBadInput() {
        // The `validity` property won't be present on platform-server.

        /** @type {?} */
        let validity =
        /** @type {?} */
        this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
      }
      /**
       * Determines if the component host is a textarea.
       * @protected
       * @return {?}
       */


      _isTextarea() {
        return this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          // For a single-selection `<select>`, the label should float when the selected option has
          // a non-empty display value. For a `<select multiple>`, the label *always* floats to avoid
          // overlapping the label with the options.

          /** @type {?} */
          const selectElement =
          /** @type {?} */
          this._elementRef.nativeElement;
          /** @type {?} */

          const firstOption = selectElement.options[0]; // On most browsers the `selectedIndex` will always be 0, however on IE and Edge it'll be
          // -1 if the `value` is set to something, that isn't in the list of options, at a later point.

          return this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label);
        } else {
          return this.focused || !this.empty;
        }
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @param {?} ids
       * @return {?}
       */


      setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      onContainerClick() {
        // Do not re-focus the input element if the element is already focused. Otherwise it can happen
        // that someone clicks on a time input and the cursor resets to the "hours" field while the
        // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
        if (!this.focused) {
          this.focus();
        }
      }

    }

    MatInput.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
      args: [{
        selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]",
        exportAs: 'matInput',
        host: {
          /**
           * \@breaking-change 8.0.0 remove .mat-form-field-autofill-control in favor of AutofillMonitor.
           */
          'class': 'mat-input-element mat-form-field-autofill-control',
          '[class.mat-input-server]': '_isServer',
          // Native input properties that are overwritten by Angular inputs need to be synced with
          // the native input element. Otherwise property bindings for those don't work.
          '[attr.id]': 'id',
          '[attr.placeholder]': 'placeholder',
          '[disabled]': 'disabled',
          '[required]': 'required',
          '[attr.readonly]': 'readonly && !_isNativeSelect || null',
          '[attr.aria-describedby]': '_ariaDescribedby || null',
          '[attr.aria-invalid]': 'errorState',
          '[attr.aria-required]': 'required.toString()',
          '(blur)': '_focusChanged(false)',
          '(focus)': '_focusChanged(true)',
          '(input)': '_onInput()'
        },
        providers: [{
          provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldControl"],
          useExisting: MatInput
        }]
      }]
    }];
    /** @nocollapse */

    MatInput.ctorParameters = () => [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_3__["Platform"]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Self"]
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
      }]
    }, {
      type: _angular_material_core__WEBPACK_IMPORTED_MODULE_5__["ErrorStateMatcher"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
        args: [MAT_INPUT_VALUE_ACCESSOR]
      }]
    }, {
      type: _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__["AutofillMonitor"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
    }];

    MatInput.propDecorators = {
      disabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      id: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      placeholder: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      required: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      type: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      errorStateMatcher: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      readonly: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class MatInputModule {}

    MatInputModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
      args: [{
        declarations: [MatInput, MatTextareaAutosize],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["CommonModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__["TextFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"]],
        exports: [_angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_0__["TextFieldModule"], // We re-export the `MatFormFieldModule` since `MatInput` will almost always
        // be used together with `MatFormField`.
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"], MatInput, MatTextareaAutosize],
        providers: [_angular_material_core__WEBPACK_IMPORTED_MODULE_5__["ErrorStateMatcher"]]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=input.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/material/esm2015/select.js":
  /*!**********************************************************!*\
    !*** ./node_modules/@angular/material/esm2015/select.js ***!
    \**********************************************************/

  /*! exports provided: MatSelectModule, MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_ITEM_HEIGHT_EM, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MAT_SELECT_SCROLL_STRATEGY, MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelectChange, MatSelectTrigger, MatSelect, matSelectAnimations, transformPanel, fadeInContent */

  /***/
  function node_modulesAngularMaterialEsm2015SelectJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatSelectModule", function () {
      return MatSelectModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY", function () {
      return MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_PANEL_MAX_HEIGHT", function () {
      return SELECT_PANEL_MAX_HEIGHT;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_PANEL_PADDING_X", function () {
      return SELECT_PANEL_PADDING_X;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_PANEL_INDENT_PADDING_X", function () {
      return SELECT_PANEL_INDENT_PADDING_X;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_ITEM_HEIGHT_EM", function () {
      return SELECT_ITEM_HEIGHT_EM;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_MULTIPLE_PANEL_PADDING_X", function () {
      return SELECT_MULTIPLE_PANEL_PADDING_X;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECT_PANEL_VIEWPORT_PADDING", function () {
      return SELECT_PANEL_VIEWPORT_PADDING;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_SELECT_SCROLL_STRATEGY", function () {
      return MAT_SELECT_SCROLL_STRATEGY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MAT_SELECT_SCROLL_STRATEGY_PROVIDER", function () {
      return MAT_SELECT_SCROLL_STRATEGY_PROVIDER;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatSelectChange", function () {
      return MatSelectChange;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatSelectTrigger", function () {
      return MatSelectTrigger;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatSelect", function () {
      return MatSelect;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "matSelectAnimations", function () {
      return matSelectAnimations;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "transformPanel", function () {
      return transformPanel;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "fadeInContent", function () {
      return fadeInContent;
    });
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/fesm2015/animations.js");
    /* harmony import */


    var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/cdk/a11y */
    "./node_modules/@angular/cdk/esm2015/a11y.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/cdk/coercion */
    "./node_modules/@angular/cdk/esm2015/coercion.js");
    /* harmony import */


    var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/cdk/collections */
    "./node_modules/@angular/cdk/esm2015/collections.js");
    /* harmony import */


    var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/cdk/keycodes */
    "./node_modules/@angular/cdk/esm2015/keycodes.js");
    /* harmony import */


    var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/cdk/overlay */
    "./node_modules/@angular/cdk/esm2015/overlay.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * The following are all the animations for the mat-select component, with each
     * const containing the metadata for one animation.
     *
     * The values below match the implementation of the AngularJS Material mat-select animation.
     * \@docs-private
     * @type {?}
     */


    const matSelectAnimations = {
      /**
       * This animation ensures the select's overlay panel animation (transformPanel) is called when
       * closing the select.
       * This is needed due to https://github.com/angular/angular/issues/23302
       */
      transformPanelWrap: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('transformPanelWrap', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])('@transformPanel', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animateChild"])()], {
        optional: true
      }))]),

      /**
       * This animation transforms the select's overlay panel on and off the page.
       *
       * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
       * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
       * side to ensure the option text correctly overlaps the trigger text.
       *
       * When the panel is removed from the DOM, it simply fades out linearly.
       */
      transformPanel: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('transformPanel', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        transform: 'scaleY(0.8)',
        minWidth: '100%',
        opacity: 0
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('showing', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        // 32px = 2 * 16px padding
        transform: 'scaleY(1)'
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('showing-multiple', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 1,
        minWidth: 'calc(100% + 64px)',
        // 64px = 48px padding on the left + 16px padding on the right
        transform: 'scaleY(1)'
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('120ms cubic-bezier(0, 0, 0.2, 1)')), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('100ms 25ms linear', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 0
      })))]),

      /**
       * This animation fades in the background color and text content of the
       * select's options. It is time delayed to occur 100ms after the overlay
       * panel has transformed in.
       * @deprecated Not used anymore. To be removed.
       * \@breaking-change 8.0.0
       */
      fadeInContent: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('fadeInContent', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('showing', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 1
      })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('void => showing', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
        opacity: 0
      }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')])])
    };
    /**
     * @deprecated
     * \@breaking-change 8.0.0
     * \@docs-private
     * @type {?}
     */

    const transformPanel = matSelectAnimations.transformPanel;
    /**
     * @deprecated
     * \@breaking-change 8.0.0
     * \@docs-private
     * @type {?}
     */

    const fadeInContent = matSelectAnimations.fadeInContent;
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Returns an exception to be thrown when attempting to change a select's `multiple` option
     * after initialization.
     * \@docs-private
     * @return {?}
     */

    function getMatSelectDynamicMultipleError() {
      return Error('Cannot change `multiple` mode of select after initialization.');
    }
    /**
     * Returns an exception to be thrown when attempting to assign a non-array value to a select
     * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
     * resetting the value.
     * \@docs-private
     * @return {?}
     */


    function getMatSelectNonArrayValueError() {
      return Error('Value must be an array in multiple-selection mode.');
    }
    /**
     * Returns an exception to be thrown when assigning a non-function value to the comparator
     * used to determine if a value corresponds to an option. Note that whether the function
     * actually takes two values and returns a boolean is not checked.
     * @return {?}
     */


    function getMatSelectNonFunctionValueError() {
      return Error('`compareWith` must be a function.');
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    let nextUniqueId = 0;
    /**
     * The max height of the select's overlay panel
     * @type {?}
     */

    const SELECT_PANEL_MAX_HEIGHT = 256;
    /**
     * The panel's padding on the x-axis
     * @type {?}
     */

    const SELECT_PANEL_PADDING_X = 16;
    /**
     * The panel's x axis padding if it is indented (e.g. there is an option group).
     * @type {?}
     */

    const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
    /**
     * The height of the select items in `em` units.
     * @type {?}
     */

    const SELECT_ITEM_HEIGHT_EM = 3; // TODO(josephperrott): Revert to a constant after 2018 spec updates are fully merged.

    /**
     * Distance between the panel edge and the option text in
     * multi-selection mode.
     *
     * Calculated as:
     * (SELECT_PANEL_PADDING_X * 1.5) + 16 = 40
     * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
     * The checkbox width is 16px.
     * @type {?}
     */

    const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.5 + 16;
    /**
     * The select panel will only "fit" inside the viewport if it is positioned at
     * this value or more away from the viewport boundary.
     * @type {?}
     */

    const SELECT_PANEL_VIEWPORT_PADDING = 8;
    /**
     * Injection token that determines the scroll handling while a select is open.
     * @type {?}
     */

    const MAT_SELECT_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["InjectionToken"]('mat-select-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */

    function MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
      return (
        /**
        * @return {?}
        */
        () => overlay.scrollStrategies.reposition()
      );
    }
    /**
     * \@docs-private
     * @type {?}
     */


    const MAT_SELECT_SCROLL_STRATEGY_PROVIDER = {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["Overlay"]],
      useFactory: MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    /**
     * Change event object that is emitted when the select value has changed.
     */

    class MatSelectChange {
      /**
       * @param {?} source
       * @param {?} value
       */
      constructor(source, value) {
        this.source = source;
        this.value = value;
      }

    } // Boilerplate for applying mixins to MatSelect.

    /**
     * \@docs-private
     */


    class MatSelectBase {
      /**
       * @param {?} _elementRef
       * @param {?} _defaultErrorStateMatcher
       * @param {?} _parentForm
       * @param {?} _parentFormGroup
       * @param {?} ngControl
       */
      constructor(_elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._elementRef = _elementRef;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
      }

    }
    /** @type {?} */


    const _MatSelectMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["mixinDisableRipple"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["mixinTabIndex"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["mixinDisabled"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["mixinErrorState"])(MatSelectBase))));
    /**
     * Allows the user to customize the trigger that is displayed when the select has a value.
     */


    class MatSelectTrigger {}

    MatSelectTrigger.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Directive"],
      args: [{
        selector: 'mat-select-trigger'
      }]
    }];

    class MatSelect extends _MatSelectMixinBase {
      /**
       * @param {?} _viewportRuler
       * @param {?} _changeDetectorRef
       * @param {?} _ngZone
       * @param {?} _defaultErrorStateMatcher
       * @param {?} elementRef
       * @param {?} _dir
       * @param {?} _parentForm
       * @param {?} _parentFormGroup
       * @param {?} _parentFormField
       * @param {?} ngControl
       * @param {?} tabIndex
       * @param {?} scrollStrategyFactory
       * @param {?=} _liveAnnouncer
       */
      constructor(_viewportRuler, _changeDetectorRef, _ngZone, _defaultErrorStateMatcher, elementRef, _dir, _parentForm, _parentFormGroup, _parentFormField, ngControl, tabIndex, scrollStrategyFactory, _liveAnnouncer) {
        super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._parentFormField = _parentFormField;
        this.ngControl = ngControl;
        this._liveAnnouncer = _liveAnnouncer;
        /**
         * Whether or not the overlay panel is open.
         */

        this._panelOpen = false;
        /**
         * Whether filling out the select is required in the form.
         */

        this._required = false;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         */

        this._scrollTop = 0;
        /**
         * Whether the component is in multiple selection mode.
         */

        this._multiple = false;
        /**
         * Comparison function to specify which option is displayed. Defaults to object equality.
         */

        this._compareWith =
        /**
        * @param {?} o1
        * @param {?} o2
        * @return {?}
        */
        (o1, o2) => o1 === o2;
        /**
         * Unique id for this input.
         */


        this._uid = "mat-select-".concat(nextUniqueId++);
        /**
         * Emits whenever the component is destroyed.
         */

        this._destroy = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        /**
         * The cached font-size of the trigger element.
         */

        this._triggerFontSize = 0;
        /**
         * `View -> model callback called when value changes`
         */

        this._onChange =
        /**
        * @return {?}
        */
        () => {};
        /**
         * `View -> model callback called when select has been touched`
         */


        this._onTouched =
        /**
        * @return {?}
        */
        () => {};
        /**
         * The IDs of child options to be passed to the aria-owns attribute.
         */


        this._optionIds = '';
        /**
         * The value of the select panel's transform-origin property.
         */

        this._transformOrigin = 'top';
        /**
         * Emits when the panel element is finished transforming in.
         */

        this._panelDoneAnimatingStream = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */

        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */

        this._positions = [{
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top'
        }, {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom'
        }];
        /**
         * Whether the component is disabling centering of the active option over the trigger.
         */

        this._disableOptionCentering = false;
        this._focused = false;
        /**
         * A name for this control that can be used by `mat-form-field`.
         */

        this.controlType = 'mat-select';
        /**
         * Aria label of the select. If not specified, the placeholder will be used as label.
         */

        this.ariaLabel = '';
        /**
         * Combined stream of all of the child options' change events.
         */

        this.optionSelectionChanges =
        /** @type {?} */
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["defer"])(
        /**
        * @return {?}
        */
        () => {
          /** @type {?} */
          const options = this.options;

          if (options) {
            return options.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["startWith"])(options), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])(
            /**
            * @return {?}
            */
            () => Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"])(...options.map(
            /**
            * @param {?} option
            * @return {?}
            */
            option => option.onSelectionChange))));
          }

          return this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])(
          /**
          * @return {?}
          */
          () => this.optionSelectionChanges));
        });
        /**
         * Event emitted when the select panel has been toggled.
         */

        this.openedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["EventEmitter"]();
        /**
         * Event emitted when the select has been opened.
         */

        this._openedStream = this.openedChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])(
        /**
        * @param {?} o
        * @return {?}
        */
        o => o), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(
        /**
        * @return {?}
        */
        () => {}));
        /**
         * Event emitted when the select has been closed.
         */

        this._closedStream = this.openedChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])(
        /**
        * @param {?} o
        * @return {?}
        */
        o => !o), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(
        /**
        * @return {?}
        */
        () => {}));
        /**
         * Event emitted when the selected value has been changed by the user.
         */

        this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["EventEmitter"]();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */

        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["EventEmitter"]();

        if (this.ngControl) {
          // Note: we provide the value accessor through here, instead of
          // the `providers` to avoid running into a circular import.
          this.ngControl.valueAccessor = this;
        }

        this._scrollStrategyFactory = scrollStrategyFactory;
        this._scrollStrategy = this._scrollStrategyFactory();
        this.tabIndex = parseInt(tabIndex) || 0; // Force setter to be called in case id was not specified.

        this.id = this.id;
      }
      /**
       * Whether the select is focused.
       * @return {?}
       */


      get focused() {
        return this._focused || this._panelOpen;
      }
      /**
       * @deprecated Setter to be removed as this property is intended to be readonly.
       * \@breaking-change 8.0.0
       * @param {?} value
       * @return {?}
       */


      set focused(value) {
        this._focused = value;
      }
      /**
       * Placeholder to be shown if no value has been selected.
       * @return {?}
       */


      get placeholder() {
        return this._placeholder;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
      }
      /**
       * Whether the component is required.
       * @return {?}
       */


      get required() {
        return this._required;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set required(value) {
        this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
        this.stateChanges.next();
      }
      /**
       * Whether the user should be allowed to select multiple options.
       * @return {?}
       */


      get multiple() {
        return this._multiple;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set multiple(value) {
        if (this._selectionModel) {
          throw getMatSelectDynamicMultipleError();
        }

        this._multiple = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
      }
      /**
       * Whether to center the active option over the trigger.
       * @return {?}
       */


      get disableOptionCentering() {
        return this._disableOptionCentering;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set disableOptionCentering(value) {
        this._disableOptionCentering = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
      }
      /**
       * Function to compare the option values with the selected values. The first argument
       * is a value from an option. The second is a value from the selection. A boolean
       * should be returned.
       * @return {?}
       */


      get compareWith() {
        return this._compareWith;
      }
      /**
       * @param {?} fn
       * @return {?}
       */


      set compareWith(fn) {
        if (typeof fn !== 'function') {
          throw getMatSelectNonFunctionValueError();
        }

        this._compareWith = fn;

        if (this._selectionModel) {
          // A different comparator means the selection could change.
          this._initializeSelection();
        }
      }
      /**
       * Value of the select control.
       * @return {?}
       */


      get value() {
        return this._value;
      }
      /**
       * @param {?} newValue
       * @return {?}
       */


      set value(newValue) {
        if (newValue !== this._value) {
          this.writeValue(newValue);
          this._value = newValue;
        }
      }
      /**
       * Unique id of the element.
       * @return {?}
       */


      get id() {
        return this._id;
      }
      /**
       * @param {?} value
       * @return {?}
       */


      set id(value) {
        this._id = value || this._uid;
        this.stateChanges.next();
      }
      /**
       * @return {?}
       */


      ngOnInit() {
        this._selectionModel = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_4__["SelectionModel"](this.multiple);
        this.stateChanges.next(); // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084

        this._panelDoneAnimatingStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @return {?}
        */
        () => {
          if (this.panelOpen) {
            this._scrollTop = 0;
            this.openedChange.emit(true);
          } else {
            this.openedChange.emit(false);
            this.overlayDir.offsetX = 0;

            this._changeDetectorRef.markForCheck();
          }
        });

        this._viewportRuler.change().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @return {?}
        */
        () => {
          if (this._panelOpen) {
            this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();

            this._changeDetectorRef.markForCheck();
          }
        });
      }
      /**
       * @return {?}
       */


      ngAfterContentInit() {
        this._initKeyManager();

        this._selectionModel.onChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          event.added.forEach(
          /**
          * @param {?} option
          * @return {?}
          */
          option => option.select());
          event.removed.forEach(
          /**
          * @param {?} option
          * @return {?}
          */
          option => option.deselect());
        });

        this.options.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["startWith"])(null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._resetOptions();

          this._initializeSelection();
        });
      }
      /**
       * @return {?}
       */


      ngDoCheck() {
        if (this.ngControl) {
          this.updateErrorState();
        }
      }
      /**
       * @param {?} changes
       * @return {?}
       */


      ngOnChanges(changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes['disabled']) {
          this.stateChanges.next();
        }

        if (changes['typeaheadDebounceInterval'] && this._keyManager) {
          this._keyManager.withTypeAhead(this.typeaheadDebounceInterval);
        }
      }
      /**
       * @return {?}
       */


      ngOnDestroy() {
        this._destroy.next();

        this._destroy.complete();

        this.stateChanges.complete();
      }
      /**
       * Toggles the overlay panel open or closed.
       * @return {?}
       */


      toggle() {
        this.panelOpen ? this.close() : this.open();
      }
      /**
       * Opens the overlay panel.
       * @return {?}
       */


      open() {
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
          return;
        }

        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect(); // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.

        this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0');
        this._panelOpen = true;

        this._keyManager.withHorizontalOrientation(null);

        this._calculateOverlayPosition();

        this._highlightCorrectOption();

        this._changeDetectorRef.markForCheck(); // Set the font size on the panel element once it exists.


        this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["take"])(1)).subscribe(
        /**
        * @return {?}
        */
        () => {
          if (this._triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement) {
            this.overlayDir.overlayRef.overlayElement.style.fontSize = "".concat(this._triggerFontSize, "px");
          }
        });
      }
      /**
       * Closes the overlay panel and focuses the host element.
       * @return {?}
       */


      close() {
        if (this._panelOpen) {
          this._panelOpen = false;

          this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');

          this._changeDetectorRef.markForCheck();

          this._onTouched();
        }
      }
      /**
       * Sets the select's value. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param {?} value New value to be written to the model.
       * @return {?}
       */


      writeValue(value) {
        if (this.options) {
          this._setSelectionByValue(value);
        }
      }
      /**
       * Saves a callback function to be invoked when the select's value
       * changes from user input. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param {?} fn Callback to be triggered when the value changes.
       * @return {?}
       */


      registerOnChange(fn) {
        this._onChange = fn;
      }
      /**
       * Saves a callback function to be invoked when the select is blurred
       * by the user. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param {?} fn Callback to be triggered when the component has been touched.
       * @return {?}
       */


      registerOnTouched(fn) {
        this._onTouched = fn;
      }
      /**
       * Disables the select. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param {?} isDisabled Sets whether the component is disabled.
       * @return {?}
       */


      setDisabledState(isDisabled) {
        this.disabled = isDisabled;

        this._changeDetectorRef.markForCheck();

        this.stateChanges.next();
      }
      /**
       * Whether or not the overlay panel is open.
       * @return {?}
       */


      get panelOpen() {
        return this._panelOpen;
      }
      /**
       * The currently selected option.
       * @return {?}
       */


      get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
      }
      /**
       * The value displayed in the trigger.
       * @return {?}
       */


      get triggerValue() {
        if (this.empty) {
          return '';
        }

        if (this._multiple) {
          /** @type {?} */
          const selectedOptions = this._selectionModel.selected.map(
          /**
          * @param {?} option
          * @return {?}
          */
          option => option.viewValue);

          if (this._isRtl()) {
            selectedOptions.reverse();
          } // TODO(crisbeto): delimiter should be configurable for proper localization.


          return selectedOptions.join(', ');
        }

        return this._selectionModel.selected[0].viewValue;
      }
      /**
       * Whether the element is in RTL mode.
       * @return {?}
       */


      _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
      }
      /**
       * Handles all keydown events on the select.
       * @param {?} event
       * @return {?}
       */


      _handleKeydown(event) {
        if (!this.disabled) {
          this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
      }
      /**
       * Handles keyboard events while the select is closed.
       * @private
       * @param {?} event
       * @return {?}
       */


      _handleClosedKeydown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */

        const isArrowKey = keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["DOWN_ARROW"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["UP_ARROW"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["LEFT_ARROW"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["RIGHT_ARROW"];
        /** @type {?} */

        const isOpenKey = keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ENTER"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["SPACE"];
        /** @type {?} */

        const manager = this._keyManager; // Open the select on ALT + arrow key to match the native <select>

        if (isOpenKey && !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["hasModifierKey"])(event) || (this.multiple || event.altKey) && isArrowKey) {
          event.preventDefault(); // prevents the page from scrolling down when pressing space

          this.open();
        } else if (!this.multiple) {
          /** @type {?} */
          const previouslySelectedOption = this.selected;

          if (keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["HOME"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["END"]) {
            keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["HOME"] ? manager.setFirstItemActive() : manager.setLastItemActive();
            event.preventDefault();
          } else {
            manager.onKeydown(event);
          }
          /** @type {?} */


          const selectedOption = this.selected; // Since the value has changed, we need to announce it ourselves.
          // @breaking-change 8.0.0 remove null check for _liveAnnouncer.

          if (this._liveAnnouncer && selectedOption && previouslySelectedOption !== selectedOption) {
            // We set a duration on the live announcement, because we want the live element to be
            // cleared after a while so that users can't navigate to it using the arrow keys.
            this._liveAnnouncer.announce(
            /** @type {?} */
            selectedOption.viewValue, 10000);
          }
        }
      }
      /**
       * Handles keyboard events when the selected is open.
       * @private
       * @param {?} event
       * @return {?}
       */


      _handleOpenKeydown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */

        const isArrowKey = keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["DOWN_ARROW"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["UP_ARROW"];
        /** @type {?} */

        const manager = this._keyManager;

        if (keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["HOME"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["END"]) {
          event.preventDefault();
          keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["HOME"] ? manager.setFirstItemActive() : manager.setLastItemActive();
        } else if (isArrowKey && event.altKey) {
          // Close the select on ALT + arrow key to match the native <select>
          event.preventDefault();
          this.close();
        } else if ((keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["ENTER"] || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["SPACE"]) && manager.activeItem && !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["hasModifierKey"])(event)) {
          event.preventDefault();

          manager.activeItem._selectViaInteraction();
        } else if (this._multiple && keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_5__["A"] && event.ctrlKey) {
          event.preventDefault();
          /** @type {?} */

          const hasDeselectedOptions = this.options.some(
          /**
          * @param {?} opt
          * @return {?}
          */
          opt => !opt.disabled && !opt.selected);
          this.options.forEach(
          /**
          * @param {?} option
          * @return {?}
          */
          option => {
            if (!option.disabled) {
              hasDeselectedOptions ? option.select() : option.deselect();
            }
          });
        } else {
          /** @type {?} */
          const previouslyFocusedIndex = manager.activeItemIndex;
          manager.onKeydown(event);

          if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
            manager.activeItem._selectViaInteraction();
          }
        }
      }
      /**
       * @return {?}
       */


      _onFocus() {
        if (!this.disabled) {
          this._focused = true;
          this.stateChanges.next();
        }
      }
      /**
       * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
       * "blur" to the panel when it opens, causing a false positive.
       * @return {?}
       */


      _onBlur() {
        this._focused = false;

        if (!this.disabled && !this.panelOpen) {
          this._onTouched();

          this._changeDetectorRef.markForCheck();

          this.stateChanges.next();
        }
      }
      /**
       * Callback that is invoked when the overlay panel has been attached.
       * @return {?}
       */


      _onAttached() {
        this.overlayDir.positionChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["take"])(1)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._changeDetectorRef.detectChanges();

          this._calculateOverlayOffsetX();

          this.panel.nativeElement.scrollTop = this._scrollTop;
        });
      }
      /**
       * Returns the theme to be used on the panel.
       * @return {?}
       */


      _getPanelTheme() {
        return this._parentFormField ? "mat-".concat(this._parentFormField.color) : '';
      }
      /**
       * Whether the select has a value.
       * @return {?}
       */


      get empty() {
        return !this._selectionModel || this._selectionModel.isEmpty();
      }
      /**
       * @private
       * @return {?}
       */


      _initializeSelection() {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(
        /**
        * @return {?}
        */
        () => {
          this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);

          this.stateChanges.next();
        });
      }
      /**
       * Sets the selected option based on a value. If no option can be
       * found with the designated value, the select trigger is cleared.
       * @private
       * @param {?} value
       * @return {?}
       */


      _setSelectionByValue(value) {
        if (this.multiple && value) {
          if (!Array.isArray(value)) {
            throw getMatSelectNonArrayValueError();
          }

          this._selectionModel.clear();

          value.forEach(
          /**
          * @param {?} currentValue
          * @return {?}
          */
          currentValue => this._selectValue(currentValue));

          this._sortValues();
        } else {
          this._selectionModel.clear();
          /** @type {?} */


          const correspondingOption = this._selectValue(value); // Shift focus to the active item. Note that we shouldn't do this in multiple
          // mode, because we don't know what option the user interacted with last.


          if (correspondingOption) {
            this._keyManager.setActiveItem(correspondingOption);
          } else if (!this.panelOpen) {
            // Otherwise reset the highlighted option. Note that we only want to do this while
            // closed, because doing it while open can shift the user's focus unnecessarily.
            this._keyManager.setActiveItem(-1);
          }
        }

        this._changeDetectorRef.markForCheck();
      }
      /**
       * Finds and selects and option based on its value.
       * @private
       * @param {?} value
       * @return {?} Option that has the corresponding value.
       */


      _selectValue(value) {
        /** @type {?} */
        const correspondingOption = this.options.find(
        /**
        * @param {?} option
        * @return {?}
        */
        option => {
          try {
            // Treat null as a special reset value.
            return option.value != null && this._compareWith(option.value, value);
          } catch (error) {
            if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["isDevMode"])()) {
              // Notify developers of errors in their comparator.
              console.warn(error);
            }

            return false;
          }
        });

        if (correspondingOption) {
          this._selectionModel.select(correspondingOption);
        }

        return correspondingOption;
      }
      /**
       * Sets up a key manager to listen to keyboard events on the overlay panel.
       * @private
       * @return {?}
       */


      _initKeyManager() {
        this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["ActiveDescendantKeyManager"](this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr').withAllowedModifierKeys(['shiftKey']);

        this._keyManager.tabOut.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @return {?}
        */
        () => {
          // Restore focus to the trigger before closing. Ensures that the focus
          // position won't be lost if the user got focus into the overlay.
          this.focus();
          this.close();
        });

        this._keyManager.change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroy)).subscribe(
        /**
        * @return {?}
        */
        () => {
          if (this._panelOpen && this.panel) {
            this._scrollActiveOptionIntoView();
          } else if (!this._panelOpen && !this.multiple && this._keyManager.activeItem) {
            this._keyManager.activeItem._selectViaInteraction();
          }
        });
      }
      /**
       * Drops current option subscriptions and IDs and resets from scratch.
       * @private
       * @return {?}
       */


      _resetOptions() {
        /** @type {?} */
        const changedOrDestroyed = Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"])(this.options.changes, this._destroy);
        this.optionSelectionChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(changedOrDestroyed)).subscribe(
        /**
        * @param {?} event
        * @return {?}
        */
        event => {
          this._onSelect(event.source, event.isUserInput);

          if (event.isUserInput && !this.multiple && this._panelOpen) {
            this.close();
            this.focus();
          }
        }); // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.

        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"])(...this.options.map(
        /**
        * @param {?} option
        * @return {?}
        */
        option => option._stateChanges)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(changedOrDestroyed)).subscribe(
        /**
        * @return {?}
        */
        () => {
          this._changeDetectorRef.markForCheck();

          this.stateChanges.next();
        });

        this._setOptionIds();
      }
      /**
       * Invoked when an option is clicked.
       * @private
       * @param {?} option
       * @param {?} isUserInput
       * @return {?}
       */


      _onSelect(option, isUserInput) {
        /** @type {?} */
        const wasSelected = this._selectionModel.isSelected(option);

        if (option.value == null && !this._multiple) {
          option.deselect();

          this._selectionModel.clear();

          this._propagateChanges(option.value);
        } else {
          if (wasSelected !== option.selected) {
            option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
          }

          if (isUserInput) {
            this._keyManager.setActiveItem(option);
          }

          if (this.multiple) {
            this._sortValues();

            if (isUserInput) {
              // In case the user selected the option with their mouse, we
              // want to restore focus back to the trigger, in order to
              // prevent the select keyboard controls from clashing with
              // the ones from `mat-option`.
              this.focus();
            }
          }
        }

        if (wasSelected !== this._selectionModel.isSelected(option)) {
          this._propagateChanges();
        }

        this.stateChanges.next();
      }
      /**
       * Sorts the selected values in the selected based on their order in the panel.
       * @private
       * @return {?}
       */


      _sortValues() {
        if (this.multiple) {
          /** @type {?} */
          const options = this.options.toArray();

          this._selectionModel.sort(
          /**
          * @param {?} a
          * @param {?} b
          * @return {?}
          */
          (a, b) => {
            return this.sortComparator ? this.sortComparator(a, b, options) : options.indexOf(a) - options.indexOf(b);
          });

          this.stateChanges.next();
        }
      }
      /**
       * Emits change event to set the model value.
       * @private
       * @param {?=} fallbackValue
       * @return {?}
       */


      _propagateChanges(fallbackValue) {
        /** @type {?} */
        let valueToEmit = null;

        if (this.multiple) {
          valueToEmit =
          /** @type {?} */
          this.selected.map(
          /**
          * @param {?} option
          * @return {?}
          */
          option => option.value);
        } else {
          valueToEmit = this.selected ?
          /** @type {?} */
          this.selected.value : fallbackValue;
        }

        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);

        this._onChange(valueToEmit);

        this.selectionChange.emit(new MatSelectChange(this, valueToEmit));

        this._changeDetectorRef.markForCheck();
      }
      /**
       * Records option IDs to pass to the aria-owns property.
       * @private
       * @return {?}
       */


      _setOptionIds() {
        this._optionIds = this.options.map(
        /**
        * @param {?} option
        * @return {?}
        */
        option => option.id).join(' ');
      }
      /**
       * Highlights the selected item. If no option is selected, it will highlight
       * the first item instead.
       * @private
       * @return {?}
       */


      _highlightCorrectOption() {
        if (this._keyManager) {
          if (this.empty) {
            this._keyManager.setFirstItemActive();
          } else {
            this._keyManager.setActiveItem(this._selectionModel.selected[0]);
          }
        }
      }
      /**
       * Scrolls the active option into view.
       * @private
       * @return {?}
       */


      _scrollActiveOptionIntoView() {
        /** @type {?} */
        const activeOptionIndex = this._keyManager.activeItemIndex || 0;
        /** @type {?} */

        const labelCount = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["_countGroupLabelsBeforeOption"])(activeOptionIndex, this.options, this.optionGroups);
        this.panel.nativeElement.scrollTop = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["_getOptionScrollPosition"])(activeOptionIndex + labelCount, this._getItemHeight(), this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
      }
      /**
       * Focuses the select element.
       * @param {?=} options
       * @return {?}
       */


      focus(options) {
        this._elementRef.nativeElement.focus(options);
      }
      /**
       * Gets the index of the provided option in the option list.
       * @private
       * @param {?} option
       * @return {?}
       */


      _getOptionIndex(option) {
        return this.options.reduce(
        /**
        * @param {?} result
        * @param {?} current
        * @param {?} index
        * @return {?}
        */
        (result, current, index) => {
          return result === undefined ? option === current ? index : undefined : result;
        }, undefined);
      }
      /**
       * Calculates the scroll position and x- and y-offsets of the overlay panel.
       * @private
       * @return {?}
       */


      _calculateOverlayPosition() {
        /** @type {?} */
        const itemHeight = this._getItemHeight();
        /** @type {?} */


        const items = this._getItemCount();
        /** @type {?} */


        const panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */

        const scrollContainerHeight = items * itemHeight; // The farthest the panel can be scrolled before it hits the bottom

        /** @type {?} */

        const maxScroll = scrollContainerHeight - panelHeight; // If no value is selected we open the popup to the first item.

        /** @type {?} */

        let selectedOptionOffset = this.empty ? 0 :
        /** @type {?} */
        this._getOptionIndex(this._selectionModel.selected[0]);
        selectedOptionOffset += Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["_countGroupLabelsBeforeOption"])(selectedOptionOffset, this.options, this.optionGroups); // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.

        /** @type {?} */

        const scrollBuffer = panelHeight / 2;
        this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this._offsetY = this._calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);

        this._checkOverlayWithinViewport(maxScroll);
      }
      /**
       * Calculates the scroll position of the select's overlay panel.
       *
       * Attempts to center the selected option in the panel. If the option is
       * too high or too low in the panel to be scrolled to the center, it clamps the
       * scroll position to the min or max scroll positions respectively.
       * @param {?} selectedIndex
       * @param {?} scrollBuffer
       * @param {?} maxScroll
       * @return {?}
       */


      _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        const itemHeight = this._getItemHeight();
        /** @type {?} */


        const optionOffsetFromScrollTop = itemHeight * selectedIndex;
        /** @type {?} */

        const halfOptionHeight = itemHeight / 2; // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.

        /** @type {?} */

        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
      }
      /**
       * Returns the aria-label of the select component.
       * @return {?}
       */


      _getAriaLabel() {
        // If an ariaLabelledby value has been set by the consumer, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
      }
      /**
       * Returns the aria-labelledby of the select component.
       * @return {?}
       */


      _getAriaLabelledby() {
        if (this.ariaLabelledby) {
          return this.ariaLabelledby;
        } // Note: we use `_getAriaLabel` here, because we want to check whether there's a
        // computed label. `this.ariaLabel` is only the user-specified label.


        if (!this._parentFormField || !this._parentFormField._hasFloatingLabel() || this._getAriaLabel()) {
          return null;
        }

        return this._parentFormField._labelId || null;
      }
      /**
       * Determines the `aria-activedescendant` to be set on the host.
       * @return {?}
       */


      _getAriaActiveDescendant() {
        if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
          return this._keyManager.activeItem.id;
        }

        return null;
      }
      /**
       * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
       * This must be adjusted to align the selected option text over the trigger text when
       * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
       * can't be calculated until the panel has been attached, because we need to know the
       * content width in order to constrain the panel within the viewport.
       * @private
       * @return {?}
       */


      _calculateOverlayOffsetX() {
        /** @type {?} */
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        /** @type {?} */

        const viewportSize = this._viewportRuler.getViewportSize();
        /** @type {?} */


        const isRtl = this._isRtl();
        /** @type {?} */


        const paddingWidth = this.multiple ? SELECT_MULTIPLE_PANEL_PADDING_X + SELECT_PANEL_PADDING_X : SELECT_PANEL_PADDING_X * 2;
        /** @type {?} */

        let offsetX; // Adjust the offset, depending on the option padding.

        if (this.multiple) {
          offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        } else {
          /** @type {?} */
          let selected = this._selectionModel.selected[0] || this.options.first;
          offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        } // Invert the offset in LTR.


        if (!isRtl) {
          offsetX *= -1;
        } // Determine how much the select overflows on each side.

        /** @type {?} */


        const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        /** @type {?} */

        const rightOverflow = overlayRect.right + offsetX - viewportSize.width + (isRtl ? 0 : paddingWidth); // If the element overflows on either side, reduce the offset to allow it to fit.

        if (leftOverflow > 0) {
          offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        } else if (rightOverflow > 0) {
          offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        } // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.


        this.overlayDir.offsetX = Math.round(offsetX);
        this.overlayDir.overlayRef.updatePosition();
      }
      /**
       * Calculates the y-offset of the select's overlay panel in relation to the
       * top start corner of the trigger. It has to be adjusted in order for the
       * selected option to be aligned over the trigger when the panel opens.
       * @private
       * @param {?} selectedIndex
       * @param {?} scrollBuffer
       * @param {?} maxScroll
       * @return {?}
       */


      _calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        const itemHeight = this._getItemHeight();
        /** @type {?} */


        const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        /** @type {?} */

        const maxOptionsDisplayed = Math.floor(SELECT_PANEL_MAX_HEIGHT / itemHeight);
        /** @type {?} */

        let optionOffsetFromPanelTop; // Disable offset if requested by user by returning 0 as value to offset

        if (this._disableOptionCentering) {
          return 0;
        }

        if (this._scrollTop === 0) {
          optionOffsetFromPanelTop = selectedIndex * itemHeight;
        } else if (this._scrollTop === maxScroll) {
          /** @type {?} */
          const firstDisplayedIndex = this._getItemCount() - maxOptionsDisplayed;
          /** @type {?} */

          const selectedDisplayIndex = selectedIndex - firstDisplayedIndex; // The first item is partially out of the viewport. Therefore we need to calculate what
          // portion of it is shown in the viewport and account for it in our offset.

          /** @type {?} */

          let partialItemHeight = itemHeight - (this._getItemCount() * itemHeight - SELECT_PANEL_MAX_HEIGHT) % itemHeight; // Because the panel height is longer than the height of the options alone,
          // there is always extra padding at the top or bottom of the panel. When
          // scrolled to the very bottom, this padding is at the top of the panel and
          // must be added to the offset.

          optionOffsetFromPanelTop = selectedDisplayIndex * itemHeight + partialItemHeight;
        } else {
          // If the option was scrolled to the middle of the panel using a scroll buffer,
          // its offset will be the scroll buffer minus the half height that was added to
          // center it.
          optionOffsetFromPanelTop = scrollBuffer - itemHeight / 2;
        } // The final offset is the option's offset from the top, adjusted for the height difference,
        // multiplied by -1 to ensure that the overlay moves in the correct direction up the page.
        // The value is rounded to prevent some browsers from blurring the content.


        return Math.round(optionOffsetFromPanelTop * -1 - optionHeightAdjustment);
      }
      /**
       * Checks that the attempted overlay position will fit within the viewport.
       * If it will not fit, tries to adjust the scroll position and the associated
       * y-offset so the panel can open fully on-screen. If it still won't fit,
       * sets the offset back to 0 to allow the fallback position to take over.
       * @private
       * @param {?} maxScroll
       * @return {?}
       */


      _checkOverlayWithinViewport(maxScroll) {
        /** @type {?} */
        const itemHeight = this._getItemHeight();
        /** @type {?} */


        const viewportSize = this._viewportRuler.getViewportSize();
        /** @type {?} */


        const topSpaceAvailable = this._triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */

        const bottomSpaceAvailable = viewportSize.height - this._triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */

        const panelHeightTop = Math.abs(this._offsetY);
        /** @type {?} */

        const totalPanelHeight = Math.min(this._getItemCount() * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */

        const panelHeightBottom = totalPanelHeight - panelHeightTop - this._triggerRect.height;

        if (panelHeightBottom > bottomSpaceAvailable) {
          this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        } else if (panelHeightTop > topSpaceAvailable) {
          this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        } else {
          this._transformOrigin = this._getOriginBasedOnOption();
        }
      }
      /**
       * Adjusts the overlay panel up to fit in the viewport.
       * @private
       * @param {?} panelHeightBottom
       * @param {?} bottomSpaceAvailable
       * @return {?}
       */


      _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.

        /** @type {?} */
        const distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable); // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.

        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption(); // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.

        if (this._scrollTop <= 0) {
          this._scrollTop = 0;
          this._offsetY = 0;
          this._transformOrigin = "50% bottom 0px";
        }
      }
      /**
       * Adjusts the overlay panel down to fit in the viewport.
       * @private
       * @param {?} panelHeightTop
       * @param {?} topSpaceAvailable
       * @param {?} maxScroll
       * @return {?}
       */


      _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.

        /** @type {?} */
        const distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable); // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.

        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption(); // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.

        if (this._scrollTop >= maxScroll) {
          this._scrollTop = maxScroll;
          this._offsetY = 0;
          this._transformOrigin = "50% top 0px";
          return;
        }
      }
      /**
       * Sets the transform origin point based on the selected option.
       * @private
       * @return {?}
       */


      _getOriginBasedOnOption() {
        /** @type {?} */
        const itemHeight = this._getItemHeight();
        /** @type {?} */


        const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        /** @type {?} */

        const originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
        return "50% ".concat(originY, "px 0px");
      }
      /**
       * Calculates the amount of items in the select. This includes options and group labels.
       * @private
       * @return {?}
       */


      _getItemCount() {
        return this.options.length + this.optionGroups.length;
      }
      /**
       * Calculates the height of the select's options.
       * @private
       * @return {?}
       */


      _getItemHeight() {
        return this._triggerFontSize * SELECT_ITEM_HEIGHT_EM;
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @param {?} ids
       * @return {?}
       */


      setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      onContainerClick() {
        this.focus();
        this.open();
      }
      /**
       * Implemented as part of MatFormFieldControl.
       * \@docs-private
       * @return {?}
       */


      get shouldLabelFloat() {
        return this._panelOpen || !this.empty;
      }

    }

    MatSelect.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Component"],
      args: [{
        selector: 'mat-select',
        exportAs: 'matSelect',
        template: "<div cdk-overlay-origin class=\"mat-select-trigger\" aria-hidden=\"true\" (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mat-select-value\" [ngSwitch]=\"empty\"><span class=\"mat-select-placeholder\" *ngSwitchCase=\"true\">{{placeholder || '\u00A0'}}</span> <span class=\"mat-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><span *ngSwitchDefault>{{triggerValue || '\u00A0'}}</span><ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mat-select-arrow-wrapper\"><div class=\"mat-select-arrow\"></div></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"_positions\" [cdkConnectedOverlayMinWidth]=\"_triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"_offsetY\" (backdropClick)=\"close()\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div class=\"mat-select-panel-wrap\" [@transformPanelWrap]><div #panel class=\"mat-select-panel {{ _getPanelTheme() }}\" [ngClass]=\"panelClass\" [@transformPanel]=\"multiple ? 'showing-multiple' : 'showing'\" (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"_transformOrigin\" [style.font-size.px]=\"_triggerFontSize\" (keydown)=\"_handleKeydown($event)\"><ng-content></ng-content></div></div></ng-template>",
        styles: [".mat-select{display:inline-block;width:100%;outline:0}.mat-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-form-field-appearance-standard.mat-form-field-has-label .mat-select:not(.mat-select-empty) .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:transform .4s cubic-bezier(.25,.8,.25,1)}._mat-animation-noopable.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:none}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel-wrap{flex-basis:100%}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%;border-radius:4px}@media (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}"],
        inputs: ['disabled', 'disableRipple', 'tabIndex'],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ViewEncapsulation"].None,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ChangeDetectionStrategy"].OnPush,
        host: {
          'role': 'listbox',
          '[attr.id]': 'id',
          '[attr.tabindex]': 'tabIndex',
          '[attr.aria-label]': '_getAriaLabel()',
          '[attr.aria-labelledby]': '_getAriaLabelledby()',
          '[attr.aria-required]': 'required.toString()',
          '[attr.aria-disabled]': 'disabled.toString()',
          '[attr.aria-invalid]': 'errorState',
          '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
          '[attr.aria-multiselectable]': 'multiple',
          '[attr.aria-describedby]': '_ariaDescribedby || null',
          '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
          '[class.mat-select-disabled]': 'disabled',
          '[class.mat-select-invalid]': 'errorState',
          '[class.mat-select-required]': 'required',
          '[class.mat-select-empty]': 'empty',
          'class': 'mat-select',
          '(keydown)': '_handleKeydown($event)',
          '(focus)': '_onFocus()',
          '(blur)': '_onBlur()'
        },
        animations: [matSelectAnimations.transformPanelWrap, matSelectAnimations.transformPanel],
        providers: [{
          provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldControl"],
          useExisting: MatSelect
        }, {
          provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_OPTION_PARENT_COMPONENT"],
          useExisting: MatSelect
        }]
      }]
    }];
    /** @nocollapse */

    MatSelect.ctorParameters = () => [{
      type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__["ViewportRuler"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ChangeDetectorRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["NgZone"]
    }, {
      type: _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ElementRef"]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_2__["Directionality"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Optional"]
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgForm"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Optional"]
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroupDirective"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Optional"]
      }]
    }, {
      type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormField"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Optional"]
      }]
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NgControl"],
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Self"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Optional"]
      }]
    }, {
      type: String,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Attribute"],
        args: ['tabindex']
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [MAT_SELECT_SCROLL_STRATEGY]
      }]
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["LiveAnnouncer"]
    }];

    MatSelect.propDecorators = {
      trigger: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ViewChild"],
        args: ['trigger', {
          static: false
        }]
      }],
      panel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ViewChild"],
        args: ['panel', {
          static: false
        }]
      }],
      overlayDir: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ViewChild"],
        args: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["CdkConnectedOverlay"], {
          static: false
        }]
      }],
      options: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ContentChildren"],
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOption"], {
          descendants: true
        }]
      }],
      optionGroups: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ContentChildren"],
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOptgroup"]]
      }],
      panelClass: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      customTrigger: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ContentChild"],
        args: [MatSelectTrigger, {
          static: false
        }]
      }],
      placeholder: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      required: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      multiple: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      disableOptionCentering: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      compareWith: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      ariaLabel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"],
        args: ['aria-label']
      }],
      ariaLabelledby: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"],
        args: ['aria-labelledby']
      }],
      errorStateMatcher: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      typeaheadDebounceInterval: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      sortComparator: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      id: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
      }],
      openedChange: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Output"]
      }],
      _openedStream: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Output"],
        args: ['opened']
      }],
      _closedStream: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Output"],
        args: ['closed']
      }],
      selectionChange: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Output"]
      }],
      valueChange: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Output"]
      }]
    };
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    class MatSelectModule {}

    MatSelectModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__["CommonModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__["OverlayModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatCommonModule"]],
        exports: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"], MatSelect, MatSelectTrigger, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatCommonModule"]],
        declarations: [MatSelect, MatSelectTrigger],
        providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=select.js.map

    /***/
  },

  /***/
  "./node_modules/@angular/material/form-field/typings/index.ngfactory.js":
  /*!******************************************************************************!*\
    !*** ./node_modules/@angular/material/form-field/typings/index.ngfactory.js ***!
    \******************************************************************************/

  /*! exports provided: MatFormFieldModuleNgFactory, RenderType_MatFormField, View_MatFormField_0, View_MatFormField_Host_0, MatFormFieldNgFactory */

  /***/
  function node_modulesAngularMaterialFormFieldTypingsIndexNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatFormFieldModuleNgFactory", function () {
      return MatFormFieldModuleNgFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_MatFormField", function () {
      return RenderType_MatFormField;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatFormField_0", function () {
      return View_MatFormField_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_MatFormField_Host_0", function () {
      return View_MatFormField_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MatFormFieldNgFactory", function () {
      return MatFormFieldNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/cdk/observers */
    "./node_modules/@angular/cdk/esm2015/observers.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var MatFormFieldModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, []], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], [])]);
    });

    var styles_MatFormField = [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}@media (-ms-high-contrast:active){.mat-form-field-infix{border-image:linear-gradient(transparent,transparent)}}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-empty.mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scaleY(1.0001)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);opacity:0;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:scaleX(1);transition:transform .3s cubic-bezier(.25,.8,.25,1),opacity .1s cubic-bezier(.25,.8,.25,1),background-color .3s cubic-bezier(.25,.8,.25,1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-label-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}", ".mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}@media (-ms-high-contrast:active){.mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:'';display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}@media (-ms-high-contrast:active){.mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}", ".mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=month]::after,.mat-input-element[type=time]::after,.mat-input-element[type=week]::after{content:' ';white-space:pre;width:1px}.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button,.mat-input-element::-webkit-inner-spin-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent!important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:0 0}@media (-ms-high-contrast:active){.mat-focused select.mat-input-element::-ms-value{color:inherit}}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:'';width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}", ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}@media (-ms-high-contrast:active){.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-start{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start{border-width:2px;transition:border-color .3s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity .1s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline{transition:none}", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:2px}}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}@media (-ms-high-contrast:active){.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.25,.8,.25,1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}"];

    var RenderType_MatFormField = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({
      encapsulation: 2,
      styles: styles_MatFormField,
      data: {
        "animation": [{
          type: 7,
          name: "transitionMessages",
          definitions: [{
            type: 0,
            name: "enter",
            styles: {
              type: 6,
              styles: {
                opacity: 1,
                transform: "translateY(0%)"
              },
              offset: null
            },
            options: undefined
          }, {
            type: 1,
            expr: "void => enter",
            animation: [{
              type: 6,
              styles: {
                opacity: 0,
                transform: "translateY(-100%)"
              },
              offset: null
            }, {
              type: 4,
              styles: null,
              timings: "300ms cubic-bezier(0.55, 0, 0.55, 0.2)"
            }],
            options: null
          }],
          options: {}
        }]
      }
    });

    function View_MatFormField_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 8, null, null, null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](1, 0, null, null, 3, "div", [["class", "mat-form-field-outline"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](2, 0, null, null, 0, "div", [["class", "mat-form-field-outline-start"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](3, 0, null, null, 0, "div", [["class", "mat-form-field-outline-gap"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, null, null, 0, "div", [["class", "mat-form-field-outline-end"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](5, 0, null, null, 3, "div", [["class", "mat-form-field-outline mat-form-field-outline-thick"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](6, 0, null, null, 0, "div", [["class", "mat-form-field-outline-start"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](7, 0, null, null, 0, "div", [["class", "mat-form-field-outline-gap"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](8, 0, null, null, 0, "div", [["class", "mat-form-field-outline-end"]], null, null, null, null, null))], null, null);
    }

    function View_MatFormField_2(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "div", [["class", "mat-form-field-prefix"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 0)], null, null);
    }

    function View_MatFormField_4(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 3, null, null, null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](2, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](3, null, ["", ""]))], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._control.placeholder;

        _ck(_v, 3, 0, currVal_0);
      });
    }

    function View_MatFormField_5(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 3), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](0, null, null, 0))], null, null);
    }

    function View_MatFormField_6(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "span", [["aria-hidden", "true"], ["class", "mat-placeholder-required mat-form-field-required-marker"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](-1, null, [" *"]))], null, null);
    }

    function View_MatFormField_3(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, [[4, 0], ["label", 1]], null, 8, "label", [["class", "mat-form-field-label"]], [[8, "id", 0], [1, "for", 0], [1, "aria-owns", 0], [2, "mat-empty", null], [2, "mat-form-field-empty", null], [2, "mat-accent", null], [2, "mat-warn", null]], [[null, "cdkObserveContent"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("cdkObserveContent" === en) {
          var pd_0 = _co.updateOutlineGap() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"], [], {
        ngSwitch: [0, "ngSwitch"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 1196032, null, 0, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["CdkObserveContent"], [_angular_cdk_observers__WEBPACK_IMPORTED_MODULE_3__["ContentObserver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]], {
        disabled: [0, "disabled"]
      }, {
        event: "cdkObserveContent"
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_4)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](4, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"]], {
        ngSwitchCase: [0, "ngSwitchCase"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_5)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](6, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"]], {
        ngSwitchCase: [0, "ngSwitchCase"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_6)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](8, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;

        var currVal_7 = _co._hasLabel();

        _ck(_v, 1, 0, currVal_7);

        var currVal_8 = _co.appearance != "outline";

        _ck(_v, 2, 0, currVal_8);

        var currVal_9 = false;

        _ck(_v, 4, 0, currVal_9);

        var currVal_10 = true;

        _ck(_v, 6, 0, currVal_10);

        var currVal_11 = !_co.hideRequiredMarker && _co._control.required && !_co._control.disabled;

        _ck(_v, 8, 0, currVal_11);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._labelId;
        var currVal_1 = _co._control.id;
        var currVal_2 = _co._control.id;
        var currVal_3 = _co._control.empty && !_co._shouldAlwaysFloat;
        var currVal_4 = _co._control.empty && !_co._shouldAlwaysFloat;
        var currVal_5 = _co.color == "accent";
        var currVal_6 = _co.color == "warn";

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6);
      });
    }

    function View_MatFormField_7(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "div", [["class", "mat-form-field-suffix"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 4)], null, null);
    }

    function View_MatFormField_8(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, [[1, 0], ["underline", 1]], null, 1, "div", [["class", "mat-form-field-underline"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](1, 0, null, null, 0, "span", [["class", "mat-form-field-ripple"]], [[2, "mat-accent", null], [2, "mat-warn", null]], null, null, null, null))], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.color == "accent";
        var currVal_1 = _co.color == "warn";

        _ck(_v, 1, 0, currVal_0, currVal_1);
      });
    }

    function View_MatFormField_9(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "div", [], [[24, "@transitionMessages", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 5)], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._subscriptAnimationState;

        _ck(_v, 0, 0, currVal_0);
      });
    }

    function View_MatFormField_11(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "div", [["class", "mat-hint"]], [[8, "id", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._hintLabelId;

        _ck(_v, 0, 0, currVal_0);

        var currVal_1 = _co.hintLabel;

        _ck(_v, 1, 0, currVal_1);
      });
    }

    function View_MatFormField_10(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 5, "div", [["class", "mat-form-field-hint-wrapper"]], [[24, "@transitionMessages", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_11)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 6), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, null, null, 0, "div", [["class", "mat-form-field-hint-spacer"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 7)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_1 = _co.hintLabel;

        _ck(_v, 2, 0, currVal_1);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co._subscriptAnimationState;

        _ck(_v, 0, 0, currVal_0);
      });
    }

    function View_MatFormField_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](2, [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 1, {
        underlineRef: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](402653184, 2, {
        _connectionContainerRef: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 3, {
        _inputContainerRef: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](671088640, 4, {
        _label: 0
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](4, 0, null, null, 20, "div", [["class", "mat-form-field-wrapper"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](5, 0, [[2, 0], ["connectionContainer", 1]], null, 11, "div", [["class", "mat-form-field-flex"]], null, [[null, "click"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("click" === en) {
          var pd_0 = (_co._control.onContainerClick && _co._control.onContainerClick($event)) !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_2)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](9, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](10, 0, [[3, 0], ["inputContainer", 1]], null, 4, "div", [["class", "mat-form-field-infix"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵncd"](null, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](12, 0, null, null, 2, "span", [["class", "mat-form-field-label-wrapper"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_3)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](14, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_7)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](16, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_8)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](18, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]], {
        ngIf: [0, "ngIf"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](19, 0, null, null, 5, "div", [["class", "mat-form-field-subscript-wrapper"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](20, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"], [], {
        ngSwitch: [0, "ngSwitch"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_9)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](22, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"]], {
        ngSwitchCase: [0, "ngSwitchCase"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵand"](16777216, null, null, 1, null, View_MatFormField_10)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](24, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgSwitch"]], {
        ngSwitchCase: [0, "ngSwitchCase"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.appearance == "outline";

        _ck(_v, 7, 0, currVal_0);

        var currVal_1 = _co._prefixChildren.length;

        _ck(_v, 9, 0, currVal_1);

        var currVal_2 = _co._hasFloatingLabel();

        _ck(_v, 14, 0, currVal_2);

        var currVal_3 = _co._suffixChildren.length;

        _ck(_v, 16, 0, currVal_3);

        var currVal_4 = _co.appearance != "outline";

        _ck(_v, 18, 0, currVal_4);

        var currVal_5 = _co._getDisplayedMessages();

        _ck(_v, 20, 0, currVal_5);

        var currVal_6 = "error";

        _ck(_v, 22, 0, currVal_6);

        var currVal_7 = "hint";

        _ck(_v, 24, 0, currVal_7);
      }, null);
    }

    function View_MatFormField_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 10, "mat-form-field", [["class", "mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, View_MatFormField_0, RenderType_MatFormField)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 7520256, null, 9, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 1, {
        _controlNonStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](335544320, 2, {
        _controlStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 3, {
        _labelChildNonStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](335544320, 4, {
        _labelChildStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 5, {
        _placeholderChild: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 6, {
        _errorChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 7, {
        _hintChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 8, {
        _prefixChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵqud"](603979776, 9, {
        _suffixChildren: 1
      })], null, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).appearance == "standard";
        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).appearance == "fill";
        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).appearance == "outline";
        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).appearance == "legacy";

        var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._control.errorState;

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._canLabelFloat;

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldLabelFloat();

        var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._hasFloatingLabel();

        var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._hideControlPlaceholder();

        var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._control.disabled;

        var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._control.autofilled;

        var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._control.focused;

        var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).color == "accent";
        var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1).color == "warn";

        var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("untouched");

        var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("touched");

        var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("pristine");

        var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("dirty");

        var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("valid");

        var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("invalid");

        var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._shouldForward("pending");

        var currVal_21 = !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵnov"](_v, 1)._animationsEnabled;

        _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21]);
      });
    }

    var MatFormFieldNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("mat-form-field", _angular_material_form_field__WEBPACK_IMPORTED_MODULE_1__["MatFormField"], View_MatFormField_Host_0, {
      color: "color",
      appearance: "appearance",
      hideRequiredMarker: "hideRequiredMarker",
      hintLabel: "hintLabel",
      floatLabel: "floatLabel"
    }, {}, ["[matPrefix]", "*", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"]);
    /***/

  },

  /***/
  "./src/app/core/services/weather.service.ts":
  /*!**************************************************!*\
    !*** ./src/app/core/services/weather.service.ts ***!
    \**************************************************/

  /*! exports provided: WeatherService */

  /***/
  function srcAppCoreServicesWeatherServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WeatherService", function () {
      return WeatherService;
    });
    /* harmony import */


    var _environment_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @environment/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    class WeatherService {
      constructor(http) {
        this.http = http;
        this._currentWeatherSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](JSON.parse(localStorage.getItem('CurrentWeather')));
        this.currentWeather = this._currentWeatherSubject.asObservable();
        this._currentCitySubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](JSON.parse(localStorage.getItem('CurrentCity')));
        this.currentCity = this._currentCitySubject.asObservable();
      }

      get currentWeatherValue() {
        return this._currentWeatherSubject.value;
      }

      get currentCityValue() {
        return this._currentCitySubject.value;
      }

      headers() {
        return this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
      }

      getWeather(woeid) {
        return this.http.get(_environment_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].urlApi + woeid, {
          headers: this.headers()
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(response => {
          if (response) {
            localStorage.setItem('CurrentWeather', JSON.stringify(response));

            this._currentWeatherSubject.next(response);

            return response;
          }
        }));
      }

      getCities() {
        return this.http.get(_environment_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].cities).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(response => {
          if (response) {
            return response;
          }
        }));
      }

      selectedCity(city) {
        localStorage.setItem('CurrentCity', JSON.stringify(city));

        this._currentCitySubject.next(city);
      }

    }

    WeatherService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      factory: function WeatherService_Factory() {
        return new WeatherService(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      },
      token: WeatherService,
      providedIn: "root"
    });
    /***/
  },

  /***/
  "./src/app/modules/home/home-routing.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/modules/home/home-routing.module.ts ***!
    \*****************************************************/

  /*! exports provided: HomeRoutingModule */

  /***/
  function srcAppModulesHomeHomeRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function () {
      return HomeRoutingModule;
    });
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _weather_weather_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./weather/weather.component */
    "./src/app/modules/home/weather/weather.component.ts");

    const routes = [{
      path: '',
      component: _weather_weather_component__WEBPACK_IMPORTED_MODULE_1__["WeatherComponent"]
    }, {
      path: '**',
      redirectTo: ''
    }];

    class HomeRoutingModule {}
    /***/

  },

  /***/
  "./src/app/modules/home/home.module.ngfactory.js":
  /*!*******************************************************!*\
    !*** ./src/app/modules/home/home.module.ngfactory.js ***!
    \*******************************************************/

  /*! exports provided: HomeModuleNgFactory */

  /***/
  function srcAppModulesHomeHomeModuleNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeModuleNgFactory", function () {
      return HomeModuleNgFactory;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _home_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./home.module */
    "./src/app/modules/home/home.module.ts");
    /* harmony import */


    var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../node_modules/@angular/router/router.ngfactory */
    "./node_modules/@angular/router/router.ngfactory.js");
    /* harmony import */


    var _weather_weather_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./weather/weather.component.ngfactory */
    "./src/app/modules/home/weather/weather.component.ngfactory.js");
    /* harmony import */


    var _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../../../node_modules/@fortawesome/angular-fontawesome/angular-fontawesome.ngfactory */
    "./node_modules/@fortawesome/angular-fontawesome/angular-fontawesome.ngfactory.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/overlay */
    "./node_modules/@angular/cdk/esm2015/overlay.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/material/autocomplete */
    "./node_modules/@angular/material/esm2015/autocomplete.js");
    /* harmony import */


    var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/cdk/observers */
    "./node_modules/@angular/cdk/esm2015/observers.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/select */
    "./node_modules/@angular/material/esm2015/select.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _home_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./home-routing.module */
    "./src/app/modules/home/home-routing.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! @angular/cdk/portal */
    "./node_modules/@angular/cdk/esm2015/portal.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony import */


    var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! @angular/cdk/text-field */
    "./node_modules/@angular/cdk/esm2015/text-field.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! @angular/material/input */
    "./node_modules/@angular/material/esm2015/input.js");
    /* harmony import */


    var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! @fortawesome/angular-fontawesome */
    "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
    /* harmony import */


    var _weather_weather_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./weather/weather.component */
    "./src/app/modules/home/weather/weather.component.ts");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var HomeModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_home_module__WEBPACK_IMPORTED_MODULE_1__["HomeModule"], [], function (_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _weather_weather_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["WeatherComponentNgFactory"], _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_4__["FaIconComponentNgFactory"], _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_4__["FaDuotoneIconComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_o"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MAT_SELECT_SCROLL_STRATEGY"], _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _home_routing_module__WEBPACK_IMPORTED_MODULE_14__["HomeRoutingModule"], _home_routing_module__WEBPACK_IMPORTED_MODULE_14__["HomeRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_16__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_16__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_17__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_17__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_7__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_19__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_19__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_10__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__["FontAwesomeModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__["FontAwesomeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _home_module__WEBPACK_IMPORTED_MODULE_1__["HomeModule"], _home_module__WEBPACK_IMPORTED_MODULE_1__["HomeModule"], [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_22__["FaIconLibrary"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_13__["ROUTES"], function () {
        return [[{
          path: "",
          component: _weather_weather_component__WEBPACK_IMPORTED_MODULE_23__["WeatherComponent"]
        }, {
          path: "**",
          redirectTo: ""
        }]];
      }, [])]);
    });
    /***/

  },

  /***/
  "./src/app/modules/home/home.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/modules/home/home.module.ts ***!
    \*********************************************/

  /*! exports provided: HomeModule */

  /***/
  function srcAppModulesHomeHomeModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeModule", function () {
      return HomeModule;
    });
    /* harmony import */


    var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @fortawesome/angular-fontawesome */
    "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
    /* harmony import */


    var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @fortawesome/free-solid-svg-icons */
    "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js"); // FontAwesome
    // Solid
    // Solid
    // Solid
    // Solid
    // Solid
    // Solid
    // Solid
    // Solid


    class HomeModule {
      constructor(library) {
        library.addIcons(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faSnowflake"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCloudMeatball"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBolt"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCloudShowersHeavy"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCloudRain"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faPooStorm"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCloud"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCloudSun"]);
      }

    }
    /***/

  },

  /***/
  "./src/app/modules/home/search/search.component.ngfactory.js":
  /*!*******************************************************************!*\
    !*** ./src/app/modules/home/search/search.component.ngfactory.js ***!
    \*******************************************************************/

  /*! exports provided: RenderType_SearchComponent, View_SearchComponent_0, View_SearchComponent_Host_0, SearchComponentNgFactory */

  /***/
  function srcAppModulesHomeSearchSearchComponentNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_SearchComponent", function () {
      return RenderType_SearchComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_SearchComponent_0", function () {
      return View_SearchComponent_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_SearchComponent_Host_0", function () {
      return View_SearchComponent_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SearchComponentNgFactory", function () {
      return SearchComponentNgFactory;
    });
    /* harmony import */


    var _search_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./search.component.scss.shim.ngstyle */
    "./src/app/modules/home/search/search.component.scss.shim.ngstyle.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _node_modules_angular_material_core_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../node_modules/@angular/material/core/typings/index.ngfactory */
    "./node_modules/@angular/material/core/typings/index.ngfactory.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/esm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */
    "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/bidi */
    "./node_modules/@angular/cdk/esm2015/bidi.js");
    /* harmony import */


    var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/cdk/platform */
    "./node_modules/@angular/cdk/esm2015/platform.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /* harmony import */


    var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/material/autocomplete */
    "./node_modules/@angular/material/esm2015/autocomplete.js");
    /* harmony import */


    var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/cdk/overlay */
    "./node_modules/@angular/cdk/esm2015/overlay.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony import */


    var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! @angular/material/input */
    "./node_modules/@angular/material/esm2015/input.js");
    /* harmony import */


    var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! @angular/cdk/text-field */
    "./node_modules/@angular/cdk/esm2015/text-field.js");
    /* harmony import */


    var _node_modules_angular_material_autocomplete_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ../../../../../node_modules/@angular/material/autocomplete/typings/index.ngfactory */
    "./node_modules/@angular/material/autocomplete/typings/index.ngfactory.js");
    /* harmony import */


    var _search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./search.component */
    "./src/app/modules/home/search/search.component.ts");
    /* harmony import */


    var _shared_loading_loading_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ../../../shared/_loading/loading.service */
    "./src/app/shared/_loading/loading.service.ts");
    /* harmony import */


    var _core_services_weather_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ../../../core/services/weather.service */
    "./src/app/core/services/weather.service.ts");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles_SearchComponent = [_search_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];

    var RenderType_SearchComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({
      encapsulation: 0,
      styles: styles_SearchComponent,
      data: {}
    });

    function View_SearchComponent_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-option", [["class", "mat-option"], ["role", "option"]], [[1, "tabindex", 0], [2, "mat-selected", null], [2, "mat-option-multiple", null], [2, "mat-active", null], [8, "id", 0], [1, "aria-selected", 0], [1, "aria-disabled", 0], [2, "mat-option-disabled", null]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) {
        var ad = true;

        if ("click" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._selectViaInteraction() !== false;
          ad = pd_0 && ad;
        }

        if ("keydown" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._handleKeydown($event) !== false;
          ad = pd_1 && ad;
        }

        return ad;
      }, _node_modules_angular_material_core_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatOption_0"], _node_modules_angular_material_core_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatOption"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 8568832, [[10, 4]], 0, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MAT_OPTION_PARENT_COMPONENT"]], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOptgroup"]]], {
        value: [0, "value"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, 0, [" ", " "]))], function (_ck, _v) {
        var currVal_8 = _v.context.$implicit;

        _ck(_v, 1, 0, currVal_8);
      }, function (_ck, _v) {
        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._getTabIndex();

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).selected;

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).multiple;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).active;

        var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id;

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._getAriaSelected();

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled.toString();

        var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled;

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7);

        var currVal_9 = _v.context.$implicit.name;

        _ck(_v, 2, 0, currVal_9);
      });
    }

    function View_SearchComponent_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 37, "form", [["class", "example-form"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("submit" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).onSubmit($event) !== false;
          ad = pd_0 && ad;
        }

        if ("reset" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).onReset() !== false;
          ad = pd_1 && ad;
        }

        if ("ngSubmit" === en) {
          var pd_2 = _co.city() !== false;
          ad = pd_2 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_z"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 4210688, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], [[8, null], [8, null]], null, {
        ngSubmit: "ngSubmit"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 32, "mat-form-field", [["appearance", "legacy"], ["class", "example-full-width mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-has-label", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 7520256, null, 9, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_8__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["ANIMATION_MODULE_TYPE"]]], {
        appearance: [0, "appearance"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, {
        _controlNonStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, {
        _controlStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, {
        _labelChildNonStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 4, {
        _labelChildStatic: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, {
        _placeholderChild: 0
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, {
        _errorChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, {
        _hintChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, {
        _prefixChildren: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, {
        _suffixChildren: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 16777216, null, 1, 10, "input", [["class", "mat-autocomplete-trigger mat-input-element mat-form-field-autofill-control"], ["matInput", ""], ["placeholder", "Insira uma cidade"], ["required", ""], ["type", "text"]], [[1, "required", 0], [1, "autocomplete", 0], [1, "role", 0], [1, "aria-autocomplete", 0], [1, "aria-activedescendant", 0], [1, "aria-expanded", 0], [1, "aria-owns", 0], [1, "aria-haspopup", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [1, "readonly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "blur"], [null, "input"], [null, "compositionstart"], [null, "compositionend"], [null, "focusin"], [null, "keydown"], [null, "focus"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("input" === en) {
          var pd_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._handleInput($event.target.value) !== false;
          ad = pd_0 && ad;
        }

        if ("blur" === en) {
          var pd_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).onTouched() !== false;
          ad = pd_1 && ad;
        }

        if ("compositionstart" === en) {
          var pd_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._compositionStart() !== false;
          ad = pd_2 && ad;
        }

        if ("compositionend" === en) {
          var pd_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._compositionEnd($event.target.value) !== false;
          ad = pd_3 && ad;
        }

        if ("focusin" === en) {
          var pd_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._handleFocus() !== false;
          ad = pd_4 && ad;
        }

        if ("blur" === en) {
          var pd_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._onTouched() !== false;
          ad = pd_5 && ad;
        }

        if ("input" === en) {
          var pd_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._handleInput($event) !== false;
          ad = pd_6 && ad;
        }

        if ("keydown" === en) {
          var pd_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._handleKeydown($event) !== false;
          ad = pd_7 && ad;
        }

        if ("blur" === en) {
          var pd_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._focusChanged(false) !== false;
          ad = pd_8 && ad;
        }

        if ("focus" === en) {
          var pd_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._focusChanged(true) !== false;
          ad = pd_9 && ad;
        }

        if ("input" === en) {
          var pd_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._onInput() !== false;
          ad = pd_10 && ad;
        }

        if ("blur" === en) {
          var pd_11 = _co.city() !== false;
          ad = pd_11 && ad;
        }

        return ad;
      }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], [], {
        required: [0, "required"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"], function (p0_0) {
        return [p0_0];
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 4866048, null, 0, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteTrigger"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"]], [2, _angular_common__WEBPACK_IMPORTED_MODULE_12__["DOCUMENT"]], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__["ViewportRuler"]], {
        autocomplete: [0, "autocomplete"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"], function (p0_0, p1_0) {
        return [p0_0, p1_0];
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteTrigger"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlDirective"], [[6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_q"]]], {
        form: [0, "form"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_8__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_15__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], {
        placeholder: [0, "placeholder"],
        required: [1, "required"],
        type: [2, "type"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4], [2, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](27, 0, null, 5, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 16384, [[6, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](29, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, 1, 7, "mat-autocomplete", [["class", "mat-autocomplete"]], null, [[null, "optionSelected"]], function (_v, en, $event) {
        var ad = true;
        var _co = _v.component;

        if ("optionSelected" === en) {
          var pd_0 = _co.city() !== false;
          ad = pd_0 && ad;
        }

        return ad;
      }, _node_modules_angular_material_autocomplete_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatAutocomplete_0"], _node_modules_angular_material_autocomplete_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatAutocomplete"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](6144, null, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MAT_OPTION_PARENT_COMPONENT"], null, [_angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocomplete"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 1097728, [["auto", 4]], 2, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocomplete"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MAT_AUTOCOMPLETE_DEFAULT_OPTIONS"]], {
        displayWith: [0, "displayWith"]
      }, {
        optionSelected: "optionSelected"
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, {
        options: 1
      }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, {
        optionGroups: 1
      }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 0, 2, null, View_SearchComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], {
        ngForOf: [0, "ngForOf"]
      }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])], function (_ck, _v) {
        var _co = _v.component;
        var currVal_29 = "legacy";

        _ck(_v, 6, 0, currVal_29);

        var currVal_54 = "";

        _ck(_v, 18, 0, currVal_54);

        var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32);

        _ck(_v, 20, 0, currVal_55);

        var currVal_56 = _co.searchFormControl;

        _ck(_v, 22, 0, currVal_56);

        var currVal_57 = "Insira uma cidade";
        var currVal_58 = "";
        var currVal_59 = "text";

        _ck(_v, 25, 0, currVal_57, currVal_58, currVal_59);

        var currVal_62 = _co.displayFn;

        _ck(_v, 32, 0, currVal_62);

        var currVal_63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 36, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 37).transform(_co.filteredOptions));

        _ck(_v, 36, 0, currVal_63);
      }, function (_ck, _v) {
        var _co = _v.component;

        var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassUntouched;

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassTouched;

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassPristine;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassDirty;

        var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassValid;

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassInvalid;

        var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassPending;

        _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6);

        var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "standard";
        var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "fill";
        var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "outline";
        var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).appearance == "legacy";

        var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.errorState;

        var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._canLabelFloat;

        var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldLabelFloat();

        var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._hasFloatingLabel();

        var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._hideControlPlaceholder();

        var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.disabled;

        var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.autofilled;

        var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._control.focused;

        var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color == "accent";
        var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).color == "warn";

        var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("untouched");

        var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("touched");

        var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("pristine");

        var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("dirty");

        var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("valid");

        var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("invalid");

        var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._shouldForward("pending");

        var currVal_28 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._animationsEnabled;

        _ck(_v, 5, 1, [currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28]);

        var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).required ? "" : null;

        var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteAttribute;

        var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteDisabled ? null : "combobox";
        var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteDisabled ? null : "list";
        var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).panelOpen && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).activeOption ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).activeOption.id : null;
        var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteDisabled ? null : _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).panelOpen.toString();
        var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteDisabled || !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).panelOpen ? null : _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocomplete == null ? null : _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocomplete.id;
        var currVal_37 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).autocompleteDisabled;

        var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassUntouched;

        var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassTouched;

        var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassPristine;

        var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassDirty;

        var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassValid;

        var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassInvalid;

        var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassPending;

        var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._isServer;

        var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).id;

        var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).placeholder;

        var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).disabled;

        var currVal_49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).required;

        var currVal_50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).readonly && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._isNativeSelect || null;
        var currVal_51 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._ariaDescribedby || null;

        var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).errorState;

        var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).required.toString();

        _ck(_v, 16, 1, [currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53]);

        var currVal_60 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 28).id;

        _ck(_v, 27, 0, currVal_60);

        var currVal_61 = _co.errorMsg;

        _ck(_v, 29, 0, currVal_61);
      });
    }

    function View_SearchComponent_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-search", [], null, null, null, View_SearchComponent_0, RenderType_SearchComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _search_component__WEBPACK_IMPORTED_MODULE_17__["SearchComponent"], [_shared_loading_loading_service__WEBPACK_IMPORTED_MODULE_18__["LoadingService"], _core_services_weather_service__WEBPACK_IMPORTED_MODULE_19__["WeatherService"]], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
      }, null);
    }

    var SearchComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-search", _search_component__WEBPACK_IMPORTED_MODULE_17__["SearchComponent"], View_SearchComponent_Host_0, {}, {}, []);
    /***/

  },

  /***/
  "./src/app/modules/home/search/search.component.scss.shim.ngstyle.js":
  /*!***************************************************************************!*\
    !*** ./src/app/modules/home/search/search.component.scss.shim.ngstyle.js ***!
    \***************************************************************************/

  /*! exports provided: styles */

  /***/
  function srcAppModulesHomeSearchSearchComponentScssShimNgstyleJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "styles", function () {
      return styles;
    });
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles = [".mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}"];
    /***/
  },

  /***/
  "./src/app/modules/home/search/search.component.ts":
  /*!*********************************************************!*\
    !*** ./src/app/modules/home/search/search.component.ts ***!
    \*********************************************************/

  /*! exports provided: SearchComponent */

  /***/
  function srcAppModulesHomeSearchSearchComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SearchComponent", function () {
      return SearchComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    class SearchComponent {
      constructor(loadingService, weatherService) {
        this.loadingService = loadingService;
        this.weatherService = weatherService;
        this.searchFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options = [];
        this.submitted = false;
        this.errorMsg = '';
        this.auxWoeid = '';
      }

      ngOnInit() {
        this.searchFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.getCities();
      }

      _filtered() {
        this.filteredOptions = this.searchFormControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(value => typeof value === 'string' ? value : value.name), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(name => this._filter(name)));
      }

      _filter(value) {
        const filterValue = value.toLowerCase();
        let teste = this.options.filter(option => option.name.toLowerCase().includes(filterValue));
        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
      }

      displayFn(city) {
        return city && city.name ? city.name : '';
      }

      getCities() {
        // this.loadingService.showLoading();
        this.weatherService.getCities().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(data => {
          this.options = data;

          this._filtered(); // this.loadingService.hideLoading();

        }, error => {// this.loadingService.hideLoading();
        });
      }

      city() {
        this.submitted = true;

        if (this.searchFormControl.invalid) {
          this.searchFormControl.setErrors({
            'error': true
          });
          this.errorMsg = 'Formulário inválido.';
          return;
        }

        if (this._filter(this.searchFormControl.value.name).length === 0) {
          this.searchFormControl.setErrors({
            'error': true
          });
          this.errorMsg = 'Cidade não encontrada.';
          return;
        }

        if (this.searchFormControl.value.woeid == this.auxWoeid) {
          return;
        }

        this.auxWoeid = this.searchFormControl.value.woeid;
        this.weatherService.selectedCity(this.searchFormControl.value);
        this.submitted = false;
      }

    }
    /***/

  },

  /***/
  "./src/app/modules/home/weather/weather.component.ngfactory.js":
  /*!*********************************************************************!*\
    !*** ./src/app/modules/home/weather/weather.component.ngfactory.js ***!
    \*********************************************************************/

  /*! exports provided: RenderType_WeatherComponent, View_WeatherComponent_0, View_WeatherComponent_Host_0, WeatherComponentNgFactory */

  /***/
  function srcAppModulesHomeWeatherWeatherComponentNgfactoryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RenderType_WeatherComponent", function () {
      return RenderType_WeatherComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_WeatherComponent_0", function () {
      return View_WeatherComponent_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "View_WeatherComponent_Host_0", function () {
      return View_WeatherComponent_Host_0;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WeatherComponentNgFactory", function () {
      return WeatherComponentNgFactory;
    });
    /* harmony import */


    var _weather_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./weather.component.scss.shim.ngstyle */
    "./src/app/modules/home/weather/weather.component.scss.shim.ngstyle.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../../../node_modules/@fortawesome/angular-fontawesome/angular-fontawesome.ngfactory */
    "./node_modules/@fortawesome/angular-fontawesome/angular-fontawesome.ngfactory.js");
    /* harmony import */


    var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @fortawesome/angular-fontawesome */
    "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _search_search_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../search/search.component.ngfactory */
    "./src/app/modules/home/search/search.component.ngfactory.js");
    /* harmony import */


    var _search_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../search/search.component */
    "./src/app/modules/home/search/search.component.ts");
    /* harmony import */


    var _shared_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../../shared/_loading/loading.service */
    "./src/app/shared/_loading/loading.service.ts");
    /* harmony import */


    var _core_services_weather_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../../core/services/weather.service */
    "./src/app/core/services/weather.service.ts");
    /* harmony import */


    var _weather_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./weather.component */
    "./src/app/modules/home/weather/weather.component.ts");
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles_WeatherComponent = [_weather_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];

    var RenderType_WeatherComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({
      encapsulation: 0,
      styles: styles_WeatherComponent,
      data: {}
    });

    function View_WeatherComponent_1(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 11, "div", [["class", "col-12 col-sm-6 col-md-4 my-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 10, "div", [["class", "card w-100 d-block border-0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 9, "div", [["class", "my-background rounded"]], [[4, "backgroundImage", null]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 2, "p", [["class", "text-center font-weight-bold pt-3 mb-0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](4, null, ["", ""])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](5, 2), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 2, "div", [["class", "text-center mb-0"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 1, "fa-icon", [["class", "ng-fa-icon"]], [[1, "title", 0], [8, "innerHTML", 1]], null, null, _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_FaIconComponent_0"], _node_modules_fortawesome_angular_fontawesome_angular_fontawesome_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_FaIconComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 573440, null, 0, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaIconComponent"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaConfig"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaIconLibrary"], [2, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaStackItemSizeDirective"]]], {
        icon: [0, "icon"]
      }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "h1", [["class", "text-center pl-3 my-font-border"], ["style", "font-size: 5rem;"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](10, null, ["", "\u00BA"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵppd"](11, 2)], function (_ck, _v) {
        var _co = _v.component;

        var currVal_4 = _co.iconWeather(_v.context.$implicit.weather_state_abbr);

        _ck(_v, 8, 0, currVal_4);
      }, function (_ck, _v) {
        var currVal_0 = "url(" + "assets/images/image" + (_v.context.index + 1) + ".jpg" + ")";

        _ck(_v, 2, 0, currVal_0);

        var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 4, 0, _ck(_v, 5, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v.parent, 0), _v.context.$implicit.applicable_date, "dd/MM/yyyy"));

        _ck(_v, 4, 0, currVal_1);

        var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).title;

        var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).renderedIconHTML;

        _ck(_v, 7, 0, currVal_2, currVal_3);

        var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 10, 0, _ck(_v, 11, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v.parent, 1), _v.context.$implicit.the_temp, "1.0-0"));

        _ck(_v, 10, 0, currVal_5);
      });
    }

    function View_WeatherComponent_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["DecimalPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 10, "div", [["class", "container mb-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 6, "div", [["class", "row mt-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 2, "div", [["class", "col-12 col-sm-6 col-md-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "app-search", [], null, null, null, _search_search_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_SearchComponent_0"], _search_search_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_SearchComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 114688, null, 0, _search_search_component__WEBPACK_IMPORTED_MODULE_7__["SearchComponent"], [_shared_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"], _core_services_weather_service__WEBPACK_IMPORTED_MODULE_9__["WeatherService"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 2, "div", [["class", "col-12 col-sm-6 col-md-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 1, "h1", [["class", "text-center mb-0 mt-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](9, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 2, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_WeatherComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], {
        ngForOf: [0, "ngForOf"]
      }, null)], function (_ck, _v) {
        var _co = _v.component;

        _ck(_v, 6, 0);

        var currVal_1 = _co.weather.consolidated_weather;

        _ck(_v, 12, 0, currVal_1);
      }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.weather.title;

        _ck(_v, 9, 0, currVal_0);
      });
    }

    function View_WeatherComponent_Host_0(_l) {
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-weather", [], null, null, null, View_WeatherComponent_0, RenderType_WeatherComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _weather_component__WEBPACK_IMPORTED_MODULE_10__["WeatherComponent"], [_shared_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"], _core_services_weather_service__WEBPACK_IMPORTED_MODULE_9__["WeatherService"]], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
      }, null);
    }

    var WeatherComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-weather", _weather_component__WEBPACK_IMPORTED_MODULE_10__["WeatherComponent"], View_WeatherComponent_Host_0, {}, {}, []);
    /***/

  },

  /***/
  "./src/app/modules/home/weather/weather.component.scss.shim.ngstyle.js":
  /*!*****************************************************************************!*\
    !*** ./src/app/modules/home/weather/weather.component.scss.shim.ngstyle.js ***!
    \*****************************************************************************/

  /*! exports provided: styles */

  /***/
  function srcAppModulesHomeWeatherWeatherComponentScssShimNgstyleJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "styles", function () {
      return styles;
    });
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */


    var styles = [".my-background[_ngcontent-%COMP%] {\n  min-height: 220px;\n  background-size: cover;\n  background-position: center;\n}\n\n.my-background-1[_ngcontent-%COMP%] {\n  background-image: url('image1.24cc835f60f0c1ded56e.jpg');\n}\n\n.my-font-border[_ngcontent-%COMP%] {\n  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;\n}\n\n.card[_ngcontent-%COMP%]    > .my-background[_ngcontent-%COMP%] {\n  position: relative;\n  top: 0;\n}\n\n.card[_ngcontent-%COMP%]    > .my-background[_ngcontent-%COMP%]:hover {\n  top: -4px;\n  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n\nfa-icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}"];
    /***/
  },

  /***/
  "./src/app/modules/home/weather/weather.component.ts":
  /*!***********************************************************!*\
    !*** ./src/app/modules/home/weather/weather.component.ts ***!
    \***********************************************************/

  /*! exports provided: WeatherComponent */

  /***/
  function srcAppModulesHomeWeatherWeatherComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WeatherComponent", function () {
      return WeatherComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    class WeatherComponent {
      constructor(loadingService, weatherService) {
        this.loadingService = loadingService;
        this.weatherService = weatherService;
        this.weatherIcon = new Array();
        this.weather = {};
        this.todayDate = new Date();
        this.weatherIcon = ['fas', 'snowflake'];
      }

      ngOnInit() {
        this.weatherService.currentCity.subscribe(city => {
          if (city != null) {
            this.getWeather(city.woeid);
          } else {
            // toDo: Add id by region.
            this.getWeather('455827');
          }
        });
      } //#region Weather


      getWeather(woeid) {
        this.loadingService.showLoading();

        if (this.isANewWoeid(woeid) || this.isDifferentBetweenDates()) {
          console.log("not from cache");
          this.weatherService.getWeather(woeid).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["first"])()).subscribe(data => {
            this.weather = data;
            this.loadingService.hideLoading();
          }, error => {
            this.loadingService.hideLoading();
          });
        } else {
          this.weather = this.weatherService.currentWeatherValue;
          this.loadingService.hideLoading();
          console.log("from cache");
        }
      } // verify if has a new woeid


      isANewWoeid(woeid) {
        if (this.weatherService.currentWeatherValue === null) {
          return true;
        } else {
          if (+woeid !== +this.weatherService.currentWeatherValue.woeid) {
            return true;
          }
        }

        return false;
      }

      isDifferentBetweenDates() {
        if (this.weatherService.currentWeatherValue !== null) {
          this.weatherDate = new Date(this.weatherService.currentWeatherValue.time);
          this.weatherDate.setHours(0, 0, 0);
          this.todayDate.setHours(0, 0, 0);

          if (this.todayDate.getDay !== this.weatherDate.getDay) {
            return true;
          } else {
            if (this.todayDate.getMonth !== this.weatherDate.getMonth) {
              return true;
            } else {
              if (this.todayDate.getFullYear !== this.weatherDate.getFullYear) {
                return true;
              }
            }
          }
        }

        return false;
      }

      iconWeather(wStates) {
        switch (wStates) {
          case 'sn':
            // Abbreviation of Snow
            return this.weatherIcon = ['fas', 'snowflake'];
            break;

          case 'sl':
            // Abbreviation of Sleet
            return this.weatherIcon = ['fas', 'cloud-meatball'];
            break;

          case 'h':
            // Abbreviation of Hail
            return this.weatherIcon = ['fas', 'cloud-meatball'];
            break;

          case 't':
            // Abbreviation of Thunderstorm
            return this.weatherIcon = ['fas', 'bolt'];
            break;

          case 'hr':
            // Abbreviation of Heavy Rain
            return this.weatherIcon = ['fas', 'cloud-showers-heavy'];
            break;

          case 'lr':
            // Abbreviation of Light Rain
            return this.weatherIcon = ['fas', 'cloud-rain'];
            break;

          case 's':
            // Abbreviation of Showers
            return this.weatherIcon = ['fas', 'poo-storm'];
            break;

          case 'hc':
            // Abbreviation of Heavy Cloud
            return this.weatherIcon = ['fas', 'cloud'];
            break;

          case 'lc':
            // Abbreviation of Light Cloud
            return this.weatherIcon = ['fas', 'cloud'];
            break;

          case 'c':
            // Abbreviation of Clear
            return this.weatherIcon = ['fas', 'cloud-sun'];
            break;

          default:
            return this.weatherIcon = ['fas', 'cloud-sun'];
            break;
        }
      }

    }
    /***/

  },

  /***/
  "./src/app/shared/_loading/loading.service.ts":
  /*!****************************************************!*\
    !*** ./src/app/shared/_loading/loading.service.ts ***!
    \****************************************************/

  /*! exports provided: LoadingService */

  /***/
  function srcAppShared_loadingLoadingServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoadingService", function () {
      return LoadingService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    class LoadingService {
      constructor() {}

      showLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('showLoading');
      }

      hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.remove('showLoading');
      }

    }

    LoadingService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      factory: function LoadingService_Factory() {
        return new LoadingService();
      },
      token: LoadingService,
      providedIn: "root"
    });
    /***/
  }
}]);