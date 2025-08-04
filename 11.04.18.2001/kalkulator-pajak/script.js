function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatInput(input) {
  let angka = input.value.replace(/\D/g, "");
  let formatted = angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  input.value = formatted;
}

function hitungPajak() {
  let belanjaStr = document.getElementById("belanja").value;
  let belanja = parseFloat(belanjaStr.replace(/\./g, "")) || 0;
  let jenis = document.getElementById("jenisHitung").value;
  let jenisBelanja = document.getElementById("jenisBelanja").value;

  let dasarPengenaan = belanja;
  if (jenis === "dpp" && belanja >= 2000000) {
    dasarPengenaan = belanja * 100 / 111;
  }

  let tarifPPh = jenisBelanja === "jasa" ? 0.02 : 0.015;
  let ppn = 0;
  let pph = 0;

  if (belanja >= 2000000) {
    ppn = dasarPengenaan * 0.11;
    pph = dasarPengenaan * tarifPPh;
  } else {
    pph = dasarPengenaan * tarifPPh;
  }

  let totalPajak = ppn + pph;
  let hasilBersih = belanja - totalPajak;

  document.getElementById("hasil").innerHTML = `
    <b>DPP:</b> Rp ${formatRupiah(dasarPengenaan.toFixed(0))}<br>
    <b>PPN (11%):</b> Rp ${formatRupiah(ppn.toFixed(0))}<br>
    <b>PPh (${(tarifPPh*100).toFixed(1)}%):</b> Rp ${formatRupiah(pph.toFixed(0))}<br>
    <b>Total Pajak:</b> Rp ${formatRupiah(totalPajak.toFixed(0))}<br>
    <b>Hasil Bersih:</b> Rp ${formatRupiah(hasilBersih.toFixed(0))}
  `;
}