import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Song } from 'src/app/models/common.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnChanges {
  @Input() song: Song = {} as Song;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  public ngOnChanges() {
    if (this.song) {
      this.setForm(this.song);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
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
      title: song.title,
      author: song.author,
      year: song.year.toString(),
      album: song.album,
      genre: song.genre.join(', '),
      label: song.label,
      country: song.country,
      duration: this.getDuration(song.duration),
      producer: song.producer
    });

    this.form.disable();
  }

  private getDuration(duration: number): string {
    const minutes = Math.trunc(duration / 60);
    const seconds = Math.trunc(duration - (minutes * 60));

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
}

