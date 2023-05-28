import { Torrent, columns, fields } from "@/components/torrents/columns";
import { DataTable } from "@/components/torrents/data-table";
import { useTransmission } from "@/hooks/use-transmission";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInterval } from "@/hooks/use-interval";
import { Sidebar } from "@/components/sidebar";
import { env } from "@/lib/env";

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
  const [urlInput, setUrlInput] = useState(env.VITE_DEFAULT_TORRENT_ADD ?? "");
  const [tableData, setTableData] = useState<Torrent[]>([]);

  useInterval(async () => {
    const resp = await client.call<TorrentGetCmd>("torrent-get", {
      fields: fields,
    });
    setTableData(resp.arguments.torrents);
  }, 10000);

  const downloadTorrent = async () => {
    await client.call<TorrentAddCmd>("torrent-add", {
      filename: urlInput,
    });
  };

  return (
    <div className="flex">
      <Sidebar className="w-64" />
      <div className="flex-1 container">
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
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}

export default Home;
