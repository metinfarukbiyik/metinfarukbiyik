import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, AlertCircle } from "lucide-react";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[90vw] max-w-4xl md:max-w-5xl lg:max-w-6xl h-[85vh] max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 p-0 shadow-2xl border-none justify-start items-stretch rounded-xl sm:rounded-2xl my-8 overflow-hidden"
        style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          position: 'fixed',
          margin: '0 auto'
        }}
      >
        {/* Başlık ve yeni sekmede aç butonu */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-2 border-b border-gray-100 dark:border-gray-700 relative gap-2">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-center w-full text-gray-900 dark:text-white">{title}</DialogTitle>
          {/* Yeni Sekmede Aç butonu - sadece mobilde görünsün */}
          <div className="flex justify-center sm:hidden w-full sm:w-auto">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-secondary dark:text-secondary hover:underline text-xs sm:text-sm px-2 py-1 rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Yeni Sekmede Aç
            </a>
          </div>
        </div>

        {/* Mobil uyarı - sadece mobilde göster */}
        <div className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 text-xs text-blue-600 dark:text-blue-300 sm:hidden">
          <AlertCircle className="w-4 h-4" />
          <span>Bu pencereyi sağlıklı görüntüleyemiyorsanız yukarıdaki Yeni Sekmede Aç seçeneğini kullanabilirsiniz.</span>
        </div>

        {/* PDF */}
        <div className="flex-1 flex justify-center items-center bg-gray-50 dark:bg-zinc-800 rounded-b-xl overflow-x-auto overflow-y-auto">
          <div className="w-full h-full max-w-full max-h-full flex justify-center items-center">
            <iframe
              src={pdfUrl}
              className="w-full max-w-full h-[60vh] sm:h-[75vh] max-h-[75vh] border-0 rounded-md bg-white dark:bg-zinc-900 shadow"
              title="PDF Viewer"
              style={{ minHeight: 300 }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 