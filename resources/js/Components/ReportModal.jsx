import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import FileDropzone from './FileDropzone';
import { useForm } from '@inertiajs/react';

export default function ReportModal({ userId, show, onClose }) {
    const { data, setData, post, processing } = useForm({
        reason: '',
        evidence: null,
    });
    const reasons = [
        'Selling counterfeit or fake products',
        'Failure to ship the product or excessive delay in shipping',
        "Sending the wrong item or a product that doesn't match the description",
        'Lack of customer support or communication',
        'Rude or inappropriate behavior toward customers',
        'False or misleading product information',
        'Deceptive or misleading pricing',
        'Violation of platform rules and policies',
        'Charging additional fees without prior notice',
        'Multiple complaints and low ratings from other customers',
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('report.store', userId), { forceFormData: true, onSuccess: onClose });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6 space-y-4" encType="multipart/form-data">
                <h3 className="text-lg font-semibold text-gray-900">Report Store</h3>
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
