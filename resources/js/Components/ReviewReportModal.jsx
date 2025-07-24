import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import FileDropzone from './FileDropzone';
import { useForm } from '@inertiajs/react';

export default function ReviewReportModal({ reviewId, show, onClose }) {
    const { data, setData, post, processing } = useForm({
        reason: '',
        evidence: null,
    });
    const reasons = [
        'Spam or promotional content',
        'Offensive language or hate speech',
        'False or misleading information',
        'Personal attacks or harassment',
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('reviews.report', reviewId), { forceFormData: true, onSuccess: onClose });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6 space-y-4" encType="multipart/form-data">
                <h3 className="text-lg font-semibold text-gray-900">Report Review</h3>
                <div>
                    <select value={data.reason} onChange={e => setData('reason', e.target.value)} className="mt-2 w-full border-gray-300 rounded">
                        <option value="" disabled>Select reason</option>
                        {reasons.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <FileDropzone
                        name="evidence"
                        accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
                        value={data.evidence}
                        onChange={(file) => setData('evidence', file)}
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
                    <PrimaryButton disabled={!data.reason || processing}>Submit</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
