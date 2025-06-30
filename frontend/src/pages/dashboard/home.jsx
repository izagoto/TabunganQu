import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon, PlusCircleIcon, MinusCircleIcon, ChartBarIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [incomeForm, setIncomeForm] = useState({ deskripsi: '', jumlah: '', akun: '', kategori: '', tanggal: '' });
  const [expenseForm, setExpenseForm] = useState({ deskripsi: '', jumlah: '', akun: '', kategori: '', tanggal: '' });
  const [incomeError, setIncomeError] = useState({});
  const [expenseError, setExpenseError] = useState({});
  const navigate = useNavigate();
  // ALERT LOGIN BERHASIL
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertVisible, setAlertVisible] = useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("showLoginSuccess")) {
      setAlert("Berhasil login! Selamat datang di dashboard.");
      setAlertType("success");
      setAlertVisible(true);
      localStorage.removeItem("showLoginSuccess");
    }
  }, []);
  React.useEffect(() => {
    if (alert) {
      setAlertVisible(true);
      // Progress bar berjalan 3 detik, baru alert menghilang
      const hideTimer = setTimeout(() => {
        setAlertVisible(false);
        setTimeout(() => setAlert("") , 500); // waktu fade out 0.5s
      }, 3000);
      return () => { clearTimeout(hideTimer); };
    }
  }, [alert]);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'income') setIncomeForm({ ...incomeForm, [name]: value });
    else setExpenseForm({ ...expenseForm, [name]: value });
  };

  const validateForm = (form) => {
    const err = {};
    if (!form.deskripsi) err.deskripsi = 'Deskripsi wajib diisi';
    if (!form.jumlah) err.jumlah = 'Jumlah wajib diisi';
    if (!form.akun) err.akun = 'Akun wajib diisi';
    if (!form.kategori) err.kategori = 'Kategori wajib diisi';
    if (!form.tanggal) err.tanggal = 'Tanggal wajib diisi';
    return err;
  };

  const handleSubmit = (type) => {
    if (type === 'income') {
      const err = validateForm(incomeForm);
      setIncomeError(err);
      if (Object.keys(err).length > 0) return;
      setOpenIncome(false);
      setIncomeForm({ deskripsi: '', jumlah: '', akun: '', kategori: '', tanggal: '' });
      setIncomeError({});
    } else {
      const err = validateForm(expenseForm);
      setExpenseError(err);
      if (Object.keys(err).length > 0) return;
      setOpenExpense(false);
      setExpenseForm({ deskripsi: '', jumlah: '', akun: '', kategori: '', tanggal: '' });
      setExpenseError({});
    }
    // TODO: Integrasi ke backend
  };

  return (
    <div className="mt-12">
      {/* ALERT GLOBAL DI SUDUT KANAN ATAS */}
      {alert && (
        <div
          className={`fixed z-50 right-6 top-6 min-w-[320px] max-w-xs flex flex-col items-start gap-2 rounded-lg shadow-lg px-5 py-4 border transition-opacity duration-500
            ${alertType === 'success'
              ? 'bg-green-100 border-green-300 text-green-800'
              : 'bg-red-100 border-red-300 text-red-800'}
            ${alertVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-start gap-3 w-full">
            <span className="mt-1">
              {alertType === 'success' ? (
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              ) : (
                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              )}
            </span>
            <div className="flex-1">
              <span className="font-bold mr-1">{alertType === 'success' ? 'Success:' : 'Error:'}</span>
              <span>{alert}</span>
            </div>
            <button
              onClick={() => setAlert("")}
              className="ml-2 p-1 rounded hover:bg-black/10 transition"
              aria-label="Close alert"
            >
              <XMarkIcon className={`h-5 w-5 ${alertType === 'success' ? 'text-green-600' : 'text-red-500'}`} />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-green-200 rounded overflow-hidden mt-2">
            <div
              className="h-full bg-green-500 transition-all duration-3000"
              style={{ width: alertVisible ? '100%' : '0%', transition: 'width 3s linear' }}
            />
          </div>
        </div>
      )}
      {/* END ALERT */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className={`font-normal text-blue-gray-600 ${footer && 'text-xs'}`}>
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;<span className="text-xs">{footer.label}</span>
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <StatisticsChart
            key={statisticsChartsData[0].title}
            {...statisticsChartsData[0]}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{statisticsChartsData[0].footer}
              </Typography>
            }
          />
        </div>
        <div className="xl:col-span-4">
          <StatisticsChart
            key={statisticsChartsData[1].title}
            {...statisticsChartsData[1]}
            chart={null}
            footer={null}
          />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex flex-col items-start gap-4 p-6"
          >
              <Typography variant="h6" color="blue-gray" className="mb-1">
              Aksi Cepat Keuangan
              </Typography>
            <div className="grid grid-cols-3 gap-6 w-full text-center py-6">
              <div className="flex flex-col items-center cursor-pointer group transition-all duration-200 hover:scale-105" onClick={() => setOpenIncome(true)}>
                <div className="bg-cyan-50 group-hover:bg-cyan-100 rounded-full p-4 mb-2 transition-all duration-200">
                  <PlusCircleIcon className="h-10 w-10 text-cyan-600 group-hover:text-cyan-800 transition-all duration-200" />
                </div>
                <span className="font-semibold text-blue-gray-800 group-hover:text-cyan-700 transition-all duration-200">Tambah Pemasukan</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group transition-all duration-200 hover:scale-105" onClick={() => setOpenExpense(true)}>
                <div className="bg-red-50 group-hover:bg-red-100 rounded-full p-4 mb-2 transition-all duration-200">
                  <MinusCircleIcon className="h-10 w-10 text-red-500 group-hover:text-red-700 transition-all duration-200" />
                </div>
                <span className="font-semibold text-blue-gray-800 group-hover:text-red-700 transition-all duration-200">Tambah Pengeluaran</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group transition-all duration-200 hover:scale-105" onClick={() => navigate('/finance-report')}>
                <div className="bg-blue-gray-50 group-hover:bg-blue-gray-100 rounded-full p-4 mb-2 transition-all duration-200">
                  <ChartBarIcon className="h-10 w-10 text-blue-gray-700 group-hover:text-blue-gray-900 transition-all duration-200" />
                </div>
                <span className="font-semibold text-blue-gray-800 group-hover:text-blue-gray-900 transition-all duration-200">Lihat Laporan</span>
              </div>
            </div>
          </CardHeader>
          {/* Modal Tambah Pemasukan */}
          {openIncome && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <Typography variant="h6" color="blue-gray" className="mb-4">Tambah Pemasukan</Typography>
                <form onSubmit={e => { e.preventDefault(); handleSubmit('income'); }} className="flex flex-col gap-3">
                  <input name="deskripsi" value={incomeForm.deskripsi} onChange={e => handleInputChange(e, 'income')} placeholder="Deskripsi" className={`border rounded px-3 py-2 ${incomeError.deskripsi ? 'border-red-500' : ''}`} />
                  {incomeError.deskripsi && <span className="text-xs text-red-500 ml-1">{incomeError.deskripsi}</span>}
                  <input name="jumlah" value={incomeForm.jumlah} onChange={e => handleInputChange(e, 'income')} placeholder="Jumlah" type="number" className={`border rounded px-3 py-2 ${incomeError.jumlah ? 'border-red-500' : ''}`} />
                  {incomeError.jumlah && <span className="text-xs text-red-500 ml-1">{incomeError.jumlah}</span>}
                  <input name="akun" value={incomeForm.akun} onChange={e => handleInputChange(e, 'income')} placeholder="Akun" className={`border rounded px-3 py-2 ${incomeError.akun ? 'border-red-500' : ''}`} />
                  {incomeError.akun && <span className="text-xs text-red-500 ml-1">{incomeError.akun}</span>}
                  <input name="kategori" value={incomeForm.kategori} onChange={e => handleInputChange(e, 'income')} placeholder="Kategori" className={`border rounded px-3 py-2 ${incomeError.kategori ? 'border-red-500' : ''}`} />
                  {incomeError.kategori && <span className="text-xs text-red-500 ml-1">{incomeError.kategori}</span>}
                  <input name="tanggal" value={incomeForm.tanggal} onChange={e => handleInputChange(e, 'income')} placeholder="Tanggal" type="datetime-local" className={`border rounded px-3 py-2 ${incomeError.tanggal ? 'border-red-500' : ''}`} />
                  {incomeError.tanggal && <span className="text-xs text-red-500 ml-1">{incomeError.tanggal}</span>}
                  <div className="flex gap-2 mt-2 justify-end">
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">Simpan</button>
                    <button type="button" onClick={() => setOpenIncome(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">Batal</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Modal Tambah Pengeluaran */}
          {openExpense && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <Typography variant="h6" color="blue-gray" className="mb-4">Tambah Pengeluaran</Typography>
                <form onSubmit={e => { e.preventDefault(); handleSubmit('expense'); }} className="flex flex-col gap-3">
                  <input name="deskripsi" value={expenseForm.deskripsi} onChange={e => handleInputChange(e, 'expense')} placeholder="Deskripsi" className={`border rounded px-3 py-2 ${expenseError.deskripsi ? 'border-red-500' : ''}`} />
                  {expenseError.deskripsi && <span className="text-xs text-red-500 ml-1">{expenseError.deskripsi}</span>}
                  <input name="jumlah" value={expenseForm.jumlah} onChange={e => handleInputChange(e, 'expense')} placeholder="Jumlah" type="number" className={`border rounded px-3 py-2 ${expenseError.jumlah ? 'border-red-500' : ''}`} />
                  {expenseError.jumlah && <span className="text-xs text-red-500 ml-1">{expenseError.jumlah}</span>}
                  <input name="akun" value={expenseForm.akun} onChange={e => handleInputChange(e, 'expense')} placeholder="Akun" className={`border rounded px-3 py-2 ${expenseError.akun ? 'border-red-500' : ''}`} />
                  {expenseError.akun && <span className="text-xs text-red-500 ml-1">{expenseError.akun}</span>}
                  <input name="kategori" value={expenseForm.kategori} onChange={e => handleInputChange(e, 'expense')} placeholder="Kategori" className={`border rounded px-3 py-2 ${expenseError.kategori ? 'border-red-500' : ''}`} />
                  {expenseError.kategori && <span className="text-xs text-red-500 ml-1">{expenseError.kategori}</span>}
                  <input name="tanggal" value={expenseForm.tanggal} onChange={e => handleInputChange(e, 'expense')} placeholder="Tanggal" type="datetime-local" className={`border rounded px-3 py-2 ${expenseError.tanggal ? 'border-red-500' : ''}`} />
                  {expenseError.tanggal && <span className="text-xs text-red-500 ml-1">{expenseError.tanggal}</span>}
                  <div className="flex gap-2 mt-2 justify-end">
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Simpan</button>
                    <button type="button" onClick={() => setOpenExpense(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">Batal</button>
                  </div>
                </form>
                          </div>
                          </div>
                )}
        </Card>
        {/* Card Transaksi Terbaru */}
        <Card className="border border-blue-gray-100 shadow-md hover:shadow-lg transition-all duration-200">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 border-b border-blue-gray-50 bg-blue-gray-50/40"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
              Transaksi Terbaru
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {[ // Data dummy transaksi terbaru
              { tipe: 'Pemasukan', deskripsi: 'Gaji Bulanan', jumlah: 5000000, tanggal: '2025-06-26T09:30' },
              { tipe: 'Pengeluaran', deskripsi: 'Belanja', jumlah: 1500000, tanggal: '2025-06-25T15:10' },
              { tipe: 'Pemasukan', deskripsi: 'Freelance', jumlah: 2000000, tanggal: '2025-06-24T20:00' },
              { tipe: 'Pengeluaran', deskripsi: 'Makan', jumlah: 50000, tanggal: '2025-06-24T12:30' },
            ].map((trx, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-blue-gray-50/40 rounded transition-all duration-150">
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${trx.tipe === 'Pemasukan' ? 'bg-cyan-100 text-cyan-700' : 'bg-red-100 text-red-600'}`}>{trx.tipe}</span>
                  <span className="ml-1 font-medium text-blue-gray-800">{trx.deskripsi}</span>
                  </div>
                <div className="text-right">
                  <div className={`font-bold ${trx.tipe === 'Pemasukan' ? 'text-cyan-700' : 'text-red-600'}`}>
                    {trx.tipe === 'Pemasukan' ? '+' : '-'}Rp {trx.jumlah.toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-gray-400">{new Date(trx.tanggal).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
