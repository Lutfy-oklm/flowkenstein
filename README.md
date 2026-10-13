# Flowkenstein

[English](README.md) · [Français](README.fr.md)

**Bring your processes to life.** A free, open-source canvas for drawing and connecting business processes in BPMN 2.0. No account required.

[Open Flowkenstein](https://flowkenstein.com/en) · [Start drawing](https://flowkenstein.com/atelier-en)

## Features

- BPMN tasks, events, gateways, connections and sub-processes.
- Readable swimlanes with alternating colors and consistent heights.
- Smooth pan and zoom, automatic alignment, resizing and a return-to-content button.
- Automatic local saving in the browser.
- Open and save BPMN files; export diagrams as PNG or SVG.
- English and French interfaces, help and information pages.

The editor maps processes; it does not execute workflows or certify business or regulatory compliance.

## Use it

Use the [English website](https://flowkenstein.com/en) or the [French website](https://flowkenstein.com/). You can also open `public/en.html` or `public/index.html` directly from a downloaded copy.

Diagrams are saved on your device, in your browser, for the current website origin. The English and French canvases on the same origin share the same local diagram and view. Switching language changes the interface, while preserving your own diagram labels. Saves do not automatically transfer to another browser, device or domain. Export a BPMN file to keep an independent backup or transfer your work.

## Repository layout

| Location | Contents |
| --- | --- |
| `src/editor.html` | Editor source and French interface |
| `src/home.html` | French homepage source |
| `src/pages.json` | French help and information pages |
| `src/en.json` | English interface translations and page content |
| `public/` | Published pages, logos and source archive |
| `vendor/` | Bundled BPMN library, styles, font, license and audit metadata |
| `scripts/` | Site generation, localization, security headers and packaging |
| `vercel.json` | Deployment routing and security headers |

## Build

With a maintained Node.js release, from the repository root:

```sh
npm run build
```

The editor dependencies are included in `vendor/`. The build downloads nothing and needs no API key. It generates both languages, recalculates the CSP hashes and recreates `public/Flowkenstein-sources.zip`. The archive contains the complete project without Git history, nested archives or private local files.

To change French interface content, edit the HTML templates. To change English content, edit `src/en.json`. `scripts/i18n.cjs` generates language-specific pages and navigation from those sources.

## Deploy

Vercel serves `public/` directly, with no server-side build command. After changing sources, run the build and publish the generated pages and `vercel.json` together with the source changes.

Two historical files, `public/Processia.html` and `public/Processia-icone.svg`, are retained for compatibility. They use the Flowkenstein branding. Old `/Processia` and `/Processia.html` addresses redirect to `/atelier`.

## Security and privacy

Diagrams and imported BPMN files are processed locally in the browser. The repository does not contain user diagrams. Imported files are checked before opening. The bundled library is bpmn-js 18.31.0. `scripts/security.cjs` generates browser security headers and permits only the bundled scripts through CSP hashes.

Do not commit browser saves, screenshots containing user data, personal documents, passwords or access keys. `.gitignore` excludes common local and private files; it does not replace reviewing files before publication.

Read the [privacy policy](https://flowkenstein.com/privacy-en) and [terms of use](https://flowkenstein.com/terms-en).

## Contributing and support

Suggestions and bug reports in English or French are welcome through [GitHub issues](https://github.com/Lutfy-oklm/flowkenstein/issues). Include your browser, steps to reproduce and expected behavior. Do not post confidential diagrams or personal data in public issues.

For security reports or private questions, use the contact address published on the [contact page](https://flowkenstein.com/contact-en).

## License

Original code and artwork are licensed under MIT. bpmn-js retains its own license in `vendor/LICENSE-bpmn-js.txt`; its watermark must remain visible. Third-party components retain their own licenses.
