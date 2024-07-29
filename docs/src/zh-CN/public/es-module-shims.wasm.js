/* ES Module Shims Wasm 1.5.18 */
(function () {

  const hasWindow = typeof window !== 'undefined';
  const hasDocument = typeof document !== 'undefined';

  const noop = () => {};

  const optionsScript = hasDocument ? document.querySelector('script[type=esms-options]') : undefined;

  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});

  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;

  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;

  const skip = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;

  const mapOverrides = esmsInitOptions.mapOverrides;

  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector('script[nonce]');
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute('nonce');
  }

  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log('%c^^ Module TypeError above is polyfilled and can be ignored ^^', 'font-weight:900;color:#391');
  };

  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;

  function globalHook (name) {
    return typeof name === 'string' ? self[name] : name;
  }

  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes('css-modules');
  const jsonModulesEnabled = enable.includes('json-modules');

  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);

  const baseUrl = hasDocument
    ? document.baseURI
    : `${location.protocol}//${location.host}${location.pathname.includes('/') 
    ? location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1) 
    : location.pathname}`;

  const createBlob = (source, type = 'text/javascript') => URL.createObjectURL(new Blob([source], { type }));

  const eoop = err => setTimeout(() => { throw err });

  const throwError = err => { (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err); };

  function fromParent (parent) {
    return parent ? ` imported from ${parent}` : '';
  }

  let importMapSrcOrLazy = false;

  function setImportMapSrcOrLazy () {
    importMapSrcOrLazy = true;
  }

  // shim mode is determined on initialization, no late shim mode
  if (!shimMode) {
    if (document.querySelectorAll('script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]').length) {
      shimMode = true;
    }
    else {
      let seenScript = false;
      for (const script of document.querySelectorAll('script[type=module],script[type=importmap]')) {
        if (!seenScript) {
          if (script.type === 'module' && !script.ep)
            seenScript = true;
        }
        else if (script.type === 'importmap' && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }

  const backslashRegEx = /\\/g;

  function isURL (url) {
    if (url.indexOf(':') === -1) return false;
    try {
      new URL(url);
      return true;
    }
    catch (_) {
      return false;
    }
  }

  function resolveUrl (relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
  }

  function resolveIfNotPlainOrUrl (relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf('#'), qIdx = parentUrl.indexOf('?');
    if (hIdx + qIdx > -2)
      parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
    if (relUrl.indexOf('\\') !== -1)
      relUrl = relUrl.replace(backslashRegEx, '/');
    // protocol-relative
    if (relUrl[0] === '/' && relUrl[1] === '/') {
      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
    }
    // relative-url
    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
        relUrl.length === 1  && (relUrl += '/')) ||
        relUrl[0] === '/') {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
      // Disabled, but these cases will give inconsistent results for deep backtracking
      //if (parentUrl[parentProtocol.length] !== '/')
      //  throw new Error('Cannot resolve');
      // read pathname from parent URL
      // pathname taken to be part after leading "/"
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf('/') + 1);
        }
        else {
          pathname = parentUrl.slice(8);
        }
      }
      else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
      }

      if (relUrl[0] === '/')
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

      // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z'
      const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;

      const output = [];
      let segmentIndex = -1;
      for (let i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== -1) {
          if (segmented[i] === '/') {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
          continue;
        }
        // new segment - check if it is relative
        else if (segmented[i] === '.') {
          // ../ segment
          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
            continue;
          }
          // ./ segment
          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
            i += 1;
            continue;
          }
        }
        // it is the start of a new segment
        while (segmented[i] === '/') i++;
        segmentIndex = i; 
      }
      // finish reading out the last segment
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
    }
  }

  function resolveAndComposeImportMap (json, baseUrl, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };

    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap);

    if (json.scopes)
      for (let s in json.scopes) {
        const resolvedScope = resolveUrl(s, baseUrl);
        resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, parentMap);
      }

    return outMap;
  }

  function getMatch (path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1)
  }

  function applyPackages (id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null) return;
      return pkg + id.slice(pkgName.length);
    }
  }


  function resolveImportMap (importMap, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), importMap.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
  }

  function resolveAndComposePackages (packages, outPackages, baseUrl, parentMap) {
    for (let p in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && (outPackages[resolvedLhs] !== packages[resolvedLhs])) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p];
      if (typeof target !== 'string')
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl) || target, baseUrl);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p}" -> "${packages[p]}" does not resolve`);
    }
  }

  let dynamicImport = !hasDocument && (0, eval)('u=>import(u)');

  let supportsDynamicImport;

  const dynamicImportCheck = hasDocument && new Promise(resolve => {
    const s = Object.assign(document.createElement('script'), {
      src: createBlob('self._d=u=>import(u)'),
      ep: true
    });
    s.setAttribute('nonce', nonce);
    s.addEventListener('load', () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener('error', _err => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve, reject) => {
          const s = Object.assign(document.createElement('script'), {
            type: 'module',
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = undefined;
          s.ep = true;
          if (nonce)
            s.setAttribute('nonce', nonce);
          // Safari is unique in supporting module script error events
          s.addEventListener('error', cb);
          s.addEventListener('load', cb);
          function cb (_err) {
            document.head.removeChild(s);
            if (self._esmsi) {
              resolve(self._esmsi, baseUrl);
              self._esmsi = undefined;
            }
            else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s.src}).`));
              err = undefined;
            }
          }
          document.head.appendChild(s);
        });
      }
      document.head.removeChild(s);
      delete self._d;
      resolve();
    });
    document.head.appendChild(s);
  });

  // support browsers without dynamic import support (eg Firefox 6x)
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;

  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports('importmap') : false;
  let supportsImportMeta = supportsImportMaps;

  const importMetaCheck = 'import.meta';
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;

  const featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport || supportsImportMaps && !cssModulesEnabled && !jsonModulesEnabled)
      return;

    if (!hasDocument)
      return Promise.all([
        supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop),
        cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace('x', createBlob('', 'text/css')))).then(() => supportsCssAssertions = true, noop),
        jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace('x', createBlob('{}', 'text/json')))).then(() => supportsJsonAssertions = true, noop),
      ]);

    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.setAttribute('nonce', nonce);
      function cb ({ data: [a, b, c, d] }) {
        supportsImportMaps = a;
        supportsImportMeta = b;
        supportsCssAssertions = c;
        supportsJsonAssertions = d;
        resolve();
        document.head.removeChild(iframe);
        window.removeEventListener('message', cb, false);
      }
      window.addEventListener('message', cb, false);

      const importMapTest = `<script nonce=${nonce || ''}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${
      supportsImportMaps ? 'true,true' : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : 'false'}, ${
      jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : 'false'}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${''}/script>`;

      iframe.onload = () => {
        // WeChat browser doesn't support setting srcdoc scripts
        // But iframe sandboxes don't support contentDocument so we do this as a fallback
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s = doc.createElement('script');
          if (nonce)
            s.setAttribute('nonce', nonce);
          s.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s);
        }
      };
      // WeChat browser requires append before setting srcdoc
      document.head.appendChild(iframe);
      // setting srcdoc is not supported in React native webviews on iOS
      // setting src to a blob URL results in a navigation event in webviews
      // document.write gives usability warnings
      if ('srcdoc' in iframe)
        iframe.srcdoc = importMapTest;
      else
        iframe.contentDocument.write(importMapTest);
    });
  });

  /* es-module-lexer 1.0.3 */
  const A=1===new Uint8Array(new Uint16Array([1]).buffer)[0];function parse(E,g="@"){if(!C)return init.then((()=>parse(E)));const I=E.length+1,o=(C.__heap_base.value||C.__heap_base)+4*I-C.memory.buffer.byteLength;o>0&&C.memory.grow(Math.ceil(o/65536));const D=C.sa(I-1);if((A?B:Q)(E,new Uint16Array(C.memory.buffer,D,I)),!C.parse())throw Object.assign(new Error(`Parse error ${g}:${E.slice(0,C.e()).split("\n").length}:${C.e()-E.lastIndexOf("\n",C.e()-1)}`),{idx:C.e()});const J=[],K=[];for(;C.ri();){const A=C.is(),Q=C.ie(),B=C.ai(),g=C.id(),I=C.ss(),o=C.se();let D;C.ip()&&(D=w(E.slice(-1===g?A-1:A,-1===g?Q+1:Q))),J.push({n:D,s:A,e:Q,ss:I,se:o,d:g,a:B});}for(;C.re();){const A=C.es(),Q=C.ee(),B=C.els(),g=C.ele(),I=E.slice(A,Q),o=I[0],D=B<0?void 0:E.slice(B,g),J=D?D[0]:"";K.push({s:A,e:Q,ls:B,le:g,n:'"'===o||"'"===o?w(I):I,ln:'"'===J||"'"===J?w(D):D});}function w(A){try{return (0,eval)(A)}catch(A){}}return [J,K,!!C.f()]}function Q(A,Q){const B=A.length;let C=0;for(;C<B;){const B=A.charCodeAt(C);Q[C++]=(255&B)<<8|B>>>8;}}function B(A,Q){const B=A.length;let C=0;for(;C<B;)Q[C]=A.charCodeAt(C++);}let C;const init=WebAssembly.compile((E="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lApBACgC4AkhAkEBECYhAwJAAkACQEEAKAKUCiIEIAFHDQAgAxAlRQ0BCwJAAkACQAJAIANBKkYNACADQfsARw0BQQAgBEECajYClApBARAmIQRBACgClAohAQNAAkACQCAEQf//A3EiA0EiRg0AIANBJ0YNACADECgaQQAoApQKIQMMAQsgAxAYQQBBACgClApBAmoiAzYClAoLQQEQJhoCQCABIAMQKSIEQSxHDQBBAEEAKAKUCkECajYClApBARAmIQQLQQAoApQKIQMgBEH9AEYNAyADIAFGDQYgAyEBIANBACgCmApNDQAMBgsLQQAgBEECajYClApBARAmGkEAKAKUCiIDIAMQKRoMAgtBAEEAOgD4CQJAAkACQAJAAkACQCADQZ9/ag4MAggEAQgDCAgICAgFAAsgA0H2AEYNBAwHCyAEIARBDmpBAEEAEAIPC0EAIARBCmo2ApQKQQEQJhpBACgClAohBAtBACAEQRBqNgKUCgJAQQEQJiIEQSpHDQBBAEEAKAKUCkECajYClApBARAmIQQLQQAoApQKIQMgBBAoGiADQQAoApQKIgQgAyAEEAJBAEEAKAKUCkF+ajYClAoPCwJAIAQpAAJC7ICEg7COwDlSDQAgBC8BChAeRQ0AQQAgBEEKajYClApBARAmIQRBACgClAohAyAEECgaIANBACgClAoiBCADIAQQAkEAQQAoApQKQX5qNgKUCg8LQQAgBEEEaiIENgKUCgtBACAEQQRqIgM2ApQKQQBBADoA+AkCQANAQQAgA0ECajYClApBARAmIQRBACgClAohAyAEEChBIHJB+wBGDQFBACgClAoiBCADRg0EIAMgBCADIAQQAkEBECZBLEcNAUEAKAKUCiEDDAALC0EAQQAoApQKQX5qNgKUCg8LQQAgA0ECajYClAoLQQEQJiEEQQAoApQKIQMCQCAEQeYARw0AIANBAmpBnghBBhArDQBBACADQQhqNgKUCiAAQQEQJhAnIAJBEGpBzAkgAhshAwNAIAMoAgAiA0UNAiADQgA3AgggA0EQaiEDDAALC0EAIANBfmo2ApQKCw8LECILvgYBBH9BAEEAKAKUCiIAQQxqIgE2ApQKAkACQAJAAkACQAJAAkACQAJAAkBBARAmIgJBWWoOCAQCAQQBAQEDAAsgAkEiRg0DIAJB+wBGDQQLQQAo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","undefined"!=typeof Buffer?Buffer.from(E,"base64"):Uint8Array.from(atob(E),(A=>A.charCodeAt(0))))).then(WebAssembly.instantiate).then((({exports:A})=>{C=A;}));var E;

  async function _resolve (id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      // b = bare specifier
      b: !urlResolved && !isURL(id)
    };
  }

  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    // will be deprecated in next major
    if (result && result.then)
      result = await result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id) } : _resolve(id, parentUrl);
  } : _resolve;

  // importShim('mod');
  // importShim('mod', { opts });
  // importShim('mod', { opts }, parentUrl);
  // importShim('mod', parentUrl);
  async function importShim (id, ...args) {
    // parentUrl if present will be the last argument
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== 'string')
      parentUrl = baseUrl;
    // needed for shim check
    await initPromise;
    if (importHook) await importHook(id, typeof args[1] !== 'string' ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument)
        processScriptsAndPreloads(true);
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, { credentials: 'same-origin' });
  }

  self.importShim = importShim;

  function defaultResolve (id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }

  function throwUnresolved (id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }

  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };

  function metaResolve (id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }

  importShim.resolve = resolveSync;
  importShim.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim.addImportMap = importMapIn => {
    if (!shimMode) throw new Error('Unsupported in polyfill mode.');
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };

  const registry = importShim._r = {};

  async function loadAll (load, seen) {
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map(dep => loadAll(dep, seen)));
    if (!load.n)
      load.n = load.d.some(dep => dep.n);
  }

  let importMap = { imports: {}, scopes: {} };
  let baselinePassthrough;

  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && !false;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || (type => type === 'classic' || type === 'module');
        HTMLScriptElement.supports = type => type === 'importmap' || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver(mutations => {
          for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === 'SCRIPT') {
                if (node.type === (shimMode ? 'module-shim' : 'module'))
                  processScript(node, true);
                if (node.type === (shimMode ? 'importmap-shim' : 'importmap'))
                  processImportMap(node, true);
              }
              else if (node.tagName === 'LINK' && node.rel === (shimMode ? 'modulepreload-shim' : 'modulepreload')) {
                processPreload(node);
              }
            }
          }
        }).observe(document, {childList: true, subtree: true});
        processScriptsAndPreloads();
        if (document.readyState === 'complete') {
          readyStateCompleteCheck();
        }
        else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();
            if (document.readyState === 'complete') {
              readyStateCompleteCheck();
              document.removeEventListener('readystatechange', readyListener);
            }
          }
          document.addEventListener('readystatechange', readyListener);
        }
      }
    }
    return init;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;

  async function topLevelLoad (url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise) {
    if (!shimMode)
      acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook) await importHook(url, typeof fetchOpts !== 'string' ? fetchOpts : {}, '');
    // early analysis opt-out - no need to even fetch if we have feature support
    if (!shimMode && baselinePassthrough) {
      // for polyfill case, only dynamic import needs a return value here, and dynamic import will never pass nativelyLoaded
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = undefined;
    resolveDeps(load, seen);
    await lastStaticLoadPromise;
    if (source && !shimMode && !load.n && !false) {
      const module = await dynamicImport(createBlob(source), { errUrl: source });
      if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
      return module;
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, { errUrl: load.u });
    // if the top-level load is a shell, run its update function
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
    // when tla is supported, this should return the tla promise as an actual handle
    // so readystate can still correspond to the sync subgraph exec completions
    return module;
  }

  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength) return
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load) URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }

  function urlJsString (url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }

  let lastLoad;
  function resolveDeps (load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;

    for (const dep of load.d)
      resolveDeps(dep, seen);

    const [imports, exports] = load.a;

    // "execution"
    const source = load.S;

    // edge doesnt execute sibling in order, so we fix this up by ensuring all previous executions are explicit dependencies
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : '';

    if (!imports.length) {
      resolvedSource += source;
    }
    else {
      // once all deps have loaded we can inline the dependency resolution blobs
      // and define this blob
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      function pushStringTo (originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      }
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        // dependency source replacements
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            // circular shell creation
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${
              depLoad.a[1].map(({ s, e }, i) => {
                const q = depLoad.S[s] === '"' || depLoad.S[s] === "'";
                return `e$_${i}=m${q ? `[` : '.'}${depLoad.S.slice(s, e)}${q ? `]` : ''}`;
              }).join(',')
            }}${
              depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i) => `e$_${i}`).join(',')};` : ''
            }export {${
              depLoad.a[1].map(({ s, e }, i) => `e$_${i} as ${depLoad.S.slice(s, e)}`).join(',')
            }}\n//# sourceURL=${depLoad.r}?cycle`);
            }
          }

          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;

          // circular shell execution
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = undefined;
          }
          lastIndex = statementEnd;
        }
        // import.meta
        else if (dynamicImportIndex === -2) {
          load.m = { url: load.r, resolve: metaResolve };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        }
        // dynamic import
        else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }

      // support progressive cycle binding updates (try statement avoids tdz errors)
      if (load.s)
        resolvedSource += `\n;import{u$_}from'${load.s}';try{u$_({${exports.filter(e => e.ln).map(({ s, e, ln }) => `${source.slice(s, e)}: ${ln}`).join(',')}})}catch(_){};\n`;

      pushStringTo(source.length);
    }

    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL)
      resolvedSource += '\n//# sourceURL=' + load.r;

    load.b = lastLoad = createBlob(resolvedSource);
    load.S = undefined;
  }

  // ; and // trailer support added for Ruby on Rails 7 source maps compatibility
  // https://github.com/guybedford/es-module-shims/issues/228
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;

  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;

  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;

  // restrict in-flight fetches to a pool of 100
  let p = [];
  let c = 0;
  function pushFetchPool () {
    if (++c > 100)
      return new Promise(r => p.push(r));
  }
  function popFetchPool () {
    c--;
    if (p.length)
      p.shift()();
  }

  async function doFetch (url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue) await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    }
    catch (e) {
      e.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.\n` + e.message;
      throw e;
    }
    finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }

  async function fetchModule (url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get('content-type');
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: 'js' };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: 'json' };
    else if (cssContentType.test(contentType)) {
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${
        JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = '', relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))
      });export default s;`, t: 'css' };
    }
    else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }

  function getOrCreateLoad (url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source)
      return load;

    load = {
      // url
      u: url,
      // response url
      r: source ? url : undefined,
      // fetchPromise
      f: undefined,
      // source
      S: undefined,
      // linkPromise
      L: undefined,
      // analysis
      a: undefined,
      // deps
      d: undefined,
      // blobUrl
      b: undefined,
      // shellUrl
      s: undefined,
      // needsShim
      n: false,
      // type
      t: null,
      // meta
      m: null
    };
    if (registry[url]) {
      let i = 0;
      while (registry[load.u + ++i]);
      load.u += i;
    }
    registry[load.u] = load;

    load.f = (async () => {
      if (!source) {
        // preload fetch options override fetch options (race)
        let t;
        ({ r: load.r, s: source, t } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t && !shimMode) {
          if (t === 'css' && !cssModulesEnabled || t === 'json' && !jsonModulesEnabled)
            throw Error(`${t}-modules require <script type="esms-options">{ "polyfillEnable": ["${t}-modules"] }<${''}/script>`);
          if (t === 'css' && !supportsCssAssertions || t === 'json' && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      }
      catch (e) {
        throwError(e);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();

    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta)
          load.n = true;
        if (d !== -1 || !n) return;
        const { r, b } = await resolve(n, load.r || load.u);
        if (b && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (skip && skip.test(r)) return { b: r };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: undefined });
        return getOrCreateLoad(r, childFetchOpts, load.r).f;
      }))).filter(l => l);
    });

    return load;
  }

  function processScriptsAndPreloads (mapsOnly = false) {
    if (!mapsOnly)
      for (const link of document.querySelectorAll(shimMode ? 'link[rel=modulepreload-shim]' : 'link[rel=modulepreload]'))
        processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? 'script[type=importmap-shim]' : 'script[type=importmap]'))
      processImportMap(script);
    if (!mapsOnly)
      for (const script of document.querySelectorAll(shimMode ? 'script[type=module-shim]' : 'script[type=module]'))
        processScript(script);
  }

  function getFetchOpts (script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === 'use-credentials')
      fetchOpts.credentials = 'include';
    else if (script.crossorigin === 'anonymous')
      fetchOpts.credentials = 'omit';
    else
      fetchOpts.credentials = 'same-origin';
    return fetchOpts;
  }

  let lastStaticLoadPromise = Promise.resolve();

  let domContentLoadedCnt = 1;
  function domContentLoadedCheck () {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event('DOMContentLoaded'));
  }
  // this should always trigger because we assume es-module-shims is itself a domcontentloaded requirement
  if (hasDocument) {
    document.addEventListener('DOMContentLoaded', async () => {
      await initPromise;
      if (shimMode || !baselinePassthrough)
        domContentLoadedCheck();
    });
  }

  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck () {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event('readystatechange'));
  }

  const hasNext = script => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute('noshim') !== null || !(script.ep = true);

  function processImportMap (script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    // we dont currently support multiple, external or dynamic imports maps in polyfill mode to match native
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise
        .then(async () => {
          importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
        })
        .catch(e => {
          console.log(e);
          if (e instanceof SyntaxError)
            e = new Error(`Unable to parse import map ${e.message} in: ${script.src || script.innerHTML}`);
          throwError(e);
        });
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }

  function processScript (script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    // does this load block readystate complete
    const isBlockingReadyScript = script.getAttribute('async') === null && readyStateCompleteCnt > 0;
    // does this load block DOMContentLoaded
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript) readyStateCompleteCnt++;
    if (isDomContentLoadedScript) domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
  }

  const fetchCache = {};
  function processPreload (link) {
    if (link.ep) return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }

})();
