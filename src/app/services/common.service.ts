import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { Song } from '../models/common.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private songs: Song[] = [];
  private _observableSongs: BehaviorSubject<Song[]> = new BehaviorSubject([] as Song[]);

  public get songsList(): Observable<Song[]> { return this._observableSongs.asObservable() }

  constructor() { }

  public getSongsList(): void {
    const database = getDatabase();
    const dbRef = ref(database, 'songs/');
    
    onValue(dbRef, (snapshot) => {
      this.songs = Object.entries(snapshot.val()).map((e) => e[1] as Song);
      this._observableSongs.next(this.songs);
    });
  }

  // ORIGINAL DATA
  /* private songsList: Song[] = [
    {
      id: 146661,
      title: 'Futuristic Beat',
      author: 'Royalty Free',
      year: 2000,
      album: 'Jupiter',
      genre: ['Advertising', 'Backgroud'],
      label: 'The Free Songs',
      country: 'EEUU',
      duration: 121,
      producer: 'Mario Vaquerizo',
      showDetails: false
    },
    {
      id: 126735,
      title: 'Lifelike',
      author: 'Alexi Action',
      year: 2010,
      album: 'Liverpool concert',
      genre: ['Technology', 'Abstract'],
      label: 'The Free Songs',
      country: 'Germany',
      duration: 144,
      producer: 'Mario Vaquerizo',
      showDetails: false
    },
    {
      id: 136824,
      title: 'Awaken',
      author: 'OYStudio',
      year: 1937,
      album: 'Awaken (Deluxe Edition)',
      genre: ['Calm', 'Cinematic'],
      label: 'Elefant Music',
      country: 'EEUU',
      duration: 180,
      producer: 'Luis del Olmo',
      showDetails: false
    },
    {
      id: 140894,
      title: 'Waterfall',
      author: 'Roman Senyk',
      year: 2020,
      album: 'Water',
      genre: ['Atmospheric'],
      label: 'Elefant Music',
      country: 'EEUU',
      duration: 164,
      producer: 'Mario Vaquerizo',
      showDetails: false
    },
    {
      id: 145636,
      title: 'Eco Technology',
      author: 'Lexin',
      year: 2020,
      album: 'The Shadows',
      genre: ['Cinematic', 'Inspiration'],
      label: 'Elefant Music',
      country: 'England',
      duration: 122,
      producer: 'Luis del Olmo',
      showDetails: false
    }
  ]; */
}
