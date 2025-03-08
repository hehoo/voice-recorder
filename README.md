# Voice Recorder App

A web application built with React and Next.js that allows users to record their voice and convert it to text.

## Features

- Record audio using the device's microphone
- Pause and resume recording
- Stop recording and save the audio
- Convert speech to text using the Web Speech API
- Modern and responsive user interface

## Technologies Used

- React 18
- Next.js 14
- TypeScript
- Web Audio API for recording
- SpeechRecognition API for speech-to-text conversion
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

## Testing

The application includes unit tests for the components. To run the tests:

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
│   │   │   ├── VoiceRecorder.tsx
│   │   │   └── VoiceRecorder.test.tsx
│   │   ├── types/
│   │   │   └── speech-recognition.d.ts
│   │   │   └── voice-recorder.ts
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

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/ci.yml` and includes:

- Linting
- Running tests
- Building the application

## Future Improvements

- Add ability to download recordings
- Implement language selection for speech recognition
- Add waveform visualization during recording
- Implement user authentication to save recordings
- Add more comprehensive tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [SpeechRecognition API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
