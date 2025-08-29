/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { useMemo, useState } from "react";
import * as THREE from "three";
// @ts-expect-error
import NET from 'vanta/dist/vanta.net.min';
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart, Calendar, Play, Music, Star, X } from "lucide-react";

// --- Optional: shadcn/ui components (available in this environment)
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";



// Helper: month name
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
type Memory = {
  date: string;
  title: string;
  desc: string;
  pict: string;
  icon: string;
};

// Fake audio sources for preview
const demoAudios = Array.from({ length: 12 }, (_, i) => ({
  title: `Pesan Bulanan #${i + 1}`,
  src: "/jar/anniv 1 year.wav",
  note: `Hal yang aku syukuri bulan ke-${i + 1} bersama kamu ✨`,
}));

// Demo timeline data dengan URL gambar placeholder
const demoTimeline = [
  {
    date: "2024-08-15",
    title: "First Hello",
    desc: "Pertama kali chat soal mentoring, dan semuanya bermula dari sini hihihi",
    pict: "/images/first-chat.jpg",
    icon: "💬"
  },
  {
    date: "2024-08-27",
    title: "First Date",
    desc: "Nyari tempat makan enak tapi canggung, akhirnya makan di warteg yang udah kehabisan menu T__T",
    pict: "/images/first-date.jpg",
    icon: "🍽️"
  },
  {
    date: "2024-08-29",
    title: "Start the Relationship",
    desc: "Aku nembak kamu lewat telepon, sekitar jam 11 malam",
    pict: "/images/start-relation.jpg",
    icon: "💘"
  },
  {
    date: "2024-09-26",
    title: "Malam Spesial di Ayam Geprek",
    desc: "Kamu nyamperin aku malem-malam sehabis nonton bioskop sama teman kampus",
    pict: "/images/ayam-geprek.jpg",
    icon: "🌙"
  },
  {
    date: "2024-10-18",
    title: "First Photobooth",
    desc: "Kelar parade, makan di pacil lama, trus nyebrang ke FIB",
    pict: "/images/first-Photobooth.jpeg",
    icon: "📸"
  },
  {
    date: "2024-12-12",
    title: "Shopping Date di Margo",
    desc: "First time nyoba shopping date di margo, inget banget kita ke tommorow",
    pict: "/images/date-margo.jpg",
    icon: "🛍️"
  },
  {
    date: "2024-12-27",
    title: "First Christmas Together",
    desc: "OMG INI MOMEN PALING BAHAGIA",
    pict: "images/christmass-together.jpg",
    icon: "🎄"
  },
  {
    date: "2024-12-30",
    title: "Momen Romantis di Tebet",
    desc: "First time kita ke tebet bareng, salah satu momen teromantis yang membekas di kepalaku",
    pict: "images/tebet.png",
    icon: "❤️"
  },
  {
    date: "2025-01-16",
    title: "CampEx di SMA Kamu",
    desc: "First time kita campex di SMA kamu, serasa kembali ke SMA dan beromantis ria",
    pict: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🏫"
  },
  {
    date: "2025-01-30",
    title: "First Time Karaokean",
    desc: "Ini first time dan yang paling deg-degan jujur HAHAHAHA",
    pict: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🎤"
  },
  {
    date: "2025-04-25",
    title: "Makan Ramen di Detos",
    desc: "Ini kelar nonton jumbo",
    pict: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🍜"
  },
  {
    date: "2025-06-24",
    title: "Sushihiro di Margo",
    desc: "Favorit aku karna ngeliat kamu jadi cranky gituu lucuuuu",
    pict: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🍣"
  },
  {
    date: "2025-07-29",
    title: "Bang Yoyo Experience",
    desc: "One of the best experience, jujur seruuu!",
    pict: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🔥"
  },
  {
    date: "2025-01-14",
    title: "Our Song",
    desc: "Lagu yang selalu diputar tiap jalan bareng.",
    pict: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "🎵"
  },
  {
    date: "2025-05-30",
    title: "Little Trip",
    desc: "Short getaway yang bikin banyak foto lucu.",
    pict: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    icon: "✈️"
  },
];

export default function AnniversaryPreview() {
  const now = new Date();
  const startYear = now.getFullYear();
  const startMonth = now.getMonth();
  const currentUnlockIndex = 0;

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const m = (startMonth + i) % 12;
      const y = startYear + Math.floor((startMonth + i) / 12);
      return { label: `${MONTHS[m]} ${y}`, m, y, i };
    });
  }, [startMonth, startYear]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-rose-50 via-pink-50 to-white text-gray-800">
      {/* Hero / Landing */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-rose-200 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-pink-200 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-rose-300 blur-3xl opacity-50" />
        </div>
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-rose-700"
          >
            365 Hari Bersamamu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-rose-900/70"
          >
            Sebuah kapsul waktu kecil berisi kenangan, foto, dan 12 pesan suara—satu untuk setiap bulan ke depan.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button className="rounded-2xl px-6 py-6 text-base bg-rose-600 hover:bg-rose-700">
              Lihat Timeline
            </Button>
            <Button variant="outline" className="rounded-2xl px-6 py-6 text-base border-rose-300 text-rose-700 hover:bg-rose-50">
              Buka Voice Messages
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-center gap-2 mb-10">
          <Calendar className="h-6 w-6 text-rose-600" />
          <h2 className="text-2xl md:text-3xl font-semibold text-rose-800">Timeline Kita</h2>
        </div>

        <div className="relative">
          {/* Garis timeline romantis */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-300 to-pink-200"></div>

          {demoTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex w-full mb-8 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className={`flex flex-col md:flex-row items-center w-full md:w-5/12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Bulatan timeline */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white z-10">
                  <span className="text-lg">{item.icon}</span>
                </div>

                {/* Kartu memori */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="ml-4 md:ml-0 md:mx-4 rounded-2xl shadow-lg border-rose-100 bg-white/80 backdrop-blur-sm mt-4 md:mt-0 flex-1 cursor-pointer"
                  onClick={() => setSelectedMemory(item)}
                >
                  <Card className="h-full">
                    <CardContent className="p-5">
                      <div className="text-sm text-rose-600 font-medium">
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-rose-900">{item.title}</div>
                      <p className="mt-2 text-rose-800/70">{item.desc}</p>

                      {/* Tampilkan thumbnail gambar jika ada */}
                      {item.pict && (
                        <div className="mt-4 overflow-hidden rounded-lg">
                          <img
                            src={item.pict}
                            alt={item.title}
                            className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <p className="text-xs text-rose-500 mt-2 text-center">Klik untuk melihat gambar lengkap</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Voice Message Jar */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-center gap-2 mb-10">
          <Music className="h-6 w-6 text-rose-600" />
          <h2 className="text-2xl md:text-3xl font-semibold text-rose-800">Voice Message Jar</h2>
          <span className="text-sm bg-rose-100 text-rose-800 px-2 py-1 rounded-full">12x</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {months.map((slot, idx) => {
            const locked = idx > currentUnlockIndex;
            return (
              <motion.button
                key={slot.label}
                whileHover={{ scale: locked ? 1 : 1.05, y: -5 }}
                whileTap={{ scale: locked ? 1 : 0.98 }}
                disabled={locked}
                onClick={() => setOpenIdx(idx)}
                className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 shadow-sm ${locked
                    ? "border-rose-100 bg-white/60 text-rose-900/50"
                    : "border-rose-200 bg-white hover:bg-rose-50 text-rose-900 hover:shadow-md"
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium">{slot.label}</div>
                  {locked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4 text-rose-600" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 grid place-items-center rounded-full ${locked ? "bg-rose-100" : "bg-rose-200 group-hover:bg-rose-300 transition-colors"
                    }`}>
                    <Play className="h-5 w-5 fill-rose-700 text-rose-700" />
                  </div>
                  <div>
                    <div className="text-base font-semibold">{demoAudios[idx].title}</div>
                    <div className="text-xs mt-1 text-rose-900/60">{locked ? "Terkunci" : "Klik untuk memutar"}</div>
                  </div>
                </div>

                {locked && (
                  <div className="absolute inset-0 rounded-2xl bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                    <Lock className="h-6 w-6 text-rose-300" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Dialog Player untuk Voice Messages */}
      <AnimatePresence>
        {openIdx !== null && openIdx <= currentUnlockIndex && (
          <Dialog open onOpenChange={() => setOpenIdx(null)}>
            <DialogContent className="rounded-2xl border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
              <DialogHeader>
                <DialogTitle className="text-rose-900 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-rose-400 text-rose-400" />
                  {months[openIdx].label} • {demoAudios[openIdx].title}
                </DialogTitle>
                <DialogDescription className="text-rose-800/70">
                  {demoAudios[openIdx].note}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <audio controls preload="auto" className="w-full rounded-lg">
                  <source src={demoAudios[openIdx].src} type="audio/mp3" />
                  Browser Anda tidak mendukung elemen audio.
                </audio>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="rounded-xl bg-rose-600 hover:bg-rose-700">Tutup</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal untuk menampilkan gambar memori */}
      <AnimatePresence>
        {selectedMemory && (
          <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
            <DialogContent className="rounded-2xl max-w-3xl border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-0 overflow-hidden">
              <div className="relative">
                {/* <button 
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <X className="h-5 w-5 text-rose-700" />
                </button> */}
                <img
                  src={selectedMemory.pict}
                  alt={selectedMemory.title}
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <div className="text-sm text-rose-600 font-medium">
                    {new Date(selectedMemory.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <DialogTitle className="text-rose-900 text-left mt-1">
                    {selectedMemory.title}
                  </DialogTitle>
                  <DialogDescription className="text-rose-800/70 text-left mt-2">
                    {selectedMemory.desc}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <footer className="pb-10 text-center text-xs text-rose-900/50">
        Dibuat dengan ❤ oleh Gabby — Preview
      </footer>
    </div>
  );
}