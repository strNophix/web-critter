import { ColumnDef } from "@tanstack/react-table";
import {
  TorrentSize,
  TorrentSpeed,
  TorrentStatus,
} from "@/components/torrents/cells";
import { Progress } from "@/components/ui/progress";

export const fields = [
  "id",
  "name",
  "sizeWhenDone",
  "status",
  "rateDownload (B/s)",
  "rateUpload (B/s)",
  "eta",
  "uploadRatio",
  "percentDone",
  "magnetLink",
  "group",
  "labels",
];

export interface Torrent {
  id: number;
  name: number;
  sizeWhenDone: string;
  status: number;
  "rateDownload (B/s)": number;
  "rateUpload (B/s)": number;
  eta: number;
  uploadRatio: number;
  percentDone: number;
  magnetLink: string;
  group: string;
  labels: string[];
}

export const columns: ColumnDef<Torrent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sizeWhenDone",
    header: "Size",
    cell: (props) => <TorrentSize sizeInBytes={props.getValue<number>()} />,
  },
  {
    accessorKey: "percentDone",
    header: "Progress",
    cell: (props) => <Progress value={props.getValue<number>() * 100} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => (
      <TorrentStatus key={props.cell.id} state={props.getValue<number>()} />
    ),
  },
  {
    accessorKey: "rateDownload (B/s)",
    header: "Download",
    cell: (props) => <TorrentSpeed speedInBytes={props.getValue<number>()} />,
  },
  {
    accessorKey: "rateUpload (B/s)",
    header: "Upload",
    cell: (props) => <TorrentSpeed speedInBytes={props.getValue<number>()} />,
  },
  {
    accessorKey: "eta",
    header: "ETA",
  },
  {
    accessorKey: "uploadRatio",
    header: "Ratio",
  },
];
