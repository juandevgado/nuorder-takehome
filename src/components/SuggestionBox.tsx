import React from 'react';
// Types
import { Suggestion } from '../API';
// Styles
import '../stylesheets/SuggestionBox.css';

interface Props {
  openIssue: (url: string) => void;
  suggestion: Suggestion;
  selected: boolean;
}

export default function SuggestionBox(props: Props) {
  const { suggestion, selected, openIssue } = props;
  return (
    <div onClick={() => openIssue(suggestion.url)} className={`SuggestionBox${selected ? ' -selected' : ''}`}>
      <div className="title">{suggestion.title}</div>
      <div className="bottom">
        <div className="labels">{suggestion.labels.map((label, index) => (
          <div style={{ backgroundColor: `#${label.color}` }} className="label" key={index}>{label.name}</div>
        ))}</div>
        <div className={`state -${suggestion.state}`}>{suggestion.state}</div>
      </div>
    </div>
  )
}