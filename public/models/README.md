# Vehicle image library

Keep original vehicle photography grouped by model and variant. The Model Y page is wired to the AVIF files already uploaded to this repository; it does **not** require converting them to WebP or creating a second Standard folder.

## Model Y asset map

```text
public/models/model-y/
├── Model-Y-Standard.avif
├── Model-Y-Standard (2).avif
├── Model-Y-Standard (3).avif
├── Model-Y-Standard (4).avif
├── Model-Y-Standard (5).avif
├── Model-Y-Standard (6).avif
├── Model-Y-Standard (7).avif
├── Model-Y-Standard (8).avif
└── variants/
    ├── premium/
    │   ├── Model-Y-Premium.avif
    │   ├── Model-Y-Premium (2).avif
    │   ├── Model-Y-Premium Exterior.avif
    │   ├── Model-Y-Premium Exterior (2).avif
    │   ├── Model-Y-Premium Exterior (3).avif
    │   └── Model-Y-Premium-Remote.avif
    ├── long/
    │   ├── Model-Y-L.avif
    │   ├── Model-Y-L (2).avif
    │   ├── Model-Y-L (3).avif
    │   ├── Model-Y-L (4).avif
    │   ├── Model-Y-L-Interior.avif
    │   └── Model-Y-L-Interior (2).avif
    └── performance/
        ├── Model-Y-Performance.avif
        ├── Model-Y-Performance (2).avif
        ├── Model-Y-Performance (3).avif
        ├── Model-Y-Performance-Energy.avif
        └── Model-Y-Performance-Suspension.avif
```

### How the page uses the assets

- **Standard:** images in `public/models/model-y/` are the default Model Y library.
- **Premium:** uses the Premium exterior imagery and the explicitly named remote-feature image for its connected-convenience story.
- **Long:** uses the explicitly named interior images to tell the six-seat / long-wheelbase space story.
- **Performance:** uses the explicitly named Energy and Suspension images for its power-delivery and chassis-control stories.
- Selecting a variant updates its card, reference specifications, story imagery and immersive section copy.
- The page includes remote fallbacks for missing/unavailable images.

The numbered Standard images and several numbered Premium/Long/Performance files do not identify their exact subject in the filename alone. Keep those original names until their visual content is confirmed; do not rename them based on guesses.

## Future models

For other model pages, keep a separate folder per model and use the model's real variant names, for example:

```text
public/models/
├── model-3/
│   └── variants/
├── model-s/
│   └── variants/
├── model-x/
│   └── variants/
└── roadster/
    └── variants/
```

### Asset guidelines

- Keep original AVIF/WebP files if they are supported by the project’s browser targets.
- Prefer descriptive filenames when the subject is known, e.g. `exterior-front.avif`, `interior-second-row.avif`, `wheel-detail.avif`, `suspension.avif`.
- Keep distinct variant imagery in its own variant directory.
- Adding an image file makes it available at its matching public URL; the corresponding page/config must still reference that exact path.
- In browser URLs, the `public/` prefix is omitted: `public/models/model-y/example.avif` is served from `/models/model-y/example.avif`.
