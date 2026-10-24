# Vehicle image library

Add model photography under this folder. Keep original files grouped by model and variant; the UI uses predictable paths so images can be mapped without guessing filenames.

## Model Y (already wired into the Model Y page)

```text
public/
└── models/
    └── model-y/
        ├── hero.webp
        ├── exterior.webp
        ├── interior.webp
        └── variants/
            ├── standard/
            │   ├── exterior.webp
            │   ├── interior.webp
            │   ├── front.webp
            │   └── rear.webp
            ├── premium/
            │   ├── exterior.webp
            │   ├── interior.webp
            │   ├── front.webp
            │   └── rear.webp
            ├── long/
            │   ├── exterior.webp
            │   ├── interior.webp
            │   ├── front.webp
            │   └── rear.webp
            └── performance/
                ├── exterior.webp
                ├── interior.webp
                ├── front.webp
                └── rear.webp
```

The Model Y page currently looks for these exact files:

- `/models/model-y/hero.webp` — hero and final CTA image
- `/models/model-y/exterior.webp` — exterior / safety image
- `/models/model-y/interior.webp` — cabin image
- `/models/model-y/variants/standard/exterior.webp`
- `/models/model-y/variants/premium/exterior.webp`
- `/models/model-y/variants/long/exterior.webp`
- `/models/model-y/variants/performance/exterior.webp`

If a local file has not been added yet, the page falls back to a remote image, so an empty image folder will not break the page.

## Future models

Use the same convention for other models:

```text
models/
├── model-3/
│   ├── hero.webp
│   ├── exterior.webp
│   ├── interior.webp
│   └── variants/
│       ├── standard/exterior.webp
│       ├── premium/exterior.webp
│       └── performance/exterior.webp
├── model-s/
│   ├── hero.webp
│   ├── exterior.webp
│   ├── interior.webp
│   └── variants/
│       ├── standard/exterior.webp
│       └── plaid/exterior.webp
├── model-x/
│   ├── hero.webp
│   ├── exterior.webp
│   ├── interior.webp
│   └── variants/
│       ├── standard/exterior.webp
│       └── plaid/exterior.webp
└── roadster/
    ├── hero.webp
    ├── exterior.webp
    ├── interior.webp
    └── variants/
        └── founder-series/exterior.webp
```

### Image naming rules

- Use lowercase names and hyphens only; avoid spaces, parentheses and names such as `final-final-2.webp`.
- Prefer WebP or AVIF for website photography. Keep a sensible source resolution (around 1600–2400 px wide for large images).
- Use consistent framing across variants so switching between cards feels intentional.
- Suggested roles: `hero.webp`, `exterior.webp`, `interior.webp`, `front.webp`, `rear.webp`, `wheel.webp`, `detail-01.webp`.
- Put each image in its model/variant folder rather than uploading everything into one shared folder.
- Adding a file here makes it available at the matching public URL; it does not automatically connect a new model/variant to the UI. The corresponding page/config must reference the exact path.

When you're ready, add the files to GitHub in the matching folders (or upload them to this folder in your editor). Tell me which model and variant folders you populated and I can wire the additional angles into the interactive galleries.
