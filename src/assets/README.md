# Assets Folder

## How to Add Images

1. **Add your images to this folder** (`src/assets/`)
2. **Supported formats**: JPG, PNG, WEBP, SVG
3. **Recommended naming**: Use descriptive names like `memory-1.jpg`, `special-moment.png`

## Import Images in Code

```jsx
// Import your images like this:
import memory1 from '@/assets/memory-1.jpg';
import specialMoment from '@/assets/special-moment.png';

// Then use them in your components:
<img src={memory1} alt="Beautiful memory" />
```

## Image Guidelines

- **Resolution**: Use high-quality images (at least 1200px wide for best results)
- **Size**: Optimize images to be under 2MB each for better loading
- **Aspect Ratio**: Mixed ratios work great for the collage effect

## Example Structure
```
src/assets/
├── memory-1.jpg
├── memory-2.png
├── special-moment.jpg
├── favorite-photo.jpg
└── cute-selfie.png
```