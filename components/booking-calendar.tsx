"use client";

import { useEffect, useRef } from "react";

interface BookingCalendarProps {
  calendarUrl: string;
  className?: string;
}

export function BookingCalendar({
  calendarUrl,
  className,
}: BookingCalendarProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Handle any initialization logic if needed
    const handleResize = () => {
      if (iframeRef.current) iframeRef.current.style.height = "800px";
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={className}>
      <iframe
        ref={iframeRef}
        src={calendarUrl}
        width="100%"
        height="800"
        frameBorder="0"
        style={{ minHeight: "800px" }}
        className="rounded-md shadow-sm"
        title="Booking Calendar"
      />
    </div>
  );
}
