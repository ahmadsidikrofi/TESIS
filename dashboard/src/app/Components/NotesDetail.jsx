import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from '@phosphor-icons/react';
const NotesDetail = ({ title, description }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-amber-500 h-8 rounded-lg p-1">
          <Eye size={22} />
        </DialogTrigger>
        <DialogContent className="w-1/2 min-h-8 px-8 items-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription dangerouslySetInnerHTML={{ __html: description }} className="font-medium mt-4" />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesDetail;
