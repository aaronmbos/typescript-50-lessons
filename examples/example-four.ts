// Example in this chapter is based on modeling data for tech events (confs, meetups, etc)
type Talk = {
  title: string;
  abstract: string;
  speaker: string;
};

type Conference = TechEventBase & {
  location: string;
  price: number;
  talks: Talk[];
};

type Meetup = TechEventBase & {
  location: string;
  price: string;
  talks: Talk[];
};

type Webinar = TechEventBase & {
  url: string;
  price?: number;
  talks: Talk;
};

type TechEventBase = {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  rsvp: number;
  kind: string;
};

type TechEvent = Webinar | Conference | Meetup;
