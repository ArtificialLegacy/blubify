import type { Migration } from '../src/types/migration'

export default {
    id: '1713910438930',
    date: 'Tue Apr 23 2024',

    comments: ['initial db setup'],

    up: [
        /*sql*/ `
        create table Users (
            user_id tinyint primary key not null auto_increment,
            username varchar(32) unique not null,
            pass varchar(64) not null,
            created_at timestamp not null default now(),
            theme tinyint default 0,

            unique index iusername (username)
        );
        `,
        /*sql*/ `
        create table BrowserSessions (
            session_id varchar(36) primary key default uuid(),
            user_id tinyint not null,
            created_at timestamp not null default now(),
            ip varchar(39) not null,
            device_string varchar(128) not null,

            constraint fk_bs_user_id
                foreign key (user_id) references Users (user_id)
                on delete cascade
                on update restrict
            );
        `,
        /*sql*/ `
        create table Playlists (
            playlist_id varchar(36) primary key default uuid(),
            user_id tinyint not null,
            created_at timestamp not null default now(),
            displayname varchar(32) not null,
            ordering smallint not null,

            constraint fk_pl_user_id
                foreign key (user_id) references Users (user_id)
                on delete cascade
                on update restrict
        );
        `,
        /*sql*/ `
        create table Songs (
            song_id smallint primary key not null auto_increment,
            filepath varchar(64) unique,
            source enum('youtube', 'upload'),
            youtube_id varchar(32) unique,
            ready bit,
            failed bit default 0,
            created_at timestamp default now(),

            unique index ifilepath (filepath)
        );
        `,
        /*sql*/ `
        create table SongEntries (
            entry_id smallint primary key not null auto_increment,
            playlist_id varchar(36) not null,
            song_id smallint not null,
            ordering smallint not null,
            song_name varchar(64) not null,
            created_at timestamp default now(),
            share_key varchar(36) unique not null default uuid(),

            constraint fk_se_playlist_id
                foreign key (playlist_id) references Playlists (playlist_id)
                on delete cascade
                on update restrict,

            constraint fk_se_song_id
                foreign key (song_id) references Songs (song_id)
                on delete cascade
                on update restrict
        );
        `,
    ],
    down: [
        /*sql*/ `
        alter table BrowserSessions
            drop foreign key fk_bs_user_id;
        `,
        /*sql*/ `
        alter table Playlists
            drop foreign key fk_pl_user_id;
        `,
        /*sql*/ `
        alter table SongEntries
            drop foreign key fk_se_playlist_id;
        `,
        /*sql*/ `
        alter table SongEntries
            drop foreign key fk_se_song_id;
        `,
        /*sql*/ `
        drop table Users;
        `,
        /*sql*/ `
        drop table BrowserSessions;
        `,
        /*sql*/ `
        drop table Playlists;
        `,
        /*sql*/ `
        drop table Songs;
        `,
        /*sql*/ `
        drop table SongEntries;
        `,
    ],
} as Migration
