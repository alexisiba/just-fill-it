import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { pathToFileURL } from "url";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Crear directorio temporal
    const tempDir = path.join("/tmp", "next_uploads");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // Guardar archivo subido en disco
    const tempFilePath = path.join(tempDir, file.name);
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer));

    // Convertir path a URI absoluta para LibreOffice
    const fileUri = pathToFileURL(path.resolve(tempFilePath)).href;

    // Ejecutar LibreOffice con spawn
    await new Promise<void>((resolve, reject) => {
      const child = spawn("soffice", [
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        tempDir,
        fileUri,
      ]);

      child.stdout.on("data", (d) =>
        console.log("LibreOffice stdout:", d.toString())
      );
      child.stderr.on("data", (d) =>
        console.error("LibreOffice stderr:", d.toString())
      );

      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`LibreOffice exited with code ${code}`));
      });
    });

    // Leer PDF generado
    const pdfPath = tempFilePath.replace(/\.(docx|odt)$/i, ".pdf");
    if (!fs.existsSync(pdfPath)) {
      throw new Error("PDF not generated");
    }

    const pdfBuffer = fs.readFileSync(pdfPath);

    // Limpiar archivos temporales
    try {
      fs.unlinkSync(tempFilePath);
    } catch {}
    try {
      fs.unlinkSync(pdfPath);
    } catch {}

    // Devolver PDF como descarga
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error("Error en API convert:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
