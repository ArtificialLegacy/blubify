
create table Users (
  user_id tinyint primary key not null auto_increment,
  username varchar(32) unique not null,
  pass varchar(64) not null,
  created_at timestamp not null default now(),

  unique index iusername (username)
);

create table BrowserSessions (
  session_id varchar(36) primary key default uuid(),
  user_id tinyint not null,
  created_at timestamp not null default now(),

  constraint `fk_bs_user_id`
    foreign key (user_id) references Users (user_id)
    on delete cascade
    on update restrict
);

create table Playlists (
  playlist_id varchar(36) primary key default uuid(),
  user_id tinyint not null,
  created_at timestamp not null default now(),
  displayname varchar(32) not null,

  constraint `fk_pl_user_id`
    foreign key (user_id) references Users (user_id)
    on delete cascade
    on update restrict
);

create table Songs (
  song_id smallint primary key not null auto_increment,
  playlist_id varchar(36) not null,
  filepath varchar(64) unique,

  constraint `fk_so_playlist_id`
    foreign key (playlist_id) references Playlists (playlist_id)
    on delete cascade
    on update restrict,

  unique index ifilepath (filepath)
);