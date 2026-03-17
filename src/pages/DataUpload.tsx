import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, Table, CheckCircle, Brain, X, Upload } from "lucide-react";

const previewData = [
  { product: "Laptop Pro X", category: "Electronics", sales: 1240, revenue: "$124,000", growth: "+18%" },
  { product: "Wireless Buds", category: "Electronics", sales: 980, revenue: "$49,000", growth: "+32%" },
  { product: "Running Shoes", category: "Clothing", sales: 760, revenue: "$38,000", growth: "+8%" },
  { product: "Coffee Beans", category: "Food & Bev", sales: 2100, revenue: "$21,000", growth: "+5%" },
  { product: "Smart Watch", category: "Electronics", sales: 540, revenue: "$81,000", growth: "+22%" },
];

const aiInsights = [
  { icon: "🚀", text: "Electronics is your highest-revenue category — 62% of total sales value." },
  { icon: "📈", text: "Wireless Buds shows 32% growth — consider expanding inventory." },
  { icon: "☕", text: "Coffee Beans has highest volume but lowest margins — review pricing strategy." },
  { icon: "⚠️", text: "Running Shoes growth is slowing — investigate customer feedback." },
];

export default function DataUpload() {
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setUploaded(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload zone */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">Upload Business Data</h2>
            <p className="text-xs text-muted-foreground">Supported formats: CSV, Excel (.xlsx)</p>
          </div>

          {!uploaded ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-border/60 hover:border-primary/50 hover:bg-primary/3"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Drop your file here</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <div className="flex gap-2">
                  {["CSV", "XLSX", "XLS"].map((fmt) => (
                    <span key={fmt} className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border text-muted-foreground">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-teal-soft/30 bg-teal-soft/5 p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-soft/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-teal-soft" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">File uploaded successfully</p>
                <p className="text-xs text-muted-foreground truncate">{fileName || "sample_sales_data.csv"}</p>
              </div>
              <button
                onClick={() => setUploaded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick load demo */}
          {!uploaded && (
            <Button
              variant="outline"
              className="w-full border-border/60 text-muted-foreground hover:text-foreground hover:bg-surface gap-2 rounded-xl text-sm"
              onClick={() => { setFileName("demo_sales_data.csv"); setUploaded(true); }}
            >
              <FileText className="w-4 h-4" />
              Load Demo Dataset
            </Button>
          )}

          {/* File details */}
          {uploaded && (
            <div className="card-surface rounded-xl p-4 border border-border/50 space-y-3">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">File Overview</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Rows", value: "5,240" },
                  { label: "Columns", value: "8" },
                  { label: "File Size", value: "284 KB" },
                  { label: "Format", value: "CSV" },
                ].map((d) => (
                  <div key={d.label} className="bg-surface rounded-lg p-2.5 text-center">
                    <p className="text-sm font-bold text-foreground">{d.value}</p>
                    <p className="text-[10px] text-muted-foreground">{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Output */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">AI Analysis Output</h2>
            <p className="text-xs text-muted-foreground">Automatically generated insights from your data</p>
          </div>

          {!uploaded ? (
            <div className="rounded-2xl border border-border/40 bg-surface/50 p-8 text-center h-[200px] flex flex-col items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload a file to see AI analysis</p>
            </div>
          ) : (
            <div className="card-surface rounded-xl border border-border/50 p-4 space-y-2.5 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">AI-Generated Insights</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary">4 findings</span>
              </div>
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-surface border border-border/40">
                  <span className="text-base flex-shrink-0 leading-none mt-0.5">{insight.icon}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data Preview Table */}
      {uploaded && (
        <div className="card-surface rounded-xl border border-border/50 p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Table className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Data Preview</h3>
            <span className="text-xs text-muted-foreground ml-1">(First 5 rows)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/60">
                  {["Product", "Category", "Units Sold", "Revenue", "Growth"].map((h) => (
                    <th key={h} className="text-left text-muted-foreground font-medium pb-2.5 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-surface/50 transition-colors">
                    <td className="py-2.5 pr-4 text-foreground font-medium">{row.product}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{row.category}</td>
                    <td className="py-2.5 pr-4 text-foreground">{row.sales.toLocaleString()}</td>
                    <td className="py-2.5 pr-4 text-foreground">{row.revenue}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-teal-soft font-semibold">{row.growth}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
