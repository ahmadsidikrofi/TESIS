import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  return (
    <div className="flex flex-col items-center xl:w-[1010px] 2xl:w-[1300px]">
      <div className="items-center justify-center py-20">
        <h1 className="text-5xl text-Black font-bold text-center">Pertanyaan yang Sering</h1>
        <h1 className="text-4xl text-[#5d87ff] font-bold text-center py-5 mb-5">Diajukan</h1>
        <Accordion className="w-[600px]" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Bagaimana cara memantau kondisi pasien secara real-time?</AccordionTrigger>
            <AccordionContent>Anda bisa pergi ke halaman pasien dan menekan Detail Pasien. Di sana, Anda dapat memonitoring alat vital pasien secara real-time.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bagaimana cara melihat notifikasi?</AccordionTrigger>
            <AccordionContent>Anda bisa pergi ke pojok kiri atas, di sana Anda akan menemukan tombol lonceng untuk notifikasi.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Bagaimana cara menambahkan notes?</AccordionTrigger>
            <AccordionContent>Anda dapat menuju ke halaman Notes, di mana Anda akan menemukan tombol Create. Di sana, Anda dapat menambahkan judul dan deskripsi untuk catatan baru Anda.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Bagaimana cara sorting perawatan pasien?</AccordionTrigger>
            <AccordionContent>Pergilah ke halaman pasien di mana terdapat tabel dengan kepala tabel Perawatan. Di sana, Anda dapat mengklik Perawatan untuk menyortir pasien berdasarkan perawatan yang mereka terima.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default Help;
