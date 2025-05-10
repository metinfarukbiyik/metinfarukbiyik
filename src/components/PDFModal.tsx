import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export function PDFModal({ isOpen, onClose, pdfUrl }: PDFModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-5xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-[90vh] max-h-[95vh] flex flex-col bg-white p-0 shadow-2xl border-none justify-start items-stretch rounded-xl sm:rounded-2xl"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' }}
      >
        {/* Başlık */}
        <div className="flex items-center justify-center px-4 sm:px-8 pt-4 sm:pt-6 pb-2 border-b border-gray-100 relative">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-center w-full">Metin Faruk Bıyık - Sertifika</DialogTitle>
        </div>
        {/* PDF */}
        <div className="flex-1 overflow-auto bg-gray-50 rounded-b-xl">
          <iframe
            src={pdfUrl}
            className="w-full h-[60vh] sm:h-full min-h-[300px] border-0"
            title="PDF Viewer"
            style={{ minHeight: 300 }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 