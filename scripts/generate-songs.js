import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer archivos JSON
const discographyPath = path.join(__dirname, '../src/constants/discography.json');
const epsPath = path.join(__dirname, '../src/constants/eps.json');
const membersPath = path.join(__dirname, '../src/constants/members.json');

const discography = JSON.parse(fs.readFileSync(discographyPath, 'utf-8'));
const eps = JSON.parse(fs.readFileSync(epsPath, 'utf-8'));
const members = JSON.parse(fs.readFileSync(membersPath, 'utf-8'));

// Función para convertir título a slug ID
function titleToId(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple hyphens
}

// Función para buscar ID de músico
function getMusicianId(musicianName) {
  // Buscar en members.json
  for (const [id, member] of Object.entries(members.members)) {
    if (member.name === musicianName) {
      return id;
    }
  }
  // Si no encontramos, crear un slug del nombre
  return titleToId(musicianName);
}

// Array para almacenar todas las canciones
const allSongs = [];

// Procesar discografía
discography.forEach((album) => {
  album.tracks.forEach((track) => {
    const song = {
      id: titleToId(track.title),
      title: track.title,
      album: {
        title: album.title,
        year: album.year,
        cover: album.cover
      },
      credits: {
        musicians: album.musicians.map((musician) => ({
          name: musician.name,
          id: getMusicianId(musician.name),
          instrument: musician.instrument
        })),
        writers: {
          lyrics: track.writers || [],
          music: track.writers || []
        }
      },
      details: {
        track_number: track.n,
        duration: track.duration
      },
      lyrics: {
        en: track.lyrics || '',
        es: '' // Se agregará en Fase 3
      }
    };
    allSongs.push(song);
  });
});

// Procesar EPs
eps.forEach((ep) => {
  ep.tracks.forEach((track) => {
    const song = {
      id: titleToId(track.title),
      title: track.title,
      album: {
        title: ep.title,
        year: ep.year,
        cover: ep.cover
      },
      credits: {
        musicians: ep.musicians.map((musician) => ({
          name: musician.name,
          id: getMusicianId(musician.name),
          instrument: musician.instrument
        })),
        writers: {
          lyrics: track.writers || [],
          music: track.writers || []
        }
      },
      details: {
        track_number: track.n,
        duration: track.duration
      },
      lyrics: {
        en: track.lyrics || '',
        es: '' // Se agregará en Fase 3
      }
    };
    allSongs.push(song);
  });
});

// Escribir archivo songs.json
const songsPath = path.join(__dirname, '../src/constants/songs.json');
fs.writeFileSync(songsPath, JSON.stringify(allSongs, null, 2));

console.log(`✅ songs.json generado con ${allSongs.length} canciones`);
console.log(`📁 Archivo: ${songsPath}`);
