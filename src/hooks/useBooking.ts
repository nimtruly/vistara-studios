import { useMutation } from "@tanstack/react-query";

export interface BookingData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
}

export function useBooking() {
  return useMutation({
    mutationFn: async (data: BookingData) => {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || "Failed to submit booking request.");
      }

      return response.json();
    },
  });
}
