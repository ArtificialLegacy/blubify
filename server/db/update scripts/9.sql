
alter table SongEntries
  add share_key varchar(36) unique not null default uuid();