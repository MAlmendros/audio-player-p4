import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Song } from 'src/app/models/common.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {
  @Input() song: Song = {} as Song;

  @Output() stop = new EventEmitter<boolean>();

  public showPlayer: boolean = false;

  public audioUrl: string = "";
  public imageUrl: string = "";

  public current: string = "";
  public currentTime: number = 0;
  public duration: string = "";
  public durationTime: number = 0;
  public percentage: number = 0;
  public volume: number = 50;

  private audio;

  constructor() {
    this.audio = new Audio();
    this.audio.volume = 0.5;
  }

  public ngOnInit(): void {
    this.audio.addEventListener("timeupdate", () => {
      const minutes = Math.trunc(this.audio.currentTime / 60);
      const seconds = Math.trunc(this.audio.currentTime - (minutes * 60));

      this.currentTime = this.audio.currentTime;
      this.percentage = (this.currentTime * 100) / this.durationTime;
      this.current = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });
  }

  public ngOnChanges(): void {
    if (this.song && this.song.id) {
      this.startSong();
    }
  }

  public formatVolume(value: number): string {
    return `${value}`;
  }

  public changeVolume(volume: number): void {
    this.volume = volume;
    this.audio.volume = volume / 100;
  }

  public pauseSong(): void {
    this.audio.pause();
  }

  public playSong(): void {
    this.audio.play();
  }

  public stopSong(): void {
    this.audio.pause();
    this.restartSong();

    this.stop.emit(true);
  }

  private startSong(): void {
    this.audioUrl = `../../assets/mp3/${this.song.id}.mp3`;
    this.imageUrl = `../../assets/img/${this.song.id}.png`;

    this.current = "0:00";
    this.currentTime = 0;
    
    this.restartSong();

    this.playSong();

    this.showPlayer = true;
  }

  private restartSong(): void {
    this.current = "0:00";
    this.currentTime = 0;
    
    const minutes = Math.trunc(this.song.duration / 60);
    const seconds = Math.trunc(this.song.duration - (minutes * 60));
    this.duration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    this.durationTime = this.song.duration;

    this.audio.src = this.audioUrl;

    this.audio.load();
  }
}
