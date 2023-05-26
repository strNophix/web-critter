import { TransmissionClient } from "@/lib/transmission";
import { useRef } from "react";

export function useTransmission() {
  const ref = useRef(new TransmissionClient());
  return ref.current;
}
