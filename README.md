# Voice Recorder App

A web application built with React and Next.js that allows users to record their voice and convert it to text.

## Demo

Watch a demonstration of the Voice Recorder app in action:

[![Voice Recorder Demo](https://cdn.loom.com/sessions/thumbnails/82141ba9f7cf4894b67a96f80e1c033c-with-play.gif)](https://www.loom.com/share/82141ba9f7cf4894b67a96f80e1c033c?sid=d578c7d6-e9a4-48b9-963c-177ab1cd4ef3)

## Features

- Record audio using the device's microphone
- Pause and resume recording
- Stop recording and save the audio
- Convert speech to text using the Web Speech API
- Modern and responsive user interface
- State management with TanStack Store
- Robust error handling with React Error Boundary
- Component-based architecture with clear separation of concerns

## Technologies Used

- React 18
- Next.js 14
- TypeScript
- Web Audio API for recording
- SpeechRecognition API for speech-to-text conversion
- TanStack Store for state management
- React Error Boundary for error handling
- TailwindCSS for styling
- Jest and React Testing Library for testing

## Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/hehoo/voice-recorder.git
cd voice-recorder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Click the "Record" button to start recording your voice.
2. Click the "Pause" button to pause the recording (click again to resume).
3. Click the "Stop" button to stop and save the recording.
4. The recorded audio will be available for playback, and the transcribed text will be displayed below.

## State Management

The application uses TanStack Store for state management, which provides:

- Centralized state management for the voice recorder
- Predictable state updates through defined actions
- Improved testability with independent store testing
- Better separation of concerns between state and UI

The store is implemented in `src/app/store/voiceRecorderStore.ts` and manages the following state:

- `isRecording`: Whether recording is in progress
- `isPaused`: Whether recording is paused
- `recordingTime`: Duration of the recording in seconds
- `transcript`: Transcribed text from the recording
- `audioURL`: URL to the recorded audio blob
- `error`: Any error that occurred during recording

## Component Architecture

The application uses a component-based architecture for better separation of concerns:

- `VoiceRecorder`: Main component that orchestrates the recording process
- `RecordingControls`: Handles the UI for recording controls (record, pause, stop)
- `ProgressBar`: Displays the recording progress
- `TimeDisplay`: Shows the recording time
- `TranscriptDisplay`: Displays the transcribed text
- `AudioPlayer`: Plays back the recorded audio

This separation makes the code more maintainable, testable, and allows for easier extension of functionality.

## Error Handling

The application uses React Error Boundary for robust error handling:

- Gracefully catches and displays errors during recording
- Provides a user-friendly fallback UI when errors occur
- Allows users to retry after an error
- Logs errors to the console for debugging

## Testing

The application includes unit tests for the components, hooks, and store. To run the tests:

```bash
npm test
# or
npm run test:watch # for watch mode
```

## Browser Compatibility

This application uses the Web Audio API and SpeechRecognition API, which are supported in most modern browsers:

- Chrome (desktop and Android)
- Edge
- Firefox
- Safari (desktop and iOS)

Note: The SpeechRecognition API might have varying levels of support across browsers. For best results, use Chrome.

## Project Structure

```
voice-recorder/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── RecordingControls.tsx
│   │   │   ├── TimeDisplay.tsx
│   │   │   ├── TranscriptDisplay.tsx
│   │   │   ├── VoiceRecorder.tsx
│   │   │   └── [Component].test.tsx files
│   │   ├── hooks/
│   │   │   ├── useVoiceRecorder.ts
│   │   │   └── useVoiceRecorder.test.ts
│   │   ├── store/
│   │   │   ├── voiceRecorderStore.ts
│   │   │   ├── voiceRecorderStore.test.ts
│   │   │   └── useVoiceRecorderStore.test.tsx
│   │   ├── types/
│   │   │   └── speech-recognition.d.ts
│   │   │   └── voice-recorder.ts
│   │   ├── utils/
│   │   │   ├── timeUtils.ts
│   │   │   └── timeUtils.test.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
├── .eslintrc.js
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.jest.json
└── README.md
```

## Architecture

The application follows a clean architecture pattern:

1. **UI Layer** (`components/`): React components that render the UI
   - Decomposed into smaller, focused components for better maintainability
   - Enhanced with accessibility features

2. **State Management** (`store/`): TanStack Store for centralized state management
   - Manages application state
   - Provides actions for state updates

3. **Business Logic** (`hooks/`): Custom hooks that handle the application logic
   - Encapsulates the recording and speech recognition logic
   - Provides a clean API for components

4. **Error Handling** (`components/ErrorFallback.tsx`): React Error Boundary for error handling
   - Catches and displays errors
   - Provides recovery mechanisms

5. **Types** (`types/`): TypeScript interfaces and type definitions
   - Ensures type safety throughout the application

6. **Utils** (`utils/`): Utility functions
   - Reusable helper functions

This separation of concerns makes the codebase more maintainable, testable, and extensible.

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/ci.yml` and includes:

- Linting
- Running tests
- Building the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [SpeechRecognition API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [TanStack Store Documentation](https://tanstack.com/store/latest)
- [React Error Boundary Documentation](https://github.com/bvaughn/react-error-boundary)
