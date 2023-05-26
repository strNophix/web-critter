import { ColumnDef } from "@tanstack/react-table";

export interface Torrent {
  id: number;
  name: number;
  sizeWhenDone: string;
  status: number;
  "rateDownload (B/s)": number;
  "rateUpload (B/s)": number;
  eta: number;
  uploadRatio: number;
}

export const columns: ColumnDef<Torrent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sizeWhenDone",
    header: "Size",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "rateDownload (B/s)",
    header: "Download",
  },
  {
    accessorKey: "rateUpload (B/s)",
    header: "Upload",
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
