import prettyBytes from "pretty-bytes";

const messages = new Map<number, string>([
  [0, "Stopped"],
  [1, "Verifying"],
  [2, "Verifying"],
  [3, "Downloading"],
  [4, "Downloading"],
  [5, "Seeding"],
  [6, "Seeding"],
]);

export function TorrentStatus({ state }: { state: number }) {
  return <span>{messages.get(state) ?? "Unknown state"}</span>;
}

export function TorrentSize({ sizeInBytes }: { sizeInBytes: number }) {
  return <span>{prettyBytes(sizeInBytes)}</span>;
}

export function TorrentSpeed({ speedInBytes }: { speedInBytes: number }) {
  return <span>{prettyBytes(speedInBytes ?? 0)}/s</span>;
}
