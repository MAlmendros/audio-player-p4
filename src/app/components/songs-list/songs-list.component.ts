import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Song } from 'src/app/models/common.model';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnChanges {
  @Input() songsList: Song[] = [];

  @Output() play = new EventEmitter<Song>();

  public filteredSongs: Song[] = [];

  constructor() { }

  public ngOnChanges(): void {
    this.resetSongs();
  }

  public searchSongs(event: Event) {
    const text = (event.target as HTMLInputElement).value.toLowerCase();

    if (!text) {
      this.resetSongs();
      return;
    }

    this.filteredSongs = this.songsList.filter(
      (song: Song) => song.title.toLowerCase().includes(text) || song.author.toLowerCase().includes(text)
    );
  }

  public playSong(i: number) {
    this.play.emit(this.filteredSongs[i]);
  }

  public showDetails(i: number) {
    const actualSong: Song | undefined = this.filteredSongs.find((song: Song) => song.showDetails);
    if (actualSong) {
      actualSong.showDetails = false;
    }

    this.filteredSongs[i].showDetails = !this.filteredSongs[i].showDetails;
  }

  private resetSongs(): void {
    this.filteredSongs = this.songsList;
  }
}
