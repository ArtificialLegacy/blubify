
alter table Songs
  drop constraint fk_so_playlist_id;

alter table Songs
  drop column playlist_id;

create table SongEntries (
  entry_id smallint primary key not null auto_increment,
  playlist_id varchar(36) not null,
  song_id smallint not null,
  ordering smallint not null,
  song_name varchar(64) not null,

  constraint `fk_se_playlist_id`
    foreign key (playlist_id) references Playlists (playlist_id)
    on delete cascade
    on update restrict,

  constraint `fk_se_song_id`
    foreign key (song_id) references Songs (song_id)
    on delete cascade
    on update restrict
);

alter table Songs
  add source enum('youtube', 'upload');

alter table Songs
  add youtubeURL varchar(32) unique;

alter table Songs
  rename column youtubeURL to youtube_id