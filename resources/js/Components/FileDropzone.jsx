import {useDropzone} from 'react-dropzone';

export default function FileDropzone({ value, onChange, multiple = false, className = '', name }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple,
        onDrop: (accepted) => {
            if (multiple) {
                const existing = Array.isArray(value) ? value : [];
                onChange([...existing, ...accepted]);
            } else {
                onChange(accepted[0]);
            }
        },
    });

    const files = multiple ? value : value ? [value] : [];

    const removeFile = (index) => {
        if (multiple) {
            const copy = [...files];
            copy.splice(index, 1);
            onChange(copy);
        } else {
            onChange(null);
        }
    };

    return (
        <div
            {...getRootProps()}
            className={`rounded border border-dashed p-4 text-center ${isDragActive ? 'bg-gray-100' : ''} ${className}`}
        >
            <input {...getInputProps({ name })} />
            {files.length > 0 ? (
                <ul className="list-disc text-left">
                    {files.map((file, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                            <span>{file.name || file}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                }}
                                className="ml-2 text-red-500"
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Drag & drop files here, or click to select</p>
            )}
        </div>
    );
}
