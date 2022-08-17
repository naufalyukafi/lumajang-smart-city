import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({value, setValue}) => {
    return (
    <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue}
        placeholder="Masukkan konten kegiatan di sini..." 
        className='min-h-screen'
  />);
}

export default TextEditor