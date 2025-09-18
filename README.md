## Development

This is a [Vocs](https://vocs.dev) project bootstrapped with the Vocs CLI.

```
pnpm install
pnpm dev
```


## Deploy Vocs on Vercel (Quick Guide)

You can easily deploy Vocs using [Vercel](https://vercel.com). Follow these simple steps:

* Go to your Vercel dashboard and click **Add New** > **Project**.
* Select **Import Git Repository** and choose your forked Vocs repository.
* In the **New Project** setup:

  * Set **Framework Preset** to `Other`.
  * Set the **Root Directory** to `.` (root directory).
* Click **Deploy**.

After deployment is complete, your Vocs instance will be live on your Vercel domain. 🎉


## Documentation Guidelines

1. **Adding Sections to the Table of Contents (TOC)**

    To add new sections to the Table of Contents, update the configuration file `vocs.config.ts`. Make sure to modify the appropriate section of the config so that your new pages or sections appear correctly in the TOC.

2. **Pages Location**

    All documentation pages are located in the `docs/pages` directory. Each page should be added there, following the structure defined in the TOC configuration.

3. **Types Location**

    All types are stored in a separate folder: `docs/pages/types`. The types are used in tables of parameters for methods.

4. **Using the Template**

    A predefined template is available and should be used as the basis for creating all new pages. This ensures consistency in structure and style throughout the documentation.

    `docs/pages/templates/method.mdx`

