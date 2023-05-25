import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Song } from './models/common.model';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = "AUDIO PLAYER";

  public songsList: Song[] = [];
  public selectedSong: Song = {} as Song;
 
  constructor(private database: Database, private service: CommonService) { }

  public ngOnInit(): void {
    this.service.songsList.subscribe({
      next: (songsList) => this.songsList = songsList
    });

    this.service.getSongsList();
  }

  public playSong(song: Song): void {
    this.selectedSong = song;
  }

  public stopSong(): void {
    this.selectedSong = {} as Song;
  }
}
