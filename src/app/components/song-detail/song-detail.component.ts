import { Component, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Database, ref, set } from '@angular/fire/database';

import { Song } from 'src/app/models/common.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnChanges {
  @Input() song: Song = {} as Song;

  public form: FormGroup;

  public get genre(): AbstractControl {
    return this.form.get('genre') as AbstractControl;
  }

  constructor(
    private database: Database,
    private fb: FormBuilder,
  ) {
    this.form = this.createForm();
  }

  public ngOnChanges() {
    if (this.song) {
      this.setForm(this.song);
    }
  }

  public updateSong(): void {
    const song: Song = {
      ...this.form.getRawValue(),
      genre: this.genre.value ? this.genre.value.split(',') : [],
      duration: this.song.duration
    }

    set(ref(this.database, 'songs/' + this.song.id), song);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: 0,
      title: '',
      author: '',
      year: '',
      album: '',
      genre: '',
      label: '',
      country: '',
      duration: '',
      producer: '',
    });
  }

  private setForm(song: Song): void {
    this.form.patchValue({
      id: song.id,
      title: song.title,
      author: song.author,
      year: song.year,
      album: song.album,
      genre: song.genre.join(', '),
      label: song.label,
      country: song.country,
      duration: this.getDuration(song.duration),
      producer: song.producer
    });

    this.form.get('duration')?.disable();
  }

  private getDuration(duration: number): string {
    const minutes = Math.trunc(duration / 60);
    const seconds = Math.trunc(duration - (minutes * 60));

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}

