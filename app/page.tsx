/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React, { useMemo, useState } from "react";
import * as THREE from "three";
// @ts-expect-error
import NET from 'vanta/dist/vanta.net.min';
import { motion, AnimatePresence } from "framer-motion";
import Divider from "@/components/ui/Divider";
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
    pict: "images/Campex.jpg",
    icon: "🏫"
  },
  {
    date: "2025-01-30",
    title: "First Time Karaokean",
    desc: "Ini first time dan yang paling deg-degan jujur HAHAHAHA",
    pict: "images/Karoke.jpg",
    icon: "🎤"
  },
  {
    date: "2025-04-25",
    title: "Makan Ramen di Detos",
    desc: "Ini kelar nonton jumbo",
    pict: "images/Ramen.jpg",
    icon: "🍜"
  },
  {
    date: "2025-06-24",
    title: "Sushihiro di Margo",
    desc: "Favorit aku karna ngeliat kamu jadi cranky gituu lucuuuu",
    pict: "images/sushi.jpg",
    icon: "🍣"
  },
  {
    date: "2025-07-29",
    title: "Bang Yoyo Experience",
    desc: "One of the best experience, jujur seruuu!",
    pict: "images/bangYoyo.jpg",
    icon: "🔥"
  },
  {
    date: "2025-01-14",
    title: "Our Song",
    desc: "Lagu yang akrab sama kita setelah nonton Sore",
    pict: "/images/song.jpg",
    icon: "🎵"
  },
  // {
  //   date: "2025-08",
  //   title: "1 year Video",
  //   desc: "Short getaway yang bikin banyak foto lucu.",
  //   pict: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  //   icon: "✈️"
  // },
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

      {/* Video Hero Section */}
      <section className="relative w-full h-screen overflow-hidden mb-30">
        {/* Background video */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="video/anniv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* <video src="video/anniv.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"></video> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className=""
        >
          <source src="/video/anniv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        {/* Overlay gelap biar teksnya kebaca */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content di atas video */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-rose-300"
          >
            365 Hari Bersamamu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-rose-100"
          >
            Sebuah kapsul waktu kecil berisi kenangan, foto, dan 12 pesan suara—satu untuk setiap bulan ke depan.
          </motion.p>
        </div>
      </section>
      {/* <Button className="rounded-2xl px-6 py-6 text-base bg-rose-600 hover:bg-rose-700">
              Lihat Timeline
            </Button>
            <Button variant="outline" className="rounded-2xl px-6 py-6 text-base border-rose-300 text-rose-700 hover:bg-rose-50">
              Buka Voice Messages
            </Button> */}
      {/* Timeline */}
      {/* <Divider/> */}
      
    </div>
  );
}