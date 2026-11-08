# Sarah's Little World

An interactive 3D portfolio set on a floating cherry-blossom island. Explore the garden, meet its animal residents, and discover Sarah's story, skills, projects, and ways to get in touch.

## Explore

- Walk, run, and jump through a hand-built low-poly garden with rolling terrain, flowers, cherry trees, drifting petals, lanterns, clouds, and birds.
- Visit six portfolio stops around a central, walkable wishing fountain.
- Meet seven friendly animals, chat with them, and give them a gentle pet.
- Find 12 glowing memory petals and use the map to locate them.
- Enjoy an automatic day-to-night cycle and 13 changing sky events, including auroras, nebulae, meteor showers, sunrises, and sunsets.
- Listen to original synthesized music with separate day and night themes and a distinct motif for every sky event. Music starts only when enabled.
- Take a screenshot of the scene, change graphics quality, or hide the interface for a clean view.

## Getting started

### Requirements

- A modern browser with WebGL enabled.
- An internet connection to load Three.js and the web fonts from their CDNs.
- A local web server; opening `index.html` directly as a `file://` URL is not supported.

### Run locally

From the project directory, start Python's built-in web server:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. Alternatively, open the folder in VS Code and use Live Server.

## Controls

| Action | Control |
| --- | --- |
| Move | **WASD** or arrow keys |
| Run | Hold **Shift** while moving |
| Jump | **Space** |
| Interact with a nearby sign, animal, bench, or fountain | **E** |
| Switch between first- and third-person | **V** or the **POV** button |
| Look around in first-person | Move the cursor; no dragging required |
| Look around in third-person | Click and drag the scene |
| Change the sky | **N** or the sky button |
| Show or hide the interface | **H** or **Hide UI** |
| Toggle the map | **M** or **Map** |
| Zoom the camera | Mouse wheel |
| Take a scene screenshot | **Photo** |
| Change rendering quality | **Quality** |

On touch screens, use the on-screen movement and jump controls. Nearby interactions are also available through the on-screen prompt.

## Personalize the portfolio

Edit the `PROFILE` object near the top of [`game.js`](./game.js) to update the introduction, About section, interests, skills, projects, journey, social links, and email. Replace the starter copy and placeholder project details with information you want to share. Review every link and contact detail before publishing.

## Project files

| File | Purpose |
| --- | --- |
| [`index.html`](./index.html) | Page structure, interface controls, metadata, and Three.js module loading |
| [`style.css`](./style.css) | Responsive interface styling and visual theme |
| [`game.js`](./game.js) | Three.js scene, interactions, animation, audio, and portfolio content |

## Implementation notes

- Built with vanilla JavaScript and [Three.js](https://threejs.org/) 0.169.0, loaded from jsDelivr; no build step or package installation is required.
- The scene uses procedural geometry and generated textures for its world and interface.
- Repeated scenery uses instanced or batched geometry, and rendering quality can be adjusted in the interface.
- Audio is synthesized with the Web Audio API and remains off until the visitor turns it on.

## Accessibility and privacy

The interface includes keyboard controls, visible focus states, and a reduced-motion preference. The world is rendered in WebGL, so provide the portfolio information in the page content as well if it must be accessible without WebGL. The page loads Three.js and fonts from third-party CDNs; those requests require an internet connection.
