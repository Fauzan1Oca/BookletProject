/* =========================================================
   ATTENDANCE PROTOTYPE
   - Time zone: Asia/Makassar (WITA)
   - Records are stored only in this browser for UI testing.
   - Replace localStorage with a secure backend before the event.
========================================================= */

const attendeeDirectory = {
  "YKKBI": ["Nama Peserta 01", "Nama Peserta 02", "Nama Peserta 03"],
  "PT Mulia Persada Indonesia": ["Nama Peserta MPI 01", "Nama Peserta MPI 02"],
  "PT Finnet Indonesia": ["Nama Peserta Finnet 01", "Nama Peserta Finnet 02"],
  "PT Hotel Bumikarsa Bidakara": ["Nama Peserta HBB 01", "Nama Peserta HBB 02"],
  "PT Bahana Sukma Sejahtera": ["Nama Peserta BSS 01", "Nama Peserta BSS 02"],
  "PT ORIX Indonesia Finance": ["Nama Peserta ORIX 01", "Nama Peserta ORIX 02"]
};

/*
  Setiap sesi memiliki jendela presensi sendiri. Waktu memakai UTC+08:00 (WITA).
  Batas global 08.00–18.00 tetap dijaga oleh daftar sesi berikut.
*/
const attendanceSessions = [
  {
    name: "Kedatangan Peserta",
    start: "2026-09-08T08:00:00+08:00",
    end: "2026-09-08T18:00:00+08:00"
  },
  {
    name: "Forum Komunikasi AP YKKBI — Sesi Pagi",
    start: "2026-09-09T08:00:00+08:00",
    end: "2026-09-09T12:00:00+08:00"
  },
  {
    name: "Sesi Paralel Forkom AP & GRC Forum",
    start: "2026-09-09T13:30:00+08:00",
    end: "2026-09-09T16:30:00+08:00"
  },
  {
    name: "Garden Dinner — Check-in",
    start: "2026-09-09T17:45:00+08:00",
    end: "2026-09-09T18:00:00+08:00"
  },
  {
    name: "Leader’s Talk & Sinergi Anak Perusahaan",
    start: "2026-09-10T08:00:00+08:00",
    end: "2026-09-10T11:45:00+08:00"
  },
  {
    name: "Social Activity & Penutupan",
    start: "2026-09-10T13:15:00+08:00",
    end: "2026-09-10T16:30:00+08:00"
  },
  {
    name: "Kepulangan Peserta & Panitia",
    start: "2026-09-11T08:00:00+08:00",
    end: "2026-09-11T18:00:00+08:00"
  }
].map((session) => ({
  ...session,
  startTime: new Date(session.start),
  endTime: new Date(session.end)
}));

const form = document.querySelector("#attendance");
const companyInput = document.querySelector("#companyInput");
const memberInput = document.querySelector("#memberInput");
const memberOptions = document.querySelector("#memberOptions");
const submitButton = document.querySelector("#attendanceSubmit");
const statusBadge = document.querySelector("#attendanceStatus");
const statusText = statusBadge?.querySelector("span");
const sessionName = document.querySelector("#sessionName");
const activityName = document.querySelector("#activeActivityName");
const witaClock = document.querySelector("#witaClock");
const message = document.querySelector("#attendanceMessage");

let currentSession = null;

function formatWita(date, withDate = false) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    ...(withDate
      ? { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
      : {}),
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

function findActiveSession(now) {
  return attendanceSessions.find(
    (session) => now >= session.startTime && now <= session.endTime
  ) || null;
}

function findNextSession(now) {
  return attendanceSessions.find((session) => session.startTime > now) || null;
}

function updateAttendanceWindow() {
  const now = new Date();
  currentSession = findActiveSession(now);
  const nextSession = findNextSession(now);

  if (witaClock) {
    witaClock.textContent = formatWita(now);
  }

  if (currentSession) {
    sessionName.textContent = currentSession.name;
    activityName.textContent = currentSession.name;
    statusText.textContent = "Presensi dibuka";
    statusBadge.classList.remove("is-closed");
    statusBadge.classList.add("is-open");
    submitButton.disabled = false;
    message.textContent = "Presensi aktif. Pastikan perusahaan dan nama peserta sudah benar.";
    return;
  }

  submitButton.disabled = true;
  statusText.textContent = "Belum dibuka";
  statusBadge.classList.remove("is-open");
  statusBadge.classList.add("is-closed");

  if (nextSession) {
    sessionName.textContent = `Sesi berikutnya: ${nextSession.name}`;
    activityName.textContent = nextSession.name;
    message.textContent = `Presensi berikutnya dibuka pada ${formatWita(nextSession.startTime, true)} WITA.`;
  } else {
    sessionName.textContent = "Seluruh sesi telah selesai";
    activityName.textContent = "Rangkaian Forkom AP YKKBI 2026 selesai";
    message.textContent = "Periode pencatatan kehadiran telah berakhir.";
  }
}

function populateMemberOptions(company) {
  if (!memberOptions) return;

  const names = attendeeDirectory[company] || [];
  memberOptions.replaceChildren(
    ...names.map((name) => {
      const option = document.createElement("option");
      option.value = name;
      return option;
    })
  );

  memberInput.value = "";
  memberInput.placeholder = names.length
    ? "Cari atau pilih nama anggota"
    : "Pilih perusahaan terlebih dahulu";
}

function setFormMessage(text, type = "") {
  message.textContent = text;
  message.classList.remove("is-success", "is-error");
  if (type) message.classList.add(`is-${type}`);
}

companyInput?.addEventListener("change", (event) => {
  populateMemberOptions(event.target.value.trim());
});

companyInput?.addEventListener("input", (event) => {
  if (attendeeDirectory[event.target.value.trim()]) {
    populateMemberOptions(event.target.value.trim());
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  updateAttendanceWindow();

  if (!currentSession) {
    setFormMessage("Presensi tidak dapat dicatat karena tidak ada sesi aktif.", "error");
    return;
  }

  const company = companyInput.value.trim();
  const member = memberInput.value.trim();
  const validMembers = attendeeDirectory[company] || [];

  if (!attendeeDirectory[company]) {
    setFormMessage("Pilih perusahaan yang tersedia pada daftar.", "error");
    companyInput.focus();
    return;
  }

  if (!validMembers.includes(member)) {
    setFormMessage("Pilih nama anggota yang sesuai dengan perusahaan.", "error");
    memberInput.focus();
    return;
  }

  const record = {
    company,
    member,
    session: currentSession.name,
    timestampIso: new Date().toISOString(),
    timestampWita: formatWita(new Date(), true)
  };

  const savedRecords = JSON.parse(
    localStorage.getItem("forkomAttendancePrototype") || "[]"
  );
  const duplicate = savedRecords.some(
    (item) => item.member === member && item.session === currentSession.name
  );

  if (duplicate) {
    setFormMessage("Nama ini sudah tercatat pada sesi yang sedang aktif.", "error");
    return;
  }

  savedRecords.push(record);
  localStorage.setItem(
    "forkomAttendancePrototype",
    JSON.stringify(savedRecords)
  );

  setFormMessage(
    `Kehadiran ${member} tercatat pada ${record.timestampWita} WITA (prototipe lokal).`,
    "success"
  );

  /*
    PRODUKSI:
    Ganti penyimpanan localStorage di atas dengan fetch() ke endpoint backend.
    Backend wajib memeriksa ulang sesi aktif menggunakan waktu server WITA,
    lalu menyimpan participant_id, company_id, session_id, dan server_timestamp.
  */
});

populateMemberOptions("");
updateAttendanceWindow();
setInterval(updateAttendanceWindow, 1000);
