alter table Songs
  add created_at timestamp default now();

alter table SongEntries
  add created_at timestamp default now();