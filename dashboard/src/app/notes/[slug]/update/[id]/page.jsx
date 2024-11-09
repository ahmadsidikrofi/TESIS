'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const Update = ({ params }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = params;
  const { slug } = params;
  const editorRef = useRef(null);
  useEffect(() => {
    axios.get(`http://flowbeat.web.id/api/note/${id} `).then((response) => {
      console.log(response.data.note);
      const data = response.data.note;
      setTitle(data.title);
      setDescription(data.description);
    });
  }, [id]);
  const edit = async (e) => {
    e.preventDefault();
    const cleanDescription = description.replace(/<\/?p>/g, '');
    await axios
      .put(`http://flowbeat.web.id/api/note/${id}`, {
        title,
        description: cleanDescription,
      })
      .then((response) => {
        toast({
          title: 'Notes Terupdate',
          description: 'Notes berhasil Terupdate',
        });
        router.push(`/notes/${slug}`);
      });
  };
  return (
    <div className="ml-2 mt-10 mb-10">
      <div className="flex items-center gap-5">
        <button onClick={() => router.push(`/notes/${slug}`)}>
          <ArrowCircleLeft size={40} />
        </button>
        <h1 className="text-3xl text-[#5d87ff] font-bold">Perbarui Notes</h1>
      </div>
      <div className="mt-10 ml-10 flex flex-col gap-3">
        <div>
          <label htmlFor="title" className="text-lg  block mb-2 font-medium text-gray-900">
            Judul Notes
          </label>
          <input type="text" value={title} name="title" id="title" onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg h-10 px-5 w-[50vw]" placeholder="Judul Notes" required />
        </div>
        <div className="my-5">
          <label htmlFor="description" className="text-lg block mb-2 font-medium text-gray-900">
            Deskripsi Notes
          </label>
          <Editor
            apiKey="o61nnuwogclhd3z601n2k0zh479m9kbnsivauhaxrlu4jco0"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(content) => setDescription(content)}
            value={description}
            textareaName="description"
            placeholder="Deskripsi Note."
            init={{
              height: 300,
              width: 700,
              menubar: true,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
              toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        <button onClick={edit} type="submit" className="w-32 mt-10 text-white bg-sky-700 rounded-lg text-sm p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Perbarui Notes
        </button>
      </div>
    </div>
  );
};
export default Update;
