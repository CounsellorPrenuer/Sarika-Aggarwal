import { readFile, writeFile } from "node:fs/promises";

const SITE_BASE = "/Sarika-Aggarwal";
const PATH_SEGMENTS_TO_KEEP = 1;

const spaDecodeIndex = `
    <script type="text/javascript">
      (function(l) {
        if (l.search[1] === "/") {
          var decoded = l.search.slice(1).split("&").map(function(s) {
            return s.replace(/~and~/g, "&");
          }).join("?");
          window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + (decoded ? "?" + decoded : "") + l.hash
          );
        }
      }(window.location));
    </script>`;

const spaRedirect404 = `
    <script type="text/javascript">
      var pathSegmentsToKeep = ${PATH_SEGMENTS_TO_KEEP};
      var l = window.location;
      l.replace(
        l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
        l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") + "/?/" +
        l.pathname.slice(1).split("/").slice(pathSegmentsToKeep).join("/").replace(/&/g, "~and~") +
        (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
        l.hash
      );
    </script>`;

let indexHtml = await readFile("dist/index.html", "utf8");

if (!indexHtml.includes("<base href=")) {
  indexHtml = indexHtml.replace(
    "<head>",
    `<head>\n    <base href="${SITE_BASE}/">${spaDecodeIndex}`,
  );
}

await writeFile("dist/index.html", indexHtml);
await writeFile(
  "dist/404.html",
  indexHtml.replace(spaDecodeIndex, spaRedirect404),
);
await writeFile("dist/.nojekyll", "");
