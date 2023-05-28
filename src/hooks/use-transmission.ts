import { TransmissionContext } from "@/contexts/transmission";
import { useContext } from "react";

export function useTransmission() {
  const context = useContext(TransmissionContext);
  return context;
}
