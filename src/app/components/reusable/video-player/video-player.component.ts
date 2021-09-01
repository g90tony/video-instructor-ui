import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RegisteredCoursesService } from 'src/app/services/registered-course/registered-course.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() lesson: any;
  @Input() courseID: any;
  @Output() complete_lesson = new EventEmitter();

  title = 'VideoInstructor_YTIFRAME';
  showVideo = true;

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  constructor(private registeredCourseService: RegisteredCoursesService) {}

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* 2. Initialize method for YT IFrame API */
  init() {
    // Return if Player is already created
    if (window['YT']) {
      this.startVideo();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = 'nRiOw3qGYq4';
    this.init();
  }

  toggleVideo() {
    if (this.showVideo) this.showVideo = false;
    else {
      this.showVideo = true;
      setTimeout(() => {
        this.init();
      });
    }
  }

  onloadNewLesson(new_lesson: any) {
    this.player.loadVideoById(new_lesson.lesson, 0);
    console.log('course reached');
  }

  startVideo() {
    this.reframed = true;
    this.player = new window['YT'].Player('player', {
      videoId: this.lesson.lesson,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        // onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event: any) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event: any) {
    console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ', this.lesson.lesson_id);

        this.registeredCourseService
          .mark_lesson_complete(this.courseID, this.lesson.lesson_id)
          .subscribe((res) => {
            this.completeLesson(res);
          });

        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event: any) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  completeLesson(next_lesson: any) {
    this.complete_lesson.emit(next_lesson);
  }

  updateCurrentLesson(new_lesson: any) {
    this.lesson = new_lesson;
  }
}
