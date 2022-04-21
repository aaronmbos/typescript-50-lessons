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
  kind: "conference";
};

type Meetup = TechEventBase & {
  location: string;
  price: string;
  talks: Talk[];
  kind: "meetup";
};

type Webinar = TechEventBase & {
  url: string;
  price?: number;
  talks: Talk;
  kind: "webinar";
};

type Hackathon = TechEventBase & {
  location: string;
  price?: number;
  kind: "hackathon";
};

type TechEventBase = {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  rsvp: number;
};

type TechEvent = Webinar | Conference | Meetup | Hackathon;

function getEventTeaser(event: TechEvent) {
  switch (event.kind) {
    case "conference":
      return `${event.title} (Conference)`;
    case "meetup":
      return `${event.title} (Meetup)`;
    case "webinar":
      return `${event.title} (Webinar)`;
  }
}

type EventKind = "conference" | "webinar" | "meetup";

function filterByKind(list: TechEvent[], kind: EventKind): TechEvent[] {
  return list.filter((el) => el.kind === kind);
}

type GroupedEvents = {
  [Kind in EventKind]: TechEvent[];
};

function groupEvents(events: TechEvent[]): GroupedEvents {
  const grouped = {
    conference: [],
    meetup: [],
    webinar: [],
    hackathon: [],
  };

  events.forEach((el) => {
    grouped[el.kind].push(el);
  });

  return grouped;
}

type UserEvents = {
  watching: TechEvent[];
  rsvp: TechEvent[];
  attended: TechEvent[];
  signedout: TechEvent[];
};

function filterUserEvent(
  userEventList: UserEvents,
  category: keyof UserEvents,
  filterKind?: EventKind
) {
  const filteredList = userEventList[category];
  if (filterKind) {
    return filteredList.filter((event) => event.kind === filterKind);
  }

  return filteredList;
}

function isUserEventListCategory(
  list: UserEvents,
  category: string
): category is keyof UserEvents {
  return Object.keys(list).includes(category);
}
