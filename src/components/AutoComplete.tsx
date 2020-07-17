import React from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
// Components
import SuggestionBox from './SuggestionBox';
// Types
import { Suggestion } from '../API';
// Styles
import '../stylesheets/AutoComplete.css'

interface Props {
  getSuggestions: (subject: BehaviorSubject<string>) => Observable<[]>;
}

const subject$ = new BehaviorSubject('');

export default function AutoComplete(props: Props) {
  const { getSuggestions } = props;
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = React.useState<number>(0);
  const [inputValue, setInputValue] = React.useState<string>('');

  React.useEffect(() => {
    const subscription = getSuggestions(subject$).subscribe(
      suggestions => {
        setSuggestions(suggestions.slice(0, 8));
      },
      error => {
        console.error(error);
      }
    );
    return () => subscription.unsubscribe();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedSuggestion(0);
    subject$.next(e.target.value);
  };

  const openIssue = (url: string) => {
    window.open(url, '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Up Key
    if (e.keyCode === 38) {
      e.preventDefault();
      if (selectedSuggestion === 0) {
        setSelectedSuggestion(suggestions.length - 1);
      } else {
        setSelectedSuggestion(selectedSuggestion - 1);
      }
    }
    // Down Key
    if (e.keyCode === 40) {
      e.preventDefault();
      if (selectedSuggestion === suggestions.length - 1) {
        setSelectedSuggestion(0);
      } else {
        setSelectedSuggestion(selectedSuggestion + 1);
      }
    }
    // Enter Key
    if (e.keyCode === 13) {
        e.preventDefault();
        openIssue(suggestions[selectedSuggestion].url);
    }
  };

  return (
    <div className="AutoComplete">
      <div className="text-field">
        <input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search issues..."
        />
      </div>
      {suggestions.length > 0 && inputValue.length > 2 && (
        <div className="suggestions">
          {suggestions.slice(0, 8).map((suggestion, index) => (
            <SuggestionBox
              key={index}
              openIssue={openIssue}
              suggestion={suggestion}
              selected={selectedSuggestion === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}