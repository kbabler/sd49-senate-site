'use client';

import { useEffect, useState } from 'react';

const ALERT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZstK1yyrw3rRMBL6ddBCYVJfAUuApwIrmZlCXkytILH0P3_Mpi6sNDAJ5NmMv4FWI2auQwFHmrLo-/pub?output=csv';
const DISMISSAL_KEY = 'banner_dismissed';

const parseCsvRow = (row) => {
  const values = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];

    if (character === '"' && row[index + 1] === '"' && quoted) {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      values.push(value.trim());
      value = '';
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
};

const parseCsvRows = (csv) => {
  const rows = [];
  let row = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (character === '"' && csv[index + 1] === '"' && quoted) {
      row += '""';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
      row += character;
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (row) rows.push(row);
      row = '';
      if (character === '\r' && csv[index + 1] === '\n') index += 1;
    } else {
      row += character;
    }
  }

  if (row) rows.push(row);
  return rows;
};

const getSecondCsvRow = (csv) => {
  const rows = parseCsvRows(csv);
  return rows[1] ? parseCsvRow(rows[1]) : [];
};

const AlertBanner = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSAL_KEY)) return undefined;

    const controller = new AbortController();

    fetch(ALERT_CSV_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Alert request failed: ${response.status}`);
        return response.text();
      })
      .then((csv) => {
        const [status, message, link] = getSecondCsvRow(csv);
        if (status?.toUpperCase() === 'ON' && message) {
          setAlert({ message, link });
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') console.error('Failed to load alert banner', error);
      });

    return () => controller.abort();
  }, []);

  if (!alert) return null;

  const announcement = alert.link ? (
    <a href={alert.link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:no-underline">
      {alert.message}
    </a>
  ) : alert.message;

  return (
    <div className="relative z-[60] flex items-center justify-center gap-4 bg-[#00C2CC] px-12 py-2 text-center text-sm font-bold text-[#2B1736]">
      <div>{announcement}</div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(DISMISSAL_KEY, 'true');
          setAlert(null);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl leading-none hover:opacity-75"
      >
        &times;
      </button>
    </div>
  );
};

export default AlertBanner;