import React from "react";

const S = ({ h, w = "100%", r = 6, mt = 0 }) => (
  <div style={{
    height:h, width:w, borderRadius:r, marginTop:mt,
    background:"rgba(255,255,255,0.05)", position:"relative", overflow:"hidden"
  }}>
    <div style={{
      position:"absolute", inset:0,
      background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",
      animation:"shimmer 1.75s infinite"
    }} />
  </div>
);

export default function NewsCardSkeleton() {
  return (
    <div style={{
      borderRadius:18, border:"1px solid rgba(255,255,255,0.05)",
      background:"rgba(255,255,255,0.02)", overflow:"hidden"
    }}>
      {/* Image */}
      <S h={175} r={0} />
      <div style={{ padding:"13px 15px 15px", display:"flex", flexDirection:"column", gap:9 }}>
        {/* Title */}
        <S h={14} />
        <S h={14} w="68%" />
        {/* Action row */}
        <div style={{ display:"flex", gap:6 }}>
          <S h={24} w={70} r={999} />
          <S h={24} w={72} r={7} />
          <S h={24} w={85} r={7} />
        </div>
        {/* Description */}
        <S h={11} />
        <S h={11} w="88%" />
        <S h={11} w="72%" />
        <S h={11} w="80%" />
      </div>
      <style>{`
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
      `}</style>
    </div>
  );
}
