function isAvailable<Formats>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats {
  return key in obj;
}

type UrlObject = {
  [k: string]: URL;
};

type Loaded<Key> = {
  format: Key;
  loaded: boolean;
};

async function loadFile<Formats extends UrlObject, Key extends keyof Formats>(
  fileFormats: Formats,
  format: Key
): Promise<Loaded<Key>> {
  const data = await fetch(fileFormats[format].href);
  return {
    format,
    loaded: data.status === 200,
  };
}

