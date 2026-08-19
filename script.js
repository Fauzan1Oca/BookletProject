/* =========================================================
   ATTENDANCE PROTOTYPE
   - Time zone: Asia/Makassar (WITA)
   - Records are stored only in this browser for UI testing.
   - Replace localStorage with a secure backend before the event.
========================================================= */

/*
  Nama instansi diambil dari kolom B.
  Peserta setiap instansi merupakan gabungan kolom E dan F.
*/
const attendeeDirectory = {
  "PT Artajasa Pembayaran Elektronis": [
    "Farida Peranginangin — Komisaris Utama",
    "RD. M. Dudi Dermawan S. — Direktur Keuangan"
  ],
  "PT Anadi Sarana Tatahusada": [
    "Arrow P. Siagian — Komisaris Utama",
    "Andiwiana Septonarwanto — Direktur Utama",
    "Ita Rulina — Direktur Keuangan",
    "Zulfan Nukman — SPI"
  ],
  "PT Bikasoga": [
    "Suharno Eliandy — Komisaris",
    "Sukarelawati Permana — Direktur",
    "Ferdi Rusdian — SPI"
  ],
  "PT Bidakara Indah Sejahtera": [
    "Budiharto Setyawan — Komisaris Utama",
    "Any Pudjiastuti — Direktur Keuangan"
  ],
  "PT Bisanta": [
    "Ridzky Prihadi Tjahyanto — Komisaris",
    "M. Taufik Amrozy — Direktur",
    "Burhan Wahyudi — SDM"
  ],
  "PT Bali Ocean Magic": [
    "Trisno Nugroho — Komisaris",
    "Windy Johan — Direktur Keuangan"
  ],
  "PT Bidakara Savoy Homann Duaribu": [
    "Sempa Arih Ginting — Komisaris",
    "Endang K. Saputra — Direktur",
    "Setia Permana — SPI",
    "Andri Irawan — Akunting"
  ],
  "PT Casabona Development": [
    "Herawanto — Komisaris Utama",
    "Naek Tigor Sinaga — Direktur Utama",
    "Andika Swasono — SPI"
  ],
  "PT Fajar Farmatama": [
    "Hari Sugeng Raharjo — Komisaris",
    "Sri Endah Susilo — Direktur Utama",
    "Asmu Ali Mauladi — Direktur Bisnis dan Komersial",
    "Doddi Sartono — SPI",
    "Boy Anton Nugroho — SPI"
  ],
  "PT Finnet Indonesia": [
    "Nurhayati Wisjnu Wardhani — Komisaris Utama",
    "Anton Daryono — Direktur Technology Product & Operation"
  ],
  "PT Fajar Mekar Indah": [
    "R. Erwin Soeriadimadja — Komisaris (Tentative)",
    "Rahmat Dwi Saputra — Direktur",
    "Rahmat Hidayat Kusuma - SPI"
  ],
  "PT Hotel Bumikarsa Bidakara": [
    "Vitri Andayani — Komisaris",
    "Wisnu Reza — Direktur",
    "Hasti Adiani Dwiputranti — SPI"
  ],
  "PT Jagakarsa Realty": [
    "Arief Budi Santoso — Direktur"
  ],
  "PT Kebon Agung": [
    "Doni Primanto Joewono — Komisaris Utama",
    "Dwi Pranoto — Komisaris",
    "Didid Taurisianto — Direktur Utama",
    "Prasetyo Budi Santoso — Direktur Produksi",
    "Teddy Pirngadi — Direktur Keuangan",
    "Faizal Riswan — SPI",
    "Agus Eko Budiarto — SPI",
    "Satya Bayu Putra — SPI",
    "Umar — MR",
    "M. Anas Mu’allif — SPI"
  ],
  "PT Kelola Jasa Artha": [
    "Maimirza — Komisaris"
  ],
  "PT Aplikanusa Lintasarta": [
    "Dody Budi Waluyo — Komisaris Utama",
    "Hariyadi Ramelan — Direktur"
  ],
  "PT Mekar Prana Indah": [
    "Budiyono — Komisaris Utama",
    "Andry Prasmuko — Komisaris",
    "Hilman Tisnawan — Direktur Utama",
    "Faris Budiawan — Direktur Keuangan dan Logistik",
    "Ferry Oktavian — Direktur Bisnis dan Komersial",
    "Basuki Wibowo — SPI",
    "Reza Abdullah S. — SPI",
    "Retno Damayanti — SPI",
    "Danan Tyas Wisaksono — MR",
    "Kiki Kreisna Rifqi - Rizki — MR"
  ],
  "PT Orix Indonesia Finance": [
    "J.B.P. Simandjuntak atau Dyah Nastiti K. — Komisaris Utama",
    "Causa Iman Karana — Wakil Direktur Utama"
  ],
  "PT Solo Indah Dinamika": [
    "Muhamad Nur — Komisaris Utama",
    "Gunawan Saichu — Direktur Keuangan",
    "Rozak Nur Kolis — SPI",
    "Sri Ratnasari — Akunting"
  ]
};

/*
  Setiap sesi memiliki jendela presensi sendiri.
  Waktu memakai UTC+08:00 (WITA).
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
const companyOptions = document.querySelector("#companyOptions");
const companyCombo = document.querySelector('[data-combobox="company"]');
const companyToggle = document.querySelector('[data-combo-toggle="company"]');
const memberInput = document.querySelector("#memberInput");
const memberOptions = document.querySelector("#memberOptions");
const memberCombo = document.querySelector('[data-combobox="member"]');
const memberToggle = document.querySelector('[data-combo-toggle="member"]');
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
      ? {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric"
        }
      : {}),
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).format(date);
}

function findActiveSession(now) {
  return (
    attendanceSessions.find(
      (session) => now >= session.startTime && now <= session.endTime
    ) || null
  );
}

function findNextSession(now) {
  return (
    attendanceSessions.find(
      (session) => session.startTime > now
    ) || null
  );
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

    updateSubmitState();

    message.textContent =
      "Presensi aktif. Pastikan perusahaan dan nama peserta sudah benar.";

    return;
  }

  submitButton.disabled = true;
  statusText.textContent = "Belum dibuka";

  statusBadge.classList.remove("is-open");
  statusBadge.classList.add("is-closed");

  if (nextSession) {
    sessionName.textContent =
      `Sesi berikutnya: ${nextSession.name}`;

    activityName.textContent = nextSession.name;

    message.textContent =
      `Presensi berikutnya dibuka pada ${
        formatWita(nextSession.startTime, true)
      } WITA.`;
  } else {
    sessionName.textContent = "Seluruh sesi telah selesai";

    activityName.textContent =
      "Rangkaian Forkom AP YKKBI 2026 selesai";

    message.textContent =
      "Periode pencatatan kehadiran telah berakhir.";
  }
}

const comboControls = {
  company: {
    type: "company",
    input: companyInput,
    menu: companyOptions,
    box: companyCombo,
    toggle: companyToggle,
    activeIndex: -1,
    filteredValues: [],
    getValues: () => Object.keys(attendeeDirectory)
  },
  member: {
    type: "member",
    input: memberInput,
    menu: memberOptions,
    box: memberCombo,
    toggle: memberToggle,
    activeIndex: -1,
    filteredValues: [],
    getValues: () => attendeeDirectory[companyInput?.value.trim()] || []
  }
};

function normalizeSearch(value) {
  return value
    .toLocaleLowerCase("id-ID")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function splitParticipantLabel(value) {
  const emDashIndex = value.lastIndexOf(" — ");
  const hyphenIndex = value.lastIndexOf(" - ");
  const separatorIndex = emDashIndex >= 0 ? emDashIndex : hyphenIndex;
  const separatorLength = emDashIndex >= 0 ? 3 : 3;

  if (separatorIndex < 0) {
    return { name: value, role: "" };
  }

  return {
    name: value.slice(0, separatorIndex).trim(),
    role: value.slice(separatorIndex + separatorLength).trim()
  };
}

function closeCombo(control) {
  if (!control?.menu) return;

  control.menu.hidden = true;
  control.box?.classList.remove("is-open");
  control.input?.setAttribute("aria-expanded", "false");
  control.input?.removeAttribute("aria-activedescendant");
  control.activeIndex = -1;
}

function closeAllCombos(except = null) {
  Object.values(comboControls).forEach((control) => {
    if (control !== except) closeCombo(control);
  });
}

function selectComboValue(control, value) {
  control.input.value = value;
  closeCombo(control);

  if (control.type === "company") {
    populateMemberOptions(value);
  }

  updateSubmitState();
  control.input.focus();
}

function createComboOption(control, value, index) {
  const option = document.createElement("button");
  const main = document.createElement("span");
  const meta = document.createElement("span");

  option.type = "button";
  option.className = "combo-option";
  option.id = `${control.type}Option${index}`;
  option.setAttribute("role", "option");
  option.setAttribute(
    "aria-selected",
    String(control.input.value.trim() === value)
  );
  option.dataset.value = value;

  main.className = "combo-option-main";
  meta.className = "combo-option-meta";

  if (control.type === "company") {
    main.textContent = value;
    meta.textContent = `${attendeeDirectory[value].length} peserta`;
  } else {
    const participant = splitParticipantLabel(value);
    main.textContent = participant.name;
    meta.textContent = participant.role;
  }

  option.append(main);
  if (meta.textContent) option.append(meta);

  option.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  option.addEventListener("click", () => {
    selectComboValue(control, value);
  });

  return option;
}

function renderComboOptions(control, query = "") {
  if (!control?.menu) return;

  const search = normalizeSearch(query);
  const values = control.getValues();
  const filteredValues = values.filter((value) =>
    normalizeSearch(value).includes(search)
  );

  control.activeIndex = -1;
  control.filteredValues = filteredValues;
  control.menu.replaceChildren();

  if (!filteredValues.length) {
    const empty = document.createElement("p");
    empty.className = "combo-empty";
    empty.textContent = values.length
      ? "Pilihan tidak ditemukan."
      : "Pilih perusahaan terlebih dahulu.";
    control.menu.append(empty);
    return;
  }

  control.menu.append(
    ...filteredValues.map((value, index) =>
      createComboOption(control, value, index)
    )
  );
}

function openCombo(control, showAll = false) {
  if (!control?.menu || control.input?.disabled) return;

  closeAllCombos(control);
  renderComboOptions(control, showAll ? "" : control.input.value);
  control.menu.hidden = false;
  control.box?.classList.add("is-open");
  control.input?.setAttribute("aria-expanded", "true");
}

function moveActiveOption(control, direction) {
  if (control.menu.hidden) openCombo(control, true);

  const options = Array.from(
    control.menu.querySelectorAll(".combo-option")
  );

  if (!options.length) return;

  control.activeIndex =
    (control.activeIndex + direction + options.length) % options.length;

  options.forEach((option, index) => {
    option.classList.toggle("is-active", index === control.activeIndex);
  });

  const activeOption = options[control.activeIndex];
  control.input.setAttribute("aria-activedescendant", activeOption.id);
  activeOption.scrollIntoView({ block: "nearest" });
}

function handleComboKeydown(control, event) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveActiveOption(control, 1);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveActiveOption(control, -1);
    return;
  }

  if (event.key === "Enter" && !control.menu.hidden) {
    const activeValue = control.filteredValues[control.activeIndex];

    if (activeValue) {
      event.preventDefault();
      selectComboValue(control, activeValue);
    } else if (control.filteredValues.length === 1) {
      event.preventDefault();
      selectComboValue(control, control.filteredValues[0]);
    }
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeCombo(control);
  }
}

function populateCompanyOptions() {
  renderComboOptions(comboControls.company);
}

function populateMemberOptions(company) {
  const names = attendeeDirectory[company] || [];

  memberInput.value = "";
  memberInput.disabled = names.length === 0;
  memberToggle.disabled = names.length === 0;
  memberInput.placeholder = names.length
    ? "Cari atau pilih nama anggota"
    : "Pilih perusahaan terlebih dahulu";

  renderComboOptions(comboControls.member);
  closeCombo(comboControls.member);
  updateSubmitState();
}

function updateSubmitState() {
  const company = companyInput?.value.trim() || "";
  const member = memberInput?.value.trim() || "";
  const validMembers = attendeeDirectory[company] || [];

  if (submitButton) {
    submitButton.disabled = !(
      currentSession &&
      validMembers.includes(member)
    );
  }
}

function setFormMessage(text, type = "") {
  message.textContent = text;

  message.classList.remove(
    "is-success",
    "is-error"
  );

  if (type) {
    message.classList.add(`is-${type}`);
  }
}

companyInput?.addEventListener("input", (event) => {
  const company = event.target.value.trim();

  populateMemberOptions(
    attendeeDirectory[company] ? company : ""
  );

  renderComboOptions(comboControls.company, company);
  openCombo(comboControls.company);
});

companyInput?.addEventListener("focus", () => {
  openCombo(comboControls.company, true);
});

companyInput?.addEventListener("keydown", (event) => {
  handleComboKeydown(comboControls.company, event);
});

companyToggle?.addEventListener("click", () => {
  if (companyOptions.hidden) {
    companyInput.focus();
    openCombo(comboControls.company, true);
  } else {
    closeCombo(comboControls.company);
  }
});

memberInput?.addEventListener("input", () => {
  renderComboOptions(comboControls.member, memberInput.value);
  openCombo(comboControls.member);
  updateSubmitState();
});

memberInput?.addEventListener("focus", () => {
  openCombo(comboControls.member, true);
});

memberInput?.addEventListener("keydown", (event) => {
  handleComboKeydown(comboControls.member, event);
});

memberToggle?.addEventListener("click", () => {
  if (memberOptions.hidden) {
    memberInput.focus();
    openCombo(comboControls.member, true);
  } else {
    closeCombo(comboControls.member);
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".combo-box")) {
    closeAllCombos();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  updateAttendanceWindow();

  if (!currentSession) {
    setFormMessage(
      "Presensi tidak dapat dicatat karena tidak ada sesi aktif.",
      "error"
    );
    return;
  }

  const company = companyInput.value.trim();
  const member = memberInput.value.trim();
  const validMembers = attendeeDirectory[company] || [];

  if (!attendeeDirectory[company]) {
    setFormMessage(
      "Pilih perusahaan yang tersedia pada daftar.",
      "error"
    );

    companyInput.focus();
    return;
  }

  if (!validMembers.includes(member)) {
    setFormMessage(
      "Pilih nama anggota yang sesuai dengan perusahaan.",
      "error"
    );

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
    localStorage.getItem(
      "forkomAttendancePrototype"
    ) || "[]"
  );

  const duplicate = savedRecords.some(
    (item) =>
      item.company === company &&
      item.member === member &&
      item.session === currentSession.name
  );

  if (duplicate) {
    setFormMessage(
      "Nama ini sudah tercatat pada sesi yang sedang aktif.",
      "error"
    );
    return;
  }

  savedRecords.push(record);

  localStorage.setItem(
    "forkomAttendancePrototype",
    JSON.stringify(savedRecords)
  );

  setFormMessage(
    `Kehadiran ${member} tercatat pada ` +
      `${record.timestampWita} WITA (prototipe lokal).`,
    "success"
  );

  /*
    PRODUCTION:
    Replace localStorage with fetch() to a backend endpoint.

    The backend must validate the active session using server time
    before saving participant_id, company_id, session_id,
    and server_timestamp.
  */
});

populateCompanyOptions();
populateMemberOptions("");
updateAttendanceWindow();

setInterval(
  updateAttendanceWindow,
  1000
);
