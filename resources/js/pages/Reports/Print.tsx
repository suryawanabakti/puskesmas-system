// resources/js/Pages/Reports/Print.tsx
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface ReportsPrintProps {
    reportType: 'patients' | 'examinations' | 'referrals' | 'medicines';
    period: {
        start: string;
        end: string;
    };
    data: any;
}

export default function ReportsPrint({ reportType, period, data }: ReportsPrintProps) {
    const reportTitles = {
        patients: 'Laporan Data Pasien',
        examinations: 'Laporan Pemeriksaan',
        referrals: 'Laporan Rujukan',
        medicines: 'Laporan Stok Obat',
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: id });
    };

    return (
        <>
            <Head title={`Cetak ${reportTitles[reportType]}`} />
            <div className="mx-auto max-w-4xl p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold">PUSKESMAS RATTE LEMBANG KADUNDUNG</h1>
                    <p className="text-sm">Kecamatan Masanda, Tana Toraja</p>
                    <div className="my-4 border-t-2 border-b-2 border-black py-2">
                        <h2 className="text-xl font-bold">{reportTitles[reportType]}</h2>
                        <p>
                            Periode: {formatDate(period.start)} - {formatDate(period.end)}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="mb-2">Tanggal Cetak: {format(new Date(), 'dd MMMM yyyy', { locale: id })}</p>
                    <p>Dicetak oleh: Administrator</p>
                </div>

                {reportType === 'patients' && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">No.</th>
                                <th className="border border-gray-300 p-2">ID Pasien</th>
                                <th className="border border-gray-300 p-2">Nama</th>
                                <th className="border border-gray-300 p-2">NIK</th>
                                <th className="border border-gray-300 p-2">Jenis Kelamin</th>
                                <th className="border border-gray-300 p-2">Tanggal Lahir</th>
                                <th className="border border-gray-300 p-2">Alamat</th>
                                <th className="border border-gray-300 p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((patient: any, index: number) => (
                                <tr key={patient.id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{patient.patient_id}</td>
                                    <td className="border border-gray-300 p-2">{patient.name}</td>
                                    <td className="border border-gray-300 p-2">{patient.nik}</td>
                                    <td className="border border-gray-300 p-2">{patient.gender}</td>
                                    <td className="border border-gray-300 p-2">{patient.birth_date}</td>
                                    <td className="border border-gray-300 p-2">{patient.address}</td>
                                    <td className="border border-gray-300 p-2">{patient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {reportType === 'examinations' && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">No.</th>
                                <th className="border border-gray-300 p-2">ID Pemeriksaan</th>
                                <th className="border border-gray-300 p-2">Tanggal</th>
                                <th className="border border-gray-300 p-2">Nama Pasien</th>
                                <th className="border border-gray-300 p-2">Keluhan</th>
                                <th className="border border-gray-300 p-2">Diagnosis</th>
                                <th className="border border-gray-300 p-2">Penanganan</th>
                                <th className="border border-gray-300 p-2">Dokter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((examination: any, index: number) => (
                                <tr key={examination.id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{examination.examination_id}</td>
                                    <td className="border border-gray-300 p-2">{examination.examination_date}</td>
                                    <td className="border border-gray-300 p-2">{examination.patient?.name}</td>
                                    <td className="border border-gray-300 p-2">{examination.complaint}</td>
                                    <td className="border border-gray-300 p-2">{examination.diagnosis}</td>
                                    <td className="border border-gray-300 p-2">{examination.treatment}</td>
                                    <td className="border border-gray-300 p-2">{examination.doctor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {reportType === 'referrals' && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">No.</th>
                                <th className="border border-gray-300 p-2">ID Rujukan</th>
                                <th className="border border-gray-300 p-2">Tanggal</th>
                                <th className="border border-gray-300 p-2">Nama Pasien</th>
                                <th className="border border-gray-300 p-2">Diagnosis</th>
                                <th className="border border-gray-300 p-2">Dirujuk Ke</th>
                                <th className="border border-gray-300 p-2">Alasan</th>
                                <th className="border border-gray-300 p-2">Status</th>
                                <th className="border border-gray-300 p-2">Dokter</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((referral: any, index: number) => (
                                <tr key={referral.id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{referral.referral_id}</td>
                                    <td className="border border-gray-300 p-2">{referral.referral_date}</td>
                                    <td className="border border-gray-300 p-2">{referral.patient?.name}</td>
                                    <td className="border border-gray-300 p-2">{referral.diagnosis}</td>
                                    <td className="border border-gray-300 p-2">{referral.referred_to}</td>
                                    <td className="border border-gray-300 p-2">{referral.reason}</td>
                                    <td className="border border-gray-300 p-2">{referral.status === 'completed' ? 'Selesai' : 'Menunggu'}</td>
                                    <td className="border border-gray-300 p-2">{referral.doctor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {reportType === 'medicines' && (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">No.</th>
                                <th className="border border-gray-300 p-2">ID Obat</th>
                                <th className="border border-gray-300 p-2">Nama Obat</th>
                                <th className="border border-gray-300 p-2">Kategori</th>
                                <th className="border border-gray-300 p-2">Satuan</th>
                                <th className="border border-gray-300 p-2">Stok</th>
                                <th className="border border-gray-300 p-2">Kadaluarsa</th>
                                <th className="border border-gray-300 p-2">Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((medicine: any, index: number) => (
                                <tr key={medicine.id}>
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{medicine.medicine_id}</td>
                                    <td className="border border-gray-300 p-2">{medicine.name}</td>
                                    <td className="border border-gray-300 p-2">{medicine.category}</td>
                                    <td className="border border-gray-300 p-2">{medicine.unit}</td>
                                    <td className="border border-gray-300 p-2">{medicine.stock}</td>
                                    <td className="border border-gray-300 p-2">{medicine.expiry_date}</td>
                                    <td className="border border-gray-300 p-2">{medicine.supplier}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-12 text-right">
                    <p>Tana Toraja, {format(new Date(), 'dd MMMM yyyy', { locale: id })}</p>
                    <div className="h-20"></div>
                    <p className="font-bold">Kepala Puskesmas</p>
                    <p>NIP. .........................</p>
                </div>

                <div className="mt-8 text-center text-sm">
                    <p>Dokumen ini dicetak secara otomatis oleh Sistem Informasi Pelayanan Pasien</p>
                    <p>Puskesmas Ratte Lembang Kadundung</p>
                </div>
            </div>
        </>
    );
}
