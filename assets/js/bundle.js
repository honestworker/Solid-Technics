(function(g, h) {
    function v(gb, v) {
        function Z(b) {
            return c.preferFlash && z && !c.ignoreFlash && c.flash[b] !== h && c.flash[b]
        }

        function q(b) {
            return function(c) {
                var d = this._s;
                return d && d._a ? b.call(this, c) : null
            }
        }
        this.setupOptions = {
            url: gb || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1e3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            forceUseGlobalHTML5Audio: !1,
            ignoreMobileRestrictions: !1,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !1,
            noSWFCache: !1,
            idPrefix: "sound"
        };
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onerror: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            playbackRate: 1,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        };
        this.flash9Options = {
            onfailure: null,
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        };
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: !1
            },
            opus: {
                type: ["audio/ogg; codecs=opus", "audio/opus"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            },
            flac: {
                type: ["audio/flac"],
                required: !1
            }
        };
        this.movieID = "sm2-container";
        this.id = v || "sm2movie";
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.versionNumber = "V2.97a.20170601";
        this.altURL = this.movieURL = this.version = null;
        this.enabled = this.swfLoaded = !1;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.didFlashBlock = this.muted = !1;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        };
        this.sandbox = {};
        this.html5 = {
            usingFlash: null
        };
        this.flash = {};
        this.ignoreFlash = this.html5Only = !1;
        var M, c = this,
            Na = null,
            k = null,
            aa, t = navigator.userAgent,
            Oa = g.location.href.toString(),
            n = document,
            oa, Pa, pa, m, x = [],
            N = !1,
            O = !1,
            l = !1,
            A = !1,
            qa = !1,
            P, w, ra, ba, sa, E, G, H, Qa, ta, ua, ca, I, da, F, va, Q, wa, ea, J, Ra, xa, ya, za, Sa, R = null,
            Aa = null,
            S, Ba, K, fa, ga, p, T = !1,
            Ca = !1,
            Ta, Ua, Va, ha = 0,
            U = null,
            ia, V = [],
            W, u = null,
            Wa, ja, X, Xa, C, ka, Da, Ya, r, hb = Array.prototype.slice,
            y = !1,
            Ea, z, Fa, Za, B, Y, $a = 0,
            Ga, Ha = t.match(/(ipad|iphone|ipod)/i),
            Ia = t.match(/android/i),
            D = t.match(/msie|trident/i),
            ib = t.match(/webkit/i),
            la = t.match(/safari/i) && !t.match(/chrome/i),
            Ja = t.match(/opera/i),
            ma = t.match(/(mobile|pre\/|xoom)/i) || Ha || Ia,
            ab = !Oa.match(/usehtml5audio/i) && !Oa.match(/sm2-ignorebadua/i) && la && !t.match(/silk/i) && t.match(/OS\sX\s10_6_([3-7])/i),
            Ka = n.hasFocus !== h ? n.hasFocus() : null,
            na = la && (n.hasFocus === h || !n.hasFocus()),
            bb = !na,
            cb = /(mp3|mp4|mpa|m4a|m4b)/i,
            La = n.location ? n.location.protocol.match(/http/i) : null,
            jb = La ? "" : "//",
            db = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            eb = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            kb = new RegExp("\\.(" + eb.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.useAltURL = !La;
        Xa = [null, "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED"];
        var Ma;
        try {
            Ma = Audio !== h && (Ja && opera !== h && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== h
        } catch (lb) {
            Ma = !1
        }
        this.hasHTML5 = Ma;
        this.setup = function(b) {
            var e = !c.url;
            b !== h && l && u && c.ok();
            ra(b);
            if (!y)
                if (ma) {
                    if (!c.setupOptions.ignoreMobileRestrictions || c.setupOptions.forceUseGlobalHTML5Audio) V.push(I.globalHTML5), y = !0
                } else c.setupOptions.forceUseGlobalHTML5Audio && (V.push(I.globalHTML5), y = !0);
            if (!Ga && ma)
                if (c.setupOptions.ignoreMobileRestrictions) V.push(I.ignoreMobile);
                else if (c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash = !1, Ha) c.ignoreFlash = !0;
            else if (Ia && !t.match(/android\s2\.3/i) || !Ia) y = !0;
            b && (e && Q && b.url !== h && c.beginDelayedInit(), Q || b.url === h || "complete" !== n.readyState || setTimeout(F, 1));
            Ga = !0;
            return c
        };
        this.supported = this.ok = function() {
            return u ? l && !A : c.useHTML5Audio && c.hasHTML5
        };
        this.getMovie = function(b) {
            return aa(b) || n[b] || g[b]
        };
        this.createSound = function(b, e) {
            function d() {
                a = fa(a);
                c.sounds[a.id] = new M(a);
                c.soundIDs.push(a.id);
                return c.sounds[a.id]
            }
            var a, f = null;
            if (!l || !c.ok()) return !1;
            e !== h && (b = {
                id: b,
                url: e
            });
            a = w(b);
            a.url = ia(a.url);
            a.id === h && (a.id = c.setupOptions.idPrefix + $a++);
            if (p(a.id, !0)) return c.sounds[a.id];
            if (ja(a)) f = d(), f._setup_html5(a);
            else {
                if (c.html5Only || c.html5.usingFlash && a.url && a.url.match(/data:/i)) return d();
                8 < m && null === a.isMovieStar && (a.isMovieStar = !!(a.serverURL || a.type && a.type.match(db) || a.url && a.url.match(kb)));
                a = ga(a, void 0);
                f = d();
                8 === m ? k._createSound(a.id, a.loops || 1, a.usePolicyFile) : (k._createSound(a.id, a.url, a.usePeakData, a.useWaveformData, a.useEQData, a.isMovieStar, a.isMovieStar ? a.bufferTime : !1, a.loops || 1, a.serverURL, a.duration || null, a.autoPlay, !0, a.autoLoad, a.usePolicyFile), a.serverURL || (f.connected = !0, a.onconnect && a.onconnect.apply(f)));
                a.serverURL || !a.autoLoad && !a.autoPlay || f.load(a)
            }!a.serverURL && a.autoPlay && f.play();
            return f
        };
        this.destroySound = function(b, e) {
            if (!p(b)) return !1;
            var d = c.sounds[b],
                a;
            d.stop();
            d._iO = {};
            d.unload();
            for (a = 0; a < c.soundIDs.length; a++)
                if (c.soundIDs[a] === b) {
                    c.soundIDs.splice(a, 1);
                    break
                }
            e || d.destruct(!0);
            delete c.sounds[b];
            return !0
        };
        this.load = function(b, e) {
            return p(b) ? c.sounds[b].load(e) : !1
        };
        this.unload = function(b) {
            return p(b) ? c.sounds[b].unload() : !1
        };
        this.onposition = this.onPosition = function(b, e, d, a) {
            return p(b) ? c.sounds[b].onposition(e, d, a) : !1
        };
        this.clearOnPosition = function(b, e, d) {
            return p(b) ? c.sounds[b].clearOnPosition(e, d) : !1
        };
        this.start = this.play = function(b, e) {
            var d = null,
                a = e && !(e instanceof Object);
            if (!l || !c.ok()) return !1;
            if (p(b, a)) a && (e = {
                url: e
            });
            else {
                if (!a) return !1;
                a && (e = {
                    url: e
                });
                e && e.url && (e.id = b, d = c.createSound(e).play())
            }
            null === d && (d = c.sounds[b].play(e));
            return d
        };
        this.setPlaybackRate = function(b, e, d) {
            return p(b) ? c.sounds[b].setPlaybackRate(e, d) : !1
        };
        this.setPosition = function(b, e) {
            return p(b) ? c.sounds[b].setPosition(e) : !1
        };
        this.stop = function(b) {
            return p(b) ? c.sounds[b].stop() : !1
        };
        this.stopAll = function() {
            for (var b in c.sounds) c.sounds.hasOwnProperty(b) && c.sounds[b].stop()
        };
        this.pause = function(b) {
            return p(b) ? c.sounds[b].pause() : !1
        };
        this.pauseAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].pause()
        };
        this.resume = function(b) {
            return p(b) ? c.sounds[b].resume() : !1
        };
        this.resumeAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].resume()
        };
        this.togglePause = function(b) {
            return p(b) ? c.sounds[b].togglePause() : !1
        };
        this.setPan = function(b, e) {
            return p(b) ? c.sounds[b].setPan(e) : !1
        };
        this.setVolume = function(b, e) {
            var d, a;
            if (b !== h && !isNaN(b) && e === h) {
                d = 0;
                for (a = c.soundIDs.length; d < a; d++) c.sounds[c.soundIDs[d]].setVolume(b);
                return !1
            }
            return p(b) ? c.sounds[b].setVolume(e) : !1
        };
        this.mute = function(b) {
            var e = 0;
            b instanceof String && (b = null);
            if (b) return p(b) ? c.sounds[b].mute() : !1;
            for (e = c.soundIDs.length - 1; 0 <= e; e--) c.sounds[c.soundIDs[e]].mute();
            return c.muted = !0
        };
        this.muteAll = function() {
            c.mute()
        };
        this.unmute = function(b) {
            b instanceof String && (b = null);
            if (b) return p(b) ? c.sounds[b].unmute() : !1;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].unmute();
            c.muted = !1;
            return !0
        };
        this.unmuteAll = function() {
            c.unmute()
        };
        this.toggleMute = function(b) {
            return p(b) ? c.sounds[b].toggleMute() : !1
        };
        this.getMemoryUse = function() {
            var b = 0;
            k && 8 !== m && (b = parseInt(k._getMemoryUse(), 10));
            return b
        };
        this.disable = function(b) {
            var e;
            b === h && (b = !1);
            if (A) return !1;
            A = !0;
            for (e = c.soundIDs.length - 1; 0 <= e; e--) ya(c.sounds[c.soundIDs[e]]);
            ya(c);
            P(b);
            r.remove(g, "load", G);
            return !0
        };
        this.canPlayMIME = function(b) {
            var e;
            c.hasHTML5 && (e = X({
                type: b
            }));
            !e && u && (e = b && c.ok() ? !!(8 < m && b.match(db) || b.match(c.mimePattern)) : null);
            return e
        };
        this.canPlayURL = function(b) {
            var e;
            c.hasHTML5 && (e = X({
                url: b
            }));
            !e && u && (e = b && c.ok() ? !!b.match(c.filePattern) : null);
            return e
        };
        this.canPlayLink = function(b) {
            return b.type !== h && b.type && c.canPlayMIME(b.type) ? !0 : c.canPlayURL(b.href)
        };
        this.getSoundById = function(b, e) {
            return b ? c.sounds[b] : null
        };
        this.onready = function(b, c) {
            if ("function" === typeof b) c || (c = g), sa("onready", b, c), E();
            else throw S("needFunction", "onready");
            return !0
        };
        this.ontimeout = function(b, c) {
            if ("function" === typeof b) c || (c = g), sa("ontimeout", b, c), E({
                type: "ontimeout"
            });
            else throw S("needFunction", "ontimeout");
            return !0
        };
        this._wD = this._writeDebug = function(b, c) {
            return !0
        };
        this._debug = function() {};
        this.reboot = function(b, e) {
            var d, a, f;
            for (d = c.soundIDs.length - 1; 0 <= d; d--) c.sounds[c.soundIDs[d]].destruct();
            if (k) try {
                D && (Aa = k.innerHTML), R = k.parentNode.removeChild(k)
            } catch (h) {}
            Aa = R = u = k = null;
            c.enabled = Q = l = T = Ca = N = O = A = y = c.swfLoaded = !1;
            c.soundIDs = [];
            c.sounds = {};
            $a = 0;
            Ga = !1;
            if (b) x = [];
            else
                for (d in x)
                    if (x.hasOwnProperty(d))
                        for (a = 0, f = x[d].length; a < f; a++) x[d][a].fired = !1;
            c.html5 = {
                usingFlash: null
            };
            c.flash = {};
            c.html5Only = !1;
            c.ignoreFlash = !1;
            g.setTimeout(function() {
                e || c.beginDelayedInit()
            }, 20);
            return c
        };
        this.reset = function() {
            return c.reboot(!0, !0)
        };
        this.getMoviePercent = function() {
            return k && "PercentLoaded" in k ? k.PercentLoaded() : null
        };
        this.beginDelayedInit = function() {
            qa = !0;
            F();
            setTimeout(function() {
                if (Ca) return !1;
                ea();
                da();
                return Ca = !0
            }, 20);
            H()
        };
        this.destruct = function() {
            c.disable(!0)
        };
        M = function(b) {
            var e, d, a = this,
                f, L, fb, g, n, q, t = !1,
                l = [],
                u = 0,
                x, A, v = null,
                z;
            d = e = null;
            this.sID = this.id = b.id;
            this.url = b.url;
            this._iO = this.instanceOptions = this.options = w(b);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this.isHTML5 = !1;
            this._a = null;
            z = !this.url;
            this.id3 = {};
            this._debug = function() {};
            this.load = function(b) {
                var e = null,
                    d;
                b !== h ? a._iO = w(b, a.options) : (b = a.options, a._iO = b, v && v !== a.url && (a._iO.url = a.url, a.url = null));
                a._iO.url || (a._iO.url = a.url);
                a._iO.url = ia(a._iO.url);
                d = a.instanceOptions = a._iO;
                if (!d.url && !a.url) return a;
                if (d.url === a.url && 0 !== a.readyState && 2 !== a.readyState) return 3 === a.readyState && d.onload && Y(a, function() {
                    d.onload.apply(a, [!!a.duration])
                }), a;
                a.loaded = !1;
                a.readyState = 1;
                a.playState = 0;
                a.id3 = {};
                if (ja(d)) e = a._setup_html5(d), e._called_load || (a._html5_canplay = !1, a.url !== d.url && (a._a.src = d.url, a.setPosition(0)), a._a.autobuffer = "auto", a._a.preload = "auto", a._a._called_load = !0);
                else {
                    if (c.html5Only || a._iO.url && a._iO.url.match(/data:/i)) return a;
                    try {
                        a.isHTML5 = !1, a._iO = ga(fa(d)), a._iO.autoPlay && (a._iO.position || a._iO.from) && (a._iO.autoPlay = !1), d = a._iO, 8 === m ? k._load(a.id, d.url, d.stream, d.autoPlay, d.usePolicyFile) : k._load(a.id, d.url, !!d.stream, !!d.autoPlay, d.loops || 1, !!d.autoLoad, d.usePolicyFile)
                    } catch (f) {
                        J({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        })
                    }
                }
                a.url = d.url;
                return a
            };
            this.unload = function() {
                0 !== a.readyState && (a.isHTML5 ? (g(), a._a && (a._a.pause(), v = ka(a._a))) : 8 === m ? k._unload(a.id, "about:blank") : k._unload(a.id), f());
                return a
            };
            this.destruct = function(b) {
                a.isHTML5 ? (g(), a._a && (a._a.pause(), ka(a._a), y || fb(), a._a._s = null, a._a = null)) : (a._iO.onfailure = null, k._destroySound(a.id));
                b || c.destroySound(a.id, !0)
            };
            this.start = this.play = function(b, e) {
                var d, f, g, L;
                d = !0;
                e = e === h ? !0 : e;
                b || (b = {});
                a.url && (a._iO.url = a.url);
                a._iO = w(a._iO, a.options);
                a._iO = w(b, a._iO);
                a._iO.url = ia(a._iO.url);
                a.instanceOptions = a._iO;
                if (!a.isHTML5 && a._iO.serverURL && !a.connected) return a.getAutoPlay() || a.setAutoPlay(!0), a;
                ja(a._iO) && (a._setup_html5(a._iO), n());
                if (1 === a.playState && !a.paused && (d = a._iO.multiShot, !d)) return a.isHTML5 && a.setPosition(a._iO.position), a;
                b.url && b.url !== a.url && (a.readyState || a.isHTML5 || 8 !== m || !z ? a.load(a._iO) : z = !1);
                if (!a.loaded)
                    if (0 === a.readyState) {
                        if (a.isHTML5 || c.html5Only)
                            if (a.isHTML5) a.load(a._iO);
                            else return a;
                        else a._iO.autoPlay = !0, a.load(a._iO);
                        a.instanceOptions = a._iO
                    } else if (2 === a.readyState) return a;
                !a.isHTML5 && 9 === m && 0 < a.position && a.position === a.duration && (b.position = 0);
                a.paused && 0 <= a.position && (!a._iO.serverURL || 0 < a.position) ? a.resume() : (a._iO = w(b, a._iO), (!a.isHTML5 && null !== a._iO.position && 0 < a._iO.position || null !== a._iO.from && 0 < a._iO.from || null !== a._iO.to) && 0 === a.instanceCount && 0 === a.playState && !a._iO.serverURL && (d = function() {
                    a._iO = w(b, a._iO);
                    a.play(a._iO)
                }, a.isHTML5 && !a._html5_canplay ? a.load({
                    _oncanplay: d
                }) : a.isHTML5 || a.loaded || a.readyState && 2 === a.readyState || a.load({
                    onload: d
                }), a._iO = A()), (!a.instanceCount || a._iO.multiShotEvents || a.isHTML5 && a._iO.multiShot && !y || !a.isHTML5 && 8 < m && !a.getAutoPlay()) && a.instanceCount++, a._iO.onposition && 0 === a.playState && q(a), a.playState = 1, a.paused = !1, a.position = a._iO.position === h || isNaN(a._iO.position) ? 0 : a._iO.position, a.isHTML5 || (a._iO = ga(fa(a._iO))), a._iO.onplay && e && (a._iO.onplay.apply(a), t = !0), a.setVolume(a._iO.volume, !0), a.setPan(a._iO.pan, !0), 1 !== a._iO.playbackRate && a.setPlaybackRate(a._iO.playbackRate), a.isHTML5 ? 2 > a.instanceCount ? (n(), d = a._setup_html5(), a.setPosition(a._iO.position), d.play()) : (f = new Audio(a._iO.url), g = function() {
                    r.remove(f, "ended", g);
                    a._onfinish(a);
                    ka(f);
                    f = null
                }, L = function() {
                    r.remove(f, "canplay", L);
                    try {
                        f.currentTime = a._iO.position / 1e3
                    } catch (b) {}
                    f.play()
                }, r.add(f, "ended", g), a._iO.volume !== h && (f.volume = Math.max(0, Math.min(1, a._iO.volume / 100))), a.muted && (f.muted = !0), a._iO.position ? r.add(f, "canplay", L) : f.play()) : (d = k._start(a.id, a._iO.loops || 1, 9 === m ? a.position : a.position / 1e3, a._iO.multiShot || !1), 9 !== m || d || a._iO.onplayerror && a._iO.onplayerror.apply(a)));
                return a
            };
            this.stop = function(b) {
                var c = a._iO;
                1 === a.playState && (a._onbufferchange(0), a._resetOnPosition(0), a.paused = !1, a.isHTML5 || (a.playState = 0), x(), c.to && a.clearOnPosition(c.to), a.isHTML5 ? a._a && (b = a.position, a.setPosition(0), a.position = b, a._a.pause(), a.playState = 0, a._onTimer(), g()) : (k._stop(a.id, b), c.serverURL && a.unload()), a.instanceCount = 0, a._iO = {}, c.onstop && c.onstop.apply(a));
                return a
            };
            this.setAutoPlay = function(b) {
                a._iO.autoPlay = b;
                a.isHTML5 || (k._setAutoPlay(a.id, b), b && (a.instanceCount || 1 !== a.readyState || a.instanceCount++))
            };
            this.getAutoPlay = function() {
                return a._iO.autoPlay
            };
            this.setPlaybackRate = function(b) {
                b = Math.max(.5, Math.min(4, b));
                if (a.isHTML5) try {
                    a._iO.playbackRate = b, a._a.playbackRate = b
                } catch (c) {}
                return a
            };
            this.setPosition = function(b) {
                b === h && (b = 0);
                var c = a.isHTML5 ? Math.max(b, 0) : Math.min(a.duration || a._iO.duration, Math.max(b, 0));
                a.position = c;
                b = a.position / 1e3;
                a._resetOnPosition(a.position);
                a._iO.position = c;
                if (!a.isHTML5) b = 9 === m ? a.position : b, a.readyState && 2 !== a.readyState && k._setPosition(a.id, b, a.paused || !a.playState, a._iO.multiShot);
                else if (a._a) {
                    if (a._html5_canplay) {
                        if (a._a.currentTime.toFixed(3) !== b.toFixed(3)) try {
                            a._a.currentTime = b, (0 === a.playState || a.paused) && a._a.pause()
                        } catch (d) {}
                    } else if (b) return a;
                    a.paused && a._onTimer(!0)
                }
                return a
            };
            this.pause = function(b) {
                if (a.paused || 0 === a.playState && 1 !== a.readyState) return a;
                a.paused = !0;
                a.isHTML5 ? (a._setup_html5().pause(), g()) : (b || b === h) && k._pause(a.id, a._iO.multiShot);
                a._iO.onpause && a._iO.onpause.apply(a);
                return a
            };
            this.resume = function() {
                var b = a._iO;
                if (!a.paused) return a;
                a.paused = !1;
                a.playState = 1;
                a.isHTML5 ? (a._setup_html5().play(), n()) : (b.isMovieStar && !b.serverURL && a.setPosition(a.position), k._pause(a.id, b.multiShot));
                !t && b.onplay ? (b.onplay.apply(a), t = !0) : b.onresume && b.onresume.apply(a);
                return a
            };
            this.togglePause = function() {
                if (0 === a.playState) return a.play({
                    position: 9 !== m || a.isHTML5 ? a.position / 1e3 : a.position
                }), a;
                a.paused ? a.resume() : a.pause();
                return a
            };
            this.setPan = function(b, c) {
                b === h && (b = 0);
                c === h && (c = !1);
                a.isHTML5 || k._setPan(a.id, b);
                a._iO.pan = b;
                c || (a.pan = b, a.options.pan = b);
                return a
            };
            this.setVolume = function(b, d) {
                b === h && (b = 100);
                d === h && (d = !1);
                a.isHTML5 ? a._a && (c.muted && !a.muted && (a.muted = !0, a._a.muted = !0), a._a.volume = Math.max(0, Math.min(1, b / 100))) : k._setVolume(a.id, c.muted && !a.muted || a.muted ? 0 : b);
                a._iO.volume = b;
                d || (a.volume = b, a.options.volume = b);
                return a
            };
            this.mute = function() {
                a.muted = !0;
                a.isHTML5 ? a._a && (a._a.muted = !0) : k._setVolume(a.id, 0);
                return a
            };
            this.unmute = function() {
                a.muted = !1;
                var b = a._iO.volume !== h;
                a.isHTML5 ? a._a && (a._a.muted = !1) : k._setVolume(a.id, b ? a._iO.volume : a.options.volume);
                return a
            };
            this.toggleMute = function() {
                return a.muted ? a.unmute() : a.mute()
            };
            this.onposition = this.onPosition = function(b, c, d) {
                l.push({
                    position: parseInt(b, 10),
                    method: c,
                    scope: d !== h ? d : a,
                    fired: !1
                });
                return a
            };
            this.clearOnPosition = function(a, b) {
                var c;
                a = parseInt(a, 10);
                if (!isNaN(a))
                    for (c = 0; c < l.length; c++) a !== l[c].position || b && b !== l[c].method || (l[c].fired && u--, l.splice(c, 1))
            };
            this._processOnPosition = function() {
                var b, c;
                b = l.length;
                if (!b || !a.playState || u >= b) return !1;
                for (--b; 0 <= b; b--) c = l[b], !c.fired && a.position >= c.position && (c.fired = !0, u++, c.method.apply(c.scope, [c.position]));
                return !0
            };
            this._resetOnPosition = function(a) {
                var b, c;
                b = l.length;
                if (!b) return !1;
                for (--b; 0 <= b; b--) c = l[b], c.fired && a <= c.position && (c.fired = !1, u--);
                return !0
            };
            A = function() {
                var b = a._iO,
                    c = b.from,
                    d = b.to,
                    e, f;
                f = function() {
                    a.clearOnPosition(d, f);
                    a.stop()
                };
                e = function() {
                    if (null !== d && !isNaN(d)) a.onPosition(d, f)
                };
                null === c || isNaN(c) || (b.position = c, b.multiShot = !1, e());
                return b
            };
            q = function() {
                var b, c = a._iO.onposition;
                if (c)
                    for (b in c)
                        if (c.hasOwnProperty(b)) a.onPosition(parseInt(b, 10), c[b])
            };
            x = function() {
                var b, c = a._iO.onposition;
                if (c)
                    for (b in c) c.hasOwnProperty(b) && a.clearOnPosition(parseInt(b, 10))
            };
            n = function() {
                a.isHTML5 && Ta(a)
            };
            g = function() {
                a.isHTML5 && Ua(a)
            };
            f = function(b) {
                b || (l = [], u = 0);
                t = !1;
                a._hasTimer = null;
                a._a = null;
                a._html5_canplay = !1;
                a.bytesLoaded = null;
                a.bytesTotal = null;
                a.duration = a._iO && a._iO.duration ? a._iO.duration : null;
                a.durationEstimate = null;
                a.buffered = [];
                a.eqData = [];
                a.eqData.left = [];
                a.eqData.right = [];
                a.failures = 0;
                a.isBuffering = !1;
                a.instanceOptions = {};
                a.instanceCount = 0;
                a.loaded = !1;
                a.metadata = {};
                a.readyState = 0;
                a.muted = !1;
                a.paused = !1;
                a.peakData = {
                    left: 0,
                    right: 0
                };
                a.waveformData = {
                    left: [],
                    right: []
                };
                a.playState = 0;
                a.position = null;
                a.id3 = {}
            };
            f();
            this._onTimer = function(b) {
                var c, f = !1,
                    h = {};
                (a._hasTimer || b) && a._a && (b || (0 < a.playState || 1 === a.readyState) && !a.paused) && (c = a._get_html5_duration(), c !== e && (e = c, a.duration = c, f = !0), a.durationEstimate = a.duration, c = 1e3 * a._a.currentTime || 0, c !== d && (d = c, f = !0), (f || b) && a._whileplaying(c, h, h, h, h));
                return f
            };
            this._get_html5_duration = function() {
                var b = a._iO;
                return (b = a._a && a._a.duration ? 1e3 * a._a.duration : b && b.duration ? b.duration : null) && !isNaN(b) && Infinity !== b ? b : null
            };
            this._apply_loop = function(a, b) {
                a.loop = 1 < b ? "loop" : ""
            };
            this._setup_html5 = function(b) {
                b = w(a._iO, b);
                var c = y ? Na : a._a,
                    d = decodeURI(b.url),
                    e;
                y ? d === decodeURI(Ea) && (e = !0) : d === decodeURI(v) && (e = !0);
                if (c) {
                    if (c._s)
                        if (y) c._s && c._s.playState && !e && c._s.stop();
                        else if (!y && d === decodeURI(v)) return a._apply_loop(c, b.loops), c;
                    e || (v && f(!1), c.src = b.url, Ea = v = a.url = b.url, c._called_load = !1)
                } else b.autoLoad || b.autoPlay ? (a._a = new Audio(b.url), a._a.load()) : a._a = Ja && 10 > opera.version() ? new Audio(null) : new Audio, c = a._a, c._called_load = !1, y && (Na = c);
                a.isHTML5 = !0;
                a._a = c;
                c._s = a;
                L();
                a._apply_loop(c, b.loops);
                b.autoLoad || b.autoPlay ? a.load() : (c.autobuffer = !1, c.preload = "auto");
                return c
            };
            L = function() {
                if (a._a._added_events) return !1;
                var b;
                a._a._added_events = !0;
                for (b in B) B.hasOwnProperty(b) && a._a && a._a.addEventListener(b, B[b], !1);
                return !0
            };
            fb = function() {
                var b;
                a._a._added_events = !1;
                for (b in B) B.hasOwnProperty(b) && a._a && a._a.removeEventListener(b, B[b], !1)
            };
            this._onload = function(b) {
                var c = !!b || !a.isHTML5 && 8 === m && a.duration;
                a.loaded = c;
                a.readyState = c ? 3 : 2;
                a._onbufferchange(0);
                c || a.isHTML5 || a._onerror();
                a._iO.onload && Y(a, function() {
                    a._iO.onload.apply(a, [c])
                });
                return !0
            };
            this._onerror = function(b, c) {
                a._iO.onerror && Y(a, function() {
                    a._iO.onerror.apply(a, [b, c])
                })
            };
            this._onbufferchange = function(b) {
                if (0 === a.playState || b && a.isBuffering || !b && !a.isBuffering) return !1;
                a.isBuffering = 1 === b;
                a._iO.onbufferchange && a._iO.onbufferchange.apply(a, [b]);
                return !0
            };
            this._onsuspend = function() {
                a._iO.onsuspend && a._iO.onsuspend.apply(a);
                return !0
            };
            this._onfailure = function(b, c, d) {
                a.failures++;
                if (a._iO.onfailure && 1 === a.failures) a._iO.onfailure(b, c, d)
            };
            this._onwarning = function(b, c, d) {
                if (a._iO.onwarning) a._iO.onwarning(b, c, d)
            };
            this._onfinish = function() {
                var b = a._iO.onfinish;
                a._onbufferchange(0);
                a._resetOnPosition(0);
                a.instanceCount && (a.instanceCount--, a.instanceCount || (x(), a.playState = 0, a.paused = !1, a.instanceCount = 0, a.instanceOptions = {}, a._iO = {}, g(), a.isHTML5 && (a.position = 0)), (!a.instanceCount || a._iO.multiShotEvents) && b && Y(a, function() {
                    b.apply(a)
                }))
            };
            this._whileloading = function(b, c, d, e) {
                var f = a._iO;
                a.bytesLoaded = b;
                a.bytesTotal = c;
                a.duration = Math.floor(d);
                a.bufferLength = e;
                a.durationEstimate = a.isHTML5 || f.isMovieStar ? a.duration : f.duration ? a.duration > f.duration ? a.duration : f.duration : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10);
                a.isHTML5 || (a.buffered = [{
                    start: 0,
                    end: a.duration
                }]);
                (3 !== a.readyState || a.isHTML5) && f.whileloading && f.whileloading.apply(a)
            };
            this._whileplaying = function(b, c, d, e, f) {
                var g = a._iO;
                if (isNaN(b) || null === b) return !1;
                a.position = Math.max(0, b);
                a._processOnPosition();
                !a.isHTML5 && 8 < m && (g.usePeakData && c !== h && c && (a.peakData = {
                    left: c.leftPeak,
                    right: c.rightPeak
                }), g.useWaveformData && d !== h && d && (a.waveformData = {
                    left: d.split(","),
                    right: e.split(",")
                }), g.useEQData && f !== h && f && f.leftEQ && (b = f.leftEQ.split(","), a.eqData = b, a.eqData.left = b, f.rightEQ !== h && f.rightEQ && (a.eqData.right = f.rightEQ.split(","))));
                1 === a.playState && (a.isHTML5 || 8 !== m || a.position || !a.isBuffering || a._onbufferchange(0), g.whileplaying && g.whileplaying.apply(a));
                return !0
            };
            this._oncaptiondata = function(b) {
                a.captiondata = b;
                a._iO.oncaptiondata && a._iO.oncaptiondata.apply(a, [b])
            };
            this._onmetadata = function(b, c) {
                var d = {},
                    e, f;
                e = 0;
                for (f = b.length; e < f; e++) d[b[e]] = c[e];
                a.metadata = d;
                a._iO.onmetadata && a._iO.onmetadata.call(a, a.metadata)
            };
            this._onid3 = function(b, c) {
                var d = [],
                    e, f;
                e = 0;
                for (f = b.length; e < f; e++) d[b[e]] = c[e];
                a.id3 = w(a.id3, d);
                a._iO.onid3 && a._iO.onid3.apply(a)
            };
            this._onconnect = function(b) {
                b = 1 === b;
                if (a.connected = b) a.failures = 0, p(a.id) && (a.getAutoPlay() ? a.play(h, a.getAutoPlay()) : a._iO.autoLoad && a.load()), a._iO.onconnect && a._iO.onconnect.apply(a, [b])
            };
            this._ondataerror = function(b) {
                0 < a.playState && a._iO.ondataerror && a._iO.ondataerror.apply(a)
            }
        };
        wa = function() {
            return n.body || n.getElementsByTagName("div")[0]
        };
        aa = function(b) {
            return n.getElementById(b)
        };
        w = function(b, e) {
            var d = b || {},
                a, f;
            a = e === h ? c.defaultOptions : e;
            for (f in a) a.hasOwnProperty(f) && d[f] === h && (d[f] = "object" !== typeof a[f] || null === a[f] ? a[f] : w(d[f], a[f]));
            return d
        };
        Y = function(b, c) {
            b.isHTML5 || 8 !== m ? c() : g.setTimeout(c, 0)
        };
        ba = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        };
        ra = function(b, e) {
            var d, a = !0,
                f = e !== h,
                g = c.setupOptions;
            for (d in b)
                if (b.hasOwnProperty(d))
                    if ("object" !== typeof b[d] || null === b[d] || b[d] instanceof Array || b[d] instanceof RegExp) f && ba[e] !== h ? c[e][d] = b[d] : g[d] !== h ? (c.setupOptions[d] = b[d], c[d] = b[d]) : ba[d] === h ? a = !1 : c[d] instanceof Function ? c[d].apply(c, b[d] instanceof Array ? b[d] : [b[d]]) : c[d] = b[d];
                    else if (ba[d] === h) a = !1;
            else return ra(b[d], d);
            return a
        };
        r = function() {
            function b(a) {
                a = hb.call(a);
                var b = a.length;
                d ? (a[1] = "on" + a[1], 3 < b && a.pop()) : 3 === b && a.push(!1);
                return a
            }

            function c(b, e) {
                var h = b.shift(),
                    g = [a[e]];
                if (d) h[g](b[0], b[1]);
                else h[g].apply(h, b)
            }
            var d = g.attachEvent,
                a = {
                    add: d ? "attachEvent" : "addEventListener",
                    remove: d ? "detachEvent" : "removeEventListener"
                };
            return {
                add: function() {
                    c(b(arguments), "add")
                },
                remove: function() {
                    c(b(arguments), "remove")
                }
            }
        }();
        B = {
            abort: q(function() {}),
            canplay: q(function() {
                var b = this._s,
                    c;
                if (!b._html5_canplay) {
                    b._html5_canplay = !0;
                    b._onbufferchange(0);
                    c = b._iO.position === h || isNaN(b._iO.position) ? null : b._iO.position / 1e3;
                    if (this.currentTime !== c) try {
                        this.currentTime = c
                    } catch (d) {}
                    b._iO._oncanplay && b._iO._oncanplay()
                }
            }),
            canplaythrough: q(function() {
                var b = this._s;
                b.loaded || (b._onbufferchange(0), b._whileloading(b.bytesLoaded, b.bytesTotal, b._get_html5_duration()), b._onload(!0))
            }),
            durationchange: q(function() {
                var b = this._s,
                    c;
                c = b._get_html5_duration();
                isNaN(c) || c === b.duration || (b.durationEstimate = b.duration = c)
            }),
            ended: q(function() {
                this._s._onfinish()
            }),
            error: q(function() {
                var b = Xa[this.error.code] || null;
                this._s._onload(!1);
                this._s._onerror(this.error.code, b)
            }),
            loadeddata: q(function() {
                var b = this._s;
                b._loaded || la || (b.duration = b._get_html5_duration())
            }),
            loadedmetadata: q(function() {}),
            loadstart: q(function() {
                this._s._onbufferchange(1)
            }),
            play: q(function() {
                this._s._onbufferchange(0)
            }),
            playing: q(function() {
                this._s._onbufferchange(0)
            }),
            progress: q(function(b) {
                var c = this._s,
                    d, a, f = 0,
                    f = b.target.buffered;
                d = b.loaded || 0;
                var h = b.total || 1;
                c.buffered = [];
                if (f && f.length) {
                    d = 0;
                    for (a = f.length; d < a; d++) c.buffered.push({
                        start: 1e3 * f.start(d),
                        end: 1e3 * f.end(d)
                    });
                    f = 1e3 * (f.end(0) - f.start(0));
                    d = Math.min(1, f / (1e3 * b.target.duration))
                }
                isNaN(d) || (c._whileloading(d, h, c._get_html5_duration()), d && h && d === h && B.canplaythrough.call(this, b))
            }),
            ratechange: q(function() {}),
            suspend: q(function(b) {
                var c = this._s;
                B.progress.call(this, b);
                c._onsuspend()
            }),
            stalled: q(function() {}),
            timeupdate: q(function() {
                this._s._onTimer()
            }),
            waiting: q(function() {
                this._s._onbufferchange(1)
            })
        };
        ja = function(b) {
            return b && (b.type || b.url || b.serverURL) ? b.serverURL || b.type && Z(b.type) ? !1 : b.type ? X({
                type: b.type
            }) : X({
                url: b.url
            }) || c.html5Only || b.url.match(/data:/i) : !1
        };
        ka = function(b) {
            var e;
            b && (e = la ? "about:blank" : c.html5.canPlayType("audio/wav") ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==" : "about:blank", b.src = e, b._called_unload !== h && (b._called_load = !1));
            y && (Ea = null);
            return e
        };
        X = function(b) {
            if (!c.useHTML5Audio || !c.hasHTML5) return !1;
            var e = b.url || null;
            b = b.type || null;
            var d = c.audioFormats,
                a;
            if (b && c.html5[b] !== h) return c.html5[b] && !Z(b);
            if (!C) {
                C = [];
                for (a in d) d.hasOwnProperty(a) && (C.push(a), d[a].related && (C = C.concat(d[a].related)));
                C = new RegExp("\\.(" + C.join("|") + ")(\\?.*)?$", "i")
            }(a = e ? e.toLowerCase().match(C) : null) && a.length ? a = a[1] : b && (e = b.indexOf(";"), a = (-1 !== e ? b.substr(0, e) : b).substr(6));
            a && c.html5[a] !== h ? e = c.html5[a] && !Z(a) : (b = "audio/" + a, e = c.html5.canPlayType({
                type: b
            }), e = (c.html5[a] = e) && c.html5[b] && !Z(b));
            return e
        };
        Ya = function() {
            function b(a) {
                var b, d = b = !1;
                if (!e || "function" !== typeof e.canPlayType) return b;
                if (a instanceof Array) {
                    k = 0;
                    for (b = a.length; k < b; k++)
                        if (c.html5[a[k]] || e.canPlayType(a[k]).match(c.html5Test)) d = !0, c.html5[a[k]] = !0, c.flash[a[k]] = !!a[k].match(cb);
                    b = d
                } else a = e && "function" === typeof e.canPlayType ? e.canPlayType(a) : !1, b = !(!a || !a.match(c.html5Test));
                return b
            }
            if (!c.useHTML5Audio || !c.hasHTML5) return u = c.html5.usingFlash = !0, !1;
            var e = Audio !== h ? Ja && 10 > opera.version() ? new Audio(null) : new Audio : null,
                d, a, f = {},
                g, k;
            g = c.audioFormats;
            for (d in g)
                if (g.hasOwnProperty(d) && (a = "audio/" + d, f[d] = b(g[d].type), f[a] = f[d], d.match(cb) ? (c.flash[d] = !0, c.flash[a] = !0) : (c.flash[d] = !1, c.flash[a] = !1), g[d] && g[d].related))
                    for (k = g[d].related.length - 1; 0 <= k; k--) f["audio/" + g[d].related[k]] = f[d], c.html5[g[d].related[k]] = f[d], c.flash[g[d].related[k]] = f[d];
            f.canPlayType = e ? b : null;
            c.html5 = w(c.html5, f);
            c.html5.usingFlash = Wa();
            u = c.html5.usingFlash;
            return !0
        };
        I = {};
        S = function() {};
        fa = function(b) {
            8 === m && 1 < b.loops && b.stream && (b.stream = !1);
            return b
        };
        ga = function(b, c) {
            b && !b.usePolicyFile && (b.onid3 || b.usePeakData || b.useWaveformData || b.useEQData) && (b.usePolicyFile = !0);
            return b
        };
        oa = function() {
            return !1
        };
        ya = function(b) {
            for (var c in b) b.hasOwnProperty(c) && "function" === typeof b[c] && (b[c] = oa)
        };
        za = function(b) {
            b === h && (b = !1);
            (A || b) && c.disable(b)
        };
        Sa = function(b) {
            var e = null;
            if (b)
                if (b.match(/\.swf(\?.*)?$/i)) {
                    if (e = b.substr(b.toLowerCase().lastIndexOf(".swf?") + 4)) return b
                } else b.lastIndexOf("/") !== b.length - 1 && (b += "/");
            b = (b && -1 !== b.lastIndexOf("/") ? b.substr(0, b.lastIndexOf("/") + 1) : "./") + c.movieURL;
            c.noSWFCache && (b += "?ts=" + (new Date).getTime());
            return b
        };
        ua = function() {
            m = parseInt(c.flashVersion, 10);
            8 !== m && 9 !== m && (c.flashVersion = m = 8);
            var b = c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
            c.useHTML5Audio && !c.html5Only && c.audioFormats.mp4.required && 9 > m && (c.flashVersion = m = 9);
            c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : 9 === m ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            8 < m ? (c.defaultOptions = w(c.defaultOptions, c.flash9Options), c.features.buffering = !0, c.defaultOptions = w(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 = new RegExp("\\.(mp3|" + eb.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0) : c.features.movieStar = !1;
            c.filePattern = c.filePatterns[8 !== m ? "flash9" : "flash8"];
            c.movieURL = (8 === m ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", b);
            c.features.peakData = c.features.waveformData = c.features.eqData = 8 < m
        };
        Ra = function(b, c) {
            k && k._setPolling(b, c)
        };
        xa = function() {};
        p = this.getSoundById;
        K = function() {
            var b = [];
            c.debugMode && b.push("sm2_debug");
            c.debugFlash && b.push("flash_debug");
            c.useHighPerformance && b.push("high_performance");
            return b.join(" ")
        };
        Ba = function() {
            S("fbHandler");
            var b = c.getMoviePercent(),
                e = {
                    type: "FLASHBLOCK"
                };
            c.html5Only || (c.ok() ? c.oMC && (c.oMC.className = [K(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (u && (c.oMC.className = K() + " movieContainer " + (null === b ? "swf_timedout" : "swf_error")), c.didFlashBlock = !0, E({
                type: "ontimeout",
                ignoreInit: !0,
                error: e
            }), J(e)))
        };
        sa = function(b, c, d) {
            x[b] === h && (x[b] = []);
            x[b].push({
                method: c,
                scope: d || null,
                fired: !1
            })
        };
        E = function(b) {
            b || (b = {
                type: c.ok() ? "onready" : "ontimeout"
            });
            if (!l && b && !b.ignoreInit || "ontimeout" === b.type && (c.ok() || A && !b.ignoreInit)) return !1;
            var e = {
                    success: b && b.ignoreInit ? c.ok() : !A
                },
                d = b && b.type ? x[b.type] || [] : [],
                a = [],
                f, e = [e],
                h = u && !c.ok();
            b.error && (e[0].error = b.error);
            b = 0;
            for (f = d.length; b < f; b++) !0 !== d[b].fired && a.push(d[b]);
            if (a.length)
                for (b = 0, f = a.length; b < f; b++) a[b].scope ? a[b].method.apply(a[b].scope, e) : a[b].method.apply(this, e), h || (a[b].fired = !0);
            return !0
        };
        G = function() {
            g.setTimeout(function() {
                c.useFlashBlock && Ba();
                E();
                "function" === typeof c.onload && c.onload.apply(g);
                c.waitForWindowLoad && r.add(g, "load", G)
            }, 1)
        };
        Fa = function() {
            if (z !== h) return z;
            var b = !1,
                c = navigator,
                d, a = g.ActiveXObject,
                f;
            try {
                f = c.plugins
            } catch (k) {
                f = void 0
            }
            if (f && f.length)(c = c.mimeTypes) && c["application/x-shockwave-flash"] && c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description && (b = !0);
            else if (a !== h && !t.match(/MSAppHost/i)) {
                try {
                    d = new a("ShockwaveFlash.ShockwaveFlash")
                } catch (n) {
                    d = null
                }
                b = !!d
            }
            return z = b
        };
        Wa = function() {
            var b, e, d = c.audioFormats;
            Ha && t.match(/os (1|2|3_0|3_1)\s/i) ? (c.hasHTML5 = !1, c.html5Only = !0, c.oMC && (c.oMC.style.display = "none")) : !c.useHTML5Audio || c.html5 && c.html5.canPlayType || (c.hasHTML5 = !1);
            if (c.useHTML5Audio && c.hasHTML5)
                for (e in W = !0, d) d.hasOwnProperty(e) && d[e].required && (c.html5.canPlayType(d[e].type) ? c.preferFlash && (c.flash[e] || c.flash[d[e].type]) && (b = !0) : (W = !1, b = !0));
            c.ignoreFlash && (b = !1, W = !0);
            c.html5Only = c.hasHTML5 && c.useHTML5Audio && !b;
            return !c.html5Only
        };
        ia = function(b) {
            var e, d, a = 0;
            if (b instanceof Array) {
                e = 0;
                for (d = b.length; e < d; e++)
                    if (b[e] instanceof Object) {
                        if (c.canPlayMIME(b[e].type)) {
                            a = e;
                            break
                        }
                    } else if (c.canPlayURL(b[e])) {
                    a = e;
                    break
                }
                b[a].url && (b[a] = b[a].url);
                b = b[a]
            }
            return b
        };
        Ta = function(b) {
            b._hasTimer || (b._hasTimer = !0, !ma && c.html5PollingInterval && (null === U && 0 === ha && (U = setInterval(Va, c.html5PollingInterval)), ha++))
        };
        Ua = function(b) {
            b._hasTimer && (b._hasTimer = !1, !ma && c.html5PollingInterval && ha--)
        };
        Va = function() {
            var b;
            if (null === U || ha)
                for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].isHTML5 && c.sounds[c.soundIDs[b]]._hasTimer && c.sounds[c.soundIDs[b]]._onTimer();
            else clearInterval(U), U = null
        };
        J = function(b) {
            b = b !== h ? b : {};
            "function" === typeof c.onerror && c.onerror.apply(g, [{
                type: b.type !== h ? b.type : null
            }]);
            b.fatal !== h && b.fatal && c.disable()
        };
        Za = function() {
            if (ab && Fa()) {
                var b = c.audioFormats,
                    e, d;
                for (d in b)
                    if (b.hasOwnProperty(d) && ("mp3" === d || "mp4" === d) && (c.html5[d] = !1, b[d] && b[d].related))
                        for (e = b[d].related.length - 1; 0 <= e; e--) c.html5[b[d].related[e]] = !1
            }
        };
        this._setSandboxType = function(b) {};
        this._externalInterfaceOK = function(b) {
            c.swfLoaded || (c.swfLoaded = !0, na = !1, ab && Za(), setTimeout(pa, D ? 100 : 1))
        };
        ea = function(b, e) {
            function d(a, b) {
                return '<param name="' + a + '" value="' + b + '" />'
            }
            if (N && O) return !1;
            if (c.html5Only) return ua(), c.oMC = aa(c.movieID), pa(), O = N = !0, !1;
            var a = e || c.url,
                f = c.altURL || a,
                g = wa(),
                k = K(),
                m = null,
                m = n.getElementsByTagName("html")[0],
                l, q, p, m = m && m.dir && m.dir.match(/rtl/i);
            b = b === h ? c.id : b;
            ua();
            c.url = Sa(La ? a : f);
            e = c.url;
            c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
            null !== c.wmode && (t.match(/msie 8/i) || !D && !c.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (V.push(I.spcWmode), c.wmode = null);
            g = {
                name: b,
                id: b,
                src: e,
                quality: "high",
                allowScriptAccess: c.allowScriptAccess,
                bgcolor: c.bgColor,
                pluginspage: jb + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: c.wmode,
                hasPriority: "true"
            };
            c.debugFlash && (g.FlashVars = "debug=1");
            c.wmode || delete g.wmode;
            if (D) a = n.createElement("div"), q = ['<object id="' + b + '" data="' + e + '" type="' + g.type + '" title="' + g.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', d("movie", e), d("AllowScriptAccess", c.allowScriptAccess), d("quality", g.quality), c.wmode ? d("wmode", c.wmode) : "", d("bgcolor", c.bgColor), d("hasPriority", "true"), c.debugFlash ? d("FlashVars", g.FlashVars) : "", "</object>"].join("");
            else
                for (l in a = n.createElement("embed"), g) g.hasOwnProperty(l) && a.setAttribute(l, g[l]);
            xa();
            k = K();
            if (g = wa())
                if (c.oMC = aa(c.movieID) || n.createElement("div"), c.oMC.id) p = c.oMC.className, c.oMC.className = (p ? p + " " : "movieContainer") + (k ? " " + k : ""), c.oMC.appendChild(a), D && (l = c.oMC.appendChild(n.createElement("div")), l.className = "sm2-object-box", l.innerHTML = q), O = !0;
                else {
                    c.oMC.id = c.movieID;
                    c.oMC.className = "movieContainer " + k;
                    l = k = null;
                    c.useFlashBlock || (c.useHighPerformance ? k = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : (k = {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    }, m && (k.left = Math.abs(parseInt(k.left, 10)) + "px")));
                    ib && (c.oMC.style.zIndex = 1e4);
                    if (!c.debugFlash)
                        for (p in k) k.hasOwnProperty(p) && (c.oMC.style[p] = k[p]);
                    try {
                        D || c.oMC.appendChild(a), g.appendChild(c.oMC), D && (l = c.oMC.appendChild(n.createElement("div")), l.className = "sm2-object-box", l.innerHTML = q), O = !0
                    } catch (r) {
                        throw Error(S("domError") + " \n" + r.toString())
                    }
                }
            return N = !0
        };
        da = function() {
            if (c.html5Only) return ea(), !1;
            if (k || !c.url) return !1;
            k = c.getMovie(c.id);
            k || (R ? (D ? c.oMC.innerHTML = Aa : c.oMC.appendChild(R), R = null, N = !0) : ea(c.id, c.url), k = c.getMovie(c.id));
            "function" === typeof c.oninitmovie && setTimeout(c.oninitmovie, 1);
            return !0
        };
        H = function() {
            setTimeout(Qa, 1e3)
        };
        ta = function() {
            g.setTimeout(function() {
                c.setup({
                    preferFlash: !1
                }).reboot();
                c.didFlashBlock = !0;
                c.beginDelayedInit()
            }, 1)
        };
        Qa = function() {
            var b, e = !1;
            c.url && !T && (T = !0, r.remove(g, "load", H), z && na && !Ka || (l || (b = c.getMoviePercent(), 0 < b && 100 > b && (e = !0)), setTimeout(function() {
                b = c.getMoviePercent();
                e ? (T = !1, g.setTimeout(H, 1)) : !l && bb && (null === b ? c.useFlashBlock || 0 === c.flashLoadTimeout ? c.useFlashBlock && Ba() : !c.useFlashBlock && W ? ta() : E({
                    type: "ontimeout",
                    ignoreInit: !0,
                    error: {
                        type: "INIT_FLASHBLOCK"
                    }
                }) : 0 !== c.flashLoadTimeout && (!c.useFlashBlock && W ? ta() : za(!0)))
            }, c.flashLoadTimeout)))
        };
        ca = function() {
            if (Ka || !na) return r.remove(g, "focus", ca), !0;
            Ka = bb = !0;
            T = !1;
            H();
            r.remove(g, "focus", ca);
            return !0
        };
        P = function(b) {
            if (l) return !1;
            if (c.html5Only) return l = !0, G(), !0;
            var e = !0,
                d;
            c.useFlashBlock && c.flashLoadTimeout && !c.getMoviePercent() || (l = !0);
            d = {
                type: !z && u ? "NO_FLASH" : "INIT_TIMEOUT"
            };
            if (A || b) c.useFlashBlock && c.oMC && (c.oMC.className = K() + " " + (null === c.getMoviePercent() ? "swf_timedout" : "swf_error")), E({
                type: "ontimeout",
                error: d,
                ignoreInit: !0
            }), J(d), e = !1;
            A || (c.waitForWindowLoad && !qa ? r.add(g, "load", G) : G());
            return e
        };
        Pa = function() {
            var b, e = c.setupOptions;
            for (b in e) e.hasOwnProperty(b) && (c[b] === h ? c[b] = e[b] : c[b] !== e[b] && (c.setupOptions[b] = c[b]))
        };
        pa = function() {
            if (l) return !1;
            if (c.html5Only) return l || (r.remove(g, "load", c.beginDelayedInit), c.enabled = !0, P()), !0;
            da();
            try {
                k._externalInterfaceTest(!1), Ra(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)), c.debugMode || k._disableDebug(), c.enabled = !0, c.html5Only || r.add(g, "unload", oa)
            } catch (b) {
                return J({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), za(!0), P(), !1
            }
            P();
            r.remove(g, "load", c.beginDelayedInit);
            return !0
        };
        F = function() {
            if (Q) return !1;
            Q = !0;
            Pa();
            xa();
            !z && c.hasHTML5 && c.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            });
            Ya();
            !z && u && (V.push(I.needFlash), c.setup({
                flashLoadTimeout: 1
            }));
            n.removeEventListener && n.removeEventListener("DOMContentLoaded", F, !1);
            da();
            return !0
        };
        Da = function() {
            "complete" === n.readyState && (F(), n.detachEvent("onreadystatechange", Da));
            return !0
        };
        va = function() {
            qa = !0;
            F();
            r.remove(g, "load", va)
        };
        Fa();
        r.add(g, "focus", ca);
        r.add(g, "load", H);
        r.add(g, "load", va);
        n.addEventListener ? n.addEventListener("DOMContentLoaded", F, !1) : n.attachEvent ? n.attachEvent("onreadystatechange", Da) : J({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        })
    }
    if (!g || !g.document) throw Error("SoundManager requires a browser with window and document objects.");
    var M = null;
    g.SM2_DEFER !== h && SM2_DEFER || (M = new v);
    "object" === typeof module && module && "object" === typeof module.exports ? (module.exports.SoundManager = v, module.exports.soundManager = M) : "function" === typeof define && define.amd && define(function() {
        return {
            constructor: v,
            getInstance: function(h) {
                !g.soundManager && h instanceof Function && (h = h(v), h instanceof v && (g.soundManager = h));
                return g.soundManager
            }
        }
    });
    g.SoundManager = v;
    g.soundManager = M
})(window);
var PMinlinePlayer = null;
(function() {
    "use strict";

    function InlinePlayer() {
        var self = this;
        var pl = this;
        var sm = soundManager;
        var isIE = navigator.userAgent.match(/msie/i);
        this.playableClass = "sm2_firestarter";
        this.excludeClass = "sm2-exclude";
        this.links = [];
        this.sounds = [];
        this.soundsByURL = [];
        this.indexByURL = [];
        this.lastSound = null;
        this.soundCount = 0;
        this.config = {
            playNext: true,
            autoPlay: false
        };
        this.css = {
            sDefault: "sm2_link",
            sLoading: "sm2_loading",
            sPlaying: "sm2_playing",
            sPaused: "sm2_paused"
        };
        this.addEventHandler = typeof window.addEventListener !== "undefined" ? function(o, evtName, evtHandler) {
            return o.addEventListener(evtName, evtHandler, false)
        } : function(o, evtName, evtHandler) {
            o.attachEvent("on" + evtName, evtHandler)
        };
        this.removeEventHandler = typeof window.removeEventListener !== "undefined" ? function(o, evtName, evtHandler) {
            return o.removeEventListener(evtName, evtHandler, false)
        } : function(o, evtName, evtHandler) {
            return o.detachEvent("on" + evtName, evtHandler)
        };
        this.classContains = function(o, cStr) {
            return typeof o.className !== "undefined" ? o.className.match(new RegExp("(\\s|^)" + cStr + "(\\s|$)")) : false
        };
        this.addClass = function(o, cStr) {
            if (!o || !cStr || self.classContains(o, cStr)) return;
            o.className = (o.className ? o.className + " " : "") + cStr
        };
        this.removeClass = function(o, cStr) {
            if (!o || !cStr || !self.classContains(o, cStr)) return;
            o.className = o.className.replace(new RegExp("( " + cStr + ")|(" + cStr + ")", "g"), "")
        };
        this.getSoundByURL = function(sURL) {
            return typeof self.soundsByURL[sURL] !== "undefined" ? self.soundsByURL[sURL] : null
        };
        this.isChildOfNode = function(o, sNodeName) {
            if (!o || !o.parentNode) {
                return false
            }
            sNodeName = sNodeName.toLowerCase();
            do {
                o = o.parentNode
            } while (o && o.parentNode && o.nodeName.toLowerCase() !== sNodeName);
            return o.nodeName.toLowerCase() === sNodeName ? o : null
        };
        this.events = {
            play: function() {
                var stoID = "#" + $(this._data.oLink).attr("id");
                $(stoID).removeClass(this._data.className);
                this._data.className = pl.css.sPlaying;
                $(stoID).addClass(this._data.className)
            },
            stop: function() {
                var stoID = "#" + $(this._data.oLink).attr("id");
                $(stoID).removeClass(this._data.className);
                this._data.className = ""
            },
            pause: function() {
                var stoID = "#" + $(this._data.oLink).attr("id");
                $(stoID).removeClass(this._data.className);
                this._data.className = pl.css.sPaused;
                $(stoID).addClass(this._data.className)
            },
            resume: function() {
                var stoID = "#" + $(this._data.oLink).attr("id");
                $(stoID).removeClass(this._data.className);
                this._data.className = pl.css.sPlaying;
                $(stoID).addClass(this._data.className)
            },
            finish: function() {
                pl.removeClass(this._data.oLink, this._data.className);
                this._data.className = "";
                if (pl.config.playNext) {
                    var nextLink = pl.indexByURL[this._data.oLink.href] + 1;
                    if (nextLink < pl.links.length) {
                        pl.handleClick({
                            target: pl.links[nextLink]
                        })
                    }
                }
            }
        };
        this.stopEvent = function(e) {
            if (typeof e !== "undefined" && typeof e.preventDefault !== "undefined") {
                e.preventDefault()
            } else if (typeof event !== "undefined" && typeof event.returnValue !== "undefined") {
                event.returnValue = false
            }
            return false
        };
        this.getTheDamnLink = isIE ? function(e) {
            return e && e.target ? e.target : window.event.srcElement
        } : function(e) {
            return e.target
        };
        this.handleClick = function(e) {
            if (typeof e.button !== "undefined" && e.button > 1) {
                return true
            }
            var o = self.getTheDamnLink(e);
            if (o.nodeName.toLowerCase() !== "a") {
                o = self.isChildOfNode(o, "a");
                if (!o) return true
            }
            if (!o.href || !sm.canPlayLink(o) && !self.classContains(o, self.playableClass) || self.classContains(o, self.excludeClass)) {
                return true
            }
            var soundURL = o.href;
            var thisSound = self.getSoundByURL(soundURL);
            if (thisSound) {
                if (thisSound === self.lastSound) {
                    thisSound.togglePause()
                } else {
                    sm._writeDebug("sound different than last sound: " + self.lastSound.id);
                    if (self.lastSound) {
                        self.stopSound(self.lastSound)
                    }
                    thisSound.togglePause()
                }
            } else {
                if (self.lastSound) {
                    self.stopSound(self.lastSound)
                }
                thisSound = sm.createSound({
                    id: "inlineMP3Sound" + self.soundCount++,
                    url: soundURL,
                    onplay: self.events.play,
                    onstop: self.events.stop,
                    onpause: self.events.pause,
                    onresume: self.events.resume,
                    onfinish: self.events.finish,
                    type: o.type || null
                });
                thisSound._data = {
                    oLink: o,
                    className: self.css.sPlaying
                };
                self.soundsByURL[soundURL] = thisSound;
                self.sounds.push(thisSound);
                thisSound.play()
            }
            self.lastSound = thisSound;
            if (typeof e !== "undefined" && typeof e.preventDefault !== "undefined") {
                e.preventDefault()
            } else {
                event.returnValue = false
            }
            return false
        };
        this.stopSound = function(oSound) {
            soundManager.stop(oSound.id);
            soundManager.unload(oSound.id)
        };
        this.init = function() {
            sm._writeDebug("PMinlinePlayer.init()");
            var oLinks = document.getElementsByClassName("sm2_button");
            var foundItems = 0;
            for (var i = 0, j = oLinks.length; i < j; i++) {
                if ((sm.canPlayLink(oLinks[i]) || self.classContains(oLinks[i], self.playableClass)) && !self.classContains(oLinks[i], self.excludeClass)) {
                    self.addClass(oLinks[i], self.css.sDefault);
                    self.links[foundItems] = oLinks[i];
                    self.indexByURL[oLinks[i].href] = foundItems;
                    foundItems++
                }
            }
            if (foundItems > 0) {
                self.addEventHandler(document, "click", self.handleClick);
                if (self.config.autoPlay) {
                    self.handleClick({
                        target: self.links[0],
                        preventDefault: function() {}
                    })
                }
            }
            sm._writeDebug("PMinlinePlayer.init(): Found " + foundItems + " relevant items.")
        };
        this.init()
    }
    window.PMinlinePlayer = PMinlinePlayer;
    soundManager.setup({
        debugMode: false,
        preferFlash: false,
        url: "assets/soundmanager/swf/",
        onready: function() {
            PMinlinePlayer = new InlinePlayer
        }
    })
})();
! function(e) {
    var t = function(e, t) {
            var a, n = e.charCodeAt(t);
            return 55296 > n || n > 56319 || e.length <= t + 1 || (a = e.charCodeAt(t + 1), 56320 > a || a > 57343) ? e[t] : e.substring(t, t + 2)
        },
        a = function(e, a, n) {
            for (var i, r = "", o = 0, c = 0, d = e.length; d > o;) i = t(e, o), c >= a && n > c && (r += i), o += i.length, c += 1;
            return r
        };
    e.fn.initial = function(t) {
        var n, i = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];
        return this.each(function() {
            var r = e(this),
                o = e.extend({
                    name: "Name",
                    color: null,
                    seed: 0,
                    charCount: 1,
                    textColor: "#ffffff",
                    height: 100,
                    width: 100,
                    fontSize: 60,
                    fontWeight: 400,
                    fontFamily: "HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif",
                    radius: 0
                }, t);
            o = e.extend(o, r.data());
            var c = a(o.name, 0, o.charCount).toUpperCase(),
                d = e('<text text-anchor="middle"></text>').attr({
                    y: "50%",
                    x: "50%",
                    dy: "0.35em",
                    "pointer-events": "auto",
                    fill: o.textColor,
                    "font-family": o.fontFamily
                }).html(c).css({
                    "font-weight": o.fontWeight,
                    "font-size": o.fontSize + "px"
                });
            if (null == o.color) {
                var h = Math.floor((c.charCodeAt(0) + o.seed) % i.length);
                n = i[h]
            } else n = o.color;
            var f = e("<svg></svg>").attr({
                xmlns: "http://www.w3.org/2000/svg",
                "pointer-events": "none",
                width: o.width,
                height: o.height
            }).css({
                "background-color": n,
                width: o.width + "px",
                height: o.height + "px",
                "border-radius": o.radius + "px",
                "-moz-border-radius": o.radius + "px"
            });
            f.append(d);
            var l = window.btoa(unescape(encodeURIComponent(e("<div>").append(f.clone()).html())));
            r.attr("src", "data:image/svg+xml;base64," + l)
        })
    }
}(jQuery);
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? exports.cropit = t(require("jquery")) : e.cropit = t(e.jQuery)
}(this, function(e) {
    return function(e) {
        var t = {};

        function i(o) {
            if (t[o]) return t[o].exports;
            var n = t[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(n.exports, n, n.exports, i), n.loaded = !0, n.exports
        }
        return i.m = e, i.c = t, i.p = "", i(0)
    }([function(e, t, i) {
        var o = Array.prototype.slice;

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = n(i(1)),
            s = n(i(2)),
            r = i(4),
            h = i(6),
            m = function(e, t) {
                return e.each(function() {
                    var e = a.default.data(this, r.PLUGIN_KEY);
                    e && t(e)
                })
            },
            l = function(e, t, i) {
                var o = e.first().data(r.PLUGIN_KEY);
                return o && a.default.isFunction(o[t]) ? o[t](i) : null
            },
            d = {
                init: function(e) {
                    return this.each(function() {
                        if (!a.default.data(this, r.PLUGIN_KEY)) {
                            var t = new s.default(a.default, this, e);
                            a.default.data(this, r.PLUGIN_KEY, t)
                        }
                    })
                },
                destroy: function() {
                    return this.each(function() {
                        a.default.removeData(this, r.PLUGIN_KEY)
                    })
                },
                isZoomable: function() {
                    return l(this, "isZoomable")
                },
                export: function(e) {
                    return l(this, "getCroppedImageData", e)
                }
            };
        a.default.fn.cropit = function(e) {
            return d[e] ? d[e].apply(this, Array.prototype.slice.call(arguments, 1)) : ["imageState", "imageSrc", "offset", "previewSize", "imageSize", "zoom", "initialZoom", "exportZoom", "minZoom", "maxZoom"].indexOf(e) >= 0 ? function(e, t, i) {
                return (0, h.exists)(i) ? m(e, function(e) {
                    e[t] = i
                }) : e.first().data(r.PLUGIN_KEY)[t]
            }.apply(void 0, [this].concat(o.call(arguments))) : ["rotateCW", "rotateCCW", "disable", "reenable"].indexOf(e) >= 0 ? function(e, t) {
                return m(e, function(e) {
                    e[t]()
                })
            }.apply(void 0, [this].concat(o.call(arguments))) : d.init.apply(this, arguments)
        }
    }, function(t, i) {
        t.exports = e
    }, function(e, t, i) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, i, o) {
                return i && e(t.prototype, i), o && e(t, o), t
            }
        }();

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = n(i(1)),
            s = n(i(3)),
            r = i(4),
            h = i(5),
            m = i(6),
            l = function() {
                function e(t, i, o) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.$el = (0, a.default)(i);
                    var n = (0, h.loadDefaults)(this.$el);
                    this.options = a.default.extend({}, n, o), this.init()
                }
                return o(e, [{
                    key: "init",
                    value: function() {
                        var e = this;
                        this.image = new Image, this.preImage = new Image, this.image.onload = this.onImageLoaded.bind(this), this.preImage.onload = this.onPreImageLoaded.bind(this), this.image.onerror = this.preImage.onerror = function() {
                            e.onImageError.call(e, r.ERRORS.IMAGE_FAILED_TO_LOAD)
                        }, this.$preview = this.options.$preview.css("position", "relative"), this.$fileInput = this.options.$fileInput.attr({
                            accept: "image/*"
                        }), this.$zoomSlider = this.options.$zoomSlider.attr({
                            min: 0,
                            max: 1,
                            step: .01
                        }), this.previewSize = {
                            width: this.options.width || this.$preview.innerWidth(),
                            height: this.options.height || this.$preview.innerHeight()
                        }, this.$image = (0, a.default)("<img />").addClass(r.CLASS_NAMES.PREVIEW_IMAGE).attr("alt", "").css({
                            transformOrigin: "top left",
                            webkitTransformOrigin: "top left",
                            willChange: "transform"
                        }), this.$imageContainer = (0, a.default)("<div />").addClass(r.CLASS_NAMES.PREVIEW_IMAGE_CONTAINER).css({
                            position: "absolute",
                            overflow: "hidden",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%"
                        }).append(this.$image), this.$preview.append(this.$imageContainer), this.options.imageBackground && (a.default.isArray(this.options.imageBackgroundBorderWidth) ? this.bgBorderWidthArray = this.options.imageBackgroundBorderWidth : this.bgBorderWidthArray = [0, 1, 2, 3].map(function() {
                            return e.options.imageBackgroundBorderWidth
                        }), this.$bg = (0, a.default)("<img />").addClass(r.CLASS_NAMES.PREVIEW_BACKGROUND).attr("alt", "").css({
                            position: "relative",
                            left: this.bgBorderWidthArray[3],
                            top: this.bgBorderWidthArray[0],
                            transformOrigin: "top left",
                            webkitTransformOrigin: "top left",
                            willChange: "transform"
                        }), this.$bgContainer = (0, a.default)("<div />").addClass(r.CLASS_NAMES.PREVIEW_BACKGROUND_CONTAINER).css({
                            position: "absolute",
                            zIndex: 0,
                            top: -this.bgBorderWidthArray[0],
                            right: -this.bgBorderWidthArray[1],
                            bottom: -this.bgBorderWidthArray[2],
                            left: -this.bgBorderWidthArray[3]
                        }).append(this.$bg), this.bgBorderWidthArray[0] > 0 && this.$bgContainer.css("overflow", "hidden"), this.$preview.prepend(this.$bgContainer)), this.initialZoom = this.options.initialZoom, this.imageLoaded = !1, this.moveContinue = !1, this.zoomer = new s.default, this.options.allowDragNDrop && a.default.event.props.push("dataTransfer"), this.bindListeners(), this.options.imageState && this.options.imageState.src && this.loadImage(this.options.imageState.src)
                    }
                }, {
                    key: "bindListeners",
                    value: function() {
                        this.$fileInput.on("change.cropit", this.onFileChange.bind(this)), this.$imageContainer.on(r.EVENTS.PREVIEW, this.onPreviewEvent.bind(this)), this.$zoomSlider.on(r.EVENTS.ZOOM_INPUT, this.onZoomSliderChange.bind(this)), this.options.allowDragNDrop && (this.$imageContainer.on("dragover.cropit dragleave.cropit", this.onDragOver.bind(this)), this.$imageContainer.on("drop.cropit", this.onDrop.bind(this)))
                    }
                }, {
                    key: "unbindListeners",
                    value: function() {
                        this.$fileInput.off("change.cropit"), this.$imageContainer.off(r.EVENTS.PREVIEW), this.$imageContainer.off("dragover.cropit dragleave.cropit drop.cropit"), this.$zoomSlider.off(r.EVENTS.ZOOM_INPUT)
                    }
                }, {
                    key: "onFileChange",
                    value: function(e) {
                        this.options.onFileChange(e), this.$fileInput.get(0).files && this.loadFile(this.$fileInput.get(0).files[0])
                    }
                }, {
                    key: "loadFile",
                    value: function(e) {
                        var t = new FileReader;
                        e && e.type.match("image") ? (t.readAsDataURL(e), t.onload = this.onFileReaderLoaded.bind(this), t.onerror = this.onFileReaderError.bind(this)) : e && this.onFileReaderError()
                    }
                }, {
                    key: "onFileReaderLoaded",
                    value: function(e) {
                        this.loadImage(e.target.result)
                    }
                }, {
                    key: "onFileReaderError",
                    value: function() {
                        this.options.onFileReaderError()
                    }
                }, {
                    key: "onDragOver",
                    value: function(e) {
                        e.preventDefault(), e.dataTransfer.dropEffect = "copy", this.$preview.toggleClass(r.CLASS_NAMES.DRAG_HOVERED, "dragover" === e.type)
                    }
                }, {
                    key: "onDrop",
                    value: function(e) {
                        var t = this;
                        e.preventDefault(), e.stopPropagation(), Array.prototype.slice.call(e.dataTransfer.files, 0).some(function(e) {
                            return !!e.type.match("image") && (t.loadFile(e), !0)
                        }), this.$preview.removeClass(r.CLASS_NAMES.DRAG_HOVERED)
                    }
                }, {
                    key: "loadImage",
                    value: function(e) {
                        var t = this;
                        if (e)
                            if (this.options.onImageLoading(), this.setImageLoadingClass(), 0 === e.indexOf("data")) this.preImage.src = e;
                            else {
                                var i = new XMLHttpRequest;
                                i.onload = function(e) {
                                    e.target.status >= 300 ? t.onImageError.call(t, r.ERRORS.IMAGE_FAILED_TO_LOAD) : t.loadFile(e.target.response)
                                }, i.open("GET", e), i.responseType = "blob", i.send()
                            }
                    }
                }, {
                    key: "onPreImageLoaded",
                    value: function() {
                        if (this.shouldRejectImage({
                                imageWidth: this.preImage.width,
                                imageHeight: this.preImage.height,
                                previewSize: this.previewSize,
                                maxZoom: this.options.maxZoom,
                                exportZoom: this.options.exportZoom,
                                smallImage: this.options.smallImage
                            })) return this.onImageError(r.ERRORS.SMALL_IMAGE), void(this.image.src && this.setImageLoadedClass());
                        this.image.src = this.preImage.src
                    }
                }, {
                    key: "onImageLoaded",
                    value: function() {
                        this.rotation = 0, this.setupZoomer(this.options.imageState && this.options.imageState.zoom || this._initialZoom), this.options.imageState && this.options.imageState.offset ? this.offset = this.options.imageState.offset : this.centerImage(), this.options.imageState = {}, this.$image.attr("src", this.image.src), this.options.imageBackground && this.$bg.attr("src", this.image.src), this.setImageLoadedClass(), this.imageLoaded = !0, this.options.onImageLoaded()
                    }
                }, {
                    key: "onImageError",
                    value: function() {
                        this.options.onImageError.apply(this, arguments), this.removeImageLoadingClass()
                    }
                }, {
                    key: "setImageLoadingClass",
                    value: function() {
                        this.$preview.removeClass(r.CLASS_NAMES.IMAGE_LOADED).addClass(r.CLASS_NAMES.IMAGE_LOADING)
                    }
                }, {
                    key: "setImageLoadedClass",
                    value: function() {
                        this.$preview.removeClass(r.CLASS_NAMES.IMAGE_LOADING).addClass(r.CLASS_NAMES.IMAGE_LOADED)
                    }
                }, {
                    key: "removeImageLoadingClass",
                    value: function() {
                        this.$preview.removeClass(r.CLASS_NAMES.IMAGE_LOADING)
                    }
                }, {
                    key: "getEventPosition",
                    value: function(e) {
                        if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] && (e = e.originalEvent.touches[0]), e.clientX && e.clientY) return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }, {
                    key: "onPreviewEvent",
                    value: function(e) {
                        if (this.imageLoaded) return this.moveContinue = !1, this.$imageContainer.off(r.EVENTS.PREVIEW_MOVE), "mousedown" === e.type || "touchstart" === e.type ? (this.origin = this.getEventPosition(e), this.moveContinue = !0, this.$imageContainer.on(r.EVENTS.PREVIEW_MOVE, this.onMove.bind(this))) : (0, a.default)(document.body).focus(), e.stopPropagation(), !1
                    }
                }, {
                    key: "onMove",
                    value: function(e) {
                        var t = this.getEventPosition(e);
                        return this.moveContinue && t && (this.offset = {
                            x: this.offset.x + t.x - this.origin.x,
                            y: this.offset.y + t.y - this.origin.y
                        }), this.origin = t, e.stopPropagation(), !1
                    }
                }, {
                    key: "fixOffset",
                    value: function(e) {
                        if (!this.imageLoaded) return e;
                        var t = {
                            x: e.x,
                            y: e.y
                        };
                        return this.options.freeMove || (this.imageWidth * this.zoom >= this.previewSize.width ? t.x = Math.min(0, Math.max(t.x, this.previewSize.width - this.imageWidth * this.zoom)) : t.x = Math.max(0, Math.min(t.x, this.previewSize.width - this.imageWidth * this.zoom)), this.imageHeight * this.zoom >= this.previewSize.height ? t.y = Math.min(0, Math.max(t.y, this.previewSize.height - this.imageHeight * this.zoom)) : t.y = Math.max(0, Math.min(t.y, this.previewSize.height - this.imageHeight * this.zoom))), t.x = (0, m.round)(t.x), t.y = (0, m.round)(t.y), t
                    }
                }, {
                    key: "centerImage",
                    value: function() {
                        this.image.width && this.image.height && this.zoom && (this.offset = {
                            x: (this.previewSize.width - this.imageWidth * this.zoom) / 2,
                            y: (this.previewSize.height - this.imageHeight * this.zoom) / 2
                        })
                    }
                }, {
                    key: "onZoomSliderChange",
                    value: function() {
                        if (this.imageLoaded) {
                            this.zoomSliderPos = Number(this.$zoomSlider.val());
                            var e = this.zoomer.getZoom(this.zoomSliderPos);
                            e !== this.zoom && (this.zoom = e)
                        }
                    }
                }, {
                    key: "enableZoomSlider",
                    value: function() {
                        this.$zoomSlider.removeAttr("disabled"), this.options.onZoomEnabled()
                    }
                }, {
                    key: "disableZoomSlider",
                    value: function() {
                        this.$zoomSlider.attr("disabled", !0), this.options.onZoomDisabled()
                    }
                }, {
                    key: "setupZoomer",
                    value: function(e) {
                        this.zoomer.setup({
                            imageSize: this.imageSize,
                            previewSize: this.previewSize,
                            exportZoom: this.options.exportZoom,
                            maxZoom: this.options.maxZoom,
                            minZoom: this.options.minZoom,
                            smallImage: this.options.smallImage
                        }), this.zoom = (0, m.exists)(e) ? e : this._zoom, this.isZoomable() ? this.enableZoomSlider() : this.disableZoomSlider()
                    }
                }, {
                    key: "fixZoom",
                    value: function(e) {
                        return this.zoomer.fixZoom(e)
                    }
                }, {
                    key: "isZoomable",
                    value: function() {
                        return this.zoomer.isZoomable()
                    }
                }, {
                    key: "renderImage",
                    value: function() {
                        var e = "\n      translate(" + this.rotatedOffset.x + "px, " + this.rotatedOffset.y + "px)\n      scale(" + this.zoom + ")\n      rotate(" + this.rotation + "deg)";
                        this.$image.css({
                            transform: e,
                            webkitTransform: e
                        }), this.options.imageBackground && this.$bg.css({
                            transform: e,
                            webkitTransform: e
                        })
                    }
                }, {
                    key: "rotateCW",
                    value: function() {
                        this.shouldRejectImage({
                            imageWidth: this.image.height,
                            imageHeight: this.image.width,
                            previewSize: this.previewSize,
                            maxZoom: this.options.maxZoom,
                            exportZoom: this.options.exportZoom,
                            smallImage: this.options.smallImage
                        }) ? this.rotation = (this.rotation + 180) % 360 : this.rotation = (this.rotation + 90) % 360
                    }
                }, {
                    key: "rotateCCW",
                    value: function() {
                        this.shouldRejectImage({
                            imageWidth: this.image.height,
                            imageHeight: this.image.width,
                            previewSize: this.previewSize,
                            maxZoom: this.options.maxZoom,
                            exportZoom: this.options.exportZoom,
                            smallImage: this.options.smallImage
                        }) ? this.rotation = (this.rotation + 180) % 360 : this.rotation = (this.rotation + 270) % 360
                    }
                }, {
                    key: "shouldRejectImage",
                    value: function(e) {
                        var t = e.imageWidth,
                            i = e.imageHeight,
                            o = e.previewSize,
                            n = e.maxZoom,
                            a = e.exportZoom;
                        return "reject" === e.smallImage && (t * n < o.width * a || i * n < o.height * a)
                    }
                }, {
                    key: "getCroppedImageData",
                    value: function(e) {
                        if (this.image.src) {
                            var t = (e = a.default.extend({}, {
                                    type: "image/png",
                                    quality: .75,
                                    originalSize: !1,
                                    fillBg: "#fff"
                                }, e)).originalSize ? 1 / this.zoom : this.options.exportZoom,
                                i = {
                                    width: this.zoom * t * this.image.width,
                                    height: this.zoom * t * this.image.height
                                },
                                o = (0, a.default)("<canvas />").attr({
                                    width: this.previewSize.width * t,
                                    height: this.previewSize.height * t
                                }).get(0),
                                n = o.getContext("2d");
                            return "image/jpeg" === e.type && (n.fillStyle = e.fillBg, n.fillRect(0, 0, o.width, o.height)), n.translate(this.rotatedOffset.x * t, this.rotatedOffset.y * t), n.rotate(this.rotation * Math.PI / 180), n.drawImage(this.image, 0, 0, i.width, i.height), o.toDataURL(e.type, e.quality)
                        }
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this.unbindListeners(), this.disableZoomSlider(), this.$el.addClass(r.CLASS_NAMES.DISABLED)
                    }
                }, {
                    key: "reenable",
                    value: function() {
                        this.bindListeners(), this.enableZoomSlider(), this.$el.removeClass(r.CLASS_NAMES.DISABLED)
                    }
                }, {
                    key: "$",
                    value: function(e) {
                        return this.$el ? this.$el.find(e) : null
                    }
                }, {
                    key: "offset",
                    set: function(e) {
                        e && (0, m.exists)(e.x) && (0, m.exists)(e.y) && (this._offset = this.fixOffset(e), this.renderImage(), this.options.onOffsetChange(e))
                    },
                    get: function() {
                        return this._offset
                    }
                }, {
                    key: "zoom",
                    set: function(e) {
                        if (e = this.fixZoom(e), this.imageLoaded) {
                            var t = this.zoom,
                                i = this.previewSize.width / 2 - (this.previewSize.width / 2 - this.offset.x) * e / t,
                                o = this.previewSize.height / 2 - (this.previewSize.height / 2 - this.offset.y) * e / t;
                            this._zoom = e, this.offset = {
                                x: i,
                                y: o
                            }
                        } else this._zoom = e;
                        this.zoomSliderPos = this.zoomer.getSliderPos(this.zoom), this.$zoomSlider.val(this.zoomSliderPos), this.options.onZoomChange(e)
                    },
                    get: function() {
                        return this._zoom
                    }
                }, {
                    key: "rotatedOffset",
                    get: function() {
                        return {
                            x: this.offset.x + (90 === this.rotation ? this.image.height * this.zoom : 0) + (180 === this.rotation ? this.image.width * this.zoom : 0),
                            y: this.offset.y + (180 === this.rotation ? this.image.height * this.zoom : 0) + (270 === this.rotation ? this.image.width * this.zoom : 0)
                        }
                    }
                }, {
                    key: "rotation",
                    set: function(e) {
                        this._rotation = e, this.imageLoaded && this.setupZoomer()
                    },
                    get: function() {
                        return this._rotation
                    }
                }, {
                    key: "imageState",
                    get: function() {
                        return {
                            src: this.image.src,
                            offset: this.offset,
                            zoom: this.zoom
                        }
                    }
                }, {
                    key: "imageSrc",
                    get: function() {
                        return this.image.src
                    },
                    set: function(e) {
                        this.loadImage(e)
                    }
                }, {
                    key: "imageWidth",
                    get: function() {
                        return this.rotation % 180 == 0 ? this.image.width : this.image.height
                    }
                }, {
                    key: "imageHeight",
                    get: function() {
                        return this.rotation % 180 == 0 ? this.image.height : this.image.width
                    }
                }, {
                    key: "imageSize",
                    get: function() {
                        return {
                            width: this.imageWidth,
                            height: this.imageHeight
                        }
                    }
                }, {
                    key: "initialZoom",
                    get: function() {
                        return this.options.initialZoom
                    },
                    set: function(e) {
                        this.options.initialZoom = e, this._initialZoom = "min" === e ? 0 : "image" === e ? 1 : 0
                    }
                }, {
                    key: "exportZoom",
                    get: function() {
                        return this.options.exportZoom
                    },
                    set: function(e) {
                        this.options.exportZoom = e, this.setupZoomer()
                    }
                }, {
                    key: "minZoom",
                    get: function() {
                        return this.options.minZoom
                    },
                    set: function(e) {
                        this.options.minZoom = e, this.setupZoomer()
                    }
                }, {
                    key: "maxZoom",
                    get: function() {
                        return this.options.maxZoom
                    },
                    set: function(e) {
                        this.options.maxZoom = e, this.setupZoomer()
                    }
                }, {
                    key: "previewSize",
                    get: function() {
                        return this._previewSize
                    },
                    set: function(e) {
                        !e || e.width <= 0 || e.height <= 0 || (this._previewSize = {
                            width: e.width,
                            height: e.height
                        }, this.$preview.innerWidth(this.previewSize.width).innerHeight(this.previewSize.height), this.imageLoaded && this.setupZoomer())
                    }
                }]), e
            }();
        t.default = l, e.exports = t.default
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, i, o) {
                return i && e(t.prototype, i), o && e(t, o), t
            }
        }();
        var o = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.minZoom = this.maxZoom = 1
            }
            return i(e, [{
                key: "setup",
                value: function(e) {
                    var t = e.imageSize,
                        i = e.previewSize,
                        o = e.exportZoom,
                        n = e.maxZoom,
                        a = e.minZoom,
                        s = e.smallImage,
                        r = i.width / t.width,
                        h = i.height / t.height;
                    this.minZoom = "fit" === a ? Math.min(r, h) : Math.max(r, h), "allow" === s && (this.minZoom = Math.min(this.minZoom, 1)), this.maxZoom = Math.max(this.minZoom, n / o)
                }
            }, {
                key: "getZoom",
                value: function(e) {
                    return this.minZoom && this.maxZoom ? e * (this.maxZoom - this.minZoom) + this.minZoom : null
                }
            }, {
                key: "getSliderPos",
                value: function(e) {
                    return this.minZoom && this.maxZoom ? this.minZoom === this.maxZoom ? 0 : (e - this.minZoom) / (this.maxZoom - this.minZoom) : null
                }
            }, {
                key: "isZoomable",
                value: function() {
                    return this.minZoom && this.maxZoom ? this.minZoom !== this.maxZoom : null
                }
            }, {
                key: "fixZoom",
                value: function(e) {
                    return Math.max(this.minZoom, Math.min(this.maxZoom, e))
                }
            }]), e
        }();
        t.default = o, e.exports = t.default
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.PLUGIN_KEY = "cropit";
        t.CLASS_NAMES = {
            PREVIEW: "cropit-preview",
            PREVIEW_IMAGE_CONTAINER: "cropit-preview-image-container",
            PREVIEW_IMAGE: "cropit-preview-image",
            PREVIEW_BACKGROUND_CONTAINER: "cropit-preview-background-container",
            PREVIEW_BACKGROUND: "cropit-preview-background",
            FILE_INPUT: "cropit-image-input",
            ZOOM_SLIDER: "cropit-image-zoom-input",
            DRAG_HOVERED: "cropit-drag-hovered",
            IMAGE_LOADING: "cropit-image-loading",
            IMAGE_LOADED: "cropit-image-loaded",
            DISABLED: "cropit-disabled"
        };
        t.ERRORS = {
            IMAGE_FAILED_TO_LOAD: {
                code: 0,
                message: "Image failed to load."
            },
            SMALL_IMAGE: {
                code: 1,
                message: "Image is too small."
            }
        };
        var i = function(e) {
                return e.map(function(e) {
                    return e + ".cropit"
                }).join(" ")
            },
            o = {
                PREVIEW: i(["mousedown", "mouseup", "mouseleave", "touchstart", "touchend", "touchcancel", "touchleave"]),
                PREVIEW_MOVE: i(["mousemove", "touchmove"]),
                ZOOM_INPUT: i(["mousemove", "touchmove", "change"])
            };
        t.EVENTS = o
    }, function(e, t, i) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = i(4),
            n = {
                elements: [{
                    name: "$preview",
                    description: "The HTML element that displays image preview.",
                    defaultSelector: "." + o.CLASS_NAMES.PREVIEW
                }, {
                    name: "$fileInput",
                    description: "File input element.",
                    defaultSelector: "input." + o.CLASS_NAMES.FILE_INPUT
                }, {
                    name: "$zoomSlider",
                    description: "Range input element that controls image zoom.",
                    defaultSelector: "input." + o.CLASS_NAMES.ZOOM_SLIDER
                }].map(function(e) {
                    return e.type = "jQuery element", e.default = "$imageCropper.find('" + e.defaultSelector + "')", e
                }),
                values: [{
                    name: "width",
                    type: "number",
                    description: "Width of image preview in pixels. If set, it will override the CSS property.",
                    default: null
                }, {
                    name: "height",
                    type: "number",
                    description: "Height of image preview in pixels. If set, it will override the CSS property.",
                    default: null
                }, {
                    name: "imageBackground",
                    type: "boolean",
                    description: "Whether or not to display the background image beyond the preview area.",
                    default: !1
                }, {
                    name: "imageBackgroundBorderWidth",
                    type: "array or number",
                    description: "Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.",
                    default: [0, 0, 0, 0]
                }, {
                    name: "exportZoom",
                    type: "number",
                    description: "The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.",
                    default: 1
                }, {
                    name: "allowDragNDrop",
                    type: "boolean",
                    description: "When set to true, you can load an image by dragging it from local file browser onto the preview area.",
                    default: !0
                }, {
                    name: "minZoom",
                    type: "string",
                    description: "This options decides the minimal zoom level of the image.\n        If set to `'fill'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `'fit'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.",
                    default: "fill"
                }, {
                    name: "maxZoom",
                    type: "number",
                    description: "Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.",
                    default: 1
                }, {
                    name: "initialZoom",
                    type: "string",
                    description: "Determines the zoom when an image is loaded.\n        When set to `'min'`, image is zoomed to the smallest when loaded.\n        When set to `'image'`, image is zoomed to 100% when loaded.",
                    default: "min"
                }, {
                    name: "freeMove",
                    type: "boolean",
                    description: "When set to true, you can freely move the image instead of being bound to the container borders",
                    default: !1
                }, {
                    name: "smallImage",
                    type: "string",
                    description: "When set to `'reject'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n        When set to `'allow'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `'stretch'`, the minimum zoom of small images would follow `minZoom` option.",
                    default: "reject"
                }],
                callbacks: [{
                    name: "onFileChange",
                    description: "Called when user selects a file in the select file input.",
                    params: [{
                        name: "event",
                        type: "object",
                        description: "File change event object"
                    }]
                }, {
                    name: "onFileReaderError",
                    description: "Called when `FileReader` encounters an error while loading the image file."
                }, {
                    name: "onImageLoading",
                    description: "Called when image starts to be loaded."
                }, {
                    name: "onImageLoaded",
                    description: "Called when image is loaded."
                }, {
                    name: "onImageError",
                    description: "Called when image cannot be loaded.",
                    params: [{
                        name: "error",
                        type: "object",
                        description: "Error object."
                    }, {
                        name: "error.code",
                        type: "number",
                        description: "Error code. `0` means generic image loading failure. `1` means image is too small."
                    }, {
                        name: "error.message",
                        type: "string",
                        description: "A message explaining the error."
                    }]
                }, {
                    name: "onZoomEnabled",
                    description: "Called when image the zoom slider is enabled."
                }, {
                    name: "onZoomDisabled",
                    description: "Called when image the zoom slider is disabled."
                }, {
                    name: "onZoomChange",
                    description: "Called when zoom changes.",
                    params: [{
                        name: "zoom",
                        type: "number",
                        description: "New zoom."
                    }]
                }, {
                    name: "onOffsetChange",
                    description: "Called when image offset changes.",
                    params: [{
                        name: "offset",
                        type: "object",
                        description: "New offset, with `x` and `y` values."
                    }]
                }].map(function(e) {
                    return e.type = "function", e
                })
            };
        t.loadDefaults = function(e) {
            var t = {};
            return e && n.elements.forEach(function(i) {
                t[i.name] = e.find(i.defaultSelector)
            }), n.values.forEach(function(e) {
                t[e.name] = e.default
            }), n.callbacks.forEach(function(e) {
                t[e.name] = function() {}
            }), t
        }, t.default = n
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.exists = function(e) {
            return void 0 !== e
        };
        t.round = function(e) {
            return +(Math.round(100 * e) + "e-2")
        }
    }])
});

function Avatars(username) {
    var $avaResponse, $btnRemove, $updated, $btnUpload, $btnUpdate, $avatarPanel, $cropPreview, $slider, $uploader, $btnUploader, imageData, imageName, avaimg;
    $avaResponse = $(".avatar-response");
    $btnRemove = $(".remove-avatar");
    $updated = $('<i class="bi bi-check-circle text-success"></i>');
    $updatedWrap = $(".updated");
    $btnUpload = $(".uppa");
    $btnUpdate = $(".export");
    $avatarPanel = $(".avatar-panel");
    $cropPreview = $(".cropit-preview");
    $slider = $(".slider");
    $uploader = $(".cropit-image-input");
    $btnUploader = $(".uppa");
    avaimg = $(".avatar");
    var attr = $(avaimg).attr("src");
    if (typeof attr !== typeof undefined && attr !== false) {
        $avatarPanel.find(".avadefault").addClass("d-none");
        $avatarPanel.cropit({
            imageState: {
                src: $(avaimg).attr("src")
            },
            allowDragNDrop: false
        })
    } else {
        $cropPreview.addClass("d-none");
        $slider.addClass("d-none");
        $btnRemove.addClass("d-none")
    }
    $btnUploader.on("click", function() {
        $updatedWrap.html("");
        $avatarPanel.cropit({
            allowDragNDrop: false
        });
        $uploader.click()
    });
    $uploader.on("change", function() {
        $btnUpdate.removeClass("d-none");
        $avatarPanel.find(".avadefault").addClass("d-none");
        $cropPreview.removeClass("d-none");
        $slider.removeClass("d-none");
        $btnRemove.removeClass("d-none")
    });
    $btnRemove.on("click", function() {
        $(this).addClass("d-none");
        $updatedWrap.html("");
        $cropPreview.addClass("d-none");
        $(".cropit-preview-image").attr("src", "");
        $btnUpdate.removeClass("d-none");
        $avatarPanel.find(".avadefault").removeClass("d-none")
    });
    $(document).on("click", ".export", function() {
        var d = new Date;
        var randy = d.getTime();
        var sendData;
        var imageData = false;
        if ($(".cropit-preview-image").attr("src") !== "") {
            imageData = $avatarPanel.cropit("export")
        }
        imageName = $(".image-name").val();
        if (imageData == false) {
            $(".avatar").attr("src", "").data("name", username).addClass("avadefault").initial({
                fontWeight: 200,
                seed: 13
            });
            sendData = {
                imgData: 0,
                imgName: imageName
            }
        } else {
            sendData = {
                imgData: imageData,
                imgName: imageName
            }
        }
        $.ajax({
            method: "POST",
            url: "ajax.php",
            data: sendData
        }).done(function(msg) {
            $updatedWrap.html($updated);
            $btnUpdate.addClass("d-none");
            if (msg.match(/\.(png)$/) != null) {
                $(".avatar").attr("src", msg + "?" + randy);
                $avatarPanel.cropit("imageSrc", msg + "?" + randy)
            } else {
                $avaResponse.html(msg)
            }
        }).fail(function() {
            $avaResponse.html('<div class="alert alert-danger" role="alert">Error saving avatar</div>')
        })
    })
}
$(document).ready(function() {
    $(".avadefault").initial({
        fontWeight: 200,
        seed: 13
    })
});
! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : t.bootbox = e(t.jQuery)
}(this, function e(p, u) {
    "use strict";
    var r, n, i, l;
    Object.keys || (Object.keys = (r = Object.prototype.hasOwnProperty, n = !{
        toString: null
    }.propertyIsEnumerable("toString"), l = (i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function(t) {
        if ("function" != typeof t && ("object" != typeof t || null === t)) throw new TypeError("Object.keys called on non-object");
        var e, o, a = [];
        for (e in t) r.call(t, e) && a.push(e);
        if (n)
            for (o = 0; o < l; o++) r.call(t, i[o]) && a.push(i[o]);
        return a
    }));
    var d = {};
    d.VERSION = "5.5.2";
    var b = {
            en: {
                OK: "OK",
                CANCEL: "Cancel",
                CONFIRM: "OK"
            }
        },
        f = {
            dialog: '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
            header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
            footer: '<div class="modal-footer"></div>',
            closeButton: '<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',
            form: '<form class="bootbox-form"></form>',
            button: '<button type="button" class="btn"></button>',
            option: "<option></option>",
            promptMessage: '<div class="bootbox-prompt-message"></div>',
            inputs: {
                text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
                textarea: '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
                email: '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
                select: '<select class="bootbox-input bootbox-input-select form-control"></select>',
                checkbox: '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
                radio: '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
                date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
                time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
                number: '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
                password: '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
                range: '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
            }
        },
        m = {
            locale: "en",
            backdrop: "static",
            animate: !0,
            className: null,
            closeButton: !0,
            show: !0,
            container: "body",
            value: "",
            inputType: "text",
            swapButtonOrder: !1,
            centerVertical: !1,
            multiple: !1,
            scrollable: !1,
            reusable: !1
        };

    function c(t, e, o) {
        return p.extend(!0, {}, t, function(t, e) {
            var o = t.length,
                a = {};
            if (o < 1 || 2 < o) throw new Error("Invalid argument length");
            return 2 === o || "string" == typeof t[0] ? (a[e[0]] = t[0], a[e[1]] = t[1]) : a = t[0], a
        }(e, o))
    }

    function h(t, e, o, a) {
        var r;
        a && a[0] && (r = a[0].locale || m.locale, (a[0].swapButtonOrder || m.swapButtonOrder) && (e = e.reverse()));
        var n, i, l, s = {
            className: "bootbox-" + t,
            buttons: function(t, e) {
                for (var o = {}, a = 0, r = t.length; a < r; a++) {
                    var n = t[a],
                        i = n.toLowerCase(),
                        l = n.toUpperCase();
                    o[i] = {
                        label: (s = l, c = e, p = b[c], p ? p[s] : b.en[s])
                    }
                }
                var s, c, p;
                return o
            }(e, r)
        };
        return n = c(s, a, o), l = {}, g(i = e, function(t, e) {
            l[e] = !0
        }), g(n.buttons, function(t) {
            if (l[t] === u) throw new Error('button key "' + t + '" is not allowed (options are ' + i.join(" ") + ")")
        }), n
    }

    function w(t) {
        return Object.keys(t).length
    }

    function g(t, o) {
        var a = 0;
        p.each(t, function(t, e) {
            o(t, e, a++)
        })
    }

    function v(t) {
        t.data.dialog.find(".bootbox-accept").first().trigger("focus")
    }

    function y(t) {
        t.target === t.data.dialog[0] && t.data.dialog.remove()
    }

    function x(t) {
        t.target === t.data.dialog[0] && (t.data.dialog.off("escape.close.bb"), t.data.dialog.off("click"))
    }

    function k(t, e, o) {
        t.stopPropagation(), t.preventDefault(), p.isFunction(o) && !1 === o.call(e, t) || e.modal("hide")
    }

    function E(t) {
        return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(t)
    }

    function O(t) {
        return /(\d{4})-(\d{2})-(\d{2})/.test(t)
    }
    return d.locales = function(t) {
        return t ? b[t] : b
    }, d.addLocale = function(t, o) {
        return p.each(["OK", "CANCEL", "CONFIRM"], function(t, e) {
            if (!o[e]) throw new Error('Please supply a translation for "' + e + '"')
        }), b[t] = {
            OK: o.OK,
            CANCEL: o.CANCEL,
            CONFIRM: o.CONFIRM
        }, d
    }, d.removeLocale = function(t) {
        if ("en" === t) throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
        return delete b[t], d
    }, d.setLocale = function(t) {
        return d.setDefaults("locale", t)
    }, d.setDefaults = function() {
        var t = {};
        return 2 === arguments.length ? t[arguments[0]] = arguments[1] : t = arguments[0], p.extend(m, t), d
    }, d.hideAll = function() {
        return p(".bootbox").modal("hide"), d
    }, d.init = function(t) {
        return e(t || p)
    }, d.dialog = function(t) {
        if (p.fn.modal === u) throw new Error('"$.fn.modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/4.4/getting-started/javascript/ for more details.');
        if (t = function(r) {
                var n, i;
                if ("object" != typeof r) throw new Error("Please supply an object of options");
                if (!r.message) throw new Error('"message" option must not be null or an empty string.');
                (r = p.extend({}, m, r)).backdrop ? r.backdrop = "string" != typeof r.backdrop || "static" !== r.backdrop.toLowerCase() || "static" : r.backdrop = !1 !== r.backdrop && 0 !== r.backdrop && "static";
                r.buttons || (r.buttons = {});
                return n = r.buttons, i = w(n), g(n, function(t, e, o) {
                    if (p.isFunction(e) && (e = n[t] = {
                            callback: e
                        }), "object" !== p.type(e)) throw new Error('button with key "' + t + '" must be an object');
                    if (e.label || (e.label = t), !e.className) {
                        var a = !1;
                        a = r.swapButtonOrder ? 0 === o : o === i - 1, e.className = i <= 2 && a ? "btn-primary" : "btn-secondary btn-default"
                    }
                }), r
            }(t), p.fn.modal.Constructor.VERSION) {
            t.fullBootstrapVersion = p.fn.modal.Constructor.VERSION;
            var e = t.fullBootstrapVersion.indexOf(".");
            t.bootstrap = t.fullBootstrapVersion.substring(0, e)
        } else t.bootstrap = "2", t.fullBootstrapVersion = "2.3.2", console.warn("Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible.");
        var o = p(f.dialog),
            a = o.find(".modal-dialog"),
            r = o.find(".modal-body"),
            n = p(f.header),
            i = p(f.footer),
            l = t.buttons,
            s = {
                onEscape: t.onEscape
            };
        if (r.find(".bootbox-body").html(t.message), 0 < w(t.buttons) && (g(l, function(t, e) {
                var o = p(f.button);
                switch (o.data("bb-handler", t), o.addClass(e.className), t) {
                    case "ok":
                    case "confirm":
                        o.addClass("bootbox-accept");
                        break;
                    case "cancel":
                        o.addClass("bootbox-cancel")
                }
                o.html(e.label), i.append(o), s[t] = e.callback
            }), r.after(i)), !0 === t.animate && o.addClass("fade"), t.className && o.addClass(t.className), t.size) switch (t.fullBootstrapVersion.substring(0, 3) < "3.1" && console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using ' + t.fullBootstrapVersion + ". Please upgrade to use this option."), t.size) {
            case "small":
            case "sm":
                a.addClass("modal-sm");
                break;
            case "large":
            case "lg":
                a.addClass("modal-lg");
                break;
            case "extra-large":
            case "xl":
                a.addClass("modal-xl"), t.fullBootstrapVersion.substring(0, 3) < "4.2" && console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using ' + t.fullBootstrapVersion + ". Please upgrade to use this option.")
        }
        if (t.scrollable && (a.addClass("modal-dialog-scrollable"), t.fullBootstrapVersion.substring(0, 3) < "4.3" && console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using ' + t.fullBootstrapVersion + ". Please upgrade to use this option.")), t.title && (r.before(n), o.find(".modal-title").html(t.title)), t.closeButton) {
            var c = p(f.closeButton);
            t.title ? 3 < t.bootstrap ? o.find(".modal-header").append(c) : o.find(".modal-header").prepend(c) : c.prependTo(r)
        }
        if (t.centerVertical && (a.addClass("modal-dialog-centered"), t.fullBootstrapVersion < "4.0.0" && console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using ' + t.fullBootstrapVersion + ". Please upgrade to use this option.")), t.reusable || o.one("hide.bs.modal", {
                dialog: o
            }, x), t.onHide) {
            if (!p.isFunction(t.onHide)) throw new Error('Argument supplied to "onHide" must be a function');
            o.on("hide.bs.modal", t.onHide)
        }
        if (t.reusable || o.one("hidden.bs.modal", {
                dialog: o
            }, y), t.onHidden) {
            if (!p.isFunction(t.onHidden)) throw new Error('Argument supplied to "onHidden" must be a function');
            o.on("hidden.bs.modal", t.onHidden)
        }
        if (t.onShow) {
            if (!p.isFunction(t.onShow)) throw new Error('Argument supplied to "onShow" must be a function');
            o.on("show.bs.modal", t.onShow)
        }
        if (o.one("shown.bs.modal", {
                dialog: o
            }, v), t.onShown) {
            if (!p.isFunction(t.onShown)) throw new Error('Argument supplied to "onShown" must be a function');
            o.on("shown.bs.modal", t.onShown)
        }
        return !0 === t.backdrop && o.on("click.dismiss.bs.modal", function(t) {
            o.children(".modal-backdrop").length && (t.currentTarget = o.children(".modal-backdrop").get(0)), t.target === t.currentTarget && o.trigger("escape.close.bb")
        }), o.on("escape.close.bb", function(t) {
            s.onEscape && k(t, o, s.onEscape)
        }), o.on("click", ".modal-footer button:not(.disabled)", function(t) {
            var e = p(this).data("bb-handler");
            e !== u && k(t, o, s[e])
        }), o.on("click", ".bootbox-close-button", function(t) {
            k(t, o, s.onEscape)
        }), o.on("keyup", function(t) {
            27 === t.which && o.trigger("escape.close.bb")
        }), p(t.container).append(o), o.modal({
            backdrop: t.backdrop,
            keyboard: !1,
            show: !1
        }), t.show && o.modal("show"), o
    }, d.alert = function() {
        var t;
        if ((t = h("alert", ["ok"], ["message", "callback"], arguments)).callback && !p.isFunction(t.callback)) throw new Error('alert requires the "callback" property to be a function when provided');
        return t.buttons.ok.callback = t.onEscape = function() {
            return !p.isFunction(t.callback) || t.callback.call(this)
        }, d.dialog(t)
    }, d.confirm = function() {
        var t;
        if (t = h("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), !p.isFunction(t.callback)) throw new Error("confirm requires a callback");
        return t.buttons.cancel.callback = t.onEscape = function() {
            return t.callback.call(this, !1)
        }, t.buttons.confirm.callback = function() {
            return t.callback.call(this, !0)
        }, d.dialog(t)
    }, d.prompt = function() {
        var r, e, t, n, o, a;
        if (t = p(f.form), (r = h("prompt", ["cancel", "confirm"], ["title", "callback"], arguments)).value || (r.value = m.value), r.inputType || (r.inputType = m.inputType), o = r.show === u ? m.show : r.show, r.show = !1, r.buttons.cancel.callback = r.onEscape = function() {
                return r.callback.call(this, null)
            }, r.buttons.confirm.callback = function() {
                var t;
                if ("checkbox" === r.inputType) t = n.find("input:checked").map(function() {
                    return p(this).val()
                }).get();
                else if ("radio" === r.inputType) t = n.find("input:checked").val();
                else {
                    if (n[0].checkValidity && !n[0].checkValidity()) return !1;
                    t = "select" === r.inputType && !0 === r.multiple ? n.find("option:selected").map(function() {
                        return p(this).val()
                    }).get() : n.val()
                }
                return r.callback.call(this, t)
            }, !r.title) throw new Error("prompt requires a title");
        if (!p.isFunction(r.callback)) throw new Error("prompt requires a callback");
        if (!f.inputs[r.inputType]) throw new Error("Invalid prompt type");
        switch (n = p(f.inputs[r.inputType]), r.inputType) {
            case "text":
            case "textarea":
            case "email":
            case "password":
                n.val(r.value), r.placeholder && n.attr("placeholder", r.placeholder), r.pattern && n.attr("pattern", r.pattern), r.maxlength && n.attr("maxlength", r.maxlength), r.required && n.prop({
                    required: !0
                }), r.rows && !isNaN(parseInt(r.rows)) && "textarea" === r.inputType && n.attr({
                    rows: r.rows
                });
                break;
            case "date":
            case "time":
            case "number":
            case "range":
                if (n.val(r.value), r.placeholder && n.attr("placeholder", r.placeholder), r.pattern && n.attr("pattern", r.pattern), r.required && n.prop({
                        required: !0
                    }), "date" !== r.inputType && r.step) {
                    if (!("any" === r.step || !isNaN(r.step) && 0 < parseFloat(r.step))) throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
                    n.attr("step", r.step)
                }! function(t, e, o) {
                    var a = !1,
                        r = !0,
                        n = !0;
                    if ("date" === t) e === u || (r = O(e)) ? o === u || (n = O(o)) || console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.') : console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');
                    else if ("time" === t) {
                        if (e !== u && !(r = E(e))) throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
                        if (o !== u && !(n = E(o))) throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.')
                    } else {
                        if (e !== u && isNaN(e)) throw r = !1, new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');
                        if (o !== u && isNaN(o)) throw n = !1, new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.')
                    }
                    if (r && n) {
                        if (o <= e) throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
                        a = !0
                    }
                    return a
                }(r.inputType, r.min, r.max) || (r.min !== u && n.attr("min", r.min), r.max !== u && n.attr("max", r.max));
                break;
            case "select":
                var i = {};
                if (a = r.inputOptions || [], !p.isArray(a)) throw new Error("Please pass an array of input options");
                if (!a.length) throw new Error('prompt with "inputType" set to "select" requires at least one option');
                r.placeholder && n.attr("placeholder", r.placeholder), r.required && n.prop({
                    required: !0
                }), r.multiple && n.prop({
                    multiple: !0
                }), g(a, function(t, e) {
                    var o = n;
                    if (e.value === u || e.text === u) throw new Error('each option needs a "value" property and a "text" property');
                    e.group && (i[e.group] || (i[e.group] = p("<optgroup />").attr("label", e.group)), o = i[e.group]);
                    var a = p(f.option);
                    a.attr("value", e.value).text(e.text), o.append(a)
                }), g(i, function(t, e) {
                    n.append(e)
                }), n.val(r.value);
                break;
            case "checkbox":
                var l = p.isArray(r.value) ? r.value : [r.value];
                if (!(a = r.inputOptions || []).length) throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
                n = p('<div class="bootbox-checkbox-list"></div>'), g(a, function(t, o) {
                    if (o.value === u || o.text === u) throw new Error('each option needs a "value" property and a "text" property');
                    var a = p(f.inputs[r.inputType]);
                    a.find("input").attr("value", o.value), a.find("label").append("\n" + o.text), g(l, function(t, e) {
                        e === o.value && a.find("input").prop("checked", !0)
                    }), n.append(a)
                });
                break;
            case "radio":
                if (r.value !== u && p.isArray(r.value)) throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
                if (!(a = r.inputOptions || []).length) throw new Error('prompt with "inputType" set to "radio" requires at least one option');
                n = p('<div class="bootbox-radiobutton-list"></div>');
                var s = !0;
                g(a, function(t, e) {
                    if (e.value === u || e.text === u) throw new Error('each option needs a "value" property and a "text" property');
                    var o = p(f.inputs[r.inputType]);
                    o.find("input").attr("value", e.value), o.find("label").append("\n" + e.text), r.value !== u && e.value === r.value && (o.find("input").prop("checked", !0), s = !1), n.append(o)
                }), s && n.find('input[type="radio"]').first().prop("checked", !0)
        }
        if (t.append(n), t.on("submit", function(t) {
                t.preventDefault(), t.stopPropagation(), e.find(".bootbox-accept").trigger("click")
            }), "" !== p.trim(r.message)) {
            var c = p(f.promptMessage).html(r.message);
            t.prepend(c), r.message = t
        } else r.message = t;
        return (e = d.dialog(r)).off("shown.bs.modal", v), e.on("shown.bs.modal", function() {
            n.focus()
        }), !0 === o && e.modal("show"), e
    }, d
});
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(l, z, A) {
    l instanceof String && (l = String(l));
    for (var q = l.length, E = 0; E < q; E++) {
        var P = l[E];
        if (z.call(A, P, E, l)) return {
            i: E,
            v: P
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(l, z, A) {
    if (l == Array.prototype || l == Object.prototype) return l;
    l[z] = A.value;
    return l
};
$jscomp.getGlobal = function(l) {
    l = ["object" == typeof globalThis && globalThis, l, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var z = 0; z < l.length; ++z) {
        var A = l[z];
        if (A && A.Math == Math) return A
    }
    throw Error("Cannot find global object")
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(l, z) {
    var A = $jscomp.propertyToPolyfillSymbol[z];
    if (null == A) return l[z];
    A = l[A];
    return void 0 !== A ? A : l[z]
};
$jscomp.polyfill = function(l, z, A, q) {
    z && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(l, z, A, q) : $jscomp.polyfillUnisolated(l, z, A, q))
};
$jscomp.polyfillUnisolated = function(l, z, A, q) {
    A = $jscomp.global;
    l = l.split(".");
    for (q = 0; q < l.length - 1; q++) {
        var E = l[q];
        if (!(E in A)) return;
        A = A[E]
    }
    l = l[l.length - 1];
    q = A[l];
    z = z(q);
    z != q && null != z && $jscomp.defineProperty(A, l, {
        configurable: !0,
        writable: !0,
        value: z
    })
};
$jscomp.polyfillIsolated = function(l, z, A, q) {
    var E = l.split(".");
    l = 1 === E.length;
    q = E[0];
    q = !l && q in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var P = 0; P < E.length - 1; P++) {
        var ma = E[P];
        if (!(ma in q)) return;
        q = q[ma]
    }
    E = E[E.length - 1];
    A = $jscomp.IS_SYMBOL_NATIVE && "es6" === A ? q[E] : null;
    z = z(A);
    null != z && (l ? $jscomp.defineProperty($jscomp.polyfills, E, {
        configurable: !0,
        writable: !0,
        value: z
    }) : z !== A && ($jscomp.propertyToPolyfillSymbol[E] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(E) : $jscomp.POLYFILL_PREFIX + E, E = $jscomp.propertyToPolyfillSymbol[E], $jscomp.defineProperty(q, E, {
        configurable: !0,
        writable: !0,
        value: z
    })))
};
$jscomp.polyfill("Array.prototype.find", function(l) {
    return l ? l : function(z, A) {
        return $jscomp.findInternal(this, z, A).v
    }
}, "es6", "es3");
(function(l) {
    "function" === typeof define && define.amd ? define(["jquery"], function(z) {
        return l(z, window, document)
    }) : "object" === typeof exports ? module.exports = function(z, A) {
        z || (z = window);
        A || (A = "undefined" !== typeof window ? require("jquery") : require("jquery")(z));
        return l(A, z, z.document)
    } : window.DataTable = l(jQuery, window, document)
})(function(l, z, A, q) {
    function E(a) {
        var b, c, d = {};
        l.each(a, function(e, h) {
            (b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ") && (c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && E(a[e]))
        });
        a._hungarianMap = d
    }

    function P(a, b, c) {
        a._hungarianMap || E(a);
        var d;
        l.each(b, function(e, h) {
            d = a._hungarianMap[e];
            d === q || !c && b[d] !== q || ("o" === d.charAt(0) ? (b[d] || (b[d] = {}), l.extend(!0, b[d], b[e]), P(a[d], b[d], c)) : b[d] = b[e])
        })
    }

    function ma(a) {
        var b = u.defaults.oLanguage,
            c = b.sDecimal;
        c && Wa(c);
        if (a) {
            var d = a.sZeroRecords;
            !a.sEmptyTable && d && "No data available in table" === b.sEmptyTable && X(a, a, "sZeroRecords", "sEmptyTable");
            !a.sLoadingRecords && d && "Loading..." === b.sLoadingRecords && X(a, a, "sZeroRecords", "sLoadingRecords");
            a.sInfoThousands && (a.sThousands = a.sInfoThousands);
            (a = a.sDecimal) && c !== a && Wa(a)
        }
    }

    function zb(a) {
        S(a, "ordering", "bSort");
        S(a, "orderMulti", "bSortMulti");
        S(a, "orderClasses", "bSortClasses");
        S(a, "orderCellsTop", "bSortCellsTop");
        S(a, "order", "aaSorting");
        S(a, "orderFixed", "aaSortingFixed");
        S(a, "paging", "bPaginate");
        S(a, "pagingType", "sPaginationType");
        S(a, "pageLength", "iDisplayLength");
        S(a, "searching", "bFilter");
        "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");
        "boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");
        if (a = a.aoSearchCols)
            for (var b = 0, c = a.length; b < c; b++) a[b] && P(u.models.oSearch, a[b])
    }

    function Ab(a) {
        S(a, "orderable", "bSortable");
        S(a, "orderData", "aDataSort");
        S(a, "orderSequence", "asSorting");
        S(a, "orderDataType", "sortDataType");
        var b = a.aDataSort;
        "number" !== typeof b || Array.isArray(b) || (a.aDataSort = [b])
    }

    function Bb(a) {
        if (!u.__browser) {
            var b = {};
            u.__browser = b;
            var c = l("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: -1 * l(z).scrollLeft(),
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(l("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(l("<div/>").css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                d = c.children(),
                e = d.children();
            b.barWidth = d[0].offsetWidth - d[0].clientWidth;
            b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
            b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
            b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
            c.remove()
        }
        l.extend(a.oBrowser, u.__browser);
        a.oScroll.iBarWidth = u.__browser.barWidth
    }

    function Cb(a, b, c, d, e, h) {
        var f = !1;
        if (c !== q) {
            var g = c;
            f = !0
        }
        for (; d !== e;) a.hasOwnProperty(d) && (g = f ? b(g, a[d], d, a) : a[d], f = !0, d += h);
        return g
    }

    function Xa(a, b) {
        var c = u.defaults.column,
            d = a.aoColumns.length;
        c = l.extend({}, u.models.oColumn, c, {
            nTh: b ? b : A.createElement("th"),
            sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
            aDataSort: c.aDataSort ? c.aDataSort : [d],
            mData: c.mData ? c.mData : d,
            idx: d
        });
        a.aoColumns.push(c);
        c = a.aoPreSearchCols;
        c[d] = l.extend({}, u.models.oSearch, c[d]);
        Ga(a, d, l(b).data())
    }

    function Ga(a, b, c) {
        b = a.aoColumns[b];
        var d = a.oClasses,
            e = l(b.nTh);
        if (!b.sWidthOrig) {
            b.sWidthOrig = e.attr("width") || null;
            var h = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            h && (b.sWidthOrig = h[1])
        }
        c !== q && null !== c && (Ab(c), P(u.defaults.column, c, !0), c.mDataProp === q || c.mData || (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), c.sClass && e.addClass(c.sClass), l.extend(b, c), X(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== q && (b.aDataSort = [c.iDataSort]), X(b, c, "aDataSort"));
        var f = b.mData,
            g = na(f),
            k = b.mRender ? na(b.mRender) : null;
        c = function(m) {
            return "string" === typeof m && -1 !== m.indexOf("@")
        };
        b._bAttrSrc = l.isPlainObject(f) && (c(f.sort) || c(f.type) || c(f.filter));
        b._setter = null;
        b.fnGetData = function(m, n, p) {
            var t = g(m, n, q, p);
            return k && n ? k(t, n, m, p) : t
        };
        b.fnSetData = function(m, n, p) {
            return ha(f)(m, n, p)
        };
        "number" !== typeof f && (a._rowReadObject = !0);
        a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));
        a = -1 !== l.inArray("asc", b.asSorting);
        c = -1 !== l.inArray("desc", b.asSorting);
        b.bSortable && (a || c) ? a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI) : (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "")
    }

    function ta(a) {
        if (!1 !== a.oFeatures.bAutoWidth) {
            var b = a.aoColumns;
            Ya(a);
            for (var c = 0, d = b.length; c < d; c++) b[c].nTh.style.width = b[c].sWidth
        }
        b = a.oScroll;
        "" === b.sY && "" === b.sX || Ha(a);
        F(a, null, "column-sizing", [a])
    }

    function ua(a, b) {
        a = Ia(a, "bVisible");
        return "number" === typeof a[b] ? a[b] : null
    }

    function va(a, b) {
        a = Ia(a, "bVisible");
        b = l.inArray(b, a);
        return -1 !== b ? b : null
    }

    function oa(a) {
        var b = 0;
        l.each(a.aoColumns, function(c, d) {
            d.bVisible && "none" !== l(d.nTh).css("display") && b++
        });
        return b
    }

    function Ia(a, b) {
        var c = [];
        l.map(a.aoColumns, function(d, e) {
            d[b] && c.push(e)
        });
        return c
    }

    function Za(a) {
        var b = a.aoColumns,
            c = a.aoData,
            d = u.ext.type.detect,
            e, h, f;
        var g = 0;
        for (e = b.length; g < e; g++) {
            var k = b[g];
            var m = [];
            if (!k.sType && k._sManualType) k.sType = k._sManualType;
            else if (!k.sType) {
                var n = 0;
                for (h = d.length; n < h; n++) {
                    var p = 0;
                    for (f = c.length; p < f; p++) {
                        m[p] === q && (m[p] = T(a, p, g, "type"));
                        var t = d[n](m[p], a);
                        if (!t && n !== d.length - 1) break;
                        if ("html" === t && !Z(m[p])) break
                    }
                    if (t) {
                        k.sType = t;
                        break
                    }
                }
                k.sType || (k.sType = "string")
            }
        }
    }

    function Db(a, b, c, d) {
        var e, h, f, g = a.aoColumns;
        if (b)
            for (e = b.length - 1; 0 <= e; e--) {
                var k = b[e];
                var m = k.targets !== q ? k.targets : k.aTargets;
                Array.isArray(m) || (m = [m]);
                var n = 0;
                for (h = m.length; n < h; n++)
                    if ("number" === typeof m[n] && 0 <= m[n]) {
                        for (; g.length <= m[n];) Xa(a);
                        d(m[n], k)
                    } else if ("number" === typeof m[n] && 0 > m[n]) d(g.length + m[n], k);
                else if ("string" === typeof m[n]) {
                    var p = 0;
                    for (f = g.length; p < f; p++)("_all" == m[n] || l(g[p].nTh).hasClass(m[n])) && d(p, k)
                }
            }
        if (c)
            for (e = 0, a = c.length; e < a; e++) d(e, c[e])
    }

    function ia(a, b, c, d) {
        var e = a.aoData.length,
            h = l.extend(!0, {}, u.models.oRow, {
                src: c ? "dom" : "data",
                idx: e
            });
        h._aData = b;
        a.aoData.push(h);
        for (var f = a.aoColumns, g = 0, k = f.length; g < k; g++) f[g].sType = null;
        a.aiDisplayMaster.push(e);
        b = a.rowIdFn(b);
        b !== q && (a.aIds[b] = h);
        !c && a.oFeatures.bDeferRender || $a(a, e, c, d);
        return e
    }

    function Ja(a, b) {
        var c;
        b instanceof l || (b = l(b));
        return b.map(function(d, e) {
            c = ab(a, e);
            return ia(a, c.data, e, c.cells)
        })
    }

    function T(a, b, c, d) {
        "search" === d ? d = "filter" : "order" === d && (d = "sort");
        var e = a.iDraw,
            h = a.aoColumns[c],
            f = a.aoData[b]._aData,
            g = h.sDefaultContent,
            k = h.fnGetData(f, d, {
                settings: a,
                row: b,
                col: c
            });
        if (k === q) return a.iDrawError != e && null === g && (da(a, 0, "Requested unknown parameter " + ("function" == typeof h.mData ? "{function}" : "'" + h.mData + "'") + " for row " + b + ", column " + c, 4), a.iDrawError = e), g;
        if ((k === f || null === k) && null !== g && d !== q) k = g;
        else if ("function" === typeof k) return k.call(f);
        if (null === k && "display" === d) return "";
        "filter" === d && (a = u.ext.type.search, a[h.sType] && (k = a[h.sType](k)));
        return k
    }

    function Eb(a, b, c, d) {
        a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
            settings: a,
            row: b,
            col: c
        })
    }

    function bb(a) {
        return l.map(a.match(/(\\.|[^\.])+/g) || [""], function(b) {
            return b.replace(/\\\./g, ".")
        })
    }

    function cb(a) {
        return U(a.aoData, "_aData")
    }

    function Ka(a) {
        a.aoData.length = 0;
        a.aiDisplayMaster.length = 0;
        a.aiDisplay.length = 0;
        a.aIds = {}
    }

    function La(a, b, c) {
        for (var d = -1, e = 0, h = a.length; e < h; e++) a[e] == b ? d = e : a[e] > b && a[e]--; - 1 != d && c === q && a.splice(d, 1)
    }

    function wa(a, b, c, d) {
        var e = a.aoData[b],
            h, f = function(k, m) {
                for (; k.childNodes.length;) k.removeChild(k.firstChild);
                k.innerHTML = T(a, b, m, "display")
            };
        if ("dom" !== c && (c && "auto" !== c || "dom" !== e.src)) {
            var g = e.anCells;
            if (g)
                if (d !== q) f(g[d], d);
                else
                    for (c = 0, h = g.length; c < h; c++) f(g[c], c)
        } else e._aData = ab(a, e, d, d === q ? q : e._aData).data;
        e._aSortData = null;
        e._aFilterData = null;
        f = a.aoColumns;
        if (d !== q) f[d].sType = null;
        else {
            c = 0;
            for (h = f.length; c < h; c++) f[c].sType = null;
            db(a, e)
        }
    }

    function ab(a, b, c, d) {
        var e = [],
            h = b.firstChild,
            f, g = 0,
            k, m = a.aoColumns,
            n = a._rowReadObject;
        d = d !== q ? d : n ? {} : [];
        var p = function(x, w) {
                if ("string" === typeof x) {
                    var r = x.indexOf("@"); - 1 !== r && (r = x.substring(r + 1), ha(x)(d, w.getAttribute(r)))
                }
            },
            t = function(x) {
                if (c === q || c === g) f = m[g], k = x.innerHTML.trim(), f && f._bAttrSrc ? (ha(f.mData._)(d, k), p(f.mData.sort, x), p(f.mData.type, x), p(f.mData.filter, x)) : n ? (f._setter || (f._setter = ha(f.mData)), f._setter(d, k)) : d[g] = k;
                g++
            };
        if (h)
            for (; h;) {
                var v = h.nodeName.toUpperCase();
                if ("TD" == v || "TH" == v) t(h), e.push(h);
                h = h.nextSibling
            } else
                for (e = b.anCells, h = 0, v = e.length; h < v; h++) t(e[h]);
        (b = b.firstChild ? b : b.nTr) && (b = b.getAttribute("id")) && ha(a.rowId)(d, b);
        return {
            data: d,
            cells: e
        }
    }

    function $a(a, b, c, d) {
        var e = a.aoData[b],
            h = e._aData,
            f = [],
            g, k;
        if (null === e.nTr) {
            var m = c || A.createElement("tr");
            e.nTr = m;
            e.anCells = f;
            m._DT_RowIndex = b;
            db(a, e);
            var n = 0;
            for (g = a.aoColumns.length; n < g; n++) {
                var p = a.aoColumns[n];
                e = (k = c ? !1 : !0) ? A.createElement(p.sCellType) : d[n];
                e._DT_CellIndex = {
                    row: b,
                    column: n
                };
                f.push(e);
                if (k || !(!p.mRender && p.mData === n || l.isPlainObject(p.mData) && p.mData._ === n + ".display")) e.innerHTML = T(a, b, n, "display");
                p.sClass && (e.className += " " + p.sClass);
                p.bVisible && !c ? m.appendChild(e) : !p.bVisible && c && e.parentNode.removeChild(e);
                p.fnCreatedCell && p.fnCreatedCell.call(a.oInstance, e, T(a, b, n), h, b, n)
            }
            F(a, "aoRowCreatedCallback", null, [m, h, b, f])
        }
    }

    function db(a, b) {
        var c = b.nTr,
            d = b._aData;
        if (c) {
            if (a = a.rowIdFn(d)) c.id = a;
            d.DT_RowClass && (a = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? Ma(b.__rowc.concat(a)) : a, l(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
            d.DT_RowAttr && l(c).attr(d.DT_RowAttr);
            d.DT_RowData && l(c).data(d.DT_RowData)
        }
    }

    function Fb(a) {
        var b, c, d = a.nTHead,
            e = a.nTFoot,
            h = 0 === l("th, td", d).length,
            f = a.oClasses,
            g = a.aoColumns;
        h && (c = l("<tr/>").appendTo(d));
        var k = 0;
        for (b = g.length; k < b; k++) {
            var m = g[k];
            var n = l(m.nTh).addClass(m.sClass);
            h && n.appendTo(c);
            a.oFeatures.bSort && (n.addClass(m.sSortingClass), !1 !== m.bSortable && (n.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), eb(a, m.nTh, k)));
            m.sTitle != n[0].innerHTML && n.html(m.sTitle);
            fb(a, "header")(a, n, m, f)
        }
        h && xa(a.aoHeader, d);
        l(d).children("tr").children("th, td").addClass(f.sHeaderTH);
        l(e).children("tr").children("th, td").addClass(f.sFooterTH);
        if (null !== e)
            for (a = a.aoFooter[0], k = 0, b = a.length; k < b; k++) m = g[k], m.nTf = a[k].cell, m.sClass && l(m.nTf).addClass(m.sClass)
    }

    function ya(a, b, c) {
        var d, e, h = [],
            f = [],
            g = a.aoColumns.length;
        if (b) {
            c === q && (c = !1);
            var k = 0;
            for (d = b.length; k < d; k++) {
                h[k] = b[k].slice();
                h[k].nTr = b[k].nTr;
                for (e = g - 1; 0 <= e; e--) a.aoColumns[e].bVisible || c || h[k].splice(e, 1);
                f.push([])
            }
            k = 0;
            for (d = h.length; k < d; k++) {
                if (a = h[k].nTr)
                    for (; e = a.firstChild;) a.removeChild(e);
                e = 0;
                for (b = h[k].length; e < b; e++) {
                    var m = g = 1;
                    if (f[k][e] === q) {
                        a.appendChild(h[k][e].cell);
                        for (f[k][e] = 1; h[k + g] !== q && h[k][e].cell == h[k + g][e].cell;) f[k + g][e] = 1, g++;
                        for (; h[k][e + m] !== q && h[k][e].cell == h[k][e + m].cell;) {
                            for (c = 0; c < g; c++) f[k + c][e + m] = 1;
                            m++
                        }
                        l(h[k][e].cell).attr("rowspan", g).attr("colspan", m)
                    }
                }
            }
        }
    }

    function ja(a, b) {
        var c = F(a, "aoPreDrawCallback", "preDraw", [a]);
        if (-1 !== l.inArray(!1, c)) V(a, !1);
        else {
            c = [];
            var d = 0,
                e = a.asStripeClasses,
                h = e.length,
                f = a.oLanguage,
                g = a.iInitDisplayStart,
                k = "ssp" == Q(a),
                m = a.aiDisplay;
            a.bDrawing = !0;
            g !== q && -1 !== g && (a._iDisplayStart = k ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
            g = a._iDisplayStart;
            var n = a.fnDisplayEnd();
            if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, V(a, !1);
            else if (!k) a.iDraw++;
            else if (!a.bDestroying && !b) {
                Gb(a);
                return
            }
            if (0 !== m.length)
                for (b = k ? a.aoData.length : n, f = k ? 0 : g; f < b; f++) {
                    k = m[f];
                    var p = a.aoData[k];
                    null === p.nTr && $a(a, k);
                    var t = p.nTr;
                    if (0 !== h) {
                        var v = e[d % h];
                        p._sRowStripe != v && (l(t).removeClass(p._sRowStripe).addClass(v), p._sRowStripe = v)
                    }
                    F(a, "aoRowCallback", null, [t, p._aData, d, f, k]);
                    c.push(t);
                    d++
                } else d = f.sZeroRecords, 1 == a.iDraw && "ajax" == Q(a) ? d = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (d = f.sEmptyTable), c[0] = l("<tr/>", {
                    class: h ? e[0] : ""
                }).append(l("<td />", {
                    valign: "top",
                    colSpan: oa(a),
                    class: a.oClasses.sRowEmpty
                }).html(d))[0];
            F(a, "aoHeaderCallback", "header", [l(a.nTHead).children("tr")[0], cb(a), g, n, m]);
            F(a, "aoFooterCallback", "footer", [l(a.nTFoot).children("tr")[0], cb(a), g, n, m]);
            e = l(a.nTBody);
            e.children().detach();
            e.append(l(c));
            F(a, "aoDrawCallback", "draw", [a]);
            a.bSorted = !1;
            a.bFiltered = !1;
            a.bDrawing = !1
        }
    }

    function ka(a, b) {
        var c = a.oFeatures,
            d = c.bFilter;
        c.bSort && Hb(a);
        d ? za(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
        !0 !== b && (a._iDisplayStart = 0);
        a._drawHold = b;
        ja(a);
        a._drawHold = !1
    }

    function Ib(a) {
        var b = a.oClasses,
            c = l(a.nTable);
        c = l("<div/>").insertBefore(c);
        var d = a.oFeatures,
            e = l("<div/>", {
                id: a.sTableId + "_wrapper",
                class: b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
            });
        a.nHolding = c[0];
        a.nTableWrapper = e[0];
        a.nTableReinsertBefore = a.nTable.nextSibling;
        for (var h = a.sDom.split(""), f, g, k, m, n, p, t = 0; t < h.length; t++) {
            f = null;
            g = h[t];
            if ("<" == g) {
                k = l("<div/>")[0];
                m = h[t + 1];
                if ("'" == m || '"' == m) {
                    n = "";
                    for (p = 2; h[t + p] != m;) n += h[t + p], p++;
                    "H" == n ? n = b.sJUIHeader : "F" == n && (n = b.sJUIFooter); - 1 != n.indexOf(".") ? (m = n.split("."), k.id = m[0].substr(1, m[0].length - 1), k.className = m[1]) : "#" == n.charAt(0) ? k.id = n.substr(1, n.length - 1) : k.className = n;
                    t += p
                }
                e.append(k);
                e = l(k)
            } else if (">" == g) e = e.parent();
            else if ("l" == g && d.bPaginate && d.bLengthChange) f = Jb(a);
            else if ("f" == g && d.bFilter) f = Kb(a);
            else if ("r" == g && d.bProcessing) f = Lb(a);
            else if ("t" == g) f = Mb(a);
            else if ("i" == g && d.bInfo) f = Nb(a);
            else if ("p" == g && d.bPaginate) f = Ob(a);
            else if (0 !== u.ext.feature.length)
                for (k = u.ext.feature, p = 0, m = k.length; p < m; p++)
                    if (g == k[p].cFeature) {
                        f = k[p].fnInit(a);
                        break
                    }
            f && (k = a.aanFeatures, k[g] || (k[g] = []), k[g].push(f), e.append(f))
        }
        c.replaceWith(e);
        a.nHolding = null
    }

    function xa(a, b) {
        b = l(b).children("tr");
        var c, d, e;
        a.splice(0, a.length);
        var h = 0;
        for (e = b.length; h < e; h++) a.push([]);
        h = 0;
        for (e = b.length; h < e; h++) {
            var f = b[h];
            for (c = f.firstChild; c;) {
                if ("TD" == c.nodeName.toUpperCase() || "TH" == c.nodeName.toUpperCase()) {
                    var g = 1 * c.getAttribute("colspan");
                    var k = 1 * c.getAttribute("rowspan");
                    g = g && 0 !== g && 1 !== g ? g : 1;
                    k = k && 0 !== k && 1 !== k ? k : 1;
                    var m = 0;
                    for (d = a[h]; d[m];) m++;
                    var n = m;
                    var p = 1 === g ? !0 : !1;
                    for (d = 0; d < g; d++)
                        for (m = 0; m < k; m++) a[h + m][n + d] = {
                            cell: c,
                            unique: p
                        }, a[h + m].nTr = f
                }
                c = c.nextSibling
            }
        }
    }

    function Na(a, b, c) {
        var d = [];
        c || (c = a.aoHeader, b && (c = [], xa(c, b)));
        b = 0;
        for (var e = c.length; b < e; b++)
            for (var h = 0, f = c[b].length; h < f; h++) !c[b][h].unique || d[h] && a.bSortCellsTop || (d[h] = c[b][h].cell);
        return d
    }

    function Oa(a, b, c) {
        F(a, "aoServerParams", "serverParams", [b]);
        if (b && Array.isArray(b)) {
            var d = {},
                e = /(.*?)\[\]$/;
            l.each(b, function(n, p) {
                (n = p.name.match(e)) ? (n = n[0], d[n] || (d[n] = []), d[n].push(p.value)) : d[p.name] = p.value
            });
            b = d
        }
        var h = a.ajax,
            f = a.oInstance,
            g = function(n) {
                var p = a.jqXhr ? a.jqXhr.status : null;
                if (null === n || "number" === typeof p && 204 == p) n = {}, Aa(a, n, []);
                (p = n.error || n.sError) && da(a, 0, p);
                a.json = n;
                F(a, null, "xhr", [a, n, a.jqXHR]);
                c(n)
            };
        if (l.isPlainObject(h) && h.data) {
            var k = h.data;
            var m = "function" === typeof k ? k(b, a) : k;
            b = "function" === typeof k && m ? m : l.extend(!0, b, m);
            delete h.data
        }
        m = {
            data: b,
            success: g,
            dataType: "json",
            cache: !1,
            type: a.sServerMethod,
            error: function(n, p, t) {
                t = F(a, null, "xhr", [a, null, a.jqXHR]); - 1 === l.inArray(!0, t) && ("parsererror" == p ? da(a, 0, "Invalid JSON response", 1) : 4 === n.readyState && da(a, 0, "Ajax error", 7));
                V(a, !1)
            }
        };
        a.oAjaxData = b;
        F(a, null, "preXhr", [a, b]);
        a.fnServerData ? a.fnServerData.call(f, a.sAjaxSource, l.map(b, function(n, p) {
            return {
                name: p,
                value: n
            }
        }), g, a) : a.sAjaxSource || "string" === typeof h ? a.jqXHR = l.ajax(l.extend(m, {
            url: h || a.sAjaxSource
        })) : "function" === typeof h ? a.jqXHR = h.call(f, b, g, a) : (a.jqXHR = l.ajax(l.extend(m, h)), h.data = k)
    }

    function Gb(a) {
        a.iDraw++;
        V(a, !0);
        Oa(a, Pb(a), function(b) {
            Qb(a, b)
        })
    }

    function Pb(a) {
        var b = a.aoColumns,
            c = b.length,
            d = a.oFeatures,
            e = a.oPreviousSearch,
            h = a.aoPreSearchCols,
            f = [],
            g = pa(a);
        var k = a._iDisplayStart;
        var m = !1 !== d.bPaginate ? a._iDisplayLength : -1;
        var n = function(x, w) {
            f.push({
                name: x,
                value: w
            })
        };
        n("sEcho", a.iDraw);
        n("iColumns", c);
        n("sColumns", U(b, "sName").join(","));
        n("iDisplayStart", k);
        n("iDisplayLength", m);
        var p = {
            draw: a.iDraw,
            columns: [],
            order: [],
            start: k,
            length: m,
            search: {
                value: e.sSearch,
                regex: e.bRegex
            }
        };
        for (k = 0; k < c; k++) {
            var t = b[k];
            var v = h[k];
            m = "function" == typeof t.mData ? "function" : t.mData;
            p.columns.push({
                data: m,
                name: t.sName,
                searchable: t.bSearchable,
                orderable: t.bSortable,
                search: {
                    value: v.sSearch,
                    regex: v.bRegex
                }
            });
            n("mDataProp_" + k, m);
            d.bFilter && (n("sSearch_" + k, v.sSearch), n("bRegex_" + k, v.bRegex), n("bSearchable_" + k, t.bSearchable));
            d.bSort && n("bSortable_" + k, t.bSortable)
        }
        d.bFilter && (n("sSearch", e.sSearch), n("bRegex", e.bRegex));
        d.bSort && (l.each(g, function(x, w) {
            p.order.push({
                column: w.col,
                dir: w.dir
            });
            n("iSortCol_" + x, w.col);
            n("sSortDir_" + x, w.dir)
        }), n("iSortingCols", g.length));
        b = u.ext.legacy.ajax;
        return null === b ? a.sAjaxSource ? f : p : b ? f : p
    }

    function Qb(a, b) {
        var c = function(f, g) {
                return b[f] !== q ? b[f] : b[g]
            },
            d = Aa(a, b),
            e = c("sEcho", "draw"),
            h = c("iTotalRecords", "recordsTotal");
        c = c("iTotalDisplayRecords", "recordsFiltered");
        if (e !== q) {
            if (1 * e < a.iDraw) return;
            a.iDraw = 1 * e
        }
        d || (d = []);
        Ka(a);
        a._iRecordsTotal = parseInt(h, 10);
        a._iRecordsDisplay = parseInt(c, 10);
        e = 0;
        for (h = d.length; e < h; e++) ia(a, d[e]);
        a.aiDisplay = a.aiDisplayMaster.slice();
        ja(a, !0);
        a._bInitComplete || Pa(a, b);
        V(a, !1)
    }

    function Aa(a, b, c) {
        a = l.isPlainObject(a.ajax) && a.ajax.dataSrc !== q ? a.ajax.dataSrc : a.sAjaxDataProp;
        if (!c) return "data" === a ? b.aaData || b[a] : "" !== a ? na(a)(b) : b;
        ha(a)(b, c)
    }

    function Kb(a) {
        var b = a.oClasses,
            c = a.sTableId,
            d = a.oLanguage,
            e = a.oPreviousSearch,
            h = a.aanFeatures,
            f = '<input type="search" class="' + b.sFilterInput + '"/>',
            g = d.sSearch;
        g = g.match(/_INPUT_/) ? g.replace("_INPUT_", f) : g + f;
        b = l("<div/>", {
            id: h.f ? null : c + "_filter",
            class: b.sFilter
        }).append(l("<label/>").append(g));
        var k = function(n) {
            var p = this.value ? this.value : "";
            e.return && "Enter" !== n.key || p == e.sSearch || (za(a, {
                sSearch: p,
                bRegex: e.bRegex,
                bSmart: e.bSmart,
                bCaseInsensitive: e.bCaseInsensitive,
                return: e.return
            }), a._iDisplayStart = 0, ja(a))
        };
        h = null !== a.searchDelay ? a.searchDelay : "ssp" === Q(a) ? 400 : 0;
        var m = l("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", h ? gb(k, h) : k).on("mouseup", function(n) {
            setTimeout(function() {
                k.call(m[0], n)
            }, 10)
        }).on("keypress.DT", function(n) {
            if (13 == n.keyCode) return !1
        }).attr("aria-controls", c);
        l(a.nTable).on("search.dt.DT", function(n, p) {
            if (a === p) try {
                m[0] !== A.activeElement && m.val(e.sSearch)
            } catch (t) {}
        });
        return b[0]
    }

    function za(a, b, c) {
        var d = a.oPreviousSearch,
            e = a.aoPreSearchCols,
            h = function(g) {
                d.sSearch = g.sSearch;
                d.bRegex = g.bRegex;
                d.bSmart = g.bSmart;
                d.bCaseInsensitive = g.bCaseInsensitive;
                d.return = g.return
            },
            f = function(g) {
                return g.bEscapeRegex !== q ? !g.bEscapeRegex : g.bRegex
            };
        Za(a);
        if ("ssp" != Q(a)) {
            Rb(a, b.sSearch, c, f(b), b.bSmart, b.bCaseInsensitive, b.return);
            h(b);
            for (b = 0; b < e.length; b++) Sb(a, e[b].sSearch, b, f(e[b]), e[b].bSmart, e[b].bCaseInsensitive);
            Tb(a)
        } else h(b);
        a.bFiltered = !0;
        F(a, null, "search", [a])
    }

    function Tb(a) {
        for (var b = u.ext.search, c = a.aiDisplay, d, e, h = 0, f = b.length; h < f; h++) {
            for (var g = [], k = 0, m = c.length; k < m; k++) e = c[k], d = a.aoData[e], b[h](a, d._aFilterData, e, d._aData, k) && g.push(e);
            c.length = 0;
            l.merge(c, g)
        }
    }

    function Sb(a, b, c, d, e, h) {
        if ("" !== b) {
            var f = [],
                g = a.aiDisplay;
            d = hb(b, d, e, h);
            for (e = 0; e < g.length; e++) b = a.aoData[g[e]]._aFilterData[c], d.test(b) && f.push(g[e]);
            a.aiDisplay = f
        }
    }

    function Rb(a, b, c, d, e, h) {
        e = hb(b, d, e, h);
        var f = a.oPreviousSearch.sSearch,
            g = a.aiDisplayMaster;
        h = [];
        0 !== u.ext.search.length && (c = !0);
        var k = Ub(a);
        if (0 >= b.length) a.aiDisplay = g.slice();
        else {
            if (k || c || d || f.length > b.length || 0 !== b.indexOf(f) || a.bSorted) a.aiDisplay = g.slice();
            b = a.aiDisplay;
            for (c = 0; c < b.length; c++) e.test(a.aoData[b[c]]._sFilterRow) && h.push(b[c]);
            a.aiDisplay = h
        }
    }

    function hb(a, b, c, d) {
        a = b ? a : ib(a);
        c && (a = "^(?=.*?" + l.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function(e) {
            if ('"' === e.charAt(0)) {
                var h = e.match(/^"(.*)"$/);
                e = h ? h[1] : e
            }
            return e.replace('"', "")
        }).join(")(?=.*?") + ").*$");
        return new RegExp(a, d ? "i" : "")
    }

    function Ub(a) {
        var b = a.aoColumns,
            c, d;
        var e = !1;
        var h = 0;
        for (c = a.aoData.length; h < c; h++) {
            var f = a.aoData[h];
            if (!f._aFilterData) {
                var g = [];
                e = 0;
                for (d = b.length; e < d; e++) {
                    var k = b[e];
                    k.bSearchable ? (k = T(a, h, e, "filter"), null === k && (k = ""), "string" !== typeof k && k.toString && (k = k.toString())) : k = "";
                    k.indexOf && -1 !== k.indexOf("&") && (Qa.innerHTML = k, k = sc ? Qa.textContent : Qa.innerText);
                    k.replace && (k = k.replace(/[\r\n\u2028]/g, ""));
                    g.push(k)
                }
                f._aFilterData = g;
                f._sFilterRow = g.join("  ");
                e = !0
            }
        }
        return e
    }

    function Vb(a) {
        return {
            search: a.sSearch,
            smart: a.bSmart,
            regex: a.bRegex,
            caseInsensitive: a.bCaseInsensitive
        }
    }

    function Wb(a) {
        return {
            sSearch: a.search,
            bSmart: a.smart,
            bRegex: a.regex,
            bCaseInsensitive: a.caseInsensitive
        }
    }

    function Nb(a) {
        var b = a.sTableId,
            c = a.aanFeatures.i,
            d = l("<div/>", {
                class: a.oClasses.sInfo,
                id: c ? null : b + "_info"
            });
        c || (a.aoDrawCallback.push({
            fn: Xb,
            sName: "information"
        }), d.attr("role", "status").attr("aria-live", "polite"), l(a.nTable).attr("aria-describedby", b + "_info"));
        return d[0]
    }

    function Xb(a) {
        var b = a.aanFeatures.i;
        if (0 !== b.length) {
            var c = a.oLanguage,
                d = a._iDisplayStart + 1,
                e = a.fnDisplayEnd(),
                h = a.fnRecordsTotal(),
                f = a.fnRecordsDisplay(),
                g = f ? c.sInfo : c.sInfoEmpty;
            f !== h && (g += " " + c.sInfoFiltered);
            g += c.sInfoPostFix;
            g = Yb(a, g);
            c = c.fnInfoCallback;
            null !== c && (g = c.call(a.oInstance, a, d, e, h, f, g));
            l(b).html(g)
        }
    }

    function Yb(a, b) {
        var c = a.fnFormatNumber,
            d = a._iDisplayStart + 1,
            e = a._iDisplayLength,
            h = a.fnRecordsDisplay(),
            f = -1 === e;
        return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, h)).replace(/_PAGE_/g, c.call(a, f ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, f ? 1 : Math.ceil(h / e)))
    }

    function Ba(a) {
        var b = a.iInitDisplayStart,
            c = a.aoColumns;
        var d = a.oFeatures;
        var e = a.bDeferLoading;
        if (a.bInitialised) {
            Ib(a);
            Fb(a);
            ya(a, a.aoHeader);
            ya(a, a.aoFooter);
            V(a, !0);
            d.bAutoWidth && Ya(a);
            var h = 0;
            for (d = c.length; h < d; h++) {
                var f = c[h];
                f.sWidth && (f.nTh.style.width = K(f.sWidth))
            }
            F(a, null, "preInit", [a]);
            ka(a);
            c = Q(a);
            if ("ssp" != c || e) "ajax" == c ? Oa(a, [], function(g) {
                var k = Aa(a, g);
                for (h = 0; h < k.length; h++) ia(a, k[h]);
                a.iInitDisplayStart = b;
                ka(a);
                V(a, !1);
                Pa(a, g)
            }, a) : (V(a, !1), Pa(a))
        } else setTimeout(function() {
            Ba(a)
        }, 200)
    }

    function Pa(a, b) {
        a._bInitComplete = !0;
        (b || a.oInit.aaData) && ta(a);
        F(a, null, "plugin-init", [a, b]);
        F(a, "aoInitComplete", "init", [a, b])
    }

    function jb(a, b) {
        b = parseInt(b, 10);
        a._iDisplayLength = b;
        kb(a);
        F(a, null, "length", [a, b])
    }

    function Jb(a) {
        var b = a.oClasses,
            c = a.sTableId,
            d = a.aLengthMenu,
            e = Array.isArray(d[0]),
            h = e ? d[0] : d;
        d = e ? d[1] : d;
        e = l("<select/>", {
            name: c + "_length",
            "aria-controls": c,
            class: b.sLengthSelect
        });
        for (var f = 0, g = h.length; f < g; f++) e[0][f] = new Option("number" === typeof d[f] ? a.fnFormatNumber(d[f]) : d[f], h[f]);
        var k = l("<div><label/></div>").addClass(b.sLength);
        a.aanFeatures.l || (k[0].id = c + "_length");
        k.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));
        l("select", k).val(a._iDisplayLength).on("change.DT", function(m) {
            jb(a, l(this).val());
            ja(a)
        });
        l(a.nTable).on("length.dt.DT", function(m, n, p) {
            a === n && l("select", k).val(p)
        });
        return k[0]
    }

    function Ob(a) {
        var b = a.sPaginationType,
            c = u.ext.pager[b],
            d = "function" === typeof c,
            e = function(f) {
                ja(f)
            };
        b = l("<div/>").addClass(a.oClasses.sPaging + b)[0];
        var h = a.aanFeatures;
        d || c.fnInit(a, b, e);
        h.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
            fn: function(f) {
                if (d) {
                    var g = f._iDisplayStart,
                        k = f._iDisplayLength,
                        m = f.fnRecordsDisplay(),
                        n = -1 === k;
                    g = n ? 0 : Math.ceil(g / k);
                    k = n ? 1 : Math.ceil(m / k);
                    m = c(g, k);
                    var p;
                    n = 0;
                    for (p = h.p.length; n < p; n++) fb(f, "pageButton")(f, h.p[n], n, m, g, k)
                } else c.fnUpdate(f, e)
            },
            sName: "pagination"
        }));
        return b
    }

    function lb(a, b, c) {
        var d = a._iDisplayStart,
            e = a._iDisplayLength,
            h = a.fnRecordsDisplay();
        0 === h || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > h && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < h && (d += e) : "last" == b ? d = Math.floor((h - 1) / e) * e : da(a, 0, "Unknown paging action: " + b, 5);
        b = a._iDisplayStart !== d;
        a._iDisplayStart = d;
        b && (F(a, null, "page", [a]), c && ja(a));
        return b
    }

    function Lb(a) {
        return l("<div/>", {
            id: a.aanFeatures.r ? null : a.sTableId + "_processing",
            class: a.oClasses.sProcessing
        }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
    }

    function V(a, b) {
        a.oFeatures.bProcessing && l(a.aanFeatures.r).css("display", b ? "block" : "none");
        F(a, null, "processing", [a, b])
    }

    function Mb(a) {
        var b = l(a.nTable),
            c = a.oScroll;
        if ("" === c.sX && "" === c.sY) return a.nTable;
        var d = c.sX,
            e = c.sY,
            h = a.oClasses,
            f = b.children("caption"),
            g = f.length ? f[0]._captionSide : null,
            k = l(b[0].cloneNode(!1)),
            m = l(b[0].cloneNode(!1)),
            n = b.children("tfoot");
        n.length || (n = null);
        k = l("<div/>", {
            class: h.sScrollWrapper
        }).append(l("<div/>", {
            class: h.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: d ? d ? K(d) : null : "100%"
        }).append(l("<div/>", {
            class: h.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: c.sXInner || "100%"
        }).append(k.removeAttr("id").css("margin-left", 0).append("top" === g ? f : null).append(b.children("thead"))))).append(l("<div/>", {
            class: h.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: d ? K(d) : null
        }).append(b));
        n && k.append(l("<div/>", {
            class: h.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: d ? d ? K(d) : null : "100%"
        }).append(l("<div/>", {
            class: h.sScrollFootInner
        }).append(m.removeAttr("id").css("margin-left", 0).append("bottom" === g ? f : null).append(b.children("tfoot")))));
        b = k.children();
        var p = b[0];
        h = b[1];
        var t = n ? b[2] : null;
        if (d) l(h).on("scroll.DT", function(v) {
            v = this.scrollLeft;
            p.scrollLeft = v;
            n && (t.scrollLeft = v)
        });
        l(h).css("max-height", e);
        c.bCollapse || l(h).css("height", e);
        a.nScrollHead = p;
        a.nScrollBody = h;
        a.nScrollFoot = t;
        a.aoDrawCallback.push({
            fn: Ha,
            sName: "scrolling"
        });
        return k[0]
    }

    function Ha(a) {
        var b = a.oScroll,
            c = b.sX,
            d = b.sXInner,
            e = b.sY;
        b = b.iBarWidth;
        var h = l(a.nScrollHead),
            f = h[0].style,
            g = h.children("div"),
            k = g[0].style,
            m = g.children("table");
        g = a.nScrollBody;
        var n = l(g),
            p = g.style,
            t = l(a.nScrollFoot).children("div"),
            v = t.children("table"),
            x = l(a.nTHead),
            w = l(a.nTable),
            r = w[0],
            C = r.style,
            G = a.nTFoot ? l(a.nTFoot) : null,
            aa = a.oBrowser,
            L = aa.bScrollOversize;
        U(a.aoColumns, "nTh");
        var O = [],
            I = [],
            H = [],
            ea = [],
            Y, Ca = function(D) {
                D = D.style;
                D.paddingTop = "0";
                D.paddingBottom = "0";
                D.borderTopWidth = "0";
                D.borderBottomWidth = "0";
                D.height = 0
            };
        var fa = g.scrollHeight > g.clientHeight;
        if (a.scrollBarVis !== fa && a.scrollBarVis !== q) a.scrollBarVis = fa, ta(a);
        else {
            a.scrollBarVis = fa;
            w.children("thead, tfoot").remove();
            if (G) {
                var ba = G.clone().prependTo(w);
                var la = G.find("tr");
                ba = ba.find("tr")
            }
            var mb = x.clone().prependTo(w);
            x = x.find("tr");
            fa = mb.find("tr");
            mb.find("th, td").removeAttr("tabindex");
            c || (p.width = "100%", h[0].style.width = "100%");
            l.each(Na(a, mb), function(D, W) {
                Y = ua(a, D);
                W.style.width = a.aoColumns[Y].sWidth
            });
            G && ca(function(D) {
                D.style.width = ""
            }, ba);
            h = w.outerWidth();
            "" === c ? (C.width = "100%", L && (w.find("tbody").height() > g.offsetHeight || "scroll" == n.css("overflow-y")) && (C.width = K(w.outerWidth() - b)), h = w.outerWidth()) : "" !== d && (C.width = K(d), h = w.outerWidth());
            ca(Ca, fa);
            ca(function(D) {
                var W = z.getComputedStyle ? z.getComputedStyle(D).width : K(l(D).width());
                H.push(D.innerHTML);
                O.push(W)
            }, fa);
            ca(function(D, W) {
                D.style.width = O[W]
            }, x);
            l(fa).height(0);
            G && (ca(Ca, ba), ca(function(D) {
                ea.push(D.innerHTML);
                I.push(K(l(D).css("width")))
            }, ba), ca(function(D, W) {
                D.style.width = I[W]
            }, la), l(ba).height(0));
            ca(function(D, W) {
                D.innerHTML = '<div class="dataTables_sizing">' + H[W] + "</div>";
                D.childNodes[0].style.height = "0";
                D.childNodes[0].style.overflow = "hidden";
                D.style.width = O[W]
            }, fa);
            G && ca(function(D, W) {
                D.innerHTML = '<div class="dataTables_sizing">' + ea[W] + "</div>";
                D.childNodes[0].style.height = "0";
                D.childNodes[0].style.overflow = "hidden";
                D.style.width = I[W]
            }, ba);
            w.outerWidth() < h ? (la = g.scrollHeight > g.offsetHeight || "scroll" == n.css("overflow-y") ? h + b : h, L && (g.scrollHeight > g.offsetHeight || "scroll" == n.css("overflow-y")) && (C.width = K(la - b)), "" !== c && "" === d || da(a, 1, "Possible column misalignment", 6)) : la = "100%";
            p.width = K(la);
            f.width = K(la);
            G && (a.nScrollFoot.style.width = K(la));
            !e && L && (p.height = K(r.offsetHeight + b));
            c = w.outerWidth();
            m[0].style.width = K(c);
            k.width = K(c);
            d = w.height() > g.clientHeight || "scroll" == n.css("overflow-y");
            e = "padding" + (aa.bScrollbarLeft ? "Left" : "Right");
            k[e] = d ? b + "px" : "0px";
            G && (v[0].style.width = K(c), t[0].style.width = K(c), t[0].style[e] = d ? b + "px" : "0px");
            w.children("colgroup").insertBefore(w.children("thead"));
            n.trigger("scroll");
            !a.bSorted && !a.bFiltered || a._drawHold || (g.scrollTop = 0)
        }
    }

    function ca(a, b, c) {
        for (var d = 0, e = 0, h = b.length, f, g; e < h;) {
            f = b[e].firstChild;
            for (g = c ? c[e].firstChild : null; f;) 1 === f.nodeType && (c ? a(f, g, d) : a(f, d), d++), f = f.nextSibling, g = c ? g.nextSibling : null;
            e++
        }
    }

    function Ya(a) {
        var b = a.nTable,
            c = a.aoColumns,
            d = a.oScroll,
            e = d.sY,
            h = d.sX,
            f = d.sXInner,
            g = c.length,
            k = Ia(a, "bVisible"),
            m = l("th", a.nTHead),
            n = b.getAttribute("width"),
            p = b.parentNode,
            t = !1,
            v, x = a.oBrowser;
        d = x.bScrollOversize;
        (v = b.style.width) && -1 !== v.indexOf("%") && (n = v);
        for (v = 0; v < k.length; v++) {
            var w = c[k[v]];
            null !== w.sWidth && (w.sWidth = Zb(w.sWidthOrig, p), t = !0)
        }
        if (d || !t && !h && !e && g == oa(a) && g == m.length)
            for (v = 0; v < g; v++) k = ua(a, v), null !== k && (c[k].sWidth = K(m.eq(v).width()));
        else {
            g = l(b).clone().css("visibility", "hidden").removeAttr("id");
            g.find("tbody tr").remove();
            var r = l("<tr/>").appendTo(g.find("tbody"));
            g.find("thead, tfoot").remove();
            g.append(l(a.nTHead).clone()).append(l(a.nTFoot).clone());
            g.find("tfoot th, tfoot td").css("width", "");
            m = Na(a, g.find("thead")[0]);
            for (v = 0; v < k.length; v++) w = c[k[v]], m[v].style.width = null !== w.sWidthOrig && "" !== w.sWidthOrig ? K(w.sWidthOrig) : "", w.sWidthOrig && h && l(m[v]).append(l("<div/>").css({
                width: w.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (a.aoData.length)
                for (v = 0; v < k.length; v++) t = k[v], w = c[t], l($b(a, t)).clone(!1).append(w.sContentPadding).appendTo(r);
            l("[name]", g).removeAttr("name");
            w = l("<div/>").css(h || e ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(g).appendTo(p);
            h && f ? g.width(f) : h ? (g.css("width", "auto"), g.removeAttr("width"), g.width() < p.clientWidth && n && g.width(p.clientWidth)) : e ? g.width(p.clientWidth) : n && g.width(n);
            for (v = e = 0; v < k.length; v++) p = l(m[v]), f = p.outerWidth() - p.width(), p = x.bBounding ? Math.ceil(m[v].getBoundingClientRect().width) : p.outerWidth(), e += p, c[k[v]].sWidth = K(p - f);
            b.style.width = K(e);
            w.remove()
        }
        n && (b.style.width = K(n));
        !n && !h || a._reszEvt || (b = function() {
            l(z).on("resize.DT-" + a.sInstance, gb(function() {
                ta(a)
            }))
        }, d ? setTimeout(b, 1e3) : b(), a._reszEvt = !0)
    }

    function Zb(a, b) {
        if (!a) return 0;
        a = l("<div/>").css("width", K(a)).appendTo(b || A.body);
        b = a[0].offsetWidth;
        a.remove();
        return b
    }

    function $b(a, b) {
        var c = ac(a, b);
        if (0 > c) return null;
        var d = a.aoData[c];
        return d.nTr ? d.anCells[b] : l("<td/>").html(T(a, c, b, "display"))[0]
    }

    function ac(a, b) {
        for (var c, d = -1, e = -1, h = 0, f = a.aoData.length; h < f; h++) c = T(a, h, b, "display") + "", c = c.replace(tc, ""), c = c.replace(/&nbsp;/g, " "), c.length > d && (d = c.length, e = h);
        return e
    }

    function K(a) {
        return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
    }

    function pa(a) {
        var b = [],
            c = a.aoColumns;
        var d = a.aaSortingFixed;
        var e = l.isPlainObject(d);
        var h = [];
        var f = function(n) {
            n.length && !Array.isArray(n[0]) ? h.push(n) : l.merge(h, n)
        };
        Array.isArray(d) && f(d);
        e && d.pre && f(d.pre);
        f(a.aaSorting);
        e && d.post && f(d.post);
        for (a = 0; a < h.length; a++) {
            var g = h[a][0];
            f = c[g].aDataSort;
            d = 0;
            for (e = f.length; d < e; d++) {
                var k = f[d];
                var m = c[k].sType || "string";
                h[a]._idx === q && (h[a]._idx = l.inArray(h[a][1], c[k].asSorting));
                b.push({
                    src: g,
                    col: k,
                    dir: h[a][1],
                    index: h[a]._idx,
                    type: m,
                    formatter: u.ext.type.order[m + "-pre"]
                })
            }
        }
        return b
    }

    function Hb(a) {
        var b, c = [],
            d = u.ext.type.order,
            e = a.aoData,
            h = 0,
            f = a.aiDisplayMaster;
        Za(a);
        var g = pa(a);
        var k = 0;
        for (b = g.length; k < b; k++) {
            var m = g[k];
            m.formatter && h++;
            bc(a, m.col)
        }
        if ("ssp" != Q(a) && 0 !== g.length) {
            k = 0;
            for (b = f.length; k < b; k++) c[f[k]] = k;
            h === g.length ? f.sort(function(n, p) {
                var t, v = g.length,
                    x = e[n]._aSortData,
                    w = e[p]._aSortData;
                for (t = 0; t < v; t++) {
                    var r = g[t];
                    var C = x[r.col];
                    var G = w[r.col];
                    C = C < G ? -1 : C > G ? 1 : 0;
                    if (0 !== C) return "asc" === r.dir ? C : -C
                }
                C = c[n];
                G = c[p];
                return C < G ? -1 : C > G ? 1 : 0
            }) : f.sort(function(n, p) {
                var t, v = g.length,
                    x = e[n]._aSortData,
                    w = e[p]._aSortData;
                for (t = 0; t < v; t++) {
                    var r = g[t];
                    var C = x[r.col];
                    var G = w[r.col];
                    r = d[r.type + "-" + r.dir] || d["string-" + r.dir];
                    C = r(C, G);
                    if (0 !== C) return C
                }
                C = c[n];
                G = c[p];
                return C < G ? -1 : C > G ? 1 : 0
            })
        }
        a.bSorted = !0
    }

    function cc(a) {
        var b = a.aoColumns,
            c = pa(a);
        a = a.oLanguage.oAria;
        for (var d = 0, e = b.length; d < e; d++) {
            var h = b[d];
            var f = h.asSorting;
            var g = h.ariaTitle || h.sTitle.replace(/<.*?>/g, "");
            var k = h.nTh;
            k.removeAttribute("aria-sort");
            h.bSortable && (0 < c.length && c[0].col == d ? (k.setAttribute("aria-sort", "asc" == c[0].dir ? "ascending" : "descending"), h = f[c[0].index + 1] || f[0]) : h = f[0], g += "asc" === h ? a.sSortAscending : a.sSortDescending);
            k.setAttribute("aria-label", g)
        }
    }

    function nb(a, b, c, d) {
        var e = a.aaSorting,
            h = a.aoColumns[b].asSorting,
            f = function(g, k) {
                var m = g._idx;
                m === q && (m = l.inArray(g[1], h));
                return m + 1 < h.length ? m + 1 : k ? null : 0
            };
        "number" === typeof e[0] && (e = a.aaSorting = [e]);
        c && a.oFeatures.bSortMulti ? (c = l.inArray(b, U(e, "0")), -1 !== c ? (b = f(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = h[b], e[c]._idx = b)) : (e.push([b, h[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = f(e[0]), e.length = 1, e[0][1] = h[b], e[0]._idx = b) : (e.length = 0, e.push([b, h[0]]), e[0]._idx = 0);
        ka(a);
        "function" == typeof d && d(a)
    }

    function eb(a, b, c, d) {
        var e = a.aoColumns[c];
        ob(b, {}, function(h) {
            !1 !== e.bSortable && (a.oFeatures.bProcessing ? (V(a, !0), setTimeout(function() {
                nb(a, c, h.shiftKey, d);
                "ssp" !== Q(a) && V(a, !1)
            }, 0)) : nb(a, c, h.shiftKey, d))
        })
    }

    function Ra(a) {
        var b = a.aLastSort,
            c = a.oClasses.sSortColumn,
            d = pa(a),
            e = a.oFeatures,
            h;
        if (e.bSort && e.bSortClasses) {
            e = 0;
            for (h = b.length; e < h; e++) {
                var f = b[e].src;
                l(U(a.aoData, "anCells", f)).removeClass(c + (2 > e ? e + 1 : 3))
            }
            e = 0;
            for (h = d.length; e < h; e++) f = d[e].src, l(U(a.aoData, "anCells", f)).addClass(c + (2 > e ? e + 1 : 3))
        }
        a.aLastSort = d
    }

    function bc(a, b) {
        var c = a.aoColumns[b],
            d = u.ext.order[c.sSortDataType],
            e;
        d && (e = d.call(a.oInstance, a, b, va(a, b)));
        for (var h, f = u.ext.type.order[c.sType + "-pre"], g = 0, k = a.aoData.length; g < k; g++)
            if (c = a.aoData[g], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) h = d ? e[g] : T(a, g, b, "sort"), c._aSortData[b] = f ? f(h) : h
    }

    function qa(a) {
        if (!a._bLoadingState) {
            var b = {
                time: +new Date,
                start: a._iDisplayStart,
                length: a._iDisplayLength,
                order: l.extend(!0, [], a.aaSorting),
                search: Vb(a.oPreviousSearch),
                columns: l.map(a.aoColumns, function(c, d) {
                    return {
                        visible: c.bVisible,
                        search: Vb(a.aoPreSearchCols[d])
                    }
                })
            };
            a.oSavedState = b;
            F(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
            a.oFeatures.bStateSave && !a.bDestroying && a.fnStateSaveCallback.call(a.oInstance, a, b)
        }
    }

    function dc(a, b, c) {
        if (a.oFeatures.bStateSave) return b = a.fnStateLoadCallback.call(a.oInstance, a, function(d) {
            pb(a, d, c)
        }), b !== q && pb(a, b, c), !0;
        c()
    }

    function pb(a, b, c) {
        var d, e = a.aoColumns;
        a._bLoadingState = !0;
        var h = a._bInitComplete ? new u.Api(a) : null;
        if (b && b.time) {
            var f = F(a, "aoStateLoadParams", "stateLoadParams", [a, b]);
            if (-1 !== l.inArray(!1, f)) a._bLoadingState = !1;
            else if (f = a.iStateDuration, 0 < f && b.time < +new Date - 1e3 * f) a._bLoadingState = !1;
            else if (b.columns && e.length !== b.columns.length) a._bLoadingState = !1;
            else {
                a.oLoadedState = l.extend(!0, {}, b);
                b.start !== q && (a._iDisplayStart = b.start, null === h && (a.iInitDisplayStart = b.start));
                b.length !== q && (a._iDisplayLength = b.length);
                b.order !== q && (a.aaSorting = [], l.each(b.order, function(k, m) {
                    a.aaSorting.push(m[0] >= e.length ? [0, m[1]] : m)
                }));
                b.search !== q && l.extend(a.oPreviousSearch, Wb(b.search));
                if (b.columns) {
                    f = 0;
                    for (d = b.columns.length; f < d; f++) {
                        var g = b.columns[f];
                        g.visible !== q && (h ? h.column(f).visible(g.visible, !1) : e[f].bVisible = g.visible);
                        g.search !== q && l.extend(a.aoPreSearchCols[f], Wb(g.search))
                    }
                    h && h.columns.adjust()
                }
                a._bLoadingState = !1;
                F(a, "aoStateLoaded", "stateLoaded", [a, b])
            }
        } else a._bLoadingState = !1;
        c()
    }

    function Sa(a) {
        var b = u.settings;
        a = l.inArray(a, U(b, "nTable"));
        return -1 !== a ? b[a] : null
    }

    function da(a, b, c, d) {
        c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
        d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
        if (b) z.console && console.log && console.log(c);
        else if (b = u.ext, b = b.sErrMode || b.errMode, a && F(a, null, "error", [a, d, c]), "alert" == b) alert(c);
        else {
            if ("throw" == b) throw Error(c);
            "function" == typeof b && b(a, d, c)
        }
    }

    function X(a, b, c, d) {
        Array.isArray(c) ? l.each(c, function(e, h) {
            Array.isArray(h) ? X(a, b, h[0], h[1]) : X(a, b, h)
        }) : (d === q && (d = c), b[c] !== q && (a[d] = b[c]))
    }

    function qb(a, b, c) {
        var d;
        for (d in b)
            if (b.hasOwnProperty(d)) {
                var e = b[d];
                l.isPlainObject(e) ? (l.isPlainObject(a[d]) || (a[d] = {}), l.extend(!0, a[d], e)) : c && "data" !== d && "aaData" !== d && Array.isArray(e) ? a[d] = e.slice() : a[d] = e
            }
        return a
    }

    function ob(a, b, c) {
        l(a).on("click.DT", b, function(d) {
            l(a).trigger("blur");
            c(d)
        }).on("keypress.DT", b, function(d) {
            13 === d.which && (d.preventDefault(), c(d))
        }).on("selectstart.DT", function() {
            return !1
        })
    }

    function R(a, b, c, d) {
        c && a[b].push({
            fn: c,
            sName: d
        })
    }

    function F(a, b, c, d) {
        var e = [];
        b && (e = l.map(a[b].slice().reverse(), function(h, f) {
            return h.fn.apply(a.oInstance, d)
        }));
        null !== c && (b = l.Event(c + ".dt"), l(a.nTable).trigger(b, d), e.push(b.result));
        return e
    }

    function kb(a) {
        var b = a._iDisplayStart,
            c = a.fnDisplayEnd(),
            d = a._iDisplayLength;
        b >= c && (b = c - d);
        b -= b % d;
        if (-1 === d || 0 > b) b = 0;
        a._iDisplayStart = b
    }

    function fb(a, b) {
        a = a.renderer;
        var c = u.ext.renderer[b];
        return l.isPlainObject(a) && a[b] ? c[a[b]] || c._ : "string" === typeof a ? c[a] || c._ : c._
    }

    function Q(a) {
        return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
    }

    function Da(a, b) {
        var c = ec.numbers_length,
            d = Math.floor(c / 2);
        b <= c ? a = ra(0, b) : a <= d ? (a = ra(0, c - 2), a.push("ellipsis"), a.push(b - 1)) : (a >= b - 1 - d ? a = ra(b - (c - 2), b) : (a = ra(a - d + 2, a + d - 1), a.push("ellipsis"), a.push(b - 1)), a.splice(0, 0, "ellipsis"), a.splice(0, 0, 0));
        a.DT_el = "span";
        return a
    }

    function Wa(a) {
        l.each({
            num: function(b) {
                return Ta(b, a)
            },
            "num-fmt": function(b) {
                return Ta(b, a, rb)
            },
            "html-num": function(b) {
                return Ta(b, a, Ua)
            },
            "html-num-fmt": function(b) {
                return Ta(b, a, Ua, rb)
            }
        }, function(b, c) {
            M.type.order[b + a + "-pre"] = c;
            b.match(/^html\-/) && (M.type.search[b + a] = M.type.search.html)
        })
    }

    function fc(a) {
        return function() {
            var b = [Sa(this[u.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return u.ext.internal[a].apply(this, b)
        }
    }
    var u = function(a, b) {
            if (this instanceof u) return l(a).DataTable(b);
            b = a;
            this.$ = function(f, g) {
                return this.api(!0).$(f, g)
            };
            this._ = function(f, g) {
                return this.api(!0).rows(f, g).data()
            };
            this.api = function(f) {
                return f ? new B(Sa(this[M.iApiIndex])) : new B(this)
            };
            this.fnAddData = function(f, g) {
                var k = this.api(!0);
                f = Array.isArray(f) && (Array.isArray(f[0]) || l.isPlainObject(f[0])) ? k.rows.add(f) : k.row.add(f);
                (g === q || g) && k.draw();
                return f.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function(f) {
                var g = this.api(!0).columns.adjust(),
                    k = g.settings()[0],
                    m = k.oScroll;
                f === q || f ? g.draw(!1) : ("" !== m.sX || "" !== m.sY) && Ha(k)
            };
            this.fnClearTable = function(f) {
                var g = this.api(!0).clear();
                (f === q || f) && g.draw()
            };
            this.fnClose = function(f) {
                this.api(!0).row(f).child.hide()
            };
            this.fnDeleteRow = function(f, g, k) {
                var m = this.api(!0);
                f = m.rows(f);
                var n = f.settings()[0],
                    p = n.aoData[f[0][0]];
                f.remove();
                g && g.call(this, n, p);
                (k === q || k) && m.draw();
                return p
            };
            this.fnDestroy = function(f) {
                this.api(!0).destroy(f)
            };
            this.fnDraw = function(f) {
                this.api(!0).draw(f)
            };
            this.fnFilter = function(f, g, k, m, n, p) {
                n = this.api(!0);
                null === g || g === q ? n.search(f, k, m, p) : n.column(g).search(f, k, m, p);
                n.draw()
            };
            this.fnGetData = function(f, g) {
                var k = this.api(!0);
                if (f !== q) {
                    var m = f.nodeName ? f.nodeName.toLowerCase() : "";
                    return g !== q || "td" == m || "th" == m ? k.cell(f, g).data() : k.row(f).data() || null
                }
                return k.data().toArray()
            };
            this.fnGetNodes = function(f) {
                var g = this.api(!0);
                return f !== q ? g.row(f).node() : g.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function(f) {
                var g = this.api(!0),
                    k = f.nodeName.toUpperCase();
                return "TR" == k ? g.row(f).index() : "TD" == k || "TH" == k ? (f = g.cell(f).index(), [f.row, f.columnVisible, f.column]) : null
            };
            this.fnIsOpen = function(f) {
                return this.api(!0).row(f).child.isShown()
            };
            this.fnOpen = function(f, g, k) {
                return this.api(!0).row(f).child(g, k).show().child()[0]
            };
            this.fnPageChange = function(f, g) {
                f = this.api(!0).page(f);
                (g === q || g) && f.draw(!1)
            };
            this.fnSetColumnVis = function(f, g, k) {
                f = this.api(!0).column(f).visible(g);
                (k === q || k) && f.columns.adjust().draw()
            };
            this.fnSettings = function() {
                return Sa(this[M.iApiIndex])
            };
            this.fnSort = function(f) {
                this.api(!0).order(f).draw()
            };
            this.fnSortListener = function(f, g, k) {
                this.api(!0).order.listener(f, g, k)
            };
            this.fnUpdate = function(f, g, k, m, n) {
                var p = this.api(!0);
                k === q || null === k ? p.row(g).data(f) : p.cell(g, k).data(f);
                (n === q || n) && p.columns.adjust();
                (m === q || m) && p.draw();
                return 0
            };
            this.fnVersionCheck = M.fnVersionCheck;
            var c = this,
                d = b === q,
                e = this.length;
            d && (b = {});
            this.oApi = this.internal = M.internal;
            for (var h in u.ext.internal) h && (this[h] = fc(h));
            this.each(function() {
                var f = {},
                    g = 1 < e ? qb(f, b, !0) : b,
                    k = 0,
                    m;
                f = this.getAttribute("id");
                var n = !1,
                    p = u.defaults,
                    t = l(this);
                if ("table" != this.nodeName.toLowerCase()) da(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    zb(p);
                    Ab(p.column);
                    P(p, p, !0);
                    P(p.column, p.column, !0);
                    P(p, l.extend(g, t.data()), !0);
                    var v = u.settings;
                    k = 0;
                    for (m = v.length; k < m; k++) {
                        var x = v[k];
                        if (x.nTable == this || x.nTHead && x.nTHead.parentNode == this || x.nTFoot && x.nTFoot.parentNode == this) {
                            var w = g.bRetrieve !== q ? g.bRetrieve : p.bRetrieve;
                            if (d || w) return x.oInstance;
                            if (g.bDestroy !== q ? g.bDestroy : p.bDestroy) {
                                x.oInstance.fnDestroy();
                                break
                            } else {
                                da(x, 0, "Cannot reinitialise DataTable", 3);
                                return
                            }
                        }
                        if (x.sTableId == this.id) {
                            v.splice(k, 1);
                            break
                        }
                    }
                    if (null === f || "" === f) this.id = f = "DataTables_Table_" + u.ext._unique++;
                    var r = l.extend(!0, {}, u.models.oSettings, {
                        sDestroyWidth: t[0].style.width,
                        sInstance: f,
                        sTableId: f
                    });
                    r.nTable = this;
                    r.oApi = c.internal;
                    r.oInit = g;
                    v.push(r);
                    r.oInstance = 1 === c.length ? c : t.dataTable();
                    zb(g);
                    ma(g.oLanguage);
                    g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = Array.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);
                    g = qb(l.extend(!0, {}, p), g);
                    X(r.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    X(r, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"]
                    ]);
                    X(r.oScroll, g, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]);
                    X(r.oLanguage, g, "fnInfoCallback");
                    R(r, "aoDrawCallback", g.fnDrawCallback, "user");
                    R(r, "aoServerParams", g.fnServerParams, "user");
                    R(r, "aoStateSaveParams", g.fnStateSaveParams, "user");
                    R(r, "aoStateLoadParams", g.fnStateLoadParams, "user");
                    R(r, "aoStateLoaded", g.fnStateLoaded, "user");
                    R(r, "aoRowCallback", g.fnRowCallback, "user");
                    R(r, "aoRowCreatedCallback", g.fnCreatedRow, "user");
                    R(r, "aoHeaderCallback", g.fnHeaderCallback, "user");
                    R(r, "aoFooterCallback", g.fnFooterCallback, "user");
                    R(r, "aoInitComplete", g.fnInitComplete, "user");
                    R(r, "aoPreDrawCallback", g.fnPreDrawCallback, "user");
                    r.rowIdFn = na(g.rowId);
                    Bb(r);
                    var C = r.oClasses;
                    l.extend(C, u.ext.classes, g.oClasses);
                    t.addClass(C.sTable);
                    r.iInitDisplayStart === q && (r.iInitDisplayStart = g.iDisplayStart, r._iDisplayStart = g.iDisplayStart);
                    null !== g.iDeferLoading && (r.bDeferLoading = !0, f = Array.isArray(g.iDeferLoading), r._iRecordsDisplay = f ? g.iDeferLoading[0] : g.iDeferLoading, r._iRecordsTotal = f ? g.iDeferLoading[1] : g.iDeferLoading);
                    var G = r.oLanguage;
                    l.extend(!0, G, g.oLanguage);
                    G.sUrl ? (l.ajax({
                        dataType: "json",
                        url: G.sUrl,
                        success: function(I) {
                            P(p.oLanguage, I);
                            ma(I);
                            l.extend(!0, G, I);
                            F(r, null, "i18n", [r]);
                            Ba(r)
                        },
                        error: function() {
                            Ba(r)
                        }
                    }), n = !0) : F(r, null, "i18n", [r]);
                    null === g.asStripeClasses && (r.asStripeClasses = [C.sStripeOdd, C.sStripeEven]);
                    f = r.asStripeClasses;
                    var aa = t.children("tbody").find("tr").eq(0); - 1 !== l.inArray(!0, l.map(f, function(I, H) {
                        return aa.hasClass(I)
                    })) && (l("tbody tr", this).removeClass(f.join(" ")), r.asDestroyStripes = f.slice());
                    f = [];
                    v = this.getElementsByTagName("thead");
                    0 !== v.length && (xa(r.aoHeader, v[0]), f = Na(r));
                    if (null === g.aoColumns)
                        for (v = [], k = 0, m = f.length; k < m; k++) v.push(null);
                    else v = g.aoColumns;
                    k = 0;
                    for (m = v.length; k < m; k++) Xa(r, f ? f[k] : null);
                    Db(r, g.aoColumnDefs, v, function(I, H) {
                        Ga(r, I, H)
                    });
                    if (aa.length) {
                        var L = function(I, H) {
                            return null !== I.getAttribute("data-" + H) ? H : null
                        };
                        l(aa[0]).children("th, td").each(function(I, H) {
                            var ea = r.aoColumns[I];
                            if (ea.mData === I) {
                                var Y = L(H, "sort") || L(H, "order");
                                H = L(H, "filter") || L(H, "search");
                                if (null !== Y || null !== H) ea.mData = {
                                    _: I + ".display",
                                    sort: null !== Y ? I + ".@data-" + Y : q,
                                    type: null !== Y ? I + ".@data-" + Y : q,
                                    filter: null !== H ? I + ".@data-" + H : q
                                }, Ga(r, I)
                            }
                        })
                    }
                    var O = r.oFeatures;
                    f = function() {
                        if (g.aaSorting === q) {
                            var I = r.aaSorting;
                            k = 0;
                            for (m = I.length; k < m; k++) I[k][1] = r.aoColumns[k].asSorting[0]
                        }
                        Ra(r);
                        O.bSort && R(r, "aoDrawCallback", function() {
                            if (r.bSorted) {
                                var Y = pa(r),
                                    Ca = {};
                                l.each(Y, function(fa, ba) {
                                    Ca[ba.src] = ba.dir
                                });
                                F(r, null, "order", [r, Y, Ca]);
                                cc(r)
                            }
                        });
                        R(r, "aoDrawCallback", function() {
                            (r.bSorted || "ssp" === Q(r) || O.bDeferRender) && Ra(r)
                        }, "sc");
                        I = t.children("caption").each(function() {
                            this._captionSide = l(this).css("caption-side")
                        });
                        var H = t.children("thead");
                        0 === H.length && (H = l("<thead/>").appendTo(t));
                        r.nTHead = H[0];
                        var ea = t.children("tbody");
                        0 === ea.length && (ea = l("<tbody/>").insertAfter(H));
                        r.nTBody = ea[0];
                        H = t.children("tfoot");
                        0 === H.length && 0 < I.length && ("" !== r.oScroll.sX || "" !== r.oScroll.sY) && (H = l("<tfoot/>").appendTo(t));
                        0 === H.length || 0 === H.children().length ? t.addClass(C.sNoFooter) : 0 < H.length && (r.nTFoot = H[0], xa(r.aoFooter, r.nTFoot));
                        if (g.aaData)
                            for (k = 0; k < g.aaData.length; k++) ia(r, g.aaData[k]);
                        else(r.bDeferLoading || "dom" == Q(r)) && Ja(r, l(r.nTBody).children("tr"));
                        r.aiDisplay = r.aiDisplayMaster.slice();
                        r.bInitialised = !0;
                        !1 === n && Ba(r)
                    };
                    R(r, "aoDrawCallback", qa, "state_save");
                    g.bStateSave ? (O.bStateSave = !0, dc(r, g, f)) : f()
                }
            });
            c = null;
            return this
        },
        M, y, J, sb = {},
        gc = /[\r\n\u2028]/g,
        Ua = /<.*?>/g,
        uc = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        vc = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^|\-)/g,
        rb = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
        Z = function(a) {
            return a && !0 !== a && "-" !== a ? !1 : !0
        },
        hc = function(a) {
            var b = parseInt(a, 10);
            return !isNaN(b) && isFinite(a) ? b : null
        },
        ic = function(a, b) {
            sb[b] || (sb[b] = new RegExp(ib(b), "g"));
            return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(sb[b], ".") : a
        },
        tb = function(a, b, c) {
            var d = "string" === typeof a;
            if (Z(a)) return !0;
            b && d && (a = ic(a, b));
            c && d && (a = a.replace(rb, ""));
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        jc = function(a, b, c) {
            return Z(a) ? !0 : Z(a) || "string" === typeof a ? tb(a.replace(Ua, ""), b, c) ? !0 : null : null
        },
        U = function(a, b, c) {
            var d = [],
                e = 0,
                h = a.length;
            if (c !== q)
                for (; e < h; e++) a[e] && a[e][b] && d.push(a[e][b][c]);
            else
                for (; e < h; e++) a[e] && d.push(a[e][b]);
            return d
        },
        Ea = function(a, b, c, d) {
            var e = [],
                h = 0,
                f = b.length;
            if (d !== q)
                for (; h < f; h++) a[b[h]][c] && e.push(a[b[h]][c][d]);
            else
                for (; h < f; h++) e.push(a[b[h]][c]);
            return e
        },
        ra = function(a, b) {
            var c = [];
            if (b === q) {
                b = 0;
                var d = a
            } else d = b, b = a;
            for (a = b; a < d; a++) c.push(a);
            return c
        },
        kc = function(a) {
            for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]);
            return b
        },
        Ma = function(a) {
            a: {
                if (!(2 > a.length)) {
                    var b = a.slice().sort();
                    for (var c = b[0], d = 1, e = b.length; d < e; d++) {
                        if (b[d] === c) {
                            b = !1;
                            break a
                        }
                        c = b[d]
                    }
                }
                b = !0
            }
            if (b) return a.slice();b = [];e = a.length;
            var h, f = 0;d = 0;a: for (; d < e; d++) {
                c = a[d];
                for (h = 0; h < f; h++)
                    if (b[h] === c) continue a;
                b.push(c);
                f++
            }
            return b
        },
        lc = function(a, b) {
            if (Array.isArray(b))
                for (var c = 0; c < b.length; c++) lc(a, b[c]);
            else a.push(b);
            return a
        },
        mc = function(a, b) {
            b === q && (b = 0);
            return -1 !== this.indexOf(a, b)
        };
    Array.isArray || (Array.isArray = function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    });
    Array.prototype.includes || (Array.prototype.includes = mc);
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    });
    String.prototype.includes || (String.prototype.includes = mc);
    u.util = {
        throttle: function(a, b) {
            var c = b !== q ? b : 200,
                d, e;
            return function() {
                var h = this,
                    f = +new Date,
                    g = arguments;
                d && f < d + c ? (clearTimeout(e), e = setTimeout(function() {
                    d = q;
                    a.apply(h, g)
                }, c)) : (d = f, a.apply(h, g))
            }
        },
        escapeRegex: function(a) {
            return a.replace(vc, "\\$1")
        },
        set: function(a) {
            if (l.isPlainObject(a)) return u.util.set(a._);
            if (null === a) return function() {};
            if ("function" === typeof a) return function(c, d, e) {
                a(c, "set", d, e)
            };
            if ("string" !== typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(c, d) {
                c[a] = d
            };
            var b = function(c, d, e) {
                e = bb(e);
                var h = e[e.length - 1];
                for (var f, g, k = 0, m = e.length - 1; k < m; k++) {
                    if ("__proto__" === e[k] || "constructor" === e[k]) throw Error("Cannot set prototype values");
                    f = e[k].match(Fa);
                    g = e[k].match(sa);
                    if (f) {
                        e[k] = e[k].replace(Fa, "");
                        c[e[k]] = [];
                        h = e.slice();
                        h.splice(0, k + 1);
                        f = h.join(".");
                        if (Array.isArray(d))
                            for (g = 0, m = d.length; g < m; g++) h = {}, b(h, d[g], f), c[e[k]].push(h);
                        else c[e[k]] = d;
                        return
                    }
                    g && (e[k] = e[k].replace(sa, ""), c = c[e[k]](d));
                    if (null === c[e[k]] || c[e[k]] === q) c[e[k]] = {};
                    c = c[e[k]]
                }
                if (h.match(sa)) c[h.replace(sa, "")](d);
                else c[h.replace(Fa, "")] = d
            };
            return function(c, d) {
                return b(c, d, a)
            }
        },
        get: function(a) {
            if (l.isPlainObject(a)) {
                var b = {};
                l.each(a, function(d, e) {
                    e && (b[d] = u.util.get(e))
                });
                return function(d, e, h, f) {
                    var g = b[e] || b._;
                    return g !== q ? g(d, e, h, f) : d
                }
            }
            if (null === a) return function(d) {
                return d
            };
            if ("function" === typeof a) return function(d, e, h, f) {
                return a(d, e, h, f)
            };
            if ("string" !== typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(d, e) {
                return d[a]
            };
            var c = function(d, e, h) {
                if ("" !== h) {
                    var f = bb(h);
                    for (var g = 0, k = f.length; g < k; g++) {
                        h = f[g].match(Fa);
                        var m = f[g].match(sa);
                        if (h) {
                            f[g] = f[g].replace(Fa, "");
                            "" !== f[g] && (d = d[f[g]]);
                            m = [];
                            f.splice(0, g + 1);
                            f = f.join(".");
                            if (Array.isArray(d))
                                for (g = 0, k = d.length; g < k; g++) m.push(c(d[g], e, f));
                            d = h[0].substring(1, h[0].length - 1);
                            d = "" === d ? m : m.join(d);
                            break
                        } else if (m) {
                            f[g] = f[g].replace(sa, "");
                            d = d[f[g]]();
                            continue
                        }
                        if (null === d || d[f[g]] === q) return q;
                        d = d[f[g]]
                    }
                }
                return d
            };
            return function(d, e) {
                return c(d, e, a)
            }
        }
    };
    var S = function(a, b, c) {
            a[b] !== q && (a[c] = a[b])
        },
        Fa = /\[.*?\]$/,
        sa = /\(\)$/,
        na = u.util.get,
        ha = u.util.set,
        ib = u.util.escapeRegex,
        Qa = l("<div>")[0],
        sc = Qa.textContent !== q,
        tc = /<.*?>/g,
        gb = u.util.throttle,
        nc = [],
        N = Array.prototype,
        wc = function(a) {
            var b, c = u.settings,
                d = l.map(c, function(h, f) {
                    return h.nTable
                });
            if (a) {
                if (a.nTable && a.oApi) return [a];
                if (a.nodeName && "table" === a.nodeName.toLowerCase()) {
                    var e = l.inArray(a, d);
                    return -1 !== e ? [c[e]] : null
                }
                if (a && "function" === typeof a.settings) return a.settings().toArray();
                "string" === typeof a ? b = l(a) : a instanceof l && (b = a)
            } else return [];
            if (b) return b.map(function(h) {
                e = l.inArray(this, d);
                return -1 !== e ? c[e] : null
            }).toArray()
        };
    var B = function(a, b) {
        if (!(this instanceof B)) return new B(a, b);
        var c = [],
            d = function(f) {
                (f = wc(f)) && c.push.apply(c, f)
            };
        if (Array.isArray(a))
            for (var e = 0, h = a.length; e < h; e++) d(a[e]);
        else d(a);
        this.context = Ma(c);
        b && l.merge(this, b);
        this.selector = {
            rows: null,
            cols: null,
            opts: null
        };
        B.extend(this, this, nc)
    };
    u.Api = B;
    l.extend(B.prototype, {
        any: function() {
            return 0 !== this.count()
        },
        concat: N.concat,
        context: [],
        count: function() {
            return this.flatten().length
        },
        each: function(a) {
            for (var b = 0, c = this.length; b < c; b++) a.call(this, this[b], b, this);
            return this
        },
        eq: function(a) {
            var b = this.context;
            return b.length > a ? new B(b[a], this[a]) : null
        },
        filter: function(a) {
            var b = [];
            if (N.filter) b = N.filter.call(this, a, this);
            else
                for (var c = 0, d = this.length; c < d; c++) a.call(this, this[c], c, this) && b.push(this[c]);
            return new B(this.context, b)
        },
        flatten: function() {
            var a = [];
            return new B(this.context, a.concat.apply(a, this.toArray()))
        },
        join: N.join,
        indexOf: N.indexOf || function(a, b) {
            b = b || 0;
            for (var c = this.length; b < c; b++)
                if (this[b] === a) return b;
            return -1
        },
        iterator: function(a, b, c, d) {
            var e = [],
                h, f, g = this.context,
                k, m = this.selector;
            "string" === typeof a && (d = c, c = b, b = a, a = !1);
            var n = 0;
            for (h = g.length; n < h; n++) {
                var p = new B(g[n]);
                if ("table" === b) {
                    var t = c.call(p, g[n], n);
                    t !== q && e.push(t)
                } else if ("columns" === b || "rows" === b) t = c.call(p, g[n], this[n], n), t !== q && e.push(t);
                else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                    var v = this[n];
                    "column-rows" === b && (k = Va(g[n], m.opts));
                    var x = 0;
                    for (f = v.length; x < f; x++) t = v[x], t = "cell" === b ? c.call(p, g[n], t.row, t.column, n, x) : c.call(p, g[n], t, n, x, k), t !== q && e.push(t)
                }
            }
            return e.length || d ? (a = new B(g, a ? e.concat.apply([], e) : e), b = a.selector, b.rows = m.rows, b.cols = m.cols, b.opts = m.opts, a) : this
        },
        lastIndexOf: N.lastIndexOf || function(a, b) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function(a) {
            var b = [];
            if (N.map) b = N.map.call(this, a, this);
            else
                for (var c = 0, d = this.length; c < d; c++) b.push(a.call(this, this[c], c));
            return new B(this.context, b)
        },
        pluck: function(a) {
            return this.map(function(b) {
                return b[a]
            })
        },
        pop: N.pop,
        push: N.push,
        reduce: N.reduce || function(a, b) {
            return Cb(this, a, b, 0, this.length, 1)
        },
        reduceRight: N.reduceRight || function(a, b) {
            return Cb(this, a, b, this.length - 1, -1, -1)
        },
        reverse: N.reverse,
        selector: null,
        shift: N.shift,
        slice: function() {
            return new B(this.context, this)
        },
        sort: N.sort,
        splice: N.splice,
        toArray: function() {
            return N.slice.call(this)
        },
        to$: function() {
            return l(this)
        },
        toJQuery: function() {
            return l(this)
        },
        unique: function() {
            return new B(this.context, Ma(this))
        },
        unshift: N.unshift
    });
    B.extend = function(a, b, c) {
        if (c.length && b && (b instanceof B || b.__dt_wrapper)) {
            var d, e = function(g, k, m) {
                return function() {
                    var n = k.apply(g, arguments);
                    B.extend(n, n, m.methodExt);
                    return n
                }
            };
            var h = 0;
            for (d = c.length; h < d; h++) {
                var f = c[h];
                b[f.name] = "function" === f.type ? e(a, f.val, f) : "object" === f.type ? {} : f.val;
                b[f.name].__dt_wrapper = !0;
                B.extend(a, b[f.name], f.propExt)
            }
        }
    };
    B.register = y = function(a, b) {
        if (Array.isArray(a))
            for (var c = 0, d = a.length; c < d; c++) B.register(a[c], b);
        else {
            d = a.split(".");
            var e = nc,
                h;
            a = 0;
            for (c = d.length; a < c; a++) {
                var f = (h = -1 !== d[a].indexOf("()")) ? d[a].replace("()", "") : d[a];
                a: {
                    var g = 0;
                    for (var k = e.length; g < k; g++)
                        if (e[g].name === f) {
                            g = e[g];
                            break a
                        }
                    g = null
                }
                g || (g = {
                    name: f,
                    val: {},
                    methodExt: [],
                    propExt: [],
                    type: "object"
                }, e.push(g));
                a === c - 1 ? (g.val = b, g.type = "function" === typeof b ? "function" : l.isPlainObject(b) ? "object" : "other") : e = h ? g.methodExt : g.propExt
            }
        }
    };
    B.registerPlural = J = function(a, b, c) {
        B.register(a, c);
        B.register(b, function() {
            var d = c.apply(this, arguments);
            return d === this ? this : d instanceof B ? d.length ? Array.isArray(d[0]) ? new B(d.context, d[0]) : d[0] : q : d
        })
    };
    var oc = function(a, b) {
        if (Array.isArray(a)) return l.map(a, function(d) {
            return oc(d, b)
        });
        if ("number" === typeof a) return [b[a]];
        var c = l.map(b, function(d, e) {
            return d.nTable
        });
        return l(c).filter(a).map(function(d) {
            d = l.inArray(this, c);
            return b[d]
        }).toArray()
    };
    y("tables()", function(a) {
        return a !== q && null !== a ? new B(oc(a, this.context)) : this
    });
    y("table()", function(a) {
        a = this.tables(a);
        var b = a.context;
        return b.length ? new B(b[0]) : a
    });
    J("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(a) {
            return a.nTable
        }, 1)
    });
    J("tables().body()", "table().body()", function() {
        return this.iterator("table", function(a) {
            return a.nTBody
        }, 1)
    });
    J("tables().header()", "table().header()", function() {
        return this.iterator("table", function(a) {
            return a.nTHead
        }, 1)
    });
    J("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(a) {
            return a.nTFoot
        }, 1)
    });
    J("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(a) {
            return a.nTableWrapper
        }, 1)
    });
    y("draw()", function(a) {
        return this.iterator("table", function(b) {
            "page" === a ? ja(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), ka(b, !1 === a))
        })
    });
    y("page()", function(a) {
        return a === q ? this.page.info().page : this.iterator("table", function(b) {
            lb(b, a)
        })
    });
    y("page.info()", function(a) {
        if (0 === this.context.length) return q;
        a = this.context[0];
        var b = a._iDisplayStart,
            c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
            d = a.fnRecordsDisplay(),
            e = -1 === c;
        return {
            page: e ? 0 : Math.floor(b / c),
            pages: e ? 1 : Math.ceil(d / c),
            start: b,
            end: a.fnDisplayEnd(),
            length: c,
            recordsTotal: a.fnRecordsTotal(),
            recordsDisplay: d,
            serverSide: "ssp" === Q(a)
        }
    });
    y("page.len()", function(a) {
        return a === q ? 0 !== this.context.length ? this.context[0]._iDisplayLength : q : this.iterator("table", function(b) {
            jb(b, a)
        })
    });
    var pc = function(a, b, c) {
        if (c) {
            var d = new B(a);
            d.one("draw", function() {
                c(d.ajax.json())
            })
        }
        if ("ssp" == Q(a)) ka(a, b);
        else {
            V(a, !0);
            var e = a.jqXHR;
            e && 4 !== e.readyState && e.abort();
            Oa(a, [], function(h) {
                Ka(a);
                h = Aa(a, h);
                for (var f = 0, g = h.length; f < g; f++) ia(a, h[f]);
                ka(a, b);
                V(a, !1)
            })
        }
    };
    y("ajax.json()", function() {
        var a = this.context;
        if (0 < a.length) return a[0].json
    });
    y("ajax.params()", function() {
        var a = this.context;
        if (0 < a.length) return a[0].oAjaxData
    });
    y("ajax.reload()", function(a, b) {
        return this.iterator("table", function(c) {
            pc(c, !1 === b, a)
        })
    });
    y("ajax.url()", function(a) {
        var b = this.context;
        if (a === q) {
            if (0 === b.length) return q;
            b = b[0];
            return b.ajax ? l.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource
        }
        return this.iterator("table", function(c) {
            l.isPlainObject(c.ajax) ? c.ajax.url = a : c.ajax = a
        })
    });
    y("ajax.url().load()", function(a, b) {
        return this.iterator("table", function(c) {
            pc(c, !1 === b, a)
        })
    });
    var ub = function(a, b, c, d, e) {
            var h = [],
                f, g, k;
            var m = typeof b;
            b && "string" !== m && "function" !== m && b.length !== q || (b = [b]);
            m = 0;
            for (g = b.length; m < g; m++) {
                var n = b[m] && b[m].split && !b[m].match(/[\[\(:]/) ? b[m].split(",") : [b[m]];
                var p = 0;
                for (k = n.length; p < k; p++)(f = c("string" === typeof n[p] ? n[p].trim() : n[p])) && f.length && (h = h.concat(f))
            }
            a = M.selector[a];
            if (a.length)
                for (m = 0, g = a.length; m < g; m++) h = a[m](d, e, h);
            return Ma(h)
        },
        vb = function(a) {
            a || (a = {});
            a.filter && a.search === q && (a.search = a.filter);
            return l.extend({
                search: "none",
                order: "current",
                page: "all"
            }, a)
        },
        wb = function(a) {
            for (var b = 0, c = a.length; b < c; b++)
                if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
            a.length = 0;
            return a
        },
        Va = function(a, b) {
            var c = [],
                d = a.aiDisplay;
            var e = a.aiDisplayMaster;
            var h = b.search;
            var f = b.order;
            b = b.page;
            if ("ssp" == Q(a)) return "removed" === h ? [] : ra(0, e.length);
            if ("current" == b)
                for (f = a._iDisplayStart, a = a.fnDisplayEnd(); f < a; f++) c.push(d[f]);
            else if ("current" == f || "applied" == f)
                if ("none" == h) c = e.slice();
                else if ("applied" == h) c = d.slice();
            else {
                if ("removed" == h) {
                    var g = {};
                    f = 0;
                    for (a = d.length; f < a; f++) g[d[f]] = null;
                    c = l.map(e, function(k) {
                        return g.hasOwnProperty(k) ? null : k
                    })
                }
            } else if ("index" == f || "original" == f)
                for (f = 0, a = a.aoData.length; f < a; f++) "none" == h ? c.push(f) : (e = l.inArray(f, d), (-1 === e && "removed" == h || 0 <= e && "applied" == h) && c.push(f));
            return c
        },
        xc = function(a, b, c) {
            var d;
            return ub("row", b, function(e) {
                var h = hc(e),
                    f = a.aoData;
                if (null !== h && !c) return [h];
                d || (d = Va(a, c));
                if (null !== h && -1 !== l.inArray(h, d)) return [h];
                if (null === e || e === q || "" === e) return d;
                if ("function" === typeof e) return l.map(d, function(k) {
                    var m = f[k];
                    return e(k, m._aData, m.nTr) ? k : null
                });
                if (e.nodeName) {
                    h = e._DT_RowIndex;
                    var g = e._DT_CellIndex;
                    if (h !== q) return f[h] && f[h].nTr === e ? [h] : [];
                    if (g) return f[g.row] && f[g.row].nTr === e.parentNode ? [g.row] : [];
                    h = l(e).closest("*[data-dt-row]");
                    return h.length ? [h.data("dt-row")] : []
                }
                if ("string" === typeof e && "#" === e.charAt(0) && (h = a.aIds[e.replace(/^#/, "")], h !== q)) return [h.idx];
                h = kc(Ea(a.aoData, d, "nTr"));
                return l(h).filter(e).map(function() {
                    return this._DT_RowIndex
                }).toArray()
            }, a, c)
        };
    y("rows()", function(a, b) {
        a === q ? a = "" : l.isPlainObject(a) && (b = a, a = "");
        b = vb(b);
        var c = this.iterator("table", function(d) {
            return xc(d, a, b)
        }, 1);
        c.selector.rows = a;
        c.selector.opts = b;
        return c
    });
    y("rows().nodes()", function() {
        return this.iterator("row", function(a, b) {
            return a.aoData[b].nTr || q
        }, 1)
    });
    y("rows().data()", function() {
        return this.iterator(!0, "rows", function(a, b) {
            return Ea(a.aoData, b, "_aData")
        }, 1)
    });
    J("rows().cache()", "row().cache()", function(a) {
        return this.iterator("row", function(b, c) {
            b = b.aoData[c];
            return "search" === a ? b._aFilterData : b._aSortData
        }, 1)
    });
    J("rows().invalidate()", "row().invalidate()", function(a) {
        return this.iterator("row", function(b, c) {
            wa(b, c, a)
        })
    });
    J("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(a, b) {
            return b
        }, 1)
    });
    J("rows().ids()", "row().id()", function(a) {
        for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++)
            for (var h = 0, f = this[d].length; h < f; h++) {
                var g = c[d].rowIdFn(c[d].aoData[this[d][h]]._aData);
                b.push((!0 === a ? "#" : "") + g)
            }
        return new B(c, b)
    });
    J("rows().remove()", "row().remove()", function() {
        var a = this;
        this.iterator("row", function(b, c, d) {
            var e = b.aoData,
                h = e[c],
                f, g;
            e.splice(c, 1);
            var k = 0;
            for (f = e.length; k < f; k++) {
                var m = e[k];
                var n = m.anCells;
                null !== m.nTr && (m.nTr._DT_RowIndex = k);
                if (null !== n)
                    for (m = 0, g = n.length; m < g; m++) n[m]._DT_CellIndex.row = k
            }
            La(b.aiDisplayMaster, c);
            La(b.aiDisplay, c);
            La(a[d], c, !1);
            0 < b._iRecordsDisplay && b._iRecordsDisplay--;
            kb(b);
            c = b.rowIdFn(h._aData);
            c !== q && delete b.aIds[c]
        });
        this.iterator("table", function(b) {
            for (var c = 0, d = b.aoData.length; c < d; c++) b.aoData[c].idx = c
        });
        return this
    });
    y("rows.add()", function(a) {
        var b = this.iterator("table", function(d) {
                var e, h = [];
                var f = 0;
                for (e = a.length; f < e; f++) {
                    var g = a[f];
                    g.nodeName && "TR" === g.nodeName.toUpperCase() ? h.push(Ja(d, g)[0]) : h.push(ia(d, g))
                }
                return h
            }, 1),
            c = this.rows(-1);
        c.pop();
        l.merge(c, b);
        return c
    });
    y("row()", function(a, b) {
        return wb(this.rows(a, b))
    });
    y("row().data()", function(a) {
        var b = this.context;
        if (a === q) return b.length && this.length ? b[0].aoData[this[0]]._aData : q;
        var c = b[0].aoData[this[0]];
        c._aData = a;
        Array.isArray(a) && c.nTr && c.nTr.id && ha(b[0].rowId)(a, c.nTr.id);
        wa(b[0], this[0], "data");
        return this
    });
    y("row().node()", function() {
        var a = this.context;
        return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null
    });
    y("row.add()", function(a) {
        a instanceof l && a.length && (a = a[0]);
        var b = this.iterator("table", function(c) {
            return a.nodeName && "TR" === a.nodeName.toUpperCase() ? Ja(c, a)[0] : ia(c, a)
        });
        return this.row(b[0])
    });
    l(A).on("plugin-init.dt", function(a, b) {
        var c = new B(b);
        c.on("stateSaveParams", function(d, e, h) {
            d = c.rows().iterator("row", function(f, g) {
                return f.aoData[g]._detailsShow ? g : q
            });
            h.childRows = c.rows(d).ids(!0).toArray()
        });
        (a = c.state.loaded()) && a.childRows && c.rows(a.childRows).every(function() {
            F(b, null, "requestChild", [this])
        })
    });
    var yc = function(a, b, c, d) {
            var e = [],
                h = function(f, g) {
                    if (Array.isArray(f) || f instanceof l)
                        for (var k = 0, m = f.length; k < m; k++) h(f[k], g);
                    else f.nodeName && "tr" === f.nodeName.toLowerCase() ? e.push(f) : (k = l("<tr><td></td></tr>").addClass(g), l("td", k).addClass(g).html(f)[0].colSpan = oa(a), e.push(k[0]))
                };
            h(c, d);
            b._details && b._details.detach();
            b._details = l(e);
            b._detailsShow && b._details.insertAfter(b.nTr)
        },
        xb = function(a, b) {
            var c = a.context;
            c.length && (a = c[0].aoData[b !== q ? b : a[0]]) && a._details && (a._details.remove(), a._detailsShow = q, a._details = q, l(a.nTr).removeClass("dt-hasChild"), qa(c[0]))
        },
        qc = function(a, b) {
            var c = a.context;
            if (c.length && a.length) {
                var d = c[0].aoData[a[0]];
                d._details && ((d._detailsShow = b) ? (d._details.insertAfter(d.nTr), l(d.nTr).addClass("dt-hasChild")) : (d._details.detach(), l(d.nTr).removeClass("dt-hasChild")), F(c[0], null, "childRow", [b, a.row(a[0])]), zc(c[0]), qa(c[0]))
            }
        },
        zc = function(a) {
            var b = new B(a),
                c = a.aoData;
            b.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
            0 < U(c, "_details").length && (b.on("draw.dt.DT_details", function(d, e) {
                a === e && b.rows({
                    page: "current"
                }).eq(0).each(function(h) {
                    h = c[h];
                    h._detailsShow && h._details.insertAfter(h.nTr)
                })
            }), b.on("column-visibility.dt.DT_details", function(d, e, h, f) {
                if (a === e)
                    for (e = oa(e), h = 0, f = c.length; h < f; h++) d = c[h], d._details && d._details.children("td[colspan]").attr("colspan", e)
            }), b.on("destroy.dt.DT_details", function(d, e) {
                if (a === e)
                    for (d = 0, e = c.length; d < e; d++) c[d]._details && xb(b, d)
            }))
        };
    y("row().child()", function(a, b) {
        var c = this.context;
        if (a === q) return c.length && this.length ? c[0].aoData[this[0]]._details : q;
        !0 === a ? this.child.show() : !1 === a ? xb(this) : c.length && this.length && yc(c[0], c[0].aoData[this[0]], a, b);
        return this
    });
    y(["row().child.show()", "row().child().show()"], function(a) {
        qc(this, !0);
        return this
    });
    y(["row().child.hide()", "row().child().hide()"], function() {
        qc(this, !1);
        return this
    });
    y(["row().child.remove()", "row().child().remove()"], function() {
        xb(this);
        return this
    });
    y("row().child.isShown()", function() {
        var a = this.context;
        return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
    });
    var Ac = /^([^:]+):(name|visIdx|visible)$/,
        rc = function(a, b, c, d, e) {
            c = [];
            d = 0;
            for (var h = e.length; d < h; d++) c.push(T(a, e[d], b));
            return c
        },
        Bc = function(a, b, c) {
            var d = a.aoColumns,
                e = U(d, "sName"),
                h = U(d, "nTh");
            return ub("column", b, function(f) {
                var g = hc(f);
                if ("" === f) return ra(d.length);
                if (null !== g) return [0 <= g ? g : d.length + g];
                if ("function" === typeof f) {
                    var k = Va(a, c);
                    return l.map(d, function(p, t) {
                        return f(t, rc(a, t, 0, 0, k), h[t]) ? t : null
                    })
                }
                var m = "string" === typeof f ? f.match(Ac) : "";
                if (m) switch (m[2]) {
                    case "visIdx":
                    case "visible":
                        g = parseInt(m[1], 10);
                        if (0 > g) {
                            var n = l.map(d, function(p, t) {
                                return p.bVisible ? t : null
                            });
                            return [n[n.length + g]]
                        }
                        return [ua(a, g)];
                    case "name":
                        return l.map(e, function(p, t) {
                            return p === m[1] ? t : null
                        });
                    default:
                        return []
                }
                if (f.nodeName && f._DT_CellIndex) return [f._DT_CellIndex.column];
                g = l(h).filter(f).map(function() {
                    return l.inArray(this, h)
                }).toArray();
                if (g.length || !f.nodeName) return g;
                g = l(f).closest("*[data-dt-column]");
                return g.length ? [g.data("dt-column")] : []
            }, a, c)
        };
    y("columns()", function(a, b) {
        a === q ? a = "" : l.isPlainObject(a) && (b = a, a = "");
        b = vb(b);
        var c = this.iterator("table", function(d) {
            return Bc(d, a, b)
        }, 1);
        c.selector.cols = a;
        c.selector.opts = b;
        return c
    });
    J("columns().header()", "column().header()", function(a, b) {
        return this.iterator("column", function(c, d) {
            return c.aoColumns[d].nTh
        }, 1)
    });
    J("columns().footer()", "column().footer()", function(a, b) {
        return this.iterator("column", function(c, d) {
            return c.aoColumns[d].nTf
        }, 1)
    });
    J("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", rc, 1)
    });
    J("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(a, b) {
            return a.aoColumns[b].mData
        }, 1)
    });
    J("columns().cache()", "column().cache()", function(a) {
        return this.iterator("column-rows", function(b, c, d, e, h) {
            return Ea(b.aoData, h, "search" === a ? "_aFilterData" : "_aSortData", c)
        }, 1)
    });
    J("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(a, b, c, d, e) {
            return Ea(a.aoData, e, "anCells", b)
        }, 1)
    });
    J("columns().visible()", "column().visible()", function(a, b) {
        var c = this,
            d = this.iterator("column", function(e, h) {
                if (a === q) return e.aoColumns[h].bVisible;
                var f = e.aoColumns,
                    g = f[h],
                    k = e.aoData,
                    m;
                if (a !== q && g.bVisible !== a) {
                    if (a) {
                        var n = l.inArray(!0, U(f, "bVisible"), h + 1);
                        f = 0;
                        for (m = k.length; f < m; f++) {
                            var p = k[f].nTr;
                            e = k[f].anCells;
                            p && p.insertBefore(e[h], e[n] || null)
                        }
                    } else l(U(e.aoData, "anCells", h)).detach();
                    g.bVisible = a
                }
            });
        a !== q && this.iterator("table", function(e) {
            ya(e, e.aoHeader);
            ya(e, e.aoFooter);
            e.aiDisplay.length || l(e.nTBody).find("td[colspan]").attr("colspan", oa(e));
            qa(e);
            c.iterator("column", function(h, f) {
                F(h, null, "column-visibility", [h, f, a, b])
            });
            (b === q || b) && c.columns.adjust()
        });
        return d
    });
    J("columns().indexes()", "column().index()", function(a) {
        return this.iterator("column", function(b, c) {
            return "visible" === a ? va(b, c) : c
        }, 1)
    });
    y("columns.adjust()", function() {
        return this.iterator("table", function(a) {
            ta(a)
        }, 1)
    });
    y("column.index()", function(a, b) {
        if (0 !== this.context.length) {
            var c = this.context[0];
            if ("fromVisible" === a || "toData" === a) return ua(c, b);
            if ("fromData" === a || "toVisible" === a) return va(c, b)
        }
    });
    y("column()", function(a, b) {
        return wb(this.columns(a, b))
    });
    var Cc = function(a, b, c) {
        var d = a.aoData,
            e = Va(a, c),
            h = kc(Ea(d, e, "anCells")),
            f = l(lc([], h)),
            g, k = a.aoColumns.length,
            m, n, p, t, v, x;
        return ub("cell", b, function(w) {
            var r = "function" === typeof w;
            if (null === w || w === q || r) {
                m = [];
                n = 0;
                for (p = e.length; n < p; n++)
                    for (g = e[n], t = 0; t < k; t++) v = {
                        row: g,
                        column: t
                    }, r ? (x = d[g], w(v, T(a, g, t), x.anCells ? x.anCells[t] : null) && m.push(v)) : m.push(v);
                return m
            }
            if (l.isPlainObject(w)) return w.column !== q && w.row !== q && -1 !== l.inArray(w.row, e) ? [w] : [];
            r = f.filter(w).map(function(C, G) {
                return {
                    row: G._DT_CellIndex.row,
                    column: G._DT_CellIndex.column
                }
            }).toArray();
            if (r.length || !w.nodeName) return r;
            x = l(w).closest("*[data-dt-row]");
            return x.length ? [{
                row: x.data("dt-row"),
                column: x.data("dt-column")
            }] : []
        }, a, c)
    };
    y("cells()", function(a, b, c) {
        l.isPlainObject(a) && (a.row === q ? (c = a, a = null) : (c = b, b = null));
        l.isPlainObject(b) && (c = b, b = null);
        if (null === b || b === q) return this.iterator("table", function(n) {
            return Cc(n, a, vb(c))
        });
        var d = c ? {
                page: c.page,
                order: c.order,
                search: c.search
            } : {},
            e = this.columns(b, d),
            h = this.rows(a, d),
            f, g, k, m;
        d = this.iterator("table", function(n, p) {
            n = [];
            f = 0;
            for (g = h[p].length; f < g; f++)
                for (k = 0, m = e[p].length; k < m; k++) n.push({
                    row: h[p][f],
                    column: e[p][k]
                });
            return n
        }, 1);
        d = c && c.selected ? this.cells(d, c) : d;
        l.extend(d.selector, {
            cols: b,
            rows: a,
            opts: c
        });
        return d
    });
    J("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(a, b, c) {
            return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : q
        }, 1)
    });
    y("cells().data()", function() {
        return this.iterator("cell", function(a, b, c) {
            return T(a, b, c)
        }, 1)
    });
    J("cells().cache()", "cell().cache()", function(a) {
        a = "search" === a ? "_aFilterData" : "_aSortData";
        return this.iterator("cell", function(b, c, d) {
            return b.aoData[c][a][d]
        }, 1)
    });
    J("cells().render()", "cell().render()", function(a) {
        return this.iterator("cell", function(b, c, d) {
            return T(b, c, d, a)
        }, 1)
    });
    J("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(a, b, c) {
            return {
                row: b,
                column: c,
                columnVisible: va(a, c)
            }
        }, 1)
    });
    J("cells().invalidate()", "cell().invalidate()", function(a) {
        return this.iterator("cell", function(b, c, d) {
            wa(b, c, a, d)
        })
    });
    y("cell()", function(a, b, c) {
        return wb(this.cells(a, b, c))
    });
    y("cell().data()", function(a) {
        var b = this.context,
            c = this[0];
        if (a === q) return b.length && c.length ? T(b[0], c[0].row, c[0].column) : q;
        Eb(b[0], c[0].row, c[0].column, a);
        wa(b[0], c[0].row, "data", c[0].column);
        return this
    });
    y("order()", function(a, b) {
        var c = this.context;
        if (a === q) return 0 !== c.length ? c[0].aaSorting : q;
        "number" === typeof a ? a = [
            [a, b]
        ] : a.length && !Array.isArray(a[0]) && (a = Array.prototype.slice.call(arguments));
        return this.iterator("table", function(d) {
            d.aaSorting = a.slice()
        })
    });
    y("order.listener()", function(a, b, c) {
        return this.iterator("table", function(d) {
            eb(d, a, b, c)
        })
    });
    y("order.fixed()", function(a) {
        if (!a) {
            var b = this.context;
            b = b.length ? b[0].aaSortingFixed : q;
            return Array.isArray(b) ? {
                pre: b
            } : b
        }
        return this.iterator("table", function(c) {
            c.aaSortingFixed = l.extend(!0, {}, a)
        })
    });
    y(["columns().order()", "column().order()"], function(a) {
        var b = this;
        return this.iterator("table", function(c, d) {
            var e = [];
            l.each(b[d], function(h, f) {
                e.push([f, a])
            });
            c.aaSorting = e
        })
    });
    y("search()", function(a, b, c, d) {
        var e = this.context;
        return a === q ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : q : this.iterator("table", function(h) {
            h.oFeatures.bFilter && za(h, l.extend({}, h.oPreviousSearch, {
                sSearch: a + "",
                bRegex: null === b ? !1 : b,
                bSmart: null === c ? !0 : c,
                bCaseInsensitive: null === d ? !0 : d
            }), 1)
        })
    });
    J("columns().search()", "column().search()", function(a, b, c, d) {
        return this.iterator("column", function(e, h) {
            var f = e.aoPreSearchCols;
            if (a === q) return f[h].sSearch;
            e.oFeatures.bFilter && (l.extend(f[h], {
                sSearch: a + "",
                bRegex: null === b ? !1 : b,
                bSmart: null === c ? !0 : c,
                bCaseInsensitive: null === d ? !0 : d
            }), za(e, e.oPreviousSearch, 1))
        })
    });
    y("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null
    });
    y("state.clear()", function() {
        return this.iterator("table", function(a) {
            a.fnStateSaveCallback.call(a.oInstance, a, {})
        })
    });
    y("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null
    });
    y("state.save()", function() {
        return this.iterator("table", function(a) {
            qa(a)
        })
    });
    u.versionCheck = u.fnVersionCheck = function(a) {
        var b = u.version.split(".");
        a = a.split(".");
        for (var c, d, e = 0, h = a.length; e < h; e++)
            if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d;
        return !0
    };
    u.isDataTable = u.fnIsDataTable = function(a) {
        var b = l(a).get(0),
            c = !1;
        if (a instanceof u.Api) return !0;
        l.each(u.settings, function(d, e) {
            d = e.nScrollHead ? l("table", e.nScrollHead)[0] : null;
            var h = e.nScrollFoot ? l("table", e.nScrollFoot)[0] : null;
            if (e.nTable === b || d === b || h === b) c = !0
        });
        return c
    };
    u.tables = u.fnTables = function(a) {
        var b = !1;
        l.isPlainObject(a) && (b = a.api, a = a.visible);
        var c = l.map(u.settings, function(d) {
            if (!a || a && l(d.nTable).is(":visible")) return d.nTable
        });
        return b ? new B(c) : c
    };
    u.camelToHungarian = P;
    y("$()", function(a, b) {
        b = this.rows(b).nodes();
        b = l(b);
        return l([].concat(b.filter(a).toArray(), b.find(a).toArray()))
    });
    l.each(["on", "one", "off"], function(a, b) {
        y(b + "()", function() {
            var c = Array.prototype.slice.call(arguments);
            c[0] = l.map(c[0].split(/\s/), function(e) {
                return e.match(/\.dt\b/) ? e : e + ".dt"
            }).join(" ");
            var d = l(this.tables().nodes());
            d[b].apply(d, c);
            return this
        })
    });
    y("clear()", function() {
        return this.iterator("table", function(a) {
            Ka(a)
        })
    });
    y("settings()", function() {
        return new B(this.context, this.context)
    });
    y("init()", function() {
        var a = this.context;
        return a.length ? a[0].oInit : null
    });
    y("data()", function() {
        return this.iterator("table", function(a) {
            return U(a.aoData, "_aData")
        }).flatten()
    });
    y("destroy()", function(a) {
        a = a || !1;
        return this.iterator("table", function(b) {
            var c = b.nTableWrapper.parentNode,
                d = b.oClasses,
                e = b.nTable,
                h = b.nTBody,
                f = b.nTHead,
                g = b.nTFoot,
                k = l(e);
            h = l(h);
            var m = l(b.nTableWrapper),
                n = l.map(b.aoData, function(t) {
                    return t.nTr
                }),
                p;
            b.bDestroying = !0;
            F(b, "aoDestroyCallback", "destroy", [b]);
            a || new B(b).columns().visible(!0);
            m.off(".DT").find(":not(tbody *)").off(".DT");
            l(z).off(".DT-" + b.sInstance);
            e != f.parentNode && (k.children("thead").detach(), k.append(f));
            g && e != g.parentNode && (k.children("tfoot").detach(), k.append(g));
            b.aaSorting = [];
            b.aaSortingFixed = [];
            Ra(b);
            l(n).removeClass(b.asStripeClasses.join(" "));
            l("th, td", f).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
            h.children().detach();
            h.append(n);
            f = a ? "remove" : "detach";
            k[f]();
            m[f]();
            !a && c && (c.insertBefore(e, b.nTableReinsertBefore), k.css("width", b.sDestroyWidth).removeClass(d.sTable), (p = b.asDestroyStripes.length) && h.children().each(function(t) {
                l(this).addClass(b.asDestroyStripes[t % p])
            }));
            c = l.inArray(b, u.settings); - 1 !== c && u.settings.splice(c, 1)
        })
    });
    l.each(["column", "row", "cell"], function(a, b) {
        y(b + "s().every()", function(c) {
            var d = this.selector.opts,
                e = this;
            return this.iterator(b, function(h, f, g, k, m) {
                c.call(e[b](f, "cell" === b ? g : d, "cell" === b ? d : q), f, g, k, m)
            })
        })
    });
    y("i18n()", function(a, b, c) {
        var d = this.context[0];
        a = na(a)(d.oLanguage);
        a === q && (a = b);
        c !== q && l.isPlainObject(a) && (a = a[c] !== q ? a[c] : a._);
        return a.replace("%d", c)
    });
    u.version = "1.11.3";
    u.settings = [];
    u.models = {};
    u.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0,
        return: !1
    };
    u.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    };
    u.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    };
    u.defaults = {
        aaData: null,
        aaSorting: [
            [0, "asc"]
        ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(a) {
            return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(a) {
            try {
                return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
            } catch (b) {
                return {}
            }
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(a, b) {
            try {
                (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
            } catch (c) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: l.extend({}, u.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    };
    E(u.defaults);
    u.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    };
    E(u.defaults.column);
    u.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        jqXHR: null,
        json: q,
        oAjaxData: q,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == Q(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function() {
            return "ssp" == Q(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function() {
            var a = this._iDisplayLength,
                b = this._iDisplayStart,
                c = b + a,
                d = this.aiDisplay.length,
                e = this.oFeatures,
                h = e.bPaginate;
            return e.bServerSide ? !1 === h || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !h || c > d || -1 === a ? d : c
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    };
    u.ext = M = {
        buttons: {},
        classes: {},
        build: "bs5/dt-1.11.3/r-2.2.9",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: u.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: u.version
    };
    l.extend(M, {
        afnFiltering: M.search,
        aTypes: M.type.detect,
        ofnSearch: M.type.search,
        oSort: M.type.order,
        afnSortData: M.order,
        aoFeatures: M.feature,
        oApi: M.internal,
        oStdClasses: M.classes,
        oPagination: M.pager
    });
    l.extend(u.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_desc_disabled",
        sSortableDesc: "sorting_asc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    });
    var ec = u.ext.pager;
    l.extend(ec, {
        simple: function(a, b) {
            return ["previous", "next"]
        },
        full: function(a, b) {
            return ["first", "previous", "next", "last"]
        },
        numbers: function(a, b) {
            return [Da(a, b)]
        },
        simple_numbers: function(a, b) {
            return ["previous", Da(a, b), "next"]
        },
        full_numbers: function(a, b) {
            return ["first", "previous", Da(a, b), "next", "last"]
        },
        first_last_numbers: function(a, b) {
            return ["first", Da(a, b), "last"]
        },
        _numbers: Da,
        numbers_length: 7
    });
    l.extend(!0, u.ext.renderer, {
        pageButton: {
            _: function(a, b, c, d, e, h) {
                var f = a.oClasses,
                    g = a.oLanguage.oPaginate,
                    k = a.oLanguage.oAria.paginate || {},
                    m, n, p = 0,
                    t = function(x, w) {
                        var r, C = f.sPageButtonDisabled,
                            G = function(I) {
                                lb(a, I.data.action, !0)
                            };
                        var aa = 0;
                        for (r = w.length; aa < r; aa++) {
                            var L = w[aa];
                            if (Array.isArray(L)) {
                                var O = l("<" + (L.DT_el || "div") + "/>").appendTo(x);
                                t(O, L)
                            } else {
                                m = null;
                                n = L;
                                O = a.iTabIndex;
                                switch (L) {
                                    case "ellipsis":
                                        x.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        m = g.sFirst;
                                        0 === e && (O = -1, n += " " + C);
                                        break;
                                    case "previous":
                                        m = g.sPrevious;
                                        0 === e && (O = -1, n += " " + C);
                                        break;
                                    case "next":
                                        m = g.sNext;
                                        if (0 === h || e === h - 1) O = -1, n += " " + C;
                                        break;
                                    case "last":
                                        m = g.sLast;
                                        if (0 === h || e === h - 1) O = -1, n += " " + C;
                                        break;
                                    default:
                                        m = a.fnFormatNumber(L + 1), n = e === L ? f.sPageButtonActive : ""
                                }
                                null !== m && (O = l("<a>", {
                                    class: f.sPageButton + " " + n,
                                    "aria-controls": a.sTableId,
                                    "aria-label": k[L],
                                    "data-dt-idx": p,
                                    tabindex: O,
                                    id: 0 === c && "string" === typeof L ? a.sTableId + "_" + L : null
                                }).html(m).appendTo(x), ob(O, {
                                    action: L
                                }, G), p++)
                            }
                        }
                    };
                try {
                    var v = l(b).find(A.activeElement).data("dt-idx")
                } catch (x) {}
                t(l(b).empty(), d);
                v !== q && l(b).find("[data-dt-idx=" + v + "]").trigger("focus")
            }
        }
    });
    l.extend(u.ext.type.detect, [function(a, b) {
        b = b.oLanguage.sDecimal;
        return tb(a, b) ? "num" + b : null
    }, function(a, b) {
        if (a && !(a instanceof Date) && !uc.test(a)) return null;
        b = Date.parse(a);
        return null !== b && !isNaN(b) || Z(a) ? "date" : null
    }, function(a, b) {
        b = b.oLanguage.sDecimal;
        return tb(a, b, !0) ? "num-fmt" + b : null
    }, function(a, b) {
        b = b.oLanguage.sDecimal;
        return jc(a, b) ? "html-num" + b : null
    }, function(a, b) {
        b = b.oLanguage.sDecimal;
        return jc(a, b, !0) ? "html-num-fmt" + b : null
    }, function(a, b) {
        return Z(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null
    }]);
    l.extend(u.ext.type.search, {
        html: function(a) {
            return Z(a) ? a : "string" === typeof a ? a.replace(gc, " ").replace(Ua, "") : ""
        },
        string: function(a) {
            return Z(a) ? a : "string" === typeof a ? a.replace(gc, " ") : a
        }
    });
    var Ta = function(a, b, c, d) {
        if (0 !== a && (!a || "-" === a)) return -Infinity;
        b && (a = ic(a, b));
        a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
        return 1 * a
    };
    l.extend(M.type.order, {
        "date-pre": function(a) {
            a = Date.parse(a);
            return isNaN(a) ? -Infinity : a
        },
        "html-pre": function(a) {
            return Z(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
        },
        "string-pre": function(a) {
            return Z(a) ? "" : "string" === typeof a ? a.toLowerCase() : a.toString ? a.toString() : ""
        },
        "string-asc": function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        "string-desc": function(a, b) {
            return a < b ? 1 : a > b ? -1 : 0
        }
    });
    Wa("");
    l.extend(!0, u.ext.renderer, {
        header: {
            _: function(a, b, c, d) {
                l(a.nTable).on("order.dt.DT", function(e, h, f, g) {
                    a === h && (e = c.idx, b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass("asc" == g[e] ? d.sSortAsc : "desc" == g[e] ? d.sSortDesc : c.sSortingClass))
                })
            },
            jqueryui: function(a, b, c, d) {
                l("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(l("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                l(a.nTable).on("order.dt.DT", function(e, h, f, g) {
                    a === h && (e = c.idx, b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass("asc" == g[e] ? d.sSortAsc : "desc" == g[e] ? d.sSortDesc : c.sSortingClass), b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass("asc" == g[e] ? d.sSortJUIAsc : "desc" == g[e] ? d.sSortJUIDesc : c.sSortingClassJUI))
                })
            }
        }
    });
    var yb = function(a) {
        Array.isArray(a) && (a = a.join(","));
        return "string" === typeof a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : a
    };
    u.render = {
        number: function(a, b, c, d, e) {
            return {
                display: function(h) {
                    if ("number" !== typeof h && "string" !== typeof h) return h;
                    var f = 0 > h ? "-" : "",
                        g = parseFloat(h);
                    if (isNaN(g)) return yb(h);
                    g = g.toFixed(c);
                    h = Math.abs(g);
                    g = parseInt(h, 10);
                    h = c ? b + (h - g).toFixed(c).substring(2) : "";
                    0 === g && 0 === parseFloat(h) && (f = "");
                    return f + (d || "") + g.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + h + (e || "")
                }
            }
        },
        text: function() {
            return {
                display: yb,
                filter: yb
            }
        }
    };
    l.extend(u.ext.internal, {
        _fnExternApiFunc: fc,
        _fnBuildAjax: Oa,
        _fnAjaxUpdate: Gb,
        _fnAjaxParameters: Pb,
        _fnAjaxUpdateDraw: Qb,
        _fnAjaxDataSrc: Aa,
        _fnAddColumn: Xa,
        _fnColumnOptions: Ga,
        _fnAdjustColumnSizing: ta,
        _fnVisibleToColumnIndex: ua,
        _fnColumnIndexToVisible: va,
        _fnVisbleColumns: oa,
        _fnGetColumns: Ia,
        _fnColumnTypes: Za,
        _fnApplyColumnDefs: Db,
        _fnHungarianMap: E,
        _fnCamelToHungarian: P,
        _fnLanguageCompat: ma,
        _fnBrowserDetect: Bb,
        _fnAddData: ia,
        _fnAddTr: Ja,
        _fnNodeToDataIndex: function(a, b) {
            return b._DT_RowIndex !== q ? b._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function(a, b, c) {
            return l.inArray(c, a.aoData[b].anCells)
        },
        _fnGetCellData: T,
        _fnSetCellData: Eb,
        _fnSplitObjNotation: bb,
        _fnGetObjectDataFn: na,
        _fnSetObjectDataFn: ha,
        _fnGetDataMaster: cb,
        _fnClearTable: Ka,
        _fnDeleteIndex: La,
        _fnInvalidate: wa,
        _fnGetRowElements: ab,
        _fnCreateTr: $a,
        _fnBuildHead: Fb,
        _fnDrawHead: ya,
        _fnDraw: ja,
        _fnReDraw: ka,
        _fnAddOptionsHtml: Ib,
        _fnDetectHeader: xa,
        _fnGetUniqueThs: Na,
        _fnFeatureHtmlFilter: Kb,
        _fnFilterComplete: za,
        _fnFilterCustom: Tb,
        _fnFilterColumn: Sb,
        _fnFilter: Rb,
        _fnFilterCreateSearch: hb,
        _fnEscapeRegex: ib,
        _fnFilterData: Ub,
        _fnFeatureHtmlInfo: Nb,
        _fnUpdateInfo: Xb,
        _fnInfoMacros: Yb,
        _fnInitialise: Ba,
        _fnInitComplete: Pa,
        _fnLengthChange: jb,
        _fnFeatureHtmlLength: Jb,
        _fnFeatureHtmlPaginate: Ob,
        _fnPageChange: lb,
        _fnFeatureHtmlProcessing: Lb,
        _fnProcessingDisplay: V,
        _fnFeatureHtmlTable: Mb,
        _fnScrollDraw: Ha,
        _fnApplyToChildren: ca,
        _fnCalculateColumnWidths: Ya,
        _fnThrottle: gb,
        _fnConvertToWidth: Zb,
        _fnGetWidestNode: $b,
        _fnGetMaxLenString: ac,
        _fnStringToCss: K,
        _fnSortFlatten: pa,
        _fnSort: Hb,
        _fnSortAria: cc,
        _fnSortListener: nb,
        _fnSortAttachListener: eb,
        _fnSortingClasses: Ra,
        _fnSortData: bc,
        _fnSaveState: qa,
        _fnLoadState: dc,
        _fnImplementState: pb,
        _fnSettingsFromNode: Sa,
        _fnLog: da,
        _fnMap: X,
        _fnBindAction: ob,
        _fnCallbackReg: R,
        _fnCallbackFire: F,
        _fnLengthOverflow: kb,
        _fnRenderer: fb,
        _fnDataSource: Q,
        _fnRowAttributes: db,
        _fnExtend: qb,
        _fnCalculateEnd: function() {}
    });
    l.fn.dataTable = u;
    u.$ = l;
    l.fn.dataTableSettings = u.settings;
    l.fn.dataTableExt = u.ext;
    l.fn.DataTable = function(a) {
        return l(this).dataTable(a).api()
    };
    l.each(u, function(a, b) {
        l.fn.DataTable[a] = b
    });
    return u
});
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var e = a.length, d = 0; d < e; d++) {
        var f = a[d];
        if (b.call(c, f, d, a)) return {
            i: d,
            v: f
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};
$jscomp.getGlobal = function(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object")
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
    var c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b]
};
$jscomp.polyfill = function(a, b, c, e) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, e) : $jscomp.polyfillUnisolated(a, b, c, e))
};
$jscomp.polyfillUnisolated = function(a, b, c, e) {
    c = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
        var d = a[e];
        if (!(d in c)) return;
        c = c[d]
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.polyfillIsolated = function(a, b, c, e) {
    var d = a.split(".");
    a = 1 === d.length;
    e = d[0];
    e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var f = 0; f < d.length - 1; f++) {
        var l = d[f];
        if (!(l in e)) return;
        e = e[l]
    }
    d = d[d.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
    b = b(c);
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {
        configurable: !0,
        writable: !0,
        value: b
    }) : b !== c && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d, d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {
        configurable: !0,
        writable: !0,
        value: b
    })))
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(b, c) {
        return $jscomp.findInternal(this, b, c).v
    }
}, "es6", "es3");
(function(a) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(b) {
        return a(b, window, document)
    }) : "object" === typeof exports ? module.exports = function(b, c) {
        b || (b = window);
        c && c.fn.dataTable || (c = require("datatables.net")(b, c).$);
        return a(c, b, b.document)
    } : a(jQuery, window, document)
})(function(a, b, c, e) {
    var d = a.fn.dataTable;
    a.extend(!0, d.defaults, {
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        renderer: "bootstrap"
    });
    a.extend(d.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap5",
        sFilterInput: "form-control form-control-sm",
        sLengthSelect: "form-select form-select-sm",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    });
    d.ext.renderer.pageButton.bootstrap = function(f, l, A, B, m, t) {
        var u = new d.Api(f),
            C = f.oClasses,
            n = f.oLanguage.oPaginate,
            D = f.oLanguage.oAria.paginate || {},
            h, k, v = 0,
            y = function(q, w) {
                var x, E = function(p) {
                    p.preventDefault();
                    a(p.currentTarget).hasClass("disabled") || u.page() == p.data.action || u.page(p.data.action).draw("page")
                };
                var r = 0;
                for (x = w.length; r < x; r++) {
                    var g = w[r];
                    if (Array.isArray(g)) y(q, g);
                    else {
                        k = h = "";
                        switch (g) {
                            case "ellipsis":
                                h = "&#x2026;";
                                k = "disabled";
                                break;
                            case "first":
                                h = n.sFirst;
                                k = g + (0 < m ? "" : " disabled");
                                break;
                            case "previous":
                                h = n.sPrevious;
                                k = g + (0 < m ? "" : " disabled");
                                break;
                            case "next":
                                h = n.sNext;
                                k = g + (m < t - 1 ? "" : " disabled");
                                break;
                            case "last":
                                h = n.sLast;
                                k = g + (m < t - 1 ? "" : " disabled");
                                break;
                            default:
                                h = g + 1, k = m === g ? "active" : ""
                        }
                        if (h) {
                            var F = a("<li>", {
                                class: C.sPageButton + " " + k,
                                id: 0 === A && "string" === typeof g ? f.sTableId + "_" + g : null
                            }).append(a("<a>", {
                                href: "#",
                                "aria-controls": f.sTableId,
                                "aria-label": D[g],
                                "data-dt-idx": v,
                                tabindex: f.iTabIndex,
                                class: "page-link"
                            }).html(h)).appendTo(q);
                            f.oApi._fnBindAction(F, {
                                action: g
                            }, E);
                            v++
                        }
                    }
                }
            };
        try {
            var z = a(l).find(c.activeElement).data("dt-idx")
        } catch (q) {}
        y(a(l).empty().html('<ul class="pagination"/>').children("ul"), B);
        z !== e && a(l).find("[data-dt-idx=" + z + "]").trigger("focus")
    };
    return d
});
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(b, k, m) {
    b instanceof String && (b = String(b));
    for (var n = b.length, p = 0; p < n; p++) {
        var y = b[p];
        if (k.call(m, y, p, b)) return {
            i: p,
            v: y
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, k, m) {
    if (b == Array.prototype || b == Object.prototype) return b;
    b[k] = m.value;
    return b
};
$jscomp.getGlobal = function(b) {
    b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var k = 0; k < b.length; ++k) {
        var m = b[k];
        if (m && m.Math == Math) return m
    }
    throw Error("Cannot find global object")
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, k) {
    var m = $jscomp.propertyToPolyfillSymbol[k];
    if (null == m) return b[k];
    m = b[m];
    return void 0 !== m ? m : b[k]
};
$jscomp.polyfill = function(b, k, m, n) {
    k && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, k, m, n) : $jscomp.polyfillUnisolated(b, k, m, n))
};
$jscomp.polyfillUnisolated = function(b, k, m, n) {
    m = $jscomp.global;
    b = b.split(".");
    for (n = 0; n < b.length - 1; n++) {
        var p = b[n];
        if (!(p in m)) return;
        m = m[p]
    }
    b = b[b.length - 1];
    n = m[b];
    k = k(n);
    k != n && null != k && $jscomp.defineProperty(m, b, {
        configurable: !0,
        writable: !0,
        value: k
    })
};
$jscomp.polyfillIsolated = function(b, k, m, n) {
    var p = b.split(".");
    b = 1 === p.length;
    n = p[0];
    n = !b && n in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var y = 0; y < p.length - 1; y++) {
        var z = p[y];
        if (!(z in n)) return;
        n = n[z]
    }
    p = p[p.length - 1];
    m = $jscomp.IS_SYMBOL_NATIVE && "es6" === m ? n[p] : null;
    k = k(m);
    null != k && (b ? $jscomp.defineProperty($jscomp.polyfills, p, {
        configurable: !0,
        writable: !0,
        value: k
    }) : k !== m && ($jscomp.propertyToPolyfillSymbol[p] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(p) : $jscomp.POLYFILL_PREFIX + p, p = $jscomp.propertyToPolyfillSymbol[p], $jscomp.defineProperty(n, p, {
        configurable: !0,
        writable: !0,
        value: k
    })))
};
$jscomp.polyfill("Array.prototype.find", function(b) {
    return b ? b : function(k, m) {
        return $jscomp.findInternal(this, k, m).v
    }
}, "es6", "es3");
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(k) {
        return b(k, window, document)
    }) : "object" === typeof exports ? module.exports = function(k, m) {
        k || (k = window);
        m && m.fn.dataTable || (m = require("datatables.net")(k, m).$);
        return b(m, k, k.document)
    } : b(jQuery, window, document)
})(function(b, k, m, n) {
    function p(a, c, d) {
        var f = c + "-" + d;
        if (A[f]) return A[f];
        var g = [];
        a = a.cell(c, d).node().childNodes;
        c = 0;
        for (d = a.length; c < d; c++) g.push(a[c]);
        return A[f] = g
    }

    function y(a, c, d) {
        var f = c + "-" + d;
        if (A[f]) {
            a = a.cell(c, d).node();
            d = A[f][0].parentNode.childNodes;
            c = [];
            for (var g = 0, l = d.length; g < l; g++) c.push(d[g]);
            d = 0;
            for (g = c.length; d < g; d++) a.appendChild(c[d]);
            A[f] = n
        }
    }
    var z = b.fn.dataTable,
        u = function(a, c) {
            if (!z.versionCheck || !z.versionCheck("1.10.10")) throw "DataTables Responsive requires DataTables 1.10.10 or newer";
            this.s = {
                dt: new z.Api(a),
                columns: [],
                current: []
            };
            this.s.dt.settings()[0].responsive || (c && "string" === typeof c.details ? c.details = {
                type: c.details
            } : c && !1 === c.details ? c.details = {
                type: !1
            } : c && !0 === c.details && (c.details = {
                type: "inline"
            }), this.c = b.extend(!0, {}, u.defaults, z.defaults.responsive, c), a.responsive = this, this._constructor())
        };
    b.extend(u.prototype, {
        _constructor: function() {
            var a = this,
                c = this.s.dt,
                d = c.settings()[0],
                f = b(k).innerWidth();
            c.settings()[0]._responsive = this;
            b(k).on("resize.dtr orientationchange.dtr", z.util.throttle(function() {
                var g = b(k).innerWidth();
                g !== f && (a._resize(), f = g)
            }));
            d.oApi._fnCallbackReg(d, "aoRowCreatedCallback", function(g, l, h) {
                -1 !== b.inArray(!1, a.s.current) && b(">td, >th", g).each(function(e) {
                    e = c.column.index("toData", e);
                    !1 === a.s.current[e] && b(this).css("display", "none")
                })
            });
            c.on("destroy.dtr", function() {
                c.off(".dtr");
                b(c.table().body()).off(".dtr");
                b(k).off("resize.dtr orientationchange.dtr");
                c.cells(".dtr-control").nodes().to$().removeClass("dtr-control");
                b.each(a.s.current, function(g, l) {
                    !1 === l && a._setColumnVis(g, !0)
                })
            });
            this.c.breakpoints.sort(function(g, l) {
                return g.width < l.width ? 1 : g.width > l.width ? -1 : 0
            });
            this._classLogic();
            this._resizeAuto();
            d = this.c.details;
            !1 !== d.type && (a._detailsInit(), c.on("column-visibility.dtr", function() {
                a._timer && clearTimeout(a._timer);
                a._timer = setTimeout(function() {
                    a._timer = null;
                    a._classLogic();
                    a._resizeAuto();
                    a._resize(!0);
                    a._redrawChildren()
                }, 100)
            }), c.on("draw.dtr", function() {
                a._redrawChildren()
            }), b(c.table().node()).addClass("dtr-" + d.type));
            c.on("column-reorder.dtr", function(g, l, h) {
                a._classLogic();
                a._resizeAuto();
                a._resize(!0)
            });
            c.on("column-sizing.dtr", function() {
                a._resizeAuto();
                a._resize()
            });
            c.on("preXhr.dtr", function() {
                var g = [];
                c.rows().every(function() {
                    this.child.isShown() && g.push(this.id(!0))
                });
                c.one("draw.dtr", function() {
                    a._resizeAuto();
                    a._resize();
                    c.rows(g).every(function() {
                        a._detailsDisplay(this, !1)
                    })
                })
            });
            c.on("draw.dtr", function() {
                a._controlClass()
            }).on("init.dtr", function(g, l, h) {
                "dt" === g.namespace && (a._resizeAuto(), a._resize(), b.inArray(!1, a.s.current) && c.columns.adjust())
            });
            this._resize()
        },
        _columnsVisiblity: function(a) {
            var c = this.s.dt,
                d = this.s.columns,
                f, g = d.map(function(t, v) {
                    return {
                        columnIdx: v,
                        priority: t.priority
                    }
                }).sort(function(t, v) {
                    return t.priority !== v.priority ? t.priority - v.priority : t.columnIdx - v.columnIdx
                }),
                l = b.map(d, function(t, v) {
                    return !1 === c.column(v).visible() ? "not-visible" : t.auto && null === t.minWidth ? !1 : !0 === t.auto ? "-" : -1 !== b.inArray(a, t.includeIn)
                }),
                h = 0;
            var e = 0;
            for (f = l.length; e < f; e++) !0 === l[e] && (h += d[e].minWidth);
            e = c.settings()[0].oScroll;
            e = e.sY || e.sX ? e.iBarWidth : 0;
            h = c.table().container().offsetWidth - e - h;
            e = 0;
            for (f = l.length; e < f; e++) d[e].control && (h -= d[e].minWidth);
            var r = !1;
            e = 0;
            for (f = g.length; e < f; e++) {
                var q = g[e].columnIdx;
                "-" === l[q] && !d[q].control && d[q].minWidth && (r || 0 > h - d[q].minWidth ? (r = !0, l[q] = !1) : l[q] = !0, h -= d[q].minWidth)
            }
            g = !1;
            e = 0;
            for (f = d.length; e < f; e++)
                if (!d[e].control && !d[e].never && !1 === l[e]) {
                    g = !0;
                    break
                }
            e = 0;
            for (f = d.length; e < f; e++) d[e].control && (l[e] = g), "not-visible" === l[e] && (l[e] = !1); - 1 === b.inArray(!0, l) && (l[0] = !0);
            return l
        },
        _classLogic: function() {
            var a = this,
                c = this.c.breakpoints,
                d = this.s.dt,
                f = d.columns().eq(0).map(function(h) {
                    var e = this.column(h),
                        r = e.header().className;
                    h = d.settings()[0].aoColumns[h].responsivePriority;
                    e = e.header().getAttribute("data-priority");
                    h === n && (h = e === n || null === e ? 1e4 : 1 * e);
                    return {
                        className: r,
                        includeIn: [],
                        auto: !1,
                        control: !1,
                        never: r.match(/\bnever\b/) ? !0 : !1,
                        priority: h
                    }
                }),
                g = function(h, e) {
                    h = f[h].includeIn; - 1 === b.inArray(e, h) && h.push(e)
                },
                l = function(h, e, r, q) {
                    if (!r) f[h].includeIn.push(e);
                    else if ("max-" === r)
                        for (q = a._find(e).width, e = 0, r = c.length; e < r; e++) c[e].width <= q && g(h, c[e].name);
                    else if ("min-" === r)
                        for (q = a._find(e).width, e = 0, r = c.length; e < r; e++) c[e].width >= q && g(h, c[e].name);
                    else if ("not-" === r)
                        for (e = 0, r = c.length; e < r; e++) - 1 === c[e].name.indexOf(q) && g(h, c[e].name)
                };
            f.each(function(h, e) {
                for (var r = h.className.split(" "), q = !1, t = 0, v = r.length; t < v; t++) {
                    var B = r[t].trim();
                    if ("all" === B) {
                        q = !0;
                        h.includeIn = b.map(c, function(w) {
                            return w.name
                        });
                        return
                    }
                    if ("none" === B || h.never) {
                        q = !0;
                        return
                    }
                    if ("control" === B || "dtr-control" === B) {
                        q = !0;
                        h.control = !0;
                        return
                    }
                    b.each(c, function(w, D) {
                        w = D.name.split("-");
                        var x = B.match(new RegExp("(min\\-|max\\-|not\\-)?(" + w[0] + ")(\\-[_a-zA-Z0-9])?"));
                        x && (q = !0, x[2] === w[0] && x[3] === "-" + w[1] ? l(e, D.name, x[1], x[2] + x[3]) : x[2] !== w[0] || x[3] || l(e, D.name, x[1], x[2]))
                    })
                }
                q || (h.auto = !0)
            });
            this.s.columns = f
        },
        _controlClass: function() {
            if ("inline" === this.c.details.type) {
                var a = this.s.dt,
                    c = b.inArray(!0, this.s.current);
                a.cells(null, function(d) {
                    return d !== c
                }, {
                    page: "current"
                }).nodes().to$().filter(".dtr-control").removeClass("dtr-control");
                a.cells(null, c, {
                    page: "current"
                }).nodes().to$().addClass("dtr-control")
            }
        },
        _detailsDisplay: function(a, c) {
            var d = this,
                f = this.s.dt,
                g = this.c.details;
            if (g && !1 !== g.type) {
                var l = g.display(a, c, function() {
                    return g.renderer(f, a[0], d._detailsObj(a[0]))
                });
                !0 !== l && !1 !== l || b(f.table().node()).triggerHandler("responsive-display.dt", [f, a, l, c])
            }
        },
        _detailsInit: function() {
            var a = this,
                c = this.s.dt,
                d = this.c.details;
            "inline" === d.type && (d.target = "td.dtr-control, th.dtr-control");
            c.on("draw.dtr", function() {
                a._tabIndexes()
            });
            a._tabIndexes();
            b(c.table().body()).on("keyup.dtr", "td, th", function(g) {
                13 === g.keyCode && b(this).data("dtr-keyboard") && b(this).click()
            });
            var f = d.target;
            d = "string" === typeof f ? f : "td, th";
            if (f !== n || null !== f) b(c.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", d, function(g) {
                if (b(c.table().node()).hasClass("collapsed") && -1 !== b.inArray(b(this).closest("tr").get(0), c.rows().nodes().toArray())) {
                    if ("number" === typeof f) {
                        var l = 0 > f ? c.columns().eq(0).length + f : f;
                        if (c.cell(this).index().column !== l) return
                    }
                    l = c.row(b(this).closest("tr"));
                    "click" === g.type ? a._detailsDisplay(l, !1) : "mousedown" === g.type ? b(this).css("outline", "none") : "mouseup" === g.type && b(this).trigger("blur").css("outline", "")
                }
            })
        },
        _detailsObj: function(a) {
            var c = this,
                d = this.s.dt;
            return b.map(this.s.columns, function(f, g) {
                if (!f.never && !f.control) return f = d.settings()[0].aoColumns[g], {
                    className: f.sClass,
                    columnIndex: g,
                    data: d.cell(a, g).render(c.c.orthogonal),
                    hidden: d.column(g).visible() && !c.s.current[g],
                    rowIndex: a,
                    title: null !== f.sTitle ? f.sTitle : b(d.column(g).header()).text()
                }
            })
        },
        _find: function(a) {
            for (var c = this.c.breakpoints, d = 0, f = c.length; d < f; d++)
                if (c[d].name === a) return c[d]
        },
        _redrawChildren: function() {
            var a = this,
                c = this.s.dt;
            c.rows({
                page: "current"
            }).iterator("row", function(d, f) {
                c.row(f);
                a._detailsDisplay(c.row(f), !0)
            })
        },
        _resize: function(a) {
            var c = this,
                d = this.s.dt,
                f = b(k).innerWidth(),
                g = this.c.breakpoints,
                l = g[0].name,
                h = this.s.columns,
                e, r = this.s.current.slice();
            for (e = g.length - 1; 0 <= e; e--)
                if (f <= g[e].width) {
                    l = g[e].name;
                    break
                }
            var q = this._columnsVisiblity(l);
            this.s.current = q;
            g = !1;
            e = 0;
            for (f = h.length; e < f; e++)
                if (!1 === q[e] && !h[e].never && !h[e].control && !1 === !d.column(e).visible()) {
                    g = !0;
                    break
                }
            b(d.table().node()).toggleClass("collapsed", g);
            var t = !1,
                v = 0;
            d.columns().eq(0).each(function(B, w) {
                !0 === q[w] && v++;
                if (a || q[w] !== r[w]) t = !0, c._setColumnVis(B, q[w])
            });
            t && (this._redrawChildren(), b(d.table().node()).trigger("responsive-resize.dt", [d, this.s.current]), 0 === d.page.info().recordsDisplay && b("td", d.table().body()).eq(0).attr("colspan", v));
            c._controlClass()
        },
        _resizeAuto: function() {
            var a = this.s.dt,
                c = this.s.columns;
            if (this.c.auto && -1 !== b.inArray(!0, b.map(c, function(e) {
                    return e.auto
                }))) {
                b.isEmptyObject(A) || b.each(A, function(e) {
                    e = e.split("-");
                    y(a, 1 * e[0], 1 * e[1])
                });
                a.table().node();
                var d = a.table().node().cloneNode(!1),
                    f = b(a.table().header().cloneNode(!1)).appendTo(d),
                    g = b(a.table().body()).clone(!1, !1).empty().appendTo(d);
                d.style.width = "auto";
                var l = a.columns().header().filter(function(e) {
                    return a.column(e).visible()
                }).to$().clone(!1).css("display", "table-cell").css("width", "auto").css("min-width", 0);
                b(g).append(b(a.rows({
                    page: "current"
                }).nodes()).clone(!1)).find("th, td").css("display", "");
                if (g = a.table().footer()) {
                    g = b(g.cloneNode(!1)).appendTo(d);
                    var h = a.columns().footer().filter(function(e) {
                        return a.column(e).visible()
                    }).to$().clone(!1).css("display", "table-cell");
                    b("<tr/>").append(h).appendTo(g)
                }
                b("<tr/>").append(l).appendTo(f);
                "inline" === this.c.details.type && b(d).addClass("dtr-inline collapsed");
                b(d).find("[name]").removeAttr("name");
                b(d).css("position", "relative");
                d = b("<div/>").css({
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clear: "both"
                }).append(d);
                d.insertBefore(a.table().node());
                l.each(function(e) {
                    e = a.column.index("fromVisible", e);
                    c[e].minWidth = this.offsetWidth || 0
                });
                d.remove()
            }
        },
        _responsiveOnlyHidden: function() {
            var a = this.s.dt;
            return b.map(this.s.current, function(c, d) {
                return !1 === a.column(d).visible() ? !0 : c
            })
        },
        _setColumnVis: function(a, c) {
            var d = this.s.dt;
            c = c ? "" : "none";
            b(d.column(a).header()).css("display", c);
            b(d.column(a).footer()).css("display", c);
            d.column(a).nodes().to$().css("display", c);
            b.isEmptyObject(A) || d.cells(null, a).indexes().each(function(f) {
                y(d, f.row, f.column)
            })
        },
        _tabIndexes: function() {
            var a = this.s.dt,
                c = a.cells({
                    page: "current"
                }).nodes().to$(),
                d = a.settings()[0],
                f = this.c.details.target;
            c.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
            "number" === typeof f ? a.cells(null, f, {
                page: "current"
            }).nodes().to$().attr("tabIndex", d.iTabIndex).data("dtr-keyboard", 1) : ("td:first-child, th:first-child" === f && (f = ">td:first-child, >th:first-child"), b(f, a.rows({
                page: "current"
            }).nodes()).attr("tabIndex", d.iTabIndex).data("dtr-keyboard", 1))
        }
    });
    u.breakpoints = [{
        name: "desktop",
        width: Infinity
    }, {
        name: "tablet-l",
        width: 1024
    }, {
        name: "tablet-p",
        width: 768
    }, {
        name: "mobile-l",
        width: 480
    }, {
        name: "mobile-p",
        width: 320
    }];
    u.display = {
        childRow: function(a, c, d) {
            if (c) {
                if (b(a.node()).hasClass("parent")) return a.child(d(), "child").show(), !0
            } else {
                if (a.child.isShown()) return a.child(!1), b(a.node()).removeClass("parent"), !1;
                a.child(d(), "child").show();
                b(a.node()).addClass("parent");
                return !0
            }
        },
        childRowImmediate: function(a, c, d) {
            if (!c && a.child.isShown() || !a.responsive.hasHidden()) return a.child(!1), b(a.node()).removeClass("parent"), !1;
            a.child(d(), "child").show();
            b(a.node()).addClass("parent");
            return !0
        },
        modal: function(a) {
            return function(c, d, f) {
                if (d) b("div.dtr-modal-content").empty().append(f());
                else {
                    var g = function() {
                            l.remove();
                            b(m).off("keypress.dtr")
                        },
                        l = b('<div class="dtr-modal"/>').append(b('<div class="dtr-modal-display"/>').append(b('<div class="dtr-modal-content"/>').append(f())).append(b('<div class="dtr-modal-close">&times;</div>').click(function() {
                            g()
                        }))).append(b('<div class="dtr-modal-background"/>').click(function() {
                            g()
                        })).appendTo("body");
                    b(m).on("keyup.dtr", function(h) {
                        27 === h.keyCode && (h.stopPropagation(), g())
                    })
                }
                a && a.header && b("div.dtr-modal-content").prepend("<h2>" + a.header(c) + "</h2>")
            }
        }
    };
    var A = {};
    u.renderer = {
        listHiddenNodes: function() {
            return function(a, c, d) {
                var f = b('<ul data-dtr-index="' + c + '" class="dtr-details"/>'),
                    g = !1;
                b.each(d, function(l, h) {
                    h.hidden && (b("<li " + (h.className ? 'class="' + h.className + '"' : "") + ' data-dtr-index="' + h.columnIndex + '" data-dt-row="' + h.rowIndex + '" data-dt-column="' + h.columnIndex + '"><span class="dtr-title">' + h.title + "</span> </li>").append(b('<span class="dtr-data"/>').append(p(a, h.rowIndex, h.columnIndex))).appendTo(f), g = !0)
                });
                return g ? f : !1
            }
        },
        listHidden: function() {
            return function(a, c, d) {
                return (a = b.map(d, function(f) {
                    var g = f.className ? 'class="' + f.className + '"' : "";
                    return f.hidden ? "<li " + g + ' data-dtr-index="' + f.columnIndex + '" data-dt-row="' + f.rowIndex + '" data-dt-column="' + f.columnIndex + '"><span class="dtr-title">' + f.title + '</span> <span class="dtr-data">' + f.data + "</span></li>" : ""
                }).join("")) ? b('<ul data-dtr-index="' + c + '" class="dtr-details"/>').append(a) : !1
            }
        },
        tableAll: function(a) {
            a = b.extend({
                tableClass: ""
            }, a);
            return function(c, d, f) {
                c = b.map(f, function(g) {
                    return "<tr " + (g.className ? 'class="' + g.className + '"' : "") + ' data-dt-row="' + g.rowIndex + '" data-dt-column="' + g.columnIndex + '"><td>' + g.title + ":</td> <td>" + g.data + "</td></tr>"
                }).join("");
                return b('<table class="' + a.tableClass + ' dtr-details" width="100%"/>').append(c)
            }
        }
    };
    u.defaults = {
        breakpoints: u.breakpoints,
        auto: !0,
        details: {
            display: u.display.childRow,
            renderer: u.renderer.listHidden(),
            target: 0,
            type: "inline"
        },
        orthogonal: "display"
    };
    var C = b.fn.dataTable.Api;
    C.register("responsive()", function() {
        return this
    });
    C.register("responsive.index()", function(a) {
        a = b(a);
        return {
            column: a.data("dtr-index"),
            row: a.parent().data("dtr-index")
        }
    });
    C.register("responsive.rebuild()", function() {
        return this.iterator("table", function(a) {
            a._responsive && a._responsive._classLogic()
        })
    });
    C.register("responsive.recalc()", function() {
        return this.iterator("table", function(a) {
            a._responsive && (a._responsive._resizeAuto(), a._responsive._resize())
        })
    });
    C.register("responsive.hasHidden()", function() {
        var a = this.context[0];
        return a._responsive ? -1 !== b.inArray(!1, a._responsive._responsiveOnlyHidden()) : !1
    });
    C.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
        return this.iterator("column", function(a, c) {
            return a._responsive ? a._responsive._responsiveOnlyHidden()[c] : !1
        }, 1)
    });
    u.version = "2.2.9";
    b.fn.dataTable.Responsive = u;
    b.fn.DataTable.Responsive = u;
    b(m).on("preInit.dt.dtr", function(a, c, d) {
        "dt" === a.namespace && (b(c.nTable).hasClass("responsive") || b(c.nTable).hasClass("dt-responsive") || c.oInit.responsive || z.defaults.responsive) && (a = c.oInit.responsive, !1 !== a && new u(c, b.isPlainObject(a) ? a : {}))
    });
    return u
});
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "datatables.net-bs5", "datatables.net-responsive"], function($) {
            return factory($, window, document)
        })
    } else if (typeof exports === "object") {
        module.exports = function(root, $) {
            if (!root) {
                root = window
            }
            if (!$ || !$.fn.dataTable) {
                $ = require("datatables.net-bs5")(root, $).$
            }
            if (!$.fn.dataTable.Responsive) {
                require("datatables.net-responsive")(root, $)
            }
            return factory($, root, root.document)
        }
    } else {
        factory(jQuery, window, document)
    }
})(function($, window, document, undefined) {
    "use strict";
    var DataTable = $.fn.dataTable;
    var _display = DataTable.Responsive.display;
    var _original = _display.modal;
    var _modal = $('<div class="modal fade dtr-bs-modal" role="dialog">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' + "</div>" + '<div class="modal-body"/>' + "</div>" + "</div>" + "</div>");
    var modal;
    $(function() {
        modal = new bootstrap.Modal(_modal[0])
    });
    _display.modal = function(options) {
        return function(row, update, render) {
            if (!$.fn.modal) {
                _original(row, update, render)
            } else {
                if (!update) {
                    if (options && options.header) {
                        var header = _modal.find("div.modal-header");
                        var button = header.find("button").detach();
                        header.empty().append('<h4 class="modal-title">' + options.header(row) + "</h4>").append(button)
                    }
                    _modal.find("div.modal-body").empty().append(render());
                    _modal.appendTo("body").modal();
                    modal.show()
                }
            }
        }
    };
    return DataTable.Responsive
});
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function() {
    var t, e, n;
    return function t(e, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!c && l) return l(a, !0);
                    if (r) return r(a, !0);
                    var s = new Error("Cannot find module '" + a + "'");
                    throw s.code = "MODULE_NOT_FOUND", s
                }
                var u = n[a] = {
                    exports: {}
                };
                e[a][0].call(u.exports, function(t) {
                    var n = e[a][1][t];
                    return i(n || t)
                }, u, u.exports, t, e, n, o)
            }
            return n[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
        return i
    }({
        1: [function(t, e, n) {
            function o(t, e) {
                for (; t && t.nodeType !== i;) {
                    if ("function" == typeof t.matches && t.matches(e)) return t;
                    t = t.parentNode
                }
            }
            var i = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
            }
            e.exports = o
        }, {}],
        2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var a = i.apply(this, arguments);
                return t.addEventListener(n, a, r), {
                    destroy: function() {
                        t.removeEventListener(n, a, r)
                    }
                }
            }

            function i(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n)
                }
            }
            var r = t("./closest");
            e.exports = o
        }, {
            "./closest": 1
        }],
        3: [function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function(t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function(t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            }
        }, {}],
        4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!c.string(e)) throw new TypeError("Second argument must be a String");
                if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
                if (c.node(t)) return i(t, e, n);
                if (c.nodeList(t)) return r(t, e, n);
                if (c.string(t)) return a(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function() {
                        t.removeEventListener(e, n)
                    }
                }
            }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }

            function a(t, e, n) {
                return l(document.body, t, e, n)
            }
            var c = t("./is"),
                l = t("delegate");
            e.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(t, e, n) {
            function o(t) {
                var e;
                if ("SELECT" === t.nodeName) t.focus(), e = t.value;
                else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                    var n = t.hasAttribute("readonly");
                    n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
                } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var o = window.getSelection(),
                        i = document.createRange();
                    i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = o.toString()
                }
                return e
            }
            e.exports = o
        }, {}],
        6: [function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this
                },
                once: function(t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = e, this.on(t, o, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; o < i; o++) n[o].fn.apply(n[o].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        o = n[t],
                        i = [];
                    if (o && e)
                        for (var r = 0, a = o.length; r < a; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}],
        7: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r);
                else if (void 0 !== o) r(n, e("select"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.select), i.clipboardAction = a.exports
                }
            }(this, function(t, e) {
                "use strict";

                function n(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                var i = n(e),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    a = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(),
                    c = function() {
                        function t(e) {
                            o(this, t), this.resolveOptions(e), this.initSelection()
                        }
                        return a(t, [{
                            key: "resolveOptions",
                            value: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                            }
                        }, {
                            key: "initSelection",
                            value: function t() {
                                this.text ? this.selectFake() : this.target && this.selectTarget()
                            }
                        }, {
                            key: "selectFake",
                            value: function t() {
                                var e = this,
                                    n = "rtl" == document.documentElement.getAttribute("dir");
                                this.removeFake(), this.fakeHandlerCallback = function() {
                                    return e.removeFake()
                                }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                                var o = window.pageYOffset || document.documentElement.scrollTop;
                                this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                            }
                        }, {
                            key: "removeFake",
                            value: function t() {
                                this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                            }
                        }, {
                            key: "selectTarget",
                            value: function t() {
                                this.selectedText = (0, i.default)(this.target), this.copyText()
                            }
                        }, {
                            key: "copyText",
                            value: function t() {
                                var e = void 0;
                                try {
                                    e = document.execCommand(this.action)
                                } catch (t) {
                                    e = !1
                                }
                                this.handleResult(e)
                            }
                        }, {
                            key: "handleResult",
                            value: function t(e) {
                                this.emitter.emit(e ? "success" : "error", {
                                    action: this.action,
                                    text: this.selectedText,
                                    trigger: this.trigger,
                                    clearSelection: this.clearSelection.bind(this)
                                })
                            }
                        }, {
                            key: "clearSelection",
                            value: function t() {
                                this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                            }
                        }, {
                            key: "destroy",
                            value: function t() {
                                this.removeFake()
                            }
                        }, {
                            key: "action",
                            set: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function t() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function t(e) {
                                if (void 0 !== e) {
                                    if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = e
                                }
                            },
                            get: function t() {
                                return this._target
                            }
                        }]), t
                    }();
                t.exports = c
            })
        }, {
            select: 5
        }],
        8: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
                }
            }(this, function(t, e, n, o) {
                "use strict";

                function i(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function c(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function l(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }
                var s = i(e),
                    u = i(n),
                    f = i(o),
                    d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    },
                    h = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(),
                    p = function(t) {
                        function e(t, n) {
                            r(this, e);
                            var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                            return o.resolveOptions(n), o.listenClick(t), o
                        }
                        return c(e, t), h(e, [{
                            key: "resolveOptions",
                            value: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === d(e.container) ? e.container : document.body
                            }
                        }, {
                            key: "listenClick",
                            value: function t(e) {
                                var n = this;
                                this.listener = (0, f.default)(e, "click", function(t) {
                                    return n.onClick(t)
                                })
                            }
                        }, {
                            key: "onClick",
                            value: function t(e) {
                                var n = e.delegateTarget || e.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s.default({
                                    action: this.action(n),
                                    target: this.target(n),
                                    text: this.text(n),
                                    container: this.container,
                                    trigger: n,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction",
                            value: function t(e) {
                                return l("action", e)
                            }
                        }, {
                            key: "defaultTarget",
                            value: function t(e) {
                                var n = l("target", e);
                                if (n) return document.querySelector(n)
                            }
                        }, {
                            key: "defaultText",
                            value: function t(e) {
                                return l("text", e)
                            }
                        }, {
                            key: "destroy",
                            value: function t() {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported",
                            value: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                    n = "string" == typeof e ? [e] : e,
                                    o = !!document.queryCommandSupported;
                                return n.forEach(function(t) {
                                    o = o && !!document.queryCommandSupported(t)
                                }), o
                            }
                        }]), e
                    }(u.default);
                t.exports = p
            })
        }, {
            "./clipboard-action": 7,
            "good-listener": 4,
            "tiny-emitter": 6
        }]
    }, {}, [8])(8)
});
(function() {
    "use strict";
    var Resumable = function(opts) {
        if (!(this instanceof Resumable)) {
            return new Resumable(opts)
        }
        this.version = 1;
        this.support = typeof File !== "undefined" && typeof Blob !== "undefined" && typeof FileList !== "undefined" && (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || false);
        if (!this.support) return false;
        var $ = this;
        $.files = [];
        $.defaults = {
            chunkSize: 1 * 1024 * 1024,
            forceChunkSize: false,
            simultaneousUploads: 3,
            fileParameterName: "file",
            chunkNumberParameterName: "resumableChunkNumber",
            chunkSizeParameterName: "resumableChunkSize",
            currentChunkSizeParameterName: "resumableCurrentChunkSize",
            totalSizeParameterName: "resumableTotalSize",
            typeParameterName: "resumableType",
            identifierParameterName: "resumableIdentifier",
            fileNameParameterName: "resumableFilename",
            relativePathParameterName: "resumableRelativePath",
            totalChunksParameterName: "resumableTotalChunks",
            throttleProgressCallbacks: .5,
            query: {},
            headers: {},
            preprocess: null,
            method: "multipart",
            uploadMethod: "POST",
            testMethod: "GET",
            prioritizeFirstAndLastChunk: false,
            target: "/",
            testTarget: null,
            parameterNamespace: "",
            testChunks: true,
            generateUniqueIdentifier: null,
            getTarget: null,
            maxChunkRetries: 100,
            chunkRetryInterval: undefined,
            permanentErrors: [400, 404, 415, 500, 501],
            maxFiles: undefined,
            withCredentials: false,
            xhrTimeout: 0,
            clearInput: true,
            chunkFormat: "blob",
            setChunkTypeFromFile: false,
            maxFilesErrorCallback: function(files, errorCount) {
                var maxFiles = $.getOpt("maxFiles");
                alert("Please upload no more than " + maxFiles + " file" + (maxFiles === 1 ? "" : "s") + " at a time.")
            },
            minFileSize: 1,
            minFileSizeErrorCallback: function(file, errorCount) {
                alert(file.fileName || file.name + " is too small, please upload files larger than " + $h.formatSize($.getOpt("minFileSize")) + ".")
            },
            maxFileSize: undefined,
            maxFileSizeErrorCallback: function(file, errorCount) {
                alert(file.fileName || file.name + " is too large, please upload files less than " + $h.formatSize($.getOpt("maxFileSize")) + ".")
            },
            fileType: [],
            fileTypeErrorCallback: function(file, errorCount) {
                alert(file.fileName || file.name + " has type not allowed, please upload files of type " + $.getOpt("fileType") + ".")
            }
        };
        $.opts = opts || {};
        $.getOpt = function(o) {
            var $opt = this;
            if (o instanceof Array) {
                var options = {};
                $h.each(o, function(option) {
                    options[option] = $opt.getOpt(option)
                });
                return options
            }
            if ($opt instanceof ResumableChunk) {
                if (typeof $opt.opts[o] !== "undefined") {
                    return $opt.opts[o]
                } else {
                    $opt = $opt.fileObj
                }
            }
            if ($opt instanceof ResumableFile) {
                if (typeof $opt.opts[o] !== "undefined") {
                    return $opt.opts[o]
                } else {
                    $opt = $opt.resumableObj
                }
            }
            if ($opt instanceof Resumable) {
                if (typeof $opt.opts[o] !== "undefined") {
                    return $opt.opts[o]
                } else {
                    return $opt.defaults[o]
                }
            }
        };
        $.events = [];
        $.on = function(event, callback) {
            $.events.push(event.toLowerCase(), callback)
        };
        $.fire = function() {
            var args = [];
            for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
            var event = args[0].toLowerCase();
            for (var i = 0; i <= $.events.length; i += 2) {
                if ($.events[i] == event) $.events[i + 1].apply($, args.slice(1));
                if ($.events[i] == "catchall") $.events[i + 1].apply(null, args)
            }
            if (event == "fileerror") $.fire("error", args[2], args[1]);
            if (event == "fileprogress") $.fire("progress")
        };
        var $h = {
            stopEvent: function(e) {
                e.stopPropagation();
                e.preventDefault()
            },
            each: function(o, callback) {
                if (typeof o.length !== "undefined") {
                    for (var i = 0; i < o.length; i++) {
                        if (callback(o[i]) === false) return
                    }
                } else {
                    for (i in o) {
                        if (callback(i, o[i]) === false) return
                    }
                }
            },
            generateUniqueIdentifier: function(file, event) {
                var custom = $.getOpt("generateUniqueIdentifier");
                if (typeof custom === "function") {
                    return custom(file, event)
                }
                var relativePath = file.webkitRelativePath || file.fileName || file.name;
                var size = file.size;
                return size + "-" + relativePath.replace(/[^0-9a-zA-Z_-]/gim, "")
            },
            contains: function(array, test) {
                var result = false;
                $h.each(array, function(value) {
                    if (value == test) {
                        result = true;
                        return false
                    }
                    return true
                });
                return result
            },
            formatSize: function(size) {
                if (size < 1024) {
                    return size + " bytes"
                } else if (size < 1024 * 1024) {
                    return (size / 1024).toFixed(0) + " KB"
                } else if (size < 1024 * 1024 * 1024) {
                    return (size / 1024 / 1024).toFixed(1) + " MB"
                } else {
                    return (size / 1024 / 1024 / 1024).toFixed(1) + " GB"
                }
            },
            getTarget: function(request, params) {
                var target = $.getOpt("target");
                if (request === "test" && $.getOpt("testTarget")) {
                    target = $.getOpt("testTarget") === "/" ? $.getOpt("target") : $.getOpt("testTarget")
                }
                if (typeof target === "function") {
                    return target(params)
                }
                var separator = target.indexOf("?") < 0 ? "?" : "&";
                var joinedParams = params.join("&");
                return target + separator + joinedParams
            }
        };
        var onDrop = function(event) {
            $h.stopEvent(event);
            if (event.dataTransfer && event.dataTransfer.items) {
                loadFiles(event.dataTransfer.items, event)
            } else if (event.dataTransfer && event.dataTransfer.files) {
                loadFiles(event.dataTransfer.files, event)
            }
        };
        var preventDefault = function(e) {
            e.preventDefault()
        };

        function processItem(item, path, items, cb) {
            var entry;
            if (item.isFile) {
                return item.file(function(file) {
                    file.relativePath = path + file.name;
                    items.push(file);
                    cb()
                })
            } else if (item.isDirectory) {
                entry = item
            } else if (item instanceof File) {
                items.push(item)
            }
            if ("function" === typeof item.webkitGetAsEntry) {
                entry = item.webkitGetAsEntry()
            }
            if (entry && entry.isDirectory) {
                return processDirectory(entry, path + entry.name + "/", items, cb)
            }
            if ("function" === typeof item.getAsFile) {
                item = item.getAsFile();
                if (item instanceof File) {
                    item.relativePath = path + item.name;
                    items.push(item)
                }
            }
            cb()
        }

        function processCallbacks(items, cb) {
            if (!items || items.length === 0) {
                return cb()
            }
            items[0](function() {
                processCallbacks(items.slice(1), cb)
            })
        }

        function processDirectory(directory, path, items, cb) {
            var dirReader = directory.createReader();
            dirReader.readEntries(function(entries) {
                if (!entries.length) {
                    return cb()
                }
                processCallbacks(entries.map(function(entry) {
                    return processItem.bind(null, entry, path, items)
                }), cb)
            })
        }

        function loadFiles(items, event) {
            if (!items.length) {
                return
            }
            $.fire("beforeAdd");
            var files = [];
            processCallbacks(Array.prototype.map.call(items, function(item) {
                return processItem.bind(null, item, "", files)
            }), function() {
                if (files.length) {
                    appendFilesFromFileList(files, event)
                }
            })
        }
        var appendFilesFromFileList = function(fileList, event) {
            var errorCount = 0;
            var o = $.getOpt(["maxFiles", "minFileSize", "maxFileSize", "maxFilesErrorCallback", "minFileSizeErrorCallback", "maxFileSizeErrorCallback", "fileType", "fileTypeErrorCallback"]);
            if (typeof o.maxFiles !== "undefined" && o.maxFiles < fileList.length + $.files.length) {
                if (o.maxFiles === 1 && $.files.length === 1 && fileList.length === 1) {
                    $.removeFile($.files[0])
                } else {
                    o.maxFilesErrorCallback(fileList, errorCount++);
                    return false
                }
            }
            var files = [],
                filesSkipped = [],
                remaining = fileList.length;
            var decreaseReamining = function() {
                if (!--remaining) {
                    if (!files.length && !filesSkipped.length) {
                        return
                    }
                    window.setTimeout(function() {
                        $.fire("filesAdded", files, filesSkipped)
                    }, 0)
                }
            };
            $h.each(fileList, function(file) {
                var fileName = file.name;
                if (o.fileType.length > 0) {
                    var fileTypeFound = false;
                    for (var index in o.fileType) {
                        var extension = "." + o.fileType[index];
                        if (fileName.toLowerCase().indexOf(extension.toLowerCase(), fileName.length - extension.length) !== -1) {
                            fileTypeFound = true;
                            break
                        }
                    }
                    if (!fileTypeFound) {
                        o.fileTypeErrorCallback(file, errorCount++);
                        return false
                    }
                }
                if (typeof o.minFileSize !== "undefined" && file.size < o.minFileSize) {
                    o.minFileSizeErrorCallback(file, errorCount++);
                    return false
                }
                if (typeof o.maxFileSize !== "undefined" && file.size > o.maxFileSize) {
                    o.maxFileSizeErrorCallback(file, errorCount++);
                    return false
                }

                function addFile(uniqueIdentifier) {
                    if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {
                        (function() {
                            file.uniqueIdentifier = uniqueIdentifier;
                            var f = new ResumableFile($, file, uniqueIdentifier);
                            $.files.push(f);
                            files.push(f);
                            f.container = typeof event != "undefined" ? event.srcElement : null;
                            window.setTimeout(function() {
                                $.fire("fileAdded", f, event)
                            }, 0)
                        })()
                    } else {
                        filesSkipped.push(file)
                    }
                    decreaseReamining()
                }
                var uniqueIdentifier = $h.generateUniqueIdentifier(file, event);
                if (uniqueIdentifier && typeof uniqueIdentifier.then === "function") {
                    uniqueIdentifier.then(function(uniqueIdentifier) {
                        addFile(uniqueIdentifier)
                    }, function() {
                        decreaseReamining()
                    })
                } else {
                    addFile(uniqueIdentifier)
                }
            })
        };

        function ResumableFile(resumableObj, file, uniqueIdentifier) {
            var $ = this;
            $.opts = {};
            $.getOpt = resumableObj.getOpt;
            $._prevProgress = 0;
            $.resumableObj = resumableObj;
            $.file = file;
            $.fileName = file.fileName || file.name;
            $.size = file.size;
            $.relativePath = file.relativePath || file.webkitRelativePath || $.fileName;
            $.uniqueIdentifier = uniqueIdentifier;
            $._pause = false;
            $.container = "";
            var _error = uniqueIdentifier !== undefined;
            var chunkEvent = function(event, message) {
                switch (event) {
                    case "progress":
                        $.resumableObj.fire("fileProgress", $, message);
                        break;
                    case "error":
                        $.abort();
                        _error = true;
                        $.chunks = [];
                        $.resumableObj.fire("fileError", $, message);
                        break;
                    case "success":
                        if (_error) return;
                        $.resumableObj.fire("fileProgress", $);
                        if ($.isComplete()) {
                            $.resumableObj.fire("fileSuccess", $, message)
                        }
                        break;
                    case "retry":
                        $.resumableObj.fire("fileRetry", $);
                        break
                }
            };
            $.chunks = [];
            $.abort = function() {
                var abortCount = 0;
                $h.each($.chunks, function(c) {
                    if (c.status() == "uploading") {
                        c.abort();
                        abortCount++
                    }
                });
                if (abortCount > 0) $.resumableObj.fire("fileProgress", $)
            };
            $.cancel = function() {
                var _chunks = $.chunks;
                $.chunks = [];
                $h.each(_chunks, function(c) {
                    if (c.status() == "uploading") {
                        c.abort();
                        $.resumableObj.uploadNextChunk()
                    }
                });
                $.resumableObj.removeFile($);
                $.resumableObj.fire("fileProgress", $)
            };
            $.retry = function() {
                $.bootstrap();
                var firedRetry = false;
                $.resumableObj.on("chunkingComplete", function() {
                    if (!firedRetry) $.resumableObj.upload();
                    firedRetry = true
                })
            };
            $.bootstrap = function() {
                $.abort();
                _error = false;
                $.chunks = [];
                $._prevProgress = 0;
                var round = $.getOpt("forceChunkSize") ? Math.ceil : Math.floor;
                var maxOffset = Math.max(round($.file.size / $.getOpt("chunkSize")), 1);
                for (var offset = 0; offset < maxOffset; offset++) {
                    (function(offset) {
                        window.setTimeout(function() {
                            $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));
                            $.resumableObj.fire("chunkingProgress", $, offset / maxOffset)
                        }, 0)
                    })(offset)
                }
                window.setTimeout(function() {
                    $.resumableObj.fire("chunkingComplete", $)
                }, 0)
            };
            $.progress = function() {
                if (_error) return 1;
                var ret = 0;
                var error = false;
                $h.each($.chunks, function(c) {
                    if (c.status() == "error") error = true;
                    ret += c.progress(true)
                });
                ret = error ? 1 : ret > .99999 ? 1 : ret;
                ret = Math.max($._prevProgress, ret);
                $._prevProgress = ret;
                return ret
            };
            $.isUploading = function() {
                var uploading = false;
                $h.each($.chunks, function(chunk) {
                    if (chunk.status() == "uploading") {
                        uploading = true;
                        return false
                    }
                });
                return uploading
            };
            $.isComplete = function() {
                var outstanding = false;
                $h.each($.chunks, function(chunk) {
                    var status = chunk.status();
                    if (status == "pending" || status == "uploading" || chunk.preprocessState === 1) {
                        outstanding = true;
                        return false
                    }
                });
                return !outstanding
            };
            $.pause = function(pause) {
                if (typeof pause === "undefined") {
                    $._pause = $._pause ? false : true
                } else {
                    $._pause = pause
                }
            };
            $.isPaused = function() {
                return $._pause
            };
            $.resumableObj.fire("chunkingStart", $);
            $.bootstrap();
            return this
        }

        function ResumableChunk(resumableObj, fileObj, offset, callback) {
            var $ = this;
            $.opts = {};
            $.getOpt = resumableObj.getOpt;
            $.resumableObj = resumableObj;
            $.fileObj = fileObj;
            $.fileObjSize = fileObj.size;
            $.fileObjType = fileObj.file.type;
            $.offset = offset;
            $.callback = callback;
            $.lastProgressCallback = new Date;
            $.tested = false;
            $.retries = 0;
            $.pendingRetry = false;
            $.preprocessState = 0;
            var chunkSize = $.getOpt("chunkSize");
            $.loaded = 0;
            $.startByte = $.offset * chunkSize;
            $.endByte = Math.min($.fileObjSize, ($.offset + 1) * chunkSize);
            if ($.fileObjSize - $.endByte < chunkSize && !$.getOpt("forceChunkSize")) {
                $.endByte = $.fileObjSize
            }
            $.xhr = null;
            $.test = function() {
                $.xhr = new XMLHttpRequest;
                var testHandler = function(e) {
                    $.tested = true;
                    var status = $.status();
                    if (status == "success") {
                        $.callback(status, $.message());
                        $.resumableObj.uploadNextChunk()
                    } else {
                        $.send()
                    }
                };
                $.xhr.addEventListener("load", testHandler, false);
                $.xhr.addEventListener("error", testHandler, false);
                $.xhr.addEventListener("timeout", testHandler, false);
                var params = [];
                var parameterNamespace = $.getOpt("parameterNamespace");
                var customQuery = $.getOpt("query");
                if (typeof customQuery == "function") customQuery = customQuery($.fileObj, $);
                $h.each(customQuery, function(k, v) {
                    params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join("="))
                });
                params = params.concat([
                    ["chunkNumberParameterName", $.offset + 1],
                    ["chunkSizeParameterName", $.getOpt("chunkSize")],
                    ["currentChunkSizeParameterName", $.endByte - $.startByte],
                    ["totalSizeParameterName", $.fileObjSize],
                    ["typeParameterName", $.fileObjType],
                    ["identifierParameterName", $.fileObj.uniqueIdentifier],
                    ["fileNameParameterName", $.fileObj.fileName],
                    ["relativePathParameterName", $.fileObj.relativePath],
                    ["totalChunksParameterName", $.fileObj.chunks.length]
                ].filter(function(pair) {
                    return $.getOpt(pair[0])
                }).map(function(pair) {
                    return [parameterNamespace + $.getOpt(pair[0]), encodeURIComponent(pair[1])].join("=")
                }));
                $.xhr.open($.getOpt("testMethod"), $h.getTarget("test", params));
                $.xhr.timeout = $.getOpt("xhrTimeout");
                $.xhr.withCredentials = $.getOpt("withCredentials");
                var customHeaders = $.getOpt("headers");
                if (typeof customHeaders === "function") {
                    customHeaders = customHeaders($.fileObj, $)
                }
                $h.each(customHeaders, function(k, v) {
                    $.xhr.setRequestHeader(k, v)
                });
                $.xhr.send(null)
            };
            $.preprocessFinished = function() {
                $.preprocessState = 2;
                $.send()
            };
            $.send = function() {
                var preprocess = $.getOpt("preprocess");
                if (typeof preprocess === "function") {
                    switch ($.preprocessState) {
                        case 0:
                            $.preprocessState = 1;
                            preprocess($);
                            return;
                        case 1:
                            return;
                        case 2:
                            break
                    }
                }
                if ($.getOpt("testChunks") && !$.tested) {
                    $.test();
                    return
                }
                $.xhr = new XMLHttpRequest;
                $.xhr.upload.addEventListener("progress", function(e) {
                    if (new Date - $.lastProgressCallback > $.getOpt("throttleProgressCallbacks") * 1e3) {
                        $.callback("progress");
                        $.lastProgressCallback = new Date
                    }
                    $.loaded = e.loaded || 0
                }, false);
                $.loaded = 0;
                $.pendingRetry = false;
                $.callback("progress");
                var doneHandler = function(e) {
                    var status = $.status();
                    if (status == "success" || status == "error") {
                        $.callback(status, $.message());
                        $.resumableObj.uploadNextChunk()
                    } else {
                        $.callback("retry", $.message());
                        $.abort();
                        $.retries++;
                        var retryInterval = $.getOpt("chunkRetryInterval");
                        if (retryInterval !== undefined) {
                            $.pendingRetry = true;
                            setTimeout($.send, retryInterval)
                        } else {
                            $.send()
                        }
                    }
                };
                $.xhr.addEventListener("load", doneHandler, false);
                $.xhr.addEventListener("error", doneHandler, false);
                $.xhr.addEventListener("timeout", doneHandler, false);
                var query = [
                    ["chunkNumberParameterName", $.offset + 1],
                    ["chunkSizeParameterName", $.getOpt("chunkSize")],
                    ["currentChunkSizeParameterName", $.endByte - $.startByte],
                    ["totalSizeParameterName", $.fileObjSize],
                    ["typeParameterName", $.fileObjType],
                    ["identifierParameterName", $.fileObj.uniqueIdentifier],
                    ["fileNameParameterName", $.fileObj.fileName],
                    ["relativePathParameterName", $.fileObj.relativePath],
                    ["totalChunksParameterName", $.fileObj.chunks.length]
                ].filter(function(pair) {
                    return $.getOpt(pair[0])
                }).reduce(function(query, pair) {
                    query[$.getOpt(pair[0])] = pair[1];
                    return query
                }, {});
                var customQuery = $.getOpt("query");
                if (typeof customQuery == "function") customQuery = customQuery($.fileObj, $);
                $h.each(customQuery, function(k, v) {
                    query[k] = v
                });
                var func = $.fileObj.file.slice ? "slice" : $.fileObj.file.mozSlice ? "mozSlice" : $.fileObj.file.webkitSlice ? "webkitSlice" : "slice";
                var bytes = $.fileObj.file[func]($.startByte, $.endByte, $.getOpt("setChunkTypeFromFile") ? $.fileObj.file.type : "");
                var data = null;
                var params = [];
                var parameterNamespace = $.getOpt("parameterNamespace");
                if ($.getOpt("method") === "octet") {
                    data = bytes;
                    $h.each(query, function(k, v) {
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join("="))
                    })
                } else {
                    data = new FormData;
                    $h.each(query, function(k, v) {
                        data.append(parameterNamespace + k, v);
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join("="))
                    });
                    if ($.getOpt("chunkFormat") == "blob") {
                        data.append(parameterNamespace + $.getOpt("fileParameterName"), bytes, $.fileObj.fileName)
                    } else if ($.getOpt("chunkFormat") == "base64") {
                        var fr = new FileReader;
                        fr.onload = function(e) {
                            data.append(parameterNamespace + $.getOpt("fileParameterName"), fr.result);
                            $.xhr.send(data)
                        };
                        fr.readAsDataURL(bytes)
                    }
                }
                var target = $h.getTarget("upload", params);
                var method = $.getOpt("uploadMethod");
                $.xhr.open(method, target);
                if ($.getOpt("method") === "octet") {
                    $.xhr.setRequestHeader("Content-Type", "application/octet-stream")
                }
                $.xhr.timeout = $.getOpt("xhrTimeout");
                $.xhr.withCredentials = $.getOpt("withCredentials");
                var customHeaders = $.getOpt("headers");
                if (typeof customHeaders === "function") {
                    customHeaders = customHeaders($.fileObj, $)
                }
                $h.each(customHeaders, function(k, v) {
                    $.xhr.setRequestHeader(k, v)
                });
                if ($.getOpt("chunkFormat") == "blob") {
                    $.xhr.send(data)
                }
            };
            $.abort = function() {
                if ($.xhr) $.xhr.abort();
                $.xhr = null
            };
            $.status = function() {
                if ($.pendingRetry) {
                    return "uploading"
                } else if (!$.xhr) {
                    return "pending"
                } else if ($.xhr.readyState < 4) {
                    return "uploading"
                } else {
                    if ($.xhr.status == 200 || $.xhr.status == 201) {
                        return "success"
                    } else if ($h.contains($.getOpt("permanentErrors"), $.xhr.status) || $.retries >= $.getOpt("maxChunkRetries")) {
                        return "error"
                    } else {
                        $.abort();
                        return "pending"
                    }
                }
            };
            $.message = function() {
                return $.xhr ? $.xhr.responseText : ""
            };
            $.progress = function(relative) {
                if (typeof relative === "undefined") relative = false;
                var factor = relative ? ($.endByte - $.startByte) / $.fileObjSize : 1;
                if ($.pendingRetry) return 0;
                if (!$.xhr || !$.xhr.status) factor *= .95;
                var s = $.status();
                switch (s) {
                    case "success":
                    case "error":
                        return 1 * factor;
                    case "pending":
                        return 0 * factor;
                    default:
                        return $.loaded / ($.endByte - $.startByte) * factor
                }
            };
            return this
        }
        $.uploadNextChunk = function() {
            var found = false;
            if ($.getOpt("prioritizeFirstAndLastChunk")) {
                $h.each($.files, function(file) {
                    if (file.chunks.length && file.chunks[0].status() == "pending" && file.chunks[0].preprocessState === 0) {
                        file.chunks[0].send();
                        found = true;
                        return false
                    }
                    if (file.chunks.length > 1 && file.chunks[file.chunks.length - 1].status() == "pending" && file.chunks[file.chunks.length - 1].preprocessState === 0) {
                        file.chunks[file.chunks.length - 1].send();
                        found = true;
                        return false
                    }
                });
                if (found) return true
            }
            $h.each($.files, function(file) {
                if (file.isPaused() === false) {
                    $h.each(file.chunks, function(chunk) {
                        if (chunk.status() == "pending" && chunk.preprocessState === 0) {
                            chunk.send();
                            found = true;
                            return false
                        }
                    })
                }
                if (found) return false
            });
            if (found) return true;
            var outstanding = false;
            $h.each($.files, function(file) {
                if (!file.isComplete()) {
                    outstanding = true;
                    return false
                }
            });
            if (!outstanding) {
                $.fire("complete")
            }
            return false
        };
        $.assignBrowse = function(domNodes, isDirectory) {
            if (typeof domNodes.length == "undefined") domNodes = [domNodes];
            $h.each(domNodes, function(domNode) {
                var input;
                if (domNode.tagName === "INPUT" && domNode.type === "file") {
                    input = domNode
                } else {
                    input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.style.display = "none";
                    domNode.addEventListener("click", function() {
                        input.style.opacity = 0;
                        input.style.display = "block";
                        input.focus();
                        input.click();
                        input.style.display = "none"
                    }, false);
                    domNode.appendChild(input)
                }
                var maxFiles = $.getOpt("maxFiles");
                if (typeof maxFiles === "undefined" || maxFiles != 1) {
                    input.setAttribute("multiple", "multiple")
                } else {
                    input.removeAttribute("multiple")
                }
                if (isDirectory) {
                    input.setAttribute("webkitdirectory", "webkitdirectory")
                } else {
                    input.removeAttribute("webkitdirectory")
                }
                var fileTypes = $.getOpt("fileType");
                if (typeof fileTypes !== "undefined" && fileTypes.length >= 1) {
                    input.setAttribute("accept", fileTypes.map(function(e) {
                        return "." + e
                    }).join(","))
                } else {
                    input.removeAttribute("accept")
                }
                input.addEventListener("change", function(e) {
                    appendFilesFromFileList(e.target.files, e);
                    var clearInput = $.getOpt("clearInput");
                    if (clearInput) {
                        e.target.value = ""
                    }
                }, false)
            })
        };
        $.assignDrop = function(domNodes) {
            if (typeof domNodes.length == "undefined") domNodes = [domNodes];
            $h.each(domNodes, function(domNode) {
                domNode.addEventListener("dragover", preventDefault, false);
                domNode.addEventListener("dragenter", preventDefault, false);
                domNode.addEventListener("drop", onDrop, false)
            })
        };
        $.unAssignDrop = function(domNodes) {
            if (typeof domNodes.length == "undefined") domNodes = [domNodes];
            $h.each(domNodes, function(domNode) {
                domNode.removeEventListener("dragover", preventDefault);
                domNode.removeEventListener("dragenter", preventDefault);
                domNode.removeEventListener("drop", onDrop)
            })
        };
        $.isUploading = function() {
            var uploading = false;
            $h.each($.files, function(file) {
                if (file.isUploading()) {
                    uploading = true;
                    return false
                }
            });
            return uploading
        };
        $.upload = function() {
            if ($.isUploading()) return;
            $.fire("uploadStart");
            for (var num = 1; num <= $.getOpt("simultaneousUploads"); num++) {
                $.uploadNextChunk()
            }
        };
        $.pause = function() {
            $h.each($.files, function(file) {
                file.abort()
            });
            $.fire("pause")
        };
        $.cancel = function() {
            $.fire("beforeCancel");
            for (var i = $.files.length - 1; i >= 0; i--) {
                $.files[i].cancel()
            }
            $.fire("cancel")
        };
        $.progress = function() {
            var totalDone = 0;
            var totalSize = 0;
            $h.each($.files, function(file) {
                totalDone += file.progress() * file.size;
                totalSize += file.size
            });
            return totalSize > 0 ? totalDone / totalSize : 0
        };
        $.addFile = function(file, event) {
            appendFilesFromFileList([file], event)
        };
        $.addFiles = function(files, event) {
            appendFilesFromFileList(files, event)
        };
        $.removeFile = function(file) {
            for (var i = $.files.length - 1; i >= 0; i--) {
                if ($.files[i] === file) {
                    $.files.splice(i, 1)
                }
            }
        };
        $.getFromUniqueIdentifier = function(uniqueIdentifier) {
            var ret = false;
            $h.each($.files, function(f) {
                if (f.uniqueIdentifier == uniqueIdentifier) ret = f
            });
            return ret
        };
        $.getSize = function() {
            var totalSize = 0;
            $h.each($.files, function(file) {
                totalSize += file.size
            });
            return totalSize
        };
        $.handleDropEvent = function(e) {
            onDrop(e)
        };
        $.handleChangeEvent = function(e) {
            appendFilesFromFileList(e.target.files, e);
            e.target.value = ""
        };
        $.updateQuery = function(query) {
            $.opts.query = query
        };
        return this
    };
    if (typeof module != "undefined") {
        module.exports = Resumable
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return Resumable
        })
    } else {
        window.Resumable = Resumable
    }
})();
! function(r) {
    "function" == typeof define && define.amd ? define(["jquery"], r) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t), t
    } : r(jQuery)
}(function(q) {
    "use strict";
    var m = /\r?\n/g,
        S = {};
    S.fileapi = void 0 !== q('<input type="file">').get(0).files, S.formdata = void 0 !== window.FormData;
    var _ = !!q.fn.prop;

    function o(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t))
    }

    function i(e) {
        var t = e.target,
            r = q(t);
        if (!r.is("[type=submit],[type=image]")) {
            var a = r.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0]
        }
        var n, o = t.form;
        "image" === (o.clk = t).type && (void 0 !== e.offsetX ? (o.clk_x = e.offsetX, o.clk_y = e.offsetY) : "function" == typeof q.fn.offset ? (n = r.offset(), o.clk_x = e.pageX - n.left, o.clk_y = e.pageY - n.top) : (o.clk_x = e.pageX - t.offsetLeft, o.clk_y = e.pageY - t.offsetTop)), setTimeout(function() {
            o.clk = o.clk_x = o.clk_y = null
        }, 100)
    }

    function N() {
        var e;
        q.fn.ajaxSubmit.debug && (e = "[jquery.form] " + Array.prototype.join.call(arguments, ""), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e))
    }
    q.fn.attr2 = function() {
        if (!_) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, q.fn.ajaxSubmit = function(M, e, t, r) {
        if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
        var O, a, n, o, X = this;
        "function" == typeof M ? M = {
            success: M
        } : "string" == typeof M || !1 === M && 0 < arguments.length ? (M = {
            url: M,
            data: e,
            dataType: t
        }, "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}), O = M.method || M.type || this.attr2("method"), n = (n = (n = "string" == typeof(a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1], o = /(MSIE|Trident)/.test(navigator.userAgent || "") && /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", M = q.extend(!0, {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: o
        }, M);
        var i = {};
        if (this.trigger("form-pre-serialize", [this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var s = M.traditional;
        void 0 === s && (s = q.ajaxSettings.traditional);
        var u, c, C = [],
            l = this.formToArray(M.semantic, C, M.filtering);
        if (M.data && (c = q.isFunction(M.data) ? M.data(l) : M.data, M.extraData = c, u = q.param(c, s)), M.beforeSubmit && !1 === M.beforeSubmit(l, this, M)) return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [l, this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var f = q.param(l, s);
        u && (f = f ? f + "&" + u : u), "GET" === M.type.toUpperCase() ? (M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f, M.data = null) : M.data = f;
        var d, m, p, h = [];
        M.resetForm && h.push(function() {
            X.resetForm()
        }), M.clearForm && h.push(function() {
            X.clearForm(M.includeHidden)
        }), !M.dataType && M.target ? (d = M.success || function() {}, h.push(function(e, t, r) {
            var a = arguments,
                n = M.replaceTarget ? "replaceWith" : "html";
            q(M.target)[n](e).each(function() {
                d.apply(this, a)
            })
        })) : M.success && (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)), M.success = function(e, t, r) {
            for (var a = M.context || this, n = 0, o = h.length; n < o; n++) h[n].apply(a, [e, t, r || X, X])
        }, M.error && (m = M.error, M.error = function(e, t, r) {
            var a = M.context || this;
            m.apply(a, [e, t, r, X])
        }), M.complete && (p = M.complete, M.complete = function(e, t) {
            var r = M.context || this;
            p.apply(r, [e, t, X])
        });
        var v = 0 < q("input[type=file]:enabled", this).filter(function() {
                return "" !== q(this).val()
            }).length,
            g = "multipart/form-data",
            x = X.attr("enctype") === g || X.attr("encoding") === g,
            y = S.fileapi && S.formdata;
        N("fileAPI :" + y);
        var b, T = (v || x) && !y;
        !1 !== M.iframe && (M.iframe || T) ? M.closeKeepAlive ? q.get(M.closeKeepAlive, function() {
            b = w(l)
        }) : b = w(l) : b = (v || x) && y ? function(e) {
            for (var r = new FormData, t = 0; t < e.length; t++) r.append(e[t].name, e[t].value);
            if (M.extraData) {
                var a = function(e) {
                    var t, r, a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        o = [];
                    for (t = 0; t < n; t++) a[t] = a[t].replace(/\+/g, " "), r = a[t].split("="), o.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                    return o
                }(M.extraData);
                for (t = 0; t < a.length; t++) a[t] && r.append(a[t][0], a[t][1])
            }
            M.data = null;
            var n = q.extend(!0, {}, q.ajaxSettings, M, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: O || "POST"
            });
            M.uploadProgress && (n.xhr = function() {
                var e = q.ajaxSettings.xhr();
                return e.upload && e.upload.addEventListener("progress", function(e) {
                    var t = 0,
                        r = e.loaded || e.position,
                        a = e.total;
                    e.lengthComputable && (t = Math.ceil(r / a * 100)), M.uploadProgress(e, r, a, t)
                }, !1), e
            });
            n.data = null;
            var o = n.beforeSend;
            return n.beforeSend = function(e, t) {
                M.formData ? t.data = M.formData : t.data = r, o && o.call(this, e, t)
            }, q.ajax(n)
        }(l) : q.ajax(M), X.removeData("jqxhr").data("jqxhr", b);
        for (var j = 0; j < C.length; j++) C[j] = null;
        return this.trigger("form-submit-notify", [this, M]), this;

        function w(e) {
            var t, r, l, f, o, d, m, p, a, n, h, v, i = X[0],
                g = q.Deferred();
            if (g.abort = function(e) {
                    p.abort(e)
                }, e)
                for (r = 0; r < C.length; r++) t = q(C[r]), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
            (l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l, o = "jqFormIO" + (new Date).getTime();
            var s = i.ownerDocument,
                u = X.closest("body");
            if (l.iframeTarget ? (n = (d = q(l.iframeTarget, s)).attr2("name")) ? o = n : d.attr2("name", o) : (d = q('<iframe name="' + o + '" src="' + l.iframeSrc + '" />', s)).css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                }), m = d[0], p = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(e) {
                        var t = "timeout" === e ? "timeout" : "aborted";
                        N("aborting upload... " + t), this.aborted = 1;
                        try {
                            m.contentWindow.document.execCommand && m.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        d.attr("src", l.iframeSrc), p.error = t, l.error && l.error.call(l.context, p, t, e), f && q.event.trigger("ajaxError", [p, l, t]), l.complete && l.complete.call(l.context, p, t)
                    }
                }, (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"), f && q.event.trigger("ajaxSend", [p, l]), l.beforeSend && !1 === l.beforeSend.call(l.context, p, l)) return l.global && q.active--, g.reject(), g;
            if (p.aborted) return g.reject(), g;
            (a = i.clk) && (n = a.name) && !a.disabled && (l.extraData = l.extraData || {}, l.extraData[n] = a.value, "image" === a.type && (l.extraData[n + ".x"] = i.clk_x, l.extraData[n + ".y"] = i.clk_y));
            var x = 1,
                y = 2;

            function b(t) {
                var r = null;
                try {
                    t.contentWindow && (r = t.contentWindow.document)
                } catch (e) {
                    N("cannot get iframe.contentWindow document: " + e)
                }
                if (r) return r;
                try {
                    r = t.contentDocument ? t.contentDocument : t.document
                } catch (e) {
                    N("cannot get iframe.contentDocument: " + e), r = t.document
                }
                return r
            }
            var c = q("meta[name=csrf-token]").attr("content"),
                T = q("meta[name=csrf-param]").attr("content");

            function j() {
                var e = X.attr2("target"),
                    t = X.attr2("action"),
                    r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
                i.setAttribute("target", o), O && !/post/i.test(O) || i.setAttribute("method", "POST"), t !== l.url && i.setAttribute("action", l.url), l.skipEncodingOverride || O && !/post/i.test(O) || X.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), l.timeout && (v = setTimeout(function() {
                    h = !0, A(x)
                }, l.timeout));
                var a = [];
                try {
                    if (l.extraData)
                        for (var n in l.extraData) l.extraData.hasOwnProperty(n) && (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value") ? a.push(q('<input type="hidden" name="' + l.extraData[n].name + '">', s).val(l.extraData[n].value).appendTo(i)[0]) : a.push(q('<input type="hidden" name="' + n + '">', s).val(l.extraData[n]).appendTo(i)[0]));
                    l.iframeTarget || d.appendTo(u), m.attachEvent ? m.attachEvent("onload", A) : m.addEventListener("load", A, !1), setTimeout(function e() {
                        try {
                            var t = b(m).readyState;
                            N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50)
                        } catch (e) {
                            N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), v = void 0
                        }
                    }, 15);
                    try {
                        i.submit()
                    } catch (e) {
                        document.createElement("form").submit.apply(i)
                    }
                } finally {
                    i.setAttribute("action", t), i.setAttribute("enctype", r), e ? i.setAttribute("target", e) : X.removeAttr("target"), q(a).remove()
                }
            }
            T && c && (l.extraData = l.extraData || {}, l.extraData[T] = c), l.forceSync ? j() : setTimeout(j, 10);
            var w, S, k, D = 50;

            function A(e) {
                if (!p.aborted && !k) {
                    if ((S = b(m)) || (N("cannot access response document"), e = y), e === x && p) return p.abort("timeout"), void g.reject(p, "timeout");
                    if (e === y && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");
                    if (S && S.location.href !== l.iframeSrc || h) {
                        m.detachEvent ? m.detachEvent("onload", A) : m.removeEventListener("load", A, !1);
                        var t, r = "success";
                        try {
                            if (h) throw "timeout";
                            var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                            if (N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
                            var n = S.body ? S.body : S.documentElement;
                            p.responseText = n ? n.innerHTML : null, p.responseXML = S.XMLDocument ? S.XMLDocument : S, a && (l.dataType = "xml"), p.getResponseHeader = function(e) {
                                return {
                                    "content-type": l.dataType
                                }[e.toLowerCase()]
                            }, n && (p.status = Number(n.getAttribute("status")) || p.status, p.statusText = n.getAttribute("statusText") || p.statusText);
                            var o, i, s, u = (l.dataType || "").toLowerCase(),
                                c = /(json|script|text)/.test(u);
                            c || l.textarea ? (o = S.getElementsByTagName("textarea")[0]) ? (p.responseText = o.value, p.status = Number(o.getAttribute("status")) || p.status, p.statusText = o.getAttribute("statusText") || p.statusText) : c && (i = S.getElementsByTagName("pre")[0], s = S.getElementsByTagName("body")[0], i ? p.responseText = i.textContent ? i.textContent : i.innerText : s && (p.responseText = s.textContent ? s.textContent : s.innerText)) : "xml" === u && !p.responseXML && p.responseText && (p.responseXML = F(p.responseText));
                            try {
                                w = E(p, u, l)
                            } catch (e) {
                                r = "parsererror", p.error = t = e || r
                            }
                        } catch (e) {
                            N("error caught: ", e), r = "error", p.error = t = e || r
                        }
                        p.aborted && (N("upload aborted"), r = null), p.status && (r = 200 <= p.status && p.status < 300 || 304 === p.status ? "success" : "error"), "success" === r ? (l.success && l.success.call(l.context, w, "success", p), g.resolve(p.responseText, "success", p), f && q.event.trigger("ajaxSuccess", [p, l])) : r && (void 0 === t && (t = p.statusText), l.error && l.error.call(l.context, p, r, t), g.reject(p, "error", t), f && q.event.trigger("ajaxError", [p, l, t])), f && q.event.trigger("ajaxComplete", [p, l]), f && !--q.active && q.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, p, r), k = !0, l.timeout && clearTimeout(v), setTimeout(function() {
                            l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), p.responseXML = null
                        }, 100)
                    }
                }
            }
            var F = q.parseXML || function(e, t) {
                    return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                },
                L = q.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                E = function(e, t, r) {
                    var a = e.getResponseHeader("content-type") || "",
                        n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                        o = n ? e.responseXML : e.responseText;
                    return n && "parsererror" === o.documentElement.nodeName && q.error && q.error("parsererror"), r && r.dataFilter && (o = r.dataFilter(o, t)), "string" == typeof o && (("json" === t || !t) && 0 <= a.indexOf("json") ? o = L(o) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(o)), o
                };
            return g
        }
    }, q.fn.ajaxForm = function(e, t, r, a) {
        if (("string" == typeof e || !1 === e && 0 < arguments.length) && (e = {
                url: e,
                data: t,
                dataType: r
            }, "function" == typeof a && (e.success = a)), (e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (q(document).off("submit.form-plugin", this.selector, o).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, e, o).on("click.form-plugin", this.selector, e, i), this) : (e.beforeFormUnbind && e.beforeFormUnbind(this, e), this.ajaxFormUnbind().on("submit.form-plugin", e, o).on("click.form-plugin", e, i));
        var n = {
            s: this.selector,
            c: this.context
        };
        return !q.isReady && n.s ? (N("DOM not ready, queuing ajaxForm"), q(function() {
            q(n.s, n.c).ajaxForm(e)
        })) : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")), this
    }, q.fn.ajaxFormUnbind = function() {
        return this.off("submit.form-plugin click.form-plugin")
    }, q.fn.formToArray = function(e, t, r) {
        var a = [];
        if (0 === this.length) return a;
        var n, o, i, s, u, c, l, f, d, m, p = this[0],
            h = this.attr("id"),
            v = (v = e || void 0 === p.elements ? p.getElementsByTagName("*") : p.elements) && q.makeArray(v);
        if (h && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + h + '"]').get()).length && (v = (v || []).concat(n)), !v || !v.length) return a;
        for (q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length; o < c; o++)
            if ((m = (u = v[o]).name) && !u.disabled)
                if (e && p.clk && "image" === u.type) p.clk === u && (a.push({
                    name: m,
                    value: q(u).val(),
                    type: u.type
                }), a.push({
                    name: m + ".x",
                    value: p.clk_x
                }, {
                    name: m + ".y",
                    value: p.clk_y
                }));
                else if ((s = q.fieldValue(u, !0)) && s.constructor === Array)
            for (t && t.push(u), i = 0, l = s.length; i < l; i++) a.push({
                name: m,
                value: s[i]
            });
        else if (S.fileapi && "file" === u.type) {
            t && t.push(u);
            var g = u.files;
            if (g.length)
                for (i = 0; i < g.length; i++) a.push({
                    name: m,
                    value: g[i],
                    type: u.type
                });
            else a.push({
                name: m,
                value: "",
                type: u.type
            })
        } else null != s && (t && t.push(u), a.push({
            name: m,
            value: s,
            type: u.type,
            required: u.required
        }));
        return e || !p.clk || (m = (d = (f = q(p.clk))[0]).name) && !d.disabled && "image" === d.type && (a.push({
            name: m,
            value: f.val()
        }), a.push({
            name: m + ".x",
            value: p.clk_x
        }, {
            name: m + ".y",
            value: p.clk_y
        })), a
    }, q.fn.formSerialize = function(e) {
        return q.param(this.formToArray(e))
    }, q.fn.fieldSerialize = function(n) {
        var o = [];
        return this.each(function() {
            var e = this.name;
            if (e) {
                var t = q.fieldValue(this, n);
                if (t && t.constructor === Array)
                    for (var r = 0, a = t.length; r < a; r++) o.push({
                        name: e,
                        value: t[r]
                    });
                else null != t && o.push({
                    name: this.name,
                    value: t
                })
            }
        }), q.param(o)
    }, q.fn.fieldValue = function(e) {
        for (var t = [], r = 0, a = this.length; r < a; r++) {
            var n = this[r],
                o = q.fieldValue(n, e);
            null == o || o.constructor === Array && !o.length || (o.constructor === Array ? q.merge(t, o) : t.push(o))
        }
        return t
    }, q.fieldValue = function(e, t) {
        var r = e.name,
            a = e.type,
            n = e.tagName.toLowerCase();
        if (void 0 === t && (t = !0), t && (!r || e.disabled || "reset" === a || "button" === a || ("checkbox" === a || "radio" === a) && !e.checked || ("submit" === a || "image" === a) && e.form && e.form.clk !== e || "select" === n && -1 === e.selectedIndex)) return null;
        if ("select" !== n) return q(e).val().replace(m, "\r\n");
        var o = e.selectedIndex;
        if (o < 0) return null;
        for (var i = [], s = e.options, u = "select-one" === a, c = u ? o + 1 : s.length, l = u ? o : 0; l < c; l++) {
            var f = s[l];
            if (f.selected && !f.disabled) {
                var d = (d = f.value) || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value);
                if (u) return d;
                i.push(d)
            }
        }
        return i
    }, q.fn.clearForm = function(e) {
        return this.each(function() {
            q("input,select,textarea", this).clearFields(e)
        })
    }, q.fn.clearFields = q.fn.clearInputs = function(r) {
        var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var e = this.type,
                t = this.tagName.toLowerCase();
            a.test(e) || "textarea" === t ? this.value = "" : "checkbox" === e || "radio" === e ? this.checked = !1 : "select" === t ? this.selectedIndex = -1 : "file" === e ? /MSIE/.test(navigator.userAgent) ? q(this).replaceWith(q(this).clone(!0)) : q(this).val("") : r && (!0 === r && /hidden/.test(e) || "string" == typeof r && q(this).is(r)) && (this.value = "")
        })
    }, q.fn.resetForm = function() {
        return this.each(function() {
            var t = q(this),
                e = this.tagName.toLowerCase();
            switch (e) {
                case "input":
                    this.checked = this.defaultChecked;
                case "textarea":
                    return this.value = this.defaultValue, !0;
                case "option":
                case "optgroup":
                    var r = t.parents("select");
                    return r.length && r[0].multiple ? "option" === e ? this.selected = this.defaultSelected : t.find("option").resetForm() : r.resetForm(), !0;
                case "select":
                    return t.find("option").each(function(e) {
                        if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1
                    }), !0;
                case "label":
                    var a = q(t.attr("for")),
                        n = t.find("input,select,textarea");
                    return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                case "form":
                    return "function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType) || this.reset(), !0;
                default:
                    return t.find("form,input,label,select,textarea").resetForm(), !0
            }
        })
    }, q.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, q.fn.selected = function(r) {
        return void 0 === r && (r = !0), this.each(function() {
            var e, t = this.type;
            "checkbox" === t || "radio" === t ? this.checked = r : "option" === this.tagName.toLowerCase() && (e = q(this).parent("select"), r && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), this.selected = r)
        })
    }, q.fn.ajaxSubmit.debug = !1
});
$(document).ready(function() {
    $("#remote_uploader").on("submit", function(e) {
        e.preventDefault();
        var $butt = $(this).find(".send_remote_upload_url");
        var $form = $(this);
        var $modalresponse = $form.parent().find(".modal_response");
        if ($form.find("input[name='get_upload_url']").val()) {
            var serialize = $form.serialize();
            var reloadpage = "?dir=" + $form.find("input[name='get_location']").val();
            $form.addClass("d-none");
            $modalresponse.find(".zipicon").removeClass("d-none");
            $.ajax({
                type: "POST",
                url: "ajax/get-remote.php",
                data: serialize
            }).done(function(msg) {
                window.location.replace(reloadpage)
            }).fail(function() {
                $(".modal_response").html('<div class="alert alert-danger">Error connecting: ajax/get-remote.php</div>').fadeIn();
                $form.removeClass("d-none");
                $modalresponse.find(".zipicon").addClass("d-none")
            })
        }
    })
});

function notifyupload() {
    var locazio = window.location.pathname;
    var responseQS = "?";
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("dir")) {
        responseQS += "dir=" + encodeURIComponent(urlParams.get("dir").toString()) + "&"
    }
    responseQS += "response=1";
    var userslist = $("#userslist").serialize();
    var now = $.now();
    $.ajax({
        cache: false,
        type: "POST",
        url: "ajax/sendupnotif.php?t=" + now,
        data: userslist
    }).done(function(msg) {
        setTimeout(function() {
            location.href = locazio + responseQS
        }, 200)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
        setTimeout(function() {
            location.href = locazio + responseQS
        }, 200)
    })
}

function resumableJsSetup($android, $target, $placeholder, $singleprogress, $chunksize) {
    $android = $android || "no";
    $singleprogress = $singleprogress || false;
    var ua = navigator.userAgent.toLowerCase();
    var android = $android;
    var r = new Resumable({
        target: "ajax/chunk.php?loc=" + $target,
        simultaneousUploads: 3,
        prioritizeFirstAndLastChunk: true,
        chunkSize: $chunksize,
        minFileSizeErrorCallback: function(file, errorCount) {
            setTimeout(function() {
                alert(file.fileName || file.name + " is not valid.")
            }, 1e3)
        },
        permanentErrors: [403]
    });
    var percentVal = 0;
    var roundval = 0;
    if (r.support) {
        r.assignBrowse(document.getElementById("upchunk"));
        r.assignBrowse(document.getElementById("fileToUpload"));
        r.assignBrowse(document.getElementById("biguploader"));
        r.assignDrop(document.getElementById("uparea"));
        $("#fileToUpload").attr("placeholder", $placeholder);
        r.on("uploadStart", function() {
            $("#resumer").remove();
            $("#upchunk").before('<button class="btn btn-primary" id="resumer"><i class="bi bi-pause"></i></button>');
            window.onbeforeunload = function() {
                return "Are you sure you want to leave?"
            };
            $("#resumer").on("click", function() {
                r.pause()
            })
        });
        r.on("pause", function() {
            $("#resumer").remove();
            $("#upchunk").before('<button class="btn btn-primary" id="resumer"><i class="bi bi-play"></i></button>');
            $("#resumer").on("click", function() {
                r.upload()
            })
        });
        r.on("progress", function() {
            percentVal = r.progress() * 100;
            roundval = percentVal.toFixed(1);
            $(".upbar .propercent").html(roundval + "%");
            $(".upbar").width(percentVal + "%")
        });
        if ($singleprogress == true) {
            r.on("fileProgress", function(file) {
                percentVal = file.progress(true) * 100;
                $(".upbarfile .propercent").html(file.fileName);
                $(".upbarfile").width(percentVal + "%")
            })
        }
        r.on("error", function(message, file) {
            console.log(message)
        });
        r.on("fileAdded", function(file, event) {
            r.upload()
        });
        r.on("fileSuccess", function(file, event) {
            var newinput = '<input type="hidden" name="filename[]" value="' + file.fileName + '">';
            $("#userslist").append(newinput)
        });
        r.on("complete", function() {
            window.onbeforeunload = null;
            notifyupload()
        });
        $("#uparea").on("dragstart dragenter dragover", function(e) {
            $(".overdrag").css("display", "block")
        });
        $(".overdrag").on("drop dragleave dragend mouseup", function(e) {
            $(".overdrag").css("display", "none")
        })
    } else {
        var ie = document.all ? true : false;
        $("#upchunk").remove();
        $("#upformsubmit").prop("disabled", true).show();
        $(document).on("click", "#fileToUpload", function() {
            $(".upload_file").trigger("click")
        });
        $(document).on("click", "#upformsubmit", function(e) {
            e.preventDefault();
            $(".upload_file").trigger("click")
        });
        $(document).ready(function() {
            var progress = $("#progress-up");
            var probar = $(".upbar");
            var prop = $(".upbar p");
            $("#upForm").ajaxForm({
                beforeSubmit: function() {
                    progress.css("opacity", 1)
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    probar.width(percentComplete + "%");
                    prop.html(percentComplete.toFixed(1) + "%");
                    if (percentComplete == 100) {
                        notifyupload()
                    }
                }
            })
        });
        $(".btn-file :file").on("fileselect", function(event, numFiles, label) {
            var input = $(this).parents(".input-group").find(":text"),
                log = numFiles > 1 ? numFiles + " files selected" : label;
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {
                var newinput = '<input type="hidden" name="filename[]" value="' + files[i].name + '">';
                $("#userslist").append(newinput)
            }
            if (input.length) {
                input.val(log);
                if (!ie) {
                    $("#upForm").submit()
                } else {
                    $("#upformsubmit").prop("disabled", false)
                }
            }
        })
    }
}
var pmmodals = JSON.parse(PMmodals);
var pmvars = JSON.parse(PMvars);
var zoomviewEl = document.getElementById("zoomview");
var modalzoomview = false;
var videojs;
if (zoomviewEl) {
    modalzoomview = new bootstrap.Modal(document.getElementById("zoomview"))
}

function loadVid(thislink, thislinkencoded, thisname, thisID, ext) {
    if (modalzoomview && pmmodals.hasOwnProperty("zoomview")) {
        if (ext == "ogv") {
            ext = "ogg"
        }
        var vidlink = "ajax/streamvid.php?vid=" + thislink;
        var playerhtml = '<video id="my-video" class="video-js vjs-16-9">' + '<source src="' + vidlink + '" type="video/' + ext + '">';
        $(".pm-zoom").html(playerhtml);
        videojs = new Plyr(document.querySelector("#my-video"), {});
        $("#zoomview .thumbtitle").val(thisname);
        $("#zoomview").data("id", thisID);
        modalzoomview.show();
        checkNextPrev(thisID);
        $(".pmlink").attr("href", pmmodals.zoomview.baselink + thislinkencoded);
        if (pmmodals.zoomview.directlink == true) {
            $(".pmink").attr("target", "_blank");
            $("#zoomview .thumbtitle").val(pmmodals.zoomview.script_url + b64DecodeUnicode(thislink))
        }
    }
}

function loadImg(thislink, thislinkencoded, thisname, thisID, ext) {
    if (modalzoomview && pmmodals.hasOwnProperty("zoomview")) {
        $(".pm-zoom").html('<div class="prezoomimg"><div class="position-absolute w-100 h-100 start-0 top-0 d-flex justify-content-center align-items-center"><div class="spinner-border" role="status"></div></div></div><img class="preimg" src="ajax.php?thumb=' + thislink + '&y=1"/>');
        $("#zoomview").data("id", thisID);
        $("#zoomview .thumbtitle").val(thisname);
        var firstImg = $(".preimg");
        firstImg.css("display", "none");
        modalzoomview.show();
        firstImg.one("load", function() {
            $(".pm-zoom .prezoomimg").fadeOut();
            $(this).fadeIn();
            checkNextPrev(thisID);
            $(".pmlink").attr("href", pmmodals.zoomview.baselink + thislinkencoded);
            if (ext == "pdf") {
                $(".pmlink").attr("target", "_blank")
            }
            if (pmmodals.hasOwnProperty("zoomview")) {
                if (pmmodals.zoomview.directlink == true) {
                    $(".pmlink").attr("target", "_blank");
                    $("#zoomview .thumbtitle").val(pmmodals.zoomview.script_url + b64DecodeUnicode(thislink))
                }
            }
        }).each(function() {
            if ($(this).hasOwnProperty("indexOf")) {
                if (this.complete) {
                    $(this).load()
                }
            }
        })
    }
}
$(document).on("submit", ".loginform", function(event) {
    if ($("#agree").length && !$("#agree").prop("checked")) {
        var transaccept = $("#trans_accept_terms").val();
        $("#error").html('<div class="alert-wrap sticky-alert top-right"><div class="response nope alert" role="alert">' + transaccept + '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>');
        $("#agree").focus();
        return false
    }
});

function callClipboards() {
    if ($(".clipme").length) {
        var clipboardSnippets = new Clipboard(".clipme");
        var timer = window.setTimeout(function() {
            $(".clipme").popover("dispose")
        }, 1e3);
        clipboardSnippets.on("success", function(e) {
            window.clearTimeout(timer);
            $(".clipme").popover("show");
            timer = setTimeout(function() {
                $(".clipme").popover("dispose")
            }, 1e3)
        })
    }
}
$(document).on("click", "a.vid", function(e) {
    e.preventDefault();
    $(".navigall").remove();
    var thislink = $(this).data("link");
    var thislinkencoded = $(this).data("linkencoded");
    var thisname = $(this).data("name");
    var thisID = $(this).parents(".rowa").attr("id");
    var thisExt = $(this).data("ext").toLowerCase();
    loadVid(thislink, thislinkencoded, thisname, thisID, thisExt)
});
$(document).on("click", "a.thumb", function(e) {
    e.preventDefault();
    $(".navigall").remove();
    var thislink = $(this).data("link");
    var thislinkencoded = $(this).data("linkencoded");
    var thisname = $(this).data("name");
    var thisID = $(this).parents(".rowa").attr("id");
    var thisExt = $(this).data("ext").toLowerCase();
    loadImg(thislink, thislinkencoded, thisname, thisID, thisExt)
});
jQuery.fn.firstAfter = function(selector) {
    return this.nextAll(selector).first()
};
jQuery.fn.firstBefore = function(selector) {
    return this.prevAll(selector).first()
};

function checkNextPrev(currentID) {
    var current = $("#" + currentID);
    var nextgall = current.firstAfter(".gallindex").find(".pm-gall");
    var prevgall = current.firstBefore(".gallindex").find(".pm-gall");
    if (nextgall.length > 0) {
        var nextlink = nextgall.data("link");
        var nextlinkencoded = nextgall.data("linkencoded");
        var nextname = nextgall.data("name");
        var nextID = current.firstAfter(".gallindex").attr("id");
        var nextmedia = nextgall.data("type");
        var nextext = nextgall.data("ext");
        if ($(".nextgall").length < 1) {
            $(".pm-zoom").append('<a class="nextgall navigall"><span><i class="bi bi-chevron-right text-white"></i></span></a>')
        }
        $(".nextgall").data("link", nextlink);
        $(".nextgall").data("linkencoded", nextlinkencoded);
        $(".nextgall").data("name", nextname);
        $(".nextgall").data("id", nextID);
        $(".nextgall").data("type", nextmedia);
        $(".nextgall").data("ext", nextext)
    } else {
        $(".nextgall").remove()
    }
    if (prevgall.length > 0) {
        var prevlink = prevgall.data("link");
        var prevlinkencoded = prevgall.data("linkencoded");
        var prevname = prevgall.data("name");
        var prevID = current.firstBefore(".gallindex").attr("id");
        var prevmedia = prevgall.data("type");
        var prevext = prevgall.data("ext");
        if ($(".prevgall").length < 1) {
            $(".pm-zoom").append('<a class="prevgall navigall"><span><i class="bi bi-chevron-left text-white"></i></span></a>')
        }
        $(".prevgall").data("link", prevlink);
        $(".prevgall").data("linkencoded", prevlinkencoded);
        $(".prevgall").data("name", prevname);
        $(".prevgall").data("id", prevID);
        $(".prevgall").data("type", prevmedia);
        $(".prevgall").data("ext", prevext)
    } else {
        $(".prevgall").remove()
    }
}
$(document).on("click", "a.navigall", function(e) {
    var thislink = $(this).data("link");
    var thislinkencoded = $(this).data("linkencoded");
    var thisname = $(this).data("name");
    var thisID = $(this).data("id");
    var mediatype = $(this).data("type");
    var thisExt = $(this).data("ext");
    $(".navigall").remove();
    if ($("#my-video").length) {
        videojs.destroy()
    }
    if (mediatype == "video") {
        loadVid(thislink, thislinkencoded, thisname, thisID, thisExt)
    } else {
        loadImg(thislink, thislinkencoded, thisname, thisID)
    }
});
$(document).keydown(function(e) {
    if (e.keyCode == 39 && $(".nextgall").length > 0) {
        $(".nextgall").trigger("click")
    }
    if (e.keyCode == 37 && $(".prevgall").length > 0) {
        $(".prevgall").trigger("click")
    }
});
$(document).ready(function(e) {
    $("#zoomview").on("hidden.bs.modal", function() {
        $(".navigall").remove();
        if ($("#my-video").length) {
            videojs.destroy()
        }
    })
});
$(document).on("click", ".rename", function(e) {
    e.preventDefault();
    var thisname = $(this).data("thisname");
    var oldname = $(this).data("oldname");
    var thisdir = $(this).data("thisdir");
    var thisext = $(this).data("thisext");
    $("#newname").val(thisname);
    $("#oldname").val(oldname);
    $("#dir").val(thisdir);
    $("#ext").val(thisext);
    var myModal = new bootstrap.Modal(document.getElementById("modalchangename"));
    myModal.show()
});
$("#usrForm").submit(function(e) {
    if ($("#oldp").val().length < 1) {
        $("#oldp").focus();
        e.preventDefault()
    }
    if ($("#newp").val() != $("#checknewp").val()) {
        $("#checknewp").focus();
        e.preventDefault()
    }
});
$("#rpForm").submit(function(e) {
    if ($("#rep").val().length < 1) {
        $("#rep").focus();
        e.preventDefault()
    }
    if ($("#rep").val() != $("#repconf").val()) {
        $("#repconf").focus();
        e.preventDefault()
    }
});
$(document).on("keyup keypress", "#sendpwd", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false
    }
});
$(document).on("submit", "#sendpwd", function(event) {
    event.preventDefault();
    var serialize = $(this).serialize();
    var time = (new Date).getTime();
    $(".mailpreload").fadeIn(function() {
        $.ajax({
            type: "POST",
            url: "ajax/sendpwd.php",
            data: serialize
        }).done(function(msg) {
            $(".sendresponse").html(msg).fadeIn();
            $(".mailpreload").fadeOut();
            $("#captcha").attr("src", "captcha/img.php?" + time);
            if ($("#grecaptcha").length) {
                grecaptcha.reset()
            }
            $("#sendpwd .panel-body input").val("")
        }).fail(function(jqXHR, textStatus) {
            $(".mailpreload").fadeOut();
            $(".sendresponse").html('<div class="alert alert-danger">Error connecting: ajax/sendpwd.php</div>').fadeIn();
            console.log(jqXHR);
            $("#captcha").attr("src", "captcha/img.php?" + time);
            if ($("#grecaptcha").length) {
                grecaptcha.reset()
            }
        })
    })
});

function randomstring() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function passwidget() {
    if ($("#use_pass").prop("checked")) {
        $(".seclink").show()
    } else {
        $(".seclink").hide()
    }
    $(".sharelink, .passlink").val("");
    $(".shalink, .openmail").hide();
    $("#sendfiles").removeClass("in");
    $(".passlink").prop("readonly", false);
    $(".createlink-wrap").fadeIn()
}
$(document).on("change", "#use_pass", function() {
    $(".alert").alert("close");
    passwidget()
});
$(document).on("change", ".btn-file :file", function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
    input.trigger("fileselect", [numFiles, label])
});
var selectedfiles = [];
$(document).on("click", "#selectall", function(e) {
    e.preventDefault();
    $(".selecta").prop("checked", !$(".selecta").prop("checked"));
    checkSelecta()
});
$(document).on("click", ".gridview .name", function(e) {
    var $rowa = $(this).parent(".rowa");
    var $selecta = $rowa.find(".selecta");
    $selecta.prop("checked", !$selecta.prop("checked"));
    checkSelecta()
});

function checkSelecta() {
    $(".selecta").each(function() {
        var $rowa = $(this).closest(".rowa");
        var thisval = $(this).val();
        var indexval = selectedfiles.indexOf(thisval);
        if ($(this).prop("checked")) {
            $rowa.addClass("attivo");
            if (indexval === -1) {
                selectedfiles.push(thisval)
            }
        } else {
            $rowa.removeClass("attivo");
            if (indexval !== -1) {
                selectedfiles.splice(indexval, 1)
            }
        }
    });
    if ($(".selecta:checked").length > 0) {
        $(".groupact, .manda").attr("disabled", false)
    } else {
        $(".groupact, .manda").attr("disabled", true)
    }
}

function getHighest($array) {
    var biggest = Math.max.apply(null, $array);
    return biggest
}

function placeHolderheight() {
    $(".gridview .grid-item-title span").each(function() {
        var divWidthBefore = $(this).parent().width();
        $(this).css("width", "auto");
        var divWidth = $(this).outerWidth();
        $(this).css("width", "");
        if (divWidth > divWidthBefore) {
            $(this).addClass("overflowed")
        } else {
            $(this).removeClass("overflowed")
        }
    })
}

function updateSession($data) {
    $.ajax({
        method: "POST",
        url: "ajax/session.php",
        data: $data
    }).fail(function(jqXHR, textStatus) {
        console.log("updateSession() Request failed: " + textStatus)
    })
}
$(document).on("click", ".switchview", function(e) {
    var $switcher = $(this);
    var $table = $switcher.closest(".tableblock").find(".dataTable");
    e.preventDefault();
    $table.animate({
        opacity: 0
    }, 300, "linear", function() {
        if ($switcher.hasClass("grid")) {
            $switcher.removeClass("grid");
            $table.addClass("listview").removeClass("gridview");
            updateSession({
                listview: "list"
            });
            fileTable.columns.adjust()
        } else {
            $switcher.addClass("grid");
            $table.addClass("gridview").removeClass("listview");
            updateSession({
                listview: "grid"
            })
        }
        placeHolderheight();
        $table.animate({
            opacity: 1
        }, 300, "linear")
    })
});
$(window).resize(function() {
    placeHolderheight()
});
$(document).on("change", ".selecta", function() {
    checkSelecta()
});
$(document).on("click", ".selectallusers", function() {
    $(".selectme").prop("checked", !$(".selectme").prop("checked"));
    checkNotiflist()
});

function checkNotiflist() {
    var anyUserChecked = $("#userslist :checkbox:checked").length > 0;
    if (anyUserChecked == true) {
        $(".check-notif").removeClass("bi-circle").addClass("bi-check-circle-fill")
    } else {
        $(".check-notif").removeClass("bi-check-circle-fill").addClass("bi-circle")
    }
}
var folderTable;
var fileTable;

function callTables(tablesettings, filetableconfig, foldertableconfig) {
    var paginationTemplate = {
        emptyTable: "--",
        info: "_START_-_END_ / _TOTAL_ ",
        infoEmpty: "",
        infoFiltered: "",
        infoPostFix: "",
        lengthMenu: "_MENU_",
        loadingRecords: "...",
        processing: '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>',
        search: '<i class="bi bi-search"></i> ',
        zeroRecords: "--"
    };
    if (tablesettings.direction == "rtl") {
        paginationTemplate.paginate = {
            last: '<i class="bi bi-chevron-double-left"></i>',
            first: '<i class="bi bi-chevron-double-right"></i>',
            next: '<i class="bi bi-chevron-left"></i>',
            previous: '<i class="bi bi-chevron-right"></i>'
        }
    } else {
        paginationTemplate.paginate = {
            first: '<i class="bi bi-chevron-double-left"></i>',
            last: '<i class="bi bi-chevron-double-right"></i>',
            previous: '<i class="bi bi-chevron-left"></i>',
            next: '<i class="bi bi-chevron-right"></i>'
        }
    }
    var fileslen = filetableconfig.ilength;
    var filesdom = '<"table-controls-top"f';
    if (filetableconfig.paginate == "on") {
        filesdom += "l"
    } else {
        fileslen = -1
    }
    filesdom += ">";
    if (filetableconfig.paginate == "on" && filetableconfig.top_pagination == "on") {
        filesdom += '<"table-controls-bottom"ip>'
    }
    filesdom += "rt";
    if (filetableconfig.paginate == "on") {
        filesdom += '<"table-controls-bottom"ip>'
    }
    fileTable = $("#filetable").DataTable({
        dom: filesdom,
        language: paginationTemplate,
        searching: filetableconfig.show_search,
        searchDelay: 800,
        pageLength: fileslen,
        pagingType: filetableconfig.pagination_type,
        columnDefs: [{
            width: "50%",
            targets: [2]
        }, {
            width: "10%",
            targets: [3]
        }, {
            width: "20%",
            targets: [4]
        }],
        processing: true,
        serverSide: true,
        ajax: {
            url: "ajax/get-files.php",
            data: {
                dir_b64: tablesettings.dir_b64
            }
        },
        order: [
            [filetableconfig.sort_col, filetableconfig.sort_order]
        ],
        columns: filetableconfig.columns,
        createdRow: function(row, data, index) {
            $(row).addClass("rowa");
            if ($(row).find(".thumb").length || $(row).find(".vid").length) {
                $(row).addClass("gallindex")
            }
        },
        drawCallback: function(settings) {
            $(".selecta").prop("checked", false);
            $.each(selectedfiles, function(index, item) {
                $('.selecta[value="' + item + '"]').prop("checked", true)
            });
            checkSelecta();
            $('[data-bs-toggle="tooltip"]').tooltip();
            var imgs = $(this).find(".thumb img");
            var count = imgs.length;
            imgs.on("load", function() {
                count--;
                if (!count) {
                    placeHolderheight()
                }
            }).each(function() {
                if (this.complete) {
                    $(this).trigger("load")
                }
            });
            var api = this.api();
            var pageinfo = api.page.info();
            var paginateRow = $(this).parent().find(".dataTables_paginate");
            if (pageinfo.recordsDisplay <= api.page.len()) {
                paginateRow.css("display", "none")
            } else {
                paginateRow.css("display", "block")
            }
            placeHolderheight();
            if ($(".sm2_button").length && PMinlinePlayer !== null) {
                PMinlinePlayer.removeEventHandler(document, "click", PMinlinePlayer.handleClick);
                PMinlinePlayer.init()
            }
        },
        initComplete: function() {
            checkSelecta();
            placeHolderheight();
            $(this).closest(".tableblock.ghost").removeClass("ghost-hidden");
            $(this).closest(".pmblock").find(".overload").remove();
            var api = this.api();
            var pageinfo = api.page.info();
            if (pageinfo.recordsDisplay < 1) {
                $(this).closest(".pmblock").hide();
                $(".hidetable").removeClass("d-none")
            } else {
                $(".hidetable").addClass("d-none")
            }
            $("#filetable_wrapper div.dataTables_length").addClass("ms-auto");
            $("#filetable_wrapper .table-controls-top").addClass("d-flex w-100 mb-3");
            $("#filetable_wrapper .table-controls-bottom").addClass("d-flex w-100");
            $("#filetable_wrapper .dataTables_paginate").addClass("ms-auto")
        }
    });
    if (filetableconfig.search) {
        fileTable.search(filetableconfig.search).draw()
    }
    fileTable.on("length.dt", function(e, settings, len) {
        updateSession({
            iDisplayLength: len
        })
    });
    fileTable.on("order.dt", function(e, settings, val) {
        updateSession({
            sort_col: val[0].col,
            sort_order: val[0].dir
        })
    });
    var folderlen = foldertableconfig.dirlength;
    var folderdom;
    if (foldertableconfig.paginate == "on") {
        folderdom = '<"table-controls-top"fl>';
        if (foldertableconfig.top_pagination == "on") {
            folderdom += '<"table-controls-bottom"ip>'
        }
        folderdom += 'rt<"table-controls-bottom"ip>'
    } else {
        folderdom = "rt";
        folderlen = -1
    }
    folderTable = $("#foldertable").DataTable({
        dom: folderdom,
        language: paginationTemplate,
        searchDelay: 800,
        pageLength: folderlen,
        pagingType: foldertableconfig.pagination_type,
        processing: true,
        serverSide: true,
        lengthMenu: [
            [5, 10, 25, 50],
            [5, 10, 25, 50]
        ],
        columnDefs: [{
            width: "5%",
            targets: [0]
        }, {
            width: "60%",
            targets: [1]
        }, {
            width: "20%",
            targets: [2]
        }],
        ajax: {
            url: "ajax/get-dirs.php",
            data: {
                dir_b64: tablesettings.dir_b64
            }
        },
        order: [
            [foldertableconfig.sort_dir_col, foldertableconfig.sort_dir_order]
        ],
        columns: foldertableconfig.columns,
        createdRow: function(row, data, index) {
            $(row).addClass("rowa")
        },
        initComplete: function() {
            $(this).closest(".tableblock.ghost").removeClass("ghost-hidden");
            var api = this.api();
            var pageinfo = api.page.info();
            var paginateRow = $(this).parent().find(".dataTables_paginate");
            if (pageinfo.recordsDisplay < 1) {
                $(this).closest(".pmblock").hide()
            }
            if (pageinfo.recordsDisplay <= api.page.len()) {
                paginateRow.css("display", "none")
            } else {
                paginateRow.css("display", "block")
            }
            $("#foldertable_wrapper div.dataTables_length").addClass("ms-auto");
            $("#foldertable_wrapper .table-controls-top").addClass("d-flex w-100 mb-3");
            $("#foldertable_wrapper .table-controls-bottom").addClass("d-flex w-100");
            $("#foldertable_wrapper .dataTables_paginate").addClass("ms-auto")
        }
    });
    if (foldertableconfig.search) {
        folderTable.search(foldertableconfig.search).draw()
    }
    folderTable.on("length.dt", function(e, settings, len) {
        updateSession({
            dirlength: len
        })
    });
    folderTable.on("order.dt", function(e, settings, val) {
        updateSession({
            sort_dir_col: val[0].col,
            sort_dir_order: val[0].dir
        })
    })
}

function printSearch(result, lang_files, lang_folders) {
    var response_holder = $("#global-search").find(".modal_response");
    var responsedir = "";
    var responsefile = "";
    if (result.dirlist.length) {
        responsedir = '<h4 class="pt-4 pb-2"><i class="bi bi-folder"></i> ' + lang_folders + "</h4>";
        responsedir += "<ul>";
        $.each(result.dirlist, function(i, item) {
            responsedir += '<li><a href="' + item.link + '"><i class="bi bi-chevron-right"></i> ' + item.location + "/ <strong>" + item.name + "</strong></a></li>"
        });
        responsedir += "</ul>"
    }
    if (result.filelist.length) {
        responsefile = '<h4 class="pt-4 pb-2"><i class="bi bi-file-earmark"></i> ' + lang_files + "</h4>";
        responsefile += "<ul>";
        $.each(result.filelist, function(i, item) {
            responsefile += '<li><a href="' + item.link + '"><i class="bi bi-chevron-right"></i> ' + item.location + "/ <strong>" + item.name + "</strong></a></li>"
        });
        responsefile += "</ul>"
    }
    if (!result.filelist.length && !result.dirlist.length) {
        responsedir = '<h4 class="text-center py-4">' + result.no_items + "</h4>"
    }
    var total = result.count_total;
    var filtered = result.count_filtered;
    var numbers = '<div class="form-group">' + filtered + " / " + total + "</div>";
    var resultHtml = responsedir + responsefile;
    $(response_holder).fadeOut(function() {
        $(this).html(resultHtml).append(numbers).fadeIn()
    })
}

function initSearch(lang_files, lang_folders) {
    $("#s-input").on("input", function() {
        if ($(this).val().length > 1) {
            $("#search-form").removeClass("disabled");
            $(".submit-search").removeClass("disabled")
        } else {
            $("#search-form").addClass("disabled");
            $(".submit-search").addClass("disabled")
        }
    });
    $("#search-form").on("submit", function(e) {
        e.preventDefault();
        if (!$(this).hasClass("disabled")) {
            $(this).addClass("disabled");
            $(".submit-search").addClass("disabled");
            var response_holder = $(this).find(".modal_response");
            var search = $(this).find("#s-input").val();
            if (search.length) {
                $(response_holder).html('<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
                $.ajax({
                    cache: false,
                    type: "GET",
                    dataType: "json",
                    url: "ajax/get-search.php?s=" + search
                }).done(function(msg) {
                    printSearch(msg, lang_files, lang_folders)
                }).fail(function() {
                    $(response_holder).html("ERROR connecting get-search.php")
                })
            }
        }
    })
}

function removeQS(url, parameter) {
    var urlparts = url.split("?");
    if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(parameter) + "=";
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1)
            }
        }
        url = urlparts[0] + "?" + pars.join("&");
        return url
    } else {
        return url
    }
}

function createZip(files, folder, dash, time = false, onetime = false) {
    $prettylinks = pmvars.settings.prettylinks;
    time = time || pmmodals.share.time;
    var arrows = '<i class="bi bi-chevron-double-right fs-1 passing-animated d-inline-block"></i>';
    $("#zipmodal .ziparrow").html(arrows);
    var myModal = new bootstrap.Modal(document.getElementById("zipmodal"));
    myModal.show();
    sendData = {
        files: files,
        folder: folder,
        time: time,
        dash: dash
    };
    if (onetime) {
        sendData.onetime = onetime
    }
    $.ajax({
        cache: false,
        type: "POST",
        url: "ajax/zip.php?t=" + (new Date).getTime(),
        data: sendData
    }).done(function(msg) {
        var json = JSON.parse(msg);
        var message;
        if (json.error == false) {
            var link = pmvars.settings.prettylinks == true ? "download/zip/" + json.json + "/n/" + json.supah : "pm-downloader.php?zip=" + json.json + "&n=" + json.supah;
            message = '<div class="d-grid gap-2"><a class="btn btn-primary btn-lg downzip" href="' + link + '"><i class="bi bi-download"></i> ' + json.name + "</a></div>"
        } else {
            message = json.error;
            $("#zipmodal .ziparrow").html('<i class="bi bi-x-circle fs-1"></i>')
        }
        $("#zipmodal .modal-body").html(message)
    }).fail(function() {
        alert("ERROR preparing zip")
    })
}

function callBindZip($message) {
    var bindZip = function(event) {
        var folder = $(this).data("zip");
        var foldername = $(this).data("thisname");
        var dash = $(this).data("dash");
        var $fullmessage = $message + ": <strong>" + foldername + "</strong>";
        event.preventDefault();
        $(document).off("click", ".zipdir");
        bootbox.confirm({
            title: '<i class="bi bi-file-earmark-zip"></i>',
            message: $fullmessage,
            callback: function(result) {
                $(document).on("click", ".zipdir", bindZip);
                if (result) {
                    createZip(false, folder, dash)
                }
            }
        })
    };
    $(document).on("click", ".zipdir", bindZip)
}

function setupZip() {
    callBindZip(strings_confirm_folder_download);
    $(document).on("click", ".multid", function(e) {
        e.preventDefault();
        if (selectedfiles.length > 0) {
            createZip(selectedfiles, false, pmmodals.share.hash)
        } else {
            alert($selectfiles)
        }
    });
    $(document).on("click", "#zipmodal .downzip", function() {
        $("#zipmodal").modal("hide");
        $(this).remove()
    })
}

function createShareLink() {
    if (pmmodals.hasOwnProperty("share")) {
        var $insert4 = pmmodals.share.insert4,
            $time = pmmodals.share.time,
            $hash = pmmodals.share.hash,
            $pulito = pmmodals.share.pulito,
            $selectfiles = pmmodals.share.selectfiles,
            $prettylinks = pmmodals.share.prettylinks;
        var divar = selectedfiles;
        var zipPreloader = '<i class="bi bi-files display-2"></i> <i class="bi bi-chevron-double-right fs-1 passing-animated d-inline-block"></i> <i class="bi bi-file-earmark-zip display-2"></i>';
        $(document).on("click", "#createlink", function() {
            $(".alert").alert("close");
            var alertmess = '<div class="alert alert-warning alert-dismissible" role="alert">' + $insert4 + "</div>";
            var shortlink, passw;
            if ($("#use_pass").prop("checked")) {
                if (!$(".setpass").val()) {
                    passw = randomstring()
                } else {
                    if ($(".setpass").val().length < 4) {
                        $(".setpass").focus();
                        $(".seclink").after(alertmess);
                        return
                    } else {
                        passw = $(".setpass").val()
                    }
                }
            }
            $.ajax({
                cache: false,
                type: "POST",
                url: "ajax/shorten.php",
                data: {
                    atts: divar.join(","),
                    time: $time,
                    hash: $hash,
                    pass: passw
                }
            }).done(function(msg) {
                shortlink = $pulito + "/?dl=" + msg;
                $(".sharelink").val(shortlink);
                $(".sharebutt").attr("href", shortlink);
                $(".passlink").val(passw);
                $(".passlink").prop("readonly", true);
                $(".createlink-wrap").fadeOut("fast", function() {
                    $(".shalink, .openmail").fadeIn()
                })
            }).fail(function() {
                console.log("ERROR generating shortlink")
            })
        });
        $(document).on("keyup keypress", "#sendfiles :input:not(textarea)", function(event) {
            if (event.keyCode == 13) {
                event.preventDefault()
            }
        });
        $(document).on("click", ".manda", function() {
            var divar = [];
            var numfiles = selectedfiles.length;
            if (numfiles > 0) {
                divar = selectedfiles;
                $(".addest").val("");
                $(".shownext").addClass("hidden");
                $(".bcc-address").remove();
                $(".seclink, .shalink, .mailresponse, .openmail").hide();
                $("#sendfiles").removeClass("in");
                $(".sharelink, .passlink").val("");
                $(".sharebutt").attr("href", "#");
                $(".createlink-wrap").fadeIn();
                passwidget();
                $(".attach").val(divar.join(","));
                $(".numfiles").html(numfiles);
                var myModal = new bootstrap.Modal(document.getElementById("sendfilesmodal"));
                myModal.show();
                $("#sendfiles").unbind("submit").submit(function(event) {
                    event.preventDefault();
                    $(".mailpreload").fadeIn();
                    var now = $.now();
                    $.ajax({
                        cache: false,
                        type: "POST",
                        url: "ajax/sendfiles.php?t=" + now,
                        data: $("#sendfiles").serialize()
                    }).done(function(msg) {
                        $(".mailresponse").html('<div class="alert alert-success">' + msg + "</div>").fadeIn();
                        $(".addest").val("");
                        $(".shownext").addClass("hidden");
                        $(".bcc-address").remove();
                        $(".mailpreload").fadeOut()
                    }).fail(function() {
                        $(".mailpreload").fadeOut();
                        $(".mailresponse").html('<div class="alert alert-danger">Error connecting sendfiles.php</div>')
                    })
                })
            } else {
                alert($selectfiles)
            }
        })
    }
    $(document).on("click", ".zipshare", function(e) {
        e.preventDefault();
        var wrapper = $(this).parent();
        wrapper.html("");
        var downloadlist = $(this).data("downloadlist").split(",");
        var dash = $(this).data("hash");
        var time = $(this).data("time");
        var onetime = $(this).data("onetime");
        createZip(downloadlist, false, dash, time, onetime)
    });
    $(document).on("click", ".downzipshare", function() {
        $(this).remove()
    })
}
$(document).on("click", ".shownext", function() {
    var $lastinput = $(this).parent().prev().find(".form-group:last-child .addest");
    if ($lastinput.val().length < 5) {
        $lastinput.focus()
    } else {
        var $newdest, $inputgroup, $addon, $input;
        $input = $('<input name="send_cc[]" type="email" class="form-control addest">');
        $addon = $('<span class="input-group-text"><i class="bi bi-envelope"></i></span>');
        $inputgroup = $('<div class="input-group"></div>').append($addon).append($input);
        $newdest = $('<div class="form-group bcc-address mb-3"></div>').append($inputgroup);
        $(".wrap-dest").append($newdest)
    }
});
$(document).on("input", "#dest", function() {
    if ($(this).val().length > 5) {
        $(".shownext").removeClass("hidden")
    } else {
        $(".shownext").addClass("hidden")
    }
});

function setupDelete() {
    if (pmmodals.hasOwnProperty("delete")) {
        var $confirmthisdel = pmmodals.delete.confirmthisdel,
            $confirmdel = pmmodals.delete.confirmdel,
            $time = pmmodals.delete.time,
            $hash = pmmodals.delete.hash,
            $selectfiles = pmmodals.delete.selectfiles;
        var delSingle = function(event) {
            event.preventDefault();
            $(document).off("click", ".del");
            var dest = $(this).data("link");
            var message = " <strong>" + $(this).data("name") + "<strong>";
            bootbox.confirm({
                title: '<i class="bi bi-trash"></i>',
                message: $confirmthisdel + message,
                callback: function(result) {
                    $(document).on("click", ".del", delSingle);
                    if (result) {
                        window.location.href = dest
                    }
                }
            })
        };
        $(document).on("click", ".del", delSingle);
        var delMulti = function(event) {
            event.preventDefault();
            $(document).off("click", ".removelink");
            bootbox.confirm({
                title: '<i class="bi bi-trash"></i>',
                message: $confirmdel,
                callback: function(answer) {
                    $(document).on("click", ".removelink", delMulti);
                    var deldata = $("#delform").serializeArray();
                    if (answer) {
                        $.ajax({
                            type: "POST",
                            url: "ajax.php",
                            data: deldata
                        }).done(function(msg) {
                            if (msg == "ok") {
                                var location = removeQS(window.location.href, "response");
                                location = removeQS(location, "del");
                                window.location = location
                            } else {
                                $(".delresp").html(msg)
                            }
                        }).fail(function() {
                            $(".delresp").html("error connecting to ajax.php")
                        })
                    }
                }
            })
        };
        $(document).on("click", ".removelink", delMulti);
        $(document).on("click", ".multic", function(e) {
            e.preventDefault();
            var divar = [];
            var numfiles = selectedfiles.length;
            if (numfiles > 0) {
                divar = selectedfiles;
                $("#delform").append('<input type="hidden" name="setdel" value="' + divar + '">');
                $("#delform").append('<input type="hidden" name="t" value="' + $time + '">');
                $("#delform").append('<input type="hidden" name="h" value="' + $hash + '">');
                $("#deletemulti .numfiles").html(numfiles);
                var myModal = new bootstrap.Modal(document.getElementById("deletemulti"));
                myModal.show()
            } else {
                alert($selectfiles)
            }
        })
    }
}

function pupulateMoveCopyform($selectfiles, $time, $hash) {
    var divar = [];
    var numfiles = selectedfiles.length;
    if (numfiles > 0) {
        divar = selectedfiles;
        $(".moveform").append('<input type="hidden" name="setmove" value="' + divar + '">');
        $(".moveform").append('<input type="hidden" name="t" value="' + $time + '">');
        $(".moveform").append('<input type="hidden" name="h" value="' + $hash + '">')
    } else {
        alert($selectfiles)
    }
}

function setupFolderTree() {
    if (pmmodals.hasOwnProperty("foldertree")) {
        var currentdir = pmmodals.foldertree.currentdir,
            __root = pmmodals.foldertree.root;
        $(".archive-map").on("show.bs.modal", function(event) {
            var button = $(event.relatedTarget);
            var action = button.data("action");
            var modal = $(this);
            var wrapresult = modal.find(".modal-result");
            if (!wrapresult.hasClass("loaded")) {
                wrapresult.html('<div class="position-relative w-100 h-100 top-0 start-0"><div class="cta">div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div></div>');
                var request = $.ajax({
                    url: "ajax/get-filetree.php",
                    method: "POST",
                    data: {
                        action: action,
                        currentdir: currentdir,
                        __root: __root
                    }
                });
                request.done(function(msg) {
                    wrapresult.html(JSON.parse(msg)).addClass("loaded");
                    treeToggler()
                });
                request.fail(function(jqXHR, textStatus) {
                    wrapresult.html("Request failed: " + textStatus)
                })
            }
        })
    }
}

function treeToggler() {
    $(".toggle-tree").on("click", function() {
        $(this).next("ul").slideToggle();
        $(this).find(".tree-toggler").toggleClass("bi-dash-square bi-plus-square")
    });
    $(".toggle-all-tree").on("click", function() {
        var treetoggler = $(this).find(".tree-toggler");
        treetoggler.toggleClass("bi-dash-square-fill bi-plus-square-fill");
        if (treetoggler.hasClass("bi-dash-square-fill")) {
            $(".toggle-tree").each(function() {
                $(this).next("ul").show();
                $(this).find(".tree-toggler").removeClass("bi-plus-square").addClass("bi-dash-square")
            })
        } else {
            $(".toggle-tree").each(function() {
                $(this).next("ul").hide();
                $(this).find(".tree-toggler").removeClass("bi-dash-square").addClass("bi-plus-square")
            })
        }
    })
}

function setupMove() {
    if (pmmodals.hasOwnProperty("move")) {
        var $selectfiles = pmmodals.move.selectfiles,
            $time = pmmodals.move.time,
            $hash = pmmodals.move.hash;
        $(document).on("click", ".multimove", function(e) {
            e.preventDefault();
            $("#archive-map-move .moveform").html("");
            $("#archive-map-move .hiddenalert").html("");
            pupulateMoveCopyform($selectfiles, $time, $hash)
        });
        $(document).on("click", ".multicopy", function(e) {
            e.preventDefault();
            $("#archive-map-copy .moveform").html("");
            $("#archive-map-copy .hiddenalert").html("");
            $("#archive-map-copy .moveform").append('<input type="hidden" name="copy" value="1">');
            pupulateMoveCopyform($selectfiles, $time, $hash)
        });
        $(document).on("click", ".movelink", function(e) {
            e.preventDefault();
            var dest = $(this).data("dest");
            var $hiddenalert = $(this).closest(".modal-body").find(".hiddenalert");
            var $moveform = $(this).closest(".modal-body").find(".moveform");
            $moveform.append('<input type="hidden" name="dest" value="' + dest + '">');
            var movedata = $moveform.serializeArray();
            $.ajax({
                cache: false,
                type: "POST",
                url: "ajax.php?tm=" + (new Date).getTime(),
                data: movedata
            }).done(function(msg) {
                if (msg == "ok") {
                    var location = removeQS(window.location.href, "response");
                    location = removeQS(location, "del");
                    window.location = location
                } else {
                    var alert = '<div class="alert alert-danger" role="alert">' + msg + "</div>";
                    $hiddenalert.html(alert)
                }
            }).fail(function() {
                var alert = '<div class="alert alert-danger" role="alert">Error connecting ajax.php</div>';
                $hiddenalert.html(alert)
            })
        })
    }
}

function b64DecodeUnicode(str) {
    return decodeURI(decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join("")))
}
if ($("body").data("ping")) {
    var audio_ping = new Audio("" + $("body").data("ping"))
}
bootbox.addLocale("pm", {
    OK: strings_ok,
    CANCEL: strings_cancel,
    CONFIRM: strings_confirm
});
bootbox.setLocale("pm");
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $(".to-top").fadeIn()
        } else {
            $(".to-top").fadeOut()
        }
    });
    $(".to-top").on("click", function(event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false
    });
    if (pmvars.hasOwnProperty("tables")) {
        callTables(pmvars.tables.settings, pmvars.tables.files, pmvars.tables.folders)
    }
    setupZip();
    setupMove();
    setupFolderTree();
    setupDelete();
    createShareLink();
    initSearch(strings_files, strings_folders);
    if (pmvars.hasOwnProperty("avatar")) {
        Avatars(pmvars.avatar.username)
    }
    if (pmvars.hasOwnProperty("uploaders")) {
        if ($("#upForm").length) {
            resumableJsSetup(pmvars.uploaders.android, pmvars.uploaders.currentdir, strings_browse, pmvars.uploaders.singleprogress, pmvars.uploaders.chunksize)
        }
    }
    $("#userslist :checkbox").change(function() {
        checkNotiflist()
    });
    $(".groupact, .manda, .upfolder").attr("disabled", true);
    checkSelecta();
    $(".upfolder-over").on("click", function() {
        $(".upload_dirname").focus()
    });
    $(".upload_dirname").keyup(function() {
        if ($(this).val().length > 0) {
            $(".upfolder-over").hide();
            $(".upfolder").attr("disabled", false)
        } else {
            $(".upfolder-over").show();
            $(".upfolder").attr("disabled", true)
        }
    });
    $('[data-bs-toggle="tooltip"]').tooltip();
    callClipboards();
    if ($(".toast-container").length) {
        $(".toast").each(function() {
            var toast = new bootstrap.Toast($(this)[0]);
            toast.show()
        });
        $(".toast-container").removeClass("d-none")
    }
});