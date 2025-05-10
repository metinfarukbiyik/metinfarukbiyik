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
        <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-b-xl overflow-auto">
          <div className="w-full h-full max-w-full max-h-full flex justify-center items-center">
            <iframe
              src={pdfUrl}
              className="w-full h-[60vh] sm:h-[75vh] max-w-full max-h-[75vh] border-0 rounded-md bg-white shadow"
              title="PDF Viewer"
              style={{ minHeight: 300 }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 