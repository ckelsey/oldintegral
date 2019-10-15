#Image Viewer
Styles
--
- Inline-block

Supports existing img attributes
--
- width
- height
- crossorigin = TODO
- alt = TODO
- title = TODO
- src
- sizes = TODO
- srcset = TODO
- usemap = TODO
- align = TODO

Supports img width/height dimension behavior
--
- If width is set and height is not, height is auto
- If height is set and width is not, width is auto
- If both width and height are set, both are honored even if stretching occurs

Attributes
--
#### placeholder attribute = TODO
- If set to "true", default image icon shows
- If omitted, no placeholder is shown
- Default: off
- If URL is provided, loads placeholder first

#### placeholder-color attribute = TODO
- Valid color(rgb, rgba, hex, hsl, hsla)
- If invalid or omitted, no color is shown
- Default: off

#### error-placeholder = TODO
- Default: image error icon shows
- Values:
  - URL string
  - If set to "true", default image icon shows
  - If set to "false", disabled

#### fill
- Boolean/string value
- Default: true
- Values
  - true (normal img behavior)
  - contain (like css background-size:contain)
  - cover (like css background-size:cover)
  - number (like css background-size:number) = TODO
  - scroll = TODO

#### mask
#### pinch-zoom
### TODO
- lazy load
- caching image data(service worker)
  - https://www.bignerdranch.com/blog/dont-over-react/
  - https://medium.com/@roderickhsiao/performance-101-i-know-how-to-load-images-a262d556250f

- progress-text = TODO
    - Boolean value
    - If cross-origin, an attempt to show progress is made. If CORS is invalid, progress is disabled

- progress attribute = TODO
    - Boolean/string value
    - Values:
    - false
    - true
    - bar
    - circle
    - indeterminate
    - Default: false
    - True default: bar
    - If cross-origin, an attempt to show progress is made. If CORS is invalid, progress is disabled
