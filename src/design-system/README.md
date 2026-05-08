# Bahrain Web Design System

Version 1.0

The Bahrain Web Design System is a comprehensive guide designed to streamline the web design process for ministries and entities in Bahrain. It aims to ensure that users receive the best experience when interacting with government websites. This system facilitates collaboration between designers and developers, promoting a consistent and cohesive approach to web development. It serves as the main reference for all Bahrain ministries, guiding them in effectively implementing their digital presence.

## In this page

- [**Features**](#features)
- [**Components and Templates**](#components-and-templates)
    * [Arabic Translated Versions](#arabic-translated-versions)
- [**Web Design System Architecture**](#web-design-architecture)
- [**Design System Organization**](#design-system-organization)
    * [Root Structure](#root-structure)
    * [CSS and SCSS Structure](#css-and-scss-structure)
    * [JS Structure](#js-structure)
- [**Installation**](#installation)
- [**How to use?**](#how-to-use)
    * [Build the Static HTML](#build-the-static-html)
    * [Integrate Directly to CMS or Framework](#integrate-directly-to-cms-or-framework)
- [**Release Summary**](#release-summary)
- [**Suggestions and Feedback**](#suggestions-and-feedback)

## Features

This design system is built with a focus on usability and accessibility, ensuring that it meets the needs of all users, including those with disabilities. Key features include:

- **Accessibility Compliance**: The design system adheres to government guidelines for accessibility, ensuring that all users can navigate and interact with the content effectively. This includes proper use of ARIA roles, keyboard navigation support, and clear visual contrast.

- **49 Components**: A comprehensive library of reusable components, such as buttons, forms, modals, and navigation elements, that are designed for consistency and ease of use.

- **45 Pre-defined Templates**: Ready-to-use templates that cover a variety of common web pages, allowing for quick deployment and customization. These templates serve as a solid foundation for building out your project.

- **Responsive Design**: All components and templates are designed to be responsive, ensuring optimal viewing experiences across a range of devices, from desktops to mobile phones.

- **Performance Optimization**: The design system is optimized for performance, ensuring fast load times and efficient resource use, which is critical for government websites.

[Go to top ↑](#bahrain-web-design-system)

## Components and Templates

The components and templates within this design system are HTML-based, providing a solid foundation for building responsive and accessible websites. There are **49 components** available in both [English](https://github.com/IGA-BH/BH-web-design-system/tree/main/components-html) and [Arabic](https://github.com/IGA-BH/BH-web-design-system/tree/main/components-html-ar), ensuring comprehensive support for developers. Each component is optimized for responsiveness, ensuring that the final website functions seamlessly across various devices and screen sizes.

For more information about components, see [components guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4600-118964&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1). All components in HTML can be browsed [here](https://nea.gov.bh/themes/components-html/landing.html).

In addition to individual components, we offer a selection of **45 pre-defined templates** both [English](https://github.com/IGA-BH/BH-web-design-system/tree/main/html) and [Arabic](https://github.com/IGA-BH/BH-web-design-system/tree/main/html-ar), tailored to meet the diverse needs of ministries. These templates are based on extensive research conducted to identify common requirements across various ministries, ensuring that they align with the expected pages and functionalities.

For more information about templates, see [templates guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4600-118964&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1). All templates in HTML can be browsed [here](https://nea.gov.bh/themes/html/landing.html).

### Arabic Translated Versions

All components and templates are provided with their respective Arabic translated versions, which offer significant advantages for developers:

- **Compliance**: By utilizing the Arabic versions, developers can ensure that the final website meets local language requirements, promoting compliance with government standards.

- **Alignment and Layout**: The translated versions are designed with proper alignment and layout considerations specific to Arabic text, which flows from right to left. This ensures a visually appealing and coherent design that enhances user experience.

- **Cultural Relevance**: The translated components are crafted to reflect local cultural nuances, making it easier for developers to create content that resonates with Arabic-speaking users.

- **Consistency**: Using the Arabic versions helps maintain consistency in design elements and user interface components, ensuring that the website provides a unified experience in both languages.

By leveraging the Arabic translated versions, developers can build compliant, user-friendly websites that cater effectively to the needs of all users in Bahrain.


[Go to top ↑](#bahrain-web-design-system)

## Web Design Architecture

- **Bootstrap**: The design system utilizes [**Bootstrap 5.3**](https://getbootstrap.com/), a popular front-end framework that provides a responsive grid system and extensive pre-built components for faster web development. For detailed information on the grid system, refer to the [grid guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4649-126491&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1).

- **Sass**: The CSS foundation of the design system is built with Sass, which allows for the use of variables, nesting, and modular stylesheets, enhancing maintainability and scalability.

- **Google Fonts**: The typography for the design system employs [**Public Sans**](https://fonts.google.com/specimen/Public+Sans) for English text and Noto Kufi Arabic for Arabic content. Public Sans is a modern, versatile typeface that ensures clarity and readability, while [**Noto Kufi Arabic**](https://fonts.google.com/noto/specimen/Noto+Kufi+Arabic) is designed for legibility in Arabic scripts. For more information, visit the [typography guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4642-123370&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1).

- **Phosphor Icons / Custom Icons**: The design system utilizes [**Phosphor icons**](https://phosphoricons.com/) as the primary icon library, offering a wide range of customizable icons that enhance the user interface. Additionally, custom icon fonts are created using [**IcoMoon**](https://icomoon.io/), allowing for the incorporation of unique icons tailored to specific design needs. For more information, visit the [typography guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4642-123370&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1)

- **jQuery**: The design system incorporates [**jQuery**](https://jquery.com/), a fast and lightweight JavaScript library that simplifies HTML document traversal and manipulation, event handling, and animation. Many modern JavaScript libraries used in this design system depend on jQuery for their core functionalities, making it a foundational tool in web development.

- **JavaScript Libraries**: The design system uses various JavaScript libraries to enhance functionality and user experience. This includes Bootstrap JS libraries for interactive components, [**Dropzone**](https://www.dropzone.dev/) for file uploads, [**Select2**](https://select2.org/) for enhanced select boxes, [**DateRangePicker**](https://www.daterangepicker.com/) for date selection, [**MultiSelect**](https://github.com/nobleclem/jQuery-MultiSelect) for select's multiple item selection, [**SwiperJS**](https://swiperjs.com/) for touch sliders, [**Zebra Tooltips**](https://stefangabos.github.io/Zebra_Tooltips/) for tooltips, [**Odometer**](https://github.hubspot.com/odometer/docs/welcome/) for animated number counters, [**DataTable**](https://datatables.net/) for advanced table features, [**Leaflet Map**](https://leafletjs.com/) integration for maps, and custom JS scripts tailored to specific project needs.

- **Components**: The design system includes **49 components** in both English and Arabic, providing a solid foundation for building responsive and accessible websites. Each component is optimized for performance and designed to maintain consistency across different platforms.

- **Templates**: There are **45 pre-defined templates** available, tailored to meet the diverse needs of ministries. These templates are based on extensive research to ensure they align with common requirements across various projects.

- **CSS Selectors**: CSS selectors within the design system are prefixed with `govbh-btn` (e.g., `.govbh-btn`). This unique identifier helps prevent conflicts with other styles on a site that are not part of the govbh-btn design system.

- **BEM**: The design system employs a [**BEM**](http://getbem.com/introduction/) approach for naming CSS selectors. Blocks are separated from elements using two underscores (**), for example: `.govbh-btn**elem`. Modifier classes consist of the base class plus a modifier suffix, separated by two dashes (--), such as `.govbh-btn--disabled`or`.govbh-btn\_\_secondary--disabled`.

[Go to top ↑](#bahrain-web-design-system)

## Design System Organization

### Root Structure

This is the structure when you install or unzip the project. The folder structure is quite explanatory, with each directory serving a specific purpose. The "..." indicates that there are more files within those directories that are not listed here for brevity.

```bash
BH-web-design-system/
 ├── components-html/
 │   ├── accessibility-tools.html
 │   ├── ....
 ├── components-html-ar/
 │   ├── accessibility-tools.html
 │   ├── ....
 ├── css
 │   ├── icons/
 │   ├── datatables.min.css
 │   ├── ...
 ├── html/
 │   ├── 404.html
 │   ├── ....
 ├── html-ar/
 │   ├── 404.html
 │   ├── ....
 ├── images/
 │   ├── flags/
 │   ├── icons/
 │   ├── utilities/
 │   ├── 2030.svg
 │   ├── ....
 ├── js/
 │   ├── datatables.min.js
 │   ├── ....
 ├── scss/
 │   ├── _banners.scss
 │   ├── ....

```

### CSS and SCSS Structure

The SCSS files inside the SCSS folder are organized into various partials that focus on specific style components but ultimately compile into just two main CSS files in the CSS folder: (1) `css/style.css`/`css/style.min.css` and (2) `css/style-ar.css`/`css/style-ar.min.css`, along with their corresponding source map files.

- The `scss/style.scss` file serves as the main entry point for styles, importing most of the SCSS partials to create a comprehensive stylesheet.
- The `scss/style-ar.scss` file is tailored for Arabic content, inverting styles based on the classes defined in `scss/style.scss` to ensure proper alignment and readability. It also contains styles that invert those from other libraries, such as Bootstrap, as well as additional styles from various JavaScript libraries to ensure a consistent look and feel across the design system.
- The `scss/_common.scss` file contains foundational styles that apply across various components, ensuring consistency.
- Many styles, particularly those derived from JavaScript libraries, are called from CDN to optimize loading times and ensure access to the latest versions.
- An "icons" folder inside css/ is included, containing custom icons downloaded from IcoMoon, allowing for greater design flexibility.
- We discourage modifying any SCSS files directly to maintain compatibility with future updates of the design system.
- To overwrite existing styles or add custom styles, please refer to [How to use it on a live project](#how-to-use) for guidance.

```bash
├── css/
│   ├── icons/
│   ├── colorbox.css
│   ├── datatables.min.css
│   ├── jquery.multiselect.css
│   ├── leaflet.min.css
│   ├── style-ar.css
│   ├── style-ar.css.map
│   ├── style-ar.min.css
│   ├── style-ar.min.css.map
│   ├── style.css
│   ├── style.css.map
│   ├── style.min.css
│   ├── style.min.css.map
├── scss/
│   ├── _banners.scss
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _common.scss
│   ├── _components.scss
│   ├── _datatable.scss
│   ├── _footer.scss
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _history.scss
│   ├── _icons.scss
│   ├── _library.scss
│   ├── _map.scss
│   ├── _mixin.scss
│   ├── _odometer.scss
│   ├── _pages.scss
│   ├── _steps.scss
│   ├── _tabs-accordion.scss
│   ├── _themedark.scss
│   ├── _variables.scss
│   ├── style-ar.scss
│   ├── style.scss

```

### JS Structure  
The JS folder contains a collection of JavaScript libraries that are downloaded and loaded as self-hosted scripts, ensuring that the design system functions smoothly while also utilizing some external sources for optimal performance.

- The folder includes various JavaScript libraries that enhance functionality and improve user experience. These libraries are essential for features such as data tables, interactive maps, and user interface enhancements.
- Scripts that begin with `govbh` are custom scripts designed specifically for the design system, except for `govbh-library.js` and `govbh-library.min.js`, which aggregate various common JavaScript libraries such as Zebra Tooltips, Headroom, and Odometer to provide additional functionalities.
- Popular libraries like Fancybox and Swiper are sourced from CDN, allowing for efficient updates and optimizations while keeping the overall project lightweight.
- Additional scripts, such as `govbh-map-script.js` and `govbh-menu-sticky.js`, provide specialized functionality tailored to the design system's requirements.
- We discourage modifying any JavaScript files directly to maintain functionality and ease of updates.
- To add new scripts or additional functionalities, please refer to [How to use it on a live project](#how-to-use) for best practices and guidance.

```bash
├── js/
│   ├── datatables.min.js
│   ├── govbh-datatable.js
│   ├── govbh-lang-ar.js
│   ├── govbh-lang.js
│   ├── govbh-library.js
│   ├── govbh-library.min.js
│   ├── govbh-map-script.js
│   ├── govbh-menu-sticky.js
│   ├── govbh-themes-0.0.1.js
│   ├── govbh-utils.js
│   ├── intlTelInput.min.js
│   ├── jquery-3.7.1.min.js
│   ├── jquery.colorbox-min.js
│   ├── jquery.colorbox.js
│   ├── jquery-scrolltofixed.js
│   ├── jquery.multiselect.js
│   ├── jquery.smartmenus.keyboard.min.js
│   ├── jquery.smartmenus.min.js
│   ├── leaflet.min.js

```
[Go to top ↑](#bahrain-web-design-system)

## Installation

The design system is versatile and can be utilized across various types of web projects, whether they're CMS-based (including both headless and conventional systems), HTML-based (static sites), or built using JavaScript frameworks such as React or Next.js. This design system serves as a foundational template that developers can leverage as a boilerplate for their projects. By providing a fully functional set of templates, developers can easily see the pages in action and modify them to suit their specific needs. The system is purely HTML and CSS-based, making it straightforward to integrate into any project.

To get started with a new project using this design system, you can follow one of the methods below:

1. **Clone the [Repository](https://github.com/IGA-BH/BH-web-design-system)**: Use Git to clone the repository directly to your local machine. This method allows you to easily pull updates and manage version control as you develop your project.

   ```bash
   git clone https://github.com/IGA-BH/BH-web-design-system
   ```
 
2. **Download the [Zip File](https://github.com/IGA-BH/BH-web-design-system/blob/main/BH-web-design-system.zip)**: Alternatively, you can download the zip file from the repository. This method is perfect for those who prefer not to use Git or want a quick way to access the files.

Once you have either cloned the repository or downloaded the zip file, unzip the contents. You should see the default root structure below, which includes all necessary folders and files to kickstart your project.

```bash
BH-web-design-system/
 ├── components-html/
 │   ├── accessibility-tools.html
 │   ├── ....
 ├── components-html-ar/
 │   ├── accessibility-tools.html
 │   ├── ....
 ├── css
 │   ├── icons/
 │   ├── datatables.min.css
 │   ├── ...
 ├── html/
 │   ├── 404.html
 │   ├── ....
 ├── html-ar/
 │   ├── 404.html
 │   ├── ....
 ├── images/
 │   ├── flags/
 │   ├── icons/
 │   ├── utilities/
 │   ├── 2030.svg
 │   ├── ....
 ├── js/
 │   ├── datatables.min.js
 │   ├── ....
 ├── scss/
 │   ├── _banners.scss
 │   ├── ....

```

This structure is designed to be intuitive and self-explanatory, enabling you to navigate and understand the components easily.

By starting with this design system, you can ensure a consistent design language across your project while saving time in the development process.

[Go to top ↑](#bahrain-web-design-system)

## How to Use

Once the files are unzipped, you are ready to integrate the design system into a new project or existing projects. There are two options to get started:

### Build the Static HTML

Modify the template files to suit your needs, allowing you to view all the pages in HTML format. This approach is ideal for situations where you have limited time and need to present static HTML to your management. You can:

- Change the logo.
- Configure the global header and footer of the template.
- Update the homepage's hero section and other page sections.
- Modify content throughout the templates.
- Test the responsiveness and accessibility

For detailed guidance on the templates, you can visit the [templates guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4600-118964&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1). Similarly, for a guide on components, refer to the [components guidelines](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4600-118964&viewport=-1663%2C-4864%2C0.2&t=FcDAyjtQT6kyMKqw-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1). Remember that templates are available in both English and Arabic, so any changes made in English should also be applied in Arabic.

Once you're ready, you can browse your configured pages at the following URL: 
```bash 
http://your-url/html/landing.html
```
If you have any additional styles, scripts, or images/icons, these site-specific files should be placed in their respective folders. This organization ensures clarity between files from the design system and those that are site-specific. It also allows for easy updates to the design system files whenever new versions become available. 

For example, to add a site-specific SCSS file, it should be placed in the `scss/site/` folder with the filename `site-styles.scss`. The output CSS file should go in the `css/site/` folder as `site-styles.css`. Ensure that your Sass compiler is configured to output to the correct CSS folder. The following structure should be followed:

```bash
Your-HTML-Project-Directory/
 ├── components-html/
 ├── components-html-ar/
 ├── css
 │   ├── site/
 │       ├── site-styles.css
 │       ├── site-styles.min.css
 │       ├── site-styles.map
 │       ├── site-styles.min.map 
 │   ├── ...
 ├── images/
 │   ├── site/
 │       ├── image-001.jpg 
 │   ├── ....
 ├── js/
 │   ├── site/
 │       ├── site-styles.js
 ├── scss/
 │   ├── site/
 │       ├── site-styles.scss

```

Notice that each main folder (scss, css, js, images) contains a site folder with files named as `site-[styles|scripts].[ext]`. For images, while there is no strict naming convention, ensure that all site-specific images are stored in the `images/site/` folder.

### Integrate Directly to CMS or Framework

If you prefer not to build the website as static HTML pages, you can directly integrate the templates into your chosen CMS or framework, whether it be JavaScript-based or server-side. You can utilize the 45 pre-defined templates and 49 components, all of which are well-commented in the code. 

Make sure to include the necessary CSS and JavaScript based on the existing templates, along with your site-specific styles, scripts, and images. 

These folders should be located appropriately within your project directory with their files inside. Please take note of the site-specific file organization mentioned in Option 1 ([Build the Static HTML](#build-the-static-html)).

```bash
Your-CMS-or-Framework-Project-Directory/
 ├── css
 │   ├── site/
 │       ├── site-styles.css
 │       ├── site-styles.min.css
 │       ├── site-styles.map
 │       ├── site-styles.min.map 
 │   ├── icons/
 │   ├── datatables.min.css
 │   ├── ...
 ├── images/
 │   ├── site/
 │       ├── image-001.jpg 
 │   ├── flags/
 │   ├── icons/
 │   ├── utilities/
 │   ├── 2030.svg
 │   ├── ....
 ├── js/
 │   ├── site/
 │       ├── site-styles.js
 ├── scss/
 │   ├── site/
 │       ├── site-styles.scss

```

Once integrated with your preferred CMS or framework, verify that the website follows the guideline by checking our [Bahrain Web Design System Guideline](https://www.figma.com/proto/CiMVuUjJE1iesZmIw9rVHc/Bahrain-Government-Design-System-1.0?page-id=17%3A1583&node-id=4600-118964&viewport=-2965%2C6158%2C0.37&t=3lPNcdfNkgu2TdCP-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4214%3A82288&hide-ui=1)

That's it :)

## Release Summary

First Release 2025 - Web Design System v1.0

## Suggestions and Feedback

Suggestions & feedback on the website design guidelines are welcome. Any suggestion/feedback will help in enhancing/refining the guidelines further thus making this document more comprehensive and relevant.

Suggestions, feedback, clarifications and queries on this guideline may be sent to [qa@iga.gov.bh](qa@iga.gov.bh)


[Go to top ↑](#bahrain-web-design-system)
