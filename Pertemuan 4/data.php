<?php
// Tambahkan header agar browser tahu ini adalah response JSON
header('Content-Type: application/json');

// Simulasi "database sederhana" berupa array
$profil = [
    ['nama' => 'Budi',    'pekerjaan' => 'Web Developer',  'lokasi' => 'Jakarta'],
    ['nama' => 'Sari',    'pekerjaan' => 'UI/UX Designer',  'lokasi' => 'Bandung'],
    ['nama' => 'Rizky',   'pekerjaan' => 'Data Analyst',    'lokasi' => 'Surabaya'],
    ['nama' => 'Dewi',    'pekerjaan' => 'DevOps Engineer', 'lokasi' => 'Yogyakarta'],
    ['nama' => 'Hendra',  'pekerjaan' => 'Backend Engineer','lokasi' => 'Medan'],
];

// Ubah array PHP menjadi format JSON lalu tampilkan
echo json_encode($profil);
?>
