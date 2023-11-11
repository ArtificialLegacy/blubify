alter table BrowserSessions
  add ip varchar(15) not null;

alter table BrowserSessions
  add device_string varchar(128) not null;