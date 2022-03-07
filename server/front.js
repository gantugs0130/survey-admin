module.exports = function (manifest) {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <title>Hi-Charge</title>
          
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script></script>
      </head>
      <body class="double-diagonal dark">
        <div id="wrap" ></div> 
        <script src=${
            process.env.NODE_ENV === "development" ? "/dist/front.js" : manifest["front.js"]
        }></script>
      </body>
    </html>
  `;
};
