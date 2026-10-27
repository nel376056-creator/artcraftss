# Likha Atelier

Likha Atelier is a static, interactive arts and crafts learning website. It
covers aesthetics, craft traditions, design principles, William Morris, and
includes a gallery and learning games.

## Run the website

No package installation or build step is required. Keep the main files and the
`assets` folder together, then either open `index.html` in a browser or serve
the project directory with a local web server:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000> in your browser. For deployment, upload the
project files and the complete `assets` folder, preserving their relative
paths.

## Project files

- `index.html` — page content and section markup.
- `ats.css` — layout, styling, and animations.
- `node.js` — interactive content, navigation, games, gallery, and team cards.
- `assets/images/` — locally bundled gallery photos, portrait, and team photos.
- `assets/IMAGE-CREDITS.txt` — source and license credits for the bundled
  Wikimedia Commons images.
- `dist/` — additional distribution files; the root `index.html` is the
  recommended entry point for the current project.

The gallery photos and William Morris portrait are local files, so those images
do not need Wikimedia to load. Google Fonts are still loaded from Google Fonts;
the site has local fallback fonts if they are unavailable.

## Team photos

The team section uses these files from `assets/images/`:

| Team card | Photo |
| --- | --- |
| Member 1 | `member1.jpg` |
| Member 2 | `member2.jpg` |
| Member 3 | `member3.jpg` |
| Member 4 | `member4.jpg` |
| Member 5 | `member5.jpg` |
| Member 6 | `member6.jpg` |
| Member 7 | `member7.jpg` |
| Instructor | `member8.jpg` |

To add or change a bundled team photo, put the image in `assets/images/` and
set the corresponding filename in the `TEAM` list or instructor card setup in
`node.js`. Keep the image files with the project when deploying.

Team names and roles are editable in the browser and saved to that browser's
local storage. Photos added using the team-card upload control are also saved
in local storage; those uploads are not automatically included in a deployment.
For a photo that should always ship with the site, add it as an asset and map
its filename in `node.js`.

## Credits

The SVG craft illustrations and flying origami animation are embedded in
`node.js`. See `assets/IMAGE-CREDITS.txt` for image attribution and licensing
details.
