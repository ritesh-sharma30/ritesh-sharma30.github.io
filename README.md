# Ritesh Sharma Portfolio

A fully static personal portfolio for Ritesh Sharma, built with HTML, CSS, and vanilla JavaScript. It is designed for direct deployment on GitHub Pages with no build step and no framework runtime.

## Structure

```text
index.html
css/style.css
js/main.js
assets/Ritesh_Sharma_Resume_4.pdf
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static server.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy To GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Choose the branch that contains these files.
6. Choose `/root` as the folder and save.

GitHub Pages will publish the site after the workflow finishes.

## Notes

- No React, Vue, Angular, jQuery, or build tooling is required.
- Animations use CSS, Canvas, `requestAnimationFrame`, and the Intersection Observer API.
- The contact form opens the visitor's email client with a prefilled message.
