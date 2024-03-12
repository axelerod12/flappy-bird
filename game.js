(function () {
  var t,
    e = e || {};
  (e.WEBGL_RENDERER = 0),
    (e.CANVAS_RENDERER = 1),
    (e.VERSION = "v1.5.3"),
    (e.blendModes = {
      NORMAL: 0,
      ADD: 1,
      MULTIPLY: 2,
      SCREEN: 3,
      OVERLAY: 4,
      DARKEN: 5,
      LIGHTEN: 6,
      COLOR_DODGE: 7,
      COLOR_BURN: 8,
      HARD_LIGHT: 9,
      SOFT_LIGHT: 10,
      DIFFERENCE: 11,
      EXCLUSION: 12,
      HUE: 13,
      SATURATION: 14,
      COLOR: 15,
      LUMINOSITY: 16,
    }),
    (e.scaleModes = { DEFAULT: 0, LINEAR: 0, NEAREST: 1 }),
    (e.INTERACTION_FREQUENCY = 30),
    (e.AUTO_PREVENT_DEFAULT = !0),
    (e.RAD_TO_DEG = 180 / Math.PI),
    (e.DEG_TO_RAD = Math.PI / 180),
    (e.Point = function (t, e) {
      (this.x = t || 0), (this.y = e || 0);
    }),
    (e.Point.prototype.clone = function () {
      return new e.Point(this.x, this.y);
    }),
    (e.Point.prototype.constructor = e.Point),
    (e.Point.prototype.set = function (t, e) {
      (this.x = t || 0), (this.y = e || (0 !== e ? this.x : 0));
    }),
    (e.Rectangle = function (t, e, i, n) {
      (this.x = t || 0),
        (this.y = e || 0),
        (this.width = i || 0),
        (this.height = n || 0);
    }),
    (e.Rectangle.prototype.clone = function () {
      return new e.Rectangle(this.x, this.y, this.width, this.height);
    }),
    (e.Rectangle.prototype.contains = function (t, e) {
      if (0 >= this.width || 0 >= this.height) return !1;
      var i = this.x;
      return (
        t >= i &&
        t <= i + this.width &&
        e >= (i = this.y) &&
        e <= i + this.height
      );
    }),
    (e.Rectangle.prototype.constructor = e.Rectangle),
    (e.EmptyRectangle = new e.Rectangle(0, 0, 0, 0)),
    (e.Polygon = function (t) {
      if (
        (t instanceof Array || (t = Array.prototype.slice.call(arguments)),
        "number" == typeof t[0])
      ) {
        for (var i = [], n = 0, s = t.length; n < s; n += 2)
          i.push(new e.Point(t[n], t[n + 1]));
        t = i;
      }
      this.points = t;
    }),
    (e.Polygon.prototype.clone = function () {
      for (var t = [], i = 0; i < this.points.length; i++)
        t.push(this.points[i].clone());
      return new e.Polygon(t);
    }),
    (e.Polygon.prototype.contains = function (t, e) {
      for (
        var i = !1, n = 0, s = this.points.length - 1;
        n < this.points.length;
        s = n++
      ) {
        var o = this.points[n].x,
          h = this.points[n].y,
          l = this.points[s].x,
          s = this.points[s].y;
        h > e != s > e && t < ((l - o) * (e - h)) / (s - h) + o && (i = !i);
      }
      return i;
    }),
    (e.Polygon.prototype.constructor = e.Polygon),
    (e.Circle = function (t, e, i) {
      (this.x = t || 0), (this.y = e || 0), (this.radius = i || 0);
    }),
    (e.Circle.prototype.clone = function () {
      return new e.Circle(this.x, this.y, this.radius);
    }),
    (e.Circle.prototype.contains = function (t, e) {
      if (0 >= this.radius) return !1;
      var i = this.x - t,
        n = this.y - e;
      return i * i + n * n <= this.radius * this.radius;
    }),
    (e.Circle.prototype.constructor = e.Circle),
    (e.Ellipse = function (t, e, i, n) {
      (this.x = t || 0),
        (this.y = e || 0),
        (this.width = i || 0),
        (this.height = n || 0);
    }),
    (e.Ellipse.prototype.clone = function () {
      return new e.Ellipse(this.x, this.y, this.width, this.height);
    }),
    (e.Ellipse.prototype.contains = function (t, e) {
      if (0 >= this.width || 0 >= this.height) return !1;
      var i = (t - this.x) / this.width,
        n = (e - this.y) / this.height;
      return 1 >= i * i + n * n;
    }),
    (e.Ellipse.prototype.getBounds = function () {
      return new e.Rectangle(this.x, this.y, this.width, this.height);
    }),
    (e.Ellipse.prototype.constructor = e.Ellipse),
    (e.determineMatrixArrayType = function () {
      return "undefined" != typeof Float32Array ? Float32Array : Array;
    }),
    (e.Matrix2 = e.determineMatrixArrayType()),
    (e.Matrix = function () {
      (this.a = 1),
        (this.c = this.b = 0),
        (this.d = 1),
        (this.ty = this.tx = 0);
    }),
    (e.Matrix.prototype.fromArray = function (t) {
      (this.a = t[0]),
        (this.b = t[1]),
        (this.c = t[3]),
        (this.d = t[4]),
        (this.tx = t[2]),
        (this.ty = t[5]);
    }),
    (e.Matrix.prototype.toArray = function (t) {
      this.array || (this.array = new Float32Array(9));
      var e = this.array;
      return (
        t
          ? ((this.array[0] = this.a),
            (this.array[1] = this.c),
            (this.array[2] = 0),
            (this.array[3] = this.b),
            (this.array[4] = this.d),
            (this.array[5] = 0),
            (this.array[6] = this.tx),
            (this.array[7] = this.ty))
          : ((this.array[0] = this.a),
            (this.array[1] = this.b),
            (this.array[2] = this.tx),
            (this.array[3] = this.c),
            (this.array[4] = this.d),
            (this.array[5] = this.ty),
            (this.array[6] = 0),
            (this.array[7] = 0)),
        (this.array[8] = 1),
        e
      );
    }),
    (e.identityMatrix = new e.Matrix()),
    (e.DisplayObject = function () {
      (this.position = new e.Point()),
        (this.scale = new e.Point(1, 1)),
        (this.pivot = new e.Point(0, 0)),
        (this.rotation = 0),
        (this.alpha = 1),
        (this.visible = !0),
        (this.hitArea = null),
        (this.renderable = this.buttonMode = !1),
        (this.stage = this.parent = null),
        (this.worldAlpha = 1),
        (this._interactive = !1),
        (this.defaultCursor = "pointer"),
        (this.worldTransform = new e.Matrix()),
        (this.color = []),
        (this.dynamic = !0),
        (this._sr = 0),
        (this._cr = 1),
        (this.filterArea = null),
        (this._bounds = new e.Rectangle(0, 0, 1, 1)),
        (this._mask = this._currentBounds = null),
        (this._cacheIsDirty = this._cacheAsBitmap = !1);
    }),
    (e.DisplayObject.prototype.constructor = e.DisplayObject),
    (e.DisplayObject.prototype.setInteractive = function (t) {
      this.interactive = t;
    }),
    Object.defineProperty(e.DisplayObject.prototype, "interactive", {
      get: function () {
        return this._interactive;
      },
      set: function (t) {
        (this._interactive = t), this.stage && (this.stage.dirty = !0);
      },
    }),
    Object.defineProperty(e.DisplayObject.prototype, "worldVisible", {
      get: function () {
        var t = this;
        do {
          if (!t.visible) return !1;
          t = t.parent;
        } while (t);
        return !0;
      },
    }),
    Object.defineProperty(e.DisplayObject.prototype, "mask", {
      get: function () {
        return this._mask;
      },
      set: function (t) {
        this._mask && (this._mask.isMask = !1),
          (this._mask = t) && (this._mask.isMask = !0);
      },
    }),
    Object.defineProperty(e.DisplayObject.prototype, "filters", {
      get: function () {
        return this._filters;
      },
      set: function (t) {
        if (t) {
          for (var e = [], i = 0; i < t.length; i++)
            for (var n = t[i].passes, s = 0; s < n.length; s++) e.push(n[s]);
          this._filterBlock = { target: this, filterPasses: e };
        }
        this._filters = t;
      },
    }),
    Object.defineProperty(e.DisplayObject.prototype, "cacheAsBitmap", {
      get: function () {
        return this._cacheAsBitmap;
      },
      set: function (t) {
        this._cacheAsBitmap !== t &&
          (t ? this._generateCachedSprite() : this._destroyCachedSprite(),
          (this._cacheAsBitmap = t));
      },
    }),
    (e.DisplayObject.prototype.updateTransform = function () {
      this.rotation !== this.rotationCache &&
        ((this.rotationCache = this.rotation),
        (this._sr = Math.sin(this.rotation)),
        (this._cr = Math.cos(this.rotation)));
      var t = this.parent.worldTransform,
        e = this.worldTransform,
        i = this.pivot.x,
        n = this.pivot.y,
        s = this._cr * this.scale.x,
        o = -this._sr * this.scale.y,
        h = this._sr * this.scale.x,
        l = this._cr * this.scale.y,
        u = this.position.x - s * i - n * o,
        i = this.position.y - l * n - i * h,
        n = t.a,
        d = t.b,
        c = t.c,
        p = t.d;
      (e.a = n * s + d * h),
        (e.b = n * o + d * l),
        (e.tx = n * u + d * i + t.tx),
        (e.c = c * s + p * h),
        (e.d = c * o + p * l),
        (e.ty = c * u + p * i + t.ty),
        (this.worldAlpha = this.alpha * this.parent.worldAlpha);
    }),
    (e.DisplayObject.prototype.getBounds = function (t) {
      return e.EmptyRectangle;
    }),
    (e.DisplayObject.prototype.getLocalBounds = function () {
      return this.getBounds(e.identityMatrix);
    }),
    (e.DisplayObject.prototype.setStageReference = function (t) {
      (this.stage = t), this._interactive && (this.stage.dirty = !0);
    }),
    (e.DisplayObject.prototype.generateTexture = function (t) {
      var i = this.getLocalBounds();
      return (
        (t = new e.RenderTexture(0 | i.width, 0 | i.height, t)).render(
          this,
          new e.Point(-i.x, -i.y)
        ),
        t
      );
    }),
    (e.DisplayObject.prototype.updateCache = function () {
      this._generateCachedSprite();
    }),
    (e.DisplayObject.prototype._renderCachedSprite = function (t) {
      t.gl
        ? e.Sprite.prototype._renderWebGL.call(this._cachedSprite, t)
        : e.Sprite.prototype._renderCanvas.call(this._cachedSprite, t);
    }),
    (e.DisplayObject.prototype._generateCachedSprite = function () {
      this._cacheAsBitmap = !1;
      var t = this.getLocalBounds();
      if (this._cachedSprite)
        this._cachedSprite.texture.resize(0 | t.width, 0 | t.height);
      else {
        var i = new e.RenderTexture(0 | t.width, 0 | t.height);
        (this._cachedSprite = new e.Sprite(i)),
          (this._cachedSprite.worldTransform = this.worldTransform);
      }
      (i = this._filters),
        (this._filters = null),
        (this._cachedSprite.filters = i),
        this._cachedSprite.texture.render(this, new e.Point(-t.x, -t.y)),
        (this._cachedSprite.anchor.x = -(t.x / t.width)),
        (this._cachedSprite.anchor.y = -(t.y / t.height)),
        (this._filters = i),
        (this._cacheAsBitmap = !0);
    }),
    (e.DisplayObject.prototype._destroyCachedSprite = function () {
      this._cachedSprite &&
        (this._cachedSprite.texture.destroy(!0), (this._cachedSprite = null));
    }),
    (e.DisplayObject.prototype._renderWebGL = function (t) {}),
    (e.DisplayObject.prototype._renderCanvas = function (t) {}),
    Object.defineProperty(e.DisplayObject.prototype, "x", {
      get: function () {
        return this.position.x;
      },
      set: function (t) {
        this.position.x = t;
      },
    }),
    Object.defineProperty(e.DisplayObject.prototype, "y", {
      get: function () {
        return this.position.y;
      },
      set: function (t) {
        this.position.y = t;
      },
    }),
    (e.DisplayObjectContainer = function () {
      e.DisplayObject.call(this), (this.children = []);
    }),
    (e.DisplayObjectContainer.prototype = Object.create(
      e.DisplayObject.prototype
    )),
    (e.DisplayObjectContainer.prototype.constructor = e.DisplayObjectContainer),
    (e.DisplayObjectContainer.prototype.addChild = function (t) {
      this.addChildAt(t, this.children.length);
    }),
    (e.DisplayObjectContainer.prototype.addChildAt = function (t, e) {
      if (0 <= e && e <= this.children.length)
        t.parent && t.parent.removeChild(t),
          (t.parent = this),
          this.children.splice(e, 0, t),
          this.stage && t.setStageReference(this.stage);
      else
        throw Error(
          t +
            " The index " +
            e +
            " supplied is out of bounds " +
            this.children.length
        );
    }),
    (e.DisplayObjectContainer.prototype.swapChildren = function (t, e) {
      if (t !== e) {
        var i = this.children.indexOf(t),
          n = this.children.indexOf(e);
        if (0 > i || 0 > n)
          throw Error(
            "swapChildren: Both the supplied DisplayObjects must be a child of the caller."
          );
        (this.children[i] = e), (this.children[n] = t);
      }
    }),
    (e.DisplayObjectContainer.prototype.getChildAt = function (t) {
      if (0 <= t && t < this.children.length) return this.children[t];
      throw Error(
        "Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller"
      );
    }),
    (e.DisplayObjectContainer.prototype.removeChild = function (t) {
      return this.removeChildAt(this.children.indexOf(t));
    }),
    (e.DisplayObjectContainer.prototype.removeChildAt = function (t) {
      var e = this.getChildAt(t);
      return (
        this.stage && e.removeStageReference(),
        (e.parent = void 0),
        this.children.splice(t, 1),
        e
      );
    }),
    (e.DisplayObjectContainer.prototype.removeChildren = function (t, e) {
      var i = t || 0,
        n = "number" == typeof e ? e : this.children.length,
        s = n - i;
      if (0 < s && s <= n) {
        for (n = 0, i = this.children.splice(i, s); n < i.length; n++)
          (s = i[n]),
            this.stage && s.removeStageReference(),
            (s.parent = void 0);
        return i;
      }
      throw Error(
        "Range Error, numeric values are outside the acceptable range"
      );
    }),
    (e.DisplayObjectContainer.prototype.updateTransform = function () {
      if (
        this.visible &&
        (e.DisplayObject.prototype.updateTransform.call(this),
        !this._cacheAsBitmap)
      )
        for (var t = 0, i = this.children.length; t < i; t++)
          this.children[t].updateTransform();
    }),
    (e.DisplayObjectContainer.prototype.getBounds = function (t) {
      if (0 === this.children.length) return e.EmptyRectangle;
      if (t) {
        var i = this.worldTransform;
        (this.worldTransform = t),
          this.updateTransform(),
          (this.worldTransform = i);
      }
      for (
        var n,
          s,
          o = (i = 1 / 0),
          h = -1 / 0,
          l = -1 / 0,
          u = !1,
          d = 0,
          c = this.children.length;
        d < c;
        d++
      )
        this.children[d].visible &&
          ((u = !0),
          (i = i < (n = this.children[d].getBounds(t)).x ? i : n.x),
          (o = o < n.y ? o : n.y),
          (s = n.width + n.x),
          (n = n.height + n.y),
          (h = h > s ? h : s),
          (l = l > n ? l : n));
      return u
        ? (((t = this._bounds).x = i),
          (t.y = o),
          (t.width = h - i),
          (t.height = l - o),
          t)
        : e.EmptyRectangle;
    }),
    (e.DisplayObjectContainer.prototype.getLocalBounds = function () {
      var t = this.worldTransform;
      this.worldTransform = e.identityMatrix;
      for (var i = 0, n = this.children.length; i < n; i++)
        this.children[i].updateTransform();
      return (i = this.getBounds()), (this.worldTransform = t), i;
    }),
    (e.DisplayObjectContainer.prototype.setStageReference = function (t) {
      (this.stage = t), this._interactive && (this.stage.dirty = !0);
      for (var e = 0, i = this.children.length; e < i; e++)
        this.children[e].setStageReference(t);
    }),
    (e.DisplayObjectContainer.prototype.removeStageReference = function () {
      for (var t = 0, e = this.children.length; t < e; t++)
        this.children[t].removeStageReference();
      this._interactive && (this.stage.dirty = !0), (this.stage = null);
    }),
    (e.DisplayObjectContainer.prototype._renderWebGL = function (t) {
      if (this.visible && !(0 >= this.alpha)) {
        if (this._cacheAsBitmap) this._renderCachedSprite(t);
        else {
          var e, i;
          if (this._mask || this._filters) {
            for (
              this._mask &&
                (t.spriteBatch.stop(),
                t.maskManager.pushMask(this.mask, t),
                t.spriteBatch.start()),
                this._filters &&
                  (t.spriteBatch.flush(),
                  t.filterManager.pushFilter(this._filterBlock)),
                e = 0,
                i = this.children.length;
              e < i;
              e++
            )
              this.children[e]._renderWebGL(t);
            t.spriteBatch.stop(),
              this._filters && t.filterManager.popFilter(),
              this._mask && t.maskManager.popMask(t),
              t.spriteBatch.start();
          } else
            for (e = 0, i = this.children.length; e < i; e++)
              this.children[e]._renderWebGL(t);
        }
      }
    }),
    (e.DisplayObjectContainer.prototype._renderCanvas = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha) {
        if (this._cacheAsBitmap) this._renderCachedSprite(t);
        else {
          this._mask && t.maskManager.pushMask(this._mask, t.context);
          for (var e = 0, i = this.children.length; e < i; e++)
            this.children[e]._renderCanvas(t);
          this._mask && t.maskManager.popMask(t.context);
        }
      }
    }),
    (e.Sprite = function (t) {
      e.DisplayObjectContainer.call(this),
        (this.anchor = new e.Point()),
        (this.texture = t),
        (this._height = this._width = 0),
        (this.tint = 16777215),
        (this.blendMode = e.blendModes.NORMAL),
        t.baseTexture.hasLoaded
          ? this.onTextureUpdate()
          : ((this.onTextureUpdateBind = this.onTextureUpdate.bind(this)),
            this.texture.addEventListener("update", this.onTextureUpdateBind)),
        (this.renderable = !0);
    }),
    (e.Sprite.prototype = Object.create(e.DisplayObjectContainer.prototype)),
    (e.Sprite.prototype.constructor = e.Sprite),
    Object.defineProperty(e.Sprite.prototype, "width", {
      get: function () {
        return this.scale.x * this.texture.frame.width;
      },
      set: function (t) {
        (this.scale.x = t / this.texture.frame.width), (this._width = t);
      },
    }),
    Object.defineProperty(e.Sprite.prototype, "height", {
      get: function () {
        return this.scale.y * this.texture.frame.height;
      },
      set: function (t) {
        (this.scale.y = t / this.texture.frame.height), (this._height = t);
      },
    }),
    (e.Sprite.prototype.setTexture = function (t) {
      this.texture.baseTexture !== t.baseTexture && (this.textureChange = !0),
        (this.texture = t),
        (this.cachedTint = 16777215),
        (this.updateFrame = !0);
    }),
    (e.Sprite.prototype.onTextureUpdate = function () {
      this._width && (this.scale.x = this._width / this.texture.frame.width),
        this._height &&
          (this.scale.y = this._height / this.texture.frame.height),
        (this.updateFrame = !0);
    }),
    (e.Sprite.prototype.getBounds = function (t) {
      var e = this.texture.frame.width,
        i = this.texture.frame.height,
        n = e * (1 - this.anchor.x),
        s = -(e * this.anchor.x),
        o = i * (1 - this.anchor.y),
        h = -(i * this.anchor.y),
        l = (t = t || this.worldTransform).a,
        u = t.c,
        d = t.b,
        c = t.d,
        p = t.tx,
        f = t.ty;
      t = l * s + d * h + p;
      var i = c * h + u * s + f,
        e = l * n + d * h + p,
        h = c * h + u * n + f,
        m = l * n + d * o + p,
        n = c * o + u * n + f,
        l = l * s + d * o + p,
        s = c * o + u * s + f,
        u = (o = -1 / 0),
        d = (c = 1 / 0),
        c = t < c ? t : c,
        c = e < c ? e : c,
        c = m < c ? m : c,
        c = l < c ? l : c,
        d = i < d ? i : d,
        d = h < d ? h : d,
        d = n < d ? n : d,
        d = s < d ? s : d,
        o = t > o ? t : o,
        o = e > o ? e : o,
        o = m > o ? m : o,
        u = i > u ? i : u,
        u = h > u ? h : u,
        u = n > u ? n : u;
      return (
        ((t = this._bounds).x = c),
        (t.width = (l > o ? l : o) - c),
        (t.y = d),
        (t.height = (s > u ? s : u) - d),
        (this._currentBounds = t)
      );
    }),
    (e.Sprite.prototype._renderWebGL = function (t) {
      if (this.visible && !(0 >= this.alpha)) {
        var e, i;
        if (this._mask || this._filters) {
          var n = t.spriteBatch;
          for (
            this._mask &&
              (n.stop(), t.maskManager.pushMask(this.mask, t), n.start()),
              this._filters &&
                (n.flush(), t.filterManager.pushFilter(this._filterBlock)),
              n.render(this),
              e = 0,
              i = this.children.length;
            e < i;
            e++
          )
            this.children[e]._renderWebGL(t);
          n.stop(),
            this._filters && t.filterManager.popFilter(),
            this._mask && t.maskManager.popMask(t),
            n.start();
        } else
          for (
            t.spriteBatch.render(this), e = 0, i = this.children.length;
            e < i;
            e++
          )
            this.children[e]._renderWebGL(t);
      }
    }),
    (e.Sprite.prototype._renderCanvas = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha) {
        var i = this.texture.frame,
          n = t.context,
          s = this.texture;
        if (
          (this.blendMode !== t.currentBlendMode &&
            ((t.currentBlendMode = this.blendMode),
            (n.globalCompositeOperation =
              e.blendModesCanvas[t.currentBlendMode])),
          this._mask && t.maskManager.pushMask(this._mask, t.context),
          i && i.width && i.height && s.baseTexture.source)
        ) {
          n.globalAlpha = this.worldAlpha;
          var o = this.worldTransform;
          if (
            (t.roundPixels
              ? n.setTransform(o.a, o.c, o.b, o.d, 0 | o.tx, 0 | o.ty)
              : n.setTransform(o.a, o.c, o.b, o.d, o.tx, o.ty),
            t.smoothProperty &&
              t.scaleMode !== this.texture.baseTexture.scaleMode &&
              ((t.scaleMode = this.texture.baseTexture.scaleMode),
              (n[t.smoothProperty] = t.scaleMode === e.scaleModes.LINEAR)),
            16777215 !== this.tint)
          ) {
            if (this.cachedTint !== this.tint) {
              if (!s.baseTexture.hasLoaded) return;
              (this.cachedTint = this.tint),
                (this.tintedTexture = e.CanvasTinter.getTintedTexture(
                  this,
                  this.tint
                ));
            }
            n.drawImage(
              this.tintedTexture,
              0,
              0,
              i.width,
              i.height,
              -(this.anchor.x * i.width),
              -(this.anchor.y * i.height),
              i.width,
              i.height
            );
          } else
            s.trim
              ? ((s = s.trim),
                n.drawImage(
                  this.texture.baseTexture.source,
                  i.x,
                  i.y,
                  i.width,
                  i.height,
                  s.x - this.anchor.x * s.width,
                  s.y - this.anchor.y * s.height,
                  i.width,
                  i.height
                ))
              : n.drawImage(
                  this.texture.baseTexture.source,
                  i.x,
                  i.y,
                  i.width,
                  i.height,
                  -(this.anchor.x * i.width),
                  -(this.anchor.y * i.height),
                  i.width,
                  i.height
                );
        }
        for (i = 0, n = this.children.length; i < n; i++)
          this.children[i]._renderCanvas(t);
        this._mask && t.maskManager.popMask(t.context);
      }
    }),
    (e.Sprite.fromFrame = function (t) {
      var i = e.TextureCache[t];
      if (!i)
        throw Error(
          'The frameId "' + t + '" does not exist in the texture cache' + this
        );
      return new e.Sprite(i);
    }),
    (e.Sprite.fromImage = function (t, i, n) {
      return (t = e.Texture.fromImage(t, i, n)), new e.Sprite(t);
    }),
    (e.SpriteBatch = function (t) {
      e.DisplayObjectContainer.call(this),
        (this.textureThing = t),
        (this.ready = !1);
    }),
    (e.SpriteBatch.prototype = Object.create(
      e.DisplayObjectContainer.prototype
    )),
    (e.SpriteBatch.constructor = e.SpriteBatch),
    (e.SpriteBatch.prototype.initWebGL = function (t) {
      (this.fastSpriteBatch = new e.WebGLFastSpriteBatch(t)), (this.ready = !0);
    }),
    (e.SpriteBatch.prototype.updateTransform = function () {
      e.DisplayObject.prototype.updateTransform.call(this);
    }),
    (e.SpriteBatch.prototype._renderWebGL = function (t) {
      this.visible &&
        !(0 >= this.alpha) &&
        this.children.length &&
        (this.ready || this.initWebGL(t.gl),
        t.spriteBatch.stop(),
        t.shaderManager.activateShader(t.shaderManager.fastShader),
        this.fastSpriteBatch.begin(this, t),
        this.fastSpriteBatch.render(this),
        t.shaderManager.activateShader(t.shaderManager.defaultShader),
        t.spriteBatch.start());
    }),
    (e.SpriteBatch.prototype._renderCanvas = function (t) {
      var i = t.context;
      (i.globalAlpha = this.worldAlpha),
        e.DisplayObject.prototype.updateTransform.call(this);
      for (
        var n = this.worldTransform, s = !0, o = 0;
        o < this.children.length;
        o++
      ) {
        var h = this.children[o];
        if (h.visible) {
          var l = h.texture,
            u = l.frame;
          if (
            ((i.globalAlpha = this.worldAlpha * h.alpha),
            0 == h.rotation % (2 * Math.PI))
          )
            s && (i.setTransform(n.a, n.c, n.b, n.d, n.tx, n.ty), (s = !1)),
              i.drawImage(
                l.baseTexture.source,
                u.x,
                u.y,
                u.width,
                u.height,
                (-(h.anchor.x * u.width) * h.scale.x + h.position.x + 0.5) | 0,
                (-(h.anchor.y * u.height) * h.scale.y + h.position.y + 0.5) | 0,
                u.width * h.scale.x,
                u.height * h.scale.y
              );
          else {
            s || (s = !0), e.DisplayObject.prototype.updateTransform.call(h);
            var d = h.worldTransform;
            t.roundPixels
              ? i.setTransform(d.a, d.c, d.b, d.d, 0 | d.tx, 0 | d.ty)
              : i.setTransform(d.a, d.c, d.b, d.d, d.tx, d.ty),
              i.drawImage(
                l.baseTexture.source,
                u.x,
                u.y,
                u.width,
                u.height,
                (-(h.anchor.x * u.width) + 0.5) | 0,
                (-(h.anchor.y * u.height) + 0.5) | 0,
                u.width,
                u.height
              );
          }
        }
      }
    }),
    (e.MovieClip = function (t) {
      e.Sprite.call(this, t[0]),
        (this.textures = t),
        (this.animationSpeed = 1),
        (this.loop = !0),
        (this.onComplete = null),
        (this.currentFrame = 0),
        (this.playing = !1);
    }),
    (e.MovieClip.prototype = Object.create(e.Sprite.prototype)),
    (e.MovieClip.prototype.constructor = e.MovieClip),
    Object.defineProperty(e.MovieClip.prototype, "totalFrames", {
      get: function () {
        return this.textures.length;
      },
    }),
    (e.MovieClip.prototype.stop = function () {
      this.playing = !1;
    }),
    (e.MovieClip.prototype.play = function () {
      this.playing = !0;
    }),
    (e.MovieClip.prototype.gotoAndStop = function (t) {
      (this.playing = !1),
        (this.currentFrame = t),
        this.setTexture(
          this.textures[((this.currentFrame + 0.5) | 0) % this.textures.length]
        );
    }),
    (e.MovieClip.prototype.gotoAndPlay = function (t) {
      (this.currentFrame = t), (this.playing = !0);
    }),
    (e.MovieClip.prototype.updateTransform = function () {
      if ((e.Sprite.prototype.updateTransform.call(this), this.playing)) {
        this.currentFrame += this.animationSpeed;
        var t = (this.currentFrame + 0.5) | 0;
        this.loop || t < this.textures.length
          ? this.setTexture(this.textures[t % this.textures.length])
          : t >= this.textures.length &&
            (this.gotoAndStop(this.textures.length - 1), this.onComplete) &&
            this.onComplete();
      }
    }),
    (e.MovieClip.prototype.fromFrames = function (t) {
      for (var i = [], n = 0; n < t.length; n++)
        i.push(new e.Texture.fromFrame(t[n]));
      return new e.MovieClip(i);
    }),
    (e.MovieClip.prototype.fromImages = function (t) {
      for (var i = [], n = 0; n < t.length; n++)
        i.push(new e.Texture.fromImage(t[n]));
      return new e.MovieClip(i);
    }),
    (e.FilterBlock = function () {
      this.renderable = this.visible = !0;
    }),
    (e.Text = function (t, i) {
      (this.canvas = document.createElement("canvas")),
        (this.context = this.canvas.getContext("2d")),
        e.Sprite.call(this, e.Texture.fromCanvas(this.canvas)),
        this.setText(t),
        this.setStyle(i),
        this.updateText(),
        (this.dirty = !1);
    }),
    (e.Text.prototype = Object.create(e.Sprite.prototype)),
    (e.Text.prototype.constructor = e.Text),
    (e.Text.prototype.setStyle = function (t) {
      ((t = t || {}).font = t.font || "bold 20pt Arial"),
        (t.fill = t.fill || "black"),
        (t.align = t.align || "left"),
        (t.stroke = t.stroke || "black"),
        (t.strokeThickness = t.strokeThickness || 0),
        (t.wordWrap = t.wordWrap || !1),
        (t.wordWrapWidth = t.wordWrapWidth || 100),
        (t.wordWrapWidth = t.wordWrapWidth || 100),
        (t.dropShadow = t.dropShadow || !1),
        (t.dropShadowAngle = t.dropShadowAngle || Math.PI / 6),
        (t.dropShadowDistance = t.dropShadowDistance || 4),
        (t.dropShadowColor = t.dropShadowColor || "black"),
        (this.style = t),
        (this.dirty = !0);
    }),
    (e.Text.prototype.setText = function (t) {
      (this.text = t.toString() || " "), (this.dirty = !0);
    }),
    (e.Text.prototype.updateText = function () {
      this.context.font = this.style.font;
      var t,
        e,
        i = this.text;
      this.style.wordWrap && (i = this.wordWrap(this.text));
      for (
        var i = i.split(/(?:\r\n|\r|\n)/), n = [], s = 0, o = 0;
        o < i.length;
        o++
      ) {
        var h = this.context.measureText(i[o]).width;
        (n[o] = h), (s = Math.max(s, h));
      }
      if (
        ((o = s + this.style.strokeThickness),
        this.style.dropShadow && (o += this.style.dropShadowDistance),
        (this.canvas.width = o + this.context.lineWidth),
        (o =
          (h =
            this.determineFontHeight("font: " + this.style.font + ";") +
            this.style.strokeThickness) * i.length),
        this.style.dropShadow && (o += this.style.dropShadowDistance),
        (this.canvas.height = o),
        navigator.isCocoonJS &&
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
        (this.context.font = this.style.font),
        (this.context.strokeStyle = this.style.stroke),
        (this.context.lineWidth = this.style.strokeThickness),
        (this.context.textBaseline = "top"),
        this.style.dropShadow)
      ) {
        this.context.fillStyle = this.style.dropShadowColor;
        for (
          var l =
              Math.sin(this.style.dropShadowAngle) *
              this.style.dropShadowDistance,
            u =
              Math.cos(this.style.dropShadowAngle) *
              this.style.dropShadowDistance,
            o = 0;
          o < i.length;
          o++
        )
          (t = this.style.strokeThickness / 2),
            (e = this.style.strokeThickness / 2 + o * h),
            "right" === this.style.align
              ? (t += s - n[o])
              : "center" === this.style.align && (t += (s - n[o]) / 2),
            this.style.fill && this.context.fillText(i[o], t + l, e + u);
      }
      for (o = 0, this.context.fillStyle = this.style.fill; o < i.length; o++)
        (t = this.style.strokeThickness / 2),
          (e = this.style.strokeThickness / 2 + o * h),
          "right" === this.style.align
            ? (t += s - n[o])
            : "center" === this.style.align && (t += (s - n[o]) / 2),
          this.style.stroke &&
            this.style.strokeThickness &&
            this.context.strokeText(i[o], t, e),
          this.style.fill && this.context.fillText(i[o], t, e);
      this.updateTexture();
    }),
    (e.Text.prototype.updateTexture = function () {
      (this.texture.baseTexture.width = this.canvas.width),
        (this.texture.baseTexture.height = this.canvas.height),
        (this.texture.frame.width = this.canvas.width),
        (this.texture.frame.height = this.canvas.height),
        (this._width = this.canvas.width),
        (this._height = this.canvas.height),
        (this.requiresUpdate = !0);
    }),
    (e.Text.prototype._renderWebGL = function (t) {
      this.requiresUpdate &&
        ((this.requiresUpdate = !1),
        e.updateWebGLTexture(this.texture.baseTexture, t.gl)),
        e.Sprite.prototype._renderWebGL.call(this, t);
    }),
    (e.Text.prototype.updateTransform = function () {
      this.dirty && (this.updateText(), (this.dirty = !1)),
        e.Sprite.prototype.updateTransform.call(this);
    }),
    (e.Text.prototype.determineFontHeight = function (t) {
      var i = e.Text.heightCache[t];
      if (!i) {
        var n = document.getElementsByTagName("body")[0],
          s = document.createElement("div"),
          i = document.createTextNode("M");
        s.appendChild(i),
          s.setAttribute("style", t + ";position:absolute;top:0;left:0"),
          n.appendChild(s),
          (i = s.offsetHeight),
          (e.Text.heightCache[t] = i),
          n.removeChild(s);
      }
      return i;
    }),
    (e.Text.prototype.wordWrap = function (t) {
      var e = "";
      t = t.split("\n");
      for (var i = 0; i < t.length; i++) {
        for (
          var n = this.style.wordWrapWidth, s = t[i].split(" "), o = 0;
          o < s.length;
          o++
        ) {
          var h = this.context.measureText(s[o]).width,
            l = h + this.context.measureText(" ").width;
          0 === o || l > n
            ? (0 < o && (e += "\n"),
              (e += s[o]),
              (n = this.style.wordWrapWidth - h))
            : ((n -= l), (e += " " + s[o]));
        }
        i < t.length - 1 && (e += "\n");
      }
      return e;
    }),
    (e.Text.prototype.destroy = function (t) {
      t && this.texture.destroy();
    }),
    (e.Text.heightCache = {}),
    (e.BitmapText = function (t, i) {
      e.DisplayObjectContainer.call(this),
        (this._pool = []),
        this.setText(t),
        this.setStyle(i),
        this.updateText(),
        (this.dirty = !1);
    }),
    (e.BitmapText.prototype = Object.create(
      e.DisplayObjectContainer.prototype
    )),
    (e.BitmapText.prototype.constructor = e.BitmapText),
    (e.BitmapText.prototype.setText = function (t) {
      (this.text = t || " "), (this.dirty = !0);
    }),
    (e.BitmapText.prototype.setStyle = function (t) {
      ((t = t || {}).align = t.align || "left"), (this.style = t);
      var i = t.font.split(" ");
      (this.fontName = i[i.length - 1]),
        (this.fontSize =
          2 <= i.length
            ? parseInt(i[i.length - 2], 10)
            : e.BitmapText.fonts[this.fontName].size),
        (this.dirty = !0),
        (this.tint = t.tint);
    }),
    (e.BitmapText.prototype.updateText = function () {
      for (
        var t = e.BitmapText.fonts[this.fontName],
          i = new e.Point(),
          n = null,
          s = [],
          o = 0,
          h = [],
          l = 0,
          u = this.fontSize / t.size,
          d = 0;
        d < this.text.length;
        d++
      ) {
        var c = this.text.charCodeAt(d);
        if (/(?:\r\n|\r|\n)/.test(this.text.charAt(d)))
          h.push(i.x),
            (o = Math.max(o, i.x)),
            l++,
            (i.x = 0),
            (i.y += t.lineHeight),
            (n = null);
        else {
          var p = t.chars[c];
          p &&
            (n && p[n] && (i.x += p.kerning[n]),
            s.push({
              texture: p.texture,
              line: l,
              charCode: c,
              position: new e.Point(i.x + p.xOffset, i.y + p.yOffset),
            }),
            (i.x += p.xAdvance),
            (n = c));
        }
      }
      for (h.push(i.x), o = Math.max(o, i.x), n = [], d = 0; d <= l; d++)
        (c = 0),
          "right" === this.style.align
            ? (c = o - h[d])
            : "center" === this.style.align && (c = (o - h[d]) / 2),
          n.push(c);
      for (
        d = 0,
          l = this.children.length,
          h = s.length,
          c = this.tint || 16777215;
        d < h;
        d++
      )
        (p = d < l ? this.children[d] : this._pool.pop())
          ? p.setTexture(s[d].texture)
          : (p = new e.Sprite(s[d].texture)),
          (p.position.x = (s[d].position.x + n[s[d].line]) * u),
          (p.position.y = s[d].position.y * u),
          (p.scale.x = p.scale.y = u),
          (p.tint = c),
          p.parent || this.addChild(p);
      for (; this.children.length > h; )
        (s = this.getChildAt(this.children.length - 1)),
          this._pool.push(s),
          this.removeChild(s);
      (this.textWidth = o * u), (this.textHeight = (i.y + t.lineHeight) * u);
    }),
    (e.BitmapText.prototype.updateTransform = function () {
      this.dirty && (this.updateText(), (this.dirty = !1)),
        e.DisplayObjectContainer.prototype.updateTransform.call(this);
    }),
    (e.BitmapText.fonts = {}),
    (e.InteractionData = function () {
      (this.global = new e.Point()), (this.originalEvent = this.target = null);
    }),
    (e.InteractionData.prototype.getLocalPosition = function (t) {
      var i = t.worldTransform;
      t = this.global;
      var n = i.a,
        s = i.b,
        o = i.tx,
        h = i.c,
        l = i.d,
        i = i.ty,
        u = 1 / (n * l + -(s * h));
      return new e.Point(
        l * u * t.x + -s * u * t.y + (i * s - o * l) * u,
        n * u * t.y + -h * u * t.x + (-i * n + o * h) * u
      );
    }),
    (e.InteractionData.prototype.constructor = e.InteractionData),
    (e.InteractionManager = function (t) {
      (this.stage = t),
        (this.mouse = new e.InteractionData()),
        (this.touchs = {}),
        (this.tempPoint = new e.Point()),
        (this.mouseoverEnabled = !0),
        (this.pool = []),
        (this.interactiveItems = []),
        (this.interactionDOMElement = null),
        (this.onMouseMove = this.onMouseMove.bind(this)),
        (this.onMouseDown = this.onMouseDown.bind(this)),
        (this.onMouseOut = this.onMouseOut.bind(this)),
        (this.onMouseUp = this.onMouseUp.bind(this)),
        (this.onTouchStart = this.onTouchStart.bind(this)),
        (this.onTouchEnd = this.onTouchEnd.bind(this)),
        (this.onTouchMove = this.onTouchMove.bind(this)),
        (this.last = 0),
        (this.currentCursorStyle = "inherit"),
        (this.mouseOut = !1);
    }),
    (e.InteractionManager.prototype.constructor = e.InteractionManager),
    (e.InteractionManager.prototype.collectInteractiveSprite = function (t, e) {
      for (var i = t.children, n = i.length - 1; 0 <= n; n--) {
        var s = i[n];
        s._interactive
          ? ((e.interactiveChildren = !0),
            this.interactiveItems.push(s),
            0 < s.children.length && this.collectInteractiveSprite(s, s))
          : ((s.__iParent = null),
            0 < s.children.length && this.collectInteractiveSprite(s, e));
      }
    }),
    (e.InteractionManager.prototype.setTarget = function (t) {
      (this.target = t),
        null === this.interactionDOMElement && this.setTargetDomElement(t.view);
    }),
    (e.InteractionManager.prototype.setTargetDomElement = function (t) {
      this.removeEvents(),
        window.navigator.msPointerEnabled &&
          ((t.style["-ms-content-zooming"] = "none"),
          (t.style["-ms-touch-action"] = "none")),
        (this.interactionDOMElement = t),
        t.addEventListener("mousemove", this.onMouseMove, !0),
        t.addEventListener("mousedown", this.onMouseDown, !0),
        t.addEventListener("mouseout", this.onMouseOut, !0),
        t.addEventListener("touchstart", this.onTouchStart, !0),
        t.addEventListener("touchend", this.onTouchEnd, !0),
        t.addEventListener("touchmove", this.onTouchMove, !0),
        window.addEventListener("mouseup", this.onMouseUp, !0);
    }),
    (e.InteractionManager.prototype.removeEvents = function () {
      this.interactionDOMElement &&
        ((this.interactionDOMElement.style["-ms-content-zooming"] = ""),
        (this.interactionDOMElement.style["-ms-touch-action"] = ""),
        this.interactionDOMElement.removeEventListener(
          "mousemove",
          this.onMouseMove,
          !0
        ),
        this.interactionDOMElement.removeEventListener(
          "mousedown",
          this.onMouseDown,
          !0
        ),
        this.interactionDOMElement.removeEventListener(
          "mouseout",
          this.onMouseOut,
          !0
        ),
        this.interactionDOMElement.removeEventListener(
          "touchstart",
          this.onTouchStart,
          !0
        ),
        this.interactionDOMElement.removeEventListener(
          "touchend",
          this.onTouchEnd,
          !0
        ),
        this.interactionDOMElement.removeEventListener(
          "touchmove",
          this.onTouchMove,
          !0
        ),
        (this.interactionDOMElement = null),
        window.removeEventListener("mouseup", this.onMouseUp, !0));
    }),
    (e.InteractionManager.prototype.update = function () {
      if (this.target) {
        var t = Date.now(),
          i = t - this.last,
          i = (i * e.INTERACTION_FREQUENCY) / 1e3;
        if (!(1 > i)) {
          if (((this.last = t), (t = 0), this.dirty)) {
            for (
              t = 0, this.dirty = !1, i = this.interactiveItems.length;
              t < i;
              t++
            )
              this.interactiveItems[t].interactiveChildren = !1;
            (this.interactiveItems = []),
              this.stage.interactive && this.interactiveItems.push(this.stage),
              this.collectInteractiveSprite(this.stage, this.stage);
          }
          for (
            var i = this.interactiveItems.length, n = "inherit", s = !1, t = 0;
            t < i;
            t++
          ) {
            var o = this.interactiveItems[t];
            (o.__hit = this.hitTest(o, this.mouse)),
              (this.mouse.target = o),
              o.__hit && !s
                ? (o.buttonMode && (n = o.defaultCursor),
                  o.interactiveChildren || (s = !0),
                  o.__isOver ||
                    (o.mouseover && o.mouseover(this.mouse), (o.__isOver = !0)))
                : o.__isOver &&
                  (o.mouseout && o.mouseout(this.mouse), (o.__isOver = !1));
          }
          this.currentCursorStyle !== n &&
            ((this.currentCursorStyle = n),
            (this.interactionDOMElement.style.cursor = n));
        }
      }
    }),
    (e.InteractionManager.prototype.onMouseMove = function (t) {
      this.mouse.originalEvent = t || window.event;
      var e = this.interactionDOMElement.getBoundingClientRect();
      for (
        this.mouse.global.x =
          (this.target.width / e.width) * (t.clientX - e.left),
          this.mouse.global.y =
            (this.target.height / e.height) * (t.clientY - e.top),
          t = this.interactiveItems.length,
          e = 0;
        e < t;
        e++
      ) {
        var i = this.interactiveItems[e];
        i.mousemove && i.mousemove(this.mouse);
      }
    }),
    (e.InteractionManager.prototype.onMouseDown = function (t) {
      (this.mouse.originalEvent = t || window.event),
        e.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent.preventDefault(),
        (t = this.interactiveItems.length);
      for (var i = 0; i < t; i++) {
        var n = this.interactiveItems[i];
        if (
          (n.mousedown || n.click) &&
          ((n.__mouseIsDown = !0),
          (n.__hit = this.hitTest(n, this.mouse)),
          n.__hit &&
            (n.mousedown && n.mousedown(this.mouse),
            (n.__isDown = !0),
            !n.interactiveChildren))
        )
          break;
      }
    }),
    (e.InteractionManager.prototype.onMouseOut = function () {
      var t = this.interactiveItems.length;
      this.interactionDOMElement.style.cursor = "inherit";
      for (var e = 0; e < t; e++) {
        var i = this.interactiveItems[e];
        i.__isOver &&
          ((this.mouse.target = i),
          i.mouseout && i.mouseout(this.mouse),
          (i.__isOver = !1));
      }
      (this.mouseOut = !0),
        (this.mouse.global.x = -1e4),
        (this.mouse.global.y = -1e4);
    }),
    (e.InteractionManager.prototype.onMouseUp = function (t) {
      (this.mouse.originalEvent = t || window.event),
        (t = this.interactiveItems.length);
      for (var e = !1, i = 0; i < t; i++) {
        var n = this.interactiveItems[i];
        (n.__hit = this.hitTest(n, this.mouse)),
          n.__hit && !e
            ? (n.mouseup && n.mouseup(this.mouse),
              n.__isDown && n.click && n.click(this.mouse),
              n.interactiveChildren || (e = !0))
            : n.__isDown && n.mouseupoutside && n.mouseupoutside(this.mouse),
          (n.__isDown = !1);
      }
    }),
    (e.InteractionManager.prototype.hitTest = function (t, i) {
      var n = i.global;
      if (!t.worldVisible) return !1;
      var s = t instanceof e.Sprite,
        o = t.worldTransform,
        h = o.a,
        l = o.b,
        u = o.tx,
        d = o.c,
        c = o.d,
        o = o.ty,
        p = 1 / (h * c + -(l * d)),
        l = c * p * n.x + -l * p * n.y + (o * l - u * c) * p,
        n = h * p * n.y + -d * p * n.x + (-o * h + u * d) * p;
      if (((i.target = t), t.hitArea && t.hitArea.contains))
        return !!t.hitArea.contains(l, n) && ((i.target = t), !0);
      if (
        s &&
        ((h = t.texture.frame.width),
        (s = t.texture.frame.height),
        l > (u = -h * t.anchor.x) &&
          l < u + h &&
          n > (l = -s * t.anchor.y) &&
          n < l + s)
      )
        return (i.target = t), !0;
      for (l = 0, s = t.children.length; l < s; l++)
        if (this.hitTest(t.children[l], i)) return (i.target = t), !0;
      return !1;
    }),
    (e.InteractionManager.prototype.onTouchMove = function (t) {
      for (
        var e,
          i = this.interactionDOMElement.getBoundingClientRect(),
          n = t.changedTouches,
          s = 0,
          s = 0;
        s < n.length;
        s++
      ) {
        var o = n[s];
        ((e = this.touchs[o.identifier]).originalEvent = t || window.event),
          (e.global.x = (this.target.width / i.width) * (o.clientX - i.left)),
          (e.global.y = (this.target.height / i.height) * (o.clientY - i.top)),
          navigator.isCocoonJS &&
            ((e.global.x = o.clientX), (e.global.y = o.clientY));
        for (var h = 0; h < this.interactiveItems.length; h++) {
          var l = this.interactiveItems[h];
          l.touchmove && l.__touchData[o.identifier] && l.touchmove(e);
        }
      }
    }),
    (e.InteractionManager.prototype.onTouchStart = function (t) {
      var i = this.interactionDOMElement.getBoundingClientRect();
      e.AUTO_PREVENT_DEFAULT && t.preventDefault();
      for (var n = t.changedTouches, s = 0; s < n.length; s++) {
        var o = n[s],
          h = this.pool.pop();
        h || (h = new e.InteractionData()),
          (h.originalEvent = t || window.event),
          (this.touchs[o.identifier] = h),
          (h.global.x = (this.target.width / i.width) * (o.clientX - i.left)),
          (h.global.y = (this.target.height / i.height) * (o.clientY - i.top)),
          navigator.isCocoonJS &&
            ((h.global.x = o.clientX), (h.global.y = o.clientY));
        for (var l = this.interactiveItems.length, u = 0; u < l; u++) {
          var d = this.interactiveItems[u];
          if (
            (d.touchstart || d.tap) &&
            ((d.__hit = this.hitTest(d, h)),
            d.__hit &&
              (d.touchstart && d.touchstart(h),
              (d.__isDown = !0),
              (d.__touchData = d.__touchData || {}),
              (d.__touchData[o.identifier] = h),
              !d.interactiveChildren))
          )
            break;
        }
      }
    }),
    (e.InteractionManager.prototype.onTouchEnd = function (t) {
      for (
        var e = this.interactionDOMElement.getBoundingClientRect(),
          i = t.changedTouches,
          n = 0;
        n < i.length;
        n++
      ) {
        var s = i[n],
          o = this.touchs[s.identifier],
          h = !1;
        (o.global.x = (this.target.width / e.width) * (s.clientX - e.left)),
          (o.global.y = (this.target.height / e.height) * (s.clientY - e.top)),
          navigator.isCocoonJS &&
            ((o.global.x = s.clientX), (o.global.y = s.clientY));
        for (var l = this.interactiveItems.length, u = 0; u < l; u++) {
          var d = this.interactiveItems[u];
          d.__touchData &&
            d.__touchData[s.identifier] &&
            ((d.__hit = this.hitTest(d, d.__touchData[s.identifier])),
            (o.originalEvent = t || window.event),
            (d.touchend || d.tap) &&
              (d.__hit && !h
                ? (d.touchend && d.touchend(o),
                  d.__isDown && d.tap && d.tap(o),
                  d.interactiveChildren || (h = !0))
                : d.__isDown && d.touchendoutside && d.touchendoutside(o),
              (d.__isDown = !1)),
            (d.__touchData[s.identifier] = null));
        }
        this.pool.push(o), (this.touchs[s.identifier] = null);
      }
    }),
    (e.Stage = function (t) {
      e.DisplayObjectContainer.call(this),
        (this.worldTransform = new e.Matrix()),
        (this.interactive = !0),
        (this.interactionManager = new e.InteractionManager(this)),
        (this.dirty = !0),
        (this.stage = this),
        (this.stage.hitArea = new e.Rectangle(0, 0, 1e5, 1e5)),
        this.setBackgroundColor(t);
    }),
    (e.Stage.prototype = Object.create(e.DisplayObjectContainer.prototype)),
    (e.Stage.prototype.constructor = e.Stage),
    (e.Stage.prototype.setInteractionDelegate = function (t) {
      this.interactionManager.setTargetDomElement(t);
    }),
    (e.Stage.prototype.updateTransform = function () {
      this.worldAlpha = 1;
      for (var t = 0, e = this.children.length; t < e; t++)
        this.children[t].updateTransform();
      this.dirty && ((this.dirty = !1), (this.interactionManager.dirty = !0)),
        this.interactive && this.interactionManager.update();
    }),
    (e.Stage.prototype.setBackgroundColor = function (t) {
      (this.backgroundColor = t || 0),
        (this.backgroundColorSplit = e.hex2rgb(this.backgroundColor)),
        (t = this.backgroundColor.toString(16)),
        (t = "000000".substr(0, 6 - t.length) + t),
        (this.backgroundColorString = "#" + t);
    }),
    (e.Stage.prototype.getMousePosition = function () {
      return this.interactionManager.mouse.global;
    });
  for (
    var i = 0, n = ["ms", "moz", "webkit", "o"], s = 0;
    s < n.length && !window.requestAnimationFrame;
    ++s
  )
    (window.requestAnimationFrame = window[n[s] + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[n[s] + "CancelAnimationFrame"] ||
        window[n[s] + "CancelRequestAnimationFrame"]);
  window.requestAnimationFrame ||
    (window.requestAnimationFrame = function (t) {
      var e = new Date().getTime(),
        n = Math.max(0, 16 - (e - i)),
        s = window.setTimeout(function () {
          t(e + n);
        }, n);
      return (i = e + n), s;
    }),
    window.cancelAnimationFrame ||
      (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      }),
    (window.requestAnimFrame = window.requestAnimationFrame),
    (e.hex2rgb = function (t) {
      return [((t >> 16) & 255) / 255, ((t >> 8) & 255) / 255, (255 & t) / 255];
    }),
    (e.rgb2hex = function (t) {
      return ((255 * t[0]) << 16) + ((255 * t[1]) << 8) + 255 * t[2];
    }),
    "function" != typeof Function.prototype.bind &&
      (Function.prototype.bind =
        ((t = Array.prototype.slice),
        function (e) {
          function i() {
            var o = s.concat(t.call(arguments));
            n.apply(this instanceof i ? this : e, o);
          }
          var n = this,
            s = t.call(arguments, 1);
          if ("function" != typeof n) throw TypeError();
          return (
            (i.prototype = (function t(e) {
              if ((e && (t.prototype = e), !(this instanceof t)))
                return new t();
            })(n.prototype)),
            i
          );
        })),
    (e.AjaxRequest = function () {
      var t = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
      if (!window.ActiveXObject)
        return !!window.XMLHttpRequest && new window.XMLHttpRequest();
      for (var e = 0; e < t.length; e++)
        try {
          return new window.ActiveXObject(t[e]);
        } catch (i) {}
    }),
    (e.canUseNewCanvasBlendModes = function () {
      var t = document.createElement("canvas");
      return (
        (t.width = 1),
        (t.height = 1),
        ((t = t.getContext("2d")).fillStyle = "#000"),
        t.fillRect(0, 0, 1, 1),
        (t.globalCompositeOperation = "multiply"),
        (t.fillStyle = "#fff"),
        t.fillRect(0, 0, 1, 1),
        0 === t.getImageData(0, 0, 1, 1).data[0]
      );
    }),
    (e.getNextPowerOfTwo = function (t) {
      if (0 < t && 0 == (t & (t - 1))) return t;
      for (var e = 1; e < t; ) e <<= 1;
      return e;
    }),
    (e.EventTarget = function () {
      var t = {};
      (this.addEventListener = this.on =
        function (e, i) {
          void 0 === t[e] && (t[e] = []),
            -1 === t[e].indexOf(i) && t[e].push(i);
        }),
        (this.dispatchEvent = this.emit =
          function (e) {
            if (t[e.type] && t[e.type].length)
              for (var i = 0, n = t[e.type].length; i < n; i++) t[e.type][i](e);
          }),
        (this.removeEventListener = this.off =
          function (e, i) {
            var n = t[e].indexOf(i);
            -1 !== n && t[e].splice(n, 1);
          }),
        (this.removeAllEventListeners = function (e) {
          (e = t[e]) && (e.length = 0);
        });
    }),
    (e.autoDetectRenderer = function (t, i, n, s, o) {
      t || (t = 800), i || (i = 600);
      try {
        var h,
          l = document.createElement("canvas");
        h =
          !!window.WebGLRenderingContext &&
          (l.getContext("webgl") || l.getContext("experimental-webgl"));
      } catch (u) {
        h = !1;
      }
      return h
        ? new e.WebGLRenderer(t, i, n, s, o)
        : new e.CanvasRenderer(t, i, n, s);
    }),
    (e.autoDetectRecommendedRenderer = function (t, i, n, s, o) {
      t || (t = 800), i || (i = 600);
      try {
        var h,
          l = document.createElement("canvas");
        h =
          !!window.WebGLRenderingContext &&
          (l.getContext("webgl") || l.getContext("experimental-webgl"));
      } catch (u) {
        h = !1;
      }
      return (
        (l = /Android/i.test(navigator.userAgent)),
        h && !l
          ? new e.WebGLRenderer(t, i, n, s, o)
          : new e.CanvasRenderer(t, i, n, s)
      );
    }),
    (e.PolyK = {}),
    (e.PolyK.Triangulate = function (t) {
      var i = !0,
        n = t.length >> 1;
      if (3 > n) return [];
      for (var s = [], o = [], h = 0; h < n; h++) o.push(h);
      for (var h = 0, l = n; 3 < l; ) {
        var u = o[(h + 0) % l],
          d = o[(h + 1) % l],
          c = o[(h + 2) % l],
          p = t[2 * u],
          f = t[2 * u + 1],
          m = t[2 * d],
          v = t[2 * d + 1],
          y = t[2 * c],
          x = t[2 * c + 1],
          $ = !1;
        if (e.PolyK._convex(p, f, m, v, y, x, i))
          for (var $ = !0, T = 0; T < l; T++) {
            var _ = o[T];
            if (
              _ !== u &&
              _ !== d &&
              _ !== c &&
              e.PolyK._PointInTriangle(t[2 * _], t[2 * _ + 1], p, f, m, v, y, x)
            ) {
              $ = !1;
              break;
            }
          }
        if ($) s.push(u, d, c), o.splice((h + 1) % l, 1), l--, (h = 0);
        else if (h++ > 3 * l) {
          if (!i)
            return (
              window.console.log("PIXI Warning: shape too complex to fill"), []
            );
          for (h = 0, s = [], o = []; h < n; h++) o.push(h);
          (h = 0), (l = n), (i = !1);
        }
      }
      return s.push(o[0], o[1], o[2]), s;
    }),
    (e.PolyK._PointInTriangle = function (t, e, i, n, s, o, h, l) {
      return (
        (h -= i),
        (l -= n),
        (s -= i),
        (o -= n),
        (t -= i),
        (i = e - n),
        (e = h * h + l * l),
        (n = h * s + l * o),
        (h = h * t + l * i),
        (l = s * s + o * o),
        (s = s * t + o * i),
        (o = 1 / (e * l - n * n)),
        (l = (l * h - n * s) * o),
        (h = (e * s - n * h) * o),
        0 <= l && 0 <= h && 1 > l + h
      );
    }),
    (e.PolyK._convex = function (t, e, i, n, s, o, h) {
      return 0 <= (e - n) * (s - i) + (i - t) * (o - n) === h;
    }),
    (e.initDefaultShaders = function () {}),
    (e.CompileVertexShader = function (t, i) {
      return e._CompileShader(t, i, t.VERTEX_SHADER);
    }),
    (e.CompileFragmentShader = function (t, i) {
      return e._CompileShader(t, i, t.FRAGMENT_SHADER);
    }),
    (e._CompileShader = function (t, e, i) {
      return (
        (e = e.join("\n")),
        (i = t.createShader(i)),
        t.shaderSource(i, e),
        t.compileShader(i),
        t.getShaderParameter(i, t.COMPILE_STATUS)
          ? i
          : (window.console.log(t.getShaderInfoLog(i)), null)
      );
    }),
    (e.compileProgram = function (t, i, n) {
      (n = e.CompileFragmentShader(t, n)), (i = e.CompileVertexShader(t, i));
      var s = t.createProgram();
      return (
        t.attachShader(s, i),
        t.attachShader(s, n),
        t.linkProgram(s),
        t.getProgramParameter(s, t.LINK_STATUS) ||
          window.console.log("Could not initialise shaders"),
        s
      );
    }),
    (e.PixiShader = function (t) {
      (this.gl = t),
        (this.program = null),
        (this.fragmentSrc = [
          "precision lowp float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;",
          "}",
        ]),
        (this.textureCount = 0),
        (this.attributes = []),
        this.init();
    }),
    (e.PixiShader.prototype.init = function () {
      var t = this.gl,
        i = e.compileProgram(
          t,
          this.vertexSrc || e.PixiShader.defaultVertexSrc,
          this.fragmentSrc
        );
      for (var n in (t.useProgram(i),
      (this.uSampler = t.getUniformLocation(i, "uSampler")),
      (this.projectionVector = t.getUniformLocation(i, "projectionVector")),
      (this.offsetVector = t.getUniformLocation(i, "offsetVector")),
      (this.dimensions = t.getUniformLocation(i, "dimensions")),
      (this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition")),
      (this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord")),
      (this.colorAttribute = t.getAttribLocation(i, "aColor")),
      -1 === this.colorAttribute && (this.colorAttribute = 2),
      (this.attributes = [
        this.aVertexPosition,
        this.aTextureCoord,
        this.colorAttribute,
      ]),
      this.uniforms))
        this.uniforms[n].uniformLocation = t.getUniformLocation(i, n);
      this.initUniforms(), (this.program = i);
    }),
    (e.PixiShader.prototype.initUniforms = function () {
      this.textureCount = 1;
      var t,
        e,
        i = this.gl;
      for (e in this.uniforms) {
        var n = (t = this.uniforms[e]).type;
        "sampler2D" === n
          ? ((t._init = !1), null !== t.value && this.initSampler2D(t))
          : "mat2" === n || "mat3" === n || "mat4" === n
          ? ((t.glMatrix = !0),
            (t.glValueLength = 1),
            "mat2" === n
              ? (t.glFunc = i.uniformMatrix2fv)
              : "mat3" === n
              ? (t.glFunc = i.uniformMatrix3fv)
              : "mat4" === n && (t.glFunc = i.uniformMatrix4fv))
          : ((t.glFunc = i["uniform" + n]),
            (t.glValueLength =
              "2f" === n || "2i" === n
                ? 2
                : "3f" === n || "3i" === n
                ? 3
                : "4f" === n || "4i" === n
                ? 4
                : 1));
      }
    }),
    (e.PixiShader.prototype.initSampler2D = function (t) {
      if (t.value && t.value.baseTexture && t.value.baseTexture.hasLoaded) {
        var e = this.gl;
        if (
          (e.activeTexture(e["TEXTURE" + this.textureCount]),
          e.bindTexture(e.TEXTURE_2D, t.value.baseTexture._glTextures[e.id]),
          t.textureData)
        ) {
          var i = t.textureData,
            n = i.magFilter ? i.magFilter : e.LINEAR,
            s = i.minFilter ? i.minFilter : e.LINEAR,
            o = i.wrapS ? i.wrapS : e.CLAMP_TO_EDGE,
            h = i.wrapT ? i.wrapT : e.CLAMP_TO_EDGE,
            l = i.luminance ? e.LUMINANCE : e.RGBA;
          i.repeat && (h = o = e.REPEAT),
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !!i.flipY),
            i.width
              ? e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  l,
                  i.width ? i.width : 512,
                  i.height ? i.height : 2,
                  i.border ? i.border : 0,
                  l,
                  e.UNSIGNED_BYTE,
                  null
                )
              : e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  l,
                  e.RGBA,
                  e.UNSIGNED_BYTE,
                  t.value.baseTexture.source
                ),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, s),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, o),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, h);
        }
        e.uniform1i(t.uniformLocation, this.textureCount),
          (t._init = !0),
          this.textureCount++;
      }
    }),
    (e.PixiShader.prototype.syncUniforms = function () {
      this.textureCount = 1;
      var t,
        i,
        n = this.gl;
      for (i in this.uniforms)
        1 === (t = this.uniforms[i]).glValueLength
          ? !0 === t.glMatrix
            ? t.glFunc.call(n, t.uniformLocation, t.transpose, t.value)
            : t.glFunc.call(n, t.uniformLocation, t.value)
          : 2 === t.glValueLength
          ? t.glFunc.call(n, t.uniformLocation, t.value.x, t.value.y)
          : 3 === t.glValueLength
          ? t.glFunc.call(n, t.uniformLocation, t.value.x, t.value.y, t.value.z)
          : 4 === t.glValueLength
          ? t.glFunc.call(
              n,
              t.uniformLocation,
              t.value.x,
              t.value.y,
              t.value.z,
              t.value.w
            )
          : "sampler2D" === t.type &&
            (t._init
              ? (n.activeTexture(n["TEXTURE" + this.textureCount]),
                n.bindTexture(
                  n.TEXTURE_2D,
                  t.value.baseTexture._glTextures[n.id] ||
                    e.createWebGLTexture(t.value.baseTexture, n)
                ),
                n.uniform1i(t.uniformLocation, this.textureCount),
                this.textureCount++)
              : this.initSampler2D(t));
    }),
    (e.PixiShader.prototype.destroy = function () {
      this.gl.deleteProgram(this.program),
        (this.attributes = this.gl = this.uniforms = null);
    }),
    (e.PixiShader.defaultVertexSrc = [
      "attribute vec2 aVertexPosition;",
      "attribute vec2 aTextureCoord;",
      "attribute vec2 aColor;",
      "uniform vec2 projectionVector;",
      "uniform vec2 offsetVector;",
      "varying vec2 vTextureCoord;",
      "varying vec4 vColor;",
      "const vec2 center = vec2(-1.0, 1.0);",
      "void main(void) {",
      "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);",
      "   vTextureCoord = aTextureCoord;",
      "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;",
      "   vColor = vec4(color * aColor.x, aColor.x);",
      "}",
    ]),
    (e.PixiFastShader = function (t) {
      (this.gl = t),
        (this.program = null),
        (this.fragmentSrc = [
          "precision lowp float;",
          "varying vec2 vTextureCoord;",
          "varying float vColor;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;",
          "}",
        ]),
        (this.vertexSrc = [
          "attribute vec2 aVertexPosition;",
          "attribute vec2 aPositionCoord;",
          "attribute vec2 aScale;",
          "attribute float aRotation;",
          "attribute vec2 aTextureCoord;",
          "attribute float aColor;",
          "uniform vec2 projectionVector;",
          "uniform vec2 offsetVector;",
          "uniform mat3 uMatrix;",
          "varying vec2 vTextureCoord;",
          "varying float vColor;",
          "const vec2 center = vec2(-1.0, 1.0);",
          "void main(void) {",
          "   vec2 v;",
          "   vec2 sv = aVertexPosition * aScale;",
          "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);",
          "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);",
          "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;",
          "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);",
          "   vTextureCoord = aTextureCoord;",
          "   vColor = aColor;",
          "}",
        ]),
        (this.textureCount = 0),
        this.init();
    }),
    (e.PixiFastShader.prototype.init = function () {
      var t = this.gl,
        i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
      t.useProgram(i),
        (this.uSampler = t.getUniformLocation(i, "uSampler")),
        (this.projectionVector = t.getUniformLocation(i, "projectionVector")),
        (this.offsetVector = t.getUniformLocation(i, "offsetVector")),
        (this.dimensions = t.getUniformLocation(i, "dimensions")),
        (this.uMatrix = t.getUniformLocation(i, "uMatrix")),
        (this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition")),
        (this.aPositionCoord = t.getAttribLocation(i, "aPositionCoord")),
        (this.aScale = t.getAttribLocation(i, "aScale")),
        (this.aRotation = t.getAttribLocation(i, "aRotation")),
        (this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord")),
        (this.colorAttribute = t.getAttribLocation(i, "aColor")),
        -1 === this.colorAttribute && (this.colorAttribute = 2),
        (this.attributes = [
          this.aVertexPosition,
          this.aPositionCoord,
          this.aScale,
          this.aRotation,
          this.aTextureCoord,
          this.colorAttribute,
        ]),
        (this.program = i);
    }),
    (e.PixiFastShader.prototype.destroy = function () {
      this.gl.deleteProgram(this.program),
        (this.attributes = this.gl = this.uniforms = null);
    }),
    (e.StripShader = function () {
      (this.program = null),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying float vColor;",
          "uniform float alpha;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
          "   gl_FragColor = gl_FragColor * alpha;",
          "}",
        ]),
        (this.vertexSrc = [
          "attribute vec2 aVertexPosition;",
          "attribute vec2 aTextureCoord;",
          "attribute float aColor;",
          "uniform mat3 translationMatrix;",
          "uniform vec2 projectionVector;",
          "varying vec2 vTextureCoord;",
          "uniform vec2 offsetVector;",
          "varying float vColor;",
          "void main(void) {",
          "   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
          "   v -= offsetVector.xyx;",
          "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);",
          "   vTextureCoord = aTextureCoord;",
          "   vColor = aColor;",
          "}",
        ]);
    }),
    (e.StripShader.prototype.init = function () {
      var t = e.gl,
        i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
      t.useProgram(i),
        (this.uSampler = t.getUniformLocation(i, "uSampler")),
        (this.projectionVector = t.getUniformLocation(i, "projectionVector")),
        (this.offsetVector = t.getUniformLocation(i, "offsetVector")),
        (this.colorAttribute = t.getAttribLocation(i, "aColor")),
        (this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition")),
        (this.aTextureCoord = t.getAttribLocation(i, "aTextureCoord")),
        (this.translationMatrix = t.getUniformLocation(i, "translationMatrix")),
        (this.alpha = t.getUniformLocation(i, "alpha")),
        (this.program = i);
    }),
    (e.PrimitiveShader = function (t) {
      (this.gl = t),
        (this.program = null),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec4 vColor;",
          "void main(void) {",
          "   gl_FragColor = vColor;",
          "}",
        ]),
        (this.vertexSrc = [
          "attribute vec2 aVertexPosition;",
          "attribute vec4 aColor;",
          "uniform mat3 translationMatrix;",
          "uniform vec2 projectionVector;",
          "uniform vec2 offsetVector;",
          "uniform float alpha;",
          "uniform vec3 tint;",
          "varying vec4 vColor;",
          "void main(void) {",
          "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);",
          "   v -= offsetVector.xyx;",
          "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
          "   vColor = aColor * vec4(tint * alpha, alpha);",
          "}",
        ]),
        this.init();
    }),
    (e.PrimitiveShader.prototype.init = function () {
      var t = this.gl,
        i = e.compileProgram(t, this.vertexSrc, this.fragmentSrc);
      t.useProgram(i),
        (this.projectionVector = t.getUniformLocation(i, "projectionVector")),
        (this.offsetVector = t.getUniformLocation(i, "offsetVector")),
        (this.tintColor = t.getUniformLocation(i, "tint")),
        (this.aVertexPosition = t.getAttribLocation(i, "aVertexPosition")),
        (this.colorAttribute = t.getAttribLocation(i, "aColor")),
        (this.attributes = [this.aVertexPosition, this.colorAttribute]),
        (this.translationMatrix = t.getUniformLocation(i, "translationMatrix")),
        (this.alpha = t.getUniformLocation(i, "alpha")),
        (this.program = i);
    }),
    (e.PrimitiveShader.prototype.destroy = function () {
      this.gl.deleteProgram(this.program),
        (this.attribute = this.gl = this.uniforms = null);
    }),
    (e.WebGLGraphics = function () {}),
    (e.WebGLGraphics.renderGraphics = function (t, i) {
      var n = i.gl,
        s = i.projection,
        o = i.offset,
        h = i.shaderManager.primitiveShader;
      t._webGL[n.id] ||
        (t._webGL[n.id] = {
          points: [],
          indices: [],
          lastIndex: 0,
          buffer: n.createBuffer(),
          indexBuffer: n.createBuffer(),
        });
      var l = t._webGL[n.id];
      t.dirty &&
        ((t.dirty = !1),
        t.clearDirty &&
          ((t.clearDirty = !1),
          (l.lastIndex = 0),
          (l.points = []),
          (l.indices = [])),
        e.WebGLGraphics.updateGraphics(t, n)),
        i.shaderManager.activatePrimitiveShader(),
        n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA),
        n.uniformMatrix3fv(
          h.translationMatrix,
          !1,
          t.worldTransform.toArray(!0)
        ),
        n.uniform2f(h.projectionVector, s.x, -s.y),
        n.uniform2f(h.offsetVector, -o.x, -o.y),
        n.uniform3fv(h.tintColor, e.hex2rgb(t.tint)),
        n.uniform1f(h.alpha, t.worldAlpha),
        n.bindBuffer(n.ARRAY_BUFFER, l.buffer),
        n.vertexAttribPointer(h.aVertexPosition, 2, n.FLOAT, !1, 24, 0),
        n.vertexAttribPointer(h.colorAttribute, 4, n.FLOAT, !1, 24, 8),
        n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, l.indexBuffer),
        n.drawElements(n.TRIANGLE_STRIP, l.indices.length, n.UNSIGNED_SHORT, 0),
        i.shaderManager.deactivatePrimitiveShader();
    }),
    (e.WebGLGraphics.updateGraphics = function (t, i) {
      for (
        var n = t._webGL[i.id], s = n.lastIndex;
        s < t.graphicsData.length;
        s++
      ) {
        var o = t.graphicsData[s];
        o.type === e.Graphics.POLY
          ? (o.fill && 3 < o.points.length && e.WebGLGraphics.buildPoly(o, n),
            0 < o.lineWidth && e.WebGLGraphics.buildLine(o, n))
          : o.type === e.Graphics.RECT
          ? e.WebGLGraphics.buildRectangle(o, n)
          : (o.type !== e.Graphics.CIRC && o.type !== e.Graphics.ELIP) ||
            e.WebGLGraphics.buildCircle(o, n);
      }
      (n.lastIndex = t.graphicsData.length),
        (n.glPoints = new Float32Array(n.points)),
        i.bindBuffer(i.ARRAY_BUFFER, n.buffer),
        i.bufferData(i.ARRAY_BUFFER, n.glPoints, i.STATIC_DRAW),
        (n.glIndicies = new Uint16Array(n.indices)),
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, n.indexBuffer),
        i.bufferData(i.ELEMENT_ARRAY_BUFFER, n.glIndicies, i.STATIC_DRAW);
    }),
    (e.WebGLGraphics.buildRectangle = function (t, i) {
      var n = t.points,
        s = n[0],
        o = n[1],
        h = n[2],
        n = n[3];
      if (t.fill) {
        var l = e.hex2rgb(t.fillColor),
          u = t.fillAlpha,
          d = l[0] * u,
          c = l[1] * u,
          l = l[2] * u,
          p = i.points,
          f = i.indices,
          m = p.length / 6;
        p.push(s, o),
          p.push(d, c, l, u),
          p.push(s + h, o),
          p.push(d, c, l, u),
          p.push(s, o + n),
          p.push(d, c, l, u),
          p.push(s + h, o + n),
          p.push(d, c, l, u),
          f.push(m, m, m + 1, m + 2, m + 3, m + 3);
      }
      t.lineWidth &&
        ((u = t.points),
        (t.points = [s, o, s + h, o, s + h, o + n, s, o + n, s, o]),
        e.WebGLGraphics.buildLine(t, i),
        (t.points = u));
    }),
    (e.WebGLGraphics.buildCircle = function (t, i) {
      var n = t.points,
        s = n[0],
        o = n[1],
        h = n[2],
        n = n[3],
        l = (2 * Math.PI) / 40,
        u = 0;
      if (t.fill) {
        var u = e.hex2rgb(t.fillColor),
          d = t.fillAlpha,
          c = u[0] * d,
          p = u[1] * d,
          f = u[2] * d,
          m = i.points,
          v = i.indices,
          y = m.length / 6;
        for (v.push(y), u = 0; 41 > u; u++)
          m.push(s, o, c, p, f, d),
            m.push(
              s + Math.sin(l * u) * h,
              o + Math.cos(l * u) * n,
              c,
              p,
              f,
              d
            ),
            v.push(y++, y++);
        v.push(y - 1);
      }
      if (t.lineWidth) {
        for (u = 0, d = t.points, t.points = []; 41 > u; u++)
          t.points.push(s + Math.sin(l * u) * h, o + Math.cos(l * u) * n);
        e.WebGLGraphics.buildLine(t, i), (t.points = d);
      }
    }),
    (e.WebGLGraphics.buildLine = function (t, i) {
      var n = 0,
        s = t.points;
      if (0 !== s.length) {
        if (t.lineWidth % 2) for (n = 0; n < s.length; n++) s[n] += 0.5;
        var o = new e.Point(s[0], s[1]),
          h = new e.Point(s[s.length - 2], s[s.length - 1]);
        if (o.x === h.x && o.y === h.y) {
          s.pop(), s.pop();
          var h = new e.Point(s[s.length - 2], s[s.length - 1]),
            l = h.x + 0.5 * (o.x - h.x),
            o = h.y + 0.5 * (o.y - h.y);
          s.unshift(l, o), s.push(l, o);
        }
        var u,
          d,
          c,
          p,
          f,
          m,
          v,
          y,
          x,
          $,
          T,
          _,
          S,
          l = i.points,
          o = i.indices,
          h = s.length / 2,
          w = s.length,
          C = l.length / 6,
          A = t.lineWidth / 2,
          n = e.hex2rgb(t.lineColor),
          E = t.lineAlpha,
          L = n[0] * E,
          R = n[1] * E,
          M = n[2] * E;
        for (
          c = s[0],
            p = s[1],
            f = s[2],
            d = Math.sqrt((x = -(p - (m = s[3]))) * x + ($ = c - f) * $),
            x = (x / d) * A,
            $ = ($ / d) * A,
            l.push(c - x, p - $, L, R, M, E),
            l.push(c + x, p + $, L, R, M, E),
            n = 1;
          n < h - 1;
          n++
        )
          (c = s[2 * (n - 1)]),
            (p = s[2 * (n - 1) + 1]),
            (f = s[2 * n]),
            (m = s[2 * n + 1]),
            (v = s[2 * (n + 1)]),
            (y = s[2 * (n + 1) + 1]),
            (d = Math.sqrt((x = -(p - m)) * x + ($ = c - f) * $)),
            (x /= d),
            ($ /= d),
            (x *= A),
            ($ *= A),
            (d = Math.sqrt((T = -(m - y)) * T + (_ = f - v) * _)),
            (T /= d),
            (_ /= d),
            (T *= A),
            (_ *= A),
            (d = -$ + p - (-$ + m)),
            (u = -x + f - (-x + c)),
            (c = (-x + c) * (-$ + m) - (-x + f) * (-$ + p)),
            (p = -_ + y - (-_ + m)),
            (S = -T + f - (-T + v)),
            (v = (-T + v) * (-_ + m) - (-T + f) * (-_ + y)),
            0.1 > Math.abs((y = d * S - p * u))
              ? (l.push(f - x, m - $, L, R, M, E),
                l.push(f + x, m + $, L, R, M, E))
              : 19600 <
                (v =
                  ((u = (u * v - S * c) / y) - f) * (u - f) +
                  ((d = (p * c - d * v) / y) - m) +
                  (d - m))
              ? ((x -= T),
                ($ -= _),
                (d = Math.sqrt(x * x + $ * $)),
                (x /= d),
                ($ /= d),
                (x *= A),
                ($ *= A),
                l.push(f - x, m - $),
                l.push(L, R, M, E),
                l.push(f + x, m + $),
                l.push(L, R, M, E),
                l.push(f - x, m - $),
                l.push(L, R, M, E),
                w++)
              : (l.push(u, d),
                l.push(L, R, M, E),
                l.push(f - (u - f), m - (d - m)),
                l.push(L, R, M, E));
        for (
          c = s[2 * (h - 2)],
            p = s[2 * (h - 2) + 1],
            f = s[2 * (h - 1)],
            d = Math.sqrt(
              (x = -(p - (m = s[2 * (h - 1) + 1]))) * x + ($ = c - f) * $
            ),
            x /= d,
            $ /= d,
            x *= A,
            $ *= A,
            l.push(f - x, m - $),
            l.push(L, R, M, E),
            l.push(f + x, m + $),
            l.push(L, R, M, E),
            o.push(C),
            n = 0;
          n < w;
          n++
        )
          o.push(C++);
        o.push(C - 1);
      }
    }),
    (e.WebGLGraphics.buildPoly = function (t, i) {
      var n = t.points;
      if (!(6 > n.length)) {
        for (
          var s = i.points,
            o = i.indices,
            h = n.length / 2,
            l = e.hex2rgb(t.fillColor),
            u = t.fillAlpha,
            d = l[0] * u,
            c = l[1] * u,
            l = l[2] * u,
            p = e.PolyK.Triangulate(n),
            f = s.length / 6,
            m = 0,
            m = 0;
          m < p.length;
          m += 3
        )
          o.push(p[m] + f),
            o.push(p[m] + f),
            o.push(p[m + 1] + f),
            o.push(p[m + 2] + f),
            o.push(p[m + 2] + f);
        for (m = 0; m < h; m++) s.push(n[2 * m], n[2 * m + 1], d, c, l, u);
      }
    }),
    (e.glContexts = []),
    (e.WebGLRenderer = function (t, i, n, s, o) {
      e.defaultRenderer || (e.defaultRenderer = this),
        (this.type = e.WEBGL_RENDERER),
        (this.transparent = !!s),
        (this.width = t || 800),
        (this.height = i || 600),
        (this.view = n || document.createElement("canvas")),
        (this.view.width = this.width),
        (this.view.height = this.height),
        (this.contextLost = this.handleContextLost.bind(this)),
        (this.contextRestoredLost = this.handleContextRestored.bind(this)),
        this.view.addEventListener("webglcontextlost", this.contextLost, !1),
        this.view.addEventListener(
          "webglcontextrestored",
          this.contextRestoredLost,
          !1
        ),
        (this.options = {
          alpha: this.transparent,
          antialias: !!o,
          premultipliedAlpha: !!s,
          stencil: !0,
        });
      try {
        this.gl = this.view.getContext("experimental-webgl", this.options);
      } catch (h) {
        try {
          this.gl = this.view.getContext("webgl", this.options);
        } catch (l) {
          throw Error(
            " This browser does not support webGL. Try using the canvas renderer" +
              this
          );
        }
      }
      (t = this.gl),
        (this.glContextId = t.id = e.WebGLRenderer.glContextId++),
        (e.glContexts[this.glContextId] = t),
        e.blendModesWebGL ||
          ((e.blendModesWebGL = []),
          (e.blendModesWebGL[e.blendModes.NORMAL] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.ADD] = [t.SRC_ALPHA, t.DST_ALPHA]),
          (e.blendModesWebGL[e.blendModes.MULTIPLY] = [
            t.DST_COLOR,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.SCREEN] = [t.SRC_ALPHA, t.ONE]),
          (e.blendModesWebGL[e.blendModes.OVERLAY] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.DARKEN] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.LIGHTEN] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.COLOR_DODGE] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.COLOR_BURN] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.HARD_LIGHT] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.SOFT_LIGHT] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.DIFFERENCE] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.EXCLUSION] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.HUE] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.SATURATION] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.COLOR] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ]),
          (e.blendModesWebGL[e.blendModes.LUMINOSITY] = [
            t.ONE,
            t.ONE_MINUS_SRC_ALPHA,
          ])),
        (this.projection = new e.Point()),
        (this.projection.x = this.width / 2),
        (this.projection.y = -this.height / 2),
        (this.offset = new e.Point(0, 0)),
        this.resize(this.width, this.height),
        (this.contextLost = !1),
        (this.shaderManager = new e.WebGLShaderManager(t)),
        (this.spriteBatch = new e.WebGLSpriteBatch(t)),
        (this.maskManager = new e.WebGLMaskManager(t)),
        (this.filterManager = new e.WebGLFilterManager(t, this.transparent)),
        (this.renderSession = {}),
        (this.renderSession.gl = this.gl),
        (this.renderSession.drawCount = 0),
        (this.renderSession.shaderManager = this.shaderManager),
        (this.renderSession.maskManager = this.maskManager),
        (this.renderSession.filterManager = this.filterManager),
        (this.renderSession.spriteBatch = this.spriteBatch),
        (this.renderSession.renderer = this),
        t.useProgram(this.shaderManager.defaultShader.program),
        t.disable(t.DEPTH_TEST),
        t.disable(t.CULL_FACE),
        t.enable(t.BLEND),
        t.colorMask(!0, !0, !0, this.transparent);
    }),
    (e.WebGLRenderer.prototype.constructor = e.WebGLRenderer),
    (e.WebGLRenderer.prototype.render = function (t) {
      if (!this.contextLost) {
        this.__stage !== t &&
          (t.interactive && t.interactionManager.removeEvents(),
          (this.__stage = t)),
          e.WebGLRenderer.updateTextures(),
          t.updateTransform(),
          t._interactive &&
            !t._interactiveEventsAdded &&
            ((t._interactiveEventsAdded = !0),
            t.interactionManager.setTarget(this));
        var i = this.gl;
        i.viewport(0, 0, this.width, this.height),
          i.bindFramebuffer(i.FRAMEBUFFER, null),
          this.transparent
            ? i.clearColor(0, 0, 0, 0)
            : i.clearColor(
                t.backgroundColorSplit[0],
                t.backgroundColorSplit[1],
                t.backgroundColorSplit[2],
                1
              ),
          i.clear(i.COLOR_BUFFER_BIT),
          this.renderDisplayObject(t, this.projection),
          t.interactive
            ? t._interactiveEventsAdded ||
              ((t._interactiveEventsAdded = !0),
              t.interactionManager.setTarget(this))
            : t._interactiveEventsAdded &&
              ((t._interactiveEventsAdded = !1),
              t.interactionManager.setTarget(this));
      }
    }),
    (e.WebGLRenderer.prototype.renderDisplayObject = function (t, e, i) {
      (this.renderSession.drawCount = 0),
        (this.renderSession.currentBlendMode = 9999),
        (this.renderSession.projection = e),
        (this.renderSession.offset = this.offset),
        this.spriteBatch.begin(this.renderSession),
        this.filterManager.begin(this.renderSession, i),
        t._renderWebGL(this.renderSession),
        this.spriteBatch.end();
    }),
    (e.WebGLRenderer.updateTextures = function () {
      for (var t = 0, t = 0; t < e.Texture.frameUpdates.length; t++)
        e.WebGLRenderer.updateTextureFrame(e.Texture.frameUpdates[t]);
      for (t = 0; t < e.texturesToDestroy.length; t++)
        e.WebGLRenderer.destroyTexture(e.texturesToDestroy[t]);
      (e.texturesToUpdate.length = 0),
        (e.texturesToDestroy.length = 0),
        (e.Texture.frameUpdates.length = 0);
    }),
    (e.WebGLRenderer.destroyTexture = function (t) {
      for (var i = t._glTextures.length - 1; 0 <= i; i--) {
        var n = t._glTextures[i],
          s = e.glContexts[i];
        s && n && s.deleteTexture(n);
      }
      t._glTextures.length = 0;
    }),
    (e.WebGLRenderer.updateTextureFrame = function (t) {
      (t.updateFrame = !1), t._updateWebGLuvs();
    }),
    (e.WebGLRenderer.prototype.resize = function (t, e) {
      (this.width = t),
        (this.height = e),
        (this.view.width = t),
        (this.view.height = e),
        this.gl.viewport(0, 0, this.width, this.height),
        (this.projection.x = this.width / 2),
        (this.projection.y = -this.height / 2);
    }),
    (e.createWebGLTexture = function (t, i) {
      return (
        t.hasLoaded &&
          ((t._glTextures[i.id] = i.createTexture()),
          i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]),
          i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
          i.texImage2D(
            i.TEXTURE_2D,
            0,
            i.RGBA,
            i.RGBA,
            i.UNSIGNED_BYTE,
            t.source
          ),
          i.texParameteri(
            i.TEXTURE_2D,
            i.TEXTURE_MAG_FILTER,
            t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST
          ),
          i.texParameteri(
            i.TEXTURE_2D,
            i.TEXTURE_MIN_FILTER,
            t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST
          ),
          t._powerOf2
            ? (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT),
              i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.REPEAT))
            : (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
              i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE)),
          i.bindTexture(i.TEXTURE_2D, null)),
        t._glTextures[i.id]
      );
    }),
    (e.updateWebGLTexture = function (t, i) {
      t._glTextures[i.id] &&
        (i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        i.texImage2D(
          i.TEXTURE_2D,
          0,
          i.RGBA,
          i.RGBA,
          i.UNSIGNED_BYTE,
          t.source
        ),
        i.texParameteri(
          i.TEXTURE_2D,
          i.TEXTURE_MAG_FILTER,
          t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST
        ),
        i.texParameteri(
          i.TEXTURE_2D,
          i.TEXTURE_MIN_FILTER,
          t.scaleMode === e.scaleModes.LINEAR ? i.LINEAR : i.NEAREST
        ),
        t._powerOf2
          ? (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.REPEAT),
            i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.REPEAT))
          : (i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
            i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE)),
        i.bindTexture(i.TEXTURE_2D, null));
    }),
    (e.WebGLRenderer.prototype.handleContextLost = function (t) {
      t.preventDefault(), (this.contextLost = !0);
    }),
    (e.WebGLRenderer.prototype.handleContextRestored = function () {
      try {
        this.gl = this.view.getContext("experimental-webgl", this.options);
      } catch (t) {
        try {
          this.gl = this.view.getContext("webgl", this.options);
        } catch (i) {
          throw Error(
            " This browser does not support webGL. Try using the canvas renderer" +
              this
          );
        }
      }
      var n = this.gl;
      for (var s in ((n.id = e.WebGLRenderer.glContextId++),
      this.shaderManager.setContext(n),
      this.spriteBatch.setContext(n),
      this.maskManager.setContext(n),
      this.filterManager.setContext(n),
      (this.renderSession.gl = this.gl),
      n.disable(n.DEPTH_TEST),
      n.disable(n.CULL_FACE),
      n.enable(n.BLEND),
      n.colorMask(!0, !0, !0, this.transparent),
      this.gl.viewport(0, 0, this.width, this.height),
      e.TextureCache))
        e.TextureCache[s].baseTexture._glTextures = [];
      this.contextLost = !1;
    }),
    (e.WebGLRenderer.prototype.destroy = function () {
      this.view.removeEventListener("webglcontextlost", this.contextLost),
        this.view.removeEventListener(
          "webglcontextrestored",
          this.contextRestoredLost
        ),
        (this.offset = this.projection = e.glContexts[this.glContextId] = null),
        this.shaderManager.destroy(),
        this.spriteBatch.destroy(),
        this.maskManager.destroy(),
        this.filterManager.destroy(),
        (this.renderSession =
          this.gl =
          this.filterManager =
          this.maskManager =
          this.spriteBatch =
          this.shaderManager =
            null);
    }),
    (e.WebGLRenderer.glContextId = 0),
    (e.WebGLMaskManager = function (t) {
      (this.maskStack = []), (this.maskPosition = 0), this.setContext(t);
    }),
    (e.WebGLMaskManager.prototype.setContext = function (t) {
      this.gl = t;
    }),
    (e.WebGLMaskManager.prototype.pushMask = function (t, i) {
      var n = this.gl;
      0 === this.maskStack.length &&
        (n.enable(n.STENCIL_TEST), n.stencilFunc(n.ALWAYS, 1, 1)),
        this.maskStack.push(t),
        n.colorMask(!1, !1, !1, !1),
        n.stencilOp(n.KEEP, n.KEEP, n.INCR),
        e.WebGLGraphics.renderGraphics(t, i),
        n.colorMask(!0, !0, !0, !0),
        n.stencilFunc(n.NOTEQUAL, 0, this.maskStack.length),
        n.stencilOp(n.KEEP, n.KEEP, n.KEEP);
    }),
    (e.WebGLMaskManager.prototype.popMask = function (t) {
      var i = this.gl,
        n = this.maskStack.pop();
      n &&
        (i.colorMask(!1, !1, !1, !1),
        i.stencilOp(i.KEEP, i.KEEP, i.DECR),
        e.WebGLGraphics.renderGraphics(n, t),
        i.colorMask(!0, !0, !0, !0),
        i.stencilFunc(i.NOTEQUAL, 0, this.maskStack.length),
        i.stencilOp(i.KEEP, i.KEEP, i.KEEP)),
        0 === this.maskStack.length && i.disable(i.STENCIL_TEST);
    }),
    (e.WebGLMaskManager.prototype.destroy = function () {
      this.gl = this.maskStack = null;
    }),
    (e.WebGLShaderManager = function (t) {
      (this.maxAttibs = 10),
        (this.attribState = []),
        (this.tempAttribState = []);
      for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
      this.setContext(t);
    }),
    (e.WebGLShaderManager.prototype.setContext = function (t) {
      (this.gl = t),
        (this.primitiveShader = new e.PrimitiveShader(t)),
        (this.defaultShader = new e.PixiShader(t)),
        (this.fastShader = new e.PixiFastShader(t)),
        this.activateShader(this.defaultShader);
    }),
    (e.WebGLShaderManager.prototype.setAttribs = function (t) {
      var e;
      for (e = 0; e < this.tempAttribState.length; e++)
        this.tempAttribState[e] = !1;
      for (e = 0; e < t.length; e++) this.tempAttribState[t[e]] = !0;
      for (e = 0, t = this.gl; e < this.attribState.length; e++)
        this.attribState[e] !== this.tempAttribState[e] &&
          ((this.attribState[e] = this.tempAttribState[e]),
          this.tempAttribState[e]
            ? t.enableVertexAttribArray(e)
            : t.disableVertexAttribArray(e));
    }),
    (e.WebGLShaderManager.prototype.activateShader = function (t) {
      (this.currentShader = t),
        this.gl.useProgram(t.program),
        this.setAttribs(t.attributes);
    }),
    (e.WebGLShaderManager.prototype.activatePrimitiveShader = function () {
      this.gl.useProgram(this.primitiveShader.program),
        this.setAttribs(this.primitiveShader.attributes);
    }),
    (e.WebGLShaderManager.prototype.deactivatePrimitiveShader = function () {
      this.gl.useProgram(this.defaultShader.program),
        this.setAttribs(this.defaultShader.attributes);
    }),
    (e.WebGLShaderManager.prototype.destroy = function () {
      (this.tempAttribState = this.attribState = null),
        this.primitiveShader.destroy(),
        this.defaultShader.destroy(),
        this.fastShader.destroy(),
        (this.gl = null);
    }),
    (e.WebGLSpriteBatch = function (t) {
      (this.vertSize = 6), (this.size = 2e3);
      var e = 6 * this.size;
      (this.vertices = new Float32Array(4 * this.size * this.vertSize)),
        (this.indices = new Uint16Array(e));
      for (var i = (this.lastIndexCount = 0), n = 0; i < e; i += 6, n += 4)
        (this.indices[i + 0] = n + 0),
          (this.indices[i + 1] = n + 1),
          (this.indices[i + 2] = n + 2),
          (this.indices[i + 3] = n + 0),
          (this.indices[i + 4] = n + 2),
          (this.indices[i + 5] = n + 3);
      (this.drawing = !1),
        (this.currentBatchSize = 0),
        (this.currentBaseTexture = null),
        this.setContext(t);
    }),
    (e.WebGLSpriteBatch.prototype.setContext = function (t) {
      (this.gl = t),
        (this.vertexBuffer = t.createBuffer()),
        (this.indexBuffer = t.createBuffer()),
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
        t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW),
        (this.currentBlendMode = 99999);
    }),
    (e.WebGLSpriteBatch.prototype.begin = function (t) {
      (this.renderSession = t),
        (this.shader = this.renderSession.shaderManager.defaultShader),
        this.start();
    }),
    (e.WebGLSpriteBatch.prototype.end = function () {
      this.flush();
    }),
    (e.WebGLSpriteBatch.prototype.render = function (t) {
      var e = t.texture;
      (e.baseTexture !== this.currentBaseTexture ||
        this.currentBatchSize >= this.size) &&
        (this.flush(), (this.currentBaseTexture = e.baseTexture)),
        t.blendMode !== this.currentBlendMode && this.setBlendMode(t.blendMode);
      var i = t._uvs || t.texture._uvs;
      if (i) {
        var n,
          s,
          o = t.worldAlpha,
          h = t.tint,
          l = this.vertices,
          u = t.anchor.x,
          d = t.anchor.y;
        t.texture.trim
          ? ((n = (u = (s = t.texture.trim).x - u * s.width) + e.frame.width),
            (s = (d = s.y - d * s.height) + e.frame.height))
          : ((n = e.frame.width * (1 - u)),
            (u = -(e.frame.width * u)),
            (s = e.frame.height * (1 - d)),
            (d = -(e.frame.height * d)));
        var e = 4 * this.currentBatchSize * this.vertSize,
          c = t.worldTransform;
        t = c.a;
        var p = c.c,
          f = c.b,
          m = c.d,
          v = c.tx,
          c = c.ty;
        (l[e++] = t * u + f * d + v),
          (l[e++] = m * d + p * u + c),
          (l[e++] = i.x0),
          (l[e++] = i.y0),
          (l[e++] = o),
          (l[e++] = h),
          (l[e++] = t * n + f * d + v),
          (l[e++] = m * d + p * n + c),
          (l[e++] = i.x1),
          (l[e++] = i.y1),
          (l[e++] = o),
          (l[e++] = h),
          (l[e++] = t * n + f * s + v),
          (l[e++] = m * s + p * n + c),
          (l[e++] = i.x2),
          (l[e++] = i.y2),
          (l[e++] = o),
          (l[e++] = h),
          (l[e++] = t * u + f * s + v),
          (l[e++] = m * s + p * u + c),
          (l[e++] = i.x3),
          (l[e++] = i.y3),
          (l[e++] = o),
          (l[e++] = h),
          this.currentBatchSize++;
      }
    }),
    (e.WebGLSpriteBatch.prototype.renderTilingSprite = function (t) {
      var i = t.tilingTexture;
      (i.baseTexture !== this.currentBaseTexture ||
        this.currentBatchSize >= this.size) &&
        (this.flush(), (this.currentBaseTexture = i.baseTexture)),
        t.blendMode !== this.currentBlendMode && this.setBlendMode(t.blendMode),
        t._uvs || (t._uvs = new e.TextureUvs());
      var n = t._uvs;
      (t.tilePosition.x %= i.baseTexture.width * t.tileScaleOffset.x),
        (t.tilePosition.y %= i.baseTexture.height * t.tileScaleOffset.y);
      var s = t.tilePosition.x / (i.baseTexture.width * t.tileScaleOffset.x),
        o = t.tilePosition.y / (i.baseTexture.height * t.tileScaleOffset.y),
        h =
          t.width / i.baseTexture.width / (t.tileScale.x * t.tileScaleOffset.x),
        i =
          t.height /
          i.baseTexture.height /
          (t.tileScale.y * t.tileScaleOffset.y);
      (n.x0 = 0 - s),
        (n.y0 = 0 - o),
        (n.x1 = 1 * h - s),
        (n.y1 = 0 - o),
        (n.x2 = 1 * h - s),
        (n.y2 = 1 * i - o),
        (n.x3 = 0 - s),
        (n.y3 = 1 * i - o);
      var s = t.worldAlpha,
        o = t.tint,
        h = this.vertices,
        l = t.width,
        u = t.height,
        d = t.anchor.x,
        c = t.anchor.y,
        i = l * (1 - d),
        l = -(l * d),
        d = u * (1 - c),
        u = -(u * c),
        c = 4 * this.currentBatchSize * this.vertSize,
        p = t.worldTransform;
      t = p.a;
      var f = p.c,
        m = p.b,
        v = p.d,
        y = p.tx,
        p = p.ty;
      (h[c++] = t * l + m * u + y),
        (h[c++] = v * u + f * l + p),
        (h[c++] = n.x0),
        (h[c++] = n.y0),
        (h[c++] = s),
        (h[c++] = o),
        (h[c++] = t * i + m * u + y),
        (h[c++] = v * u + f * i + p),
        (h[c++] = n.x1),
        (h[c++] = n.y1),
        (h[c++] = s),
        (h[c++] = o),
        (h[c++] = t * i + m * d + y),
        (h[c++] = v * d + f * i + p),
        (h[c++] = n.x2),
        (h[c++] = n.y2),
        (h[c++] = s),
        (h[c++] = o),
        (h[c++] = t * l + m * d + y),
        (h[c++] = v * d + f * l + p),
        (h[c++] = n.x3),
        (h[c++] = n.y3),
        (h[c++] = s),
        (h[c++] = o),
        this.currentBatchSize++;
    }),
    (e.WebGLSpriteBatch.prototype.flush = function () {
      if (0 !== this.currentBatchSize) {
        var t = this.gl;
        if (
          (t.bindTexture(
            t.TEXTURE_2D,
            this.currentBaseTexture._glTextures[t.id] ||
              e.createWebGLTexture(this.currentBaseTexture, t)
          ),
          this.currentBatchSize > 0.5 * this.size)
        )
          t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices);
        else {
          var i = this.vertices.subarray(
            0,
            4 * this.currentBatchSize * this.vertSize
          );
          t.bufferSubData(t.ARRAY_BUFFER, 0, i);
        }
        t.drawElements(
          t.TRIANGLES,
          6 * this.currentBatchSize,
          t.UNSIGNED_SHORT,
          0
        ),
          (this.currentBatchSize = 0),
          this.renderSession.drawCount++;
      }
    }),
    (e.WebGLSpriteBatch.prototype.stop = function () {
      this.flush();
    }),
    (e.WebGLSpriteBatch.prototype.start = function () {
      var t = this.gl;
      t.activeTexture(t.TEXTURE0),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      var i = this.renderSession.projection;
      t.uniform2f(this.shader.projectionVector, i.x, i.y),
        (i = 4 * this.vertSize),
        t.vertexAttribPointer(
          this.shader.aVertexPosition,
          2,
          t.FLOAT,
          !1,
          i,
          0
        ),
        t.vertexAttribPointer(this.shader.aTextureCoord, 2, t.FLOAT, !1, i, 8),
        t.vertexAttribPointer(
          this.shader.colorAttribute,
          2,
          t.FLOAT,
          !1,
          i,
          16
        ),
        this.currentBlendMode !== e.blendModes.NORMAL &&
          this.setBlendMode(e.blendModes.NORMAL);
    }),
    (e.WebGLSpriteBatch.prototype.setBlendMode = function (t) {
      this.flush(),
        (this.currentBlendMode = t),
        (t = e.blendModesWebGL[this.currentBlendMode]),
        this.gl.blendFunc(t[0], t[1]);
    }),
    (e.WebGLSpriteBatch.prototype.destroy = function () {
      (this.indices = this.vertices = null),
        this.gl.deleteBuffer(this.vertexBuffer),
        this.gl.deleteBuffer(this.indexBuffer),
        (this.gl = this.currentBaseTexture = null);
    }),
    (e.WebGLFastSpriteBatch = function (t) {
      (this.vertSize = 10), (this.size = this.maxSize = 6e3);
      var e = 6 * this.maxSize;
      (this.vertices = new Float32Array(4 * this.size * this.vertSize)),
        (this.indices = new Uint16Array(e)),
        (this.indexBuffer = this.vertexBuffer = null);
      for (var i = (this.lastIndexCount = 0), n = 0; i < e; i += 6, n += 4)
        (this.indices[i + 0] = n + 0),
          (this.indices[i + 1] = n + 1),
          (this.indices[i + 2] = n + 2),
          (this.indices[i + 3] = n + 0),
          (this.indices[i + 4] = n + 2),
          (this.indices[i + 5] = n + 3);
      (this.drawing = !1),
        (this.currentBatchSize = 0),
        (this.currentBaseTexture = null),
        (this.currentBlendMode = 0),
        (this.matrix = this.shader = this.renderSession = null),
        this.setContext(t);
    }),
    (e.WebGLFastSpriteBatch.prototype.setContext = function (t) {
      (this.gl = t),
        (this.vertexBuffer = t.createBuffer()),
        (this.indexBuffer = t.createBuffer()),
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
        t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW),
        (this.currentBlendMode = 99999);
    }),
    (e.WebGLFastSpriteBatch.prototype.begin = function (t, e) {
      (this.renderSession = e),
        (this.shader = this.renderSession.shaderManager.fastShader),
        (this.matrix = t.worldTransform.toArray(!0)),
        this.start();
    }),
    (e.WebGLFastSpriteBatch.prototype.end = function () {
      this.flush();
    }),
    (e.WebGLFastSpriteBatch.prototype.render = function (t) {
      var e = (t = t.children)[0];
      if (e.texture._uvs) {
        (this.currentBaseTexture = e.texture.baseTexture),
          e.blendMode !== this.currentBlendMode &&
            this.setBlendMode(e.blendMode);
        for (var e = 0, i = t.length; e < i; e++) this.renderSprite(t[e]);
        this.flush();
      }
    }),
    (e.WebGLFastSpriteBatch.prototype.renderSprite = function (t) {
      if (
        t.visible &&
        (t.texture.baseTexture === this.currentBaseTexture ||
          (this.flush(),
          (this.currentBaseTexture = t.texture.baseTexture),
          t.texture._uvs))
      ) {
        var e,
          i,
          n,
          s,
          o,
          h,
          l = this.vertices;
        (e = t.texture._uvs),
          t.texture.trim
            ? ((i =
                (n = (s = t.texture.trim).x - t.anchor.x * s.width) +
                t.texture.frame.width),
              (s = (o = s.y - t.anchor.y * s.height) + t.texture.frame.height))
            : ((i = t.texture.frame.width * (1 - t.anchor.x)),
              (n = -(t.texture.frame.width * t.anchor.x)),
              (s = t.texture.frame.height * (1 - t.anchor.y)),
              (o = -(t.texture.frame.height * t.anchor.y))),
          (h = 4 * this.currentBatchSize * this.vertSize),
          (l[h++] = n),
          (l[h++] = o),
          (l[h++] = t.position.x),
          (l[h++] = t.position.y),
          (l[h++] = t.scale.x),
          (l[h++] = t.scale.y),
          (l[h++] = t.rotation),
          (l[h++] = e.x0),
          (l[h++] = e.y1),
          (l[h++] = t.alpha),
          (l[h++] = i),
          (l[h++] = o),
          (l[h++] = t.position.x),
          (l[h++] = t.position.y),
          (l[h++] = t.scale.x),
          (l[h++] = t.scale.y),
          (l[h++] = t.rotation),
          (l[h++] = e.x1),
          (l[h++] = e.y1),
          (l[h++] = t.alpha),
          (l[h++] = i),
          (l[h++] = s),
          (l[h++] = t.position.x),
          (l[h++] = t.position.y),
          (l[h++] = t.scale.x),
          (l[h++] = t.scale.y),
          (l[h++] = t.rotation),
          (l[h++] = e.x2),
          (l[h++] = e.y2),
          (l[h++] = t.alpha),
          (l[h++] = n),
          (l[h++] = s),
          (l[h++] = t.position.x),
          (l[h++] = t.position.y),
          (l[h++] = t.scale.x),
          (l[h++] = t.scale.y),
          (l[h++] = t.rotation),
          (l[h++] = e.x3),
          (l[h++] = e.y3),
          (l[h++] = t.alpha),
          this.currentBatchSize++,
          this.currentBatchSize >= this.size && this.flush();
      }
    }),
    (e.WebGLFastSpriteBatch.prototype.flush = function () {
      if (0 !== this.currentBatchSize) {
        var t = this.gl;
        if (
          (this.currentBaseTexture._glTextures[t.id] ||
            e.createWebGLTexture(this.currentBaseTexture, t),
          t.bindTexture(
            t.TEXTURE_2D,
            this.currentBaseTexture._glTextures[t.id]
          ),
          this.currentBatchSize > 0.5 * this.size)
        )
          t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices);
        else {
          var i = this.vertices.subarray(
            0,
            4 * this.currentBatchSize * this.vertSize
          );
          t.bufferSubData(t.ARRAY_BUFFER, 0, i);
        }
        t.drawElements(
          t.TRIANGLES,
          6 * this.currentBatchSize,
          t.UNSIGNED_SHORT,
          0
        ),
          (this.currentBatchSize = 0),
          this.renderSession.drawCount++;
      }
    }),
    (e.WebGLFastSpriteBatch.prototype.stop = function () {
      this.flush();
    }),
    (e.WebGLFastSpriteBatch.prototype.start = function () {
      var t = this.gl;
      t.activeTexture(t.TEXTURE0),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      var i = this.renderSession.projection;
      t.uniform2f(this.shader.projectionVector, i.x, i.y),
        t.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix),
        (i = 4 * this.vertSize),
        t.vertexAttribPointer(
          this.shader.aVertexPosition,
          2,
          t.FLOAT,
          !1,
          i,
          0
        ),
        t.vertexAttribPointer(this.shader.aPositionCoord, 2, t.FLOAT, !1, i, 8),
        t.vertexAttribPointer(this.shader.aScale, 2, t.FLOAT, !1, i, 16),
        t.vertexAttribPointer(this.shader.aRotation, 1, t.FLOAT, !1, i, 24),
        t.vertexAttribPointer(this.shader.aTextureCoord, 2, t.FLOAT, !1, i, 28),
        t.vertexAttribPointer(
          this.shader.colorAttribute,
          1,
          t.FLOAT,
          !1,
          i,
          36
        ),
        this.currentBlendMode !== e.blendModes.NORMAL &&
          this.setBlendMode(e.blendModes.NORMAL);
    }),
    (e.WebGLFastSpriteBatch.prototype.setBlendMode = function (t) {
      this.flush(),
        (this.currentBlendMode = t),
        (t = e.blendModesWebGL[this.currentBlendMode]),
        this.gl.blendFunc(t[0], t[1]);
    }),
    (e.WebGLFilterManager = function (t, e) {
      (this.transparent = e),
        (this.filterStack = []),
        (this.offsetY = this.offsetX = 0),
        this.setContext(t);
    }),
    (e.WebGLFilterManager.prototype.setContext = function (t) {
      (this.gl = t), (this.texturePool = []), this.initShaderBuffers();
    }),
    (e.WebGLFilterManager.prototype.begin = function (t, e) {
      (this.renderSession = t),
        (this.defaultShader = t.shaderManager.defaultShader);
      var i = this.renderSession.projection;
      (this.width = 2 * i.x), (this.height = -(2 * i.y)), (this.buffer = e);
    }),
    (e.WebGLFilterManager.prototype.pushFilter = function (t) {
      var i = this.gl,
        n = this.renderSession.projection,
        s = this.renderSession.offset;
      (t._filterArea = t.target.filterArea || t.target.getBounds()),
        this.filterStack.push(t);
      var o = t.filterPasses[0];
      (this.offsetX += t._filterArea.x), (this.offsetY += t._filterArea.y);
      var h = this.texturePool.pop();
      h
        ? h.resize(this.width, this.height)
        : (h = new e.FilterTexture(this.gl, this.width, this.height)),
        i.bindTexture(i.TEXTURE_2D, h.texture);
      var l = t._filterArea,
        o = o.padding;
      (l.x -= o),
        (l.y -= o),
        (l.width += 2 * o),
        (l.height += 2 * o),
        0 > l.x && (l.x = 0),
        l.width > this.width && (l.width = this.width),
        0 > l.y && (l.y = 0),
        l.height > this.height && (l.height = this.height),
        i.bindFramebuffer(i.FRAMEBUFFER, h.frameBuffer),
        i.viewport(0, 0, l.width, l.height),
        (n.x = l.width / 2),
        (n.y = -l.height / 2),
        (s.x = -l.x),
        (s.y = -l.y),
        i.uniform2f(
          this.defaultShader.projectionVector,
          l.width / 2,
          -l.height / 2
        ),
        i.uniform2f(this.defaultShader.offsetVector, -l.x, -l.y),
        i.colorMask(!0, !0, !0, !0),
        i.clearColor(0, 0, 0, 0),
        i.clear(i.COLOR_BUFFER_BIT),
        (t._glFilterTexture = h);
    }),
    (e.WebGLFilterManager.prototype.popFilter = function () {
      var t = this.gl,
        i = this.filterStack.pop(),
        n = i._filterArea,
        s = i._glFilterTexture,
        o = this.renderSession.projection,
        h = this.renderSession.offset;
      if (1 < i.filterPasses.length) {
        t.viewport(0, 0, n.width, n.height),
          t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
          (this.vertexArray[0] = 0),
          (this.vertexArray[1] = n.height),
          (this.vertexArray[2] = n.width),
          (this.vertexArray[3] = n.height),
          (this.vertexArray[4] = 0),
          (this.vertexArray[5] = 0),
          (this.vertexArray[6] = n.width),
          (this.vertexArray[7] = 0),
          t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray),
          t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer),
          (this.uvArray[2] = n.width / this.width),
          (this.uvArray[5] = n.height / this.height),
          (this.uvArray[6] = n.width / this.width),
          (this.uvArray[7] = n.height / this.height),
          t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray);
        var l = this.texturePool.pop();
        l || (l = new e.FilterTexture(this.gl, this.width, this.height)),
          l.resize(this.width, this.height),
          t.bindFramebuffer(t.FRAMEBUFFER, l.frameBuffer),
          t.clear(t.COLOR_BUFFER_BIT),
          t.disable(t.BLEND);
        for (var u = 0; u < i.filterPasses.length - 1; u++) {
          var d = i.filterPasses[u];
          t.bindFramebuffer(t.FRAMEBUFFER, l.frameBuffer),
            t.activeTexture(t.TEXTURE0),
            t.bindTexture(t.TEXTURE_2D, s.texture),
            this.applyFilterPass(d, n, n.width, n.height),
            (d = s),
            (s = l),
            (l = d);
        }
        t.enable(t.BLEND), this.texturePool.push(l);
      }
      (l = i.filterPasses[i.filterPasses.length - 1]),
        (this.offsetX -= n.x),
        (this.offsetY -= n.y);
      var u = this.width,
        d = this.height,
        c = 0,
        p = 0,
        f = this.buffer;
      0 === this.filterStack.length
        ? t.colorMask(!0, !0, !0, !0)
        : ((u = (n = (f = this.filterStack[this.filterStack.length - 1])
            ._filterArea).width),
          (d = n.height),
          (c = n.x),
          (p = n.y),
          (f = f._glFilterTexture.frameBuffer)),
        (o.x = u / 2),
        (o.y = -d / 2),
        (h.x = c),
        (h.y = p),
        (o = (n = i._filterArea).x - c),
        (h = n.y - p),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        (this.vertexArray[0] = o),
        (this.vertexArray[1] = h + n.height),
        (this.vertexArray[2] = o + n.width),
        (this.vertexArray[3] = h + n.height),
        (this.vertexArray[4] = o),
        (this.vertexArray[5] = h),
        (this.vertexArray[6] = o + n.width),
        (this.vertexArray[7] = h),
        t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertexArray),
        t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer),
        (this.uvArray[2] = n.width / this.width),
        (this.uvArray[5] = n.height / this.height),
        (this.uvArray[6] = n.width / this.width),
        (this.uvArray[7] = n.height / this.height),
        t.bufferSubData(t.ARRAY_BUFFER, 0, this.uvArray),
        t.viewport(0, 0, u, d),
        t.bindFramebuffer(t.FRAMEBUFFER, f),
        t.activeTexture(t.TEXTURE0),
        t.bindTexture(t.TEXTURE_2D, s.texture),
        this.applyFilterPass(l, n, u, d),
        t.useProgram(this.defaultShader.program),
        t.uniform2f(this.defaultShader.projectionVector, u / 2, -d / 2),
        t.uniform2f(this.defaultShader.offsetVector, -c, -p),
        this.texturePool.push(s),
        (i._glFilterTexture = null);
    }),
    (e.WebGLFilterManager.prototype.applyFilterPass = function (t, i, n, s) {
      i = this.gl;
      var o = t.shaders[i.id];
      o ||
        (((o = new e.PixiShader(i)).fragmentSrc = t.fragmentSrc),
        (o.uniforms = t.uniforms),
        o.init(),
        (t.shaders[i.id] = o)),
        i.useProgram(o.program),
        i.uniform2f(o.projectionVector, n / 2, -s / 2),
        i.uniform2f(o.offsetVector, 0, 0),
        t.uniforms.dimensions &&
          ((t.uniforms.dimensions.value[0] = this.width),
          (t.uniforms.dimensions.value[1] = this.height),
          (t.uniforms.dimensions.value[2] = this.vertexArray[0]),
          (t.uniforms.dimensions.value[3] = this.vertexArray[5])),
        o.syncUniforms(),
        i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffer),
        i.vertexAttribPointer(o.aVertexPosition, 2, i.FLOAT, !1, 0, 0),
        i.bindBuffer(i.ARRAY_BUFFER, this.uvBuffer),
        i.vertexAttribPointer(o.aTextureCoord, 2, i.FLOAT, !1, 0, 0),
        i.bindBuffer(i.ARRAY_BUFFER, this.colorBuffer),
        i.vertexAttribPointer(o.colorAttribute, 2, i.FLOAT, !1, 0, 0),
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
        i.drawElements(i.TRIANGLES, 6, i.UNSIGNED_SHORT, 0),
        this.renderSession.drawCount++;
    }),
    (e.WebGLFilterManager.prototype.initShaderBuffers = function () {
      var t = this.gl;
      (this.vertexBuffer = t.createBuffer()),
        (this.uvBuffer = t.createBuffer()),
        (this.colorBuffer = t.createBuffer()),
        (this.indexBuffer = t.createBuffer()),
        (this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
        t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
        t.bufferData(t.ARRAY_BUFFER, this.vertexArray, t.STATIC_DRAW),
        (this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
        t.bindBuffer(t.ARRAY_BUFFER, this.uvBuffer),
        t.bufferData(t.ARRAY_BUFFER, this.uvArray, t.STATIC_DRAW),
        (this.colorArray = new Float32Array([
          1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215,
        ])),
        t.bindBuffer(t.ARRAY_BUFFER, this.colorBuffer),
        t.bufferData(t.ARRAY_BUFFER, this.colorArray, t.STATIC_DRAW),
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
        t.bufferData(
          t.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2, 1, 3, 2]),
          t.STATIC_DRAW
        );
    }),
    (e.WebGLFilterManager.prototype.destroy = function () {
      var t = this.gl;
      this.filterStack = null;
      for (
        var e = (this.offsetY = this.offsetX = 0);
        e < this.texturePool.length;
        e++
      )
        this.texturePool.destroy();
      (this.texturePool = null),
        t.deleteBuffer(this.vertexBuffer),
        t.deleteBuffer(this.uvBuffer),
        t.deleteBuffer(this.colorBuffer),
        t.deleteBuffer(this.indexBuffer);
    }),
    (e.FilterTexture = function (t, i, n, s) {
      (this.gl = t),
        (this.frameBuffer = t.createFramebuffer()),
        (this.texture = t.createTexture()),
        (s = s || e.scaleModes.DEFAULT),
        t.bindTexture(t.TEXTURE_2D, this.texture),
        t.texParameteri(
          t.TEXTURE_2D,
          t.TEXTURE_MAG_FILTER,
          s === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST
        ),
        t.texParameteri(
          t.TEXTURE_2D,
          t.TEXTURE_MIN_FILTER,
          s === e.scaleModes.LINEAR ? t.LINEAR : t.NEAREST
        ),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer),
        t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer),
        t.framebufferTexture2D(
          t.FRAMEBUFFER,
          t.COLOR_ATTACHMENT0,
          t.TEXTURE_2D,
          this.texture,
          0
        ),
        (this.renderBuffer = t.createRenderbuffer()),
        t.bindRenderbuffer(t.RENDERBUFFER, this.renderBuffer),
        t.framebufferRenderbuffer(
          t.FRAMEBUFFER,
          t.DEPTH_STENCIL_ATTACHMENT,
          t.RENDERBUFFER,
          this.renderBuffer
        ),
        this.resize(i, n);
    }),
    (e.FilterTexture.prototype.clear = function () {
      var t = this.gl;
      t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT);
    }),
    (e.FilterTexture.prototype.resize = function (t, e) {
      if (this.width !== t || this.height !== e) {
        (this.width = t), (this.height = e);
        var i = this.gl;
        i.bindTexture(i.TEXTURE_2D, this.texture),
          i.texImage2D(
            i.TEXTURE_2D,
            0,
            i.RGBA,
            t,
            e,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            null
          ),
          i.bindRenderbuffer(i.RENDERBUFFER, this.renderBuffer),
          i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, t, e);
      }
    }),
    (e.FilterTexture.prototype.destroy = function () {
      var t = this.gl;
      t.deleteFramebuffer(this.frameBuffer),
        t.deleteTexture(this.texture),
        (this.texture = this.frameBuffer = null);
    }),
    (e.CanvasMaskManager = function () {}),
    (e.CanvasMaskManager.prototype.pushMask = function (t, i) {
      i.save();
      var n = t.alpha,
        s = t.worldTransform;
      i.setTransform(s.a, s.c, s.b, s.d, s.tx, s.ty),
        e.CanvasGraphics.renderGraphicsMask(t, i),
        i.clip(),
        (t.worldAlpha = n);
    }),
    (e.CanvasMaskManager.prototype.popMask = function (t) {
      t.restore();
    }),
    (e.CanvasTinter = function () {}),
    (e.CanvasTinter.getTintedTexture = function (t, i) {
      var n = t.texture,
        s =
          "#" +
          (
            "00000" + (0 | (i = e.CanvasTinter.roundColor(i))).toString(16)
          ).substr(-6);
      if (((n.tintCache = n.tintCache || {}), n.tintCache[s]))
        return n.tintCache[s];
      var o = e.CanvasTinter.canvas || document.createElement("canvas");
      if (
        (e.CanvasTinter.tintMethod(n, i, o), e.CanvasTinter.convertTintToImage)
      ) {
        var h = new Image();
        (h.src = o.toDataURL()), (n.tintCache[s] = h);
      } else (n.tintCache[s] = o), (e.CanvasTinter.canvas = null);
      return o;
    }),
    (e.CanvasTinter.tintWithMultiply = function (t, e, i) {
      var n = i.getContext("2d"),
        s = t.frame;
      (i.width = s.width),
        (i.height = s.height),
        (n.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6)),
        n.fillRect(0, 0, s.width, s.height),
        (n.globalCompositeOperation = "multiply"),
        n.drawImage(
          t.baseTexture.source,
          s.x,
          s.y,
          s.width,
          s.height,
          0,
          0,
          s.width,
          s.height
        ),
        (n.globalCompositeOperation = "destination-atop"),
        n.drawImage(
          t.baseTexture.source,
          s.x,
          s.y,
          s.width,
          s.height,
          0,
          0,
          s.width,
          s.height
        );
    }),
    (e.CanvasTinter.tintWithOverlay = function (t, e, i) {
      var n = i.getContext("2d"),
        s = t.frame;
      (i.width = s.width),
        (i.height = s.height),
        (n.globalCompositeOperation = "copy"),
        (n.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6)),
        n.fillRect(0, 0, s.width, s.height),
        (n.globalCompositeOperation = "destination-atop"),
        n.drawImage(
          t.baseTexture.source,
          s.x,
          s.y,
          s.width,
          s.height,
          0,
          0,
          s.width,
          s.height
        );
    }),
    (e.CanvasTinter.tintWithPerPixel = function (t, i, n) {
      var s = n.getContext("2d"),
        o = t.frame;
      (n.width = o.width),
        (n.height = o.height),
        (s.globalCompositeOperation = "copy"),
        s.drawImage(
          t.baseTexture.source,
          o.x,
          o.y,
          o.width,
          o.height,
          0,
          0,
          o.width,
          o.height
        ),
        (t = (n = e.hex2rgb(i))[0]),
        (i = n[1]),
        (n = n[2]);
      for (
        var o = s.getImageData(0, 0, o.width, o.height), h = o.data, l = 0;
        l < h.length;
        l += 4
      )
        (h[l + 0] *= t), (h[l + 1] *= i), (h[l + 2] *= n);
      s.putImageData(o, 0, 0);
    }),
    (e.CanvasTinter.roundColor = function (t) {
      var i = e.CanvasTinter.cacheStepsPerColorChannel;
      return (
        ((t = e.hex2rgb(t))[0] = Math.min(255, (t[0] / i) * i)),
        (t[1] = Math.min(255, (t[1] / i) * i)),
        (t[2] = Math.min(255, (t[2] / i) * i)),
        e.rgb2hex(t)
      );
    }),
    (e.CanvasTinter.cacheStepsPerColorChannel = 8),
    (e.CanvasTinter.convertTintToImage = !1),
    (e.CanvasTinter.canUseMultiply = e.canUseNewCanvasBlendModes()),
    (e.CanvasTinter.tintMethod = e.CanvasTinter.canUseMultiply
      ? e.CanvasTinter.tintWithMultiply
      : e.CanvasTinter.tintWithPerPixel),
    (e.CanvasRenderer = function (t, i, n, s) {
      (e.defaultRenderer = e.defaultRenderer || this),
        (this.type = e.CANVAS_RENDERER),
        (this.clearBeforeRender = !0),
        (this.roundPixels = !1),
        (this.transparent = !!s),
        e.blendModesCanvas ||
          ((e.blendModesCanvas = []),
          e.canUseNewCanvasBlendModes()
            ? ((e.blendModesCanvas[e.blendModes.NORMAL] = "source-over"),
              (e.blendModesCanvas[e.blendModes.ADD] = "lighter"),
              (e.blendModesCanvas[e.blendModes.MULTIPLY] = "multiply"),
              (e.blendModesCanvas[e.blendModes.SCREEN] = "screen"),
              (e.blendModesCanvas[e.blendModes.OVERLAY] = "overlay"),
              (e.blendModesCanvas[e.blendModes.DARKEN] = "darken"),
              (e.blendModesCanvas[e.blendModes.LIGHTEN] = "lighten"),
              (e.blendModesCanvas[e.blendModes.COLOR_DODGE] = "color-dodge"),
              (e.blendModesCanvas[e.blendModes.COLOR_BURN] = "color-burn"),
              (e.blendModesCanvas[e.blendModes.HARD_LIGHT] = "hard-light"),
              (e.blendModesCanvas[e.blendModes.SOFT_LIGHT] = "soft-light"),
              (e.blendModesCanvas[e.blendModes.DIFFERENCE] = "difference"),
              (e.blendModesCanvas[e.blendModes.EXCLUSION] = "exclusion"),
              (e.blendModesCanvas[e.blendModes.HUE] = "hue"),
              (e.blendModesCanvas[e.blendModes.SATURATION] = "saturation"),
              (e.blendModesCanvas[e.blendModes.COLOR] = "color"),
              (e.blendModesCanvas[e.blendModes.LUMINOSITY] = "luminosity"))
            : ((e.blendModesCanvas[e.blendModes.NORMAL] = "source-over"),
              (e.blendModesCanvas[e.blendModes.ADD] = "lighter"),
              (e.blendModesCanvas[e.blendModes.MULTIPLY] = "source-over"),
              (e.blendModesCanvas[e.blendModes.SCREEN] = "source-over"),
              (e.blendModesCanvas[e.blendModes.OVERLAY] = "source-over"),
              (e.blendModesCanvas[e.blendModes.DARKEN] = "source-over"),
              (e.blendModesCanvas[e.blendModes.LIGHTEN] = "source-over"),
              (e.blendModesCanvas[e.blendModes.COLOR_DODGE] = "source-over"),
              (e.blendModesCanvas[e.blendModes.COLOR_BURN] = "source-over"),
              (e.blendModesCanvas[e.blendModes.HARD_LIGHT] = "source-over"),
              (e.blendModesCanvas[e.blendModes.SOFT_LIGHT] = "source-over"),
              (e.blendModesCanvas[e.blendModes.DIFFERENCE] = "source-over"),
              (e.blendModesCanvas[e.blendModes.EXCLUSION] = "source-over"),
              (e.blendModesCanvas[e.blendModes.HUE] = "source-over"),
              (e.blendModesCanvas[e.blendModes.SATURATION] = "source-over"),
              (e.blendModesCanvas[e.blendModes.COLOR] = "source-over"),
              (e.blendModesCanvas[e.blendModes.LUMINOSITY] = "source-over"))),
        (this.width = t || 800),
        (this.height = i || 600),
        (this.view = n || document.createElement("canvas")),
        (this.context = this.view.getContext("2d", {
          alpha: this.transparent,
        })),
        (this.refresh = !0),
        (this.view.width = this.width),
        (this.view.height = this.height),
        (this.count = 0),
        (this.maskManager = new e.CanvasMaskManager()),
        (this.renderSession = {
          context: this.context,
          maskManager: this.maskManager,
          scaleMode: null,
          smoothProperty: null,
        }),
        "imageSmoothingEnabled" in this.context
          ? (this.renderSession.smoothProperty = "imageSmoothingEnabled")
          : "webkitImageSmoothingEnabled" in this.context
          ? (this.renderSession.smoothProperty = "webkitImageSmoothingEnabled")
          : "mozImageSmoothingEnabled" in this.context
          ? (this.renderSession.smoothProperty = "mozImageSmoothingEnabled")
          : "oImageSmoothingEnabled" in this.context &&
            (this.renderSession.smoothProperty = "oImageSmoothingEnabled");
    }),
    (e.CanvasRenderer.prototype.constructor = e.CanvasRenderer),
    (e.CanvasRenderer.prototype.render = function (t) {
      (e.texturesToUpdate.length = 0),
        (e.texturesToDestroy.length = 0),
        t.updateTransform(),
        this.context.setTransform(1, 0, 0, 1, 0, 0),
        (this.context.globalAlpha = 1),
        !this.transparent && this.clearBeforeRender
          ? ((this.context.fillStyle = t.backgroundColorString),
            this.context.fillRect(0, 0, this.width, this.height))
          : this.transparent &&
            this.clearBeforeRender &&
            this.context.clearRect(0, 0, this.width, this.height),
        this.renderDisplayObject(t),
        t.interactive &&
          !t._interactiveEventsAdded &&
          ((t._interactiveEventsAdded = !0),
          t.interactionManager.setTarget(this)),
        0 < e.Texture.frameUpdates.length &&
          (e.Texture.frameUpdates.length = 0);
    }),
    (e.CanvasRenderer.prototype.resize = function (t, e) {
      (this.width = t),
        (this.height = e),
        (this.view.width = t),
        (this.view.height = e);
    }),
    (e.CanvasRenderer.prototype.renderDisplayObject = function (t, e) {
      (this.renderSession.context = e || this.context),
        t._renderCanvas(this.renderSession);
    }),
    (e.CanvasRenderer.prototype.renderStripFlat = function (t) {
      var e = this.context,
        i = (t = t.verticies).length / 2;
      this.count++, e.beginPath();
      for (var n = 1; n < i - 2; n++) {
        var s = 2 * n,
          o = t[s + 2],
          h = t[s + 4],
          l = t[s + 3],
          u = t[s + 5];
        e.moveTo(t[s], t[s + 1]), e.lineTo(o, l), e.lineTo(h, u);
      }
      (e.fillStyle = "#FF0000"), e.fill(), e.closePath();
    }),
    (e.CanvasRenderer.prototype.renderStrip = function (t) {
      var e = this.context,
        i = t.verticies,
        n = t.uvs,
        s = i.length / 2;
      this.count++;
      for (var o = 1; o < s - 2; o++) {
        var h = 2 * o,
          l = i[h],
          u = i[h + 2],
          d = i[h + 4],
          c = i[h + 1],
          p = i[h + 3],
          f = i[h + 5],
          m = n[h] * t.texture.width,
          v = n[h + 2] * t.texture.width,
          y = n[h + 4] * t.texture.width,
          x = n[h + 1] * t.texture.height,
          $ = n[h + 3] * t.texture.height,
          h = n[h + 5] * t.texture.height;
        e.save(),
          e.beginPath(),
          e.moveTo(l, c),
          e.lineTo(u, p),
          e.lineTo(d, f),
          e.closePath(),
          e.clip();
        var T = m * $ + x * y + v * h - $ * y - x * v - m * h;
        e.transform(
          (l * $ + x * d + u * h - $ * d - x * u - l * h) / T,
          (c * $ + x * f + p * h - $ * f - x * p - c * h) / T,
          (m * u + l * y + v * d - u * y - l * v - m * d) / T,
          (m * p + c * y + v * f - p * y - c * v - m * f) / T,
          (m * $ * d +
            x * u * y +
            l * v * h -
            l * $ * y -
            x * v * d -
            m * u * h) /
            T,
          (m * $ * f +
            x * p * y +
            c * v * h -
            c * $ * y -
            x * v * f -
            m * p * h) /
            T
        ),
          e.drawImage(t.texture.baseTexture.source, 0, 0),
          e.restore();
      }
    }),
    (e.CanvasBuffer = function (t, e) {
      (this.width = t),
        (this.height = e),
        (this.canvas = document.createElement("canvas")),
        (this.context = this.canvas.getContext("2d")),
        (this.canvas.width = t),
        (this.canvas.height = e);
    }),
    (e.CanvasBuffer.prototype.clear = function () {
      this.context.clearRect(0, 0, this.width, this.height);
    }),
    (e.CanvasBuffer.prototype.resize = function (t, e) {
      (this.width = this.canvas.width = t),
        (this.height = this.canvas.height = e);
    }),
    (e.CanvasGraphics = function () {}),
    (e.CanvasGraphics.renderGraphics = function (t, i) {
      for (var n = t.worldAlpha, s = 0; s < t.graphicsData.length; s++) {
        var o = t.graphicsData[s],
          h = o.points;
        if (
          ((i.strokeStyle =
            "#" + ("00000" + (0 | o.lineColor).toString(16)).substr(-6)),
          (i.lineWidth = o.lineWidth),
          o.type === e.Graphics.POLY)
        ) {
          i.beginPath(), i.moveTo(h[0], h[1]);
          for (var l = 1; l < h.length / 2; l++)
            i.lineTo(h[2 * l], h[2 * l + 1]);
          h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && i.closePath(),
            o.fill &&
              ((i.globalAlpha = o.fillAlpha * n),
              (i.fillStyle =
                "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
              i.fill()),
            o.lineWidth && ((i.globalAlpha = o.lineAlpha * n), i.stroke());
        } else if (o.type === e.Graphics.RECT)
          (o.fillColor || 0 === o.fillColor) &&
            ((i.globalAlpha = o.fillAlpha * n),
            (i.fillStyle =
              "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
            i.fillRect(h[0], h[1], h[2], h[3])),
            o.lineWidth &&
              ((i.globalAlpha = o.lineAlpha * n),
              i.strokeRect(h[0], h[1], h[2], h[3]));
        else if (o.type === e.Graphics.CIRC)
          i.beginPath(),
            i.arc(h[0], h[1], h[2], 0, 2 * Math.PI),
            i.closePath(),
            o.fill &&
              ((i.globalAlpha = o.fillAlpha * n),
              (i.fillStyle =
                "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
              i.fill()),
            o.lineWidth && ((i.globalAlpha = o.lineAlpha * n), i.stroke());
        else if (o.type === e.Graphics.ELIP) {
          var u = o.points,
            d = 2 * u[2],
            l = 2 * u[3],
            h = u[0] - d / 2,
            u = u[1] - l / 2;
          i.beginPath();
          var c = (d / 2) * 0.5522848,
            p = (l / 2) * 0.5522848,
            f = h + d,
            m = u + l,
            d = h + d / 2,
            l = u + l / 2;
          i.moveTo(h, l),
            i.bezierCurveTo(h, l - p, d - c, u, d, u),
            i.bezierCurveTo(d + c, u, f, l - p, f, l),
            i.bezierCurveTo(f, l + p, d + c, m, d, m),
            i.bezierCurveTo(d - c, m, h, l + p, h, l),
            i.closePath(),
            o.fill &&
              ((i.globalAlpha = o.fillAlpha * n),
              (i.fillStyle =
                "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
              i.fill()),
            o.lineWidth && ((i.globalAlpha = o.lineAlpha * n), i.stroke());
        }
      }
    }),
    (e.CanvasGraphics.renderGraphicsMask = function (t, i) {
      var n = t.graphicsData.length;
      if (0 !== n)
        for (
          1 < n &&
            window.console.log(
              "Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"
            ),
            n = 0;
          1 > n;
          n++
        ) {
          var s = t.graphicsData[n],
            o = s.points;
          if (s.type === e.Graphics.POLY) {
            for (
              i.beginPath(), i.moveTo(o[0], o[1]), s = 1;
              s < o.length / 2;
              s++
            )
              i.lineTo(o[2 * s], o[2 * s + 1]);
            o[0] === o[o.length - 2] &&
              o[1] === o[o.length - 1] &&
              i.closePath();
          } else if (s.type === e.Graphics.RECT)
            i.beginPath(), i.rect(o[0], o[1], o[2], o[3]), i.closePath();
          else if (s.type === e.Graphics.CIRC)
            i.beginPath(),
              i.arc(o[0], o[1], o[2], 0, 2 * Math.PI),
              i.closePath();
          else if (s.type === e.Graphics.ELIP) {
            var h = s.points,
              l = 2 * h[2],
              s = 2 * h[3],
              o = h[0] - l / 2,
              h = h[1] - s / 2;
            i.beginPath();
            var u = (l / 2) * 0.5522848,
              d = (s / 2) * 0.5522848,
              c = o + l,
              p = h + s,
              l = o + l / 2,
              s = h + s / 2;
            i.moveTo(o, s),
              i.bezierCurveTo(o, s - d, l - u, h, l, h),
              i.bezierCurveTo(l + u, h, c, s - d, c, s),
              i.bezierCurveTo(c, s + d, l + u, p, l, p),
              i.bezierCurveTo(l - u, p, o, s + d, o, s),
              i.closePath();
          }
        }
    }),
    (e.Graphics = function () {
      e.DisplayObjectContainer.call(this),
        (this.renderable = !0),
        (this.fillAlpha = 1),
        (this.lineWidth = 0),
        (this.lineColor = "black"),
        (this.graphicsData = []),
        (this.tint = 16777215),
        (this.blendMode = e.blendModes.NORMAL),
        (this.currentPath = { points: [] }),
        (this._webGL = []),
        (this.isMask = !1),
        (this.bounds = null),
        (this.boundsPadding = 10);
    }),
    (e.Graphics.prototype = Object.create(e.DisplayObjectContainer.prototype)),
    (e.Graphics.prototype.constructor = e.Graphics),
    Object.defineProperty(e.Graphics.prototype, "cacheAsBitmap", {
      get: function () {
        return this._cacheAsBitmap;
      },
      set: function (t) {
        (this._cacheAsBitmap = t)
          ? this._generateCachedSprite()
          : (this.destroyCachedSprite(), (this.dirty = !0));
      },
    }),
    (e.Graphics.prototype.lineStyle = function (t, i, n) {
      return (
        this.currentPath.points.length || this.graphicsData.pop(),
        (this.lineWidth = t || 0),
        (this.lineColor = i || 0),
        (this.lineAlpha = 3 > arguments.length ? 1 : n),
        (this.currentPath = {
          lineWidth: this.lineWidth,
          lineColor: this.lineColor,
          lineAlpha: this.lineAlpha,
          fillColor: this.fillColor,
          fillAlpha: this.fillAlpha,
          fill: this.filling,
          points: [],
          type: e.Graphics.POLY,
        }),
        this.graphicsData.push(this.currentPath),
        this
      );
    }),
    (e.Graphics.prototype.moveTo = function (t, i) {
      return (
        this.currentPath.points.length || this.graphicsData.pop(),
        (this.currentPath = this.currentPath =
          {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: e.Graphics.POLY,
          }),
        this.currentPath.points.push(t, i),
        this.graphicsData.push(this.currentPath),
        this
      );
    }),
    (e.Graphics.prototype.lineTo = function (t, e) {
      return this.currentPath.points.push(t, e), (this.dirty = !0), this;
    }),
    (e.Graphics.prototype.beginFill = function (t, e) {
      return (
        (this.filling = !0),
        (this.fillColor = t || 0),
        (this.fillAlpha = 2 > arguments.length ? 1 : e),
        this
      );
    }),
    (e.Graphics.prototype.endFill = function () {
      return (
        (this.filling = !1), (this.fillColor = null), (this.fillAlpha = 1), this
      );
    }),
    (e.Graphics.prototype.drawRect = function (t, i, n, s) {
      return (
        this.currentPath.points.length || this.graphicsData.pop(),
        (this.currentPath = {
          lineWidth: this.lineWidth,
          lineColor: this.lineColor,
          lineAlpha: this.lineAlpha,
          fillColor: this.fillColor,
          fillAlpha: this.fillAlpha,
          fill: this.filling,
          points: [t, i, n, s],
          type: e.Graphics.RECT,
        }),
        this.graphicsData.push(this.currentPath),
        (this.dirty = !0),
        this
      );
    }),
    (e.Graphics.prototype.drawCircle = function (t, i, n) {
      return (
        this.currentPath.points.length || this.graphicsData.pop(),
        (this.currentPath = {
          lineWidth: this.lineWidth,
          lineColor: this.lineColor,
          lineAlpha: this.lineAlpha,
          fillColor: this.fillColor,
          fillAlpha: this.fillAlpha,
          fill: this.filling,
          points: [t, i, n, n],
          type: e.Graphics.CIRC,
        }),
        this.graphicsData.push(this.currentPath),
        (this.dirty = !0),
        this
      );
    }),
    (e.Graphics.prototype.drawEllipse = function (t, i, n, s) {
      return (
        this.currentPath.points.length || this.graphicsData.pop(),
        (this.currentPath = {
          lineWidth: this.lineWidth,
          lineColor: this.lineColor,
          lineAlpha: this.lineAlpha,
          fillColor: this.fillColor,
          fillAlpha: this.fillAlpha,
          fill: this.filling,
          points: [t, i, n, s],
          type: e.Graphics.ELIP,
        }),
        this.graphicsData.push(this.currentPath),
        (this.dirty = !0),
        this
      );
    }),
    (e.Graphics.prototype.clear = function () {
      return (
        (this.lineWidth = 0),
        (this.filling = !1),
        (this.clearDirty = this.dirty = !0),
        (this.graphicsData = []),
        (this.bounds = null),
        this
      );
    }),
    (e.Graphics.prototype.generateTexture = function () {
      var t = this.getBounds(),
        i = new e.CanvasBuffer(t.width, t.height),
        n = e.Texture.fromCanvas(i.canvas);
      return (
        i.context.translate(-t.x, -t.y),
        e.CanvasGraphics.renderGraphics(this, i.context),
        n
      );
    }),
    (e.Graphics.prototype._renderWebGL = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
        if (this._cacheAsBitmap)
          this.dirty &&
            (this._generateCachedSprite(),
            e.updateWebGLTexture(this._cachedSprite.texture.baseTexture, t.gl),
            (this.dirty = !1)),
            (this._cachedSprite.alpha = this.alpha),
            e.Sprite.prototype._renderWebGL.call(this._cachedSprite, t);
        else {
          if (
            (t.spriteBatch.stop(),
            this._mask && t.maskManager.pushMask(this.mask, t),
            this._filters && t.filterManager.pushFilter(this._filterBlock),
            this.blendMode !== t.spriteBatch.currentBlendMode)
          ) {
            t.spriteBatch.currentBlendMode = this.blendMode;
            var i = e.blendModesWebGL[t.spriteBatch.currentBlendMode];
            t.spriteBatch.gl.blendFunc(i[0], i[1]);
          }
          if ((e.WebGLGraphics.renderGraphics(this, t), this.children.length)) {
            t.spriteBatch.start();
            for (var i = 0, n = this.children.length; i < n; i++)
              this.children[i]._renderWebGL(t);
            t.spriteBatch.stop();
          }
          this._filters && t.filterManager.popFilter(),
            this._mask && t.maskManager.popMask(t),
            t.drawCount++,
            t.spriteBatch.start();
        }
      }
    }),
    (e.Graphics.prototype._renderCanvas = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
        var i = t.context,
          n = this.worldTransform;
        for (
          this.blendMode !== t.currentBlendMode &&
            ((t.currentBlendMode = this.blendMode),
            (i.globalCompositeOperation =
              e.blendModesCanvas[t.currentBlendMode])),
            i.setTransform(n.a, n.c, n.b, n.d, n.tx, n.ty),
            e.CanvasGraphics.renderGraphics(this, i),
            i = 0,
            n = this.children.length;
          i < n;
          i++
        )
          this.children[i]._renderCanvas(t);
      }
    }),
    (e.Graphics.prototype.getBounds = function (t) {
      this.bounds || this.updateBounds();
      var e = this.bounds.x,
        i = this.bounds.width + this.bounds.x,
        n = this.bounds.y,
        s = this.bounds.height + this.bounds.y,
        o = (t = t || this.worldTransform).a,
        h = t.c,
        l = t.b,
        u = t.d,
        d = t.tx,
        c = t.ty,
        p = o * i + l * s + d,
        f = u * s + h * i + c;
      t = o * e + l * s + d;
      var s = u * s + h * e + c,
        m = o * e + l * n + d,
        e = u * n + h * e + c,
        o = o * i + l * n + d,
        i = u * n + h * i + c,
        n = p,
        h = f,
        p = t < p ? t : p,
        p = m < p ? m : p,
        p = o < p ? o : p,
        f = s < f ? s : f,
        f = e < f ? e : f,
        f = i < f ? i : f,
        n = t > n ? t : n,
        n = m > n ? m : n,
        h = s > h ? s : h,
        h = e > h ? e : h;
      return (
        ((t = this._bounds).x = p),
        (t.width = (o > n ? o : n) - p),
        (t.y = f),
        (t.height = (i > h ? i : h) - f),
        t
      );
    }),
    (e.Graphics.prototype.updateBounds = function () {
      for (
        var t, i, n, s, o, h = 1 / 0, l = -1 / 0, u = 1 / 0, d = -1 / 0, c = 0;
        c < this.graphicsData.length;
        c++
      )
        if (
          ((i = (t = this.graphicsData[c]).type),
          (o = t.lineWidth),
          (t = t.points),
          i === e.Graphics.RECT)
        )
          (i = t[0] - o / 2),
            (n = t[1] - o / 2),
            (s = t[2] + o),
            (o = t[3] + o),
            (h = i < h ? i : h),
            (l = i + s > l ? i + s : l),
            (u = n < u ? i : u),
            (d = n + o > d ? n + o : d);
        else if (i === e.Graphics.CIRC || i === e.Graphics.ELIP)
          (i = t[0]),
            (n = t[1]),
            (s = t[2] + o / 2),
            (o = t[3] + o / 2),
            (h = i - s < h ? i - s : h),
            (l = i + s > l ? i + s : l),
            (u = n - o < u ? n - o : u),
            (d = n + o > d ? n + o : d);
        else
          for (s = 0; s < t.length; s += 2)
            (i = t[s]),
              (n = t[s + 1]),
              (h = i - o < h ? i - o : h),
              (l = i + o > l ? i + o : l),
              (u = n - o < u ? n - o : u),
              (d = n + o > d ? n + o : d);
      (c = this.boundsPadding),
        (this.bounds = new e.Rectangle(
          h - c,
          u - c,
          l - h + 2 * c,
          d - u + 2 * c
        ));
    }),
    (e.Graphics.prototype._generateCachedSprite = function () {
      var t = this.getLocalBounds();
      if (this._cachedSprite)
        this._cachedSprite.buffer.resize(t.width, t.height);
      else {
        var i = new e.CanvasBuffer(t.width, t.height),
          n = e.Texture.fromCanvas(i.canvas);
        (this._cachedSprite = new e.Sprite(n)),
          (this._cachedSprite.buffer = i),
          (this._cachedSprite.worldTransform = this.worldTransform);
      }
      (this._cachedSprite.anchor.x = -(t.x / t.width)),
        (this._cachedSprite.anchor.y = -(t.y / t.height)),
        this._cachedSprite.buffer.context.translate(-t.x, -t.y),
        e.CanvasGraphics.renderGraphics(
          this,
          this._cachedSprite.buffer.context
        ),
        (this._cachedSprite.alpha = this.alpha);
    }),
    (e.Graphics.prototype.destroyCachedSprite = function () {
      this._cachedSprite.texture.destroy(!0), (this._cachedSprite = null);
    }),
    (e.Graphics.POLY = 0),
    (e.Graphics.RECT = 1),
    (e.Graphics.CIRC = 2),
    (e.Graphics.ELIP = 3),
    (e.Strip = function (t, i, n) {
      e.Sprite.call(this, t),
        (this.width = i),
        (this.height = n),
        (this.texture = t),
        (this.blendMode = e.blendModes.NORMAL);
      try {
        (this.uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1])),
          (this.verticies = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0])),
          (this.colors = new Float32Array([1, 1, 1, 1])),
          (this.indices = new Uint16Array([0, 1, 2, 3]));
      } catch (s) {
        (this.uvs = [0, 1, 1, 1, 1, 0, 0, 1]),
          (this.verticies = [0, 0, 0, 0, 0, 0, 0, 0, 0]),
          (this.colors = [1, 1, 1, 1]),
          (this.indices = [0, 1, 2, 3]);
      }
      t.baseTexture.hasLoaded
        ? ((this.width = this.texture.frame.width),
          (this.height = this.texture.frame.height),
          (this.updateFrame = !0))
        : ((this.onTextureUpdateBind = this.onTextureUpdate.bind(this)),
          this.texture.addEventListener("update", this.onTextureUpdateBind)),
        (this.renderable = !0);
    }),
    (e.Strip.prototype = Object.create(e.Sprite.prototype)),
    (e.Strip.prototype.constructor = e.Strip),
    (e.Strip.prototype.onTextureUpdate = function () {
      this.updateFrame = !0;
    }),
    (e.Rope = function (t, i) {
      e.Strip.call(this, t), (this.points = i);
      try {
        (this.verticies = new Float32Array(4 * i.length)),
          (this.uvs = new Float32Array(4 * i.length)),
          (this.colors = new Float32Array(2 * i.length)),
          (this.indices = new Uint16Array(2 * i.length));
      } catch (n) {
        (this.verticies = Array(4 * i.length)),
          (this.uvs = Array(4 * i.length)),
          (this.colors = Array(2 * i.length)),
          (this.indices = Array(2 * i.length));
      }
      this.refresh();
    }),
    (e.Rope.prototype = Object.create(e.Strip.prototype)),
    (e.Rope.prototype.constructor = e.Rope),
    (e.Rope.prototype.refresh = function () {
      var t = this.points;
      if (!(1 > t.length)) {
        var e = this.uvs,
          i = this.indices,
          n = this.colors;
        (this.count -= 0.2),
          (e[0] = 0),
          (e[1] = 1),
          (e[2] = 0),
          (e[3] = 1),
          (n[0] = 1),
          (n[1] = 1),
          (i[0] = 0),
          (i[1] = 1);
        for (var s, o, t = t.length, h = 1; h < t; h++)
          (s = 4 * h),
            (o = h / (t - 1)),
            (e[s] = o),
            (e[s + 1] = 0),
            (e[s + 2] = o),
            (e[s + 3] = 1),
            (n[(s = 2 * h)] = 1),
            (n[s + 1] = 1),
            (i[(s = 2 * h)] = s),
            (i[s + 1] = s + 1);
      }
    }),
    (e.Rope.prototype.updateTransform = function () {
      var t = this.points;
      if (!(1 > t.length)) {
        var i,
          n = t[0],
          s = (i = 0);
        this.count -= 0.2;
        var o = this.verticies;
        (o[0] = n.x + i), (o[1] = n.y + s), (o[2] = n.x - i), (o[3] = n.y - s);
        for (var h, l, u, d = t.length, c = 1; c < d; c++)
          (h = t[c]),
            (l = 4 * c),
            (s = -((i = c < t.length - 1 ? t[c + 1] : h).x - n.x)),
            (n = Math.sqrt((i = i.y - n.y) * i + s * s)),
            (u = this.texture.height / 2),
            (i /= n),
            (s /= n),
            (i *= u),
            (s *= u),
            (o[l] = h.x + i),
            (o[l + 1] = h.y + s),
            (o[l + 2] = h.x - i),
            (o[l + 3] = h.y - s),
            (n = h);
        e.DisplayObjectContainer.prototype.updateTransform.call(this);
      }
    }),
    (e.Rope.prototype.setTexture = function (t) {
      (this.texture = t), (this.updateFrame = !0);
    }),
    (e.TilingSprite = function (t, i, n) {
      e.Sprite.call(this, t),
        (this.width = i || 100),
        (this.height = n || 100),
        (this.tileScale = new e.Point(1, 1)),
        (this.tileScaleOffset = new e.Point(1, 1)),
        (this.tilePosition = new e.Point(0, 0)),
        (this.renderable = !0),
        (this.tint = 16777215),
        (this.blendMode = e.blendModes.NORMAL);
    }),
    (e.TilingSprite.prototype = Object.create(e.Sprite.prototype)),
    (e.TilingSprite.prototype.constructor = e.TilingSprite),
    Object.defineProperty(e.TilingSprite.prototype, "width", {
      get: function () {
        return this._width;
      },
      set: function (t) {
        this._width = t;
      },
    }),
    Object.defineProperty(e.TilingSprite.prototype, "height", {
      get: function () {
        return this._height;
      },
      set: function (t) {
        this._height = t;
      },
    }),
    (e.TilingSprite.prototype.onTextureUpdate = function () {
      this.updateFrame = !0;
    }),
    (e.TilingSprite.prototype.setTexture = function (t) {
      this.texture !== t &&
        ((this.texture = t),
        (this.refreshTexture = !0),
        (this.cachedTint = 16777215));
    }),
    (e.TilingSprite.prototype._renderWebGL = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha) {
        var i, n;
        for (
          this.mask &&
            (t.spriteBatch.stop(),
            t.maskManager.pushMask(this.mask, t),
            t.spriteBatch.start()),
            this.filters &&
              (t.spriteBatch.flush(),
              t.filterManager.pushFilter(this._filterBlock)),
            !this.tilingTexture || this.refreshTexture
              ? (this.generateTilingTexture(!0),
                this.tilingTexture &&
                  this.tilingTexture.needsUpdate &&
                  (e.updateWebGLTexture(this.tilingTexture.baseTexture, t.gl),
                  (this.tilingTexture.needsUpdate = !1)))
              : t.spriteBatch.renderTilingSprite(this),
            i = 0,
            n = this.children.length;
          i < n;
          i++
        )
          this.children[i]._renderWebGL(t);
        t.spriteBatch.stop(),
          this.filters && t.filterManager.popFilter(),
          this.mask && t.maskManager.popMask(t),
          t.spriteBatch.start();
      }
    }),
    (e.TilingSprite.prototype._renderCanvas = function (t) {
      if (!1 !== this.visible && 0 !== this.alpha) {
        var i = t.context;
        this._mask && t.maskManager.pushMask(this._mask, i),
          (i.globalAlpha = this.worldAlpha);
        var n = this.worldTransform;
        if (
          (i.setTransform(n.a, n.c, n.b, n.d, n.tx, n.ty),
          !this.__tilePattern || this.refreshTexture)
        ) {
          if ((this.generateTilingTexture(!1), !this.tilingTexture)) return;
          this.__tilePattern = i.createPattern(
            this.tilingTexture.baseTexture.source,
            "repeat"
          );
        }
        this.blendMode !== t.currentBlendMode &&
          ((t.currentBlendMode = this.blendMode),
          (i.globalCompositeOperation =
            e.blendModesCanvas[t.currentBlendMode])),
          i.beginPath();
        var n = this.tilePosition,
          s = this.tileScale;
        (n.x %= this.tilingTexture.baseTexture.width),
          (n.y %= this.tilingTexture.baseTexture.height),
          i.scale(s.x, s.y),
          i.translate(n.x, n.y),
          (i.fillStyle = this.__tilePattern),
          i.fillRect(
            -n.x + -(this.anchor.x * this._width),
            -n.y + -(this.anchor.y * this._height),
            this._width / s.x,
            this._height / s.y
          ),
          i.scale(1 / s.x, 1 / s.y),
          i.translate(-n.x, -n.y),
          i.closePath(),
          this._mask && t.maskManager.popMask(t.context);
      }
    }),
    (e.TilingSprite.prototype.getBounds = function () {
      var t = this._width,
        e = this._height,
        i = t * (1 - this.anchor.x),
        n = -(t * this.anchor.x),
        s = e * (1 - this.anchor.y),
        o = -(e * this.anchor.y),
        e = this.worldTransform,
        h = e.a,
        l = e.c,
        u = e.b,
        d = e.d,
        c = e.tx,
        p = e.ty,
        e = h * n + u * o + c,
        t = d * o + l * n + p,
        f = h * i + u * o + c,
        o = d * o + l * i + p,
        m = h * i + u * s + c,
        i = d * s + l * i + p,
        h = h * n + u * s + c,
        n = d * s + l * n + p,
        l = (s = -1 / 0),
        u = (d = 1 / 0),
        d = e < d ? e : d,
        d = f < d ? f : d,
        d = m < d ? m : d,
        d = h < d ? h : d,
        u = t < u ? t : u,
        u = o < u ? o : u,
        u = i < u ? i : u,
        u = n < u ? n : u,
        s = e > s ? e : s,
        s = f > s ? f : s,
        s = m > s ? m : s,
        l = t > l ? t : l,
        l = o > l ? o : l,
        l = i > l ? i : l,
        e = this._bounds;
      return (
        (e.x = d),
        (e.width = (h > s ? h : s) - d),
        (e.y = u),
        (e.height = (n > l ? n : l) - u),
        (this._currentBounds = e)
      );
    }),
    (e.TilingSprite.prototype.generateTilingTexture = function (t) {
      var i = this.texture;
      if (i.baseTexture.hasLoaded) {
        var n,
          s,
          o = i.baseTexture,
          h = i.frame,
          o = h.width !== o.width || h.height !== o.height,
          l = !1;
        t
          ? ((n = e.getNextPowerOfTwo(h.width)),
            (s = e.getNextPowerOfTwo(h.height)),
            h.width !== n && h.height !== s && (l = !0))
          : o && ((n = h.width), (s = h.height), (l = !0)),
          l
            ? (this.tilingTexture && this.tilingTexture.isTiling
                ? ((t = this.tilingTexture.canvasBuffer).resize(n, s),
                  (this.tilingTexture.baseTexture.width = n),
                  (this.tilingTexture.baseTexture.height = s),
                  (this.tilingTexture.needsUpdate = !0))
                : ((t = new e.CanvasBuffer(n, s)),
                  (this.tilingTexture = e.Texture.fromCanvas(t.canvas)),
                  (this.tilingTexture.canvasBuffer = t),
                  (this.tilingTexture.isTiling = !0)),
              t.context.drawImage(
                i.baseTexture.source,
                h.x,
                h.y,
                h.width,
                h.height,
                0,
                0,
                n,
                s
              ),
              (this.tileScaleOffset.x = h.width / n),
              (this.tileScaleOffset.y = h.height / s))
            : (this.tilingTexture &&
                this.tilingTexture.isTiling &&
                this.tilingTexture.destroy(!0),
              (this.tileScaleOffset.x = 1),
              (this.tileScaleOffset.y = 1),
              (this.tilingTexture = i)),
          (this.refreshTexture = !1),
          (this.tilingTexture.baseTexture._powerOf2 = !0);
      }
    });
  var o = {
    BoneData: function (t, e) {
      (this.name = t), (this.parent = e);
    },
  };
  (o.BoneData.prototype = {
    length: 0,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  }),
    (o.SlotData = function (t, e) {
      (this.name = t), (this.boneData = e);
    }),
    (o.SlotData.prototype = { r: 1, g: 1, b: 1, a: 1, attachmentName: null }),
    (o.Bone = function (t, e) {
      (this.data = t), (this.parent = e), this.setToSetupPose();
    }),
    (o.Bone.yDown = !1),
    (o.Bone.prototype = {
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      m00: 0,
      m01: 0,
      worldX: 0,
      m10: 0,
      m11: 0,
      worldY: 0,
      worldRotation: 0,
      worldScaleX: 1,
      worldScaleY: 1,
      updateWorldTransform: function (t, e) {
        var i = this.parent;
        null != i
          ? ((this.worldX = this.x * i.m00 + this.y * i.m01 + i.worldX),
            (this.worldY = this.x * i.m10 + this.y * i.m11 + i.worldY),
            (this.worldScaleX = i.worldScaleX * this.scaleX),
            (this.worldScaleY = i.worldScaleY * this.scaleY),
            (this.worldRotation = i.worldRotation + this.rotation))
          : ((this.worldX = this.x),
            (this.worldY = this.y),
            (this.worldScaleX = this.scaleX),
            (this.worldScaleY = this.scaleY),
            (this.worldRotation = this.rotation));
        var n = (this.worldRotation * Math.PI) / 180,
          i = Math.cos(n),
          n = Math.sin(n);
        (this.m00 = i * this.worldScaleX),
          (this.m10 = n * this.worldScaleX),
          (this.m01 = -n * this.worldScaleY),
          (this.m11 = i * this.worldScaleY),
          t && ((this.m00 = -this.m00), (this.m01 = -this.m01)),
          e && ((this.m10 = -this.m10), (this.m11 = -this.m11)),
          o.Bone.yDown && ((this.m10 = -this.m10), (this.m11 = -this.m11));
      },
      setToSetupPose: function () {
        var t = this.data;
        (this.x = t.x),
          (this.y = t.y),
          (this.rotation = t.rotation),
          (this.scaleX = t.scaleX),
          (this.scaleY = t.scaleY);
      },
    }),
    (o.Slot = function (t, e, i) {
      (this.data = t),
        (this.skeleton = e),
        (this.bone = i),
        this.setToSetupPose();
    }),
    (o.Slot.prototype = {
      r: 1,
      g: 1,
      b: 1,
      a: 1,
      _attachmentTime: 0,
      attachment: null,
      setAttachment: function (t) {
        (this.attachment = t), (this._attachmentTime = this.skeleton.time);
      },
      setAttachmentTime: function (t) {
        this._attachmentTime = this.skeleton.time - t;
      },
      getAttachmentTime: function () {
        return this.skeleton.time - this._attachmentTime;
      },
      setToSetupPose: function () {
        var t = this.data;
        (this.r = t.r), (this.g = t.g), (this.b = t.b), (this.a = t.a);
        for (var e = this.skeleton.data.slots, i = 0, n = e.length; i < n; i++)
          if (e[i] == t) {
            this.setAttachment(
              t.attachmentName
                ? this.skeleton.getAttachmentBySlotIndex(i, t.attachmentName)
                : null
            );
            break;
          }
      },
    }),
    (o.Skin = function (t) {
      (this.name = t), (this.attachments = {});
    }),
    (o.Skin.prototype = {
      addAttachment: function (t, e, i) {
        this.attachments[t + ":" + e] = i;
      },
      getAttachment: function (t, e) {
        return this.attachments[t + ":" + e];
      },
      _attachAll: function (t, e) {
        for (var i in e.attachments) {
          var n = i.indexOf(":"),
            s = parseInt(i.substring(0, n), 10),
            o = i.substring(n + 1),
            n = t.slots[s];
          n.attachment &&
            n.attachment.name == o &&
            (s = this.getAttachment(s, o)) &&
            n.setAttachment(s);
        }
      },
    }),
    (o.Animation = function (t, e, i) {
      (this.name = t), (this.timelines = e), (this.duration = i);
    }),
    (o.Animation.prototype = {
      apply: function (t, e, i) {
        i && this.duration && (e %= this.duration), (i = this.timelines);
        for (var n = 0, s = i.length; n < s; n++) i[n].apply(t, e, 1);
      },
      mix: function (t, e, i, n) {
        i && this.duration && (e %= this.duration), (i = this.timelines);
        for (var s = 0, o = i.length; s < o; s++) i[s].apply(t, e, n);
      },
    }),
    (o.binarySearch = function (t, e, i) {
      var n = 0,
        s = Math.floor(t.length / i) - 2;
      if (!s) return i;
      for (var o = s >>> 1; ; ) {
        if ((t[(o + 1) * i] <= e ? (n = o + 1) : (s = o), n == s))
          return (n + 1) * i;
        o = (n + s) >>> 1;
      }
    }),
    (o.linearSearch = function (t, e, i) {
      for (var n = 0, s = t.length - i; n <= s; n += i) if (t[n] > e) return n;
      return -1;
    }),
    (o.Curves = function (t) {
      (this.curves = []), (this.curves.length = 6 * (t - 1));
    }),
    (o.Curves.prototype = {
      setLinear: function (t) {
        this.curves[6 * t] = 0;
      },
      setStepped: function (t) {
        this.curves[6 * t] = -1;
      },
      setCurve: function (t, e, i, n, s) {
        var o = 0.1 * 0.1,
          h = 0.1 * o,
          l = 3 * 0.1,
          u = 3 * o,
          o = 6 * o,
          d = 6 * h,
          c = -(2 * e) + n,
          p = -(2 * i) + s;
        (n = 3 * (e - n) + 1), (s = 3 * (i - s) + 1), (t *= 6);
        var f = this.curves;
        (f[t] = e * l + c * u + n * h),
          (f[t + 1] = i * l + p * u + s * h),
          (f[t + 2] = c * o + n * d),
          (f[t + 3] = p * o + s * d),
          (f[t + 4] = n * d),
          (f[t + 5] = s * d);
      },
      getCurvePercent: function (t, e) {
        e = 0 > e ? 0 : 1 < e ? 1 : e;
        var i = 6 * t,
          n = this.curves,
          s = n[i];
        if (!s) return e;
        if (-1 == s) return 0;
        for (
          var o = n[i + 1],
            h = n[i + 2],
            l = n[i + 3],
            u = n[i + 4],
            d = n[i + 5],
            i = s,
            n = o,
            c = 8;
          ;

        ) {
          if (i >= e)
            return (s = i - s), (o = n - o) + ((n - o) * (e - s)) / (i - s);
          if (!c) break;
          c--, (s += h), (o += l), (h += u), (l += d), (i += s), (n += o);
        }
        return n + ((1 - n) * (e - i)) / (1 - i);
      },
    }),
    (o.RotateTimeline = function (t) {
      (this.curves = new o.Curves(t)),
        (this.frames = []),
        (this.frames.length = 2 * t);
    }),
    (o.RotateTimeline.prototype = {
      boneIndex: 0,
      getFrameCount: function () {
        return this.frames.length / 2;
      },
      setFrame: function (t, e, i) {
        (t *= 2), (this.frames[t] = e), (this.frames[t + 1] = i);
      },
      apply: function (t, e, i) {
        var n = this.frames;
        if (!(e < n[0])) {
          if (((t = t.bones[this.boneIndex]), e >= n[n.length - 2]))
            n = t.data.rotation + n[n.length - 1] - t.rotation;
          else {
            var s = o.binarySearch(n, e, 2),
              h = n[s - 1],
              l = n[s];
            for (
              e = 1 - (e - l) / (n[s - 2] - l),
                e = this.curves.getCurvePercent(s / 2 - 1, e),
                n = n[s + 1] - h;
              180 < n;

            )
              n -= 360;
            for (; -180 > n; ) n += 360;
            n = t.data.rotation + (h + n * e) - t.rotation;
          }
          for (; 180 < n; ) n -= 360;
          for (; -180 > n; ) n += 360;
          t.rotation += n * i;
        }
      },
    }),
    (o.TranslateTimeline = function (t) {
      (this.curves = new o.Curves(t)),
        (this.frames = []),
        (this.frames.length = 3 * t);
    }),
    (o.TranslateTimeline.prototype = {
      boneIndex: 0,
      getFrameCount: function () {
        return this.frames.length / 3;
      },
      setFrame: function (t, e, i, n) {
        (t *= 3),
          (this.frames[t] = e),
          (this.frames[t + 1] = i),
          (this.frames[t + 2] = n);
      },
      apply: function (t, e, i) {
        var n = this.frames;
        if (!(e < n[0])) {
          if (((t = t.bones[this.boneIndex]), e >= n[n.length - 3]))
            (t.x += (t.data.x + n[n.length - 2] - t.x) * i),
              (t.y += (t.data.y + n[n.length - 1] - t.y) * i);
          else {
            var s = o.binarySearch(n, e, 3),
              h = n[s - 2],
              l = n[s - 1],
              u = n[s];
            (e = 1 - (e - u) / (n[s + -3] - u)),
              (e = this.curves.getCurvePercent(s / 3 - 1, e)),
              (t.x += (t.data.x + h + (n[s + 1] - h) * e - t.x) * i),
              (t.y += (t.data.y + l + (n[s + 2] - l) * e - t.y) * i);
          }
        }
      },
    }),
    (o.ScaleTimeline = function (t) {
      (this.curves = new o.Curves(t)),
        (this.frames = []),
        (this.frames.length = 3 * t);
    }),
    (o.ScaleTimeline.prototype = {
      boneIndex: 0,
      getFrameCount: function () {
        return this.frames.length / 3;
      },
      setFrame: function (t, e, i, n) {
        (t *= 3),
          (this.frames[t] = e),
          (this.frames[t + 1] = i),
          (this.frames[t + 2] = n);
      },
      apply: function (t, e, i) {
        var n = this.frames;
        if (!(e < n[0])) {
          if (((t = t.bones[this.boneIndex]), e >= n[n.length - 3]))
            (t.scaleX += (t.data.scaleX - 1 + n[n.length - 2] - t.scaleX) * i),
              (t.scaleY +=
                (t.data.scaleY - 1 + n[n.length - 1] - t.scaleY) * i);
          else {
            var s = o.binarySearch(n, e, 3),
              h = n[s - 2],
              l = n[s - 1],
              u = n[s];
            (e = 1 - (e - u) / (n[s + -3] - u)),
              (e = this.curves.getCurvePercent(s / 3 - 1, e)),
              (t.scaleX +=
                (t.data.scaleX - 1 + h + (n[s + 1] - h) * e - t.scaleX) * i),
              (t.scaleY +=
                (t.data.scaleY - 1 + l + (n[s + 2] - l) * e - t.scaleY) * i);
          }
        }
      },
    }),
    (o.ColorTimeline = function (t) {
      (this.curves = new o.Curves(t)),
        (this.frames = []),
        (this.frames.length = 5 * t);
    }),
    (o.ColorTimeline.prototype = {
      slotIndex: 0,
      getFrameCount: function () {
        return this.frames.length / 2;
      },
      setFrame: function (t, e, i, n) {
        (t *= 5),
          (this.frames[t] = e),
          (this.frames[t + 1] = r),
          (this.frames[t + 2] = g),
          (this.frames[t + 3] = b),
          (this.frames[t + 4] = a);
      },
      apply: function (t, e, i) {
        var n = this.frames;
        if (!(e < n[0])) {
          if (((t = t.slots[this.slotIndex]), e >= n[n.length - 5]))
            (i = n.length - 1),
              (t.r = n[i - 3]),
              (t.g = n[i - 2]),
              (t.b = n[i - 1]),
              (t.a = n[i]);
          else {
            var s = o.binarySearch(n, e, 5),
              h = n[s - 4],
              l = n[s - 3],
              u = n[s - 2],
              d = n[s - 1],
              c = n[s];
            (e = 1 - (e - c) / (n[s - 5] - c)),
              (e = this.curves.getCurvePercent(s / 5 - 1, e)),
              (h += (n[s + 1] - h) * e),
              (l += (n[s + 2] - l) * e),
              (u += (n[s + 3] - u) * e),
              (n = d + (n[s + 4] - d) * e),
              1 > i
                ? ((t.r += (h - t.r) * i),
                  (t.g += (l - t.g) * i),
                  (t.b += (u - t.b) * i),
                  (t.a += (n - t.a) * i))
                : ((t.r = h), (t.g = l), (t.b = u), (t.a = n));
          }
        }
      },
    }),
    (o.AttachmentTimeline = function (t) {
      (this.curves = new o.Curves(t)),
        (this.frames = []),
        (this.frames.length = t),
        (this.attachmentNames = []),
        (this.attachmentNames.length = t);
    }),
    (o.AttachmentTimeline.prototype = {
      slotIndex: 0,
      getFrameCount: function () {
        return this.frames.length;
      },
      setFrame: function (t, e, i) {
        (this.frames[t] = e), (this.attachmentNames[t] = i);
      },
      apply: function (t, e, i) {
        e < (i = this.frames)[0] ||
          ((e =
            e >= i[i.length - 1] ? i.length - 1 : o.binarySearch(i, e, 1) - 1),
          (e = this.attachmentNames[e]),
          t.slots[this.slotIndex].setAttachment(
            e ? t.getAttachmentBySlotIndex(this.slotIndex, e) : null
          ));
      },
    }),
    (o.SkeletonData = function () {
      (this.bones = []),
        (this.slots = []),
        (this.skins = []),
        (this.animations = []);
    }),
    (o.SkeletonData.prototype = {
      defaultSkin: null,
      findBone: function (t) {
        for (var e = this.bones, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return e[i];
        return null;
      },
      findBoneIndex: function (t) {
        for (var e = this.bones, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return i;
        return -1;
      },
      findSlot: function (t) {
        for (var e = this.slots, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return slot[i];
        return null;
      },
      findSlotIndex: function (t) {
        for (var e = this.slots, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return i;
        return -1;
      },
      findSkin: function (t) {
        for (var e = this.skins, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return e[i];
        return null;
      },
      findAnimation: function (t) {
        for (var e = this.animations, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return e[i];
        return null;
      },
    }),
    (o.Skeleton = function (t) {
      (this.data = t), (this.bones = []);
      for (var e = 0, i = t.bones.length; e < i; e++) {
        var n = t.bones[e],
          s = n.parent ? this.bones[t.bones.indexOf(n.parent)] : null;
        this.bones.push(new o.Bone(n, s));
      }
      for (
        this.slots = [], this.drawOrder = [], e = 0, i = t.slots.length;
        e < i;
        e++
      )
        (n = t.slots[e]),
          (s = this.bones[t.bones.indexOf(n.boneData)]),
          (n = new o.Slot(n, this, s)),
          this.slots.push(n),
          this.drawOrder.push(n);
    }),
    (o.Skeleton.prototype = {
      x: 0,
      y: 0,
      skin: null,
      r: 1,
      g: 1,
      b: 1,
      a: 1,
      time: 0,
      flipX: !1,
      flipY: !1,
      updateWorldTransform: function () {
        for (
          var t = this.flipX,
            e = this.flipY,
            i = this.bones,
            n = 0,
            s = i.length;
          n < s;
          n++
        )
          i[n].updateWorldTransform(t, e);
      },
      setToSetupPose: function () {
        this.setBonesToSetupPose(), this.setSlotsToSetupPose();
      },
      setBonesToSetupPose: function () {
        for (var t = this.bones, e = 0, i = t.length; e < i; e++)
          t[e].setToSetupPose();
      },
      setSlotsToSetupPose: function () {
        for (var t = this.slots, e = 0, i = t.length; e < i; e++)
          t[e].setToSetupPose(e);
      },
      getRootBone: function () {
        return this.bones.length ? this.bones[0] : null;
      },
      findBone: function (t) {
        for (var e = this.bones, i = 0, n = e.length; i < n; i++)
          if (e[i].data.name == t) return e[i];
        return null;
      },
      findBoneIndex: function (t) {
        for (var e = this.bones, i = 0, n = e.length; i < n; i++)
          if (e[i].data.name == t) return i;
        return -1;
      },
      findSlot: function (t) {
        for (var e = this.slots, i = 0, n = e.length; i < n; i++)
          if (e[i].data.name == t) return e[i];
        return null;
      },
      findSlotIndex: function (t) {
        for (var e = this.slots, i = 0, n = e.length; i < n; i++)
          if (e[i].data.name == t) return i;
        return -1;
      },
      setSkinByName: function (t) {
        var e = this.data.findSkin(t);
        if (!e) throw "Skin not found: " + t;
        this.setSkin(e);
      },
      setSkin: function (t) {
        this.skin && t && t._attachAll(this, this.skin), (this.skin = t);
      },
      getAttachmentBySlotName: function (t, e) {
        return this.getAttachmentBySlotIndex(this.data.findSlotIndex(t), e);
      },
      getAttachmentBySlotIndex: function (t, e) {
        if (this.skin) {
          var i = this.skin.getAttachment(t, e);
          if (i) return i;
        }
        return this.data.defaultSkin
          ? this.data.defaultSkin.getAttachment(t, e)
          : null;
      },
      setAttachment: function (t, e) {
        for (var i = this.slots, n = 0, s = i.size; n < s; n++) {
          var o = i[n];
          if (o.data.name == t) {
            if (((i = null), e && null == (i = this.getAttachment(n, e))))
              throw "Attachment not found: " + e + ", for slot: " + t;
            o.setAttachment(i);
            return;
          }
        }
        throw "Slot not found: " + t;
      },
      update: function (t) {
        time += t;
      },
    }),
    (o.AttachmentType = { region: 0 }),
    (o.RegionAttachment = function () {
      (this.offset = []),
        (this.offset.length = 8),
        (this.uvs = []),
        (this.uvs.length = 8);
    }),
    (o.RegionAttachment.prototype = {
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      height: 0,
      rendererObject: null,
      regionOffsetX: 0,
      regionOffsetY: 0,
      regionWidth: 0,
      regionHeight: 0,
      regionOriginalWidth: 0,
      regionOriginalHeight: 0,
      setUVs: function (t, e, i, n, s) {
        var o = this.uvs;
        s
          ? ((o[2] = t),
            (o[3] = n),
            (o[4] = t),
            (o[5] = e),
            (o[6] = i),
            (o[7] = e),
            (o[0] = i),
            (o[1] = n))
          : ((o[0] = t),
            (o[1] = n),
            (o[2] = t),
            (o[3] = e),
            (o[4] = i),
            (o[5] = e),
            (o[6] = i),
            (o[7] = n));
      },
      updateOffset: function () {
        var t = (this.width / this.regionOriginalWidth) * this.scaleX,
          e = (this.height / this.regionOriginalHeight) * this.scaleY,
          i = (-this.width / 2) * this.scaleX + this.regionOffsetX * t,
          n = (-this.height / 2) * this.scaleY + this.regionOffsetY * e,
          s = i + this.regionWidth * t,
          t = n + this.regionHeight * e,
          e = (this.rotation * Math.PI) / 180,
          o = Math.cos(e),
          h = Math.sin(e),
          e = i * o + this.x,
          i = i * h,
          l = n * o + this.y,
          n = n * h,
          u = s * o + this.x,
          s = s * h,
          o = t * o + this.y,
          t = t * h,
          h = this.offset;
        (h[0] = e - n),
          (h[1] = l + i),
          (h[2] = e - t),
          (h[3] = o + i),
          (h[4] = u - t),
          (h[5] = o + s),
          (h[6] = u - n),
          (h[7] = l + s);
      },
      computeVertices: function (t, e, i, n) {
        (t += i.worldX), (e += i.worldY);
        var s = i.m00,
          o = i.m01,
          h = i.m10;
        i = i.m11;
        var l = this.offset;
        (n[0] = l[0] * s + l[1] * o + t),
          (n[1] = l[0] * h + l[1] * i + e),
          (n[2] = l[2] * s + l[3] * o + t),
          (n[3] = l[2] * h + l[3] * i + e),
          (n[4] = l[4] * s + l[5] * o + t),
          (n[5] = l[4] * h + l[5] * i + e),
          (n[6] = l[6] * s + l[7] * o + t),
          (n[7] = l[6] * h + l[7] * i + e);
      },
    }),
    (o.AnimationStateData = function (t) {
      (this.skeletonData = t), (this.animationToMixTime = {});
    }),
    (o.AnimationStateData.prototype = {
      defaultMix: 0,
      setMixByName: function (t, e, i) {
        var n = this.skeletonData.findAnimation(t);
        if (!n) throw "Animation not found: " + t;
        if (!(t = this.skeletonData.findAnimation(e)))
          throw "Animation not found: " + e;
        this.setMix(n, t, i);
      },
      setMix: function (t, e, i) {
        this.animationToMixTime[t.name + ":" + e.name] = i;
      },
      getMix: function (t, e) {
        var i;
        return (
          this.animationToMixTime[t.name + ":" + e.name] || this.defaultMix
        );
      },
    }),
    (o.AnimationState = function (t) {
      (this.data = t), (this.queue = []);
    }),
    (o.AnimationState.prototype = {
      current: null,
      previous: null,
      currentTime: 0,
      previousTime: 0,
      currentLoop: !1,
      previousLoop: !1,
      mixTime: 0,
      mixDuration: 0,
      update: function (t) {
        (this.currentTime += t),
          (this.previousTime += t),
          (this.mixTime += t),
          0 < this.queue.length &&
            ((t = this.queue[0]),
            this.currentTime >= t.delay &&
              (this._setAnimation(t.animation, t.loop), this.queue.shift()));
      },
      apply: function (t) {
        if (this.current) {
          if (this.previous) {
            this.previous.apply(t, this.previousTime, this.previousLoop);
            var e = this.mixTime / this.mixDuration;
            1 <= e && ((e = 1), (this.previous = null)),
              this.current.mix(t, this.currentTime, this.currentLoop, e);
          } else this.current.apply(t, this.currentTime, this.currentLoop);
        }
      },
      clearAnimation: function () {
        (this.current = this.previous = null), (this.queue.length = 0);
      },
      _setAnimation: function (t, e) {
        (this.previous = null),
          t &&
            this.current &&
            ((this.mixDuration = this.data.getMix(this.current, t)),
            0 < this.mixDuration &&
              ((this.mixTime = 0),
              (this.previous = this.current),
              (this.previousTime = this.currentTime),
              (this.previousLoop = this.currentLoop))),
          (this.current = t),
          (this.currentLoop = e),
          (this.currentTime = 0);
      },
      setAnimationByName: function (t, e) {
        var i = this.data.skeletonData.findAnimation(t);
        if (!i) throw "Animation not found: " + t;
        this.setAnimation(i, e);
      },
      setAnimation: function (t, e) {
        (this.queue.length = 0), this._setAnimation(t, e);
      },
      addAnimationByName: function (t, e, i) {
        var n = this.data.skeletonData.findAnimation(t);
        if (!n) throw "Animation not found: " + t;
        this.addAnimation(n, e, i);
      },
      addAnimation: function (t, e, i) {
        var n = {};
        (n.animation = t),
          (n.loop = e),
          (!i || 0 >= i) &&
            (i =
              null !=
              (e = this.queue.length
                ? this.queue[this.queue.length - 1].animation
                : this.current)
                ? e.duration - this.data.getMix(e, t) + (i || 0)
                : 0),
          (n.delay = i),
          this.queue.push(n);
      },
      isComplete: function () {
        return !this.current || this.currentTime >= this.current.duration;
      },
    }),
    (o.SkeletonJson = function (t) {
      this.attachmentLoader = t;
    }),
    (o.SkeletonJson.prototype = {
      scale: 1,
      readSkeletonData: function (t) {
        for (
          var e, i = new o.SkeletonData(), n = t.bones, s = 0, h = n.length;
          s < h;
          s++
        ) {
          var l = n[s];
          if (((e = null), l.parent && !(e = i.findBone(l.parent))))
            throw "Parent bone not found: " + l.parent;
          ((e = new o.BoneData(l.name, e)).length =
            (l.length || 0) * this.scale),
            (e.x = (l.x || 0) * this.scale),
            (e.y = (l.y || 0) * this.scale),
            (e.rotation = l.rotation || 0),
            (e.scaleX = l.scaleX || 1),
            (e.scaleY = l.scaleY || 1),
            i.bones.push(e);
        }
        for (n = t.slots, s = 0, h = n.length; s < h; s++) {
          if (((l = n[s]), !(e = i.findBone(l.bone))))
            throw "Slot bone not found: " + l.bone;
          e = new o.SlotData(l.name, e);
          var u = l.color;
          u &&
            ((e.r = o.SkeletonJson.toColor(u, 0)),
            (e.g = o.SkeletonJson.toColor(u, 1)),
            (e.b = o.SkeletonJson.toColor(u, 2)),
            (e.a = o.SkeletonJson.toColor(u, 3))),
            (e.attachmentName = l.attachment),
            i.slots.push(e);
        }
        var d,
          s = t.skins;
        for (d in s)
          if (s.hasOwnProperty(d)) {
            for (var c in ((h = s[d]), (e = new o.Skin(d)), h))
              if (h.hasOwnProperty(c)) {
                var p,
                  n = i.findSlotIndex(c),
                  l = h[c];
                for (p in l)
                  l.hasOwnProperty(p) &&
                    null != (u = this.readAttachment(e, p, l[p])) &&
                    e.addAttachment(n, p, u);
              }
            i.skins.push(e), "default" == e.name && (i.defaultSkin = e);
          }
        for (var f in (t = t.animations))
          t.hasOwnProperty(f) && this.readAnimation(f, t[f], i);
        return i;
      },
      readAttachment: function (t, e, i) {
        if (
          ((e = i.name || e),
          (t = o.AttachmentType[i.type || "region"]) == o.AttachmentType.region)
        )
          return (
            ((t = new o.RegionAttachment()).x = (i.x || 0) * this.scale),
            (t.y = (i.y || 0) * this.scale),
            (t.scaleX = i.scaleX || 1),
            (t.scaleY = i.scaleY || 1),
            (t.rotation = i.rotation || 0),
            (t.width = (i.width || 32) * this.scale),
            (t.height = (i.height || 32) * this.scale),
            t.updateOffset(),
            (t.rendererObject = {}),
            (t.rendererObject.name = e),
            (t.rendererObject.scale = {}),
            (t.rendererObject.scale.x = t.scaleX),
            (t.rendererObject.scale.y = t.scaleY),
            (t.rendererObject.rotation = (-t.rotation * Math.PI) / 180),
            t
          );
        throw "Unknown attachment type: " + t;
      },
      readAnimation: function (t, e, i) {
        var n,
          s,
          h,
          l,
          u,
          d,
          c,
          p,
          f = [],
          m = 0,
          v = e.bones;
        for (p in v)
          if (v.hasOwnProperty(p)) {
            var y = i.findBoneIndex(p);
            if (-1 == y) throw "Bone not found: " + p;
            var x = v[p];
            for (h in x)
              if (x.hasOwnProperty(h)) {
                if (((u = x[h]), "rotate" == h)) {
                  for (
                    (s = new o.RotateTimeline(u.length)).boneIndex = y,
                      d = n = 0,
                      c = u.length;
                    d < c;
                    d++
                  )
                    (l = u[d]),
                      s.setFrame(n, l.time, l.angle),
                      o.SkeletonJson.readCurve(s, n, l),
                      n++;
                  f.push(s),
                    (m = Math.max(m, s.frames[2 * s.getFrameCount() - 2]));
                } else if ("translate" == h || "scale" == h) {
                  var $ = 1;
                  for (
                    "scale" == h
                      ? (s = new o.ScaleTimeline(u.length))
                      : ((s = new o.TranslateTimeline(u.length)),
                        ($ = this.scale)),
                      s.boneIndex = y,
                      d = n = 0,
                      c = u.length;
                    d < c;
                    d++
                  )
                    (l = u[d]),
                      s.setFrame(n, l.time, (l.x || 0) * $, (l.y || 0) * $),
                      o.SkeletonJson.readCurve(s, n, l),
                      n++;
                  f.push(s),
                    (m = Math.max(m, s.frames[3 * s.getFrameCount() - 3]));
                } else
                  throw (
                    "Invalid timeline type for a bone: " + h + " (" + p + ")"
                  );
              }
          }
        for (var T in (e = e.slots))
          if (e.hasOwnProperty(T)) {
            for (h in ((v = e[T]), (p = i.findSlotIndex(T)), v))
              if (v.hasOwnProperty(h)) {
                if (((u = v[h]), "color" == h)) {
                  for (
                    (s = new o.ColorTimeline(u.length)).slotIndex = p,
                      d = n = 0,
                      c = u.length;
                    d < c;
                    d++
                  ) {
                    var _ = (l = u[d]).color,
                      y = o.SkeletonJson.toColor(_, 0),
                      x = o.SkeletonJson.toColor(_, 1),
                      $ = o.SkeletonJson.toColor(_, 2),
                      _ = o.SkeletonJson.toColor(_, 3);
                    s.setFrame(n, l.time, y, x, $, _),
                      o.SkeletonJson.readCurve(s, n, l),
                      n++;
                  }
                  f.push(s),
                    (m = Math.max(m, s.frames[5 * s.getFrameCount() - 5]));
                } else if ("attachment" == h) {
                  for (
                    (s = new o.AttachmentTimeline(u.length)).slotIndex = p,
                      d = n = 0,
                      c = u.length;
                    d < c;
                    d++
                  )
                    (l = u[d]), s.setFrame(n++, l.time, l.name);
                  f.push(s), (m = Math.max(m, s.frames[s.getFrameCount() - 1]));
                } else
                  throw (
                    "Invalid timeline type for a slot: " + h + " (" + T + ")"
                  );
              }
          }
        i.animations.push(new o.Animation(t, f, m));
      },
    }),
    (o.SkeletonJson.readCurve = function (t, e, i) {
      (i = i.curve) &&
        ("stepped" == i
          ? t.curves.setStepped(e)
          : i instanceof Array && t.curves.setCurve(e, i[0], i[1], i[2], i[3]));
    }),
    (o.SkeletonJson.toColor = function (t, e) {
      if (8 != t.length)
        throw "Color hexidecimal length must be 8, recieved: " + t;
      return parseInt(t.substring(2 * e, 2), 16) / 255;
    }),
    (o.Atlas = function (t, e) {
      (this.textureLoader = e), (this.pages = []), (this.regions = []);
      var i = new o.AtlasReader(t),
        n = [];
      n.length = 4;
      for (var s = null; ; ) {
        var h = i.readLine();
        if (null == h) break;
        if ((h = i.trim(h)).length) {
          if (s) {
            var l = new o.AtlasRegion();
            (l.name = h),
              (l.page = s),
              (l.rotate = "true" == i.readValue()),
              i.readTuple(n);
            var h = parseInt(n[0], 10),
              u = parseInt(n[1], 10);
            i.readTuple(n);
            var d = parseInt(n[0], 10),
              c = parseInt(n[1], 10);
            (l.u = h / s.width),
              (l.v = u / s.height),
              l.rotate
                ? ((l.u2 = (h + c) / s.width), (l.v2 = (u + d) / s.height))
                : ((l.u2 = (h + d) / s.width), (l.v2 = (u + c) / s.height)),
              (l.x = h),
              (l.y = u),
              (l.width = Math.abs(d)),
              (l.height = Math.abs(c)),
              4 == i.readTuple(n) &&
                ((l.splits = [
                  parseInt(n[0], 10),
                  parseInt(n[1], 10),
                  parseInt(n[2], 10),
                  parseInt(n[3], 10),
                ]),
                4 == i.readTuple(n) &&
                  ((l.pads = [
                    parseInt(n[0], 10),
                    parseInt(n[1], 10),
                    parseInt(n[2], 10),
                    parseInt(n[3], 10),
                  ]),
                  i.readTuple(n))),
              (l.originalWidth = parseInt(n[0], 10)),
              (l.originalHeight = parseInt(n[1], 10)),
              i.readTuple(n),
              (l.offsetX = parseInt(n[0], 10)),
              (l.offsetY = parseInt(n[1], 10)),
              (l.index = parseInt(i.readValue(), 10)),
              this.regions.push(l);
          } else
            ((s = new o.AtlasPage()).name = h),
              (s.format = o.Atlas.Format[i.readValue()]),
              i.readTuple(n),
              (s.minFilter = o.Atlas.TextureFilter[n[0]]),
              (s.magFilter = o.Atlas.TextureFilter[n[1]]),
              (l = i.readValue()),
              (s.uWrap = o.Atlas.TextureWrap.clampToEdge),
              (s.vWrap = o.Atlas.TextureWrap.clampToEdge),
              "x" == l
                ? (s.uWrap = o.Atlas.TextureWrap.repeat)
                : "y" == l
                ? (s.vWrap = o.Atlas.TextureWrap.repeat)
                : "xy" == l && (s.uWrap = s.vWrap = o.Atlas.TextureWrap.repeat),
              e.load(s, h),
              this.pages.push(s);
        } else s = null;
      }
    }),
    (o.Atlas.prototype = {
      findRegion: function (t) {
        for (var e = this.regions, i = 0, n = e.length; i < n; i++)
          if (e[i].name == t) return e[i];
        return null;
      },
      dispose: function () {
        for (var t = this.pages, e = 0, i = t.length; e < i; e++)
          this.textureLoader.unload(t[e].rendererObject);
      },
      updateUVs: function (t) {
        for (var e = this.regions, i = 0, n = e.length; i < n; i++) {
          var s = e[i];
          s.page == t &&
            ((s.u = s.x / t.width),
            (s.v = s.y / t.height),
            s.rotate
              ? ((s.u2 = (s.x + s.height) / t.width),
                (s.v2 = (s.y + s.width) / t.height))
              : ((s.u2 = (s.x + s.width) / t.width),
                (s.v2 = (s.y + s.height) / t.height)));
        }
      },
    }),
    (o.Atlas.Format = {
      alpha: 0,
      intensity: 1,
      luminanceAlpha: 2,
      rgb565: 3,
      rgba4444: 4,
      rgb888: 5,
      rgba8888: 6,
    }),
    (o.Atlas.TextureFilter = {
      nearest: 0,
      linear: 1,
      mipMap: 2,
      mipMapNearestNearest: 3,
      mipMapLinearNearest: 4,
      mipMapNearestLinear: 5,
      mipMapLinearLinear: 6,
    }),
    (o.Atlas.TextureWrap = { mirroredRepeat: 0, clampToEdge: 1, repeat: 2 }),
    (o.AtlasPage = function () {}),
    (o.AtlasPage.prototype = {
      name: null,
      format: null,
      minFilter: null,
      magFilter: null,
      uWrap: null,
      vWrap: null,
      rendererObject: null,
      width: 0,
      height: 0,
    }),
    (o.AtlasRegion = function () {}),
    (o.AtlasRegion.prototype = {
      page: null,
      name: null,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      u: 0,
      v: 0,
      u2: 0,
      v2: 0,
      offsetX: 0,
      offsetY: 0,
      originalWidth: 0,
      originalHeight: 0,
      index: 0,
      rotate: !1,
      splits: null,
      pads: null,
    }),
    (o.AtlasReader = function (t) {
      this.lines = t.split(/\r\n|\r|\n/);
    }),
    (o.AtlasReader.prototype = {
      index: 0,
      trim: function (t) {
        return t.replace(/^\s+|\s+$/g, "");
      },
      readLine: function () {
        return this.index >= this.lines.length
          ? null
          : this.lines[this.index++];
      },
      readValue: function () {
        var t = this.readLine(),
          e = t.indexOf(":");
        if (-1 == e) throw "Invalid line: " + t;
        return this.trim(t.substring(e + 1));
      },
      readTuple: function (t) {
        var e = this.readLine(),
          i = e.indexOf(":");
        if (-1 == i) throw "Invalid line: " + e;
        for (var n = 0, i = i + 1; 3 > n; n++) {
          var s = e.indexOf(",", i);
          if (-1 == s) {
            if (!n) throw "Invalid line: " + e;
            break;
          }
          (t[n] = this.trim(e.substr(i, s - i))), (i = s + 1);
        }
        return (t[n] = this.trim(e.substring(i))), n + 1;
      },
    }),
    (o.AtlasAttachmentLoader = function (t) {
      this.atlas = t;
    }),
    (o.AtlasAttachmentLoader.prototype = {
      newAttachment: function (t, e, i) {
        if (e === o.AttachmentType.region) {
          if (!(t = this.atlas.findRegion(i)))
            throw "Region not found in atlas: " + i + " (" + e + ")";
          return (
            ((e = new o.RegionAttachment(i)).rendererObject = t),
            e.setUVs(t.u, t.v, t.u2, t.v2, t.rotate),
            (e.regionOffsetX = t.offsetX),
            (e.regionOffsetY = t.offsetY),
            (e.regionWidth = t.width),
            (e.regionHeight = t.height),
            (e.regionOriginalWidth = t.originalWidth),
            (e.regionOriginalHeight = t.originalHeight),
            e
          );
        }
        throw "Unknown attachment type: " + e;
      },
    }),
    (o.Bone.yDown = !0),
    (e.AnimCache = {}),
    (e.Spine = function (t) {
      if (
        (e.DisplayObjectContainer.call(this),
        (this.spineData = e.AnimCache[t]),
        !this.spineData)
      )
        throw Error(
          "Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " +
            t
        );
      (this.skeleton = new o.Skeleton(this.spineData)),
        this.skeleton.updateWorldTransform(),
        (this.stateData = new o.AnimationStateData(this.spineData)),
        (this.state = new o.AnimationState(this.stateData)),
        (this.slotContainers = []),
        (t = 0);
      for (var i = this.skeleton.drawOrder.length; t < i; t++) {
        var n = this.skeleton.drawOrder[t],
          s = n.attachment,
          h = new e.DisplayObjectContainer();
        if (
          (this.slotContainers.push(h),
          this.addChild(h),
          s instanceof o.RegionAttachment)
        ) {
          var l = s.rendererObject.name,
            s = this.createSprite(n, s.rendererObject);
          (n.currentSprite = s), (n.currentSpriteName = l), h.addChild(s);
        }
      }
    }),
    (e.Spine.prototype = Object.create(e.DisplayObjectContainer.prototype)),
    (e.Spine.prototype.constructor = e.Spine),
    (e.Spine.prototype.updateTransform = function () {
      this.lastTime = this.lastTime || Date.now();
      var t = 0.001 * (Date.now() - this.lastTime);
      (this.lastTime = Date.now()),
        this.state.update(t),
        this.state.apply(this.skeleton),
        this.skeleton.updateWorldTransform();
      for (var t = this.skeleton.drawOrder, i = 0, n = t.length; i < n; i++) {
        var s = t[i],
          h = s.attachment,
          l = this.slotContainers[i];
        if (h instanceof o.RegionAttachment) {
          if (
            h.rendererObject &&
            (!s.currentSpriteName || s.currentSpriteName != h.name)
          ) {
            var u = h.rendererObject.name;
            if (
              (void 0 !== s.currentSprite && (s.currentSprite.visible = !1),
              (s.sprites = s.sprites || {}),
              void 0 !== s.sprites[u])
            )
              s.sprites[u].visible = !0;
            else {
              var d = this.createSprite(s, h.rendererObject);
              l.addChild(d);
            }
            (s.currentSprite = s.sprites[u]), (s.currentSpriteName = u);
          }
          (l.visible = !0),
            (u = s.bone),
            (l.position.x = u.worldX + h.x * u.m00 + h.y * u.m01),
            (l.position.y = u.worldY + h.x * u.m10 + h.y * u.m11),
            (l.scale.x = u.worldScaleX),
            (l.scale.y = u.worldScaleY),
            (l.rotation = -((s.bone.worldRotation * Math.PI) / 180));
        } else l.visible = !1;
      }
      e.DisplayObjectContainer.prototype.updateTransform.call(this);
    }),
    (e.Spine.prototype.createSprite = function (t, i) {
      var n = new e.Sprite(
        e.Texture.fromFrame(e.TextureCache[i.name] ? i.name : i.name + ".png")
      );
      return (
        (n.scale = i.scale),
        (n.rotation = i.rotation),
        (n.anchor.x = n.anchor.y = 0.5),
        (t.sprites = t.sprites || {}),
        (t.sprites[i.name] = n)
      );
    }),
    (e.BaseTextureCache = {}),
    (e.texturesToUpdate = []),
    (e.texturesToDestroy = []),
    (e.BaseTextureCacheIdGenerator = 0),
    (e.BaseTexture = function (t, i) {
      if (
        (e.EventTarget.call(this),
        (this.height = this.width = 100),
        (this.scaleMode = i || e.scaleModes.DEFAULT),
        (this.hasLoaded = !1),
        (this.source = t),
        (this.id = e.BaseTextureCacheIdGenerator++),
        (this._glTextures = []),
        t)
      ) {
        if (
          (this.source.complete || this.source.getContext) &&
          this.source.width &&
          this.source.height
        )
          (this.hasLoaded = !0),
            (this.width = this.source.width),
            (this.height = this.source.height),
            e.texturesToUpdate.push(this);
        else {
          var n = this;
          this.source.onload = function () {
            (n.hasLoaded = !0),
              (n.width = n.source.width),
              (n.height = n.source.height),
              e.texturesToUpdate.push(n),
              n.dispatchEvent({ type: "loaded", content: n });
          };
        }
        (this.imageUrl = null), (this._powerOf2 = !1);
      }
    }),
    (e.BaseTexture.prototype.constructor = e.BaseTexture),
    (e.BaseTexture.prototype.destroy = function () {
      this.imageUrl &&
        (delete e.BaseTextureCache[this.imageUrl],
        (this.imageUrl = null),
        (this.source.src = null)),
        (this.source = null),
        e.texturesToDestroy.push(this);
    }),
    (e.BaseTexture.prototype.updateSourceImage = function (t) {
      (this.hasLoaded = !1), (this.source.src = null), (this.source.src = t);
    }),
    (e.BaseTexture.fromImage = function (t, i, n) {
      var s = e.BaseTextureCache[t];
      return (
        void 0 === i && -1 === t.indexOf("data:") && (i = !0),
        s ||
          ((s = new Image()),
          i && (s.crossOrigin = ""),
          (s.src = t),
          ((s = new e.BaseTexture(s, n)).imageUrl = t),
          (e.BaseTextureCache[t] = s)),
        s
      );
    }),
    (e.BaseTexture.fromCanvas = function (t, i) {
      t._pixiId || (t._pixiId = "canvas_" + e.TextureCacheIdGenerator++);
      var n = e.BaseTextureCache[t._pixiId];
      return (
        n ||
          ((n = new e.BaseTexture(t, i)), (e.BaseTextureCache[t._pixiId] = n)),
        n
      );
    }),
    (e.TextureCache = {}),
    (e.FrameCache = {}),
    (e.TextureCacheIdGenerator = 0),
    (e.Texture = function (t, i) {
      if (
        (e.EventTarget.call(this),
        i || ((this.noFrame = !0), (i = new e.Rectangle(0, 0, 1, 1))),
        t instanceof e.Texture && (t = t.baseTexture),
        (this.baseTexture = t),
        (this.frame = i),
        (this.trim = null),
        (this.scope = this),
        (this._uvs = null),
        t.hasLoaded)
      )
        this.noFrame && (i = new e.Rectangle(0, 0, t.width, t.height)),
          this.setFrame(i);
      else {
        var n = this;
        t.addEventListener("loaded", function () {
          n.onBaseTextureLoaded();
        });
      }
    }),
    (e.Texture.prototype.constructor = e.Texture),
    (e.Texture.prototype.onBaseTextureLoaded = function () {
      var t = this.baseTexture;
      t.removeEventListener("loaded", this.onLoaded),
        this.noFrame && (this.frame = new e.Rectangle(0, 0, t.width, t.height)),
        this.setFrame(this.frame),
        this.scope.dispatchEvent({ type: "update", content: this });
    }),
    (e.Texture.prototype.destroy = function (t) {
      t && this.baseTexture.destroy();
    }),
    (e.Texture.prototype.setFrame = function (t) {
      if (
        ((this.frame = t),
        (this.width = t.width),
        (this.height = t.height),
        t.x + t.width > this.baseTexture.width ||
          t.y + t.height > this.baseTexture.height)
      )
        throw Error(
          "Texture Error: frame does not fit inside the base Texture dimensions " +
            this
        );
      (this.updateFrame = !0), e.Texture.frameUpdates.push(this);
    }),
    (e.Texture.prototype._updateWebGLuvs = function () {
      this._uvs || (this._uvs = new e.TextureUvs());
      var t = this.frame,
        i = this.baseTexture.width,
        n = this.baseTexture.height;
      (this._uvs.x0 = t.x / i),
        (this._uvs.y0 = t.y / n),
        (this._uvs.x1 = (t.x + t.width) / i),
        (this._uvs.y1 = t.y / n),
        (this._uvs.x2 = (t.x + t.width) / i),
        (this._uvs.y2 = (t.y + t.height) / n),
        (this._uvs.x3 = t.x / i),
        (this._uvs.y3 = (t.y + t.height) / n);
    }),
    (e.Texture.fromImage = function (t, i, n) {
      var s = e.TextureCache[t];
      return (
        s ||
          ((s = new e.Texture(e.BaseTexture.fromImage(t, i, n))),
          (e.TextureCache[t] = s)),
        s
      );
    }),
    (e.Texture.fromFrame = function (t) {
      var i = e.TextureCache[t];
      if (!i)
        throw Error(
          'The frameId "' + t + '" does not exist in the texture cache '
        );
      return i;
    }),
    (e.Texture.fromCanvas = function (t, i) {
      var n = e.BaseTexture.fromCanvas(t, i);
      return new e.Texture(n);
    }),
    (e.Texture.addTextureToCache = function (t, i) {
      e.TextureCache[i] = t;
    }),
    (e.Texture.removeTextureFromCache = function (t) {
      var i = e.TextureCache[t];
      return delete e.TextureCache[t], delete e.BaseTextureCache[t], i;
    }),
    (e.Texture.frameUpdates = []),
    (e.TextureUvs = function () {
      this.y4 =
        this.x3 =
        this.y2 =
        this.x2 =
        this.y1 =
        this.x1 =
        this.y0 =
        this.x0 =
          0;
    }),
    (e.RenderTexture = function (t, i, n, s) {
      e.EventTarget.call(this),
        (this.width = t || 100),
        (this.height = i || 100),
        (this.frame = new e.Rectangle(0, 0, this.width, this.height)),
        (this.baseTexture = new e.BaseTexture()),
        (this.baseTexture.width = this.width),
        (this.baseTexture.height = this.height),
        (this.baseTexture._glTextures = []),
        (this.baseTexture.scaleMode = s || e.scaleModes.DEFAULT),
        (this.baseTexture.hasLoaded = !0),
        (this.renderer = n || e.defaultRenderer),
        this.renderer.type === e.WEBGL_RENDERER
          ? ((t = this.renderer.gl),
            (this.textureBuffer = new e.FilterTexture(
              t,
              this.width,
              this.height,
              this.baseTexture.scaleMode
            )),
            (this.baseTexture._glTextures[t.id] = this.textureBuffer.texture),
            (this.render = this.renderWebGL),
            (this.projection = new e.Point(this.width / 2, -this.height / 2)))
          : ((this.render = this.renderCanvas),
            (this.textureBuffer = new e.CanvasBuffer(this.width, this.height)),
            (this.baseTexture.source = this.textureBuffer.canvas)),
        e.Texture.frameUpdates.push(this);
    }),
    (e.RenderTexture.prototype = Object.create(e.Texture.prototype)),
    (e.RenderTexture.prototype.constructor = e.RenderTexture),
    (e.RenderTexture.prototype.resize = function (t, i) {
      if (
        ((this.width = t),
        (this.height = i),
        (this.frame.width = this.width),
        (this.frame.height = this.height),
        this.renderer.type === e.WEBGL_RENDERER)
      ) {
        (this.projection.x = this.width / 2),
          (this.projection.y = -this.height / 2);
        var n = this.renderer.gl;
        n.bindTexture(n.TEXTURE_2D, this.baseTexture._glTextures[n.id]),
          n.texImage2D(
            n.TEXTURE_2D,
            0,
            n.RGBA,
            this.width,
            this.height,
            0,
            n.RGBA,
            n.UNSIGNED_BYTE,
            null
          );
      } else this.textureBuffer.resize(this.width, this.height);
      e.Texture.frameUpdates.push(this);
    }),
    (e.RenderTexture.prototype.renderWebGL = function (t, i, n) {
      var s = this.renderer.gl;
      s.colorMask(!0, !0, !0, !0),
        s.viewport(0, 0, this.width, this.height),
        s.bindFramebuffer(s.FRAMEBUFFER, this.textureBuffer.frameBuffer),
        n && this.textureBuffer.clear(),
        (n = t.children),
        (s = t.worldTransform),
        (t.worldTransform = e.RenderTexture.tempMatrix),
        (t.worldTransform.d = -1),
        (t.worldTransform.ty = -2 * this.projection.y),
        i && ((t.worldTransform.tx = i.x), (t.worldTransform.ty -= i.y)),
        (i = 0);
      for (var o = n.length; i < o; i++) n[i].updateTransform();
      e.WebGLRenderer.updateTextures(),
        this.renderer.renderDisplayObject(
          t,
          this.projection,
          this.textureBuffer.frameBuffer
        ),
        (t.worldTransform = s);
    }),
    (e.RenderTexture.prototype.renderCanvas = function (t, i, n) {
      var s = t.children,
        o = t.worldTransform;
      (t.worldTransform = e.RenderTexture.tempMatrix),
        i && ((t.worldTransform.tx = i.x), (t.worldTransform.ty = i.y)),
        (i = 0);
      for (var h = s.length; i < h; i++) s[i].updateTransform();
      n && this.textureBuffer.clear(),
        (n = this.textureBuffer.context),
        this.renderer.renderDisplayObject(t, n),
        n.setTransform(1, 0, 0, 1, 0, 0),
        (t.worldTransform = o);
    }),
    (e.RenderTexture.tempMatrix = new e.Matrix()),
    (e.AssetLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.assetURLs = t),
        (this.crossorigin = i),
        (this.loadersByType = {
          jpg: e.ImageLoader,
          jpeg: e.ImageLoader,
          png: e.ImageLoader,
          gif: e.ImageLoader,
          json: e.JsonLoader,
          atlas: e.AtlasLoader,
          anim: e.SpineLoader,
          xml: e.BitmapFontLoader,
          fnt: e.BitmapFontLoader,
        });
    }),
    (e.AssetLoader.prototype.constructor = e.AssetLoader),
    (e.AssetLoader.prototype._getDataType = function (t) {
      if ("data:" === t.slice(0, 5).toLowerCase()) {
        var e = (t = t.slice(5)).indexOf(",");
        return -1 === e
          ? null
          : (t = t.slice(0, e).split(";")[0]) &&
            "text/plain" !== t.toLowerCase()
          ? t.split("/").pop().toLowerCase()
          : "txt";
      }
      return null;
    }),
    (e.AssetLoader.prototype.load = function () {
      function t(t) {
        e.onAssetLoaded(t.content);
      }
      var e = this;
      this.loadCount = this.assetURLs.length;
      for (var i = 0; i < this.assetURLs.length; i++) {
        var n = this.assetURLs[i],
          s = this._getDataType(n);
        s || (s = n.split("?").shift().split(".").pop().toLowerCase());
        var o = this.loadersByType[s];
        if (!o) throw Error(s + " is an unsupported file type");
        (n = new o(n, this.crossorigin)).addEventListener("loaded", t),
          n.load();
      }
    }),
    (e.AssetLoader.prototype.onAssetLoaded = function (t) {
      this.loadCount--,
        this.dispatchEvent({ type: "onProgress", content: this, loader: t }),
        this.onProgress && this.onProgress(t),
        !this.loadCount &&
          (this.dispatchEvent({ type: "onComplete", content: this }),
          this.onComplete) &&
          this.onComplete();
    }),
    (e.JsonLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.url = t),
        (this.crossorigin = i),
        (this.baseUrl = t.replace(/[^\/]*$/, "")),
        (this.loaded = !1);
    }),
    (e.JsonLoader.prototype.constructor = e.JsonLoader),
    (e.JsonLoader.prototype.load = function () {
      var t = this;
      window.XDomainRequest && !window.XMLHttpRequest
        ? ((this.ajaxRequest = new window.XDomainRequest()),
          (this.ajaxRequest.timeout = 3e3),
          (this.ajaxRequest.onerror = function () {
            t.onError();
          }),
          (this.ajaxRequest.ontimeout = function () {
            t.onError();
          }),
          (this.ajaxRequest.onprogress = function () {}))
        : (this.ajaxRequest = window.XMLHttpRequest
            ? new window.XMLHttpRequest()
            : new window.ActiveXObject("Microsoft.XMLHTTP")),
        (this.ajaxRequest.onload = function () {
          t.onJSONLoaded();
        }),
        this.ajaxRequest.open("GET", this.url, !0),
        this.ajaxRequest.send();
    }),
    (e.JsonLoader.prototype.onJSONLoaded = function () {
      if (this.ajaxRequest.responseText) {
        if (
          ((this.json = JSON.parse(this.ajaxRequest.responseText)),
          this.json.frames)
        ) {
          var t = this,
            i = new e.ImageLoader(
              this.baseUrl + this.json.meta.image,
              this.crossorigin
            ),
            n = this.json.frames;
          for (var s in ((this.texture = i.texture.baseTexture),
          i.addEventListener("loaded", function () {
            t.onLoaded();
          }),
          n)) {
            var h = n[s].frame;
            if (
              h &&
              ((e.TextureCache[s] = new e.Texture(this.texture, {
                x: h.x,
                y: h.y,
                width: h.w,
                height: h.h,
              })),
              n[s].trimmed)
            ) {
              var h = n[s].sourceSize,
                l = n[s].spriteSourceSize;
              e.TextureCache[s].trim = new e.Rectangle(l.x, l.y, h.w, h.h);
            }
          }
          i.load();
        } else
          this.json.bones &&
            ((i = new o.SkeletonJson().readSkeletonData(this.json)),
            (e.AnimCache[this.url] = i)),
            this.onLoaded();
      } else this.onError();
    }),
    (e.JsonLoader.prototype.onLoaded = function () {
      (this.loaded = !0), this.dispatchEvent({ type: "loaded", content: this });
    }),
    (e.JsonLoader.prototype.onError = function () {
      this.dispatchEvent({ type: "error", content: this });
    }),
    (e.AtlasLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.url = t),
        (this.baseUrl = t.replace(/[^\/]*$/, "")),
        (this.crossorigin = i),
        (this.loaded = !1);
    }),
    (e.AtlasLoader.constructor = e.AtlasLoader),
    (e.AtlasLoader.prototype.load = function () {
      (this.ajaxRequest = new e.AjaxRequest()),
        (this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this)),
        this.ajaxRequest.open("GET", this.url, !0),
        this.ajaxRequest.overrideMimeType &&
          this.ajaxRequest.overrideMimeType("application/json"),
        this.ajaxRequest.send(null);
    }),
    (e.AtlasLoader.prototype.onAtlasLoaded = function () {
      if (4 === this.ajaxRequest.readyState) {
        if (
          200 === this.ajaxRequest.status ||
          -1 === window.location.href.indexOf("http")
        ) {
          this.atlas = { meta: { image: [] }, frames: [] };
          for (
            var t = this.ajaxRequest.responseText.split(/\r?\n/),
              i = -3,
              n = 0,
              s = null,
              o = !1,
              h = 0,
              l = 0,
              u = this.onLoaded.bind(this),
              h = 0;
            h < t.length;
            h++
          )
            (t[h] = t[h].replace(/^\s+|\s+$/g, "")),
              "" === t[h] && (o = h + 1),
              0 < t[h].length &&
                (o === h
                  ? (this.atlas.meta.image.push(t[h]),
                    (n = this.atlas.meta.image.length - 1),
                    this.atlas.frames.push({}),
                    (i = -3))
                  : 0 < i &&
                    (1 == i % 7
                      ? (null != s && (this.atlas.frames[n][s.name] = s),
                        (s = { name: t[h], frame: {} }))
                      : ((l = t[h].split(" ")),
                        3 == i % 7
                          ? ((s.frame.x = Number(l[1].replace(",", ""))),
                            (s.frame.y = Number(l[2])))
                          : 4 == i % 7
                          ? ((s.frame.w = Number(l[1].replace(",", ""))),
                            (s.frame.h = Number(l[2])))
                          : 5 == i % 7 &&
                            ((l = {
                              x: 0,
                              y: 0,
                              w: Number(l[1].replace(",", "")),
                              h: Number(l[2]),
                            }).w > s.frame.w || l.h > s.frame.h
                              ? ((s.trimmed = !0), (s.realSize = l))
                              : (s.trimmed = !1)))),
                i++);
          if (
            (null != s && (this.atlas.frames[n][s.name] = s),
            0 < this.atlas.meta.image.length)
          ) {
            for (l = 0, this.images = []; l < this.atlas.meta.image.length; l++)
              for (h in ((t = this.atlas.frames[l]),
              this.images.push(
                new e.ImageLoader(
                  this.baseUrl + this.atlas.meta.image[l],
                  this.crossorigin
                )
              ),
              t))
                (i = t[h].frame) &&
                  ((e.TextureCache[h] = new e.Texture(
                    this.images[l].texture.baseTexture,
                    { x: i.x, y: i.y, width: i.w, height: i.h }
                  )),
                  t[h].trimmed &&
                    ((e.TextureCache[h].realSize = t[h].realSize),
                    (e.TextureCache[h].trim.x = 0),
                    (e.TextureCache[h].trim.y = 0)));
            for (l = this.currentImageId = 0; l < this.images.length; l++)
              this.images[l].addEventListener("loaded", u);
            this.images[this.currentImageId].load();
          } else this.onLoaded();
        } else this.onError();
      }
    }),
    (e.AtlasLoader.prototype.onLoaded = function () {
      this.images.length - 1 > this.currentImageId
        ? (this.currentImageId++, this.images[this.currentImageId].load())
        : ((this.loaded = !0),
          this.dispatchEvent({ type: "loaded", content: this }));
    }),
    (e.AtlasLoader.prototype.onError = function () {
      this.dispatchEvent({ type: "error", content: this });
    }),
    (e.SpriteSheetLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.url = t),
        (this.crossorigin = i),
        (this.baseUrl = t.replace(/[^\/]*$/, "")),
        (this.texture = null),
        (this.frames = {});
    }),
    (e.SpriteSheetLoader.prototype.constructor = e.SpriteSheetLoader),
    (e.SpriteSheetLoader.prototype.load = function () {
      var t = this,
        i = new e.JsonLoader(this.url, this.crossorigin);
      i.addEventListener("loaded", function (e) {
        (t.json = e.content.json), t.onLoaded();
      }),
        i.load();
    }),
    (e.SpriteSheetLoader.prototype.onLoaded = function () {
      this.dispatchEvent({ type: "loaded", content: this });
    }),
    (e.ImageLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.texture = e.Texture.fromImage(t, i)),
        (this.frames = []);
    }),
    (e.ImageLoader.prototype.constructor = e.ImageLoader),
    (e.ImageLoader.prototype.load = function () {
      if (this.texture.baseTexture.hasLoaded) this.onLoaded();
      else {
        var t = this;
        this.texture.baseTexture.addEventListener("loaded", function () {
          t.onLoaded();
        });
      }
    }),
    (e.ImageLoader.prototype.onLoaded = function () {
      this.dispatchEvent({ type: "loaded", content: this });
    }),
    (e.ImageLoader.prototype.loadFramedSpriteSheet = function (t, i, n) {
      this.frames = [];
      for (
        var s = Math.floor(this.texture.width / t),
          o = Math.floor(this.texture.height / i),
          h = 0,
          l = 0;
        l < o;
        l++
      )
        for (var u = 0; u < s; u++, h++) {
          var d = new e.Texture(this.texture, {
            x: u * t,
            y: l * i,
            width: t,
            height: i,
          });
          this.frames.push(d), n && (e.TextureCache[n + "-" + h] = d);
        }
      if (this.texture.baseTexture.hasLoaded) this.onLoaded();
      else {
        var c = this;
        this.texture.baseTexture.addEventListener("loaded", function () {
          c.onLoaded();
        });
      }
    }),
    (e.BitmapFontLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.url = t),
        (this.crossorigin = i),
        (this.baseUrl = t.replace(/[^\/]*$/, "")),
        (this.texture = null);
    }),
    (e.BitmapFontLoader.prototype.constructor = e.BitmapFontLoader),
    (e.BitmapFontLoader.prototype.load = function () {
      this.ajaxRequest = new e.AjaxRequest();
      var t = this;
      (this.ajaxRequest.onreadystatechange = function () {
        t.onXMLLoaded();
      }),
        this.ajaxRequest.open("GET", this.url, !0),
        this.ajaxRequest.overrideMimeType &&
          this.ajaxRequest.overrideMimeType("application/xml"),
        this.ajaxRequest.send(null);
    }),
    (e.BitmapFontLoader.prototype.onXMLLoaded = function () {
      if (
        4 === this.ajaxRequest.readyState &&
        (200 === this.ajaxRequest.status ||
          -1 === window.location.protocol.indexOf("http"))
      ) {
        var t = this.ajaxRequest.responseXML;
        if (
          !t ||
          /MSIE 9/i.test(navigator.userAgent) ||
          /MSIE 10/i.test(navigator.userAgent) ||
          navigator.isCocoonJS
        ) {
          if ("function" == typeof window.DOMParser)
            t = new DOMParser().parseFromString(
              this.ajaxRequest.responseText,
              "text/xml"
            );
          else {
            var i = document.createElement("div");
            (i.innerHTML = this.ajaxRequest.responseText), (t = i);
          }
        }
        (i =
          this.baseUrl +
          t.getElementsByTagName("page")[0].getAttribute("file")),
          (i = new e.ImageLoader(i, this.crossorigin)),
          (this.texture = i.texture.baseTexture);
        var n = {},
          s = t.getElementsByTagName("info")[0],
          o = t.getElementsByTagName("common")[0];
        for (
          n.font = s.getAttribute("face"),
            n.size = parseInt(s.getAttribute("size"), 10),
            n.lineHeight = parseInt(o.getAttribute("lineHeight"), 10),
            n.chars = {},
            o = t.getElementsByTagName("char"),
            s = 0;
          s < o.length;
          s++
        ) {
          var h = parseInt(o[s].getAttribute("id"), 10),
            l = new e.Rectangle(
              parseInt(o[s].getAttribute("x"), 10),
              parseInt(o[s].getAttribute("y"), 10),
              parseInt(o[s].getAttribute("width"), 10),
              parseInt(o[s].getAttribute("height"), 10)
            );
          n.chars[h] = {
            xOffset: parseInt(o[s].getAttribute("xoffset"), 10),
            yOffset: parseInt(o[s].getAttribute("yoffset"), 10),
            xAdvance: parseInt(o[s].getAttribute("xadvance"), 10),
            kerning: {},
            texture: (e.TextureCache[h] = new e.Texture(this.texture, l)),
          };
        }
        for (s = 0, t = t.getElementsByTagName("kerning"); s < t.length; s++)
          (o = parseInt(t[s].getAttribute("first"), 10)),
            (h = parseInt(t[s].getAttribute("second"), 10)),
            (l = parseInt(t[s].getAttribute("amount"), 10)),
            (n.chars[h].kerning[o] = l);
        e.BitmapText.fonts[n.font] = n;
        var u = this;
        i.addEventListener("loaded", function () {
          u.onLoaded();
        }),
          i.load();
      }
    }),
    (e.BitmapFontLoader.prototype.onLoaded = function () {
      this.dispatchEvent({ type: "loaded", content: this });
    }),
    (e.SpineLoader = function (t, i) {
      e.EventTarget.call(this),
        (this.url = t),
        (this.crossorigin = i),
        (this.loaded = !1);
    }),
    (e.SpineLoader.prototype.constructor = e.SpineLoader),
    (e.SpineLoader.prototype.load = function () {
      var t = this,
        i = new e.JsonLoader(this.url, this.crossorigin);
      i.addEventListener("loaded", function (e) {
        (t.json = e.content.json), t.onLoaded();
      }),
        i.load();
    }),
    (e.SpineLoader.prototype.onLoaded = function () {
      (this.loaded = !0), this.dispatchEvent({ type: "loaded", content: this });
    }),
    (e.AbstractFilter = function (t, e) {
      (this.passes = [this]),
        (this.shaders = []),
        (this.dirty = !0),
        (this.padding = 0),
        (this.uniforms = e || {}),
        (this.fragmentSrc = t || []);
    }),
    (e.AlphaMaskFilter = function (t) {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (t.baseTexture._powerOf2 = !0),
        (this.uniforms = {
          mask: { type: "sampler2D", value: t },
          mapDimensions: { type: "2f", value: { x: 1, y: 5112 } },
          dimensions: { type: "4fv", value: [0, 0, 0, 0] },
        }),
        t.baseTexture.hasLoaded
          ? ((this.uniforms.mask.value.x = t.width),
            (this.uniforms.mask.value.y = t.height))
          : ((this.boundLoadedFunction = this.onTextureLoaded.bind(this)),
            t.baseTexture.on("loaded", this.boundLoadedFunction)),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform sampler2D mask;",
          "uniform sampler2D uSampler;",
          "uniform vec2 offset;",
          "uniform vec4 dimensions;",
          "uniform vec2 mapDimensions;",
          "void main(void) {",
          "   vec2 mapCords = vTextureCoord.xy;",
          "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;",
          "   mapCords.y *= -1.0;",
          "   mapCords.y += 1.0;",
          "   mapCords *= dimensions.xy / mapDimensions;",
          "   vec4 original =  texture2D(uSampler, vTextureCoord);",
          "   float maskAlpha =  texture2D(mask, mapCords).r;",
          "   original *= maskAlpha;",
          "   gl_FragColor =  original;",
          "}",
        ]);
    }),
    (e.AlphaMaskFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.AlphaMaskFilter.prototype.constructor = e.AlphaMaskFilter),
    (e.AlphaMaskFilter.prototype.onTextureLoaded = function () {
      (this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width),
        (this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height),
        this.uniforms.mask.value.baseTexture.off(
          "loaded",
          this.boundLoadedFunction
        );
    }),
    Object.defineProperty(e.AlphaMaskFilter.prototype, "map", {
      get: function () {
        return this.uniforms.mask.value;
      },
      set: function (t) {
        this.uniforms.mask.value = t;
      },
    }),
    (e.ColorMatrixFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = {
          matrix: {
            type: "mat4",
            value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          },
        }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float invert;",
          "uniform mat4 matrix;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;",
          "}",
        ]);
    }),
    (e.ColorMatrixFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.ColorMatrixFilter.prototype.constructor = e.ColorMatrixFilter),
    Object.defineProperty(e.ColorMatrixFilter.prototype, "matrix", {
      get: function () {
        return this.uniforms.matrix.value;
      },
      set: function (t) {
        this.uniforms.matrix.value = t;
      },
    }),
    (e.GrayFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { gray: { type: "1f", value: 1 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform sampler2D uSampler;",
          "uniform float gray;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord);",
          "   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);",
          "}",
        ]);
    }),
    (e.GrayFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.GrayFilter.prototype.constructor = e.GrayFilter),
    Object.defineProperty(e.GrayFilter.prototype, "gray", {
      get: function () {
        return this.uniforms.gray.value;
      },
      set: function (t) {
        this.uniforms.gray.value = t;
      },
    }),
    (e.DisplacementFilter = function (t) {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (t.baseTexture._powerOf2 = !0),
        (this.uniforms = {
          displacementMap: { type: "sampler2D", value: t },
          scale: { type: "2f", value: { x: 30, y: 30 } },
          offset: { type: "2f", value: { x: 0, y: 0 } },
          mapDimensions: { type: "2f", value: { x: 1, y: 5112 } },
          dimensions: { type: "4fv", value: [0, 0, 0, 0] },
        }),
        t.baseTexture.hasLoaded
          ? ((this.uniforms.mapDimensions.value.x = t.width),
            (this.uniforms.mapDimensions.value.y = t.height))
          : ((this.boundLoadedFunction = this.onTextureLoaded.bind(this)),
            t.baseTexture.on("loaded", this.boundLoadedFunction)),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform sampler2D displacementMap;",
          "uniform sampler2D uSampler;",
          "uniform vec2 scale;",
          "uniform vec2 offset;",
          "uniform vec4 dimensions;",
          "uniform vec2 mapDimensions;",
          "void main(void) {",
          "   vec2 mapCords = vTextureCoord.xy;",
          "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;",
          "   mapCords.y *= -1.0;",
          "   mapCords.y += 1.0;",
          "   vec2 matSample = texture2D(displacementMap, mapCords).xy;",
          "   matSample -= 0.5;",
          "   matSample *= scale;",
          "   matSample /= mapDimensions;",
          "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));",
          "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);",
          "   vec2 cord = vTextureCoord;",
          "}",
        ]);
    }),
    (e.DisplacementFilter.prototype = Object.create(
      e.AbstractFilter.prototype
    )),
    (e.DisplacementFilter.prototype.constructor = e.DisplacementFilter),
    (e.DisplacementFilter.prototype.onTextureLoaded = function () {
      (this.uniforms.mapDimensions.value.x =
        this.uniforms.displacementMap.value.width),
        (this.uniforms.mapDimensions.value.y =
          this.uniforms.displacementMap.value.height),
        this.uniforms.displacementMap.value.baseTexture.off(
          "loaded",
          this.boundLoadedFunction
        );
    }),
    Object.defineProperty(e.DisplacementFilter.prototype, "map", {
      get: function () {
        return this.uniforms.displacementMap.value;
      },
      set: function (t) {
        this.uniforms.displacementMap.value = t;
      },
    }),
    Object.defineProperty(e.DisplacementFilter.prototype, "scale", {
      get: function () {
        return this.uniforms.scale.value;
      },
      set: function (t) {
        this.uniforms.scale.value = t;
      },
    }),
    Object.defineProperty(e.DisplacementFilter.prototype, "offset", {
      get: function () {
        return this.uniforms.offset.value;
      },
      set: function (t) {
        this.uniforms.offset.value = t;
      },
    }),
    (e.PixelateFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = {
          invert: { type: "1f", value: 0 },
          dimensions: {
            type: "4fv",
            value: new Float32Array([1e4, 100, 10, 10]),
          },
          pixelSize: { type: "2f", value: { x: 10, y: 10 } },
        }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform vec2 testDim;",
          "uniform vec4 dimensions;",
          "uniform vec2 pixelSize;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   vec2 coord = vTextureCoord;",
          "   vec2 size = dimensions.xy/pixelSize;",
          "   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;",
          "   gl_FragColor = texture2D(uSampler, color);",
          "}",
        ]);
    }),
    (e.PixelateFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.PixelateFilter.prototype.constructor = e.PixelateFilter),
    Object.defineProperty(e.PixelateFilter.prototype, "size", {
      get: function () {
        return this.uniforms.pixelSize.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.pixelSize.value = t);
      },
    }),
    (e.BlurXFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { blur: { type: "1f", value: 1 / 512 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float blur;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   vec4 sum = vec4(0.0);",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",
          "   gl_FragColor = sum;",
          "}",
        ]);
    }),
    (e.BlurXFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.BlurXFilter.prototype.constructor = e.BlurXFilter),
    Object.defineProperty(e.BlurXFilter.prototype, "blur", {
      get: function () {
        return this.uniforms.blur.value / (1 / 7e3);
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.blur.value = (1 / 7e3) * t);
      },
    }),
    (e.BlurYFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { blur: { type: "1f", value: 1 / 512 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float blur;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   vec4 sum = vec4(0.0);",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;",
          "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;",
          "   gl_FragColor = sum;",
          "}",
        ]);
    }),
    (e.BlurYFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.BlurYFilter.prototype.constructor = e.BlurYFilter),
    Object.defineProperty(e.BlurYFilter.prototype, "blur", {
      get: function () {
        return this.uniforms.blur.value / (1 / 7e3);
      },
      set: function (t) {
        this.uniforms.blur.value = (1 / 7e3) * t;
      },
    }),
    (e.BlurFilter = function () {
      (this.blurXFilter = new e.BlurXFilter()),
        (this.blurYFilter = new e.BlurYFilter()),
        (this.passes = [this.blurXFilter, this.blurYFilter]);
    }),
    Object.defineProperty(e.BlurFilter.prototype, "blur", {
      get: function () {
        return this.blurXFilter.blur;
      },
      set: function (t) {
        this.blurXFilter.blur = this.blurYFilter.blur = t;
      },
    }),
    Object.defineProperty(e.BlurFilter.prototype, "blurX", {
      get: function () {
        return this.blurXFilter.blur;
      },
      set: function (t) {
        this.blurXFilter.blur = t;
      },
    }),
    Object.defineProperty(e.BlurFilter.prototype, "blurY", {
      get: function () {
        return this.blurYFilter.blur;
      },
      set: function (t) {
        this.blurYFilter.blur = t;
      },
    }),
    (e.InvertFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { invert: { type: "1f", value: 1 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float invert;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord);",
          "   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);",
          "}",
        ]);
    }),
    (e.InvertFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.InvertFilter.prototype.constructor = e.InvertFilter),
    Object.defineProperty(e.InvertFilter.prototype, "invert", {
      get: function () {
        return this.uniforms.invert.value;
      },
      set: function (t) {
        this.uniforms.invert.value = t;
      },
    }),
    (e.SepiaFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { sepia: { type: "1f", value: 1 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float sepia;",
          "uniform sampler2D uSampler;",
          "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);",
          "void main(void) {",
          "   gl_FragColor = texture2D(uSampler, vTextureCoord);",
          "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);",
          "}",
        ]);
    }),
    (e.SepiaFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.SepiaFilter.prototype.constructor = e.SepiaFilter),
    Object.defineProperty(e.SepiaFilter.prototype, "sepia", {
      get: function () {
        return this.uniforms.sepia.value;
      },
      set: function (t) {
        this.uniforms.sepia.value = t;
      },
    }),
    (e.TwistFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = {
          radius: { type: "1f", value: 0.5 },
          angle: { type: "1f", value: 5 },
          offset: { type: "2f", value: { x: 0.5, y: 0.5 } },
        }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform vec4 dimensions;",
          "uniform sampler2D uSampler;",
          "uniform float radius;",
          "uniform float angle;",
          "uniform vec2 offset;",
          "void main(void) {",
          "   vec2 coord = vTextureCoord - offset;",
          "   float distance = length(coord);",
          "   if (distance < radius) {",
          "       float ratio = (radius - distance) / radius;",
          "       float angleMod = ratio * ratio * angle;",
          "       float s = sin(angleMod);",
          "       float c = cos(angleMod);",
          "       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);",
          "   }",
          "   gl_FragColor = texture2D(uSampler, coord+offset);",
          "}",
        ]);
    }),
    (e.TwistFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.TwistFilter.prototype.constructor = e.TwistFilter),
    Object.defineProperty(e.TwistFilter.prototype, "offset", {
      get: function () {
        return this.uniforms.offset.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.offset.value = t);
      },
    }),
    Object.defineProperty(e.TwistFilter.prototype, "radius", {
      get: function () {
        return this.uniforms.radius.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.radius.value = t);
      },
    }),
    Object.defineProperty(e.TwistFilter.prototype, "angle", {
      get: function () {
        return this.uniforms.angle.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.angle.value = t);
      },
    }),
    (e.ColorStepFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { step: { type: "1f", value: 5 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform sampler2D uSampler;",
          "uniform float step;",
          "void main(void) {",
          "   vec4 color = texture2D(uSampler, vTextureCoord);",
          "   color = floor(color * step) / step;",
          "   gl_FragColor = color;",
          "}",
        ]);
    }),
    (e.ColorStepFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.ColorStepFilter.prototype.constructor = e.ColorStepFilter),
    Object.defineProperty(e.ColorStepFilter.prototype, "step", {
      get: function () {
        return this.uniforms.step.value;
      },
      set: function (t) {
        this.uniforms.step.value = t;
      },
    }),
    (e.DotScreenFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = {
          scale: { type: "1f", value: 1 },
          angle: { type: "1f", value: 5 },
          dimensions: { type: "4fv", value: [0, 0, 0, 0] },
        }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform vec4 dimensions;",
          "uniform sampler2D uSampler;",
          "uniform float angle;",
          "uniform float scale;",
          "float pattern() {",
          "   float s = sin(angle), c = cos(angle);",
          "   vec2 tex = vTextureCoord * dimensions.xy;",
          "   vec2 point = vec2(",
          "       c * tex.x - s * tex.y,",
          "       s * tex.x + c * tex.y",
          "   ) * scale;",
          "   return (sin(point.x) * sin(point.y)) * 4.0;",
          "}",
          "void main() {",
          "   vec4 color = texture2D(uSampler, vTextureCoord);",
          "   float average = (color.r + color.g + color.b) / 3.0;",
          "   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);",
          "}",
        ]);
    }),
    (e.DotScreenFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.DotScreenFilter.prototype.constructor = e.DotScreenFilter),
    Object.defineProperty(e.DotScreenFilter.prototype, "scale", {
      get: function () {
        return this.uniforms.scale.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.scale.value = t);
      },
    }),
    Object.defineProperty(e.DotScreenFilter.prototype, "angle", {
      get: function () {
        return this.uniforms.angle.value;
      },
      set: function (t) {
        (this.dirty = !0), (this.uniforms.angle.value = t);
      },
    }),
    (e.CrossHatchFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = { blur: { type: "1f", value: 1 / 512 } }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform float blur;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);",
          "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
          "    if (lum < 1.00) {",
          "        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {",
          "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
          "        }",
          "    }",
          "    if (lum < 0.75) {",
          "        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {",
          "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
          "        }",
          "    }",
          "    if (lum < 0.50) {",
          "        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
          "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
          "        }",
          "    }",
          "    if (lum < 0.3) {",
          "        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {",
          "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
          "        }",
          "    }",
          "}",
        ]);
    }),
    (e.CrossHatchFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.CrossHatchFilter.prototype.constructor = e.BlurYFilter),
    Object.defineProperty(e.CrossHatchFilter.prototype, "blur", {
      get: function () {
        return this.uniforms.blur.value / (1 / 7e3);
      },
      set: function (t) {
        this.uniforms.blur.value = (1 / 7e3) * t;
      },
    }),
    (e.RGBSplitFilter = function () {
      e.AbstractFilter.call(this),
        (this.passes = [this]),
        (this.uniforms = {
          red: { type: "2f", value: { x: 20, y: 20 } },
          green: { type: "2f", value: { x: -20, y: 20 } },
          blue: { type: "2f", value: { x: 20, y: -20 } },
          dimensions: { type: "4fv", value: [0, 0, 0, 0] },
        }),
        (this.fragmentSrc = [
          "precision mediump float;",
          "varying vec2 vTextureCoord;",
          "varying vec4 vColor;",
          "uniform vec2 red;",
          "uniform vec2 green;",
          "uniform vec2 blue;",
          "uniform vec4 dimensions;",
          "uniform sampler2D uSampler;",
          "void main(void) {",
          "   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;",
          "   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;",
          "   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;",
          "   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;",
          "}",
        ]);
    }),
    (e.RGBSplitFilter.prototype = Object.create(e.AbstractFilter.prototype)),
    (e.RGBSplitFilter.prototype.constructor = e.RGBSplitFilter),
    Object.defineProperty(e.RGBSplitFilter.prototype, "angle", {
      get: function () {
        return this.uniforms.blur.value / (1 / 7e3);
      },
      set: function (t) {
        this.uniforms.blur.value = (1 / 7e3) * t;
      },
    }),
    "undefined" != typeof exports
      ? ("undefined" != typeof module &&
          module.exports &&
          (exports = module.exports = e),
        (exports.PIXI = e))
      : "undefined" != typeof define && define.amd
      ? define(e)
      : (this.PIXI = e);
}).call(this),
  (function () {
    var t = {},
      e = null,
      i = !0,
      n = !1;
    try {
      "undefined" != typeof AudioContext
        ? (e = new AudioContext())
        : "undefined" != typeof webkitAudioContext
        ? (e = new webkitAudioContext())
        : (i = !1);
    } catch (s) {
      i = !1;
    }
    if (!i) {
      if ("undefined" != typeof Audio)
        try {
          new Audio();
        } catch (o) {
          n = !0;
        }
      else n = !0;
    }
    if (i) {
      var h = void 0 === e.createGain ? e.createGainNode() : e.createGain();
      (h.gain.value = 1), h.connect(e.destination);
    }
    var l = function () {
      (this._volume = 1),
        (this._muted = !1),
        (this.usingWebAudio = i),
        (this.noAudio = n),
        (this._howls = []);
    };
    l.prototype = {
      volume: function (t) {
        if (0 <= (t = parseFloat(t)) && 1 >= t) {
          for (var e in ((this._volume = t),
          i && (h.gain.value = t),
          this._howls))
            if (
              this._howls.hasOwnProperty(e) &&
              !1 === this._howls[e]._webAudio
            )
              for (t = 0; t < this._howls[e]._audioNode.length; t++)
                this._howls[e]._audioNode[t].volume =
                  this._howls[e]._volume * this._volume;
          return this;
        }
        return i ? h.gain.value : this._volume;
      },
      mute: function () {
        return this._setMuted(!0), this;
      },
      unmute: function () {
        return this._setMuted(!1), this;
      },
      _setMuted: function (t) {
        for (var e in ((this._muted = t),
        i && (h.gain.value = t ? 0 : this._volume),
        this._howls))
          if (this._howls.hasOwnProperty(e) && !1 === this._howls[e]._webAudio)
            for (var n = 0; n < this._howls[e]._audioNode.length; n++)
              this._howls[e]._audioNode[n].muted = t;
      },
    };
    var u = new l(),
      d = null;
    if (!n)
      var d = new Audio(),
        c = {
          mp3: !!d.canPlayType("audio/mpeg;").replace(/^no$/, ""),
          opus: !!d.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
          ogg: !!d
            .canPlayType('audio/ogg; codecs="vorbis"')
            .replace(/^no$/, ""),
          wav: !!d.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
          aac: !!d.canPlayType("audio/aac;").replace(/^no$/, ""),
          m4a: !!(
            d.canPlayType("audio/x-m4a;") ||
            d.canPlayType("audio/m4a;") ||
            d.canPlayType("audio/aac;")
          ).replace(/^no$/, ""),
          mp4: !!(
            d.canPlayType("audio/x-mp4;") ||
            d.canPlayType("audio/mp4;") ||
            d.canPlayType("audio/aac;")
          ).replace(/^no$/, ""),
          weba: !!d
            .canPlayType('audio/webm; codecs="vorbis"')
            .replace(/^no$/, ""),
        };
    var p = function (t) {
      (this._autoplay = t.autoplay || !1),
        (this._buffer = t.buffer || !1),
        (this._duration = t.duration || 0),
        (this._format = t.format || null),
        (this._loop = t.loop || !1),
        (this._loaded = !1),
        (this._sprite = t.sprite || {}),
        (this._src = t.src || ""),
        (this._pos3d = t.pos3d || [0, 0, -0.5]),
        (this._volume = void 0 !== t.volume ? t.volume : 1),
        (this._urls = t.urls || []),
        (this._rate = t.rate || 1),
        (this._model = t.model || null),
        (this._onload = [t.onload || function () {}]),
        (this._onloaderror = [t.onloaderror || function () {}]),
        (this._onend = [t.onend || function () {}]),
        (this._onpause = [t.onpause || function () {}]),
        (this._onplay = [t.onplay || function () {}]),
        (this._onendTimer = []),
        (this._webAudio = i && !this._buffer),
        (this._audioNode = []),
        this._webAudio && this._setupAudioNode(),
        u._howls.push(this),
        this.load();
    };
    if (
      ((p.prototype = {
        load: function () {
          var e = this,
            i = null;
          if (!n) {
            for (var s, o, h = 0; h < e._urls.length; h++) {
              if (e._format) s = e._format;
              else if (
                (s =
                  (s = (o = e._urls[h].toLowerCase().split("?")[0]).match(
                    /.+\.([^?]+)(\?|$)/
                  )) && 2 <= s.length
                    ? s
                    : o.match(/data\:audio\/([^?]+);/))
              )
                s = s[1];
              else {
                e.on("loaderror");
                return;
              }
              if (c[s]) {
                i = e._urls[h];
                break;
              }
            }
            if (i) {
              if (((e._src = i), e._webAudio)) f(e, i);
              else {
                var d = new Audio();
                d.addEventListener(
                  "error",
                  function () {
                    d.error && 4 === d.error.code && (l.noAudio = !0),
                      e.on("loaderror", { type: d.error ? d.error.code : 0 });
                  },
                  !1
                ),
                  e._audioNode.push(d),
                  (d.src = i),
                  (d._pos = 0),
                  (d.preload = "auto"),
                  (d.volume = u._muted ? 0 : e._volume * u.volume()),
                  (t[i] = e);
                var p = function () {
                  (e._duration = Math.ceil(10 * d.duration) / 10),
                    0 === Object.getOwnPropertyNames(e._sprite).length &&
                      (e._sprite = { _default: [0, 1e3 * e._duration] }),
                    e._loaded || ((e._loaded = !0), e.on("load")),
                    e._autoplay && e.play(),
                    d.removeEventListener("canplaythrough", p, !1);
                };
                d.addEventListener("canplaythrough", p, !1), d.load();
              }
              return e;
            }
          }
          e.on("loaderror");
        },
        urls: function (t) {
          return t
            ? (this.stop(),
              (this._urls = "string" == typeof t ? [t] : t),
              (this._loaded = !1),
              this.load(),
              this)
            : this._urls;
        },
        play: function (t, i) {
          var n = this;
          return ("function" == typeof t && (i = t),
          (t && "function" != typeof t) || (t = "_default"),
          n._loaded)
            ? n._sprite[t]
              ? (n._inactiveNode(function (s) {
                  s._sprite = t;
                  var o,
                    h,
                    l,
                    d = 0 < s._pos ? s._pos : n._sprite[t][0] / 1e3,
                    c = 0;
                  n._webAudio
                    ? ((c = n._sprite[t][1] / 1e3 - s._pos),
                      0 < s._pos && (d = n._sprite[t][0] / 1e3 + d))
                    : (c = n._sprite[t][1] / 1e3 - (d - n._sprite[t][0] / 1e3));
                  var p,
                    f = !(!n._loop && !n._sprite[t][2]),
                    m =
                      "string" == typeof i
                        ? i
                        : Math.round(Date.now() * Math.random()) + "";
                  if (
                    (((p = setTimeout(function () {
                      !n._webAudio && f && n.stop(m).play(t, m),
                        n._webAudio &&
                          !f &&
                          ((n._nodeById(m).paused = !0),
                          (n._nodeById(m)._pos = 0)),
                        n._webAudio || f || n.stop(m),
                        n.on("end", m);
                    }, 1e3 * c)),
                    n._onendTimer.push({ timer: p, id: m })),
                    n._webAudio)
                  ) {
                    var y = n._sprite[t][0] / 1e3,
                      x = n._sprite[t][1] / 1e3;
                    (s.id = m),
                      (s.paused = !1),
                      v(n, [f, y, x], m),
                      (n._playStart = e.currentTime),
                      (s.gain.value = n._volume),
                      void 0 === s.bufferSource.start
                        ? s.bufferSource.noteGrainOn(0, d, c)
                        : s.bufferSource.start(0, d, c);
                  } else {
                    if (
                      4 !== s.readyState &&
                      (s.readyState || !navigator.isCocoonJS)
                    )
                      return (
                        n._clearEndTimer(m),
                        (o = t),
                        (h = i),
                        (l = function () {
                          n.play(o, h),
                            s.removeEventListener("canplaythrough", l, !1);
                        }),
                        s.addEventListener("canplaythrough", l, !1),
                        n
                      );
                    (s.readyState = 4),
                      (s.id = m),
                      (s.currentTime = d),
                      (s.muted = u._muted || s.muted),
                      (s.volume = n._volume * u.volume()),
                      setTimeout(function () {
                        s.play();
                      }, 0);
                  }
                  return n.on("play"), "function" == typeof i && i(m), n;
                }),
                n)
              : ("function" == typeof i && i(), n)
            : (n.on("load", function () {
                n.play(t, i);
              }),
              n);
        },
        pause: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on("play", function () {
                e.pause(t);
              }),
              e
            );
          e._clearEndTimer(t);
          var i = t ? e._nodeById(t) : e._activeNode();
          if (i) {
            if (((i._pos = e.pos(null, t)), e._webAudio)) {
              if (!i.bufferSource || i.paused) return e;
              (i.paused = !0),
                void 0 === i.bufferSource.stop
                  ? i.bufferSource.noteOff(0)
                  : i.bufferSource.stop(0);
            } else i.pause();
          }
          return e.on("pause"), e;
        },
        stop: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on("play", function () {
                e.stop(t);
              }),
              e
            );
          e._clearEndTimer(t);
          var i = t ? e._nodeById(t) : e._activeNode();
          if (i) {
            if (((i._pos = 0), e._webAudio)) {
              if (!i.bufferSource || i.paused) return e;
              (i.paused = !0),
                void 0 === i.bufferSource.stop
                  ? i.bufferSource.noteOff(0)
                  : i.bufferSource.stop(0);
            } else isNaN(i.duration) || (i.pause(), (i.currentTime = 0));
          }
          return e;
        },
        mute: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on("play", function () {
                e.mute(t);
              }),
              e
            );
          var i = t ? e._nodeById(t) : e._activeNode();
          return i && (e._webAudio ? (i.gain.value = 0) : (i.muted = !0)), e;
        },
        unmute: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on("play", function () {
                e.unmute(t);
              }),
              e
            );
          var i = t ? e._nodeById(t) : e._activeNode();
          return (
            i && (e._webAudio ? (i.gain.value = e._volume) : (i.muted = !1)), e
          );
        },
        volume: function (t, e) {
          var i = this;
          if (0 <= (t = parseFloat(t)) && 1 >= t) {
            if (((i._volume = t), !i._loaded))
              return (
                i.on("play", function () {
                  i.volume(t, e);
                }),
                i
              );
            var n = e ? i._nodeById(e) : i._activeNode();
            return (
              n &&
                (i._webAudio
                  ? (n.gain.value = t)
                  : (n.volume = t * u.volume())),
              i
            );
          }
          return i._volume;
        },
        loop: function (t) {
          return "boolean" == typeof t ? ((this._loop = t), this) : this._loop;
        },
        sprite: function (t) {
          return "object" == typeof t
            ? ((this._sprite = t), this)
            : this._sprite;
        },
        pos: function (t, i) {
          var n = this;
          if (!n._loaded)
            return (
              n.on("load", function () {
                n.pos(t);
              }),
              "number" == typeof t ? n : n._pos || 0
            );
          t = parseFloat(t);
          var s = i ? n._nodeById(i) : n._activeNode();
          if (s)
            return 0 <= t
              ? (n.pause(i), (s._pos = t), n.play(s._sprite, i), n)
              : n._webAudio
              ? s._pos + (e.currentTime - n._playStart)
              : s.currentTime;
          if (0 <= t) return n;
          for (s = 0; s < n._audioNode.length; s++)
            if (n._audioNode[s].paused && 4 === n._audioNode[s].readyState)
              return n._webAudio
                ? n._audioNode[s]._pos
                : n._audioNode[s].currentTime;
        },
        pos3d: function (t, e, i, n) {
          var s = this;
          if (
            ((e = void 0 !== e && e ? e : 0),
            (i = void 0 !== i && i ? i : -0.5),
            !s._loaded)
          )
            return (
              s.on("play", function () {
                s.pos3d(t, e, i, n);
              }),
              s
            );
          if (!(0 <= t) && !(0 > t)) return s._pos3d;
          if (s._webAudio) {
            var o = n ? s._nodeById(n) : s._activeNode();
            o &&
              ((s._pos3d = [t, e, i]),
              o.panner.setPosition(t, e, i),
              (o.panner.panningModel = s._model || "HRTF"));
          }
          return s;
        },
        fade: function (t, e, i, n, s) {
          var o = this,
            h = Math.abs(t - e),
            l = t > e ? "down" : "up",
            h = h / 0.01,
            u = i / h;
          if (!o._loaded)
            return (
              o.on("load", function () {
                o.fade(t, e, i, n, s);
              }),
              o
            );
          o.volume(t, s);
          for (var d = 1; d <= h; d++)
            !(function () {
              var t =
                Math.round(
                  1e3 * (o._volume + ("up" === l ? 0.01 : -0.01) * d)
                ) / 1e3;
              setTimeout(function () {
                o.volume(t, s), t === e && n && n();
              }, u * d);
            })();
        },
        fadeIn: function (t, e, i) {
          return this.volume(0).play().fade(0, t, e, i);
        },
        fadeOut: function (t, e, i, n) {
          var s = this;
          return s.fade(
            s._volume,
            t,
            e,
            function () {
              i && i(), s.pause(n), s.on("end");
            },
            n
          );
        },
        _nodeById: function (t) {
          for (
            var e = this._audioNode[0], i = 0;
            i < this._audioNode.length;
            i++
          )
            if (this._audioNode[i].id === t) {
              e = this._audioNode[i];
              break;
            }
          return e;
        },
        _activeNode: function () {
          for (var t = null, e = 0; e < this._audioNode.length; e++)
            if (!this._audioNode[e].paused) {
              t = this._audioNode[e];
              break;
            }
          return this._drainPool(), t;
        },
        _inactiveNode: function (t) {
          for (var e, i = null, n = 0; n < this._audioNode.length; n++)
            if (
              this._audioNode[n].paused &&
              4 === this._audioNode[n].readyState
            ) {
              t(this._audioNode[n]), (i = !0);
              break;
            }
          if ((this._drainPool(), !i)) {
            if (this._webAudio) t((e = this._setupAudioNode()));
            else {
              this.load(), (e = this._audioNode[this._audioNode.length - 1]);
              var s = navigator.isCocoonJS
                  ? "canplaythrough"
                  : "loadedmetadata",
                o = function () {
                  e.removeEventListener(s, o, !1), t(e);
                };
              e.addEventListener(s, o, !1);
            }
          }
        },
        _drainPool: function () {
          var t,
            e = 0;
          for (t = 0; t < this._audioNode.length; t++)
            this._audioNode[t].paused && e++;
          for (t = this._audioNode.length - 1; 0 <= t && !(5 >= e); t--)
            this._audioNode[t].paused &&
              (this._webAudio && this._audioNode[t].disconnect(0),
              e--,
              this._audioNode.splice(t, 1));
        },
        _clearEndTimer: function (t) {
          for (var e = 0, i = 0; i < this._onendTimer.length; i++)
            if (this._onendTimer[i].id === t) {
              e = i;
              break;
            }
          (t = this._onendTimer[e]) &&
            (clearTimeout(t.timer), this._onendTimer.splice(e, 1));
        },
        _setupAudioNode: function () {
          var t = this._audioNode,
            i = this._audioNode.length;
          return (
            (t[i] =
              void 0 === e.createGain ? e.createGainNode() : e.createGain()),
            (t[i].gain.value = this._volume),
            (t[i].paused = !0),
            (t[i]._pos = 0),
            (t[i].readyState = 4),
            t[i].connect(h),
            (t[i].panner = e.createPanner()),
            (t[i].panner.panningModel = this._model || "equalpower"),
            t[i].panner.setPosition(
              this._pos3d[0],
              this._pos3d[1],
              this._pos3d[2]
            ),
            t[i].panner.connect(t[i]),
            t[i]
          );
        },
        on: function (t, e) {
          var i = this["_on" + t];
          if ("function" == typeof e) i.push(e);
          else
            for (var n = 0; n < i.length; n++)
              e ? i[n].call(this, e) : i[n].call(this);
          return this;
        },
        off: function (t, e) {
          for (
            var i = this["_on" + t], n = e.toString(), s = 0;
            s < i.length;
            s++
          )
            if (n === i[s].toString()) {
              i.splice(s, 1);
              break;
            }
          return this;
        },
        unload: function () {
          for (var e = this._audioNode, i = 0; i < this._audioNode.length; i++)
            e[i].paused || this.stop(e[i].id),
              this._webAudio ? e[i].disconnect(0) : (e[i].src = "");
          for (i = 0; i < this._onendTimer.length; i++)
            clearTimeout(this._onendTimer[i].timer);
          null !== (e = u._howls.indexOf(this)) &&
            0 <= e &&
            u._howls.splice(e, 1),
            delete t[this._src];
        },
      }),
      i)
    )
      var f = function (i, n) {
          if (n in t) (i._duration = t[n].duration), m(i);
          else {
            var s = new XMLHttpRequest();
            s.open("GET", n, !0),
              (s.responseType = "arraybuffer"),
              (s.onload = function () {
                e.decodeAudioData(
                  s.response,
                  function (e) {
                    e && ((t[n] = e), m(i, e));
                  },
                  function (t) {
                    i.on("loaderror");
                  }
                );
              }),
              (s.onerror = function () {
                i._webAudio &&
                  ((i._buffer = !0),
                  (i._webAudio = !1),
                  (i._audioNode = []),
                  delete i._gainNode,
                  i.load());
              });
            try {
              s.send();
            } catch (o) {
              s.onerror();
            }
          }
        },
        m = function (t, e) {
          (t._duration = e ? e.duration : t._duration),
            0 === Object.getOwnPropertyNames(t._sprite).length &&
              (t._sprite = { _default: [0, 1e3 * t._duration] }),
            t._loaded || ((t._loaded = !0), t.on("load")),
            t._autoplay && t.play();
        },
        v = function (i, n, s) {
          ((s = i._nodeById(s)).bufferSource = e.createBufferSource()),
            (s.bufferSource.buffer = t[i._src]),
            s.bufferSource.connect(s.panner),
            (s.bufferSource.loop = n[0]),
            n[0] &&
              ((s.bufferSource.loopStart = n[1]),
              (s.bufferSource.loopEnd = n[1] + n[2])),
            (s.bufferSource.playbackRate.value = i._rate);
        };
    "function" == typeof define &&
      define.amd &&
      define(function () {
        return { Howler: u, Howl: p };
      }),
      "undefined" != typeof exports &&
        ((exports.Howler = u), (exports.Howl = p)),
      "undefined" != typeof window && ((window.Howler = u), (window.Howl = p));
  })(),
  function () {
    var t = t || {};
    t.viewporter,
      (t.VERSION = "1.2"),
      (t.CANVAS = 0),
      (t.WEBGL = 1),
      (t.AUTO = 2),
      (t.HD = 640),
      (t.LANDSCAPE = 0),
      (t.PORTRAIT = 1),
      (t.SCROLL = 2e3);
    var e = null;
    (t._isWebGL = null),
      (t._isCanvas = !1),
      (t._currentRenderer = null),
      (t._isHD = !1),
      (t._isOrientation = !1),
      (t._isTouchable = null),
      (t._isLocalStorage = !1),
      (t._isWebAudio = !1),
      (t._isHtmlAudio = !1),
      (t._isAndroid = !1),
      (t._isChromeOS = !1),
      (t._isiOS = !1),
      (t._isArora = !1),
      (t._isChrome = !1),
      (t._isDolphin = !1),
      (t._isEpiphany = !1),
      (t._isFirefox = !1),
      (t._isMobileSafari = !1),
      (t._isStockAndroid = !1),
      (t._isIE = !1),
      (t._ieVersion = 0),
      (t._isMidori = !1),
      (t._isOpera = !1),
      (t._isSafari = !1),
      (t._isWebApp = !1),
      (t._isWebOS = !1),
      (t._isWindowsPhone = !1),
      (t._isBlackBerry = !1),
      (t._isKindle = !1),
      (t._isCocoonJS = !1),
      (t._pixelRatio = null),
      (t._isiPhone = !1),
      (t._isiPhone4 = !1),
      (t._isiPad = !1),
      (t._isDesktop = !1),
      (t._isLinux = !1),
      (t._isMacOS = !1),
      (t._isWindows = !1),
      (t._checkCanvas = function () {
        try {
          t._isCanvas =
            !!window.CanvasRenderingContext2D || navigator.isCocoonJS;
        } catch (e) {
          t._isCanvas = !1;
        }
      }),
      (t._checkWebGL = function () {
        var e = null;
        try {
          var i = document.createElement(
              navigator.isCocoonJS ? "screencanvas" : "canvas"
            ),
            e =
              !!window.WebGLRenderingContext &&
              (i.getContext("experimental-webgl") || i.getContext("webgl"));
        } catch (n) {
          return (t._isWebGL = !1);
        }
        t._isWebGL = null != e && !1 != e;
      });
    var i = t,
      n = void ("loading" === document.readyState
        ? document.addEventListener(
            "DOMContentLoaded",
            function () {
              t._checkCanvas();
            },
            !1
          )
        : t._checkCanvas()),
      s = void ("loading" === document.readyState
        ? document.addEventListener(
            "DOMContentLoaded",
            function () {
              t._checkWebGL();
            },
            !1
          )
        : t._checkWebGL());
    t._isTouchable = "ontouchstart" in window || "onmsgesturechange" in window;
    try {
      localStorage.setItem("ENEAtestItem", "testValue"),
        localStorage.removeItem("ENEAtestItem"),
        (t._isLocalStorage = !!window.localStorage);
    } catch (o) {
      t._isLocalStorage = !1;
    }
    var h,
      l,
      u = (t._isWebAudio =
        !!window.AudioContext ||
        !!window.webkitAudioContext ||
        !!window.mozAudioContext),
      d = (t._isHtmlAudio =
        !!document.createElement("audio").canPlayType && !!window.Audio),
      c =
        ((h = navigator.userAgent),
        void (/Android/.test(h)
          ? (t._isAndroid = !0)
          : /CrOS/.test(h)
          ? (t._isChromeOS = !0)
          : /iP[ao]d|iPhone/i.test(h)
          ? (t._isiOS = !0)
          : /Linux/.test(h)
          ? (t._isLinux = !0)
          : /Mac OS/.test(h)
          ? (t._isMacOS = !0)
          : /Windows/.test(h) && (t._isWindows = !0),
        (t._isWindows || t._isMacOS || (t._isLinux && 0 > h.indexOf("Silk"))) &&
          (t._isDesktop = !0))),
      p =
        ((l = navigator.userAgent),
        void (/Arora/.test(l)
          ? (t._isArora = !0)
          : /Dolfin/.test(l)
          ? (t._isDolphin = !0)
          : /Chrome/.test(l)
          ? (t._isChrome = !0)
          : /Epiphany/.test(l)
          ? (t._isEpiphany = !0)
          : /Firefox/.test(l)
          ? (t._isFirefox = !0)
          : /Mobile/.test(l)
          ? /Safari/.test(l) && (t._isMobileSafari = !0)
          : /Linux/.test(l) &&
            (-1 < l.indexOf("Silk") || -1 < l.indexOf("Kindle"))
          ? (t._isKindle = !0)
          : -1 < l.indexOf("Mozilla/5.0") &&
            (-1 < l.indexOf("Android") || -1 < l.indexOf("Linux")) &&
            -1 < l.indexOf("AppleWebKit") &&
            !(-1 < l.indexOf("Chrome"))
          ? (t._isStockAndroid = !0)
          : /MSIE (\d+\.\d+);/.test(l)
          ? ((t._isIE = !0), (t._ieVersion = parseInt(RegExp.$1, 10)))
          : /Trident\/(\d+\.\d+);/.test(l)
          ? ((t._isIE = !0), (t._ieVersion = parseInt(RegExp.$1, 10)))
          : /Midori/.test(l)
          ? (t._isMidori = !0)
          : /Opera/.test(l)
          ? (t._isOpera = !0)
          : /Safari/.test(l)
          ? (t._isSafari = !0)
          : /webos/i.test(l)
          ? (t._isWebOS = !0)
          : /Windows Phone/i.test(l)
          ? (t._isWindowsPhone = !0)
          : /BlackBerry/i.test(l) && (t._isBlackBerry = !0),
        navigator.standalone && (t._isWebApp = !0),
        (t._isCocoonJS = !!navigator.isCocoonJS))),
      f = (function () {
        (t._pixelRatio = window.devicePixelRatio || 1),
          (t._isiPhone =
            -1 != navigator.userAgent.toLowerCase().indexOf("iphone")),
          (t._isiPhone4 = 2 == this.pixelRatio && this.iPhone),
          (t._isiPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad"));
      })();
    (t._screen = {
      width: window.screen.availWidth * t._pixelRatio,
      height: window.screen.availHeight * t._pixelRatio,
    }),
      (t._isOrientation = window.orientation),
      Math.min(t._screen.width, t._screen.height) >= t.HD && (t._isHD = !0),
      (i._checkDevice = {
        _canvas: n,
        _webGL: s,
        _touchDevice: void 0,
        _localStorage: void 0,
        _webAudio: u,
        _htmlAudio: d,
        _checkOS: c,
        _checkBrowser: p,
        _device: f,
        _detectScreenResolution: void 0,
      }),
      (t.Game = function (i, n) {
        e = this;
        var s = i || {};
        if (
          ((s.background = i.background || 0),
          (s.canvas = i.canvas || null),
          (s.transparent = i.transparent || !1),
          (s.width = i.width || 320),
          (s.height = i.height || 480),
          (s.forceLandscape = i.forceLandscape || !1),
          (s.forcePortrait = i.forcePortrait || !1),
          (s.noResize = i.noResize || !1),
          (this.container =
            "string" == typeof n ? document.getElementById(n) : n),
          this.container || (this.container = document.body),
          (this._frameEnd = this._frameStart = null),
          (this.width = s.width),
          (this.halfWidth = s.width / 2),
          (this.height = s.height),
          (this.halfHeight = s.height / 2),
          isNaN(s.renderer) || s.renderer == t.AUTO
            ? (this.renderMethod = t.AUTO)
            : (this.renderMethod = s.renderer),
          (this.transparent = s.transparent),
          (this.background = s.background),
          isNaN(s.interactive) || s.interactive
            ? (this.interactive = !0)
            : (this.interactive = !1),
          isNaN(s.antialias) || !s.antialias
            ? (this.antialias = !1)
            : (this.antialias = !0),
          (this.canvas = s.canvas),
          (this.__updateList = []),
          isNaN(s.keepAspectRatio) || s.keepAspectRatio
            ? (this.keepAspectRatio = !0)
            : (this.keepAspectRatio = !1),
          (this.noResize = s.noResize),
          isNaN(s.alignHorizontally) || s.alignHorizontally
            ? (this.alignHorizontally = !0)
            : (this.alignHorizontally = !1),
          (this.aspectRatio = this.width / this.height),
          !t._isDesktop)
        ) {
          document.body.style.overflow = "visible";
          var o = document.createElement("div");
          document.body.appendChild(o);
        }
        this.canvas ||
          (this.canvas = document.createElement(
            navigator.isCocoonJS ? "screencanvas" : "canvas"
          )),
          (this.stage = new PIXI.Stage(this.background)),
          (this.stage.interactive = this.interactive),
          (this.renderer = this._createRenderer()),
          this.container.appendChild(this.renderer.view),
          (this.renderer.view.style.width = this.width + "px"),
          (this.renderer.view.style.height = this.height + "px"),
          this.resize(),
          window.addEventListener("resize", this.resize.bind(this), !1),
          document.body.addEventListener(
            "touchmove",
            function (t) {
              t.preventDefault();
            },
            !1
          ),
          document.body.addEventListener(
            "touchstart",
            function (t) {
              t.preventDefault();
            },
            !1
          ),
          (this.forceLandscape = s.forceLandscape),
          (this.forcePortrait = s.forcePortrait),
          (this.onChangeOrientation = this.onWrongOrientation = null),
          setTimeout(function () {
            e.orientation = new t.Orientation();
          }, 100);
      }),
      (t.Game.prototype._createRenderer = function () {
        var e = null,
          i = t._isDesktop ? "DESKTOP" : "MOBILE";
        if (
          (this.renderMethod == t.AUTO || this.renderMethod == t.WEBGL) &&
          t._isWebGL
        )
          (e = new PIXI.WebGLRenderer(
            this.width,
            this.height,
            this.canvas,
            this.transparent,
            this.antialias
          )),
            (t._currentRenderer = t.WEBGL),
            console.log(
              "%cENEA v" + t.VERSION + " | " + i + " | WEBGL |",
              "color: #009;"
            );
        else {
          if (
            (this.renderMethod != t.AUTO && this.renderMethod != t.CANVAS) ||
            !t._isCanvas
          )
            throw Error(
              "ENEA.Game : can't initialize Canvas or WebGL. Try to download newer browser"
            );
          (e = new PIXI.CanvasRenderer(
            this.width,
            this.height,
            this.canvas,
            this.transparent
          )),
            (t._currentRenderer = t.CANVAS),
            console.log(
              "%cENEA v" + t.VERSION + " | " + i + " | CANVAS |",
              "color: #009;"
            );
        }
        return e;
      }),
      (t.Game.prototype.setContextSmoothing = function (e) {
        t._currentRenderer == t.CANVAS &&
          ((this.renderer.context.imageSmoothingEnabled = e),
          (this.renderer.context.mozImageSmoothingEnabled = e),
          (this.renderer.context.oImageSmoothingEnabled = e),
          (this.renderer.context.webkitImageSmoothingEnabled = e),
          (this.renderer.context.msImageSmoothingEnabled = e));
      }),
      (t.Game.prototype.render = function () {
        for (var t in ((this._frameEnd = Date.now()),
        requestAnimFrame(this.render.bind(this)),
        this.__updateList))
          void 0 === this.__updateList[t] ||
            "function" != typeof this.__updateList[t] ||
            this.__updateList[t].postponed ||
            this.__updateList[t].call();
        this.renderer.render(this.stage), (this._frameStart = Date.now());
      }),
      (t.Game.prototype.getFrameTime = function () {
        return this._frameEnd - this._frameStart;
      }),
      (t.Game.prototype.addUpdate = function (t, e) {
        if ("function" == typeof e)
          (this.__updateList[t] = e), (this.__updateList[t].postponed = !1);
        else throw Error("ENEA.Game.addUpdate : input must be an function");
      }),
      (t.Game.prototype.postponeAllUpdates = function () {
        for (var t in this.__updateList) this.__updateList[t].postponed = !0;
      }),
      (t.Game.prototype.postponeUpdate = function (t) {
        if (void 0 !== this.__updateList[t] && null !== this.__updateList[t])
          this.__updateList[t].postponed = !0;
        else throw Error("ENEA.Game.postponeUpdate : update not found");
      }),
      (t.Game.prototype.reinstateAllUpdates = function () {
        for (var t in this.__updateList) this.__updateList[t].postponed = !1;
      }),
      (t.Game.prototype.reinstateUpdate = function (t) {
        if (void 0 !== this.__updateList[t] && null !== this.__updateList[t])
          this.__updateList[t].postponed = !1;
        else throw Error("ENEA.Game.reinstateUpdate : update not found");
      }),
      (t.Game.prototype.removeUpdate = function (t) {
        (this.__updateList[t] = null), delete this.__updateList[t];
      }),
      (t.Game.prototype.removeAllUpdates = function () {
        this.__updateList = [];
      }),
      (t.Game.prototype.resize = function () {
        this.noResize ||
          ((this.renderer.view.style.width =
            this.keepAspectRatio || t._isDesktop
              ? window.innerHeight * this.aspectRatio + "px"
              : window.innerWidth + "px"),
          (this.renderer.view.style.height = window.innerHeight + "px")),
          this._alignHorizontally();
      }),
      (t.Game.prototype._alignHorizontally = function () {
        if (this.alignHorizontally) {
          var t = this.renderer.view.style.width,
            t = parseInt(t.substring(0, t.length - 2), 10);
          this.renderer.view.style.marginLeft =
            Math.floor((window.innerWidth - t) / 2) + "px";
        } else this.renderer.view.style.marginLeft = "0px";
      }),
      (t.Game.prototype.relativeX = function (t) {
        return Math.floor(this.width * t);
      }),
      (t.Game.prototype.relativeY = function (t) {
        return Math.floor(this.height * t);
      }),
      Object.defineProperty(t.Game.prototype, "centerX", {
        get: function () {
          return Math.floor(this.width / 2);
        },
      }),
      Object.defineProperty(t.Game.prototype, "centerY", {
        get: function () {
          return Math.floor(this.height / 2);
        },
      }),
      (t.Container = function (t, e) {
        if ((PIXI.DisplayObjectContainer.call(this), null != t)) {
          if ("function" == typeof t) t.call(this, e);
          else throw Error("ENEA.Container : input needs to be an function");
        }
      }),
      (t.Container.constructor = t.Container),
      (t.Container.prototype = Object.create(
        PIXI.DisplayObjectContainer.prototype
      )),
      Object.defineProperty(PIXI.DisplayObject.prototype, "numChildren", {
        get: function () {
          return this.children.length;
        },
      }),
      (t.Container.prototype.removeAllChildren = function () {
        try {
          for (; this.children.length; )
            null != this.children[0].texture &&
              this.children[0].texture.destroy(),
              !this.children[0].destroy ||
                this.children[0] instanceof t.Container ||
                this.children[0].destroy(!0),
              this.removeChild(this.children[0]);
        } catch (e) {
          throw Error(
            "ENEA.Container.removeAllChildren : can't delete all children"
          );
        }
      }),
      Object.defineProperty(PIXI.DisplayObject.prototype, "responsive", {
        set: function (t) {
          this.buttonMode = this.interactive = t;
        },
      }),
      Object.defineProperty(PIXI.DisplayObject.prototype, "scaleX", {
        get: function () {
          return this.scale.x;
        },
        set: function (t) {
          this.scale.x = t;
        },
      }),
      Object.defineProperty(PIXI.DisplayObject.prototype, "scaleY", {
        get: function () {
          return this.scale.y;
        },
        set: function (t) {
          this.scale.y = t;
        },
      }),
      Object.defineProperty(PIXI.DisplayObject.prototype, "scaleXY", {
        set: function (t) {
          (this.scale.x = t), (this.scale.y = t);
        },
      }),
      (t.Container.prototype.destroy = function () {
        this.removeAllChildren(), this.parent && this.parent.removeChild(this);
      }),
      Object.defineProperty(PIXI.Sprite.prototype, "anchorX", {
        get: function () {
          return this.anchor.x;
        },
        set: function (t) {
          this.anchor.x = t;
        },
      }),
      Object.defineProperty(PIXI.Sprite.prototype, "anchorY", {
        get: function () {
          return this.anchor.y;
        },
        set: function (t) {
          this.anchor.y = t;
        },
      }),
      Object.defineProperty(PIXI.Sprite.prototype, "anchorXY", {
        set: function (t) {
          (this.anchor.x = t), (this.anchor.y = t);
        },
      }),
      (t.Preloader = function () {
        if (null == e)
          throw Error(
            "ENEA.Preloader : ENEA.Game needs to be initialized first"
          );
        (this.loaded = this.count = 0), (this.list = []);
      }),
      (t.Preloader.prototype.start = function () {
        var t = this;
        (this.loader = new PIXI.AssetLoader(this.list)),
          (this.loader.onProgress = function () {
            t.loaded++, t.onProgress && t.onProgress();
          }),
          (this.loader.onComplete = function () {
            t.onComplete && t.onComplete();
          }),
          this.loader.load();
      }),
      (t.Preloader.prototype.add = function (t) {
        this.list.push(t), this.count++;
      }),
      (t.Preloader.prototype.addImage = function (t) {
        this.list.push(t), this.count++;
      }),
      (t.Preloader.prototype.addBitmapFont = function (t, e) {
        this.list.push(t), this.count++, this.list.push(e), this.count++;
      }),
      (t.Preloader.prototype.addAtlas = function (t, e) {
        this.list.push(t), this.count++, this.list.push(e), this.count++;
      }),
      (t.ProgressBar = function (t) {
        if (null == e)
          throw Error(
            "ENEA.ProgressBar : ENEA.Game needs to be initialized first"
          );
        this._checkParameters(t),
          (this.loaded = 0),
          (this.error = !1),
          (this._x = e.centerX - this.pbParams.width / 2),
          (this._y = e.centerY - this.pbParams.height / 2),
          (this._step = this.pbParams.width / this.pbParams.count),
          this.draw(),
          this.update();
      }),
      (t.ProgressBar.prototype._checkParameters = function (i) {
        var n = {
          width: Math.floor(e.width / 1.5),
          height: 2,
          text: "LOADING",
          fontFace: "Tahoma",
          fontSize: "11pt",
          fontColor: "#FFFFFF",
          bgColor: 8421504,
          fgColor: 16777215,
          errColor: 16711680,
          count: 1,
        };
        this.pbParams = null == i || "undefined" == i ? n : t.mergeParams(n, i);
      }),
      (t.ProgressBar.prototype.draw = function () {
        (this.container = new PIXI.DisplayObjectContainer()),
          e.stage.addChild(this.container),
          navigator.isCocoonJS ||
            ((this.pbText = new PIXI.Text(this.pbParams.text, {
              font: this.pbParams.fontSize + " " + this.pbParams.fontFace,
              fill: this.pbParams.fontColor,
              align: "center",
            })),
            (this.pbText.position.x = e.centerX - this.pbText.width / 2),
            (this.pbText.position.y = this._y - this.pbText.height - 2),
            this.container.addChild(this.pbText)),
          (this.graphics = new PIXI.Graphics()),
          this.graphics.beginFill(this.pbParams.bgColor, 1),
          this.graphics.lineStyle(0, this.pbParams.bgColor, 1),
          this.graphics.drawRect(
            this._x,
            this._y,
            this.pbParams.width,
            this.pbParams.height
          ),
          this.graphics.endFill(),
          this.container.addChild(this.graphics);
      }),
      (t.ProgressBar.prototype.update = function () {
        this.graphics.clear(),
          this.graphics.beginFill(this.pbParams.bgColor, 1),
          this.graphics.lineStyle(0, this.pbParams.bgColor, 1),
          this.graphics.drawRect(
            this._x + this._step * this.loaded,
            this._y,
            this.pbParams.width - this._step * this.loaded,
            this.pbParams.height
          ),
          this.graphics.endFill(),
          this.graphics.beginFill(
            this.error ? this.pbParams.errColor : this.pbParams.fgColor,
            1
          ),
          this.graphics.lineStyle(
            0,
            this.error ? this.pbParams.errColor : this.pbParams.fgColor,
            1
          ),
          this.graphics.drawRect(
            this._x,
            this._y,
            this._step * this.loaded,
            this.pbParams.height
          ),
          this.graphics.endFill(),
          this.loaded >= this.pbParams.count &&
            this.onComplete &&
            this.onComplete();
      }),
      (t.ProgressBar.prototype.removeAllChildren = function () {
        try {
          for (; this.container.children.length; )
            this.container.children[0].destroy &&
              this.container.children[0].destroy(),
              this.container.removeChild(this.container.children[0]);
        } catch (t) {
          throw Error(
            "ENEA.ProgressBar.removeAllChildren : can't delete all children"
          );
        }
      }),
      (t.ProgressBar.prototype.destroy = function () {
        this.graphics.clear(),
          this.removeAllChildren(),
          this.container.parent &&
            this.container.parent.removeChild(this.container);
      }),
      (t.Timer = function () {
        (this._isActive = !1), (this._addToStartTime = 0), (this._dirty = !1);
      }),
      (t.Timer.prototype.reset = function () {
        (this.timerStart = 0),
          (this.timerEnd = null),
          (this.isPaused = !1),
          (this._pauseStart = Date.now()),
          (this._pauseTime = 0),
          (this._isActive = !1),
          this._dirty || (this._addToStartTime = 0);
      }),
      (t.Timer.prototype.start = function () {
        this.reset(),
          (this._isActive = !0),
          (this.timerStart = Date.now()),
          null !== this.onStarted && this.onStarted();
      }),
      (t.Timer.prototype.addStartTime = function (t) {
        (this._addToStartTime = t), (this._dirty = !0);
      }),
      (t.Timer.prototype.isActive = function () {
        return this._isActive;
      }),
      (t.Timer.prototype.stop = function () {
        this.isPaused && this.resume(),
          (this._dirty = this._isActive = !1),
          (this.timerEnd = Date.now()),
          null !== this.onStopped && this.onStopped();
      }),
      (t.Timer.prototype.pause = function () {
        this.isPaused ||
          ((this._pauseStart = Date.now()),
          (this.isPaused = !0),
          null === this.onPaused) ||
          this.onPaused();
      }),
      (t.Timer.prototype.resume = function () {
        this.isPaused &&
          ((this._pauseEnd = Date.now()),
          (this.isPaused = !1),
          (this._pauseTime += this._pauseEnd - this._pauseStart),
          null !== this.onResumed) &&
          this.onResumed();
      }),
      (t.Timer.prototype.onStarted = function () {}),
      (t.Timer.prototype.onPaused = function () {}),
      (t.Timer.prototype.onResumed = function () {}),
      (t.Timer.prototype.onStopped = function () {}),
      (t.Timer.prototype.getTotalTime = function () {
        return (
          null != this.timerEnd &&
          this.timerEnd - this.timerStart + this._addToStartTime
        );
      }),
      (t.Timer.prototype.getExecutionTime = function () {
        var t = Date.now();
        return this.isPaused
          ? t -
              this.timerStart -
              (t - this._pauseStart) +
              this._addToStartTime -
              this._pauseTime
          : null == this.timerEnd
          ? t - this.timerStart - this._pauseTime + this._addToStartTime
          : this.timerEnd -
            this.timerStart -
            this._pauseTime +
            this._addToStartTime;
      }),
      (t.Emitter = function (e) {
        var i = {
          spawnTime: 1,
          maxParticles: 20,
          x: 0,
          y: 0,
          dxInterval: [-0.5, 0.5],
          dyInterval: [-0.5, 0.5],
          liveInterval: [500, 1e3],
          frameRate: 60,
        };
        (this.params = null == e || "undefined" == e ? i : t.mergeParams(i, e)),
          (this._now = this._delta = null),
          (this._then = Date.now()),
          (this._emiting = !1),
          (this._currentSpawned = this._lastSpawned = null),
          (this.frameRate = this.params.frameRate),
          (this._spawnTime = this.params.spawnTime),
          (this.maxParticles = this.params.maxParticles),
          (this.x = this.params.x),
          (this.y = this.params.y),
          (this.particles = Array(this.maxParticles));
      }),
      (t.Emitter.prototype.init = function () {
        for (var t = 0; t < this.maxParticles; t++)
          this.particles[t] = this.createParticle();
      }),
      (t.Emitter.prototype.initDead = function () {
        for (var t = 0; t < this.maxParticles; t++)
          (this.particles[t] = this.createParticle()),
            (this.particles[t].dead = !0);
      }),
      (t.Emitter.prototype.createParticle = function () {
        return {
          x: this.x,
          y: this.y,
          dx: t.randomInterval(
            this.params.dxInterval[0],
            this.params.dxInterval[1]
          ),
          dy: t.randomInterval(
            this.params.dyInterval[0],
            this.params.dyInterval[1]
          ),
          dead: !1,
          live: t.randomInterval(
            this.params.liveInterval[0],
            this.params.liveInterval[1]
          ),
        };
      }),
      (t.Emitter.prototype.setDxInterval = function (t, e) {
        (this.params.dxInterval[0] = t), (this.params.dxInterval[1] = e);
      }),
      (t.Emitter.prototype.setDyInterval = function (t, e) {
        (this.params.dyInterval[0] = t), (this.params.dyInterval[1] = e);
      }),
      (t.Emitter.prototype.setLiveInterval = function (t, e) {
        (this.params.liveInterval[0] = t), (this.params.liveInterval[1] = e);
      }),
      (t.Emitter.prototype.update = function () {
        (this._now = Date.now()), (this._delta = this._now - this._then);
        for (var t = 0; t < this.maxParticles; t++)
          (this.particles[t].live -= this._delta),
            0 < this.particles[t].live
              ? ((this.particles[t].x += this.calculate(
                  this._delta,
                  this.particles[t].dx
                )),
                (this.particles[t].y += this.calculate(
                  this._delta,
                  this.particles[t].dy
                )))
              : this._emiting
              ? ((this._currentSpawned = Date.now()),
                this._currentSpawned - this._lastSpawned > this._spawnTime &&
                  ((this._lastSpawned = this._currentSpawned),
                  (this.particles[t] = this.createParticle())))
              : (this.particles[t].dead = !0);
        this._then = this._now;
      }),
      (t.Emitter.prototype.calculate = function (t, e) {
        return (this.frameRate / 1e3) * t * e;
      }),
      (t.Emitter.prototype.start = function () {
        this._emiting = !0;
      }),
      (t.Emitter.prototype.stop = function () {
        this._emiting = !1;
      }),
      (t.createCanvas = function (e) {
        var i = {
          id: "eneaDefaultCanvas",
          width: 2,
          height: 2,
          border: "1px solid",
          display: "none",
        };
        (this.params = null == e || "undefined" == e ? i : t.mergeParams(i, e)),
          (this.canvas = document.createElement(
            t._isCocoonJS ? "screencanvas" : "canvas"
          )),
          (this.canvas.id = this.params.id),
          (this.canvas.width = this.params.width),
          (this.canvas.height = this.params.height),
          (this.canvas.style.border = this.params.border),
          (this.canvas.style.display = this.params.display),
          document.body.appendChild(this.canvas),
          (this.context = this.canvas.getContext("2d")),
          null == this.context &&
            console.log("ENEA.createCanvas error : context is null");
      }),
      (t.createCanvas.prototype.getTexture = function () {
        return PIXI.Texture.fromCanvas(this.canvas);
      }),
      (t.createCanvas.prototype.destroy = function () {
        this.canvas.parentNode.removeChild(this.canvas);
      }),
      (t.randomInterval = function (t, e) {
        return Math.random() * (e - t) + t;
      }),
      (t.Orientation = function () {
        if (!t._isDesktop) {
          if (isNaN(t._isOrientation))
            throw Error(
              "ENEA.Orientation : device doesn't support window.orientation method"
            );
          this.check();
          var e = this;
          window.addEventListener(
            "orientationchange",
            function () {
              e.check(), e.onChangeOrientation();
            },
            !1
          );
        }
      }),
      (t.Orientation.prototype.check = function () {
        90 === Math.abs(window.orientation)
          ? ((e._isLandscape = !0),
            (e._isPortrait = !1),
            e.forcePortrait && this.onWrongOrientation())
          : ((e._isPortrait = !0),
            (e._isLandscape = !1),
            e.forceLandscape && this.onWrongOrientation());
      }),
      (t.Orientation.prototype.onWrongOrientation = function () {
        "function" == typeof e.onWrongOrientation && e.onWrongOrientation();
      }),
      (t.Orientation.prototype.onChangeOrientation = function () {
        e.resize(),
          "function" == typeof e.onChangeOrientation && e.onChangeOrientation();
      }),
      (t.Language = function () {
        (this._defaultLanguage = "en"),
          (this.languageDirectoryPath = "lang/"),
          (this.forceLanguage = null),
          (this._isAddressBarLang = !1),
          (this._langsrc = this._language = null);
      }),
      (t.Language.prototype._checkAddressBar = function () {
        try {
          var t = window.location.href.split("?");
          1 != t.length &&
            ((t = t[1].split("=")),
            "lang" == t[0] &&
              "" != t[1] &&
              ((this._isAddressBarLang = !0), (this._language = t[1])));
        } catch (e) {
          console.log("Error : " + e);
        }
        return this._isAddressBarLang;
      }),
      (t.Language.prototype.start = function () {
        var t = document.createElement("script");
        (t.type = "text/javascript"),
          (this._langsrc = this.languageDirectoryPath),
          (this._langsrc =
            null != this.forceLanguage
              ? this._langsrc + this.forceLanguage
              : this._langsrc +
                (this._checkAddressBar()
                  ? this._language
                  : this._defaultLanguage)),
          (this._langsrc += ".js"),
          (t.src = this._langsrc);
        var e = this;
        (t.onload = function () {
          "function" == typeof e.onLoad && e.onLoad();
        }),
          document.getElementsByTagName("head")[0].appendChild(t);
      }),
      (t.fadeElement = function (e, i, n, s, o, h) {
        var l = { alpha: i },
          u = {
            alpha: n,
            time: s,
            onStart: function () {
              o && o.call();
            },
            onUpdate: function () {
              e.alpha = t.normalize(l.alpha);
            },
            onComplete: function () {
              (e.alpha = u.alpha), h && h.call();
            },
            transition: "linear",
          };
        t.Tweener.addTween(l, u);
      }),
      (t.hideAddressBar = function () {
        t._isCocoonjs ||
          ((t.viewporter.preventPageScroll = !0),
          (t.viewporter.forceDetection = !0),
          t.viewporter.refresh()),
          e.resize();
      }),
      (t.randomString = function () {
        return Math.floor(Date.now() * Math.random()).toString();
      }),
      (t.normalize = function (t) {
        return 1 < t ? 1 : 0 > t ? 0 : t;
      }),
      (t.mergeParams = function (t, e) {
        for (var i in t)
          for (var n in e) i == n && null != e[n] && (t[i] = e[n]);
        return t;
      }),
      (t.Tweener = {
        twns: [],
        looping: !1,
        _ptime: 0,
        def: {
          time: 1,
          transition: "easeOutExpo",
          delay: 0,
          onStart: null,
          onStartParams: null,
          onUpdate: null,
          onUpdateParams: null,
          onComplete: null,
          onCompleteParams: null,
        },
      }),
      (t.Tweener.addTween = function (e, i) {
        var n,
          s = t.Tweener,
          o = {},
          h = [],
          l = [],
          u = [];
        for (n in s.def) o[n] = i[n] ? i[n] : s.def[n];
        for (n in i) s.def[n] || (h.push(e[n]), l.push(i[n] - e[n]), u.push(n));
        o.onStart &&
          (o.onStartParams
            ? o.onStart.apply(null, o.onStartParams)
            : o.onStart()),
          s.twns.push(new s.Tween(e, o, h, l, u)),
          s.loop();
      }),
      (t.Tweener.removeAll = function () {
        t.Tweener.twns = [];
      }),
      (t.Tweener.isTweening = function () {
        return 0 != t.Tweener.twns.length;
      }),
      (t.Tweener.loop = function () {
        var e = t.Tweener;
        e.looping || ((e._ptime = Date.now()), requestAnimFrame(e.step)),
          (e.looping = !0);
      }),
      (t.Tweener.step = function () {
        var e = t.Tweener,
          i = e._ptime;
        e._ptime = Date.now();
        for (var i = e._ptime - i, n = 0; n < e.twns.length; n++) {
          var s = e.twns[n];
          if (0 < s.tp.delay) s.tp.delay -= i;
          else {
            s.t += i;
            for (var o = s.tp.time, h = 0; h < s.prms.length; h++)
              s.obj[s.prms[h]] =
                s.t > o
                  ? s.bgns[h] + s.cngs[h]
                  : t.Tweener.easingFunctions[s.tp.transition](
                      s.t,
                      s.bgns[h],
                      s.cngs[h],
                      o
                    );
            s.tp.onUpdate &&
              (s.tp.onUpdateParams
                ? s.tp.onUpdate.apply(null, s.tp.onUpdateParams)
                : s.tp.onUpdate()),
              s.t > o &&
                (e.twns.splice(n--, 1), s.tp.onComplete) &&
                (s.tp.onCompleteParams
                  ? s.tp.onComplete.apply(null, s.tp.onCompleteParams)
                  : s.tp.onComplete());
          }
        }
        0 < e.twns.length ? requestAnimFrame(e.step) : (e.looping = !1);
      }),
      null == window.requestAnimFrame &&
        (window.requestAnimFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t) {
            window.setTimeout(t, 1e3 / 60);
          }),
      (t.Tweener.Tween = function (t, e, i, n, s) {
        (this.t = 0),
          (this.obj = t),
          (this.tp = e),
          (this.bgns = i),
          (this.cngs = n),
          (this.prms = s);
      }),
      (t.Tweener.easingFunctions = {
        easeNone: function (t, e, i, n) {
          return (i * t) / n + e;
        },
        easeInQuad: function (t, e, i, n) {
          return i * (t /= n) * t + e;
        },
        easeOutQuad: function (t, e, i, n) {
          return -i * (t /= n) * (t - 2) + e;
        },
        easeInOutQuad: function (t, e, i, n) {
          return 1 > (t /= n / 2)
            ? (i / 2) * t * t + e
            : (-i / 2) * (--t * (t - 2) - 1) + e;
        },
        easeInCubic: function (t, e, i, n) {
          return i * (t /= n) * t * t + e;
        },
        easeOutCubic: function (t, e, i, n) {
          return i * ((t = t / n - 1) * t * t + 1) + e;
        },
        easeInOutCubic: function (t, e, i, n) {
          return 1 > (t /= n / 2)
            ? (i / 2) * t * t * t + e
            : (i / 2) * ((t -= 2) * t * t + 2) + e;
        },
        easeOutInCubic: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutCubic(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInCubic(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInQuart: function (t, e, i, n) {
          return i * (t /= n) * t * t * t + e;
        },
        easeOutQuart: function (t, e, i, n) {
          return -i * ((t = t / n - 1) * t * t * t - 1) + e;
        },
        easeInOutQuart: function (t, e, i, n) {
          return 1 > (t /= n / 2)
            ? (i / 2) * t * t * t * t + e
            : (-i / 2) * ((t -= 2) * t * t * t - 2) + e;
        },
        easeOutInQuart: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutQuart(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInQuart(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInQuint: function (t, e, i, n) {
          return i * (t /= n) * t * t * t * t + e;
        },
        easeOutQuint: function (t, e, i, n) {
          return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
        },
        easeInOutQuint: function (t, e, i, n) {
          return 1 > (t /= n / 2)
            ? (i / 2) * t * t * t * t * t + e
            : (i / 2) * ((t -= 2) * t * t * t * t + 2) + e;
        },
        easeOutInQuint: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutQuint(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInQuint(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInSine: function (t, e, i, n) {
          return -i * Math.cos((t / n) * (Math.PI / 2)) + i + e;
        },
        easeOutSine: function (t, e, i, n) {
          return i * Math.sin((t / n) * (Math.PI / 2)) + e;
        },
        easeInOutSine: function (t, e, i, n) {
          return (-i / 2) * (Math.cos((Math.PI * t) / n) - 1) + e;
        },
        easeOutInSine: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutSine(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInSine(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInExpo: function (t, e, i, n) {
          return 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e - 0.001 * i;
        },
        easeOutExpo: function (t, e, i, n) {
          return t == n
            ? e + i
            : 1.001 * i * (-Math.pow(2, (-10 * t) / n) + 1) + e;
        },
        easeInOutExpo: function (t, e, i, n) {
          return 0 == t
            ? e
            : t == n
            ? e + i
            : 1 > (t /= n / 2)
            ? (i / 2) * Math.pow(2, 10 * (t - 1)) + e - 5e-4 * i
            : (i / 2) * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + e;
        },
        easeOutInExpo: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutExpo(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInExpo(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInCirc: function (t, e, i, n) {
          return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e;
        },
        easeOutCirc: function (t, e, i, n) {
          return i * Math.sqrt(1 - (t = t / n - 1) * t) + e;
        },
        easeInOutCirc: function (t, e, i, n) {
          return 1 > (t /= n / 2)
            ? (-i / 2) * (Math.sqrt(1 - t * t) - 1) + e
            : (i / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
        },
        easeOutInCirc: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutCirc(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInCirc(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
        easeInElastic: function (t, e, i, n, s, o) {
          return 0 == t
            ? e
            : 1 == (t /= n)
            ? e + i
            : (o || (o = 0.33 * n),
              !s || s < Math.abs(i)
                ? ((s = i), (i = o / 4))
                : (i = (o / (2 * Math.PI)) * Math.asin(i / s)),
              -(
                s *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin((2 * (t * n - i) * Math.PI) / o)
              ) + e);
        },
        easeOutElastic: function (t, e, i, n, s, o) {
          var h;
          return 0 == t
            ? e
            : 1 == (t /= n)
            ? e + i
            : (o || (o = 0.33 * n),
              !s || s < Math.abs(i)
                ? ((s = i), (h = o / 4))
                : (h = (o / (2 * Math.PI)) * Math.asin(i / s)),
              s *
                Math.pow(2, -10 * t) *
                Math.sin((2 * (t * n - h) * Math.PI) / o) +
                i +
                e);
        },
        easeInOutElastic: function (t, e, i, n, s, o) {
          var h;
          return 0 == t
            ? e
            : 2 == (t /= n / 2)
            ? e + i
            : (o || (o = 0.495 * n),
              !s || s < Math.abs(i)
                ? ((s = i), (h = o / 4))
                : (h = (o / (2 * Math.PI)) * Math.asin(i / s)),
              1 > t
                ? -0.5 *
                    s *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((2 * (t * n - h) * Math.PI) / o) +
                  e
                : s *
                    Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((2 * (t * n - h) * Math.PI) / o) *
                    0.5 +
                  i +
                  e);
        },
        easeOutInElastic: function (e, i, n, s, o, h) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutElastic(2 * e, i, n / 2, s, o, h)
            : t.Tweener.easingFunctions.easeInElastic(
                2 * e - s,
                i + n / 2,
                n / 2,
                s,
                o,
                h
              );
        },
        easeInBack: function (t, e, i, n, s) {
          return (
            void 0 == s && (s = 1.70158),
            i * (t /= n) * t * ((s + 1) * t - s) + e
          );
        },
        easeOutBack: function (t, e, i, n, s) {
          return (
            void 0 == s && (s = 1.70158),
            i * ((t = t / n - 1) * t * ((s + 1) * t + s) + 1) + e
          );
        },
        easeInOutBack: function (t, e, i, n, s) {
          return (
            void 0 == s && (s = 1.70158),
            1 > (t /= n / 2)
              ? (i / 2) * t * t * (((s *= 1.525) + 1) * t - s) + e
              : (i / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + e
          );
        },
        easeOutInBack: function (e, i, n, s, o) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutBack(2 * e, i, n / 2, s, o)
            : t.Tweener.easingFunctions.easeInBack(
                2 * e - s,
                i + n / 2,
                n / 2,
                s,
                o
              );
        },
        easeInBounce: function (e, i, n, s) {
          return (
            n - t.Tweener.easingFunctions.easeOutBounce(s - e, 0, n, s) + i
          );
        },
        easeOutBounce: function (t, e, i, n) {
          return (t /= n) < 1 / 2.75
            ? 7.5625 * i * t * t + e
            : t < 2 / 2.75
            ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
            : t < 2.5 / 2.75
            ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
            : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e;
        },
        easeInOutBounce: function (e, i, n, s) {
          return e < s / 2
            ? 0.5 * t.Tweener.easingFunctions.easeInBounce(2 * e, 0, n, s) + i
            : 0.5 *
                t.Tweener.easingFunctions.easeOutBounce(2 * e - s, 0, n, s) +
                0.5 * n +
                i;
        },
        easeOutInBounce: function (e, i, n, s) {
          return e < s / 2
            ? t.Tweener.easingFunctions.easeOutBounce(2 * e, i, n / 2, s)
            : t.Tweener.easingFunctions.easeInBounce(
                2 * e - s,
                i + n / 2,
                n / 2,
                s
              );
        },
      }),
      (t.Tweener.easingFunctions.linear = t.Tweener.easingFunctions.easeNone),
      (t.debug = function () {
        for (var e in (console.log("---------------------------"), t))
          t.hasOwnProperty(e) &&
            ("function" == typeof t[e]
              ? console.log("%c" + e + " : function", "color: #00b")
              : "object" == typeof t[e]
              ? console.log("%c" + e + " : object", "color: #0b0")
              : console.log(e + " : " + t[e]));
        console.log("---------------------------");
      }),
      "undefined" != typeof exports
        ? ("undefined" != typeof module &&
            module.exports &&
            (exports = module.exports = t),
          (exports.ENEA = t))
        : (this.ENEA = t);
  }.call(this),
  (function () {
    var t;
    if (
      ((ENEA.viewporter = {
        forceDetection: !1,
        disableLegacyAndroid: !0,
        ACTIVE: function () {
          return (
            !(
              (ENEA.viewporter.disableLegacyAndroid &&
                /android 2/i.test(navigator.userAgent)) ||
              /ipad/i.test(navigator.userAgent)
            ) &&
            !!(/webos/i.test(navigator.userAgent) || "ontouchstart" in window)
          );
        },
        READY: !1,
        isLandscape: function () {
          return 90 === window.orientation || -90 === window.orientation;
        },
        ready: function (t) {
          window.addEventListener("viewportready", t, !1);
        },
        change: function (t) {
          window.addEventListener("viewportchange", t, !1);
        },
        refresh: function () {
          t && t.prepareVisualViewport();
        },
        preventPageScroll: function () {
          document.body.addEventListener(
            "touchmove",
            function (t) {
              t.preventDefault();
            },
            !1
          ),
            document.body.addEventListener(
              "touchstart",
              function () {
                t.prepareVisualViewport();
              },
              !1
            );
        },
      }),
      (ENEA.viewporter.ACTIVE = ENEA.viewporter.ACTIVE()),
      ENEA.viewporter.ACTIVE)
    ) {
      var e = function () {
        var t = this;
        this.IS_ANDROID =
          /Android/.test(navigator.userAgent) &&
          !/Chrome/.test(navigator.userAgent);
        var e = function () {
          t.prepareVisualViewport();
          var e = window.orientation;
          window.addEventListener(
            "orientationchange",
            function () {
              window.orientation !== e &&
                (t.prepareVisualViewport(), (e = window.orientation));
            },
            !1
          );
        };
        "loading" === document.readyState
          ? document.addEventListener(
              "DOMContentLoaded",
              function () {
                e();
              },
              !1
            )
          : e();
      };
      (e.prototype = {
        getProfile: function () {
          if (ENEA.viewporter.forceDetection) return null;
          for (var t in ENEA.viewporter.profiles)
            if (RegExp(t).test(navigator.userAgent))
              return ENEA.viewporter.profiles[t];
          return null;
        },
        postProcess: function () {
          (ENEA.viewporter.READY = !0),
            this.triggerWindowEvent(
              this._firstUpdateExecuted ? "viewportchange" : "viewportready"
            ),
            (this._firstUpdateExecuted = !0);
        },
        prepareVisualViewport: function () {
          var t = this;
          if (navigator.standalone) return this.postProcess();
          document.documentElement.style.minHeight = "5000px";
          var e = window.innerHeight,
            i = this.getProfile(),
            n = ENEA.viewporter.isLandscape() ? "landscape" : "portrait";
          window.scrollTo(0, t.IS_ANDROID ? 1 : 0);
          var s = 40,
            o = window.setInterval(function () {
              window.scrollTo(0, t.IS_ANDROID ? 1 : 0),
                s--,
                ((t.IS_ANDROID
                  ? i && window.innerHeight === i[n]
                  : window.innerHeight > e) ||
                  0 > s) &&
                  ((document.documentElement.style.minHeight =
                    window.innerHeight + "px"),
                  (document.getElementById("viewporter").style.position =
                    "relative"),
                  (document.getElementById("viewporter").style.height =
                    window.innerHeight + "px"),
                  clearInterval(o),
                  t.postProcess());
            }, 10);
        },
        triggerWindowEvent: function (t) {
          var e = document.createEvent("Event");
          e.initEvent(t, !1, !1), window.dispatchEvent(e);
        },
      }),
        (t = new e());
    }
  })(),
  (ENEA.viewporter.profiles = {
    "iPhone|iPod": {
      ppi: function () {
        return 2 <= window.devicePixelRatio ? 326 : 163;
      },
      width: function (t, e) {
        return t * window.devicePixelRatio;
      },
      height: function (t, e) {
        return e * window.devicePixelRatio;
      },
      chromePrescale: function (t, e, i) {
        return 2 <= window.devicePixelRatio
          ? (navigator.standalone
              ? 0
              : ENEA.viewporter.isLandscape()
              ? 100
              : 124) *
              i +
              2
          : (navigator.standalone
              ? 0
              : ENEA.viewporter.isLandscape()
              ? 50
              : 62) *
              i +
              2;
      },
    },
    iPad: {
      ppi: 132,
      chrome: function (t, e) {
        return navigator.standalone
          ? 0
          : /OS 5_/.test(navigator.userAgent)
          ? 96
          : 78;
      },
    },
    "GT-I9000|GT-I9100|Nexus S": {
      ppi: function () {
        return /GT-I9000/.test(navigator.userAgent) ||
          /GT-I9100/.test(navigator.userAgent)
          ? 239.3
          : /Nexus S/.test(navigator.userAgent)
          ? 239
          : void 0;
      },
      width: 800,
      height: 480,
      chrome: 38,
    },
    MZ601: {
      ppi: 160,
      portrait: {
        width: function (t, e) {
          return e;
        },
        height: function (t, e) {
          return t;
        },
      },
      chrome: 152,
      inverseLandscape: !0,
    },
    "GT-P1000": { width: 1024, height: 600, portrait: { chrome: 38 } },
    "Desire_A8181|DesireHD_A9191": { width: 800, height: 480 },
    TF101: {
      ppi: 160,
      portrait: {
        width: function (t, e) {
          return e;
        },
        height: function (t, e) {
          return t;
        },
      },
      chrome: 103,
      inverseLandscape: !0,
    },
    A500: {
      portrait: {
        width: function (t, e) {
          return e;
        },
        height: function (t, e) {
          return t;
        },
      },
      inverseLandscape: !0,
    },
  }),
  function () {
    var t,
      e = e || {};
    e.FADETIME = 250;
    var i,
      n,
      s,
      o,
      h,
      l,
      u,
      d = 1 / 45,
      c = 100 * d,
      p = ENEA._isHD ? 9.81 : 3.924,
      f = ENEA._isHD ? 7 : 2.8,
      m = ENEA._isHD ? 5 : 1.6,
      v = ENEA._isHD ? 4 : 2,
      y = !1,
      x = !1,
      $ = ENEA._isHD ? 4 : 2,
      T = 0,
      _ = !1,
      S = null,
      w = [],
      C = null,
      A = null,
      E = null,
      L = null,
      R = null,
      M = null,
      P = null,
      F = null,
      B = null,
      D = null,
      O = null,
      I = null,
      k = null,
      G = null,
      U = null,
      N = null,
      W = null,
      X = null,
      Y = null,
      j = null,
      H = null,
      z = null,
      V = null,
      q = null,
      J = "",
      K = {
        fontPNG: ENEA._isHD ? "media/fb64.png" : "media/fb32.png",
        fontFNT: ENEA._isHD ? "media/fontb64.fnt" : "media/fontb32.fnt",
        atlas: ENEA._isHD ? "media/fb64.json" : "media/fb32.json",
      };
    (e.init = function () {
      (i = new ENEA.Game(
        {
          width: ENEA._isHD ? 640 : 256,
          height: ENEA._isHD ? 960 : 384,
          background: 3947580,
          keepAspectRatio: !1,
          forcePortrait: !0,
        },
        "FB-game-container"
      )),
        window.addEventListener(
          "viewportready",
          function () {
            ENEA.hideAddressBar();
          },
          !1
        ),
        i.setContextSmoothing(!0),
        i.render(),
        e.preload();
    }),
      (e.preload = function () {
        var i,
          n = new ENEA.Preloader();
        for (i in K) n.add(K[i]);
        (t = new ENEA.ProgressBar({
          text: "Loading... ",
          fontSize: ENEA._isHD ? "15pt" : "11pt",
          count: n.count + 1,
        })),
          (n.onProgress = function () {
            t.loaded++, t.update();
          }),
          (t.onComplete = e.onLoad),
          (w = new Howl({
            urls: [
              "sounds/sounds.m4a",
              "sounds/sounds.ogg",
              "sounds/sounds.wav",
            ],
            sprite: {
              flap: [2400, 300],
              hit: [1e3, 400],
              menu: [5500, 600],
              point: [3700, 800],
            },
            onload: function () {
              n.onProgress();
            },
            onloaderror: function () {
              n.onProgress(), console.log("Problem loading sounds");
            },
          })),
          n.start();
      }),
      window.addEventListener(
        "touchstart",
        function () {
          this.removeEventListener("touchstart", arguments.callee, !1);
          try {
            window.AudioContext =
              window.AudioContext || window.webkitAudioContext;
            var t = new AudioContext(),
              e = t.createBuffer(1, 1, 22050),
              i = t.createBufferSource();
            (i.buffer = e),
              i.connect(t.destination),
              i.noteOn(0),
              setTimeout(function () {}, 500);
          } catch (n) {
            console.log("Web Audio API is not supported");
          }
        },
        !1
      ),
      (e.onLoad = function () {
        (n = ENEA._isHD
          ? { font: "55px fontb", align: "right" }
          : { font: "22px fontb", align: "right" }),
          ENEA.fadeElement(t.container, 1, 0, e.FADETIME, null, function () {
            t.destroy(),
              (t = null),
              setTimeout(function () {
                e.initGameStuff(), e.initGameContainer(), e.menu();
              }, 100);
          });
      }),
      (e.Pipe = function () {
        (this.offset = i.relativeY(0.2)),
          (this.gap = ENEA._isHD ? i.relativeY(0.09) : i.relativeY(0.1)),
          (this.position = { x: 0, y: 0 }),
          (this.body = new ENEA.Container()),
          (this.texture = new PIXI.Texture.fromFrame("pipe.png")),
          (this.bodyTop = new PIXI.Sprite(this.texture)),
          (this.bodyTop.anchorX = 0),
          (this.bodyTop.anchorY = 1),
          (this.bodyTop.x = this.position.x),
          (this.bodyTop.y = this.position.y - this.gap),
          this.body.addChild(this.bodyTop),
          (this.bodyBottom = new PIXI.Sprite(this.texture)),
          (this.bodyBottom.anchorX = 0),
          (this.bodyBottom.anchorY = 0),
          (this.bodyBottom.x = this.position.x),
          (this.bodyBottom.y = this.position.y + this.gap),
          this.body.addChild(this.bodyBottom),
          (this.width = this.body.getBounds().width),
          (this.halfWidth = this.width / 2);
      }),
      (e.Player = function () {
        (this._Fy = 0),
          (this.position = { x: i.relativeX(0.33), y: i.centerY }),
          (this.velocity = 1e-5),
          (this.frameDimensions = ENEA._isHD ? 86 : 43),
          (this.frameDimensions3 = this.frameDimensions / 3),
          (this.frameDimensions4 = this.frameDimensions / 4),
          (this._now = this._delta = null),
          (this._then = Date.now()),
          (this.frameRate = 60),
          (this.currentFrame = 0),
          (this.owlTextures = []);
        for (var t = 0; 3 > t; t++) {
          var e = PIXI.Texture.fromFrame("bird" + (t + 1) + ".png");
          this.owlTextures.push(e),
            this.owlTextures.push(e),
            this.owlTextures.push(e),
            this.owlTextures.push(e);
        }
        (e = PIXI.Texture.fromFrame("bird2.png")),
          this.owlTextures.push(e),
          this.owlTextures.push(e),
          this.owlTextures.push(e),
          this.owlTextures.push(e),
          (this.body = new PIXI.MovieClip(this.owlTextures)),
          (this.body.loop = !1),
          (this.body.anchorXY = 0.5),
          (this.body.x = this.position.x),
          (this.body.y = this.position.y),
          (this.radius = this.frameDimensions / 2),
          (this.collisionRadius = this.frameDimensions / 2 - 8);
      }),
      (e.Player.prototype.update = function () {
        (this._Fy =
          (-0.5 * this.velocity * this.velocity * this.velocity) /
          Math.abs(this.velocity)),
          (this.velocity += (p + this._Fy) * d),
          (this.position.y += this.velocity * c),
          (this.body.y = this.position.y),
          (this.body.rotation = this.velocity / m);
      }),
      (e.Player.prototype.updateAnimation = function () {
        (this._now = Date.now()),
          (this._delta = this._now - this._then),
          (this.currentFrame += Math.round(
            (this._delta * this.frameRate) / 1e3
          )),
          this.body.gotoAndStop(this.currentFrame),
          (this._then = this._now);
      }),
      (e.mouseDown = function () {
        _ && ((_player.velocity -= f), ENEA._isIE || w.play("flap"));
      }),
      (e.mouseUp = function () {}),
      (e.keyDown = function (t) {
        if (32 == (t.keycode || t.which)) {
          switch (J) {
            case "menu":
              e.game();
              break;
            case "game":
              e.mouseDown();
              break;
            case "end":
              e.menu();
          }
          t.preventDefault();
        }
      }),
      (e.keyUp = function (t) {
        32 == (t.keycode || t.which) &&
          ("game" === J && e.mouseUp(), t.preventDefault());
      }),
      (e.resetBBs = function () {
        (h = new PIXI.Circle(0, 0, 1)),
          new PIXI.Rectangle(2, 2, 1, 1),
          (l = new PIXI.Rectangle(4, 4, 1, 1)),
          (u = new PIXI.Rectangle(6, 6, 1, 1));
      }),
      (e.initGameStuff = function () {
        e.resetBBs(), (_player = new e.Player());
        var t = PIXI.Texture.fromFrame("sky.png");
        ((C = new PIXI.Sprite(t)).anchorXY = 0),
          (C.x = 0),
          (C.y = 0),
          (t = PIXI.Texture.fromFrame("ground.png")),
          ((A = new PIXI.Sprite(t)).x = 0),
          (A.y = i.height - A.height),
          ((_groundSprite2 = new PIXI.Sprite(t)).x = i.width),
          (_groundSprite2.y = A.y),
          (E = new e.Pipe()),
          (L = new e.Pipe()),
          (t = PIXI.Texture.fromFrame("getready.png")),
          ((D = new PIXI.Sprite(t)).anchorXY = 0.5),
          (D.x = i.centerX),
          (D.y = i.relativeY(0.2)),
          ((R = new PIXI.BitmapText(T.toString(), n)).x =
            i.centerX - R.textWidth / 2),
          (R.y = i.relativeY(0.01) + R.textHeight / 2),
          (t = PIXI.Texture.fromFrame("white.png")),
          ((q = new PIXI.Sprite(t)).anchorXY = 0.5),
          (q.scaleXY = 10.1),
          (q.x = i.centerX),
          (q.y = i.centerY),
          (null !== i.titleScreen || "undefined" !== i.titleScreen) &&
            (i.titleScreen = new ENEA.Container()),
          (t = PIXI.Texture.fromFrame("logo.png")),
          ((M = new PIXI.Sprite(t)).anchorXY = 0.5),
          (M.x = i.centerX),
          (M.y = i.relativeY(0.15)),
          i.titleScreen.addChild(M),
          (t = PIXI.Texture.fromFrame("tap.png")),
          ((P = new PIXI.Sprite(t)).anchorX = 0.3),
          (P.anchorY = 0.9),
          (P.x = i.centerX + i.relativeX(0.011)),
          (P.y = i.centerY + i.relativeY(0.05)),
          i.titleScreen.addChild(P),
          (t = PIXI.Texture.fromFrame("start.png")),
          ((O = new PIXI.Sprite(t)).anchorX = 0.5),
          (O.anchorY = 0.5),
          (O.x = i.centerX),
          (O.y = i.relativeY(0.72)),
          i.titleScreen.addChild(O),
          (i.titleScreen.hitArea = new PIXI.Rectangle(0, 0, i.width, i.height)),
          (i.titleScreen.responsive = !0),
          (i.titleScreen.click = i.titleScreen.tap =
            function () {
              e.game();
            }),
          (i.moreGames = new ENEA.Container()),
          (t = PIXI.Texture.fromFrame("moregames.png")),
          ((t = new PIXI.Sprite(t)).anchorX = 0.5),
          (t.anchorY = 0.5),
          (t.x = i.centerX),
          (t.y = i.relativeY(0.8)),
          (t.responsive = !0),
          (t.click = t.tap =
            function () {
              window.open(
                "https://meow-games.com/en/?utm_source=" +
                  window.location.hostname.match(
                    /(?:[^.]+\.)?([^\/\.]+\.[^\/\.]+)/i
                  )?.[1] +
                  "&utm_medium=html5&utm_term=flappy-bird",
                "_blank"
              );
            }),
          i.moreGames.addChild(t),
          (null !== i.endScreen || "undefined" !== i.endScreen) &&
            (i.endScreen = new ENEA.Container()),
          (t = PIXI.Texture.fromFrame("gameover.png")),
          ((B = new PIXI.Sprite(t)).anchorXY = 0.5),
          (B.x = i.centerX),
          (B.y = i.relativeY(0.25)),
          i.endScreen.addChild(B),
          (V = PIXI.Texture.fromFrame("table.png")),
          ((I = new PIXI.Sprite(V)).anchorXY = 0.5),
          (I.x = i.centerX),
          (I.y = i.centerY),
          i.endScreen.addChild(I),
          (U = N = i.relativeX(0.33)),
          ((k = new PIXI.BitmapText("0", n)).x = i.centerX - k.textWidth + U),
          (k.y = i.centerY + i.relativeY(-0.072)),
          i.endScreen.addChild(k),
          (W = PIXI.Texture.fromFrame("medal0.png")),
          (X = PIXI.Texture.fromFrame("medal1.png")),
          (Y = PIXI.Texture.fromFrame("medal2.png")),
          (j = PIXI.Texture.fromFrame("medal3.png")),
          ((H = new PIXI.Sprite(W)).anchorX = 0.5),
          (H.anchorY = 0),
          (H.x = i.relativeX(0.283)),
          (H.y = i.relativeY(0.461)),
          (H.visible = !1),
          i.endScreen.addChild(H),
          ((G = new PIXI.BitmapText("0", n)).x = i.centerX - G.textWidth + N),
          (G.y = i.centerY + i.relativeY(0.061)),
          i.endScreen.addChild(G),
          (t = PIXI.Texture.fromFrame("new.png")),
          ((z = new PIXI.Sprite(t)).anchorX = 0.5),
          (z.anchorY = 0.5),
          (z.x = i.relativeX(0.54)),
          (z.y = i.relativeY(0.525)),
          (z.visible = !1),
          i.endScreen.addChild(z),
          (t = PIXI.Texture.fromFrame("continue.png")),
          ((F = new PIXI.Sprite(t)).anchorX = 0.5),
          (F.anchorY = 0.5),
          (F.x = i.centerX),
          (F.y = i.relativeY(0.72)),
          i.endScreen.addChild(F),
          (i.endScreen.hitArea = new PIXI.Rectangle(0, 0, i.width, i.height)),
          (i.endScreen.responsive = !0),
          (i.endScreen.click = i.endScreen.tap =
            function () {
              ENEA.fadeElement(
                i.main,
                1,
                0,
                e.FADETIME,
                function () {
                  i.endScreen.responsive = !1;
                },
                function () {
                  (H.visible = !1), i.removeUpdate("gameover"), e.menu();
                }
              );
            });
      }),
      (e.moreGamesLink = function (t) {
        t.originalEvent.preventDefault(), console.log("click");
      }),
      (e.initGameContainer = function () {
        (i.main = new ENEA.Container()),
          (i.main.responsive = !0),
          (i.main.alpha = 0),
          (i.main.mousedown = i.main.touchstart = e.mouseDown),
          (i.main.mouseup = i.main.touchend = e.mouseUp),
          i.main.addChild(C),
          i.main.addChild(E.body),
          i.main.addChild(L.body),
          i.main.addChild(A),
          i.main.addChild(_groundSprite2),
          i.main.addChild(_player.body),
          i.main.addChild(D),
          (D.visible = !1),
          i.main.addChild(R),
          (R.visible = !1),
          i.main.addChild(q),
          (q.visible = !1),
          i.main.addChild(i.titleScreen),
          (i.titleScreen.visible = !0),
          i.main.addChild(i.endScreen),
          (i.endScreen.visible = !1),
          i.main.addChild(i.moreGames),
          i.stage.addChild(i.main),
          i.addUpdate("paralax", function () {
            (A.position.x -= v),
              A.position.x <= -i.width && (A.position.x = i.width),
              (_groundSprite2.position.x -= v),
              _groundSprite2.position.x <= -i.width &&
                (_groundSprite2.position.x = i.width);
          }),
          i.addUpdate("playerAnim", function () {
            _player.updateAnimation();
          });
      }),
      (e.showPipes = function () {
        (E.body.visible = !0), (_ = L.body.visible = !0);
      }),
      (e.hidePipes = function () {
        (E.body.visible = !1), (_ = L.body.visible = !1);
      }),
      (e.menu = function () {
        ENEA._isIE || w.play("menu"),
          (J = "menu"),
          i.removeUpdate("pipe"),
          ($ = ENEA._isHD ? 4 : 2),
          (p = ENEA._isHD ? 9.81 : 3.924),
          (f = ENEA._isHD ? 7 : 2.8),
          e.hidePipes(),
          (D.visible = !1),
          (R.visible = !1),
          (i.endScreen.visible = !1),
          (i.titleScreen.visible = !0),
          (i.moreGames.visible = !0),
          (_player.position = { x: i.relativeX(0.33), y: i.centerY }),
          (_player.body.x = _player.position.x),
          (_player.body.y = _player.position.y);
        var t = (_player.body.rotation = 0);
        i.addUpdate("logo", function () {
          (t += 0.05),
            (M.position.y = Math.floor(
              i.relativeY(0.02) * Math.sin(t) + i.relativeY(0.16)
            ));
        }),
          ENEA.fadeElement(i.main, 0, 1, e.FADETIME);
      }),
      (e.isReturning = function () {
        return null !== localStorage.getItem("fb.enea.sk");
      }),
      (e.game = function () {
        (J = "game"),
          i.removeUpdate("logo"),
          (i.moreGames.visible = !1),
          (E.body.x = i.width),
          (s = Math.random() * (i.height / 1.2 - 2 * E.offset) + E.offset),
          (E.body.y = s),
          (L.body.x = E.body.x + E.width + i.halfWidth),
          (o = Math.random() * (i.height / 1.2 - 2 * L.offset) + L.offset),
          (L.body.y = o),
          (_player.velocity = -f / 10),
          (h.radius = _player.collisionRadius),
          (S = i.height / 1.2 - 2 * E.offset),
          (_randomRange2 = i.height / 1.2 - 2 * L.offset),
          (T = 0),
          R.setText(T.toString()),
          R.updateTransform(),
          (R.position.x = i.centerX - R.textWidth / 2),
          (i.titleScreen.visible = !1),
          (i.endScreen.visible = !1),
          (D.visible = !0),
          (D.alpha = 1);
        var t = 0;
        i.addUpdate("getready", function () {
          (t += 0.05),
            (D.position.y = Math.floor(
              i.relativeY(0.02) * Math.sin(t) + i.relativeY(0.16)
            ));
        }),
          setTimeout(function () {
            ENEA.fadeElement(D, 1, 0, 500, null, function () {
              (D.visible = !1), (R.visible = !0), i.removeUpdate("getready");
            });
          }, 1e3),
          e.showPipes(),
          e.getBoundingBoxes(),
          (_ = !1),
          setTimeout(function () {
            _ = !0;
          }, 100),
          i.addUpdate("player", function () {
            _player.update();
          }),
          setTimeout(function () {
            i.addUpdate("pipe", function () {
              (E.body.x -= $),
                0 > E.body.x + E.width &&
                  ((E.body.x = L.body.x + L.width + i.halfWidth),
                  (s = Math.random() * S + E.offset),
                  (E.body.y = s),
                  (y = !1)),
                (L.body.x -= $),
                0 > L.body.x + L.width &&
                  ((L.body.x = E.body.x + E.width + i.halfWidth),
                  (o = Math.random() * _randomRange2 + L.offset),
                  (L.body.y = o),
                  (x = !1));
            });
          }, 1500 + 2e3 * Math.random()),
          i.addUpdate("collision", function () {
            _ &&
              (e.checkCollisions(),
              E.body.x <= _player.body.x && !y && ((y = !0), e.updateScore()),
              L.body.x <= _player.body.x && !x && ((x = !0), e.updateScore()));
          });
      }),
      (e.checkCollisions = function () {
        e.getBoundingBoxes(),
          (e.intersects(h, l) ||
            e.intersects(h, u) ||
            e.intersects(h, _topPipe2BB) ||
            e.intersects(h, _bottomPipe2BB)) &&
            e.gameOver(),
          _player.position.y > i.height - A.height - _player.radius &&
            _ &&
            e.gameOver(),
          _player.position.y < _player.radius &&
            (_player.position.y = _player.radius);
      }),
      (e.circleIntersects = function (t, e) {
        if (e.canCollide) {
          var i = t.radius + e.radius;
          return !!(
            Math.abs(e.position.x - t.x) < i && Math.abs(e.position.y - t.y) < i
          );
        }
      }),
      (e.getBoundingBoxes = function () {
        (h.x = _player.body.x),
          (h.y = _player.body.y),
          (l = E.body.getChildAt(0).getBounds()),
          (u = E.body.getChildAt(1).getBounds()),
          (_topPipe2BB = L.body.getChildAt(0).getBounds()),
          (_bottomPipe2BB = L.body.getChildAt(1).getBounds());
      }),
      (e.updateScore = function (t) {
        ENEA._isIE || w.play("point"),
          null == t || "undefined" == t ? T++ : (T += t),
          R.setText(T.toString()),
          R.updateTransform(),
          (R.position.x = i.centerX - R.textWidth / 2);
      }),
      (e.updatePhysics = function () {
        ($ += ENEA._isHD ? 0.25 : 0.125), (p = 2.4525 * $), (f = 1.75 * $);
      }),
      (e.gameOver = function () {
        (D.visible = !1),
          ENEA._isIE || w.play("hit"),
          (_ = !1),
          i.removeUpdate("player"),
          i.removeUpdate("collision"),
          (_player.body.y = _player.position.y),
          (_player.body.rotation = _player.velocity / m);
        var t = { y: _player.body.y, r: _player.body.rotation, a: 1, shake: 0 };
        ENEA.Tweener.addTween(t, {
          y: i.height + _player.frameDimensions,
          r: 1,
          a: 0,
          shake: 70,
          time: 700,
          onStart: function () {
            (q.visible = !0), (q.alpha = 1);
          },
          onUpdate: function () {
            (_player.body.y = t.y),
              (_player.body.rotation = t.r),
              (q.alpha = t.a),
              40 > t.shake
                ? ((i.main.position.x = 10 * Math.random()),
                  (i.main.position.y = 5 * Math.random()))
                : ((i.main.position.x = 0), (i.main.position.y = 0));
          },
          onComplete: function () {
            e.gameOverMenu(), (q.visible = !1);
          },
          transition: "easeOutCubic",
        });
      }),
      (e.gameOverMenu = function () {
        (J = "doNothing"),
          (i.endScreen.responsive = !1),
          (H.visible = !1),
          (z.visible = !1),
          k.setText("0"),
          k.updateTransform(),
          (k.position.x = i.centerX - k.textWidth + U);
        var t = e.getScore();
        G.setText(t.toString()),
          G.updateTransform(),
          (G.position.x = i.centerX - G.textWidth + N),
          (i.endScreen.visible = !0),
          (i.moreGames.visible = !0);
        var n = 0;
        i.addUpdate("gameover", function () {
          (n += 0.05),
            (B.position.y = Math.floor(
              i.relativeY(0.02) * Math.sin(n) + i.relativeY(0.13)
            ));
        }),
          e.showMedal(),
          parseInt(t) < T ? e.setScore(T) : e.isReturning() || e.setScore(T),
          e.animScore(t);
      }),
      (e.animScore = function (t) {
        var e = { score: 0, old: T },
          n = {
            score: T,
            old: 0,
            time: 400,
            onStart: function () {},
            onUpdate: function () {
              k.setText(Math.floor(e.score).toString()),
                k.updateTransform(),
                (k.position.x = i.centerX - k.textWidth + U),
                R.setText(Math.floor(e.old).toString()),
                R.updateTransform(),
                (R.position.x = i.centerX - R.textWidth / 2),
                Math.floor(e.score) > parseInt(t) &&
                  ((z.visible = !0),
                  G.setText(Math.floor(e.score).toString()),
                  G.updateTransform(),
                  (G.x = i.centerX - G.textWidth + U));
            },
            onComplete: function () {
              (R.visible = !1),
                ENEA.Tweener.removeAll(),
                (J = "end"),
                (i.endScreen.responsive = !0);
            },
            transition: "linear",
          };
        0 == T && (n.time = 10), ENEA.Tweener.addTween(e, n);
      }),
      (e.showMedal = function () {
        20 <= T ? (H.setTexture(W), (H.visible = !0)) : (H.visible = !1),
          40 <= T && (H.setTexture(X), (H.visible = !0)),
          60 <= T && (H.setTexture(Y), (H.visible = !0)),
          80 <= T && (H.setTexture(j), (H.visible = !0));
      }),
      (e.getScore = function () {
        if (!ENEA._isLocalStorage) return 0;
        var t = localStorage.getItem("fb.enea.sk");
        return null === t ? 0 : t;
      }),
      (e.setScore = function (t) {
        ENEA._isLocalStorage && localStorage.setItem("fb.enea.sk", t);
      }),
      (e.intersects = function (t, i) {
        var n = e.clamp(t.x, i.x, i.x + i.width),
          s = e.clamp(t.y, i.y, i.y + i.height),
          n = t.x - n,
          s = t.y - s;
        return n * n + s * s < t.radius * t.radius;
      }),
      (e.clamp = function (t, e, i) {
        return t < e ? e : t > i ? i : t;
      }),
      (window.onload = function () {
        e.init(),
          ENEA._isDesktop
            ? ((document.onkeydown = e.keyDown), (document.onkeyup = e.keyUp))
            : (document.getElementById("lock").style.display = "block");
      }),
      "undefined" != typeof exports
        ? ("undefined" != typeof module &&
            module.exports &&
            (exports = module.exports = e),
          (exports.FB = e))
        : (this.FB = e);
  }.call(this);
