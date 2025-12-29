# Contributing to GeoGuessr Clone

First off, thank you for considering contributing to GeoGuessr Clone! 

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints (`npm run lint`)
5. Update documentation as needed
6. Write a clear commit message

## Development Process

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/geoguessr-clone.git
   cd geoguessr-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Comment complex logic

5. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**

## Code Style Guidelines

- Use functional components and React hooks
- Follow ESLint rules (`npm run lint`)
- Use Tailwind CSS for styling
- Keep components small and focused
- Write meaningful variable and function names
- Add comments for complex logic

## Adding New Locations

To add new locations to the game:

1. Open `src/data/locations.js`
2. Add a new object with:
   ```javascript
   {
     lat: latitude,
     lng: longitude,
     name: "Location Name, City, Country",
     description: "Brief description",
     imageUrl: "URL to image"
   }
   ```
3. Use high-quality images from Unsplash or similar free sources
4. Ensure coordinates are accurate

## Project Structure

- `src/components/game/` - Game-specific components
- `src/components/ui/` - Reusable UI components
- `src/data/` - Game data and constants
- `src/utils/` - Utility functions
- `src/lib/` - Shared libraries

## Questions?

Feel free to create an issue with the `question` label!

Thank you for contributing! 🙏
