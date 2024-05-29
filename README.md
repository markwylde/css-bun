# cssbun
An extremely lightweight bundler that does nothing but merge your css files using the import syntax.

The end result is you can use your css files directly in the browser without being bundled, or
you can use the bundle. They should both be interchangeable.

You can import files via their relative path, or resolve them from node modules.

## Installation
```bash
npm install --save-dev cssbun
```

(or) globally:
```bash
npm install --global cssbun
```

## Example
Check out the test scenarios [here](test/scenarios) to see some example usages.

## Usage
### CLI
```bash
cssbun -o bundled.css css/index.css
```

Optional arguments are:

```text
--watch (-w) [pattern]         rerun when the files change (default pattern is '**/*.css')
--output (-o) fileName         output the bundle to a file instead of to stdout
```

### Code
```javascript
import cssbun from 'cssbun';
const bundled = cssbun('./css/index.css');
console.log(bundled);
```

### CSS
To include another css file in your entrypoint (or any included file) use the `@import` feature:

> Note: Any `@import url("???")` will not be parsed, and will stay in your bundle as intended.

```css
/* import a node module's main entrypoint */
@import "ress";

/* import a specific file from a node module */
@import "ress/dist/ress.min.css";

/* import a local file */
@import "./included.css";

/* import at runtime (don't bundle) */
@import url("https://unpkg.com/ress/dist/ress.min.css");

.test {
  background-color: blue;
}
```

To import with media query and / or supports condition
```css
@import "./index-p3.css" supports(color: color(display-p3 1 0 0)) (color-gamut: p3);
```

To import with layer name

```css
@layer reset, self;

@import "./reset.css" layer(reset);

@layer self {
  fieldset {
    border-radius: 2px;
  }
}

```

**Notes:** 

+ Avoid mixed line-endings (LF and CRLF) in css files, since cssbun doesn't normalize line-endings.
+ It is recommended to add editorconfig `insert_final_newline = true` for css files, or output css may look weird.
