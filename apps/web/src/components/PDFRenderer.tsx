"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumeDocument";
import { Card } from "@/components/ui/card";

export default function PDFRenderer({ data }: { data: any }) {
  if (!data) return null;

  return (
    <Card className="h-[600px] w-full overflow-hidden">
      <PDFViewer width="100%" height="100%" className="border-none">
        <ResumeDocument data={data} />
      </PDFViewer>
    </Card>
  );
}
