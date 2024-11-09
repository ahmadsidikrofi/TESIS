'use client';

import axios from 'axios';
import { useRef, useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { useFlowbeatApi } from '@/context/ApiProvider';
import { useToast } from '@/components/ui/use-toast';
const Create = ({ params: { slug } }) => {
  const { axios } = useFlowbeatApi();
  const router = useRouter();
  const { toast } = useToast();
  const editorRef = useRef(null);
  const [notes, setNotes] = useState({
    title: '',
    description: '',
  });
  const handleDescription = (content) => {
    setNotes({ ...notes, description: content });
  };
  const handleTitle = (e) => {
    setNotes({ ...notes, title: e.target.value });
  };
  const createData = async (e) => {
    e.preventDefault();
    const payload = {
      title: notes.title,
      description: notes.description,
    };
    await axios
      .post(`/note/${slug}`, payload)
      .then((response) => {
        if (response.data.success === true) {
          toast({
            title: 'Notes Ditambahkan',
            description: 'Notes berhasil Ditambahkan',
          });
          router.push(`/notes/${slug}`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="ml-2 mt-10 mb-10">
      <div className="flex items-center gap-5">
        <button onClick={() => router.push(`/notes/${slug}`)}>
          <ArrowCircleLeft size={40} />
        </button>
        <h1 className="text-3xl text-[#5d87ff] font-bold">Membuat Notes</h1>
      </div>
      <div className="mt-10 ml-10 flex flex-col gap-3">
        <div>
          <label htmlFor="title" className="text-lg  block mb-2 font-medium text-gray-900 dark:text-white">
            Judul Notes
          </label>
          <input type="text" name="title" id="title" onChange={handleTitle} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg h-10 px-5 w-[50vw]" placeholder="Judul Notes" required />
        </div>
        <div className="my-5">
          <label htmlFor="description" className="text-lg block mb-2 font-medium text-gray-900 dark:text-white">
            Deskripsi Notes
          </label>
          <Editor
            apiKey="o61nnuwogclhd3z601n2k0zh479m9kbnsivauhaxrlu4jco0"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={handleDescription}
            textareaName="description"
            placeholder="Deskripsi Notes."
            init={{
              height: 300,
              width: 700,
              menubar: true,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'bullish'],
              toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
              content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        <button onClick={createData} type="submit" className="w-32 mt-10 text-white bg-sky-700 rounded-lg text-sm p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Buat Notes
        </button>
      </div>
    </div>
  );
};
export default Create;
