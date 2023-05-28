"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransmission } from "@/hooks/use-transmission";
import { env } from "@/lib/env";
import { useState } from "react";

const defaultUrl = new URL("/transmission/rpc", window.location.origin);

export function LoginCard() {
  const client = useTransmission();

  const [url, setUrl] = useState(env.VITE_DEFAULT_CLIENT_URL ?? defaultUrl);
  const [user, setUser] = useState(env.VITE_DEFAULT_CLIENT_USER ?? "");
  const [password, setPassword] = useState(env.VITE_DEFAULT_CLIENT_PASS ?? "");

  const submitLogin = async () => await client.login({ url, user, password });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login into Transmission</CardTitle>
        <CardDescription>
          Enter your local or remote credentials.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="instance">Instance</Label>
          <Input
            id="instance"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={submitLogin}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
