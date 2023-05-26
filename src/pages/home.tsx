import { Torrent, columns } from "@/components/torrents/columns";
import { DataTable } from "@/components/torrents/data-table";
import { useTransmission } from "@/hooks/use-transmission";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInterval } from "@/hooks/use-interval";

interface TorrentGetCmd {
  arguments: { fields: string[] };
  response: { torrents: Torrent[] };
}

interface TorrentAddCmd {
  arguments: { filename: string };
  response: object;
}

function Home() {
  const client = useTransmission();
  const [urlInput, setUrlInput] = useState(
    "https://cdimage.debian.org/debian-cd/current/amd64/bt-cd/debian-11.7.0-amd64-netinst.iso.torrent"
  );
  const [tableData, setTableData] = useState<Torrent[]>([]);

  useInterval(async () => {
    const resp = await client.call<TorrentGetCmd>("torrent-get", {
      fields: [
        "id",
        "name",
        "sizeWhenDone",
        "status",
        "rateDownload (B/s)",
        "rateUpload (B/s)",
        "eta",
        "uploadRatio",
      ],
    });
    setTableData(resp.arguments.torrents);
  }, 10000);

  const downloadTorrent = async () => {
    await client.call<TorrentAddCmd>("torrent-add", {
      filename: urlInput,
    });
  };

  return (
    <div>
      <DataTable columns={columns} data={tableData} />
      <div className="flex">
        <Input
          type="url"
          placeholder=".torrent URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <Button variant="outline" onClick={downloadTorrent}>
          Download
        </Button>
      </div>
    </div>
  );
}

export default Home;
