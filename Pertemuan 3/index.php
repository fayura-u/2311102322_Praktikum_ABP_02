<?php
$data_ninja = [
    ['nama' => 'Naruto Uzumaki', 'nim' => '2021001', 'nilai_tugas' => 0, 'nilai_uts' => 90, 'nilai_uas' => 0],
    ['nama' => 'Sasuke Uchiha', 'nim' => '2021002', 'nilai_tugas' => 90, 'nilai_uts' => 88, 'nilai_uas' => 92],
    ['nama' => 'Sakura Haruno', 'nim' => '2021003', 'nilai_tugas' => 75, 'nilai_uts' => 70, 'nilai_uas' => 78],
    ['nama' => 'Hinata Hyuga', 'nim' => '2021004', 'nilai_tugas' => 88, 'nilai_uts' => 85, 'nilai_uas' => 86],
    ['nama' => 'Shikamaru Nara', 'nim' => '2021005', 'nilai_tugas' => 100, 'nilai_uts' => 95, 'nilai_uas' => 95],
    ['nama' => 'Choji Akimichi', 'nim' => '2021006', 'nilai_tugas' => 78, 'nilai_uts' => 75, 'nilai_uas' => 80],
    ['nama' => 'Ino Yamanaka', 'nim' => '2021007', 'nilai_tugas' => 82, 'nilai_uts' => 81, 'nilai_uas' => 83],
    ['nama' => 'Kiba Inuzuka', 'nim' => '2021008', 'nilai_tugas' => 95, 'nilai_uts' => 92, 'nilai_uas' => 94],
    ['nama' => 'Shino Aburame', 'nim' => '2021009', 'nilai_tugas' => 70, 'nilai_uts' => 68, 'nilai_uas' => 72],
    ['nama' => 'Neji Hyuga', 'nim' => '2021010', 'nilai_tugas' => 87, 'nilai_uts' => 89, 'nilai_uas' => 88],
];

function hitungNilaiAkhir($tugas, $uts, $uas) {
    return ($tugas * 0.20) + ($uts * 0.40) + ($uas * 0.40);
}

function tentukanGrade($nilai_akhir) {
    if ($nilai_akhir >= 85) {
        return 'A';
    } elseif ($nilai_akhir >= 75) {
        return 'B';
    } elseif ($nilai_akhir >= 65) {
        return 'C';
    } elseif ($nilai_akhir >= 55) {
        return 'D';
    }

    return 'E';
}

$daftar_ninja = [];

foreach ($data_ninja as $row) {
    $nilai_akhir = hitungNilaiAkhir(
        $row['nilai_tugas'],
        $row['nilai_uts'],
        $row['nilai_uas']
    );

    $grade = tentukanGrade($nilai_akhir);
    $status = ($nilai_akhir >= 60) ? 'Lulus' : 'Tidak Lulus';

    $daftar_ninja[] = [
        'nama' => $row['nama'],
        'nim' => $row['nim'],
        'nilai_akhir' => round($nilai_akhir, 2),
        'grade' => $grade,
        'status' => $status,
    ];
}

$total_nilai = 0;
$nilai_tertinggi = 0;
$jumlah = count($daftar_ninja);

foreach ($daftar_ninja as $ninja) {
    $total_nilai += $ninja['nilai_akhir'];
    if ($ninja['nilai_akhir'] > $nilai_tertinggi) {
        $nilai_tertinggi = $ninja['nilai_akhir'];
    }
}

$rata_rata = ($jumlah > 0) ? round($total_nilai / $jumlah, 2) : 0;

function badgeGrade($grade) {
    $badgeClass = [
        'A' => 'success',
        'B' => 'info',
        'C' => 'warning',
        'D' => 'danger',
        'E' => 'danger',
    ];

    $class = $badgeClass[$grade] ?? 'secondary';
    return "<span class='badge bg-{$class}'>{$grade}</span>";
}

function badgeStatus($status) {
    $class = ($status === 'Lulus') ? 'success' : 'danger';
    $icon = ($status === 'Lulus') ? '&#10004;' : '&#10008;';
    return "<span class='badge bg-{$class}'>{$icon} {$status}</span>";
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konoha Shinobi Academy</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header-custom {
            background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFA500 100%);
            color: white;
            padding: 3rem 0;
            margin-bottom: 2.5rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
        }

        .header-custom h1 {
            font-weight: 800;
            letter-spacing: -0.5px;
            font-size: 2.5rem;
        }

        .header-custom p {
            margin-top: 0.5rem;
            opacity: 0.95;
            font-weight: 500;
        }

        .card {
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .table-dark {
            background-color: #FF8C42 !important;
        }

        .table thead th {
            color: white;
            font-weight: 600;
            border: none;
        }

        .table tbody tr {
            border-bottom: 1px solid #f0f0f0;
        }

        .table tbody tr:hover {
            background-color: #fff8f5;
        }

        .badge {
            font-weight: 600;
            padding: 0.5rem 0.75rem;
        }

        .bg-success {
            background-color: #4CAF50 !important;
        }

        .bg-danger {
            background-color: #FF4757 !important;
        }

        .card-footer {
            background-color: #FFF5F0;
            border-top: 2px solid #FF8C42;
        }

        .stat-label {
            color: #FF6B35;
            font-weight: 600;
        }

        .stat-value {
            color: #FF8C42;
            font-weight: 800;
            font-size: 1.8rem;
        }

        code {
            color: #FF6B35;
            background-color: #FFF5F0;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
        }
    </style>
</head>
<body>
<div class="container my-4">
    <div class="header-custom text-center">
        <h1>&#9876;&#65039; Konoha Shinobi Academy</h1>
        <p>&#128203; Daftar Penilaian Ninja | Bobot: Tugas 20% &bull; Ujian Chunin Tertulis 40% &bull; Ujian Chunin 40% | Lulus &ge; 60</p>
    </div>

    <div class="card shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nama Ninja</th>
                        <th>ID Ninja</th>
                        <th>Skor Akhir</th>
                        <th>Rank</th>
                        <th>Status Kelulusan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $no = 1; ?>
                    <?php foreach ($daftar_ninja as $ninja): ?>
                    <tr>
                        <td><?= $no++ ?></td>
                        <td><strong><?= htmlspecialchars($ninja['nama']) ?></strong></td>
                        <td><code><?= htmlspecialchars($ninja['nim']) ?></code></td>
                        <td class="fw-bold"><?= $ninja['nilai_akhir'] ?></td>
                        <td><?= badgeGrade($ninja['grade']) ?></td>
                        <td><?= badgeStatus($ninja['status']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="card-footer bg-light">
            <div class="row g-3">
                <div class="col-md-4 col-sm-6">
                    <p class="stat-label small mb-1">&#128202; RATA-RATA NINJA</p>
                    <div class="stat-value"><?= $rata_rata ?></div>
                </div>
                <div class="col-md-4 col-sm-6">
                    <p class="stat-label small mb-1">&#127942; SKOR TERTINGGI</p>
                    <div class="stat-value"><?= $nilai_tertinggi ?></div>
                </div>
                <div class="col-md-4 col-sm-6">
                    <p class="stat-label small mb-1">&#9876;&#65039; JUMLAH NINJA</p>
                    <div class="stat-value"><?= $jumlah ?></div>
                </div>
            </div>
        </div>
    </div>

    <div class="text-center text-muted mt-4 small">
        &copy; <?= date('Y') ?> Fadhel Yussie Ramadhan &mdash; 2311102078
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
