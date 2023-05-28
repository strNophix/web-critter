import {
  AlignJustify,
  CheckCircle,
  FileDown,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription } from "../ui/card";
import { useTransmission } from "@/hooks/use-transmission";

interface SidebarProps {
  className: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { session } = useTransmission();
  return (
    <div className={cn("flex flex-col h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Status
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <AlignJustify className="mr-2 h-4 w-4" />
              All
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <FileDown className="mr-2 h-4 w-4" />
              Downloading
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <PlayCircle className="mr-2 h-4 w-4" />
              Active
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <PauseCircle className="mr-2 h-4 w-4" />
              Inactive
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 " />
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Card>
            <CardHeader className="py-3">
              <CardDescription>Version: {session.version}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
