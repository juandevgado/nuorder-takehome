import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Suggestion {
  title: string;
  labels: any[];
  url: string;
  state: string;
}

const getApiUrl = (value: string) => `https://api.github.com/search/issues?q=${value}+repo:facebook/react`;

const transformResponse = ({ response }: AjaxResponse) => {
  return response.items.map((item: any) => ({
    title: item.title,
    labels: item.labels,
    url: item.html_url,
    state: item.state
  }));
};

export const getSuggestions = (
  subject: BehaviorSubject<string>
): Observable<[]> => {
  return subject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter(v => v.length > 2),
    map(getApiUrl),
    switchMap(url => ajax(url)),
    map(transformResponse)
  );
};