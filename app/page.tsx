import { PDFUpload } from "@/components/PDFUpload/PDFUpload";

export default function Home() {
  return (
    <main
      style={{
        padding: "2rem",
      }}
    >
      <h1>PDF Upload Example</h1>
      <PDFUpload />
    </main>
  );
}
