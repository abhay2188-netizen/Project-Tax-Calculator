import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Wizard } from './components/Wizard';
import { Results } from './components/Results';
import { TaxProvider } from './store/TaxContext';

function AppContent() {
  const [isStarted, setIsStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  if (showResults) {
    return (
      <Results 
        onStartOver={() => {
          setShowResults(false);
          setIsStarted(false);
        }} 
      />
    );
  }

  return (
    <Wizard 
      onReset={() => setIsStarted(false)} 
      onCalculate={() => setShowResults(true)}
    />
  );
}

function App() {
  return (
    <TaxProvider>
      <AppContent />
    </TaxProvider>
  );
}

export default App;
